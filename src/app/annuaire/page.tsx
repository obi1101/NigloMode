"use client";
import { useState, useRef } from "react";

const themes = [
  { icon: "🔎", label: "Tous" },
  { icon: "🔨", label: "Artisans" },
  { icon: "🌱", label: "Producteurs" },
  { icon: "🛠️", label: "Services" },
  { icon: "🤝", label: "Associations" },
  { icon: "🏪", label: "Commerce local" },
  { icon: "🙌", label: "Bénévoles" },
  { icon: "🔧", label: "Réparation" },
  { icon: "🎁", label: "Dons" },
  { icon: "🌾", label: "Agriculture" },
  { icon: "🏗️", label: "Construction" },
  { icon: "💻", label: "Numérique" },
];

type StatutMembre = "particulier" | "professionnel" | "association";
const membres: { emoji: string; nom: string; cat: string; cp: string; lieu: string; desc: string; contact: string; statut: StatutMembre }[] = [
  { emoji: "🍓", nom: "Les Fraises de Marguerite", cat: "Producteurs",    cp: "77", lieu: "Seine-et-Marne",    statut: "professionnel", desc: "Maraîchère bio, vente directe de fruits rouges et légumes de saison. Paniers hebdomadaires.", contact: "fraises-marguerite.fr" },
  { emoji: "🔨", nom: "Atelier Bois Vivant",        cat: "Artisans",      cp: "34", lieu: "Montpellier",       statut: "professionnel", desc: "Menuisier-ébéniste, restauration de meubles et fabrication sur mesure en bois massif local.", contact: "Sur le forum" },
  { emoji: "🧵", nom: "Couture Collective",          cat: "Associations",  cp: "69", lieu: "Lyon",              statut: "association",   desc: "Atelier de couture communautaire, cours gratuits les mercredis soirs. Machines à dispo.", contact: "couture-collective@niglo.fr" },
  { emoji: "🌿", nom: "Herboristerie du Terrier",    cat: "Commerce local",cp: "38", lieu: "Grenoble",          statut: "professionnel", desc: "Plantes médicinales, tisanes, huiles essentielles — tout vient de producteurs locaux certifiés.", contact: "herboterrier.com" },
  { emoji: "🔧", nom: "Repair Café du 12e",          cat: "Associations",  cp: "75", lieu: "Paris 12e",         statut: "association",   desc: "Atelier bénévole de réparation d'objets du quotidien. 2e samedi du mois, 10h-17h.", contact: "Sur le forum" },
  { emoji: "🐓", nom: "Ferme des Deux Chênes",       cat: "Producteurs",   cp: "14", lieu: "Normandie",         statut: "professionnel", desc: "Élevage plein air, œufs et volailles. Vente directe à la ferme et livraison dans les Terriers.", contact: "ferme2chenes.fr" },
  { emoji: "🎨", nom: "Studio Partage Créatif",      cat: "Services",      cp: "33", lieu: "Bordeaux",          statut: "professionnel", desc: "Espace mutualisé : imprimante 3D, découpe laser, outils numériques. Accès libre membres Niglo Actif.", contact: "studio-partage.fr" },
  { emoji: "🚴", nom: "Vélos en Commun",             cat: "Associations",  cp: "44", lieu: "Nantes",            statut: "association",   desc: "Réparation collective de vélos, banque de pièces détachées, cours d'entretien pour tous.", contact: "velosencommun.org" },
  { emoji: "🍞", nom: "Boulangerie Au Pain Levain",  cat: "Commerce local",cp: "35", lieu: "Rennes",            statut: "professionnel", desc: "Boulangerie artisanale, farines locales, pain au levain naturel. Réservation via NIGLOMODE.", contact: "aupainlevain.fr" },
  { emoji: "🪵", nom: "Bois & Ressources",           cat: "Réparation",    cp: "63", lieu: "Clermont-Ferrand", statut: "particulier",   desc: "Bois de récupération, palettes, chutes d'ateliers. Gratuit pour les membres du Terrier.", contact: "Sur le forum" },
  { emoji: "🖥️", nom: "InfoLibre Asso",             cat: "Numérique",     cp: "31", lieu: "Toulouse",          statut: "association",   desc: "Aide informatique bénévole, ateliers logiciels libres, réparation PC et smartphones.", contact: "infolibre@niglo.fr" },
  { emoji: "🌾", nom: "AMAP du Vallon",              cat: "Agriculture",   cp: "84", lieu: "Vaucluse",          statut: "association",   desc: "Association pour le maintien d'une agriculture paysanne. Paniers mensuels, visite de la ferme.", contact: "amap-vallon.fr" },
];

const lucioles = Array.from({ length: 8 }, (_, i) => ({
  id: i, top: `${10 + (i * 43) % 72}%`, left: `${4 + (i * 67) % 90}%`,
  size: 2 + (i % 3), opacity: 0.2 + (i % 4) * 0.09,
}));

