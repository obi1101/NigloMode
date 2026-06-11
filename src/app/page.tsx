"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FranceMapCompact from "@/components/FranceMapCompact";

const sections = [
  {
    title: "Entraide",
    href: "/entraide",
    icon: "🤝",
    color: "#1E3524",
    accent: "#D8B56A",
    desc: "Demander de l'aide, proposer un coup de main, partager des compétences et créer du lien localement.",
    contribuer: "➕ Proposer une annonce",
  },
  {
    title: "Circuits Courts & Ressources Locales",
    href: "/circuits-courts",
    icon: "🌾",
    color: "#2D5016",
    accent: "#a8e063",
    desc: "Produits locaux, producteurs, artisans, services, échanges et ressources de proximité.",
    contribuer: "➕ Ajouter une ressource",
  },
  {
    title: "Produire & Cultiver",
    href: "/produire-cultiver",
    icon: "🌱",
    color: "#2D6A4F",
    accent: "#b7e4c7",
    desc: "Potager, verger, élevage familial, compost, eau, fabrication utile et transmission des savoirs du vivant.",
    contribuer: "➕ Partager un savoir",
  },
  {
    title: "Réemploi & Ressources",
    href: "/reemploi-ressources",
    icon: "♻️",
    color: "#4F3A10",
    accent: "#D8B56A",
    desc: "Réparer, récupérer, détourner, donner et valoriser ce qui existe déjà.",
    contribuer: "➕ Proposer un objet",
  },
  {
    title: "Initiatives & Projets",
    href: "/initiatives-projets",
    icon: "🏗️",
    color: "#6B4F34",
    accent: "#f4a460",
    desc: "Associations, projets citoyens, chantiers participatifs, événements locaux et actions collectives.",
    contribuer: "➕ Soumettre un projet",
  },
  {
    title: "Savoir-faire & Transmission",
    href: "/savoir-faire-transmission",
    icon: "🎓",
    color: "#4F6B47",
    accent: "#b7e4c7",
    desc: "Tutoriels, artisanat, métiers, retours d'expérience, questions/réponses et partage de connaissances.",
    contribuer: "➕ Publier un tutoriel",
  },
  {
    title: "Ressources administratives",
    href: "/ressources-administratives",
    icon: "📋",
    color: "#6B4F34",
    accent: "#D8B56A",
    desc: "Création d'association, modèles de statuts, démarches, subventions, documents utiles et guides pratiques.",
    contribuer: "➕ Partager un document",
  },
];

const valeurs = [
  { icon: "♡", title: "ENTRAIDE" },
  { icon: "✦", title: "TRANSMISSION" },
  { icon: "↻", title: "RÉEMPLOI" },
  { icon: "❧", title: "AUTONOMIE" },
  { icon: "⁂", title: "COMMUNAUTÉ" },
];

const vieTerriers = [
  { n: 38, label: "échanges réalisés", icon: "🤝" },
  { n: 24, label: "objets sauvés du rebut", icon: "♻️" },
  { n: 15, label: "connaissances partagées", icon: "📚" },
  { n: 6,  label: "projets en cours", icon: "🚀" },
  { n: 12, label: "nouveaux membres cette semaine", icon: "🦔" },
];


const tiers = [
  {
    nom: "Promeneur",
    emoji: "🚶",
    prix: "Gratuit",
    desc: "Découvre, explore et consulte librement.",
    items: [
      "Parcourir toutes les sections",
      "Lire les contenus publics",
      "Explorer les Terriers",
      "Consulter les ressources ouvertes",
    ],
    highlight: false,
  },
  {
    nom: "Habitant du Terrier",
    emoji: "🏡",
    prix: "2 €/mois",
    desc: "Participe, publie et contribue à la vie du Terrier.",
    items: [
      "Profil personnel",
      "Publier du contenu",
      "Participer aux échanges",
      "Répondre aux annonces",
      "Créer des fiches",
      "Contribuer aux sections",
    ],
    highlight: true,
  },
  {
    nom: "Bâtisseur du Terrier",
    emoji: "🏗️",
    prix: "5 €/mois",
    desc: "Construis Niglomode avec nous.",
    items: [
      "Toutes les fonctionnalités",
      "Mise en avant des projets",
      "Création d'initiatives locales",
      "Badge de soutien",
      "Participation au développement",
    ],
    highlight: false,
  },
];

