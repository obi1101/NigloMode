"use client";
import { useState } from "react";

const lucioles = [
  { top: "10%", left: "6%",  r: 3 }, { top: "25%", left: "88%", r: 2 },
  { top: "55%", left: "4%",  r: 2 }, { top: "72%", left: "93%", r: 3 },
  { top: "16%", left: "70%", r: 2 }, { top: "42%", left: "96%", r: 2 },
  { top: "82%", left: "18%", r: 2 }, { top: "7%",  left: "50%", r: 3 },
];

const CATS = [
  { id: "electro",  icon: "🔌", label: "Électroménager" },
  { id: "roues",    icon: "🚲", label: "Deux roues"     },
  { id: "textile",  icon: "🧵", label: "Textile"        },
  { id: "mobilier", icon: "🪑", label: "Mobilier"       },
  { id: "elec",     icon: "💡", label: "Électronique"   },
  { id: "divers",   icon: "🔧", label: "Divers"         },
] as const;

type CatId = typeof CATS[number]["id"];

type Fiche = {
  cat: CatId;
  emoji: string;
  titre: string;
  diff: "🟢 Facile" | "🟡 Moyen" | "🔴 Avancé";
  temps: string;
  auteur: string;
  texte: string;
};

const fiches: Fiche[] = [
  /* ── ÉLECTROMÉNAGER ── */
  {
    cat: "electro", emoji: "🔌", diff: "🟢 Facile", temps: "20 min", auteur: "Marie T.",
    titre: "Mon lave-linge ne vidange plus",
    texte: "Avant de démonter quoi que ce soit, cherche la petite trappe en bas à l'avant de la machine. Derrière il y a un filtre vissé à la main. Dévisse-le au-dessus d'un chiffon, vide l'eau, nettoie les poils et pièces coincées dedans. Dans 9 cas sur 10, c'est tout ce qu'il faut faire.",
  },
  {
    cat: "electro", emoji: "🔌", diff: "🔴 Avancé", temps: "1h30", auteur: "Thierry D.",
    titre: "Changer la courroie d'un lave-linge",
    texte: "Débrancher. Démonter le panneau arrière (4 vis). La courroie est visible sur le tambour et la poulie moteur. Si elle est craquée ou claquée c'est elle. Note la référence marquée dessus, commande la même. Remontage à l'envers. La tension se règle en appuyant sur le bras du moteur.",
  },
  {
    cat: "electro", emoji: "🍳", diff: "🟡 Moyen", temps: "45 min", auteur: "Sylvain G.",
    titre: "Bouton de four cassé — que faire ?",
    texte: "Le bouton tourne dans le vide ? Le petit ergot plastique à l'intérieur est cassé. Démonte le panneau frontal (généralement 4 vis dessous), localise le potentiomètre, remplace juste la pièce. Sinon un peu de colle époxy dans l'ergot peut tenir plusieurs années si le four n'est pas trop sollicité.",
  },
  {
    cat: "electro", emoji: "☕", diff: "🟢 Facile", temps: "30 min", auteur: "Corinne A.",
    titre: "Détartrer une cafetière correctement",
    texte: "Pas besoin de produits du commerce. Un demi-litre d'eau avec deux cuillères à soupe de vinaigre blanc, tu fais tourner à mi-programme, tu laisses reposer 20 min, tu finis le cycle. Un second cycle avec de l'eau claire. Le tartre fond et ton café retrouve son goût. À faire tous les 2 mois.",
  },
  {
    cat: "electro", emoji: "❄️", diff: "🟡 Moyen", temps: "1h", auteur: "Patricia M.",
    titre: "Changer le joint de porte d'un réfrigérateur",
    texte: "Le joint claque et le frigo tourne tout le temps ? Le vieux joint est coincé dans une rainure en plastique. Tire fort et patiemment, il se déclipse. Le nouveau s'enclipse à la main. Avant la pose, plonge-le 2 min dans l'eau chaude pour l'assouplir. Test : une feuille de papier doit rester coincée en fermant la porte.",
  },
  /* ── DEUX ROUES ── */
  {
    cat: "roues", emoji: "🚲", diff: "🟢 Facile", temps: "15 min", auteur: "Jérôme L.",
    titre: "Réparer une crevaison de vélo",
    texte: "Démonte la roue, sors la chambre à air, gonfle-la légèrement, passe-la dans un bac d'eau pour trouver les bulles. Sèche, ponce légèrement autour du trou (la rustine n'accroche pas sur le caoutchouc brillant), colle et appuie fort 2 min. Avant de remonter, passe les doigts à l'intérieur du pneu pour trouver ce qui a percé.",
  },
  {
    cat: "roues", emoji: "🏍️", diff: "🔴 Avancé", temps: "1h30", auteur: "Karim B.",
    titre: "Purger les freins hydrauliques d'une moto",
    texte: "Travail propre obligatoire — le liquide de frein brûle la peinture. Garde un chiffon partout. Ouvre le réservoir maître-cylindre, branche un kit de purge sur l'étrier, pousse le liquide neuf depuis le haut. Arrête quand tu ne vois plus de bulles d'air sortir. Referme le nipple avant d'enlever le kit. Teste avant de rouler.",
  },
  {
    cat: "roues", emoji: "⚙️", diff: "🟡 Moyen", temps: "30 min", auteur: "Romain F.",
    titre: "Régler un dérailleur arrière qui saute",
    texte: "Commence par tendre le câble : tourne le barillet du dérailleur dans le sens anti-horaire. Si ça ne suffit pas, cherche les deux petites vis H et L (limite haute et basse) sur le corps du dérailleur. La vis B règle l'écartement avec le pignon. Pédale à la main et ajuste jusqu'à ce que le changement de vitesse soit silencieux.",
  },
  {
    cat: "roues", emoji: "🔗", diff: "🟢 Facile", temps: "10 min", auteur: "Lucas P.",
    titre: "Retendre une chaîne de vélo",
    texte: "Sur un vélo à vitesse unique, desserre les deux écrous de l'axe arrière, tire la roue vers toi jusqu'à ce que la chaîne ait 1 cm de jeu vertical au milieu, resserre en vérifiant que la roue reste bien centrée. Sur un vélo à vitesses, c'est le dérailleur lui-même qui assure la tension — si la chaîne est trop lâche, elle est usée, il faut la changer.",
  },
  {
    cat: "roues", emoji: "🔄", diff: "🟢 Facile", temps: "20 min", auteur: "Anaïs V.",
    titre: "Changer une chambre à air de vélo",
    texte: "Dégonfle entièrement. Passe deux démonte-pneus sous le talon du pneu et fais levier pour le sortir d'un côté. Tire la chambre à air. Remplace-la, gonfle légèrement avant de remettre le pneu pour qu'elle ne se plie pas. Remonte le talon à la main sans démonte-pneu si possible pour ne pas pincer la chambre neuve.",
  },
  /* ── TEXTILE ── */
  {
    cat: "textile", emoji: "🧵", diff: "🟡 Moyen", temps: "45 min", auteur: "Isabelle C.",
    titre: "Remplacer une fermeture éclair",
    texte: "Découds l'ancienne ferme en suivant la couture d'origine (découd-points ou ciseaux fins). La nouvelle ferme doit faire la même longueur. Épingle d'abord avant de coudre pour bien aligner. Si tu couds à la machine, utilise un pied spécial ferme-éclair : il permet de passer au plus près des dents. Teste le glissement avant de finir les arrêts.",
  },
  {
    cat: "textile", emoji: "👖", diff: "🟡 Moyen", temps: "30 min", auteur: "Sylvie K.",
    titre: "Réparer un accroc dans un jean",
    texte: "Pour un trou entre les cuisses, colle d'abord un morceau de tissu de renfort par l'intérieur (jersey ou denim fin). Puis fais des points en grille serrée à la main avec du fil résistant, en couvrant le trou et en débordant sur le tissu sain autour. L'idéal c'est le point de sashiko japonais : solide et esthétique.",
  },
  {
    cat: "textile", emoji: "✂️", diff: "🟢 Facile", temps: "20 min", auteur: "Marguerite R.",
    titre: "Refaire un ourlet sans machine à coudre",
    texte: "Marque la hauteur souhaitée avec des épingles. Replie deux fois le tissu (une fois pour cacher le bord brut, une fois pour l'ourlet final), puis coud à la main avec un point glissé invisible côté endroit. L'astuce : prend juste un fil du tissu principal à chaque point pour que ça ne se voie pas sur la face visible.",
  },
  {
    cat: "textile", emoji: "🩹", diff: "🟢 Facile", temps: "15 min", auteur: "Thomas B.",
    titre: "Poser un patch qui tient dans le temps",
    texte: "Coupe le patch légèrement plus grand que le trou. Colle thermocollant au fer côté intérieur pour bloquer les bords. Ensuite couds tout autour à 2-3 mm du bord avec un point droit serré. Sans cette couture le thermocollant finit par se décoller au lavage. Avec la couture ça peut tenir des années.",
  },
  {
    cat: "textile", emoji: "🪡", diff: "🟢 Facile", temps: "10 min", auteur: "Hélène D.",
    titre: "Recoudre un bouton durablement",
    texte: "Passe le fil en double dans l'aiguille — ça double la solidité sans effort. Couds en croix entre les trous, pas toujours dans le même sens. Enroule le fil plusieurs fois autour de la tige sous le bouton pour former un pied : ça évite que le bouton arrache le tissu à l'usage. Termine avec quelques points dans le tissu seul.",
  },
  /* ── MOBILIER ── */
  {
    cat: "mobilier", emoji: "🪑", diff: "🟢 Facile", temps: "30 min", auteur: "Camille R.",
    titre: "Réparer une chaise qui branle",
    texte: "Détache le pied concerné complètement. Nettoie l'ancienne colle avec du papier abrasif. Injecte de la colle à bois avec une seringue dans la mortaise, ré-assemble, et serre avec un serre-joint au moins 4h. Si le tenon est trop fin et ne tient plus, enroule quelques tours de fil de coton autour avant de coller pour regarnir l'espace.",
  },
  {
    cat: "mobilier", emoji: "🪵", diff: "🟢 Facile", temps: "20 min", auteur: "Bernard L.",
    titre: "Reboucher un éclat dans le bois",
    texte: "Pour un petit éclat, un bouche-pores à poncer teinte bois suffit. Pour quelque chose de plus profond, mélange de la sciure de la même essence avec de la colle à bois en pâte épaisse. Tasse dans le trou, laisse sécher, ponce à ras. Applique ensuite la même cire ou vernir que le reste du meuble. Le résultat est quasi invisible.",
  },
  {
    cat: "mobilier", emoji: "✨", diff: "🟡 Moyen", temps: "2h", auteur: "Martine H.",
    titre: "Revernir une table en bois",
    texte: "Le secret c'est la préparation. Ponce dans le sens du fil (grain 80 puis 120 puis 180). Dépoussierre soigneusement avec un chiffon légèrement humide. Applique le vernis en couches fines — une couche épaisse fait des bulles et des coulures. Ponce légèrement entre chaque couche avec un grain 240. Trois couches minces valent mieux qu'une épaisse.",
  },
  {
    cat: "mobilier", emoji: "🎨", diff: "🟡 Moyen", temps: "3h", auteur: "Sophie D.",
    titre: "Rénover un vieux meuble sans l'abîmer",
    texte: "Commence par nettoyer avec du savon noir dilué — tu enlèves 30 ans de crasse et de cire. Si le bois est en bon état, une simple cire d'abeille peut suffire pour retrouver de l'éclat. Pour repeindre, utilise une peinture à la craie (chalk paint) : ça accroche sans sous-couche et ça donne un effet patiné naturel très sympa.",
  },
  {
    cat: "mobilier", emoji: "📐", diff: "🟢 Facile", temps: "10 min", auteur: "Michel T.",
    titre: "Remettre un meuble qui ne touche pas bien le sol",
    texte: "Avant d'acheter des patins réglables, essaie d'abord les petites vis de réglage déjà présentes sous les pieds — beaucoup de meubles en ont. Sinon, un tas de cartons découpés en rondelles et agrafés, ou des petites cales de bois collées avec de la colle néoprène. Les patins feutre autocollants vendus en quincaillerie fonctionnent aussi sur parquet si ce n'est que quelques millimètres.",
  },
  /* ── ÉLECTRONIQUE ── */
  {
    cat: "elec", emoji: "📱", diff: "🔴 Avancé", temps: "1h", auteur: "Théo M.",
    titre: "Changer un écran cassé de smartphone",
    texte: "Outillage indispensable : ventouse, spudger plastique, petits tournevis Torx et Pentalobe. Chauffe légèrement les bords avec un sèche-cheveux pour ramollir le joint. Insère la ventouse et soulève doucement — ne force pas, les nappes de connecteur sont fragiles. Prends en photo avant de débrancher chaque connecteur. La batterie se décolle avec un peu d'alcool isopropylique sous les adhésifs.",
  },
  {
    cat: "elec", emoji: "🔋", diff: "🟡 Moyen", temps: "45 min", auteur: "Lucie N.",
    titre: "Remplacer la batterie d'un téléphone",
    texte: "Une batterie qui gonfle ou tombe à 0% brutalement mérite d'être changée. Kit de qualité neuf = 15 à 25€. Les batteries China no-name durent 6 mois. La plupart se déconnectent avec un simple clip, la partie difficile c'est de décoller les adhésifs qui la maintiennent — de l'alcool à 90° en fait ramollir la colle, prends ton temps.",
  },
  {
    cat: "elec", emoji: "🔌", diff: "🟢 Facile", temps: "10 min", auteur: "Hugo P.",
    titre: "Port USB qui ne charge plus",
    texte: "Avant de conclure à une panne matérielle, regarde l'intérieur du port avec une lampe. Les peluches et la poussière coincées compressées avec le câble empêchent le contact. Une cure-dent en bois (jamais de métal !) ou de l'air comprimé règle souvent le problème en 2 min. Si le port est tordu, il faut le changer — plus complexe mais faisable.",
  },
  {
    cat: "elec", emoji: "🔦", diff: "🟢 Facile", temps: "20 min", auteur: "Nadia B.",
    titre: "Réparer un câble qui craque ou ne charge plus",
    texte: "Le câble craque souvent là où il sort du connecteur — c'est le point de flexion. Dégaine le fil intérieur, coupe 2 cm de gaine en mauvais état, expose les fils, resserre avec du ruban électrique ou de la gaine thermorétractable (bien mieux). Pour un câble de chargeur, vérifie d'abord que les fils intérieurs ne sont pas sectionnés avec un multimètre.",
  },
  {
    cat: "elec", emoji: "💻", diff: "🟡 Moyen", temps: "45 min", auteur: "Fabrice L.",
    titre: "Un ordinateur qui surchauffe et ralentit",
    texte: "C'est presque toujours la poussière dans le radiateur. Dévisse le panneau arrière, utilise de l'air comprimé pour souffler (sors dehors, ça fait un nuage gris). Si l'ordi a plus de 3 ans, la pâte thermique entre le processeur et le dissipateur est sèche — la changer avec de la pâte Arctic MX-4 peut faire baisser la température de 15 à 20°C.",
  },
  /* ── DIVERS ── */
  {
    cat: "divers", emoji: "🪓", diff: "🟡 Moyen", temps: "30 min", auteur: "Paul V.",
    titre: "Remettre un manche d'outil cassé",
    texte: "Extraire l'ancien manche de la tête (chauffe un peu, frappe de bas en haut). Le nouveau manche doit être légèrement plus gros que le trou — c'est normal. Tape-le jusqu'au flush, puis enfonce le coin métallique fourni (ou taille un coin de bois si besoin) dans la fente du bout pour écarter et bloquer définitivement. Sans ce coin, ça repart.",
  },
  {
    cat: "divers", emoji: "🛞", diff: "🟡 Moyen", temps: "1h", auteur: "Gérard F.",
    titre: "Réparer une brouette : roue ou bac",
    texte: "Roue crevée : c'est une chambre à air classique, même méthode que le vélo mais la valve est souvent différente. Bac fissuré : le plastique des brouettes répond bien à la résine époxy chargée de fibres de verre. Nettoie la zone, sèche, applique la résine en débordant de 3 cm de chaque côté. Après 24h c'est souvent plus solide que l'original.",
  },
  {
    cat: "divers", emoji: "🦀", diff: "🟢 Facile", temps: "30 min", auteur: "Jean-Marc D.",
    titre: "Entretenir des outils rouillés",
    texte: "Pour une rouille légère, de l'huile et une laine de verre fine font le travail. Pour une rouille sérieuse, trempe dans du vinaigre blanc pendant 24h — la rouille se dissout chimiquement. Rince, sèche, gratte ce qui reste, puis passe une couche d'huile de lin pour protéger le métal. Un outil bien huilé peut durer plusieurs générations.",
  },
  {
    cat: "divers", emoji: "🌿", diff: "🟡 Moyen", temps: "1h", auteur: "René P.",
    titre: "Tondeuse qui ne démarre plus",
    texte: "Premier réflexe : la bougie. Dévisse-la, regarde si elle est noire ou mouillée d'essence. Une bougie neuve coûte 3€ et règle souvent le problème. Deuxième piste : le carburateur encrassé par un vieux carburant. Vide le réservoir, débranche le carbu, nettoie les gicleurs avec un spray carbu. Troisième piste : le filtre à air bouché.",
  },
  {
    cat: "divers", emoji: "🧸", diff: "🟡 Moyen", temps: "1h", auteur: "Cécile R.",
    titre: "Restaurer un jouet ancien",
    texte: "Pour un jouet en bois : ponce, bouche les éclats à la colle + sciure, repeins avec de la peinture non toxique (certifiée jouet). Pour un jouet en plastique jauni : un bain de Peroxy dans l'eau avec exposition au soleil fait blanchir les plastiques ABS — c'est la même technique que les restaurateurs de consoles rétro utilisent.",
  },
];

