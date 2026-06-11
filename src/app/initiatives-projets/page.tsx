"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "associations" | "chantiers" | "projets" | "evenements" | "partenaires" | "boite";

type Initiative = {
  id: number;
  icone: string;
  titre: string;
  statut: "En cours" | "À venir" | "Besoin d'aide" | "En construction";
  tab: Tab;
  sousTheme: string;
  auteur: string;
  initiales: string;
  ville: string;
  date: string;
  desc: string;
  participants: number;
  tags: string[];
};

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  { id: "associations", icon: "🤝", label: "Associations & Collectifs", sublabel: "Agir ensemble, localement",
    items: ["Associations locales", "Jardins partagés", "Collectifs citoyens", "Repair Cafés", "Éco-lieux"] },
  { id: "chantiers", icon: "🔨", label: "Chantiers participatifs", sublabel: "Construire et planter ensemble",
    items: ["Plantation de haies", "Création de mares", "Éco-construction", "Réhabilitation de vergers", "Fours à pain"] },
  { id: "projets", icon: "🌱", label: "Projets citoyens", sublabel: "Inventer des solutions locales",
    items: ["Grainothèques", "Monnaies locales", "Composteurs collectifs", "Forêts nourricières", "Tiers-lieux"] },
  { id: "evenements", icon: "🎉", label: "Événements & Rencontres", sublabel: "Partager et créer du lien",
    items: ["Fêtes des plantes", "Bourses aux graines", "Marchés de producteurs", "Ateliers & Conférences", "Rencontres locales"] },
  { id: "partenaires", icon: "🏡", label: "Terriers partenaires", sublabel: "Le réseau des lieux Niglomode",
    items: ["Fermes", "Ressourceries", "Ateliers partagés", "Artisans", "Tiers-lieux partenaires"] },
  { id: "boite", icon: "💡", label: "Boîte à idées", sublabel: "Tes idées, le futur du Terrier",
    items: ["Bibliothèque d'outils", "Covoiturage rural", "Conserverie collective", "Projets d'entraide", "Nouvelles initiatives"] },
];

const statutStyle: Record<string, { tabBg: string; label: string }> = {
  "En cours":        { tabBg: "#4F6B47", label: "● En cours" },
  "À venir":         { tabBg: "#c8860a", label: "◷ À venir" },
  "Besoin d'aide":   { tabBg: "#8B3A00", label: "⚑ Besoin d'aide" },
  "En construction": { tabBg: "#2a6b8a", label: "⚙ En construction" },
};

