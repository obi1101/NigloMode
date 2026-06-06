"use client";
import { useState } from "react";
import Link from "next/link";

const categories = [
  "Bricolage", "Jardinage", "Informatique", "Mécanique", "Transport",
  "Administratif", "Artisanat", "Construction", "Éducation", "Santé préventive", "Autre",
];

const annonces = [
  { id: 1, titre: "Besoin d'aide pour réparer une clôture", type: "Demande", categorie: "Bricolage", ville: "Limoges", date: "il y a 2 jours", desc: "Je recherche une personne sachant utiliser une perceuse et quelques outils de base.", auteur: "Marcel D.", recomm: 8 },
  { id: 2, titre: "Propose cours d'informatique pour seniors", type: "Offre", categorie: "Informatique", ville: "Bordeaux", date: "il y a 1 jour", desc: "Disponible le samedi matin pour aider à la prise en main d'un PC ou smartphone.", auteur: "Sophie L.", recomm: 14 },
  { id: 3, titre: "Cherche covoiturage vers Clermont-Ferrand", type: "Demande", categorie: "Transport", ville: "Thiers", date: "il y a 3 jours", desc: "Besoin d'un trajet aller-retour le mercredi 12, départ matin, retour soir.", auteur: "Pierre M.", recomm: 3 },
  { id: 4, titre: "Donne cours de jardinage / potager bio", type: "Offre", categorie: "Jardinage", ville: "Lyon", date: "il y a 5 jours", desc: "Maraîcher amateur depuis 10 ans, je partage mes connaissances volontiers.", auteur: "Hélène R.", recomm: 21 },
  { id: 5, titre: "Aide pour déclaration d'impôts", type: "Offre", categorie: "Administratif", ville: "Toulouse", date: "il y a 1 semaine", desc: "Retraité ancien comptable, je propose mon aide pour les démarches fiscales.", auteur: "Jean-Paul B.", recomm: 17 },
  { id: 6, titre: "Besoin d'un coup de main déménagement", type: "Demande", categorie: "Transport", ville: "Nantes", date: "il y a 4 jours", desc: "Déménagement prévu samedi prochain, appartement au 2ème sans ascenseur.", auteur: "Camille T.", recomm: 5 },
];

const membres = [
  { pseudo: "Marcel D.", ville: "Limoges", competences: ["Bricolage", "Menuiserie"], recomm: 8, initiales: "MD" },
  { pseudo: "Sophie L.", ville: "Bordeaux", competences: ["Informatique", "Langues"], recomm: 14, initiales: "SL" },
  { pseudo: "Hélène R.", ville: "Lyon", competences: ["Jardinage", "Cuisine"], recomm: 21, initiales: "HR" },
  { pseudo: "Jean-Paul B.", ville: "Toulouse", competences: ["Administratif", "Comptabilité"], recomm: 17, initiales: "JP" },
];

const terriers = [
  { nom: "Terrier de Limoges", membres: 42, annonces: 18, projets: 3, evenements: 2 },
  { nom: "Terrier de Bordeaux", membres: 67, annonces: 31, projets: 5, evenements: 4 },
  { nom: "Terrier de Lyon", membres: 89, annonces: 44, projets: 7, evenements: 6 },
  { nom: "Terrier de Toulouse", membres: 53, annonces: 22, projets: 4, evenements: 3 },
];