const lucioles = [
  { top: "12%", left: "8%", r: 3 }, { top: "28%", left: "91%", r: 2 },
  { top: "55%", left: "4%", r: 2 }, { top: "72%", left: "88%", r: 3 },
  { top: "18%", left: "74%", r: 2 }, { top: "40%", left: "96%", r: 2 },
  { top: "82%", left: "18%", r: 2 }, { top: "6%",  left: "50%", r: 3 },
  { top: "90%", left: "63%", r: 2 }, { top: "34%", left: "2%",  r: 2 },
];

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: "100vh" }}>
        <div className="absolute inset-0"
          style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.22)" }} />
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-16 gap-6" style={{ minHeight: "95vh" }}>
          <Image src="/logo.png" alt="NIGLOMODE" width={330} height={330} priority
            className="rounded-full bg-white p-2"
            style={{ boxShadow: "0 0 0 5px #c8a020, 0 0 45px rgba(200,160,30,0.28), 0 28px 65px rgba(0,0,0,0.65)" }} />
          <h1 style={{ color: "#f0e0a0", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 600, lineHeight: 1.2, textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}>
            Moins de bruit. Plus de solutions.
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", maxWidth: 340 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(200,160,30,0.40)" }} />
            <span style={{ color: "#c8a020", fontSize: 20 }}>🌿</span>
            <div style={{ flex: 1, height: 1, background: "rgba(200,160,30,0.40)" }} />
          </div>
          <p style={{ color: "rgba(255,255,255,0.70)", fontSize: "1rem", maxWidth: 480, lineHeight: 1.8 }}>
            Entraide, circuits courts, production locale, réemploi,<br />
            initiatives citoyennes et transmission des savoir-faire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link href="/inscription"
              className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white", boxShadow: "0 4px 22px rgba(45,106,79,0.40)" }}>
              Rejoindre la communauté
            </Link>
            <Link href="/#sections"
              className="px-8 py-3 rounded-full font-medium text-base transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.85)" }}>
              Découvrir les sections
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ LE TERRIER COMMENCE PRÈS DE CHEZ VOUS ═══ */}
      <section className="py-16 px-4 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 45%, #0a1508 100%)" }}>

        {/* Lucioles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lucioles.map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.4,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.18)`,
            }} />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-8 text-center">
          <span style={{ fontSize: 48 }}>🏡</span>
          <h2 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontWeight: 800, color: "#D8B56A", lineHeight: 1.25 }}>
            Le Terrier commence près de chez vous
          </h2>
          <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.85, maxWidth: 520 }}>
            Vous ne rejoignez pas une plateforme. Vous rejoignez{" "}
            <strong style={{ color: "#D8B56A" }}>votre communauté locale</strong>.
            Chaque Terrier rassemble les habitants d&apos;un même territoire autour de l&apos;entraide,
            des projets et des savoir-faire de proximité.
          </p>

          {/* Carte de France réelle */}
          <div className="w-full rounded-2xl overflow-hidden p-4" style={{ backgroundColor: "#F5EFD8", maxWidth: 480, margin: "0 auto" }}>
            <FranceMapCompact />
          </div>

          {/* Valeurs */}
          <div className="flex flex-wrap justify-center gap-2">
            {valeurs.map((v) => (
              <div key={v.title} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.10)", border: "1px solid rgba(216,181,106,0.25)", color: "#D8B56A" }}>
                <span style={{ opacity: 0.75 }}>{v.icon}</span>
                <span>{v.title}</span>
              </div>
            ))}
          </div>

          <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
            Chacun peut contribuer, partager une connaissance, proposer une fiche ou suggérer un nouveau thème.
            Vous n&apos;êtes pas seulement lecteur — vous participez à la construction du Terrier.
          </p>

          <Link href="/terriers"
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            🗺️ Voir la carte des Terriers
          </Link>
        </div>
      </section>

      {/* ═══ GRILLE 7 SECTIONS ═══ */}
      <section id="sections" className="py-14 px-4" style={{ backgroundColor: "#E9DFC8" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "#1E3524" }}>
            Explorez le Terrier
          </h2>
          <p className="text-center text-sm mb-10" style={{ color: "#1E3524", opacity: 0.5 }}>
            Chaque section est un espace ouvert. Consultez, contribuez, proposez.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => (
              <div key={s.href}
                className="rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-shadow hover:shadow-lg"
                style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", boxShadow: "0 2px 16px rgba(30,53,36,0.08)" }}
                onClick={() => router.push(s.href)}>
                <div className="px-5 pt-5 pb-3 flex items-center gap-3"
                  style={{ borderBottom: `3px solid ${s.accent}` }}>
                  <span style={{ fontSize: 32 }}>{s.icon}</span>
                  <h3 className="font-extrabold text-sm leading-snug" style={{ color: s.color }}>{s.title}</h3>
                </div>
                <div className="px-5 py-4 flex-1">
                  <p className="text-sm leading-relaxed" style={{ color: "#3a2a1a", opacity: 0.72 }}>{s.desc}</p>
                </div>
                <div className="px-5 pb-5 flex items-center gap-2">
                  <span className="flex-1 text-center py-2 rounded-full text-xs font-bold pointer-events-none"
                    style={{ backgroundColor: s.color, color: "white" }}>
                    Découvrir →
                  </span>
                  <Link href={s.href}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-2 rounded-full text-xs font-semibold transition-colors hover:opacity-80 text-center"
                    style={{ backgroundColor: "#E9DFC8", color: s.color, border: `1px dashed ${s.accent}` }}>
                    {s.contribuer}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LA VIE DANS LES TERRIERS ═══ */}
      <section className="py-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0a1508 0%, #1E3524 50%, #0f1e13 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lucioles.slice(0, 6).map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.3,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.15)`,
            }} />
          ))}
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#D8B56A" }}>La vie dans les Terriers</h2>
          <p className="text-sm mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>Ce qui se passe en ce moment dans notre réseau</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {vieTerriers.map((v) => (
              <div key={v.label} className="flex flex-col items-center gap-2 p-5 rounded-2xl"
                style={{ backgroundColor: "rgba(216,181,106,0.08)", border: "1px solid rgba(216,181,106,0.18)" }}>
                <span style={{ fontSize: 28 }}>{v.icon}</span>
                <p className="text-3xl font-extrabold" style={{ color: "#D8B56A" }}>{v.n}</p>
                <p className="text-xs text-center leading-snug" style={{ color: "rgba(255,255,255,0.55)" }}>{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADHÉSIONS ═══ */}
      <section className="py-16 px-4 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 55%, #0a1508 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {lucioles.slice(4).map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.25,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.12)`,
            }} />
          ))}
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Rejoins l&apos;aventure</h2>
          <p className="mb-10 max-w-xl mx-auto text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
            NIGLOMODE est ouvert à tous. Une adhésion symbolique permet de soutenir le projet
            et de participer pleinement à la vie des Terriers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div key={tier.nom} className="rounded-2xl p-6 text-left flex flex-col gap-4"
                style={{
                  backgroundColor: tier.highlight ? "rgba(233,223,200,0.12)" : "rgba(255,255,255,0.05)",
                  border: tier.highlight ? "2px solid #D8B56A" : "1px solid rgba(255,255,255,0.12)",
                }}>
                <div>
                  <p className="text-2xl mb-1">{tier.emoji}</p>
                  <h3 className="font-bold text-base text-white">{tier.nom}</h3>
                  <p className="text-2xl font-extrabold mt-1" style={{ color: "#D8B56A" }}>{tier.prix}</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{tier.desc}</p>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {tier.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: "rgba(255,255,255,0.78)" }}>
                      <span style={{ color: "#4F6B47", flexShrink: 0 }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <Link href="/inscription"
                  className="mt-auto text-center py-2.5 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: tier.highlight ? "#D8B56A" : "rgba(255,255,255,0.10)",
                    color: tier.highlight ? "#1E3524" : "rgba(255,255,255,0.85)",
                    border: tier.highlight ? "none" : "1px solid rgba(255,255,255,0.18)",
                  }}>
                  {tier.prix === "Gratuit" ? "Commencer →" : "Rejoindre →"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <div className="text-center py-10 relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1E3524 0%, #060e08 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { top: "20%", left: "15%", r: 2 }, { top: "40%", left: "80%", r: 2 },
            { top: "65%", left: "30%", r: 2 }, { top: "25%", left: "60%", r: 2 },
            { top: "75%", left: "70%", r: 2 },
          ].map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left, width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.3,
              boxShadow: "0 0 6px 2px rgba(216,181,106,0.15)",
            }} />
          ))}
        </div>
        <p className="text-xs mb-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.6 }}>✦ &nbsp; 🌿 &nbsp; ✦ &nbsp; 🦔 &nbsp; ✦ &nbsp; 🌿 &nbsp; ✦</p>
        <p className="text-sm relative z-10" style={{ color: "#D8B56A", opacity: 0.65 }}>
          NIGLOMODE — Terrier communautaire vivant
        </p>
        <p className="text-xs mt-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.4 }}>✦ &nbsp; 🍃 &nbsp; ✦ &nbsp; 🍃 &nbsp; ✦</p>
      </div>
    </>
  );
}
