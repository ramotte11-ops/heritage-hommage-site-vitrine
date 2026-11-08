"use client";
import { toast } from "react-toastify";
import styles from "./HeritageOffers.module.scss";

// Section « Nos offres » — transformation HERITAGE de la section Reeni « Price
// plan » (components/common/Pricing.jsx et data/pricing.js, laissés intacts
// pour les 29 autres pages qui les utilisent). Mêmes classes Reeni : en-tête de
// section, grille col-lg-4 col-md-6, cartes price-plan-card tmponhover, liste
// check-box, boutons tmp-btn btn-md (plein pour la carte centrale, contour
// pour les deux autres), apparition tmp-fade-in échelonnée.
//
// Aucun tarif n'est défini : la zone « prix » Reeni porte la nature de l'offre
// (décision PO 014B). Durée de 5 ans volontairement non affichée.
// Retirés de cette copie : prix et offres de démonstration, liens /contact.

// Builder et espace partenaires pas encore raccordés : boutons provisoires,
// comme les autres CTA du site. Renseigner href pour raccorder une offre.
const PENDING_CREATION = "La création d’hommage sera bientôt disponible.";
const PENDING_PARTNERS = "L’espace partenaires sera bientôt disponible.";

const OFFERS = [
  {
    id: "gratuit",
    name: "L’avis de décès gratuit",
    nature: "Gratuit",
    detail: "Publication gratuite pendant 45 jours, sous conditions.",
    description:
      "Informez vos proches et partagez un premier hommage, simplement et avec élégance.",
    features: [
      "Premier hommage élégant à partager",
      "Vous pourrez ensuite prolonger avec l’hommage complet",
    ],
    cta: { label: "Créer mon avis de décès gratuit", href: null, pending: PENDING_CREATION },
  },
  {
    id: "complet",
    name: "L’hommage complet",
    nature: "Achat unique",
    detail: "Sans abonnement.",
    description:
      "Racontez toute une vie, réunissez les souvenirs et créez un hommage précieux à transmettre.",
    features: [
      "Récit de vie",
      "Photographies et galerie",
      "Contributions des proches",
      "Vidéo",
      "Présentation artistique HERITAGE",
    ],
    cta: { label: "Découvrir l’hommage complet", href: null, pending: PENDING_CREATION },
    featured: true,
  },
  {
    id: "professionnels",
    name: "HERITAGE Professionnels",
    nature: "Tarif partenaire",
    detail: "Clés d’activation, sans abonnement obligatoire.",
    description:
      "Offrez aux familles une nouvelle manière de transmettre les souvenirs, grâce à nos clés d’activation au tarif partenaire.",
    features: [
      "Une clé = un hommage complet",
      "Clés à offrir, intégrer aux prestations ou revendre",
      "Prix de revente libre",
    ],
    cta: { label: "Devenir partenaire", href: null, pending: PENDING_PARTNERS },
  },
];

function OfferButton({ cta, featured }) {
  const className = `tmp-btn hover-icon-reverse btn-md radius-round ${
    featured ? "" : "btn-border"
  }`;
  const inner = (
    <span className="icon-reverse-wrapper">
      <span className="btn-text">{cta.label}</span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
    </span>
  );
  if (cta.href) {
    return (
      <a className={className} href={cta.href}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => toast.info(cta.pending, { autoClose: 4000 })}
    >
      {inner}
    </button>
  );
}

export default function HeritageOffers() {
  return (
    <section
      className={`our-price-plan-area tmp-section-gapTop ${styles.offers}`}
      id="nos-offres"
      aria-labelledby="nos-offres-titre"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Nos offres</span>
          </div>
          <h2
            id="nos-offres-titre"
            className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2"
          >
            Quelle solution vous correspond&nbsp;?
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Commencez gratuitement, créez un hommage complet, ou proposez
            HERITAGE aux familles que vous accompagnez.
          </p>
        </div>

        {/* Tablette : deux cartes puis la troisième centrée */}
        <div className="row align-items-center justify-content-center">
          {OFFERS.map((offer, index) => (
            <div
              key={offer.id}
              className={`col-lg-4 col-md-6 tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
            >
              <article
                className={`price-plan-card tmponhover ${offer.featured ? `active ${styles.featured}` : ""}`}
                aria-labelledby={`offre-${offer.id}`}
              >
                <h3 id={`offre-${offer.id}`} className={`price-sub-title ${styles.name}`}>
                  {offer.name}
                </h3>
                <p className={`main-price ${styles.nature}`}>{offer.nature}</p>
                <p className={`per-month ${styles.detail}`}>{offer.detail}</p>
                <p className={styles.description}>{offer.description}</p>
                <div className="check-box">
                  <ul>
                    {offer.features.map((feature) => (
                      <li key={feature}>
                        <div className="check-box-item">
                          <div className="box-icon" aria-hidden="true">
                            <i className="fa-solid fa-circle-check" />
                          </div>
                          <p className="box-para">{feature}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`tmp-button-here ${styles.action}`}>
                  <OfferButton cta={offer.cta} featured={offer.featured} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