export default function EntraidePage() {
  const [filtreType, setFiltreType] = useState("Tous");
  const [filtreCategorie, setFiltreCategorie] = useState("Toutes");
  const [filtreDistance, setFiltreDistance] = useState("Toute la France");
  const [filtretroc, setFiltretroc] = useState(false);
  const [recherche, setRecherche] = useState("");
  const [showForm, setShowForm] = useState(false);

  const annoncesFiltrees = annonces.filter((a) => {
    if (filtreType !== "Tous" && a.type !== filtreType) return false;
    if (filtreCategorie !== "Toutes" && a.categorie !== filtreCategorie) return false;
    if (filtretroc && !(a as { troc?: boolean }).troc) return false;
    if (recherche && !a.titre.toLowerCase().includes(recherche.toLowerCase()) && !a.desc.toLowerCase().includes(recherche.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section style={{ backgroundColor: "#1A2562", minHeight: "38vh" }} className="relative flex flex-col items-center justify-center text-center px-6 py-16 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/hero-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <span style={{ fontSize: 48 }}>🤝</span>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: 4, color: "#F5C218" }}>
            ENTRAIDE
          </h1>
          <p style={{ color: "rgba(255,255,255,0.80)", maxWidth: 520, lineHeight: 1.7, fontSize: "1.05rem" }}>
            Demander de l&apos;aide, proposer un coup de main, partager des compétences et créer du lien localement.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white" }}
            >
              Je demande de l&apos;aide
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#F5C218", color: "#1A2562" }}
            >
              Je propose mon aide
            </button>
            <button
              className="px-6 py-2.5 rounded-full font-medium text-sm transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.85)" }}
            >
              Trouver des membres près de chez moi
            </button>
          </div>
        </div>
      </section>

      {/* ═══ RECHERCHE + FILTRES ═══ */}
      <section style={{ backgroundColor: "#f0ede4" }} className="py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">

          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Que recherchez-vous ?"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="w-full px-5 py-3 rounded-xl text-base outline-none"
            style={{ border: "2px solid #c8b88a", backgroundColor: "white", color: "#1A2562" }}
          />

          {/* Filtres */}
          <div className="flex flex-wrap gap-3">
            {/* Type */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5a4a30" }}>Type</label>
              <select
                value={filtreType}
                onChange={(e) => setFiltreType(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: "1px solid #c8b88a", backgroundColor: "white", color: "#1A2562" }}
              >
                <option>Tous</option>
                <option>Demande d&apos;aide</option>
                <option>Offre d&apos;aide</option>
              </select>
            </div>

            {/* Catégorie */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5a4a30" }}>Catégorie</label>
              <select
                value={filtreCategorie}
                onChange={(e) => setFiltreCategorie(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: "1px solid #c8b88a", backgroundColor: "white", color: "#1A2562" }}
              >
                <option>Toutes</option>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            {/* Localisation */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5a4a30" }}>Localisation</label>
              <select
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: "1px solid #c8b88a", backgroundColor: "white", color: "#1A2562" }}
              >
                <option>Ville</option>
                <option>Département</option>
                <option>Région</option>
              </select>
            </div>

            {/* Distance */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#5a4a30" }}>Distance</label>
              <select
                value={filtreDistance}
                onChange={(e) => setFiltreDistance(e.target.value)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ border: "1px solid #c8b88a", backgroundColor: "white", color: "#1A2562" }}
              >
                <option>5 km</option>
                <option>10 km</option>
                <option>25 km</option>
                <option>50 km</option>
                <option>Toute la France</option>
              </select>
            </div>

            {/* Troc */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none self-end pb-1">
              <div
                onClick={() => setFiltretroc(!filtretroc)}
                className="w-10 h-5 rounded-full relative transition-colors"
                style={{ backgroundColor: filtretroc ? "#2D6A4F" : "#c8b88a" }}
              >
                <div
                  className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  style={{ transform: filtretroc ? "translateX(22px)" : "translateX(2px)" }}
                />
              </div>
              <span className="text-sm font-semibold" style={{ color: "#5a4a30" }}>
                🔄 Troc / service en contrepartie
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* ═══ ANNONCES ═══ */}
      <section style={{ backgroundColor: "var(--cream)" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>
              Annonces <span className="text-sm font-normal opacity-50">({annoncesFiltrees.length} résultats)</span>
            </h2>
            <button
              onClick={() => setShowForm(true)}
              className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white" }}
            >
              + Publier une annonce
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {annoncesFiltrees.map((a) => (
              <div key={a.id} className="rounded-xl p-5 flex flex-col gap-3"
                style={{ backgroundColor: "white", border: "1px solid var(--cream-dark)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: a.type === "Demande" ? "#FDE68A" : "#D6F5F3", color: a.type === "Demande" ? "#92400e" : "#1A9E94" }}>
                    {a.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs"
                    style={{ backgroundColor: "var(--cream-dark)", color: "var(--navy)" }}>
                    {a.categorie}
                  </span>
                </div>
                <h3 className="font-bold text-base leading-snug" style={{ color: "var(--navy)" }}>{a.titre}</h3>
                <p className="text-sm opacity-60 leading-relaxed">{a.desc}</p>
                <div className="flex items-center gap-2 text-xs opacity-50">
                  <span>📍 {a.ville}</span>
                  <span>·</span>
                  <span>{a.date}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid var(--cream-dark)" }}>
                  <span className="text-xs opacity-60">👍 Recommandé par {a.recomm} membres</span>
                  <button className="px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                    style={{ backgroundColor: "var(--navy)", color: "white" }}>
                    Contacter
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FORMULAIRE (modale) ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "white" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "var(--navy)" }}>Publier une annonce</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70">×</button>
            </div>

            {[
              { label: "Titre", type: "text", placeholder: "Ex : Besoin d'aide pour..." },
              { label: "Ville", type: "text", placeholder: "Votre ville" },
              { label: "Téléphone (optionnel)", type: "tel", placeholder: "06 xx xx xx xx" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid var(--cream-dark)", color: "var(--navy)" }} />
              </div>
            ))}

            <div className="flex gap-3">
              {(["Type", "Catégorie"] as const).map((lbl) => (
                <div key={lbl} className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-semibold" style={{ color: "var(--navy)" }}>{lbl}</label>
                  <select className="px-3 py-2.5 rounded-lg text-sm"
                    style={{ border: "1.5px solid var(--cream-dark)", color: "var(--navy)" }}>
                    {lbl === "Type"
                      ? [<option key="d">Demande d&apos;aide</option>, <option key="o">Offre d&apos;aide</option>]
                      : categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "var(--navy)" }}>Description</label>
              <textarea rows={4} placeholder="Décrivez votre besoin ou votre proposition..."
                className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid var(--cream-dark)", color: "var(--navy)" }} />
            </div>

            {/* Troc */}
            <label className="flex items-center gap-3 cursor-pointer select-none p-3 rounded-xl"
              style={{ backgroundColor: "#f0ede4", border: "1.5px solid #c8b88a" }}>
              <input type="checkbox" className="w-4 h-4 accent-green-700" />
              <div>
                <span className="text-sm font-semibold" style={{ color: "var(--navy)" }}>🔄 J&apos;accepte un troc ou service en contrepartie</span>
                <p className="text-xs opacity-50 mt-0.5">Ex : légumes, cours, coup de main futur, produit artisanal…</p>
              </div>
            </label>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "var(--navy)" }}>Photos (optionnel)</label>
              <input type="file" multiple accept="image/*"
                className="text-sm" style={{ color: "var(--navy)" }} />
            </div>

            <button className="w-full py-3 rounded-full font-bold text-base mt-2 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white" }}>
              Publier mon annonce
            </button>
          </div>
        </div>
      )}

      {/* ═══ PROFILS MEMBRES ═══ */}
      <section style={{ backgroundColor: "#f0ede4" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6" style={{ color: "var(--navy)" }}>Membres actifs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {membres.map((m) => (
              <div key={m.pseudo} className="rounded-xl p-5 flex flex-col items-center text-center gap-3"
                style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ backgroundColor: "#2D6A4F" }}>
                  {m.initiales}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "var(--navy)" }}>{m.pseudo}</p>
                  <p className="text-xs opacity-50">📍 {m.ville}</p>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {m.competences.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: "var(--cream-dark)", color: "var(--navy)" }}>{c}</span>
                  ))}
                </div>
                <p className="text-xs opacity-50">👍 Recommandé par {m.recomm} membres</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TERRIERS LOCAUX ═══ */}
      <section style={{ backgroundColor: "var(--navy)" }} className="py-12 px-4 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#F5C218" }}>🏡 Terriers Locaux</h2>
          <p className="opacity-60 text-sm mb-8">Rejoignez la communauté de votre territoire.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {terriers.map((t) => (
              <div key={t.nom} className="rounded-xl p-5 flex flex-col gap-3 cursor-pointer transition-colors hover:bg-white/10"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p className="font-bold text-base" style={{ color: "#F5C218" }}>🦔 {t.nom}</p>
                <div className="text-sm opacity-70 flex flex-col gap-1">
                  <span>👥 {t.membres} membres</span>
                  <span>📌 {t.annonces} annonces actives</span>
                  <span>🚀 {t.projets} projets locaux</span>
                  <span>📅 {t.evenements} événements</span>
                </div>
                <button className="mt-auto text-xs font-bold px-4 py-1.5 rounded-full transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#2D6A4F", color: "white" }}>
                  Rejoindre
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RETOUR ═══ */}
      <div className="text-center py-8" style={{ backgroundColor: "var(--cream)" }}>
        <Link href="/" className="text-sm opacity-50 hover:opacity-80 transition-opacity" style={{ color: "var(--navy)" }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </>
  );
}
