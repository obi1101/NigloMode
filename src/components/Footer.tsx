import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "var(--navy)", color: "rgba(255,255,255,0.65)" }}
      className="text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-base mb-3" style={{ color: "var(--gold)" }}>
            NIGLOMODE
          </h3>
          <p className="leading-relaxed">
            Plateforme communautaire dédiée à l&apos;entraide, aux savoir-faire
            et aux solutions concrètes.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Sections</h3>
          <ul className="space-y-1.5">
            {[
              ["Entraide", "/entraide"],
              ["Savoir-faire", "/savoir-faire-transmission"],
              ["Réparer au lieu de jeter", "/reparer"],
              ["Donner au lieu de jeter", "/donner"],
              ["Circuits courts", "/circuits-courts"],
              ["Forum", "/forum"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Communauté</h3>
          <ul className="space-y-1.5">
            {[
              ["Adhésion du Terrier", "/adhesion"],
              ["Annuaire", "/annuaire"],
              ["Projets", "/initiatives-projets"],
              ["Mentions légales", "/mentions-legales"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="border-t px-4 py-4 text-center text-xs"
        style={{ borderColor: "rgba(255,255,255,0.12)" }}
      >
        © {new Date().getFullYear()} NIGLOMODE — Indépendant de la boutique Niglo Ni Vis
      </div>
    </footer>
  );
}
