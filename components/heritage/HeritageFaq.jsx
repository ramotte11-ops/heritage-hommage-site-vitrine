"use client";
import { useId, useState } from "react";
import styles from "./HeritageFaq.module.scss";

// Section « Vos questions, nos réponses » — remplace sur /index-09 la section
// Reeni « Blog and news » (components/common/Blogs.jsx, laissé intact pour les
// autres pages). Les styles FAQ de Reeni étant commentés dans le template, la
// FAQ reprend les cartes HERITAGE déjà présentes sur la page :
// education-experience-card (noir ardoise, rayon 20) + tmponhover (halo
// champagne qui suit la souris, géré par LayoutWrapper), en-tête Reeni,
// apparition tmp-fade-in, champagne via --color-primary redéfinie localement.
//
// Accordéon : cinq cartes fermées par défaut, une seule ouverte à la fois.
// Chaque question est un vrai <button> (clavier, aria-expanded) ; les réponses
// sont présentes dans le HTML dès le rendu serveur (aucun chargement au clic).

// Textes validés PO (FAQ stratégique V1) — ne pas modifier sans validation.
const FAQ = [
  {
    question: "Qu’est-ce qu’un hommage numérique ?",
    answer: [
      "Un hommage numérique est un espace en ligne dédié à la mémoire d’un proche disparu. Il rassemble son histoire, ses photographies et ses souvenirs dans une présentation élégante, à partager avec la famille et les amis.",
      "Les proches peuvent également participer en laissant des messages de condoléances, en partageant des souvenirs ou des photographies, ou en déposant une attention symbolique, comme une bougie, un lys ou un cœur.",
      "Ces possibilités dépendent des fonctionnalités de l’hommage et des autorisations définies par la famille.",
    ],
  },
  {
    question: "Comment créer un hommage en ligne pour un proche ?",
    answer: [
      "Avec HERITAGE, vous commencez simplement, sans créer de compte au départ. Vous ajoutez les informations, les textes et les photographies de votre choix, à votre rythme. Vous découvrez le résultat avant de choisir comment publier votre hommage.",
    ],
  },
  {
    question: "Peut-on créer un hommage gratuitement ?",
    answer: [
      "Oui. La création et la découverte de votre hommage sont gratuites. En cas de décès récent, vous pouvez également publier un avis de décès gratuitement pendant 45 jours, sous conditions, notamment dans les 10 jours suivant la première sauvegarde de votre brouillon. L’hommage complet est proposé séparément.",
    ],
  },
  {
    question: "Peut-on ajouter des photos et des souvenirs de famille ?",
    answer: [
      "Oui. Les photographies, les récits et les petits détails personnels sont au cœur d’HERITAGE. L’avis gratuit permet déjà de partager des photos et un premier hommage. L’offre complète permet d’aller plus loin dans la conservation et le partage des souvenirs familiaux.",
    ],
  },
  {
    question: "Combien de temps un hommage reste-t-il accessible ?",
    answer: [
      "Un avis de décès publié gratuitement reste accessible pendant 45 jours à compter de sa publication. L’hommage complet est prévu pour une durée de cinq ans, avec possibilité de renouvellement manuel. Aucun abonnement automatique n’est imposé.",
    ],
  },
];

// Données structurées FAQPage (mêmes textes que la page) pour les moteurs de
// recherche.
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer.join(" ") },
  })),
};

export default function HeritageFaq() {
  const [open, setOpen] = useState(null);
  const uid = useId();

  return (
    <section
      className={`tmp-section-gap ${styles.faq}`}
      id="faq"
      aria-labelledby={`${uid}-titre`}
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Questions fréquentes</span>
          </div>
          <h2
            id={`${uid}-titre`}
            className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2"
          >
            Vos questions, nos réponses.
          </h2>
        </div>

        <div className={styles.list}>
          {FAQ.map((item, index) => {
            const isOpen = open === index;
            const buttonId = `${uid}-q${index}`;
            const panelId = `${uid}-r${index}`;
            return (
              <div
                key={item.question}
                className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 3} ${styles.item} ${isOpen ? styles.isOpen : ""}`}
              >
                <h3 className={styles.heading}>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                  >
                    <span className={`edu-sub-title ${styles.number}`} aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span className={`edu-title ${styles.question}`}>{item.question}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <i className="fa-regular fa-plus" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={styles.panel}
                >
                  <div className={styles.panelInner}>
                    {item.answer.map((paragraph) => (
                      <p key={paragraph} className={`edu-para ${styles.answer}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        // Contenu statique défini ci-dessus (aucune donnée utilisateur).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />
    </section>
  );
}
