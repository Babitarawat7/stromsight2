// Formatting utilities for STROMSIGHT telemetry

export function formatLatLon(lat, lon) {
  const latStr = `${Math.abs(lat).toFixed(1)}°${lat >= 0 ? 'N' : 'S'}`;
  const lonStr = `${Math.abs(lon).toFixed(1)}°${lon >= 0 ? 'E' : 'W'}`;
  return `${latStr}, ${lonStr}`;
}

export function formatSpeed(kts) {
  const kmh = Math.round(kts * 1.852);
  return `${kmh} km/h (${kts} kts)`;
}

export function getCategoryBadgeColor(category) {
  if (!category) return 'bg-slate-800 text-slate-300 border-slate-700';
  const cat = category.toUpperCase();
  if (cat.includes('SUPER')) return 'bg-purple-950/80 text-purple-300 border-purple-600/60';
  if (cat.includes('EXTREMELY') || cat.includes('CAT 4') || cat.includes('CAT 5')) return 'bg-red-950/80 text-red-400 border-red-600/60';
  if (cat.includes('VERY SEVERE') || cat.includes('CAT 3')) return 'bg-amber-950/80 text-amber-400 border-amber-600/60';
  if (cat.includes('SEVERE') || cat.includes('CAT 2')) return 'bg-yellow-950/80 text-yellow-400 border-yellow-600/60';
  return 'bg-emerald-950/80 text-emerald-400 border-emerald-600/60';
}

export function getRiskColorHex(riskLevel) {
  switch (riskLevel?.toUpperCase()) {
    case 'CATASTROPHIC': return '#9333EA';
    case 'CRITICAL': return '#EF4444';
    case 'HIGH': return '#F97316';
    case 'MODERATE-HIGH':
    case 'MODERATE': return '#F59E0B';
    case 'LOW':
    default: return '#10B981';
  }
}
