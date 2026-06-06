import FranceMap from "@/components/FranceMap";
import Link from "next/link";

export default function TerriersPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ backgroundColor: "#1A2562", minHeight: "32vh" }} className="flex flex-col items-center justify-center text-center px-6 py-14 text-white">
        <span style={{ fontSize: 52 }}>🏡</span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: 4, color: "#F5C218", marginTop: 12 }}>
          TERRIERS LOCAUX
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 520, lineHeight: 1.75, marginTop: 12, fontSize: "1.05rem" }}>
          Vous ne rejoignez pas une plateforme. Vous rejoignez <strong style={{ color: "#F5C218" }}>votre communauté locale</strong>.<br />
          Trouvez votre Terrier sur la carte et entrez dans votre réseau de proximité.
        </p>
      </section>

      {/* ═══ CARTE ═══ */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <FranceMap />
        </div>
      </section>

      {/* ═══ C'EST QUOI UN TERRIER ? ═══ */}
      <section style={{ backgroundColor: "#f0ede4" }} className="py-14 px-6">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold" style={{ color: "var(--navy)" }}>C&apos;est quoi un Terrier ?</h2>
          <p style={{ color: "var(--navy)", opacity: 0.7, maxWidth: 560, lineHeight: 1.8 }}>
            Un Terrier, c&apos;est la cellule vivante de NIGLOMODE. Un espace local où les habitants d&apos;une même ville ou d&apos;un même territoire se retrouvent pour s&apos;entraider, partager leurs savoir-faire, lancer des projets et organiser des événements.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mt-4">
            {[
              { icon: "🤝", titre: "Entraide locale", desc: "Demandes et offres d'aide entre voisins" },
              { icon: "🚀", titre: "Projets communs", desc: "Chantiers, jardins partagés, initiatives" },
              { icon: "📅", titre: "Événements", desc: "Ateliers, repairs cafés, trocs, rencontres" },
              { icon: "💬", titre: "Forum local", desc: "Discussions et actualités de votre territoire" },
            ].map((item) => (
              <div key={item.titre} className="rounded-xl p-5 flex flex-col items-center text-center gap-2"
                style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
                <span style={{ fontSize: 32 }}>{item.icon}</span>
                <p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{item.titre}</p>
                <p className="text-xs opacity-60" style={{ color: "var(--navy)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA CRÉER UN TERRIER ═══ */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-14 px-6 text-white text-center">
        <h2 className="text-xl font-bold mb-3" style={{ color: "#F5C218" }}>Votre ville n&apos;a pas encore de Terrier ?</h2>
        <p className="opacity-70 mb-6 max-w-md mx-auto">
          Soyez le fondateur. Invitez vos voisins, lancez les premières annonces et donnez vie à votre communauté locale.
        </p>
        <button className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#F5C218", color: "#1A2562" }}>
          Créer un nouveau Terrier
        </button>
      </section>

      <div className="text-center py-8" style={{ backgroundColor: "var(--cream)" }}>
        <Link href="/" className="text-sm opacity-50 hover:opacity-80 transition-opacity" style={{ color: "var(--navy)" }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
