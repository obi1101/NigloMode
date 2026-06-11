"use client";
import { useState } from "react";
import Link from "next/link";

const lucioles = Array.from({ length: 10 }, (_, i) => ({
  id: i, top: `${8 + (i * 43) % 76}%`, left: `${4 + (i * 61) % 90}%`,
  size: 2 + (i % 3), opacity: 0.18 + (i % 4) * 0.09,
}));

const concernes = [
  "Artisans", "Producteurs", "Agriculteurs", "Maraîchers", "Apiculteurs",
  "Commerçants indépendants", "Auto-entrepreneurs", "Petites entreprises locales",
  "Ateliers", "Coopératives", "Associations",
];

const fonctionnalites = [
  "Badge Professionnel visible sur votre fiche",
  "Fiche professionnelle dédiée et personnalisée",
  "Présence sur la carte des Terriers",
  "Coordonnées complètes (adresse, téléphone, site)",
  "Galerie photos de votre activité",
  "Présentation détaillée de votre savoir-faire",
  "Mise en avant dans les recherches locales",
  "Participation aux initiatives et événements locaux",
  "Outils de visibilité supplémentaires à venir",
];

type FormData = { nom: string; activite: string; commune: string; email: string; site: string; presentation: string };
const emptyForm: FormData = { nom: "", activite: "", commune: "", email: "", site: "", presentation: "" };

