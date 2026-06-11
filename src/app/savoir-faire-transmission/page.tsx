"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "tutoriels" | "artisanat" | "metiers" | "retours" | "questions" | "transmission";

type FicheContenu = {
  id: number;
  icone: string;
  titre: string;
  tab: Tab;
  sousTheme: string;
  auteur: string;
  initiales: string;
  ville: string;
  date: string;
  desc: string;
  vues: number;
  likes: number;
  tags: string[];
  isQuestion?: boolean;
  reponses?: number;
};

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  { id: "tutoriels",    icon: "🛠️", label: "Tutoriels & Guides",      sublabel: "Apprendre étape par étape",
    items: ["Tutoriels pratiques", "Guides débutants", "Méthodes détaillées", "Pas à pas illustrés", "Astuces techniques"] },
  { id: "artisanat",    icon: "🎨", label: "Artisanat & Créations",    sublabel: "Savoir-faire manuels",
    items: ["Travail du bois", "Forge", "Couture & textile", "Céramique", "Vannerie"] },
  { id: "metiers",      icon: "👨‍🌾", label: "Métiers & Compétences",   sublabel: "Techniques et réalités du terrain",
    items: ["Maraîchage", "Apiculture", "Ébénisterie", "Ferronnerie", "Métiers manuels"] },
  { id: "retours",      icon: "📖", label: "Retours d'expérience",     sublabel: "Ce qui a marché... ou non",
    items: ["Premières récoltes", "Chantiers réalisés", "Échecs instructifs", "Tests & comparatifs", "Expériences personnelles"] },
  { id: "questions",    icon: "❓", label: "Questions & Réponses",     sublabel: "Demander, répondre, progresser",
    items: ["Dépannage", "Conseils pratiques", "Problèmes courants", "Questions débutants", "Entraide technique"] },
  { id: "transmission", icon: "🧠", label: "Transmission & Mémoire",   sublabel: "Préserver les savoirs du Terrier",
    items: ["Gestes anciens", "Techniques traditionnelles", "Témoignages", "Métiers d'autrefois", "Patrimoine vivant"] },
];

