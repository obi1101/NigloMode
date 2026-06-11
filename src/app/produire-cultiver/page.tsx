"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "cultiver" | "eau" | "elevage" | "fairesoimeme" | "bibliotheque";
type Niveau = "Débutant" | "Pratique" | "Intermédiaire" | "Référence";

type FicheRiche = {
  id: number;
  icone: string;
  titre: string;
  niveau: Niveau;
  sousTheme: string;
  specialType?: string;
  auteur: string;
  initiales: string;
  ville: string;
  date: string;
  desc: string;
  materiel?: string[];
  etapes: { titre: string; desc: string }[];
  conseils: string[];
  vues: number;
  likes: number;
  contributions: number;
  tags: string[];
};

type FicheBase = {
  id: number;
  titre: string;
  auteur: string;
  initiales: string;
  ville: string;
  date: string;
  desc: string;
  vues: number;
  likes: number;
  contributions: number;
  tags: string[];
};

const tabs: { id: Tab; icon: string; label: string; sublabel: string; items: string[] }[] = [
  {
    id: "cultiver", icon: "🌱", label: "Cultiver", sublabel: "Potager, verger, aromatiques",
    items: ["Semis & plantations", "Potager & cultures", "Fruitiers & aromatiques", "Calendrier & saisons", "Conseils & techniques"],
  },
  {
    id: "eau", icon: "💧", label: "Eau & Fertilité", sublabel: "Compost, paillage, arrosage",
    items: ["Gestion de l'eau", "Fertilité des sols", "Compost & valorisation", "Paillage & couverture"],
  },
  {
    id: "elevage", icon: "🐔", label: "Petit élevage", sublabel: "Poules, lapins, abeilles",
    items: ["Basse-cour", "Apiculture", "Petits animaux", "Alimentation & soins", "Habitat & enclos"],
  },
  {
    id: "fairesoimeme", icon: "🛠", label: "Faire soi-même", sublabel: "Fabriquer, construire, réemployer",
    items: ["Aménagements du jardin", "Cultiver autrement", "Récupération & réemploi", "Systèmes autonomes", "Plans & tutoriels"],
  },
  {
    id: "bibliotheque", icon: "📚", label: "Bibliothèque", sublabel: "Fiches, tutos, retours d'expérience",
    items: ["Guides & fiches", "Tutoriels", "Retours d'expérience", "Calendriers & ressources"],
  },
];

const fichesRiches: FicheRiche[] = [
  {
    id: 1, icone: "🥕", titre: "Démarrer un potager en carrés", niveau: "Débutant", sousTheme: "Potager & cultures",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 3 jours",
    desc: "Dimensions, substrat, choix des légumes et rotation simple pour une première saison réussie.",
    materiel: ["Planches en bois non traité (épicéa ou mélèze)", "Vis inox 50mm", "Géotextile de fond", "Substrat : terreau + compost + sable", "Règle ou niveau à bulle"],
    etapes: [
      { titre: "Choisir l'emplacement", desc: "Minimum 6h de soleil par jour. Éviter les zones d'ombre portée. Prévoir un accès à l'eau à moins de 10m." },
      { titre: "Construire le bac", desc: "Dimensions idéales : 1,20m de large × longueur libre. Hauteur : 25 à 30cm. Assembler avec vis inox — résistance à l'humidité assurée." },
      { titre: "Poser le géotextile", desc: "Tapisser le fond avant de remplir pour limiter les mauvaises herbes. Éviter le plastique : il asphyxierait les vers de terre." },
      { titre: "Préparer le substrat", desc: "Mélange idéal : 1/3 terreau de qualité + 1/3 compost mûr + 1/3 sable ou pouzzolane. Bien mélanger, tasser légèrement." },
      { titre: "Planifier en carrés", desc: "Diviser le bac en carrés de 30cm × 30cm. Chaque carré accueille 1 espèce. Consulter le guide des associations bénéfiques." },
      { titre: "Semer ou planter", desc: "Suivre le calendrier des semis selon la saison. Les légumes rapides (radis, laitue) comblent les espaces vides entre les cultures principales." },
    ],
    conseils: [
      "Ne jamais utiliser du bois traité autoclave — les produits migrent dans le sol et les légumes.",
      "Un bac de 1,20m permet de tout atteindre depuis les deux côtés sans jamais marcher dedans.",
      "En première année, miser sur les valeurs sûres : radis, laitue, haricots verts, courgettes.",
    ],
    vues: 312, likes: 47, contributions: 8, tags: ["Débutant", "Potager", "Pratique"],
  },
  {
    id: 2, icone: "🌱", titre: "Réussir ses semis en intérieur", niveau: "Débutant", sousTheme: "Semis & plantations",
    auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 1 semaine",
    desc: "Tout savoir pour démarrer ses semis à l'abri — du choix des contenants à la mise en terre.",
    materiel: ["Godets ou plaques alvéolées", "Terreau spécial semis (fin et léger)", "Arrosoir à pomme fine", "Sachets de graines", "Étiquettes", "Cloche ou film alimentaire"],
    etapes: [
      { titre: "Choisir le bon moment", desc: "Démarrer 6 à 8 semaines avant la date de plantation prévue. Consulter le calendrier des semis pour chaque espèce." },
      { titre: "Préparer les contenants", desc: "Nettoyer et désinfecter les godets réutilisés (eau + vinaigre blanc). Percer des trous de drainage si nécessaire." },
      { titre: "Remplir et tasser légèrement", desc: "Terreau semis jusqu'à 1cm du bord. Tasser sans compresser — le terreau doit rester aéré pour laisser germer." },
      { titre: "Semer à la bonne profondeur", desc: "Règle d'or : profondeur = 2× le diamètre de la graine. Pour les graines fines (tomates, basilic) : semer en surface, couvrir à peine." },
      { titre: "Maintenir humide et chaud", desc: "Couvrir d'un film ou d'une cloche. Températures idéales : 18 à 22°C. Vaporiser sans saturer — le terreau doit rester frais, pas détrempé." },
      { titre: "Gérer la lumière après levée", desc: "Dès l'apparition des premières feuilles, placer en pleine lumière. Un manque de lumière donne des plants filiformes qui ne tiennent pas à la plantation." },
    ],
    conseils: [
      "Ne jamais utiliser du terreau de rempotage pour les semis — trop lourd, les graines étouffent.",
      "Aérer 10 minutes par jour pour éviter la fonte des semis (maladie cryptogamique courante).",
      "Étiqueter systématiquement : toutes les plantules se ressemblent !",
    ],
    vues: 589, likes: 124, contributions: 31, tags: ["Débutant", "Semis", "Intérieur"],
  },
  {
    id: 3, icone: "📅", titre: "Calendrier des semis — mois par mois", niveau: "Référence", sousTheme: "Calendrier & saisons",
    auteur: "Communauté NIGLOMODE", initiales: "NM", ville: "France", date: "enrichi régulièrement",
    desc: "Guide mensuel des semis en intérieur et en pleine terre — enrichi en continu par la communauté.",
    etapes: [
      { titre: "Janvier – Février", desc: "En intérieur : poivrons, aubergines, céleris, oignons. Démarrage lent mais indispensable pour les espèces à longue saison de croissance." },
      { titre: "Mars", desc: "En intérieur : tomates, poireaux, laitues. En pleine terre (sous abri ou châssis) : radis, épinards, navets, carottes hâtives." },
      { titre: "Avril", desc: "En intérieur : courgettes, concombres, courges, basilic. En pleine terre : carottes, betteraves, haricots (fin avril si le gel est écarté)." },
      { titre: "Mai", desc: "Plantation des tomates, poivrons, courgettes après les Saints de Glace (11-13 mai). Semis directs : haricots verts, maïs, tournesols." },
      { titre: "Juin – Juillet", desc: "Semis pour l'automne : navets, choux d'hiver, mâche, épinards d'automne, poireaux d'hiver." },
      { titre: "Août – Septembre", desc: "Semis hivernaux : mâche, épinards, ail, oignons blancs. Préparer et amender le sol pour la saison suivante." },
    ],
    conseils: [
      "Les Saints de Glace (11, 12, 13 mai) marquent traditionnellement la fin des risques de gel en plaine.",
      "En région froide (montagne, nord), décaler tous les semis de 2 à 3 semaines par rapport aux dates standards.",
      "La lune descendante est réputée favorable aux semis de racines ; lune montante pour les feuilles et fruits.",
    ],
    vues: 821, likes: 187, contributions: 54, tags: ["Référence", "Calendrier", "Saisons"],
  },
  {
    id: 4, icone: "🌿", titre: "Associations de plantes bénéfiques", niveau: "Intermédiaire", sousTheme: "Conseils & techniques",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 2 semaines",
    desc: "Les duos et trios qui se renforcent mutuellement — et les associations à éviter absolument.",
    etapes: [
      { titre: "Tomates + Basilic", desc: "Le basilic repousse pucerons et aleurodes. Planté en pied de plants de tomates, il améliorerait aussi leur saveur selon de nombreux jardiniers." },
      { titre: "Carottes + Oignons / Poireaux", desc: "Les oignons repoussent la mouche de la carotte, les carottes repoussent la mouche de l'oignon. Bénéfice mutuel classique du jardin traditionnel." },
      { titre: "Les 3 Sœurs — Courges + Haricots + Maïs", desc: "Technique amérindienne éprouvée : le maïs tuteure les haricots, les haricots fixent l'azote, les courges couvrent le sol et étouffent les adventices." },
      { titre: "Laitue + Radis", desc: "Le radis, à croissance rapide, brise la croûte du sol et libère de l'espace. Récoltés avant que les laitues aient besoin de toute la place." },
      { titre: "Capucine — plante piège", desc: "Attire les pucerons et les détourne des cultures principales. Planter en bordure de potager pour créer une zone tampon naturelle." },
      { titre: "Associations à éviter", desc: "Oignon/ail + haricots (inhibition mutuelle). Fenouil + presque tout (allopathique — l'isoler). Choux + tomates (forte compétition racinaire)." },
    ],
    conseils: [
      "La ciboulette plantée en bordure éloigne naturellement de nombreux insectes nuisibles.",
      "La capucine n'est pas qu'une plante piège : ses fleurs et feuilles sont comestibles, au goût poivré.",
      "Éviter deux cultures de la même famille au même endroit deux années de suite — rotation obligatoire.",
    ],
    vues: 241, likes: 52, contributions: 14, tags: ["Intermédiaire", "Associations", "Conseils"],
  },
  {
    id: 5, icone: "🍅", titre: "Planter des tomates — du plant à la récolte", niveau: "Intermédiaire", sousTheme: "Potager & cultures",
    auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 5 jours",
    desc: "Tout le cycle de la tomate : plantation, taille des gourmands, arrosage, maladies et récolte.",
    materiel: ["Plants de tomates", "Tuteurs (bambou ou bois, 1,80m)", "Ficelle de raphia", "Fumure organique (corne broyée)", "Paille pour pailler"],
    etapes: [
      { titre: "Planter après les Saints de Glace", desc: "Attendre mi-mai en plaine. Planter en fosse profonde : enterrer les 2/3 du plant — des racines adventives se formeront sur la tige enfouie." },
      { titre: "Tuteurer dès la plantation", desc: "Planter le tuteur en même temps pour éviter d'abîmer les racines plus tard. Attacher la tige lâchement avec du raphia en 8." },
      { titre: "Pincer les gourmands régulièrement", desc: "Supprimer les pousses qui naissent à l'aisselle des feuilles. Indispensable pour les variétés indéterminées — sinon l'énergie part dans le feuillage." },
      { titre: "Arroser régulièrement et au pied", desc: "Arrosage irrégulier → éclatement des fruits. Toujours arroser au pied (jamais sur les feuilles) et pailler le sol pour conserver l'humidité." },
      { titre: "Surveiller le mildiou", desc: "Taches brunes + odeur de pomme de terre sur les feuilles = mildiou. Couper les feuilles atteintes. Traiter à la bouillie bordelaise en préventif dès juin." },
      { titre: "Récolter avant les gelées", desc: "Fin de saison : rentrer les tomates vertes. Elles mûrissent parfaitement à température ambiante, à l'obscurité — ne pas les mettre au réfrigérateur." },
    ],
    conseils: [
      "La tomate aime boire profondément et peu souvent — un bon arrosage hebdomadaire vaut mieux que de petits arrosages quotidiens.",
      "Conserver les semences de ses meilleures tomates : graines séchées sur papier, elles se gardent 4 à 5 ans.",
      "Variétés résistantes au mildiou : Fantasio, Crimson Crush, Ferline — utiles si vous êtes souvent absent.",
    ],
    vues: 185, likes: 52, contributions: 11, tags: ["Intermédiaire", "Tomates", "Potager"],
  },
  {
    id: 6, icone: "🌳", titre: "Taille et entretien des fruitiers", niveau: "Intermédiaire", sousTheme: "Fruitiers & aromatiques",
    auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 1 mois",
    desc: "Quand et comment tailler pommier, poirier, prunier et cerisier pour des récoltes généreuses.",
    materiel: ["Sécateur propre et bien affûté", "Scie d'élagage fine", "Cicatrisant naturel (mastic ou argile)", "Alcool à 70° (désinfection)"],
    etapes: [
      { titre: "Tailler en dormance", desc: "La taille de formation s'effectue de novembre à mars, quand l'arbre est sans feuilles. Éviter les périodes de gel intense." },
      { titre: "Aérer la couronne", desc: "Supprimer les branches qui se croisent ou poussent vers l'intérieur. Objectif : que la lumière pénètre partout — comme un verre de Bourgogne." },
      { titre: "Supprimer bois mort et gourmands", desc: "Couper ras les branches mortes et les gourmands (pousses verticales très vigoureuses, qui ne fructifient pas et épuisent l'arbre)." },
      { titre: "Couper au bon endroit", desc: "Couper juste au-dessus d'un œil orienté vers l'extérieur, en biseau à 45° dans le sens du bourgeon. Ne jamais laisser de chicot qui pourrit." },
      { titre: "Protéger les grosses plaies", desc: "Pour les coupes de plus de 3cm de diamètre, appliquer du mastic de taille ou de l'argile pour empêcher les infections fongiques." },
      { titre: "Exception : le cerisier", desc: "Ne jamais tailler le cerisier en hiver (risque de cancer bactérien). Le tailler en été, après récolte, par temps sec et ensoleillé." },
    ],
    conseils: [
      "Un sécateur mal affûté écrase les tissus plutôt que les couper — ce qui favorise les maladies.",
      "Désinfecter le sécateur entre chaque arbre pour ne pas propager les maladies fongiques ou bactériennes.",
      "En cas de doute : moins vaut mieux que trop. Un arbre peu taillé fructifie moins bien, mais un arbre trop taillé peut mourir.",
    ],
    vues: 334, likes: 71, contributions: 16, tags: ["Intermédiaire", "Fruitiers", "Taille"],
  },
  {
    id: 7, icone: "🌿", titre: "Aromatiques en pot — les 5 indispensables", niveau: "Débutant", sousTheme: "Fruitiers & aromatiques",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 1 semaine",
    desc: "Basilic, thym, romarin, menthe et ciboulette — cultiver les aromatiques essentiels en pot.",
    materiel: ["Pots avec trous de drainage (min. 20cm)", "Terreau polyvalent", "Gravier ou billes d'argile pour le drainage", "Arrosoir à pomme fine"],
    etapes: [
      { titre: "Basilic — exposition plein soleil", desc: "Jamais sous 15°C. Arroser au pied, jamais sur les feuilles. Pincer régulièrement les fleurs pour prolonger la récolte. Rentrer dès septembre." },
      { titre: "Thym — aime la sécheresse", desc: "Résiste parfaitement à la sécheresse — ne pas sur-arroser. Tailler légèrement après floraison pour maintenir la forme compacte." },
      { titre: "Romarin — grand pot et soleil", desc: "Prévoir un pot d'au moins 30cm. Craint l'excès d'eau (racines pourrissent rapidement). Rustique une fois établi, résiste au gel modéré." },
      { titre: "Menthe — isoler impérativement", desc: "Envahissante si plantée en pleine terre. Toujours en pot ou avec barrière enfouie à 30cm. Aime l'humidité et accepte la mi-ombre." },
      { titre: "Ciboulette — facile et productive", desc: "Supporte la mi-ombre. Couper régulièrement à 5cm du sol pour stimuler la repousse. Fleurs violettes comestibles et décoratives." },
    ],
    conseils: [
      "Menthe et basilic ne s'entendent pas dans le même pot : leurs besoins en eau sont opposés.",
      "Thym ou romarin placés près des tomates éloignent naturellement certains insectes nuisibles.",
      "Récolter le matin, après la rosée — les huiles essentielles sont alors à leur concentration maximale.",
    ],
    vues: 278, likes: 61, contributions: 19, tags: ["Débutant", "Aromatiques", "Balcon"],
  },
  {
    id: 8, icone: "🔄", titre: "La rotation des cultures expliquée", niveau: "Intermédiaire", sousTheme: "Conseils & techniques",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 3 semaines",
    desc: "Pourquoi et comment faire tourner ses cultures pour préserver le sol et limiter les maladies.",
    materiel: ["Plan schématique du jardin sur papier", "Cahier de suivi des cultures (essentiel)"],
    etapes: [
      { titre: "Comprendre les 4 grandes familles", desc: "Solanacées (tomates, poivrons). Cucurbitacées (courges, concombres). Légumineuses (haricots, pois). Brassicacées (choux, navets, radis). Ne jamais planter la même famille deux années de suite au même endroit." },
      { titre: "La rotation sur 4 ans", desc: "Année 1 : légumes-fruits (tomates). Année 2 : légumes-feuilles (salades). Année 3 : légumes-racines (carottes). Année 4 : légumineuses (haricots) qui rechargent l'azote." },
      { titre: "Alterner gourmands et restituants", desc: "Après une culture gourmande (tomates, choux), planter des légumineuses qui fixent l'azote atmosphérique et rechargent le sol sans engrais." },
      { titre: "Tenir un cahier de suivi", desc: "Noter chaque année ce qui a été planté où. Même un schéma simple suffit. La mémoire est insuffisante sur 4 ans — le cahier est indispensable." },
    ],
    conseils: [
      "Même dans un petit jardin : décaler d'un seul carré suffit à briser les cycles de maladies du sol.",
      "Les engrais verts (phacélie, trèfle, moutarde) semés en inter-saison enrichissent le sol et facilitent la rotation.",
      "Le fenouil est allélopathique — il inhibe la croissance de presque tout ce qui l'entoure. À isoler complètement.",
    ],
    vues: 196, likes: 43, contributions: 7, tags: ["Intermédiaire", "Sol", "Rotation"],
  },
  {
    id: 9, icone: "🪱", titre: "Préparer un sol vivant", niveau: "Intermédiaire", sousTheme: "Conseils & techniques",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 2 semaines",
    desc: "Comprendre et améliorer la vie de son sol pour jardiner sans travail inutile et sans engrais chimiques.",
    materiel: ["Compost mûr", "Paille ou feuilles mortes", "BRF (Bois Raméal Fragmenté) si possible", "Fourche-bêche (pas de bêche plate)"],
    etapes: [
      { titre: "Ne pas retourner le sol", desc: "Le bêchage classique détruit les champignons mycorhiziens et remonte en surface les graines de mauvaises herbes enfouies. Préférer l'ameublissement à la fourche-bêche." },
      { titre: "Nourrir les micro-organismes", desc: "Épandre du compost mûr en surface (3 à 5cm) sans l'incorporer. Les vers de terre et les champignons se chargeront de l'intégrer dans le sol." },
      { titre: "Couvrir le sol en permanence", desc: "Un sol nu se dessèche, se croutte et s'appauvrit. Pailler avec de la paille, des feuilles mortes ou du BRF entre et pendant les cultures." },
      { titre: "Limiter le piétinement", desc: "Créer des allées permanentes et ne jamais marcher sur les zones de culture. Le poids compacte le sol et étouffe la vie microbienne." },
      { titre: "Observer les plantes indicatrices", desc: "Vers de terre abondants = sol vivant. Chiendent = sol compacté. Rumex = sol acide et humide. Ortie = sol riche en azote. Ces plantes sont des diagnostics gratuits." },
    ],
    conseils: [
      "Un sol vivant peut ingérer l'équivalent de son propre poids en matière organique chaque jour — grâce aux vers de terre.",
      "L'ortie n'est pas une ennemie : en purin (2 semaines de macération), elle donne un activateur de croissance riche en azote.",
      "Le mulch de feuilles de chêne convient parfaitement aux fraisiers, myrtilliers et petits fruits rouges qui aiment l'acidité.",
    ],
    vues: 241, likes: 52, contributions: 14, tags: ["Intermédiaire", "Sol vivant", "Écologie"],
  },
  {
    id: 10, icone: "🥕", titre: "Semer carottes et radis — guide complet", niveau: "Débutant", sousTheme: "Semis & plantations",
    auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 4 jours",
    desc: "Deux légumes de base, idéaux pour débuter — semer, éclaircir, arroser et récolter au bon moment.",
    materiel: ["Graines de carottes et de radis", "Bâton ou manche d'outil (tracé des sillons)", "Arrosoir à pomme fine", "Sable de rivière (pour alléger pour les carottes)"],
    etapes: [
      { titre: "Préparer le sol (carottes surtout)", desc: "Ameublir à 30cm de profondeur sans cailloux ni mottes — les carottes bifurquent sur les obstacles. Mélanger avec du sable pour un sol léger et drainant." },
      { titre: "Tracer des sillons", desc: "Carottes : sillons de 1cm de profondeur, espacés de 25cm. Radis : sillons de 1cm, espacés de 10cm. Tracer avec le coin d'une planche ou un manche à balai." },
      { titre: "Semer clair", desc: "Semer en espaçant les graines d'environ 2cm pour faciliter l'éclaircissage. Les graines de carotte sont minuscules — les mélanger à du sable sec pour mieux les répartir." },
      { titre: "Couvrir, tasser et arroser", desc: "Recouvrir de 1cm de terre fine, tasser à plat avec la main, arroser en pluie très fine pour ne pas déplacer les graines. Maintenir humide jusqu'à la levée." },
      { titre: "Éclaircir au bon moment", desc: "Carottes : éclaircir à 8-10cm quand les plants font 5cm de haut. Radis : à 3-4cm. Indispensable — les légumes entassés se déforment et ne grossissent pas." },
      { titre: "Récolter au bon stade", desc: "Radis : 25 à 35 jours (ne pas attendre — ils deviennent creux et piquants). Carottes : 70 à 80 jours selon variété. Tirer en maintenant la terre pour ne pas casser." },
    ],
    conseils: [
      "Semer radis et carottes ensemble : les radis marquent les rangs et sont récoltés avant que les carottes aient besoin de l'espace.",
      "Levée difficile pour les carottes ? Poser un vieux journal humide sur le rang pendant 5 à 15 jours — maintient l'humidité de surface.",
      "Ne pas mettre de compost frais sous les carottes : elles bifurquent et développent des racines secondaires indésirables.",
    ],
    vues: 167, likes: 34, contributions: 8, tags: ["Débutant", "Carottes", "Premiers légumes"],
  },
  {
    id: 11, icone: "🌙", titre: "Calendrier Lunaire Jardin 2026 – 2027", niveau: "Référence",
    sousTheme: "Calendrier & saisons", specialType: "calendrier-lunaire",
    auteur: "Communauté NIGLOMODE", initiales: "NM", ville: "France", date: "mis à jour annuellement",
    desc: "Légende des phases lunaires et planning mois par mois pour 2026 et 2027 — quand semer, planter, récolter et tailler selon la lune.",
    etapes: [],
    conseils: [
      "Les jours 🌑 Nouvelle Lune et 🌕 Pleine Lune ± 12h : éviter toute intervention au jardin si possible.",
      "En cas de conflit entre lune et météo, la météo prime toujours — un sol détrempé ne se travaille pas.",
      "Pour les dates exactes jour par jour, croiser avec l'appli Calendrier Lunaire ou le calendrier Maria Thun.",
    ],
    vues: 634, likes: 142, contributions: 28, tags: ["Référence", "Lune", "2026", "2027"],
  },
];

