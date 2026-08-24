import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Wind, 
  Waves, 
  Users, 
  Home, 
  Anchor, 
  History, 
  MapPin, 
  CheckCircle2, 
  AlertOctagon,
  Search
} from 'lucide-react';
import { COASTAL_DISTRICTS } from '../data/coastalDistricts';
import { getRiskColorHex } from '../utils/formatters';

export default function RiskPanel({ 
  selectedDistrict, 
  setSelectedDistrict, 
  selectedCyclone, 
  currentTimestepIdx 
}) {
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'historical'
  const [searchQuery, setSearchQuery] = useState('');

  const activeStep = selectedCyclone.timesteps[currentTimestepIdx] || selectedCyclone.timesteps[0];

  const filteredDistricts = COASTAL_DISTRICTS.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="absolute top-16 right-4 z-30 w-96 max-h-[85vh] hud-panel p-4 flex flex-col font-mono text-xs select-none">
      {/* Header & Mode Toggle */}
      <div className="pb-3 border-b border-[#192238] mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="font-heading font-bold text-sm text-slate-100">
              COASTAL RISK MATRIX
            </span>
          </div>
          <span className="text-[10px] text-slate-400">
            {COASTAL_DISTRICTS.length} COASTAL ZONES
          </span>
        </div>

        {/* View Mode Toggle: Current Event vs Historical Vulnerability */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-[#060913] rounded border border-[#192238]">
          <button
            onClick={() => setViewMode('current')}
            className={`py-1.5 px-2 rounded text-[11px] font-bold text-center transition-all ${
              viewMode === 'current'
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CURRENT EVENT RISK
          </button>
          <button
            onClick={() => setViewMode('historical')}
            className={`py-1.5 px-2 rounded text-[11px] font-bold text-center transition-all ${
              viewMode === 'historical'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            HISTORICAL VULNERABILITY
          </button>
        </div>
      </div>

      {/* District Selector Search */}
      <div className="relative mb-3">
        <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search district or state..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-[#060913] border border-[#192238] rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#00F0FF] placeholder:text-slate-600"
        />
      </div>

      {/* District Cards List / Detail Inspector */}
      {selectedDistrict ? (
        // Selected District Detailed Telemetry Inspector
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-bold text-slate-100 font-heading">
                {selectedDistrict.name}
              </div>
              <div className="text-[10px] text-slate-400">
                {selectedDistrict.state} · Lat/Lon: {selectedDistrict.lat}°N, {selectedDistrict.lon}°E
              </div>
            </div>
            <button
              onClick={() => setSelectedDistrict(null)}
              className="text-[10px] text-[#00F0FF] hover:underline"
            >
              [ BACK TO LIST ]
            </button>
          </div>

          {/* Risk Level Badge */}
          <div 
            className="p-3 rounded border flex items-center justify-between"
            style={{ 
              backgroundColor: `${getRiskColorHex(selectedDistrict.riskLevel)}15`,
              borderColor: getRiskColorHex(selectedDistrict.riskLevel)
            }}
          >
            <div>
              <div className="text-[10px] text-slate-400 uppercase">
                {viewMode === 'current' ? 'CURRENT THREAT ASSESSMENT' : 'BASELINE VULNERABILITY INDEX'}
              </div>
              <div className="text-base font-bold" style={{ color: getRiskColorHex(selectedDistrict.riskLevel) }}>
                {selectedDistrict.riskLevel} (SCORE: {viewMode === 'current' ? selectedDistrict.riskScore : selectedDistrict.historicalRiskScore}/100)
              </div>
            </div>
            <AlertOctagon className="w-6 h-6" style={{ color: getRiskColorHex(selectedDistrict.riskLevel) }} />
          </div>

          {/* Proximity & Hazards */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#060913] p-2 rounded border border-[#192238]">
              <div className="text-[10px] text-slate-500">DISTANCE TO EYE</div>
              <div className="text-sm font-bold text-[#00F0FF]">{selectedDistrict.distanceToEyeKm} km</div>
              <div className="text-[9px] text-slate-400 mt-0.5 truncate">{selectedDistrict.landfallProximity}</div>
            </div>

            <div className="bg-[#060913] p-2 rounded border border-[#192238]">
              <div className="text-[10px] text-slate-500">PREDICTED PEAK WIND</div>
              <div className="text-sm font-bold text-red-400">{selectedDistrict.predictedWindKmh} km/h</div>
              <div className="text-[9px] text-slate-400 mt-0.5">EST SURGE: <span className="text-amber-400">{selectedDistrict.predictedSurgeM}m</span></div>
            </div>
          </div>

          {/* Exposed Population & Shelters */}
          <div className="bg-[#060913] p-3 rounded border border-[#192238] space-y-2">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Exposed Population:</span>
              </span>
              <span className="font-bold text-slate-100">{selectedDistrict.exposedPopulation}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center space-x-1.5">
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span>Multi-Purpose Shelter Capacity:</span>
              </span>
              <span className="font-bold text-emerald-400">{selectedDistrict.shelterCapacityPercent}%</span>
            </div>

            <div className="w-full h-1.5 bg-[#121829] rounded overflow-hidden">
              <div className="h-full bg-emerald-500 rounded" style={{ width: `${selectedDistrict.shelterCapacityPercent}%` }} />
            </div>
          </div>

          {/* Critical Infrastructure Assets */}
          <div>
            <div className="text-[10px] text-slate-400 mb-1.5 flex items-center space-x-1">
              <Anchor className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>CRITICAL ASSETS AT RISK</span>
            </div>
            <div className="space-y-1.5">
              {selectedDistrict.criticalAssets.map((asset, idx) => (
                <div key={idx} className="bg-[#060913] p-2 rounded border border-[#192238] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200 text-[11px]">{asset.name}</div>
                    <div className="text-[9px] text-slate-500">{asset.type}</div>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/60 font-semibold">
                    {asset.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Historical Cyclone Impact */}
          <div className="bg-[#060913] p-2.5 rounded border border-[#192238]">
            <div className="text-[10px] text-slate-400 mb-1 flex items-center space-x-1">
              <History className="w-3.5 h-3.5 text-purple-400" />
              <span>HISTORICAL BENCHMARK NOTES</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {selectedDistrict.historicalImpact}
            </p>
          </div>
        </div>
      ) : (
        // List of All Districts
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredDistricts.map((dist) => {
            const riskColor = getRiskColorHex(dist.riskLevel);
            return (
              <button
                key={dist.id}
                onClick={() => setSelectedDistrict(dist)}
                className="w-full text-left bg-[#060913] p-2.5 rounded border border-[#192238] hover:border-[#00F0FF]/60 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-slate-200 group-hover:text-[#00F0FF] transition-colors">
                    {dist.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {dist.state} · Surge: {dist.predictedSurgeM}m
                  </div>
                </div>

                <div className="text-right">
                  <span 
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-bold border"
                    style={{ 
                      backgroundColor: `${riskColor}20`,
                      borderColor: riskColor,
                      color: riskColor 
                    }}
                  >
                    {dist.riskLevel}
                  </span>
                  <div className="text-[9px] text-slate-400 mt-0.5">
                    {dist.distanceToEyeKm} km to Eye
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
