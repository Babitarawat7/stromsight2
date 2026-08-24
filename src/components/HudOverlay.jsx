import React from 'react';
import { 
  Wind, 
  Gauge, 
  Navigation, 
  Target, 
  BrainCircuit, 
  Layers, 
  ShieldAlert,
  Eye,
  Zap,
  MapPin
} from 'lucide-react';
import { formatLatLon, getCategoryBadgeColor, formatSpeed } from '../utils/formatters';

export default function HudOverlay({ 
  selectedCyclone, 
  currentTimestepIdx, 
  layerVisibility, 
  setLayerVisibility,
  onSelectDistrictByName
}) {
  const activeStep = selectedCyclone.timesteps[currentTimestepIdx] || selectedCyclone.timesteps[0];

  return (
    <>
      {/* TOP LEFT: Main Cyclone Telemetry HUD */}
      <div className="absolute top-16 left-4 z-20 w-80 sm:w-96 hud-panel p-4 text-xs font-mono select-none">
        {/* Header Badge */}
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#192238]">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-heading text-sm font-bold text-slate-100 uppercase tracking-wider">
              {selectedCyclone.name}
            </span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getCategoryBadgeColor(activeStep.category)}`}>
            {activeStep.category}
          </span>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Sustained Wind */}
          <div className="bg-[#060913]/80 p-2.5 rounded border border-[#192238]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center space-x-1">
                <Wind className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="text-[10px]">MAX WIND</span>
              </span>
              <span className="text-[9px] text-slate-500">10M SUSTAINED</span>
            </div>
            <div className="text-lg font-bold text-[#00F0FF]">
              {activeStep.windKmh} <span className="text-xs font-normal text-slate-400">km/h</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              GUSTS: <span className="text-slate-200">{activeStep.gustKmh} km/h</span> ({activeStep.windKts} kts)
            </div>
          </div>

          {/* Central Pressure */}
          <div className="bg-[#060913]/80 p-2.5 rounded border border-[#192238]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center space-x-1">
                <Gauge className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px]">PRESSURE</span>
              </span>
              <span className="text-[9px] text-slate-500">MIN CORE</span>
            </div>
            <div className="text-lg font-bold text-amber-400">
              {activeStep.pressure} <span className="text-xs font-normal text-slate-400">hPa</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              TENDENCY: <span className="text-red-400">FALLING (-4 hPa/3h)</span>
            </div>
          </div>

          {/* Eyewall Coordinates */}
          <div className="bg-[#060913]/80 p-2.5 rounded border border-[#192238]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[10px]">EYE POSITION</span>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-100">
              {formatLatLon(activeStep.lat, activeStep.lon)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              TIMESTEP: <span className="text-[#00F0FF]">{activeStep.label}</span>
            </div>
          </div>

          {/* Movement Vector */}
          <div className="bg-[#060913]/80 p-2.5 rounded border border-[#192238]">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center space-x-1">
                <Navigation className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px]">FORWARD VECTOR</span>
              </span>
            </div>
            <div className="text-xs font-bold text-slate-100 truncate">
              {activeStep.movement}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              SURGE EST: <span className="text-red-400 font-semibold">{activeStep.surgeMaxMeters}m</span>
            </div>
          </div>
        </div>

        {/* High Risk District Quick Bar */}
        {activeStep.highRiskDistricts && (
          <div className="mt-3 pt-2.5 border-t border-[#192238]">
            <div className="text-[10px] text-slate-400 mb-1.5 flex items-center justify-between">
              <span className="flex items-center space-x-1 text-red-400 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>DIRECT IMPACT DISTRICTS ({activeStep.highRiskDistricts.length})</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeStep.highRiskDistricts.map(name => (
                <button
                  key={name}
                  onClick={() => onSelectDistrictByName(name)}
                  className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800/60 text-red-300 text-[10px] hover:bg-red-900/80 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TOP RIGHT: AI Ensemble Confidence Panel */}
      <div className="absolute top-16 right-4 z-20 hidden md:block w-72 hud-panel p-3 text-xs font-mono select-none">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#192238]">
          <span className="flex items-center space-x-1.5 text-slate-200 font-bold text-xs">
            <BrainCircuit className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>AI ENSEMBLE INDEX</span>
          </span>
          <span className="text-[10px] text-[#00F0FF] font-semibold">
            {selectedCyclone.ensembleAgreement} MATCH
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">STROMSIGHT Neural-v4:</span>
            <span className="text-[#00F0FF] font-semibold">HIGH CONSENSUS</span>
          </div>
          <div className="w-full h-1.5 bg-[#060913] rounded overflow-hidden border border-[#192238]">
            <div className="h-full bg-[#00F0FF] rounded" style={{ width: selectedCyclone.ensembleAgreement }} />
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 text-slate-400">
            <div>
              ECMWF Drift: <span className="text-slate-200">{selectedCyclone.aiTrackDrift}</span>
            </div>
            <div>
              GFS Variance: <span className="text-slate-200">±1.4 km</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT: Map GIS Layer Controls */}
      <div className="absolute bottom-16 right-4 z-20 hud-panel p-2.5 font-mono text-xs select-none">
        <div className="text-[10px] text-slate-400 mb-2 flex items-center space-x-1.5 pb-1.5 border-b border-[#192238]">
          <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>GIS MAP LAYERS</span>
        </div>

        <div className="flex flex-col space-y-1.5">
          <button
            onClick={() => setLayerVisibility(prev => ({ ...prev, satellite: !prev.satellite }))}
            className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border transition-colors ${
              layerVisibility.satellite ? 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]' : 'bg-[#060913] border-[#192238] text-slate-400'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Eye className="w-3 h-3" />
              <span>Satellite Radar Eye</span>
            </span>
            <span className="text-[9px]">{layerVisibility.satellite ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setLayerVisibility(prev => ({ ...prev, cone: !prev.cone }))}
            className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border transition-colors ${
              layerVisibility.cone ? 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]' : 'bg-[#060913] border-[#192238] text-slate-400'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Target className="w-3 h-3" />
              <span>Uncertainty Cone</span>
            </span>
            <span className="text-[9px]">{layerVisibility.cone ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setLayerVisibility(prev => ({ ...prev, windRadius: !prev.windRadius }))}
            className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border transition-colors ${
              layerVisibility.windRadius ? 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]' : 'bg-[#060913] border-[#192238] text-slate-400'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Wind className="w-3 h-3" />
              <span>Wind Radius (R34/50/64)</span>
            </span>
            <span className="text-[9px]">{layerVisibility.windRadius ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setLayerVisibility(prev => ({ ...prev, districts: !prev.districts }))}
            className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border transition-colors ${
              layerVisibility.districts ? 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]' : 'bg-[#060913] border-[#192238] text-slate-400'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>Coastal Risk Zones</span>
            </span>
            <span className="text-[9px]">{layerVisibility.districts ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setLayerVisibility(prev => ({ ...prev, grid: !prev.grid }))}
            className={`flex items-center justify-between px-2 py-1 rounded text-[11px] border transition-colors ${
              layerVisibility.grid ? 'bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF]' : 'bg-[#060913] border-[#192238] text-slate-400'
            }`}
          >
            <span className="flex items-center space-x-1.5">
              <Zap className="w-3 h-3" />
              <span>Nautical GIS Grid</span>
            </span>
            <span className="text-[9px]">{layerVisibility.grid ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
