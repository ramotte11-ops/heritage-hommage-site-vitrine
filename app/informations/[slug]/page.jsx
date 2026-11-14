import { notFound } from "next/navigation";
import { Playfair_Display, EB_Garamond } from "next/font/google";
import HeritageLogo from "@/components/heritage/HeritageLogo";
import HeritageFooter from "@/components/heritage/HeritageFooter";
import {
  LEGAL_DOCUMENTS,
  LEGAL_DRAFT,
  getLegalDocument,
} from "@/data/heritage-legal";
import styles from "./legal.module.scss";

// Pages d'information HERITAGE (mentions légales, confidentialité, CGU, CGV).
// Le contenu vit dans data/heritage-legal.js : le remplacer suffit, sans
// toucher à cette page. Tant que LEGAL_DRAFT vaut true : bandeau « version
// de travail » visible et page non indexée.

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

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCUMENTS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) return {};
  return {
    title: `${doc.label}${LEGAL_DRAFT ? " (version de travail)" : ""} — HERITAGE Hommage`,
    robots: LEGAL_DRAFT ? { index: false, follow: false } : undefined,
  };
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 className={styles.h2}>{block.text}</h2>;
    case "h3":
      return <h3 className={styles.h3}>{block.text}</h3>;
    case "ul":
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p className={styles.p}>{block.text}</p>;
  }
}

export default async function LegalPage({ params }) {
  const { slug } = await params;
  const doc = getLegalDocument(slug);
  if (!doc) notFound();

  return (
    <div className={`${styles.page} ${titleFont.variable} ${textFont.variable}`}>
      <header className={styles.top}>
        <div className="container">
          <a href="/" className={styles.brand} aria-label="HERITAGE Hommage — accueil">
            <HeritageLogo />
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <div className="container">
          <article className={styles.article} lang="fr">
            {LEGAL_DRAFT && (
              <p className={styles.draft} role="note">
                <strong>Version de travail — document non définitif.</strong> Ce texte est en
                cours de rédaction : certaines informations restent à compléter. Il ne
                constitue pas la version applicable.
              </p>
            )}
            <h1 className={styles.title}>{doc.label}</h1>
            <p className={styles.subtitle}>{doc.title}</p>
            {doc.preparedOn && (
              <p className={styles.meta}>Date de préparation : {doc.preparedOn}</p>
            )}
            {doc.blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
            <p className={styles.back}>
              <a href="/">← Retour à l’accueil</a>
            </p>
          </article>
        </div>
      </main>

      <HeritageFooter />
    </div>
  );
}
