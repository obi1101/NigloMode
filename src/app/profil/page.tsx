"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Action = {
  id: number; texte: string; dateDepot: string; lieu: string;
  interesse: boolean;
  enseigne?: string; domaine?: string; contact?: string; tel?: string; notes?: string;
};

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
  "Coup de main en retour", "Troc d'objet", "Partage de savoir-faire",
  "Don libre", "Participation financière", "Hébergement temporaire",
  "Prêt de matériel", "Repas ou moment convivial", "À discuter ensemble",
];

const lucioles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${8 + Math.floor(((i * 37 + 11) % 80))}%`,
  left: `${5 + Math.floor(((i * 53 + 7) % 88))}%`,
  size: 3 + (i % 3),
  opacity: 0.25 + (i % 4) * 0.12,
}));

type Profil = {
  pseudo: string; ville: string; email: string;
  badges: string[]; competences: string[]; contreparties: string[];
  statut?: "particulier" | "professionnel" | "association";
};

const defaultProfil: Profil = {
  pseudo: "", ville: "", email: "", badges: [], competences: [], contreparties: [],
};

export default function ProfilPage() {
  const [profil, setProfil] = useState<Profil>(defaultProfil);
  const [saved, setSaved]             = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [onglet, setOnglet]             = useState<"profil" | "actions">("profil");
  const [actions, setActions]           = useState<Action[]>([]);
  const [actionSent, setActionSent]     = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [fTexte, setFTexte]             = useState("");
  const [fDate, setFDate]               = useState(today);
  const [fLieu, setFLieu]               = useState("");
  const [fInteresse, setFInteresse]     = useState(false);
  const [fEnseigne, setFEnseigne]       = useState("");
  const [fDomaine, setFDomaine]         = useState("");
  const [fContact, setFContact]         = useState("");
  const [fTel, setFTel]                 = useState("");
  const [fNotes, setFNotes]             = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) setProfil(JSON.parse(stored));
    const storedActions = localStorage.getItem("niglomode_actions");
    if (storedActions) setActions(JSON.parse(storedActions));
  }, []);

  const resetForm = () => {
    setFTexte(""); setFDate(today); setFLieu(""); setFInteresse(false);
    setFEnseigne(""); setFDomaine(""); setFContact(""); setFTel(""); setFNotes("");
  };

  const ajouterAction = () => {
    if (!fLieu.trim()) return;
    const a: Action = {
      id: Date.now(), texte: fTexte.trim(),
      dateDepot: fDate || new Date().toLocaleDateString("fr-FR"),
      lieu: fLieu.trim(), interesse: fInteresse,
      ...(fInteresse && {
        enseigne: fEnseigne.trim(), domaine: fDomaine.trim(),
        contact: fContact.trim(), tel: fTel.trim(), notes: fNotes.trim(),
      }),
    };
    const updated = [a, ...actions];
    setActions(updated);
    localStorage.setItem("niglomode_actions", JSON.stringify(updated));
    resetForm();
    setActionSent(true);
    setTimeout(() => setActionSent(false), 2000);
  };

  const supprimerAction = (id: number) => {
    const updated = actions.filter((a) => a.id !== id);
    setActions(updated);
    localStorage.setItem("niglomode_actions", JSON.stringify(updated));
  };

  const save = (updated: Profil) => {
    localStorage.setItem("niglomode_profil", JSON.stringify(updated));
    setProfil(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggle = (field: keyof Profil, val: string) => {
    const arr = profil[field] as string[];
    save({ ...profil, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] });
  };

  const isEmpty = !profil.pseudo && !profil.ville;

  return (
    <div style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", minHeight: "100vh" }} className="relative">
      {/* Lucioles */}
      {lucioles.map((l) => (
        <div key={l.id} className="absolute rounded-full pointer-events-none"
          style={{ top: l.top, left: l.left, width: l.size, height: l.size, backgroundColor: "#D8B56A", opacity: l.opacity, boxShadow: `0 0 ${l.size * 2}px #D8B56A` }} />
      ))}

      <div className="relative z-10 px-4 py-12 max-w-2xl mx-auto flex flex-col gap-6">

        {/* En-tête */}
        <div className="text-center mb-2">
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "rgba(216,181,106,0.6)" }}>NIGLOMODE</p>
          <h1 className="text-2xl font-extrabold" style={{ color: "#F5EFD8" }}>Mon Profil</h1>
        </div>

        {/* Pas de profil */}
        {isEmpty && (
          <div className="rounded-2xl p-8 text-center flex flex-col gap-4"
            style={{ backgroundColor: "rgba(245,239,216,0.07)", border: "1px solid rgba(196,184,152,0.25)" }}>
            <span style={{ fontSize: 52 }}>🦔</span>
            <p className="font-bold text-lg" style={{ color: "#D8B56A" }}>Tu n&apos;as pas encore de profil</p>
            <p className="text-sm" style={{ color: "rgba(245,239,216,0.65)" }}>Crée ton profil en 4 étapes pour rejoindre le Terrier.</p>
            <Link href="/inscription"
              className="mx-auto px-8 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
              Créer mon profil →
            </Link>
          </div>
        )}

        {/* Onglets */}
        {!isEmpty && (
          <div className="flex gap-2 rounded-2xl p-1" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(196,184,152,0.2)" }}>
            {([ ["profil", "🦔 Mon profil"], ["actions", "📸 Actions & Contributions"] ] as const).map(([key, label]) => (
              <button key={key} onClick={() => setOnglet(key)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{ backgroundColor: onglet === key ? "#D8B56A" : "transparent", color: onglet === key ? "#1E3524" : "rgba(245,239,216,0.55)" }}>
                {label}
              </button>
            ))}
          </div>
        )}

        {/* ═══ ONGLET ACTIONS & CONTRIBUTIONS ═══ */}
        {!isEmpty && onglet === "actions" && (
          <>
            {/* Formulaire dépôt */}
            <div className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1E3524" }}>📸 Dépose tes preuves de terrain</h2>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6B4F34" }}>
                  Télécharge ici tes photos de flyers distribués ou des affiches posées en vitrine, à la boulangerie,
                  chez un commerçant, dans une salle d&apos;attente, sur un marché, lors d&apos;une soirée…
                  Chaque geste compte et inspire les autres membres du Terrier !
                </p>
              </div>

              {/* Champs principaux */}
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>📅 Date du dépôt</label>
                    <input type="date" value={fDate} onChange={(e) => setFDate(e.target.value)}
                      className="px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>📍 Lieu du dépôt *</label>
                    <input type="text" value={fLieu} onChange={(e) => setFLieu(e.target.value)}
                      placeholder="Boulangerie du centre, marché…"
                      className="px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>📝 Description (optionnel)</label>
                  <input type="text" value={fTexte} onChange={(e) => setFTexte(e.target.value)}
                    placeholder="Ex : flyer A5 affiché en vitrine, bonne réception…"
                    className="px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
                </div>

                {/* Toggle intérêt commerçant */}
                <button type="button" onClick={() => setFInteresse(!fInteresse)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                  style={{
                    backgroundColor: fInteresse ? "#1E3524" : "#EDE4C4",
                    border: `1.5px solid ${fInteresse ? "#D8B56A" : "#C4B898"}`,
                  }}>
                  <span className="text-xl flex-shrink-0">{fInteresse ? "✅" : "⬜"}</span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: fInteresse ? "#D8B56A" : "#1E3524" }}>
                      Ce commerçant / lieu est intéressé par la communauté
                    </p>
                    <p className="text-xs" style={{ color: fInteresse ? "rgba(245,239,216,0.55)" : "#6B4F34" }}>
                      Renseigne ses coordonnées pour l&apos;ajouter à l&apos;Annuaire
                    </p>
                  </div>
                </button>

                {/* Champs fiche commerçant */}
                {fInteresse && (
                  <div className="flex flex-col gap-2 p-4 rounded-xl" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                    <p className="text-xs font-extrabold mb-1" style={{ color: "#1E3524" }}>🏷️ Fiche du contact intéressé</p>
                    {[
                      { label: "Nom de l'enseigne / du particulier", val: fEnseigne, set: setFEnseigne, placeholder: "Ex : Boulangerie Au Pain Levain" },
                      { label: "Domaine / Activité", val: fDomaine, set: setFDomaine, placeholder: "Ex : Boulangerie, Maraîcher, Artisan…" },
                      { label: "Email ou site web", val: fContact, set: setFContact, placeholder: "contact@exemple.fr" },
                      { label: "Téléphone", val: fTel, set: setFTel, placeholder: "06 XX XX XX XX" },
                    ].map((f) => (
                      <div key={f.label} className="flex flex-col gap-0.5">
                        <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>{f.label}</label>
                        <input type="text" value={f.val} onChange={(e) => f.set(e.target.value)}
                          placeholder={f.placeholder}
                          className="px-3 py-2 rounded-lg text-xs outline-none"
                          style={{ border: "1.5px solid #C4B898", backgroundColor: "#F5EFD8", color: "#1E3524" }} />
                      </div>
                    ))}
                    <div className="flex flex-col gap-0.5">
                      <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>Notes complémentaires (carte de visite, contexte…)</label>
                      <textarea value={fNotes} onChange={(e) => setFNotes(e.target.value)}
                        placeholder="Infos supplémentaires, horaires, contexte de la rencontre…"
                        rows={2} className="px-3 py-2 rounded-lg text-xs outline-none resize-none"
                        style={{ border: "1.5px solid #C4B898", backgroundColor: "#F5EFD8", color: "#1E3524" }} />
                    </div>
                    <p className="text-xs" style={{ color: "#C4B898" }}>
                      Ces informations seront soumises pour ajout dans l&apos;Annuaire du Terrier après validation.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: "#C4B898" }}>* Lieu obligatoire</p>
                <button onClick={ajouterAction} disabled={!fLieu.trim()}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-opacity disabled:opacity-35"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                  {actionSent ? "✓ Enregistré !" : "📸 Enregistrer l'action"}
                </button>
              </div>
            </div>

            {/* Journal des actions */}
            {actions.length === 0 ? (
              <div className="text-center py-8 flex flex-col items-center gap-2" style={{ color: "rgba(245,239,216,0.4)" }}>
                <span style={{ fontSize: 36 }}>🌱</span>
                <p className="text-sm">Aucune action enregistrée pour l&apos;instant.</p>
                <p className="text-xs">Chaque geste compte — même le plus petit !</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {actions.map((a) => (
                  <div key={a.id} className="rounded-2xl px-5 py-4 flex flex-col gap-2"
                    style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
                    <div className="flex items-start gap-3">
                      <span style={{ fontSize: 20 }}>📸</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: "#1E3524" }}>📍 {a.lieu}</p>
                        {a.texte && <p className="text-xs mt-0.5" style={{ color: "#4F6B47" }}>{a.texte}</p>}
                        <p className="text-xs mt-1" style={{ color: "#C4B898" }}>{a.dateDepot}</p>
                      </div>
                      <button onClick={() => supprimerAction(a.id)} className="text-xs flex-shrink-0" style={{ color: "#C4B898" }}>✕</button>
                    </div>
                    {a.interesse && a.enseigne && (
                      <div className="rounded-xl px-4 py-2.5 flex flex-col gap-1" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                        <p className="text-xs font-bold" style={{ color: "#1E3524" }}>🏷️ {a.enseigne} <span className="font-normal" style={{ color: "#4F6B47" }}>— {a.domaine}</span></p>
                        {a.contact && <p className="text-xs" style={{ color: "#6B4F34" }}>✉️ {a.contact}</p>}
                        {a.tel && <p className="text-xs" style={{ color: "#6B4F34" }}>📞 {a.tel}</p>}
                        <p className="text-xs" style={{ color: "#C4B898" }}>En attente de validation pour l&apos;Annuaire</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Link href="/adhesion"
              className="rounded-xl p-4 flex items-center gap-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#1E3524", border: "1px solid rgba(216,181,106,0.3)" }}>
              <span style={{ fontSize: 22 }}>📢</span>
              <div>
                <p className="font-bold text-sm" style={{ color: "#D8B56A" }}>Télécharger les supports</p>
                <p className="text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>Flyers, affiches, cartes de visite à imprimer</p>
              </div>
            </Link>
          </>
        )}

        {/* Profil existant */}
        {!isEmpty && onglet === "profil" && (
          <>
            {/* Avatar + identité */}
            <div className="rounded-2xl p-6 flex items-center gap-5"
              style={{ backgroundColor: "rgba(245,239,216,0.06)", border: "1px solid rgba(216,181,106,0.25)" }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-xl flex-shrink-0"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                {profil.pseudo.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-xl truncate" style={{ color: "#F5EFD8" }}>{profil.pseudo}</p>
                <p className="text-sm mt-0.5" style={{ color: "rgba(245,239,216,0.55)" }}>📍 {profil.ville}</p>
                {profil.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profil.badges.map((b) => (
                      <span key={b} title={badgesAll.find((x) => x.emoji === b)?.label}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: "rgba(216,181,106,0.15)", border: "1px solid rgba(216,181,106,0.35)" }}>
                        {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/inscription"
                className="text-xs px-3 py-1.5 rounded-full border flex-shrink-0 transition-colors hover:bg-white/5"
                style={{ borderColor: "rgba(196,184,152,0.35)", color: "rgba(245,239,216,0.55)" }}>
                Recréer
              </Link>
            </div>

            {saved && (
              <div className="text-xs font-semibold px-4 py-2 rounded-full self-start"
                style={{ backgroundColor: "rgba(79,107,71,0.4)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>
                ✓ Modifications enregistrées
              </div>
            )}

            {/* Infos de base */}
            <section className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base" style={{ color: "#1E3524" }}>Mes informations</h2>
                <button onClick={() => setEditSection(editSection === "infos" ? null : "infos")}
                  className="text-xs px-3 py-1 rounded-full border transition-colors hover:bg-black/5"
                  style={{ borderColor: "#C4B898", color: "#4F6B47" }}>
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
                      <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>{f.label}</label>
                      <input type={f.type} value={profil[f.key] as string}
                        onChange={(e) => save({ ...profil, [f.key]: e.target.value })}
                        className="px-3 py-2 rounded-lg text-sm outline-none"
                        style={{ border: "1.5px solid #C4B898", backgroundColor: "#F5EFD8", color: "#1E3524" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 text-sm" style={{ color: "#4F6B47" }}>
                  <span>👤 {profil.pseudo}</span>
                  <span>📍 {profil.ville}</span>
                  {profil.email && <span>✉️ {profil.email}</span>}
                  {profil.statut === "professionnel" && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full w-fit" style={{ backgroundColor: "rgba(30,53,36,0.1)", color: "#1E3524", border: "1px solid #C4B898" }}>🏷️ Professionnel</span>}
                  {profil.statut === "association" && <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full w-fit" style={{ backgroundColor: "rgba(79,107,71,0.1)", color: "#4F6B47", border: "1px solid #C4B898" }}>🤝 Association</span>}
                </div>
              )}
              {/* Statut */}
              {editSection === "infos" && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>Statut</label>
                  <div className="flex gap-2 flex-wrap">
                    {(["particulier","professionnel","association"] as const).map((s) => (
                      <button key={s} type="button" onClick={() => save({ ...profil, statut: s })}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={{ backgroundColor: profil.statut === s ? "#1E3524" : "#EDE4C4", color: profil.statut === s ? "#D8B56A" : "#1E3524", borderColor: profil.statut === s ? "#D8B56A" : "#C4B898" }}>
                        {s === "particulier" ? "🏡 Particulier" : s === "professionnel" ? "🏷️ Professionnel" : "🤝 Association"}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Badges */}
            <section className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1E3524" }}>Mes badges</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6B4F34" }}>Visibles sur ton profil, tes annonces et dans les résultats.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {badgesAll.map((b) => {
                  const active = profil.badges.includes(b.emoji);
                  return (
                    <button key={b.emoji} type="button" onClick={() => toggle("badges", b.emoji)}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                      style={{
                        backgroundColor: active ? "#1E3524" : "#EDE4C4",
                        border: `1.5px solid ${active ? "#D8B56A" : "#C4B898"}`,
                      }}>
                      <span className="text-xl">{b.emoji}</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: active ? "#D8B56A" : "#1E3524" }}>{b.label}</p>
                        <p className="text-xs leading-tight" style={{ color: active ? "rgba(245,239,216,0.6)" : "#6B4F34" }}>{b.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Compétences */}
            <section className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1E3524" }}>Mes compétences</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6B4F34" }}>Ce que tu sais faire et peux proposer dans tes annonces.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {competencesAll.map((c) => {
                  const active = profil.competences.includes(c);
                  return (
                    <button key={c} type="button" onClick={() => toggle("competences", c)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        backgroundColor: active ? "#4F6B47" : "#EDE4C4",
                        color: active ? "#F5EFD8" : "#1E3524",
                        borderColor: active ? "#4F6B47" : "#C4B898",
                      }}>
                      {c}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Contreparties */}
            <section className="rounded-2xl p-5 flex flex-col gap-4"
              style={{ backgroundColor: "rgba(245,239,216,0.95)", border: "1px solid #C4B898" }}>
              <div>
                <h2 className="font-bold text-base" style={{ color: "#1E3524" }}>Mes contreparties habituelles</h2>
                <p className="text-xs mt-0.5" style={{ color: "#6B4F34" }}>Pré-remplies dans le formulaire d&apos;annonce — ajustables à chaque fois.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {contrepartieOptions.map((opt) => {
                  const active = profil.contreparties.includes(opt);
                  return (
                    <button key={opt} type="button" onClick={() => toggle("contreparties", opt)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        backgroundColor: active ? "#D8B56A" : "#EDE4C4",
                        color: "#1E3524",
                        borderColor: active ? "#D8B56A" : "#C4B898",
                      }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/entraide"
                className="rounded-xl p-4 flex flex-col gap-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", border: "1px solid rgba(216,181,106,0.3)" }}>
                <span style={{ fontSize: 22 }}>🤲</span>
                <p className="font-bold text-sm" style={{ color: "#D8B56A" }}>Publier une annonce</p>
                <p className="text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>Entraide du Terrier</p>
              </Link>
              <Link href="/messagerie"
                className="rounded-xl p-4 flex flex-col gap-1 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", border: "1px solid rgba(216,181,106,0.3)" }}>
                <span style={{ fontSize: 22 }}>💬</span>
                <p className="font-bold text-sm" style={{ color: "#D8B56A" }}>Mes messages</p>
                <p className="text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>Chat du Terrier</p>
              </Link>
            </div>
          </>
        )}

        <div className="text-center mt-2">
          <Link href="/" className="text-xs transition-opacity hover:opacity-70"
            style={{ color: "rgba(245,239,216,0.35)" }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
