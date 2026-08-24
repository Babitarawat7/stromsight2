import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  AlertTriangle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

export default function SimulationDock({ 
  selectedCyclone, 
  currentTimestepIdx, 
  setCurrentTimestepIdx 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x or 2x
  const [showExplainBox, setShowExplainBox] = useState(true);

  const timesteps = selectedCyclone.timesteps;
  const activeStep = timesteps[currentTimestepIdx] || timesteps[0];

  // Playback Timer
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      const delay = playbackSpeed === 1 ? 2800 : 1400;
      interval = setInterval(() => {
        setCurrentTimestepIdx(prev => {
          if (prev >= timesteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playbackSpeed, timesteps.length, setCurrentTimestepIdx]);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-4xl font-mono select-none">
      {/* "Why did risk change?" AI Explainability Box */}
      {showExplainBox && activeStep.whyRiskChanged && (
        <div className="hud-panel p-3 mb-2.5 border-l-4 border-l-[#00F0FF] animate-fadeIn">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#192238] mb-1.5">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF] animate-pulse" />
              <span className="text-xs font-bold text-slate-100 uppercase tracking-wider">
                WHY DID RISK CHANGE AT {activeStep.label}?
              </span>
            </div>
            <button
              onClick={() => setShowExplainBox(false)}
              className="text-[10px] text-slate-500 hover:text-slate-300"
            >
              [ HIDE EXPLANATION ]
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeStep.whyRiskChanged}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-[#192238]/60 text-[10px] text-slate-400">
            <div>
              EYEWALL STATUS: <span className="text-[#00F0FF] font-semibold">{activeStep.eyeStatus}</span>
            </div>
            <div>
              MAX SURGE ESTIMATE: <span className="text-red-400 font-semibold">{activeStep.surgeMaxMeters} meters</span>
            </div>
            <div>
              UNCERTAINTY CONE: <span className="text-amber-400 font-semibold">±{activeStep.uncertaintyKm} km</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Timeline Scrubber Dock */}
      <div className="hud-panel p-3">
        {/* Top Control Strip */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#192238]">
          {/* Left: Play/Pause Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                isPlaying
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 hover:bg-[#00F0FF]/30'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY FORECAST'}</span>
            </button>

            <button
              onClick={() => setCurrentTimestepIdx(prev => Math.max(0, prev - 1))}
              disabled={currentTimestepIdx === 0}
              className="p-1.5 rounded bg-[#060913] border border-[#192238] text-slate-400 hover:text-slate-200 disabled:opacity-40"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setCurrentTimestepIdx(prev => Math.min(timesteps.length - 1, prev + 1))}
              disabled={currentTimestepIdx === timesteps.length - 1}
              className="p-1.5 rounded bg-[#060913] border border-[#192238] text-slate-400 hover:text-slate-200 disabled:opacity-40"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            {/* Speed multiplier */}
            <button
              onClick={() => setPlaybackSpeed(prev => (prev === 1 ? 2 : 1))}
              className="px-2 py-1 rounded bg-[#060913] border border-[#192238] text-[10px] text-slate-300 hover:border-[#293859]"
            >
              SPEED: <span className="text-[#00F0FF] font-bold">{playbackSpeed}x</span>
            </button>
          </div>

          {/* Center: Current Timestep Telemetry Tag */}
          <div className="flex items-center space-x-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-slate-400">TIMESTEP:</span>
            <span className="text-[#00F0FF] font-bold">{activeStep.label}</span>
            <span className="text-slate-500">({activeStep.timestamp})</span>
          </div>

          {/* Right: Toggle Explanation Drawer */}
          <button
            onClick={() => setShowExplainBox(!showExplainBox)}
            className="flex items-center space-x-1 text-[11px] text-slate-400 hover:text-[#00F0FF]"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showExplainBox ? 'HIDE AI REASONING' : 'WHY RISK CHANGED?'}</span>
          </button>
        </div>

        {/* Timeline Scrubber Track & Waypoint Buttons */}
        <div className="relative flex items-center justify-between px-2 pt-1 pb-1">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-4 right-4 h-1 -translate-y-1/2 bg-[#060913] border border-[#192238] rounded -z-0" />
          {/* Filled Progress Segment */}
          <div 
            className="absolute top-1/2 left-4 h-1 -translate-y-1/2 bg-[#00F0FF] rounded -z-0 transition-all duration-300"
            style={{ width: `${(currentTimestepIdx / (timesteps.length - 1)) * 95}%` }}
          />

          {/* Timestep Node Markers */}
          {timesteps.map((step, idx) => {
            const isActive = idx === currentTimestepIdx;
            const isPassed = idx < currentTimestepIdx;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center group">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTimestepIdx(idx);
                  }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-[#00F0FF] text-[#060913] ring-4 ring-[#00F0FF]/30 scale-110 shadow-lg'
                      : isPassed
                      ? 'bg-[#0B101D] text-[#00F0FF] border-2 border-[#00F0FF]'
                      : 'bg-[#060913] text-slate-500 border border-[#192238] hover:border-slate-400 hover:text-slate-300'
                  }`}
                >
                  {idx + 1}
                </button>

                <div className="mt-1.5 flex flex-col items-center">
                  <span className={`text-[10px] font-bold ${isActive ? 'text-[#00F0FF]' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                  <span className="text-[9px] text-slate-500 hidden sm:block">
                    {step.windKmh} km/h
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
