import { RegionBundle } from '../../types';

export const kochiBundle: RegionBundle = {
  config: {
    id: 'kochi',
    name: 'Kochi & Ernakulam Metropolitan (Kerala)',
    state: 'Kerala',
    stateCode: 'KL',
    label: 'Kochi (KL)',
    center: [9.9816, 76.2999],
    zoom: 12.0,
    primaryBasin: 'Periyar River & Vembanad Estuary',
    worstWard: 'Aluva Riverine Ward & CIAL Perimeter',
    damDischarge: 'Idamalayar & Idukki: 6,800 Cusecs',
    rainfallTelemetry: 'Aluva Sluice: 168 mm / 24h',
    emergencyContact: '1077 (District Disaster Mgmt Authority Ernakulam)',
    step0Risk: 16,
    step1Risk: 75,
    step2Risk: 98,
    regionalLanguageLabel: 'മലയാളം (Malayalam)',
    regionalLanguageCode: 'ml'
  },
  zones: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'zone-koc-red-01',
        properties: {
          id: 'zone-koc-red-01',
          name: 'Aluva Periyar Riverine & Manappuram Flash Inundation Zone',
          zone_tier: 'RED',
          zone_label: 'Critical Fluvial Overflow / Submersion Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Aluva Manappuram', 'Aluva Water Treatment Plant Corridor', 'Kalamassery Lowlands', 'NH-544 Aluva Bridge Approach'],
          roads_accessible_pct: 10,
          drain_capacity_pct: 100,
          power_grid_status: 'KSEB_110KV_SUBSTATION_SUBMERGED',
          shelters_status: 'RAPID_EVACUATION_CAMP_ACTIVE',
          summary: 'Periyar river running 3.8m above flood danger mark. Aluva water treatment plant pump floor submerged.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.325, 10.090],
            [76.365, 10.095],
            [76.380, 10.125],
            [76.350, 10.135],
            [76.330, 10.115],
            [76.325, 10.090]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-koc-red-02',
        properties: {
          id: 'zone-koc-red-02',
          name: 'Cochin International Airport (CIAL) Runway Perimeter Breach',
          zone_tier: 'RED',
          zone_label: 'Aviation & Drainage Breach Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['CIAL Runway Southern Embankment', 'Nedumbassery Canal', 'Chengamanad Fringe'],
          roads_accessible_pct: 15,
          drain_capacity_pct: 100,
          power_grid_status: 'AIRPORT_STANDBY_DG',
          shelters_status: 'RUNWAY_SHUTDOWN',
          summary: 'Diversion canal overtopped perimeter wall; runway apron inundated by 0.65m. Flight ops suspended.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.370, 10.145],
            [76.405, 10.148],
            [76.415, 10.168],
            [76.385, 10.170],
            [76.370, 10.145]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-koc-orange-01',
        properties: {
          id: 'zone-koc-orange-01',
          name: 'Marine Drive & Edappally Tidal Backwater Alert Zone',
          zone_tier: 'ORANGE',
          zone_label: 'Tidal Inundation Alert',
          color_hex: '#f59e0b',
          fill_color: '#fbbf24',
          fill_opacity: 0.25,
          stroke_color: '#d97706',
          stroke_width: 2.0,
          coverage_areas: ['Marine Drive Walkway', 'Edappally Toll Junction', 'Ernakulam High Court Jetty', 'MG Road Commercial'],
          roads_accessible_pct: 55,
          drain_capacity_pct: 82,
          power_grid_status: 'FEEDER_ISOLATED',
          shelters_status: 'STANDBY',
          summary: 'High tide in Vembanad Lake preventing Periyar discharge, creating backwater flooding in city core.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.265, 9.970],
            [76.295, 9.972],
            [76.315, 10.035],
            [76.280, 10.030],
            [76.265, 9.970]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-koc-blue-01',
        properties: {
          id: 'zone-koc-blue-01',
          name: 'Kakkanad Infopark & Thrikkakara Geological Ridge',
          zone_tier: 'BLUE',
          zone_label: 'Safe High Ground Haven',
          color_hex: '#3b82f6',
          fill_color: '#60a5fa',
          fill_opacity: 0.18,
          stroke_color: '#2563eb',
          stroke_width: 2.0,
          coverage_areas: ['Infopark Phase 1 & 2', 'Thrikkakara Municipal Plateau', 'Collectorate Camp'],
          roads_accessible_pct: 98,
          drain_capacity_pct: 28,
          power_grid_status: '100% OPERATIONAL',
          shelters_status: 'STATE_COMMAND_HQ',
          summary: 'Natural laterite hill ridge (+32m MSL). Serves as state emergency coordination base and trauma center.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.340, 10.005],
            [76.375, 10.008],
            [76.378, 10.035],
            [76.345, 10.032],
            [76.340, 10.005]
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
        id: 'koc-flood-step1',
        properties: {
          id: 'koc-flood-step1',
          scenario_step: 1,
          name: 'Periyar River Spillway Bank Influx - Step 1',
          satellite_source: 'Sentinel-1 Dual-Pol SAR',
          inundation_class: 'Active Fluvial Flood Pulse',
          mean_depth_m: 0.55,
          peak_depth_m: 0.95,
          confidence_score: 0.93,
          hazard_level: 'ALERT_HIGH',
          area_hectares: 48.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.335, 10.102],
            [76.360, 10.105],
            [76.370, 10.122],
            [76.348, 10.125],
            [76.335, 10.102]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'koc-flood-step2',
        properties: {
          id: 'koc-flood-step2',
          scenario_step: 2,
          name: 'Aluva - CIAL Catastrophic Inundation Extent',
          satellite_source: 'Dual-Pol SAR SAR-Interferometry',
          inundation_class: 'Catastrophic Riverine Inundation',
          mean_depth_m: 1.40,
          peak_depth_m: 2.10,
          confidence_score: 0.98,
          hazard_level: 'EMERGENCY_CRITICAL',
          area_hectares: 114.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [76.320, 10.088],
            [76.375, 10.092],
            [76.415, 10.155],
            [76.365, 10.165],
            [76.325, 10.118],
            [76.320, 10.088]
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
        id: 'koc-road-nh544',
        properties: {
          id: 'koc-road-nh544',
          name: 'NH-544 (Salem-Kochi Highway) Aluva Bridge Artery',
          type: 'National Highway Corridor',
          lanes: 4,
          speed_limit_kmh: 80,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-KOC-ALUVA-01',
          access_status: 'SEVERED',
          inundation_depth_m: 1.40,
          submerged_length_m: 1200,
          is_severed: true,
          critical_asset_access: 'Connects Cochin Airport and Northern Kerala to Ernakulam City',
          elevation_profile: 'Lowland River Crossing Causeway (+4m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [76.385, 10.150],
            [76.360, 10.120],
            [76.345, 10.105],
            [76.320, 10.065]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'koc-road-seaport-airport',
        properties: {
          id: 'koc-road-seaport-airport',
          name: 'Seaport-Airport Road & Kakkanad Elevated Bypass',
          type: 'Elevated Expressway Artery',
          lanes: 4,
          speed_limit_kmh: 60,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-KOC-KAKK-04',
          access_status: 'CLEAR',
          inundation_depth_m: 0.0,
          submerged_length_m: 0,
          is_severed: false,
          critical_asset_access: 'High-elevation corridor connecting Kakkanad to Ernakulam GH & Aster Medcity',
          elevation_profile: 'High Laterite Ridge (+28m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [76.355, 10.015],
            [76.335, 10.035],
            [76.310, 10.045],
            [76.275, 10.048]
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
        id: 'koc-fac-aster',
        properties: {
          id: 'koc-fac-aster',
          name: 'Aster Medcity Kochi',
          category: 'hospital',
          type_label: 'Quaternary Waterfront Medical City',
          ward: 'Cheranalloor Waterfront',
          capacity: '670 Beds (180 ICU)',
          icu_status: 'WATERBOUND ACCESS // WATER AMBULANCE CORRIDOR ENGAGED',
          flood_vulnerability: 'HIGH (Surrounded by Kadamakkudy backwaters)',
          contact: '+91 484 669 9999',
          elevation_m: 3.5,
          is_critical: true,
          access_status: 'BOAT_AMBULANCE_ONLY',
          inundation_depth_m: 0.65,
          risk_tier: 'ELEVATED_THREAT',
          action_required: 'Deploy motorized water ambulances and maintain diesel supply for generators'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.270, 10.045]
        }
      },
      {
        type: 'Feature',
        id: 'koc-fac-amrita',
        properties: {
          id: 'koc-fac-amrita',
          name: 'Amrita Institute of Medical Sciences (AIMS)',
          category: 'hospital',
          type_label: 'Apex State Trauma Hospital',
          ward: 'Edappally North',
          capacity: '1,350 Beds (310 ICU)',
          icu_status: 'FULLY OPERATIONAL // SAFE BACKUP',
          flood_vulnerability: 'LOW_MODERATE',
          contact: '+91 484 285 1234',
          elevation_m: 12.0,
          is_critical: true,
          access_status: 'OPERATIONAL',
          inundation_depth_m: 0.05,
          risk_tier: 'SAFE_HAVEN',
          action_required: 'Designated primary receiving hospital for Aluva evacuees'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.295, 10.032]
        }
      },
      {
        type: 'Feature',
        id: 'koc-fac-cial',
        properties: {
          id: 'koc-fac-cial',
          name: 'Cochin International Airport (CIAL)',
          category: 'metro',
          type_label: 'Solar-Powered International Aviation Hub',
          ward: 'Nedumbassery',
          daily_ridership: '30,000 Passengers',
          flood_vulnerability: 'EXTREME (Periyar surplus canal overflows into runway)',
          contact: '+91 484 261 0115',
          elevation_m: 5.2,
          is_critical: true,
          access_status: 'RUNWAY_SUBMERGED',
          inundation_depth_m: 0.65,
          risk_tier: 'CRITICAL_HAZARD',
          action_required: 'Flight operations suspended. Divert air traffic to Trivandrum and Kannur.'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.388, 10.152]
        }
      }
    ]
  },
  sectors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'koc-sec-aluva-water-plant',
        properties: {
          id: 'koc-sec-aluva-water-plant',
          name: 'Aluva Water Treatment Plant (KWA Headworks)',
          sector: 'utilities',
          sector_label: 'Lifelines & Drinking Water',
          sub_category: 'Primary Municipal Water Supply Plant',
          station_id: 'KWA-ALUVA-01',
          capacity_mld: 290,
          current_load_pct: 100,
          operating_status: 'SUBMERGED_PARALYZED',
          elevation_m: 4.2,
          action_required: 'Deploy NDRF high-volume dewatering pumps to clear pump floor; city drinking water at risk'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.350, 10.112]
        }
      },
      {
        type: 'Feature',
        id: 'koc-sec-kseb-aluva',
        properties: {
          id: 'koc-sec-kseb-aluva',
          name: 'KSEB Aluva 110kV Substation',
          sector: 'utilities',
          sector_label: 'Lifelines & Power Grid',
          sub_category: '110kV Transmission Substation',
          substation_id: 'KSEB-ALU-110',
          voltage_kv: 110,
          status: 'TRIPPED_FLOOD_SAFETY',
          grid_load_pct: 0,
          dependent_subscribers: 195000,
          elevation_m: 5.0,
          action_required: 'Feeders isolated to prevent electrocution; restore via Kalamassery 220kV loop'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.345, 10.108]
        }
      },
      {
        type: 'Feature',
        id: 'koc-sec-navy-southend',
        properties: {
          id: 'koc-sec-navy-southend',
          name: 'Southern Naval Command Disaster Relief Post (INS Sanjivani)',
          sector: 'emergency_services',
          sector_label: 'Emergency Response & Federal Rescue',
          sub_category: 'Naval Amphibious Operations Unit',
          available_appliances: 18,
          route_accessibility: '100% AMPHIBIOUS_ACTIVE',
          assigned_patrols: 60,
          elevation_m: 6.0,
          action_required: 'Mobilize 12 Gemini boats and Chetak SAR helicopters to Aluva Manappuram'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.275, 9.945]
        }
      },
      {
        type: 'Feature',
        id: 'koc-sec-kuttanad-shelter',
        properties: {
          id: 'koc-sec-kuttanad-shelter',
          name: 'U.C. College Aluva Flood Relief Camp',
          sector: 'vulnerable_populations',
          sector_label: 'Sensitive Populations & Relief',
          sub_category: 'Primary Evacuation Center',
          shelter_id: 'SHELTER-ALU-UC',
          bed_capacity: 2500,
          current_occupancy: 1920,
          evacuation_priority: 'CRITICAL',
          elevation_m: 9.5,
          action_required: 'Supply water purification tablets and high-protein ready-to-eat rations'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.335, 10.125]
        }
      },
      {
        type: 'Feature',
        id: 'koc-sec-aluva-bridge-choke',
        properties: {
          id: 'koc-sec-aluva-bridge-choke',
          name: 'NH-544 Aluva Railway Overbridge Bottleneck',
          sector: 'transport_bottlenecks',
          sector_label: 'Transport Bottlenecks & Chokes',
          sub_category: 'Highway Choke Point',
          choke_id: 'CHOKE-ALUVA-ROB',
          clearance_height_m: 4.2,
          passable_lanes: 0,
          depth_m: 1.40,
          elevation_m: 4.1,
          action_required: 'Complete highway cordon; divert north-bound cargo through Seaport-Airport Road'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.355, 10.115]
        }
      }
    ]
  },
  sensors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'koc-sens-periyar-aluva',
        properties: {
          id: 'koc-sens-periyar-aluva',
          code: 'DRAIN-KOC-PER-01',
          name: 'Periyar River Aluva Manappuram Flood Gauge',
          ward: 'Aluva Municipality',
          sensor_type: 'Radar River Stage Hydro-Gauge',
          max_capacity_m: 5.0,
          step0: { depth_m: 1.10, level_pct: 22, status: 'NORMAL', flow_rate_lps: 1800 },
          step1: { depth_m: 3.60, level_pct: 72, status: 'WARNING', flow_rate_lps: 12500 },
          step2: { depth_m: 5.45, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 34000 },
          recommended_pump_gpm: 3500,
          depth_m: 1.10,
          level_pct: 22,
          status: 'NORMAL',
          flow_rate_lps: 1800
        },
        geometry: {
          type: 'Point',
          coordinates: [76.352, 10.110]
        }
      },
      {
        type: 'Feature',
        id: 'koc-sens-cial-canal',
        properties: {
          id: 'koc-sens-cial-canal',
          code: 'DRAIN-KOC-CIAL-02',
          name: 'CIAL Diversion Canal Runway Sluice Sensor',
          ward: 'Nedumbassery CIAL',
          sensor_type: 'Hydrostatic Pressure Transducer',
          max_capacity_m: 3.5,
          step0: { depth_m: 0.50, level_pct: 14, status: 'NORMAL', flow_rate_lps: 310 },
          step1: { depth_m: 2.70, level_pct: 77, status: 'WARNING', flow_rate_lps: 2800 },
          step2: { depth_m: 3.85, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 7200 },
          recommended_pump_gpm: 2500,
          depth_m: 0.50,
          level_pct: 14,
          status: 'NORMAL',
          flow_rate_lps: 310
        },
        geometry: {
          type: 'Point',
          coordinates: [76.382, 10.150]
        }
      }
    ]
  },
  detour_routes: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'route-koc-obstructed',
        properties: {
          id: 'route-koc-obstructed',
          name: 'Primary Arterial (NH-544 Aluva Bridge Corridor)',
          status: 'SUBMERGED_PERIYAR_SURGE',
          is_active_corridor: true,
          route_type: 'OBSTRUCTED_DIRECT',
          color_code: '#94a3b8',
          dash_array: 'none',
          water_hazard_depth_m: 1.40,
          eta_minutes: 'Blocked (Impassable)',
          distance_km: 7.2,
          notes: 'Aluva bridge approaches submerged under 1.4m rushing Periyar waters. Road traffic completely halted.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [76.385, 10.150],
            [76.365, 10.120],
            [76.350, 10.110],
            [76.335, 10.080],
            [76.295, 10.032]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'route-koc-safe-detour',
        properties: {
          id: 'route-koc-safe-detour',
          name: 'CivicOS Safe Detour (Seaport-Airport Ridge to Aster Medcity / Ernakulam GH)',
          status: 'RECOMMENDED_SAFE',
          is_active_corridor: false,
          route_type: 'SAFE_DETOUR',
          color_code: '#10b981',
          dash_array: 'none',
          water_hazard_depth_m: 0.0,
          eta_minutes: '18 min (+8 min detour)',
          distance_km: 11.5,
          elevation_advantage: '+28 meters above Periyar floodplain',
          waypoints: [
            'Nedumbassery East Bypass',
            'Mattoor Elevated Ridge',
            'Kakkanad Civil Station Corridor',
            'Seaport-Airport Highway',
            'Kalamassery High Ramp',
            'Amrita / Aster Emergency Entrance'
          ],
          notes: '100% free of flooding. Coordinated by Kerala Police & Southern Naval Command convoy.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [76.395, 10.155],
            [76.380, 10.100],
            [76.360, 10.035],
            [76.335, 10.035],
            [76.295, 10.032],
            [76.270, 10.045]
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
        id: 'cit-koc-01',
        properties: {
          id: 'cit-koc-01',
          scenario_step: 1,
          caller_name: 'George Varghese',
          phone_masked: '+91 9447X XXX22',
          location_desc: 'Aluva Bank Road near KWA Plant',
          category: 'Potable Water Inundation Threat',
          water_depth_est: '0.9m',
          urgency: 'CRITICAL',
          status: 'PENDING_PUMP',
          timestamp_relative: '8 min ago',
          notes: 'Periyar river water flowing into pump house transformers. Water supply for 1 million people at risk.'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.348, 10.111]
        }
      },
      {
        type: 'Feature',
        id: 'cit-koc-02',
        properties: {
          id: 'cit-koc-02',
          scenario_step: 2,
          caller_name: 'Subair K. M.',
          phone_masked: '+91 9895X XXX89',
          location_desc: 'Nedumbassery CIAL South Gate',
          category: 'Airport Stranded Travellers',
          water_depth_est: '0.7m',
          urgency: 'HIGH',
          status: 'DISPATCHED',
          timestamp_relative: '15 min ago',
          notes: 'Canal breached boundary wall. 40 vehicles stuck at cargo gate. Requesting KSRTC high-clearance buses.'
        },
        geometry: {
          type: 'Point',
          coordinates: [76.382, 10.148]
        }
      }
    ]
  },
  cascading_chains: {
    0: {
      is_active: false,
      status_label: 'NORMAL_WATCH',
      trigger_node: 'Periyar Hydro Telemetry Nominal',
      chain_nodes: [
        {
          id: 'koc-node-0-1',
          title: 'Dam Discharge',
          icon: 'droplets',
          status: 'NORMAL',
          desc: 'Idamalayar & Bhoothathankettu dams discharging normal base flow; river stage at 1.1m.',
          impact_level: 'LOW',
          time_relative: 'T+00'
        }
      ],
      automated_recommendations: ['Maintain regular hourly gauge readings across Periyar hydro stations.']
    },
    1: {
      is_active: true,
      status_label: 'WARNING_SPIKE',
      trigger_node: 'Periyar Catchment Cloudburst (78mm / 3h)',
      chain_nodes: [
        {
          id: 'koc-node-1-1',
          title: 'Inflow Influx',
          icon: 'rain',
          status: 'WARNING',
          desc: 'Periyar river stage increases to 3.6m; Aluva Manappuram submerged under 0.6m.',
          impact_level: 'HIGH',
          time_relative: 'T+30 min'
        }
      ],
      automated_recommendations: ['Pre-position Kerala Fire & Rescue inflatable boats along Aluva river banks.']
    },
    2: {
      is_active: true,
      status_label: 'CASCADING_DISASTER_ACTIVE',
      trigger_node: 'Periyar River Inflow Surge ➔ Aluva Water Plant Submerged',
      chain_nodes: [
        {
          id: 'koc-node-2-1',
          title: 'Periyar River Inflow Surge',
          icon: 'rain',
          status: 'CRITICAL',
          desc: 'Periyar river surges to 5.45m depth with 34,000 L/s flow rate following dam spillway discharge.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+38 min',
          action: 'Issue Level-3 Red Flood Warning for Ernakulam',
          asset_target: 'Aluva Flood Gauge'
        },
        {
          id: 'koc-node-2-2',
          title: 'Aluva Water Plant Submerged',
          icon: 'droplets',
          status: 'PARALYZED',
          desc: 'Aluva KWA Water Treatment Plant intake motors inundated; citywide potable water grid paralyzed.',
          impact_level: 'CRITICAL',
          time_relative: 'T+44 min',
          action: 'Deploy Naval Dewatering Unit & Water Tanker Fleet',
          asset_target: 'Aluva Water Treatment Plant'
        },
        {
          id: 'koc-node-2-3',
          title: 'CIAL Runway Canal Breach',
          icon: 'traffic',
          status: 'RUNWAY_SHUT',
          desc: 'Diversion canal overtopped perimeter wall; CIAL runway flooded (0.65m); flight ops grounded.',
          impact_level: 'HIGH',
          time_relative: 'T+49 min',
          action: 'Divert Inbound Flights to Trivandrum Airport',
          asset_target: 'Cochin International Airport'
        },
        {
          id: 'koc-node-2-4',
          title: 'NH-544 Highway Severed',
          icon: 'ambulance',
          status: 'SEVERED',
          desc: 'NH-544 Aluva bridge approaches flooded under 1.4m water; northern road link completely severed.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+53 min',
          action: 'Engage Seaport-Airport Elevated Corridor via Kakkanad',
          asset_target: 'NH-544 Aluva Bridge'
        },
        {
          id: 'koc-node-2-5',
          title: 'Water Ambulance & Ridge Detour',
          icon: 'power',
          status: 'SAFE_DETOUR',
          desc: 'Amphibious boat rescue active along NH-544; Aster Medcity water ambulance corridor operational.',
          impact_level: 'MITIGATED',
          time_relative: 'T+58 min',
          action: 'Escort Critical Trauma to Amrita & Ernakulam GH',
          asset_target: 'Seaport-Airport Ridge'
        }
      ],
      automated_recommendations: [
        'Deploy heavy dewatering pumps to Aluva Water Treatment Plant to protect city drinking water supply.',
        'Mobilize Southern Naval Command Gemini boat teams for citizen extrication in Aluva lowlands.',
        'Reroute all trauma patients via Kakkanad Seaport-Airport high ground to Amrita Institute.'
      ]
    }
  },
  ai_plans: {
    0: {
      scenario_step: 0,
      status: 'NORMAL_WATCH',
      executive_summary: 'Kochi Metro: Periyar river flowing at baseline levels. CIAL airport operating normally. Aluva drinking water headworks 100% functional.',
      risk_assessment: {
        ward_14_risk_index: 16,
        threat_category: 'ROUTINE_MONITORING',
        precipitation_rate: '0 mm/hr'
      },
      dewatering_work_orders: [],
      traffic_dispatch_orders: [],
      citizen_broadcast: {
        alert_level: 'GREEN_ADVISORY',
        sms_english: 'KOCHI DISASTER ADVISORY: Normal weather conditions across Ernakulam district. Periyar river at safe levels. Helpline: 1077.',
        sms_telugu: 'കൊച്ചി ദുരന്ത നിവാരണ മുന്നറിയിപ്പ്: പെരിയാറിലെ ജലനിരപ്പ് സുരക്ഷിതമാണ്. എമർജൻസി ഹെൽപ്പ് ലൈൻ: 1077.',
        whatsapp_card: '🟢 *CIVICOS KOCHI DISASTER ADVISORY*\n\nStatus: NORMAL CONDITIONS\nPeriyar River: SAFE MARGIN\nHelpline: 1077 (Ernakulam DDMA)',
        target_subscribers: 0,
        geofence_radius_km: 1.0
      },
      telemetry_insights: 'Periyar river Aluva gauge at 1.10m. All hydraulic pumps operating at 60% standard load.',
      processing_time_ms: 110
    },
    1: {
      scenario_step: 1,
      status: 'CLOUDBURST_INFLUX',
      executive_summary: 'Catchment cloudburst in Western Ghats. Idamalayar discharge elevated. Aluva Manappuram submerged. Water depth reaching 0.55m on low riverbanks.',
      risk_assessment: {
        ward_14_risk_index: 75,
        threat_category: 'ELEVATED_WATCH',
        precipitation_rate: '70 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-KOC-01',
          priority: 'HIGH',
          target_asset: 'Aluva KWA Pump House Perimeter',
          action: 'Erect sandbag dykes and deploy diesel sump pumps',
          equipment: '1500-GPM Mobile Sump Trailer #01',
          eta_minutes: '6 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'NH-544 Aluva Bridge Approach',
          instruction: 'Speed restriction 30 km/h; police stationed at bridge base',
          status: 'ACTIVE_MONITORING'
        }
      ],
      citizen_broadcast: {
        alert_level: 'AMBER_ALERT',
        sms_english: 'CIVICOS KOCHI WARNING: Rapid water surge in Periyar River. Residents near Aluva Manappuram and riverbanks move to higher ground. Helpline: 1077.',
        sms_telugu: 'പെരിയാറിൽ ജലനിരപ്പ് ഉയരുന്നു. ആലുവ മണപ്പുറം പരിസരത്തുള്ളവർ ജാഗ്രത പാലിക്കുക. ദുരന്ത നിവാരണ കൺട്രോൾ റൂം: 1077.',
        whatsapp_card: '⚠️ *CIVICOS KOCHI FLOOD ALERT*\n\n📍 Sector: Aluva & Periyar Riverbanks\n🌊 Risk: River stage rising rapidly\n📞 Helpline: 1077 / 112',
        target_subscribers: 28000,
        geofence_radius_km: 5.0
      },
      telemetry_insights: 'Periyar Aluva hydro-gauge reads 3.60m. Flow velocity exceeds 12,500 L/s.',
      processing_time_ms: 220
    },
    2: {
      scenario_step: 2,
      status: 'SAR_SATELLITE_EMERGENCY',
      executive_summary: 'CATASTROPHIC FLOOD EMERGENCY: Periyar breaches Aluva banks. KWA drinking water plant flooded. CIAL runway closed. NH-544 severed under 1.4m water. Ambulances rerouted via Kakkanad Seaport-Airport high ground to Amrita Hospital.',
      risk_assessment: {
        ward_14_risk_index: 98,
        threat_category: 'DISASTER_CASCADING_CRITICAL',
        precipitation_rate: '115 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-KOC-02',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'Aluva Water Treatment Plant Intake Motors',
          action: 'Deploy Naval high-volume submersible dewatering pump unit',
          equipment: '3500-GPM Submersible Dewatering Pump Unit #01',
          eta_minutes: '5 min'
        },
        {
          order_id: 'WO-KOC-03',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'CIAL Runway Southern Sluice Gate',
          action: 'Clear flood diversion culvert with heavy hydraulic backhoe',
          equipment: 'Heavy Hydraulic Excavator & Mobile Sump Rig',
          eta_minutes: '7 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'NH-544 Aluva Bridge Corridor',
          instruction: 'TOTAL CLOSURE: Submerged 1.4m. Divert all emergency transit via Seaport-Airport Road',
          status: 'ROAD_SEVERED'
        },
        {
          corridor: 'Seaport-Airport Road via Kakkanad',
          instruction: 'GREEN CORRIDOR ACTIVE: Direct trauma priority to Amrita & Ernakulam General Hospital',
          status: 'GREEN_CORRIDOR_ACTIVE'
        }
      ],
      citizen_broadcast: {
        alert_level: 'RED_EMERGENCY',
        sms_english: 'EMERGENCY FLOOD DISASTER ALERT: Periyar River in full spate. NH-544 Aluva Bridge impassable. CIAL Airport closed. DO NOT enter Aluva bridge. Evacuate to U.C. College Relief Camp. Emergency: 1077 / 112.',
        sms_telugu: 'അതിതീവ്ര പ്രളയ മുന്നറിയിപ്പ്: പെരിയാർ കരകവിഞ്ഞൊഴുകുന്നു. ആലുവ പാലം വഴിയുള്ള ഗതാഗതം പൂർണ്ണമായും തടസ്സപ്പെട്ടു. കാക്കനാട് വഴി യാത്ര തിരിച്ചുവിടുക. അടിയന്തര സഹായത്തിന്: 1077.',
        whatsapp_card: '🚨 *CIVICOS CATASTROPHIC FLOOD ALERT - KOCHI*\n\n📍 Sector: Aluva / Nedumbassery / Kalamassery\n⛔ NH-544 Aluva Bridge: SEVERED (1.4m Water)\n✈️ CIAL Airport: FLIGHT OPS SUSPENDED\n🏥 Emergency Route: Seaport-Airport Road -> Amrita Institute\n📞 Control Room: 1077 / 0484 2423513',
        target_subscribers: 62000,
        geofence_radius_km: 7.5
      },
      telemetry_insights: 'Dual-Pol SAR confirms 114 ha flood inundation zone along Periyar river and CIAL perimeter. Seaport-Airport ridge 100% dry and operational.',
      processing_time_ms: 290
    }
  }
};
