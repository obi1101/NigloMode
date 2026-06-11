"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const badgesAll = [
  { emoji: "🛠", label: "Je sais faire", desc: "Compétences pratiques à partager" },
  { emoji: "🎁", label: "Je peux donner", desc: "Objets à offrir" },
  { emoji: "🔄", label: "Je peux échanger", desc: "Échanges sans argent" },
  { emoji: "🤝", label: "Je peux aider", desc: "Coup de main disponible" },
  { emoji: "📚", label: "Je peux transmettre", desc: "Partage de connaissances" },
  { emoji: "🚚", label: "Je peux prêter", desc: "Outils, matériel à prêter" },
  { emoji: "🌱", label: "Je peux apprendre", desc: "En quête de nouvelles compétences" },
  { emoji: "🏡", label: "Je peux accueillir", desc: "Héberger, recevoir, accueillir" },
];

const competencesAll = [
  "Jardinage", "Bricolage", "Informatique", "Couture", "Cuisine",
  "Mécanique", "Dessin / Création", "Musique", "Langues", "Formation",
  "Administratif", "Comptabilité", "Construction", "Menuiserie", "Plomberie",
  "Électricité", "Transport", "Garde d'animaux", "Aide aux personnes", "Autre",
];

const contrepartieOptions = [
  "Coup de main en retour",
  "Troc d'objet",
  "Partage de savoir-faire",
  "Don libre",
  "Participation financière",
  "Hébergement temporaire",
  "Prêt de matériel",
  "Repas ou moment convivial",
  "À discuter ensemble",
];

type Profil = {
  pseudo: string;
  ville: string;
  email: string;
  badges: string[];
  competences: string[];
  contreparties: string[];
};

const defaultProfil: Profil = {
  pseudo: "", ville: "", email: "",
  badges: [], competences: [], contreparties: [],
};