const initiatives: Initiative[] = [
  /* ─── ASSOCIATIONS & COLLECTIFS ─── */
  { id: 1,  tab: "associations", icone: "🌿", titre: "Le Jardin du Terrier — jardin partagé du quartier",        statut: "En cours",        sousTheme: "Jardins partagés",      auteur: "Sophie L.", initiales: "SL", ville: "Toulouse",   date: "depuis mars 2024",     participants: 23,  desc: "Un jardin partagé ouvert à tous, géré collectivement. Légumes, aromatiques et convivialité. Permanence chaque samedi matin.",            tags: ["Jardin", "Collectif"] },
  { id: 2,  tab: "associations", icone: "🔧", titre: "Repair Café Limoges — réparer ensemble chaque mois",       statut: "En cours",        sousTheme: "Repair Cafés",          auteur: "Marc B.",   initiales: "MB", ville: "Limoges",    date: "depuis sept. 2023",    participants: 47,  desc: "Chaque premier samedi du mois, des bénévoles réparent vos objets cassés. Textiles, électronique, vélos, jouets. Entrée libre.",          tags: ["Réparation", "Bénévolat"] },
  { id: 3,  tab: "associations", icone: "🌱", titre: "Collectif Terre Vivante — permaculture & autonomie",       statut: "En cours",        sousTheme: "Collectifs citoyens",   auteur: "Hélène R.", initiales: "HR", ville: "Lyon",       date: "depuis 2022",          participants: 61,  desc: "Ateliers, chantiers et visites de fermes. Formation gratuite aux pratiques agroécologiques et à la vie en collectif.",                    tags: ["Permaculture", "Autonomie"] },
  /* ─── CHANTIERS PARTICIPATIFS ─── */
  { id: 4,  tab: "chantiers",    icone: "🌿", titre: "Plantation d'une haie vive comestible — 200 mètres",       statut: "Besoin d'aide",   sousTheme: "Plantation de haies",   auteur: "Daniel C.", initiales: "DC", ville: "Bordeaux",   date: "prévu oct. 2026",      participants: 8,   desc: "200 mètres de haie comestible en bordure de chemin rural. Pommiers, noisetiers, sureau, cornouiller. Besoin de 20 bras supplémentaires.", tags: ["Haie", "Plantation"] },
  { id: 5,  tab: "chantiers",    icone: "💧", titre: "Création d'une mare pédagogique au hameau",                statut: "En construction", sousTheme: "Création de mares",     auteur: "Pierre M.", initiales: "PM", ville: "Thiers",     date: "en cours",             participants: 14,  desc: "Mare de 40m² pour la biodiversité et l'éducation des enfants. Terrassement réalisé, reste la végétalisation des berges.",               tags: ["Mare", "Biodiversité"] },
  { id: 6,  tab: "chantiers",    icone: "🍞", titre: "Chantier four à pain collectif — paille et terre",         statut: "Besoin d'aide",   sousTheme: "Fours à pain",          auteur: "Lucie M.",  initiales: "LM", ville: "Limoges",    date: "prévu été 2026",       participants: 11,  desc: "Construction d'un four en pisé avec les habitants. Fondations posées — recherche maçon expérimenté en techniques traditionnelles.",       tags: ["Four à pain", "Pisé"] },
  /* ─── PROJETS CITOYENS ─── */
  { id: 7,  tab: "projets",      icone: "🌾", titre: "Grainothèque itinérante du Pays d'Oc",                     statut: "En cours",        sousTheme: "Grainothèques",         auteur: "Sophie L.", initiales: "SL", ville: "Toulouse",   date: "depuis 2025",          participants: 38,  desc: "Une malle de graines reproductibles qui circule entre 15 points de dépôt. Semences paysannes gratuites : tomates, courges, aromatiques.", tags: ["Semences", "Partage"] },
  { id: 8,  tab: "projets",      icone: "🌳", titre: "Forêt nourricière — terrain municipal en transition",      statut: "En construction", sousTheme: "Forêts nourricières",   auteur: "Marc B.",   initiales: "MB", ville: "Lyon",       date: "démarré janv. 2026",   participants: 29,  desc: "1,2 hectare en convention avec la mairie. 3 strates plantées, mulch en place. Prochaine étape : plantes couvre-sol et animations.",      tags: ["Forêt", "Agroforesterie"] },
  { id: 9,  tab: "projets",      icone: "♻️", titre: "Composteurs collectifs de quartier — 12 sites",           statut: "Besoin d'aide",   sousTheme: "Composteurs collectifs", auteur: "Hélène R.", initiales: "HR", ville: "Bordeaux",   date: "depuis 2024",          participants: 52,  desc: "12 composteurs dans 12 rues. Des référents forment les voisins. On cherche 4 nouveaux référents pour ouvrir 4 sites supplémentaires.",   tags: ["Compost", "Déchets"] },
  /* ─── ÉVÉNEMENTS & RENCONTRES ─── */
  { id: 10, tab: "evenements",   icone: "🌸", titre: "Fête des plantes & bourse aux graines 2026",               statut: "À venir",         sousTheme: "Fêtes des plantes",     auteur: "Daniel C.", initiales: "DC", ville: "Limoges",    date: "20 sept. 2026",        participants: 0,   desc: "Grande fête annuelle : plants à troquer, semences paysannes, conférences, ateliers enfants et restauration locale. Entrée libre.",       tags: ["Fête", "Plantes"] },
  { id: 11, tab: "evenements",   icone: "🧺", titre: "Marché des producteurs du Terrier — chaque samedi",        statut: "En cours",        sousTheme: "Marchés de producteurs", auteur: "Pierre M.", initiales: "PM", ville: "Thiers",     date: "chaque samedi 9h",     participants: 120, desc: "15 producteurs locaux, 0 intermédiaire. Légumes, fromages, pains, miel, conserves. Place de la Fontaine, 9h-13h.",                    tags: ["Marché", "Producteurs"] },
  { id: 12, tab: "evenements",   icone: "✂️", titre: "Atelier taille en permaculture pour débutants",            statut: "À venir",         sousTheme: "Ateliers & Conférences", auteur: "Lucie M.",  initiales: "LM", ville: "Lyon",       date: "14 juin 2026",         participants: 0,   desc: "3h de pratique dans un verger agroforestier. Sécateur fourni, mise en situation réelle. Gratuit, 12 places seulement.",                  tags: ["Taille", "Verger"] },
  /* ─── TERRIERS PARTENAIRES ─── */
  { id: 13, tab: "partenaires",  icone: "🦔", titre: "La Ferme des Castors — éco-lieu en Creuse",                statut: "En cours",        sousTheme: "Fermes",                auteur: "Sophie L.", initiales: "SL", ville: "Creuse",     date: "partenaire depuis 2024", participants: 6,  desc: "15 hectares en agroforesterie. Accueil de wwoofers, stages maraîchage, chantiers participatifs. Hébergement en yourte possible.",         tags: ["Éco-lieu", "Wwoof"] },
  { id: 14, tab: "partenaires",  icone: "🔩", titre: "Atelier Partagé du Plateau — outils en communs",           statut: "Besoin d'aide",   sousTheme: "Ateliers partagés",     auteur: "Marc B.",   initiales: "MB", ville: "Clermont-Fd",date: "ouvert 2023",          participants: 34,  desc: "400m² d'outils professionnels en accès partagé. Machines à bois, soudure, couture industrielle. Cherche bénévoles pour les permanences.", tags: ["Outils", "Mutualisation"] },
  { id: 15, tab: "partenaires",  icone: "♻️", titre: "Ressourcerie du Bocage — objets et solidarité",           statut: "En cours",        sousTheme: "Ressourceries",         auteur: "Hélène R.", initiales: "HR", ville: "Thiers",     date: "partenaire depuis 2025", participants: 18, desc: "Collecte, remise en état et revente solidaire. Dépôt-vente, ateliers réparation et accueil d'apprentis en réinsertion.",                 tags: ["Solidarité", "Ressourcerie"] },
  /* ─── BOÎTE À IDÉES ─── */
  { id: 16, tab: "boite",        icone: "🔨", titre: "Bibliothèque d'outils du Terrier — on cherche un local",  statut: "Besoin d'aide",   sousTheme: "Bibliothèque d'outils", auteur: "Daniel C.", initiales: "DC", ville: "Lyon",       date: "projet 2026",          participants: 17,  desc: "150 outils déjà recensés, des membres volontaires pour les prêts. Il manque un local de 40m² minimum. Tu connais quelqu'un ?",           tags: ["Outils", "Partage"] },
  { id: 17, tab: "boite",        icone: "🍅", titre: "Conserverie collective saisonnière — besoin de bénévoles",statut: "Besoin d'aide",   sousTheme: "Conserverie collective", auteur: "Pierre M.", initiales: "PM", ville: "Toulouse",   date: "juil. → sept. 2026",   participants: 12,  desc: "Transformer les surplus du jardin en conserves pour l'hiver. Cuisine de collectivité disponible. Cherche 8 bénévoles pour les sessions.", tags: ["Conserves", "Surplus"] },
  { id: 18, tab: "boite",        icone: "🚗", titre: "Covoiturage rural 2.0 — réseau Terrier",                  statut: "En cours",        sousTheme: "Covoiturage rural",     auteur: "Lucie M.",  initiales: "LM", ville: "France",     date: "depuis 2025",          participants: 89,  desc: "Covoiturage entre membres Niglomode pour marchés, événements et chantiers. 89 membres, 12 villes couvertes.",                            tags: ["Covoiturage", "Réseau"] },
];

