"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    icon: "♻", label: "Récupération",
    items: ["Trouvailles", "Déchetteries", "Ressourceries", "Emmaüs", "Seconde main", "Réemploi", "Sauvetage d'objets"],
  },
  {
    icon: "🔨", label: "Réparer",
    items: ["Électroménager", "Informatique", "Vélo", "Outils", "Mobilier", "Automobile", "Diagnostic de panne"],
  },
  {
    icon: "🛠", label: "Détournement",
    items: ["Upcycling", "Transformation", "Réutilisation créative", "Bricolages malins", "Objets détournés"],
  },
  {
    icon: "🔧", label: "Fabriquer ses outils",
    items: ["Démonte-palettes", "Établis", "Outils artisanaux", "Outils de jardin", "Outils détournés", "Astuces d'atelier", "Outillage maison"],
  },
  {
    icon: "💰", label: "Économies",
    items: ["Réduction des dépenses", "Économies d'énergie", "Économies d'eau", "Achats intelligents", "Consommation raisonnée"],
  },
  {
    icon: "🚀", label: "Bons Tuyaux",
    items: ["Applications utiles", "Sites utiles", "Services gratuits", "Bons plans locaux", "Outils numériques", "Astuces administratives", "Ressources peu connues"],
  },
  {
    icon: "📖", label: "Retours d'expérience",
    items: ["Réparations", "Trouvailles", "Réussites", "Échecs instructifs", "Économies réalisées", "Fabrications maison"],
  },
  {
    icon: "🧰", label: "Guides pratiques",
    items: ["Tutoriels", "Pas à pas", "Fiches pratiques", "Vidéos", "PDF", "Ressources utiles"],
  },
];

const contributions = [
  { icon: "📷", label: "Ajouter des photos" },
  { icon: "📝", label: "Partager une astuce" },
  { icon: "🔗", label: "Ajouter une ressource" },
  { icon: "📚", label: "Publier un tutoriel" },
  { icon: "🛠", label: "Présenter une fabrication" },
  { icon: "♻", label: "Montrer une récupération" },
  { icon: "💡", label: "Partager un bon tuyau" },
];

const trouvaillesDuTerrier = [
  {
    id: 1, auteur: "Daniel C.", initiales: "DC", ville: "Toulouse",
    titre: "Établi fait de 3 palettes en 2h — coût : 0€",
    desc: "Récupéré derrière un supermarché, assemblé avec des vis de récup. Solide, à bonne hauteur et avec rangements intégrés.",
    type: "Fabrication", likes: 67, icon: "🔧",
  },
  {
    id: 2, auteur: "Hélène R.", initiales: "HR", ville: "Lyon",
    titre: "Machine à laver 20 ans d'âge — réparée avec une pièce à 4€",
    desc: "Joint de pompe de vidange. Trouvé le diagnostic sur un forum, commandé sur un site de pièces détachées. 15 min de réparation.",
    type: "Réparation", likes: 89, icon: "🔨",
  },
  {
    id: 3, auteur: "Marc B.", initiales: "MB", ville: "Limoges",
    titre: "Récupérateur d'eau fabriqué avec une cuve IBC de récup",
    desc: "Cuve 1000L trouvée sur LeBonCoin à 30€, raccordée à la gouttière. Économie estimée : 40€ d'eau par an sur le potager.",
    type: "Récupération", likes: 54, icon: "♻",
  },
];

