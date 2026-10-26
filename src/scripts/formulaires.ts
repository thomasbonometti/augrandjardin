// Formulaires simples (inscription SMS, demande d'accès pro, connexion à l'espace pro) :
// envoi sans recharger la page, message de réponse lu par les lecteurs d'écran.
// Sans JavaScript, le formulaire est envoyé normalement et la fonction renvoie vers la page.
// `data-redirection` : l'adresse ouverte après un envoi réussi (connexion pro → /pro/tarifs/).
// Les réponses de l'outil de commande (relayées) disent `error`, celles du site `erreur`.
import { espacesInsecables } from '../lib/typo.js';

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-form-api]')) {
  const message = form.querySelector<HTMLElement>('.message-form');
  const bouton = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    for (const el of form.querySelectorAll('[aria-invalid]')) el.removeAttribute('aria-invalid');
    const invalides = [...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')].filter((el) => !el.checkValidity());
    if (invalides.length) {
      invalides.forEach((el) => el.setAttribute('aria-invalid', 'true'));
      afficher(invalides[0].type === 'tel' ? 'Vérifiez le numéro de téléphone.' : 'Vérifiez les champs signalés.', false);
      invalides[0].focus();
      return;
    }
    if (bouton) bouton.disabled = true;
    afficher('Envoi…', true);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        const vers = data.redirection || form.dataset.redirection;
        if (vers) {
          if (new URL(vers, location.href).pathname === location.pathname) location.reload(); else location.href = vers;
          return;
        }
        form.reset();
        afficher(data.message || 'Merci, c’est envoyé.', true);
      } else {
        for (const nom of Object.keys(data.champs || {})) form.querySelector(`[name="${nom}"]`)?.setAttribute('aria-invalid', 'true');
        afficher(data.erreur || data.error || 'L’envoi n’a pas marché. Réessayez, ou appelez la ferme au 06 42 42 42 93.', false);
      }
    } catch {
      afficher('Pas de connexion. Réessayez dans un instant.', false);
    } finally {
      if (bouton) bouton.disabled = false;
    }
  });
  function afficher(texte: string, ok: boolean) {
    if (!message) return;
    message.textContent = espacesInsecables(texte);
    message.classList.toggle('ok', ok);
    message.classList.toggle('ko', !ok);
  }
}
