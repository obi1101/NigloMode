"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "objets" | "reparer" | "recuperer" | "ressourceries" | "bibliotheque";

type ObjetItem = {
  id: number; titre: string; type: "Don" | "Échange" | "Recherche";
  sousTheme: string; auteur: string; initiales: string; ville: string; date: string;
  desc: string; tags: string[];
};

type FicheContent = {
  id: number; icone: string; titre: string; type: string; tab: Exclude<Tab, "objets">;
  sousTheme: string; auteur: string; initiales: string; ville: string; date: string;
  desc: string; vues: number; likes: number; contributions: number; tags: string[];
};

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  { id: "objets",       icon: "📦", label: "Objets & Matériaux",      sublabel: "Donner, échanger, récupérer",
    items: ["Bois & palettes", "Matériaux de construction", "Électroménager", "Informatique & électronique", "Outils"] },
  { id: "reparer",      icon: "🔧", label: "Réparer & Transformer",   sublabel: "Réparer, fabriquer, reconditionner",
    items: ["Réparation meuble", "Réparation électroménager", "Couture & textile", "Reconditionnement", "Avant / Après"] },
  { id: "recuperer",    icon: "♻️", label: "Récup' Créative",         sublabel: "Détourner, créer, inventer",
    items: ["Détournement d'objets", "Mobilier récup'", "Décoration récup'", "Jardin récup'", "Zéro déchet"] },
  { id: "ressourceries",icon: "🏚️", label: "Ressourceries & Adresses",sublabel: "Ressourceries, dons, troc",
    items: ["Ressourceries", "Recycleries", "Emmaüs", "Dons locaux", "Troc"] },
  { id: "bibliotheque", icon: "📚", label: "Bibliothèque du Terrier", sublabel: "Guides, tutos, ressources",
    items: ["Guides PDF", "Tutoriels", "Plans", "Retours d'expérience", "Chaînes YouTube"] },
];