const fichesRichesEau: FicheRiche[] = [
  {
    id: 12, icone: "💧", titre: "Installer un récupérateur d'eau de pluie", niveau: "Débutant", sousTheme: "Gestion de l'eau",
    auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 5 jours",
    desc: "Une solution simple pour économiser l'eau potable et gagner en autonomie au jardin.",
    materiel: ["Cuve récupérateur 300 à 1000L", "Raccord de descente de gouttière", "Robinet de puisage bas", "Couvercle anti-moustiques", "Tuyau d'arrosage ou arrosoir"],
    etapes: [
      { titre: "Choisir l'emplacement", desc: "Placer la cuve en bas de gouttière, sur terrain stable et plat. Surélever sur parpaings pour faciliter le remplissage d'arrosoir ou le raccordement d'un tuyau par gravité." },
      { titre: "Choisir le volume adapté", desc: "300L convient à un balcon ou un petit jardin. 500 à 1000L pour un potager de 30 à 80m². Prévoir grand : une bonne pluie peut remplir 300L en quelques minutes." },
      { titre: "Raccorder à la gouttière", desc: "Couper la descente de gouttière à hauteur voulue. Installer le kit collecteur fourni avec la cuve — il dévie l'eau vers la cuve et laisse déborder le surplus dans la descente." },
      { titre: "Tester et ajuster", desc: "Après la première pluie, vérifier l'étanchéité des raccords. S'assurer que le trop-plein est bien orienté vers le sol et non vers un mur ou une fondation." },
      { titre: "Entretien annuel", desc: "Vider et nettoyer la cuve chaque automne avant le gel. Vérifier le couvercle et les joints. Un voile noir sur le couvercle limite le développement d'algues." },
    ],
    conseils: [
      "L'eau de pluie récupérée n'est pas potable — exclusivement réservée à l'arrosage du jardin.",
      "Le couvercle hermétique est obligatoire : un récipient d'eau ouvert devient un gîte larvaire à moustiques en 48h.",
      "Vidanger avant l'hiver pour éviter l'éclatement de la cuve par le gel.",
    ],
    vues: 243, likes: 58, contributions: 12, tags: ["Eau", "Autonomie", "Récupération"],
  },
  {
    id: 13, icone: "🚿", titre: "Arroser moins pour produire autant", niveau: "Pratique", sousTheme: "Gestion de l'eau",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 2 semaines",
    desc: "Quelques techniques simples permettent de réduire fortement la consommation d'eau sans diminuer les récoltes.",
    materiel: ["Paillage (paille, tontes ou feuilles)", "Arrosoir ou tuyau souple", "Goutte-à-goutte (optionnel)", "Mulch organique"],
    etapes: [
      { titre: "Arroser au bon moment", desc: "Toujours le soir après 19h ou le matin avant 9h. En pleine journée, jusqu'à 60% de l'eau s'évapore avant d'atteindre les racines. L'arrosage nocturne limite aussi les risques de brûlures sur les feuilles." },
      { titre: "Arroser au pied, jamais sur les feuilles", desc: "L'eau utile va aux racines, pas aux feuilles. L'arrosage foliaire favorise les maladies cryptogamiques (mildiou, oïdium). Diriger toujours le jet au pied de la plante." },
      { titre: "Pailler généreusement", desc: "Une couche de 7 à 10cm de paillage réduit l'évaporation de 50 à 70%. Pailler autour des plants mais laisser un espace de 5cm au pied pour éviter la pourriture du collet." },
      { titre: "Adapter les cultures à la sécheresse", desc: "Regrouper par besoins en eau : laitues et épinards ensemble (besoins élevés), tomates et courgettes ensemble (besoins moyens), thym et romarin ensemble (grande sécheresse tolérée)." },
      { titre: "Tester l'humidité avant d'arroser", desc: "Enfoncer le doigt à 5cm dans le sol. Si c'est encore frais : attendre. Seule la surface sèche est trompeuse — l'humidité profonde nourrit les racines." },
    ],
    conseils: [
      "Un arrosage profond et peu fréquent (tous les 2-3 jours) est bien meilleur qu'un arrosage superficiel quotidien — il encourage les racines à plonger en profondeur.",
      "Les goutte-à-goutte consomment 30 à 50% d'eau de moins qu'un arrosoir. Même artisanal (tuyau percé), c'est un gain énorme.",
      "En période de canicule, ombrager les cultures sensibles (laitues, épinards) avec un voile ou de la paille posée dessus.",
    ],
    vues: 198, likes: 46, contributions: 9, tags: ["Eau", "Économie", "Potager"],
  },
  {
    id: 14, icone: "🪱", titre: "Comprendre son sol en quelques minutes", niveau: "Débutant", sousTheme: "Fertilité des sols",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 1 semaine",
    desc: "Avant de cultiver, il faut comprendre la nature de son terrain. Quelques gestes simples suffisent.",
    materiel: ["Une poignée de terre humide", "Un verre d'eau (optionnel)", "Bêche ou fourche pour observer en profondeur"],
    etapes: [
      { titre: "Le test du boudin", desc: "Prendre une poignée de terre légèrement humide. Tenter de former un boudin de 5mm entre les paumes. Sol argileux : boudin lisse et souple. Sol sableux : le boudin s'effrite. Sol limoneux : entre les deux." },
      { titre: "Observer la couleur", desc: "Sol sombre et riche en matière organique = bonne fertilité de base. Sol clair/beige/jaune = peu de matière organique, à enrichir. Sol rougeâtre = présence de fer, souvent bien drainé." },
      { titre: "Tester le drainage", desc: "Creuser un trou de 30cm, le remplir d'eau. S'il se vide en moins d'une heure : sol drainant (bon). S'il reste plein 24h : sol argileux compact — drainage à améliorer avant de cultiver." },
      { titre: "Lire la végétation spontanée", desc: "Les plantes sauvages sont des indicateurs précis. Ortie = sol riche. Rumex = sol acide et humide. Chiendent = sol compact. Plantain = sol compacté et piétiné. Trèfle = manque d'azote." },
    ],
    conseils: [
      "Sol argileux : difficile à travailler mais très fertile et retient bien l'humidité. L'amender avec du sable grossier et du compost.",
      "Sol sableux : facile à travailler, se réchauffe vite, mais pauvre et se dessèche rapidement. Apporter beaucoup de matière organique.",
      "Ne jamais travailler un sol détrempé : on le compacte et on détruit sa structure. Attendre qu'il soit ressuyé.",
    ],
    vues: 312, likes: 74, contributions: 18, tags: ["Sol", "Diagnostic", "Fertilité"],
  },
  {
    id: 15, icone: "🌱", titre: "Les amendements naturels du jardin", niveau: "Pratique", sousTheme: "Fertilité des sols",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 3 semaines",
    desc: "Améliorer son sol naturellement sans produits chimiques — ce que chaque amendement apporte vraiment.",
    materiel: ["Compost mûr maison ou acheté", "Fumier mûr (bovin, cheval, mouton)", "BRF — Bois Raméal Fragmenté (si disponible)", "Cendres de bois franc", "Feuilles mortes"],
    etapes: [
      { titre: "Compost — l'amendement universel", desc: "3 à 5cm en surface en automne ou au printemps. Améliore tous les types de sol : allège les sols argileux, donne de la consistance aux sols sableux. Apporte micro-organismes et nutriments de façon équilibrée." },
      { titre: "Fumier — le plus complet", desc: "Toujours fumier mûr (composté au moins 6 mois) — jamais frais, qui brûle les racines et libère de l'ammoniac. Épandre en automne, 3 à 5cm. Convient particulièrement aux cultures gourmandes : courges, tomates, choux." },
      { titre: "BRF — nourrit les champignons du sol", desc: "Copeaux de branches fraîches de moins de 7cm de diamètre. Épandre en couche de 5cm en automne. Les champignons mycorhiziens s'en nourrissent et forment un réseau racinaire très bénéfique. Ne pas incorporer — laisser en surface." },
      { titre: "Cendres — pour corriger l'acidité", desc: "Riches en potasse et calcium. Épandre très finement (200g/m² max) en saupoudrage, jamais en tas. Relèvent le pH. Déconseillées sur sols calcaires ou pour les cultures acidophiles (myrtilles, fraises)." },
      { titre: "Feuilles mortes — paillage et amendement", desc: "Broyer et épandre directement, ou incorporer au compost. Les feuilles de chêne conviennent aux fruitiers rouges. Les feuilles de tilleul, noisetier ou fruitiers sont excellentes pour les légumes." },
    ],
    conseils: [
      "Un sol bien amendé nourrit les plantes sans engrais chimiques — la fertilité naturelle est auto-entretenue si on apporte de la matière organique chaque année.",
      "L'idéal : alterner compost au printemps et fumier ou BRF en automne pour travailler la fertilité à court et long terme.",
      "Le purin d'ortie (2kg d'ortie fraîche pour 10L d'eau, 15 jours de macération) est un engrais azoté naturel et stimulant de croissance radical.",
    ],
    vues: 267, likes: 61, contributions: 14, tags: ["Sol vivant", "Amendements", "Fertilité"],
  },
  {
    id: 16, icone: "♻️", titre: "Fabriquer un composteur en palettes", niveau: "Débutant", sousTheme: "Compost & valorisation",
    auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 1 mois",
    desc: "Transformer quelques palettes récupérées en composteur efficace — robuste, gratuit et réparable.",
    materiel: ["4 palettes récupérées (de préférence EPAL marquées)", "Vis ou fil de fer galvanisé", "Carton ou géotextile pour le fond", "Piquets de bois ou ferraille (optionnel)"],
    etapes: [
      { titre: "Choisir des palettes saines", desc: "Chercher des palettes marquées EPAL (traitement thermique, non chimique). Éviter les palettes tachées de produits inconnus. 4 palettes de 120×80cm forment un bac idéal." },
      { titre: "Assembler les 4 côtés", desc: "Former un carré de 3 palettes fixes (fond et deux côtés) avec la 4ème comme porte. Solidariser les angles avec du fil de fer galvanisé ou des vis longues. L'ensemble doit être stable." },
      { titre: "Poser le fond", desc: "Tapisser le sol de quelques feuilles de carton ou d'un morceau de géotextile — sans couvrir totalement pour laisser passer les vers de terre. Poser quelques branches croisées au fond pour l'aération." },
      { titre: "Remplir en couches alternées", desc: "Alterner matières brunes (carton, paille, branches broyées, feuilles mortes) et matières vertes (tontes, épluchures, marc de café). Rapport idéal : 2/3 bruns pour 1/3 verts. Arroser légèrement si trop sec." },
      { titre: "Entretenir et récolter", desc: "Retourner une fois par mois avec une fourche pour aérer. Au bout de 3 à 6 mois : un compost sombre, friable et à l'odeur de sous-bois est prêt. Utiliser comme amendement en surface." },
    ],
    conseils: [
      "Deux compartiments côte à côte est l'idéal : un en cours de remplissage, un en maturation. On transfère d'un bac à l'autre pour aérer.",
      "Un compost trop humide sent mauvais — ajouter des matières sèches (carton, paille). Un compost trop sec ne se transforme pas — arroser.",
      "Interdire à la décharge : viande, poisson, produits laitiers et agrumes en grande quantité — ils attirent nuisibles et ralentissent le processus.",
    ],
    vues: 334, likes: 78, contributions: 22, tags: ["Compost", "Récupération", "DIY"],
  },
  {
    id: 17, icone: "🪱", titre: "Débuter un lombricompost", niveau: "Pratique", sousTheme: "Compost & valorisation",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 2 semaines",
    desc: "Produire un compost ultra-riche même avec très peu d'espace — idéal en appartement ou sur balcon.",
    materiel: ["Lombricomposteur (ou bac percé de trous en fond)", "Vers de compost — Eisenia fetida (500g minimum)", "Litière de démarrage : carton déchiré humide", "Feuilles de journal ou carton pour couvrir"],
    etapes: [
      { titre: "Installer le bac", desc: "Placer le lombricomposteur à l'intérieur (cave, garage) ou sur le balcon à l'ombre. Température idéale : 15 à 25°C. Les vers ne supportent pas le gel ni la chaleur directe." },
      { titre: "Accueillir les vers", desc: "Étaler 10cm de litière (carton déchiré en petits morceaux, humidifié) dans le bac. Déposer les vers avec leur substrat d'origine. Laisser 48h sans ajouter de nourriture — les vers doivent s'adapter." },
      { titre: "Commencer l'alimentation progressivement", desc: "La première semaine : petites quantités. Ensuite, ajouter les déchets en fines couches et couvrir d'une fine couche de carton. Les vers doublent leur population tous les 3 mois — les quantités absorbées augmentent." },
      { titre: "Surveiller l'humidité et le pH", desc: "Le bac doit être humide mais pas détrempé. Si trop humide : ajouter du carton sec. Éviter les agrumes et oignons en grande quantité (trop acides). Les coquilles d'œuf broyées neutralisent l'acidité." },
      { titre: "Récolter le lombricompost", desc: "Après 3 à 4 mois, un tas sombre et homogène se forme. Pour récolter sans trier : créer un espace sans nourriture d'un côté du bac. Les vers migrent vers la nourriture, laissant le compost pur à récolter." },
    ],
    conseils: [
      "Le lombricompost est 5 à 10 fois plus concentré en nutriments que le compost classique — l'utiliser en petites quantités au pied des plantes.",
      "Le liquide (thé de compost) récolté dans le bac inférieur est un engrais liquide puissant — diluer 1 volume pour 10 volumes d'eau.",
      "Jamais de viande, poisson, produits laitiers, citrus en grande quantité, ail ou oignon — les vers fuient et le bac prend une odeur horrible.",
    ],
    vues: 289, likes: 67, contributions: 19, tags: ["Compost", "Vers", "Valorisation"],
  },
  {
    id: 18, icone: "🌾", titre: "Les différents paillages et leurs avantages", niveau: "Débutant", sousTheme: "Paillage & couverture",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 3 jours",
    desc: "Chaque paillage a ses avantages selon les cultures et le climat — le bon choix change tout.",
    materiel: ["Paille de blé ou d'orge", "Foin ou tontes de gazon séchées", "Feuilles mortes broyées", "BRF ou copeaux de bois", "Carton (démarrage)"],
    etapes: [
      { titre: "Paille — le paillage classique du potager", desc: "Excellente isolation thermique et hydrique. Poser 8 à 10cm au pied des tomates, courgettes, courges. Légèreté et facilité de pose. Peut introduire quelques graines d'herbes — en général peu problématique." },
      { titre: "Tontes séchées — à valoriser sur place", desc: "Sécher les tontes 2 à 3 jours avant d'épandre pour éviter le pourrissement. Couche mince : 3 à 4cm (risque de feutrage si trop épais). Riche en azote — excellent pour légumes feuilles." },
      { titre: "Feuilles mortes — abondantes et gratuites", desc: "Idéales pour les allées et les arbres et arbustes. Éviter de pailler directement les légumes avec des feuilles entières (feutrage). Les broyer ou les mélanger à de la paille pour améliorer l'aération." },
      { titre: "BRF et copeaux — le long terme", desc: "Couche de 5 à 7cm autour des arbres, arbustes et vivaces. Nourrit le sol sur le long terme (2 à 5 ans). Éviter au contact direct des tiges et collets des légumes annuels." },
      { titre: "Carton — la méthode No-Dig", desc: "Poser du carton (sans plastique ni agrafes) directement sur les mauvaises herbes. Recouvrir de paillage ou de compost. Le carton se décompose en 6 à 12 mois en nourrissant le sol — méthode parfaite pour créer un nouveau carré potager." },
    ],
    conseils: [
      "Le bon paillage fait gagner 30 à 60 minutes d'arrosage par semaine en été — c'est une des modifications les plus rentables du jardin.",
      "Laisser toujours 5cm dégagés autour des tiges et collets : le contact du paillage humide favorise la pourriture.",
      "En hiver, un paillage épais protège les racines des vivaces et légumes résistants du gel jusqu'à -10°C environ.",
    ],
    vues: 211, likes: 49, contributions: 13, tags: ["Paillage", "Protection", "Potager"],
  },
  {
    id: 20, icone: "💧", titre: "Récupérer l'eau du brouillard et de la rosée", niveau: "Débutant", sousTheme: "Gestion de l'eau",
    specialType: "experimentation",
    auteur: "Créateur du Terrier", initiales: "NT", ville: "France", date: "en cours d'observation",
    desc: "Tendre des filets dans une zone exposée aux vents humides. La nuit, la rosée se condense sur les mailles, ruisselle vers une gouttière, puis rejoint un réservoir. Une idée simple et fascinante — pas encore réalisée ici, mais en cours d'observation.",
    etapes: [
      { titre: "Le principe des filets collecteurs", desc: "Des filets à mailles fines sont tendus face aux vents humides ou dans des zones de brouillard fréquent. Pendant la nuit et le petit matin, la vapeur d'eau se condense sur les fils. Les gouttelettes grossissent, se rejoignent et ruissellent le long du filet vers une gouttière basse." },
      { titre: "Ce que ça donne dans le monde", desc: "Cette technique existe déjà dans plusieurs régions arides : Chili, Maroc, Oman, Canaries. Des filets de quelques mètres carrés peuvent collecter plusieurs litres par nuit lors de forts épisodes de brouillard. Les maillages les plus efficaces sont en polypropylène tissé fin (30% de taux d'ombrage)." },
      { titre: "Ce que j'aimerais tester sur le Terrier", desc: "L'objectif n'est pas forcément de couvrir tous les besoins en eau du jardin. Plutôt de comprendre ce que la nature peut offrir quand on observe ses mécanismes. Une première installation simple avec un filet anti-grêle récupéré, une gouttière de gouttière en PVC et une petite cuve suffirait pour mesurer les quantités récoltées sur une saison." },
      { titre: "Conditions favorables à observer", desc: "Zones en légère dépression ou exposées au vent dominant. Nuits fraîches après journées chaudes (fort écart thermique). Présence régulière de brouillard ou de rosée. Végétation qui se couvre de gouttelettes chaque matin = bon indicateur de potentiel." },
    ],
    conseils: [
      "Si tu as déjà testé ce type de système — même artisanal — ton retour d'expérience est précieux pour toute la communauté.",
      "Une observation simple suffit pour démarrer : une toile d'araignée chargée de rosée le matin, un filet de jardin humide, c'est déjà une donnée utile.",
      "Le Terrier grandit aussi grâce aux essais, aux réussites et parfois aux erreurs de chacun. Partagez vos essais.",
    ],
    vues: 0, likes: 0, contributions: 0, tags: ["Eau", "Brouillard", "Rosée", "Expérimentation"],
  },
  {
    id: 19, icone: "🌍", titre: "Garder un sol fertile toute l'année", niveau: "Pratique", sousTheme: "Paillage & couverture",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 1 semaine",
    desc: "Un sol vivant ne doit jamais rester nu. Les pratiques simples qui construisent la fertilité sur le long terme.",
    materiel: ["Engrais verts (phacélie, trèfle blanc, moutarde, seigle)", "Compost", "Paille pour pailler l'inter-saison"],
    etapes: [
      { titre: "Ne jamais laisser le sol nu", desc: "Un sol nu se dessèche, se croutte, se lessive par la pluie et perd sa vie. Dès qu'une culture est récoltée : semer un engrais vert ou couvrir de paillage en attendant la prochaine plantation." },
      { titre: "Semer des engrais verts en inter-saison", desc: "Phacélie et moutarde en été/automne (2-4 semaines de pousse suffisent). Seigle et féverole pour l'hiver. Trèfle pour les parcelles laissées en repos prolongé. Faucher avant la montée à graine, laisser sur place." },
      { titre: "Nourrir les micro-organismes", desc: "Épandre 3cm de compost en surface chaque printemps. Ne pas incorporer — laisser les vers faire le travail. La matière organique en surface est le moteur de toute la vie du sol." },
      { titre: "Pratiquer la rotation rigoureusement", desc: "Alterner familles de légumes pour ne pas épuiser le même type de nutriments. Après une culture gourmande (tomates, choux) : légumineuses (haricots, pois, fèves) pour recharger l'azote naturellement." },
      { titre: "Observer le sol régulièrement", desc: "Vers de terre abondants = sol vivant et en bonne santé. Peu de vers, sol compact = problème de tassement ou de pH. Un sol fertile est noir, friable, avec une odeur de sous-bois — si ce n'est pas le cas, il demande de l'attention." },
    ],
    conseils: [
      "La méthode des engrais verts + paillage permanent est plus efficace que n'importe quel engrais chimique — et gratuite la deuxième année.",
      "Un sol sain nourrit ses plantes seul. La vraie récompense d'un jardin en sol vivant : de moins en moins de travail et de plus en plus de récoltes.",
      "Photographier son jardin à la même période chaque année — la progression du sol vivant devient visible en 2 à 3 saisons.",
    ],
    vues: 178, likes: 41, contributions: 11, tags: ["Sol vivant", "Fertilité", "Autonomie"],
  },
];