const fiches: FicheContenu[] = [
  /* ─── TUTORIELS & GUIDES ─── */
  { id: 1,  tab: "tutoriels",    icone: "♻️", titre: "Fabriquer un composteur en palettes en 3h",                  sousTheme: "Tutoriels pratiques",     auteur: "Sophie L.",  initiales: "SL", ville: "Toulouse",   date: "il y a 4 j",     desc: "3 palettes, des vis, 30 minutes. Dimensions, assemblage, aération, remplissage — tout y est avec les vraies mesures.",              vues: 534, likes: 112, tags: ["Compost", "Palette"] },
  { id: 2,  tab: "tutoriels",    icone: "🌳", titre: "Greffer un pommier : guide du débutant en images",           sousTheme: "Pas à pas illustrés",     auteur: "Marc B.",    initiales: "MB", ville: "Limoges",    date: "il y a 1 sem",   desc: "Greffe en écusson expliquée pas à pas. Matériel, période, geste exact, pansement — avec les erreurs à éviter absolument.",          vues: 678, likes: 143, tags: ["Greffe", "Fruitiers"] },
  { id: 3,  tab: "tutoriels",    icone: "🍞", titre: "Faire son pain au levain naturel — les bases",               sousTheme: "Guides débutants",        auteur: "Hélène R.",  initiales: "HR", ville: "Lyon",       date: "il y a 2 sem",   desc: "Créer et entretenir un levain-chef, dosages, fermentation, façonnage et cuisson. Le guide qui évite 3 mois d'erreurs.",             vues: 891, likes: 201, tags: ["Pain", "Levain"] },
  /* ─── ARTISANAT & CRÉATIONS ─── */
  { id: 4,  tab: "artisanat",    icone: "🪵", titre: "Tournage bois — mes premières tasses en frêne",              sousTheme: "Travail du bois",         auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse",   date: "il y a 5 j",     desc: "Récit complet de mes 3 premiers tournages. Outils de récup, tour d'occasion, techniques d'affûtage et finitions à l'huile.",        vues: 312, likes: 74,  tags: ["Tournage", "Bois"] },
  { id: 5,  tab: "artisanat",    icone: "🧺", titre: "Panier en osier — ma première vannerie",                     sousTheme: "Vannerie",                auteur: "Lucie M.",   initiales: "LM", ville: "Bordeaux",   date: "il y a 1 sem",   desc: "Osier récupéré au bord du ruisseau, mis à tremper, façonné en 4h. Patron, tressage de fond et montants, anse. 0€.",                 vues: 267, likes: 58,  tags: ["Vannerie", "Osier"] },
  { id: 6,  tab: "artisanat",    icone: "🏺", titre: "Céramique sans four — la technique des pincements",          sousTheme: "Céramique",               auteur: "Pierre M.",  initiales: "PM", ville: "Thiers",     date: "il y a 3 j",     desc: "Argile locale préparée à la main, séchage lent à l'air, peintures naturelles. Des bols rustiques et durables sans infrastructure.",  vues: 189, likes: 43,  tags: ["Céramique", "Argile"] },
  /* ─── MÉTIERS & COMPÉTENCES ─── */
  { id: 7,  tab: "metiers",      icone: "🥕", titre: "Maraîchage en buttes permanentes — retour après 3 ans",      sousTheme: "Maraîchage",              auteur: "Sophie L.",  initiales: "SL", ville: "Lyon",       date: "il y a 2 sem",   desc: "Bilan honnête : sol vivant, arrosage réduit de moitié, rendements et les vraies limites du système.",                               vues: 744, likes: 167, tags: ["Buttes", "Maraîchage"] },
  { id: 8,  tab: "metiers",      icone: "🐝", titre: "Apiculture naturelle — ce que l'école ne m'a pas appris",    sousTheme: "Apiculture",              auteur: "Marc B.",    initiales: "MB", ville: "Limoges",    date: "il y a 3 sem",   desc: "Conduite en ruche warré, non-intervention, essaimage libre. 5 ans de pratique divergente des cours.",                               vues: 612, likes: 138, tags: ["Apiculture", "Warré"] },
  { id: 9,  tab: "metiers",      icone: "🪑", titre: "Ébénisterie à l'ancienne — les 5 outils essentiels",         sousTheme: "Ébénisterie",             auteur: "Daniel C.",  initiales: "DC", ville: "Toulouse",   date: "il y a 1 mois",  desc: "Rabot, ciseau, scie égoïne, toupie à main, niveau. Ces 5 outils font 90% du travail. Comment les choisir et entretenir.",           vues: 423, likes: 91,  tags: ["Ébénisterie", "Outils"] },
  /* ─── RETOURS D'EXPÉRIENCE ─── */
  { id: 10, tab: "retours",      icone: "🏗️", titre: "Ma première serre tunnel — erreurs et réussites",            sousTheme: "Premières récoltes",      auteur: "Hélène R.",  initiales: "HR", ville: "Bordeaux",   date: "il y a 1 sem",   desc: "Coût réel, surprises climatiques, cultures adaptées, erreurs de ventilation et ce que je referais différemment.",                  vues: 567, likes: 122, tags: ["Serre", "Construction"] },
  { id: 11, tab: "retours",      icone: "🔥", titre: "Four en pisé : le chantier qui m'a tout appris",             sousTheme: "Chantiers réalisés",      auteur: "Pierre M.",  initiales: "PM", ville: "Creuse",     date: "il y a 3 sem",   desc: "6 mois de construction avec 15 amis. Fondations, dôme, première chauffe, fissures, réparations. La réalité d'un chantier collectif.", vues: 489, likes: 104, tags: ["Four", "Pisé"] },
  { id: 12, tab: "retours",      icone: "🎨", titre: "Teinture végétale sur laine — résultats surprenants",         sousTheme: "Tests & comparatifs",     auteur: "Lucie M.",   initiales: "LM", ville: "Lyon",       date: "il y a 4 j",     desc: "Noix, gaude, pastel, sureau — 8 plantes testées avec mordants différents. Tableau comparatif des teintes et de leur solidité.",      vues: 245, likes: 55,  tags: ["Teinture", "Laine"] },
  /* ─── QUESTIONS & RÉPONSES ─── */
  { id: 13, tab: "questions",    icone: "🌱", titre: "Comment conserver les graines de courge plusieurs années ?", sousTheme: "Dépannage",               auteur: "Sophie L.",  initiales: "SL", ville: "Toulouse",   date: "il y a 2 j",     desc: "Je stocke dans des sachets kraft au sec mais je perds 50% de germination après 2 ans. Quelqu'un a une meilleure méthode ?",         vues: 198, likes: 12,  tags: ["Graines", "Conservation"], isQuestion: true, reponses: 7 },
  { id: 14, tab: "questions",    icone: "🪱", titre: "Mon sol est très argileux et compact — que planter ?",       sousTheme: "Questions débutants",     auteur: "Marc B.",    initiales: "MB", ville: "Limoges",    date: "il y a 5 j",     desc: "Sol bleu-gris qui colle aux bottes. Je ne sais pas par où commencer pour l'améliorer. Mes premiers semis n'ont pas tenu.",          vues: 312, likes: 18,  tags: ["Sol", "Argile"], isQuestion: true, reponses: 12 },
  { id: 15, tab: "questions",    icone: "🍎", titre: "Comment reconnaître un vieux pommier greffé ?",              sousTheme: "Entraide technique",      auteur: "Hélène R.",  initiales: "HR", ville: "Lyon",       date: "il y a 1 sem",   desc: "J'ai un vieux pommier récupéré avec la maison. Est-ce qu'il y a des signes visibles qu'il est greffé ?",                            vues: 156, likes: 8,   tags: ["Pommier", "Greffe"], isQuestion: true, reponses: 5 },
  /* ─── TRANSMISSION & MÉMOIRE ─── */
  { id: 16, tab: "transmission", icone: "✂️", titre: "La taille en gobelet — un geste à ressusciter",              sousTheme: "Gestes anciens",          auteur: "Daniel C.",  initiales: "DC", ville: "Bordeaux",   date: "il y a 3 sem",   desc: "Cette taille en étoile à bras courts, abandonnée dans les années 60, produit des arbres plus sains et plus productifs.",            vues: 534, likes: 118, tags: ["Taille", "Fruitiers"] },
  { id: 17, tab: "transmission", icone: "📖", titre: "Mon grand-père tonnelier — ce qu'il m'a transmis",           sousTheme: "Témoignages",             auteur: "Pierre M.",  initiales: "PM", ville: "Thiers",     date: "il y a 2 mois",  desc: "Il fabriquait 2 tonneaux par semaine à la main. Je transcris ses carnets de gestes : cintrage, cerclage, étanchéification.",        vues: 678, likes: 156, tags: ["Tonnellerie", "Mémoire"] },
  { id: 18, tab: "transmission", icone: "🌿", titre: "Les variétés de pommes du Massif Central qui disparaissent", sousTheme: "Patrimoine vivant",       auteur: "Sophie L.",  initiales: "SL", ville: "Clermont-Fd",date: "il y a 1 mois",  desc: "47 variétés recensées dans 3 communes. Noms locaux, descriptions, localisation des derniers arbres. Un travail de mémoire.",        vues: 812, likes: 189, tags: ["Semences", "Patrimoine"] },
];

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

export default function SavoirFaireTransmissionPage() {
  const [tab, setTab] = useState<Tab>("tutoriels");
  const [showForm, setShowForm] = useState(false);
  const [ficheActive, setFicheActive] = useState<number | null>(null);
  const [recherche, setRecherche] = useState("");

  const currentTab = tabs.find((t) => t.id === tab)!;
  const sousThemeActif = currentTab.items.includes(recherche) ? recherche : null;

  const fichesFiltrees = fiches.filter((f) => {
    if (f.tab !== tab) return false;
    if (!recherche) return true;
    if (sousThemeActif) return f.sousTheme === sousThemeActif;
    return f.titre.toLowerCase().includes(recherche.toLowerCase()) || f.desc.toLowerCase().includes(recherche.toLowerCase());
  });

  const isEmpty = fichesFiltrees.length === 0;
  const count   = fichesFiltrees.length;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/savoir-faire-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.22) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 52 }}>🛠️</span>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", lineHeight: 1.2, textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              SAVOIR-FAIRE & <span style={{ color: "#D8B56A" }}>TRANSMISSION</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 6px rgba(6,14,8,0.7)" }}>
              Pratique · Expérience · Entraide · Transmission · Héritage
            </p>
            <p style={{ color: "rgba(245,239,216,0.95)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Apprendre, transmettre et préserver les connaissances qui rendent chacun plus autonome.
              Chaque expérience, chaque métier et chaque astuce peut devenir une ressource pour les autres membres du Terrier.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Le savoir est une graine, le partage est la récolte.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
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
              <p className="text-xs mt-0.5 opacity-50" style={{ color: "#1E3524" }}>{currentTab.sublabel}</p>
            </div>
            <button onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
              {tab === "questions" ? "❓ Poser une question" : "+ Partager"}
            </button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucun contenu trouvé</p>
              <p className="text-sm mt-1">Sois le premier à partager sur ce sujet.</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
                + Partager
              </button>
            </div>
          ) : (
            <div className={`grid gap-5 ${tab === "retours" || tab === "transmission" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {fichesFiltrees.map((f) => (
                <div key={f.id}
                  className="flex flex-col transition-all hover:-translate-y-1"
                  style={{
                    background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                    border: `1px solid ${f.isQuestion ? "#c8860a" : "#C4B898"}`, borderRadius: "4px",
                    boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.10)",
                    overflow: "hidden",
                  }}>
                  {/* Onglet sous-thème */}
                  <div style={{ backgroundColor: f.isQuestion ? "#c8860a" : "#1E3524", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: f.isQuestion ? "#F5EFD8" : "#D8B56A" }}>
                    {f.isQuestion && <span>❓</span>}
                    <span style={{ color: f.isQuestion ? "#F5EFD8" : "#E9DFC8" }}>{f.sousTheme}</span>
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
                    {f.isQuestion ? (
                      <span style={{ fontSize: 10, color: "#c8860a", fontWeight: 700 }}>💬 {f.reponses} réponse{(f.reponses ?? 0) > 1 ? "s" : ""}</span>
                    ) : (
                      <>
                        <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>👁 {f.vues}</span>
                        <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>❤️ {f.likes}</span>
                      </>
                    )}
                  </div>
                  {/* Pied */}
                  <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />
                  <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontStyle: "italic", color: "#6B4F34", opacity: 0.75 }}>✍ {f.auteur}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFicheActive(ficheActive === f.id ? null : f.id); }}
                      className="px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: f.isQuestion ? "#c8860a" : "#1E3524", color: "#F5EFD8" }}>
                      {f.isQuestion ? "Répondre" : "Voir & Contribuer"}
                    </button>
                  </div>
                  {ficheActive === f.id && (
                    <div className="px-5 py-4 flex flex-col gap-3"
                      style={{ backgroundColor: "rgba(79,107,71,0.08)", borderTop: "1px solid #C4B898" }}>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>
                        {f.isQuestion ? "💬 Répondre à cette question" : "🤝 Contribuer à cette fiche"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(f.isQuestion ? [
                          { icon: "✍️", label: "Écrire une réponse" },
                          { icon: "🔗", label: "Partager une ressource" },
                          { icon: "📷", label: "Illustrer avec une photo" },
                        ] : contributionsOptions).map((c) => (
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

      {/* ═══ 🦔 CARNET DU FONDATEUR ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.22) 27px, rgba(196,184,152,0.22) 28px), linear-gradient(180deg, #FDFAF0 0%, #F0E8CC 100%)`,
              border: "1.5px solid #D8B56A",
              boxShadow: "0 6px 28px rgba(107,79,52,0.12)",
            }}>
            <div style={{ backgroundColor: "#7a5c1e", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🦔</span>
              <div>
                <p style={{ color: "#F5EFD8", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Carnet du Fondateur</p>
                <p style={{ color: "rgba(245,239,216,0.65)", fontSize: 10 }}>Note de terrain — Niglomode</p>
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <p style={{ color: "#3a2c1a", fontSize: 13, lineHeight: 1.9, fontStyle: "italic" }}>
                &ldquo;Un savoir qui disparaît est une porte qui se ferme. Niglomode a aussi vocation à préserver les connaissances pratiques,
                les métiers, les astuces et les expériences qui se transmettaient autrefois de génération en génération.
                Que l&apos;on soit débutant ou expert, chacun possède quelque chose qui peut être utile aux autres.
                Le Terrier grandit grâce à ceux qui prennent le temps de transmettre.&rdquo;
              </p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, fontStyle: "italic", color: "#7a5c1e", opacity: 0.75 }}>— Le Fondateur du Terrier 🛠️</span>
              </div>
            </div>
            <div style={{ borderTop: "1px dashed #D8B56A", padding: "14px 28px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <p style={{ fontSize: 12, color: "#6B4F34", flex: 1, minWidth: 200 }}>Tu as un savoir-faire ? Même une seule astuce peut changer la vie de quelqu&apos;un.</p>
              <button onClick={() => setShowForm(true)}
                className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                ✍️ Partager un savoir-faire
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION VALEURS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative py-12 px-4 text-white overflow-hidden">
        {lucioles.slice(0, 8).map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.6 }} />
        ))}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <span style={{ fontSize: 44 }}>📖</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>Chaque geste raconte une histoire</h2>
          <p style={{ color: "rgba(233,223,200,0.75)", lineHeight: 1.75 }} className="text-sm max-w-xl">
            Ici, on apprend à faire, à comprendre et à transmettre.
            Les savoir-faire ne s&apos;héritent plus — ils se partagent.
            Chaque tutoriel, chaque témoignage, chaque réponse renforce le Terrier.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Apprendre", "Découvrir", "Pratiquer", "Partager", "Transmettre", "Préserver"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>{v}</span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90 mt-1"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            ✍️ Partager un savoir-faire
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
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Partager dans Savoir-faire & Transmission</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
              <span>🛠️</span><span>Chaque savoir-faire partagé enrichit le Terrier. Même une seule astuce compte.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "🛠️ Un tutoriel",  desc: "Guide pas à pas, méthode" },
                { label: "📖 Un retour",     desc: "Expérience, réussite ou échec" },
                { label: "❓ Une question",  desc: "Demander à la communauté" },
                { label: "🧠 Un témoignage", desc: "Savoir ancien, mémoire, métier" },
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
              { label: "Titre *",  type: "text", placeholder: "Décris en quelques mots ton savoir-faire" },
              { label: "Ta ville", type: "text", placeholder: "Pour contextualiser (région, climat…)" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Description détaillée</label>
              <textarea rows={4} placeholder="Étapes, matériel, retour d'expérience, gestes importants…"
                className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Photos ou documents</label>
              <input type="file" multiple accept="image/*,.pdf" className="text-sm" style={{ color: "#1E3524" }} />
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
