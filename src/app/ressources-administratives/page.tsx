"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "creation" | "gestion" | "financements" | "documents" | "demarches" | "guides";

type FicheAdmin = {
  id: number;
  icone: string;
  titre: string;
  tab: Tab;
  sousTheme: string;
  auteur: string;
  initiales: string;
  date: string;
  desc: string;
  typeDoc: string;
  vues: number;
  tags: string[];
  pdfPath?: string;
  lienExterne?: string;
  sourceLabel?: string;
};

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  { id: "creation",      icon: "📑", label: "Création d'association",      sublabel: "Créer simplement",
    items: ["Statuts types", "Déclaration préfecture", "Assemblée constitutive", "Bureau & responsabilités", "Obligations légales"] },
  { id: "gestion",       icon: "📋", label: "Gestion & Fonctionnement",    sublabel: "Faire vivre son projet",
    items: ["Assemblées générales", "Procès-verbaux", "Règlement intérieur", "Gestion des membres", "Organisation interne"] },
  { id: "financements",  icon: "💰", label: "Subventions & Financements",  sublabel: "Trouver des aides",
    items: ["Fonds associatifs", "Aides communales", "Aides régionales", "Appels à projets", "Financements participatifs"] },
  { id: "documents",     icon: "📄", label: "Documents & Modèles",         sublabel: "Modèles prêts à l'emploi",
    items: ["Convocations", "Comptes-rendus", "Courriers types", "Autorisations", "Dossiers administratifs"] },
  { id: "demarches",     icon: "⚖️", label: "Démarches & Réglementations", sublabel: "Comprendre sans jargon",
    items: ["Assurances", "Déclarations", "Responsabilités", "Obligations légales", "Sécurité événements"] },
  { id: "guides",        icon: "🧭", label: "Guides Pratiques",            sublabel: "Avancer étape par étape",
    items: ["Créer son association", "Organiser un événement", "Monter un projet", "Rechercher financements", "Gérer des bénévoles"] },
];

const typeDocStyle: Record<string, { bg: string; color: string }> = {
  "Modèle Word": { bg: "rgba(42,107,138,0.15)", color: "#1a4d6b" },
  "Guide PDF":   { bg: "rgba(79,107,71,0.18)",  color: "#2d5a27" },
  "Tableau":     { bg: "rgba(200,134,10,0.15)", color: "#7a5c1e" },
  "Tutoriel":    { bg: "rgba(107,79,52,0.15)",  color: "#6B4F34" },
  "Ressource":   { bg: "rgba(122,76,30,0.12)",  color: "#7a4c1e" },
};

