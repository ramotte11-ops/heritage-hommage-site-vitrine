import Image from "next/image";
import styles from "./HeritageMemories.module.scss";

// Section « Une vie, mille souvenirs » — transformation HERITAGE de la section
// Reeni « Latest Service » (components/common/Services3.jsx, laissé intact
// pour les 5 autres pages qui l'utilisent). Même structure, mêmes classes Reeni
// (cartes, animations d'apparition, effet de survol, image en zoom) ; seuls les
// contenus, l'image et l'accent de couleur changent.
//
// Image : asset composé validé par la PO (V2) — album HERITAGE au premier plan,
// disque anthracite et cercles champagne recréés aux repères de l'image Reeni,
// même format (1134 x 1176) que l'image d'origine.

const MEMORIES = [
  {
    title: "Raconter son histoire",
    description:
      "Les moments marquants, les rencontres et les petits détails qui ont rendu cette vie unique.",
  },
  {
    title: "Retrouver les instants précieux",
    description:
      "Des photographies pour retrouver un sourire, un lieu, un instant et les émotions qui l’accompagnent.",
  },
  {
    title: "Faire vivre les souvenirs ensemble",
    description:
      "Les mots de la famille et des amis viennent enrichir l’hommage de leurs propres souvenirs.",
  },
];

export default function HeritageMemories() {
  return (
    <section
      className={`latest-service-area tmp-section-gapTop ${styles.memories}`}
      id="service"
    >
      <div className="container">
        <div className="section-head mb--50">
          <div className="section-sub-title center-title tmp-scroll-trigger tmp-fade-in animation-order-1">
            <span className="subtitle">Au cœur de chaque hommage</span>
          </div>
          <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
            Une vie, mille souvenirs.
          </h2>
          <p className="description section-sm tmp-scroll-trigger tmp-fade-in animation-order-3">
            Une histoire ne se résume pas à quelques dates. Elle se raconte à
            travers les souvenirs, les images et les mots de ceux qui ont partagé
            cette vie.
          </p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            {MEMORIES.map((item, index) => (
              <div
                key={item.title}
                className={`service-card-v2 tmponhover tmp-scroll-trigger tmp-fade-in animation-order-${
                  index + 1
                }`}
              >
                <h3 className="service-card-num">
                  <span>{`0${index + 1}.`}</span>
                  {item.title}
                </h3>
                <p className="service-para">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            <div className="service-card-user-image">
              <Image
                alt="Album de famille ancien ouvert sur des photographies de moments partagés"
                src="/assets/images/heritage/album-memoires-v2.png"
                width={1134}
                height={1176}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
