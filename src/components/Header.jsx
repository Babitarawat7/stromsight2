import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Layers, 
  Activity, 
  Sliders, 
  Cpu, 
  Download, 
  Volume2, 
  VolumeX, 
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { CYCLONES } from '../data/cycloneData';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  selectedCyclone, 
  setSelectedCyclone, 
  onOpenExport 
}) {
  const [utcTime, setUtcTime] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 bg-[#0B101D] border-b border-[#192238] px-4 flex items-center justify-between relative z-30 select-none">
      {/* Left: Brand Identity & Active Cyclone Selector */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded bg-[#060913] border border-[#00F0FF]/40 text-[#00F0FF]">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00F0FF] animate-ping" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-lg tracking-wider text-slate-100 uppercase">
                STROMSIGHT
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 tracking-widest font-semibold">
                v4.2 AI-GIS
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:block">
              BAY OF BENGAL CYCLONE MISSION CONTROL
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-[#192238] hidden md:block" />

        {/* Active Cyclone Dropdown */}
        <div className="relative group hidden md:block">
          <div className="flex items-center space-x-2 bg-[#060913] border border-[#192238] px-3 py-1.5 rounded text-xs font-mono cursor-pointer hover:border-[#293859] transition-colors">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-300 font-semibold">{selectedCyclone.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
          </div>

          <div className="absolute left-0 top-full mt-1 w-64 bg-[#0B101D] border border-[#192238] rounded shadow-2xl py-1 hidden group-hover:block z-50">
            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 border-b border-[#192238]">
              SELECT CYCLONE EVENT
            </div>
            {CYCLONES.map((cyc) => (
              <button
                key={cyc.id}
                onClick={() => setSelectedCyclone(cyc)}
                className={`w-full text-left px-3 py-2 text-xs font-mono flex items-center justify-between hover:bg-[#121829] transition-colors ${
                  cyc.id === selectedCyclone.id ? 'text-[#00F0FF] bg-[#121829]/60 font-semibold' : 'text-slate-300'
                }`}
              >
                <span>{cyc.name}</span>
                <span className="text-[10px] text-slate-500">{cyc.status.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center: Main Navigation Tabs */}
      <nav className="flex items-center space-x-1 bg-[#060913] p-1 rounded border border-[#192238]">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
            activeTab === 'live'
              ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121829]'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>LIVE</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
            activeTab === 'risk'
              ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121829]'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>RISK</span>
        </button>

        <button
          onClick={() => setActiveTab('simulation')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
            activeTab === 'simulation'
              ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121829]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>SIMULATION</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
            activeTab === 'system'
              ? 'bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#121829]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>SYSTEM</span>
        </button>
      </nav>

      {/* Right: UTC Telemetry Clock & Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* UTC Clock */}
        <div className="hidden lg:flex flex-col items-end font-mono">
          <div className="text-xs text-slate-200 font-semibold tracking-wider flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{utcTime}</span>
          </div>
          <span className="text-[9px] text-slate-500 tracking-wider">
            INSAT-3DS LINK · 15M CADENCE
          </span>
        </div>

        {/* Audio Alert Toggle */}
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          title={audioEnabled ? 'Mute Telemetry Audio Alerts' : 'Enable Telemetry Audio Alerts'}
          className="p-1.5 rounded bg-[#060913] border border-[#192238] text-slate-400 hover:text-slate-200 hover:border-[#293859] transition-colors"
        >
          {audioEnabled ? <Volume2 className="w-4 h-4 text-[#00F0FF]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Export Briefing Button */}
        <button
          onClick={onOpenExport}
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#121829] border border-[#293859] hover:border-[#00F0FF]/60 text-slate-200 hover:text-[#00F0FF] text-xs font-mono font-semibold transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>EXPORT BRIEFING</span>
        </button>
      </div>
    </header>
  );
}
