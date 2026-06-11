"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const badgesAll = [
  { emoji: "🛠", label: "Je sais faire", desc: "Tu as des compétences pratiques à partager" },
  { emoji: "🎁", label: "Je peux donner", desc: "Tu as des objets à offrir" },
  { emoji: "🔄", label: "Je peux échanger", desc: "Tu proposes des échanges sans argent" },
  { emoji: "🤝", label: "Je peux aider", desc: "Tu es disponible pour donner un coup de main" },
  { emoji: "📚", label: "Je peux transmettre", desc: "Tu aimes partager tes connaissances" },
  { emoji: "🚚", label: "Je peux prêter", desc: "Tu as des outils, du matériel à prêter" },
  { emoji: "🌱", label: "Je peux apprendre", desc: "Tu cherches à acquérir de nouvelles compétences" },
  { emoji: "🏡", label: "Je peux accueillir", desc: "Tu peux héberger, recevoir, accueillir" },
];

const competencesAll = [
  "Jardinage", "Bricolage", "Informatique", "Couture", "Cuisine",
  "Mécanique", "Dessin / Création", "Musique", "Langues", "Formation",
  "Administratif", "Comptabilité", "Construction", "Menuiserie", "Plomberie",
  "Électricité", "Transport", "Garde d'animaux", "Aide aux personnes", "Autre",
];

const contrepartieOptions = [
  "Coup de main en retour", "Troc d'objet", "Partage de savoir-faire", "Don libre",
  "Participation financière", "Hébergement temporaire", "Prêt de matériel",
  "Repas ou moment convivial", "À discuter ensemble",
];

const terriersMock = [
  { id: 1, nom: "Terrier de Limoges Centre",   ville: "limoges",   membres: 42, actif: true,  desc: "Entraide, bricolage, jardinage, échanges alimentaires." },
  { id: 2, nom: "Terrier de Limoges Nord",     ville: "limoges",   membres: 18, actif: true,  desc: "Quartier Beaubreuil et alentours. Transport, administratif." },
  { id: 3, nom: "Terrier de Bordeaux Bastide", ville: "bordeaux",  membres: 67, actif: true,  desc: "Rive droite de Bordeaux. Fort réseau de partage de savoir-faire." },
  { id: 4, nom: "Terrier de Bordeaux Sud",     ville: "bordeaux",  membres: 31, actif: true,  desc: "Talence, Gradignan, Villenave. Jardinage et réemploi." },
  { id: 5, nom: "Terrier de Lyon 3e",          ville: "lyon",      membres: 89, actif: true,  desc: "Guillotière, Part-Dieu. Très actif sur l'échange de compétences." },
  { id: 6, nom: "Terrier de Lyon Ouest",       ville: "lyon",      membres: 54, actif: true,  desc: "Écully, Tassin, Craponne. Projets potagers collectifs." },
  { id: 7, nom: "Terrier de Toulouse Minimes", ville: "toulouse",  membres: 53, actif: true,  desc: "Entraide de proximité, garde d'animaux, cuisine partagée." },
  { id: 8, nom: "Terrier de Nantes Nord",      ville: "nantes",    membres: 29, actif: false, desc: "En cours de création — rejoins les fondateurs !" },
  { id: 9, nom: "Terrier de Thiers",           ville: "thiers",    membres: 12, actif: true,  desc: "Petite communauté active sur les savoir-faire artisanaux." },
];

const STEPS = [
  { id: 1, label: "Le concept" },
  { id: 2, label: "Tes infos" },
  { id: 3, label: "Ton Terrier" },
  { id: 4, label: "Tes talents" },
  { id: 5, label: "Prêt !" },
];

const lucioles = [
  { top: "8%",  left: "5%",  r: 3 }, { top: "22%", left: "90%", r: 2 },
  { top: "50%", left: "3%",  r: 2 }, { top: "68%", left: "94%", r: 3 },
  { top: "14%", left: "72%", r: 2 }, { top: "38%", left: "97%", r: 2 },
  { top: "78%", left: "15%", r: 2 }, { top: "5%",  left: "44%", r: 3 },
];

