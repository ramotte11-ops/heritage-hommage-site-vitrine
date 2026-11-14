import { NextResponse } from "next/server";

// Site vitrine HERITAGE — pages réellement publiées.
//
// Le dépôt contient encore les ~60 pages de démonstration du template Reeni
// (index-02 à index-22, blog, projets, services, about, contact…). En
// production, seules les pages HERITAGE répondent ; toute autre adresse
// renvoie 404. En développement (`next dev`), rien n'est filtré : les
// démos restent consultables comme références.
//
// Ce filtre n'est PAS la protection d'accès : pendant la phase privée,
// celle-ci est assurée en amont par l'Edge Function Netlify
// (netlify/edge-functions/private-access.js), avant même ce fichier.

const PUBLISHED = [/^\/$/, /^\/informations\/[a-z-]+\/?$/];

export function middleware(request) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === "/index-09" || pathname === "/index-09/") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  if (PUBLISHED.some((rule) => rule.test(pathname))) return NextResponse.next();

  return new NextResponse("Page introuvable.", {
    status: 404,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  // Ressources techniques et fichiers statiques exclus (/_next, /assets,
  // fichiers avec extension) : ils servent les pages publiées.
  matcher: ["/((?!_next/|assets/|.*\\.[A-Za-z0-9]+$).*)"],
};
