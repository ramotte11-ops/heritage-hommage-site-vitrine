"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Playfair_Display, EB_Garamond } from "next/font/google";
import { toast } from "react-toastify";
import HeritageLogo from "./HeritageLogo";
import styles from "./HeritageHeader.module.scss";

// Mêmes polices que le Hero Élise (fichiers identiques, servis une seule fois).
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

// Navigation progressive : aucune section HERITAGE n'existe encore.
// Tant que href vaut null, l'entrée reste un <button> (aucun faux lien)
// et affiche « bientôt disponible ». Renseigner href suffit à la raccorder.
const NAV_ITEMS = [
  { id: "decouvrir", label: "Découvrir", href: null },
  { id: "hommages", label: "Nos hommages", href: null },
  // Mission 013B (autorisation PO) : section « Comment ça marche » de /index-09.
  { id: "fonctionnement", label: "Comment ça marche", href: "/index-09#comment-ca-marche" },
];
const CTA = { label: "Créer un hommage", href: null }; // même parcours que le Hero

const PENDING_SECTION = "Cette section arrive bientôt.";
const PENDING_CTA = "La création d’hommage sera bientôt disponible.";

// Même seuil que le header Reeni d'origine (LayoutWrapper).
const STICKY_OFFSET = 150;

function NavEntry({ item, className, onNavigate, pendingMessage }) {
  if (item.href) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        {item.label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onNavigate?.();
        toast.info(pendingMessage, { autoClose: 4000 });
      }}
    >
      {item.label}
    </button>
  );
}

export default function HeritageHeader() {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Header fixe au défilement.
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > STICKY_OFFSET);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((restoreFocus = true) => {
    setMenuOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Menu mobile : Échap, piège de focus, défilement de page bloqué.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const focusables = () =>
      [...panel.querySelectorAll("button, a[href]")].filter(
        (el) => !el.disabled
      );
    focusables()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        const items = focusables();
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, closeMenu]);

  // Le menu mobile se referme si l'écran repasse en desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = (e) => e.matches && closeMenu(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen, closeMenu]);

  return (
    <header
      className={`${styles.header} ${sticky ? styles.isSticky : ""} ${titleFont.variable} ${textFont.variable}`}
    >
      <div className={styles.bar}>
        <a href="#home" className={styles.brand} aria-label="HERITAGE Hommage — haut de page">
          <HeritageLogo />
        </a>

        <nav className={styles.desktopNav} aria-label="Navigation principale">
          <ul className={styles.navList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavEntry
                  item={item}
                  className={styles.navLink}
                  pendingMessage={PENDING_SECTION}
                />
              </li>
            ))}
          </ul>
          <NavEntry item={CTA} className={styles.cta} pendingMessage={PENDING_CTA} />
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="heritage-mobile-menu"
          onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
        >
          <span className={styles.burgerLines} aria-hidden="true" />
        </button>
      </div>

      {/* Menu mobile (< 992 px) */}
      <div
        id="heritage-mobile-menu"
        ref={panelRef}
        className={`${styles.mobileMenu} ${menuOpen ? styles.isOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu HERITAGE"
        hidden={!menuOpen}
      >
        <div className={styles.bar}>
          <span className={styles.brand}>
            <HeritageLogo />
          </span>
          <button
            type="button"
            className={styles.close}
            aria-label="Fermer le menu"
            onClick={() => closeMenu()}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <nav aria-label="Navigation principale (mobile)">
          <ul className={styles.mobileList}>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <NavEntry
                  item={item}
                  className={styles.mobileLink}
                  onNavigate={() => closeMenu(false)}
                  pendingMessage={PENDING_SECTION}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
