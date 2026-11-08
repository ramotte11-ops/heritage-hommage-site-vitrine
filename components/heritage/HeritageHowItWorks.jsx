import { Playfair_Display } from "next/font/google";
import styles from "./HeritageHowItWorks.module.scss";

// Section « Comment ça marche » — transformation HERITAGE de la section Reeni
// « Education & Experience » (components/common/Education2.jsx, laissée intacte
// pour les 11 autres pages qui l'utilisent). Mêmes classes Reeni : en-tête de
// section, grille row g-5 / col-lg-6 col-sm-6, cartes education-experience-card
// avec halo tmponhover et apparition tmp-fade-in échelonnée.
// Retirés de cette copie : sous-titre « Education », dates, intitulés
// professionnels, textes anglais et tout le bloc « Experiences » (décision PO).

// Même police que le titre du Hero Élise (fichier identique, servi une fois).
const signatureFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--hh-signature",
});

// Repère stable : cible de l'entrée « Comment ça marche » du header.
export const HOW_IT_WORKS_ID = "comment-ca-marche";

const STEPS = [
  {
    number: "01",
    title: "Commencez simplement",
    text: "Laissez-vous guider dès les premières étapes. Vous n’avez rien à installer ni à maîtriser.",
  },
  {
    number: "02",
    title: "Racontez à votre rythme",
    text: "Ajoutez vos textes, vos photographies et les souvenirs qui rendent cette histoire unique.",
  },
  {
    number: "03",
    title: "HERITAGE met en beauté",
    text: "Vos souvenirs prennent place dans une présentation élégante, pensée pour les mettre en valeur.",
  },
  {
    number: "04",
    title: "Publiez et partagez",
    text: "Choisissez la publication adaptée à votre hommage et partagez-le avec ceux qui comptent.",
  },
];

export default function HeritageHowItWorks() {
  return (
    <section
      className={`education-experience tmp-section-gapTop ${styles.howItWorks} ${signatureFont.variable}`}
      id={HOW_IT_WORKS_ID}
      aria-labelledby="comment-ca-marche-titre"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Comment ça marche</span>
          </div>
          <h2
            id="comment-ca-marche-titre"
            className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2"
          >
            Vous avez les souvenirs. Nous vous guidons pour les transmettre.
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Pas besoin de compétences techniques. HERITAGE vous accompagne pas à
            pas pour créer un hommage personnel, à votre rythme.
          </p>
        </div>

        <ol className={`row g-5 ${styles.steps}`}>
          {STEPS.map((step, index) => (
            <li className="col-lg-6 col-sm-6" key={step.number}>
              <div
                className={`education-experience-card tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${index + 1}`}
              >
                <span className={`edu-sub-title ${styles.number}`} aria-hidden="true">
                  {step.number}
                </span>
                <h3 className={`edu-title ${styles.stepTitle}`}>{step.title}</h3>
                <p className="edu-para">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className={`tmp-scroll-trigger tmp-fade-in animation-order-5 ${styles.signature}`}>
          {/* Sur écran étroit, la coupure se fait entre les deux phrases. */}
          <span className={styles.signaturePart}>La famille raconte.</span>{" "}
          <span className={styles.signaturePart}>HERITAGE met en forme.</span>
        </p>
      </div>
    </section>
  );
}
