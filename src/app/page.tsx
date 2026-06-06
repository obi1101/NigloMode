import Link from "next/link";
import Image from "next/image";

const sections = [
  { title: "Entraide", href: "/entraide", icon: "🤝", desc: "Demander ou proposer de l'aide, échanger des services, se mettre en relation localement." },
  { title: "Bons Tuyaux", href: "/bons-tuyaux", icon: "💡", desc: "Astuces pratiques, économies du quotidien, dépannage et retours d'expérience." },
  { title: "Préventif", href: "/preventif", icon: "🛡️", desc: "Santé préventive, sécurité, préparation aux imprévus et gestion des risques." },
  { title: "Constructif", href: "/constructif", icon: "🏗️", desc: "Initiatives citoyennes, chantiers participatifs et projets d'embellissement local." },
  { title: "Associatif", href: "/associatif", icon: "🏛️", desc: "Créer ou gérer une association, trouver des bénévoles, organiser des événements." },
  { title: "Ressources administratives", href: "/ressources-administratives", icon: "📂", desc: "Modèles de statuts, guides pratiques, subventions et démarches simplifiées." },
  { title: "Savoir-faire", href: "/savoir-faire", icon: "🔧", desc: "Artisanat, jardinage, mécanique, informatique, construction et transmission des métiers." },
  { title: "Réparer au lieu de jeter", href: "/reparer", icon: "🔨", desc: "Tutoriels de réparation, diagnostic de panne, pièces détachées et réemploi." },
  { title: "Donner au lieu de jeter", href: "/donner", icon: "🎁", desc: "Dons gratuits d'objets, meubles, outils, vêtements et récupération avant déchetterie." },
  { title: "Récup & Valorisation", href: "/recup-valorisation", icon: "♻️", desc: "Upcycling, recyclage créatif, transformation d'objets et ateliers collaboratifs." },
  { title: "Circuits Courts", href: "/circuits-courts", icon: "🌾", desc: "Producteurs locaux, artisans, coopératives et cartographie des acteurs." },
  { title: "Autonomie", href: "/autonomie", icon: "🌱", desc: "Potager, eau, énergie, habitat et résilience au quotidien." },
  { title: "Projets", href: "/projets", icon: "🚀", desc: "Présenter un projet, chercher des partenaires, financement participatif." },
  { title: "Forum", href: "/forum", icon: "💬", desc: "Questions, discussions thématiques, échanges d'expérience et groupes locaux." },
  { title: "Annuaire", href: "/annuaire", icon: "📋", desc: "Membres, compétences, associations, artisans et producteurs locaux." },
];

const valueStrip = [
  { icon: "♡", title: "ENTRAIDE",     desc: "S'aider les uns les autres" },
  { icon: "✦", title: "TRANSMISSION", desc: "Partager les savoir-faire" },
  { icon: "↻", title: "RÉEMPLOI",     desc: "Donner au lieu de jeter" },
  { icon: "❧", title: "AUTONOMIE",    desc: "Construire un avenir durable" },
  { icon: "⁂", title: "COMMUNAUTÉ",  desc: "Ensemble, nous avançons" },
];

