import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { COASTAL_DISTRICTS } from '../data/coastalDistricts';
import { generateUncertaintyConePolygon, getHaversineDistanceKm } from '../utils/mapHelpers';
import { formatLatLon, getRiskColorHex } from '../utils/formatters';

export default function MapHero({ 
  selectedCyclone, 
  currentTimestepIdx, 
  onSelectDistrict, 
  selectedDistrict,
  layerVisibility = { satellite: true, cone: true, windRadius: true, districts: true, grid: true }
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const layersGroupRef = useRef(null);
  const [cursorCoords, setCursorCoords] = useState({ lat: 18.5, lon: 88.2 });

  const activeStep = selectedCyclone.timesteps[currentTimestepIdx] || selectedCyclone.timesteps[0];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Prevent double init

    const map = L.map(mapContainerRef.current, {
      center: [18.8, 88.0],
      zoom: 6,
      zoomControl: false,
      attributionControl: true
    });

    // Add Carto Dark Matter Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 18,
      attribution: '&copy; STROMSIGHT GIS · CartoDB · IMD · NOAA'
    }).addTo(map);

    // Zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Layer group for dynamic graphics
    const layersGroup = L.layerGroup().addTo(map);
    layersGroupRef.current = layersGroup;
    mapRef.current = map;

    // Track mouse coordinates
    map.on('mousemove', (e) => {
      setCursorCoords({
        lat: Number(e.latlng.lat.toFixed(2)),
        lon: Number(e.latlng.lng.toFixed(2))
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Map Overlays whenever active cyclone, timestep, selected district, or toggles change
  useEffect(() => {
    const map = mapRef.current;
    const layersGroup = layersGroupRef.current;
    if (!map || !layersGroup) return;

    layersGroup.clearLayers();

    // 1. Render Nautical GIS Grid Overlay
    if (layerVisibility.grid) {
      for (let lat = 10; lat <= 24; lat += 2) {
        const gridLine = L.polyline([[lat, 78], [lat, 96]], {
          color: 'rgba(0, 240, 255, 0.08)',
          weight: 1,
          dashArray: '3, 6',
          interactive: false
        });
        layersGroup.addLayer(gridLine);
      }
      for (let lon = 80; lon <= 94; lon += 2) {
        const gridLine = L.polyline([[8, lon], [26, lon]], {
          color: 'rgba(0, 240, 255, 0.08)',
          weight: 1,
          dashArray: '3, 6',
          interactive: false
        });
        layersGroup.addLayer(gridLine);
      }
    }

    // 2. Render Coastal District Polygons & Risk Fill
    if (layerVisibility.districts) {
      COASTAL_DISTRICTS.forEach((dist) => {
        // Compute dynamic risk for current timestep based on distance to active cyclone eye
        const distKm = getHaversineDistanceKm(activeStep.lat, activeStep.lon, dist.lat, dist.lon);
        let dynamicRiskColor = '#10B981'; // Low
        let dynamicRiskOpacity = 0.2;

        if (distKm < 80) {
          dynamicRiskColor = '#EF4444'; // Critical
          dynamicRiskOpacity = 0.55;
        } else if (distKm < 160) {
          dynamicRiskColor = '#F97316'; // High
          dynamicRiskOpacity = 0.45;
        } else if (distKm < 260) {
          dynamicRiskColor = '#F59E0B'; // Moderate
          dynamicRiskOpacity = 0.35;
        }

        const isSelected = selectedDistrict?.id === dist.id;

        const poly = L.polygon(dist.bounds, {
          color: isSelected ? '#00F0FF' : dynamicRiskColor,
          weight: isSelected ? 2.5 : 1.2,
          fillColor: dynamicRiskColor,
          fillOpacity: isSelected ? 0.65 : dynamicRiskOpacity
        });

        // Click event on district
        poly.on('click', () => {
          onSelectDistrict(dist);
        });

        // Hover tooltip
        poly.bindTooltip(`
          <div style="font-family: var(--font-mono); font-size: 11px; padding: 4px; background: #0B101D; color: #fff; border: 1px solid #192238;">
            <div style="font-weight: bold; color: #00F0FF;">${dist.name} (${dist.state})</div>
            <div style="color: #94A3B8;">Eye Proximity: <span style="color:#fff;">${distKm} km</span></div>
            <div style="color: #94A3B8;">Status: <span style="color:${dynamicRiskColor}">${dist.riskLevel}</span></div>
          </div>
        `, { sticky: true, className: 'leaflet-tooltip-dark' });

        layersGroup.addLayer(poly);
      });
    }

    // 3. Render Past Track (Solid Cyan)
    if (selectedCyclone.pastTrack && selectedCyclone.pastTrack.length > 0) {
      const pastPts = selectedCyclone.pastTrack.map(p => [p.lat, p.lon]);
      // Connect last past point to current active step
      pastPts.push([activeStep.lat, activeStep.lon]);

      const pastPolyline = L.polyline(pastPts, {
        color: '#00F0FF',
        weight: 3,
        opacity: 0.8
      });
      layersGroup.addLayer(pastPolyline);

      // Past waypoints
      selectedCyclone.pastTrack.forEach(p => {
        const marker = L.circleMarker([p.lat, p.lon], {
          radius: 4,
          fillColor: '#060913',
          color: '#00F0FF',
          weight: 2,
          fillOpacity: 1
        });
        marker.bindTooltip(`
          <div style="font-family: var(--font-mono); font-size: 10px; background: #060913; color: #00F0FF; padding: 3px 6px; border: 1px solid #192238;">
            ${p.label}: ${p.windKmh} km/h (${p.pressure} hPa)
          </div>
        `, { sticky: true });
        layersGroup.addLayer(marker);
      });
    }

    // 4. Render Uncertainty Cone Polygon (Forecast spread)
    if (layerVisibility.cone) {
      const coneCoords = generateUncertaintyConePolygon(selectedCyclone.timesteps, currentTimestepIdx);
      if (coneCoords.length > 0) {
        const conePoly = L.polygon(coneCoords, {
          color: 'rgba(0, 240, 255, 0.4)',
          weight: 1,
          dashArray: '4, 4',
          fillColor: '#00F0FF',
          fillOpacity: 0.12,
          interactive: false
        });
        layersGroup.addLayer(conePoly);
      }
    }

    // 5. Render Forecast Track Line (Dashed Cyan)
    const forecastPts = selectedCyclone.timesteps.slice(currentTimestepIdx).map(p => [p.lat, p.lon]);
    if (forecastPts.length > 0) {
      const forecastPolyline = L.polyline(forecastPts, {
        color: '#00F0FF',
        weight: 2.5,
        dashArray: '6, 6',
        opacity: 0.95
      });
      layersGroup.addLayer(forecastPolyline);

      // Forecast Waypoint Markers
      selectedCyclone.timesteps.slice(currentTimestepIdx).forEach((pt, idx) => {
        const isCurrent = idx === 0;
        if (!isCurrent) {
          const marker = L.circleMarker([pt.lat, pt.lon], {
            radius: 5,
            fillColor: '#00F0FF',
            color: '#060913',
            weight: 2,
            fillOpacity: 0.9
          });
          marker.bindTooltip(`
            <div style="font-family: var(--font-mono); font-size: 11px; background: #0B101D; color: #fff; padding: 4px; border: 1px solid #00F0FF;">
              <div style="color: #00F0FF; font-weight: bold;">${pt.label} (${pt.timeCode})</div>
              <div>Wind: <b>${pt.windKmh} km/h</b> (${pt.windKts} kts)</div>
              <div>Pressure: <b>${pt.pressure} hPa</b></div>
              <div>Cone Radius: ±${pt.uncertaintyKm} km</div>
            </div>
          `, { sticky: true });
          layersGroup.addLayer(marker);
        }
      });
    }

    // 6. Render Wind Field Radius Rings around active eyewall (R34, R50, R64)
    if (layerVisibility.windRadius && activeStep.windRadius) {
      const { r34, r50, r64 } = activeStep.windRadius;
      
      // R34kt (Gale force) - meters
      const circle34 = L.circle([activeStep.lat, activeStep.lon], {
        radius: r34 * 1000,
        color: 'rgba(245, 158, 11, 0.6)',
        weight: 1,
        dashArray: '4, 4',
        fillColor: '#F59E0B',
        fillOpacity: 0.06,
        interactive: false
      });
      layersGroup.addLayer(circle34);

      // R50kt (Storm force)
      if (r50 > 0) {
        const circle50 = L.circle([activeStep.lat, activeStep.lon], {
          radius: r50 * 1000,
          color: 'rgba(239, 68, 68, 0.7)',
          weight: 1.2,
          fillColor: '#EF4444',
          fillOpacity: 0.1,
          interactive: false
        });
        layersGroup.addLayer(circle50);
      }

      // R64kt (Hurricane force eyewall)
      if (r64 > 0) {
        const circle64 = L.circle([activeStep.lat, activeStep.lon], {
          radius: r64 * 1000,
          color: 'rgba(147, 51, 234, 0.9)',
          weight: 1.5,
          fillColor: '#9333EA',
          fillOpacity: 0.22,
          interactive: false
        });
        layersGroup.addLayer(circle64);
      }
    }

    // 7. Render Satellite IR Eye Radar Pulse Icon at Active Position
    if (layerVisibility.satellite) {
      const eyeIcon = L.divIcon({
        className: 'custom-cyclone-eye-icon',
        html: `
          <div style="position: relative; width: 44px; height: 44px; margin-left: -22px; margin-top: -22px; display: flex; items-center; justify-center;">
            <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; border: 2px dashed #00F0FF; animation: radarSweep 5s linear infinite; opacity: 0.8;"></div>
            <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: rgba(0, 240, 255, 0.25); animation: pulseGlow 1.5s ease-in-out infinite;"></div>
            <div style="position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #EF4444; border: 2px solid #FFFFFF; box-shadow: 0 0 10px #EF4444;"></div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22]
      });

      const eyeMarker = L.marker([activeStep.lat, activeStep.lon], { icon: eyeIcon, zIndexOffset: 1000 });
      eyeMarker.bindTooltip(`
        <div style="font-family: var(--font-mono); font-size: 11px; background: #060913; color: #fff; padding: 6px; border: 1px solid #EF4444;">
          <div style="color: #EF4444; font-weight: bold;">CYCLONE EYE - ${selectedCyclone.name}</div>
          <div>Lat/Lon: <b>${formatLatLon(activeStep.lat, activeStep.lon)}</b></div>
          <div>Wind: <b>${activeStep.windKmh} km/h</b> (${activeStep.windKts} kts)</div>
          <div>Central Pressure: <b>${activeStep.pressure} hPa</b></div>
        </div>
      `, { sticky: true });
      layersGroup.addLayer(eyeMarker);
    }

  }, [selectedCyclone, currentTimestepIdx, selectedDistrict, layerVisibility]);

  return (
    <div className="relative w-full h-full bg-[#04070F] overflow-hidden cursor-crosshair">
      {/* Satellite Scanline Texture */}
      <div className="scanline-overlay" />

      {/* Map DOM Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Bottom Left Coordinate Telemetry HUD */}
      <div className="absolute bottom-4 left-4 z-20 hud-panel px-3 py-1.5 flex items-center space-x-4 font-mono text-xs text-slate-300 pointer-events-none">
        <div className="flex items-center space-x-1.5">
          <span className="text-slate-500">CURSOR:</span>
          <span className="text-[#00F0FF] font-semibold">{formatLatLon(cursorCoords.lat, cursorCoords.lon)}</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 border-l border-[#192238] pl-3">
          <span className="text-slate-500">GRID:</span>
          <span className="text-slate-300">BOB-{Math.floor(cursorCoords.lat)}-{Math.floor(cursorCoords.lon)}</span>
        </div>
        <div className="hidden md:flex items-center space-x-1.5 border-l border-[#192238] pl-3">
          <span className="text-slate-500">EST DEPTH:</span>
          <span className="text-slate-300">1,840 m</span>
        </div>
      </div>
    </div>
  );
}