const fiches = [
  {
    id: 1, titre: "Réparer son lave-linge soi-même — guide complet", categorie: "Réparer", icon: "🔨",
    auteur: "Lucie M.", initiales: "LM", ville: "Bordeaux", date: "il y a 2 jours",
    desc: "Les 5 pannes les plus courantes, comment les diagnostiquer et les réparer sans technicien.",
    vues: 487, contributions: 14, likes: 73,
    tags: ["Populaire", "Économie", "Pratique"],
  },
  {
    id: 2, titre: "Upcycling de palettes — 10 idées réalisables ce week-end", categorie: "Détournement", icon: "🛠",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 5 jours",
    desc: "Bac à fleurs, étagère, salon de jardin, composteur, table basse… tout avec des palettes de récup.",
    vues: 312, contributions: 9, likes: 58,
    tags: ["DIY", "Récup", "Week-end"],
  },
  {
    id: 3, titre: "Les meilleures ressourceries en France — annuaire collaboratif", categorie: "Récupération", icon: "♻",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 1 semaine",
    desc: "Ressourceries, recycleries, Emmaüs, repair cafés… liste enrichie par la communauté par département.",
    vues: 621, contributions: 38, likes: 104,
    tags: ["Référence", "Collaboratif", "À enrichir"],
  },
  {
    id: 4, titre: "Économiser 300€/an sur sa facture d'énergie — retour d'expérience", categorie: "Économies", icon: "💰",
    auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 3 jours",
    desc: "Isolation des combles, robinets thermostatiques, programmateur, multiprises à interrupteur. Détail des économies réalisées.",
    vues: 395, contributions: 11, likes: 82,
    tags: ["Retour d'expérience", "Chiffré", "Pratique"],
  },
  {
    id: 5, titre: "Fabriquer un démonte-palette en 30 minutes", categorie: "Fabriquer ses outils", icon: "🔧",
    auteur: "Marcel D.", initiales: "MD", ville: "Limoges", date: "il y a 2 semaines",
    desc: "Avec une barre de fer plate et un marteau de forgeron. Plans, mesures et explications en images.",
    vues: 278, contributions: 6, likes: 49,
    tags: ["DIY", "Outils", "Tuto"],
  },
  {
    id: 6, titre: "Les 10 sites gratuits indispensables pour le système D", categorie: "Bons Tuyaux", icon: "🚀",
    auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 4 jours",
    desc: "LeBonCoin, Geev, Freecycle, iFixit, Spareka, Repair Café… tour d'horizon des meilleures ressources gratuites.",
    vues: 534, contributions: 22, likes: 96,
    tags: ["Ressources", "Gratuit", "Populaire"],
  },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Fabrication":  { bg: "#EDE9FE", color: "#5b21b6" },
  "Réparation":   { bg: "#D6F5F3", color: "#1A9E94" },
  "Récupération": { bg: "#D1FAE5", color: "#065f46" },
};

