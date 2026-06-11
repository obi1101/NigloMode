import FranceMap from "@/components/FranceMap";
import Link from "next/link";

const lucioles = [
  { top: "10%", left: "7%",  r: 3 }, { top: "25%", left: "92%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "89%", r: 3 },
  { top: "16%", left: "74%", r: 2 }, { top: "40%", left: "96%", r: 2 },
  { top: "82%", left: "18%", r: 2 }, { top: "6%",  left: "50%", r: 3 },
];

const ceQuUnTerrier = [
  { icon: "🤝", titre: "Entraide locale",        desc: "Demandes et offres d'aide entre voisins et habitants du même territoire." },
  { icon: "🚀", titre: "Projets collectifs",      desc: "Chantiers participatifs, jardins partagés, initiatives locales et actions communes." },
  { icon: "📅", titre: "Événements de proximité", desc: "Ateliers, repairs cafés, trocs, marchés, rencontres et fêtes de quartier." },
  { icon: "💬", titre: "Discussions du territoire", desc: "Forum local, actualités, questions et réponses entre habitants." },
  { icon: "🌱", titre: "Initiatives citoyennes",  desc: "Projets d'autonomie, économie locale, mobilisation collective." },
  { icon: "♻️", titre: "Ressources et partage",   desc: "Objets à donner, matériaux récupérés, outils en commun, savoir-faire partagés." },
];

export default function TerriersPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative text-white overflow-hidden flex flex-col items-center justify-center text-center px-6 py-16"
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", minHeight: "36vh" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lucioles.map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.4,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.18)`,
            }} />
          ))}
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
          <span style={{ fontSize: 52 }}>🏡</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: 4, color: "#D8B56A" }}>
            TERRIERS LOCAUX
          </h1>
          <p style={{ color: "rgba(255,255,255,0.72)", maxWidth: 520, lineHeight: 1.8 }}>
            Vous ne rejoignez pas une plateforme. Vous rejoignez{" "}
            <strong style={{ color: "#D8B56A" }}>votre communauté locale</strong>.<br />
            Trouvez votre Terrier sur la carte et entrez dans votre réseau de proximité.
          </p>
        </div>
      </section>

      {/* ═══ CARTE ═══ */}
      <section className="py-14 px-6"
        style={{ background: "linear-gradient(180deg, #0a1508 0%, #162a1e 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden p-4" style={{ backgroundColor: "#F5EFD8" }}>
            <FranceMap />
          </div>
        </div>
      </section>

      {/* ═══ C'EST QUOI UN TERRIER ? ═══ */}
      <section className="py-14 px-6" style={{ backgroundColor: "#E9DFC8" }}>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: "#1E3524" }}>Un Terrier, c&apos;est :</h2>
            <p style={{ color: "#3a2a1a", opacity: 0.7, maxWidth: 560, lineHeight: 1.8, margin: "0 auto" }}>
              La cellule vivante de NIGLOMODE. Un espace local où les habitants d&apos;un même territoire
              se retrouvent pour s&apos;entraider, partager leurs savoir-faire, lancer des projets
              et construire ensemble des solutions concrètes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {ceQuUnTerrier.map((item) => (
              <div key={item.titre} className="rounded-2xl p-5 flex flex-col items-center text-center gap-3"
                style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", boxShadow: "0 2px 12px rgba(30,53,36,0.08)" }}>
                <span style={{ fontSize: 36 }}>{item.icon}</span>
                <p className="font-bold text-sm" style={{ color: "#1E3524" }}>{item.titre}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a", opacity: 0.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA CRÉER UN TERRIER ═══ */}
      <section className="py-16 px-6 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #060e08 0%, #1E3524 45%, #0a1508 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lucioles.slice(0, 5).map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.3,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.15)`,
            }} />
          ))}
        </div>
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-6">
          <span style={{ fontSize: 40 }}>🌱</span>
          <h2 className="text-2xl font-bold" style={{ color: "#D8B56A" }}>
            Votre ville n&apos;a pas encore de Terrier ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.68)", lineHeight: 1.85 }}>
            Soyez parmi les premiers à rassembler les habitants de votre territoire.
            Lancez les premières initiatives, créez du lien localement et donnez vie
            à votre communauté. Un Terrier commence toujours par une seule personne
            qui décide de rassembler les autres.
          </p>
          <Link href="/inscription"
            className="px-10 py-3.5 rounded-full font-bold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524", boxShadow: "0 4px 22px rgba(216,181,106,0.30)" }}>
            🏡 Créer un Terrier
          </Link>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.30)" }}>
            Gratuit · Sans engagement · Visible dans votre région
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="text-center py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1E3524 0%, #060e08 100%)" }}>
        <p className="text-xs mb-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.6 }}>✦ &nbsp; 🌿 &nbsp; ✦ &nbsp; 🦔 &nbsp; ✦ &nbsp; 🌿 &nbsp; ✦</p>
        <Link href="/" className="text-sm transition-opacity hover:opacity-90" style={{ color: "#D8B56A", opacity: 0.65 }}>
          ← Retour à l&apos;accueil
        </Link>
        <p className="text-xs mt-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.4 }}>✦ &nbsp; 🍃 &nbsp; ✦ &nbsp; 🍃 &nbsp; ✦</p>
      </div>
    </>
  );
}
