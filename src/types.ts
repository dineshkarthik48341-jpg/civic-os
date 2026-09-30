export type ScenarioStep = 0 | 1 | 2;

export interface LayerVisibility {
  floodMasks: boolean;
  roadNetwork: boolean;
  criticalFacilities: boolean;
  drainageSensors: boolean;
  emergencyRoutes: boolean;
  citizenDistress: boolean;
  utilitiesSector: boolean;
  emergencyServicesSector: boolean;
  vulnerablePopulationsSector: boolean;
  transportBottlenecksSector: boolean;
  disasterZones: boolean;
}

export interface FacilityProperties {
  id: string;
  name: string;
  category: 'hospital' | 'metro' | 'mall';
  type_label: string;
  ward: string;
  capacity?: string;
  daily_ridership?: string;
  occupancy_est?: string;
  icu_status?: string;
  flood_vulnerability: string;
  contact?: string;
  elevation_m?: number;
  is_critical: boolean;
  access_status?: string;
  inundation_depth_m?: number;
  risk_tier?: string;
  action_required?: string;
}

export interface SectorFeatureProperties {
  id: string;
  name: string;
  sector: 'utilities' | 'emergency_services' | 'vulnerable_populations' | 'transport_bottlenecks';
  sector_label: string;
  sub_category: string;
  elevation_m?: number;
  // Utilities
  substation_id?: string;
  voltage_kv?: number;
  status?: string;
  grid_load_pct?: number;
  failure_reason?: string;
  dependent_subscribers?: number;
  station_id?: string;
  capacity_mld?: number;
  current_load_pct?: number;
  operating_status?: string;
  tower_id?: string;
  coverage_radius_m?: number;
  battery_backup_hours?: number;
  operational_status?: string;
  cause?: string;
  // Emergency Services
  available_appliances?: number;
  route_accessibility?: string;
  cordon_active?: boolean;
  assigned_patrols?: number;
  shelter_id?: string;
  bed_capacity?: number;
  current_occupancy?: number;
  // Vulnerable Populations
  school_id?: string;
  enrollment_count?: number;
  evacuation_status?: string;
  facility_id?: string;
  bed_count?: number;
  evacuation_priority?: string;
  // Transport Bottlenecks
  portal_id?: string;
  sump_water_level_m?: number;
  flooding_hazard?: string;
  choke_id?: string;
  clearance_height_m?: number;
  passable_lanes?: string | number;
  depth_m?: number;
  // Common
  dependent_assets?: string[];
  action_required?: string;
}

export interface DisasterZoneProperties {
  id: string;
  name: string;
  zone_tier: 'BLUE' | 'ORANGE' | 'RED';
  zone_label: string;
  color_hex: string;
  fill_color: string;
  fill_opacity: number;
  stroke_color: string;
  stroke_width: number;
  coverage_areas: string[];
  roads_accessible_pct: number;
  drain_capacity_pct: number;
  power_grid_status: string;
  shelters_status: string;
  summary: string;
}

export interface RoadProperties {
  id: string;
  name: string;
  type: string;
  lanes: number;
  speed_limit_kmh: number;
  is_primary_ambulance_route: boolean;
  drainage_culvert_id: string;
  access_status: 'CLEAR' | 'IMPEDED' | 'SEVERED';
  inundation_depth_m: number;
  submerged_length_m?: number;
  is_severed?: boolean;
  critical_asset_access: string;
  elevation_profile: string;
}

export interface FloodMaskProperties {
  id: string;
  scenario_step: number;
  name: string;
  satellite_source: string;
  inundation_class: string;
  mean_depth_m: number;
  peak_depth_m: number;
  confidence_score: number;
  hazard_level: string;
  area_hectares: number;
}

export interface SensorProperties {
  id: string;
  code: string;
  name: string;
  ward: string;
  sensor_type: string;
  max_capacity_m: number;
  depth_m: number;
  level_pct: number;
  status: 'NORMAL' | 'ELEVATED' | 'WARNING' | 'CRITICAL' | 'OVERFLOW_CRITICAL';
  flow_rate_lps: number;
  recommended_pump_gpm: number;
}

