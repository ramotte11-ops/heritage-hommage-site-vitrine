import Services3 from "@/components/common/Services3";
import HeritageHeader from "@/components/heritage/HeritageHeader";
import Education from "@/components/common/Education2";
// Première section sous le Hero : version HERITAGE locale de home-9/About
// (le composant Reeni d'origine reste utilisé par index-09-white et index-11).
import About from "@/components/heritage/HeritageEssence";
import Hero from "@/components/heritage/HeroElise";
import Portfolio from "@/components/homes/home-9/Portfolio";
import React from "react";
import Pricing from "@/components/common/Pricing";
import Blogs from "@/components/common/Blogs";
import Contact from "@/components/common/Contact";
import Footer1 from "@/components/footers/Footer1";
// Page vitrine HERITAGE : header HERITAGE à la place du header Reeni (Header2),
// et sans les widgets de démonstration du template (CommonComponents :
// modale « 44 Pre-built sites », bouton ThemeForest, chat, retour en haut,
// menus Reeni). Ces composants partagés restent intacts pour les autres pages.
export const metadata = {
  title:
    "Home 09 || Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
  description:
    "Personal Portfolio React Nextjs Template | Freelancer & Developer Portfolio",
};
export default function page() {
  return (
    <>
      <HeritageHeader />
      <Hero />
      <About />
      <Services3 />
      <Portfolio />
      <Education />
      <Pricing />
      <Blogs />
      <Contact parentClass="get-in-touch-area tmp-section-gapBottom" />
      <Footer1 />
    </>
  );
}
