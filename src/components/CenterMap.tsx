import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { 
  LayerVisibility, 
  ScenarioStep, 
  FeatureInspectorData,
  RegionConfig
} from '../types';
import { 
  Crosshair, 
  Layers, 
  Compass, 
  AlertTriangle, 
  Info,
  Maximize2,
  Minimize2,
  Search,
  Navigation,
  Map as MapIcon,
  ArrowRight,
  ChevronRight,
  X
} from 'lucide-react';

interface CenterMapProps {
  currentStep: ScenarioStep;
  layers: LayerVisibility;
  roadsData: any;
  facilitiesData: any;
  sectorsData?: any;
  zonesData?: any;
  floodMasksData: any;
  sensorsData: any;
  detourRoutesData: any;
  onSelectFeature: (feature: FeatureInspectorData) => void;
  selectedFeatureTitle?: string;
  onTriggerAction?: (actionName: string, assetName: string) => void;
  regionConfig: RegionConfig;
}

type MapTileStyle = 'standard' | 'satellite' | 'terrain';
type SectorFilter = 'all' | 'safe_zones' | 'utilities' | 'emergency' | 'vulnerable' | 'transit' | 'red_zones';

export const CenterMap: React.FC<CenterMapProps> = ({
  currentStep,
  layers,
  roadsData,
  facilitiesData,
  sectorsData,
  zonesData,
  floodMasksData,
  sensorsData,
  detourRoutesData,
  onSelectFeature,
  selectedFeatureTitle,
  onTriggerAction,
  regionConfig
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  // Active Base Tile Layer ref & state
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);
  const [mapStyle, setMapStyle] = useState<MapTileStyle>('standard');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSectorFilter, setActiveSectorFilter] = useState<SectorFilter>('all');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Turn-by-Turn Navigation Drawer state
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Layer groups refs to easily add/remove and refresh
  const zonesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const floodLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const roadsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const sectorsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const facilitiesLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const sensorsLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const routesLayerGroupRef = useRef<L.LayerGroup | null>(null);

  // Auto-open navigation drawer when Step 1 or 2 triggers
  useEffect(() => {
    if (currentStep > 0) {
      setIsNavDrawerOpen(true);
    }
  }, [currentStep]);

  // Define Free Key-Free High-Detail Tile Providers
  const tileProviders: Record<MapTileStyle, { url: string; options: L.TileLayerOptions }> = {
    standard: {
      url: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        subdomains: 'abcd',
        maxZoom: 20,
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 19,
        maxNativeZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      },
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      options: {
        subdomains: 'abc',
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
      },
    },
  };

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center coordinates from active region
    const map = L.map(mapContainerRef.current, {
      center: regionConfig.center,
      zoom: regionConfig.zoom,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      minZoom: 8,
      maxZoom: 19,
      zoomControl: false,
      attributionControl: false,
    });

    // Add Initial Tile Layer
    const initialConfig = tileProviders['standard'];
    const tileLayer = L.tileLayer(initialConfig.url, initialConfig.options).addTo(map);
    currentTileLayerRef.current = tileLayer;

    // Initialize Layer Groups in proper z-order
    zonesLayerGroupRef.current = L.layerGroup().addTo(map);
    floodLayerGroupRef.current = L.layerGroup().addTo(map);
    roadsLayerGroupRef.current = L.layerGroup().addTo(map);
    routesLayerGroupRef.current = L.layerGroup().addTo(map);
    sectorsLayerGroupRef.current = L.layerGroup().addTo(map);
    facilitiesLayerGroupRef.current = L.layerGroup().addTo(map);
    sensorsLayerGroupRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    setMapInstance(map);

    // Initial resize invalidation
    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 300);

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      setMapInstance(null);
    };
  }, []);

  // Container Recalculation on map ready and window resize
  useEffect(() => {
    if (!mapInstance) return;
    const timer = setTimeout(() => {
      mapInstance.invalidateSize();
    }, 200);

    const handleResize = () => mapInstance.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [mapInstance]);

  // Trigger container recalculation on view/style switch, region switch, or step change
  useEffect(() => {
    if (!mapInstance) return;
    const timer = setTimeout(() => {
      mapInstance.invalidateSize();
    }, 150);
    return () => clearTimeout(timer);
  }, [mapInstance, mapStyle, regionConfig.id, currentStep]);

  // Smoothly Fly Map Viewport to Active City on Region Switch
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !regionConfig) return;
    map.flyTo(regionConfig.center, regionConfig.zoom, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  }, [regionConfig.id]);

  // 2. Handle Tile Style Switching
  const handleSwitchTileStyle = (style: MapTileStyle) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }

    const config = tileProviders[style];
    const newTileLayer = L.tileLayer(config.url, config.options).addTo(map);
    newTileLayer.bringToBack();
    currentTileLayerRef.current = newTileLayer;
    setMapStyle(style);

    // Immediate & deferred invalidateSize to ensure full-viewport tile coverage
    map.invalidateSize();
    setTimeout(() => {
      map.invalidateSize();
    }, 150);
  };

  // 3. Render Tri-Color Zones (Blue / Orange / Red)
  useEffect(() => {
    const group = zonesLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!zonesData || !zonesData.features) return;

    zonesData.features.forEach((feature: any) => {
      const p = feature.properties || {};
      const tier = p.zone_tier; // 'BLUE' | 'ORANGE' | 'RED'

      // Filter check
      if (activeSectorFilter === 'safe_zones' && tier !== 'BLUE') return;
      if (activeSectorFilter === 'red_zones' && tier !== 'RED') return;

      const style: L.PathOptions = {
        color: p.stroke_color || (tier === 'RED' ? '#dc2626' : tier === 'ORANGE' ? '#d97706' : '#2563eb'),
        weight: p.stroke_width || 2,
        fillColor: p.fill_color || (tier === 'RED' ? '#f87171' : tier === 'ORANGE' ? '#fbbf24' : '#60a5fa'),
        fillOpacity: p.fill_opacity || (tier === 'RED' ? 0.32 : tier === 'ORANGE' ? 0.22 : 0.18),
        dashArray: tier === 'BLUE' ? '4, 4' : undefined,
      };

      const geoJsonLayer = L.geoJSON(feature, {
        style,
        onEachFeature: (_, layer) => {
          const badgeBg = tier === 'RED' ? '#fee2e2' : tier === 'ORANGE' ? '#fef3c7' : '#dbeafe';
          const badgeColor = tier === 'RED' ? '#dc2626' : tier === 'ORANGE' ? '#d97706' : '#2563eb';
          const popupHtml = `
            <div style="font-family: inherit; width: 280px; background: white; border-radius: 12px; overflow: hidden;">
              <div style="background: ${badgeBg}; padding: 12px; border-bottom: 1px solid ${badgeColor}30;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <span style="font-size: 10px; font-weight: 800; color: ${badgeColor}; text-transform: uppercase; background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid ${badgeColor}40;">
                    ${p.zone_tier} ZONE: ${p.zone_label}
                  </span>
                </div>
                <h4 style="font-size: 14px; font-weight: 700; color: #0f172a; margin: 0;">${p.name}</h4>
              </div>
              <div style="padding: 12px;">
                <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">
                  Road Accessibility: <strong style="color: ${badgeColor};">${p.roads_accessible_pct}%</strong> | Drain Load: <strong>${p.drain_capacity_pct}%</strong>
                </p>
                <p style="font-size: 11px; color: #475569; margin: 0 0 6px 0;">
                  Power Grid: <strong>${p.power_grid_status}</strong> | Shelters: <strong>${p.shelters_status}</strong>
                </p>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 8px; border-radius: 6px; font-size: 10px; color: #334155;">
                  Key Areas: <strong>${(p.coverage_areas || []).join(', ')}</strong>
                </div>
              </div>
            </div>
          `;
          layer.bindPopup(popupHtml, { maxWidth: 300, className: 'gmaps-popup' });
        },
      });
      group.addLayer(geoJsonLayer);
    });
  }, [zonesData, activeSectorFilter]);

  // 4. Render Multi-Sector Critical Infrastructure Layer (Sectors 1, 2, 3, 4)
  useEffect(() => {
    const group = sectorsLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!sectorsData || !sectorsData.features) return;

    sectorsData.features.forEach((feature: any) => {
      const p = feature.properties || {};
      const coords = feature.geometry.coordinates;
      const lat = coords[1];
      const lng = coords[0];
      const sector = p.sector;

      // Filter check
      if (activeSectorFilter === 'utilities' && sector !== 'utilities') return;
      if (activeSectorFilter === 'emergency' && sector !== 'emergency_services') return;
      if (activeSectorFilter === 'vulnerable' && sector !== 'vulnerable_populations') return;
      if (activeSectorFilter === 'transit' && sector !== 'transport_bottlenecks') return;

      // Assign Icon & Color based on Sector & Sub-category
      let pinBg = '#0284c7';
      let iconSymbol = '📍';
      let subCatLabel = p.sub_category;

      const isSubstation = p.sub_category === 'power_substation';
      const isWater = p.sub_category === 'water_treatment' || p.sub_category === 'stormwater_pump';
      const isCell = p.sub_category === 'cell_tower';
      const isFire = p.sub_category === 'fire_station';
      const isPolice = p.sub_category === 'police_station';
      const isShelter = p.sub_category === 'evacuation_shelter';
      const isSchool = p.sub_category === 'school';
      const isSenior = p.sub_category === 'senior_care';
      const isPortal = p.sub_category === 'metro_portal';
      const isChoke = p.sub_category === 'bridge_choke';

      const isTripped = p.status === 'TRIPPED' || p.flooding_hazard === 'INUNDATED' || p.route_accessibility === 'BLOCKED' || p.operating_status === 'SUBMERGED';

      if (isSubstation) {
        pinBg = isTripped ? '#dc2626' : '#f59e0b';
        iconSymbol = '⚡';
        subCatLabel = `${p.voltage_kv || 33}kV Substation`;
      } else if (isWater) {
        pinBg = '#0284c7';
        iconSymbol = '💧';
        subCatLabel = 'Water/Pumping Facility';
      } else if (isCell) {
        pinBg = '#6366f1';
        iconSymbol = '📡';
        subCatLabel = 'Cellular Telecom Tower';
      } else if (isFire) {
        pinBg = '#e11d48';
        iconSymbol = '🚒';
        subCatLabel = 'Fire & Rescue Station';
      } else if (isPolice) {
        pinBg = '#1d4ed8';
        iconSymbol = '👮';
        subCatLabel = 'Police Command Unit';
      } else if (isShelter) {
        pinBg = '#0d9488';
        iconSymbol = '🏕️';
        subCatLabel = 'Emergency Shelter';
      } else if (isSchool) {
        pinBg = '#d97706';
        iconSymbol = '🏫';
        subCatLabel = 'Educational Institution';
      } else if (isSenior) {
        pinBg = '#db2777';
        iconSymbol = '🧓';
        subCatLabel = 'Senior Care Facility';
      } else if (isPortal) {
        pinBg = isTripped ? '#dc2626' : '#9333ea';
        iconSymbol = '🚇';
        subCatLabel = 'Metro Tunnel Portal';
      } else if (isChoke) {
        pinBg = '#b91c1c';
        iconSymbol = '🌉';
        subCatLabel = 'Transit Choke Point';
      }

      const customIcon = L.divIcon({
        className: 'gmaps-sector-pin',
        html: `
          <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate(-50%, -100%);">
            ${isTripped ? '<div style="position: absolute; top: -3px; width: 34px; height: 34px; border-radius: 50%; border: 3px solid #dc2626; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
            <div style="
              width: 30px; 
              height: 30px; 
              border-radius: 50% 50% 50% 0; 
              transform: rotate(-45deg);
              background: ${pinBg}; 
              border: 2px solid #ffffff; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            ">
              <span style="transform: rotate(45deg); font-size: 13px;">${iconSymbol}</span>
            </div>
            <div style="
              background: #ffffff; 
              border: 1px solid #cbd5e1; 
              color: #0f172a; 
              font-size: 9px; 
              font-family: inherit; 
              font-weight: 700; 
              padding: 1px 5px; 
              border-radius: 3px; 
              margin-top: 2px; 
              white-space: nowrap; 
              box-shadow: 0 2px 5px rgba(0,0,0,0.15);
            ">
              ${p.name.split('(')[0].trim().slice(0, 16)}
            </div>
          </div>
        `,
        iconSize: [30, 42],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      // Build Google Maps style details popup
      const statusText = p.status || p.operating_status || p.operational_status || p.flooding_hazard || p.evacuation_status || (isTripped ? 'TRIPPED' : 'ONLINE');
      const actionBtnLabel = p.action_required || (isSubstation ? 'Deploy Emergency Mobile Generator Crew' : 'Inspect Telemetry');

      const popupHtml = `
        <div style="font-family: inherit; width: 280px; background: white; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${pinBg}20, #f8fafc); padding: 12px; border-bottom: 1px solid #e2e8f0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 9px; font-weight: 800; color: ${pinBg}; text-transform: uppercase; background: white; padding: 2px 6px; border-radius: 4px; border: 1px solid ${pinBg}40;">
                ${subCatLabel}
              </span>
              <span style="font-size: 10px; font-weight: 800; color: ${isTripped ? '#dc2626' : '#16a34a'};">
                ${isTripped ? '🔴 ' + statusText : '🟢 ' + statusText}
              </span>
            </div>
            <h4 style="font-size: 13px; font-weight: 700; color: #0f172a; margin: 0 0 2px 0;">${p.name}</h4>
            <p style="font-size: 10px; color: #64748b; margin: 0;">${p.sector_label} • Elev: ${p.elevation_m || 520}m</p>
          </div>

          <div style="padding: 12px;">
            ${p.dependent_subscribers ? `<p style="font-size: 11px; color: #334155; margin: 0 0 4px 0;">Dependent Grid: <strong>${p.dependent_subscribers.toLocaleString()} Citizens</strong></p>` : ''}
            ${p.bed_capacity ? `<p style="font-size: 11px; color: #334155; margin: 0 0 4px 0;">Shelter Capacity: <strong>${p.bed_capacity} Beds</strong> (Occupancy: ${p.current_occupancy || 0})</p>` : ''}
            ${p.enrollment_count ? `<p style="font-size: 11px; color: #334155; margin: 0 0 4px 0;">Enrollment: <strong>${p.enrollment_count} Students</strong> (${p.evacuation_status || 'Normal'})</p>` : ''}
            ${p.available_appliances ? `<p style="font-size: 11px; color: #334155; margin: 0 0 4px 0;">Appliances: <strong>${p.available_appliances} Fire Tenders</strong></p>` : ''}
            ${p.sump_water_level_m !== undefined ? `<p style="font-size: 11px; color: #334155; margin: 0 0 4px 0;">Sump Water Level: <strong style="color: ${p.sump_water_level_m > 1.0 ? '#dc2626' : '#0f172a'};">${p.sump_water_level_m}m</strong></p>` : ''}

            ${p.dependent_assets && p.dependent_assets.length > 0 ? `
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 6px 8px; border-radius: 6px; font-size: 10px; color: #334155; margin-bottom: 8px;">
                Dependent Assets: <strong>${p.dependent_assets.join(', ')}</strong>
              </div>
            ` : ''}

            <button id="action-sec-${p.id}" style="width: 100%; background: ${isTripped ? '#dc2626' : '#0f172a'}; color: white; border: none; border-radius: 6px; padding: 7px; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
              ${isTripped ? '⚡ Deploy Emergency Crew' : 'Inspect Telemetry'}
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 300, className: 'gmaps-popup' });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`action-sec-${p.id}`);
        if (btn) {
          btn.onclick = () => {
            if (onTriggerAction && isTripped) {
              onTriggerAction('Deploy Mobile Generator', p.name);
            }
            onSelectFeature({
              title: p.name,
              category: subCatLabel,
              accessStatus: statusText,
              inundationDepth: p.sump_water_level_m || p.depth_m || 0.0,
              impactedFacility: (p.dependent_assets || []).join(', ') || p.action_required,
              elevation: p.elevation_m,
              dependentAssets: p.dependent_assets,
              actionButtonLabel: actionBtnLabel,
              details: {
                'Sector': p.sector_label,
                'ID': p.id,
                'Status': statusText,
                'Dependent Assets': (p.dependent_assets || []).join(', ') || 'Direct Subscribers',
                'Action Required': p.action_required || 'Operational Monitoring',
              },
              coordinates: [lng, lat],
            });
          };
        }
      });

      marker.on('click', () => {
        onSelectFeature({
          title: p.name,
          category: subCatLabel,
          accessStatus: statusText,
          inundationDepth: p.sump_water_level_m || p.depth_m || 0.0,
          impactedFacility: (p.dependent_assets || []).join(', ') || p.action_required,
          elevation: p.elevation_m,
          dependentAssets: p.dependent_assets,
          actionButtonLabel: actionBtnLabel,
          details: {
            'Sector': p.sector_label,
            'ID': p.id,
            'Status': statusText,
            'Dependent Assets': (p.dependent_assets || []).join(', ') || 'Direct Subscribers',
            'Action Required': p.action_required || 'Operational Monitoring',
          },
          coordinates: [lng, lat],
        });
      });

      group.addLayer(marker);
    });
  }, [sectorsData, activeSectorFilter, onSelectFeature, onTriggerAction]);

  // 5. Update Flood Masks Layer
  useEffect(() => {
    const group = floodLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!layers.floodMasks || !floodMasksData || !floodMasksData.features) return;

    floodMasksData.features.forEach((feature: any) => {
      const step = feature.properties?.scenario_step;
      const isStructure = step === 99;

      if (!isStructure && step > currentStep) return;

      const polyStyle: L.PathOptions = isStructure
        ? { color: '#0284c7', weight: 1.5, fillColor: '#38bdf8', fillOpacity: 0.25, dashArray: '4, 4' }
        : step === 1
        ? { color: '#d97706', weight: 2, fillColor: '#f59e0b', fillOpacity: 0.35, className: 'flood-sar-polygon' }
        : { color: '#dc2626', weight: 2.5, fillColor: '#ef4444', fillOpacity: 0.45, className: 'flood-sar-polygon' };

      const geoJsonLayer = L.geoJSON(feature, {
        style: polyStyle,
      });
      group.addLayer(geoJsonLayer);
    });
  }, [layers.floodMasks, floodMasksData, currentStep]);

  // 6. Update Road Arteries & Detours
  useEffect(() => {
    const group = roadsLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!layers.roadNetwork || !roadsData || !roadsData.features) return;

    roadsData.features.forEach((feature: any) => {
      const p = feature.properties || {};
      const isSevered = p.access_status === 'SEVERED';
      const isImpeded = p.access_status === 'IMPEDED';

      const style: L.PathOptions = isSevered
        ? { color: '#dc2626', weight: 6, opacity: 0.95, className: 'severed-red-dash' }
        : isImpeded
        ? { color: '#d97706', weight: 5, opacity: 0.85, dashArray: '5, 5' }
        : { color: '#64748b', weight: 3.5, opacity: 0.7 };

      const geoJsonLayer = L.geoJSON(feature, { style });
      group.addLayer(geoJsonLayer);
    });
  }, [layers.roadNetwork, roadsData]);

  // 7. Update Emergency Routes Layer
  useEffect(() => {
    const group = routesLayerGroupRef.current;
    if (!group) return;
    group.clearLayers();

    if (!layers.emergencyRoutes || !detourRoutesData || !detourRoutesData.features) return;

    detourRoutesData.features.forEach((feature: any) => {
      const p = feature.properties || {};
      const isSafe = p.route_type === 'SAFE_DETOUR';

      const style: L.PathOptions = isSafe
        ? { color: '#059669', weight: 6, opacity: 0.95, className: currentStep > 0 ? 'detour-green-glow' : '' }
        : { color: currentStep > 0 ? '#dc2626' : '#64748b', weight: 5, opacity: 0.9, dashArray: currentStep > 0 ? '8, 8' : 'none' };

      const geoJsonLayer = L.geoJSON(feature, { style });
      group.addLayer(geoJsonLayer);

      if (isSafe && currentStep > 0 && feature.geometry?.coordinates) {
        const coords = feature.geometry.coordinates;
        const startPt = coords[0];
        const endPt = coords[coords.length - 1];

        const startIcon = L.divIcon({
          className: 'gmaps-route-pin',
          html: `<div style="background: #0f172a; color: white; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid #10b981; white-space: nowrap; transform: translate(-50%, -100%);">🟢 DETOUR START (Masab Tank)</div>`,
          iconSize: [24, 24],
        });
        group.addLayer(L.marker([startPt[1], startPt[0]], { icon: startIcon }));

        const endIcon = L.divIcon({
          className: 'gmaps-route-pin',
          html: `<div style="background: #065f46; color: white; font-weight: 700; font-size: 10px; padding: 3px 8px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap; transform: translate(-50%, -100%);">🏥 SAFE RECEIVER (NIMS Gate 2)</div>`,
          iconSize: [24, 24],
        });
        group.addLayer(L.marker([endPt[1], endPt[0]], { icon: endIcon }));
      }
    });
  }, [layers.emergencyRoutes, detourRoutesData, currentStep]);

  // Recenter map
  const handleRecenter = () => {
    if (mapInstanceRef.current && regionConfig) {
      mapInstanceRef.current.flyTo(regionConfig.center, regionConfig.zoom, { duration: 1.2 });
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Search autocomplete
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const results: Array<{ name: string; category: string; coords: [number, number]; id: string }> = [];

    sectorsData?.features?.forEach((s: any) => {
      const name = s.properties?.name || '';
      if (name.toLowerCase().includes(q)) {
        results.push({
          name,
          category: s.properties?.sector_label || s.properties?.sub_category || 'Sector Asset',
          coords: [s.geometry.coordinates[1], s.geometry.coordinates[0]],
          id: s.properties?.id,
        });
      }
    });

    facilitiesData?.features?.forEach((f: any) => {
      const name = f.properties?.name || '';
      if (name.toLowerCase().includes(q)) {
        results.push({
          name,
          category: f.properties?.type_label || 'Facility',
          coords: [f.geometry.coordinates[1], f.geometry.coordinates[0]],
          id: f.properties?.id,
        });
      }
    });

    return results.slice(0, 6);
  }, [searchQuery, sectorsData, facilitiesData]);

  const handleSelectSearchResult = (result: { name: string; category: string; coords: [number, number] }) => {
    setSearchQuery(result.name);
    setIsSearchOpen(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(result.coords, 15, { duration: 1.2 });
    }
  };

  // Dynamically extract safe and obstructed detour routes for the active region
  const safeRoute = useMemo(() => {
    return detourRoutesData?.features?.find((f: any) => f.properties?.route_type === 'SAFE_DETOUR')?.properties;
  }, [detourRoutesData]);

  const obstructedRoute = useMemo(() => {
    return detourRoutesData?.features?.find((f: any) => f.properties?.route_type === 'OBSTRUCTED_DIRECT')?.properties;
  }, [detourRoutesData]);

  return (
    <div className="relative flex-1 h-full w-full bg-[#e5e3df] overflow-hidden select-none z-0">
      
      {/* 1. MAP CONTAINER */}
      <div 
        ref={mapContainerRef} 
        id="civicos-map-container"
        className="absolute inset-0 w-full h-full z-0" 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
      />

      {/* 2. GOOGLE MAPS FLOATING SEARCH & 4-SECTOR FILTER BAR (Top-Left, z-index 20) */}
      <div className="absolute top-3 left-4 z-20 flex flex-col gap-2 max-w-[460px] w-full pointer-events-none">
        <div className="relative w-full pointer-events-auto">
          <div className="bg-white rounded-full shadow-lg border border-slate-200 px-4 py-2.5 flex items-center gap-3 transition-all hover:shadow-xl focus-within:ring-2 focus-within:ring-blue-500">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={`Search ${regionConfig.name} facilities, routes, sensors...`}
              className="w-full text-xs text-slate-800 bg-transparent outline-none placeholder:text-slate-400 font-sans"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden py-1 z-40 pointer-events-auto">
              {searchResults.map((res) => (
                <div
                  key={res.id || res.name}
                  onClick={() => handleSelectSearchResult(res)}
                  className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{res.name}</p>
                    <p className="text-[10px] text-slate-400">{res.category}</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Sector Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pointer-events-auto">
          <button
            onClick={() => setActiveSectorFilter('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'all'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Sectors
          </button>
          <button
            onClick={() => setActiveSectorFilter('safe_zones')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'safe_zones'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🔵 Safe Zones
          </button>
          <button
            onClick={() => setActiveSectorFilter('utilities')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'utilities'
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-amber-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⚡ Power & Water
          </button>
          <button
            onClick={() => setActiveSectorFilter('emergency')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'emergency'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-white text-rose-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🚒 Emergency Services
          </button>
          <button
            onClick={() => setActiveSectorFilter('vulnerable')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'vulnerable'
                ? 'bg-purple-600 text-white border-purple-600'
                : 'bg-white text-purple-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🏫 Vulnerable Groups
          </button>
          <button
            onClick={() => setActiveSectorFilter('transit')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'transit'
                ? 'bg-teal-600 text-white border-teal-600'
                : 'bg-white text-teal-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🚇 Transit Choke Points
          </button>
          <button
            onClick={() => setActiveSectorFilter('red_zones')}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight shadow-md border whitespace-nowrap transition-all ${
              activeSectorFilter === 'red_zones'
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            🔴 Critical Red Zones
          </button>
        </div>
      </div>

      {/* 3. GOOGLE MAPS ON-SCREEN STYLE SWITCHER (Top-Right) */}
      <div className="absolute top-3 right-4 z-30 pointer-events-auto flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl shadow-lg border border-slate-200">
        <button
          onClick={() => handleSwitchTileStyle('standard')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mapStyle === 'standard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Default Google Maps Lookalike Vector View"
        >
          <MapIcon className="w-3.5 h-3.5" />
          <span>Map</span>
        </button>

        <button
          onClick={() => handleSwitchTileStyle('satellite')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mapStyle === 'satellite' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Esri World Imagery High-Resolution Satellite"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Satellite</span>
        </button>

        <button
          onClick={() => handleSwitchTileStyle('terrain')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            mapStyle === 'terrain' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="Topographic Elevation & Relief View"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Terrain</span>
        </button>
      </div>

      {/* 4. GOOGLE MAPS TURN-BY-TURN INSTRUCTIONS DRAWER */}
      {isNavDrawerOpen && (
        <div className="absolute bottom-4 left-4 z-30 pointer-events-auto max-w-[420px] w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden font-sans transition-all animate-fade-in">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-3.5 flex items-start justify-between">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-sm mt-0.5">
                <Navigation className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-emerald-100">
                  CIVICOS SAFE NAVIGATION // {regionConfig.label}
                </span>
                <h3 className="text-xs font-bold leading-tight mt-0.5 text-white">
                  {safeRoute?.name || 'Emergency Evacuation & Trauma Bypass Corridor'}
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsNavDrawerOpen(false)}
              className="text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-800 font-mono">
                {safeRoute?.eta_minutes?.split(' ')[0] || '14'} min
              </span>
              <span className="text-xs text-slate-500">({safeRoute?.distance_km || 5.8} km)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                100% CLEAR
              </span>
            </div>
            <div className="text-[10px] font-mono text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-100 font-semibold truncate max-w-[200px]" title={obstructedRoute?.name}>
              <span className="truncate">Blocked: {obstructedRoute?.name?.slice(0, 24) || 'Direct Corridor'}...</span>
            </div>
          </div>

          <div className="p-3 space-y-2 max-h-[175px] overflow-y-auto text-xs text-slate-700">
            {/* Obstructed route alert */}
            {obstructedRoute && (
              <div className="flex items-start gap-2.5 bg-red-50 p-2 rounded-lg border border-red-100">
                <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-red-700">⚠️ SEVERED: {obstructedRoute.name}</p>
                  <p className="text-[10px] text-red-600 mt-0.5">{obstructedRoute.notes}</p>
                </div>
              </div>
            )}

            {/* Dynamic waypoints */}
            {(safeRoute?.waypoints || [
              'Emergency Medical Staging Ramp',
              'Elevated Highway Bypass',
              'Apex Trauma Receiving Gate'
            ]).map((wp: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-semibold text-slate-800">🟢 Step {idx + 1}: {wp}</p>
                  <p className="text-[10px] text-slate-400">Green corridor secured for emergency ambulance transit</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">
              Advantage: <strong className="text-emerald-600">{safeRoute?.elevation_advantage || '+18m above flood line'}</strong>
            </span>
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.flyTo(regionConfig.center, regionConfig.zoom + 1, { duration: 1.0 });
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-colors"
            >
              <span>Follow Safe Route</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button to re-open Directions */}
      {!isNavDrawerOpen && (
        <button
          onClick={() => setIsNavDrawerOpen(true)}
          className="absolute bottom-4 left-4 z-30 pointer-events-auto bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 rounded-full shadow-xl border border-slate-200 flex items-center gap-2 text-xs font-semibold transition-all hover:scale-105"
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          <span>Turn-by-Turn Directions ({safeRoute?.eta_minutes?.split(' ')[0] || '14'} min)</span>
        </button>
      )}

      {/* 5. MULTI-SECTOR COMPASS & LAYER LEGEND (Bottom-Right area) */}
      <div className="absolute bottom-4 right-16 z-30 pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-200 text-xs font-sans text-slate-700 space-y-1.5 hidden lg:block max-w-[280px]">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <span>SECTOR & ZONE LEGEND</span>
          <span className="text-blue-600 font-mono">{regionConfig.label}</span>
        </div>

        <div className="grid grid-cols-2 gap-1 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>🔵 Safe Zone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>🟠 Alert Zone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
            <span>🔴 Disaster Zone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>🟢 Safe Detour</span>
          </div>
        </div>

        <div className="pt-1 border-t border-slate-100 grid grid-cols-2 gap-1 text-[10px] text-slate-600">
          <span>⚡ Power Substation</span>
          <span>🚒 Fire & Rescue</span>
          <span>🏕️ Emergency Shelter</span>
          <span>🏫 Schools/Care</span>
          <span>🚇 Metro Portals</span>
          <span>🌉 Causeway Choke</span>
        </div>
      </div>

      {/* 6. GOOGLE MAPS NAVIGATION CONTROLS (Bottom-Right) */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-1.5 pointer-events-auto">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
          <button
            onClick={handleZoomIn}
            className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-b border-slate-100 transition-colors flex items-center justify-center font-bold text-sm"
            title="Zoom In"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center font-bold text-sm"
            title="Zoom Out"
          >
            −
          </button>
        </div>

        <button
          onClick={handleRecenter}
          className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 shadow-lg border border-slate-200 transition-all flex items-center justify-center"
          title="Recenter on Hyderabad Metro Area"
        >
          <Crosshair className="w-4 h-4" />
        </button>

        <button
          onClick={handleToggleFullscreen}
          className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 shadow-lg border border-slate-200 transition-all flex items-center justify-center"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 7. FEATURE INSPECTED BADGE */}
      {selectedFeatureTitle && (
        <div className="absolute top-16 right-4 z-20 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2 pointer-events-auto">
            <Info className="w-3.5 h-3.5 text-blue-600" />
            <span>SELECTED: {selectedFeatureTitle.slice(0, 24)}</span>
          </div>
        </div>
      )}

    </div>
  );
};