export default function InscriptionPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [pseudo, setPseudo]           = useState("");
  const [ville, setVille]             = useState("");
  const [email, setEmail]             = useState("");
  const [badges, setBadges]           = useState<string[]>([]);
  const [competences, setCompetences] = useState<string[]>([]);
  const [contreparties, setContreparties] = useState<string[]>([]);

  const [terrierTab, setTerrierTab]         = useState<"rejoindre" | "creer">("rejoindre");
  const [selectedTerrier, setSelectedTerrier] = useState<number | null>(null);
  const [nouveauTerrier, setNouveauTerrier] = useState({ nom: "", zone: "", desc: "" });

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const terriersProches = ville.length >= 2
    ? terriersMock.filter((t) => t.ville.includes(ville.toLowerCase().trim()))
    : [];

  const handleFinish = () => {
    const terrier = selectedTerrier
      ? terriersMock.find((t) => t.id === selectedTerrier)?.nom
      : nouveauTerrier.nom || null;
    const profil = { pseudo, ville, email, badges, competences, contreparties, terrier };
    localStorage.setItem("niglomode_profil", JSON.stringify(profil));
    router.push("/profil");
  };

  return (
    <div
      style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", minHeight: "100vh" }}
      className="relative px-4 py-12"
    >
      {lucioles.map((l, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none"
          style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.55 }} />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* ── Stepper ── */}
        <div className="flex items-center justify-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1">
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    backgroundColor: step >= s.id ? "#D8B56A" : "rgba(255,255,255,0.10)",
                    color: step >= s.id ? "#1E3524" : "rgba(245,239,216,0.35)",
                    border: `2px solid ${step >= s.id ? "#D8B56A" : "rgba(255,255,255,0.18)"}`,
                  }}
                >
                  {step > s.id ? "✓" : s.id}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step >= s.id ? "#D8B56A" : "rgba(245,239,216,0.30)" }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: step > s.id ? "#D8B56A" : "rgba(255,255,255,0.15)" }} />
              )}
            </div>
          ))}
        </div>

        {/* ── Contenu des étapes (carte parchemin) ── */}
        <div className="rounded-3xl p-6 sm:p-8" style={{ backgroundColor: "rgba(245,239,216,0.97)", border: "1px solid #C4B898" }}>

          {/* ─── ÉTAPE 1 : Le concept ─── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="text-center">
                <span style={{ fontSize: 52 }}>🦔</span>
                <h1 className="text-3xl font-extrabold mt-3" style={{ color: "#1E3524" }}>
                  Bienvenue dans NIGLOMODE
                </h1>
                <p className="mt-2 text-base" style={{ color: "#4F6B47" }}>
                  Avant de créer ton profil, voici comment ça fonctionne.
                </p>
              </div>

              <div className="rounded-2xl p-6 flex flex-col gap-5"
                style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", color: "white" }}>
                <p className="text-lg font-bold" style={{ color: "#D8B56A" }}>
                  Ce n&apos;est pas un réseau social ordinaire.
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,216,0.80)" }}>
                  NIGLOMODE est une plateforme d&apos;entraide locale. Ici, les compétences valent autant que l&apos;argent.
                  Tu n&apos;achètes pas — tu échanges, tu partages, tu transmets.
                </p>
                <div className="flex flex-col gap-3 mt-2">
                  {[
                    { icon: "🏡", titre: "Les Terriers Locaux", texte: "Tu rejoins d'abord la communauté de ton territoire — ton quartier, ta ville, ta vallée." },
                    { icon: "🔄", titre: "L'échange de compétences", texte: "Tu proposes ce que tu sais faire. En retour, tu reçois ce dont tu as besoin." },
                    { icon: "👤", titre: "Ton profil = ta carte d'identité", texte: "Tes badges et compétences sont enregistrés une fois. À chaque annonce, ils se pré-remplissent automatiquement." },
                  ].map((item) => (
                    <div key={item.titre} className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#D8B56A" }}>{item.titre}</p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(245,239,216,0.70)" }}>{item.texte}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-5 flex flex-col gap-3"
                style={{ backgroundColor: "rgba(30,53,36,0.07)", border: "1px solid #C4B898" }}>
                <p className="font-bold text-sm" style={{ color: "#1E3524" }}>Les valeurs de NIGLOMODE</p>
                <div className="flex flex-wrap gap-2">
                  {["Entraide", "Transmission", "Réemploi", "Autonomie", "Solidarité locale", "Écologie pratique", "Circuits courts", "Bienveillance"].map((v) => (
                    <span key={v} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                      {v}
                    </span>
                  ))}
                </div>
                <p className="text-xs italic mt-1" style={{ color: "#4F6B47" }}>
                  &ldquo;Moins de bruit. Plus de solutions.&rdquo;
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3.5 rounded-full font-bold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
              >
                Je comprends — créer mon profil →
              </button>
              <p className="text-center text-xs" style={{ color: "#4F6B47" }}>
                Déjà membre ?{" "}
                <Link href="/connexion" className="underline font-semibold" style={{ color: "#1E3524" }}>Connexion</Link>
              </p>
            </div>
          )}

          {/* ─── ÉTAPE 2 : Infos de base ─── */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-extrabold" style={{ color: "#1E3524" }}>Tes informations</h2>
                <p className="text-sm mt-1" style={{ color: "#4F6B47" }}>
                  Ces infos apparaissent sur ton profil et tes annonces.
                </p>
              </div>

              <div className="rounded-2xl p-5 flex flex-col gap-4"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                {[
                  { label: "Pseudo *", value: pseudo, set: setPseudo, type: "text", placeholder: "Comment tu t'appelles dans le Terrier ?" },
                  { label: "Ville *", value: ville, set: setVille, type: "text", placeholder: "Ta ville ou ton village" },
                  { label: "Email *", value: email, set: setEmail, type: "email", placeholder: "ton@email.fr" },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.placeholder}
                      className="px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ backgroundColor: "#F5EFD8", border: "1.5px solid #C4B898", color: "#1E3524" }}
                    />
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-4 flex gap-3"
                style={{ backgroundColor: "rgba(216,181,106,0.12)", border: "1px solid rgba(216,181,106,0.4)" }}>
                <span className="text-xl">💡</span>
                <p className="text-xs leading-relaxed" style={{ color: "#1E3524" }}>
                  À l&apos;étape suivante, tu verras les Terriers disponibles près de chez toi — ou tu pourras en créer un nouveau.
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex-1 py-3 rounded-full font-semibold text-sm transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!pseudo || !ville || !email}
                  className="flex-[2] py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 3 : Ton Terrier ─── */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-extrabold" style={{ color: "#1E3524" }}>Ton Terrier</h2>
                <p className="text-sm mt-1" style={{ color: "#4F6B47" }}>
                  Le Terrier est ta communauté de proximité. C&apos;est là que tout commence.
                </p>
              </div>

              <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid #C4B898" }}>
                {[
                  { id: "rejoindre" as const, label: "🏡 Rejoindre un Terrier" },
                  { id: "creer" as const,     label: "🌱 Créer mon Terrier" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTerrierTab(t.id); setSelectedTerrier(null); }}
                    className="flex-1 py-3 px-4 text-sm font-semibold transition-colors text-center"
                    style={{
                      backgroundColor: terrierTab === t.id ? "#1E3524" : "#EDE4C4",
                      color: terrierTab === t.id ? "#D8B56A" : "#1E3524",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {terrierTab === "rejoindre" && (
                <div className="flex flex-col gap-4">
                  {terriersProches.length > 0 ? (
                    <>
                      <p className="text-sm" style={{ color: "#4F6B47" }}>
                        {terriersProches.length} Terrier{terriersProches.length > 1 ? "s" : ""} trouvé{terriersProches.length > 1 ? "s" : ""} près de <strong>{ville}</strong>
                      </p>
                      <div className="flex flex-col gap-3">
                        {terriersProches.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setSelectedTerrier(selectedTerrier === t.id ? null : t.id)}
                            className="rounded-xl p-4 text-left flex flex-col gap-2 transition-all"
                            style={{
                              backgroundColor: selectedTerrier === t.id ? "#1E3524" : "#EDE4C4",
                              color: selectedTerrier === t.id ? "white" : "#1E3524",
                              border: `2px solid ${selectedTerrier === t.id ? "#D8B56A" : "#C4B898"}`,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-sm">🦔 {t.nom}</p>
                              <div className="flex items-center gap-2">
                                {!t.actif && (
                                  <span className="text-xs px-2 py-0.5 rounded-full"
                                    style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#6B4F34", border: "1px solid #D8B56A" }}>
                                    En création
                                  </span>
                                )}
                                <span className="text-xs opacity-60">👥 {t.membres} membres</span>
                              </div>
                            </div>
                            <p className="text-xs opacity-70 leading-relaxed">{t.desc}</p>
                            {selectedTerrier === t.id && (
                              <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold" style={{ color: "#D8B56A" }}>
                                ✓ Sélectionné
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : ville.length >= 2 ? (
                    <div className="rounded-xl p-5 text-center flex flex-col gap-3"
                      style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                      <span style={{ fontSize: 36 }}>🔍</span>
                      <p className="font-semibold text-sm" style={{ color: "#1E3524" }}>
                        Aucun Terrier trouvé à <strong>{ville}</strong>
                      </p>
                      <p className="text-xs" style={{ color: "#4F6B47" }}>
                        Tu peux en créer un et devenir le premier membre fondateur.
                      </p>
                      <button
                        onClick={() => setTerrierTab("creer")}
                        className="mx-auto px-5 py-2 rounded-full text-xs font-bold transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
                      >
                        Créer le Terrier de {ville} →
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl p-5 text-center text-sm"
                      style={{ backgroundColor: "#EDE4C4", color: "#4F6B47", border: "1px solid #C4B898" }}>
                      Entre ta ville à l&apos;étape précédente pour voir les Terriers disponibles.
                    </div>
                  )}
                  <p className="text-xs text-center" style={{ color: "#C4B898" }}>
                    Tu peux aussi passer cette étape et rejoindre un Terrier plus tard.
                  </p>
                </div>
              )}

              {terrierTab === "creer" && (
                <div className="flex flex-col gap-4">
                  <div className="rounded-2xl p-5 flex flex-col gap-2"
                    style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)", color: "white" }}>
                    <p className="font-bold text-sm" style={{ color: "#D8B56A" }}>🌱 Tu vas fonder quelque chose.</p>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(245,239,216,0.75)" }}>
                      Créer un Terrier, c&apos;est poser les bases d&apos;une communauté locale.
                      Tu en seras le premier membre fondateur.
                    </p>
                  </div>

                  <div className="rounded-2xl p-5 flex flex-col gap-4"
                    style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                    {[
                      { label: "Nom du Terrier *", key: "nom" as const, placeholder: `Ex : Terrier de ${ville || "ma ville"}`, type: "text" },
                      { label: "Zone couverte *",  key: "zone" as const, placeholder: "Ex : Quartier Saint-Martial, centre-ville de…", type: "text" },
                      { label: "Description (optionnel)", key: "desc" as const, placeholder: "Quelques mots sur l'ambiance, les projets envisagés…", type: "textarea" },
                    ].map((f) => (
                      <div key={f.key} className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                        {f.type === "textarea" ? (
                          <textarea
                            rows={2}
                            value={nouveauTerrier[f.key]}
                            onChange={(e) => setNouveauTerrier({ ...nouveauTerrier, [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            className="px-4 py-3 rounded-xl text-sm outline-none resize-none"
                            style={{ backgroundColor: "#F5EFD8", border: "1.5px solid #C4B898", color: "#1E3524" }}
                          />
                        ) : (
                          <input
                            type="text"
                            value={nouveauTerrier[f.key]}
                            onChange={(e) => setNouveauTerrier({ ...nouveauTerrier, [f.key]: e.target.value })}
                            placeholder={f.placeholder}
                            className="px-4 py-3 rounded-xl text-sm outline-none"
                            style={{ backgroundColor: "#F5EFD8", border: "1.5px solid #C4B898", color: "#1E3524" }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl p-4 flex gap-3"
                    style={{ backgroundColor: "rgba(30,53,36,0.07)", border: "1px solid #C4B898" }}>
                    <span>🦔</span>
                    <p className="text-xs leading-relaxed" style={{ color: "#4F6B47" }}>
                      En tant que fondateur, tu pourras inviter d&apos;autres membres, modérer les annonces et organiser les projets locaux de ton Terrier.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(2)}
                  className="flex-1 py-3 rounded-full font-semibold text-sm transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-[2] py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
                >
                  {selectedTerrier || nouveauTerrier.nom ? "Continuer →" : "Passer cette étape →"}
                </button>
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 4 : Badges & Talents ─── */}
          {step === 4 && (
            <div className="flex flex-col gap-7">
              <div>
                <h2 className="text-2xl font-extrabold" style={{ color: "#1E3524" }}>Tes badges & talents</h2>
                <p className="text-sm mt-1" style={{ color: "#4F6B47" }}>
                  Ces choix alimentent ton profil et se pré-remplissent à chaque annonce. Modifiables à tout moment.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>
                  Tes badges — ce que tu représentes dans le Terrier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {badgesAll.map((b) => (
                    <button
                      key={b.emoji}
                      type="button"
                      onClick={() => toggle(badges, b.emoji, setBadges)}
                      className="flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                      style={{
                        backgroundColor: badges.includes(b.emoji) ? "#1E3524" : "#EDE4C4",
                        color: badges.includes(b.emoji) ? "white" : "#1E3524",
                        border: `1.5px solid ${badges.includes(b.emoji) ? "#D8B56A" : "#C4B898"}`,
                      }}
                    >
                      <span className="text-2xl">{b.emoji}</span>
                      <div>
                        <p className="text-xs font-bold">{b.label}</p>
                        <p className="text-xs mt-0.5 leading-tight opacity-60">{b.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>
                  Tes compétences — ce que tu sais faire
                </label>
                <div className="flex flex-wrap gap-2">
                  {competencesAll.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggle(competences, c, setCompetences)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        backgroundColor: competences.includes(c) ? "#4F6B47" : "#EDE4C4",
                        color: competences.includes(c) ? "white" : "#1E3524",
                        borderColor: competences.includes(c) ? "#4F6B47" : "#C4B898",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>
                    Tes contreparties habituelles
                  </label>
                  <p className="text-xs mt-0.5" style={{ color: "#4F6B47" }}>
                    Ce que tu proposes généralement en échange d&apos;une aide. Ajustable annonce par annonce.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contrepartieOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggle(contreparties, opt, setContreparties)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        backgroundColor: contreparties.includes(opt) ? "#D8B56A" : "#EDE4C4",
                        color: contreparties.includes(opt) ? "#1E3524" : "#1E3524",
                        borderColor: contreparties.includes(opt) ? "#D8B56A" : "#C4B898",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-full font-semibold text-sm transition-colors hover:opacity-80"
                  style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-[2] py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
                >
                  Valider mon profil →
                </button>
              </div>
            </div>
          )}

          {/* ─── ÉTAPE 5 : Confirmation ─── */}
          {step === 5 && (
            <div className="flex flex-col items-center gap-6 text-center">
              <span style={{ fontSize: 64 }}>🦔</span>
              <div>
                <h2 className="text-3xl font-extrabold" style={{ color: "#1E3524" }}>
                  Bienvenue, {pseudo} !
                </h2>
                <p className="mt-2 text-base" style={{ color: "#4F6B47" }}>
                  Ton profil est prêt.{" "}
                  {selectedTerrier
                    ? `Tu rejoins le ${terriersMock.find((t) => t.id === selectedTerrier)?.nom}.`
                    : nouveauTerrier.nom
                    ? `Tu fondes le ${nouveauTerrier.nom}.`
                    : `Tu peux rejoindre un Terrier depuis la carte.`}
                </p>
              </div>

              <div className="w-full rounded-2xl p-6 flex flex-col gap-4 text-left"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <p className="font-bold text-sm" style={{ color: "#1E3524" }}>Récapitulatif de ton profil</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex gap-2" style={{ color: "#4F6B47" }}>
                    <span>📍</span> {ville}
                  </div>
                  {selectedTerrier && (
                    <div className="flex gap-2">
                      <span>🦔</span>
                      <span className="font-semibold" style={{ color: "#1E3524" }}>
                        {terriersMock.find((t) => t.id === selectedTerrier)?.nom}
                      </span>
                    </div>
                  )}
                  {!selectedTerrier && nouveauTerrier.nom && (
                    <div className="flex gap-2">
                      <span>🌱</span>
                      <span className="font-semibold" style={{ color: "#4F6B47" }}>
                        Fondateur · {nouveauTerrier.nom}
                      </span>
                    </div>
                  )}
                  {badges.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1">
                      {badges.map((b) => <span key={b} className="text-xl">{b}</span>)}
                    </div>
                  )}
                  {competences.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {competences.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-xs"
                          style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#4F6B47", border: "1px solid #C4B898" }}>{c}</span>
                      ))}
                    </div>
                  )}
                  {contreparties.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {contreparties.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-xs"
                          style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#6B4F34", border: "1px solid #D8B56A" }}>{c}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-xs mt-1" style={{ color: "#C4B898" }}>
                  Ces informations se pré-rempliront automatiquement dans tes annonces.
                </p>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-full font-bold text-base transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}
              >
                Accéder à mon profil →
              </button>
            </div>
          )}

        </div>{/* fin carte parchemin */}
      </div>
    </div>
  );
}
