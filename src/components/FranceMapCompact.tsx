"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

const GEO_URL = "/france-departements.geojson";
const TERRIERS_ACTIFS = new Set(["33", "69", "31", "44", "87", "63"]);

export default function FranceMapCompact() {
  const [tooltip, setTooltip] = useState<{ nom: string; x: number; y: number } | null>(null);
  const router = useRouter();

  return (
    <div className="relative select-none w-full" style={{ maxWidth: 480, margin: "0 auto" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [2.5, 46.5], scale: 2600 }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const code = geo.properties.code as string;
                const nom = geo.properties.nom as string;
                const isActive = TERRIERS_ACTIFS.has(code);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => router.push("/terriers")}
                    onMouseEnter={(e) => {
                      const rect = (e.target as SVGElement).closest("svg")?.getBoundingClientRect();
                      setTooltip({ nom, x: e.clientX - (rect?.left ?? 0), y: e.clientY - (rect?.top ?? 0) });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isActive ? "#4F6B47" : "#1a3020",
                        stroke: isActive ? "#D8B56A" : "#0f2015",
                        strokeWidth: isActive ? 0.7 : 0.3,
                        outline: "none",
                        cursor: "pointer",
                      },
                      hover: {
                        fill: "#D8B56A",
                        stroke: "#D8B56A",
                        strokeWidth: 0.8,
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

      <p className="text-center text-xs mt-3" style={{ color: "#6B4F34", opacity: 0.65 }}>
        Survolez ou cliquez pour rejoindre un Terrier · Zones illuminées = Terriers actifs
      </p>
    </div>
  );
}