export interface CitizenReportProperties {
  id: string;
  scenario_step: number;
  caller_name: string;
  phone_masked: string;
  location_desc: string;
  category: string;
  water_depth_est: string;
  urgency: 'MODERATE' | 'HIGH' | 'CRITICAL';
  status: 'PENDING' | 'DISPATCHED' | 'REROUTED' | 'SHELTERED' | 'PENDING_PUMP';
  timestamp_relative: string;
  notes: string;
}

export interface DetourRouteProperties {
  id: string;
  name: string;
  status: string;
  is_active_corridor: boolean;
  route_type: 'OBSTRUCTED_DIRECT' | 'SAFE_DETOUR';
  color_code: string;
  dash_array: string;
  water_hazard_depth_m: number;
  eta_minutes: string;
  distance_km: number;
  elevation_advantage?: string;
  waypoints?: string[];
  notes: string;
}

export interface DewateringWorkOrder {
  order_id: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY_CRITICAL';
  target_asset: string;
  action: string;
  equipment: string;
  eta_minutes: string;
  dispatched?: boolean;
}

export interface TrafficDispatchOrder {
  corridor: string;
  instruction: string;
  status: string;
}

export interface CitizenBroadcast {
  alert_level: string;
  sms_english: string;
  sms_telugu: string;
  whatsapp_card: string;
  target_subscribers: number;
  geofence_radius_km: number;
}

export interface CascadingImpactNode {
  id: string;
  title: string;
  icon: string;
  status: string;
  desc: string;
  impact_level: string;
  action?: string;
  time_relative?: string;
}

export interface CascadingImpactChain {
  is_active: boolean;
  status_label: string;
  trigger_node: string;
  chain_nodes: CascadingImpactNode[];
  automated_recommendations: string[];
}

export interface AIDispatchPlan {
  scenario_step: number;
  status: string;
  executive_summary: string;
  risk_assessment: {
    ward_14_risk_index: number;
    threat_category: string;
    precipitation_rate: string;
  };
  cascading_impact_chain?: CascadingImpactChain;
  dewatering_work_orders: DewateringWorkOrder[];
  traffic_dispatch_orders: TrafficDispatchOrder[];
  citizen_broadcast: CitizenBroadcast;
  telemetry_insights: string;
  processing_time_ms: number;
}

export interface SystemStatus {
  system: string;
  sector: string;
  coordinates_center: [number, number];
  status_badge: string;
  scenario_step: ScenarioStep;
  operational_state: string;
  precipitation_mm_hr: number;
  satellite_feed: string;
  last_sync_timestamp: string;
  ward_risk_index: number;
}

export interface FeatureInspectorData {
  title: string;
  category: string;
  accessStatus: string;
  inundationDepth: number;
  impactedFacility?: string;
  elevation?: string | number;
  contact?: string;
  dependentAssets?: string[];
  actionButtonLabel?: string;
  details: Record<string, any>;
  coordinates?: [number, number] | number[][];
}

export type RegionId = 'chennai' | 'kochi' | 'vijayawada' | 'bengaluru';

export interface RegionConfig {
  id: RegionId;
  name: string;
  state: string;
  stateCode: string;
  label: string;
  center: [number, number]; // [lat, lng] for Leaflet
  zoom: number;
  primaryBasin: string;
  worstWard: string;
  damDischarge: string;
  rainfallTelemetry: string;
  emergencyContact: string;
  step0Risk: number;
  step1Risk: number;
  step2Risk: number;
  regionalLanguageLabel: string;
  regionalLanguageCode: string;
}

export interface RegionBundle {
  config: RegionConfig;
  zones: any;
  flood_masks: any;
  roads: any;
  facilities: any;
  sectors: any;
  sensors: any;
  detour_routes: any;
  citizen_reports: any;
  cascading_chains: Record<ScenarioStep, CascadingImpactChain>;
  ai_plans: Record<ScenarioStep, AIDispatchPlan>;
}

