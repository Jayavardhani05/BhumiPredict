import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LandProject, riskColor, riskLabel } from "@/data/projects";

interface GISMapProps {
  projects: LandProject[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function GISMap({ projects, selectedId, onSelect }: GISMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && selectedId) {
      const proj = projects.find((p) => p.id === selectedId);
      if (proj) {
        mapRef.current.flyTo([proj.lat, proj.lng], 8, { duration: 1.2 });
      }
    }
  }, [selectedId, projects]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-700">
      <MapContainer
        center={[11.5, 78.2]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", background: "#1e293b" }}
        ref={(m) => { mapRef.current = m; }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {projects.map((p) => {
          const color = riskColor(p.riskLevel);
          const isSelected = p.id === selectedId;
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={isSelected ? 16 : 12}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: isSelected ? 0.7 : 0.5,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelect(p.id),
              }}
            >
              <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                <div style={{ fontSize: "11px", lineHeight: "1.3" }}>
                  <strong>{p.name}</strong>
                  <br />
                  <span style={{ color }}>{riskLabel(p.riskLevel)} · {p.riskScore}%</span>
                </div>
              </Tooltip>
              <Popup>
                <div style={{ minWidth: "200px", fontSize: "12px" }}>
                  <strong style={{ fontSize: "13px" }}>{p.name}</strong>
                  <br />
                  <span style={{ color: "#94a3b8" }}>{p.code}</span>
                  <hr style={{ margin: "6px 0", borderColor: "#334155" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Risk Score</span>
                    <strong style={{ color }}>{p.riskScore}%</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Status</span>
                    <span>{p.status}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Parcels</span>
                    <span>{p.parcelsAcquired}/{p.parcelsTotal}</span>
                  </div>
                  <button
                    onClick={() => onSelect(p.id)}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      padding: "4px 8px",
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    View Full Analysis →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-3 left-3 z-[500] bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-3 shadow-xl">
        <p className="text-slate-400 text-[10px] uppercase tracking-wider font-semibold mb-2">Risk Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#16a34a" }} />
            <span className="text-slate-300 text-xs">Low Risk (&lt; 40%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#d97706" }} />
            <span className="text-slate-300 text-xs">Medium Risk (40–69%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: "#dc2626" }} />
            <span className="text-slate-300 text-xs">High Risk (≥ 70%)</span>
          </div>
        </div>
      </div>

      {/* Map title overlay */}
      <div className="absolute top-3 right-3 z-[500] bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-white text-xs font-semibold">Tamil Nadu · Land Acquisition GIS</p>
        <p className="text-slate-500 text-[10px]">4 corridor nodes · Real-time monitoring</p>
      </div>
    </div>
  );
}