const fichesRichesElevage: FicheRiche[] = [
  {
    id: 21, icone: "🐔", titre: "Débuter avec 3 poules au jardin", niveau: "Débutant", sousTheme: "Basse-cour",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 2 semaines",
    desc: "3 poules suffisent pour une famille. 2 à 3 œufs par jour, déchets de cuisine valorisés, jardin enrichi. Zéro diplôme requis.",
    materiel: ["Poulailler (min 0,5m² intérieur/poule)", "Enclos grillagé (min 3m² par poule)", "Mangeoire et abreuvoir", "Litière : paille ou copeaux de bois", "Granulés ponte bio pour démarrer"],
    etapes: [
      { titre: "Choisir ses 3 poules", desc: "Privilégier des races rustiques adaptées à l'extérieur. Acheter des poules à la ponte (4-5 mois) auprès d'un éleveur local plutôt qu'en animalerie. Éviter les races ornementales pour commencer." },
      { titre: "Installer le poulailler AVANT leur arrivée", desc: "Tout doit être prêt : litière propre, perchoirs en place, pondoir sombre et calme, abreuvoir rempli. Les poules repèrent leur espace la première nuit — elle est déterminante." },
      { titre: "La première semaine d'acclimatation", desc: "Garder les poules dans l'enclos 3 à 4 jours avant de les laisser sortir librement. Elles doivent identifier le poulailler comme leur refuge. Sinon elles pondront n'importe où." },
      { titre: "Trouver le rythme quotidien", desc: "5 minutes le matin : ouvrir la trappe, vérifier l'eau et la nourriture, ramasser les œufs. 5 minutes le soir : refermer la trappe (protège du renard). C'est tout — une fois lancé, c'est automatique." },
      { titre: "Gérer les premières semaines d'œufs", desc: "Les œufs se conservent 3 semaines à température ambiante pointe en bas. Pas besoin de réfrigérateur. Une poule adulte pond 4 à 6 œufs par semaine selon la race et la saison." },
    ],
    conseils: [
      "Action pour cette semaine : mesure l'espace disponible dans ton jardin et contacte un éleveur local pour voir ses poules avant d'acheter.",
      "Le coût mensuel pour 3 poules tourne autour de 5 à 8€ de granulés. Les épluchures, herbes et restes de jardin réduisent ce coût de moitié.",
      "Les poules sont grégaires — une seule poule seule souffre. Trois est le minimum, cinq est idéal.",
    ],
    vues: 441, likes: 89, contributions: 23, tags: ["Poules", "Débutant", "Jardin"],
  },
  {
    id: 22, icone: "🐣", titre: "Les races les plus adaptées aux débutants", niveau: "Débutant", sousTheme: "Basse-cour",
    auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 1 mois",
    desc: "Tout ne se vaut pas. Certaines races sont douces, rustiques et pondeuses régulières. D'autres exigent de l'expérience.",
    etapes: [
      { titre: "Sussex — la plus recommandée pour débuter", desc: "Douce, curieuse, très peu agressive. Ponte régulière : 200 à 250 œufs/an d'œufs crème. Supporte bien le froid et les sols boueux. La race idéale pour les enfants aussi." },
      { titre: "Marans — rustique et bonne pondeuse", desc: "Très robuste, supporte les hivers rudes. Pond 150 à 180 œufs brun foncé (très caractéristiques). Caractère tranquille. Facile à nourrir, peu exigeante en aménagements." },
      { titre: "Australorp — la championne de ponte", desc: "Record mondial : 364 œufs en 365 jours. Dans des conditions normales : 250 à 280 œufs/an. Très calme et sociable. Une excellente pondeuse même en hiver." },
      { titre: "Plymouth Rock — polyvalente et facile", desc: "Chair et ponte (180 à 200 œufs/an). Caractère placide, s'adapte bien aux petits espaces. Résistante aux maladies. Bonne première race si on veut aussi de la viande." },
      { titre: "Races à éviter pour commencer", desc: "Padoue, Soie/Silkie : trop sensibles à l'humidité. Leghorn : excellente pondeuse mais nerveuse et difficile à apprivoiser. Brahma : très belle mais lente à maturité. Attendez d'avoir de l'expérience." },
    ],
    conseils: [
      "Action concrète : visite une ferme ou un éleveur cette semaine pour voir les races en vrai avant de décider. Une race que tu touches et observes te parlera toujours plus qu'une fiche technique.",
      "Pour débuter : choisir UNE seule race. Le mélange de races peut créer des tensions dans le groupe au démarrage.",
      "Les races mixtes (chair + ponte) sont le meilleur choix pour l'autonomie : en cas d'arrêt de ponte, l'animal a une autre valeur.",
    ],
    vues: 287, likes: 63, contributions: 17, tags: ["Races", "Choix", "Poules"],
  },
  {
    id: 23, icone: "🛖", titre: "Construire un poulailler simple et économique", niveau: "Pratique", sousTheme: "Basse-cour",
    auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 3 semaines",
    desc: "Un poulailler fonctionnel pour 4 à 6 poules. Bois de récupération, quelques vis et une journée de travail.",
    materiel: ["Planches ou panneaux OSB (récup ou neufs)", "Vis inox 50mm", "Grillage soudé (mailles max 25×25mm)", "Charnières robustes × 2", "Verrou à pêne (anti-fouine)", "Peinture glycéro brun (protection)"],
    etapes: [
      { titre: "Dimensionner correctement", desc: "Espace intérieur couvert : min 0,5m² par poule. Pour 4 poules : caisse de 100×80×80cm suffit. Hauteur suffisante pour pouvoir nettoyer confortablement. Perchoir à 50cm du sol." },
      { titre: "Construire la caisse", desc: "Cadre en tasseau 45×45mm, habillage panneaux OSB 10mm ou planches rabotées. Vissage inox pour résister à l'humidité. Peinture brun glycéro à l'extérieur — évite la pourriture sur 10 à 15 ans." },
      { titre: "Installer le pondoir", desc: "Boite sombre et calme dans un coin surélevé (40cm du sol). Dim : 35×35cm par poule. Mettre de la paille au fond. Une trappe extérieure pour ramasser les œufs sans entrer dans le poulailler est un vrai confort." },
      { titre: "Monter les perchoirs", desc: "Rondins ou barres de 5cm de diamètre, à 50-60cm du sol. Espace : 25cm par poule minimum. Les poules dorment toujours en hauteur — si pas de perchoir, elles dorment dans le pondoir et le souillent." },
      { titre: "Assembler l'enclos", desc: "Grillage soudé 25×25mm (résiste à la fouine contrairement au grillage à poules classique). Enterrer à 30cm sur tout le périmètre (empêche les creuseurs). Couvrir le dessus avec filet ou grillage contre les rapaces." },
    ],
    conseils: [
      "Action : dessine ton poulailler sur papier aujourd'hui. Mesure l'espace disponible, compte les poules prévues, note les matériaux. Le plan papier évite 80% des erreurs.",
      "Le verrou anti-fouine est obligatoire. La fouine ouvre en quelques secondes les loquets classiques. Utiliser un verrou à pêne coulissant horizontal.",
      "Un poulailler récupération (palettes + bâches) fonctionne très bien — la priorité est la solidité du grillage, pas l'esthétique du poulailler.",
    ],
    vues: 312, likes: 74, contributions: 21, tags: ["DIY", "Construction", "Récup"],
  },
  {
    id: 24, icone: "🐝", titre: "Installer sa première ruche", niveau: "Débutant", sousTheme: "Apiculture",
    auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 1 mois",
    desc: "Se lancer en apiculture demande une préparation sérieuse — mais le premier été est accessible à tous avec les bons appuis.",
    materiel: ["Ruche Dadant ou Langstroth (10 cadres)", "Combinaison complète + voile", "Enfumoir et combustible (carton, paille)", "Lève-cadre et brosse à abeilles", "Nucléus ou essaim naturel pour démarrer"],
    etapes: [
      { titre: "Se former AVANT tout le reste", desc: "Obligatoire. Contacter le syndicat apicole du département — les formations débutants coûtent 100 à 200€ et incluent souvent des visites pratiques. L'apiculture sans formation, c'est perdre sa colonie la première année." },
      { titre: "Choisir l'emplacement", desc: "Plein sud ou sud-est. À l'abri du vent dominant. Pas en plein couloir de passage humain ou animal. À plus de 5m des clôtures voisines. Accès facile toute l'année (même après la tonte ou sous la neige)." },
      { titre: "Obtenir son premier essaim", desc: "Nucléus chez un apiculteur local (4-5 cadres déjà peuplés avec reine marquée) : la solution la plus fiable. Essaim naturel récupéré : gratuit mais plus technique. Éviter les essaims d'origine inconnue." },
      { titre: "La première visite de ruche", desc: "Choisir un jour ensoleillé sans vent, en début d'après-midi (max d'abeilles aux champs). Enfumer légèrement l'entrée et sous le couvercle. Observer calme, sans gestes brusques. Chercher la reine ou ses oeufs : preuve que la colonie est saine." },
      { titre: "Suivre la colonie les premières semaines", desc: "Une visite toutes les 2 semaines suffit au printemps/été. Vérifier : présence du couvain, réserves de miel et pollen, absence de signes de maladie (couvain perforé = loque). Prendre des notes à chaque visite." },
    ],
    conseils: [
      "Action cette semaine : cherche 'syndicat apicole + [ton département]' en ligne et inscris-toi à la prochaine réunion d'info ou journée de formation.",
      "Declarer sa ruche en mairie est obligatoire en France (gratuit, en ligne sur le SIGAL). À faire dans les 15 jours après installation.",
      "La première année : objectif zéro récolte. Laisser toutes les réserves à la colonie pour un hivernage réussi. La récolte commence la deuxième année.",
    ],
    vues: 334, likes: 71, contributions: 16, tags: ["Apiculture", "Ruche", "Débutant"],
  },
  {
    id: 25, icone: "🌸", titre: "Comprendre le rôle des abeilles au jardin", niveau: "Débutant", sousTheme: "Apiculture",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 2 semaines",
    desc: "La ruche au jardin, c'est d'abord 70% de pollinisation en plus avant d'être du miel. Et ça change tout.",
    etapes: [
      { titre: "La pollinisation, le vrai service rendu", desc: "70% des espèces cultivées dépendent des insectes pollinisateurs. Tomates, courgettes, haricots, fraises, fruitiers : sans pollinisation, pas de fruit. Une ruche à moins de 3km multiplie les rendements de façon visible dès la première saison." },
      { titre: "La ruche comme indicateur de santé du jardin", desc: "Les abeilles sont sensibles aux pesticides, fongicides et herbicides. Une colonie qui dépérit signale souvent un problème dans l'environnement immédiat. Observer le comportement à l'entrée de la ruche est déjà une information précieuse." },
      { titre: "Accueillir les abeilles sans ruche", desc: "Un hôtel à insectes (tiges creuses, blocs de bois percés) attire les abeilles solitaires — osmies et halictes — aussi efficaces que les abeilles domestiques pour polliniser. Zéro entretien, zéro risque." },
      { titre: "Planter pour les abeilles (et le jardin)", desc: "Phacélie, bourrache, mélisse, thym en fleur, lavande, tournesol, trèfle blanc en engrais vert. Ces plantes attirent les pollinisateurs ET enrichissent le sol. Un jardin mellifère travaille en continu pour tout l'écosystème." },
    ],
    conseils: [
      "Action immédiate : sème ce soir quelques graines de bourrache ou de phacélie dans un pot sur ton balcon ou en jardinière. Résultat visible en 3 semaines.",
      "La bourrache est comestible (fleurs en salade), mellifère, facile à semer et se ressème seule. Difficile de faire mieux rapport service/effort.",
      "Éviter tout traitement (même 'bio') quand les fleurs sont ouvertes — c'est là que les abeilles butinent.",
    ],
    vues: 256, likes: 58, contributions: 14, tags: ["Abeilles", "Pollinisation", "Jardin"],
  },
  {
    id: 26, icone: "⚠️", titre: "Les erreurs fréquentes du débutant en apiculture", niveau: "Pratique", sousTheme: "Apiculture",
    auteur: "Jean-Paul B.", initiales: "JP", ville: "Toulouse", date: "il y a 3 semaines",
    desc: "La plupart des premières colonies sont perdues à cause des mêmes erreurs. Les connaître évite de les commettre.",
    etapes: [
      { titre: "Erreur N°1 : se lancer sans formation", desc: "L'apiculture intuitive tue les colonies. Une ruche non suivie correctement meurt de Varroa, d'essaimage non géré ou de famine. La formation de 2 jours coûte 150€ et peut éviter la perte d'une colonie à 250€." },
      { titre: "Erreur N°2 : ouvrir la ruche trop souvent", desc: "Visiter toutes les semaines stresse la colonie. Les abeilles passent des heures à refaire la propolis et à recalibrer la chaleur après chaque ouverture. Toutes les 10 à 15 jours suffit au printemps — moins en été, jamais en hiver." },
      { titre: "Erreur N°3 : négliger Varroa", desc: "Varroa destructor est le parasite qui décime les ruches non traitées. Sans traitement, une colonie meurt en 2 à 3 ans. Traitement obligatoire : acide oxalique en hiver (sur couvain absent), thymol au printemps/automne." },
      { titre: "Erreur N°4 : mal préparer l'hivernage", desc: "En octobre : vérifier que la ruche a assez de réserves (min 15kg de miel). Réduire l'entrée (souris !). Protéger du vent. Ne pas ouvrir entre novembre et février. Une ruche bien hivernée repart en force au printemps." },
      { titre: "Erreur N°5 : acheter un essaim d'origine inconnue", desc: "Un essaim sans certificat sanitaire peut introduire la loque américaine (maladie légalement déclarée, incurable — la ruche doit être brûlée). Toujours acheter chez un apiculteur déclaré avec carnet sanitaire à jour." },
    ],
    conseils: [
      "Tiens un carnet de ruche depuis la première visite. Date, météo, comportement, observations, traitements. Ce document vaut de l'or quand tu cherches la cause d'un problème.",
      "Rejoindre un groupe apicole local avant d'avoir sa ruche : les apiculteurs expérimentés aident volontiers les débutants et permettent souvent d'accompagner leurs visites.",
      "En cas de doute : ne rien faire et appeler un apiculteur expérimenté. Fermer la ruche vaut mieux qu'une intervention maladroite.",
    ],
    vues: 398, likes: 93, contributions: 28, tags: ["Apiculture", "Erreurs", "Débutant"],
  },
  {
    id: 27, icone: "🐇", titre: "Élever des lapins pour l'autonomie familiale", niveau: "Débutant", sousTheme: "Petits animaux",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 2 semaines",
    desc: "2 lapines et 1 lapin peuvent fournir 40 à 60 kg de viande par an. Élevage accessible, économique et peu bruyant.",
    materiel: ["Clapiers individuels pour lapines (min 70×50cm)", "Boites de mise bas (une par lapine)", "Mangeoires et abreuvoirs", "Foin de qualité", "Granulés lapins (complément)"],
    etapes: [
      { titre: "Comprendre le cycle de base", desc: "Une lapine peut avoir 4 à 5 portées par an de 6 à 10 lapereaux. Sevrage à 28-30 jours. Abattage à 10-12 semaines. Une lapine bien conduite produit 25 à 30 kg de viande par an. Avec 2 lapines : 50 à 60 kg." },
      { titre: "Choisir ses animaux de départ", desc: "Acheter auprès d'un éleveur local (pas en animalerie). Races recommandées : Californien, Néo-Zélandais, Fauve de Bourgogne. Races moyennes (3-4 kg adulte) : bon rapport taille/consommation pour l'élevage familial." },
      { titre: "Installer les clapiers", desc: "Un clapier par lapine adulte (elles se battent ensemble). Le lapin mâle dans son clapier séparé. Sol grillagé ou plancher solide avec litière (paille). À l'abri du vent et du soleil direct — les lapins craignent la chaleur." },
      { titre: "Premier sevrage et sélection", desc: "À 28 jours : séparer les lapereaux de la mère dans un parc collectif. Conserver les femelles les plus vigoreuses pour le renouvellement. Les mâles et femelles excédentaires vont à l'engraissement. Renouveler les lapines tous les 2-3 ans." },
      { titre: "Valoriser les déjections au jardin", desc: "Le fumier de lapin est l'un des meilleurs engrais du jardin — riche en azote et phosphore, peu brûlant contrairement au fumier de volaille. Épandre directement ou composter avec les déchets végétaux." },
    ],
    conseils: [
      "Action immédiate : contacte un éleveur de lapins dans ta région cette semaine et demande à visiter. Voir les conditions d'élevage avant d'acheter évite 90% des mauvaises surprises.",
      "Le lapin est l'un des animaux d'élevage les plus discrets — idéal en zone périurbaine. Zéro voisin dérangé contrairement aux poules.",
      "Règle d'or : ne jamais élever des lapins seuls s'il n'y a pas de perspective d'abattage. La surcapacité crée des problèmes de bien-être et de gestion.",
    ],
    vues: 223, likes: 51, contributions: 13, tags: ["Lapins", "Viande", "Autonomie"],
  },
  {
    id: 28, icone: "🥕", titre: "Besoins essentiels des lapins toute l'année", niveau: "Pratique", sousTheme: "Petits animaux",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 1 semaine",
    desc: "Un lapin mal nourri ou stressé ne grossit pas, ne reproduit pas et tombe malade. Quelques règles simples changent tout.",
    etapes: [
      { titre: "Alimentation de base : le foin d'abord", desc: "Foin à volonté en permanence — c'est l'aliment N°1. Il régule le transit, use les dents et occupe l'animal. Un lapin sans foin fait de la stase digestive (urgence vétérinaire). Granulés : 80 à 100g/jour pour un adulte." },
      { titre: "Les légumes et plantes du jardin", desc: "Carottes, feuilles de betterave, chou, brocoli, pissenlit, orties (séchées), herbes aromatiques. Toujours introduire progressivement pour éviter les diarrhées. Éviter : rhubarbe, pomme de terre crue, avocat, oignon." },
      { titre: "Eau fraîche toujours disponible", desc: "Un lapin adulte boit 200 à 500ml d'eau par jour. En été, jusqu'à 1L. L'abreuvoir (bille ou bol) doit être nettoyé quotidiennement. Un lapin déshydraté refuse de manger et peut mourir en quelques heures." },
      { titre: "Été : protéger de la chaleur impérativement", desc: "Au-dessus de 25°C, les lapins souffrent. Au-dessus de 32°C, ils peuvent mourir (coup de chaleur). Mettre des bouteilles d'eau congelées dans le clapier. Ombre et ventilation indispensables. Déplacer sous un arbre si possible." },
      { titre: "Hiver : protéger du vent et de l'humidité", desc: "Les lapins supportent le froid sec mais pas le courant d'air humide. Calfeutrer les côtés exposés au vent avec de la paille ou une bâche. Augmenter la ration de foin — la digestion génère de la chaleur." },
    ],
    conseils: [
      "Ce soir, vérifie que tes lapins (ou ceux que tu prévois d'avoir) ont accès à du foin, de l'eau fraîche et un abri. Ces 3 points couvrent 80% des soins quotidiens.",
      "Le lapin mange ses propres caecotrophes (petites crottes molles) directement à l'anus — c'est normal et essentiel. Ne jamais nettoyer le clapier trop fréquemment : le stress affecte ce comportement.",
      "Peser les lapins à l'engraissement toutes les semaines. Un lapin qui ne prend pas de poids signale un problème d'alimentation ou de santé.",
    ],
    vues: 178, likes: 42, contributions: 11, tags: ["Lapins", "Alimentation", "Soins"],
  },
  {
    id: 29, icone: "🏡", titre: "Clapier ou parcours extérieur — que choisir ?", niveau: "Débutant", sousTheme: "Petits animaux",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 4 jours",
    desc: "Les deux systèmes ont leurs avantages. Tout dépend de ton espace, du niveau de prédation local et du type d'élevage.",
    etapes: [
      { titre: "Le clapier classique — contrôle et sécurité", desc: "Chaque lapin dans son clapier individuel. Avantages : contrôle de l'alimentation, suivi individuel, protection totale des prédateurs, reproductions maîtrisées. Inconvénient : coût des clapiers, nettoyage régulier obligatoire." },
      { titre: "Le parcours sur herbe — bien-être et économies", desc: "Lapins sur herbe dans un enclos grillagé déplaçable. Ils broutent l'herbe (réduit les coûts d'alimentation de 30-40%), font de l'exercice, ont un bien-être supérieur. Inconvénient : risque prédateurs, reproduction non maîtrisée si mélange." },
      { titre: "Le système mixte — le meilleur des deux", desc: "Clapiers individuels pour les reproducteurs. Parc collectif pour les lapereaux à l'engraissement avec accès à l'herbe. Ce système combine sécurité reproductive et bien-être animal." },
      { titre: "Sécuriser contre le renard et la martre", desc: "Renard : enterrer le grillage à 30cm ET rabattre un L horizontal de 20cm vers l'extérieur sous terre. Martre : grillage à mailles ≤20×20mm. Verrou à pêne sur chaque porte. Contrôle CHAQUE soir avant la nuit." },
    ],
    conseils: [
      "Action cette semaine : observe ton terrain. Y a-t-il des traces de renard ou martre dans le coin ? Interroge les voisins. Ce diagnostic conditionne tout ton choix de système.",
      "Un renard patient teste une clôture pendant des semaines avant de trouver la faiblesse. Le point faible est presque toujours la porte ou le fond du grillage (creusage).",
      "Déplacer le parcours extérieur toutes les 2 semaines sur herbe fraîche — hygiène, qualité d'herbe, et les lapins adorent explorer un nouvel espace.",
    ],
    vues: 167, likes: 39, contributions: 10, tags: ["Lapins", "Enclos", "Sécurité"],
  },
  {
    id: 30, icone: "🌾", titre: "Produire une partie de l'alimentation sur place", niveau: "Pratique", sousTheme: "Alimentation & soins",
    auteur: "Sophie L.", initiales: "SL", ville: "Bordeaux", date: "il y a 3 semaines",
    desc: "Un élevage autonome ne dépend pas entièrement du sac de granulés. Ce qu'on peut produire soi-même change l'équation.",
    etapes: [
      { titre: "Maïs et céréales pour les poules", desc: "Semer du maïs grain, tournesol et sorgho dans un coin du jardin. Un rang de tournesol (10m) produit 3 à 5 kg de graines — les poules adorent. Le maïs peut remplacer 30% des granulés en hiver. Stocker en épis séchés dans un grenier aéré." },
      { titre: "Les surplus de légumes du potager", desc: "Épluchures, fanes de carottes, feuilles de choux abîmées, courgettes trop grandes, tomates non vendables — tout part aux poules ou aux lapins. Rien n'est perdu. Les animaux transforment les déchets du potager en fumier pour le potager." },
      { titre: "Planter pour les abeilles toute l'année", desc: "Haie mellifère : tilleul, bourdaine, saule, prunellier, noisetier. Annuelles : phacélie, bourrache, moutarde. Le but : avoir une floraison continue de mars à novembre. Une haie mellifère bien choisie réduit l'apport de nourriture d'urgence en hiver." },
      { titre: "Herbes aromatiques médicinales pour les animaux", desc: "Thym, origan, ail, sauge ont des propriétés antiparasitaires naturelles. Ajouter régulièrement au foin ou dans la mangeoire. Pas de guérison miracle — mais une amélioration réelle de la résistance aux parasites courants." },
      { titre: "La lentille d'eau pour les canards (si applicable)", desc: "Lemna (lentille d'eau) se multiplie très rapidement dans un bassin ou bac d'eau douce. Excellente protéine végétale pour les canards et oies. Un bac de 2m² peut produire l'équivalent de 500g de protéines par semaine." },
    ],
    conseils: [
      "Commence cette saison avec 3 rangs de tournesol et un carré de phacélie. En septembre, tu récolteras graines pour les poules et observeras tes premières abeilles sur les fleurs.",
      "Le circuit court ultime : potager → déchets aux animaux → fumier au potager. Ce cycle se met en place progressivement et réduit les coûts d'alimentation de 30 à 50% en 2 ans.",
      "Ne pas produire 100% de l'alimentation la première année — construire progressivement. L'autonomie totale demande une organisation rodée.",
    ],
    vues: 243, likes: 57, contributions: 15, tags: ["Autonomie", "Alimentation", "Autoproduction"],
  },
  {
    id: 31, icone: "👁", titre: "Reconnaître les signes de bonne santé", niveau: "Débutant", sousTheme: "Alimentation & soins",
    auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 1 semaine",
    desc: "Un animal en bonne santé ça se voit au premier coup d'œil quand on sait quoi regarder. Ce repère change tout.",
    etapes: [
      { titre: "La poule en bonne santé", desc: "Crête rouge vif (pâle = anémie ou maladie). Plumes lisses et brillantes (ébouriffées = froid ou maladie). Yeux vifs et ronds. Active le matin. Selles normales : partie solide + partie blanche (urates). Toute anomalie durable mérite attention." },
      { titre: "Le lapin en bonne santé", desc: "Yeux clairs et brillants. Poil lisse, propre, sans zones chauves. Selles rondes et bien formées (molles ou absentes = urgence). Consomme son foin et son eau normalement. Actif le soir (animal crépusculaire — le calme diurne est normal)." },
      { titre: "L'abeille / la colonie en bonne santé", desc: "Va-et-vient intense à l'entrée. Abeilles revenant chargées de pollen coloré. Aucun cadavre en grande quantité devant la ruche. Ronronnement régulier (pas de bourdonnement agité). Couvain compact et nacré à l'ouverture." },
      { titre: "Les signaux d'alerte à ne jamais ignorer", desc: "Animal isolé qui ne mange plus. Diarrhée persistante. Difficulté respiratoire. Gonflements. Plumes très ébouriffées et immobilité. Perte de poids rapide. Ces signaux demandent une observation rapprochée et souvent une consultation." },
      { titre: "Tenir un carnet de suivi", desc: "Noter une fois par semaine : comportement général, consommation, apparence. En 2 mois, tu connais la 'normale' de tes animaux. Le vétérinaire te demandera toujours ces informations — et ce carnet lui permettra de diagnostiquer bien plus vite." },
    ],
    conseils: [
      "Action ce soir : observe tes animaux 5 minutes sans rien faire d'autre. Note mentalement (ou par écrit) comment ils se comportent. Ce geste répété chaque soir te rendra expert en 3 mois.",
      "La majorité des problèmes détectés tôt se règlent seuls ou avec un traitement simple. Détectés trop tard, ils nécessitent un vétérinaire et parfois perdre l'animal.",
      "L'œil du matin est décisif : les animaux malades se remarquent le plus facilement au réveil, avant que la dynamique du groupe ne masque leur état.",
    ],
    vues: 312, likes: 72, contributions: 19, tags: ["Santé", "Observation", "Prévention"],
  },
  {
    id: 32, icone: "🌿", titre: "Prévenir plutôt que guérir", niveau: "Pratique", sousTheme: "Alimentation & soins",
    auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 2 semaines",
    desc: "La médecine préventive en élevage, c'est 90% d'hygiène et 10% d'observation. Aucun diplôme requis.",
    etapes: [
      { titre: "Hygiène régulière de la litière", desc: "Changer la litière du poulailler entièrement 1 fois par mois minimum (partial toutes les 2 semaines). Pour les lapins : litière sèche toujours. Un poulailler humide = parasites, coccidies, maladies respiratoires. L'humidité est le facteur N°1 de maladies." },
      { titre: "Plantes antiparasitaires naturelles", desc: "Ail cru haché dans l'eau des poules (un demi-gousse par litre, 1 semaine par mois). Thym et origan séchés dans le foin des lapins. Courge : les graines de courge sont vermifuges naturels. Ces pratiques ne remplacent pas un traitement si infestation réelle." },
      { titre: "Quarantaine des nouveaux animaux", desc: "Tout animal introduit dans un élevage établi doit être isolé 15 à 21 jours dans un espace séparé. Il peut être porteur sain de coccidies, myxomatose, IHV (lapins) ou typhose (poules). La quarantaine protège tout le troupeau." },
      { titre: "Traitements préventifs utiles", desc: "Poules : poudre antiparasitaire naturelle (terre de diatomée) dans la litière et le bain de poussière. Lapins : vérification parasites tous les 2 mois (gale des oreilles). Abeilles : traitement Varroa obligatoire 2× par an. Pas de médicaments en préventif sans diagnostic." },
      { titre: "Désinfection de printemps", desc: "Une fois par an au printemps (début de la belle saison) : nettoyer à fond tout l'espace d'élevage. Eau chaude + vinaigre blanc sur les surfaces. Laisser sécher 48h avant de remettre les animaux. Cette désinfection annuelle brise les cycles parasitaires." },
    ],
    conseils: [
      "Action cette semaine : change entièrement la litière de tes animaux si tu ne l'as pas fait depuis plus de 3 semaines. C'est le geste préventif le plus efficace qui soit.",
      "Ne jamais acheter d'antibiotiques sans ordonnance ni traiter à l'aveugle. L'automédication en élevage crée des résistances et peut aggraver la situation.",
      "Un élevage propre sent la paille et le foin. Un élevage qui sent l'ammoniac a un problème d'humidité et d'accumulation — à corriger en priorité.",
    ],
    vues: 267, likes: 63, contributions: 17, tags: ["Santé", "Prévention", "Hygiène"],
  },
  {
    id: 33, icone: "🔒", titre: "Concevoir un enclos sécurisé contre les prédateurs", niveau: "Pratique", sousTheme: "Habitat & enclos",
    auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 1 semaine",
    desc: "Le renard, la fouine et l'épervier ont une patience infinie. Un enclos mal pensé finit toujours par être percé — une fois suffit.",
    materiel: ["Grillage soudé ≤25×25mm (pas le grillage à poules classique)", "Piquets métalliques (1,50m de hauteur)", "Fil de fer galvanisé pour ligaturer", "Bêche (pour enterrement du grillage)", "Verrou à pêne coulissant (anti-fouine)"],
    etapes: [
      { titre: "Connaître les prédateurs locaux", desc: "Renard : creuse sous les clôtures. Fouine/martre : passe par les petites ouvertures (dès 4cm), ouvre les loquets classiques, monte les parois. Buse/épervier : attaque par le dessus. Rat : ronge le bois, s'infiltre par les trous. Chien : enfonce ou saute." },
      { titre: "Choisir le bon grillage", desc: "Grillage soudé à mailles 25×25mm (pas le grillage hexagonal à poules — trop facile à écarter pour une fouine). Hauteur min 1,80m pour les volailles. Le grillage doit être tendu et bien ligaturé aux piquets — pas de mou." },
      { titre: "Enterrer le grillage — le geste N°1 anti-renard", desc: "Creuser une tranchée de 30cm de profondeur tout le long de la clôture. Enterrer le bas du grillage en faisant un L horizontal de 20cm vers l'extérieur. Le renard creuse le long de la clôture — il abandonne en rencontrant le grillage horizontal." },
      { titre: "Couvrir l'enclos", desc: "Filet anti-rapaces ou grillage en couverture obligatoire. Les buses et éperviers attaquent en piqué et s'en prennent aux poulets, canetons et lapins. Un filet tendu 50cm au-dessus du grillage vertical bloque toute attaque aérienne." },
      { titre: "Sécuriser toutes les portes", desc: "Verrou à pêne coulissant sur chaque porte — la fouine ouvre les crochets et loquets classiques en quelques secondes. Test : ferme ta porte, essaie de l'ouvrir en glissant un doigt depuis l'extérieur. Si tu peux : la fouine aussi." },
    ],
    conseils: [
      "Cette semaine : inspecte chaque angle et jonction de ton enclos actuel (ou prévu) avec les yeux d'un prédateur. Cherche les zones de faiblesse. Bouche tout ce qui peut s'écarter à plus de 3cm.",
      "La prédation arrive toujours la nuit ou très tôt le matin. Fermer CHAQUE soir avant le coucher du soleil est la règle absolue — une seule nuit oubliée suffit.",
      "Après une attaque : ne pas chercher à attraper le prédateur. Identifier comment il est entré et corriger immédiatement. Il reviendra la nuit suivante.",
    ],
    vues: 389, likes: 91, contributions: 24, tags: ["Sécurité", "Prédateurs", "Enclos"],
  },
  {
    id: 34, icone: "☀️", titre: "Gestion de l'ombre, du soleil et des intempéries", niveau: "Débutant", sousTheme: "Habitat & enclos",
    auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 5 jours",
    desc: "Les animaux d'élevage souffrent du chaud autant que du froid. Quelques aménagements simples font toute la différence.",
    etapes: [
      { titre: "Orienter le poulailler côté nord-est", desc: "L'entrée du poulailler (trappe et pondoir) orientée à l'est ou au sud-est : soleil du matin stimulant, chaleur de l'après-midi évitée. L'arrière exposé nord : la paroi la plus froide est aussi la moins ensoleillée — cohérent." },
      { titre: "Créer de l'ombre naturelle", desc: "Planter des arbres ou arbustes dans l'enclos (prunellier, sureau, noisetier) : ombre et nourriture pour les animaux. À court terme : tendres une bâche à 50% d'ombrage ou une voile d'ombrage côté sud/ouest de l'enclos." },
      { titre: "Assurer la ventilation sans courant d'air", desc: "Le poulailler doit respirer : une ou deux ouvertures en hauteur (jamais au ras du sol pour éviter les courants d'air au niveau des perchoirs). L'humidité et l'ammoniac s'accumulent dans les espaces mal ventilés — cause N°1 des maladies respiratoires." },
      { titre: "Protection hivernale", desc: "Calfeutrer les entrées d'air sur les côtés exposés au vent dominant. Ajouter de la litière épaisse (20cm de paille) pour l'isolation thermique. Les poules rustiques supportent bien le gel sec — ce qu'elles ne supportent pas, c'est le froid humide combiné au vent." },
      { titre: "L'eau en été : l'abreuvoir à l'ombre obligatoire", desc: "Un abreuvoir au soleil chauffe à 40°C en plein été — les animaux le boudent et se déshydratent. Placer TOUJOURS l'abreuvoir à l'ombre. En canicule : ajouter des glaçons ou utiliser une bouteille congelée dans l'eau pour maintenir la fraîcheur." },
    ],
    conseils: [
      "Action aujourd'hui : observe ton espace d'élevage (existant ou prévu) à 14h en été. Où tombe l'ombre ? Où est le vent dominant en hiver ? Ces 10 minutes d'observation t'économiseront des souffrances animales.",
      "La règle de base : les animaux doivent TOUJOURS avoir accès à un espace à l'ombre ET à de l'eau fraîche à l'ombre. Sans ces deux points, le reste ne compte pas.",
      "En période de canicule : réduire les rations de granulés (la digestion dégage de la chaleur) et augmenter fruits et légumes frais riches en eau.",
    ],
    vues: 245, likes: 58, contributions: 14, tags: ["Habitat", "Climat", "Bien-être"],
  },
  {
    id: 35, icone: "📐", titre: "Organisation pratique d'un petit espace d'élevage", niveau: "Pratique", sousTheme: "Habitat & enclos",
    auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 3 jours",
    desc: "Un petit espace bien organisé est plus efficace qu'un grand espace mal pensé. 15 minutes par jour suffisent.",
    etapes: [
      { titre: "Commencer par dessiner son espace", desc: "Prendre une feuille et dessiner à l'échelle l'espace disponible. Placer poulailler, clapiers, ruches, zone de stockage. Ce plan papier révèle les problèmes avant de creuser le premier trou. Changer 10 fois d'avis sur papier coûte moins cher qu'une fois en réalité." },
      { titre: "Zoner les fonctions", desc: "Zone transit/service (passage quotidien avec brouette si besoin). Zone animaux (enclos + abris). Zone stockage (foin, granulés, litière — au sec, à portée de main). Zone compost/fumier (en bout de circuit, pas entre les animaux et le stockage)." },
      { titre: "Placer les mangeoires hors de l'enclos si possible", desc: "Des mangeoires accessibles depuis l'extérieur (par une trappe) évitent d'entrer dans l'enclos chaque jour. On remplit depuis le couloir de service. Gain de temps énorme sur le long terme, et moins de stress pour les animaux." },
      { titre: "Stocker les consommables à portée de main", desc: "Foin, granulés, litière stockés à 5 pas de l'espace d'élevage maximum. Si le stockage est loin et inconfortable, les soins seront différés. L'organisation physique conditionne la régularité des soins." },
      { titre: "La règle des 15 minutes", desc: "Tout le tour quotidien (nourrir, abreuver, observer, ramasser les œufs, fermer) doit tenir en 15 minutes. Si ça prend plus : soit trop d'animaux, soit mauvaise organisation. Chronomètre-toi une fois — le résultat est souvent une surprise." },
    ],
    conseils: [
      "Action ce week-end : dessine ton espace d'élevage à l'échelle sur papier. Même grossièrement. Ce plan va révéler 2 ou 3 problèmes que tu n'avais pas anticipés.",
      "Règle d'or : si nettoyer un espace prend plus de 10 minutes, il est mal conçu. Un bon aménagement se nettoie vite avec une pelle et une brouette.",
      "Un élevage bien organisé se fait en 15 minutes le matin et 5 le soir. Si ça prend plus, c'est une organisation à revoir — pas une fatalité.",
    ],
    vues: 198, likes: 47, contributions: 12, tags: ["Organisation", "Espace", "Pratique"],
  },
];

