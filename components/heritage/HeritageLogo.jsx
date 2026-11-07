import styles from "./HeritageHeader.module.scss";

// Signature B validée PO : petit rameau champagne au-dessus de HERITAGE,
// HOMMAGE discret et espacé. Réalisation web sobre (SVG + texte HTML),
// pas un logo définitif : à remplacer par l'asset officiel s'il est produit.
export function HeritageSprig({ className = "" }) {
  return (
    <svg
      className={`${styles.sprig} ${className}`}
      viewBox="0 0 56 16"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="heritageSprigGold" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c99a55" />
          <stop offset="0.55" stopColor="#e6bf7f" />
          <stop offset="1" stopColor="#f3d6a3" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#heritageSprigGold)" strokeLinecap="round">
        {/* tige */}
        <path d="M5 11.5 C 17 9, 33 8.4, 50 6.2" strokeWidth="1.2" />
      </g>
      <g fill="url(#heritageSprigGold)">
        {/* feuilles alternées, fines, orientées vers l'extrémité */}
        <path d="M14 10.2 C 15.5 6.6, 18.6 4.8, 22.4 4.6 C 20.6 7.6, 17.6 9.6, 14 10.2 Z" />
        <path d="M18.5 9.6 C 21.2 11.8, 24.6 12.8, 28 12 C 25.4 10, 22.2 9.1, 18.5 9.6 Z" />
        <path d="M25 9 C 26.8 5.6, 30 3.9, 33.6 3.9 C 31.6 6.8, 28.6 8.6, 25 9 Z" />
        <path d="M30 8.6 C 32.6 10.6, 35.8 11.4, 39 10.6 C 36.6 8.8, 33.4 8.1, 30 8.6 Z" />
        <path d="M36.5 7.8 C 38.4 4.8, 41.4 3.3, 44.6 3.4 C 42.6 6, 39.8 7.5, 36.5 7.8 Z" />
        {/* bourgeon terminal */}
        <path d="M48.6 6.4 C 50.2 4.6, 52.4 4, 54.4 4.4 C 53 6, 50.9 6.8, 48.6 6.4 Z" />
      </g>
    </svg>
  );
}

export default function HeritageLogo() {
  return (
    <span className={styles.logo}>
      <HeritageSprig />
      <span className={styles.logoName}>HERITAGE</span>
      <span className={styles.logoSub}>HOMMAGE</span>
    </span>
  );
}
