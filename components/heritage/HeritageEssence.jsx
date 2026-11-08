"use client";
import { toast } from "react-toastify";
import styles from "./HeritageEssence.module.scss";

// Section « Notre essence » — transformation HERITAGE de la première section
// Reeni de Home 09 (components/homes/home-9/About.jsx, laissé intact pour les
// autres pages). Même structure, mêmes classes Reeni (disposition, cartes,
// animations d'apparition, effet de survol) ; seuls les contenus, les icônes
// et l'accent de couleur changent (accent champagne via HeritageEssence.module.scss).

// Destination du bouton : aucune section HERITAGE n'existe encore.
// Tant que href vaut null, le bouton reste un <button> « bientôt disponible ».
const DISCOVER = { label: "Découvrir HERITAGE", href: null };

function DiscoverButton() {
  const inner = (
    <span className="icon-reverse-wrapper">
      <span className="btn-text">{DISCOVER.label}</span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
    </span>
  );
  if (DISCOVER.href) {
    return (
      <a className="tmp-btn hover-icon-reverse radius-round" href={DISCOVER.href}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="tmp-btn hover-icon-reverse radius-round"
      onClick={() =>
        toast.info("La présentation d’HERITAGE arrive bientôt.", { autoClose: 4000 })
      }
    >
      {inner}
    </button>
  );
}

export default function HeritageEssence() {
  return (
    <section
      className={`about-us-area tmp-section-gapTop ${styles.essence}`}
      id="about"
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-us-left-content-wrap bg-vactor-one">
              {/* Grande carte : phrase, sans chiffre ni statistique */}
              <div className="years-of-experience-card tmp-scroll-trigger tmp-fade-in animation-order-1">
                <p className="card-para">Chaque vie mérite d’être racontée.</p>
              </div>
              <div className="design-card tmp-scroll-trigger tmp-fade-in animation-order-2">
                <div className="design-card-img">
                  <div className="icon">
                    <i className="fa-sharp fa-thin fa-feather" aria-hidden="true" />
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-title">Raconter une vie</h3>
                  <p className="card-para">Des souvenirs et des instants qui comptent.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-us-right-content-wrap">
              <div className="section-head text-align-left mb--50">
                <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                  <span className="subtitle">Notre essence</span>
                </div>
                <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                  Chaque vie laisse une histoire.
                </h2>
                <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                  HERITAGE vous accompagne pour rassembler les souvenirs, raconter
                  les moments précieux et créer un hommage personnel à transmettre.
                </p>
              </div>
              <div className="about-us-section-card row g-5">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-4">
                    <div className="card-head">
                      <div className="logo-img">
                        <i className="fa-light fa-images" aria-hidden="true" />
                      </div>
                      <h3 className="card-title">Préserver les souvenirs</h3>
                    </div>
                    <p className="card-para">
                      Des photographies et des moments à partager.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="about-us-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-5">
                    <div className="card-head">
                      <div className="logo-img">
                        <i className="fa-light fa-users" aria-hidden="true" />
                      </div>
                      <h3 className="card-title">Réunir les proches</h3>
                    </div>
                    <p className="card-para">Une place pour les mots de chacun.</p>
                  </div>
                </div>
              </div>
              <div className="about-btn mt--40 tmp-scroll-trigger tmp-fade-in animation-order-6">
                <DiscoverButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