export default function ProfilPage() {
  const [profil, setProfil] = useState<Profil>(defaultProfil);
  const [saved, setSaved] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) setProfil(JSON.parse(stored));
  }, []);

  const save = (updated: Profil) => {
    localStorage.setItem("niglomode_profil", JSON.stringify(updated));
    setProfil(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (field: keyof Profil, val: string) => {
    const arr = profil[field] as string[];
    const updated = { ...profil, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    save(updated);
  };

  const isEmpty = !profil.pseudo && !profil.ville;

  return (
    <div style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }} className="px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">

        {isEmpty && (
          <div className="rounded-2xl p-6 text-center flex flex-col gap-4" style={{ backgroundColor: "#1A2562", color: "white" }}>
            <span style={{ fontSize: 48 }}>🦔</span>
            <p className="font-bold text-lg" style={{ color: "#F5C218" }}>Tu n&apos;as pas encore de profil</p>
            <p className="text-sm opacity-70">Crée ton profil en 4 étapes pour rejoindre le Terrier.</p>
            <Link href="/inscription"
              className="mx-auto px-8 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#2D6A4F", color: "white" }}>
              Créer mon profil →
            </Link>
          </div>
        )}

        {!isEmpty && (
          <>
            {/* En-tête profil */}
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white"
                  style={{ backgroundColor: "#2D6A4F" }}>
                  {profil.pseudo.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="font-extrabold text-xl" style={{ color: "#1A2562" }}>{profil.pseudo}</p>
                  <p className="text-sm opacity-50" style={{ color: "#1A2562" }}>📍 {profil.ville}</p>
                  {profil.badges.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {profil.badges.map((b) => (
                        <span key={b} title={badgesAll.find((x) => x.emoji === b)?.label}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-base"
                          style={{ backgroundColor: "#f0ede4", border: "1px solid #c8b88a" }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <Link href="/inscription"
                  className="ml-auto text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-black/5"
                  style={{ borderColor: "#c8b88a", color: "#1A2562" }}>
                  Recréer le profil
                </Link>
              </div>

              {saved && (
                <div className="text-xs font-semibold px-3 py-1.5 rounded-full self-start"
                  style={{ backgroundColor: "#EEF9F5", color: "#2D6A4F" }}>
                  ✓ Modifications enregistrées
                </div>
              )}
            </div>

            {/* Infos de base */}
            <section className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base" style={{ color: "#1A2562" }}>Mes informations</h2>
                <button onClick={() => setEditSection(editSection === "infos" ? null : "infos")}
                  className="text-xs px-3 py-1 rounded-full border transition-colors hover:bg-black/5"
                  style={{ borderColor: "#c8b88a", color: "#1A2562" }}>
                  {editSection === "infos" ? "Fermer" : "Modifier"}
                </button>
              </div>
              {editSection === "infos" ? (
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Pseudo", key: "pseudo" as keyof Profil, type: "text" },
                    { label: "Ville", key: "ville" as keyof Profil, type: "text" },
                    { label: "Email", key: "email" as keyof Profil, type: "email" },
                  ].map((f) => (
                    <div key={f.key} className="flex flex-col gap-1">
                      <label className="text-xs font-semibold" style={{ color: "#1A2562" }}>{f.label}</label>
                      <input
                        type={f.type}
                        value={profil[f.key] as string}
                        onChange={(e) => save({ ...profil, [f.key]: e.target.value })}
                        className="px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ border: "1.5px solid #e0d8c8", color: "#1A2562" }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1 text-sm opacity-70" style={{ color: "#1A2562" }}>
                  <span>👤 {profil.pseudo}</span>
                  <span>📍 {profil.ville}</span>
                  {profil.email && <span>✉️ {profil.email}</span>}
                </div>
              )}
            </section>

            {/* Badges */}
            <section className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1A2562" }}>Mes badges</h2>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#1A2562" }}>
                  Visibles sur ton profil, tes annonces et dans les résultats de recherche.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {badgesAll.map((b) => (
                  <button
                    key={b.emoji}
                    type="button"
                    onClick={() => toggle("badges", b.emoji)}
                    className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: profil.badges.includes(b.emoji) ? "#1A2562" : "#f8f5ef",
                      color: profil.badges.includes(b.emoji) ? "white" : "#1A2562",
                      border: `1.5px solid ${profil.badges.includes(b.emoji) ? "#1A2562" : "#e0d8c8"}`,
                    }}
                  >
                    <span className="text-2xl">{b.emoji}</span>
                    <div>
                      <p className="text-xs font-bold">{b.label}</p>
                      <p className="text-xs opacity-60 leading-tight">{b.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Compétences */}
            <section className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1A2562" }}>Mes compétences</h2>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#1A2562" }}>
                  Ce que tu sais faire et peux proposer dans tes annonces.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {competencesAll.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggle("competences", c)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={{
                      backgroundColor: profil.competences.includes(c) ? "#2D6A4F" : "#f8f5ef",
                      color: profil.competences.includes(c) ? "white" : "#1A2562",
                      borderColor: profil.competences.includes(c) ? "#2D6A4F" : "#e0d8c8",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </section>

            {/* Contreparties par défaut */}
            <section className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #e0d8c8" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1A2562" }}>Mes contreparties habituelles</h2>
                <p className="text-xs opacity-50 mt-0.5" style={{ color: "#1A2562" }}>
                  Pré-remplies dans le formulaire d&apos;annonce — ajustables à chaque fois.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {contrepartieOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => toggle("contreparties", opt)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={{
                      backgroundColor: profil.contreparties.includes(opt) ? "#F5C218" : "#f8f5ef",
                      color: "#1A2562",
                      borderColor: profil.contreparties.includes(opt) ? "#F5C218" : "#e0d8c8",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </section>

            {/* Lien vers Entraide */}
            <div className="rounded-xl p-4 flex items-center justify-between" style={{ backgroundColor: "#EEF9F5", border: "1px solid #c8e6d8" }}>
              <div>
                <p className="font-semibold text-sm" style={{ color: "#2D6A4F" }}>Prêt à publier une annonce ?</p>
                <p className="text-xs opacity-70 mt-0.5" style={{ color: "#1A2562" }}>
                  Tes badges et contreparties se pré-remplissent automatiquement.
                </p>
              </div>
              <Link href="/entraide"
                className="px-5 py-2 rounded-full font-bold text-xs transition-opacity hover:opacity-90 flex-shrink-0"
                style={{ backgroundColor: "#2D6A4F", color: "white" }}>
                Aller sur Entraide →
              </Link>
            </div>
          </>
        )}

        <div className="text-center">
          <Link href="/" className="text-xs opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#1A2562" }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
