"use client";
import { useState } from "react";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
];

const CATS = [
  { id: "tous",    icon: "🎁",  label: "Tous les dons"  },
  { id: "meubles", icon: "🪑",  label: "Meubles"        },
  { id: "vetements",icon: "👕", label: "Vêtements"      },
  { id: "livres",  icon: "📚",  label: "Livres & Jeux"  },
  { id: "jardin",  icon: "🌱",  label: "Jardin"         },
  { id: "auto",    icon: "🚗",  label: "Pièces auto"    },
  { id: "divers",  icon: "📦",  label: "Divers"         },
] as const;

type CatId = typeof CATS[number]["id"];

type Don = {
  id: number; emoji: string; titre: string; cat: Exclude<CatId, "tous">;
  lieu: string; cp: string; auteur: string; initiales: string; date: string;
  desc: string; etat: string; retrait: string;
};

const dons: Don[] = [
  {
    id: 1, emoji: "🛋️", titre: "Canapé 3 places gris clair", cat: "meubles",
    lieu: "Bordeaux", cp: "33", auteur: "Patrick M.", initiales: "PM",
    date: "Aujourd'hui",
    desc: "Canapé 3 places en tissu gris, bon état général. Légère usure sur un accoudoir. À démonter pour passer les escaliers (accès 3e étage sans ascenseur). Aide pour le chargement bienvenue !",
    etat: "Bon état", retrait: "À venir chercher sur place",
  },
  {
    id: 2, emoji: "📚", titre: "Lot de 20 livres jeunesse", cat: "livres",
    lieu: "Nantes", cp: "44", auteur: "Isabelle C.", initiales: "IC",
    date: "Hier",
    desc: "Lot de 20 albums et romans pour enfants de 4 à 10 ans. Auteurs variés (Roald Dahl, Bayard, Milan). Tous en très bon état, lus une ou deux fois. Parfait pour une petite bibliothèque de Terrier.",
    etat: "Très bon état", retrait: "À venir chercher ou dépôt possible dans le Terrier",
  },
  {
    id: 3, emoji: "🚲", titre: "Vélo enfant 20 pouces jaune", cat: "divers",
    lieu: "Strasbourg", cp: "67", auteur: "Margot F.", initiales: "MF",
    date: "Il y a 2 jours",
    desc: "Vélo jaune avec petites roues amovibles. Quelques éraflures normales mais il roule parfaitement. Convient pour un enfant de 5 à 8 ans. La pression des pneus est un peu basse, à regonfler.",
    etat: "Bon état", retrait: "À venir chercher sur place",
  },
  {
    id: 4, emoji: "🌿", titre: "Plants de tomates et courgettes", cat: "jardin",
    lieu: "Toulouse", cp: "31", auteur: "Jean-Paul R.", initiales: "JP",
    date: "Il y a 3 jours",
    desc: "Trop de plants cette année ! Une trentaine de plants de tomates cerises + une dizaine de courgettes rondes, prêts à repiquer. Biol, non traités, cultivés depuis les graines. Prendre avant fin mai.",
    etat: "Prêts à repiquer", retrait: "À venir chercher (jardin en périphérie)",
  },
  {
    id: 5, emoji: "🚗", titre: "Jantes aluminium 205/55 R16", cat: "auto",
    lieu: "Lyon", cp: "69", auteur: "Sébastien K.", initiales: "SK",
    date: "Il y a 4 jours",
    desc: "4 jantes alu avec pneus été, taille 205/55 R16. Pneus encore utilisables (60% d'usure). Pas de jante voilée ni fissurée. Idéal pour une deuxième monte ou roue de secours. Véhicule vendu.",
    etat: "Bon état", retrait: "À venir chercher (garage — appeler avant)",
  },
  {
    id: 6, emoji: "👶", titre: "Vêtements bébé 0-6 mois", cat: "vetements",
    lieu: "Rennes", cp: "35", auteur: "Sophie L.", initiales: "SL",
    date: "Il y a 5 jours",
    desc: "Grand sac de vêtements bébé mixte, saison printemps/été, taille 0 à 6 mois. Corps, grenouillères, pyjamas, bodys manches longues. Tout lavé à 30°, propre et en bon état.",
    etat: "Bon état — tout lavé", retrait: "À venir chercher ou envoi possible (frais acheteur)",
  },
];

const etapes = [
  { num: "1", texte: "Je publie un objet à donner" },
  { num: "2", texte: "Un membre intéressé me contacte" },
  { num: "3", texte: "On organise l'échange" },
  { num: "4", texte: "L'objet continue sa route 🌱" },
];

