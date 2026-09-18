import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LandProject, riskColor, riskLabel } from "@/data/projects";
import { useNavigate } from "react-router-dom";

interface MapViewProps {
  projects: LandProject[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  height?: string;
  showLegend?: boolean;
  showTitle?: boolean;
  interactive?: boolean;
}

export default function MapView({
  projects,
  selectedId,
  onSelect,
  height = "100%",
  showLegend = true,
  showTitle = true,
  interactive = true,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mapRef.current && selectedId) {
      const proj = projects.find((p) => p.id === selectedId);
      if (proj) {
        mapRef.current.flyTo([proj.lat, proj.lng], 9, { duration: 1.0 });
      }
    }
  }, [selectedId, projects]);

  const handleViewDetails = (id: string) => {
    if (onSelect) onSelect(id);
    navigate(`/projects/${id}`);
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-[#D9E1E7]" style={{ height }}>
      <MapContainer
        center={[11.5, 78.2]}
        zoom={7}
        scrollWheelZoom={interactive}
        style={{ width: "100%", height: "100%", background: "#E5EAF0" }}
        ref={(m) => { mapRef.current = m; }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {projects.map((p) => {
          const color = riskColor(p.riskLevel);
          const isSelected = p.id === selectedId;
          return (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={isSelected ? 14 : 10}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: isSelected ? 0.6 : 0.4,
                weight: isSelected ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onSelect?.(p.id),
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1}>
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
                  <span style={{ color: "#64748B" }}>{p.code}</span>
                  <hr style={{ margin: "6px 0", borderColor: "#D9E1E7" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Risk Score</span>
                    <strong style={{ color }}>{p.riskScore}%</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                    <span>Status</span>
                    <span style={{ fontSize: "11px" }}>{p.status}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Parcels</span>
                    <span>{p.parcelsAcquired}/{p.parcelsTotal}</span>
                  </div>
                  <button
                    onClick={() => handleViewDetails(p.id)}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      padding: "5px 8px",
                      background: "#1D5D8F",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: 600,
                    }}
                  >
                    View Project Details →
                  </button>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {showLegend && (
        <div className="absolute bottom-3 left-3 z-[500] bg-white/95 backdrop-blur border border-[#D9E1E7] rounded-lg p-3 shadow-sm">
          <p className="text-[#64748B] text-[10px] uppercase tracking-wider font-semibold mb-2">Risk Legend</p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#198754" }} />
              <span className="text-[#1F2937] text-xs">Low Risk (&lt; 40%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#D99A00" }} />
              <span className="text-[#1F2937] text-xs">Medium Risk (40–69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#C0392B" }} />
              <span className="text-[#1F2937] text-xs">High Risk (≥ 70%)</span>
            </div>
          </div>
        </div>
      )}

      {showTitle && (
        <div className="absolute top-3 right-3 z-[500] bg-white/95 backdrop-blur border border-[#D9E1E7] rounded-lg px-3 py-2 shadow-sm">
          <p className="text-[#123B5D] text-xs font-semibold">Tamil Nadu · Land Acquisition GIS</p>
          <p className="text-[#64748B] text-[10px]">{projects.length} corridor nodes</p>
        </div>
      )}
    </div>
  );
}