export default function EspaceProPage() {
  const [form, setForm]   = useState<FormData>(emptyForm);
  const [sent, setSent]   = useState(false);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const envoyer = () => {
    if (!form.nom || !form.activite || !form.commune || !form.email) return;
    setSent(true);
    setForm(emptyForm);
  };

  const inputStyle = { border: "1.5px solid #C4B898", backgroundColor: "#EDE4C4", color: "#1E3524" };

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
          <span className="text-4xl">🏷️</span>
          <h1 style={{ fontSize: "clamp(1.7rem,4vw,2.6rem)", fontWeight: 900, color: "#ffffff", lineHeight: 1.2 }}>
            Espace <span style={{ color: "#D8B56A" }}>Professionnels</span>
          </h1>
          <p className="text-base font-medium" style={{ color: "rgba(245,239,216,0.75)" }}>
            Artisans, producteurs, commerçants indépendants, associations et acteurs locaux.
          </p>
          <p className="text-sm leading-relaxed max-w-xl" style={{ color: "rgba(245,239,216,0.60)" }}>
            Vous participez à la vie de votre territoire ? NigloMode prépare actuellement un espace destiné aux
            professionnels, artisans, producteurs, associations et structures locales souhaitant présenter leur
            activité et rejoindre le réseau du Terrier.
          </p>
          <a href="#formulaire"
            className="mt-2 px-7 py-3 rounded-2xl font-bold text-sm transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
            Se faire connaître →
          </a>
        </div>
        <div className="absolute bottom-5 z-10 flex items-center gap-3 px-5 py-2.5 rounded-2xl"
          style={{ left: "50%", transform: "translateX(-50%)", backgroundColor: "rgba(6,14,8,0.45)", border: "1px solid rgba(216,181,106,0.35)", backdropFilter: "blur(4px)", whiteSpace: "nowrap" }}>
          <span>🦔</span>
          <p className="text-xs italic" style={{ color: "#F5EFD8" }}>&ldquo;Les artisans et producteurs locaux sont la richesse de nos territoires.&rdquo;</p>
        </div>
      </section>

      {/* ═══ EN PRÉPARATION ═══ */}
      <section style={{ backgroundColor: "#F5EFD8" }} className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-6 flex gap-4 items-start" style={{ backgroundColor: "#EDE4C4", border: "2px dashed #C4B898" }}>
            <span className="text-3xl flex-shrink-0">🚧</span>
            <div>
              <h2 className="font-extrabold text-lg mb-2" style={{ color: "#1E3524" }}>Offre en préparation</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>
                Les fonctionnalités professionnelles sont actuellement en cours de réflexion et de développement.
                Les services, outils et tarifs présentés sur cette page sont donnés à titre indicatif et pourront
                évoluer avec le projet.
              </p>
              <p className="text-sm mt-2" style={{ color: "#4F6B47" }}>
                Les professionnels intéressés peuvent néanmoins déjà <strong>se faire connaître</strong> afin de
                participer aux échanges et contribuer à la construction de cet espace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUI EST CONCERNÉ ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-3xl">🎯</span>
            <h2 className="font-extrabold text-xl mt-2" style={{ color: "#1E3524" }}>Qui est concerné ?</h2>
            <p className="text-sm mt-2" style={{ color: "#4F6B47" }}>
              Cet espace est principalement destiné aux acteurs locaux de proximité.
              NigloMode privilégie les structures à taille humaine, les savoir-faire locaux
              et les activités ancrées dans leur territoire.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {concernes.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{ backgroundColor: "#F5EFD8", color: "#1E3524", border: "1px solid #C4B898" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TARIF ═══ */}
      <section id="tarifs" style={{ backgroundColor: "#F5EFD8", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-3xl">🏷️</span>
            <h2 className="font-extrabold text-xl mt-2" style={{ color: "#1E3524" }}>Niglo Pro</h2>
            <p className="text-xs mt-1" style={{ color: "#C4B898" }}>Tarif indicatif susceptible d&apos;évoluer pendant la phase de développement</p>
          </div>
          <div className="rounded-2xl p-7 flex flex-col gap-5" style={{ backgroundColor: "#1E3524", border: "2px solid #D8B56A" }}>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="font-black text-3xl" style={{ color: "#D8B56A" }}>9,90 €</p>
                <p className="text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>/ mois</p>
              </div>
              <div className="text-sm" style={{ color: "rgba(245,239,216,0.35)" }}>ou</div>
              <div className="text-center">
                <p className="font-black text-3xl" style={{ color: "#D8B56A" }}>99 €</p>
                <p className="text-xs" style={{ color: "rgba(245,239,216,0.55)" }}>/ an</p>
              </div>
            </div>
            <p className="text-sm text-center" style={{ color: "rgba(245,239,216,0.65)" }}>
              Une formule destinée aux professionnels souhaitant gagner en visibilité locale tout en participant
              à la dynamique du réseau NigloMode.
            </p>
            <ul className="flex flex-col gap-2">
              {fonctionnalites.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "rgba(245,239,216,0.85)" }}>
                  <span className="flex-shrink-0 mt-0.5">✅</span><span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#formulaire"
              className="text-center py-3 rounded-xl font-extrabold text-sm transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#D8B56A", color: "#1E3524" }}>
              Je suis intéressé — me faire connaître
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ESPRIT DU TERRIER ═══ */}
      <section style={{ backgroundColor: "#EDE4C4", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          <div className="text-center flex flex-col gap-3">
            <span className="text-3xl">🦔</span>
            <h2 className="font-extrabold text-xl" style={{ color: "#1E3524" }}>L&apos;esprit du Terrier</h2>
            <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>
              NigloMode n&apos;a pas vocation à devenir un annuaire généraliste ou une plateforme publicitaire.
              L&apos;objectif est de mettre en valeur les femmes et les hommes qui participent concrètement à la vie
              locale, aux savoir-faire, à la production, à l&apos;entraide et aux initiatives de proximité.
            </p>
          </div>

          {/* Mot du fondateur */}
          <div className="rounded-2xl p-6 flex flex-col gap-3"
            style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898", borderLeft: "4px solid #D8B56A" }}>
            <p className="text-xs font-extrabold tracking-wider uppercase" style={{ color: "#D8B56A" }}>🦔 Mot du fondateur</p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#4F6B47" }}>
              &ldquo;Les artisans, producteurs, commerçants, associations et acteurs locaux font partie intégrante
              de la richesse de nos territoires.
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#4F6B47" }}>
              Cet espace a pour vocation de leur offrir davantage de visibilité tout en renforçant les liens entre
              habitants, initiatives locales et savoir-faire de proximité.
            </p>
            <p className="text-sm leading-relaxed italic" style={{ color: "#4F6B47" }}>
              L&apos;objectif n&apos;est pas de créer un annuaire de plus, mais de renforcer les liens entre les personnes
              qui font vivre nos territoires.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ═══ FORMULAIRE ═══ */}
      <section id="formulaire" style={{ backgroundColor: "#F5EFD8", borderTop: "1px solid #C4B898" }} className="py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-3xl">📩</span>
            <h2 className="font-extrabold text-xl mt-2" style={{ color: "#1E3524" }}>Je suis intéressé</h2>
            <p className="text-sm mt-1" style={{ color: "#4F6B47" }}>
              Faites-vous connaître dès maintenant — nous vous recontacterons en priorité.
            </p>
          </div>

          {sent ? (
            <div className="rounded-2xl p-8 text-center flex flex-col items-center gap-4"
              style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <span className="text-5xl">🦔</span>
              <h3 className="font-extrabold text-lg" style={{ color: "#1E3524" }}>Merci pour votre intérêt !</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#4F6B47" }}>
                L&apos;espace professionnel est actuellement en préparation.
                Nous vous recontacterons lorsque les premières fonctionnalités seront disponibles.
              </p>
              <button onClick={() => setSent(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                Soumettre une autre demande
              </button>
            </div>
          ) : (
            <div className="rounded-2xl p-6 flex flex-col gap-4" style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {([
                  ["Nom / Prénom *",        "nom",        "text",  "Marie Dupont"],
                  ["Activité *",            "activite",   "text",  "Maraîchère bio, apiculteur…"],
                  ["Commune *",             "commune",    "text",  "Montpellier, 34…"],
                  ["Adresse e-mail *",      "email",      "email", "contact@exemple.fr"],
                  ["Site internet",         "site",       "url",   "www.monsite.fr (facultatif)"],
                ] as const).map(([label, key, type, placeholder]) => (
                  <div key={key} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>{label}</label>
                    <input type={type} value={form[key]} onChange={set(key as keyof FormData)}
                      placeholder={placeholder}
                      className="px-3 py-2 rounded-xl text-sm outline-none"
                      style={inputStyle} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: "#4F6B47" }}>Présentation rapide de votre activité</label>
                <textarea value={form.presentation} onChange={set("presentation")}
                  placeholder="En quelques mots : ce que vous faites, où, pour qui…"
                  rows={3} className="px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                  style={inputStyle} />
              </div>
              <button onClick={envoyer}
                disabled={!form.nom || !form.activite || !form.commune || !form.email}
                className="py-3 rounded-xl font-extrabold text-sm transition-opacity disabled:opacity-35 hover:opacity-85"
                style={{ backgroundColor: "#1E3524", color: "#D8B56A" }}>
                Envoyer ma demande
              </button>
              <p className="text-xs text-center" style={{ color: "#C4B898" }}>
                * Champs obligatoires — vos informations restent confidentielles
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/annuaire" className="text-xs underline" style={{ color: "#C4B898" }}>
              Voir l&apos;Annuaire du Terrier →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
