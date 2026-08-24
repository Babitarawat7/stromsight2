// Coastal District Vulnerability & Impact Dataset for STROMSIGHT
// Includes coordinates, polygons approximation, population exposure, critical assets, and risk matrices.

export const COASTAL_DISTRICTS = [
  {
    id: "kendrapara",
    name: "Kendrapara",
    state: "Odisha",
    lat: 20.50,
    lon: 86.42,
    bounds: [
      [20.3, 86.2], [20.7, 86.3], [20.8, 86.9], [20.4, 86.8]
    ],
    riskLevel: "CRITICAL",
    riskScore: 96,
    historicalRiskScore: 94,
    predictedWindKmh: 215,
    predictedSurgeM: 5.4,
    distanceToEyeKm: 42,
    landfallProximity: "DIRECT IMPACT ZONE",
    exposedPopulation: "1,440,000",
    shelterCapacityPercent: 91,
    evacuationStatus: "MANDATORY EVACUATION IN PROGRESS",
    criticalAssets: [
      { name: "Dhamra Deepwater Port", type: "Maritime Logistics", status: "OPERATIONS HALTED" },
      { name: "Bhitarkanika Embankment", type: "Sea Wall Barrier", status: "HIGH BREACH RISK" },
      { name: "Mahanadi Delta Substation", type: "Power Grid", status: "SHUTDOWN INITIATED" }
    ],
    historicalImpact: "Direct hit during 1999 Odisha Super Cyclone (260 km/h) & 2021 Yaas. Highly vulnerable to sea water intrusion across low-lying mangrove estuarine channels."
  },
  {
    id: "south-24-parganas",
    name: "South 24 Parganas (Sundarbans)",
    state: "West Bengal",
    lat: 21.90,
    lon: 88.50,
    bounds: [
      [21.5, 88.0], [22.4, 88.2], [22.3, 89.1], [21.6, 89.0]
    ],
    riskLevel: "CATASTROPHIC",
    riskScore: 98,
    historicalRiskScore: 96,
    predictedWindKmh: 205,
    predictedSurgeM: 5.6,
    distanceToEyeKm: 58,
    landfallProximity: "RIGHT FRONT QUADRANT (MAX SURGE)",
    exposedPopulation: "8,160,000",
    shelterCapacityPercent: 82,
    evacuationStatus: "RED ALERT · 420K EVACUATED TO MULTI-PURPOSE SHELTERS",
    criticalAssets: [
      { name: "Sagar Island Jetty System", type: "Evacuation Route", status: "SUBMERGED / CLOSED" },
      { name: "Kakdwip Coastal Embankment", type: "Flood Barrier", status: "CRITICAL BREACH RISK" },
      { name: "Sundarbans UNESCO Biosphere", type: "Ecological Margin", status: "SEVERE SALINE INUNDATION" }
    ],
    historicalImpact: "Devastated by Super Cyclone Amphan (2020) and Aila (2009). 60% of district land area lies under +2m elevation."
  },
  {
    id: "jagatsinghpur",
    name: "Jagatsinghpur",
    state: "Odisha",
    lat: 20.26,
    lon: 86.17,
    bounds: [
      [20.0, 86.0], [20.4, 86.1], [20.5, 86.6], [20.1, 86.5]
    ],
    riskLevel: "CRITICAL",
    riskScore: 92,
    historicalRiskScore: 95,
    predictedWindKmh: 195,
    predictedSurgeM: 4.2,
    distanceToEyeKm: 76,
    landfallProximity: "HIGH WIND & SURGE ZONE",
    exposedPopulation: "1,136,000",
    shelterCapacityPercent: 88,
    evacuationStatus: "MANDATORY EVACUATION ACTIVE",
    criticalAssets: [
      { name: "Paradeep Major Port & Refinery", type: "Petrochemical Infrastructure", status: "EMERGENCY SECURED" },
      { name: "Ersama Coastal Ring Embankment", type: "Storm Wall", status: "ALERT LEVEL 4" }
    ],
    historicalImpact: "Epicenter of 1999 Odisha Super Cyclone landfall (Ersama block lost over 8,000 lives to 7m storm surge)."
  },
  {
    id: "balasore",
    name: "Balasore",
    state: "Odisha",
    lat: 21.49,
    lon: 86.93,
    bounds: [
      [21.2, 86.6], [21.7, 86.7], [21.8, 87.3], [21.3, 87.1]
    ],
    riskLevel: "HIGH",
    riskScore: 88,
    historicalRiskScore: 89,
    predictedWindKmh: 180,
    predictedSurgeM: 3.8,
    distanceToEyeKm: 92,
    landfallProximity: "PRIMARY IMPACT MARGIN",
    exposedPopulation: "2,320,000",
    shelterCapacityPercent: 94,
    evacuationStatus: "STAGE-2 PREPARATION & SHELTER TRANSFER",
    criticalAssets: [
      { name: "Chandipur Integrated Test Range", type: "Defense Facility", status: "TACTICAL LOCKDOWN" },
      { name: "Subarnarekha Estuary Dyke", type: "Hydraulic Barrier", status: "HIGH FLOW MONITORING" }
    ],
    historicalImpact: "Frequent landfall locus for Bay of Bengal systems (Cyclone Yaas 2021, Cyclone Phailin 2013)."
  },
  {
    id: "east-midnapore",
    name: "East Midnapore (Digha/Haldia)",
    state: "West Bengal",
    lat: 21.93,
    lon: 87.77,
    bounds: [
      [21.6, 87.4], [22.2, 87.6], [22.1, 88.1], [21.6, 88.0]
    ],
    riskLevel: "HIGH",
    riskScore: 90,
    historicalRiskScore: 91,
    predictedWindKmh: 185,
    predictedSurgeM: 4.1,
    distanceToEyeKm: 82,
    landfallProximity: "MAX SURGE CORRIDOR",
    exposedPopulation: "5,095,000",
    shelterCapacityPercent: 86,
    evacuationStatus: "COASTAL STRIP CLEARED · DIGHA RESORT ZONE EVACUATED",
    criticalAssets: [
      { name: "Haldia Dock Complex & Petrochem", type: "Industrial Port", status: "SHIP BERTHING SUSPENDED" },
      { name: "Digha Sea Wall Defense", type: "Concrete Barrier", status: "WAVE OVERTOPPING ALERT" }
    ],
    historicalImpact: "Hit severely by Cyclone Amphan 2020 and Cyclone Bulbul 2019. High coastal tourism density."
  },
  {
    id: "puri",
    name: "Puri",
    state: "Odisha",
    lat: 19.81,
    lon: 85.83,
    bounds: [
      [19.6, 85.3], [20.0, 85.5], [20.1, 86.2], [19.7, 86.0]
    ],
    riskLevel: "MODERATE-HIGH",
    riskScore: 74,
    historicalRiskScore: 93,
    predictedWindKmh: 145,
    predictedSurgeM: 2.4,
    distanceToEyeKm: 145,
    landfallProximity: "OUTER RAINBAND & GALE CORRIDOR",
    exposedPopulation: "1,698,000",
    shelterCapacityPercent: 96,
    evacuationStatus: "COASTAL SITES RESTRICTED · SHELTERS READY",
    criticalAssets: [
      { name: "Chilika Lake Mouth & Ecosystem", type: "Lagoon Wetland", status: "SALINE BALANCE MONITORING" },
      { name: "Puri Heritage Infrastructure", type: "Urban Center", status: "POWER GRID STRENGTHENED" }
    ],
    historicalImpact: "Direct hit by Cyclone Fani (2019) with 215 km/h winds, causing total grid destruction."
  },
  {
    id: "srikakulam",
    name: "Srikakulam",
    state: "Andhra Pradesh",
    lat: 18.30,
    lon: 83.90,
    bounds: [
      [18.0, 83.5], [18.6, 83.7], [18.8, 84.4], [18.2, 84.2]
    ],
    riskLevel: "MODERATE",
    riskScore: 58,
    historicalRiskScore: 82,
    predictedWindKmh: 110,
    predictedSurgeM: 1.5,
    distanceToEyeKm: 230,
    landfallProximity: "SOUTH-WEST QUADRANT",
    exposedPopulation: "2,700,000",
    shelterCapacityPercent: 95,
    evacuationStatus: "COASTAL WATCH ACTIVE",
    criticalAssets: [
      { name: "Bhavanapadu Port Project", type: "Coastal Infra", status: "CAUTION ADVISORY" }
    ],
    historicalImpact: "Direct hit by Cyclone Titli (2018) causing extensive coconut plantation destruction."
  },
  {
    id: "chittagong",
    name: "Chittagong Coastal Zone",
    state: "Bangladesh",
    lat: 22.33,
    lon: 91.83,
    bounds: [
      [22.0, 91.5], [22.7, 91.6], [22.6, 92.2], [22.0, 92.0]
    ],
    riskLevel: "HIGH",
    riskScore: 84,
    historicalRiskScore: 92,
    predictedWindKmh: 160,
    predictedSurgeM: 3.5,
    distanceToEyeKm: 185,
    landfallProximity: "EASTERN FLANK SURGE ZONE",
    exposedPopulation: "7,600,000",
    shelterCapacityPercent: 78,
    evacuationStatus: "SIGNAL 10 GREAT DANGER WARNING ISSUED",
    criticalAssets: [
      { name: "Chittagong Port Authority", type: "National Maritime Hub", status: "ALERT LEVEL 4" },
      { name: "Matarbari Deep Sea Port", type: "Energy Terminal", status: "ANCHORAGE SECURED" }
    ],
    historicalImpact: "Hit by catastrophic 1991 Bangladesh Cyclone (138,000 deaths) and Cyclone Mocha (2023)."
  }
];
