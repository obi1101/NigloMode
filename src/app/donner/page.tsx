"use client";
import { useState } from "react";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
];

const tabs = [
  { id: "objets",   icon: "📦", label: "Objets",       sublabel: "Ustensiles & divers",    items: ["Cuisine", "Bricolage", "Déco", "Jouets", "Sport", "Jeux", "Multimédia", "Scolaire"] },
  { id: "meubles",  icon: "🛋️", label: "Meubles",      sublabel: "Ameublement",            items: ["Table", "Chaise", "Canapé", "Armoire", "Bureau", "Étagère", "Lit", "Matelas"] },
  { id: "vetements",icon: "👕", label: "Vêtements",    sublabel: "Mode & accessoires",     items: ["Femme", "Homme", "Enfant", "Chaussures", "Manteau", "Sac", "Sport", "Maternité"] },
  { id: "livres",   icon: "📚", label: "Livres & Jeux",sublabel: "Culture & apprentissage",items: ["Romans", "BD", "Essais", "Jeux de société", "Jeunesse", "Scolaire", "Cuisine", "Pratique"] },
  { id: "jardin",   icon: "🌿", label: "Jardin",       sublabel: "Nature & plantes",       items: ["Plantes", "Outils", "Pot", "Graines", "Compost", "Tuteur", "Bâche", "Arrosoir"] },
  { id: "autre",    icon: "🎁", label: "Autre",        sublabel: "Tout le reste",           items: ["Animaux", "Musique", "Art", "Bébé", "Beauté", "Santé", "Auto", "Électronique"] },
];

const dons = [
  { emoji: "📦", titre: "Vaisselle complète + casseroles", lieu: "Lyon 3e", auteur: "Nadège V.", date: "Aujourd'hui", desc: "Service 6 personnes, quelques ébréchures mais très utilisable. 2 casseroles + 1 poêle inclus. À venir chercher." },
  { emoji: "🛋️", titre: "Canapé 3 places beige", lieu: "Bordeaux", auteur: "Patrick M.", date: "Hier", desc: "Canapé en bon état, légère usure sur un accoudoir. À démonter pour passer les escaliers. Aide pour le chargement bienvenue." },
  { emoji: "📚", titre: "Lot de 40 romans policiers", lieu: "Rennes", auteur: "Isabelle C.", date: "Il y a 2 jours", desc: "Collection complète Fred Vargas, quelques Connelly et Andrea H. Très bon état. Idéal pour une bibliothèque de Terrier !" },
  { emoji: "👕", titre: "Vêtements enfant 2-4 ans mixte", lieu: "Nantes", auteur: "Sophie L.", date: "Il y a 3 jours", desc: "Grand sac de vêtements saison printemps/été, bon état. Tailles 24 mois à 4 ans. Laver à 30° recommandé." },
  { emoji: "🌿", titre: "Jeunes plants de tomates & courgettes", lieu: "Toulouse", auteur: "Jean-Paul R.", date: "Il y a 4 jours", desc: "Trop de plants cette année ! Une trentaine de plants de tomates cerises et courgettes prêts à repiquer. Biol, pas traités." },
  { emoji: "🎁", titre: "Vélo enfant 20 pouces", lieu: "Strasbourg", auteur: "Margot F.", date: "Il y a 5 jours", desc: "Vélo jaune 20 pouces avec petites roues amovibles. Quelques éraflures mais roule parfaitement. Pour enfant 5-8 ans." },
];

export default function DonnerPage() {
  const [tab, setTab]             = useState("objets");
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [formSent, setFormSent]   = useState(false);

  const currentTab = tabs.find(t => t.id === tab)!;

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/donner-bg.png" alt="" className="w-full block" style={{ opacity: 0.62 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.40) 0%, rgba(6,14,8,0.18) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 48 }}>🎁</span>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: 4, color: "#D8B56A", textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              DONNER PLUTÔT QUE JETER
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Objets · Meubles · Vêtements · Plantes · Livres
            </p>
            <p style={{ color: "rgba(245,239,216,0.90)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Ce dont tu n&apos;as plus besoin peut faire le bonheur de quelqu&apos;un d&apos;autre dans ton Terrier. Donne, reçois, fais circuler.
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Donner c&apos;est transformer l&apos;inutile en utile.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ONGLETS + SOUS-THÈMES ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setRecherche(""); }}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center transition-all"
              style={{
                backgroundColor: tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: tab === t.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: tab === t.id ? "0 4px 18px rgba(216,181,106,0.30)" : "0 1px 4px rgba(0,0,0,0.25)",
              }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <span className="font-bold text-xs leading-tight">{t.label}</span>
              <span className="text-xs opacity-55 leading-tight hidden lg:block">{t.sublabel}</span>
            </button>
          ))}
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="mt-4 p-4 rounded-2xl flex flex-wrap gap-2 items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
            {currentTab.items.map((item) => (
              <button key={item} onClick={() => setRecherche(recherche === item ? "" : item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: recherche === item ? "#D8B56A" : "rgba(255,255,255,0.07)",
                  color: recherche === item ? "#1E3524" : "rgba(245,239,216,0.75)",
                  border: `1px solid ${recherche === item ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                }}>
                {item}
              </button>
            ))}
            <button onClick={() => { setShowForm(true); setFormSent(false); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Proposer un don
            </button>
          </div>
        </div>
      </section>

      {/* ═══ ANNONCES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>🎁 Dons disponibles près de chez vous</h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#EDE4C4", color: "#4F6B47", border: "1px solid #C4B898" }}>
              {dons.length} annonces
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dons.map((d) => (
              <div key={d.titre} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{d.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight" style={{ color: "#1E3524" }}>{d.titre}</p>
                    <p className="text-xs mt-1" style={{ color: "#6B4F34" }}>📍 {d.lieu}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#4F6B47" }}>{d.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs" style={{ color: "#C4B898" }}>par {d.auteur} · {d.date}</p>
                  <button className="px-3 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                    Je veux !
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(6,14,8,0.75)" }}
          onClick={() => setShowForm(false)}>
          <div className="rounded-3xl p-8 w-full max-w-md"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}
            onClick={e => e.stopPropagation()}>
            {formSent ? (
              <div className="text-center py-4">
                <span style={{ fontSize: 40 }}>✅</span>
                <p className="font-bold mt-3" style={{ color: "#1E3524" }}>Annonce publiée, merci !</p>
                <button onClick={() => setShowForm(false)} className="mt-4 px-6 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Fermer</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg mb-5" style={{ color: "#1E3524" }}>🎁 Proposer un don</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Titre de l'annonce" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <input type="text" placeholder="Ville / Quartier" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <textarea rows={3} placeholder="Description de l'objet à donner…" className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <div className="flex gap-3">
                    <button onClick={() => setFormSent(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Publier</button>
                    <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>Annuler</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