const diffColor = (d: Fiche["diff"]) =>
  d === "🟢 Facile" ? { bg: "#d4edda", color: "#1a5c2a" }
  : d === "🟡 Moyen" ? { bg: "#fff3cd", color: "#7d5a00" }
  : { bg: "#f8d7da", color: "#7d1a1a" };

export default function ReparerPage() {
  const [cat,        setCat]        = useState<CatId>("electro");
  const [cp,         setCp]         = useState("");
  const [showForm,   setShowForm]   = useState(false);
  const [formSent,   setFormSent]   = useState(false);
  const [showRetour, setShowRetour] = useState(false);
  const [retourSent, setRetourSent] = useState(false);

  const affichees = fiches.filter(f => f.cat === cat);
  const dc        = diffColor;

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden">
        <img src="/reparer-bg.png" alt="" className="w-full block" style={{ opacity: 0.62 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.40) 0%, rgba(6,14,8,0.18) 50%, rgba(6,14,8,0.55) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <span style={{ fontSize: 48 }}>🔧</span>
            <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: 4, color: "#D8B56A", textShadow: "0 2px 12px rgba(6,14,8,0.8)" }}>
              RÉPARER PLUTÔT QUE JETER
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.85rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Guides · Astuces · Ateliers · Entraide
            </p>
            <p style={{ color: "rgba(245,239,216,0.90)", lineHeight: 1.75, maxWidth: 500, fontWeight: 500, textShadow: "0 1px 8px rgba(6,14,8,0.75)" }}>
              Avant de jeter, essaie de réparer. La communauté partage ses techniques, ses astuces et ses ateliers locaux.
            </p>
          </div>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Chaque panne réparée est un savoir-faire validé.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ RECHERCHE ATELIER ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-2">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          <p className="text-center text-sm font-bold" style={{ color: "#D8B56A" }}>
            🔧 Trouver un atelier ou un repair café près de chez moi
          </p>
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl"
            style={{ backgroundColor: "#1a2e1c", border: "1px solid rgba(216,181,106,0.30)" }}>
            <span>📍</span>
            <input value={cp} onChange={e => setCp(e.target.value)}
              placeholder="Ville, code postal ou département (ex : 34, Lyon…)"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "#F5EFD8" }} />
            {cp && <button onClick={() => setCp("")} className="text-xs opacity-50 hover:opacity-100" style={{ color: "#F5EFD8" }}>✕</button>}
          </div>
        </div>
      </section>

      {/* ═══ FILTRES CATÉGORIES ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-6 pb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-3">
          {CATS.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className="rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center transition-all"
              style={{
                backgroundColor: cat === c.id ? "#D8B56A" : "rgba(255,255,255,0.07)",
                color: cat === c.id ? "#1E3524" : "rgba(245,239,216,0.75)",
                border: `2px solid ${cat === c.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`,
                boxShadow: cat === c.id ? "0 4px 18px rgba(216,181,106,0.30)" : "none",
              }}>
              <span style={{ fontSize: 26 }}>{c.icon}</span>
              <span className="font-bold text-xs leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ═══ FICHES GUIDES ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-lg font-extrabold" style={{ color: "#1E3524" }}>
                {CATS.find(c => c.id === cat)?.icon} {CATS.find(c => c.id === cat)?.label} — Carnet du Niglo
              </h2>
              <p className="text-xs mt-1" style={{ color: "#4F6B47" }}>
                Fiches rédigées par des membres du Terrier. Simples, pratiques, testées.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#EDE4C4", color: "#4F6B47", border: "1px solid #C4B898" }}>
                {affichees.length} fiches
              </span>
              <button onClick={() => { setShowForm(true); setFormSent(false); }}
                className="text-xs font-semibold px-4 py-1.5 rounded-full transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                ➕ Proposer un guide
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {affichees.map((f) => {
              const col = dc(f.diff);
              return (
                <div key={f.titre} className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
                  <div className="flex items-start gap-3">
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{f.emoji}</span>
                    <div className="flex-1">
                      <p className="font-extrabold text-sm leading-snug" style={{ color: "#1E3524" }}>{f.titre}</p>
                      <div className="flex gap-2 mt-1.5 flex-wrap items-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ backgroundColor: col.bg, color: col.color }}>
                          {f.diff}
                        </span>
                        <span className="text-xs" style={{ color: "#6B4F34" }}>⏱ {f.temps}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "#4F6B47" }}>{f.texte}</p>
                  <p className="text-xs font-medium pt-1 border-t" style={{ color: "#C4B898", borderColor: "#C4B898" }}>
                    par {f.auteur}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ ENCART COMMUNAUTÉ ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-6 flex flex-col gap-4"
            style={{ backgroundColor: "#1E3524", border: "2px solid rgba(216,181,106,0.40)" }}>
            <div className="flex items-center gap-3">
              <span style={{ fontSize: 32 }}>🦔</span>
              <div>
                <h3 className="font-extrabold text-base" style={{ color: "#D8B56A" }}>
                  Tu as déjà réparé ce problème ?
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "rgba(245,239,216,0.65)" }}>
                  Partage ton retour d&apos;expérience avec le Terrier.
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,216,0.80)" }}>
              Ce qui a fonctionné, ce qui n&apos;a pas marché, les outils utilisés, les erreurs à éviter…
              Les meilleures contributions enrichissent les fiches et aident les autres membres du Terrier.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { setShowRetour(true); setRetourSent(false); }}
                className="flex-1 py-3 rounded-xl font-extrabold text-sm transition-opacity hover:opacity-85"
                style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
                Partager mon retour d&apos;expérience
              </button>
              <button onClick={() => { setShowForm(true); setFormSent(false); }}
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-75"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(245,239,216,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}>
                ➕ Proposer un guide complet
              </button>
            </div>
            <p className="text-xs italic text-center" style={{ color: "rgba(245,239,216,0.35)" }}>
              Chaque objet réparé est une ressource préservée. Une panne n&apos;est pas une fin — c&apos;est parfois le début d&apos;un savoir-faire.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ MODALE RETOUR D'EXP ═══ */}
      {showRetour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(6,14,8,0.75)" }}
          onClick={() => setShowRetour(false)}>
          <div className="rounded-3xl p-8 w-full max-w-md" style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}
            onClick={e => e.stopPropagation()}>
            {retourSent ? (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <span style={{ fontSize: 40 }}>🦔</span>
                <p className="font-bold text-lg" style={{ color: "#1E3524" }}>Merci pour ton retour !</p>
                <p className="text-sm" style={{ color: "#4F6B47" }}>Ta contribution aide les autres membres du Terrier.</p>
                <button onClick={() => setShowRetour(false)} className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Fermer</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg mb-5" style={{ color: "#1E3524" }}>🦔 Mon retour d&apos;expérience</h3>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Quel objet / quel problème ?" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <textarea rows={4} placeholder="Ce qui a marché, ce qui n'a pas marché, les erreurs à éviter, les outils utiles…" className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <div className="flex gap-3 mt-1">
                    <button onClick={() => setRetourSent(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Envoyer</button>
                    <button onClick={() => setShowRetour(false)} className="px-5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>Annuler</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ MODALE PROPOSER UN GUIDE ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(6,14,8,0.75)" }}
          onClick={() => setShowForm(false)}>
          <div className="rounded-3xl p-8 w-full max-w-md" style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}
            onClick={e => e.stopPropagation()}>
            {formSent ? (
              <div className="text-center py-4 flex flex-col items-center gap-3">
                <span style={{ fontSize: 40 }}>✅</span>
                <p className="font-bold text-lg" style={{ color: "#1E3524" }}>Guide proposé, merci !</p>
                <p className="text-sm" style={{ color: "#4F6B47" }}>Même une petite astuce peut éviter qu&apos;un objet finisse à la déchetterie.</p>
                <button onClick={() => setShowForm(false)} className="mt-2 px-6 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Fermer</button>
              </div>
            ) : (
              <>
                <h3 className="font-extrabold text-lg mb-2" style={{ color: "#1E3524" }}>➕ Proposer un guide de réparation</h3>
                <p className="text-xs mb-5 leading-relaxed" style={{ color: "#4F6B47" }}>
                  Tu as appris à réparer quelque chose ? Partage ton expérience. Même une petite astuce peut éviter qu&apos;un objet finisse à la déchetterie.
                </p>
                <div className="flex flex-col gap-3">
                  <input type="text" placeholder="Titre du guide (ex : Mon lave-linge ne vidange plus)" className="px-4 py-2.5 rounded-xl text-sm outline-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <textarea rows={5} placeholder="Décris la technique étape par étape, dans tes mots…" className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898", color: "#1E3524" }} />
                  <div className="flex gap-3 mt-1">
                    <button onClick={() => setFormSent(true)} className="flex-1 py-2.5 rounded-xl font-bold text-sm" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>Envoyer</button>
                    <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl text-sm" style={{ backgroundColor: "#EDE4C4", color: "#1E3524", border: "1px solid #C4B898" }}>Annuler</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
