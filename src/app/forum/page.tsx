"use client";
import { useState } from "react";
import Link from "next/link";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
];

const categories = [
  { icon: "🗣️", nom: "Discussion libre",          slug: "discussion-libre",          desc: "Parle de tout, de rien, du Terrier et d'ailleurs.",       fils: 142, msgs: 2890, dernierMsg: "Il y a 5 min",    tag: "Actif" },
  { icon: "💡", nom: "Idées & Suggestions",        slug: "idees-suggestions",         desc: "Propose des améliorations pour NIGLOMODE ou ton Terrier.", fils: 38,  msgs: 512,  dernierMsg: "Il y a 22 min",   tag: "Populaire" },
  { icon: "🆘", nom: "Coup de main urgent",        slug: "coup-de-main-urgent",       desc: "Besoin d'aide rapidement ? La communauté répond vite.",    fils: 24,  msgs: 310,  dernierMsg: "Il y a 1h",      tag: "Urgent" },
  { icon: "🔧", nom: "Bricolage & Réparation",     slug: "bricolage-reparation",      desc: "Conseils, questions techniques, retours d'expérience.",    fils: 87,  msgs: 1240, dernierMsg: "Il y a 2h",      tag: "" },
  { icon: "🌱", nom: "Jardin & Potager",           slug: "jardin-potager",            desc: "Partager les récoltes, les questions et les semences.",    fils: 65,  msgs: 980,  dernierMsg: "Il y a 3h",      tag: "" },
  { icon: "🍲", nom: "Cuisine & Recettes",         slug: "cuisine-recettes",          desc: "Recettes, conserves, fermentation, anti-gaspi.",           fils: 113, msgs: 1760, dernierMsg: "Hier",           tag: "" },
  { icon: "📢", nom: "Annonces du Terrier",        slug: "annonces-terrier",          desc: "Événements, collectes, rendez-vous locaux.",               fils: 29,  msgs: 445,  dernierMsg: "Hier",           tag: "" },
  { icon: "🤔", nom: "Questions administratives",  slug: "questions-administratives", desc: "Aides, démarches, associations — entre nous.",             fils: 51,  msgs: 730,  dernierMsg: "Il y a 2 jours", tag: "" },
];

const tagColor: Record<string, { bg: string; text: string }> = {
  "Actif":     { bg: "rgba(79,107,71,0.15)",  text: "#4F6B47" },
  "Populaire": { bg: "rgba(216,181,106,0.20)", text: "#6B4F34" },
  "Urgent":    { bg: "rgba(180,60,40,0.12)",   text: "#8B3A2A" },
};

export default function ForumPage() {
  const [recherche, setRecherche] = useState("");

  const filtrees = recherche
    ? categories.filter(c => c.nom.toLowerCase().includes(recherche.toLowerCase()) || c.desc.toLowerCase().includes(recherche.toLowerCase()))
    : categories;

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
          <span style={{ fontSize: 52 }}>🗣️</span>
          <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
            LE FORUM DU <span style={{ color: "#D8B56A" }}>TERRIER</span>
          </h1>
          <p style={{ color: "rgba(245,239,216,0.75)", lineHeight: 1.75, maxWidth: 480 }}>
            L&apos;espace de discussion libre de la communauté. Pose une question, partage une astuce, ou juste dis bonjour.
          </p>
          <div className="w-full max-w-md mt-2">
            <input type="text" value={recherche} onChange={e => setRecherche(e.target.value)}
              placeholder="Rechercher une catégorie…"
              className="w-full px-5 py-3 rounded-2xl text-sm outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "#F5EFD8" }} />
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 20 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Une bonne question posée au Terrier trouve toujours sa réponse.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ STATISTIQUES ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pb-6 pt-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-4 justify-center">
          {[
            { val: "549", label: "Fils de discussion" },
            { val: "8 867", label: "Messages" },
            { val: "1 243", label: "Membres actifs" },
            { val: "12", label: "En ligne maintenant" },
          ].map(s => (
            <div key={s.label} className="text-center px-6 py-3 rounded-2xl"
              style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
              <p className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>{s.val}</p>
              <p className="text-xs" style={{ color: "rgba(245,239,216,0.6)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>Catégories du forum</h2>
            <button className="px-4 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              ✏️ Nouveau fil
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {filtrees.map((c) => (
              <Link key={c.nom} href={`/forum/${c.slug}`}
                className="rounded-2xl px-5 py-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <span style={{ fontSize: 32, flexShrink: 0 }}>{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-sm" style={{ color: "#1E3524" }}>{c.nom}</p>
                    {c.tag && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: tagColor[c.tag]?.bg, color: tagColor[c.tag]?.text }}>
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5 truncate" style={{ color: "#4F6B47" }}>{c.desc}</p>
                </div>
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-xs font-semibold" style={{ color: "#1E3524" }}>{c.fils} fils</p>
                  <p className="text-xs opacity-50" style={{ color: "#1E3524" }}>{c.msgs} msgs</p>
                  <p className="text-xs mt-1" style={{ color: "#C4B898" }}>{c.dernierMsg}</p>
                </div>
                <span className="text-lg flex-shrink-0" style={{ color: "#C4B898" }}>›</span>
              </Link>
            ))}
            {filtrees.length === 0 && (
              <p className="text-center py-10 text-sm" style={{ color: "#4F6B47" }}>
                Aucune catégorie ne correspond à &ldquo;{recherche}&rdquo;
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ═══ RÈGLES ═══ */}
      <section style={{ backgroundColor: "#EDE4C4" }} className="py-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold mb-2" style={{ color: "#1E3524" }}>🦔 L&apos;esprit du Terrier</p>
          <p className="text-xs leading-relaxed" style={{ color: "#4F6B47" }}>
            Ce forum est un espace bienveillant. On s&apos;entraide, on se respecte, on reste constructif.
            Les messages haineux, les spams et les publicités sont supprimés sans préavis.
          </p>
          <Link href="/mentions-legales" className="text-xs underline mt-3 inline-block" style={{ color: "#C4B898" }}>
            Mentions légales & conditions d&apos;utilisation
          </Link>
        </div>
      </section>
    </main>
  );
}
