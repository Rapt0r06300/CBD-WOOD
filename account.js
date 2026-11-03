import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0/+esm';

const config = window.WOOD_SUPABASE_CONFIG;
const supabase = config ? createClient(config.url, config.publishableKey) : null;
const form = document.querySelector('[data-account-form]');
const message = document.getElementById('accountMessage');
const action = document.getElementById('accountAction');
let mode = 'login';

function showMessage(text, isError = false) {
  if (!message) return;
  message.textContent = text;
  message.classList.remove('hidden');
  message.classList.toggle('is-error', isError);
}

function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll('[data-account-tab]').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.accountTab === mode);
  });
  if (action) action.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte';
  showMessage('');
  message?.classList.add('hidden');
}

async function saveCustomerProfile(user) {
  const { error } = await supabase.from('customer_profiles').upsert({ id: user.id }, { onConflict: 'id' });
  if (error) throw error;
}

async function handleSubmit(event) {
  event.preventDefault();
  if (!supabase) {
    showMessage('La connexion sécurisée n’est pas disponible pour le moment.', true);
    return;
  }
  const email = document.getElementById('account-email').value.trim();
  const password = document.getElementById('account-password').value;
  action.disabled = true;
  action.textContent = 'Chargement…';
  try {
    if (mode === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await saveCustomerProfile(data.user);
      showMessage('Connexion réussie. Votre espace client est ouvert.');
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}${window.location.pathname}` }
      });
      if (error) throw error;
      if (data.session && data.user) {
        await saveCustomerProfile(data.user);
        showMessage('Compte créé. Vous êtes connecté.');
      } else {
        showMessage('Compte créé. Vérifiez votre boîte e-mail pour confirmer l’adresse avant de vous connecter.');
      }
    }
  } catch (error) {
    showMessage(error.message || 'Une erreur est survenue.', true);
  } finally {
    action.disabled = false;
    action.textContent = mode === 'login' ? 'Se connecter' : 'Créer mon compte';
  }
}

document.querySelectorAll('[data-account-tab]').forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.accountTab)));
form?.addEventListener('submit', handleSubmit);
