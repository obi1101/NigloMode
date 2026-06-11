"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Thread = {
  id: number; titre: string; auteur: string; date: string;
  reponses: number; vues: number; tag?: string; extrait: string;
};

const categoriesData: Record<string, {
  icon: string; nom: string; desc: string; couleur: string; threads: Thread[];
}> = {
  "discussion-libre": {
    icon: "🗣️", nom: "Discussion libre", couleur: "#4F6B47",
    desc: "Parle de tout, de rien, du Terrier et d'ailleurs.",
    threads: [
      { id: 1, titre: "Bienvenue dans le Terrier ! Présentez-vous ici", auteur: "Admin_Niglo", date: "Il y a 5 min", reponses: 142, vues: 2890, tag: "Épinglé", extrait: "Nouveau membre ? Dis-nous qui tu es, d'où tu viens et ce qui t'a amené ici !" },
      { id: 2, titre: "Vos photos de jardins et terrains — partagez !", auteur: "Marie_Forêt", date: "Il y a 2h", reponses: 38, vues: 512, extrait: "J'ai planté mes premières courges cette année, voici quelques photos..." },
      { id: 3, titre: "Votre film/livre coup de cœur ce mois-ci ?", auteur: "TerreEtBois", date: "Hier", reponses: 61, vues: 740, extrait: "Je viens de finir « Vers une société sobre » — vraiment inspirant." },
      { id: 4, titre: "Quels événements locaux cette semaine ?", auteur: "SophieAiguille", date: "Il y a 3h", reponses: 12, vues: 198, extrait: "Marché du troc samedi à Montpellier, qui y va ?" },
      { id: 5, titre: "Métiers oubliés que vous trouvez fascinants", auteur: "NicoRepare", date: "Il y a 2 jours", reponses: 29, vues: 430, extrait: "Le rempailleur de chaises, le ferblantier... des savoir-faire à ressusciter ?" },
    ],
  },
  "idees-suggestions": {
    icon: "💡", nom: "Idées & Suggestions", couleur: "#6B4F34",
    desc: "Propose des améliorations pour NIGLOMODE ou ton Terrier.",
    threads: [
      { id: 1, titre: "Idée : une carte interactive des ressources locales", auteur: "PaulCompost", date: "Il y a 22 min", reponses: 15, vues: 210, tag: "Populaire", extrait: "Et si on pouvait localiser les ressources (bois, compost, outils) sur une carte ?" },
      { id: 2, titre: "Proposition : un calendrier des événements du Terrier", auteur: "Marie_Forêt", date: "Il y a 1h", reponses: 8, vues: 145, extrait: "Un agenda partagé pour les ateliers, collectes et marchés locaux." },
      { id: 3, titre: "Améliorer la page Annuaire avec une carte", auteur: "TerreEtBois", date: "Hier", reponses: 22, vues: 340, extrait: "Permettre de rechercher les membres par code postal." },
      { id: 4, titre: "Système de notation / confiance entre membres", auteur: "NicoRepare", date: "Il y a 3 jours", reponses: 31, vues: 510, extrait: "Un petit score de fiabilité visible sur les profils ?" },
    ],
  },
  "coup-de-main-urgent": {
    icon: "🆘", nom: "Coup de main urgent", couleur: "#8B3A2A",
    desc: "Besoin d'aide rapidement ? La communauté répond vite.",
    threads: [
      { id: 1, titre: "Besoin d'aide : ma toiture fuit après la tempête", auteur: "Jacques34", date: "Il y a 30 min", reponses: 7, vues: 89, tag: "Urgent", extrait: "La nuit dernière, grosse tempête, tuiles cassées. Quelqu'un disponible ce week-end ?" },
      { id: 2, titre: "Cherche transport urgent pour don de meubles", auteur: "Claire_V", date: "Il y a 2h", reponses: 4, vues: 67, tag: "Urgent", extrait: "J'ai un canapé + table à donner ASAP avant déménagement vendredi." },
      { id: 3, titre: "Aide pour traduction document médical espagnol", auteur: "AnaMaria", date: "Hier", reponses: 3, vues: 55, extrait: "Document de ma mère, besoin d'une traduction pour demain matin." },
      { id: 4, titre: "SOS chien perdu secteur Montpellier Est", auteur: "Famille_Blanc", date: "Hier", reponses: 18, vues: 320, extrait: "Golden retriever, collier rouge, répond au nom de Pixel. Récompense." },
    ],
  },
  "bricolage-reparation": {
    icon: "🔧", nom: "Bricolage & Réparation", couleur: "#1E3524",
    desc: "Conseils, questions techniques, retours d'expérience.",
    threads: [
      { id: 1, titre: "Comment réparer un lave-linge qui ne vidange plus ?", auteur: "NicoRepare", date: "Il y a 1h", reponses: 14, vues: 230, extrait: "Mon Bosch 7 ans ne vidange plus. J'ai vérifié le filtre, propre. Pompe ?" },
      { id: 2, titre: "Tuto : remplacer une carte électronique de four", auteur: "ElectroBricoMax", date: "Il y a 4h", reponses: 6, vues: 178, extrait: "Voici comment j'ai sauvé mon four Whirlpool pour 35€ de pièce." },
      { id: 3, titre: "Peindre sans traces : techniques et pinceaux recommandés", auteur: "Marie_Forêt", date: "Hier", reponses: 22, vues: 410, extrait: "J'ai repeint mon salon en 2 jours sans traces, voici mes secrets." },
      { id: 4, titre: "Où trouver des pièces détachées pas chères en France ?", auteur: "TerreEtBois", date: "Il y a 2 jours", reponses: 35, vues: 620, extrait: "Liste des sites et ressourceries où trouver des pièces de rechange." },
      { id: 5, titre: "Traiter la rouille sur une charpente métallique", auteur: "PaulCompost", date: "Il y a 3 jours", reponses: 11, vues: 195, extrait: "Ma serre en fer commence à rouiller, quels produits utiliser ?" },
    ],
  },
  "jardin-potager": {
    icon: "🌱", nom: "Jardin & Potager", couleur: "#4A7C59",
    desc: "Partager les récoltes, les questions et les semences.",
    threads: [
      { id: 1, titre: "Échange de semences — saison 2026", auteur: "Marie_Forêt", date: "Il y a 2h", reponses: 47, vues: 830, tag: "Populaire", extrait: "Je propose : tomates anciennes, courgettes, basilic. Je cherche : haricots grimpants." },
      { id: 2, titre: "Pucerons sur mes rosiers — solutions naturelles ?", auteur: "SophieAiguille", date: "Hier", reponses: 19, vues: 340, extrait: "Invasion de pucerons depuis 2 semaines. Savon noir ? Coccinelles ?" },
      { id: 3, titre: "Calendrier lunaire pour les plantations — vous y croyez ?", auteur: "TerreEtBois", date: "Hier", reponses: 33, vues: 510, extrait: "Débat ouvert : le calendrier lunaire a-t-il un impact réel ?" },
      { id: 4, titre: "Créer un jardin partagé dans son quartier — retour d'expérience", auteur: "PaulCompost", date: "Il y a 3 jours", reponses: 26, vues: 470, extrait: "On a lancé un jardin partagé il y a 2 ans, voici ce qu'on a appris." },
      { id: 5, titre: "Que planter en juin pour récolter cet été ?", auteur: "Jacques34", date: "Il y a 4 jours", reponses: 15, vues: 280, extrait: "Encore le temps de planter haricots, courgettes, radis et salades." },
    ],
  },
  "cuisine-recettes": {
    icon: "🍲", nom: "Cuisine & Recettes", couleur: "#8B6F47",
    desc: "Recettes, conserves, fermentation, anti-gaspi.",
    threads: [
      { id: 1, titre: "Recettes anti-gaspi avec les légumes moches", auteur: "Marie_Forêt", date: "Il y a 3h", reponses: 41, vues: 720, tag: "Populaire", extrait: "Soupe de fanes de carottes, gratin de courgettes trop mûres... vos idées !" },
      { id: 2, titre: "Faire son pain sans machine — trucs et astuces", auteur: "NicoRepare", date: "Il y a 5h", reponses: 28, vues: 490, extrait: "La recette du pain de campagne que je fais chaque semaine depuis 3 ans." },
      { id: 3, titre: "Fermentation : kimchi, kéfir, kombucha — par où commencer ?", auteur: "SophieAiguille", date: "Hier", reponses: 52, vues: 910, extrait: "Guide débutant pour se lancer dans la fermentation maison." },
      { id: 4, titre: "Conserves de tomates — stérilisation ou congélation ?", auteur: "TerreEtBois", date: "Il y a 2 jours", reponses: 17, vues: 310, extrait: "J'ai 10 kg de tomates du jardin, quelle méthode recommandez-vous ?" },
      { id: 5, titre: "Cuisiner sans gluten avec des farines locales", auteur: "Claire_V", date: "Il y a 3 jours", reponses: 23, vues: 420, extrait: "Farine de châtaigne, sarrasin, pois chiches — retours d'expérience ?" },
    ],
  },
  "annonces-terrier": {
    icon: "📢", nom: "Annonces du Terrier", couleur: "#1E3524",
    desc: "Événements, collectes, rendez-vous locaux.",
    threads: [
      { id: 1, titre: "Repair Café samedi 14 juin — Montpellier", auteur: "Admin_Niglo", date: "Il y a 1h", reponses: 9, vues: 145, tag: "Événement", extrait: "Amenez vos appareils cassés ! Bénévoles compétents sur place de 10h à 17h." },
      { id: 2, titre: "Collecte de vêtements pour familles dans le besoin", auteur: "Marie_Forêt", date: "Hier", reponses: 5, vues: 98, tag: "Collecte", extrait: "Dépôt possible jusqu'au 20 juin chez Sophie au 12 rue des Lilas." },
      { id: 3, titre: "Atelier couture mensuel — prochain rendez-vous", auteur: "SophieAiguille", date: "Il y a 2 jours", reponses: 7, vues: 120, extrait: "Rendez-vous le 18 juin, 14h. Niveau débutant bienvenu. Apportez vos tissus !" },
      { id: 4, titre: "Marché du troc — chaque dimanche matin", auteur: "PaulCompost", date: "Il y a 3 jours", reponses: 22, vues: 380, extrait: "Place du marché, 8h-13h. Gratuit, sans argent, tout s'échange." },
    ],
  },
  "questions-administratives": {
    icon: "🤔", nom: "Questions administratives", couleur: "#4F6B47",
    desc: "Aides, démarches, associations — entre nous.",
    threads: [
      { id: 1, titre: "Monter une association loi 1901 — par où commencer ?", auteur: "TerreEtBois", date: "Il y a 2h", reponses: 18, vues: 310, extrait: "On est 5 à vouloir créer une asso de jardins partagés. Première étape ?" },
      { id: 2, titre: "Quelles aides pour l'isolation de ma maison en 2026 ?", auteur: "Jacques34", date: "Hier", reponses: 24, vues: 440, extrait: "MaPrimeRénov, CEE... quelqu'un a fait les démarches récemment ?" },
      { id: 3, titre: "RSA et activités bénévoles — est-ce compatible ?", auteur: "AnaMaria", date: "Il y a 2 jours", reponses: 11, vues: 205, extrait: "Je suis au RSA et veux m'impliquer dans une asso. Quelles règles ?" },
      { id: 4, titre: "Dépôt de marque pour un projet artisanal", auteur: "NicoRepare", date: "Il y a 4 jours", reponses: 8, vues: 160, extrait: "Je crée des objets recyclés que je vends, dois-je déposer une marque ?" },
    ],
  },
};

