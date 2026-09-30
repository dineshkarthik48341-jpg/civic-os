import { RegionBundle } from '../../types';

export const bengaluruBundle: RegionBundle = {
  config: {
    id: 'bengaluru',
    name: 'Bengaluru Urban (Mahadevapura / Bellandur Corridor)',
    state: 'Karnataka',
    stateCode: 'KA',
    label: 'Bengaluru (KA)',
    center: [12.9250, 77.6780],
    zoom: 12.5,
    primaryBasin: 'Bellandur & Varthur Lake Drainage Basin',
    worstWard: 'Ward 150 (Bellandur & Mahadevapura)',
    damDischarge: 'Bellandur Surplus Sluice: 4,200 Cusecs',
    rainfallTelemetry: 'Ecospace Rajakaluve: 135 mm / 24h',
    emergencyContact: '1533 / 080 2266 0000 (BBMP Disaster Cell)',
    step0Risk: 15,
    step1Risk: 74,
    step2Risk: 97,
    regionalLanguageLabel: 'ಕನ್ನಡ (Kannada)',
    regionalLanguageCode: 'kn'
  },
  zones: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'zone-blr-red-01',
        properties: {
          id: 'zone-blr-red-01',
          name: 'Outer Ring Road (ORR) Ecospace & Bellandur Lake Outflow Inundation Zone',
          zone_tier: 'RED',
          zone_label: 'Critical Inundation / Tech Corridor Choke',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['ORR Ecospace Underpass', 'Kadubeesanahalli Junction', 'Bellandur Lakebed Fringe', 'Devarabisanahalli'],
          roads_accessible_pct: 12,
          drain_capacity_pct: 100,
          power_grid_status: 'KPTCL_66KV_SUBSTATION_SUBMERGED',
          shelters_status: 'TRACTOR_CONVOY_EVACUATION',
          summary: 'Primary stormwater Rajakaluve overflowed. Ecospace underpass submerged under 1.2m water; tech campuses stranded.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.660, 12.915],
            [77.698, 12.918],
            [77.705, 12.942],
            [77.665, 12.940],
            [77.660, 12.915]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-blr-red-02',
        properties: {
          id: 'zone-blr-red-02',
          name: 'Rainbow Drive Layout & Sarjapur Road Wetland Inundation',
          zone_tier: 'RED',
          zone_label: 'Gated Community Submersion Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Rainbow Drive Layout', 'Sarjapur Wipro Gate Corridor', 'Junnasandra Lowlands'],
          roads_accessible_pct: 15,
          drain_capacity_pct: 100,
          power_grid_status: 'BESCOM_TRANSFORMERS_CUTOFF',
          shelters_status: 'SDRF_RAFT_ACTIVE',
          summary: 'Halanayakanahalli lake surplus breached drainage wall; 120 villas inundated up to 1.4m depth.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.685, 12.895],
            [77.715, 12.898],
            [77.720, 12.918],
            [77.690, 12.915],
            [77.685, 12.895]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-blr-orange-01',
        properties: {
          id: 'zone-blr-orange-01',
          name: 'Silk Board Junction & HSR Layout Sector 6 Waterlogging Zone',
          zone_tier: 'ORANGE',
          zone_label: 'Severe Transit Gridlock Zone',
          color_hex: '#f59e0b',
          fill_color: '#fbbf24',
          fill_opacity: 0.25,
          stroke_color: '#d97706',
          stroke_width: 2.0,
          coverage_areas: ['Central Silk Board Interchange', 'HSR Layout 14th Main', 'Bommanahalli Culvert'],
          roads_accessible_pct: 48,
          drain_capacity_pct: 88,
          power_grid_status: 'ISOLATED_FEEDERS',
          shelters_status: 'STANDBY',
          summary: 'Madivala lake overflow causing 0.6m waterlogging at Silk Board. Traffic tailback reaches 8 km.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.615, 12.905],
            [77.650, 12.908],
            [77.652, 12.928],
            [77.618, 12.925],
            [77.615, 12.905]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-blr-blue-01',
        properties: {
          id: 'zone-blr-blue-01',
          name: 'Indiranagar & Whitefield Geological High Ground Haven',
          zone_tier: 'BLUE',
          zone_label: 'Safe High Ground Haven',
          color_hex: '#3b82f6',
          fill_color: '#60a5fa',
          fill_opacity: 0.18,
          stroke_color: '#2563eb',
          stroke_width: 2.0,
          coverage_areas: ['Indiranagar 100ft Road', 'Whitefield Plateau', 'Old Airport Road HAL Spur'],
          roads_accessible_pct: 100,
          drain_capacity_pct: 25,
          power_grid_status: '100% SECURE_UNINTERRUPTED',
          shelters_status: 'BBMP_EMERGENCY_HQ_ACTIVE',
          summary: 'Natural plateau elevation +920m MSL. Serves as trauma diversion and emergency air corridor.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.635, 12.960],
            [77.675, 12.962],
            [77.678, 12.985],
            [77.638, 12.982],
            [77.635, 12.960]
          ]]
        }
      }
    ]
  },
  flood_masks: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'blr-flood-step1',
        properties: {
          id: 'blr-flood-step1',
          scenario_step: 1,
          name: 'Bellandur Lake Wetland Surcharge - Step 1',
          satellite_source: 'Sentinel-1 Dual-Pol SAR',
          inundation_class: 'Urban Wetland Surcharge',
          mean_depth_m: 0.45,
          peak_depth_m: 0.85,
          confidence_score: 0.94,
          hazard_level: 'ALERT_HIGH',
          area_hectares: 38.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.665, 12.925],
            [77.685, 12.928],
            [77.690, 12.938],
            [77.670, 12.935],
            [77.665, 12.925]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'blr-flood-step2-catastrophic',
        properties: {
          id: 'blr-flood-step2-catastrophic',
          scenario_step: 2,
          name: 'ORR Ecospace & Bellandur Lake Fluvial Flood Extent',
          satellite_source: 'Dual-Pol SAR Interferometric Mask',
          inundation_class: 'Urban Flash Inundation Disaster Extent',
          mean_depth_m: 1.20,
          peak_depth_m: 1.85,
          confidence_score: 0.98,
          hazard_level: 'EMERGENCY_CRITICAL',
          area_hectares: 96.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [77.660, 12.918],
            [77.702, 12.920],
            [77.710, 12.945],
            [77.665, 12.942],
            [77.660, 12.918]
          ]]
        }
      }
    ]
  },
  roads: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'blr-road-orr-ecospace',
        properties: {
          id: 'blr-road-orr-ecospace',
          name: 'Outer Ring Road (ORR) Bellandur-Ecospace Underpass',
          type: 'Primary IT Corridor Expressway',
          lanes: 6,
          speed_limit_kmh: 60,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-BLR-ORR-01',
          access_status: 'SEVERED',
          inundation_depth_m: 1.20,
          submerged_length_m: 1100,
          is_severed: true,
          critical_asset_access: 'Sakra World Hospital & 45 Tech Parks',
          elevation_profile: 'Depressed Underpass Sump (+880m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.675, 12.918],
            [77.684, 12.926],
            [77.697, 12.936],
            [77.708, 12.945]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'blr-road-old-airport-bypass',
        properties: {
          id: 'blr-road-old-airport-bypass',
          name: 'Wind Tunnel Road / Old Airport Road Elevated Bypass',
          type: 'Elevated Ridge Arterial',
          lanes: 4,
          speed_limit_kmh: 60,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-BLR-HAL-02',
          access_status: 'CLEAR',
          inundation_depth_m: 0.0,
          submerged_length_m: 0,
          is_severed: false,
          critical_asset_access: 'High-speed connection to Manipal Hospital & Sakra North Gate',
          elevation_profile: 'High Natural Ridge (+912m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.652, 12.935],
            [77.662, 12.948],
            [77.682, 12.955],
            [77.715, 12.965]
          ]
        }
      }
    ]
  },
  facilities: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'blr-fac-sakra',
        properties: {
          id: 'blr-fac-sakra',
          name: 'Sakra World Hospital (ORR Devarabisanahalli)',
          category: 'hospital',
          type_label: 'Apex Quaternary Trauma Center',
          ward: 'Ward 150 (Bellandur)',
          capacity: '350 Beds (80 ICU)',
          icu_status: 'BASEMENT SUBMERGED // NORTH ELEVATED GATE ONLY',
          flood_vulnerability: 'EXTREME (Adjacent to Ecospace Rajakaluve)',
          contact: '+91 80 4969 4969',
          elevation_m: 885.0,
          is_critical: true,
          access_status: 'CUTOFF',
          inundation_depth_m: 0.85,
          risk_tier: 'IMMEDIATE_DISASTER_RISK',
          action_required: 'Deploy 2500-GPM mobile dewatering unit and reroute trauma to North Gate via Wind Tunnel'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.689, 12.928]
        }
      },
      {
        type: 'Feature',
        id: 'blr-fac-manipal-whitefield',
        properties: {
          id: 'blr-fac-manipal-whitefield',
          name: 'Manipal Hospital Whitefield',
          category: 'hospital',
          type_label: 'Tertiary Care Trauma Hospital',
          ward: 'Ward 84 (Whitefield)',
          capacity: '400 Beds (90 ICU)',
          icu_status: '100% OPERATIONAL // SAFE HARBOR',
          flood_vulnerability: 'LOW (High Ground Defense)',
          contact: '+91 80 6165 6666',
          elevation_m: 918.0,
          is_critical: true,
          access_status: 'OPERATIONAL',
          inundation_depth_m: 0.0,
          risk_tier: 'SAFE_HAVEN',
          action_required: 'Receiving trauma diversions from Sakra and ORR'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.725, 12.980]
        }
      },
      {
        type: 'Feature',
        id: 'blr-fac-silkboard',
        properties: {
          id: 'blr-fac-silkboard',
          name: 'Silk Board Multi-Modal Bus Interchange & Metro Yellow Line Pier',
          category: 'metro',
          type_label: 'Major Transit Hub & Underpass Choke Point',
          ward: 'Ward 174 (Bommanahalli)',
          daily_ridership: '180,000 Commuters',
          flood_vulnerability: 'HIGH (Low depression basin)',
          contact: '+91 80 2295 2525',
          elevation_m: 890.0,
          is_critical: true,
          access_status: 'GRIDLOCKED',
          inundation_depth_m: 0.60,
          risk_tier: 'HIGH_ALERT',
          action_required: 'Deploy traffic cordons and divert vehicular flow to Koramangala 80ft road'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.623, 12.917]
        }
      }
    ]
  },
  sectors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'blr-sec-kptcl-kadubeesanahalli',
        properties: {
          id: 'blr-sec-kptcl-kadubeesanahalli',
          name: 'KPTCL 66kV Kadubeesanahalli Substation',
          sector: 'utilities',
          sector_label: 'Lifelines & Power Grid',
          sub_category: '66kV Transmission Substation',
          substation_id: 'KPTCL-KADU-66',
          voltage_kv: 66,
          status: 'TRIPPED_FLOOD_BREACH',
          grid_load_pct: 0,
          dependent_subscribers: 140000,
          elevation_m: 884.0,
          action_required: 'Substation yard submerged under 1.1m; 45 IT tech parks running on diesel generator buffers'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.697, 12.936]
        }
      },
      {
        type: 'Feature',
        id: 'blr-sec-bellandur-rajakaluve',
        properties: {
          id: 'blr-sec-bellandur-rajakaluve',
          name: 'Bellandur Primary Stormwater Rajakaluve Choke',
          sector: 'utilities',
          sector_label: 'Lifelines & Stormwater Sluice',
          sub_category: 'Primary Stormwater Drain Corridor',
          station_id: 'SWD-BELL-01',
          capacity_mld: 850,
          current_load_pct: 100,
          operating_status: 'ENCROACHMENT_OVERFLOW',
          elevation_m: 882.0,
          action_required: 'Deploy amphibious excavators to clear floating weed mats and silt blockages'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.675, 12.930]
        }
      },
      {
        type: 'Feature',
        id: 'blr-sec-hal-fire',
        properties: {
          id: 'blr-sec-hal-fire',
          name: 'Karnataka State Fire & Emergency Services - HAL Base',
          sector: 'emergency_services',
          sector_label: 'Emergency Response & Rescue',
          sub_category: 'Central Disaster Rescue Station',
          available_appliances: 12,
          route_accessibility: '100% OPERATIONAL',
          assigned_patrols: 35,
          elevation_m: 915.0,
          action_required: 'Deploy 8 farm tractors and high-clearance rescue trailers to Ecospace'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.670, 12.955]
        }
      },
      {
        type: 'Feature',
        id: 'blr-sec-ecospace-shelter',
        properties: {
          id: 'blr-sec-ecospace-shelter',
          name: 'HAL Heritage Sports Complex Emergency Relief Camp',
          sector: 'vulnerable_populations',
          sector_label: 'Sensitive Populations & Relief',
          sub_category: 'Temporary Relief Center',
          shelter_id: 'SHELTER-HAL-01',
          bed_capacity: 1500,
          current_occupancy: 950,
          evacuation_priority: 'HIGH',
          elevation_m: 914.0,
          action_required: 'Provide emergency mobile charging vans and drinking water tanks'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.665, 12.958]
        }
      },
      {
        type: 'Feature',
        id: 'blr-sec-ecospace-underpass-choke',
        properties: {
          id: 'blr-sec-ecospace-underpass-choke',
          name: 'ORR Ecospace Underpass Choke Point',
          sector: 'transport_bottlenecks',
          sector_label: 'Transport Bottlenecks & Chokes',
          sub_category: 'Expressway Underpass Choke',
          choke_id: 'CHOKE-ECOSPACE-01',
          clearance_height_m: 4.5,
          passable_lanes: 0,
          depth_m: 1.20,
          elevation_m: 880.0,
          action_required: 'Road completely impassable; 20+ BMTC buses stranded; activate heavy dewatering pumps'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.684, 12.926]
        }
      }
    ]
  },
  sensors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'blr-sens-ecospace-rajakaluve',
        properties: {
          id: 'blr-sens-ecospace-rajakaluve',
          code: 'DRAIN-BLR-ECO-01',
          name: 'ORR Ecospace Primary Rajakaluve Ultrasonic Hydro-Sensor',
          ward: 'Ward 150 (Bellandur)',
          sensor_type: 'Ultrasonic Echo & Hydrostatic Sensor',
          max_capacity_m: 3.5,
          step0: { depth_m: 0.50, level_pct: 14, status: 'NORMAL', flow_rate_lps: 380 },
          step1: { depth_m: 2.65, level_pct: 76, status: 'WARNING', flow_rate_lps: 3400 },
          step2: { depth_m: 3.90, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 8900 },
          recommended_pump_gpm: 2500,
          depth_m: 0.50,
          level_pct: 14,
          status: 'NORMAL',
          flow_rate_lps: 380
        },
        geometry: {
          type: 'Point',
          coordinates: [77.682, 12.925]
        }
      },
      {
        type: 'Feature',
        id: 'blr-sens-bellandur-weir',
        properties: {
          id: 'blr-sens-bellandur-weir',
          code: 'DRAIN-BLR-BEL-02',
          name: 'Bellandur Lake Surplus Escape Weir Sensor',
          ward: 'Bellandur Outflow',
          sensor_type: 'Digital Radar Staff Gauge',
          max_capacity_m: 4.0,
          step0: { depth_m: 0.85, level_pct: 21, status: 'NORMAL', flow_rate_lps: 650 },
          step1: { depth_m: 2.90, level_pct: 72, status: 'WARNING', flow_rate_lps: 2800 },
          step2: { depth_m: 4.20, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 6400 },
          recommended_pump_gpm: 2000,
          depth_m: 0.85,
          level_pct: 21,
          status: 'NORMAL',
          flow_rate_lps: 650
        },
        geometry: {
          type: 'Point',
          coordinates: [77.695, 12.938]
        }
      }
    ]
  },
  detour_routes: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'route-blr-obstructed',
        properties: {
          id: 'route-blr-obstructed',
          name: 'Primary Transit Corridor (Outer Ring Road Ecospace Underpass)',
          status: 'SUBMERGED_IMPASSABLE',
          is_active_corridor: true,
          route_type: 'OBSTRUCTED_DIRECT',
          color_code: '#94a3b8',
          dash_array: 'none',
          water_hazard_depth_m: 1.20,
          eta_minutes: 'Blocked (Impassable)',
          distance_km: 4.8,
          notes: 'ORR Ecospace underpass submerged under 1.2m water. 20+ BMTC buses stranded. Route completely closed.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.675, 12.918],
            [77.684, 12.926],
            [77.689, 12.928],
            [77.697, 12.936],
            [77.710, 12.955]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'route-blr-safe-detour',
        properties: {
          id: 'route-blr-safe-detour',
          name: 'CivicOS Safe Detour (Wind Tunnel Road / Old Airport Road Bypass to Manipal & Sakra North)',
          status: 'RECOMMENDED_SAFE',
          is_active_corridor: false,
          route_type: 'SAFE_DETOUR',
          color_code: '#10b981',
          dash_array: 'none',
          water_hazard_depth_m: 0.0,
          eta_minutes: '15 min (+6 min detour)',
          distance_km: 7.2,
          elevation_advantage: '+24 meters above floodplain',
          waypoints: [
            'HSR 27th Main High Road',
            'Wind Tunnel Road Elevated Spur',
            'HAL Airport Perimeter Highway',
            'Old Airport Road Overbridge',
            'Sakra World Hospital North Access Gate'
          ],
          notes: '100% free of flooding. Secured by Bengaluru Traffic Police (BTP) green corridor for emergency trauma.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.652, 12.915],
            [77.662, 12.935],
            [77.670, 12.950],
            [77.688, 12.945],
            [77.689, 12.930]
          ]
        }
      }
    ]
  },
  citizen_reports: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'cit-blr-01',
        properties: {
          id: 'cit-blr-01',
          scenario_step: 1,
          caller_name: 'Praveen Murthy',
          phone_masked: '+91 9900X XXX14',
          location_desc: 'ORR Ecospace Business Park Gate 2',
          category: 'Tech Campus Waterlogging',
          water_depth_est: '0.8m',
          urgency: 'HIGH',
          status: 'PENDING_PUMP',
          timestamp_relative: '7 min ago',
          notes: 'Rajakaluve overflowed into basements. 1,400 tech employees unable to exit. Requesting tractors.'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.683, 12.925]
        }
      },
      {
        type: 'Feature',
        id: 'cit-blr-02',
        properties: {
          id: 'cit-blr-02',
          scenario_step: 2,
          caller_name: 'Aishwarya Gowda',
          phone_masked: '+91 9886X XXX52',
          location_desc: 'Rainbow Drive Layout Row House 42',
          category: 'Residential Submersion',
          water_depth_est: '1.3m',
          urgency: 'CRITICAL',
          status: 'DISPATCHED',
          timestamp_relative: '14 min ago',
          notes: 'Lake surplus engulfed entry arch. Family stranded on first floor. Electricity cut off. SDRF raft needed.'
        },
        geometry: {
          type: 'Point',
          coordinates: [77.702, 12.908]
        }
      }
    ]
  },
  cascading_chains: {
    0: {
      is_active: false,
      status_label: 'NORMAL_WATCH',
      trigger_node: 'Bellandur Stormwater Drainage Normal',
      chain_nodes: [
        {
          id: 'blr-node-0-1',
          title: 'Rajakaluve Levels',
          icon: 'droplets',
          status: 'NORMAL',
          desc: 'Primary stormwater canals flowing at 14% nominal capacity; lake weir gates operational.',
          impact_level: 'LOW',
          time_relative: 'T+00'
        }
      ],
      automated_recommendations: ['Maintain regular automated sensor telemetry across Bellandur basin.']
    },
    1: {
      is_active: true,
      status_label: 'WARNING_SURGE',
      trigger_node: 'Catchment Cloudburst (65mm / 2h)',
      chain_nodes: [
        {
          id: 'blr-node-1-1',
          title: 'Canal Influx',
          icon: 'rain',
          status: 'WARNING',
          desc: 'Rajakaluve capacity reaches 76%; water begins ponding at ORR Ecospace underpass.',
          impact_level: 'HIGH',
          time_relative: 'T+30 min'
        }
      ],
      automated_recommendations: ['Pre-position BBMP tractor teams at Kadubeesanahalli junction.']
    },
    2: {
      is_active: true,
      status_label: 'CASCADING_DISASTER_ACTIVE',
      trigger_node: 'Primary Rajakaluve Encroachment Overflow ➔ ORR Ecospace Underpass Flooded',
      chain_nodes: [
        {
          id: 'blr-node-2-1',
          title: 'Rajakaluve Encroachment Overflow',
          icon: 'rain',
          status: 'CRITICAL',
          desc: 'Severe stormwater bottleneck due to encroachment; 8,900 L/s flow rate bursts over ORR corridor.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+35 min',
          action: 'Issue Red Disaster Warning for Mahadevapura Ward',
          asset_target: 'ORR Ecospace Rajakaluve'
        },
        {
          id: 'blr-node-2-2',
          title: 'ORR Ecospace Submerged (1.2m)',
          icon: 'droplets',
          status: 'SUBMERGED',
          desc: 'ORR Ecospace underpass submerged under 1.2m water; 20+ buses and cars halted mid-corridor.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+40 min',
          action: 'Deploy Tractor Evacuation Convoy & High-Volume Dewatering Pumps',
          asset_target: 'ORR Ecospace Underpass'
        },
        {
          id: 'blr-node-2-3',
          title: 'Kadubeesanahalli Substation Submerged',
          icon: 'power',
          status: 'TRIPPED',
          desc: 'KPTCL 66kV Kadubeesanahalli yard inundated; 45 IT tech parks running on emergency DG buffers.',
          impact_level: 'CRITICAL',
          time_relative: 'T+46 min',
          action: 'Coordinate Emergency Diesel Tanker Fuel Green Corridor',
          asset_target: 'KPTCL 66kV Substation'
        },
        {
          id: 'blr-node-2-4',
          title: 'Sakra Trauma Route Stranded',
          icon: 'ambulance',
          status: 'ROAD_SEVERED',
          desc: 'Outer Ring Road direct ambulance route to Sakra World Hospital completely severed.',
          impact_level: 'CRITICAL',
          time_relative: 'T+51 min',
          action: 'Engage Wind Tunnel Road Elevated Bypass to North Gate',
          asset_target: 'Sakra World Hospital ORR Route'
        },
        {
          id: 'blr-node-2-5',
          title: 'Safe Detour via Wind Tunnel Bypass',
          icon: 'traffic',
          status: 'SAFE_DETOUR',
          desc: 'All emergency trauma and tech commuters safely routed via Wind Tunnel Road to Manipal Hospital.',
          impact_level: 'MITIGATED',
          time_relative: 'T+57 min',
          action: 'Station Traffic Wardens at Wind Tunnel Junction',
          asset_target: 'Wind Tunnel Road Bypass'
        }
      ],
      automated_recommendations: [
        'Deploy heavy dewatering pumps to Ecospace underpass and Kadubeesanahalli substation.',
        'Mobilize BBMP disaster tractors for ferrying stranded tech workers from tech parks.',
        'Transmit cell broadcasts in Kannada and English to 55,000 citizens along the ORR corridor.'
      ]
    }
  },
  ai_plans: {
    0: {
      scenario_step: 0,
      status: 'NORMAL_WATCH',
      executive_summary: 'Bengaluru Urban Sector: Bellandur and Varthur lake stormwater drains flowing within normal hydraulic limits. Outer Ring Road clear and operating at nominal speed.',
      risk_assessment: {
        ward_14_risk_index: 15,
        threat_category: 'ROUTINE_MONITORING',
        precipitation_rate: '0 mm/hr'
      },
      dewatering_work_orders: [],
      traffic_dispatch_orders: [],
      citizen_broadcast: {
        alert_level: 'GREEN_ADVISORY',
        sms_english: 'BENGALURU DISASTER ADVISORY: Normal weather conditions. Stormwater Rajakaluves flowing normally. Emergency helpline: 1533 / 112.',
        sms_telugu: 'ಬೆಂಗಳೂರು ವಿಪತ್ತು ನಿರ್ವಹಣೆ ಸಲಹೆ: ಹವಾಮಾನ ಸಹಜವಾಗಿದೆ. ರಾಜಕಾಲುವೆಗಳಲ್ಲಿ ನೀರಿನ ಹರಿವು ಸಹಜವಾಗಿದೆ. ಸಹಾಯವಾಣಿ: 1533.',
        whatsapp_card: '🟢 *CIVICOS BENGALURU ADVISORY*\n\nStatus: NORMAL CONDITIONS\nOuter Ring Road: CLEAR\nBBMP Helpline: 1533 / 080 2266 0000',
        target_subscribers: 0,
        geofence_radius_km: 1.0
      },
      telemetry_insights: 'Ecospace Rajakaluve hydro-sensor reads 0.50m. All drain sluices functional.',
      processing_time_ms: 115
    },
    1: {
      scenario_step: 1,
      status: 'CLOUDBURST_INFLUX',
      executive_summary: 'Heavy cloudburst over Mahadevapura (65 mm/hr). Bellandur rajakaluve water levels rising rapidly. Waterlogging starting at ORR Ecospace underpass.',
      risk_assessment: {
        ward_14_risk_index: 74,
        threat_category: 'ELEVATED_WATCH',
        precipitation_rate: '65 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-BLR-01',
          priority: 'HIGH',
          target_asset: 'ORR Ecospace Underpass Sump',
          action: 'Deploy mobile diesel dewatering pump unit',
          equipment: '1500-GPM Mobile Sump Trailer #02',
          eta_minutes: '6 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Outer Ring Road (Bellandur to Marathahalli)',
          instruction: 'Speed restriction 30 km/h; avoid underpasses',
          status: 'ACTIVE_MONITORING'
        }
      ],
      citizen_broadcast: {
        alert_level: 'AMBER_ALERT',
        sms_english: 'CIVICOS BENGALURU WARNING: Heavy rainfall in Mahadevapura. Waterlogging on Outer Ring Road near Ecospace. Plan alternate routes. BBMP Helpline: 1533.',
        sms_telugu: 'ಬೆಂಗಳೂರು ಎಚ್ಚರಿಕೆ: ಮಹದೇವಪುರದಲ್ಲಿ ಭಾರಿ ಮಳೆ. ಹೊರವರ್ತುಲ ರಸ್ತೆ ಇಕೋಸ್ಪೇಸ್ ಬಳಿ ನೀರು ನಿಂತಿದೆ. ಪರ್ಯಾಯ ಮಾರ್ಗ ಬಳಸಿ. ಸಹಾಯವಾಣಿ: 1533.',
        whatsapp_card: '⚠️ *CIVICOS BENGALURU FLOOD ALERT*\n\n📍 Sector: ORR Bellandur & Ecospace\n🌊 Inundation Depth: 0.45m rising\n📞 BBMP Helpline: 1533 / 112',
        target_subscribers: 30000,
        geofence_radius_km: 4.5
      },
      telemetry_insights: 'Ecospace sensor reading 2.65m depth (+2.15m in 30 minutes).',
      processing_time_ms: 225
    },
    2: {
      scenario_step: 2,
      status: 'SAR_SATELLITE_EMERGENCY',
      executive_summary: 'CRITICAL FLOOD EMERGENCY: Bellandur Rajakaluve overflowed. ORR Ecospace underpass submerged (1.2m depth). Kadubeesanahalli substation flooded. Sakra World Hospital ORR route severed. Emergency traffic diverted via Wind Tunnel Road to Manipal Hospital.',
      risk_assessment: {
        ward_14_risk_index: 97,
        threat_category: 'DISASTER_CASCADING_CRITICAL',
        precipitation_rate: '120 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-BLR-02',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'ORR Ecospace Underpass',
          action: 'Deploy 2500-GPM mobile dewatering unit and coordinate tractor rescue flotilla',
          equipment: '2500-GPM High-Pressure Dewatering Unit & 6 Farm Tractors',
          eta_minutes: '5 min'
        },
        {
          order_id: 'WO-BLR-03',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'KPTCL 66kV Kadubeesanahalli Substation',
          action: 'Erect portable flood barricades and pump out transformer yard',
          equipment: 'Submersible Mud Pump Rig #04',
          eta_minutes: '8 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Outer Ring Road (Bellandur Underpass)',
          instruction: 'TOTAL CLOSURE: Submerged 1.2m. Divert all traffic via Wind Tunnel & Old Airport Road',
          status: 'ROAD_SEVERED'
        },
        {
          corridor: 'Wind Tunnel Road / Old Airport Road',
          instruction: 'GREEN CORRIDOR ACTIVE: Direct trauma priority to Sakra North Gate & Manipal Hospital',
          status: 'GREEN_CORRIDOR_ACTIVE'
        }
      ],
      citizen_broadcast: {
        alert_level: 'RED_EMERGENCY',
        sms_english: 'CRITICAL FLOOD DISASTER ALERT: ORR Bellandur & Ecospace completely submerged under 1.2m water. DO NOT attempt to cross ORR. Sakra hospital access via Wind Tunnel Road north gate. BBMP Control: 1533 / 080 2266 0000.',
        sms_telugu: 'ತುರ್ತು ಪ್ರವಾಹ ವಿಪತ್ತು ಎಚ್ಚರಿಕೆ: ಹೊರವರ್ತುಲ ರಸ್ತೆ ಬೆಳ್ಳಂದೂರು ಮತ್ತು ಇಕೋಸ್ಪೇಸ್ ಅಂಡರ್‌ಪಾಸ್ 1.2 ಮೀಟರ್ ನೀರಿನಲ್ಲಿ ಮುಳುಗಿದೆ. ಸಂಚಾರ ಸ್ಥಗಿತಗೊಂಡಿದೆ. ವಿಂಡ್ ಟನೆಲ್ ರಸ್ತೆ ಬಳಸಿ. ನಿಯಂತ್ರಣ ಕೊಠಡಿ: 1533 / 112.',
        whatsapp_card: '🚨 *CIVICOS CRITICAL FLOOD ALERT - BENGALURU*\n\n📍 Sector: ORR Bellandur / Ecospace / Mahadevapura\n⛔ Outer Ring Road: SEVERED (1.2m Flood Depth)\n🏥 Emergency Medical: Divert via Wind Tunnel Rd -> Manipal Hospital\n📞 BBMP Disaster Cell: 1533 / 080 2266 0000',
        target_subscribers: 55000,
        geofence_radius_km: 6.8
      },
      telemetry_insights: 'Satellite SAR confirms 96 ha flood extent over Bellandur lake basin and ORR. Wind Tunnel Road elevated bypass 100% dry and traffic flowing.',
      processing_time_ms: 300
    }
  }
};
