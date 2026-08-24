// Geometry and uncertainty cone math for cyclone trajectory rendering

// Calculate distance between two lat/lon points in KM (Haversine Formula)
export function getHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in KM
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Generate uncertainty cone polygon coordinates starting from current cyclone position through forecast timesteps
export function generateUncertaintyConePolygon(timesteps, currentIdx = 0) {
  if (!timesteps || timesteps.length === 0) return [];
  
  const forecastSteps = timesteps.slice(currentIdx);
  if (forecastSteps.length < 2) return [];

  const leftPoints = [];
  const rightPoints = [];

  for (let i = 0; i < forecastSteps.length; i++) {
    const pt = forecastSteps[i];
    const radiusKm = pt.uncertaintyKm || (15 + i * 25);
    // Convert KM radius roughly to degrees lat/lon (~111km per degree lat)
    const degOffset = radiusKm / 111.0;

    // Approximate perpendicular bearing vector along track
    let bearing = 30; // default North-East
    if (i < forecastSteps.length - 1) {
      const nextPt = forecastSteps[i + 1];
      const dy = nextPt.lat - pt.lat;
      const dx = (nextPt.lon - pt.lon) * Math.cos(pt.lat * (Math.PI / 180));
      bearing = Math.atan2(dx, dy) * (180 / Math.PI);
    } else if (i > 0) {
      const prevPt = forecastSteps[i - 1];
      const dy = pt.lat - prevPt.lat;
      const dx = (pt.lon - prevPt.lon) * Math.cos(pt.lat * (Math.PI / 180));
      bearing = Math.atan2(dx, dy) * (180 / Math.PI);
    }

    const perpLeft = (bearing - 90) * (Math.PI / 180);
    const perpRight = (bearing + 90) * (Math.PI / 180);

    const leftLat = pt.lat + degOffset * Math.cos(perpLeft);
    const leftLon = pt.lon + (degOffset * Math.sin(perpLeft)) / Math.cos(pt.lat * (Math.PI / 180));

    const rightLat = pt.lat + degOffset * Math.cos(perpRight);
    const rightLon = pt.lon + (degOffset * Math.sin(perpRight)) / Math.cos(pt.lat * (Math.PI / 180));

    leftPoints.push([leftLat, leftLon]);
    rightPoints.push([rightLat, rightLon]);
  }

  // Combine into single polygon outline loop
  return [...leftPoints, ...rightPoints.reverse()];
}
