"use client";
import { toast } from "react-toastify";
import styles from "./HeritageCommitment.module.scss";

// Section « L'engagement HERITAGE » — remplace sur /index-09 la section des
// trois offres (HeritageOffers, conservée dans le dépôt). Décision PO : parler
// d'abord de l'accès gratuit au Builder unique, pas d'achat.
//
// V1.1 (retour PO) : même langage que « Comment ça marche » — en-tête Reeni
// (intitulé, titre, description), carte noir ardoise --color-gray-2 sans
// teinte ni lumière, champagne réservé aux accents (filets, icônes, numéros,
// bouton). Accent champagne via --color-primary, redéfinie localement.

// Builder unique : aucune adresse publique de l'entrée invité n'est confirmée
// (le parcours invité n'est publié qu'en développement côté Builder). Tant que
// href vaut null, le bouton affiche le message provisoire du site.
// Renseigner href avec l'adresse validée par le QG suffit à le raccorder.
const CTA = {
  label: "Commencer gratuitement",
  href: null,
  pending: "La création d’hommage sera bientôt disponible.",
};

const STEPS = [
  { icon: "fa-pen-nib", title: "Créez", text: "Sans compte au départ." },
  { icon: "fa-eye", title: "Découvrez", text: "Votre hommage prend vie." },
  {
    icon: "fa-share-nodes",
    title: "Partagez",
    text: "Un avis gratuit pendant 45 jours, sous conditions.",
  },
];

function StartButton() {
  const className = `tmp-btn hover-icon-reverse radius-round ${styles.button}`;
  const inner = (
    <span className="icon-reverse-wrapper">
      <span className="btn-text">{CTA.label}</span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
    </span>
  );
  if (CTA.href) {
    return (
      <a className={className} href={CTA.href}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => toast.info(CTA.pending, { autoClose: 4000 })}
    >
      {inner}
    </button>
  );
}

export default function HeritageCommitment() {
  return (
    <section
      className={`our-price-plan-area tmp-section-gapTop ${styles.commitment}`}
      id="engagement"
      aria-labelledby="engagement-titre"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">L’engagement HERITAGE</span>
          </div>
          <h2
            id="engagement-titre"
            className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2"
          >
            Un premier hommage, gratuitement.
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            HERITAGE met à votre disposition son outil de création pour réaliser
            un avis de décès personnel et le publier gratuitement, sous
            conditions.
          </p>
        </div>

        {/* Carte unique, surface des cartes « Comment ça marche » */}
        <div
          className={`education-experience-card tmp-scroll-trigger tmp-fade-in animation-order-4 ${styles.panel}`}
        >
          <ol className={styles.steps}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.icon} aria-hidden="true">
                  <i className={`fa-regular ${step.icon}`} />
                </span>
                <span className={`edu-sub-title ${styles.stepNumber}`} aria-hidden="true">
                  0{index + 1}
                </span>
                <h3 className={`edu-title ${styles.stepTitle}`}>{step.title}</h3>
                <p className={`edu-para ${styles.stepText}`}>{step.text}</p>
              </li>
            ))}
          </ol>

          <div className={styles.cta}>
            <StartButton />
            <p className={styles.note}>
              Publication gratuite possible dans les 10 jours suivant la
              première sauvegarde durable, pour une durée de publication de
              45&nbsp;jours, sous conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
