// Canal choisi pour recevoir la liste de la semaine (formulaire du site, colonne « Canal » de « Inscriptions SMS »).
// Revue de Pierre du 26/10/2026 : WhatsApp d'abord, SMS pour qui n'a pas WhatsApp. Valeur inconnue → WhatsApp.
export const CANAUX = ['WhatsApp', 'SMS'];
export const lireCanal = (valeur) => CANAUX.find((c) => c.toLowerCase() === String(valeur ?? '').trim().toLowerCase()) ?? 'WhatsApp';
export const parCanal = (canal) => (canal === 'SMS' ? 'par SMS' : 'sur WhatsApp');