const lucioles = [
  { top: "12%", left: "8%",  r: 2.5 }, { top: "28%", left: "92%", r: 2 },
  { top: "55%", left: "5%",  r: 1.8 }, { top: "70%", left: "88%", r: 2.2 },
  { top: "18%", left: "75%", r: 1.5 }, { top: "42%", left: "95%", r: 2 },
  { top: "82%", left: "15%", r: 1.8 }, { top: "8%",  left: "55%", r: 2.2 },
  { top: "65%", left: "48%", r: 1.5 }, { top: "35%", left: "22%", r: 2 },
  { top: "90%", left: "72%", r: 1.8 }, { top: "22%", left: "38%", r: 1.5 },
];

export default function InitiativesProjetsPage() {
  const [tab, setTab] = useState<Tab>("associations");
  const [showForm, setShowForm] = useState(false);
  const [recherche, setRecherche] = useState("");

  const currentTab = tabs.find((t) => t.id === tab)!;
  const sousThemeActif = currentTab.items.includes(recherche) ? recherche : null;

  const initiativesFiltrees = initiatives.filter((i) => {
    if (i.tab !== tab) return false;
    if (!recherche) return true;
    if (sousThemeActif) return i.sousTheme === sousThemeActif;
    return i.titre.toLowerCase().includes(recherche.toLowerCase()) || i.desc.toLowerCase().includes(recherche.toLowerCase());
  });

  const isEmpty = initiativesFiltrees.length === 0;
  const count = initiativesFiltrees.length;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/initiatives-projets-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.22) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 52 }}>🌱</span>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", lineHeight: 1.2, textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              INITIATIVES & <span style={{ color: "#D8B56A" }}>PROJETS</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 6px rgba(6,14,8,0.7)" }}>
              Ensemble, faisons pousser des idées qui changent le Terrier
            </p>
            <p style={{ color: "rgba(245,239,216,0.95)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Faire naître des idées, rassembler des volontés et transformer les envies en actions concrètes.
              Ici, chacun peut proposer un projet, rejoindre une initiative ou aider à construire quelque chose de plus grand que soi.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Quand plusieurs Niglos creusent ensemble, le terrier va plus loin.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
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
            <button onClick={() => setShowForm(true)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Proposer un thème
            </button>
          </div>
        </div>
      </section>

      {/* ═══ INITIATIVES ═══ */}
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
              + Proposer
            </button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucune initiative trouvée</p>
              <p className="text-sm mt-1">Sois le premier à proposer quelque chose ici.</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
                + Proposer
              </button>
            </div>
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {initiativesFiltrees.map((ini) => {
                const st = statutStyle[ini.statut] ?? { tabBg: "#4F6B47", label: ini.statut };
                return (
                  <div key={ini.id}
                    className="flex flex-col transition-all hover:-translate-y-1"
                    style={{
                      background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                      border: "1px solid #C4B898", borderRadius: "4px",
                      boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.10)",
                      overflow: "hidden",
                    }}>
                    {/* Onglet statut */}
                    <div style={{ backgroundColor: st.tabBg, padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5EFD8" }}>
                      <span>{st.label}</span>
                    </div>
                    {/* Icone */}
                    <div style={{ paddingTop: 18, paddingBottom: 4, textAlign: "center" }}>
                      <span style={{ fontSize: 44 }}>{ini.icone}</span>
                    </div>
                    {/* Titre */}
                    <div style={{ padding: "4px 18px 8px", textAlign: "center" }}>
                      <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35, display: "inline", borderBottom: "2px solid rgba(30,53,36,0.2)", paddingBottom: 3 }}>{ini.titre}</h3>
                    </div>
                    {/* Desc */}
                    <div style={{ padding: "4px 18px 10px", flex: 1 }}>
                      <p style={{ color: "#6B4F34", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", textAlign: "center", opacity: 0.9 }}>{ini.desc}</p>
                    </div>
                    {/* Participants + sous-thème */}
                    <div style={{ padding: "4px 18px 10px", display: "flex", justifyContent: "center", gap: 14 }}>
                      {ini.participants > 0 && (
                        <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.5 }}>👥 {ini.participants} participant{ini.participants > 1 ? "s" : ""}</span>
                      )}
                      <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>📍 {ini.ville}</span>
                    </div>
                    {/* Tags */}
                    <div style={{ padding: "0 18px 10px", display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                      {ini.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid rgba(79,107,71,0.2)" }}>{tag}</span>
                      ))}
                    </div>
                    {/* Pied */}
                    <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />
                    <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#4F6B47", color: "#F5EFD8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{ini.initiales}</div>
                        <div>
                          <p style={{ fontSize: 11, fontWeight: 600, color: "#1E3524" }}>{ini.auteur}</p>
                          <p style={{ fontSize: 10, color: "#1E3524", opacity: 0.4 }}>{ini.date}</p>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        Rejoindre
                      </button>
                    </div>
                  </div>
                );
              })}
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
            {/* En-tête */}
            <div style={{ backgroundColor: "#7a5c1e", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🦔</span>
              <div>
                <p style={{ color: "#F5EFD8", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Carnet du Fondateur</p>
                <p style={{ color: "rgba(245,239,216,0.65)", fontSize: 10 }}>Note de terrain — Niglomode</p>
              </div>
            </div>
            {/* Corps */}
            <div style={{ padding: "24px 28px" }}>
              <p style={{ color: "#3a2c1a", fontSize: 13, lineHeight: 1.9, fontStyle: "italic" }}>
                &ldquo;Cette section est destinée à devenir un véritable point de rencontre entre les idées et les personnes prêtes à agir.
                Associations, collectivités, artisans, bénévoles ou simples habitants : chacun peut apporter une pierre au Terrier.
                Les plus beaux projets commencent souvent par une simple idée partagée.&rdquo;
              </p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, fontStyle: "italic", color: "#7a5c1e", opacity: 0.75 }}>— Le Fondateur du Terrier 🌱</span>
              </div>
            </div>
            {/* CTA */}
            <div style={{ borderTop: "1px dashed #D8B56A", padding: "14px 28px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <p style={{ fontSize: 12, color: "#6B4F34", flex: 1, minWidth: 200 }}>Tu as une idée ? Rejoins une initiative ou propose la tienne.</p>
              <button onClick={() => setShowForm(true)}
                className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                💡 Proposer une idée
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
          <span style={{ fontSize: 44 }}>🌱</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>Ensemble, construisons quelque chose de plus grand que soi</h2>
          <p style={{ color: "rgba(233,223,200,0.75)", lineHeight: 1.75 }} className="text-sm max-w-xl">
            Niglomode n&apos;est pas un réseau social — c&apos;est un Terrier vivant.
            Chaque initiative, chaque projet, chaque chantier enrichit la communauté.
            Tu n&apos;as pas besoin d&apos;être expert. Tu as juste besoin d&apos;envie.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Idées", "Échanges", "Entraide", "Coopération", "Territoire", "Avenir"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>{v}</span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90 mt-1"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            🌱 Proposer une initiative
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
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Proposer dans Initiatives & Projets</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
              <span>🌱</span><span>Partage ton projet, ton association ou ton idée. La communauté te rejoindra.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "🤝 Une association", desc: "Collectif, groupe, structure" },
                { label: "🔨 Un chantier", desc: "Travaux participatifs, plantation" },
                { label: "💡 Une idée", desc: "Projet à construire ensemble" },
                { label: "🎉 Un événement", desc: "Fête, atelier, rencontre" },
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
              { label: "Titre *",  type: "text", placeholder: "Décris en quelques mots ton initiative" },
              { label: "Ta ville", type: "text", placeholder: "Pour localiser l'initiative" },
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
              <textarea rows={4} placeholder="Contexte, objectif, ce que tu cherches (bénévoles, partenaires, ressources…)"
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