const fichesExperimentations: FicheRiche[] = [
  {
    id: 36, icone: "🌊", titre: "Culture de spiruline fraîche : bientôt dans le Terrier",
    niveau: "Débutant", sousTheme: "Guides & fiches",
    specialType: "experimentation",
    auteur: "Créateur du Terrier", initiales: "NT", ville: "France", date: "projet en préparation",
    desc: "La spiruline est une micro-algue d'une richesse nutritionnelle exceptionnelle. Il est possible d'en produire légalement pour sa consommation personnelle. Ce projet sera documenté entièrement dans le Terrier — de l'installation aux premières récoltes.",
    etapes: [
      { titre: "Pourquoi la spiruline ?", desc: "La spiruline (Arthrospira platensis) contient jusqu'à 70% de protéines complètes, des vitamines B12, fer, calcium et antioxydants. Quelques grammes par jour suffisent à compléter une alimentation végétale. Produite soi-même, elle coûte une fraction de son prix en commerce — et on sait exactement ce qu'elle contient." },
      { titre: "Ce que je prévois de documenter", desc: "Installation complète des bassins de culture (volume, matériau, exposition). Coût réel du démarrage. Entretien quotidien et hebdomadaire. Premières récoltes : quantités, qualité, consistance. Difficultés rencontrées (contamination, pH, température). Rendement par m² sur la durée." },
      { titre: "Phase de recherche en cours", desc: "Avant de lancer les premiers bassins, je rassemble actuellement les informations sur les souches disponibles en France, les conditions de culture optimales pour notre région et le matériel minimal nécessaire. Si tu as déjà cultivé de la spiruline, tes retours sont précieux ici." },
      { titre: "L'installation envisagée", desc: "Bassin rectangulaire de 100L minimum (bac IBC ou aquarium géant), exposition plein sud, température d'eau maintenue entre 30 et 35°C, agitation quotidienne. Souche achetée auprès d'un producteur français certifié. Documentation photo hebdomadaire dès le démarrage." },
    ],
    conseils: [
      "Si tu cultives déjà de la spiruline — même à petite échelle, même avec des résultats mitigés — partage ton expérience ici. C'est exactement ce dont le Terrier a besoin pour démarrer sur des bases solides.",
      "Ce projet alimentera progressivement une fiche complète de production : de 'je ne sais pas' à 'voilà ce qui marche vraiment chez nous'.",
      "D'autres projets du même esprit sont en réflexion : récupération d'eau atmosphérique, champignons, aquaponie, four solaire. Le Terrier grandit par l'expérimentation collective.",
    ],
    vues: 0, likes: 0, contributions: 0, tags: ["Spiruline", "Micro-algue", "Autonomie", "Expérimentation"],
  },
];

