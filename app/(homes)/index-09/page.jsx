// Deuxième section : version HERITAGE locale de Services3 (« Latest Service »),
// le composant Reeni d'origine reste utilisé par les autres pages.
import Services3 from "@/components/heritage/HeritageMemories";
import HeritageHeader from "@/components/heritage/HeritageHeader";
// Quatrième section : version HERITAGE locale d'Education2 (« Comment ça
// marche ») ; le composant Reeni d'origine reste utilisé par les autres pages.
import Education from "@/components/heritage/HeritageHowItWorks";
// Première section sous le Hero : version HERITAGE locale de home-9/About
// (le composant Reeni d'origine reste utilisé par index-09-white et index-11).
import About from "@/components/heritage/HeritageEssence";
import Hero from "@/components/heritage/HeroElise";
// Troisième section : version HERITAGE locale de home-9/Portfolio (avis de
// décès gratuit) ; le composant Reeni d'origine reste utilisé par les autres pages.
import Portfolio from "@/components/heritage/HeritageFreeNotice";
import React from "react";
// Cinquième section : « L'engagement HERITAGE » (décision PO : accès gratuit au
// Builder avant tout achat). Elle remplace « Nos offres » (HeritageOffers,
// conservée dans le dépôt) ; le Pricing Reeni reste utilisé par les autres pages.
import Pricing from "@/components/heritage/HeritageCommitment";
// Sixième section : FAQ HERITAGE « Vos questions, nos réponses » à la place de
// « Blog and news » ; le composant Reeni d'origine reste utilisé par les autres pages.
import Blogs from "@/components/heritage/HeritageFaq";
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
