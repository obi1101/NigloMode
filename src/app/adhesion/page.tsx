import Link from "next/link";

const tiers = [
  {
    icon: "🌱",
    nom: "Niglo Curieux",
    prix: "Gratuit",
    sous: "Pour commencer",
    couleur: "#4F6B47",
    avantages: [
      "Consulter toutes les ressources publiques",
      "Participer au forum",
      "Accéder aux fiches savoir-faire",
      "Suivre les Terriers proches",
    ],
    cta: "Créer un compte",
    href: "/inscription",
    actif: false,
  },
  {
    icon: "🦔",
    nom: "Niglo Actif",
    prix: "5 €/mois",
    sous: "Le plus populaire",
    couleur: "#D8B56A",
    avantages: [
      "Tout du Niglo Curieux",
      "Publier des annonces & ressources",
      "Proposer des échanges et services",
      "Badge membre actif",
      "Accès aux événements du Terrier",
    ],
    cta: "Rejoindre",
    href: "/inscription",
    actif: true,
  },
  {
    icon: "🏡",
    nom: "Niglo Référent",
    prix: "15 €/mois",
    sous: "Pour les engagés",
    couleur: "#6B4F34",
    avantages: [
      "Tout du Niglo Actif",
      "Créer et gérer un Terrier",
      "Organiser des événements locaux",
      "Accès à l'annuaire complet",
      "Mise en avant des initiatives",
      "Support prioritaire",
    ],
    cta: "Devenir Référent",
    href: "/inscription",
    actif: false,
  },
];

const lucioles = [
  { top: "12%", left: "7%",  r: 3 }, { top: "30%", left: "87%", r: 2 },
  { top: "62%", left: "5%",  r: 2 }, { top: "75%", left: "92%", r: 3 },
  { top: "20%", left: "68%", r: 2 }, { top: "48%", left: "94%", r: 2 },
];

export default function AdhesionPage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden px-6 py-20 text-center"
      >
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.65 }} />
        ))}
        <div className="relative z-10 max-w-2xl mx-auto">
          <span style={{ fontSize: 52 }}>🏡</span>
          <h1 className="text-3xl font-extrabold mt-4" style={{ color: "#D8B56A", letterSpacing: 2 }}>ADHÉSION DU TERRIER</h1>
          <p className="mt-3 leading-relaxed" style={{ color: "rgba(245,239,216,0.75)" }}>
            Choisir NIGLOMODE c&apos;est rejoindre une communauté d&apos;humains qui préfèrent agir ensemble plutôt que seuls.
          </p>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 20 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Un Terrier solide se bâtit à plusieurs, jamais tout seul.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ TIERS ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-extrabold text-center mb-10" style={{ color: "#1E3524" }}>Choisis ton niveau d&apos;engagement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div key={t.nom}
                className="rounded-3xl p-7 flex flex-col gap-4"
                style={{
                  backgroundColor: t.actif ? "#1E3524" : "#EDE4C4",
                  border: t.actif ? `2px solid ${t.couleur}` : "1px solid #C4B898",
                  boxShadow: t.actif ? "0 8px 32px rgba(30,53,36,0.25)" : "none",
                }}>
                <div className="text-center">
                  <span style={{ fontSize: 40 }}>{t.icon}</span>
                  {t.actif && (
                    <div className="mt-2 mb-1">
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                        ⭐ {t.sous}
                      </span>
                    </div>
                  )}
                  {!t.actif && <p className="text-xs mt-1 opacity-50" style={{ color: "#1E3524" }}>{t.sous}</p>}
                  <h3 className="font-extrabold text-lg mt-2" style={{ color: t.actif ? "#D8B56A" : "#1E3524" }}>{t.nom}</h3>
                  <p className="text-2xl font-extrabold mt-1" style={{ color: t.actif ? "#ffffff" : t.couleur }}>{t.prix}</p>
                </div>
                <ul className="flex flex-col gap-2 text-sm flex-1">
                  {t.avantages.map((a) => (
                    <li key={a} className="flex items-start gap-2">
                      <span style={{ color: t.actif ? "#D8B56A" : "#4F6B47", flexShrink: 0 }}>✓</span>
                      <span style={{ color: t.actif ? "rgba(245,239,216,0.85)" : "#1E3524" }}>{a}</span>
                    </li>
                  ))}
                </ul>
                <Link href={t.href}
                  className="block text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-85 mt-2"
                  style={{
                    backgroundColor: t.actif ? "#D8B56A" : "rgba(30,53,36,0.08)",
                    color: t.actif ? "#1E3524" : "#1E3524",
                    border: t.actif ? "none" : "1px solid #C4B898",
                  }}>
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-xs mt-8 opacity-60" style={{ color: "#1E3524" }}>
            Sans engagement · Résiliable à tout moment · Paiement sécurisé
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section style={{ backgroundColor: "#EDE4C4" }} className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-extrabold mb-6 text-center" style={{ color: "#1E3524" }}>Questions fréquentes</h2>
          <div className="flex flex-col gap-4">
            {[
              ["À quoi sert l'abonnement ?", "Il permet à NIGLOMODE de rester indépendant, sans publicité. 100% des fonds sont réinvestis dans la plateforme et les Terriers locaux."],
              ["Puis-je annuler à tout moment ?", "Oui, sans condition ni frais. La résiliation est immédiate depuis ton profil."],
              ["Y a-t-il un abonnement familial ?", "Pas encore — c'est dans notre feuille de route. Inscris-toi en Niglo Actif pour être notifié."],
            ].map(([q, r]) => (
              <div key={q as string} className="rounded-2xl p-5" style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                <p className="font-bold text-sm mb-1.5" style={{ color: "#1E3524" }}>{q}</p>
                <p className="text-sm" style={{ color: "#4F6B47" }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
