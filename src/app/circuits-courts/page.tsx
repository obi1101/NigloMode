"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "produits" | "plants" | "services" | "reemploi" | "transmission";

const lucioles = [
  { top: "12%", left: "8%",  r: 3 }, { top: "28%", left: "90%", r: 2 },
  { top: "60%", left: "5%",  r: 2 }, { top: "75%", left: "92%", r: 3 },
  { top: "18%", left: "72%", r: 2 }, { top: "45%", left: "95%", r: 2 },
  { top: "85%", left: "20%", r: 2 }, { top: "8%",  left: "52%", r: 3 },
];

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  {
    id: "produits", icon: "🥕", label: "Produits locaux", sublabel: "Fruits, légumes, miel, pain…",
    items: ["Fruits", "Légumes", "Œufs", "Miel", "Pain", "Fromages", "Conserves", "Boissons artisanales", "Produits fermiers"],
  },
  {
    id: "plants", icon: "🌱", label: "Plants & Production", sublabel: "Semis, graines, petits élevages…",
    items: ["Semis", "Graines", "Boutures", "Plants", "Arbres fruitiers", "Poules", "Ruches", "Petits élevages", "Productions familiales"],
  },
  {
    id: "services", icon: "🛠", label: "Services & Savoir-faire", sublabel: "Artisanat, réparation, dépannage…",
    items: ["Jardinage", "Bricolage", "Réparation", "Couture", "Mécanique", "Artisanat", "Dépannage", "Services entre habitants"],
  },
  {
    id: "reemploi", icon: "♻", label: "Réemploi & Ressources", sublabel: "Dons, matériaux, outils, surplus…",
    items: ["Dons", "Matériaux", "Outils", "Bois", "Palettes", "Objets réutilisables", "Matériel récupérable", "Surplus"],
  },
  {
    id: "transmission", icon: "📚", label: "Transmission", sublabel: "Ateliers, formations, partage de savoirs…",
    items: ["Ateliers", "Initiations", "Formations", "Conférences", "Tutoriels", "Retours d'expérience", "Partage de connaissances"],
  },
];

