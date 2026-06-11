"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Tab = "besoin" | "coupdemain" | "competences" | "echanges" | "terrier";

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  {
    id: "besoin", icon: "🆘", label: "Besoin d'aide", sublabel: "Urgences, services du quotidien…",
    items: ["Transport", "Déménagement", "Courses", "Accompagnement", "Garde ponctuelle", "Dépannage", "Besoins urgents"],
  },
  {
    id: "coupdemain", icon: "🛠", label: "Coup de main", sublabel: "Bricolage, jardinage, réparations…",
    items: ["Bricolage", "Jardinage", "Informatique", "Couture", "Mécanique", "Petits travaux", "Réparations"],
  },
  {
    id: "competences", icon: "🎓", label: "Compétences & Transmission", sublabel: "Cours, ateliers, mentorat…",
    items: ["Apprentissage", "Cours particuliers", "Initiation", "Accompagnement", "Partage de savoir-faire", "Mentorat"],
  },
  {
    id: "echanges", icon: "🔄", label: "Échanges & Troc", sublabel: "Services contre services, troc…",
    items: ["Échange de services", "Troc", "Entraide réciproque", "Services contre services", "Coups de main mutuels"],
  },
  {
    id: "terrier", icon: "📍", label: "Mon Terrier", sublabel: "Membres proches, groupes locaux…",
    items: ["Membres proches", "Groupes locaux", "Projets collectifs", "Habitants de ma zone"],
  },
];

const contrepartieOptions = [
  "Coup de main en retour", "Troc d'objet", "Partage de savoir-faire", "Don libre",
  "Participation financière", "Hébergement temporaire", "Prêt de matériel",
  "Repas ou moment convivial", "À discuter ensemble",
];
const trocObjets = ["Meubles", "Outils", "Électroménager", "Informatique", "Vêtements", "Livres", "Matériaux", "Vélo", "Pièces mécaniques", "Autre"];
const savoirFaireList = ["Jardinage", "Bricolage", "Informatique", "Couture", "Cuisine", "Mécanique", "Dessin / Création", "Musique", "Langues", "Formation", "Autre"];
const badgesAll = [
  { emoji: "🛠", label: "Je sais faire" }, { emoji: "🎁", label: "Je peux donner" },
  { emoji: "🔄", label: "Je peux échanger" }, { emoji: "🤝", label: "Je peux aider" },
  { emoji: "📚", label: "Je peux transmettre" }, { emoji: "🚚", label: "Je peux prêter" },
  { emoji: "🌱", label: "Je peux apprendre" }, { emoji: "🏡", label: "Je peux accueillir" },
];

type Annonce = { id: number; titre: string; type: "Demande" | "Offre"; categorie: Tab; auteur: string; initiales: string; ville: string; date: string; desc: string; contrepartie: string; recomm: number };

