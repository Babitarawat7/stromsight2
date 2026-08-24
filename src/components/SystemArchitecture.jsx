import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Layers, 
  Activity, 
  Radio, 
  BrainCircuit, 
  Server, 
  ArrowRight, 
  CheckCircle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';
import { PIPELINE_STAGES, SYSTEM_METRICS } from '../data/systemPipelineData';

export default function SystemArchitecture({ onClose }) {
  const [activeNode, setActiveNode] = useState(PIPELINE_STAGES[2].nodes[0]);
  const [activeThermalBand, setActiveThermalBand] = useState('IR1 (10.8µm)');

  return (
    <div className="absolute inset-0 z-40 bg-[#060913]/95 backdrop-blur-md p-6 overflow-y-auto font-mono select-none">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-[#192238] mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-100 tracking-wider">
              SYSTEM ARCHITECTURE & MULTIMODAL AI PIPELINE
            </h2>
            <p className="text-xs text-slate-400">
              INSAT-3DS + ERA5 + IMD Radar → Spatio-Temporal Data Fusion → CNN & Physics Neural Net → Coastal Risk Engine
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-3 py-1.5 rounded bg-[#121829] border border-[#293859] text-xs text-[#00F0FF] hover:border-[#00F0FF]"
        >
          [ RETURN TO MISSION CONTROL ]
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Model Metrics Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#0B101D] p-4 rounded border border-[#192238]">
          <div>
            <div className="text-[10px] text-slate-500">MODEL CORE</div>
            <div className="text-sm font-bold text-[#00F0FF]">{SYSTEM_METRICS.modelName}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Physics-Informed Transformer</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500">24H TRACK MAE</div>
            <div className="text-sm font-bold text-emerald-400">{SYSTEM_METRICS.trackErr24h}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">vs ECMWF {SYSTEM_METRICS.trackErrBenchmarkECMWF}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500">INTENSITY MAE</div>
            <div className="text-sm font-bold text-amber-400">{SYSTEM_METRICS.intensityMAE}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Central Pressure ±2.1 hPa</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-500">INFERENCE LATENCY</div>
            <div className="text-sm font-bold text-purple-400">{SYSTEM_METRICS.totalInferenceLatency}</div>
            <div className="text-[9px] text-slate-400 mt-0.5">Real-time GPU Stream</div>
          </div>
        </div>

        {/* Visual End-to-End Pipeline Node Graph */}
        <div className="bg-[#0B101D] p-5 rounded border border-[#192238]">
          <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
            <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
              <BrainCircuit className="w-4 h-4 text-[#00F0FF]" />
              <span>DATA FUSION & AI MODEL GRAPH</span>
            </span>
            <span className="text-[10px] text-slate-500">CLICK ANY NODE FOR TECHNICAL SPECIFICATION</span>
          </div>

          {/* Pipeline Flow Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {PIPELINE_STAGES.map((stage, sIdx) => (
              <div key={stage.id} className="space-y-3 relative">
                <div className="text-xs font-bold px-2 py-1 rounded bg-[#060913] border border-[#192238]" style={{ color: stage.color }}>
                  {stage.title}
                </div>

                <div className="space-y-2">
                  {stage.nodes.map(node => (
                    <div
                      key={node.id}
                      onClick={() => setActiveNode(node)}
                      className={`p-3 rounded border cursor-pointer transition-all ${
                        activeNode?.id === node.id
                          ? 'bg-[#121829] border-[#00F0FF] shadow-lg shadow-[#00F0FF]/10'
                          : 'bg-[#060913] border-[#192238] hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-1">
                        <span>{node.label}</span>
                        <span className="text-[9px] text-emerald-400 px-1 bg-emerald-950/60 rounded border border-emerald-800/40">
                          {node.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2">
                        {node.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Split: Satellite CNN Concept + Model Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Satellite CNN Feature Extraction Concept View */}
          <div className="bg-[#0B101D] p-5 rounded border border-[#192238]">
            <div className="flex items-center justify-between text-xs font-bold text-slate-200 mb-3 pb-2 border-b border-[#192238]">
              <span className="flex items-center space-x-1.5">
                <Eye className="w-4 h-4 text-[#00F0FF]" />
                <span>SATELLITE IR DEEP DVORAK CNN EXTRACTOR</span>
              </span>
              <div className="flex items-center space-x-1">
                {SYSTEM_METRICS.satelliteBands.map(band => (
                  <button
                    key={band}
                    onClick={() => setActiveThermalBand(band)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${
                      activeThermalBand === band
                        ? 'bg-[#00F0FF]/20 text-[#00F0FF] border-[#00F0FF]/50'
                        : 'bg-[#060913] text-slate-400 border-[#192238]'
                    }`}
                  >
                    {band.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Satellite Thermal Image Canvas Box */}
            <div className="relative w-full h-56 bg-[#04070F] rounded border border-[#192238] overflow-hidden flex items-center justify-center">
              {/* Thermal Eyewall Gradient Circles */}
              <div className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-purple-600 opacity-60 blur-md animate-pulse" />
              <div className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 opacity-80 blur-sm" />
              <div className="absolute w-12 h-12 rounded-full bg-[#04070F] border-2 border-[#00F0FF]" />

              {/* CNN Bounding Box Overlay */}
              <div className="absolute inset-8 border border-dashed border-[#00F0FF]/70 rounded pointer-events-none flex flex-col justify-between p-2">
                <div className="text-[9px] font-mono text-[#00F0FF] bg-[#060913]/90 px-1 py-0.5 w-fit border border-[#00F0FF]/40">
                  EYEWALL FEATURE DETECTOR: 99.4% SYMMETRY
                </div>
                <div className="text-[9px] font-mono text-amber-400 bg-[#060913]/90 px-1 py-0.5 w-fit border border-amber-400/40">
                  CLOUD TOP TEMP: -82.4 °C (Cat 5 Threshold)
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              The Satellite Vision Transformer processes 15-minute INSAT-3DS infrared channels (10.8µm), evaluating cloud-top brightness temperature gradients and eyewall pinhole symmetry to estimate real-time intensity without waiting for recon aircraft.
            </p>
          </div>

          {/* Selected Architecture Node Inspector */}
          <div className="bg-[#0B101D] p-5 rounded border border-[#192238] flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 pb-2 border-b border-[#192238] mb-3">
                <Sparkles className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-bold text-slate-200 uppercase tracking-wider">
                  NODE INSPECTOR: {activeNode?.label}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-[10px] text-slate-500">SPECIFICATION</div>
                  <div className="text-sm font-bold text-slate-100">{activeNode?.label}</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeNode?.detail}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#060913] p-2.5 rounded border border-[#192238]">
                    <div className="text-[10px] text-slate-500">EXECUTION STATUS</div>
                    <div className="text-xs font-bold text-emerald-400 mt-0.5">{activeNode?.status}</div>
                  </div>
                  <div className="bg-[#060913] p-2.5 rounded border border-[#192238]">
                    <div className="text-[10px] text-slate-500">PROCESSING LATENCY</div>
                    <div className="text-xs font-bold text-[#00F0FF] mt-0.5">{activeNode?.latency}</div>
                  </div>
                </div>

                <div className="bg-[#060913] p-3 rounded border border-[#192238]">
                  <div className="text-[10px] text-slate-500 mb-1">PHYSICAL CONSTRAINTS</div>
                  <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                    <li>Vorticity conservation enforced in neural latent space</li>
                    <li>SST thermocline depth coupling via ERA5 tensors</li>
                    <li>Surge hydrostatic wave propagation boundary conditions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#192238] text-[10px] text-slate-500">
              STROMSIGHT MULTIMODAL NEURAL ENGINE · VERSION 4.2 · ACCELERATED BY TENSOR CORE CLUSTER
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
