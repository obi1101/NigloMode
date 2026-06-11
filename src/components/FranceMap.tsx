"use client";
import { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "/france-departements.geojson";

type Annonce = {
  id: number;
  titre: string;
  type: "Demande" | "Offre";
  categorie: string;
  ville: string;
  dist: number;
  troc: boolean;
  desc: string;
};

const annoncesByDept: Record<string, Annonce[]> = {
  "11": [
    { id: 1, titre: "Aide pour réparer une toiture", type: "Demande", categorie: "Bricolage", ville: "Carcassonne", dist: 0, troc: true, desc: "Cherche quelqu'un avec expérience en couverture. Propose légumes du jardin en échange." },
    { id: 2, titre: "Cours de mécanique vélo", type: "Offre", categorie: "Mécanique", ville: "Limoux", dist: 24, troc: false, desc: "Mécanicien amateur, propose initiation réparation vélo tous niveaux." },
    { id: 3, titre: "Covoiturage Carcassonne ↔ Narbonne", type: "Offre", categorie: "Transport", ville: "Carcassonne", dist: 5, troc: true, desc: "Trajet quotidien matin. Service ou petit troc accepté en retour." },
    { id: 4, titre: "Aide jardinage personne âgée", type: "Demande", categorie: "Jardinage", ville: "Conques-sur-Orbiel", dist: 11, troc: true, desc: "Ma mère ne peut plus jardiner seule. Propose des conserves maison en échange." },
  ],
  "34": [
    { id: 5, titre: "Prêt d'une remorque", type: "Offre", categorie: "Transport", ville: "Montpellier", dist: 3, troc: false, desc: "Remorque disponible les week-ends, premier arrivé premier servi." },
    { id: 6, titre: "Cours de couture débutant", type: "Offre", categorie: "Artisanat", ville: "Montpellier", dist: 8, troc: true, desc: "Propose cours de couture. Accepte cours de cuisine ou jardinage en échange." },
  ],
  "33": [
    { id: 7, titre: "Aide déménagement", type: "Demande", categorie: "Transport", ville: "Bordeaux", dist: 2, troc: true, desc: "Déménagement samedi prochain. Propose bouteilles de vin de mon domaine." },
    { id: 8, titre: "Réparation PC portable", type: "Offre", categorie: "Informatique", ville: "Mérignac", dist: 12, troc: false, desc: "Technicien informatique, diagnostique et réparation à domicile." },
  ],
  "69": [
    { id: 9, titre: "Garde de chien week-end", type: "Offre", categorie: "Autre", ville: "Lyon", dist: 4, troc: true, desc: "Adore les animaux, disponible certains week-ends. Troc ou service." },
    { id: 10, titre: "Aide administratif retraite", type: "Demande", categorie: "Administratif", ville: "Villeurbanne", dist: 7, troc: false, desc: "Dossier retraite complexe, cherche quelqu'un qui s'y connaît." },
  ],
  "75": [
    { id: 11, titre: "Cours de français pour réfugiés", type: "Offre", categorie: "Éducation", ville: "Paris 11e", dist: 1, troc: false, desc: "Professeur bénévole, cours collectifs le samedi matin." },
  ],
  "13": [
    { id: 12, titre: "Partage de récolte tomates", type: "Offre", categorie: "Jardinage", ville: "Marseille", dist: 6, troc: true, desc: "Trop de tomates cette année ! En échange de confiture ou autre récolte." },
  ],
};

const rayons = [5, 10, 20, 30, 50, 100];

export default function FranceMap() {
  const [deptActif, setDeptActif] = useState<{ code: string; nom: string } | null>(null);
  const [tooltip, setTooltip] = useState<{ nom: string; x: number; y: number } | null>(null);
  const [rayon, setRayon] = useState(20);
  const [trocSeulement, setTrocSeulement] = useState(false);
  const [typeFiltre, setTypeFiltre] = useState<"Tous" | "Demande" | "Offre">("Tous");

  const annoncesBase: Annonce[] = deptActif ? (annoncesByDept[deptActif.code] ?? []) : [];

  const annoncesFiltrees = annoncesBase.filter((a) => {
    if (a.dist > rayon) return false;
    if (trocSeulement && !a.troc) return false;
    if (typeFiltre !== "Tous" && a.type !== typeFiltre) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-8">

      {/* Carte */}
      <div className="relative select-none" style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [2.5, 46.5], scale: 2600 }}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup zoom={1} minZoom={1} maxZoom={6}>
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const code = geo.properties.code as string;
                  const nom = geo.properties.nom as string;
                  const isActive = deptActif?.code === code;
                  const hasDonnees = !!annoncesByDept[code]?.length;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => setDeptActif(isActive ? null : { code, nom })}
                      onMouseEnter={(e) => {
                        const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
                        setTooltip({ nom: `${code} — ${nom}`, x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      style={{
                        default: {
                          fill: isActive ? "#D8B56A" : hasDonnees ? "#4F6B47" : "#1a3020",
                          stroke: isActive ? "#D8B56A" : hasDonnees ? "#2D6A4F" : "#0f2015",
                          strokeWidth: isActive ? 0.8 : 0.4,
                          outline: "none",
                          cursor: "pointer",
                          transition: "fill 0.12s",
                        },
                        hover: {
                          fill: isActive ? "#D8B56A" : "#6B8F5E",
                          stroke: "#D8B56A",
                          strokeWidth: 0.7,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: { fill: "#D8B56A", outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {tooltip && (
          <div className="absolute pointer-events-none px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg z-10"
            style={{ left: tooltip.x + 12, top: tooltip.y - 10, backgroundColor: "#1E3524", color: "#D8B56A", whiteSpace: "nowrap", border: "1px solid rgba(216,181,106,0.3)" }}>
            🦔 {tooltip.nom}
          </div>
        )}
        <p className="text-center text-xs mt-2" style={{ color: "#6B4F34", opacity: 0.6 }}>
          Cliquez sur votre département · Zoomez avec la molette
        </p>
      </div>

      {/* Filtres + résultats */}
      {deptActif && (
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-bold" style={{ color: "#1E3524" }}>
                🦔 {deptActif.nom} <span className="text-sm font-normal opacity-40">({deptActif.code})</span>
              </h3>
              <p className="text-sm" style={{ color: "#6B4F34", opacity: 0.7 }}>{annoncesFiltrees.length} annonce{annoncesFiltrees.length > 1 ? "s" : ""} dans ce périmètre</p>
            </div>
            <button onClick={() => setDeptActif(null)} className="text-xs hover:opacity-90 transition-opacity"
              style={{ color: "#6B4F34", opacity: 0.55 }}>✕ Changer de département</button>
          </div>

          {/* Filtres */}
          <div className="rounded-2xl p-5 flex flex-wrap gap-4 items-end"
            style={{ backgroundColor: "#EDE4C4", border: "1px solid #C4B898" }}>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1E3524", opacity: 0.65 }}>Rayon</label>
              <div className="flex gap-1.5 flex-wrap">
                {rayons.map((r) => (
                  <button key={r} onClick={() => setRayon(r)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: rayon === r ? "#1E3524" : "rgba(30,53,36,0.08)",
                      color: rayon === r ? "#D8B56A" : "rgba(30,53,36,0.65)",
                      border: `1px solid ${rayon === r ? "#1E3524" : "rgba(30,53,36,0.2)"}`,
                    }}>
                    {r} km
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1E3524", opacity: 0.65 }}>Type</label>
              <div className="flex gap-1.5">
                {(["Tous", "Demande", "Offre"] as const).map((t) => (
                  <button key={t} onClick={() => setTypeFiltre(t)}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-colors"
                    style={{
                      backgroundColor: typeFiltre === t ? "#1E3524" : "rgba(30,53,36,0.08)",
                      color: typeFiltre === t ? "#D8B56A" : "rgba(30,53,36,0.65)",
                      border: `1px solid ${typeFiltre === t ? "#1E3524" : "rgba(30,53,36,0.2)"}`,
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div onClick={() => setTrocSeulement(!trocSeulement)}
                className="w-10 h-5 rounded-full relative transition-colors"
                style={{ backgroundColor: trocSeulement ? "#4F6B47" : "rgba(30,53,36,0.18)" }}>
                <div className="absolute top-0.5 w-4 h-4 rounded-full shadow transition-transform"
                  style={{ backgroundColor: "white", transform: trocSeulement ? "translateX(22px)" : "translateX(2px)" }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: "rgba(30,53,36,0.65)" }}>
                🔄 Accepte troc ou service
              </span>
            </label>
          </div>

          {/* Annonces */}
          {annoncesFiltrees.length === 0 ? (
            <div className="rounded-2xl p-8 text-center"
              style={{ backgroundColor: "rgba(30,53,36,0.05)", border: "1px solid #C4B898" }}>
              <p className="text-sm" style={{ color: "#6B4F34", opacity: 0.65 }}>Aucune annonce dans ce périmètre avec ces filtres.</p>
              <button className="mt-4 px-5 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#4F6B47", color: "white" }}>
                + Publier la première annonce
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {annoncesFiltrees.map((a) => (
                <div key={a.id} className="rounded-2xl p-5 flex flex-col gap-3"
                  style={{ backgroundColor: "#F5EFD8", border: "1px solid #C4B898" }}>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: a.type === "Demande" ? "#FDE68A" : "#D6F5F3", color: a.type === "Demande" ? "#92400e" : "#1A9E94" }}>
                      {a.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: "#E9DFC8", color: "#1E3524" }}>
                      {a.categorie}
                    </span>
                    {a.troc && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: "#e8f5e9", color: "#2D6A4F", border: "1px solid #a5d6a7" }}>
                        🔄 Troc / service
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm leading-snug" style={{ color: "#1E3524" }}>{a.titre}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "#3a2a1a", opacity: 0.65 }}>{a.desc}</p>
                  <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: "1px solid #C4B898" }}>
                    <span className="text-xs" style={{ color: "#1E3524", opacity: 0.5 }}>📍 {a.ville} · à {a.dist} km</span>
                    <button className="px-4 py-1.5 rounded-full text-xs font-bold hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: "#1E3524", color: "white" }}>
                      Contacter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!deptActif && (
        <p className="text-center text-sm pb-4" style={{ color: "#6B4F34", opacity: 0.55 }}>
          Sélectionnez un département sur la carte pour voir les annonces et Terriers proches
        </p>
      )}
    </div>
  );
}
