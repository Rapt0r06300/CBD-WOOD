import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contract = await readFile(new URL('../docs/design/wood-owner-dashboard-contract.md', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const account = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const dashboardCss = await readFile(new URL('../owner-dashboard.css', import.meta.url), 'utf8');

test('le contrat délimite un dashboard owner lisible avant les détails techniques', () => {
  assert.match(contract, /Périmètre et source de vérité/iu);
  assert.match(contract, /Commandes d’abord/iu);
  assert.match(contract, /Produits/iu);
  assert.match(contract, /Stocks/iu);
  assert.match(contract, /Commandes/iu);
  assert.match(account, /mountOwnerDashboard/);
  assert.match(dashboard, /const summary = #?\('\#ownerSummaryGrid'\)|ownerSummaryGrid/);
  assert.match(dashboard, /productsSection\.before\(ordersSection\)/);
  assert.match(accountPage, /id="ownerProductsBody"/);
  assert.match(accountPage, /id="ownerOrdersBody"/);
  assert.match(accountPage, /id="owner-settings-title"/);
});

test('le dashboard couvre les états de données et les actions protégées', () => {
  assert.match(contract, /États de chargement, vide, erreur et fallback/iu);
  assert.match(contract, /Actions modifiables et doubles actions/iu);
  for (const message of ['Aucun produit', 'Aucune commande', 'Aucune notification', 'Aucun brouillon', 'indisponible']) {
    assert.match(dashboard, new RegExp(message, 'iu'));
  }
  assert.match(dashboard, /Promise\.all\(\[loadProducts\(\), loadOrders\(\), loadDocuments\(\), loadNotifications\(\), loadNewsletter\(\)\]\)/);
  assert.match(dashboard, /button\.disabled = true/);
  assert.match(dashboard, /await loadOrders\(\)/);
  assert.match(accountPage, /role="status"/);
  assert.match(accountPage, /aria-live="polite"/);
});

test('le contrat protège le rendu responsive, le clavier et le coût de chargement', () => {
  assert.match(contract, /Responsive, clavier, lecteur d’écran et motion/iu);
  assert.match(contract, /Coût de chargement et source de vérité/iu);
  assert.match(dashboard, /data-label="Produit"/);
  assert.match(dashboard, /data-label="Commande \/ client"/);
  assert.match(dashboard, /aria-label="État de/);
  assert.match(dashboard, /limit\(100\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(dashboardCss, /owner-dashboard__table-wrap|owner-dashboard__section/);
  assert.match(accountPage, /owner-dashboard__button[^>]*type="button"/);
});

test('le contrat documente la preuve, la revue humaine et le rollback', () => {
  assert.match(contract, /Preuve, revue humaine et rollback/iu);
  assert.match(contract, /R0898|propriétaire|conjoint/iu);
  assert.match(contract, /Safari|Firefox|appareil réel/iu);
  assert.match(contract, /legacy|retour arrière|rollback/iu);
  assert.match(accountPage, /frais et délais à confirmer/);
  assert.match(accountPage, /Viva en attente de connexion/);
});
