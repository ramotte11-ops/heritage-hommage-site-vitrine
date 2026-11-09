"use client";
import { toast } from "react-toastify";
import styles from "./HeritageContact.module.scss";

// Section « Contact » HERITAGE — remplace sur /index-09 le formulaire Reeni
// (components/common/Contact.jsx, laissé intact pour les autres pages).
// Pas de formulaire ni de stockage : un bouton qui ouvrira la messagerie du
// visiteur (mailto:) dès que l'adresse officielle sera fournie.

// Adresse officielle non encore fournie : NE PAS en inventer. Tant que la
// valeur est null, le bouton affiche un message provisoire explicite.
// Renseigner l'adresse (ex. "contact@…") suffit à activer le mailto:.
const CONTACT_EMAIL = null;
const PENDING = "L’adresse de contact HERITAGE sera communiquée prochainement.";

export default function HeritageContact() {
  const inner = (
    <span className="icon-reverse-wrapper">
      <span className="btn-text">Nous contacter</span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
      <span className="btn-icon">
        <i className="fa-sharp fa-regular fa-arrow-right" aria-hidden="true" />
      </span>
    </span>
  );

  return (
    <section
      className={`tmp-section-gap ${styles.contact}`}
      id="contact"
      aria-labelledby="contact-titre"
    >
      <div className="container">
        <div className="section-head mb--0">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Contact</span>
          </div>
          <h2
            id="contact-titre"
            className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2"
          >
            Une question sur HERITAGE&nbsp;?
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Pour une question concernant votre hommage, une difficulté technique
            ou une demande professionnelle, vous pouvez nous écrire.
          </p>
        </div>

        <div className={`tmp-scroll-trigger tmp-fade-in animation-order-4 ${styles.action}`}>
          {CONTACT_EMAIL ? (
            <a
              className="tmp-btn hover-icon-reverse radius-round"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {inner}
            </a>
          ) : (
            <button
              type="button"
              className="tmp-btn hover-icon-reverse radius-round"
              onClick={() => toast.info(PENDING, { autoClose: 4000 })}
            >
              {inner}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