export default function DonnerPage() {
  const [cat,      setCat]      = useState<CatId>("tous");
  const [cp,       setCp]       = useState("");
  const [rayon,    setRayon]    = useState<string>("");
  const [selected, setSelected] = useState<Don | null>(null);
  const [msgSent,  setMsgSent]  = useState(false);
  const [showPublier, setShowPublier] = useState(false);
  const [publierSent, setPublierSent] = useState(false);

  const filtres = dons.filter((d) => {
    const matchCat = cat === "tous" || d.cat === cat;
    const matchCp  = !cp.trim() || d.cp.startsWith(cp.trim().slice(0, 2)) ||
      d.lieu.toLowerCase().includes(cp.trim().toLowerCase());
    return matchCat && matchCp;
  });

  const inputStyle = { backgroundColor: "#1a2e1c", border: "1px solid rgba(216,181,106,0.30)", color: "#F5EFD8" };
  const rayonActif = { backgroundColor: "#D8B56A", color: "#1E3524" };
  const rayonInactif = { backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(245,239,216,0.75)", border: "1px solid rgba(255,255,255,0.15)" };

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden">
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
              Ce dont tu n&apos;as plus besoin peut faire le bonheur de quelqu&apos;un d&apos;autre dans ton Terrier.
              Donne, reçois, fais circuler.
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

      {/* ═══ RECHERCHE GÉOGRAPHIQUE ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="px-4 pt-8 pb-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <p className="text-center text-sm font-bold" style={{ color: "#D8B56A" }}>
            🎁 Trouver un don près de chez moi
          </p>
          <div className="flex gap-2">
            <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-2xl" style={inputStyle}>
              <span>📍</span>
              <input value={cp} onChange={e => setCp(e.target.value)}
                placeholder="Ville, code postal ou département (ex : 67, Strasbourg…)"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#F5EFD8" }} />
              {cp && <button onClick={() => setCp("")} className="text-xs opacity-50 hover:opacity-100" style={{ color: "#F5EFD8" }}>✕</button>}
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["Autour de moi 📍", "Mon département", "Ma région", "Toute la France"] as const).map((label) => (
              <button key={label} onClick={() => setRayon(rayon === label ? "" : label)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={rayon === label ? rayonActif : rayonInactif}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CATÉGORIES ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-4 sm:grid-cols-7 gap-2">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className="rounded-2xl p-2.5 flex flex-col items-center gap-1 text-center transition-all"
              style={{
                backgroundColor: cat === c.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: cat === c.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${cat === c.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: cat === c.id ? "0 4px 18px rgba(216,181,106,0.30)" : "none",
              }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <span className="font-bold text-xs leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ ANNONCES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>
                Dons disponibles {cp ? `— ${cp}` : "près de chez vous"}
              </h2>
              <p className="text-xs mt-1" style={{ color: "#4F6B47" }}>
                {filtres.length} annonce{filtres.length !== 1 ? "s" : ""} disponible{filtres.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button onClick={() => { setShowPublier(true); setPublierSent(false); }}
              className="px-5 py-2.5 rounded-xl font-extrabold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              ➕ Je publie un don
            </button>
          </div>

          {filtres.length === 0 ? (
            <div className="text-center py-16 flex flex-col items-center gap-3">
              <span style={{ fontSize: 40 }}>🔍</span>
              <p className="font-semibold" style={{ color: "#1E3524" }}>Aucun don trouvé dans cette zone</p>
              <p className="text-sm" style={{ color: "#4F6B47" }}>Essaie un autre code postal ou sélectionne &quot;Toute la France&quot;.</p>
              <button onClick={() => { setCp(""); setCat("tous"); setRayon(""); }}
                className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold"
                style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                Tout afficher
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtres.map((d) => (
                <button key={d.id} onClick={() => { setSelected(d); setMsgSent(false); }}
                  className="rounded-2xl p-5 flex flex-col gap-3 text-left hover:shadow-lg transition-shadow cursor-pointer w-full"
                  style={{ backgroundColor: "#EDE4C4", border: "2px solid #C4B898" }}>
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{d.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-sm leading-snug" style={{ color: "#1E3524" }}>{d.titre}</p>
                      <div className="flex gap-2 mt-1 flex-wrap items-center">
                        <span className="text-xs font-semibold" style={{ color: "#4F6B47" }}>
                          {CATS.find(c => c.id === d.cat)?.icon} {CATS.find(c => c.id === d.cat)?.label}
                        </span>
                        <span className="text-xs" style={{ color: "#6B4F34" }}>📍 {d.lieu} ({d.cp})</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1 line-clamp-3" style={{ color: "#4F6B47" }}>{d.desc}</p>
                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "#C4B898" }}>
                    <p className="text-xs" style={{ color: "#C4B898" }}>
                      {d.auteur} · {d.date}
                    </p>
                    <span className="px-4 py-1.5 rounded-xl font-extrabold text-xs"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                      Je veux !
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ AVANT DE JETER ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-6 flex flex-col gap-3"
            style={{ backgroundColor: "#1E3524", border: "2px solid rgba(216,181,106,0.35)" }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 30 }}>🦔</span>
              <h3 className="font-extrabold text-base" style={{ color: "#D8B56A" }}>Avant de jeter, demande-toi :</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,216,0.85)" }}>
              Quelqu&apos;un dans le Terrier en a peut-être encore besoin.
              Un objet inutilisé chez toi peut devenir une ressource précieuse pour quelqu&apos;un d&apos;autre.
            </p>
            <p className="text-xs italic" style={{ color: "rgba(245,239,216,0.50)" }}>
              NigloMode favorise le don, l&apos;échange et la réutilisation — pas la revente professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ COMMENT ÇA MARCHE ═══ */}
      <section style={{ backgroundColor: "#F5EFD8", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center font-extrabold text-xl mb-8" style={{ color: "#1E3524" }}>
            Comment ça marche ?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {etapes.map((e) => (
              <div key={e.num} className="flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                  {e.num}
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: "#1E3524" }}>{e.texte}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => { setShowPublier(true); setPublierSent(false); }}
              className="px-8 py-3 rounded-2xl font-extrabold text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              ➕ Publier un don maintenant
            </button>
          </div>
        </div>
      </section>

      {/* ═══ MODAL FICHE COMPLÈTE ═══ */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(6,14,8,0.80)" }}
          onClick={() => setSelected(null)}>
          <div className="rounded-3xl w-full max-w-md overflow-hidden"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}
            onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="px-6 pt-6 pb-4 flex items-start gap-4" style={{ backgroundColor: "#EDE4C4", borderBottom: "1px solid #C4B898" }}>
              <span style={{ fontSize: 40 }}>{selected.emoji}</span>
              <div className="flex-1">
                <p className="font-extrabold text-base leading-snug" style={{ color: "#1E3524" }}>{selected.titre}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="text-xs font-semibold" style={{ color: "#4F6B47" }}>
                    {CATS.find(c => c.id === selected.cat)?.icon} {CATS.find(c => c.id === selected.cat)?.label}
                  </span>
                  <span className="text-xs" style={{ color: "#6B4F34" }}>📍 {selected.lieu} ({selected.cp})</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)}
                className="flex-shrink-0 text-lg leading-none"
                style={{ color: "#C4B898" }}>✕</button>
            </div>
            {/* Body */}
            <div className="px-6 py-5 flex flex-col gap-4">
              <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>{selected.desc}</p>
              <div className="flex gap-3 flex-wrap text-xs">
                <span className="px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  ✅ {selected.etat}
                </span>
                <span className="px-3 py-1 rounded-full font-semibold" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  🤝 {selected.retrait}
                </span>
              </div>
              <p className="text-xs" style={{ color: "#C4B898" }}>Publié par {selected.auteur} · {selected.date}</p>

              {msgSent ? (
                <div className="text-center py-4 rounded-2xl" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                  <p className="font-bold" style={{ color: "#1E3524" }}>Message envoyé 🦔</p>
                  <p className="text-xs mt-1" style={{ color: "#4F6B47" }}>{selected.auteur} te répondra bientôt.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <textarea rows={3} placeholder={`Un mot pour ${selected.auteur} (présente-toi, quand passer…)`}
                    className="px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <button onClick={() => setMsgSent(true)}
                    className="py-3 rounded-xl font-extrabold text-sm transition-opacity hover:opacity-85"
                    style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                    Je veux ! — Envoyer un message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL PUBLIER ═══ */}
      {showPublier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(6,14,8,0.80)" }}
          onClick={() => setShowPublier(false)}>
          <div className="rounded-3xl p-8 w-full max-w-md"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}
            onClick={e => e.stopPropagation()}>
            {publierSent ? (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <span style={{ fontSize: 40 }}>✅</span>
                <p className="font-bold text-lg" style={{ color: "#1E3524" }}>Don publié, merci !</p>
                <p className="text-sm" style={{ color: "#4F6B47" }}>L&apos;objet va continuer sa route dans le Terrier.</p>
                <button onClick={() => setShowPublier(false)} className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Fermer</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg mb-1" style={{ color: "#1E3524" }}>➕ Je publie un don</h3>
                <p className="text-xs mb-5" style={{ color: "#4F6B47" }}>Gratuit · Réservé aux dons, échanges et partages — pas à la vente.</p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Titre de l'annonce (ex : Canapé 3 places)" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <input type="text" placeholder="Ville ou code postal" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <textarea rows={4} placeholder="Description : état, dimensions, conditions de remise…" className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <div className="flex gap-3 mt-1">
                    <button onClick={() => setPublierSent(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Publier</button>
                    <button onClick={() => setShowPublier(false)} className="px-5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>Annuler</button>
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
