import { createHash } from 'node:crypto';

const baseUrl = process.argv[2] ?? 'https://rapt0r06300.github.io/CBD-WOOD/';
const normalizedBase = `${baseUrl.replace(/\/+$/, '')}/`;
const demoUrl = `${normalizedBase}demo/`;

const readPage = async (url) => {
  const response = await fetch(url, {
    headers: { 'user-agent': 'WOOD-pages-verifier/1.0' },
    redirect: 'follow',
  });
  const body = await response.text();
  return { url: response.url, status: response.status, body };
};

const digest = (body) => createHash('sha256').update(body).digest('hex');
const base = await readPage(normalizedBase);
const demo = await readPage(demoUrl);

const failures = [];
if (base.status !== 200) failures.push(`base HTTP ${base.status}`);
if (demo.status !== 200) failures.push(`demo HTTP ${demo.status}`);
if (/demo-mode\.js|wood-d1-adapter\.js/i.test(base.body)) {
  failures.push('base exposes demo-only runtime');
}
if (!/demo-mode\.js/i.test(demo.body)) failures.push('demo guard is missing');
if (!/wood-d1-adapter\.js/i.test(demo.body)) failures.push('demo adapter marker is missing');
if (digest(base.body) === digest(demo.body)) failures.push('base and demo responses are identical');

const report = {
  base: { url: base.url, status: base.status, sha256: digest(base.body), bytes: Buffer.byteLength(base.body) },
  demo: { url: demo.url, status: demo.status, sha256: digest(demo.body), bytes: Buffer.byteLength(demo.body) },
  isolated: failures.length === 0,
};

console.log(JSON.stringify(report, null, 2));
if (failures.length > 0) {
  console.error(`GitHub Pages live verification failed: ${failures.join('; ')}`);
  process.exitCode = 1;
} else {
  console.log('GitHub Pages live verification: base and demo are distinct and correctly marked.');
}