const annonces: Annonce[] = [
  { id: 1, titre: "Besoin d'aide pour réparer une clôture", type: "Demande", categorie: "besoin", auteur: "Marcel D.", initiales: "MD", ville: "Limoges", date: "il y a 2 jours", desc: "Recherche une personne sachant utiliser une perceuse et quelques outils de base.", contrepartie: "Coup de main en retour", recomm: 8 },
  { id: 2, titre: "Besoin d'un coup de main pour déménagement", type: "Demande", categorie: "besoin", auteur: "Camille T.", initiales: "CT", ville: "Nantes", date: "il y a 4 jours", desc: "Déménagement samedi prochain, appartement au 2ème sans ascenseur.", contrepartie: "Troc d'objet", recomm: 5 },
  { id: 3, titre: "Cherche covoiturage vers Clermont-Ferrand", type: "Demande", categorie: "besoin", auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 3 jours", desc: "Besoin d'un trajet aller-retour le mercredi 12, départ matin, retour soir.", contrepartie: "Participation financière", recomm: 3 },
  { id: 4, titre: "Propose aide plomberie & petits travaux", type: "Offre", categorie: "coupdemain", auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 1 jour", desc: "Retraité bricoleur, je propose mon aide pour petits travaux, fuites, robinetterie.", contrepartie: "Repas ou moment convivial", recomm: 12 },
  { id: 5, titre: "Propose cours d'informatique pour seniors", type: "Offre", categorie: "coupdemain", auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 1 jour", desc: "Disponible le samedi matin pour prise en main d'un PC ou smartphone.", contrepartie: "Don libre", recomm: 14 },
  { id: 6, titre: "Donne cours de jardinage / potager bio", type: "Offre", categorie: "competences", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 5 jours", desc: "Maraîchère amateur depuis 10 ans, je partage mes connaissances volontiers.", contrepartie: "Repas ou moment convivial", recomm: 21 },
  { id: 7, titre: "Aide pour déclaration d'impôts", type: "Offre", categorie: "competences", auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 1 semaine", desc: "Retraité ancien comptable, je propose mon aide pour les démarches fiscales.", contrepartie: "À discuter ensemble", recomm: 17 },
  { id: 8, titre: "Cours de cuisine fait maison — conserves & fermentation", type: "Offre", categorie: "competences", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 3 jours", desc: "Atelier à domicile pour 4-6 personnes. Lacto-fermentation, stérilisation, conserves.", contrepartie: "Coup de main en retour", recomm: 9 },
  { id: 9, titre: "Cherche cours de couture débutant", type: "Demande", categorie: "echanges", auteur: "Lucie M.", initiales: "LM", ville: "Bordeaux", date: "il y a 2 jours", desc: "Je cherche quelqu'un pour m'apprendre les bases en échange de cours d'espagnol.", contrepartie: "Échange de services", recomm: 6 },
  { id: 10, titre: "Échange : aide jardinage contre aide informatique", type: "Offre", categorie: "echanges", auteur: "Marcel D.", initiales: "MD", ville: "Limoges", date: "il y a 6 jours", desc: "Jardinier expérimenté, je peux aider au potager en échange d'aide pour mon ordi.", contrepartie: "Services contre services", recomm: 11 },
];

const terriers = [
  { nom: "Terrier de Limoges", membres: 42, annonces: 18, projets: 3, evenements: 2 },
  { nom: "Terrier de Bordeaux", membres: 67, annonces: 31, projets: 5, evenements: 4 },
  { nom: "Terrier de Lyon", membres: 89, annonces: 44, projets: 7, evenements: 6 },
  { nom: "Terrier de Toulouse", membres: 53, annonces: 22, projets: 4, evenements: 3 },
  { nom: "Terrier de Nantes", membres: 38, annonces: 15, projets: 2, evenements: 2 },
  { nom: "Terrier de Thiers", membres: 21, annonces: 8, projets: 1, evenements: 1 },
];

const banqueTalents = [
  { pseudo: "Marcel D.", initiales: "MD", cherche: "Une aide pour réparer ma clôture", offre: ["Réparer un ordinateur", "Faire du bricolage", "Aider au déménagement"] },
  { pseudo: "Sophie L.", initiales: "SL", cherche: "Un cours de cuisine fait maison", offre: ["Cours d'informatique", "Créer un site web simple", "Aide démarches administratives"] },
  { pseudo: "Hélène R.", initiales: "HR", cherche: "Quelqu'un pour m'apprendre à faire du pain", offre: ["Cours de jardinage", "Partager des légumes", "Garder des animaux"] },
  { pseudo: "Jean-Paul B.", initiales: "JP", cherche: "Un coup de main pour déplacer des meubles", offre: ["Aide déclaration d'impôts", "Conseils comptabilité", "Aide démarches retraite"] },
];

const urgentsAujourdhui = [
  { id: 101, pseudo: "Fatima K.", initiales: "FK", ville: "Limoges", besoin: "Besoin d'un véhicule utilitaire ce soir pour récupérer un canapé", categorie: "Transport", ilya: "il y a 23 min" },
  { id: 102, pseudo: "René T.", initiales: "RT", ville: "Bordeaux", besoin: "Fuite d'eau sous l'évier — cherche plombier ou bricoleur de toute urgence", categorie: "Bricolage", ilya: "il y a 1 h" },
  { id: 103, pseudo: "Amandine V.", initiales: "AV", ville: "Lyon", besoin: "Garde de chien impromptue aujourd'hui — hospitalisation imprévue", categorie: "Garde", ilya: "il y a 2 h" },
];

const membresDispoAujourdhui = [
  { pseudo: "Sophie L.", initiales: "SL", ville: "Bordeaux", competences: ["Informatique", "Administratif"], disponible: "jusqu'à 18h" },
  { pseudo: "Hélène R.", initiales: "HR", ville: "Lyon", competences: ["Jardinage", "Cuisine"], disponible: "toute la journée" },
  { pseudo: "Marc B.", initiales: "MB", ville: "Limoges", competences: ["Transport", "Bricolage"], disponible: "cet après-midi" },
  { pseudo: "Lucie M.", initiales: "LM", ville: "Toulouse", competences: ["Couture", "Aide aux personnes"], disponible: "ce matin" },
];

const activitePlaceDuTerrier = [
  { type: "demande", emoji: "🆘", texte: "Marcel D. cherche de l'aide pour réparer sa clôture", time: "il y a 2 h", ville: "Limoges" },
  { type: "offre", emoji: "🤝", texte: "Sophie L. propose des cours d'informatique le samedi", time: "il y a 3 h", ville: "Bordeaux" },
  { type: "membre", emoji: "🦔", texte: "Camille T. a rejoint le Terrier de Nantes", time: "il y a 5 h", ville: "Nantes" },
  { type: "projet", emoji: "🚀", texte: "Nouveau projet : Jardin partagé Terrier de Lyon", time: "hier", ville: "Lyon" },
  { type: "offre", emoji: "🤝", texte: "Hélène R. propose un atelier conservation & fermentation", time: "hier", ville: "Lyon" },
  { type: "membre", emoji: "🦔", texte: "René T. et Fatima K. ont rejoint le Terrier de Bordeaux", time: "il y a 2 jours", ville: "Bordeaux" },
];

const typeColors: Record<string, { bg: string; color: string }> = {
  "Demande": { bg: "#FDE68A", color: "#92400e" },
  "Offre":   { bg: "#D6F5F3", color: "#1A9E94" },
};

const activityAccent: Record<string, string> = {
  demande: "#ef4444",
  offre:   "#2D6A4F",
  membre:  "#D8B56A",
  projet:  "#1A2562",
};

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
  { top: "82%", left: "18%", r: 2 }, { top: "7%",  left: "50%", r: 3 },
];

export default function EntraidePage() {
  const [tab, setTab] = useState<Tab>("besoin");
  const [subFiltre, setSubFiltre] = useState("");
  const [mode, setMode] = useState<"tous" | "demande" | "offre">("tous");
  const [rayon, setRayon] = useState("20 km");
  const [recherche, setRecherche] = useState("");
  const [modeAujourdhui, setModeAujourdhui] = useState<null | "besoin" | "disponible">(null);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"aide" | "propose" | "initiative">("aide");
  const [formTitre, setFormTitre] = useState("");
  const [formVille, setFormVille] = useState("");
  const [formDesc, setFormDesc]   = useState("");
  const [formSent, setFormSent]   = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestSent, setSuggestSent] = useState(false);

  const [contreparties, setContreparties] = useState<string[]>([]);
  const [trocItems, setTrocItems] = useState<string[]>([]);
  const [trocAutre, setTrocAutre] = useState("");
  const [savoirItems, setSavoirItems] = useState<string[]>([]);
  const [savoirAutre, setSavoirAutre] = useState("");
  const [profilPseudo, setProfilPseudo] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) {
      const p = JSON.parse(stored);
      if (p.contreparties?.length) setContreparties(p.contreparties);
      if (p.competences?.length) setSavoirItems(p.competences.filter((c: string) => savoirFaireList.includes(c)));
      if (p.pseudo) setProfilPseudo(p.pseudo);
    }
  }, []);

  const toggleContrepartie = (val: string) => setContreparties((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  const toggleTroc = (val: string) => setTrocItems((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);
  const toggleSavoir = (val: string) => setSavoirItems((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const currentTab = tabs.find((t) => t.id === tab)!;
  const annoncesFiltrees = annonces.filter((a) => {
    if (a.categorie !== tab) return false;
    if (mode === "demande" && a.type !== "Demande") return false;
    if (mode === "offre" && a.type !== "Offre") return false;
    if (subFiltre && !a.titre.toLowerCase().includes(subFiltre.toLowerCase()) && !a.desc.toLowerCase().includes(subFiltre.toLowerCase())) return false;
    if (recherche && !a.titre.toLowerCase().includes(recherche.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/entraide-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.22) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 48 }}>🤝</span>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: 4, color: "#D8B56A", textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              ENTRAIDE
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", lineHeight: 1.75, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Demander de l&apos;aide, proposer un coup de main, partager ses compétences et créer du lien localement.
            </p>
            <p style={{ color: "rgba(245,239,216,0.55)", fontSize: "0.82rem", fontStyle: "italic" }}>Moins de bruit. Plus de solutions.</p>
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Un problème partagé devient souvent plus léger à porter.&rdquo;
          </p>
        </div>
      </section>

      {/* ── ACTIONS + EN CE MOMENT ── */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="py-8 px-4 text-white">
        <div className="max-w-5xl mx-auto flex flex-col gap-5">

          {/* Actions rapides */}
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => { setFormMode("aide"); setFormSent(false); setFormTitre(""); setFormVille(""); setFormDesc(""); setShowForm(true); }}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#ef4444", color: "white" }}>
              🆘 Demander de l&apos;aide
            </button>
            <button onClick={() => { setFormMode("propose"); setFormSent(false); setFormTitre(""); setFormVille(""); setFormDesc(""); setShowForm(true); }}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
              🤝 Proposer mon aide
            </button>
            <button onClick={() => { setFormMode("initiative"); setFormSent(false); setFormTitre(""); setFormVille(""); setFormDesc(""); setShowForm(true); }}
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "rgba(6,14,8,0.5)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", color: "rgba(245,239,216,0.88)" }}>
              🚀 Créer une initiative locale
            </button>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex rounded-full overflow-hidden"
              style={{ border: "1px solid rgba(216,181,106,0.45)", backgroundColor: "rgba(6,14,8,0.55)", backdropFilter: "blur(4px)" }}>
              {[
                { id: "tous" as const, label: "Tous" },
                { id: "demande" as const, label: "🆘 Je cherche" },
                { id: "offre" as const, label: "🤝 Je propose" },
              ].map((m) => (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className="px-4 py-2 text-xs font-semibold transition-colors"
                  style={{ backgroundColor: mode === m.id ? "#D8B56A" : "transparent", color: mode === m.id ? "#1E3524" : "rgba(255,255,255,0.82)" }}>
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "rgba(6,14,8,0.55)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", color: "rgba(255,255,255,0.85)" }}>
              <span>📏</span>
              <select value={rayon} onChange={(e) => setRayon(e.target.value)}
                className="bg-transparent text-white text-xs outline-none cursor-pointer">
                {["5 km", "10 km", "20 km", "50 km", "100 km", "Toute la France"].map((r) => (
                  <option key={r} value={r} style={{ color: "#1E3524" }}>{r}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#4F6B47" }} />
            <p className="text-sm font-bold tracking-wider" style={{ color: "rgba(255,255,255,0.45)" }}>EN CE MOMENT DANS LES TERRIERS</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={() => setModeAujourdhui(modeAujourdhui === "besoin" ? null : "besoin")}
              className="rounded-2xl p-5 flex items-center gap-4 text-left transition-all"
              style={{ backgroundColor: modeAujourdhui === "besoin" ? "#7f1d1d" : "rgba(255,255,255,0.05)", border: `2px solid ${modeAujourdhui === "besoin" ? "#ef4444" : "rgba(255,255,255,0.1)"}` }}>
              <span style={{ fontSize: 36 }}>🚨</span>
              <div>
                <p className="font-extrabold text-base text-white">J&apos;ai besoin d&apos;aide aujourd&apos;hui</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Signaler un besoin urgent — visible immédiatement par ton Terrier</p>
              </div>
            </button>
            <button onClick={() => setModeAujourdhui(modeAujourdhui === "disponible" ? null : "disponible")}
              className="rounded-2xl p-5 flex items-center gap-4 text-left transition-all"
              style={{ backgroundColor: modeAujourdhui === "disponible" ? "#14532d" : "rgba(255,255,255,0.05)", border: `2px solid ${modeAujourdhui === "disponible" ? "#4F6B47" : "rgba(255,255,255,0.1)"}` }}>
              <span style={{ fontSize: 36 }}>🤝</span>
              <div>
                <p className="font-extrabold text-base text-white">Je suis disponible pour aider</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>Indiquer ta dispo du jour — les membres peuvent te contacter</p>
              </div>
            </button>
          </div>

          {modeAujourdhui === "besoin" && (
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #ef4444" }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: "#7f1d1d" }}>
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <p className="text-sm font-bold text-white">Demandes urgentes aujourd&apos;hui</p>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-400/20 text-red-300">{urgentsAujourdhui.length} en cours</span>
              </div>
              <div className="flex flex-col divide-y" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                {urgentsAujourdhui.map((u) => (
                  <div key={u.id} className="px-5 py-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#ef4444", color: "white" }}>{u.initiales}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug">{u.besoin}</p>
                      <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                        <span>📍 {u.ville}</span><span>· {u.categorie}</span><span>· {u.ilya}</span>
                      </div>
                    </div>
                    <button className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80" style={{ backgroundColor: "#ef4444", color: "white" }}>J&apos;aide</button>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <button onClick={() => { setFormMode("aide"); setShowForm(true); }}
                  className="text-sm font-bold px-5 py-2.5 rounded-full transition-opacity hover:opacity-90 w-full"
                  style={{ backgroundColor: "#ef4444", color: "white" }}>
                  🚨 Signaler mon besoin urgent
                </button>
              </div>
            </div>
          )}

          {modeAujourdhui === "disponible" && (
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #4F6B47" }}>
              <div className="px-5 py-3 flex items-center gap-2" style={{ backgroundColor: "#14532d" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-sm font-bold text-white">Membres disponibles aujourd&apos;hui</p>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-green-400/20 text-green-300">{membresDispoAujourdhui.length} dispos</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                {membresDispoAujourdhui.map((m) => (
                  <div key={m.pseudo} className="px-5 py-4 flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#2D6A4F", color: "white" }}>{m.initiales}</div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black" style={{ backgroundColor: "#4F6B47" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{m.pseudo}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>📍 {m.ville} · {m.disponible}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {m.competences.slice(0, 2).map((c) => (
                          <span key={c} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(79,107,71,0.18)", color: "#4F6B47" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                    <button className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: "#4F6B47", color: "#0f1a10" }}>Contacter</button>
                  </div>
                ))}
              </div>
              <div className="px-5 py-4" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                <button onClick={() => { setFormMode("propose"); setShowForm(true); }}
                  className="text-sm font-bold px-5 py-2.5 rounded-full w-full"
                  style={{ backgroundColor: "#4F6B47", color: "#0f1a10" }}>
                  🤝 Me signaler disponible
                </button>
              </div>
            </div>
          )}

          {!modeAujourdhui && (
            <div className="flex flex-wrap gap-4 text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
              <span>🚨 <strong className="text-red-400">{urgentsAujourdhui.length}</strong> demandes urgentes aujourd&apos;hui</span>
              <span>🤝 <strong className="text-green-400">{membresDispoAujourdhui.length}</strong> membres disponibles maintenant</span>
              <span>📌 <strong className="text-white/55">10</strong> annonces publiées cette semaine</span>
            </div>
          )}
        </div>
      </section>

      {/* ═══ LA PLACE DU TERRIER ═══ */}
      <section style={{ backgroundColor: "#E9DFC8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ fontSize: 28 }}>🏡</span>
            <div>
              <h2 className="text-xl font-extrabold" style={{ color: "#1E3524" }}>La Place du Terrier</h2>
              <p className="text-xs opacity-50" style={{ color: "#1E3524" }}>Ce qui se passe en ce moment dans vos Terriers</p>
            </div>
            <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#2D6A4F" }} />
          </div>
          <div className="flex flex-col gap-2">
            {activitePlaceDuTerrier.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 rounded-xl transition-colors hover:opacity-90"
                style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", borderLeft: `5px solid ${activityAccent[a.type] ?? "#C4B898"}` }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{a.emoji}</span>
                <p className="text-sm flex-1" style={{ color: "#1E3524" }}>{a.texte}</p>
                <div className="flex items-center gap-2 flex-shrink-0 text-xs opacity-40" style={{ color: "#1E3524" }}>
                  <span>📍 {a.ville}</span>
                  <span>· {a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setSubFiltre(""); }}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center transition-all"
              style={{
                backgroundColor: tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: tab === t.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: tab === t.id ? "0 4px 18px rgba(216,181,106,0.30)" : "0 1px 4px rgba(0,0,0,0.25)",
              }}>
              <span style={{ fontSize: 26 }}>{t.icon}</span>
              <span className="font-bold text-xs leading-tight">{t.label}</span>
              <span className="text-xs opacity-50 leading-tight hidden sm:block">{t.sublabel}</span>
            </button>
          ))}
        </div>
        <div className="max-w-5xl mx-auto mt-4 p-4 rounded-2xl flex flex-wrap gap-2 items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
          {currentTab.items.map((item) => (
            <button key={item}
              onClick={() => setSubFiltre(subFiltre === item ? "" : item)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={{
                backgroundColor: subFiltre === item ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: subFiltre === item ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `1px solid ${subFiltre === item ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
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
      </section>

      {/* ═══ CONTENU ONGLET ═══ */}
      {tab === "terrier" ? (
        <section style={{ backgroundColor: "#EDE4C4" }} className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold mb-6" style={{ color: "#1E3524" }}>📍 Terriers proches de chez vous</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {terriers.map((t) => (
                <div key={t.nom} className="rounded-2xl p-5 flex flex-col gap-3 cursor-pointer transition-shadow hover:shadow-md"
                  style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                  <p className="font-bold text-base" style={{ color: "#D8B56A", textShadow: "0 1px 0 rgba(0,0,0,0.08)" }}>
                    <span style={{ color: "#1E3524" }}>🦔 </span>
                    <span style={{ color: "#1E3524" }}>{t.nom}</span>
                  </p>
                  <div className="text-sm flex flex-col gap-1 opacity-65" style={{ color: "#1E3524" }}>
                    <span>👥 {t.membres} membres</span>
                    <span>📌 {t.annonces} annonces actives</span>
                    <span>🚀 {t.projets} projets locaux</span>
                    <span>📅 {t.evenements} événements à venir</span>
                  </div>
                  <button className="mt-auto px-4 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "#1E3524", color: "white" }}>
                    Rejoindre ce Terrier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section style={{ backgroundColor: "#EDE4C4" }} className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>
                {currentTab.icon} {currentTab.label}
                <span className="text-sm font-normal opacity-35 ml-2">({annoncesFiltrees.length})</span>
              </h2>
              <button onClick={() => { setFormMode(tab === "besoin" ? "aide" : "propose"); setShowForm(true); }}
                className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", color: "white" }}>
                + Publier
              </button>
            </div>

            {annoncesFiltrees.length === 0 ? (
              <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
                <span style={{ fontSize: 48 }}>🔍</span>
                <p className="mt-3 font-semibold">Aucun résultat</p>
                <button onClick={() => setShowForm(true)}
                  className="mt-4 px-6 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "white" }}>
                  Soyez le premier à publier
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {annoncesFiltrees.map((a) => {
                  const tc = typeColors[a.type] ?? { bg: "#E9DFC8", color: "#1E3524" };
                  return (
                    <div key={a.id} className="rounded-2xl p-5 flex flex-col gap-3 transition-shadow hover:shadow-md"
                      style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: tc.bg, color: tc.color }}>{a.type}</span>
                        <span className="text-xs opacity-40 ml-auto">📍 {a.ville}</span>
                      </div>
                      <h3 className="font-bold text-sm leading-snug" style={{ color: "#1E3524" }}>{a.titre}</h3>
                      <p className="text-xs opacity-55 leading-relaxed">{a.desc}</p>
                      {a.contrepartie && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-medium self-start"
                          style={{ backgroundColor: "#EEF9F5", color: "#2D6A4F", border: "1px solid #c8e6d8" }}>
                          🔄 {a.contrepartie}
                        </span>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid #C4B898" }}>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: "#1E3524" }}>{a.auteur}</p>
                          <p className="text-xs opacity-35">{a.date} · 👍 {a.recomm}</p>
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
      )}

      {/* ═══ BANQUE DE TALENTS ═══ */}
      <section className="py-14 px-4 relative overflow-hidden" style={{ background: "linear-gradient(155deg, #060e08 0%, #1E3524 42%, #0f1e13 72%, #060e08 100%)" }}>
        {/* Lucioles décoratives */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {([
            { top: "10%", left: "7%",  r: 3 }, { top: "25%", left: "92%", r: 2 },
            { top: "52%", left: "4%",  r: 2 }, { top: "72%", left: "89%", r: 3 },
            { top: "16%", left: "74%", r: 2 }, { top: "40%", left: "96%", r: 2 },
            { top: "82%", left: "18%", r: 2 }, { top: "6%",  left: "50%", r: 3 },
            { top: "91%", left: "63%", r: 2 }, { top: "33%", left: "2%",  r: 2 },
            { top: "60%", left: "80%", r: 2 }, { top: "48%", left: "55%", r: 2 },
          ] as { top: string; left: string; r: number }[]).map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left,
              width: s.r, height: s.r,
              backgroundColor: "#D8B56A",
              opacity: 0.4,
              boxShadow: `0 0 ${s.r * 4}px ${s.r + 1}px rgba(216,181,106,0.18)`,
            }} />
          ))}
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-white">🌟 Banque de talents</h2>
            <p className="text-sm max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Chaque membre a quelque chose à apporter. Ce n&apos;est pas ce que tu possèdes qui compte — c&apos;est ce que tu sais faire.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {banqueTalents.map((b) => (
              <div key={b.pseudo} className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>{b.initiales}</div>
                  <div>
                    <p className="font-bold text-sm text-white">{b.pseudo}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>Membre actif</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#D8B56A" }}>Je cherche</p>
                  <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.75)" }}>&ldquo;{b.cherche}&rdquo;</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#4F6B47" }}>En échange, je peux</p>
                  <ul className="flex flex-col gap-1">
                    {b.offre.map((o) => (
                      <li key={o} className="flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.72)" }}>
                        <span style={{ color: "#4F6B47" }}>✓</span> {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="mt-auto text-xs font-bold px-4 py-2 rounded-full self-start transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#2D6A4F", color: "white" }}>
                  Proposer un échange
                </button>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 rounded-2xl" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}>
            <p className="text-sm font-bold mb-4" style={{ color: "#D8B56A" }}>Badges de profil NIGLOMODE</p>
            <div className="flex flex-wrap gap-3">
              {badgesAll.map((b) => (
                <div key={b.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white" }}>
                  <span>{b.emoji}</span><span style={{ opacity: 0.78 }}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MODALE FORMULAIRE ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.58)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>

            {formSent ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span style={{ fontSize: 52 }}>✅</span>
                <h3 className="text-xl font-extrabold" style={{ color: "#1E3524" }}>Annonce publiée !</h3>
                <p className="text-sm" style={{ color: "#4F6B47" }}>
                  Visible par les membres de ton Terrier. Tu seras notifié des réponses.
                </p>
                <div className="rounded-2xl px-5 py-3 text-sm font-semibold" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  &ldquo;{formTitre}&rdquo; · {formVille}
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="mt-2 px-8 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-85"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>
                    {formMode === "aide" ? "🆘 Demander de l'aide" : formMode === "propose" ? "🤝 Proposer mon aide" : "🚀 Créer une initiative locale"}
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
                </div>

                {profilPseudo && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                    style={{ backgroundColor: "rgba(30,53,36,0.08)", border: "1px solid #C4B898", color: "#4F6B47" }}>
                    <span>🦔</span>
                    <span>Profil de <strong>{profilPseudo}</strong> chargé — contreparties et compétences pré-remplies.</span>
                    <Link href="/profil" className="ml-auto underline opacity-70 flex-shrink-0">Modifier</Link>
                  </div>
                )}

                <div className="flex gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Titre *</label>
                    <input type="text" value={formTitre} onChange={e => setFormTitre(e.target.value)}
                      placeholder="En quelques mots…"
                      className="px-4 py-2.5 rounded-lg text-sm outline-none"
                      style={{ backgroundColor: "#EDE4C4", border: "1.5px solid #C4B898", color: "#1E3524" }} />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Ville *</label>
                    <input type="text" value={formVille} onChange={e => setFormVille(e.target.value)}
                      placeholder="Ta ville"
                      className="px-4 py-2.5 rounded-lg text-sm outline-none"
                      style={{ backgroundColor: "#EDE4C4", border: "1.5px solid #C4B898", color: "#1E3524" }} />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Catégorie</label>
                  <select className="px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ backgroundColor: "#EDE4C4", border: "1.5px solid #C4B898", color: "#1E3524" }}>
                    {tabs.filter((t) => t.id !== "terrier").map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Description</label>
                  <textarea rows={3} value={formDesc} onChange={e => setFormDesc(e.target.value)}
                    placeholder="Décrivez votre besoin ou votre proposition…"
                    className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                    style={{ backgroundColor: "#EDE4C4", border: "1.5px solid #C4B898", color: "#1E3524" }} />
                </div>

                <div className="flex flex-col gap-3 p-4 rounded-xl"
                  style={{ backgroundColor: "#EDE4C4", border: "1.5px solid #C4B898" }}>
                  <div>
                    <label className="text-sm font-bold" style={{ color: "#1E3524" }}>Contrepartie proposée</label>
                    <p className="text-xs mt-0.5" style={{ color: "#4F6B47" }}>Plusieurs choix possibles</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {contrepartieOptions.map((opt) => (
                      <button key={opt} type="button" onClick={() => toggleContrepartie(opt)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={{
                          backgroundColor: contreparties.includes(opt) ? "#1E3524" : "#F5EFD8",
                          color: contreparties.includes(opt) ? "#D8B56A" : "#1E3524",
                          borderColor: contreparties.includes(opt) ? "#1E3524" : "#C4B898",
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {contreparties.includes("Troc d'objet") && (
                    <div className="flex flex-col gap-2 pt-3" style={{ borderTop: "1px solid #C4B898" }}>
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B4F34" }}>Objet proposé en échange :</label>
                      <div className="flex flex-wrap gap-1.5">
                        {trocObjets.map((obj) => (
                          <button key={obj} type="button" onClick={() => toggleTroc(obj)}
                            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
                            style={{ backgroundColor: trocItems.includes(obj) ? "#1E3524" : "#F5EFD8", color: trocItems.includes(obj) ? "white" : "#1E3524", borderColor: "#C4B898" }}>
                            {obj}
                          </button>
                        ))}
                      </div>
                      {trocItems.includes("Autre") && (
                        <input type="text" value={trocAutre} onChange={(e) => setTrocAutre(e.target.value)}
                          placeholder="Précisez l'objet…" className="px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #C4B898", backgroundColor: "#F5EFD8", color: "#1E3524" }} />
                      )}
                    </div>
                  )}
                  {contreparties.includes("Partage de savoir-faire") && (
                    <div className="flex flex-col gap-2 pt-3" style={{ borderTop: "1px solid #C4B898" }}>
                      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6B4F34" }}>Compétences proposées :</label>
                      <div className="flex flex-wrap gap-1.5">
                        {savoirFaireList.map((s) => (
                          <button key={s} type="button" onClick={() => toggleSavoir(s)}
                            className="px-2.5 py-1 rounded-full text-xs font-medium border transition-all"
                            style={{ backgroundColor: savoirItems.includes(s) ? "#1E3524" : "#F5EFD8", color: savoirItems.includes(s) ? "white" : "#1E3524", borderColor: "#C4B898" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                      {savoirItems.includes("Autre") && (
                        <input type="text" value={savoirAutre} onChange={(e) => setSavoirAutre(e.target.value)}
                          placeholder="Précisez votre compétence…" className="px-3 py-2 rounded-lg text-sm outline-none"
                          style={{ border: "1.5px solid #C4B898", backgroundColor: "#F5EFD8", color: "#1E3524" }} />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Photos (optionnel)</label>
                  <input type="file" multiple accept="image/*" className="text-sm" style={{ color: "#1E3524" }} />
                </div>

                <button
                  onClick={() => { if (formTitre && formVille) setFormSent(true); }}
                  disabled={!formTitre || !formVille}
                  className="w-full py-3 rounded-full font-bold text-base mt-1 transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                  ✓ Publier l&apos;annonce
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ MODALE SUGGESTION ═══ */}
      {showSuggest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSuggest(false); }}>
          <div className="w-full max-w-md rounded-2xl p-7 flex flex-col gap-4" style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "#1E3524" }}>➕ Proposer une catégorie</h2>
              <button onClick={() => setShowSuggest(false)} className="text-2xl opacity-40 hover:opacity-70">×</button>
            </div>
            {suggestSent ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span style={{ fontSize: 40 }}>🦔</span>
                <p className="font-bold" style={{ color: "#1E3524" }}>Suggestion envoyée !</p>
                <p className="text-sm opacity-55" style={{ color: "#1E3524" }}>Ta proposition sera examinée avant d&apos;être ajoutée.</p>
                <button onClick={() => setShowSuggest(false)}
                  className="px-6 py-2 rounded-full text-sm font-bold mt-1 transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "white" }}>
                  Fermer
                </button>
              </div>
            ) : (
              <>
                <div className="rounded-xl p-3 text-xs flex gap-2" style={{ backgroundColor: "#e8ece0", color: "#1E3524" }}>
                  <span>ℹ️</span>
                  <span>Les suggestions sont soumises à modération et n&apos;apparaissent pas automatiquement.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Rubrique concernée</label>
                  <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #ddd5c0", color: "#1E3524" }}>
                    {tabs.filter((t) => t.id !== "terrier").map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Catégorie proposée *</label>
                  <input type="text" placeholder="Ex : Aide au jardinage, Soutien scolaire…"
                    className="px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1.5px solid #ddd5c0", color: "#1E3524" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Pourquoi ? (optionnel)</label>
                  <textarea rows={2} placeholder="Explique brièvement l'intérêt pour la communauté…"
                    className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                    style={{ border: "1.5px solid #ddd5c0", color: "#1E3524" }} />
                </div>
                <button onClick={() => setSuggestSent(true)}
                  className="w-full py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "white" }}>
                  Envoyer ma suggestion
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="text-center py-10 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #1E3524 0%, #060e08 100%)" }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {([
            { top: "15%", left: "12%", r: 2 }, { top: "30%", left: "82%", r: 2 },
            { top: "60%", left: "25%", r: 2 }, { top: "20%", left: "55%", r: 2 },
            { top: "70%", left: "70%", r: 2 }, { top: "45%", left: "90%", r: 2 },
          ] as { top: string; left: string; r: number }[]).map((s, i) => (
            <div key={i} className="absolute rounded-full" style={{
              top: s.top, left: s.left,
              width: s.r, height: s.r,
              backgroundColor: "#D8B56A", opacity: 0.3,
              boxShadow: "0 0 6px 2px rgba(216,181,106,0.15)",
            }} />
          ))}
        </div>
        <p className="text-xs mb-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.6 }}>✦ &nbsp; 🌿 &nbsp; ✦ &nbsp; 🦔 &nbsp; ✦ &nbsp; 🌿 &nbsp; ✦</p>
        <Link href="/" className="text-sm transition-opacity hover:opacity-90 relative z-10" style={{ color: "#D8B56A", opacity: 0.7 }}>
          ← Retour à l&apos;accueil
        </Link>
        <p className="text-xs mt-3 tracking-widest" style={{ color: "#4F6B47", opacity: 0.4 }}>✦ &nbsp; 🍃 &nbsp; ✦ &nbsp; 🍃 &nbsp; ✦</p>
      </div>
    </>
  );
}
