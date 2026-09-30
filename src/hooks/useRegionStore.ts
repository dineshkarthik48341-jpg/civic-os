import { useState, useMemo, useCallback } from 'react';
import { RegionId, RegionConfig, RegionBundle, ScenarioStep, SystemStatus } from '../types';
import { REGIONS, REGION_LIST, DEFAULT_REGION_ID } from '../data/regions';

export function useRegionStore(initialRegion: RegionId = DEFAULT_REGION_ID) {
  const [regionId, setRegionId] = useState<RegionId>(initialRegion);

  const bundle = useMemo<RegionBundle>(() => {
    return REGIONS[regionId] || REGIONS[DEFAULT_REGION_ID];
  }, [regionId]);

  const config = bundle.config;

  // Generate filtered/updated dataset for any given scenario step
  const getStepData = useCallback((step: ScenarioStep) => {
    // 1. Filter flood masks
    const activeFloodFeatures = (bundle.flood_masks?.features || []).filter((f: any) => {
      const featStep = f.properties?.scenario_step;
      if (featStep === 99) return true; // reference structural masks
      if (featStep > 0 && featStep <= step) return true;
      return false;
    });

    const activeFloodMasks = {
      type: 'FeatureCollection',
      features: activeFloodFeatures,
    };

    // 2. Update sensor telemetry according to scenario step
    const updatedSensorFeatures = (bundle.sensors?.features || []).map((s: any) => {
      const stepKey = `step${step}` as 'step0' | 'step1' | 'step2';
      const stepReading = s.properties?.[stepKey];
      if (stepReading) {
        return {
          ...s,
          properties: {
            ...s.properties,
            depth_m: stepReading.depth_m,
            level_pct: stepReading.level_pct,
            status: stepReading.status,
            flow_rate_lps: stepReading.flow_rate_lps,
          },
        };
      }
      return s;
    });

    const activeSensors = {
      type: 'FeatureCollection',
      features: updatedSensorFeatures,
    };

    // 3. Filter citizen reports for the step
    const activeCitizenFeatures = (bundle.citizen_reports?.features || []).filter((f: any) => {
      const featStep = f.properties?.scenario_step;
      return featStep === undefined || featStep <= step;
    });

    const activeCitizenReports = {
      type: 'FeatureCollection',
      features: activeCitizenFeatures,
    };

    // 4. Cascading chain & AI plan
    const cascadingChain = bundle.cascading_chains[step] || bundle.cascading_chains[0];
    const aiPlan = bundle.ai_plans[step] || bundle.ai_plans[0];

    // 5. System status
    const riskIndex = step === 0 ? config.step0Risk : step === 1 ? config.step1Risk : config.step2Risk;
    const precip = step === 0 ? 0 : step === 1 ? 55 : 110;
    const systemStatus: SystemStatus = {
      system: 'CivicOS South India Disaster Command',
      sector: `${config.name} (${config.worstWard})`,
      coordinates_center: [config.center[1], config.center[0]], // [lon, lat]
      status_badge: 'SYSTEM LIVE // REGIONAL SATELLITE SYNCED',
      scenario_step: step,
      operational_state: step === 0 ? 'NORMAL_MONITORING' : step === 1 ? 'CLOUDBURST_INFLUX' : 'SAR_SATELLITE_EMERGENCY',
      precipitation_mm_hr: precip,
      satellite_feed: 'Sentinel-1 SAR / ISRO RISAT-1A Multi-spectral Mask',
      last_sync_timestamp: new Date().toISOString(),
      ward_risk_index: riskIndex,
    };

    return {
      zones: bundle.zones,
      flood_masks: activeFloodMasks,
      roads: bundle.roads,
      facilities: bundle.facilities,
      sectors: bundle.sectors,
      sensors: activeSensors,
      detour_routes: bundle.detour_routes,
      citizen_reports: activeCitizenReports,
      cascading_chain: cascadingChain,
      ai_plan: aiPlan,
      system_status: systemStatus,
    };
  }, [bundle, config]);

  return {
    regionId,
    setRegionId,
    config,
    bundle,
    regionList: REGION_LIST,
    getStepData,
  };
}
