"use client";
import { Playfair_Display, EB_Garamond } from "next/font/google";
import { toast } from "react-toastify";
import HeritageLogo from "./HeritageLogo";
import styles from "./HeritageFooter.module.scss";

// Footer HERITAGE — remplace sur /index-09 le Footer Reeni
// (components/footers/Footer1.jsx, laissé intact pour les autres pages).
// Logo et rameau du header (HeritageLogo), mêmes polices et mêmes variables
// que le header (déclarations identiques : fichiers et classes partagés).

const titleFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--hh-title",
});
const textFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--hh-text",
});

// Navigation vers les sections réelles de la page.
const NAV = [
  { label: "Accueil", href: "#home" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Notre engagement", href: "#engagement" },
  { label: "Questions fréquentes", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// Destinations pas encore disponibles : aucun faux lien. Tant que href vaut
// null, l'entrée est un bouton qui l'indique clairement. Renseigner href
// (page validée) suffit à en faire un vrai lien.
const PARTNERS = {
  label: "Professionnels & partenaires",
  href: null,
  pending: "L’espace partenaires sera bientôt disponible.",
};
const LEGAL_PENDING = "Cette page sera disponible avant la mise en ligne du site.";
const LEGAL = [
  { label: "Mentions légales", href: null },
  { label: "Confidentialité", href: null },
  { label: "Conditions d’utilisation", href: null },
];

function PendingLink({ item, className, pending }) {
  if (item.href) {
    return (
      <a className={className} href={item.href}>
        {item.label}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => toast.info(item.pending || pending, { autoClose: 4000 })}
    >
      {item.label}
    </button>
  );
}

export default function HeritageFooter() {
  return (
    <footer className={`${styles.footer} ${titleFont.variable} ${textFont.variable}`}>
      <div className="container">
        <div className={styles.main}>
          <div className={styles.identity}>
            <a href="#home" className={styles.brand} aria-label="HERITAGE Hommage — haut de page">
              <HeritageLogo />
            </a>
            <p className={styles.signature}>
              <span className={styles.signaturePart}>La famille raconte.</span>{" "}
              <span className={styles.signaturePart}>HERITAGE met en forme.</span>
            </p>
            <p className={styles.tagline}>Des souvenirs précieux, un hommage qui leur ressemble.</p>
          </div>

          <nav className={styles.nav} aria-label="Navigation du pied de page">
            <ul className={styles.navList}>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <PendingLink item={PARTNERS} className={styles.navLink} />
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.legal} aria-label="Informations légales">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <PendingLink item={item} className={styles.legalLink} pending={LEGAL_PENDING} />
              </li>
            ))}
          </ul>
          <p className={styles.copyright}>© 2026 HERITAGE Hommage. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