const objets: ObjetItem[] = [
  { id: 1, titre: "Lot de palettes bois — 6 pièces",            type: "Don",      sousTheme: "Bois & palettes",               auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse", date: "il y a 1 h",   desc: "Palettes en bon état, propres. À venir chercher sur place.",                                                       tags: ["Bois", "Palette"] },
  { id: 2, titre: "Lave-linge en panne — à réparer ou pièces",  type: "Don",      sousTheme: "Électroménager",                auteur: "Lucie M.",   initiales: "LM", ville: "Bordeaux", date: "il y a 3 h",   desc: "Panne pompe de vidange probable. Peut servir pour pièces ou à quelqu'un qui sait réparer.",                        tags: ["Électroménager", "Pièces"] },
  { id: 3, titre: "Étagères IKEA Billy — contre coup de main",  type: "Échange",  sousTheme: "Matériaux de construction",     auteur: "Sophie L.",  initiales: "SL", ville: "Lyon",     date: "il y a 5 h",   desc: "3 étagères complètes avec fixations. En échange d'un coup de main jardinage.",                                     tags: ["Meuble", "IKEA"] },
  { id: 4, titre: "Chutes de bois sec — chauffage ou bricolage",type: "Don",      sousTheme: "Bois & palettes",               auteur: "Marc B.",    initiales: "MB", ville: "Limoges",  date: "il y a 2 j",   desc: "Chutes de menuiserie, bois sec et propre, environ 1 stère. Libre service.",                                        tags: ["Bois", "Chauffage"] },
  { id: 5, titre: "Ordinateur portable — écran cassé",          type: "Don",      sousTheme: "Informatique & électronique",   auteur: "Pierre M.",  initiales: "PM", ville: "Thiers",   date: "il y a 1 j",   desc: "Fonctionne bien mais écran fissuré. Pour brancher sur écran externe ou récupérer les pièces.",                     tags: ["Informatique", "À réparer"] },
  { id: 6, titre: "Cherche cuve IBC 1000L eau de pluie",        type: "Recherche",sousTheme: "Matériaux de construction",     auteur: "Hélène R.",  initiales: "HR", ville: "Lyon",     date: "il y a 6 h",   desc: "Pour installation récupération eau de pluie. Je peux me déplacer dans un rayon de 50 km.",                         tags: ["Eau", "Récup"] },
];

const fiches: FicheContent[] = [
  /* ─── RÉPARER & TRANSFORMER ─── */
  { id: 101, tab: "reparer", icone: "🪵", titre: "Établi fait de 3 palettes en 2h — coût : 0€",        type: "Fabrication",         sousTheme: "Avant / Après",                auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse", date: "il y a 3 j",       desc: "Récupéré derrière un supermarché, assemblé avec des vis de récup. Dimensions, assemblage et finitions.",     vues: 312, likes: 67, contributions: 11, tags: ["Palettes", "DIY"] },
  { id: 102, tab: "reparer", icone: "🔧", titre: "Lave-linge réparé pour 4€ — joint de pompe",          type: "Réparation",          sousTheme: "Réparation électroménager",    auteur: "Lucie M.",   initiales: "LM", ville: "Bordeaux", date: "il y a 1 sem",     desc: "Diagnostic, commande sur Spareka, démontage et remontage. 15 minutes et 15 ans de plus.",                    vues: 487, likes: 89, contributions: 18, tags: ["Électroménager", "Économie"] },
  { id: 103, tab: "reparer", icone: "💧", titre: "Récupérateur d'eau en cuve IBC — 60€ tout compris",   type: "Reconditionnement",   sousTheme: "Reconditionnement",            auteur: "Marc B.",    initiales: "MB", ville: "Limoges",  date: "il y a 5 j",       desc: "Cuve 1000L LeBonCoin à 30€, raccord gouttière 30€. Arrose 80m² de potager tout l'été.",                      vues: 395, likes: 54, contributions: 9,  tags: ["Eau", "Récup"] },
  { id: 104, tab: "reparer", icone: "🔨", titre: "Démonte-palette artisanal — barre plate et marteau",  type: "Fabrication",         sousTheme: "Avant / Après",                auteur: "Marcel D.",  initiales: "MD", ville: "Limoges",  date: "il y a 2 sem",     desc: "Barre de fer plate coudée au chalumeau. Casse les palettes sans abîmer les planches.",                       vues: 278, likes: 49, contributions: 7,  tags: ["Outil", "Palettes"] },
  { id: 105, tab: "reparer", icone: "🪡", titre: "Vieille machine à coudre Singer des années 70",       type: "Réparation",          sousTheme: "Couture & textile",            auteur: "Sophie L.",  initiales: "SL", ville: "Bordeaux", date: "il y a 4 j",       desc: "Trouvée à la ressourcerie pour 8€. Nettoyage, huilage, réglage tension — comme neuve.",                      vues: 221, likes: 41, contributions: 13, tags: ["Couture", "Ressourcerie"] },
  { id: 106, tab: "reparer", icone: "🪑", titre: "Table de jardin fabriquée avec des chutes de bois",   type: "Réparation meuble",   sousTheme: "Réparation meuble",            auteur: "Hélène R.",  initiales: "HR", ville: "Lyon",     date: "il y a 1 sem",     desc: "Plateau en chutes de planches, pieds en rondin de bois. Ponçage, lasure. Résultat bluffant pour 0€.",        vues: 344, likes: 72, contributions: 15, tags: ["Bois", "Jardin"] },
  /* ─── RÉCUP' CRÉATIVE ─── */
  { id: 201, tab: "recuperer", icone: "🌿", titre: "Jardinières en caisses de fruits récupérées",       type: "Jardin récup'",       sousTheme: "Jardin récup'",                auteur: "Sophie L.",  initiales: "SL", ville: "Bordeaux", date: "il y a 2 j",       desc: "Caisses de primeur récupérées chez le marché, géotextile et substrat. 12 jardinières pour 0€.",              vues: 189, likes: 43, contributions: 8,  tags: ["Jardin", "Caisses"] },
  { id: 202, tab: "recuperer", icone: "📚", titre: "Étagère murale en demi-palettes peintes",           type: "Mobilier récup'",     sousTheme: "Mobilier récup'",              auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse", date: "il y a 5 j",       desc: "Demi-palette, peinture craie et cire. L'étagère est accrochée au mur et supporte 30 kg.",                   vues: 312, likes: 67, contributions: 12, tags: ["Palettes", "Déco"] },
  { id: 203, tab: "recuperer", icone: "💡", titre: "Luminaire bocaux en verre — ambiance terrier",      type: "Décoration récup'",   sousTheme: "Décoration récup'",            auteur: "Hélène R.",  initiales: "HR", ville: "Lyon",     date: "il y a 1 sem",     desc: "Bocaux récupérés, câble textile et douilles E27. 3 bocaux suspendus pour un coût total de 12€.",             vues: 267, likes: 58, contributions: 10, tags: ["Luminaire", "Bocaux"] },
  { id: 204, tab: "recuperer", icone: "🧶", titre: "Tapis tressé avec des chutes de tissu",             type: "Détournement d'objets",sousTheme: "Détournement d'objets",        auteur: "Lucie M.",   initiales: "LM", ville: "Bordeaux", date: "il y a 3 j",       desc: "Vieux draps et vêtements découpés en bandes, tressés à la main. Aucun déchet textile — tout est valorisé.",  vues: 198, likes: 45, contributions: 7,  tags: ["Textile", "Tressage"] },
  { id: 205, tab: "recuperer", icone: "♻️", titre: "Zéro déchet cuisine — les bocaux qui remplacent tout", type: "Zéro déchet",      sousTheme: "Zéro déchet",                  auteur: "Sophie L.",  initiales: "SL", ville: "Lyon",     date: "il y a 4 j",       desc: "Bocaux récupérés pour stocker farines, légumineuses, épices. Fini les sacs plastiques et boîtes inutiles.",  vues: 223, likes: 51, contributions: 14, tags: ["Zéro déchet", "Cuisine"] },
  /* ─── RESSOURCERIES & ADRESSES ─── */
  { id: 301, tab: "ressourceries", icone: "🏪", titre: "Comment trouver une ressourcerie près de chez toi", type: "Ressourceries",  sousTheme: "Ressourceries",                auteur: "Marc B.",    initiales: "MB", ville: "France",   date: "il y a 1 sem",     desc: "Le réseau des ressourceries françaises dispose d'un annuaire en ligne. Guide pour trouver le point de collecte le plus proche.",  vues: 445, likes: 98, contributions: 23, tags: ["Ressourcerie", "Annuaire"] },
  { id: 302, tab: "ressourceries", icone: "☕", titre: "Les Repair Cafés — réparer ensemble gratuitement", type: "Recycleries",     sousTheme: "Recycleries",                  auteur: "Pierre M.",  initiales: "PM", ville: "France",   date: "il y a 2 sem",     desc: "Des bénévoles réparent gratuitement vos objets cassés. Brasserie, vêtements, électronique, jouets. Annuaire des 400 Repair Cafés en France.",  vues: 387, likes: 84, contributions: 19, tags: ["Repair Café", "Gratuit"] },
  { id: 303, tab: "ressourceries", icone: "🤝", titre: "Emmaüs — donner et acheter solidaire",           type: "Emmaüs",           sousTheme: "Emmaüs",                       auteur: "Lucie M.",   initiales: "LM", ville: "France",   date: "il y a 3 j",       desc: "350 communautés Emmaüs en France. Comment donner, ce qu'ils acceptent, et comment acheter dans les boutiques.",  vues: 312, likes: 71, contributions: 16, tags: ["Emmaüs", "Solidarité"] },
  { id: 304, tab: "ressourceries", icone: "🔄", titre: "Les SEL — Systèmes d'échange locaux",           type: "Troc",             sousTheme: "Troc",                         auteur: "Hélène R.",  initiales: "HR", ville: "France",   date: "il y a 1 sem",     desc: "Les SEL permettent d'échanger des services et objets sans argent. Comment rejoindre ou créer un SEL dans ton territoire.",  vues: 198, likes: 44, contributions: 11, tags: ["SEL", "Échange"] },
  /* ─── BIBLIOTHÈQUE ─── */
  { id: 401, tab: "bibliotheque", icone: "📖", titre: "Guide complet : réparer son électroménager soi-même", type: "Guides PDF",  sousTheme: "Guides PDF",                   auteur: "Lucie M.",   initiales: "LM", ville: "Bordeaux", date: "il y a 1 mois",    desc: "Les 10 pannes les plus courantes sur lave-linge, lave-vaisselle et frigo. Diagnostic et pièces.",             vues: 621, likes: 134, contributions: 18, tags: ["Électroménager", "Guide"] },
  { id: 402, tab: "bibliotheque", icone: "🗺️", titre: "Les meilleures ressourceries par département",  type: "Retours d'expérience",sousTheme: "Retours d'expérience",        auteur: "Sophie L.",  initiales: "SL", ville: "France",   date: "enrichi régulièrement", desc: "Liste collaborative mise à jour par la communauté. Ressourceries, Emmaüs, repair cafés, recycleries.",       vues: 834, likes: 187, contributions: 42, tags: ["Ressourceries", "Collaboratif"] },
  { id: 403, tab: "bibliotheque", icone: "🎬", titre: "Chaînes YouTube — réparation et récupération",  type: "Chaînes YouTube",    sousTheme: "Chaînes YouTube",              auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse", date: "il y a 2 sem",     desc: "Sélection des meilleures chaînes francophones pour apprendre à réparer, récupérer et fabriquer.",             vues: 412, likes: 89, contributions: 27, tags: ["YouTube", "Formation"] },
  { id: 404, tab: "bibliotheque", icone: "🪚", titre: "Tutoriel : bacs de culture en palettes",        type: "Tutoriels",           sousTheme: "Tutoriels",                    auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse", date: "il y a 3 sem",     desc: "Palettes, géotextile, substrat. Dimensions, montage, remplissage et premiers semis. Complet et gratuit.",     vues: 412, likes: 91, contributions: 11, tags: ["Tutoriel", "Potager"] },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Don":        { bg: "rgba(79,107,71,0.18)",  color: "#2d5a27" },
  "Échange":    { bg: "rgba(216,181,106,0.22)",color: "#7a5c1e" },
  "Recherche":  { bg: "rgba(107,79,52,0.18)",  color: "#6B4F34" },
};

const lucioles = [
  { top: "12%", left: "8%",  r: 2.5 }, { top: "28%", left: "92%", r: 2 },
  { top: "55%", left: "5%",  r: 1.8 }, { top: "70%", left: "88%", r: 2.2 },
  { top: "18%", left: "75%", r: 1.5 }, { top: "42%", left: "95%", r: 2 },
  { top: "82%", left: "15%", r: 1.8 }, { top: "8%",  left: "55%", r: 2.2 },
  { top: "65%", left: "48%", r: 1.5 }, { top: "35%", left: "22%", r: 2 },
  { top: "90%", left: "72%", r: 1.8 }, { top: "22%", left: "38%", r: 1.5 },
];

const contributionsOptions = [
  { icon: "📷", label: "Ajouter des photos" },
  { icon: "📝", label: "Partager une expérience" },
  { icon: "🔗", label: "Ajouter une ressource" },
  { icon: "💡", label: "Partager une astuce" },
];

export default function ReemploiRessourcesPage() {
  const [tab, setTab] = useState<Tab>("objets");
  const [showForm, setShowForm] = useState(false);
  const [ficheActive, setFicheActive] = useState<number | null>(null);
  const [recherche, setRecherche] = useState("");

  const currentTab = tabs.find((t) => t.id === tab)!;
  const sousThemeActif = currentTab.items.includes(recherche) ? recherche : null;

  const objetsFiltres = objets.filter((o) => {
    if (tab !== "objets") return false;
    if (!recherche) return true;
    if (sousThemeActif) return o.sousTheme === sousThemeActif;
    return o.titre.toLowerCase().includes(recherche.toLowerCase()) || o.desc.toLowerCase().includes(recherche.toLowerCase());
  });

  const fichesFiltrees = fiches.filter((f) => {
    if (f.tab !== tab) return false;
    if (!recherche) return true;
    if (sousThemeActif) return f.sousTheme === sousThemeActif;
    return f.titre.toLowerCase().includes(recherche.toLowerCase()) || f.desc.toLowerCase().includes(recherche.toLowerCase());
  });

  const isEmpty = tab === "objets" ? objetsFiltres.length === 0 : fichesFiltrees.length === 0;
  const count   = tab === "objets" ? objetsFiltres.length : fichesFiltrees.length;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/les-3r-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        {/* Voile sombre pour lisibilité du texte */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.25) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 52 }}>♻️</span>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", lineHeight: 1.2, textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              LES 3R DU te<span style={{ color: "#D8B56A" }}>RR</span>ie<span style={{ color: "#D8B56A" }}>R</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 6px rgba(6,14,8,0.7)" }}>
              Récupérer · Réemployer · Ressourcer
            </p>
            <p style={{ color: "rgba(245,239,216,0.95)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Donner une seconde vie aux objets, partager des savoir-faire et valoriser ce qui existe déjà.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Un Niglo malin voit une ressource là où d&apos;autres voient un déchet.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setFicheActive(null); setRecherche(""); }}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center transition-all"
              style={{
                backgroundColor: tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: tab === t.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: tab === t.id ? "0 4px 18px rgba(216,181,106,0.30)" : "0 1px 4px rgba(0,0,0,0.25)",
              }}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <span className="font-bold text-xs leading-tight">{t.label}</span>
              <span className="text-xs opacity-55 leading-tight hidden sm:block">{t.sublabel}</span>
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
            <button onClick={() => setShowForm(true)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Proposer un thème
            </button>
          </div>
        </div>
      </section>

      {/* ═══ FICHES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "#1E3524" }}>
                {currentTab.icon} {currentTab.label}
                <span className="text-sm font-normal opacity-40">({count})</span>
              </h2>
              {tab === "bibliotheque" && <p className="text-xs mt-0.5 opacity-50" style={{ color: "#1E3524" }}>Base de connaissances collaborative — enrichie par la communauté</p>}
            </div>
            <button onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
              + Publier
            </button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucun contenu trouvé</p>
              <p className="text-sm mt-1">Sois le premier à publier sur ce sujet.</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
                + Publier
              </button>
            </div>

          ) : tab === "objets" ? (
            /* ─── GRILLE OBJETS (classifieds) ─── */
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {objetsFiltres.map((o) => {
                const tc = typeColors[o.type] ?? { bg: "rgba(79,107,71,0.15)", color: "#2d5a27" };
                return (
                  <div key={o.id}
                    className="flex flex-col cursor-pointer transition-all hover:-translate-y-1"
                    style={{
                      background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                      border: "1px solid #C4B898", borderRadius: "4px",
                      boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.10)",
                      overflow: "hidden",
                    }}>
                    {/* Onglet type */}
                    <div style={{ backgroundColor: o.type === "Don" ? "#4F6B47" : o.type === "Échange" ? "#c8860a" : "#6B4F34", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5EFD8" }}>
                      <span>{o.type === "Don" ? "🎁" : o.type === "Échange" ? "🔄" : "🔍"}</span>
                      <span>{o.type}</span>
                    </div>
                    {/* Titre */}
                    <div style={{ padding: "14px 18px 6px" }}>
                      <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35 }}>{o.titre}</h3>
                    </div>
                    {/* Desc */}
                    <div style={{ padding: "4px 18px 12px", flex: 1 }}>
                      <p style={{ color: "#6B4F34", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", opacity: 0.9 }}>{o.desc}</p>
                    </div>
                    {/* Tags */}
                    <div style={{ padding: "4px 18px 10px", display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {o.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid rgba(79,107,71,0.2)" }}>{tag}</span>
                      ))}
                    </div>
                    {/* Pied */}
                    <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />
                    <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#4F6B47", color: "#F5EFD8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{o.initiales}</div>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 600, color: "#1E3524" }}>{o.auteur}</p>
                          <p style={{ fontSize: 10, color: "#1E3524", opacity: 0.4 }}>📍 {o.ville} · {o.date}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        Contacter
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          ) : (
            /* ─── GRILLE FICHES (savoirs / ressources) ─── */
            <div className={`grid gap-5 ${tab === "bibliotheque" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {fichesFiltrees.map((f) => (
                <div key={f.id}
                  className="flex flex-col cursor-pointer transition-all hover:-translate-y-1"
                  style={{
                    background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                    border: "1px solid #C4B898", borderRadius: "4px",
                    boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.10)",
                    overflow: "hidden",
                  }}>
                  {/* Onglet sous-thème */}
                  <div style={{ backgroundColor: "#1E3524", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D8B56A" }}>
                    <span>{f.sousTheme.split(" ")[0]}</span>
                    <span style={{ color: "#E9DFC8" }}>{f.sousTheme}</span>
                  </div>
                  {/* Icone */}
                  <div style={{ paddingTop: 18, paddingBottom: 4, textAlign: "center" }}>
                    <span style={{ fontSize: 44 }}>{f.icone}</span>
                  </div>
                  {/* Titre */}
                  <div style={{ padding: "4px 18px 8px", textAlign: "center" }}>
                    <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35, display: "inline", borderBottom: "2px solid rgba(30,53,36,0.2)", paddingBottom: 3 }}>{f.titre}</h3>
                  </div>
                  {/* Desc */}
                  <div style={{ padding: "4px 18px 12px", flex: 1 }}>
                    <p style={{ color: "#6B4F34", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", textAlign: "center", opacity: 0.9 }}>{f.desc}</p>
                  </div>
                  {/* Stats */}
                  <div style={{ padding: "4px 18px 10px", display: "flex", justifyContent: "center", gap: 16 }}>
                    <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>👁 {f.vues}</span>
                    <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>❤️ {f.likes}</span>
                  </div>
                  {/* Pied */}
                  <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />
                  <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontStyle: "italic", color: "#6B4F34", opacity: 0.75 }}>✍ {f.auteur}</span>
                    <button onClick={(e) => { e.stopPropagation(); setFicheActive(ficheActive === f.id ? null : f.id); }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                      Voir & Contribuer
                    </button>
                  </div>
                  {ficheActive === f.id && (
                    <div className="px-5 py-4 flex flex-col gap-3"
                      style={{ backgroundColor: "rgba(79,107,71,0.08)", borderTop: "1px solid #C4B898" }}>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>🤝 Contribuer à cette fiche</p>
                      <div className="flex flex-wrap gap-2">
                        {contributionsOptions.map((c) => (
                          <button key={c.label}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: "#F5EFD8", color: "#1E3524", border: "1px solid #C4B898" }}>
                            {c.icon} {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ PHILOSOPHIE 3R ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative py-12 px-4 text-white overflow-hidden">
        {lucioles.slice(0, 8).map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.6 }} />
        ))}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <span style={{ fontSize: 44 }}>♻️</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>Rien ne se perd, tout se transforme !</h2>
          <p style={{ color: "rgba(233,223,200,0.75)", lineHeight: 1.75 }} className="text-sm max-w-xl">
            NIGLOMODE est une grande ressourcerie communautaire numérique.
            Ce que tu n&apos;utilises plus peut transformer le quotidien de quelqu&apos;un d&apos;autre.
            Chaque savoir-faire partagé, chaque objet sauvé enrichit le Terrier.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Récupérer", "Réemployer", "Ressourcer", "Transmettre"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>{v}</span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90 mt-1"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            ♻️ Publier un objet ou une astuce
          </button>
        </div>
      </section>

      {/* ═══ FORMULAIRE PUBLICATION ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Publier dans les 3R du Terrier</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
              <span>♻️</span><span>Rien ne se perd ici. Partage un objet, un savoir-faire ou une adresse utile.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "📦 Un objet", desc: "Je donne, j'échange ou je cherche" },
                { label: "🔧 Un savoir-faire", desc: "Réparation, fabrication, astuce" },
                { label: "🏚️ Une adresse", desc: "Ressourcerie, repair café, SEL" },
              ].map((t) => (
                <button key={t.label} type="button"
                  className="flex-1 min-w-[110px] px-3 py-2.5 rounded-xl text-xs font-semibold border-2 text-left transition-all hover:border-green-700"
                  style={{ backgroundColor: "#EDE0C0", color: "#1E3524", borderColor: "#C4B898" }}>
                  <p className="font-bold">{t.label}</p>
                  <p className="opacity-50 mt-0.5">{t.desc}</p>
                </button>
              ))}
            </div>
            {[
              { label: "Titre *",   type: "text", placeholder: "Décris en quelques mots ce que tu partages" },
              { label: "Ta ville",  type: "text", placeholder: "Pour contextualiser (région, climat…)" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Description</label>
              <textarea rows={4} placeholder="État, dimensions, contexte, étapes, retour d'expérience…"
                className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Photos</label>
              <input type="file" multiple accept="image/*" className="text-sm" style={{ color: "#1E3524" }} />
            </div>
            <button className="w-full py-3 rounded-full font-bold text-base mt-1"
              style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
              Publier
            </button>
          </div>
        </div>
      )}

      <div className="text-center py-8" style={{ backgroundColor: "#E9DFC8" }}>
        <Link href="/" className="text-sm opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#1E3524" }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
