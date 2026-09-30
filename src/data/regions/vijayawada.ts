import { RegionBundle } from '../../types';

export const vijayawadaBundle: RegionBundle = {
  config: {
    id: 'vijayawada',
    name: 'Vijayawada Metropolitan & Krishna Basin (AP)',
    state: 'Andhra Pradesh',
    stateCode: 'AP',
    label: 'Vijayawada (AP)',
    center: [16.5062, 80.6480],
    zoom: 12.5,
    primaryBasin: 'Krishna River & Budameru Rivulet Basin',
    worstWard: 'Ward 42 (Ajit Singh Nagar & Payakapuram)',
    damDischarge: 'Prakasam Barrage: 3.88 Lakh Cusecs',
    rainfallTelemetry: 'Budameru Inflow: 185 mm / 24h',
    emergencyContact: '1070 / 0866 2575888 (AP SDMA)',
    step0Risk: 12,
    step1Risk: 78,
    step2Risk: 99,
    regionalLanguageLabel: 'తెలుగు (Telugu)',
    regionalLanguageCode: 'te'
  },
  zones: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'zone-vja-red-01',
        properties: {
          id: 'zone-vja-red-01',
          name: 'Ajit Singh Nagar & Payakapuram Budameru Flash Breach Zone',
          zone_tier: 'RED',
          zone_label: 'Critical Inundation / Flash Breach Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.38,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Ajit Singh Nagar Flyover Base', 'Payakapuram', 'Budameru Bund Breach Site', 'Kandrika'],
          roads_accessible_pct: 8,
          drain_capacity_pct: 100,
          power_grid_status: 'AP_TRANSCO_SUBSTATION_SUBMERGED',
          shelters_status: 'AIR_DROPPING_AND_BOAT_RESCUE',
          summary: 'Budameru rivulet breached at 3 locations. 35,000 cusecs engulfing northern colonies under 1.6m water.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.625, 16.535],
            [80.665, 16.538],
            [80.672, 16.565],
            [80.630, 16.562],
            [80.625, 16.535]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-vja-red-02',
        properties: {
          id: 'zone-vja-red-02',
          name: 'Krishna Lanka Riparian Floodplain Breach Zone',
          zone_tier: 'RED',
          zone_label: 'Riverine Flash Inundation Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Krishna Lanka Ghats', 'Ranigari Thota', 'Prakasam Barrage Downstream Bank'],
          roads_accessible_pct: 15,
          drain_capacity_pct: 100,
          power_grid_status: 'SUBMERGED_ISOLATED',
          shelters_status: 'EVACUATION_CAMP_ACTIVE',
          summary: 'Prakasam Barrage discharging 3.88 lakh cusecs into Krishna river. Low-lying riverbank houses flooded.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.612, 16.495],
            [80.648, 16.498],
            [80.655, 16.512],
            [80.620, 16.510],
            [80.612, 16.495]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-vja-orange-01',
        properties: {
          id: 'zone-vja-orange-01',
          name: 'Benz Circle & MG Road Commercial Warning Corridor',
          zone_tier: 'ORANGE',
          zone_label: 'Waterlogging & Diversion Zone',
          color_hex: '#f59e0b',
          fill_color: '#fbbf24',
          fill_opacity: 0.25,
          stroke_color: '#d97706',
          stroke_width: 2.0,
          coverage_areas: ['Benz Circle', 'Bandar Road', 'MG Road Commercial Strip', 'Vidyadharapuram'],
          roads_accessible_pct: 62,
          drain_capacity_pct: 80,
          power_grid_status: 'PARTIAL_FEEDERS_LIVE',
          shelters_status: 'STANDBY',
          summary: 'Bandar canal overflow causing 0.35m street waterlogging. Elevated flyovers fully functional.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.638, 16.495],
            [80.665, 16.498],
            [80.668, 16.518],
            [80.635, 16.515],
            [80.638, 16.495]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-vja-blue-01',
        properties: {
          id: 'zone-vja-blue-01',
          name: 'Gunadala Hilltop & Indrakeeladri Geological Ridge',
          zone_tier: 'BLUE',
          zone_label: 'Safe High Ground Haven',
          color_hex: '#3b82f6',
          fill_color: '#60a5fa',
          fill_opacity: 0.18,
          stroke_color: '#2563eb',
          stroke_width: 2.0,
          coverage_areas: ['Gunadala Mary Matha Shrine Plateau', 'Indrakeeladri Temple Ridge', 'Prasadampadu High Ground'],
          roads_accessible_pct: 100,
          drain_capacity_pct: 20,
          power_grid_status: '100% SECURE_UNINTERRUPTED',
          shelters_status: 'STATE_DISASTER_BASE_ACTIVE',
          summary: 'Natural rocky ridgeline +45m above riverbed datum. Emergency chopper staging and medical relief hub.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.655, 16.520],
            [80.680, 16.522],
            [80.682, 16.545],
            [80.658, 16.542],
            [80.655, 16.520]
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
        id: 'vja-flood-step1',
        properties: {
          id: 'vja-flood-step1',
          scenario_step: 1,
          name: 'Budameru Rivulet Spilling - Step 1 Runoff',
          satellite_source: 'Sentinel-1 Dual-Pol SAR',
          inundation_class: 'Active Fluvial Flood Pulse',
          mean_depth_m: 0.65,
          peak_depth_m: 1.10,
          confidence_score: 0.95,
          hazard_level: 'ALERT_HIGH',
          area_hectares: 58.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.630, 16.542],
            [80.660, 16.545],
            [80.665, 16.558],
            [80.635, 16.555],
            [80.630, 16.542]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'vja-flood-step2-catastrophic',
        properties: {
          id: 'vja-flood-step2-catastrophic',
          scenario_step: 2,
          name: 'Budameru 35,000 Cusecs Breach - Ajit Singh Nagar Inundation Extent',
          satellite_source: 'SAR-Interferometry & Cartosat Flood Mask',
          inundation_class: 'Flash Inundation Disaster Extent',
          mean_depth_m: 1.60,
          peak_depth_m: 2.45,
          confidence_score: 0.99,
          hazard_level: 'EMERGENCY_CRITICAL',
          area_hectares: 142.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.620, 16.530],
            [80.670, 16.532],
            [80.678, 16.570],
            [80.628, 16.568],
            [80.620, 16.530]
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
        id: 'vja-road-ajit-singh-bypass',
        properties: {
          id: 'vja-road-ajit-singh-bypass',
          name: 'Budameru Inner Bypass & Ajit Singh Nagar Main Corridor',
          type: 'Primary Urban Arterial',
          lanes: 4,
          speed_limit_kmh: 50,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-VJA-BUD-01',
          access_status: 'SEVERED',
          inundation_depth_m: 1.60,
          submerged_length_m: 1600,
          is_severed: true,
          critical_asset_access: 'Trauma access to Govt General Hospital (GGH) from northern colonies',
          elevation_profile: 'Depressed Floodplain Roadbed (+8m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.640, 16.560],
            [80.642, 16.545],
            [80.638, 16.530],
            [80.632, 16.518]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'vja-road-benz-circle-flyover',
        properties: {
          id: 'vja-road-benz-circle-flyover',
          name: 'Benz Circle Elevated Flyover Corridor (NH-16)',
          type: 'Grade-Separated Elevated Expressway',
          lanes: 6,
          speed_limit_kmh: 70,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-VJA-BENZ-02',
          access_status: 'CLEAR',
          inundation_depth_m: 0.0,
          submerged_length_m: 0,
          is_severed: false,
          critical_asset_access: 'High-speed elevated bypass direct to GGH Vijayawada Trauma Ward',
          elevation_profile: 'Elevated Flyover Ramp (+22m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.665, 16.535],
            [80.660, 16.515],
            [80.655, 16.502],
            [80.638, 16.512]
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
        id: 'vja-fac-ggh',
        properties: {
          id: 'vja-fac-ggh',
          name: 'Government General Hospital (GGH) Vijayawada',
          category: 'hospital',
          type_label: 'State Apex Trauma Care Hospital',
          ward: 'Ward 28 (Siddhartha Nagar)',
          capacity: '1,800 Beds (320 ICU)',
          icu_status: '100% OPERATIONAL // SAFE HARBOR',
          flood_vulnerability: 'LOW_MODERATE',
          contact: '+91 866 257 5888',
          elevation_m: 16.0,
          is_critical: true,
          access_status: 'OPERATIONAL',
          inundation_depth_m: 0.0,
          risk_tier: 'SAFE_HAVEN',
          action_required: 'Receiving boat and chopper evacuees from Ajit Singh Nagar'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.635, 16.512]
        }
      },
      {
        type: 'Feature',
        id: 'vja-fac-pnbs',
        properties: {
          id: 'vja-fac-pnbs',
          name: 'Pandit Nehru Bus Station (PNBS)',
          category: 'metro',
          type_label: 'Major Inter-State Bus Terminal',
          ward: 'Ward 32 (Krishna Lanka)',
          daily_ridership: '120,000 Passengers',
          flood_vulnerability: 'HIGH (Low-lying Krishna river bank)',
          contact: '+91 866 257 8888',
          elevation_m: 10.5,
          is_critical: true,
          access_status: 'RESTRICTED',
          inundation_depth_m: 0.45,
          risk_tier: 'HIGH_ALERT',
          action_required: 'Divert bus schedules to Gunadala and outer highway terminals'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.620, 16.505]
        }
      }
    ]
  },
  sectors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'vja-sec-prakasam-barrage',
        properties: {
          id: 'vja-sec-prakasam-barrage',
          name: 'Prakasam Barrage (70 Crest Gates Open - 3.88 Lakh Cusecs)',
          sector: 'utilities',
          sector_label: 'Lifelines & River Barrier',
          sub_category: 'Major River Barrage & Headworks',
          station_id: 'BARRAGE-PRAK-01',
          capacity_mld: 450000,
          current_load_pct: 98,
          operating_status: 'DISCHARGING_MAXIMUM_CAPACITY',
          elevation_m: 17.5,
          action_required: 'All 70 gates lifted to 12 feet; sirens sounded downstream along Krishna Lanka'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.605, 16.507]
        }
      },
      {
        type: 'Feature',
        id: 'vja-sec-ap-transco-bhavanipuram',
        properties: {
          id: 'vja-sec-ap-transco-bhavanipuram',
          name: 'AP Transco 220kV Bhavanipuram Substation',
          sector: 'utilities',
          sector_label: 'Lifelines & Power Grid',
          sub_category: 'Extra High Voltage Power Grid',
          substation_id: 'TRANSCO-VJA-220',
          voltage_kv: 220,
          status: 'TRIPPED_FLOOD_BREACH',
          grid_load_pct: 0,
          dependent_subscribers: 270000,
          elevation_m: 9.0,
          action_required: 'Substation yard submerged under 1.2m water; 270,000 consumers switched to Gunadala feeder'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.590, 16.520]
        }
      },
      {
        type: 'Feature',
        id: 'vja-sec-ndrf-mangalgiri',
        properties: {
          id: 'vja-sec-ndrf-mangalgiri',
          name: '10th NDRF Battalion Command Base (Mangalagiri / Vijayawada)',
          sector: 'emergency_services',
          sector_label: 'Emergency Response & Federal Rescue',
          sub_category: 'Specialist Disaster Response Battalion',
          available_appliances: 24,
          route_accessibility: '100% OPERATIONAL',
          assigned_patrols: 90,
          elevation_m: 22.0,
          action_required: 'Deployed 35 motorized rescue boats and 6 drone food delivery squads to Ajit Singh Nagar'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.575, 16.435]
        }
      },
      {
        type: 'Feature',
        id: 'vja-sec-ajit-singh-shelter',
        properties: {
          id: 'vja-sec-ajit-singh-shelter',
          name: 'Andhra Loyola College Mega Relief Camp',
          sector: 'vulnerable_populations',
          sector_label: 'Sensitive Populations & Relief',
          sub_category: 'Mega Evacuation Shelter',
          shelter_id: 'SHELTER-LOYOLA-01',
          bed_capacity: 4500,
          current_occupancy: 3850,
          evacuation_priority: 'EMERGENCY_CRITICAL',
          elevation_m: 18.0,
          action_required: 'Serve cooked meals, provide pediatric rehydration packs, and baby formula'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.650, 16.505]
        }
      },
      {
        type: 'Feature',
        id: 'vja-sec-budameru-choke',
        properties: {
          id: 'vja-sec-budameru-choke',
          name: 'Budameru Diversion Canal (BDC) Escape Sluice Choke',
          sector: 'transport_bottlenecks',
          sector_label: 'Transport Bottlenecks & Chokes',
          sub_category: 'Hydraulic Canal Choke Point',
          choke_id: 'CHOKE-BDC-01',
          clearance_height_m: 2.8,
          passable_lanes: 0,
          depth_m: 1.60,
          elevation_m: 11.2,
          action_required: 'Breach site reinforcement with geo-synthetic bags and sheet piles'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.635, 16.545]
        }
      }
    ]
  },
  sensors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'vja-sens-budameru-bund',
        properties: {
          id: 'vja-sens-budameru-bund',
          code: 'DRAIN-VJA-BUD-01',
          name: 'Budameru Rivulet Velocity & Crest Gauge',
          ward: 'Ward 42 (Ajit Singh Nagar)',
          sensor_type: 'Acoustic Doppler Current Profiler (ADCP)',
          max_capacity_m: 4.8,
          step0: { depth_m: 0.90, level_pct: 18, status: 'NORMAL', flow_rate_lps: 950 },
          step1: { depth_m: 3.40, level_pct: 70, status: 'WARNING', flow_rate_lps: 11200 },
          step2: { depth_m: 5.20, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 35000 },
          recommended_pump_gpm: 4000,
          depth_m: 0.90,
          level_pct: 18,
          status: 'NORMAL',
          flow_rate_lps: 950
        },
        geometry: {
          type: 'Point',
          coordinates: [80.638, 16.548]
        }
      },
      {
        type: 'Feature',
        id: 'vja-sens-prakasam-stage',
        properties: {
          id: 'vja-sens-prakasam-stage',
          code: 'DRAIN-VJA-PRAK-02',
          name: 'Prakasam Barrage Upstream Water Stage Gauge',
          ward: 'Prakasam Barrage Head',
          sensor_type: 'Radar River Stage Hydro-Gauge',
          max_capacity_m: 6.0,
          step0: { depth_m: 2.10, level_pct: 35, status: 'NORMAL', flow_rate_lps: 45000 },
          step1: { depth_m: 4.50, level_pct: 75, status: 'WARNING', flow_rate_lps: 180000 },
          step2: { depth_m: 5.95, level_pct: 99, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 388000 },
          recommended_pump_gpm: 0,
          depth_m: 2.10,
          level_pct: 35,
          status: 'NORMAL',
          flow_rate_lps: 45000
        },
        geometry: {
          type: 'Point',
          coordinates: [80.608, 16.505]
        }
      }
    ]
  },
  detour_routes: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'route-vja-obstructed',
        properties: {
          id: 'route-vja-obstructed',
          name: 'Primary Arterial (Budameru Inner Bypass via Ajit Singh Nagar)',
          status: 'SUBMERGED_BREACH_CORRIDOR',
          is_active_corridor: true,
          route_type: 'OBSTRUCTED_DIRECT',
          color_code: '#94a3b8',
          dash_array: 'none',
          water_hazard_depth_m: 1.60,
          eta_minutes: 'Blocked (Impassable)',
          distance_km: 5.6,
          notes: 'Budameru flash flood waters surging at 1.6m depth. Direct transit completely impassable.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.640, 16.560],
            [80.642, 16.545],
            [80.638, 16.530],
            [80.635, 16.512]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'route-vja-safe-detour',
        properties: {
          id: 'route-vja-safe-detour',
          name: 'CivicOS Safe Detour (Benz Circle Elevated Flyover Corridor to GGH)',
          status: 'RECOMMENDED_SAFE',
          is_active_corridor: false,
          route_type: 'SAFE_DETOUR',
          color_code: '#10b981',
          dash_array: 'none',
          water_hazard_depth_m: 0.0,
          eta_minutes: '12 min (+5 min detour)',
          distance_km: 6.8,
          elevation_advantage: '+22 meters above floodplain',
          waypoints: [
            'Ramavarappadu Ring High Ground',
            'NH-16 Elevated Expressway',
            'Benz Circle Elevated Flyover',
            'Bandar Road Elevated Spur',
            'Govt General Hospital (GGH) Trauma Gate'
          ],
          notes: '100% free of flooding. Green corridor secured by AP Traffic Police and NDRF convoys.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.665, 16.545],
            [80.662, 16.525],
            [80.655, 16.502],
            [80.638, 16.512]
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
        id: 'cit-vja-01',
        properties: {
          id: 'cit-vja-01',
          scenario_step: 1,
          caller_name: 'Venkateswara Rao',
          phone_masked: '+91 9848X XXX33',
          location_desc: 'Ajit Singh Nagar Pipe Line Road',
          category: 'Breach Surge Inundation',
          water_depth_est: '1.4m',
          urgency: 'CRITICAL',
          status: 'PENDING_PUMP',
          timestamp_relative: '5 min ago',
          notes: 'Budameru canal bund collapsed near Kandrika. Water gushed into 800 houses in 20 minutes.'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.642, 16.552]
        }
      },
      {
        type: 'Feature',
        id: 'cit-vja-02',
        properties: {
          id: 'cit-vja-02',
          scenario_step: 2,
          caller_name: 'Lakshmi Prasanna',
          phone_masked: '+91 9963X XXX71',
          location_desc: 'Payakapuram Housing Board Colony',
          category: 'Rooftop Stranded Family',
          water_depth_est: '1.8m',
          urgency: 'CRITICAL',
          status: 'DISPATCHED',
          timestamp_relative: '10 min ago',
          notes: 'Ground floor submerged completely. 6 adults and 2 infants trapped on terrace. NDRF boat requested.'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.655, 16.562]
        }
      }
    ]
  },
  cascading_chains: {
    0: {
      is_active: false,
      status_label: 'NORMAL_WATCH',
      trigger_node: 'Krishna & Budameru Hydraulics Normal',
      chain_nodes: [
        {
          id: 'vja-node-0-1',
          title: 'Barrage Gate Stage',
          icon: 'droplets',
          status: 'NORMAL',
          desc: 'Prakasam Barrage discharging normal 45,000 cusecs; canals maintaining standard irrigation flow.',
          impact_level: 'LOW',
          time_relative: 'T+00'
        }
      ],
      automated_recommendations: ['Routine hydro-gauging across Budameru diversion weir.']
    },
    1: {
      is_active: true,
      status_label: 'WARNING_INFLOW',
      trigger_node: 'Catchment Cloudburst (Budameru Inflow Spikes)',
      chain_nodes: [
        {
          id: 'vja-node-1-1',
          title: 'Budameru Surge',
          icon: 'rain',
          status: 'WARNING',
          desc: 'Budameru diversion canal inflow reaches 11,200 cusecs; low-lying banks in Kandrika overtopped.',
          impact_level: 'HIGH',
          time_relative: 'T+30 min'
        }
      ],
      automated_recommendations: ['Deploy NDRF boat teams to Ajit Singh Nagar police station.']
    },
    2: {
      is_active: true,
      status_label: 'CASCADING_DISASTER_ACTIVE',
      trigger_node: 'Budameru Rivulet Breaches Bund ➔ 35,000 cusecs Engulfs Ajit Singh Nagar',
      chain_nodes: [
        {
          id: 'vja-node-2-1',
          title: 'Budameru Bund Breach',
          icon: 'rain',
          status: 'CRITICAL',
          desc: 'Budameru rivulet breaches earthen bund in 3 locations; 35,000 cusecs flash floods northern Vijayawada.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+35 min',
          action: 'Issue Flash Flood Red Warning for Ward 42',
          asset_target: 'Budameru Bund Breach Site'
        },
        {
          id: 'vja-node-2-2',
          title: 'Ajit Singh Nagar Inundated',
          icon: 'droplets',
          status: 'ENGULFED',
          desc: 'Ajit Singh Nagar and Payakapuram submerged under 1.6m water; 200,000 citizens trapped on upper floors.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+40 min',
          action: 'Mobilize 35 NDRF Motorized Boats & Helicopter Food Dropping',
          asset_target: 'Ajit Singh Nagar Flyover Base'
        },
        {
          id: 'vja-node-2-3',
          title: 'AP Transco Substation Flooded',
          icon: 'power',
          status: 'TRIPPED',
          desc: 'AP Transco Bhavanipuram 220kV yard inundated; power isolated across 270,000 households for electrocution safety.',
          impact_level: 'CRITICAL',
          time_relative: 'T+45 min',
          action: 'Switch Critical Hospital Feeder to Gunadala Substation',
          asset_target: 'AP Transco Bhavanipuram Substation'
        },
        {
          id: 'vja-node-2-4',
          title: 'GGH Inner Bypass Blocked',
          icon: 'ambulance',
          status: 'ROAD_BLOCKED',
          desc: 'Budameru Inner Bypass completely severed under 1.6m floodwater; direct ambulance access to GGH cut off.',
          impact_level: 'CRITICAL',
          time_relative: 'T+50 min',
          action: 'Activate Benz Circle Flyover Elevated Green Corridor',
          asset_target: 'GGH Inner Bypass Corridor'
        },
        {
          id: 'vja-node-2-5',
          title: 'Safe Detour via Benz Circle',
          icon: 'traffic',
          status: 'SAFE_DETOUR',
          desc: 'All trauma and emergency ambulance convoys rerouted via Benz Circle elevated flyover safely to GGH.',
          impact_level: 'MITIGATED',
          time_relative: 'T+56 min',
          action: 'Station Police Escort at Benz Circle Ramp',
          asset_target: 'Benz Circle Elevated Expressway'
        }
      ],
      automated_recommendations: [
        'Coordinate federal NDRF boat rescue and Indian Air Force Mi-17 food drops over Ajit Singh Nagar.',
        'Divert all emergency trauma to Govt General Hospital (GGH) via the Benz Circle Elevated Flyover.',
        'Transmit cell broadcasts in Telugu and English to 64,000 citizens in northern Vijayawada.'
      ]
    }
  },
  ai_plans: {
    0: {
      scenario_step: 0,
      status: 'NORMAL_WATCH',
      executive_summary: 'Vijayawada Urban Sector: Krishna River flowing safely through Prakasam Barrage. Budameru diversion canal within standard capacity. City power grid operating normally.',
      risk_assessment: {
        ward_14_risk_index: 12,
        threat_category: 'ROUTINE_MONITORING',
        precipitation_rate: '0 mm/hr'
      },
      dewatering_work_orders: [],
      traffic_dispatch_orders: [],
      citizen_broadcast: {
        alert_level: 'GREEN_ADVISORY',
        sms_english: 'VIJAYAWADA DISASTER ADVISORY: Normal weather conditions. Prakasam Barrage and Budameru canals at safe levels. Emergency helpline: 1070.',
        sms_telugu: 'విజయవాడ విపత్తు నిర్వహణ హెచ్చరిక: కృష్ణా నది మరియు బుడమేరు కాలువలో నీటి ప్రవాహం సాధారణ స్థితిలో ఉంది. అత్యవసర సహాయానికి 1070 కు కాల్ చేయండి.',
        whatsapp_card: '🟢 *CIVICOS VIJAYAWADA FLOOD ADVISORY*\n\nStatus: NORMAL CONDITIONS\nPrakasam Barrage: 45,000 Cusecs\nHelpline: 1070 / 0866 2575888',
        target_subscribers: 0,
        geofence_radius_km: 1.0
      },
      telemetry_insights: 'Budameru crest gauge reads 0.90m. Flow velocity nominal.',
      processing_time_ms: 105
    },
    1: {
      scenario_step: 1,
      status: 'CLOUDBURST_INFLUX',
      executive_summary: 'Severe rainfall in upper catchment of Budameru. Inflow surging to 11,200 cusecs. Low-lying bunds in Kandrika showing overflow signs. Water depth rising on low roads.',
      risk_assessment: {
        ward_14_risk_index: 78,
        threat_category: 'ELEVATED_WATCH',
        precipitation_rate: '75 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-VJA-01',
          priority: 'HIGH',
          target_asset: 'Budameru Kandrika Bund',
          action: 'Deploy sandbag reinforcement team and mobile high-volume pumps',
          equipment: 'Heavy Earthmover & Sandbag Deployment Rig #01',
          eta_minutes: '6 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Budameru Inner Bypass',
          instruction: 'Speed restriction 20 km/h; police barricades deployed',
          status: 'ACTIVE_MONITORING'
        }
      ],
      citizen_broadcast: {
        alert_level: 'AMBER_ALERT',
        sms_english: 'CIVICOS VIJAYAWADA WARNING: Heavy inflow into Budameru Rivulet. Residents of Ajit Singh Nagar & Payakapuram maintain alert and move valuables to upper floors. Helpline: 1070.',
        sms_telugu: 'విజయవాడ హెచ్చరిక: బుడమేరు వాగులో భారీ వరద నీరు చేరుతోంది. అజిత్ సింగ్ నగర్, పాయకాపురం ప్రజలు అప్రమత్తంగా ఉండవలెను. సహాయానికి: 1070.',
        whatsapp_card: '⚠️ *CIVICOS VIJAYAWADA FLOOD ALERT*\n\n📍 Sector: Ajit Singh Nagar & Budameru Basin\n🌊 Inflow: 11,200 cusecs\n📞 Helpline: 1070 / 112',
        target_subscribers: 32000,
        geofence_radius_km: 4.8
      },
      telemetry_insights: 'Budameru velocity sensor spikes to 3.40m with 11,200 L/s flow rate.',
      processing_time_ms: 210
    },
    2: {
      scenario_step: 2,
      status: 'SAR_SATELLITE_EMERGENCY',
      executive_summary: 'CATASTROPHIC FLOOD EMERGENCY: Budameru breaches bund with 35,000 cusecs. Ajit Singh Nagar & Payakapuram engulfed under 1.6m water. AP Transco substation flooded. Inner Bypass severed. Trauma convoys rerouted via Benz Circle Elevated Flyover to GGH.',
      risk_assessment: {
        ward_14_risk_index: 99,
        threat_category: 'DISASTER_CASCADING_CRITICAL',
        precipitation_rate: '125 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-VJA-02',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'AP Transco 220kV Bhavanipuram Yard',
          action: 'Deploy high-volume dewatering pump and build temporary coffer dam around control room',
          equipment: '4000-GPM High-Capacity Submersible Pump Unit #03',
          eta_minutes: '5 min'
        },
        {
          order_id: 'WO-VJA-03',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'Ajit Singh Nagar Flyover Junction',
          action: 'Launch 25 motorized rescue boats and coordinate rooftop evacuation',
          equipment: 'NDRF Motorized Boat Flotilla & Drone Reconnaissance Unit',
          eta_minutes: '7 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Budameru Inner Bypass',
          instruction: 'TOTAL CLOSURE: Submerged 1.6m. Divert all emergency traffic to Benz Circle Flyover',
          status: 'ROAD_SEVERED'
        },
        {
          corridor: 'Benz Circle Elevated Flyover',
          instruction: 'GREEN CORRIDOR ACTIVE: Dedicated lane for trauma ambulances to Govt General Hospital (GGH)',
          status: 'GREEN_CORRIDOR_ACTIVE'
        }
      ],
      citizen_broadcast: {
        alert_level: 'RED_EMERGENCY',
        sms_english: 'CRITICAL FLOOD DISASTER ALERT: Budameru Rivulet breached bund at 35,000 cusecs. Ajit Singh Nagar and Payakapuram completely submerged. DO NOT enter floodwaters. Move to terrace. Benz Circle flyover active for hospital access. Control: 1070 / 0866 2575888.',
        sms_telugu: 'తీవ్ర వరద విపత్తు హెచ్చరిక: బుడమేరు గండి పడి 35,000 క్యూసెక్కుల నీరు అజిత్ సింగ్ నగర్, పాయకాపురం లోకి చేరింది. ఇళ్ల పైకప్పులపైకి చేరండి. ఆసుపత్రికి బెంజ్ సర్కిల్ ఫ్లైఓవర్ ఉపయోగించండి. కంట్రోల్ రూమ్: 1070 / 0866 2575888.',
        whatsapp_card: '🚨 *CIVICOS CATASTROPHIC FLOOD ALERT - VIJAYAWADA*\n\n📍 Sector: Ajit Singh Nagar / Payakapuram / Budameru\n⛔ Inner Bypass: SEVERED (1.6m Flood Depth)\n🏥 Emergency Route: Benz Circle Flyover -> GGH Vijayawada\n🌊 Prakasam Barrage: 3.88 Lakh Cusecs\n📞 AP SDMA Control: 1070 / 0866 2575888',
        target_subscribers: 64000,
        geofence_radius_km: 7.0
      },
      telemetry_insights: 'Cartosat-3 and Sentinel-1 SAR confirm 142 ha inundated in northern Vijayawada. Benz Circle elevated flyover 100% dry and clear.',
      processing_time_ms: 320
    }
  }
};