const fiches: FicheAdmin[] = [
  /* ─── CRÉATION D'ASSOCIATION ─── */
  { id: 1,  tab: "creation",     icone: "📝", titre: "Modèle de statuts d'association loi 1901",                   sousTheme: "Statuts types",          auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Modèle officiel complet et commenté. Les clauses essentielles expliquées, les pièges à éviter, les points à personnaliser selon votre projet.",         typeDoc: "Modèle PDF",  vues: 1243, tags: ["Statuts", "Loi 1901"],       pdfPath: "/docs/modele-statuts-asso.pdf",         sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 2,  tab: "creation",     icone: "📮", titre: "Cerfa 13973*04 — Déclaration de création d'association",     sousTheme: "Déclaration préfecture", auteur: "service-public.fr",    initiales: "SP", date: "2026",           desc: "Formulaire officiel pour déclarer la création de votre association en préfecture. Gratuit depuis 2019. À remettre avec les statuts signés.",             typeDoc: "Cerfa PDF",   vues: 2341, tags: ["Préfecture", "Cerfa 13973"],  pdfPath: "/docs/cerfa-13973-creation-asso.pdf",   sourceLabel: "formulaires.service-public.fr · 2026" },
  { id: 3,  tab: "creation",     icone: "🤝", titre: "Modèle de PV de l'assemblée générale constitutive",          sousTheme: "Assemblée constitutive", auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Procès-verbal officiel avec toutes les mentions obligatoires. Élection du bureau, adoption des statuts, désignation du représentant légal.",             typeDoc: "Modèle PDF",  vues: 654,  tags: ["Assemblée", "PV"],            pdfPath: "/docs/modele-pv-ag-constitutive.pdf",   sourceLabel: "associations.gouv.fr · mars 2026" },
  /* ─── GESTION & FONCTIONNEMENT ─── */
  { id: 4,  tab: "gestion",      icone: "📊", titre: "Cerfa 13971*03 — Déclaration de la liste des dirigeants",    sousTheme: "Procès-verbaux",         auteur: "service-public.fr",    initiales: "SP", date: "2026",           desc: "Formulaire officiel pour déclarer les personnes chargées de l'administration. Obligatoire en cas de changement de bureau ou de dirigeants.",           typeDoc: "Cerfa PDF",   vues: 891,  tags: ["Bureau", "Dirigeants"],       pdfPath: "/docs/cerfa-13971-liste-dirigeants.pdf",sourceLabel: "formulaires.service-public.fr · 2026" },
  { id: 5,  tab: "gestion",      icone: "📜", titre: "Modèle de règlement intérieur d'association",                sousTheme: "Règlement intérieur",    auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Règlement intérieur officiel commenté : cotisations, droits et devoirs des membres, discipline, démission, exclusion. À adapter librement.",             typeDoc: "Modèle PDF",  vues: 578,  tags: ["Règlement", "Membres"],       pdfPath: "/docs/modele-reglement-interieur.pdf",  sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 6,  tab: "gestion",      icone: "📬", titre: "Modèle de convocation à l'assemblée générale",               sousTheme: "Assemblées générales",   auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Modèle officiel de convocation avec ordre du jour type, délais légaux et mentions obligatoires. Valable pour AG ordinaire et constitutive.",             typeDoc: "Modèle PDF",  vues: 445,  tags: ["AG", "Convocation"],          pdfPath: "/docs/modele-convocation-ag.pdf",       sourceLabel: "associations.gouv.fr · mars 2026" },
  /* ─── SUBVENTIONS & FINANCEMENTS ─── */
  { id: 7,  tab: "financements", icone: "💶", titre: "Guide d'usage de la subvention 2025-2026",                   sousTheme: "Fonds associatifs",      auteur: "associations.gouv.fr", initiales: "GO", date: "sept. 2025",     desc: "Guide officiel complet : FDVA, aides État, collectivités. Critères d'octroi, modalités d'utilisation, reddition de comptes. Conforme réglementation UE.", typeDoc: "Guide PDF",   vues: 1087, tags: ["Subventions", "FDVA"],        pdfPath: "/docs/guide-subventions-2025-2026.pdf", sourceLabel: "associations.gouv.fr · sept. 2025" },
  { id: 8,  tab: "financements", icone: "🏛️", titre: "Cerfa 12156*06 — Demande de subvention à l'État",           sousTheme: "Aides communales",       auteur: "service-public.fr",    initiales: "SP", date: "2026",           desc: "Formulaire officiel pour toute demande de subvention auprès de l'État ou d'un établissement public. Remplissable et imprimable. Dépôt via Le Compte Asso.", typeDoc: "Cerfa PDF",   vues: 1532, tags: ["Subvention", "Cerfa 12156"],  pdfPath: "/docs/cerfa-12156-demande-subvention.pdf",sourceLabel: "formulaires.service-public.fr · 2026" },
  { id: 9,  tab: "financements", icone: "📢", titre: "Appel à projets DJEPVA 2026 — modalités et critères",        sousTheme: "Appels à projets",       auteur: "associations.gouv.fr", initiales: "GO", date: "nov. 2025",      desc: "Document officiel de l'appel à projets 2026 de la DJEPVA. Thématiques, calendrier de dépôt, critères de sélection et montants disponibles.",            typeDoc: "Guide PDF",   vues: 612,  tags: ["Appel à projets", "DJEPVA"],  pdfPath: "/docs/appel-projets-2026.pdf",          sourceLabel: "associations.gouv.fr · nov. 2025" },
  /* ─── DOCUMENTS & MODÈLES ─── */
  { id: 10, tab: "documents",    icone: "📬", titre: "Modèle de convocation à l'Assemblée Générale — document officiel", sousTheme: "Convocations",       auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Convocation type avec ordre du jour, délais légaux et mentions obligatoires. Valable pour AG ordinaire, extraordinaire et constitutive. À personnaliser selon vos statuts.",  typeDoc: "Modèle PDF",  vues: 534,  tags: ["AG", "Convocation"],          pdfPath: "/docs/modele-convocation-ag.pdf",       sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 11, tab: "documents",    icone: "📜", titre: "Modèle de PV d'assemblée générale constitutive",             sousTheme: "Comptes-rendus",         auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "PV type avec toutes les mentions obligatoires. Élection du bureau, adoption des statuts, désignation du représentant légal et tour de signature.",     typeDoc: "Modèle PDF",  vues: 467,  tags: ["PV", "AG"],                   pdfPath: "/docs/modele-pv-ag-constitutive.pdf",   sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 12, tab: "documents",    icone: "📸", titre: "Droit à l'image — autorisations et bonnes pratiques",        sousTheme: "Autorisations",          auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Ce que vous pouvez photographier et diffuser. Autorisation écrite obligatoire pour tout participant, règles spéciales pour les mineurs, conditions d'utilisation sur réseaux sociaux et site web.", typeDoc: "Guide PDF",   vues: 389,  tags: ["Droit image", "Autorisation"], lienExterne: "https://associations.gouv.fr/le-droit-limage", sourceLabel: "associations.gouv.fr · 2026" },
  /* ─── DÉMARCHES & RÉGLEMENTATIONS ─── */
  { id: 13, tab: "demarches",    icone: "🛡️", titre: "Les assurances d'une association — RC civile et bénévoles",  sousTheme: "Assurances",             auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Ce qui est obligatoire, ce qui est conseillé. RC civile, protection juridique, assurance des bénévoles et des locaux. Liens officiels inclus.",        typeDoc: "Guide PDF",   vues: 798,  tags: ["Assurance", "RC civile"],     lienExterne: "https://associations.gouv.fr/lassurance-et-la-protection-sociale-des-benevoles", sourceLabel: "associations.gouv.fr · 2026" },
  { id: 14, tab: "demarches",    icone: "📢", titre: "Déclaration d'association — liste des dirigeants (Cerfa)",   sousTheme: "Déclarations",           auteur: "service-public.fr",    initiales: "SP", date: "2026",           desc: "Cerfa 13971*03 : formulaire de déclaration des responsables de l'association. À fournir lors de la création et à chaque changement de bureau.",       typeDoc: "Cerfa PDF",   vues: 654,  tags: ["Dirigeants", "Cerfa 13971"],  pdfPath: "/docs/cerfa-13971-liste-dirigeants.pdf",sourceLabel: "formulaires.service-public.fr · 2026" },
  { id: 15, tab: "demarches",    icone: "⚖️", titre: "Responsabilités civile, pénale et financière du bureau",     sousTheme: "Responsabilités",        auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Ce qu'engagent le président, le trésorier et le secrétaire. Responsabilité en cas de faute de gestion, d'accident ou de dette non payée.",           typeDoc: "Guide PDF",   vues: 521,  tags: ["Bureau", "Responsabilité"],   lienExterne: "https://associations.gouv.fr/responsabilite-des-dirigeants", sourceLabel: "associations.gouv.fr · 2026" },
  /* ─── GUIDES PRATIQUES ─── */
  { id: 16, tab: "guides",       icone: "🚀", titre: "Créer son association — statuts, déclaration et premiers pas",sousTheme: "Créer son association",  auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Le modèle officiel de statuts à télécharger et personnaliser pour créer votre association loi 1901 en toute simplicité.",                            typeDoc: "Modèle PDF",  vues: 1534, tags: ["Création", "Débutant"],       pdfPath: "/docs/modele-statuts-asso.pdf",         sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 17, tab: "guides",       icone: "💶", titre: "Guide officiel pour demander une subvention à l'État",        sousTheme: "Rechercher financements",auteur: "associations.gouv.fr", initiales: "GO", date: "sept. 2025",     desc: "Guide d'usage complet 2025-2026 : conditions, procédure, reddition de comptes. Le document de référence pour toute démarche de financement public.",  typeDoc: "Guide PDF",   vues: 876,  tags: ["Subvention", "État"],         pdfPath: "/docs/guide-subventions-2025-2026.pdf", sourceLabel: "associations.gouv.fr · sept. 2025" },
  { id: 18, tab: "guides",       icone: "📋", titre: "Cerfa 12156*06 — Formulaire demande de subvention",           sousTheme: "Rechercher financements",auteur: "service-public.fr",    initiales: "SP", date: "2026",           desc: "Formulaire officiel à déposer via Le Compte Asso pour toute demande de subvention à l'État ou à un établissement public. Remplissable en ligne.",     typeDoc: "Cerfa PDF",   vues: 1234, tags: ["Cerfa 12156", "Subvention"],  pdfPath: "/docs/cerfa-12156-demande-subvention.pdf",sourceLabel: "formulaires.service-public.fr · 2026" },

  /* ─── CRÉATION D'ASSOCIATION — sous-thèmes manquants ─── */
  { id: 19, tab: "creation",     icone: "🏛️", titre: "Les dirigeants élus — rôles, pouvoirs et mandat du bureau",  sousTheme: "Bureau & responsabilités", auteur: "associations.gouv.fr", initiales: "GO", date: "2026",       desc: "Président, trésorier, secrétaire : comment définir leurs attributions dans les statuts, portée de leur mandat, engagement de l'association envers les tiers. Essentiel avant votre première AG.", typeDoc: "Guide PDF",   vues: 712,  tags: ["Bureau", "Pouvoirs"],         lienExterne: "https://associations.gouv.fr/les-dirigeants-elus-de-lassociation", sourceLabel: "associations.gouv.fr · 2026" },
  { id: 20, tab: "creation",     icone: "📗", titre: "Guide pratique officiel — création, déclaration et obligations loi 1901", sousTheme: "Obligations légales", auteur: "associations.gouv.fr", initiales: "GO", date: "oct. 2025", desc: "Le guide de référence complet mis à jour en octobre 2025 : toutes les étapes de création, obligations légales permanentes, formalités déclaratives et règles de fonctionnement expliquées simplement.", typeDoc: "Guide PDF",   vues: 1891, tags: ["Obligations", "Guide officiel"], pdfPath: "/docs/guide-pratique-associations.pdf", sourceLabel: "associations.gouv.fr · oct. 2025" },

  /* ─── GESTION & FONCTIONNEMENT — sous-thèmes manquants ─── */
  { id: 21, tab: "gestion",      icone: "👥", titre: "Cotisations et adhérents — gérer librement ses membres",      sousTheme: "Gestion des membres",    auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Définir les montants, les catégories et les modalités de paiement. Droits des membres, procédure de radiation, registre des adhérents. Les associations fixent librement leurs règles.", typeDoc: "Guide PDF",   vues: 654,  tags: ["Adhérents", "Cotisations"],   lienExterne: "https://associations.gouv.fr/cotisations",                          sourceLabel: "associations.gouv.fr · 2026" },
  { id: 22, tab: "gestion",      icone: "🗂️", titre: "Organisation interne — conseil d'administration et gouvernance", sousTheme: "Organisation interne", auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Comment organiser le CA, définir les pouvoirs et délégations, répartir les rôles au quotidien. Les statuts et règlement intérieur comme outils de gouvernance interne et de prise de décision.", typeDoc: "Guide PDF",   vues: 487,  tags: ["CA", "Gouvernance"],          lienExterne: "https://associations.gouv.fr/les-dirigeants-elus-de-lassociation",  sourceLabel: "associations.gouv.fr · 2026" },

  /* ─── SUBVENTIONS & FINANCEMENTS — sous-thèmes manquants ─── */
  { id: 23, tab: "financements", icone: "🗺️", titre: "Aides-territoires — toutes les aides locales sur un seul portail", sousTheme: "Aides régionales",   auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Portail public gratuit recensant les aides financières des régions, départements, communes et partenaires locaux. Recherche par territoire, thématique et type de projet. FDVA régional inclus.", typeDoc: "Ressource",   vues: 923,  tags: ["Région", "Collectivités", "FDVA"], lienExterne: "https://associations.gouv.fr/aides-et-territoires-la-plateforme-qui-recense-les-aides", sourceLabel: "associations.gouv.fr · 2026" },
  { id: 24, tab: "financements", icone: "💻", titre: "Financement participatif (crowdfunding) — guide officiel",      sousTheme: "Financements participatifs", auteur: "associations.gouv.fr", initiales: "GO", date: "2026",       desc: "Tout sur le crowdfunding associatif : plateformes généralistes ou spécialisées, dons avec reçu fiscal, collectes en ligne. Règles, plafonds légaux et démarches pour lancer votre campagne.", typeDoc: "Guide PDF",   vues: 734,  tags: ["Crowdfunding", "Dons en ligne"], lienExterne: "https://www.associations.gouv.fr/financement-participatif.html",    sourceLabel: "associations.gouv.fr · 2026" },

  /* ─── DOCUMENTS & MODÈLES — sous-thèmes manquants ─── */
  { id: 25, tab: "documents",    icone: "✉️", titre: "Modèle de courrier type — information et accord parental",     sousTheme: "Courriers types",        auteur: "associations.gouv.fr", initiales: "GO", date: "mars 2026",      desc: "Courrier officiel pour informer les parents et obtenir leur accord lors d'activités impliquant des mineurs. Mentions obligatoires, autorisation de sortie, activités et hébergement.",        typeDoc: "Modèle PDF",  vues: 341,  tags: ["Courrier", "Mineurs"],        pdfPath: "/docs/modele-courrier-info-parents.pdf", sourceLabel: "associations.gouv.fr · mars 2026" },
  { id: 26, tab: "documents",    icone: "🗄️", titre: "Le Compte Asso — gérer tous ses dossiers administratifs en ligne", sousTheme: "Dossiers administratifs", auteur: "lecompteasso.associations.gouv.fr", initiales: "CA", date: "2026", desc: "Plateforme officielle pour déposer demandes de subvention, déclarer les données annuelles et gérer son dossier. Accès sécurisé, suivi temps réel, zéro papier, reconnaissance RNA automatique.", typeDoc: "Ressource",   vues: 1102, tags: ["Dossier", "Numérique"],       lienExterne: "https://lecompteasso.associations.gouv.fr/demander-une-subvention/", sourceLabel: "lecompteasso.associations.gouv.fr · 2026" },

  /* ─── DÉMARCHES & RÉGLEMENTATIONS — sous-thèmes manquants ─── */
  { id: 27, tab: "demarches",    icone: "📌", titre: "Obligations des associations — ce que la loi impose au quotidien", sousTheme: "Obligations légales",  auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "Déclarations obligatoires, tenue des registres, obligations comptables selon la taille, contrat d'engagement républicain. Tout ce que votre association doit respecter pour rester en règle.", typeDoc: "Guide PDF",   vues: 867,  tags: ["Obligations", "Registres"],   lienExterne: "https://associations.gouv.fr/faq/thematiques/obligations-des-associations", sourceLabel: "associations.gouv.fr · 2026" },
  { id: 28, tab: "demarches",    icone: "🚨", titre: "Organiser une manifestation — déclarations, sécurité et autorisations", sousTheme: "Sécurité événements", auteur: "associations.gouv.fr", initiales: "GO", date: "2026",          desc: "Avant tout événement public : déclaration mairie/préfet (3 à 15 jours avant), assurance RC obligatoire, autorisation voie publique, SACEM si musique. Délais, formulaires et contacts sécurité.", typeDoc: "Guide PDF",   vues: 634,  tags: ["Manifestation", "Sécurité"],  lienExterne: "https://associations.gouv.fr/les-formalites-administratives-liees-lorganisation-dune-manifestation", sourceLabel: "associations.gouv.fr · 2026" },

  /* ─── GUIDES PRATIQUES — sous-thèmes manquants ─── */
  { id: 29, tab: "guides",       icone: "🎪", titre: "Manifestations et voyages — guide complet d'organisation",     sousTheme: "Organiser un événement", auteur: "associations.gouv.fr", initiales: "GO", date: "2026",           desc: "De A à Z : formalités administratives, déclarations, assurances, droits musicaux (SACEM), sécurité du public, voyages occasionnels, événements éco-responsables. Checklist et ressources officielles.", typeDoc: "Guide PDF",   vues: 789,  tags: ["Événement", "Checklist"],     lienExterne: "https://associations.gouv.fr/manifestations-et-voyages",           sourceLabel: "associations.gouv.fr · 2026" },
  { id: 30, tab: "guides",       icone: "🧭", titre: "Guide pratique officiel — porter un projet associatif de A à Z", sousTheme: "Monter un projet",      auteur: "associations.gouv.fr", initiales: "GO", date: "oct. 2025",      desc: "Le guide complet d'oct. 2025 : statuts, déclaration préfecture, gouvernance, gestion financière, bénévoles et salariés, subventions, obligations légales. Le document de référence pour tout porteur de projet.", typeDoc: "Guide PDF",   vues: 1445, tags: ["Projet", "Complet"],          pdfPath: "/docs/guide-pratique-associations.pdf", sourceLabel: "associations.gouv.fr · oct. 2025" },
  { id: 31, tab: "guides",       icone: "🤲", titre: "Le Guide du Bénévolat 2024-2025 — droits, formation et engagement", sousTheme: "Gérer des bénévoles", auteur: "associations.gouv.fr", initiales: "GO", date: "mai 2025",       desc: "Guide officiel complet : statut juridique du bénévole, Compte Engagement Citoyen, remboursement de frais, formation, protection sociale, congés associatifs, engagement des mineurs. 2024-2025.", typeDoc: "Guide PDF",   vues: 1123, tags: ["Bénévoles", "Droits"],        pdfPath: "/docs/guide-benevolat-2024-2025.pdf",   sourceLabel: "associations.gouv.fr · mai 2025" },
];

const lucioles = [
  { top: "12%", left: "8%",  r: 2.5 }, { top: "28%", left: "92%", r: 2 },
  { top: "55%", left: "5%",  r: 1.8 }, { top: "70%", left: "88%", r: 2.2 },
  { top: "18%", left: "75%", r: 1.5 }, { top: "42%", left: "95%", r: 2 },
  { top: "82%", left: "15%", r: 1.8 }, { top: "8%",  left: "55%", r: 2.2 },
  { top: "65%", left: "48%", r: 1.5 }, { top: "35%", left: "22%", r: 2 },
  { top: "90%", left: "72%", r: 1.8 }, { top: "22%", left: "38%", r: 1.5 },
];

export default function RessourcesAdministrativesPage() {
  const [tab, setTab]             = useState<Tab>("creation");
  const [showForm, setShowForm]   = useState(false);
  const [ficheActive, setFicheActive] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [recherche, setRecherche] = useState("");

  const currentTab    = tabs.find((t) => t.id === tab)!;
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
        <img src="/ressources-admin-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.45) 0%, rgba(6,14,8,0.22) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 52 }}>📋</span>
            <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.9rem)", fontWeight: 900, letterSpacing: 2, color: "#ffffff", lineHeight: 1.2, textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              RESSOURCES <span style={{ color: "#D8B56A" }}>ADMINISTRATIVES</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 6px rgba(6,14,8,0.7)" }}>
              Créer · Déclarer · Organiser · Financer · Développer
            </p>
            <p style={{ color: "rgba(245,239,216,0.95)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)", marginTop: "24px" }}>
              Créer, organiser et faire grandir ses projets sans se perdre dans les démarches.
              Le Terrier rassemble ici les documents, modèles et guides pour avancer plus sereinement.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Les idées font naître les projets, l&apos;organisation les fait grandir.&rdquo;
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
              ➕ Proposer une ressource
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
              + Contribuer
            </button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucune ressource trouvée</p>
              <p className="text-sm mt-1">Sois le premier à partager un document utile.</p>
              <button onClick={() => setShowForm(true)}
                className="mt-4 px-6 py-2 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>
                + Contribuer
              </button>
            </div>
          ) : (
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {fichesFiltrees.map((f) => {
                const td = typeDocStyle[f.typeDoc] ?? { bg: "rgba(79,107,71,0.12)", color: "#2d5a27" };
                return (
                  <div key={f.id}
                    className="flex flex-col transition-all hover:-translate-y-1 cursor-pointer"
                    onClick={() => setPreviewId(f.id)}
                    style={{
                      background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                      border: "1px solid #C4B898", borderRadius: "4px",
                      boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.10)",
                      overflow: "hidden",
                    }}>
                    {/* Onglet sous-thème */}
                    <div style={{ backgroundColor: "#1E3524", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D8B56A" }}>
                      <span style={{ color: "#E9DFC8" }}>{f.sousTheme}</span>
                    </div>
                    {/* Icone */}
                    <div style={{ paddingTop: 18, paddingBottom: 4, textAlign: "center" }}>
                      <span style={{ fontSize: 44 }}>{f.icone}</span>
                    </div>
                    {/* Badge type doc */}
                    <div style={{ textAlign: "center", padding: "0 18px 6px" }}>
                      <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 20, fontWeight: 700, backgroundColor: td.bg, color: td.color }}>
                        {f.typeDoc}
                      </span>
                    </div>
                    {/* Titre */}
                    <div style={{ padding: "4px 18px 8px", textAlign: "center" }}>
                      <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35, display: "inline", borderBottom: "2px solid rgba(30,53,36,0.2)", paddingBottom: 3 }}>{f.titre}</h3>
                    </div>
                    {/* Desc */}
                    <div style={{ padding: "4px 18px 12px", flex: 1 }}>
                      <p style={{ color: "#6B4F34", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", textAlign: "center", opacity: 0.9 }}>{f.desc}</p>
                    </div>
                    {/* Source officielle */}
                    {f.sourceLabel && (
                      <div style={{ textAlign: "center", padding: "0 18px 6px" }}>
                        <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 600, backgroundColor: "rgba(30,53,36,0.07)", color: "#4F6B47", border: "1px solid rgba(79,107,71,0.2)" }}>
                          ✅ {f.sourceLabel}
                        </span>
                      </div>
                    )}
                    {/* Stats */}
                    <div style={{ padding: "4px 18px 10px", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.35 }}>👁 {f.vues} consultations</span>
                    </div>
                    {/* Tags */}
                    <div style={{ padding: "0 18px 10px", display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                      {f.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid rgba(79,107,71,0.2)" }}>{tag}</span>
                      ))}
                    </div>
                    {/* Pied */}
                    <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />
                    <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, fontStyle: "italic", color: "#6B4F34", opacity: 0.65, maxWidth: 130, lineHeight: 1.3 }}>{f.auteur}</span>
                      {f.pdfPath ? (
                        <a href={f.pdfPath} target="_blank" rel="noopener noreferrer" download
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                          style={{ backgroundColor: "#4F6B47", color: "#F5EFD8", textDecoration: "none" }}>
                          ⬇ Télécharger PDF
                        </a>
                      ) : f.lienExterne ? (
                        <a href={f.lienExterne} target="_blank" rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                          style={{ backgroundColor: "#1E3524", color: "#D8B56A", textDecoration: "none" }}>
                          🔗 Voir en ligne
                        </a>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); setFicheActive(ficheActive === f.id ? null : f.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                          style={{ backgroundColor: "#1E3524", color: "#F5EFD8" }}>
                          Voir
                        </button>
                      )}
                    </div>
                    {ficheActive === f.id && (
                      <div className="px-5 py-4 flex flex-col gap-3"
                        style={{ backgroundColor: "rgba(79,107,71,0.08)", borderTop: "1px solid #C4B898" }}>
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>🤝 Enrichir cette ressource</p>
                        <div className="flex flex-wrap gap-2">
                          {[
                            { icon: "📝", label: "Signaler une mise à jour" },
                            { icon: "💡", label: "Proposer une amélioration" },
                            { icon: "🔗", label: "Ajouter une source" },
                          ].map((c) => (
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
            <div style={{ backgroundColor: "#7a5c1e", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🦔</span>
              <div>
                <p style={{ color: "#F5EFD8", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>Carnet du Fondateur</p>
                <p style={{ color: "rgba(245,239,216,0.65)", fontSize: 10 }}>Note de terrain — Niglomode</p>
              </div>
            </div>
            <div style={{ padding: "24px 28px" }}>
              <p style={{ color: "#3a2c1a", fontSize: 13, lineHeight: 1.9, fontStyle: "italic" }}>
                &ldquo;Beaucoup de bonnes idées ne voient jamais le jour parce que les démarches paraissent compliquées.
                Cette section a pour objectif de rendre ces informations accessibles et de permettre à chacun de passer de l&apos;idée à l&apos;action.
                Si vous connaissez des modèles utiles, des ressources gratuites ou des aides méconnues, partagez-les avec le Terrier.&rdquo;
              </p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, fontStyle: "italic", color: "#7a5c1e", opacity: 0.75 }}>— Le Fondateur du Terrier 📋</span>
              </div>
            </div>
            <div style={{ borderTop: "1px dashed #D8B56A", padding: "14px 28px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <p style={{ fontSize: 12, color: "#6B4F34", flex: 1, minWidth: 200 }}>Tu connais une ressource utile ou une aide méconnue ? Partage-la avec la communauté.</p>
              <button onClick={() => setShowForm(true)}
                className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                📎 Partager une ressource
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
          <span style={{ fontSize: 44 }}>📑</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>Organiser aujourd&apos;hui pour réaliser demain</h2>
          <p style={{ color: "rgba(233,223,200,0.75)", lineHeight: 1.75 }} className="text-sm max-w-xl">
            Transparence, rigueur, solidarité.
            Les outils administratifs ne sont pas une contrainte — ils sont ce qui permet aux projets de durer.
            Le Terrier met à disposition tout ce dont tu as besoin pour agir ensemble.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Créer", "Déclarer", "Enregistrer", "Organiser", "Financer", "Pérenniser"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>{v}</span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)}
            className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90 mt-1"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            📎 Partager une ressource utile
          </button>
        </div>
      </section>

      {/* ═══ MODAL APERÇU DOCUMENT ═══ */}
      {previewId !== null && (() => {
        const pf = fiches.find((f) => f.id === previewId)!;
        const td = typeDocStyle[pf.typeDoc] ?? { bg: "rgba(79,107,71,0.12)", color: "#2d5a27" };
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: "rgba(0,0,0,0.72)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setPreviewId(null); }}>
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: "#1E3524", maxHeight: "92vh", boxShadow: "0 24px 80px rgba(0,0,0,0.65)" }}>

              {/* Header */}
              <div style={{ backgroundColor: "#0d1c10", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(216,181,106,0.2)" }}>
                <span style={{ fontSize: 28 }}>{pf.icone}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 20, fontWeight: 700, backgroundColor: td.bg, color: td.color }}>{pf.typeDoc}</span>
                    {pf.sourceLabel && (
                      <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20, fontWeight: 600, backgroundColor: "rgba(216,181,106,0.12)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.25)" }}>
                        ✅ {pf.sourceLabel}
                      </span>
                    )}
                  </div>
                  <p style={{ color: "#F5EFD8", fontWeight: 800, fontSize: 14, marginTop: 4, lineHeight: 1.3 }}>{pf.titre}</p>
                </div>
                <button onClick={() => setPreviewId(null)}
                  style={{ color: "rgba(245,239,216,0.5)", fontSize: 26, lineHeight: 1, flexShrink: 0, background: "none", border: "none", cursor: "pointer" }}
                  className="hover:opacity-100 transition-opacity">
                  ×
                </button>
              </div>

              {/* Body — iframe ou message */}
              <div style={{ flex: 1, overflow: "hidden", backgroundColor: "#f0f0f0", minHeight: 0 }}>
                {pf.pdfPath ? (
                  <iframe
                    src={pf.pdfPath}
                    title={pf.titre}
                    style={{ width: "100%", height: "100%", minHeight: 480, border: "none", display: "block" }}
                  />
                ) : pf.lienExterne ? (
                  <div className="flex flex-col items-center justify-center gap-5 py-16"
                    style={{ backgroundColor: "#F5EFD8", height: "100%" }}>
                    <span style={{ fontSize: 52 }}>🔗</span>
                    <p style={{ color: "#1E3524", fontWeight: 700, fontSize: 14, textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
                      Ce document est disponible directement sur le site officiel.
                    </p>
                    <a href={pf.lienExterne} target="_blank" rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A", textDecoration: "none" }}>
                      🔗 Ouvrir sur {pf.auteur}
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 py-16"
                    style={{ backgroundColor: "#F5EFD8", height: "100%" }}>
                    <span style={{ fontSize: 48 }}>📄</span>
                    <p style={{ color: "#1E3524", fontSize: 13 }}>Aperçu non disponible.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{ backgroundColor: "#0d1c10", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(216,181,106,0.2)", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 11, color: "rgba(245,239,216,0.45)", fontStyle: "italic" }}>{pf.auteur}</span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setPreviewId(null)}
                    className="px-4 py-2 rounded-full text-xs font-semibold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(245,239,216,0.7)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    ← Fermer
                  </button>
                  {pf.pdfPath ? (
                    <a href={pf.pdfPath} target="_blank" rel="noopener noreferrer" download
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#4F6B47", color: "#F5EFD8", textDecoration: "none" }}>
                      ⬇ Télécharger PDF
                    </a>
                  ) : pf.lienExterne ? (
                    <a href={pf.lienExterne} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A", textDecoration: "none", border: "1px solid rgba(216,181,106,0.4)" }}>
                      🔗 Voir en ligne
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ═══ FORMULAIRE CONTRIBUTION ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Partager une ressource administrative</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
              <span>📋</span><span>Modèles, guides, liens utiles, aides méconnues — tout ce qui aide à avancer est le bienvenu.</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "📄 Un modèle",    desc: "Statuts, courrier, formulaire" },
                { label: "📖 Un guide",     desc: "Tuto, démarche expliquée" },
                { label: "💰 Une aide",     desc: "Subvention, dispositif méconnu" },
                { label: "🔗 Un lien",      desc: "Site officiel, ressource web" },
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
              { label: "Titre *",       type: "text",  placeholder: "Nom du document ou de la ressource" },
              { label: "Description *", type: "text",  placeholder: "À quoi ça sert ? Pour qui ?" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Fichier ou lien</label>
              <input type="file" accept=".pdf,.doc,.docx,.odt,.xls,.xlsx,.ods,.csv" className="text-sm" style={{ color: "#1E3524" }} />
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
