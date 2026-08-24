import React, { useState } from 'react';
import Header from './components/Header';
import MapHero from './components/MapHero';
import HudOverlay from './components/HudOverlay';
import SimulationDock from './components/SimulationDock';
import RiskPanel from './components/RiskPanel';
import SystemArchitecture from './components/SystemArchitecture';
import ExportModal from './components/ExportModal';

import { CYCLONES } from './data/cycloneData';
import { COASTAL_DISTRICTS } from './data/coastalDistricts';

export default function App() {
  const [activeTab, setActiveTab] = useState('live'); // 'live', 'risk', 'simulation', 'system'
  const [selectedCyclone, setSelectedCyclone] = useState(CYCLONES[0]);
  const [currentTimestepIdx, setCurrentTimestepIdx] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);

  const [layerVisibility, setLayerVisibility] = useState({
    satellite: true,
    cone: true,
    windRadius: true,
    districts: true,
    grid: true
  });

  const handleSelectDistrictByName = (name) => {
    const found = COASTAL_DISTRICTS.find(d => d.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      setSelectedDistrict(found);
      setActiveTab('risk');
    }
  };

  return (
    <div className="relative w-screen h-screen bg-[#04070F] overflow-hidden flex flex-col font-sans select-none">
      {/* Top Mission Control Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCyclone={selectedCyclone}
        setSelectedCyclone={(cyc) => {
          setSelectedCyclone(cyc);
          setCurrentTimestepIdx(0);
        }}
        onOpenExport={() => setExportOpen(true)}
      />

      {/* Hero Centerpiece Map (spans behind controls) */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <MapHero
          selectedCyclone={selectedCyclone}
          currentTimestepIdx={currentTimestepIdx}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={(dist) => {
            setSelectedDistrict(dist);
            if (activeTab !== 'risk') setActiveTab('risk');
          }}
          layerVisibility={layerVisibility}
        />

        {/* Tab-based Overlays & Drawers */}

        {/* LIVE Tab Overlay */}
        {activeTab === 'live' && (
          <HudOverlay
            selectedCyclone={selectedCyclone}
            currentTimestepIdx={currentTimestepIdx}
            layerVisibility={layerVisibility}
            setLayerVisibility={setLayerVisibility}
            onSelectDistrictByName={handleSelectDistrictByName}
          />
        )}

        {/* RISK Tab Drawer */}
        {activeTab === 'risk' && (
          <RiskPanel
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
            selectedCyclone={selectedCyclone}
            currentTimestepIdx={currentTimestepIdx}
          />
        )}

        {/* SIMULATION Tab Timeline Scrubber Dock */}
        {(activeTab === 'simulation' || activeTab === 'live') && (
          <SimulationDock
            selectedCyclone={selectedCyclone}
            currentTimestepIdx={currentTimestepIdx}
            setCurrentTimestepIdx={setCurrentTimestepIdx}
          />
        )}

        {/* SYSTEM Tab Full Overlay */}
        {activeTab === 'system' && (
          <SystemArchitecture onClose={() => setActiveTab('live')} />
        )}
      </main>

      {/* Export Briefing Modal */}
      {exportOpen && (
        <ExportModal
          selectedCyclone={selectedCyclone}
          currentTimestepIdx={currentTimestepIdx}
          onClose={() => setExportOpen(false)}
        />
      )}
    </div>
  );
}
