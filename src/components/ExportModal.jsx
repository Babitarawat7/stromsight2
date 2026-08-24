import React, { useState } from 'react';
import { Download, Copy, Check, FileText, X } from 'lucide-react';
import { formatLatLon } from '../utils/formatters';

export default function ExportModal({ selectedCyclone, currentTimestepIdx, onClose }) {
  const [copied, setCopied] = useState(false);
  const activeStep = selectedCyclone.timesteps[currentTimestepIdx] || selectedCyclone.timesteps[0];

  const briefReport = `==================================================================
STROMSIGHT · CYCLONE MISSION CONTROL BRIEFING REPORT
GENERATED AT: ${new Date().toISOString()}
SYSTEM VERSION: STROMSIGHT NEURAL-v4.2
==================================================================

[1. CYCLONE TELEMETRY SUMMARY]
Cyclone Event: ${selectedCyclone.name}
Classification: ${activeStep.category}
Position: ${formatLatLon(activeStep.lat, activeStep.lon)}
Max Sustained Wind: ${activeStep.windKmh} km/h (${activeStep.windKts} kts)
Gusts: ${activeStep.gustKmh} km/h
Minimum Central Pressure: ${activeStep.pressure} hPa
Movement Vector: ${activeStep.movement}
AI Ensemble Confidence: ${selectedCyclone.ensembleAgreement}

[2. FORECAST TIMESTEP DETAILS]
Current Step: ${activeStep.label} (${activeStep.timestamp})
Uncertainty Radius: ±${activeStep.uncertaintyKm} km
Predicted Peak Surge: ${activeStep.surgeMaxMeters} meters
Eyewall Status: ${activeStep.eyeStatus}

[3. AI REASONING & METEOROLOGICAL DRIVERS]
${activeStep.whyRiskChanged}

[4. HIGH RISK COASTAL DISTRICTS]
${activeStep.highRiskDistricts ? activeStep.highRiskDistricts.join(', ') : 'None'}

==================================================================
CONFIDENTIAL & PROPRIETARY · FOR EMERGENCY OPERATIONS USE ONLY
==================================================================`;

  const handleCopy = () => {
    navigator.clipboard.writeText(briefReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([briefReport], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `STROMSIGHT_${selectedCyclone.name.replace(/\s+/g, '_')}_Briefing.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#04070F]/80 backdrop-blur-sm flex items-center justify-center p-4 font-mono select-none">
      <div className="w-full max-w-2xl bg-[#0B101D] border border-[#192238] rounded shadow-2xl p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-slate-100 font-heading font-bold text-base mb-3 pb-2 border-b border-[#192238]">
          <FileText className="w-4 h-4 text-[#00F0FF]" />
          <span>TACTICAL CYCLONE BRIEFING REPORT</span>
        </div>

        <pre className="w-full h-72 bg-[#060913] p-3 border border-[#192238] rounded text-xs text-[#00F0FF] overflow-y-auto font-mono whitespace-pre-wrap leading-relaxed">
          {briefReport}
        </pre>

        <div className="flex items-center justify-end space-x-3 mt-4 pt-3 border-t border-[#192238]">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#121829] border border-[#293859] text-xs text-slate-200 hover:text-[#00F0FF]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY REPORT'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#00F0FF]/20 border border-[#00F0FF]/50 text-xs font-bold text-[#00F0FF] hover:bg-[#00F0FF]/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD .TXT BRIEFING</span>
          </button>
        </div>
      </div>
    </div>
  );
}