export default function AnnuairePage() {
  const [cp, setCp]             = useState("");
  const [recherche, setRecherche] = useState("");
  const [theme, setTheme]       = useState("Tous");
  const [searched, setSearched] = useState(false);
  const scrollRef               = useRef<HTMLDivElement>(null);
  const resultsRef              = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir === "right" ? 180 : -180;
  };

  const lancer = () => {
    setSearched(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const filtres = membres.filter((m) => {
    const matchTheme = theme === "Tous" || m.cat === theme;
    const matchCp    = !cp.trim() || m.cp.startsWith(cp.trim().slice(0, 2));
    const matchRecherche = !recherche.trim() ||
      m.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      m.desc.toLowerCase().includes(recherche.toLowerCase()) ||
      m.cat.toLowerCase().includes(recherche.toLowerCase());
    return matchTheme && matchCp && matchRecherche;
  });

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden px-4 pt-14 pb-10">
        {lucioles.map((l) => (
          <div key={l.id} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.size, height: l.size, backgroundColor: "#D8B56A", opacity: l.opacity, boxShadow: `0 0 ${l.size * 3}px #D8B56A` }} />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-5">
          <div className="text-center">
            <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(216,181,106,0.55)" }}>Recherche rapide</p>
            <h1 className="font-black" style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", color: "#ffffff", letterSpacing: 1 }}>
              L&apos;ANNUAIRE DU <span style={{ color: "#D8B56A" }}>TERRIER</span>
            </h1>
          </div>

          {/* Deux champs + bouton */}
          <div className="w-full flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <span className="text-lg flex-shrink-0">📍</span>
              <input value={cp} onChange={(e) => setCp(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lancer()}
                placeholder="Code postal (ex: 34)"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#F5EFD8" }} maxLength={5} />
            </div>
            <div className="flex items-center gap-2 flex-[2] px-4 py-3 rounded-2xl"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>
              <span className="text-lg flex-shrink-0">🔍</span>
              <input value={recherche} onChange={(e) => setRecherche(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && lancer()}
                placeholder="Que cherches-tu ? (artisan, don, réparation…)"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#F5EFD8" }} />
            </div>
            <button onClick={lancer}
              className="px-7 py-3 rounded-2xl font-extrabold text-sm transition-opacity hover:opacity-85 flex-shrink-0"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
              Chercher →
            </button>
          </div>

          {/* Carousel thèmes */}
          <div className="w-full flex items-center gap-2">
            <button onClick={() => scroll("left")}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(216,181,106,0.15)", border: "1px solid rgba(216,181,106,0.3)", color: "#D8B56A" }}>‹</button>
            <div ref={scrollRef} className="flex gap-2 overflow-x-hidden flex-1" style={{ scrollBehavior: "smooth" }}>
              {themes.map((t) => (
                <button key={t.label} onClick={() => { setTheme(t.label); setSearched(true); setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all"
                  style={{
                    backgroundColor: theme === t.label ? "#D8B56A" : "rgba(255,255,255,0.07)",
                    color: theme === t.label ? "#1E3524" : "rgba(245,239,216,0.75)",
                    border: `1px solid ${theme === t.label ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                  }}>
                  <span>{t.icon}</span><span>{t.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => scroll("right")}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ backgroundColor: "rgba(216,181,106,0.15)", border: "1px solid rgba(216,181,106,0.3)", color: "#D8B56A" }}>›</button>
          </div>

          {/* Flèche vers résultats */}
          {searched && (
            <button onClick={() => resultsRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="animate-bounce mt-1"
              style={{ color: "rgba(216,181,106,0.6)", fontSize: 22 }}>↓</button>
          )}
        </div>

        {/* Dicton */}
        <div className="relative z-10 mt-6 mx-auto flex items-center gap-3 px-5 py-2.5 rounded-2xl w-fit"
          style={{ backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.35)", backdropFilter: "blur(4px)" }}>
          <span>🦔</span>
          <p className="text-xs italic" style={{ color: "#F5EFD8" }}>
            &ldquo;Connaître ses voisins, c&apos;est déjà ne jamais manquer de rien.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ RÉSULTATS ═══ */}
      <section ref={resultsRef} style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="font-extrabold text-lg" style={{ color: "#1E3524" }}>
              {searched
                ? `${filtres.length} résultat${filtres.length !== 1 ? "s" : ""} ${cp ? `— ${cp}***` : ""} ${theme !== "Tous" ? `· ${theme}` : ""}`
                : "Tous les membres référencés"}
            </h2>
            <button className="px-4 py-2 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              ➕ Référencer mon activité
            </button>
          </div>

          {filtres.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <span style={{ fontSize: 40 }}>🔍</span>
              <p className="font-semibold" style={{ color: "#1E3524" }}>Aucun résultat trouvé</p>
              <p className="text-sm" style={{ color: "#4F6B47" }}>Essaie un autre code postal ou une autre catégorie.</p>
              <button onClick={() => { setCp(""); setRecherche(""); setTheme("Tous"); }}
                className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtres.map((m) => (
                <div key={m.nom} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: 30, flexShrink: 0 }}>{m.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight" style={{ color: "#1E3524" }}>{m.nom}</p>
                      <div className="flex gap-2 mt-1 flex-wrap items-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#4F6B47", border: "1px solid #C4B898" }}>{m.cat}</span>
                        <span className="text-xs" style={{ color: "#6B4F34" }}>📍 {m.lieu}</span>
                        {m.statut === "professionnel" && <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "rgba(30,53,36,0.08)", color: "#1E3524", border: "1px solid #C4B898" }}>🏷️ PRO</span>}
                        {m.statut === "association" && <span className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: "rgba(79,107,71,0.08)", color: "#4F6B47", border: "1px solid #C4B898" }}>🤝 Asso</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#4F6B47" }}>{m.desc}</p>
                  <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "#C4B898" }}>
                    <p className="text-xs" style={{ color: "#C4B898" }}>📬 {m.contact}</p>
                    <button className="text-xs font-semibold px-3 py-1 rounded-full transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Contacter</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