export default function AstucesRecupPage() {
  const [categorieActive, setCategorieActive] = useState<string | null>(null);
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [ficheActive, setFicheActive] = useState<number | null>(null);

  const fichesFiltrees = fiches.filter((f) => {
    if (categorieActive && f.categorie !== categorieActive) return false;
    if (recherche && !f.titre.toLowerCase().includes(recherche.toLowerCase()) && !f.desc.toLowerCase().includes(recherche.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ backgroundColor: "#2a1f0e", minHeight: "40vh" }} className="relative flex flex-col items-center justify-center text-center px-6 py-16 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl">
          <span style={{ fontSize: 52 }}>💡</span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 800, letterSpacing: 3, color: "#f5c842" }}>
            ASTUCES, RÉCUP & SYSTÈME D
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", maxWidth: 520, lineHeight: 1.75, fontSize: "1.05rem" }}>
            Moins jeter, mieux utiliser, réparer, fabriquer et transmettre.
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", fontStyle: "italic" }}>
            Moins de bruit. Plus de solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <input
              type="text"
              placeholder="Rechercher une astuce, un tuto, une récup…"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              className="px-5 py-2.5 rounded-full text-sm outline-none w-72"
              style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#2a1f0e" }}
            />
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#f5c842", color: "#2a1f0e" }}
            >
              + Partager une astuce
            </button>
          </div>
        </div>
      </section>

      {/* ═══ TROUVAILLE DU TERRIER ═══ */}
      <section style={{ backgroundColor: "#1a2562" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span style={{ fontSize: 28 }}>🌟</span>
            <div>
              <h2 className="font-extrabold text-lg" style={{ color: "#f5c842" }}>Trouvaille du Terrier</h2>
              <p className="text-xs opacity-50 text-white">Les meilleures récups, fabrications et réparations de la communauté</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trouvaillesDuTerrier.map((t) => {
              const tc = typeColors[t.type] ?? { bg: "#f0ede4", color: "#1A2562" };
              return (
                <div key={t.id} className="rounded-2xl p-5 flex flex-col gap-3 transition-colors hover:bg-white/10 cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: tc.bg, color: tc.color }}>
                      {t.icon} {t.type}
                    </span>
                    <span className="text-xs opacity-40 text-white">❤️ {t.likes}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white leading-snug">{t.titre}</h3>
                  <p className="text-xs opacity-60 text-white leading-relaxed">{t.desc}</p>
                  <div className="flex items-center gap-2 mt-auto">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: "#f5c842", color: "#2a1f0e" }}>
                      {t.initiales}
                    </div>
                    <span className="text-xs opacity-50 text-white">{t.auteur} · {t.ville}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section style={{ backgroundColor: "#f5f0e5" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold mb-5" style={{ color: "#2a1f0e" }}>Thèmes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setCategorieActive(categorieActive === cat.label ? null : cat.label)}
                className="rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center transition-all hover:scale-105"
                style={{
                  backgroundColor: categorieActive === cat.label ? "#2a1f0e" : "white",
                  color: categorieActive === cat.label ? "white" : "#2a1f0e",
                  border: `2px solid ${categorieActive === cat.label ? "#2a1f0e" : "#ddd5c0"}`,
                  boxShadow: categorieActive === cat.label ? "0 4px 16px rgba(42,31,14,0.25)" : "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <span className="text-xs font-semibold leading-tight">{cat.label}</span>
              </button>
            ))}
          </div>

          {categorieActive && (
            <div className="mt-4 p-4 rounded-2xl flex flex-wrap gap-2" style={{ backgroundColor: "#fef3c7", border: "1px solid #f5c842" }}>
              {categories.find((c) => c.label === categorieActive)?.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setRecherche(item)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-yellow-600 hover:text-white"
                  style={{ backgroundColor: "white", color: "#2a1f0e", border: "1px solid #f5c842" }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ FICHES ═══ */}
      <section style={{ backgroundColor: "#faf7f0" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: "#2a1f0e" }}>
                Fiches & Tutos{" "}
                <span className="text-sm font-normal opacity-40">({fichesFiltrees.length})</span>
              </h2>
              <p className="text-xs mt-0.5 opacity-50" style={{ color: "#2a1f0e" }}>
                Publiées et enrichies par la communauté NIGLOMODE
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2a1f0e", color: "white" }}
            >
              + Partager
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fichesFiltrees.map((f) => (
              <div key={f.id} className="rounded-2xl flex flex-col overflow-hidden transition-shadow hover:shadow-md"
                style={{ backgroundColor: "white", border: "1px solid #ddd5c0" }}>
                <div className="px-5 pt-5 pb-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#fef3c7", color: "#92400e" }}>
                      {f.icon} {f.categorie}
                    </span>
                    {f.tags.slice(0, 1).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: "#f0ede4", color: "#5a4a30" }}>{t}</span>
                    ))}
                  </div>
                  <h3 className="font-bold text-base leading-snug" style={{ color: "#2a1f0e" }}>{f.titre}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{f.desc}</p>
                </div>

                <div className="px-5 py-2 flex gap-4 text-xs opacity-40" style={{ color: "#2a1f0e", borderTop: "1px solid #f0ede4" }}>
                  <span>👁 {f.vues}</span>
                  <span>❤️ {f.likes}</span>
                  <span>✏️ {f.contributions} contributions</span>
                </div>

                <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #f0ede4" }}>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#2a1f0e" }}>
                      {f.initiales}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#2a1f0e" }}>{f.auteur}</p>
                      <p className="text-xs opacity-40">{f.date}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFicheActive(ficheActive === f.id ? null : f.id)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#2a1f0e", color: "white" }}
                  >
                    Lire & Contribuer
                  </button>
                </div>

                {ficheActive === f.id && (
                  <div className="px-5 py-4 flex flex-col gap-3" style={{ backgroundColor: "#fef3c7", borderTop: "1px solid #ddd5c0" }}>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#2a1f0e" }}>
                      Contribuer à cette fiche
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contributions.map((c) => (
                        <button
                          key={c.label}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:bg-yellow-600 hover:text-white"
                          style={{ backgroundColor: "white", color: "#2a1f0e", border: "1px solid #f5c842" }}
                        >
                          {c.icon} {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {fichesFiltrees.length === 0 && (
            <div className="text-center py-16 opacity-40" style={{ color: "#2a1f0e" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucune fiche trouvée</p>
              <p className="text-sm mt-1">Sois le premier à partager sur ce sujet.</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2a1f0e", color: "white" }}>
                + Partager une astuce
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══ PHILOSOPHIE / PARTICIPATION ═══ */}
      <section style={{ backgroundColor: "#2a1f0e" }} className="py-14 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-extrabold" style={{ color: "#f5c842" }}>
                L&apos;esprit du Système D
              </h2>
              <p className="mt-2 opacity-70 leading-relaxed text-sm">
                L&apos;objectif n&apos;est pas seulement d&apos;économiser. C&apos;est de comprendre, réparer, détourner, fabriquer et transmettre.
                La communauté construit progressivement une bibliothèque vivante de solutions concrètes.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🔨", titre: "Réparer avant de jeter", texte: "Chaque réparation partagée évite un achat, réduit les déchets et transmet un savoir." },
                { icon: "♻", titre: "Récupérer avec ingéniosité", texte: "Les meilleures matières premières sont souvent à portée de main, gratuites." },
                { icon: "🛠", titre: "Fabriquer ce qu'on peut", texte: "Un outil fait maison vaut souvent mieux qu'un outil acheté — et on sait comment il est fait." },
              ].map((item) => (
                <div key={item.titre} className="flex gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm" style={{ color: "#f5c842" }}>{item.titre}</p>
                    <p className="text-xs opacity-65 mt-0.5 leading-relaxed">{item.texte}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <p className="text-sm font-bold uppercase tracking-wider opacity-50">Comment contribuer</p>
            {contributions.map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/10 cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{c.label}</p>
                  <p className="text-xs opacity-50 mt-0.5">
                    {c.icon === "📷" && "Avant / après, étapes, résultat final"}
                    {c.icon === "📝" && "Ce que tu as testé, ce qui marche vraiment"}
                    {c.icon === "🔗" && "Articles, vidéos, sites, ressources utiles"}
                    {c.icon === "📚" && "Étapes, schémas, explications détaillées"}
                    {c.icon === "🛠" && "Ta création, tes plans, ton matériel"}
                    {c.icon === "♻" && "Ta trouvaille, où tu l'as trouvée, ce que tu en as fait"}
                    {c.icon === "💡" && "L'astuce courte qui change la vie"}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3.5 rounded-full font-bold text-base mt-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#f5c842", color: "#2a1f0e" }}
            >
              💡 Partager ma première astuce
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FORMULAIRE ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#2a1f0e" }}>Partager une astuce ou un tuto</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70">×</button>
            </div>

            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "#fef3c7", color: "#2a1f0e" }}>
              <span>💡</span>
              <span>Partage ce qui fonctionne vraiment. Une photo, une astuce, un retour d&apos;expérience — tout est utile.</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Astuce", "Tuto", "Retour d'expérience", "Récupération", "Fabrication", "Bon tuyau"].map((t) => (
                <button key={t} type="button"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{ backgroundColor: "#fef3c7", color: "#2a1f0e", borderColor: "#f5c842" }}>
                  {t}
                </button>
              ))}
            </div>

            {[
              { label: "Titre *", type: "text", placeholder: "Ex : Comment réparer son lave-linge pour 4€…" },
              { label: "Ta ville", type: "text", placeholder: "Optionnel — pour contextualiser" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#2a1f0e" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #ddd5c0", color: "#2a1f0e" }} />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#2a1f0e" }}>Thème</label>
              <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #ddd5c0", color: "#2a1f0e" }}>
                {categories.map((c) => <option key={c.label}>{c.icon} {c.label}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#2a1f0e" }}>Contenu *</label>
              <textarea rows={5} placeholder="Décris l'astuce, les étapes, le matériel utilisé, les économies réalisées…"
                className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #ddd5c0", color: "#2a1f0e" }} />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#2a1f0e" }}>Photos (optionnel)</label>
              <input type="file" multiple accept="image/*" className="text-sm" style={{ color: "#2a1f0e" }} />
            </div>

            <button className="w-full py-3 rounded-full font-bold text-base mt-1 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2a1f0e", color: "white" }}>
              Publier mon astuce
            </button>
          </div>
        </div>
      )}

      <div className="text-center py-8" style={{ backgroundColor: "#f5f0e5" }}>
        <Link href="/" className="text-sm opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#2a1f0e" }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
