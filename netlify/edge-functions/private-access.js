// HERITAGE — accès privé du site vitrine (phase d'essais).
//
// Authentification HTTP « Basic » appliquée par Netlify AVANT toute page,
// image, script ou fichier statique (déclarée sur "/*" dans netlify.toml) :
// aucune adresse directe ne la contourne. Disponible sur l'offre gratuite
// (la protection par mot de passe intégrée de Netlify est réservée à Pro).
//
// Identifiants : variables d'environnement du projet Netlify, jamais dans
// le dépôt :
//   HERITAGE_PRIVATE_USER, HERITAGE_PRIVATE_PASSWORD
// Si l'une manque, le site reste FERMÉ (503) : pas d'ouverture par oubli.
// Pour ouvrir le site au public le moment venu : retirer la déclaration
// [[edge_functions]] de netlify.toml (décision QG/PO).

const REALM = "HERITAGE Hommage - acces prive";

function readEnv(name) {
  try {
    // Runtime Netlify (Deno).
    if (typeof Netlify !== "undefined" && Netlify.env) return Netlify.env.get(name);
  } catch {
    /* ignore */
  }
  return globalThis.process?.env?.[name];
}

// Comparaison à durée constante (longueurs comprises).
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  const len = Math.max(x.length, y.length);
  for (let i = 0; i < len; i += 1) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function decodeBasic(header) {
  if (!header || !/^Basic\s+/i.test(header)) return null;
  try {
    const raw = atob(header.replace(/^Basic\s+/i, "").trim());
    const bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    const text = new TextDecoder().decode(bytes);
    const sep = text.indexOf(":");
    if (sep < 0) return null;
    return { user: text.slice(0, sep), password: text.slice(sep + 1) };
  } catch {
    return null;
  }
}

const PRIVATE_HEADERS = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
};

export default async function privateAccess(request, context) {
  const expectedUser = readEnv("HERITAGE_PRIVATE_USER");
  const expectedPassword = readEnv("HERITAGE_PRIVATE_PASSWORD");

  if (!expectedUser || !expectedPassword) {
    return new Response("Site en préparation.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", ...PRIVATE_HEADERS },
    });
  }

  const credentials = decodeBasic(request.headers.get("authorization"));
  const userOk = credentials ? safeEqual(credentials.user, expectedUser) : false;
  const passwordOk = credentials ? safeEqual(credentials.password, expectedPassword) : false;

  if (!userOk || !passwordOk) {
    return new Response("Accès réservé.", {
      status: 401,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
        ...PRIVATE_HEADERS,
      },
    });
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(PRIVATE_HEADERS)) headers.set(key, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
