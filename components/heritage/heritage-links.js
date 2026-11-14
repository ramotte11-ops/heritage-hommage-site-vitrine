// Adresses de raccordement HERITAGE — source unique pour la landing.
//
// Builder : le Builder existant (dépôt heritage-bulder, projet Netlify
// « hommages ») reste sur son origine actuelle pendant la phase privée.
// Les brouillons invités vivent dans l'IndexedDB du navigateur, liée à
// l'origine : changer d'adresse rendrait ces brouillons locaux invisibles.
// Pour basculer plus tard (ex. https://app.<domaine>), définir
// NEXT_PUBLIC_HERITAGE_BUILDER_ORIGIN au build — aucune autre modification.
export const BUILDER_ORIGIN = (
  process.env.NEXT_PUBLIC_HERITAGE_BUILDER_ORIGIN || "https://hommages.netlify.app"
).replace(/\/+$/, "");

// Parcours réellement publiés par le Builder (vérifiés le 14/11/2026) :
// - /creer : Builder unique, sans compte (brouillon local) ;
// - /login : connexion, puis /owner (« retrouver mes hommages »).
export const BUILDER_CREATE_URL = `${BUILDER_ORIGIN}/creer`;
export const BUILDER_LOGIN_URL = `${BUILDER_ORIGIN}/login`;