const fichesBase: Record<"fairesoimeme" | "bibliotheque", FicheBase[]> = {
  fairesoimeme: [
    { id: 9, titre: "Fabriquer un composteur en palettes — tuto complet", auteur: "Daniel C.", initiales: "DC", ville: "Toulouse", date: "il y a 1 semaine", desc: "Récupérer 4 palettes, quelques vis et 2h de travail. Résultat : un composteur solide et gratuit.", vues: 218, likes: 38, contributions: 5, tags: ["Récup", "DIY"] },
    { id: 10, titre: "Construire une serre tunnel avec des arceaux PVC", auteur: "Marc B.", initiales: "MB", ville: "Limoges", date: "il y a 2 semaines", desc: "Arceaux PVC, bâche de serre 80 microns, cordes et sardines. Serre 4m × 1,2m pour 35€.", vues: 302, likes: 64, contributions: 12, tags: ["DIY", "Serre"] },
    { id: 11, titre: "Bacs de culture surélevés en planches récupérées", auteur: "Hélène R.", initiales: "HR", ville: "Lyon", date: "il y a 3 jours", desc: "Planches de coffrage, vis inox, géotextile. Dimensions idéales, substrat et premiers résultats.", vues: 167, likes: 34, contributions: 8, tags: ["Récup", "Potager"] },
  ],
  bibliotheque: [
    { id: 12, titre: "Calendrier complet des semis et plantations", auteur: "Communauté NIGLOMODE", initiales: "NM", ville: "France", date: "enrichi régulièrement", desc: "Tableau mois par mois, par légume. Semis intérieur, repiquage, pleine terre. Mis à jour par la communauté.", vues: 821, likes: 187, contributions: 54, tags: ["Référence", "Collaboratif"] },
    { id: 13, titre: "Guide débutant jardinage naturel — PDF", auteur: "Pierre M.", initiales: "PM", ville: "Thiers", date: "il y a 2 mois", desc: "40 pages illustrées : sol vivant, semis, associations, compost et eau. Téléchargeable librement.", vues: 634, likes: 142, contributions: 28, tags: ["PDF", "Débutant"] },
    { id: 14, titre: "Retours d'expérience — saison 2025", auteur: "Plusieurs membres", initiales: "++", ville: "France", date: "en cours", desc: "Les succès, les échecs et les découvertes de la saison. Chaque membre peut ajouter son témoignage.", vues: 412, likes: 93, contributions: 47, tags: ["Collaboratif", "Vivant"] },
    { id: 15, titre: "Photos de jardins avant / après", auteur: "Communauté NIGLOMODE", initiales: "NM", ville: "France", date: "régulièrement mis à jour", desc: "Galerie collaborative de transformations de jardins. Partagez vos photos d'évolution.", vues: 387, likes: 108, contributions: 63, tags: ["Photos", "Inspirant"] },
  ],
};

