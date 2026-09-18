import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { projects } from '../data/projects';
import { AlertTriangle, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const createLightMarker = (risk: string) => {
  const color = risk === 'HIGH' ? '#C0392B' : risk === 'MEDIUM' ? '#D99A00' : '#198754';
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.25);"></div>`
  });
};

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onSelectProject: (p: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectProject }) => {
  const highRiskCount = projects.filter(p => p.riskLevel === 'HIGH').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#D9E1E7] rounded-lg p-5 flex justify-between items-center shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-[#123B5D]">Good morning, Dr. Senthil Nathan</h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            District Land Acquisition Monitoring Overview • Priority Corridors
          </p>
        </div>
        <button
          onClick={() => onNavigate('simulator')}
          className="bg-[#123B5D] hover:bg-[#1D5D8F] text-white text-xs font-semibold px-4 py-2 rounded shadow-sm transition"
        >
          Open What-If Simulator
        </button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#D9E1E7] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider block">Total Tracked</span>
          <span className="text-2xl font-bold text-[#1F2937] block mt-1">{projects.length} Corridors</span>
          <span className="text-[11px] text-[#64748B]">State Highway & Rail</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9E1E7] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider block">Active Acquisitions</span>
          <span className="text-2xl font-bold text-[#123B5D] block mt-1">4 Corridors</span>
          <span className="text-[11px] text-[#198754] font-medium">148.2 Hectares Surveyed</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9E1E7] shadow-sm">
          <span className="text-[11px] text-[#C0392B] font-bold uppercase tracking-wider block">High Stall Risk</span>
          <span className="text-2xl font-bold text-[#C0392B] block mt-1">{highRiskCount} Projects</span>
          <span className="text-[11px] text-[#C0392B] font-medium">Requires Priority Clearance</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#D9E1E7] shadow-sm">
          <span className="text-[11px] text-[#64748B] font-bold uppercase tracking-wider block">Overall Progress</span>
          <span className="text-2xl font-bold text-[#198754] block mt-1">68.4%</span>
          <span className="text-[11px] text-[#64748B]">Compensation Cadence Met</span>
        </div>
      </div>

      {/* Main Map + Top Priority Side-Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leaflet Light Map */}
        <div className="lg:col-span-8 bg-white border border-[#D9E1E7] rounded-lg p-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">
                Geospatial Corridor Status (Tamil Nadu Grid)
              </h4>
              <button 
                onClick={() => onNavigate('gis')}
                className="text-xs text-[#1D5D8F] font-semibold hover:underline flex items-center gap-1"
              >
                Expand GIS View <ArrowRight size={12} />
              </button>
            </div>

            <div className="h-[400px] rounded border border-[#D9E1E7] overflow-hidden">
              <MapContainer center={[11.0168, 77.5]} zoom={7} style={{ height: '100%', width: '100%' }}>
                {/* Carto Positron Light Administrative Tiles */}
                <TileLayer
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {projects.map((p) => (
                  <Marker
                    key={p.id}
                    position={[p.coordinates.lat, p.coordinates.lng]}
                    icon={createLightMarker(p.riskLevel)}
                    eventHandlers={{ click: () => onSelectProject(p) }}
                  >
                    <Popup>
                      <div className="p-1">
                        <h5 className="font-bold text-xs text-[#123B5D]">{p.name}</h5>
                        <p className="text-[11px] text-[#64748B]">{p.location}</p>
                        <p className="text-[11px] font-bold mt-1">Risk: {p.riskScore}%</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="flex gap-4 text-[11px] text-[#64748B] pt-3 border-t border-[#D9E1E7] mt-3">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#198754]"></span> Low Risk</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#D99A00]"></span> Alert (Medium)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#C0392B]"></span> Critical High Risk</span>
          </div>
        </div>

        {/* Priority Projects & Actions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#D9E1E7] rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-[#123B5D] uppercase tracking-wider">Priority Projects</h4>
              <button onClick={() => onNavigate('projects')} className="text-[11px] text-[#1D5D8F] font-semibold hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-2">
              {projects.slice(0, 3).map((p) => (
                <div 
                  key={p.id}
                  onClick={() => { onSelectProject(p); onNavigate('analytics'); }}
                  className="p-2.5 rounded border border-[#D9E1E7] hover:border-[#123B5D] cursor-pointer bg-[#F5F7F9] transition"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-xs text-[#1F2937] leading-tight block">{p.name}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      p.riskLevel === 'HIGH' ? 'bg-rose-100 text-[#C0392B]' : 'bg-emerald-100 text-[#198754]'
                    }`}>
                      {p.riskScore}% Risk
                    </span>
                  </div>
                  <span className="text-[10px] text-[#64748B] block mt-1">{p.location} • Progress: {p.progress}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#D9E1E7] rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs font-bold text-[#C0392B] uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle size={13} /> Urgent Actions
              </h4>
              <button onClick={() => onNavigate('tasks')} className="text-[11px] text-[#1D5D8F] font-semibold hover:underline">
                Tasks (3)
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 border-l-4 border-[#C0392B] bg-rose-50 rounded-r text-[#1F2937]">
                <span className="font-bold block text-[11px]">Section 19 Notification Lapsing</span>
                <span className="text-[10px] text-[#64748B]">NH-544 Bypass • Due in 12 days</span>
              </div>
              <div className="p-2 border-l-4 border-[#D99A00] bg-amber-50 rounded-r text-[#1F2937]">
                <span className="font-bold block text-[11px]">Pending High Court Affidavit</span>
                <span className="text-[10px] text-[#64748B]">Valuation dispute hearing on Friday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
