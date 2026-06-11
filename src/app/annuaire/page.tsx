"use client";
import { useState } from "react";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
];

const categories = ["Tous", "Artisans", "Producteurs", "Services", "Associations", "Commerce local", "Bénévoles"];

const membres = [
  { emoji: "🍓", nom: "Les Fraises de Marguerite", cat: "Producteurs", lieu: "Seine-et-Marne", desc: "Maraîchère bio, vente directe de fruits rouges et légumes de saison. Paniers hebdomadaires disponibles.", contact: "fraises-marguerite.fr" },
  { emoji: "🔨", nom: "Atelier Bois Vivant", cat: "Artisans", lieu: "Montpellier", desc: "Menuisier-ébéniste, restauration de meubles et fabrication sur mesure en bois massif local.", contact: "Sur le forum" },
  { emoji: "🧵", nom: "Couture Collective", cat: "Associations", lieu: "Lyon", desc: "Atelier de couture communautaire, cours gratuits les mercredis soirs. Machines à dispo pour les membres.", contact: "couture-collective@niglo.fr" },
  { emoji: "🌿", nom: "Herboristerie du Terrier", cat: "Commerce local", lieu: "Grenoble", desc: "Plantes médicinales, tisanes, huiles essentielles — tout vient de producteurs locaux certifiés.", contact: "herboterrier.com" },
  { emoji: "🔧", nom: "Repair Café du 12e", cat: "Associations", lieu: "Paris 12e", desc: "Atelier bénévole de réparation d'objets du quotidien. Ouvert le 2e samedi du mois, 10h-17h.", contact: "Sur le forum" },
  { emoji: "🐓", nom: "Ferme des Deux Chênes", cat: "Producteurs", lieu: "Normandie", desc: "Élevage plein air, œufs et volailles. Vente directe à la ferme et livraison dans les Terriers normands.", contact: "ferme2chenes.fr" },
  { emoji: "🎨", nom: "Studio Partage Créatif", cat: "Services", lieu: "Bordeaux", desc: "Espace mutualisé : imprimante 3D, découpe laser, outils numériques. Accès libre pour les membres Niglo Actif.", contact: "studio-partage.fr" },
  { emoji: "🚴", nom: "Vélos en Commun", cat: "Associations", lieu: "Nantes", desc: "Réparation collective de vélos, banque de pièces détachées, cours d'entretien pour tous niveaux.", contact: "velosencommun.org" },
  { emoji: "🍞", nom: "Boulangerie Au Pain Levain", cat: "Commerce local", lieu: "Rennes", desc: "Boulangerie artisanale, farines locales, pain au levain naturel. Réservation paniers via NIGLOMODE.", contact: "aupainlevain.fr" },
];

export default function AnnuairePage() {
  const [cat, setCat]           = useState("Tous");
  const [recherche, setRecherche] = useState("");

  const filtres = membres.filter(m =>
    (cat === "Tous" || m.cat === cat) &&
    (!recherche || m.nom.toLowerCase().includes(recherche.toLowerCase()) || m.desc.toLowerCase().includes(recherche.toLowerCase()))
  );

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
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span style={{ fontSize: 52 }}>📖</span>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
            L&apos;ANNUAIRE DU <span style={{ color: "#D8B56A" }}>TERRIER</span>
          </h1>
          <p style={{ color: "rgba(245,239,216,0.75)", lineHeight: 1.75, maxWidth: 480 }}>
            Artisans, producteurs, associations, commerces locaux — trouve et valorise les acteurs de ton Terrier.
          </p>
          <div className="w-full max-w-md mt-2">
            <input type="text" value={recherche} onChange={e => setRecherche(e.target.value)}
              placeholder="Rechercher un artisan, producteur, service…"
              className="w-full px-5 py-3 rounded-2xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#F5EFD8" }} />
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 20 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Connaître ses voisins, c&apos;est déjà ne jamais manquer de rien.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ FILTRES ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <div className="p-4 rounded-2xl flex flex-wrap gap-2 items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: cat === c ? "#D8B56A" : "rgba(255,255,255,0.07)",
                  color: cat === c ? "#1E3524" : "rgba(245,239,216,0.75)",
                  border: `1px solid ${cat === c ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                }}>
                {c}
              </button>
            ))}
            <button className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Référencer mon activité
            </button>
          </div>
        </div>
      </section>

      {/* ═══ LISTE ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>
              {cat === "Tous" ? "Tous les membres référencés" : cat}
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#EDE4C4", color: "#4F6B47", border: "1px solid #C4B898" }}>
              {filtres.length} résultat{filtres.length > 1 ? "s" : ""}
            </span>
          </div>
          {filtres.length === 0 ? (
            <p className="text-center py-16 text-sm" style={{ color: "#4F6B47" }}>
              Aucun résultat pour &ldquo;{recherche}&rdquo; dans {cat}.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtres.map((m) => (
                <div key={m.nom} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{m.emoji}</span>
                    <div>
                      <p className="font-bold text-sm leading-tight" style={{ color: "#1E3524" }}>{m.nom}</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#4F6B47", border: "1px solid #C4B898" }}>{m.cat}</span>
                        <span className="text-xs" style={{ color: "#6B4F34" }}>📍 {m.lieu}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#4F6B47" }}>{m.desc}</p>
                  <p className="text-xs font-medium" style={{ color: "#C4B898" }}>Contact : {m.contact}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
