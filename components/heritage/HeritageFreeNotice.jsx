"use client";
import { useState } from "react";
import { getImageProps } from "next/image";
import { toast } from "react-toastify";
import styles from "./HeritageFreeNotice.module.scss";

// Section « Publiez un avis de décès gratuitement » — transformation HERITAGE de
// la section Reeni « Latest Portfolio » (components/homes/home-9/Portfolio.jsx,
// laissé intact pour les 3 autres pages qui l'utilisent). Même structure et
// mêmes classes Reeni (en-tête, pilules des filtres, tab-content / tab-pane,
// bouton, animations d'apparition). Retirés de cette copie : catégories,
// cartes de démonstration, liens de projets, voiles roses, textes anglais.
//
// Le sélecteur Clair / Sombre ne change QUE l'image (démonstration visuelle).
// Le bouton principal en est indépendant.

// Builder HERITAGE pas encore raccordé : bouton provisoire « bientôt
// disponible », comme les autres CTA du site. Renseigner href pour le raccorder.
const CTA = { label: "Créer mon avis de décès gratuit", href: null };

// Mobile (< 768 px) : option M2 validée PO — mêmes compositions, seules les
// marges noires vides sont réduites (recadrage identique pour Light et Dark,
// 1520 x 910, aucun appareil coupé). Provisoire en attendant un visuel vertical.
const MOBILE_MEDIA = "(max-width: 767.98px)";
const DESKTOP_SIZES =
  "(min-width: 1400px) 1296px, (min-width: 1200px) 1116px, (min-width: 992px) 936px, (min-width: 768px) 696px, 100vw";

const THEMES = [
  {
    id: "light",
    label: "Clair",
    src: "/assets/images/heritage/avis-deces-light.png",
    mobileSrc: "/assets/images/heritage/avis-deces-light-mobile.png",
    alt: "Présentation d’un avis de décès HERITAGE sur téléphone et ordinateur, dans une ambiance claire.",
  },
  {
    id: "dark",
    label: "Sombre",
    src: "/assets/images/heritage/avis-deces-dark.png",
    mobileSrc: "/assets/images/heritage/avis-deces-dark-mobile.png",
    alt: "Présentation d’un hommage HERITAGE sur téléphone et ordinateur, dans une ambiance sombre.",
  },
];

function Composition({ theme }) {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt: theme.alt,
    src: theme.mobileSrc,
    width: 1520,
    height: 910,
    sizes: "100vw",
  });
  // Les deux ambiances sont chargées d'emblée : la bascule est immédiate.
  const { props: desktopProps } = getImageProps({
    alt: theme.alt,
    src: theme.src,
    width: 1672,
    height: 941,
    sizes: DESKTOP_SIZES,
    loading: "eager",
  });
  return (
    <picture>
      <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} sizes="100vw" />
      {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
      <img {...desktopProps} />
    </picture>
  );
}

function CreateButton() {
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
      <a className="tmp-btn hover-icon-reverse radius-round" href={CTA.href}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="tmp-btn hover-icon-reverse radius-round"
      onClick={() =>
        toast.info("La création d’hommage sera bientôt disponible.", { autoClose: 4000 })
      }
    >
      {inner}
    </button>
  );
}

export default function HeritageFreeNotice() {
  const [active, setActive] = useState("light");

  return (
    <section
      className={`tmp-portfolio-area tmp-section-gapTop ${styles.freeNotice}`}
      id="portfolio"
    >
      <div className="container">
        <div className="section-head mb--60">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Un premier hommage, gratuitement</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Publiez un avis de décès gratuitement.
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Informez vos proches et partagez un premier hommage, dans un écrin
            élégant et personnel.
          </p>
        </div>

        <div className="latest-portfolio-tabs-area">
          {/* Composition : Light par défaut, Dark au choix (même format → aucun saut) */}
          <div
            id="heritage-avis-apercu"
            className={`tab-content tmp-scroll-trigger tmp-fade-in animation-order-4 ${styles.preview}`}
          >
            {THEMES.map((theme) => (
              <div
                key={theme.id}
                className={`tab-pane fade ${active === theme.id ? "show active" : ""}`}
              >
                <Composition theme={theme} />
              </div>
            ))}
          </div>

          {/* Sélecteur d'ambiance : pilules des filtres Reeni, 2 choix */}
          <ul
            className={`nav nav-tabs tmp-scroll-trigger tmp-fade-in animation-order-5 ${styles.switcher}`}
            role="group"
            aria-label="Ambiance de l’aperçu"
          >
            {THEMES.map((theme) => (
              <li key={theme.id}>
                <button
                  type="button"
                  className={`nav-link ${active === theme.id ? "active" : ""}`}
                  aria-pressed={active === theme.id}
                  aria-controls="heritage-avis-apercu"
                  onClick={() => setActive(theme.id)}
                >
                  {theme.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Parcours commercial : indépendant du sélecteur */}
        <div className={`tmp-scroll-trigger tmp-fade-in animation-order-6 ${styles.cta}`}>
          <CreateButton />
          <p className={styles.note}>
            Vous pourrez ensuite prolonger votre hommage avec l’offre complète.
          </p>
          <p className={styles.conditions}>Sous conditions</p>
        </div>
      </div>
    </section>
  );
}