const contributionsOptions = [
  { icon: "💡", label: "Ajouter une astuce" },
  { icon: "📝", label: "Partager une expérience" },
  { icon: "✏️", label: "Proposer une correction" },
  { icon: "📷", label: "Ajouter une photo" },
];

const phasesLegende = [
  { symbole: "🌑", nom: "Nouvelle Lune", periode: "Transition ± 1 jour", action: "⚠️ Repos — ne pas intervenir", detail: "Période de transition énergétique — laisser le jardin tranquille" },
  { symbole: "🌒🌓🌔", nom: "Lune Croissante", periode: "~14 jours", action: "🌱 Semer · 🌿 Planter · ✂️ Greffer", detail: "Sève montante — idéal pour semis, repiquage, greffes, récolte aérienne" },
  { symbole: "🌕", nom: "Pleine Lune", periode: "Transition ± 1 jour", action: "🌾 Récolter · 🌺 Cueillir", detail: "Maximum de vitalité — récolte optimale, cueillette aromatiques et médicinales" },
  { symbole: "🌖🌗🌘", nom: "Lune Décroissante", periode: "~14 jours", action: "✂️ Tailler · 🔨 Sol · ♻️ Compost", detail: "Sève descendante — taille, travail du sol, plantation de bulbes et racines" },
];

const joursTypesLegende = [
  { symbole: "🟤", nom: "Racines", element: "Terre", cultures: "Carottes, betteraves, oignons, ail, pommes de terre, radis" },
  { symbole: "🟢", nom: "Feuilles", element: "Eau", cultures: "Salades, épinards, choux, poireaux, persil, basilic feuilles" },
  { symbole: "🌸", nom: "Fleurs", element: "Air", cultures: "Fleurs, ciboulette, lavande, camomille, aromatiques en fleur" },
  { symbole: "🔴", nom: "Fruits", element: "Feu", cultures: "Tomates, courgettes, concombres, haricots, courges, graines" },
];

const cal2026 = [
  { mois: "Janvier",    nL: "18 jan",   pL: "3 jan",   conseil: "Taille de dormance, préparation bacs" },
  { mois: "Février",    nL: "17 fév",   pL: "1 fév",   conseil: "Semis intérieur : poivrons, aubergines, céleris" },
  { mois: "Mars",       nL: "18 mars ⚠️", pL: "3 mars",  conseil: "Semis tomates en intérieur (éclipse le 18)" },
  { mois: "Avril",      nL: "17 avr",   pL: "2 avr",   conseil: "Semis pleine terre : carottes, salades, courgettes" },
  { mois: "Mai",        nL: "16 mai",   pL: "1 mai",   conseil: "Plantation tomates après les Saints de Glace (13 mai)" },
  { mois: "Juin",       nL: "15 juin",  pL: "29 juin",  conseil: "Récolte estivale, semis navets et mâche" },
  { mois: "Juillet",    nL: "14 juil",  pL: "28 juil",  conseil: "Grande récolte, taille fruitiers après cueillette" },
  { mois: "Août",       nL: "12 août",  pL: "27 août",  conseil: "Plantation ail et oignons d'automne" },
  { mois: "Septembre",  nL: "10 sep",   pL: "25 sep",  conseil: "Plantation bulbes printaniers, engrais verts" },
  { mois: "Octobre",    nL: "9 oct",    pL: "25 oct",  conseil: "Récolte courges, plantation arbres et arbustes" },
  { mois: "Novembre",   nL: "8 nov",    pL: "23 nov",  conseil: "Taille de formation, paillage hivernal" },
  { mois: "Décembre",   nL: "8 déc",    pL: "23 déc",  conseil: "Repos du jardin, commandes de graines" },
];

const cal2027 = [
  { mois: "Janvier",    nL: "7 jan",    pL: "22 jan",  conseil: "Taille de dormance, amendements" },
  { mois: "Février",    nL: "6 fév",    pL: "20 fév",  conseil: "Semis intérieur précoces" },
  { mois: "Mars",       nL: "7 mars",   pL: "22 mars", conseil: "Semis tomates, poivrons, laitues" },
  { mois: "Avril",      nL: "6 avr",    pL: "21 avr",  conseil: "Semis pleine terre, repiquage" },
  { mois: "Mai",        nL: "5 mai",    pL: "20 mai",  conseil: "Plantations après les gelées" },
  { mois: "Juin",       nL: "4 juin",   pL: "19 juin", conseil: "Grande récolte estivale" },
  { mois: "Juillet",    nL: "3 juil",   pL: "18 juil", conseil: "Semis automne, taille fruitiers" },
  { mois: "Août",       nL: "2 août",   pL: "17 août", conseil: "Plantation ail, oignons d'automne" },
  { mois: "Septembre",  nL: "1 sep",    pL: "15 sep",  conseil: "Récolte, semis engrais verts" },
  { mois: "Octobre",    nL: "1 & 30 oct", pL: "15 oct", conseil: "Plantation arbustes, compost" },
  { mois: "Novembre",   nL: "29 nov",   pL: "13 nov",  conseil: "Taille, protection hivernale" },
  { mois: "Décembre",   nL: "28 déc",   pL: "13 déc",  conseil: "Repos, planification 2028" },
];

const sousThemeCouleur: Record<string, { bordure: string; deco: string }> = {
  "Semis & plantations":     { bordure: "#4F6B47", deco: "🌱" },
  "Potager & cultures":      { bordure: "#7a4a1e", deco: "🍅" },
  "Fruitiers & aromatiques": { bordure: "#6B4F34", deco: "🍃" },
  "Calendrier & saisons":    { bordure: "#1E3524", deco: "🌙" },
  "Conseils & techniques":   { bordure: "#D8B56A", deco: "🌿" },
  "Gestion de l'eau":        { bordure: "#2a6b8a", deco: "💧" },
  "Fertilité des sols":      { bordure: "#7a4a1e", deco: "🪱" },
  "Compost & valorisation":  { bordure: "#4F6B47", deco: "♻️" },
  "Paillage & couverture":   { bordure: "#6B4F34", deco: "🌾" },
  "Basse-cour":              { bordure: "#7a4a1e", deco: "🐔" },
  "Apiculture":              { bordure: "#c8860a", deco: "🐝" },
  "Petits animaux":          { bordure: "#4F6B47", deco: "🐇" },
  "Alimentation & soins":    { bordure: "#1E3524", deco: "🌾" },
  "Habitat & enclos":        { bordure: "#6B4F34", deco: "🏡" },
};

const niveauStyle: Record<Niveau, { bg: string; color: string }> = {
  "Débutant": { bg: "rgba(79,107,71,0.18)", color: "#2d5a27" },
  "Pratique": { bg: "rgba(30,90,80,0.18)", color: "#1a5a4e" },
  "Intermédiaire": { bg: "rgba(216,181,106,0.22)", color: "#7a5c1e" },
  "Référence": { bg: "rgba(107,79,52,0.18)", color: "#6B4F34" },
};

const lucioles = [
  { top: "12%", left: "8%", r: 2.5 }, { top: "28%", left: "92%", r: 2 }, { top: "55%", left: "5%", r: 1.8 },
  { top: "70%", left: "88%", r: 2.2 }, { top: "18%", left: "75%", r: 1.5 }, { top: "42%", left: "95%", r: 2 },
  { top: "82%", left: "15%", r: 1.8 }, { top: "8%", left: "55%", r: 2.2 }, { top: "65%", left: "48%", r: 1.5 },
  { top: "35%", left: "22%", r: 2 }, { top: "90%", left: "72%", r: 1.8 }, { top: "22%", left: "38%", r: 1.5 },
];