const tagStyle: Record<string, { bg: string; color: string }> = {
  "Épinglé":   { bg: "rgba(30,53,36,0.15)",    color: "#1E3524" },
  "Populaire": { bg: "rgba(216,181,106,0.20)",  color: "#6B4F34" },
  "Urgent":    { bg: "rgba(180,60,40,0.12)",    color: "#8B3A2A" },
  "Événement": { bg: "rgba(79,107,71,0.15)",    color: "#4F6B47" },
  "Collecte":  { bg: "rgba(107,79,52,0.15)",    color: "#6B4F34" },
};

const lucioles = Array.from({ length: 8 }, (_, i) => ({
  id: i, top: `${8 + (i * 43) % 75}%`, left: `${4 + (i * 61) % 90}%`,
  size: 2 + (i % 3), opacity: 0.18 + (i % 4) * 0.08,
}));

export default function ForumCategoriePage({ slug }: { slug: string }) {
  const cat = categoriesData[slug];
  const [threads, setThreads] = useState<Thread[]>(cat?.threads ?? []);
  const [showModal, setShowModal] = useState(false);
  const [titre, setTitre] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [profil, setProfil] = useState<{ pseudo: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("niglomode_profil");
    if (stored) setProfil(JSON.parse(stored));
    const savedThreads = localStorage.getItem(`niglomode_forum_${slug}`);
    if (savedThreads) {
      const extra = JSON.parse(savedThreads) as Thread[];
      setThreads([...(cat?.threads ?? []), ...extra]);
    }
  }, [slug, cat?.threads]);

  const creerFil = () => {
    if (!titre.trim() || !message.trim()) return;
    const newThread: Thread = {
      id: Date.now(), titre: titre.trim(),
      auteur: profil?.pseudo || "Anonyme",
      date: "À l'instant", reponses: 0, vues: 1,
      extrait: message.trim().slice(0, 120),
    };
    const savedThreads = localStorage.getItem(`niglomode_forum_${slug}`);
    const extra: Thread[] = savedThreads ? JSON.parse(savedThreads) : [];
    const updated = [newThread, ...extra];
    localStorage.setItem(`niglomode_forum_${slug}`, JSON.stringify(updated));
    setThreads([...(cat?.threads ?? []), ...updated]);
    setSent(true);
    setTimeout(() => { setShowModal(false); setSent(false); setTitre(""); setMessage(""); }, 1800);
  };

  if (!cat) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#1E3524" }}>
      <p style={{ color: "#F5EFD8" }}>Catégorie introuvable. <Link href="/forum" style={{ color: "#D8B56A" }}>Retour au forum</Link></p>
    </div>
  );

  return (
    <main>
      {/* HERO */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden px-6 pt-16 pb-24 text-center">
        {lucioles.map((l) => (
          <div key={l.id} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.size, height: l.size, backgroundColor: "#D8B56A", opacity: l.opacity, boxShadow: `0 0 ${l.size * 3}px #D8B56A` }} />
        ))}
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-3">
          <Link href="/forum" className="text-xs tracking-wider mb-1 transition-opacity hover:opacity-80"
            style={{ color: "rgba(216,181,106,0.6)" }}>← Forum du Terrier</Link>
          <span style={{ fontSize: 48 }}>{cat.icon}</span>
          <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#ffffff", letterSpacing: 1 }}>
            {cat.nom}
          </h1>
          <p style={{ color: "rgba(245,239,216,0.7)", maxWidth: 440 }}>{cat.desc}</p>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-2.5 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.35)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 16 }}>🦔</span>
          <span className="text-xs italic" style={{ color: "#F5EFD8" }}>{threads.length} fils · Bienvenue dans l&apos;espace {cat.nom}</span>
        </div>
      </section>

      {/* THREADS */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-lg" style={{ color: "#1E3524" }}>Fils de discussion</h2>
            <button onClick={() => { setShowModal(true); setSent(false); }}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
              ✏️ Nouveau fil
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {threads.map((t) => (
              <div key={t.id} className="rounded-2xl px-5 py-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: cat.couleur, color: "#F5EFD8" }}>
                  {t.auteur.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <p className="font-bold text-sm" style={{ color: "#1E3524" }}>{t.titre}</p>
                    {t.tag && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: tagStyle[t.tag]?.bg, color: tagStyle[t.tag]?.color }}>
                        {t.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mb-1.5 line-clamp-1" style={{ color: "#6B4F34" }}>{t.extrait}</p>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#C4B898" }}>
                    <span>👤 {t.auteur}</span>
                    <span>💬 {t.reponses} rép.</span>
                    <span>👁 {t.vues}</span>
                    <span>{t.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODALE nouveau fil */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(6,14,8,0.75)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span style={{ fontSize: 44 }}>✅</span>
                <p className="font-extrabold text-lg" style={{ color: "#1E3524" }}>Fil publié !</p>
                <p className="text-sm" style={{ color: "#4F6B47" }}>Visible par tous les membres.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base" style={{ color: "#1E3524" }}>Nouveau fil — {cat.nom}</h3>
                  <button onClick={() => setShowModal(false)} className="text-xl leading-none" style={{ color: "#C4B898" }}>✕</button>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>Titre du fil</label>
                  <input value={titre} onChange={(e) => setTitre(e.target.value)}
                    placeholder="En quelques mots..."
                    className="px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>Ton message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Décris ta question, ton idée ou ton annonce..."
                    rows={4}
                    className="px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" }} />
                </div>
                <button onClick={creerFil} disabled={!titre.trim() || !message.trim()}
                  className="py-2.5 rounded-xl font-bold text-sm transition-opacity disabled:opacity-35 hover:opacity-90"
                  style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                  Publier le fil
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
