import { RegionBundle } from '../../types';

export const chennaiBundle: RegionBundle = {
  config: {
    id: 'chennai',
    name: 'Chennai Metropolitan Area',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    label: 'Chennai (TN)',
    center: [13.0827, 80.2707],
    zoom: 12.0,
    primaryBasin: 'Adyar & Cooum River Basin',
    worstWard: 'Ward 179 (Velachery & Saidapet)',
    damDischarge: 'Chembarambakkam: 29,000 Cusecs',
    rainfallTelemetry: 'Adyar Sluice: 142 mm / 24h',
    emergencyContact: '1070 / 1913 (Greater Chennai Corp)',
    step0Risk: 14,
    step1Risk: 72,
    step2Risk: 96,
    regionalLanguageLabel: 'தமிழ் (Tamil)',
    regionalLanguageCode: 'ta'
  },
  zones: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'zone-chn-red-01',
        properties: {
          id: 'zone-chn-red-01',
          name: 'Adyar River Riparian & Saidapet Causeway Flood Corridor',
          zone_tier: 'RED',
          zone_label: 'Critical Inundation / Active Breach Zone',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Saidapet Causeway', 'MIOT Hospital Adyar Corridor', 'Jafferkhanpet', 'Kotturpuram Lowlands'],
          roads_accessible_pct: 12,
          drain_capacity_pct: 100,
          power_grid_status: 'SUBSTATIONS_TRIPPED_FLOOD_BREACH',
          shelters_status: 'ACTIVATED_RAPID_RELIEF',
          summary: 'Adyar river overflowing at 4.2m above datum. Saidapet causeway completely submerged under 1.4m rushing water.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.175, 13.010],
            [80.215, 13.012],
            [80.235, 13.016],
            [80.255, 13.013],
            [80.252, 13.025],
            [80.228, 13.028],
            [80.205, 13.022],
            [80.178, 13.020],
            [80.175, 13.010]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-chn-red-02',
        properties: {
          id: 'zone-chn-red-02',
          name: 'Velachery Lakebed & Pallikaranai Marsh Inundation Zone',
          zone_tier: 'RED',
          zone_label: 'Severe Submersion Risk',
          color_hex: '#ef4444',
          fill_color: '#f87171',
          fill_opacity: 0.35,
          stroke_color: '#dc2626',
          stroke_width: 2.5,
          coverage_areas: ['Velachery Main Road', 'Baby Nagar', 'Ram Nagar Marsh Fringe', 'Taramani Low Sump'],
          roads_accessible_pct: 18,
          drain_capacity_pct: 100,
          power_grid_status: 'TRANSFORMERS_SHUT_ISOLATED',
          shelters_status: 'ACTIVE_FULL',
          summary: 'Lake surplus water inundated residential complexes up to 1.1m. Boat evacuation deployed.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.208, 12.965],
            [80.235, 12.968],
            [80.245, 12.990],
            [80.222, 12.995],
            [80.205, 12.982],
            [80.208, 12.965]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-chn-orange-01',
        properties: {
          id: 'zone-chn-orange-01',
          name: 'T. Nagar Commercial & Mambalam Canal Flash Alert Zone',
          zone_tier: 'ORANGE',
          zone_label: 'Severe Waterlogging / Transit Warning',
          color_hex: '#f59e0b',
          fill_color: '#fbbf24',
          fill_opacity: 0.25,
          stroke_color: '#d97706',
          stroke_width: 2.0,
          coverage_areas: ['Ranganathan Street', 'Madley Subway', 'Doraiswamy Subway', 'Usman Road Flyover Base'],
          roads_accessible_pct: 54,
          drain_capacity_pct: 85,
          power_grid_status: 'ISOLATED_FEEDERS',
          shelters_status: 'STANDBY',
          summary: 'Mambalam canal backflow choking subways. Madley subway closed due to 0.75m accumulation.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.222, 13.030],
            [80.245, 13.032],
            [80.248, 13.048],
            [80.225, 13.046],
            [80.222, 13.030]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'zone-chn-blue-01',
        properties: {
          id: 'zone-chn-blue-01',
          name: 'Nungambakkam & Alwarpet High Ground Evacuation Haven',
          zone_tier: 'BLUE',
          zone_label: 'Safe High Ground Haven',
          color_hex: '#3b82f6',
          fill_color: '#60a5fa',
          fill_opacity: 0.18,
          stroke_color: '#2563eb',
          stroke_width: 2.0,
          coverage_areas: ['Nungambakkam High Road', 'Alwarpet TTK Road', 'St. Thomas Mount Ridge Top'],
          roads_accessible_pct: 95,
          drain_capacity_pct: 35,
          power_grid_status: 'UNINTERRUPTED',
          shelters_status: 'COMMAND_CENTER_OPERATIONAL',
          summary: 'Natural geological elevation +18m above coastal floodplain. Fully functional trauma routing point.'
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.235, 13.050],
            [80.260, 13.052],
            [80.262, 13.068],
            [80.238, 13.065],
            [80.235, 13.050]
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
        id: 'chn-flood-step1-adyar',
        properties: {
          id: 'chn-flood-step1-adyar',
          scenario_step: 1,
          name: 'Adyar River Basin Bank Overflow - Step 1 Influx',
          satellite_source: 'Sentinel-1 Dual-Pol SAR & Cartosat-3 Hydro Mask',
          inundation_class: 'Active Fluvial Flood Pulse',
          mean_depth_m: 0.45,
          peak_depth_m: 0.85,
          confidence_score: 0.94,
          hazard_level: 'ALERT_HIGH',
          area_hectares: 34.2
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.180, 13.013],
            [80.210, 13.014],
            [80.230, 13.018],
            [80.228, 13.023],
            [80.208, 13.019],
            [80.180, 13.017],
            [80.180, 13.013]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'chn-flood-step2-breach',
        properties: {
          id: 'chn-flood-step2-breach',
          scenario_step: 2,
          name: 'Chembarambakkam Surplus Surge & Saidapet Inundation Extent',
          satellite_source: 'Dual-Pol SAR Interferometric Water Mask',
          inundation_class: 'Disaster Level Submersion',
          mean_depth_m: 1.15,
          peak_depth_m: 1.75,
          confidence_score: 0.98,
          hazard_level: 'EMERGENCY_CRITICAL',
          area_hectares: 88.5
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.170, 13.008],
            [80.220, 13.010],
            [80.245, 13.015],
            [80.258, 13.012],
            [80.255, 13.028],
            [80.225, 13.032],
            [80.198, 13.025],
            [80.172, 13.022],
            [80.170, 13.008]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'chn-flood-step2-velachery',
        properties: {
          id: 'chn-flood-step2-velachery',
          scenario_step: 2,
          name: 'Velachery Lakebed Sheet Flooding - Step 2 Surge',
          satellite_source: 'Sentinel-1 Dual-Pol SAR',
          inundation_class: 'Urban Sheet Flood',
          mean_depth_m: 0.95,
          peak_depth_m: 1.40,
          confidence_score: 0.96,
          hazard_level: 'EMERGENCY_CRITICAL',
          area_hectares: 52.0
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.210, 12.970],
            [80.232, 12.972],
            [80.240, 12.988],
            [80.218, 12.992],
            [80.210, 12.970]
          ]]
        }
      },
      {
        type: 'Feature',
        id: 'chn-soda-building-cluster',
        properties: {
          id: 'chn-soda-building-cluster',
          scenario_step: 99,
          name: 'SODA-A Extracted Dense Building Cluster - Saidapet Commercial Strip',
          satellite_source: 'Hugging Face SODA-A Optical Multi-spectral Mask',
          inundation_class: 'Dense Structural Hazard Cluster',
          building_count: 142,
          hazard_level: 'STRUCTURAL_SURCHARGE',
          area_hectares: 12.4
        },
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [80.220, 13.016],
            [80.228, 13.017],
            [80.227, 13.022],
            [80.219, 13.021],
            [80.220, 13.016]
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
        id: 'chn-road-anna-salai',
        properties: {
          id: 'chn-road-anna-salai',
          name: 'Anna Salai / Mount Road Arterial',
          type: 'Primary Arterial Expressway',
          lanes: 6,
          speed_limit_kmh: 60,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-CHN-01A',
          access_status: 'CLEAR',
          inundation_depth_m: 0.05,
          submerged_length_m: 0,
          is_severed: false,
          critical_asset_access: 'Apollo Greams Road & Chennai Central',
          elevation_profile: 'Elevated Road Bed (+12m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.265, 13.078],
            [80.258, 13.065],
            [80.248, 13.050],
            [80.238, 13.035],
            [80.225, 13.020]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'chn-road-saidapet-causeway',
        properties: {
          id: 'chn-road-saidapet-causeway',
          name: 'Inner Ring Road / Saidapet Adyar Causeway',
          type: 'Low-Lying Causeway Artery',
          lanes: 4,
          speed_limit_kmh: 40,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-CHN-04C',
          access_status: 'SEVERED',
          inundation_depth_m: 1.15,
          submerged_length_m: 820,
          is_severed: true,
          critical_asset_access: 'Direct connection from Saidapet to Guindy & MIOT',
          elevation_profile: 'Lowland Floodplain Causeway (+3m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.235, 13.025],
            [80.225, 13.018],
            [80.215, 13.014],
            [80.200, 13.011]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'chn-road-kathipara-bypass',
        properties: {
          id: 'chn-road-kathipara-bypass',
          name: 'Kathipara Elevated Grade Separator Bypass',
          type: 'Multi-Level Flyover Expressway',
          lanes: 8,
          speed_limit_kmh: 70,
          is_primary_ambulance_route: true,
          drainage_culvert_id: 'CUL-CHN-KATHIPARA',
          access_status: 'CLEAR',
          inundation_depth_m: 0.0,
          submerged_length_m: 0,
          is_severed: false,
          critical_asset_access: 'High-speed green corridor to RGGGH & Apollo Greams',
          elevation_profile: 'Elevated Flyover Ramp (+18m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.190, 13.002],
            [80.205, 13.008],
            [80.218, 13.025],
            [80.238, 13.045],
            [80.258, 13.068]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'chn-road-velachery-main',
        properties: {
          id: 'chn-road-velachery-main',
          name: 'Velachery 100 Feet Bypass Road',
          type: 'Arterial Road',
          lanes: 4,
          speed_limit_kmh: 40,
          is_primary_ambulance_route: false,
          drainage_culvert_id: 'CUL-CHN-VEL-02',
          access_status: 'IMPEDED',
          inundation_depth_m: 0.65,
          submerged_length_m: 450,
          is_severed: false,
          critical_asset_access: 'Connects OMR to Guindy Metro',
          elevation_profile: 'Depressed Lakebed Fringe (+5m MSL)'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.215, 12.975],
            [80.222, 12.985],
            [80.226, 12.998],
            [80.222, 13.010]
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
        id: 'chn-fac-miot',
        properties: {
          id: 'chn-fac-miot',
          name: 'MIOT International Trauma Hospital',
          category: 'hospital',
          type_label: 'Apex Trauma Super-Specialty',
          ward: 'Manapakkam / Ward 156',
          capacity: '1,000 Beds (220 ICU)',
          icu_status: 'THREATENED_33KV_BASEMENT_RISK',
          flood_vulnerability: 'EXTREME (Adjacent to Adyar River Riverbed)',
          contact: '+91 44 4200 2288 / Emergency ext 108',
          elevation_m: 4.8,
          is_critical: true,
          access_status: 'CUTOFF',
          inundation_depth_m: 0.95,
          risk_tier: 'IMMEDIATE_DISASTER_RISK',
          action_required: 'Deploy 2000-GPM mobile dewatering pump & switch to rooftop emergency DG generator'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.188, 13.018]
        }
      },
      {
        type: 'Feature',
        id: 'chn-fac-rgggh',
        properties: {
          id: 'chn-fac-rgggh',
          name: 'Rajiv Gandhi Govt General Hospital (RGGGH)',
          category: 'hospital',
          type_label: 'Principal State Trauma Center',
          ward: 'Ward 58 (Central)',
          capacity: '3,200 Beds (450 ICU)',
          icu_status: '100% OPERATIONAL // SAFE HARBOR',
          flood_vulnerability: 'LOW (High Ground Defense)',
          contact: '+91 44 2530 5000',
          elevation_m: 14.5,
          is_critical: true,
          access_status: 'OPERATIONAL',
          inundation_depth_m: 0.0,
          risk_tier: 'SAFE_HAVEN',
          action_required: 'Receiving emergency trauma diverts from MIOT Hospital'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.278, 13.080]
        }
      },
      {
        type: 'Feature',
        id: 'chn-fac-apollo-greams',
        properties: {
          id: 'chn-fac-apollo-greams',
          name: 'Apollo Hospital Greams Road',
          category: 'hospital',
          type_label: 'Tertiary Quaternary Care Hospital',
          ward: 'Ward 111 (Thousand Lights)',
          capacity: '600 Beds (120 ICU)',
          icu_status: 'FULLY OPERATIONAL',
          flood_vulnerability: 'LOW_MODERATE',
          contact: '+91 44 2829 0200',
          elevation_m: 11.2,
          is_critical: true,
          access_status: 'ACCESSIBLE',
          inundation_depth_m: 0.05,
          risk_tier: 'GREEN_TIER',
          action_required: 'Maintain green corridor along Mount Road'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.252, 13.060]
        }
      },
      {
        type: 'Feature',
        id: 'chn-fac-metro-saidapet',
        properties: {
          id: 'chn-fac-metro-saidapet',
          name: 'Saidapet Metro Station (Blue Line Portal)',
          category: 'metro',
          type_label: 'Underground Metro Ingress Portal',
          ward: 'Ward 170 (Saidapet)',
          daily_ridership: '42,000 Passengers',
          flood_vulnerability: 'HIGH (Sump flooding risk at south entrance)',
          contact: '+91 44 2433 3333',
          elevation_m: 6.2,
          is_critical: true,
          access_status: 'RESTRICTED',
          inundation_depth_m: 0.40,
          risk_tier: 'ELEVATED',
          action_required: 'Deploy flood barriers at Portal B and activate drainage sump pumps'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.224, 13.015]
        }
      },
      {
        type: 'Feature',
        id: 'chn-fac-airport',
        properties: {
          id: 'chn-fac-airport',
          name: 'Chennai International Airport (Adyar Culvert Runway Bridge)',
          category: 'metro',
          type_label: 'International Aviation Hub & Runway Choke Point',
          ward: 'Meenambakkam',
          daily_ridership: '65,000 Travelers',
          flood_vulnerability: 'CRITICAL (Secondary runway crosses over Adyar river culvert)',
          contact: '+91 44 2256 0551',
          elevation_m: 7.5,
          is_critical: true,
          access_status: 'MONITORED_CHOKE',
          inundation_depth_m: 0.35,
          risk_tier: 'HIGH_ALERT',
          action_required: 'Adyar culvert cleared with hydraulic excavators to prevent runway overflow'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.170, 12.985]
        }
      }
    ]
  },
  sectors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'chn-sec-chembarambakkam',
        properties: {
          id: 'chn-sec-chembarambakkam',
          name: 'Chembarambakkam Sluice Regulator (29,000 Cusecs)',
          sector: 'utilities',
          sector_label: 'Lifelines & Hydraulic Control',
          sub_category: 'Primary River Regulator Sluice',
          station_id: 'CHEM-REG-01',
          capacity_mld: 29000,
          current_load_pct: 98,
          operating_status: 'DISCHARGING_SURCHARGE',
          elevation_m: 24.5,
          action_required: 'Synchronize discharge with low-tide window at Adyar mouth (Bay of Bengal)'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.055, 13.010]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-tneb-mylapore',
        properties: {
          id: 'chn-sec-tneb-mylapore',
          name: 'TNEB 230kV Mylapore Substation',
          sector: 'utilities',
          sector_label: 'Lifelines & Grid Power',
          sub_category: 'Extra High Voltage Power Grid',
          substation_id: 'TNEB-MYL-230',
          voltage_kv: 230,
          status: 'ONLINE_LOAD_SHEDDING',
          grid_load_pct: 82,
          dependent_subscribers: 280000,
          elevation_m: 9.8,
          action_required: 'Isolate feeder lines into Saidapet causeway and Velachery lake perimeter'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.260, 13.035]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-buckingham-canal',
        properties: {
          id: 'chn-sec-buckingham-canal',
          name: 'Buckingham Canal Pumping Culvert Outfall',
          sector: 'utilities',
          sector_label: 'Lifelines & Municipal Sump',
          sub_category: 'Tidal Drainage Pumping Station',
          station_id: 'BUCK-PUMP-03',
          capacity_mld: 450,
          current_load_pct: 95,
          operating_status: 'TIDAL_BACKFLOW_THREAT',
          elevation_m: 2.1,
          action_required: 'Close non-return tidal flap gates to prevent sea water ingress'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.258, 13.012]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-secretariat-fire',
        properties: {
          id: 'chn-sec-secretariat-fire',
          name: 'Tamil Nadu Fire & Rescue Services (TNFRS) Central Headquarters',
          sector: 'emergency_services',
          sector_label: 'Emergency Response & Rescue',
          sub_category: 'Central Fire & Disaster Dispatch Station',
          available_appliances: 14,
          route_accessibility: '100% CLEAR',
          assigned_patrols: 28,
          elevation_m: 12.0,
          action_required: 'Mobilize 8 inflatable flood rescue boats with OBM motors to Saidapet'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.272, 13.072]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-ndrf-arakkonam',
        properties: {
          id: 'chn-sec-ndrf-arakkonam',
          name: '4th NDRF Battalion Forward Command Post (Saidapet)',
          sector: 'emergency_services',
          sector_label: 'Emergency Response & Rescue',
          sub_category: 'Federal Disaster Relief Forward Unit',
          available_appliances: 6,
          route_accessibility: 'SURROUNDED_BY_WATER_BOAT_ACTIVE',
          assigned_patrols: 45,
          elevation_m: 5.5,
          action_required: 'Coordinating rooftop citizen extrication along Jafferkhanpet'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.218, 13.018]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-velachery-shelter',
        properties: {
          id: 'chn-sec-velachery-shelter',
          name: 'Velachery Community Hall Flood Relief Shelter',
          sector: 'vulnerable_populations',
          sector_label: 'Sensitive Populations & Relief',
          sub_category: 'Municipal Evacuation Shelter',
          shelter_id: 'SHELTER-VEL-01',
          bed_capacity: 1200,
          current_occupancy: 840,
          evacuation_priority: 'HIGH',
          elevation_m: 8.5,
          action_required: 'Distribute 3,000 food packets and clean drinking water tankers'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.220, 12.980]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-little-flower-school',
        properties: {
          id: 'chn-sec-little-flower-school',
          name: 'Little Flower Convent for the Deaf & Blind',
          sector: 'vulnerable_populations',
          sector_label: 'Sensitive Populations',
          sub_category: 'Special Needs Residential Institution',
          school_id: 'SCH-LF-01',
          enrollment_count: 240,
          evacuation_status: 'EVACUATION_EN_ROUTE',
          elevation_m: 6.8,
          action_required: 'Priority bus convoy dispatch with paramedical escort to Nungambakkam'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.246, 13.048]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sec-madley-subway',
        properties: {
          id: 'chn-sec-madley-subway',
          name: 'Madley Subway (T. Nagar Choke Point)',
          sector: 'transport_bottlenecks',
          sector_label: 'Transport Bottlenecks & Chokes',
          sub_category: 'Depressed Vehicular Subway',
          choke_id: 'CHOKE-MADLEY-01',
          clearance_height_m: 3.5,
          passable_lanes: 0,
          depth_m: 0.85,
          elevation_m: 3.2,
          action_required: 'Closed to vehicular traffic; activate high-capacity diesel pump unit'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.231, 13.038]
        }
      }
    ]
  },
  sensors: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'chn-sens-adyar-saidapet',
        properties: {
          id: 'chn-sens-adyar-saidapet',
          code: 'DRAIN-CHN-ADY-01',
          name: 'Adyar Saidapet Causeway Radar Hydro-Gauge',
          ward: 'Ward 179 (Saidapet)',
          sensor_type: 'Non-contact Microwave Radar Level Gauge',
          max_capacity_m: 4.5,
          step0: { depth_m: 0.65, level_pct: 14, status: 'NORMAL', flow_rate_lps: 420 },
          step1: { depth_m: 3.10, level_pct: 69, status: 'WARNING', flow_rate_lps: 4800 },
          step2: { depth_m: 4.65, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 18500 },
          recommended_pump_gpm: 2500,
          depth_m: 0.65,
          level_pct: 14,
          status: 'NORMAL',
          flow_rate_lps: 420
        },
        geometry: {
          type: 'Point',
          coordinates: [80.222, 13.017]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sens-velachery-lake',
        properties: {
          id: 'chn-sens-velachery-lake',
          code: 'DRAIN-CHN-VEL-02',
          name: 'Velachery Surplus Lakebed Telemetry Sump',
          ward: 'Ward 178 (Velachery)',
          sensor_type: 'Submersible Hydrostatic Pressure Transducer',
          max_capacity_m: 3.0,
          step0: { depth_m: 0.40, level_pct: 13, status: 'NORMAL', flow_rate_lps: 120 },
          step1: { depth_m: 2.25, level_pct: 75, status: 'WARNING', flow_rate_lps: 1100 },
          step2: { depth_m: 3.15, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 2400 },
          recommended_pump_gpm: 2000,
          depth_m: 0.40,
          level_pct: 13,
          status: 'NORMAL',
          flow_rate_lps: 120
        },
        geometry: {
          type: 'Point',
          coordinates: [80.218, 12.978]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sens-buckingham',
        properties: {
          id: 'chn-sens-buckingham',
          code: 'DRAIN-CHN-BC-03',
          name: 'Buckingham Canal Kotturpuram Sluice Sensor',
          ward: 'Ward 173 (Kotturpuram)',
          sensor_type: 'Ultrasonic Echo Level Gauge',
          max_capacity_m: 3.5,
          step0: { depth_m: 0.80, level_pct: 22, status: 'NORMAL', flow_rate_lps: 340 },
          step1: { depth_m: 2.80, level_pct: 80, status: 'WARNING', flow_rate_lps: 2900 },
          step2: { depth_m: 3.60, level_pct: 100, status: 'OVERFLOW_CRITICAL', flow_rate_lps: 6200 },
          recommended_pump_gpm: 1800,
          depth_m: 0.80,
          level_pct: 22,
          status: 'NORMAL',
          flow_rate_lps: 340
        },
        geometry: {
          type: 'Point',
          coordinates: [80.245, 13.018]
        }
      },
      {
        type: 'Feature',
        id: 'chn-sens-cooum-chennai-central',
        properties: {
          id: 'chn-sens-cooum-chennai-central',
          code: 'DRAIN-CHN-COU-04',
          name: 'Cooum River Central Station Weir Gauge',
          ward: 'Ward 58 (Park Town)',
          sensor_type: 'Digital Radar Sump Sluice Sensor',
          max_capacity_m: 4.0,
          step0: { depth_m: 0.90, level_pct: 22, status: 'NORMAL', flow_rate_lps: 520 },
          step1: { depth_m: 2.50, level_pct: 62, status: 'ELEVATED', flow_rate_lps: 2100 },
          step2: { depth_m: 3.45, level_pct: 86, status: 'CRITICAL', flow_rate_lps: 4500 },
          recommended_pump_gpm: 1200,
          depth_m: 0.90,
          level_pct: 22,
          status: 'NORMAL',
          flow_rate_lps: 520
        },
        geometry: {
          type: 'Point',
          coordinates: [80.274, 13.082]
        }
      }
    ]
  },
  detour_routes: {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'route-chn-obstructed',
        properties: {
          id: 'route-chn-obstructed',
          name: 'Primary Transit Corridor (Saidapet Adyar Causeway via Inner Ring Road)',
          status: 'SUBMERGED_IMPASSABLE',
          is_active_corridor: true,
          route_type: 'OBSTRUCTED_DIRECT',
          color_code: '#94a3b8',
          dash_array: 'none',
          water_hazard_depth_m: 1.15,
          eta_minutes: 'Blocked (Impassable)',
          distance_km: 3.8,
          notes: 'Saidapet causeway submerged under 1.15m water from Adyar river overflow. Two ambulances stranded. Route CLOSED.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.188, 13.018],
            [80.200, 13.015],
            [80.215, 13.014],
            [80.225, 13.018],
            [80.235, 13.025],
            [80.245, 13.045],
            [80.278, 13.080]
          ]
        }
      },
      {
        type: 'Feature',
        id: 'route-chn-safe-detour',
        properties: {
          id: 'route-chn-safe-detour',
          name: 'CivicOS Safe Detour (Kathipara Flyover Elevated Corridor to RGGGH)',
          status: 'RECOMMENDED_SAFE',
          is_active_corridor: false,
          route_type: 'SAFE_DETOUR',
          color_code: '#10b981',
          dash_array: 'none',
          water_hazard_depth_m: 0.0,
          eta_minutes: '14 min (+6 min detour)',
          distance_km: 6.4,
          elevation_advantage: '+18 meters above Adyar floodplain',
          waypoints: [
            'MIOT South Gate Emergency Ramp',
            'Mount-Poonamallee High Road',
            'Kathipara Multi-Level Flyover',
            'Guindy Industrial Estate High Road',
            'Anna Salai Elevated Flyover',
            'Rajiv Gandhi Govt General Hospital (RGGGH)'
          ],
          notes: '100% clear of satellite SAR flood polygon. Traffic police green corridor active at Kathipara interchange.'
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [80.188, 13.018],
            [80.195, 13.006],
            [80.205, 13.008],
            [80.215, 13.018],
            [80.228, 13.035],
            [80.245, 13.055],
            [80.265, 13.075],
            [80.278, 13.080]
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
        id: 'cit-chn-01',
        properties: {
          id: 'cit-chn-01',
          scenario_step: 1,
          caller_name: 'Dr. Ramesh Sundaram',
          phone_masked: '+91 9840X XXX12',
          location_desc: 'MIOT Hospital Ingress Road (Manapakkam)',
          category: 'Medical Facility Waterlogging',
          water_depth_est: '0.85m',
          urgency: 'CRITICAL',
          status: 'PENDING_PUMP',
          timestamp_relative: '6 min ago',
          notes: 'Adyar floodwaters entering basement electrical panel room. 220 ICU ventilator patients at risk.'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.187, 13.017]
        }
      },
      {
        type: 'Feature',
        id: 'cit-chn-02',
        properties: {
          id: 'cit-chn-02',
          scenario_step: 2,
          caller_name: 'Kavitha Natarajan',
          phone_masked: '+91 9444X XXX78',
          location_desc: 'Velachery Baby Nagar 3rd Cross',
          category: 'Stranded Senior Citizens',
          water_depth_est: '1.2m',
          urgency: 'CRITICAL',
          status: 'DISPATCHED',
          timestamp_relative: '12 min ago',
          notes: 'Ground floor submerged. 4 elderly citizens stranded on terrace. Requesting NDRF inflatable boat.'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.221, 12.982]
        }
      },
      {
        type: 'Feature',
        id: 'cit-chn-03',
        properties: {
          id: 'cit-chn-03',
          scenario_step: 1,
          caller_name: 'Anand Kumar',
          phone_masked: '+91 9791X XXX45',
          location_desc: 'Saidapet Causeway Bus Shelter',
          category: 'Stranded Public Transit',
          water_depth_est: '0.9m',
          urgency: 'HIGH',
          status: 'REROUTED',
          timestamp_relative: '18 min ago',
          notes: 'MTC Bus #18D engine flooded and halted mid-causeway. 35 passengers safely escorted to Guindy.'
        },
        geometry: {
          type: 'Point',
          coordinates: [80.223, 13.016]
        }
      }
    ]
  },
  cascading_chains: {
    0: {
      is_active: false,
      status_label: 'NORMAL_WATCH',
      trigger_node: 'Adyar & Chembarambakkam Telemetry Normal',
      chain_nodes: [
        {
          id: 'chn-node-0-1',
          title: 'Reservoir Level',
          icon: 'droplets',
          status: 'NORMAL',
          desc: 'Chembarambakkam reservoir at 68% full; sluice gates discharging regulated 800 cusecs.',
          impact_level: 'LOW',
          time_relative: 'T+00'
        },
        {
          id: 'chn-node-0-2',
          title: 'Power Grid',
          icon: 'power',
          status: 'ONLINE',
          desc: 'TNEB Mylapore & Guindy substations delivering 100% nominal voltage across all feeders.',
          impact_level: 'LOW',
          time_relative: 'T+00'
        }
      ],
      automated_recommendations: ['Maintain standard monsoon surveillance on Adyar gauge telemetry.']
    },
    1: {
      is_active: true,
      status_label: 'ELEVATED_SURGE',
      trigger_node: 'Chembarambakkam Inflow Spikes to 18,000 cusecs',
      chain_nodes: [
        {
          id: 'chn-node-1-1',
          title: 'Reservoir Surcharge',
          icon: 'rain',
          status: 'WARNING',
          desc: 'Catchment receives 85mm rainfall in 3 hours; Chembarambakkam discharge raised to 14,000 cusecs.',
          impact_level: 'HIGH',
          time_relative: 'T+30 min'
        },
        {
          id: 'chn-node-1-2',
          title: 'Saidapet Surcharge',
          icon: 'droplets',
          status: 'WARNING',
          desc: 'Saidapet causeway water level approaches within 0.3m of road deck; traffic police alerted.',
          impact_level: 'HIGH',
          time_relative: 'T+38 min'
        }
      ],
      automated_recommendations: ['Pre-position NDRF boats at Saidapet and Velachery police stations.']
    },
    2: {
      is_active: true,
      status_label: 'CASCADING_DISASTER_ACTIVE',
      trigger_node: 'Chembarambakkam Discharge 29,000 cusecs ➔ Adyar River Breaches',
      chain_nodes: [
        {
          id: 'chn-node-2-1',
          title: 'Reservoir Discharge Surge',
          icon: 'rain',
          status: 'CRITICAL',
          desc: 'Chembarambakkam sluice gates opened to 29,000 cusecs; Adyar river crests 4.2m above normal bank.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+40 min',
          action: 'Alert District Collector & Army Southern Command',
          asset_target: 'Chembarambakkam Sluice Regulator'
        },
        {
          id: 'chn-node-2-2',
          title: 'Adyar River Breaches Bund',
          icon: 'droplets',
          status: 'BREACH',
          desc: 'Adyar river surges into Manapakkam and Saidapet causeways; road submerged under 1.4m rushing torrent.',
          impact_level: 'CRITICAL',
          time_relative: 'T+45 min',
          action: 'Deploy Emergency Inflatable Cordon Barricades',
          asset_target: 'Saidapet Causeway Bridge'
        },
        {
          id: 'chn-node-2-3',
          title: 'MIOT Substation Flooded',
          icon: 'power',
          status: 'TRIPPED',
          desc: 'MIOT Hospital 33kV basement substation inundated and tripped; building switches to DG emergency power.',
          impact_level: 'CRITICAL',
          time_relative: 'T+48 min',
          action: 'Mobilize 2000-GPM Dewatering Pump & Backup Diesel Tanker',
          asset_target: 'MIOT Hospital 33kV Substation'
        },
        {
          id: 'chn-node-2-4',
          title: 'Oxygen & Ventilator Threat',
          icon: 'ambulance',
          status: 'HIGH_RISK',
          desc: '220 ICU ventilator patients threatened by fuel exhaustion; Inner Ring Road direct transit severed.',
          impact_level: 'EMERGENCY_CRITICAL',
          time_relative: 'T+52 min',
          action: 'Engage Kathipara Flyover Green Corridor to RGGGH',
          asset_target: 'Apex Trauma Emergency Line'
        },
        {
          id: 'chn-node-2-5',
          title: 'Safe Evacuation Bypass Active',
          icon: 'traffic',
          status: 'SAFE_DETOUR',
          desc: 'All emergency trauma ambulances successfully rerouted via Kathipara Flyover to Rajiv Gandhi Hospital (RGGGH).',
          impact_level: 'MITIGATED',
          time_relative: 'T+58 min',
          action: 'Station Traffic Patrol at Kathipara Ramp',
          asset_target: 'Kathipara Elevated Bypass'
        }
      ],
      automated_recommendations: [
        'Deploy 2000-GPM dewatering unit to MIOT Hospital substation immediately.',
        'Enforce 100% closure of Saidapet Adyar causeway and divert all traffic to Kathipara flyover.',
        'Transmit Tamil & English cell broadcasts to 52,400 residents in Velachery and Saidapet wards.'
      ]
    }
  },
  ai_plans: {
    0: {
      scenario_step: 0,
      status: 'NORMAL_WATCH',
      executive_summary: 'Chennai Metro Region: All arterial waterways (Adyar, Cooum, Buckingham Canal) within safe hydraulic margins. Chembarambakkam reservoir buffer capacity at 32%.',
      risk_assessment: {
        ward_14_risk_index: 14,
        threat_category: 'ROUTINE_MONITORING',
        precipitation_rate: '0 mm/hr'
      },
      dewatering_work_orders: [],
      traffic_dispatch_orders: [],
      citizen_broadcast: {
        alert_level: 'GREEN_ADVISORY',
        sms_english: 'CHENNAI METRO DISASTER ADVISORY: Normal weather conditions. Coastal drainage sensors functioning normally. Emergency helpline: 1913.',
        sms_telugu: 'சென்னை மாநகராட்சி அறிவிப்பு: தற்போதைய வானிலை இயல்பாக உள்ளது. அவசர உதவிக்கு 1913 என்ற எண்ணை அழைக்கவும்.',
        whatsapp_card: '🟢 *CIVICOS CHENNAI FLOOD ADVISORY*\n\nStatus: NORMAL CONDITIONS\nHelpline: 1913 / 1070\nAdyar Basin: FLOWING NORMALLY',
        target_subscribers: 0,
        geofence_radius_km: 1.0
      },
      telemetry_insights: 'Automated radar gauges reporting nominal sea outfall levels at Adyar estuary.',
      processing_time_ms: 120
    },
    1: {
      scenario_step: 1,
      status: 'CLOUDBURST_INFLUX',
      executive_summary: 'Adyar catchment experiencing heavy cloudburst (62 mm/hr). Chembarambakkam discharge elevated to 14,000 cusecs. Saidapet causeway water depth rising rapidly to 0.45m.',
      risk_assessment: {
        ward_14_risk_index: 72,
        threat_category: 'ELEVATED_WATCH',
        precipitation_rate: '62 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-CHN-01',
          priority: 'HIGH',
          target_asset: 'Madley Subway T. Nagar',
          action: 'Deploy high-capacity mobile diesel dewatering pump',
          equipment: '1200-GPM Mobile Sump Trailer',
          eta_minutes: '8 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Saidapet Adyar Causeway',
          instruction: 'Speed restriction 20 km/h; heavy vehicles restricted',
          status: 'ACTIVE_RESTRICTION'
        }
      ],
      citizen_broadcast: {
        alert_level: 'AMBER_ALERT',
        sms_english: 'CIVICOS CHENNAI ALERT: Heavy rainfall in Adyar catchment. Chembarambakkam outflow increasing. Avoid Saidapet Causeway and Velachery lowlands. Greater Chennai Corp Helpline: 1913.',
        sms_telugu: 'சென்னை வெள்ள எச்சரிக்கை: அடையாறு ஆற்றில் நீர்வரத்து அதிகரித்துள்ளது. சைதாப்பேட்டை தரைப்பாலம் மற்றும் வேளச்சேரி பகுதிகளை தவிர்க்கவும். உதவிக்கு 1913.',
        whatsapp_card: '⚠️ *CIVICOS CHENNAI FLOOD ALERT*\n\n📍 Sector: Adyar / Saidapet / Velachery\n🌊 Chembarambakkam Outflow: 14,000 cusecs\n⛔ Advisory: Avoid Saidapet causeway.',
        target_subscribers: 22000,
        geofence_radius_km: 4.2
      },
      telemetry_insights: 'Adyar Saidapet radar hydro-gauge spikes to 3.10m (+2.45m in 40 minutes).',
      processing_time_ms: 240
    },
    2: {
      scenario_step: 2,
      status: 'SAR_SATELLITE_EMERGENCY',
      executive_summary: 'CRITICAL EMERGENCY: Chembarambakkam releasing 29,000 cusecs. Adyar river breaches into Saidapet and Manapakkam. MIOT Hospital 33kV substation flooded. Saidapet causeway severed. Trauma ambulances rerouted via Kathipara Flyover to RGGGH.',
      risk_assessment: {
        ward_14_risk_index: 96,
        threat_category: 'DISASTER_CASCADING_CRITICAL',
        precipitation_rate: '110 mm/hr'
      },
      dewatering_work_orders: [
        {
          order_id: 'WO-CHN-02',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'MIOT Hospital Adyar Substation',
          action: 'Deploy 2000-GPM dewatering unit and secondary diesel generator fuel buffer',
          equipment: '2000-GPM High-Pressure Dewatering Unit #04',
          eta_minutes: '4 min'
        },
        {
          order_id: 'WO-CHN-03',
          priority: 'HIGH',
          target_asset: 'Saidapet Metro Station Portal B',
          action: 'Erect mobile aluminum storm flood barriers and activate portal sumps',
          equipment: 'Rapid Flood Barrier Deployment Trailer #02',
          eta_minutes: '6 min'
        },
        {
          order_id: 'WO-CHN-04',
          priority: 'EMERGENCY_CRITICAL',
          target_asset: 'Velachery Baby Nagar',
          action: 'Deploy 4 inflatable rescue boats with outboard motors for terrace evacuation',
          equipment: 'NDRF Inflatable Gemini Rescue Boats',
          eta_minutes: '9 min'
        }
      ],
      traffic_dispatch_orders: [
        {
          corridor: 'Saidapet Adyar Causeway',
          instruction: 'TOTAL CLOSURE: Submerged 1.15m. Divert all emergency transit to Kathipara Flyover',
          status: 'ROAD_SEVERED'
        },
        {
          corridor: 'Kathipara Flyover to Anna Salai',
          instruction: 'GREEN CORRIDOR ENGAGED: Ambulance priority passage to Rajiv Gandhi Govt General Hospital (RGGGH)',
          status: 'GREEN_CORRIDOR_ACTIVE'
        }
      ],
      citizen_broadcast: {
        alert_level: 'RED_EMERGENCY',
        sms_english: 'CRITICAL FLOOD DISASTER ALERT: Adyar River overflowing at 29,000 cusecs. Saidapet causeway & Velachery lakebed submerged. MIOT road severed. DO NOT cross causeway. Follow Kathipara elevated route to RGGGH. Greater Chennai Corp: 1913 / 1070.',
        sms_telugu: 'அதிதீவிர வெள்ள எச்சரிக்கை: அடையாறு ஆற்றில் 29,000 கனஅடி நீர் பாய்கிறது. சைதாப்பேட்டை தரைப்பாலம் மற்றும் வேளச்சேரி நீரில் மூழ்கியுள்ளது. கத்திப்பாரா மேம்பாலம் வழியே செல்லவும். உதவிக்கு: 1913 / 1070.',
        whatsapp_card: '🚨 *CIVICOS CRITICAL FLOOD DISASTER ALERT*\n\n📍 Sector: Chennai Adyar Basin (Saidapet & Velachery)\n⛔ Status: SAIDAPET CAUSEWAY SEVERED (1.15m Water)\n🏥 Medical Access: Divert via Kathipara Flyover -> Anna Salai -> RGGGH Hospital\n🌊 Chembarambakkam: 29,000 Cusecs\n📞 Emergency Control: 1913 / 1070 / 108',
        target_subscribers: 58000,
        geofence_radius_km: 6.5
      },
      telemetry_insights: 'Sentinel-1 Dual-Pol SAR confirms 88.5 ha water extent over Saidapet and Velachery. Kathipara bypass confirmed 100% free of flooding.',
      processing_time_ms: 310
    }
  }
};
