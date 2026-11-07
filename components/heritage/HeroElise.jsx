"use client";
import Link from "next/link";
import { getImageProps } from "next/image";
import { Playfair_Display, EB_Garamond } from "next/font/google";
import { toast } from "react-toastify";
import styles from "./HeroElise.module.scss";

// Polices auto-hébergées par Next (aucune requête vers Google côté visiteur).
const titleFont = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"], // police variable : toutes les graisses incluses
  display: "swap",
  variable: "--hero-elise-title",
});
const textFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--hero-elise-text",
});

// Destinations des boutons : pas encore définies par le QG HERITAGE.
// Tant qu'une valeur est null, le bouton reste un <button> sans lien
// et affiche un message « bientôt disponible ». Renseigner l'URL ici
// suffit à le transformer en vrai lien.
const DESTINATIONS = {
  create: null, // ex. URL du Builder HERITAGE
  discover: null, // ex. page de présentation HERITAGE
};

const PENDING_MESSAGES = {
  create: "La création d’hommage sera bientôt disponible.",
  discover: "La présentation d’HERITAGE arrive bientôt.",
};

// Même point de bascule que les styles (HeroElise.module.scss, $mobile).
const MOBILE_MEDIA = "(max-width: 991.98px)";
const ALT =
  "Élise, femme aux cheveux gris éclairés d’une lumière champagne, le regard levé, sur fond noir";

function HeroAction({ kind, className, children }) {
  const href = DESTINATIONS[kind];
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => toast.info(PENDING_MESSAGES[kind], { autoClose: 4000 })}
    >
      {children}
    </button>
  );
}

export default function HeroElise() {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt: ALT,
    src: "/assets/images/heritage/hero-elise-mobile.png",
    width: 941,
    height: 1672,
    quality: 90,
    sizes: "(max-width: 575.98px) 100vw, 640px",
  });
  const { props: desktopProps } = getImageProps({
    alt: ALT,
    src: "/assets/images/heritage/hero-elise-desktop.png",
    width: 1672,
    height: 941,
    quality: 90,
    sizes: "100vw",
    priority: true,
  });

  return (
    <section
      id="home"
      className={`${styles.hero} ${titleFont.variable} ${textFont.variable}`}
    >
      <div className={styles.media}>
        <picture>
          <source
            media={MOBILE_MEDIA}
            srcSet={mobileSrcSet}
            sizes="(max-width: 575.98px) 100vw, 640px"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...desktopProps} className={styles.image} />
        </picture>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <span
            className={`${styles.rule} tmp-scroll-trigger tmp-fade-in animation-order-1`}
            aria-hidden="true"
          />
          <h1
            className={`${styles.title} tmp-scroll-trigger tmp-fade-in animation-order-2`}
          >
            Une vie mérite <br />
            d’être <em className={styles.accent}>racontée.</em>
          </h1>
          <p
            className={`${styles.lead} tmp-scroll-trigger tmp-fade-in animation-order-3`}
          >
            Des souvenirs, des voix, des instants précieux. <br />
            Un hommage unique à transmettre, <br />
            pour aujourd’hui et pour demain.
          </p>
          <div
            className={`${styles.actions} tmp-scroll-trigger tmp-fade-in animation-order-4`}
          >
            <HeroAction kind="create" className={styles.btnPrimary}>
              Créer un hommage
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </HeroAction>
            <HeroAction kind="discover" className={styles.btnSecondary}>
              Découvrir HERITAGE
            </HeroAction>
            {/* Mention validée PO — desktop et mobile. */}
            <p className={styles.ctaNote}>Commencez gratuitement, à votre rythme.</p>
          </div>
          <svg
            className={`${styles.flourish} tmp-scroll-trigger tmp-fade-in animation-order-5`}
            viewBox="0 0 340 40"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient id="heroEliseGold" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#c99a55" stopOpacity="0" />
                <stop offset="0.45" stopColor="#d9ab64" />
                <stop offset="1" stopColor="#f0c98a" />
              </linearGradient>
            </defs>
            <path
              d="M4 30 C 90 20, 150 18, 210 26 S 280 32, 300 20"
              fill="none"
              stroke="url(#heroEliseGold)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <g fill="#e2b46e">
              <path d="M300 20 C 304 10, 312 6, 322 5 C 318 13, 310 19, 300 20 Z" />
              <path d="M306 16 C 306 8, 300 3, 293 1 C 292 9, 298 15, 306 16 Z" />
              <path d="M312 13 C 318 15, 326 15, 333 11 C 326 7, 318 8, 312 13 Z" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