export default function HomePage() {
  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: "100vh" }}>

        {/* Image de fond exacte */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Légère couche sombre pour lisibilité du texte */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.22)" }} />

        {/* ══ CONTENU CENTRAL ══ */}
        <div className="relative flex flex-col items-center justify-center text-center px-6 py-16 gap-6" style={{ minHeight: "95vh" }}>

          {/* Logo */}
          <Image
            src="/logo.png"
            alt="NIGLOMODE"
            width={330}
            height={330}
            priority
            className="rounded-full bg-white p-2"
            style={{ boxShadow: "0 0 0 5px #c8a020, 0 0 45px rgba(200,160,30,0.28), 0 28px 65px rgba(0,0,0,0.65)" }}
          />

          {/* Slogan */}
          <h1 style={{
            color: "#f0e0a0",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontWeight: 600, lineHeight: 1.2,
            textShadow: "0 2px 24px rgba(0,0,0,0.9)"
          }}>
            Moins de bruits. Plus de solutions.
          </h1>

          {/* Séparateur feuille */}
          <div style={{ display:"flex", alignItems:"center", gap:12, width:"100%", maxWidth:340 }}>
            <div style={{ flex:1, height:1, background:"rgba(200,160,30,0.40)" }}/>
            <span style={{ color:"#c8a020", fontSize:20 }}>🌿</span>
            <div style={{ flex:1, height:1, background:"rgba(200,160,30,0.40)" }}/>
          </div>

          {/* Sous-titre */}
          <p style={{ color:"rgba(255,255,255,0.70)", fontSize:"1rem", maxWidth:460, lineHeight:1.75 }}>
            Entraide, savoir-faire, initiatives locales, autonomie,<br />
            réemploi et projets collectifs.
          </p>

          {/* Boutons CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/inscription"
              className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white", boxShadow: "0 4px 22px rgba(45,106,79,0.40)" }}
            >
              Rejoindre la communauté
            </Link>
            <Link
              href="/#sections"
              className="px-8 py-3 rounded-full font-medium text-base transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.85)" }}
            >
              Découvrir les sections
            </Link>
          </div>
        </div>
      </section>


      {/* ── Terriers Locaux teaser ── */}
      <section style={{ backgroundColor: "#1A2562" }} className="py-14 px-4 text-white text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-5">
          <span style={{ fontSize: 48 }}>🏡</span>
          <h2 className="text-2xl font-bold" style={{ color: "#F5C218" }}>Trouvez votre Terrier</h2>
          <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.8, maxWidth: 520 }}>
            Vous ne rejoignez pas une plateforme. Vous rejoignez <strong style={{ color: "#F5C218" }}>votre communauté locale</strong>.
            Chaque Terrier rassemble les habitants d&apos;un même territoire autour de l&apos;entraide, des projets et des événements de proximité.
          </p>
          <Link
            href="/terriers"
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#F5C218", color: "#1A2562" }}
          >
            🗺️ Voir la carte des Terriers
          </Link>
        </div>
      </section>

      {/* ── Grille des sections ── */}
      <section id="sections" className="py-16 px-4" style={{ backgroundColor: "var(--cream)" }}>
        <div className="max-w-7xl mx-auto">

          <h2 className="text-2xl font-bold text-center mb-2" style={{ color: "var(--navy)" }}>
            Explorez la plateforme
          </h2>
          <p className="text-center text-sm mb-10 opacity-55">
            Une partie du contenu est librement accessible. Certaines fonctionnalités nécessitent une adhésion.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: "white", borderColor: "var(--cream-dark)" }}
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-base mb-1.5 group-hover:underline" style={{ color: "var(--navy)" }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-55">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Adhésion ── */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Comment ça fonctionne ?</h2>
          <p className="opacity-75 mb-10 max-w-xl mx-auto">
            NIGLOMODE est ouvert à tous. Une adhésion symbolique permet de soutenir le projet et d&apos;accéder aux fonctionnalités avancées.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { titre:"Visiteur",          prix:"Gratuit", desc:"Consultation libre du contenu public.",              items:["Parcourir les sections","Lire les publications","Consulter l'annuaire"], highlight:false },
              { titre:"Membre",            prix:"Gratuit", desc:"Inscription sans engagement.",                       items:["Profil personnel","Poster du contenu","Participer au forum"], highlight:false },
              { titre:"Membre du Terrier", prix:"2 €/mois",desc:"Soutenir le projet et accéder à tout.",             items:["Toutes les fonctionnalités","Accès prioritaire","Soutien à l'infrastructure"], highlight:true },
            ].map((tier) => (
              <div key={tier.titre} className="rounded-xl p-6 text-left" style={{
                backgroundColor: tier.highlight ? "#2D6A4F" : "rgba(255,255,255,0.08)",
                color: "white",
                border: tier.highlight ? "2px solid var(--gold)" : "1px solid rgba(255,255,255,0.15)",
              }}>
                <h3 className="font-bold text-lg mb-1">{tier.titre}</h3>
                <p className="text-2xl font-bold mb-2" style={{ color: "var(--gold-light)" }}>{tier.prix}</p>
                <p className="text-sm mb-4 opacity-70">{tier.desc}</p>
                <ul className="space-y-1.5">
                  {tier.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2">
                      <span style={{ color: "var(--gold)" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/inscription"
              className="inline-block px-10 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--gold)", color: "var(--navy)" }}>
              Rejoindre NIGLOMODE
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
