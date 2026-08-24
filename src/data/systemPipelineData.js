// System Pipeline Metadata for STROMSIGHT AI Multimodal Data Fusion Engine

export const PIPELINE_STAGES = [
  {
    id: "ingestion",
    title: "1. DATA INGESTION & SENSORS",
    subtitle: "Real-time Multi-Source Feeds",
    color: "#00F0FF",
    nodes: [
      { id: "insat", label: "INSAT-3DS Satellite", detail: "IR & Water Vapor Multispectral Band (15-min cadence, 4km resolution)", status: "NOMINAL", latency: "12m ago" },
      { id: "era5", label: "ERA5 Reanalysis", detail: "Global Atmospheric Wind Shear, Vorticity & SST Tensors", status: "NOMINAL", latency: "1h ago" },
      { id: "radar", label: "IMD Doppler Radar", detail: "Paradeep & Digha S-Band Reflectivity & Radial Velocity", status: "STREAMING", latency: "2m ago" },
      { id: "ibtracs", label: "IBTrACS Archive", detail: "50+ Years Historical NIO Cyclone Trajectory Dataset", status: "READY", latency: "Static" }
    ]
  },
  {
    id: "fusion",
    title: "2. DATA FUSION & ALIGNMENT",
    subtitle: "Spatio-Temporal Grid Tensor",
    color: "#3B82F6",
    nodes: [
      { id: "grid", label: "0.05° Spatial Georeferencing", detail: "Unified spatial grid across Bay of Bengal (Lat 5-25°N, Lon 78-96°E)", status: "ACTIVE", latency: "<50ms" },
      { id: "ocean-atmosphere", label: "Ocean Heat Coupling Tensor", detail: "Upper Ocean Heat Content (UOHC) & SST anomaly integration", status: "ACTIVE", latency: "<80ms" }
    ]
  },
  {
    id: "ai-core",
    title: "3. MULTIMODAL AI CORE ENGINE",
    subtitle: "Vision & Physics Neural Models",
    color: "#8B5CF6",
    nodes: [
      { id: "cnn", label: "Satellite IR Eyewall CNN", detail: "Deep Dvorak feature extraction, eyewall symmetry & cloud-top thermal gradient", status: "INFERENCE", latency: "120ms" },
      { id: "transformer", label: "Neural Track Physics Model", detail: "Physics-informed Transformer + Ensemble Diffusion for trajectory forecasting", status: "INFERENCE", latency: "190ms" },
      { id: "surge-emulator", label: "Hydrodynamic Surge Emulator", detail: "Neural surrogate solver for coastal tidal wave propagation & peak surge height", status: "INFERENCE", latency: "110ms" }
    ]
  },
  {
    id: "risk-engine",
    title: "4. RISK & DECISION ENGINE",
    subtitle: "District Level Actionable Telemetry",
    color: "#EF4444",
    nodes: [
      { id: "track-output", label: "Track & Intensity Vector", detail: "Coordinates + Wind/Pressure curves with 95% Bayesian confidence bounds", status: "LIVE", latency: "Realtime" },
      { id: "coastal-risk", label: "District Risk Indexing", detail: "Dynamic threat classification (Low -> Catastrophic) for 48 coastal zones", status: "LIVE", latency: "Realtime" },
      { id: "evac-priority", label: "Evacuation Protocol Engine", detail: "Automated population exposure alerts & critical asset breach warnings", status: "LIVE", latency: "Realtime" }
    ]
  }
];

export const SYSTEM_METRICS = {
  modelName: "STROMSIGHT Neural-v4.2",
  trackErr24h: "28.4 km",
  trackErrBenchmarkECMWF: "42.1 km",
  intensityMAE: "4.2 kts",
  totalInferenceLatency: "320 ms",
  satelliteBands: ["IR1 (10.8µm)", "IR2 (12.0µm)", "WV (6.8µm)", "VIS (0.65µm)"],
  trainingDataPeriod: "1980 - 2025 NIO Cyclone Catalog",
  ensembleVariance: "1.4 km"
};
