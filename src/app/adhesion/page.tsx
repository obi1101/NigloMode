"use client";
import { useState } from "react";
import Link from "next/link";

const lucioles = Array.from({ length: 10 }, (_, i) => ({
  id: i, top: `${8 + (i * 41) % 78}%`, left: `${4 + (i * 67) % 90}%`,
  size: 2 + (i % 3), opacity: 0.18 + (i % 4) * 0.09,
}));

const supports = [
  { icon: "📄", label: "Flyers à imprimer",    desc: "Format A5, recto/verso, prêts à imprimer." },
  { icon: "🖼️", label: "Affiches",             desc: "A4 et A3, pour vitrines et tableaux d'affichage." },
  { icon: "💳", label: "Cartes de visite",      desc: "Format standard, à distribuer sur le terrain." },
  { icon: "📊", label: "Présentations PDF",     desc: "Slides de présentation du projet." },
  { icon: "🎪", label: "Supports événements",   desc: "Roll-ups, kakémonos, banderoles." },
  { icon: "🗺️", label: "Missions du Terrier",  desc: "Guide pratique des actions locales possibles." },
];

type SuggestionMsg = { id: number; texte: string; date: string };

export default function AdhesionPage() {
  const [suggMsg, setSuggMsg]         = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionMsg[]>([]);
  const [suggSent, setSuggSent]       = useState(false);

  const envoyerSugg = () => {
    if (!suggMsg.trim()) return;
    const msg: SuggestionMsg = { id: Date.now(), texte: suggMsg.trim(), date: new Date().toLocaleDateString("fr-FR") };
    setSuggestions((prev) => [msg, ...prev]);
    setSuggMsg("");
    setSuggSent(true);
    setTimeout(() => setSuggSent(false), 2500);
  };

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden px-4 pt-16 pb-24 text-center">
        {lucioles.map((l) => (
          <div key={l.id} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.size, height: l.size, backgroundColor: "#D8B56A", opacity: l.opacity, boxShadow: `0 0 ${l.size * 3}px #D8B56A` }} />
        ))}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <span style={{ fontSize: 44 }}>🌱</span>
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
            Choisis ton niveau d&apos;implication<br /><span style={{ color: "#D8B56A" }}>dans le Terrier</span>
          </h1>
          <p style={{ color: "rgba(245,239,216,0.72)", maxWidth: 520, lineHeight: 1.75, fontSize: "0.97rem" }}>
            Le Terrier grandit grâce à celles et ceux qui le font vivre.<br />
            Que vous soyez simple curieux, contributeur actif ou référent local,
            chaque participation compte et aide NigloMode à se développer.
          </p>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-2.5 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.35)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span>🦔</span>
          <p className="text-xs italic" style={{ color: "#F5EFD8" }}>&ldquo;Un Terrier vivant, c&apos;est d&apos;abord des habitants qui s&apos;y impliquent.&rdquo;</p>
        </div>
      </section>

      {/* ═══ TROIS NIVEAUX ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Niglo Curieux */}
          <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
            <div className="text-center">
              <p style={{ fontSize: 36 }}>🌱</p>
              <h2 className="font-extrabold text-lg mt-1" style={{ color: "#1E3524" }}>Niglo Curieux</h2>
              <p className="font-black text-2xl mt-0.5" style={{ color: "#4F6B47" }}>Gratuit</p>
              <p className="text-xs mt-1" style={{ color: "#6B4F34" }}>Découvrir le Terrier et explorer les ressources partagées.</p>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs flex-1">
              {([
                [true,  "Consulter les fiches publiques"],
                [true,  "Lire les retours d'expérience"],
                [true,  "Explorer les initiatives locales"],
                [true,  "Découvrir les ressources du territoire"],
                [true,  "Consulter les événements publics"],
                [true,  "Télécharger les supports mis à disposition"],
                [false, "Publier du contenu"],
                [false, "Participer aux échanges"],
                [false, "Contacter les membres"],
                [false, "Ajouter des ressources ou contacts"],
              ] as [boolean, string][]).map(([ok, txt], i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: ok ? "#1E3524" : "#C4B898" }}>
                  <span className="flex-shrink-0 mt-0.5">{ok ? "✅" : "❌"}</span>
                  <span>{txt}</span>
                </li>
              ))}
            </ul>
            <Link href="/inscription"
              className="mt-auto text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "2px solid #C4B898" }}>
              Découvrir le Terrier
            </Link>
          </div>

          {/* Niglo Actif — mis en avant */}
          <div className="rounded-2xl p-6 flex flex-col gap-4 relative shadow-xl" style={{ backgroundColor: "#1E3524", border: "2px solid #D8B56A" }}>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-extrabold"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>✦ Recommandé</div>
            <div className="text-center">
              <p style={{ fontSize: 36 }}>🦔</p>
              <h2 className="font-extrabold text-lg mt-1" style={{ color: "#F5EFD8" }}>Niglo Actif</h2>
              <p className="font-black text-2xl mt-0.5" style={{ color: "#D8B56A" }}>3 € / mois</p>
              <p className="text-xs mt-1" style={{ color: "rgba(245,239,216,0.6)" }}>Contribuer à enrichir le Terrier et faire grandir le réseau.</p>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs flex-1">
              {[
                "Tout Niglo Curieux",
                "Publier des fiches et retours d'expérience",
                "Poser des questions et répondre",
                "Partager astuces, tutoriels et savoir-faire",
                "Ajouter des producteurs et artisans locaux",
                "Référencer des associations et initiatives",
                "Signaler des ressources utiles du territoire",
                "Proposer des événements locaux",
                "Participer aux échanges et à l'entraide",
                "Enrichir la base de données NigloMode",
                "Badge « Niglo Actif »",
              ].map((txt, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: "rgba(245,239,216,0.85)" }}>
                  <span className="flex-shrink-0 mt-0.5">✅</span><span>{txt}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(216,181,106,0.12)", color: "rgba(216,181,106,0.8)", border: "1px solid rgba(216,181,106,0.25)" }}>
              📌 Les nouvelles ressources passent par validation avant publication.
            </p>
            <Link href="/inscription"
              className="text-center py-3 rounded-xl font-extrabold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
              Rejoindre le Terrier
            </Link>
          </div>

          {/* Niglo Référent */}
          <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
            <div className="text-center">
              <p style={{ fontSize: 36 }}>🏡</p>
              <h2 className="font-extrabold text-lg mt-1" style={{ color: "#1E3524" }}>Niglo Référent</h2>
              <p className="font-black text-2xl mt-0.5" style={{ color: "#6B4F34" }}>5 € / mois</p>
              <p className="text-xs mt-1" style={{ color: "#6B4F34" }}>Animer, modérer et faire vivre un Terrier local.</p>
            </div>
            <ul className="flex flex-col gap-1.5 text-xs flex-1">
              {[
                "Tout Niglo Actif",
                "Créer et gérer un Terrier local",
                "Organiser des événements",
                "Lancer des projets collectifs",
                "Devenir modérateur volontaire",
                "Valider les ressources proposées",
                "Vérifier producteurs et artisans référencés",
                "Mettre en avant les initiatives locales",
                "Participer à l'amélioration du réseau",
                "Badge « Niglo Référent »",
                "Accès aux outils de modération",
                "Accès prioritaire aux nouvelles fonctionnalités",
              ].map((txt, i) => (
                <li key={i} className="flex items-start gap-2" style={{ color: "#1E3524" }}>
                  <span className="flex-shrink-0 mt-0.5">✅</span><span>{txt}</span>
                </li>
              ))}
            </ul>
            <Link href="/inscription"
              className="mt-auto text-center py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              Devenir Référent
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHIE ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center flex flex-col gap-4">
          <span style={{ fontSize: 40 }}>🦔</span>
          <h2 className="font-extrabold text-xl" style={{ color: "#1E3524" }}>Le Terrier appartient à ceux qui le font vivre</h2>
          <p className="leading-relaxed text-sm" style={{ color: "#4F6B47" }}>
            Chacun peut contribuer à sa manière : partager un savoir-faire, faire découvrir la confiture de sa grand-mère,
            le miel du voisin, un artisan passionné, un maraîcher local, une bonne adresse oubliée ou simplement donner
            un coup de main à quelqu&apos;un près de chez lui.
          </p>
          <p className="leading-relaxed text-sm" style={{ color: "#4F6B47" }}>
            Plus nous sommes nombreux à partager ce qui existe déjà autour de nous, plus le Terrier devient utile à tous.
          </p>
        </div>
      </section>

      {/* ═══ FAIRE CONNAÎTRE ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span style={{ fontSize: 36 }}>📢</span>
            <h2 className="font-extrabold text-xl mt-2" style={{ color: "#1E3524" }}>Faire connaître le Terrier</h2>
            <p className="text-sm mt-2 max-w-xl mx-auto leading-relaxed" style={{ color: "#4F6B47" }}>
              Le bouche-à-oreille reste la meilleure façon de faire grandir NigloMode.
              Une affiche chez un commerçant, un flyer dans une association, une discussion avec un voisin
              ou une présentation lors d&apos;un événement local peuvent faire découvrir le Terrier à de nouvelles personnes.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {supports.map((s) => (
              <div key={s.label} className="rounded-2xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <p className="font-bold text-sm" style={{ color: "#1E3524" }}>{s.label}</p>
                <p className="text-xs flex-1" style={{ color: "#6B4F34" }}>{s.desc}</p>
                <button className="mt-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Télécharger</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUPPORTS SUPPLÉMENTAIRES ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <span style={{ fontSize: 32 }}>💬</span>
            <h2 className="font-extrabold text-xl mt-2" style={{ color: "#1E3524" }}>Besoin de supports supplémentaires ?</h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "#4F6B47" }}>
              Pour quelques exemplaires, téléchargez et imprimez les documents mis à disposition.
              Pour des besoins plus importants — événements, associations, collectivités, marchés, salons —
              un contact direct avec le fondateur est possible.
            </p>
            <Link href="/contact"
              className="inline-block mt-4 px-6 py-2.5 rounded-xl font-bold text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              Contacter le fondateur →
            </Link>
          </div>
          <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
            <p className="font-bold text-sm" style={{ color: "#1E3524" }}>
              Pose une question, propose une idée de communication, suggère un nouveau format :
            </p>
            <textarea value={suggMsg} onChange={(e) => setSuggMsg(e.target.value)}
              placeholder="Ex : J'organise un marché en juillet, auriez-vous des flyers à envoyer ?"
              rows={3} className="px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
              style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
            <button onClick={envoyerSugg} disabled={!suggMsg.trim()}
              className="self-end px-5 py-2 rounded-xl text-sm font-bold transition-opacity disabled:opacity-35 hover:opacity-85"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              {suggSent ? "✓ Envoyé !" : "Envoyer"}
            </button>
            {suggestions.length > 0 && (
              <div className="flex flex-col gap-2 mt-1">
                {suggestions.map((s) => (
                  <div key={s.id} className="rounded-xl px-4 py-2.5" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                    <p className="text-sm" style={{ color: "#1E3524" }}>{s.texte}</p>
                    <p className="text-xs mt-1" style={{ color: "#C4B898" }}>{s.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ CONTRIBUTIONS ═══ */}
      <section style={{ backgroundColor: "#F5EFD8", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-4">
          <span style={{ fontSize: 36 }}>🌱</span>
          <h2 className="font-extrabold text-xl" style={{ color: "#1E3524" }}>Contributions du Terrier</h2>
          <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>
            Les membres qui participent activement à faire connaître NigloMode pourront bénéficier à l&apos;avenir
            de remerciements, badges, avantages ou contreparties.
          </p>
          <p className="text-sm" style={{ color: "#4F6B47" }}>
            Le système est actuellement en cours de réflexion et évoluera avec la communauté.
          </p>
          <div className="mt-2 px-5 py-3 rounded-2xl text-sm" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#6B4F34" }}>
            🦔 Tu peux dès maintenant partager tes actions dans l&apos;onglet{" "}
            <Link href="/profil" className="font-bold underline" style={{ color: "#1E3524" }}>
              📸 Actions & Contributions
            </Link>{" "}
            de ton profil.
          </div>
        </div>
      </section>
    </main>
  );
}