const ressources: Record<Tab, { id: number; titre: string; type: "Offre" | "Don" | "Échange" | "Recherche"; auteur: string; initiales: string; ville: string; distance: string; dispo: string; desc: string; recomm: number }[]> = {
  produits: [
    { id: 1, titre: "Œufs frais de poules en plein air", type: "Offre", auteur: "Martine B.", initiales: "MB", ville: "Limoges", distance: "4 km", dispo: "Disponible", desc: "Poules élevées en plein air, alimentation naturelle. Vente à la douzaine, 3€.", recomm: 12 },
    { id: 2, titre: "Miel de garrigue — récolte 2025", type: "Offre", auteur: "Rucher du Causse", initiales: "RC", ville: "Montpellier", distance: "8 km", dispo: "Disponible", desc: "Apiculteur local, 15 ruches. Pot 500g (8€) ou 1kg (14€). Vente directe.", recomm: 27 },
    { id: 3, titre: "Cherche fromages de chèvre artisanaux", type: "Recherche", auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", distance: "—", dispo: "Cette semaine", desc: "Je cherche un producteur local pour un approvisionnement régulier.", recomm: 2 },
    { id: 4, titre: "Conserves maison — tomates, ratatouille, haricots", type: "Échange", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", distance: "3 km", dispo: "Disponible", desc: "Contre des légumes frais, plants ou savoir-faire de jardinage.", recomm: 9 },
  ],
  plants: [
    { id: 5, titre: "Plants de tomates et courgettes bio", type: "Don", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", distance: "3 km", dispo: "Cette semaine", desc: "Surplus de plants maison, bio, variétés anciennes. À venir chercher.", recomm: 8 },
    { id: 6, titre: "Graines de courge butternut — variété ancienne", type: "Don", auteur: "Pierre M.", initiales: "PM", ville: "Thiers", distance: "9 km", dispo: "Disponible", desc: "Graines séchées, variété conservée depuis 5 ans. Par sachet de 10.", recomm: 6 },
    { id: 7, titre: "Boutures de figuier — très productif", type: "Échange", auteur: "Marcel D.", initiales: "MD", ville: "Limoges", distance: "5 km", dispo: "Disponible", desc: "Figuier blanc très productif. Contre des plants de légumes ou compost.", recomm: 11 },
  ],
  services: [
    { id: 8, titre: "Atelier de réparation vélos — tous les samedis", type: "Offre", auteur: "Vélo Solidaire 33", initiales: "VS", ville: "Bordeaux", distance: "6 km", dispo: "Disponible", desc: "Atelier participatif. Venez avec votre vélo, repartez avec les outils.", recomm: 31 },
    { id: 9, titre: "Couturière propose retouches et réparations", type: "Offre", auteur: "Lucie M.", initiales: "LM", ville: "Bordeaux", distance: "4 km", dispo: "Cette semaine", desc: "Ourlets, fermetures, reprises, transformations. Prix libre ou échange.", recomm: 14 },
    { id: 10, titre: "Cherche aide pour taille de haies", type: "Recherche", auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", distance: "—", dispo: "Ce mois-ci", desc: "Grande haie de thuyas, matériel disponible sur place. Échange ou convivialité.", recomm: 3 },
  ],
  reemploi: [
    { id: 11, titre: "Lot de palettes bois — 6 pièces", type: "Don", auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", distance: "5 km", dispo: "Disponible", desc: "Palettes en bon état, propres. À venir chercher sur place.", recomm: 7 },
    { id: 12, titre: "Bois de récupération — chutes de menuiserie", type: "Don", auteur: "Marc B.", initiales: "MB", ville: "Limoges", distance: "4 km", dispo: "Disponible", desc: "Bois sec, propre. Idéal bricolage, chauffage ou potager surélevé.", recomm: 5 },
    { id: 13, titre: "Outils de jardin — bêche, râteau, fourche", type: "Don", auteur: "Martine B.", initiales: "MB", ville: "Limoges", distance: "4 km", dispo: "Disponible", desc: "Outils en bon état, déménagement oblige. À récupérer rapidement.", recomm: 10 },
    { id: 14, titre: "Cherche cuve IBC 1000L", type: "Recherche", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", distance: "—", dispo: "Cette semaine", desc: "Pour récupération eau de pluie. Je me déplace dans un rayon de 50 km.", recomm: 4 },
  ],
  transmission: [
    { id: 15, titre: "Formation permaculture débutants — gratuite", type: "Offre", auteur: "Terre Vivante 44", initiales: "TV", ville: "Nantes", distance: "12 km", dispo: "Ce mois-ci", desc: "Journée découverte sur un jardin en transition. 15 places. Inscription libre.", recomm: 19 },
    { id: 16, titre: "Atelier conservation alimentaire maison", type: "Offre", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", distance: "3 km", dispo: "Cette semaine", desc: "Lacto-fermentation, stérilisation, séchage. Chez moi, 6 personnes max. Apportez vos bocaux.", recomm: 16 },
    { id: 17, titre: "Initiation apiculture — printemps 2026", type: "Offre", auteur: "Rucher du Causse", initiales: "RC", ville: "Montpellier", distance: "8 km", dispo: "Ce mois-ci", desc: "2 demi-journées avec un apiculteur. Découverte de la ruche, matériel fourni.", recomm: 22 },
  ],
};

const typeColors: Record<string, { bg: string; color: string }> = {
  "Offre":     { bg: "#D6F5F3", color: "#1A9E94" },
  "Recherche": { bg: "#FDE68A", color: "#92400e" },
  "Don":       { bg: "#D1FAE5", color: "#065f46" },
  "Échange":   { bg: "#EDE9FE", color: "#5b21b6" },
};

export default function CircuitsCourtPage() {
  const [tab, setTab] = useState<Tab>("produits");
  const [mode, setMode] = useState<"tous" | "propose" | "cherche">("tous");
  const [rayon, setRayon] = useState("");
  const [cp, setCp]       = useState("");
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<string>("Je propose");
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestSent, setSuggestSent] = useState(false);

  const currentTab = tabs.find((t) => t.id === tab)!;
  const currentRessources = ressources[tab].filter((r) => {
    if (mode === "propose" && r.type === "Recherche") return false;
    if (mode === "cherche" && r.type !== "Recherche") return false;
    if (recherche && !r.titre.toLowerCase().includes(recherche.toLowerCase())) return false;
    if (cp && !r.ville.toLowerCase().includes(cp.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/circuits-courts-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.22) 50%, rgba(6,14,8,0.55) 100%)" }} />

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

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-16">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 48 }}>🌿</span>
            <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: 3, color: "#D8B56A" }}>
              CIRCUITS COURTS & RESSOURCES LOCALES
            </h1>
            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.75 }}>
              Trouver, proposer, échanger et valoriser les ressources de proximité.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Chaque achat local nourrit bien plus qu&apos;un simple panier.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ RECHERCHE GÉO ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-3">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          <p className="text-center text-sm font-bold" style={{ color: "#D8B56A" }}>
            🌿 Trouver des ressources locales près de chez moi
          </p>
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ backgroundColor: "#1a2e1c", border: "1px solid rgba(216,181,106,0.30)" }}>
            <span>📍</span>
            <input value={cp} onChange={e => setCp(e.target.value)}
              placeholder="Ville, code postal ou département (ex : 69, Lyon, Rhône…)"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#F5EFD8" }} />
            {cp && <button onClick={() => setCp("")} className="text-xs opacity-50 hover:opacity-100" style={{ color: "#F5EFD8" }}>✕</button>}
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["Autour de moi 📍", "Mon département", "Ma région", "Toute la France"] as const).map(label => (
              <button key={label} onClick={() => setRayon(rayon === label ? "" : label)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={rayon === label
                  ? { backgroundColor: "#D8B56A", color: "#1E3524" }
                  : { backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(245,239,216,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-6 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); }}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center transition-all"
              style={{
                backgroundColor: tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: tab === t.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: tab === t.id ? "0 4px 18px rgba(216,181,106,0.30)" : "0 1px 4px rgba(0,0,0,0.25)",
              }}>
              <div className="relative">
                <span style={{ fontSize: 26 }}>{t.icon}</span>
                {t.id === "reemploi" && (
                  <span className="absolute -top-1 -right-2 text-xs">⭐</span>
                )}
              </div>
              <span className="font-bold text-xs leading-tight">{t.label}</span>
              <span className="text-xs opacity-55 leading-tight hidden sm:block">{t.sublabel}</span>
            </button>
          ))}
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="mt-4 p-4 rounded-2xl flex flex-wrap gap-2 items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
            {currentTab.items.map((item) => (
              <button key={item}
                onClick={() => setRecherche(recherche === item ? "" : item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: recherche === item ? "#D8B56A" : "rgba(255,255,255,0.07)",
                  color: recherche === item ? "#1E3524" : "rgba(245,239,216,0.75)",
                  border: `1px solid ${recherche === item ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                }}>
                {item}
              </button>
            ))}
            <button onClick={() => { setShowSuggest(true); setSuggestSent(false); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Proposer une catégorie
            </button>
          </div>
          {tab === "reemploi" && (
            <p className="text-xs mt-2 font-semibold text-center" style={{ color: "rgba(216,181,106,0.7)" }}>
              ♻ L&apos;esprit anti-gaspillage — avant de jeter, propose-le ici.
            </p>
          )}
        </div>
      </section>

      {/* ═══ RESSOURCES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Filtres — Produits Locaux uniquement */}
          {tab === "produits" && (
            <div className="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl"
              style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <div className="flex rounded-full overflow-hidden" style={{ border: "1px solid #C4B898" }}>
                {[
                  { id: "tous" as const, label: "Tous" },
                  { id: "cherche" as const, label: "🔍 Je cherche" },
                  { id: "propose" as const, label: "📦 Je propose" },
                ].map((m) => (
                  <button key={m.id} onClick={() => setMode(m.id)}
                    className="px-4 py-2 text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: mode === m.id ? "#1E3524" : "#F5EFD8",
                      color: mode === m.id ? "#D8B56A" : "#1E3524",
                    }}>
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", color: "#1E3524" }}>
                <span>📏</span>
                <select value={rayon} onChange={(e) => setRayon(e.target.value)}
                  className="bg-transparent text-xs outline-none cursor-pointer" style={{ color: "#1E3524" }}>
                  {["5 km", "10 km", "20 km", "50 km", "100 km", "Toute la France"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <button onClick={() => setShowForm(true)}
                className="ml-auto px-6 py-2 rounded-full font-bold text-xs transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                ➕ Ajouter une ressource locale
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>
              {currentTab.icon} {currentTab.label}
              <span className="text-sm font-normal opacity-40 ml-2">({currentRessources.length})</span>
            </h2>
            <button onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              + Ajouter
            </button>
          </div>

          {currentRessources.length === 0 ? (
            <div className="text-center py-16" style={{ color: "#1E3524", opacity: 0.45 }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucun résultat</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                Soyez le premier à publier
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentRessources.map((r) => {
                const tc = typeColors[r.type] ?? { bg: "#E9DFC8", color: "#1E3524" };
                return (
                  <div key={r.id} className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
                    style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: tc.bg, color: tc.color }}>
                        {r.type}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: "#6B4F34", opacity: 0.5 }}>📍 {r.ville} · {r.distance}</span>
                    </div>
                    <h3 className="font-bold text-sm leading-snug" style={{ color: "#1E3524" }}>{r.titre}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a", opacity: 0.65 }}>{r.desc}</p>
                    <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid #C4B898" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: "#4F6B47" }}>
                          {r.initiales}
                        </div>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: "#1E3524" }}>{r.auteur}</p>
                          <p className="text-xs" style={{ color: "#6B4F34", opacity: 0.5 }}>🕐 {r.dispo}</p>
                        </div>
                      </div>
                      <button className="px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#1E3524", color: "white" }}>
                        Contacter
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ PHILOSOPHIE ═══ */}
      <section className="py-14 px-4 text-white text-center relative overflow-hidden"
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
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-5">
          <span style={{ fontSize: 44 }}>🦔</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>
            Un réseau vivant de voisins et de producteurs
          </h2>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(255,255,255,0.68)" }}>
            Pas un annuaire. Pas un supermarché en ligne. Un espace où les habitants, producteurs, artisans et bénévoles mettent en commun leurs ressources, leurs surplus et leurs savoir-faire.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Échanges locaux", "Réemploi", "Solidarité", "Autonomie collective"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>
                {v}
              </span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            ➕ Ajouter une ressource locale
          </button>
        </div>
      </section>

      {/* ═══ MODALE SUGGESTION ═══ */}
      {showSuggest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSuggest(false); }}>
          <div className="w-full max-w-md rounded-2xl p-7 flex flex-col gap-4"
            style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "#1E3524" }}>➕ Proposer une catégorie</h2>
              <button onClick={() => setShowSuggest(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            {suggestSent ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span style={{ fontSize: 40 }}>🌿</span>
                <p className="font-bold" style={{ color: "#1E3524" }}>Suggestion envoyée !</p>
                <p className="text-sm opacity-60" style={{ color: "#1E3524" }}>
                  Merci. Ta proposition sera examinée avant d&apos;être ajoutée.
                </p>
                <button onClick={() => setShowSuggest(false)}
                  className="px-6 py-2 rounded-full text-sm font-bold mt-1 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#4F6B47", color: "white" }}>
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="rounded-xl p-3 text-xs flex gap-2" style={{ backgroundColor: "#E9DFC8", color: "#1E3524" }}>
                  <span>ℹ️</span>
                  <span>Les suggestions sont soumises à modération et n&apos;apparaissent pas automatiquement.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Rubrique concernée</label>
                  <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }}>
                    {tabs.map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Catégorie proposée *</label>
                  <input type="text" placeholder="Ex : Champignons, Fromages de brebis…"
                    className="px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Pourquoi ? (optionnel)</label>
                  <textarea rows={2} placeholder="Explique brièvement l'intérêt pour la communauté…"
                    className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                    style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }} />
                </div>
                <button onClick={() => setSuggestSent(true)}
                  className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#4F6B47", color: "white" }}>
                  Envoyer ma suggestion
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ FORMULAIRE ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Ajouter une ressource locale</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "📦 Je propose", desc: "Je mets à disposition" },
                { label: "🔍 Je recherche", desc: "Je cherche quelqu'un" },
                { label: "🎁 Je donne", desc: "C'est gratuit" },
                { label: "🔄 J'échange", desc: "Contre autre chose" },
              ].map((t) => (
                <button key={t.label} type="button"
                  onClick={() => setFormType(t.label)}
                  className="px-3 py-3 rounded-xl text-xs font-semibold text-left transition-all"
                  style={{
                    backgroundColor: formType === t.label ? "#1E3524" : "#E9DFC8",
                    color: formType === t.label ? "#D8B56A" : "#1E3524",
                    border: `1.5px solid ${formType === t.label ? "#1E3524" : "#C4B898"}`,
                  }}>
                  <p className="font-bold">{t.label}</p>
                  <p className="opacity-60 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
            {[
              { label: "Titre *", type: "text", placeholder: "Ex : Œufs frais, plants de tomates, cours de poterie…" },
              { label: "Ville *", type: "text", placeholder: "Votre ville" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Catégorie</label>
              <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }}>
                {tabs.map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Description</label>
              <textarea rows={3} placeholder="Quantité, état, conditions d'échange, disponibilité…"
                className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "white" }} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Photos</label>
              <input type="file" multiple accept="image/*" className="text-sm" style={{ color: "#1E3524" }} />
            </div>
            <button className="w-full py-3 rounded-full font-bold text-base mt-1 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              Publier
            </button>
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <div className="text-center py-8" style={{ backgroundColor: "#E9DFC8" }}>
        <Link href="/" className="text-sm transition-opacity hover:opacity-70" style={{ color: "#6B4F34", opacity: 0.55 }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
