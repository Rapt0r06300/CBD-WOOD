import {
  buildMimeMessage,
  calculateRetryAt,
  encodeGmailRawMessage,
  isRetryableError,
} from './core.mjs';

export const MAX_ATTEMPTS = 5;

const safeErrorMessage = (error) => {
  const message = typeof error?.message === 'string' ? error.message : 'Unknown email provider error';
  return message.replace(/(refresh[_ -]?token|client[_ -]?secret|service[_ -]?role|access[_ -]?token)\s*[:=]\s*[^\s,;]+/giu, '$1=[redacted]');
};

export const processEmailJob = async (job, dependencies) => {
  const now = dependencies.now instanceof Date ? dependencies.now : new Date();
  try {
    const message = await dependencies.loadMessage(job);
    const mime = buildMimeMessage({ ...message, to: job.recipient_email });
    const providerMessage = await dependencies.sendMessage(encodeGmailRawMessage(mime));

    await dependencies.recordAttempt({
      outboxId: job.id,
      attemptNumber: job.attempts,
      provider: 'gmail',
      status: 'accepted',
      providerMessageId: providerMessage.id,
    });
    await dependencies.markSent({
      outboxId: job.id,
      providerMessageId: providerMessage.id,
      sentAt: now,
    });
    return { status: 'sent', providerMessageId: providerMessage.id };
  } catch (error) {
    const retry = isRetryableError(error) && job.attempts < MAX_ATTEMPTS;
    const status = retry ? 'deferred' : 'rejected';
    const nextStatus = retry ? 'pending' : 'dead_letter';
    const failure = {
      outboxId: job.id,
      attemptNumber: job.attempts,
      provider: 'gmail',
      status,
      responseCode: Number(error?.status) || null,
      errorCode: typeof error?.code === 'string' ? error.code : null,
      errorMessage: safeErrorMessage(error),
    };
    await dependencies.recordAttempt(failure);
    await dependencies.markFailed({
      outboxId: job.id,
      status: nextStatus,
      availableAt: retry ? calculateRetryAt(job.attempts, now) : null,
      lastError: failure.errorMessage,
    });
    return { status: retry ? 'retry' : 'dead_letter', error: failure.errorMessage };
  }
};
