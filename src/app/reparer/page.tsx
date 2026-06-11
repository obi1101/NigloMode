"use client";
import { useState } from "react";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
  { top: "82%", left: "18%", r: 2 }, { top: "7%",  left: "50%", r: 3 },
];

const tabs = [
  { id: "electro",  icon: "🔌", label: "Électroménager",  sublabel: "Réparer chez soi",    items: ["Lave-linge", "Réfrigérateur", "Four", "Micro-ondes", "Aspirateur", "Cafetière", "Grille-pain", "Bouilloire"] },
  { id: "velos",    icon: "🚲", label: "Vélos & Mobilité",sublabel: "Roue libre",          items: ["Crevaison", "Freins", "Dérailleur", "Chaîne", "Guidon", "Selle", "Éclairage", "Trottinette"] },
  { id: "vetements",icon: "🧵", label: "Vêtements",       sublabel: "Couture & reprisage", items: ["Ourlet", "Fermeture éclair", "Bouton", "Accroc", "Doublure", "Patch", "Reteindre", "Détacher"] },
  { id: "mobilier", icon: "🪑", label: "Mobilier",        sublabel: "Bois & tissus",       items: ["Chaise", "Table", "Armoire", "Tiroir", "Recourir", "Poncer", "Peinture", "Vernis"] },
  { id: "elec",     icon: "💡", label: "Électronique",    sublabel: "Bidouille & soudure", items: ["Téléphone", "Ordinateur", "Tablette", "Écouteurs", "Lampe", "Câble", "Batterie", "Console"] },
  { id: "autres",   icon: "🔧", label: "Autres",          sublabel: "Tout le reste",       items: ["Jouets", "Outils", "Jardin", "Sport", "Musique", "Optique", "Chaussures", "Maroquinerie"] },
];

const conseils = [
  { emoji: "🔌", titre: "Lave-linge qui ne vidange plus", difficulte: "Facile", temps: "30 min", auteur: "Marie T.", texte: "Souvent le filtre de vidange est bouché. Il se trouve sous une trappe en façade. Dévisse-le, vide l'eau, nettoie. 9 fois sur 10 ça règle le problème !" },
  { emoji: "🚲", titre: "Réparer une crevaison en 10 min", difficulte: "Facile", temps: "10 min", auteur: "Jérôme L.", texte: "Démonte la roue, repère le trou avec de l'eau savonneuse, ponçe légèrement, colle la rustine, remonte. Ne pas oublier de chercher la cause (bout de verre, épine)." },
  { emoji: "🧵", titre: "Repriser un jean sans machine", difficulte: "Moyen", temps: "45 min", auteur: "Sylvie K.", texte: "Utilise du fil résistant et fais des points en croix à la main. Pour les trous entre les cuisses, un bout de tissu en renfort par l'intérieur avant de repriser donne un résultat solide." },
  { emoji: "💡", titre: "Changer la batterie d'un smartphone", difficulte: "Avancé", temps: "1h", auteur: "Théo M.", texte: "Outillage : ventouses, spudger, vis cruciforme fine. Chauffe légèrement les bords, insère la ventouse, soulève doucement. La batterie est collée — prends ton temps. Kit batterie neuve : 15-25€." },
  { emoji: "🪑", titre: "Restaurer une chaise en bois", difficulte: "Facile", temps: "2h", auteur: "Camille R.", texte: "Ponce, applique une sous-couche, puis 2 couches de peinture ou vernis. Pour les chevilles décollées, injecte de la colle à bois avec une seringue, serre avec un serre-joint 24h." },
  { emoji: "🔧", titre: "Atelier réparation café au Terrier", difficulte: "Tous niveaux", temps: "–", auteur: "Le Terrier de Metz", texte: "Chaque mardi soir, le Terrier de Metz accueille un atelier réparation libre. Amène ton objet cassé, un bénévole t'aidera à le remettre en état. Café offert !" },
];

export default function ReparerPage() {
  const [tab, setTab]           = useState("electro");
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const currentTab = tabs.find(t => t.id === tab)!;

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.55) 0%, rgba(6,14,8,0.30) 50%, rgba(6,14,8,0.60) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 52 }}>🔧</span>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", lineHeight: 1.2, textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              RÉPARER PLUTÔT <span style={{ color: "#D8B56A" }}>QUE JETER</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
              Guides · Astuces · Ateliers · Entraide
            </p>
            <p style={{ color: "rgba(245,239,216,0.90)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500 }}>
              Avant de jeter, essaie de réparer. La communauté partage ses techniques, ses astuces et ses ateliers locaux.
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Un objet réparé vaut deux fois plus qu&apos;un objet neuf.&rdquo;
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
              ➕ Proposer un guide
            </button>
          </div>
        </div>
      </section>

      {/* ═══ CONSEILS ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>
              💡 Guides & astuces de la communauté
            </h2>
            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#EDE4C4", color: "#4F6B47", border: "1px solid #C4B898" }}>
              {conseils.length} fiches
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {conseils.map((c) => (
              <div key={c.titre} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <div className="flex items-start gap-3">
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{c.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm leading-tight" style={{ color: "#1E3524" }}>{c.titre}</p>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#4F6B47", border: "1px solid #C4B898" }}>{c.difficulte}</span>
                      {c.temps !== "–" && <span className="px-2 py-0.5 rounded-full text-xs" style={{ color: "#6B4F34" }}>⏱ {c.temps}</span>}
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "#4F6B47" }}>{c.texte}</p>
                <p className="text-xs font-medium mt-auto" style={{ color: "#C4B898" }}>par {c.auteur}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MODALE PROPOSITION ═══ */}
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
                <p className="font-bold mt-3" style={{ color: "#1E3524" }}>Guide proposé, merci !</p>
                <button onClick={() => setShowForm(false)} className="mt-4 px-6 py-2 rounded-xl text-sm font-bold" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Fermer</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg mb-5" style={{ color: "#1E3524" }}>➕ Proposer un guide de réparation</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Titre du guide" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <textarea rows={4} placeholder="Décris la technique de réparation…" className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <div className="flex gap-3">
                    <button onClick={() => setFormSent(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Envoyer</button>
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
