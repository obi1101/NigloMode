import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#09120a", color: "rgba(255,255,255,0.60)" }} className="text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

        {/* Colonne 1 — À propos */}
        <div>
          <h3 className="font-extrabold text-base mb-3 tracking-wider" style={{ color: "#D8B56A" }}>NIGLOMODE</h3>
          <p className="leading-relaxed text-xs mb-4" style={{ color: "rgba(245,239,216,0.55)" }}>
            Plateforme communautaire dédiée à l&apos;entraide, aux savoir-faire et aux solutions concrètes. Moins de bruit. Plus de solutions.
          </p>
          <div className="flex flex-col gap-1.5">
            {[["Terriers", "/terriers"], ["Forum", "/forum"], ["Annuaire", "/annuaire"]].map(([l, h]) => (
              <Link key={h} href={h} className="text-xs hover:text-white transition-colors" style={{ color: "rgba(245,239,216,0.5)" }}>→ {l}</Link>
            ))}
          </div>
        </div>

        {/* Colonne 2 — Sections principales */}
        <div>
          <h3 className="font-bold text-white mb-3">Sections</h3>
          <ul className="space-y-2">
            {[
              ["🤲 Entraide",                    "/entraide"],
              ["🛒 Circuits Courts",             "/circuits-courts"],
              ["🌱 Produire & Cultiver",          "/produire-cultiver"],
              ["♻️ Les 3R du teRRieR",            "/reemploi-ressources"],
              ["🤝 Initiatives & Projets",        "/initiatives-projets"],
              ["🛠️ Savoir-faire & Transmission",  "/savoir-faire-transmission"],
              ["📋 Ressources Administratives",   "/ressources-administratives"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 — Services */}
        <div>
          <h3 className="font-bold text-white mb-3">Services</h3>
          <ul className="space-y-2">
            {[
              ["🔧 Réparer au lieu de jeter", "/reparer"],
              ["🎁 Donner au lieu de jeter",  "/donner"],
              ["💬 Messagerie du Terrier",    "/messagerie"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
            <li className="pt-2">
              <p className="text-xs font-semibold mb-1.5" style={{ color: "rgba(245,239,216,0.4)" }}>Compte</p>
            </li>
            {[
              ["Créer un compte",  "/inscription"],
              ["Se connecter",    "/connexion"],
              ["Mon profil",      "/profil"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 — Communauté & Infos */}
        <div>
          <h3 className="font-bold text-white mb-3">Communauté</h3>
          <ul className="space-y-2">
            {[
              ["Adhésion au Terrier",  "/adhesion"],
              ["Contact",             "/contact"],
              ["Mentions légales",    "/mentions-legales"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 5 — Professionnels */}
        <div>
          <h3 className="font-bold mb-3" style={{ color: "#D8B56A" }}>🏷️ Professionnels</h3>
          <ul className="space-y-2">
            {[
              ["Espace Pro",               "/espace-pro"],
              ["Référencer mon activité",  "/espace-pro#formulaire"],
              ["Tarifs professionnels",    "/espace-pro#tarifs"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="text-xs hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.30)" }}>
        © {new Date().getFullYear()} NIGLOMODE — Indépendant de la boutique Niglo Ni Vis
      </div>
    </footer>
  );
}