export default function ProduireCultiverPage() {
  const [tab, setTab] = useState<Tab>("cultiver");
  const [showForm, setShowForm] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [ficheActiveBase, setFicheActiveBase] = useState<number | null>(null);
  const [modalFiche, setModalFiche] = useState<FicheRiche | null>(null);
  const [recherche, setRecherche] = useState("");
  const [suggestSent, setSuggestSent] = useState(false);

  const currentTab = tabs.find((t) => t.id === tab)!;

  const sousThemeActif = currentTab.items.includes(recherche) ? recherche : null;

  const sourceFichesRiches = tab === "cultiver" ? fichesRiches : tab === "eau" ? fichesRichesEau : tab === "elevage" ? fichesRichesElevage : [];

  const fichesRichesFiltrees = sourceFichesRiches.filter((f) => {
    if (!recherche) return true;
    if (sousThemeActif) return f.sousTheme === sousThemeActif;
    return f.titre.toLowerCase().includes(recherche.toLowerCase()) || f.desc.toLowerCase().includes(recherche.toLowerCase());
  });

  const fichesBaseFiltrees = (tab === "fairesoimeme" || tab === "bibliotheque")
    ? (fichesBase[tab] ?? []).filter((f) =>
        !recherche || f.titre.toLowerCase().includes(recherche.toLowerCase()) || f.desc.toLowerCase().includes(recherche.toLowerCase())
      )
    : [];

  const isEmpty = (tab === "cultiver" || tab === "eau" || tab === "elevage") ? fichesRichesFiltrees.length === 0 : fichesBaseFiltrees.length === 0;

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }}
        className="relative text-white overflow-hidden"
      >
        <img src="/produire-cultiver-bg.png" alt="" className="w-full block" style={{ opacity: 0.60 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,14,8,0.35) 0%, rgba(6,14,8,0.15) 50%, rgba(6,14,8,0.45) 100%)" }} />
        {lucioles.map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.7 }} />
        ))}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 py-14">
          <div className="flex flex-col items-center gap-4 max-w-xl">
            <span style={{ fontSize: 52 }}>🌱</span>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: 3, color: "#D8B56A" }}>PRODUIRE & CULTIVER</h1>
            <p style={{ color: "rgba(233,223,200,0.80)", lineHeight: 1.75 }}>Apprendre à cultiver, produire, expérimenter et partager les savoirs du vivant.</p>
          </div>
        </div>

        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.45)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span style={{ fontSize: 22 }}>🦔</span>
          <p className="text-sm italic font-medium" style={{ color: "#F5EFD8" }}>
            Dicton du Niglo : &ldquo;Le jardin nourrit le corps, le savoir nourrit l&apos;avenir.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══ ONGLETS ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="px-4 pt-8 pb-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => { setTab(t.id); setFicheActiveBase(null); }}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 text-center transition-all"
              style={{ backgroundColor: tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.07)", color: tab === t.id ? "#1E3524" : "rgba(245,239,216,0.75)", border: `2px solid ${tab === t.id ? "#D8B56A" : "rgba(255,255,255,0.15)"}`, boxShadow: tab === t.id ? "0 4px 18px rgba(216,181,106,0.30)" : "0 1px 4px rgba(0,0,0,0.25)" }}>
              <span style={{ fontSize: 26 }}>{t.icon}</span>
              <span className="font-bold text-xs leading-tight">{t.label}</span>
              <span className="text-xs opacity-55 leading-tight hidden sm:block">{t.sublabel}</span>
            </button>
          ))}
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="mt-4 p-4 rounded-2xl flex flex-wrap gap-2 items-center" style={{ backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid rgba(216,181,106,0.2)" }}>
            {currentTab.items.map((item) => (
              <button key={item} onClick={() => setRecherche(recherche === item ? "" : item)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{ backgroundColor: recherche === item ? "#D8B56A" : "rgba(255,255,255,0.07)", color: recherche === item ? "#1E3524" : "rgba(245,239,216,0.75)", border: `1px solid ${recherche === item ? "#D8B56A" : "rgba(255,255,255,0.15)"}` }}>
                {item}
              </button>
            ))}
            <button onClick={() => { setShowSuggest(true); setSuggestSent(false); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold ml-auto flex-shrink-0"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(245,239,216,0.6)", border: "1px dashed rgba(255,255,255,0.2)" }}>
              ➕ Proposer un thème
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
                <span className="text-sm font-normal opacity-40">({(tab === "cultiver" || tab === "eau" || tab === "elevage") ? fichesRichesFiltrees.length : fichesBaseFiltrees.length})</span>
              </h2>
              {tab === "bibliotheque" && <p className="text-xs mt-0.5 opacity-50" style={{ color: "#1E3524" }}>Base de connaissances communautaire — enrichie par les membres du Terrier</p>}
            </div>
            <button onClick={() => setShowForm(true)} className="px-5 py-2 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>+ Publier</button>
          </div>

          {isEmpty ? (
            <div className="text-center py-16 opacity-40" style={{ color: "#1E3524" }}>
              <span style={{ fontSize: 48 }}>🔍</span>
              <p className="mt-3 font-semibold">Aucune fiche trouvée</p>
              <p className="text-sm mt-1">Sois le premier à publier sur ce sujet.</p>
              <button onClick={() => setShowForm(true)} className="mt-4 px-6 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>+ Publier une fiche</button>
            </div>
          ) : (tab === "cultiver" || tab === "eau" || tab === "elevage") ? (
            /* ─── GRILLE FICHES RICHES ─── */
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {fichesRichesFiltrees.map((f) => {
                const niv = niveauStyle[f.niveau];
                const theme = sousThemeCouleur[f.sousTheme] ?? { bordure: "#4F6B47", deco: "🌿" };

                if (f.specialType === "experimentation") return (
                  <div key={f.id}
                    onClick={() => setModalFiche(f)}
                    className="flex flex-col cursor-pointer transition-all hover:-translate-y-1"
                    style={{
                      background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(216,181,106,0.22) 27px, rgba(216,181,106,0.22) 28px), linear-gradient(180deg, #FDFAF0 0%, #F5EAC8 100%)`,
                      border: "1.5px dashed #D8B56A",
                      borderRadius: "4px",
                      boxShadow: "2px 4px 0 rgba(216,181,106,0.45), 0 6px 24px rgba(30,53,36,0.10)",
                      overflow: "hidden",
                    }}>
                    {/* Badge Expérimentation */}
                    <div style={{ backgroundColor: "#7a5c1e", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5EFD8" }}>
                      <span>🦔</span><span>Expérimentation du Terrier</span>
                    </div>
                    {/* Illustration + badge "En cours" */}
                    <div style={{ paddingTop: 16, paddingBottom: 4, textAlign: "center", position: "relative" }}>
                      <span style={{ fontSize: 44 }}>{f.icone}</span>
                      <div style={{ position: "absolute", top: 10, right: 14, fontSize: 9, fontWeight: 700, color: "#7a5c1e", backgroundColor: "rgba(216,181,106,0.35)", border: "1px solid #D8B56A", borderRadius: 3, padding: "2px 6px", letterSpacing: "0.07em" }}>⚗ En cours</div>
                    </div>
                    {/* Titre pointillé */}
                    <div style={{ padding: "4px 18px 8px", textAlign: "center" }}>
                      <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35, display: "inline", borderBottom: "2px dashed rgba(216,181,106,0.7)", paddingBottom: 4 }}>{f.titre}</h3>
                    </div>
                    {/* Note */}
                    <div style={{ padding: "4px 18px 10px", flex: 1 }}>
                      <p style={{ color: "#7a5c1e", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", textAlign: "center", opacity: 0.9 }}>{f.desc}</p>
                    </div>
                    {/* Petit hérisson */}
                    <div style={{ textAlign: "center", paddingBottom: 10 }}>
                      <span style={{ fontSize: 22, opacity: 0.5 }}>🦔</span>
                    </div>
                    {/* Séparateur pointillé */}
                    <div style={{ borderTop: "1px dashed #D8B56A", margin: "0 14px" }} />
                    {/* Signature */}
                    <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontStyle: "italic", color: "#7a5c1e", opacity: 0.8 }}>✍ {f.auteur}</span>
                      <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.28 }}>{f.date}</span>
                    </div>
                  </div>
                );

                return (
                  <div key={f.id}
                    onClick={() => setModalFiche(f)}
                    className="flex flex-col cursor-pointer transition-all hover:-translate-y-1"
                    style={{
                      background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(196,184,152,0.28) 27px, rgba(196,184,152,0.28) 28px), linear-gradient(180deg, #FAF4E4 0%, #EDE0C0 100%)`,
                      border: "1px solid #C4B898",
                      borderRadius: "4px",
                      boxShadow: "2px 4px 0 #C4B898, 0 6px 24px rgba(30,53,36,0.13)",
                      overflow: "hidden",
                    }}>

                    {/* Onglet de section */}
                    <div style={{
                      backgroundColor: theme.bordure, padding: "5px 14px",
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 9, fontWeight: 800, letterSpacing: "0.15em",
                      textTransform: "uppercase", color: "#F5EFD8",
                    }}>
                      <span>{theme.deco}</span><span>{f.sousTheme}</span>
                    </div>

                    {/* Grande illustration */}
                    <div style={{ paddingTop: 20, paddingBottom: 4, textAlign: "center" }}>
                      <span style={{ fontSize: 50 }}>{f.icone}</span>
                    </div>

                    {/* Titre souligné à la main */}
                    <div style={{ padding: "4px 18px 10px", textAlign: "center" }}>
                      <h3 style={{
                        color: "#1E3524", fontWeight: 800, fontSize: 13,
                        lineHeight: 1.35, display: "inline",
                        borderBottom: "2px solid rgba(30,53,36,0.2)",
                        paddingBottom: 4,
                      }}>{f.titre}</h3>
                    </div>

                    {/* Note courte */}
                    <div style={{ padding: "4px 18px 14px", flex: 1 }}>
                      <p style={{
                        color: "#6B4F34", fontSize: 11, lineHeight: 1.7,
                        fontStyle: "italic", textAlign: "center", opacity: 0.9,
                      }}>{f.desc}</p>
                    </div>

                    {/* Niveau — discret, style annoté à la main */}
                    <div style={{ textAlign: "center", paddingBottom: 12 }}>
                      <span style={{
                        color: niv.color, fontSize: 10, fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase",
                        borderBottom: `1.5px dashed ${niv.color}`, paddingBottom: 1,
                      }}>{f.niveau}</span>
                    </div>

                    {/* Ligne de pied de page */}
                    <div style={{ borderTop: "1px solid #C4B898", margin: "0 14px" }} />

                    {/* Signature */}
                    <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontStyle: "italic", color: "#6B4F34", opacity: 0.75 }}>
                        ✍ {f.auteur}
                      </span>
                      <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.28 }}>{f.date}</span>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            /* ─── FICHES DE BASE (fairesoimeme / bibliotheque) ─── */
            <div className="flex flex-col gap-8">

              {/* Bloc Expérimentations du Terrier — affiché uniquement dans la Bibliothèque */}
              {tab === "bibliotheque" && fichesExperimentations.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: 22 }}>🦔</span>
                    <h3 className="font-extrabold text-sm uppercase tracking-widest" style={{ color: "#7a5c1e" }}>Expérimentations du Terrier</h3>
                    <div className="flex-1 h-px" style={{ backgroundColor: "rgba(216,181,106,0.4)" }} />
                    <span className="text-xs italic px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(216,181,106,0.12)", color: "#7a5c1e", border: "1px dashed #D8B56A" }}>En cours</span>
                  </div>
                  <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {fichesExperimentations.map((f) => (
                      <div key={f.id}
                        onClick={() => setModalFiche(f)}
                        className="flex flex-col cursor-pointer transition-all hover:-translate-y-1"
                        style={{
                          background: `repeating-linear-gradient(transparent 0, transparent 27px, rgba(216,181,106,0.22) 27px, rgba(216,181,106,0.22) 28px), linear-gradient(180deg, #FDFAF0 0%, #F5EAC8 100%)`,
                          border: "1.5px dashed #D8B56A", borderRadius: "4px",
                          boxShadow: "2px 4px 0 rgba(216,181,106,0.45), 0 6px 24px rgba(30,53,36,0.10)",
                          overflow: "hidden",
                        }}>
                        <div style={{ backgroundColor: "#7a5c1e", padding: "5px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5EFD8" }}>
                          <span>🦔</span><span>Expérimentation du Terrier</span>
                        </div>
                        <div style={{ paddingTop: 16, paddingBottom: 4, textAlign: "center", position: "relative" }}>
                          <span style={{ fontSize: 44 }}>{f.icone}</span>
                          <div style={{ position: "absolute", top: 10, right: 14, fontSize: 9, fontWeight: 700, color: "#7a5c1e", backgroundColor: "rgba(216,181,106,0.35)", border: "1px solid #D8B56A", borderRadius: 3, padding: "2px 6px", letterSpacing: "0.07em" }}>🚧 En préparation</div>
                        </div>
                        <div style={{ padding: "4px 18px 8px", textAlign: "center" }}>
                          <h3 style={{ color: "#1E3524", fontWeight: 800, fontSize: 13, lineHeight: 1.35, display: "inline", borderBottom: "2px dashed rgba(216,181,106,0.7)", paddingBottom: 4 }}>{f.titre}</h3>
                        </div>
                        <div style={{ padding: "4px 18px 10px", flex: 1 }}>
                          <p style={{ color: "#7a5c1e", fontSize: 11, lineHeight: 1.7, fontStyle: "italic", textAlign: "center", opacity: 0.9 }}>{f.desc}</p>
                        </div>
                        <div style={{ textAlign: "center", paddingBottom: 10 }}>
                          <span style={{ fontSize: 22, opacity: 0.5 }}>🦔</span>
                        </div>
                        <div style={{ borderTop: "1px dashed #D8B56A", margin: "0 14px" }} />
                        <div style={{ padding: "8px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 11, fontStyle: "italic", color: "#7a5c1e", opacity: 0.8 }}>✍ {f.auteur}</span>
                          <span style={{ fontSize: 10, color: "#1E3524", opacity: 0.28 }}>{f.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fiches de base */}
              <div className={`grid gap-5 ${tab === "bibliotheque" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
              {fichesBaseFiltrees.map((f) => (
                <div key={f.id} className="rounded-2xl flex flex-col overflow-hidden transition-shadow hover:shadow-md"
                  style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                  <div className="px-5 pt-5 pb-3 flex flex-col gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {f.tags.map((tag) => <span key={tag} className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(79,107,71,0.15)", color: "#1E3524" }}>{tag}</span>)}
                    </div>
                    <h3 className="font-bold text-base leading-snug" style={{ color: "#1E3524" }}>{f.titre}</h3>
                    <p className="text-sm opacity-60 leading-relaxed" style={{ color: "#1E3524" }}>{f.desc}</p>
                  </div>
                  <div className="px-5 py-2 flex gap-4 text-xs opacity-40" style={{ color: "#1E3524", borderTop: "1px solid #C4B898" }}>
                    <span>👁 {f.vues}</span><span>❤️ {f.likes}</span><span>✏️ {f.contributions} contributions</span>
                  </div>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ borderTop: "1px solid #C4B898" }}>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>{f.initiales}</div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#1E3524" }}>{f.auteur}</p>
                        <p className="text-xs opacity-40" style={{ color: "#1E3524" }}>{f.date}</p>
                      </div>
                    </div>
                    <button onClick={() => setFicheActiveBase(ficheActiveBase === f.id ? null : f.id)}
                      className="px-4 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                      {tab === "bibliotheque" ? "Lire & Enrichir" : "Lire & Contribuer"}
                    </button>
                  </div>
                  {ficheActiveBase === f.id && (
                    <div className="px-5 py-4 flex flex-col gap-3" style={{ backgroundColor: "rgba(79,107,71,0.12)", borderTop: "1px solid #C4B898" }}>
                      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#1E3524" }}>Contribuer à cette fiche</p>
                      <div className="flex flex-wrap gap-2">
                        {contributionsOptions.map((c) => (
                          <button key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: "#F5EFD8", color: "#1E3524", border: "1px solid #C4B898" }}>
                            {c.icon} {c.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══ ESPRIT WIKI ═══ */}
      <section style={{ background: "linear-gradient(160deg, #060e08 0%, #1E3524 50%, #0a1508 100%)" }} className="relative py-12 px-4 text-white overflow-hidden">
        {lucioles.slice(0, 8).map((l, i) => (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{ top: l.top, left: l.left, width: l.r * 2, height: l.r * 2, backgroundColor: "#D8B56A", boxShadow: `0 0 ${l.r * 3}px ${l.r * 2}px rgba(216,181,106,0.45)`, opacity: 0.6 }} />
        ))}
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
          <span style={{ fontSize: 44 }}>📚</span>
          <h2 className="text-xl font-extrabold" style={{ color: "#D8B56A" }}>Une base de connaissances vivante</h2>
          <p style={{ color: "rgba(233,223,200,0.75)", lineHeight: 1.75 }} className="text-sm max-w-xl">
            NIGLOMODE ne dépend pas de son créateur. La plateforme grandit grâce à l&apos;intelligence collective.
            Chaque fiche publiée, chaque photo partagée, chaque retour d&apos;expérience enrichit une encyclopédie pratique
            construite par les habitants du Terrier.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Partager ce qui fonctionne", "Transmettre l'expérience du terrain", "Corriger et améliorer", "Construire ensemble"].map((v) => (
              <span key={v} className="px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "rgba(216,181,106,0.15)", color: "#D8B56A", border: "1px solid rgba(216,181,106,0.3)" }}>{v}</span>
            ))}
          </div>
          <button onClick={() => setShowForm(true)} className="px-8 py-3 rounded-full font-bold text-base transition-opacity hover:opacity-90 mt-1"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>✏️ Publier ma première fiche</button>
        </div>
      </section>

      {/* ═══ MODAL FICHE RICHE — CARNET DE TERRAIN ═══ */}
      {modalFiche && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          style={{ backgroundColor: "rgba(6,14,8,0.75)", backdropFilter: "blur(3px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalFiche(null); }}>
          <div className="w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-y-auto max-h-[92vh] flex flex-col"
            style={{ background: `repeating-linear-gradient(transparent 0, transparent 31px, rgba(196,184,152,0.2) 31px, rgba(196,184,152,0.2) 32px), #F5EFD8`, boxShadow: "0 -8px 60px rgba(6,14,8,0.45)" }}>

            {/* En-tête carnet */}
            <div className="relative flex flex-col items-center gap-3 px-7 pt-8 pb-6 overflow-hidden"
              style={{ background: "linear-gradient(160deg, #0a1508 0%, #1E3524 100%)" }}>
              <div className="absolute top-3 left-4 text-xl opacity-20 pointer-events-none select-none">🌿</div>
              <div className="absolute top-4 right-5 text-lg opacity-15 pointer-events-none select-none">🌾</div>
              <div className="absolute bottom-2 left-1/4 text-base opacity-10 pointer-events-none select-none">🍃</div>
              <button onClick={() => setModalFiche(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: "rgba(245,239,216,0.15)", color: "#F5EFD8" }}>×</button>
              <span style={{ fontSize: 56 }}>{modalFiche.icone}</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: niveauStyle[modalFiche.niveau].bg, color: niveauStyle[modalFiche.niveau].color }}>
                {modalFiche.niveau}
              </span>
              <h2 className="text-center font-extrabold leading-tight" style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", color: "#F5EFD8", letterSpacing: 0.5 }}>
                {modalFiche.titre}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>{modalFiche.initiales}</div>
                <span className="text-xs" style={{ color: "rgba(245,239,216,0.65)" }}>{modalFiche.auteur} · {modalFiche.ville} · {modalFiche.date}</span>
              </div>
            </div>

            {/* Corps */}
            <div className="px-6 py-6 flex flex-col gap-6">

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {modalFiche.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: "rgba(79,107,71,0.15)", color: "#1E3524", border: "1px solid rgba(79,107,71,0.25)" }}>{tag}</span>
                ))}
              </div>

              {/* Résumé */}
              <p className="text-sm leading-relaxed italic px-4 py-3 rounded-xl"
                style={{ color: "#4F6B47", backgroundColor: "rgba(79,107,71,0.08)", borderLeft: "3px solid #D8B56A" }}>
                {modalFiche.desc}
              </p>

              {modalFiche.specialType === "experimentation" ? (
                /* ─── RENDU EXPÉRIMENTATION DU TERRIER ─── */
                <div className="flex flex-col gap-6">

                  {/* Bannière Expérimentation */}
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ backgroundColor: "rgba(216,181,106,0.15)", border: "1.5px dashed #D8B56A" }}>
                    <span style={{ fontSize: 28 }}>🦔</span>
                    <div>
                      <p className="font-extrabold text-sm" style={{ color: "#7a5c1e", letterSpacing: "0.05em" }}>Expérimentation du Terrier</p>
                      <p className="text-xs mt-0.5" style={{ color: "#7a5c1e", opacity: 0.75 }}>Ce contenu partage une idée ou un test en cours — pas encore réalisé ni validé. Il évolue grâce aux retours de la communauté.</p>
                    </div>
                  </div>

                  {/* Résumé narratif */}
                  <p className="text-sm leading-relaxed italic px-4 py-3 rounded-xl"
                    style={{ color: "#4F6B47", backgroundColor: "rgba(79,107,71,0.08)", borderLeft: "3px solid #D8B56A" }}>
                    {modalFiche.desc}
                  </p>

                  {/* Sections journal */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>📓</span> Notes de terrain
                    </h3>
                    {modalFiche.etapes.map((e, i) => (
                      <div key={i} className="flex flex-col gap-1.5 px-4 py-3 rounded-xl"
                        style={{ backgroundColor: "rgba(216,181,106,0.08)", border: "1px dashed rgba(216,181,106,0.5)" }}>
                        <p className="font-bold text-sm flex items-center gap-2" style={{ color: "#7a5c1e" }}>
                          <span style={{ fontSize: 16, opacity: 0.6 }}>🦔</span> {e.titre}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>{e.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Zone photos à venir */}
                  <div className="rounded-xl px-5 py-4 flex flex-col gap-2"
                    style={{ backgroundColor: "rgba(30,53,36,0.04)", border: "1px dashed #C4B898" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#1E3524" }}>
                      <span>📷</span> Photos & observations de terrain
                    </h3>
                    <p className="text-xs italic" style={{ color: "#4F6B47", opacity: 0.75 }}>
                      Cette zone est réservée aux photos de l&apos;installation, croquis et mesures de terrain. À alimenter au fil du temps.
                    </p>
                    <div className="flex items-center justify-center py-4 rounded-lg mt-1" style={{ border: "1px dashed #C4B898", backgroundColor: "rgba(196,184,152,0.12)" }}>
                      <span className="text-xs italic" style={{ color: "#1E3524", opacity: 0.35 }}>— En attente des premières données —</span>
                    </div>
                  </div>

                  {/* Conseils / Invitation */}
                  <div className="rounded-2xl px-5 py-4 flex flex-col gap-3"
                    style={{ backgroundColor: "rgba(216,181,106,0.12)", border: "1.5px solid rgba(216,181,106,0.45)" }}>
                    <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#7a5c1e" }}>
                      <span>🌿</span> Et si tu testais ?
                    </h3>
                    {modalFiche.conseils.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1E3524" }}>
                        <span style={{ color: "#D8B56A", fontSize: 16, lineHeight: 1.4 }}>✦</span>
                        <span className="leading-relaxed">{c}</span>
                      </div>
                    ))}
                  </div>

                </div>
              ) : modalFiche.specialType === "calendrier-lunaire" ? (
                /* ─── RENDU CALENDRIER LUNAIRE ─── */
                <div className="flex flex-col gap-7">

                  {/* Légende phases */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>🌙</span> Les 4 phases — quoi faire
                    </h3>
                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #C4B898" }}>
                      <div className="grid grid-cols-3 text-xs font-bold px-3 py-2" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        <span>Phase</span><span>Période</span><span>Action recommandée</span>
                      </div>
                      {phasesLegende.map((p, i) => (
                        <div key={i} className="grid grid-cols-3 text-xs px-3 py-3 items-start gap-1"
                          style={{ backgroundColor: i % 2 === 0 ? "#F5EFD8" : "rgba(79,107,71,0.06)", borderTop: "1px solid #C4B898" }}>
                          <div className="flex flex-col gap-0.5">
                            <span style={{ fontSize: 18 }}>{p.symbole}</span>
                            <span className="font-bold leading-tight" style={{ color: "#1E3524" }}>{p.nom}</span>
                          </div>
                          <span style={{ color: "#6B4F34", opacity: 0.75 }}>{p.periode}</span>
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold" style={{ color: "#1E3524" }}>{p.action}</span>
                            <span style={{ color: "#4F6B47", opacity: 0.8 }}>{p.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Légende types de jours */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>🌍</span> Les 4 types de jours (signe de la lune)
                    </h3>
                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #C4B898" }}>
                      <div className="grid grid-cols-3 text-xs font-bold px-3 py-2" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        <span>Type</span><span>Élément</span><span>Cultures idéales</span>
                      </div>
                      {joursTypesLegende.map((j, i) => (
                        <div key={i} className="grid grid-cols-3 text-xs px-3 py-2.5 items-center gap-1"
                          style={{ backgroundColor: i % 2 === 0 ? "#F5EFD8" : "rgba(79,107,71,0.06)", borderTop: "1px solid #C4B898" }}>
                          <div className="flex items-center gap-1.5">
                            <span style={{ fontSize: 16 }}>{j.symbole}</span>
                            <span className="font-bold" style={{ color: "#1E3524" }}>{j.nom}</span>
                          </div>
                          <span style={{ color: "#6B4F34" }}>{j.element}</span>
                          <span style={{ color: "#4F6B47" }}>{j.cultures}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendrier 2026 */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>📅</span> Calendrier 2026
                    </h3>
                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #C4B898" }}>
                      <div className="grid grid-cols-3 text-xs font-bold px-3 py-2" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        <span>Mois</span><span>🌑 N. Lune · 🌕 P. Lune</span><span>Activité conseillée</span>
                      </div>
                      {cal2026.map((m, i) => (
                        <div key={i} className="grid grid-cols-3 text-xs px-3 py-2.5 items-center gap-1"
                          style={{ backgroundColor: i % 2 === 0 ? "#F5EFD8" : "rgba(79,107,71,0.06)", borderTop: "1px solid #C4B898" }}>
                          <span className="font-bold" style={{ color: "#1E3524" }}>{m.mois}</span>
                          <div className="flex flex-col gap-0.5">
                            <span style={{ color: "#1E3524" }}>🌑 {m.nL}</span>
                            <span style={{ color: "#6B4F34" }}>🌕 {m.pL}</span>
                          </div>
                          <span style={{ color: "#4F6B47" }}>{m.conseil}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendrier 2027 */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>📅</span> Calendrier 2027
                    </h3>
                    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #C4B898" }}>
                      <div className="grid grid-cols-3 text-xs font-bold px-3 py-2" style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                        <span>Mois</span><span>🌑 N. Lune · 🌕 P. Lune</span><span>Activité conseillée</span>
                      </div>
                      {cal2027.map((m, i) => (
                        <div key={i} className="grid grid-cols-3 text-xs px-3 py-2.5 items-center gap-1"
                          style={{ backgroundColor: i % 2 === 0 ? "#F5EFD8" : "rgba(79,107,71,0.06)", borderTop: "1px solid #C4B898" }}>
                          <span className="font-bold" style={{ color: "#1E3524" }}>{m.mois}</span>
                          <div className="flex flex-col gap-0.5">
                            <span style={{ color: "#1E3524" }}>🌑 {m.nL}</span>
                            <span style={{ color: "#6B4F34" }}>🌕 {m.pL}</span>
                          </div>
                          <span style={{ color: "#4F6B47" }}>{m.conseil}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                /* ─── RENDU NORMAL : MATÉRIEL + ÉTAPES ─── */
                <>
                  {modalFiche.materiel && modalFiche.materiel.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                        <span>🪴</span> Matériel nécessaire
                      </h3>
                      <div className="flex flex-col gap-1.5">
                        {modalFiche.materiel.map((m, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-sm px-3 py-2 rounded-lg"
                            style={{ backgroundColor: "rgba(107,79,52,0.07)", color: "#1E3524" }}>
                            <span style={{ color: "#D8B56A", fontSize: 14, marginTop: 1 }}>◆</span>
                            {m}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "#6B4F34" }}>
                      <span>📋</span> Étapes
                    </h3>
                    <div className="flex flex-col gap-3">
                      {modalFiche.etapes.map((e, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold mt-0.5"
                            style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>{i + 1}</div>
                          <div className="flex-1 px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(30,53,36,0.05)", border: "1px solid rgba(30,53,36,0.10)" }}>
                            <p className="font-bold text-sm mb-1" style={{ color: "#1E3524" }}>{e.titre}</p>
                            <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>{e.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Conseils du Terrier */}
              <div className="rounded-2xl px-5 py-4 flex flex-col gap-3"
                style={{ backgroundColor: "rgba(216,181,106,0.12)", border: "1.5px solid rgba(216,181,106,0.45)" }}>
                <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#7a5c1e" }}>
                  <span>🌿</span> Conseils du Terrier
                </h3>
                {modalFiche.conseils.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm" style={{ color: "#1E3524" }}>
                    <span style={{ color: "#D8B56A", fontSize: 16, lineHeight: 1.4 }}>✦</span>
                    <span className="leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>

              {/* Contribution communautaire */}
              <div className="rounded-2xl px-5 py-4 flex flex-col gap-3"
                style={{ backgroundColor: "rgba(30,53,36,0.06)", border: "1px solid #C4B898" }}>
                <h3 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "#1E3524" }}>
                  <span>🤝</span> Contribuer à cette fiche
                </h3>
                <p className="text-xs" style={{ color: "#4F6B47", opacity: 0.8 }}>
                  Ces fiches grandissent grâce à l&apos;expérience des habitants du Terrier. Partage ce que tu sais.
                </p>
                <div className="flex flex-wrap gap-2">
                  {contributionsOptions.map((c) => (
                    <button key={c.label} className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-colors hover:opacity-80"
                      style={{ backgroundColor: "#F5EFD8", color: "#1E3524", border: "1px solid #C4B898" }}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ═══ MODALE SUGGESTION ═══ */}
      {showSuggest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSuggest(false); }}>
          <div className="w-full max-w-md rounded-2xl p-7 flex flex-col gap-4" style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: "#1E3524" }}>➕ Proposer un thème</h2>
              <button onClick={() => setShowSuggest(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            {suggestSent ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <span style={{ fontSize: 40 }}>🌱</span>
                <p className="font-bold" style={{ color: "#1E3524" }}>Suggestion envoyée !</p>
                <p className="text-sm opacity-60" style={{ color: "#1E3524" }}>Ta proposition sera examinée avant d&apos;être ajoutée.</p>
                <button onClick={() => setShowSuggest(false)} className="px-6 py-2 rounded-full text-sm font-bold mt-2" style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>Fermer</button>
              </div>
            ) : (
              <>
                <div className="rounded-xl p-3 text-xs flex gap-2" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
                  <span>ℹ️</span><span>Les suggestions sont soumises à modération avant d&apos;apparaître sur la plateforme.</span>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Rubrique concernée</label>
                  <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }}>
                    {tabs.map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Thème proposé *</label>
                  <input type="text" placeholder="Ex : Mycologie, Champignons comestibles…" className="px-4 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Pourquoi ce thème ? (optionnel)</label>
                  <textarea rows={2} placeholder="Explique brièvement l'intérêt pour la communauté…" className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                    style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
                </div>
                <button onClick={() => setSuggestSent(true)} className="w-full py-3 rounded-full font-bold text-sm" style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>Envoyer ma suggestion</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ═══ FORMULAIRE PUBLICATION ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}>
          <div className="w-full max-w-lg rounded-2xl p-8 flex flex-col gap-4 overflow-y-auto max-h-[90vh]" style={{ backgroundColor: "#F5EFD8" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "#1E3524" }}>Publier une fiche</h2>
              <button onClick={() => setShowForm(false)} className="text-2xl opacity-40 hover:opacity-70" style={{ color: "#1E3524" }}>×</button>
            </div>
            <div className="rounded-xl p-3 flex gap-2 text-xs" style={{ backgroundColor: "rgba(79,107,71,0.12)", color: "#1E3524", border: "1px solid #C4B898" }}>
              <span>🌱</span><span>Partage ce qui fonctionne vraiment. Ton expérience de terrain vaut plus que n&apos;importe quel guide.</span>
            </div>
            {[{ label: "Titre *", type: "text", placeholder: "Ex : Mon potager en carrés, saison 2025…" }, { label: "Ta ville", type: "text", placeholder: "Pour contextualiser (région, climat…)" }].map((f) => (
              <div key={f.label} className="flex flex-col gap-1">
                <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className="px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Thème</label>
              <select className="px-3 py-2.5 rounded-lg text-sm" style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }}>
                {tabs.map((t) => <option key={t.id}>{t.icon} {t.label}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Contenu *</label>
              <textarea rows={5} placeholder="Décris ta technique, ton expérience, les étapes, ce qui a marché ou raté…" className="px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ border: "1.5px solid #C4B898", color: "#1E3524", backgroundColor: "#F5EFD8" }} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold" style={{ color: "#1E3524" }}>Photos</label>
              <input type="file" multiple accept="image/*" className="text-sm" style={{ color: "#1E3524" }} />
            </div>
            <button className="w-full py-3 rounded-full font-bold text-base mt-1" style={{ backgroundColor: "#4F6B47", color: "#F5EFD8" }}>Publier ma fiche</button>
          </div>
        </div>
      )}

      <div className="text-center py-8" style={{ backgroundColor: "#E9DFC8" }}>
        <Link href="/" className="text-sm opacity-40 hover:opacity-70 transition-opacity" style={{ color: "#1E3524" }}>← Retour à l&apos;accueil</Link>
      </div>
    </>
  );
}
