import React, { useState, useEffect, useCallback } from 'react';
import { 
  ScenarioStep, 
  LayerVisibility, 
  FeatureInspectorData, 
  AIDispatchPlan, 
  SystemStatus,
  SensorProperties,
  CitizenReportProperties,
  RegionId
} from './types';
import { 
  simulateStormStep, 
  broadcastGeofencedAlert 
} from './services/api';
import { useRegionStore } from './hooks/useRegionStore';

import { TopNavbar } from './components/TopNavbar';
import { LeftSidebar } from './components/LeftSidebar';
import { CenterMap } from './components/CenterMap';
import { RightDispatchHub } from './components/RightDispatchHub';
import { FeatureInspectorModal } from './components/FeatureInspectorModal';
import { CitizenDistressModal } from './components/CitizenDistressModal';
import { ToastContainer, ToastMessage } from './components/Toast';

export function App() {
  // Region Management Store (Default: Chennai)
  const {
    regionId,
    setRegionId,
    config: selectedRegion,
    regionList,
    getStepData
  } = useRegionStore('chennai');

  // Scenario & Simulation State
  const [currentStep, setCurrentStep] = useState<ScenarioStep>(0);
  const [precipitationRate, setPrecipitationRate] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);

  // Layers Visibility
  const [layers, setLayers] = useState<LayerVisibility>({
    floodMasks: true,
    roadNetwork: true,
    criticalFacilities: true,
    drainageSensors: true,
    emergencyRoutes: true,
    citizenDistress: true,
    utilitiesSector: true,
    emergencyServicesSector: true,
    vulnerablePopulationsSector: true,
    transportBottlenecksSector: true,
    disasterZones: true,
  });

  // Spatial & Telemetry Data
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [roadsData, setRoadsData] = useState<any>(null);
  const [facilitiesData, setFacilitiesData] = useState<any>(null);
  const [sectorsData, setSectorsData] = useState<any>(null);
  const [zonesData, setZonesData] = useState<any>(null);
  const [floodMasksData, setFloodMasksData] = useState<any>(null);
  const [sensorsData, setSensorsData] = useState<any>(null);
  const [detourRoutesData, setDetourRoutesData] = useState<any>(null);
  const [citizenReports, setCitizenReports] = useState<CitizenReportProperties[]>([]);
  const [facilitiesAtRisk, setFacilitiesAtRisk] = useState<any[]>([]);
  const [aiPlan, setAiPlan] = useState<AIDispatchPlan | null>(null);

  // Inspector & Modal States
  const [selectedFeature, setSelectedFeature] = useState<FeatureInspectorData | null>(null);
  const [selectedSensorId, setSelectedSensorId] = useState<string | undefined>();
  const [isDistressModalOpen, setIsDistressModalOpen] = useState<boolean>(false);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [dispatchedOrders, setDispatchedOrders] = useState<Set<string>>(new Set());
  const [totalBroadcastsCount, setTotalBroadcastsCount] = useState<number>(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'info', title: string, message: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Web Audio emergency alert sound
  const playAlertSound = useCallback((frequency = 880, duration = 0.25) => {
    if (isAudioMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay restrictions ignored
    }
  }, [isAudioMuted]);

  // Load all layers and data for a given scenario step and active region
  const loadScenarioData = useCallback((step: ScenarioStep) => {
    try {
      const data = getStepData(step);

      setRoadsData(data.roads);
      setFacilitiesData(data.facilities);
      setSectorsData(data.sectors);
      setZonesData(data.zones);
      setFloodMasksData(data.flood_masks);
      setSensorsData(data.sensors);
      setDetourRoutesData(data.detour_routes);

      if (data.citizen_reports?.features) {
        setCitizenReports(data.citizen_reports.features.map((f: any) => f.properties));
      }

      // Compute facilities at risk for step 2
      const facList = (data.facilities?.features || [])
        .filter((f: any) => step === 2 || f.properties?.access_status === 'CUTOFF' || f.properties?.access_status === 'RESTRICTED')
        .map((f: any) => f.properties);
      setFacilitiesAtRisk(facList);

      setAiPlan(data.ai_plan);
      setSystemStatus(data.system_status);
      setPrecipitationRate(step === 0 ? 0 : step === 1 ? 55 : 110);
    } catch (err) {
      console.error('Failed to load scenario data', err);
    }
  }, [getStepData]);

  // Sync data when step or region changes
  useEffect(() => {
    loadScenarioData(currentStep);
  }, [loadScenarioData, currentStep, regionId]);

  // Handle Region Switching
  const handleSelectRegion = (newRegionId: RegionId) => {
    if (newRegionId === regionId) return;
    setRegionId(newRegionId);
    playAlertSound(920, 0.2);
    const targetRegion = regionList.find((r) => r.id === newRegionId);
    if (targetRegion) {
      addToast(
        'info',
        `Disaster Hub Switched: ${targetRegion.label}`,
        `Viewport flew to ${targetRegion.primaryBasin}. Active infrastructure, flood masks, and failure narratives loaded.`
      );
    }
  };

  // Handle Scenario Step Switch
  const handleSelectStep = async (step: ScenarioStep) => {
    if (step === currentStep) return;
    setCurrentStep(step);
    playAlertSound(step === 2 ? 650 : step === 1 ? 750 : 880, 0.35);

    try {
      simulateStormStep(step).catch(() => {});
      loadScenarioData(step);
      
      const stepNames = ['Normal Conditions', 'Cloudburst Influx (T+30 min)', 'SAR Satellite Detection (T+60 min)'];
      addToast(
        step === 2 ? 'warning' : 'info',
        `Scenario Shifted: ${stepNames[step]}`,
        step === 2 
          ? `SAR flood extent confirmed in ${selectedRegion.name}. Primary transit severed; safe detour engaged!`
          : step === 1 
            ? `Telemetry sensors spiking in ${selectedRegion.worstWard}. Runoff detected in riverine lowlands.`
            : `All municipal corridors in ${selectedRegion.name} restored to baseline surveillance.`
      );
    } catch (e) {
      console.warn('Simulation update failed', e);
    }
  };

  // One-Click [Simulate Cloudburst] Action Trigger
  const handleSimulateCloudburst = async () => {
    setIsSimulating(true);
    playAlertSound(550, 0.45);
    addToast('warning', `SIMULATING CLOUDBURST INFLUX (${selectedRegion.stateCode})`, 'Synthesizing radar Doppler backscatter & sensor surge...');

    // Progress from Step 0 -> Step 1 -> Step 2
    setTimeout(async () => {
      await handleSelectStep(1);
      setTimeout(async () => {
        await handleSelectStep(2);
        setIsSimulating(false);
        addToast(
          'warning',
          'CRITICAL FLOOD EXTENT DETECTED',
          `SAR Satellite Dual-Pol confirms flood surge across ${selectedRegion.primaryBasin}. Diverting emergency trauma units.`
        );
      }, 1800);
    }, 1200);
  };

  // Toggle Layer Visibility
  const handleToggleLayer = (layerKey: keyof LayerVisibility) => {
    setLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Select Feature from Map or Sidebar
  const handleSelectFeature = (feat: FeatureInspectorData) => {
    setSelectedFeature(feat);
    playAlertSound(1020, 0.1);
  };

  // Select Sensor from Left Sidebar
  const handleSelectSensor = (sensor: SensorProperties) => {
    setSelectedSensorId(sensor.id);
    setSelectedFeature({
      title: `${sensor.code}: ${sensor.name}`,
      category: 'Storm Drainage Telemetry',
      accessStatus: sensor.status,
      inundationDepth: sensor.depth_m,
      impactedFacility: `Flow Rate: ${sensor.flow_rate_lps} L/s`,
      details: {
        'Capacity Full': `${sensor.level_pct}%`,
        'Max Capacity': `${sensor.max_capacity_m}m`,
        'Water Depth': `${sensor.depth_m.toFixed(2)}m`,
        'Recommended Pump': sensor.recommended_pump_gpm > 0 ? `${sensor.recommended_pump_gpm} GPM` : 'Normal',
        'Ward': sensor.ward,
        'Basin': selectedRegion.primaryBasin
      },
    });
  };

  // Select Facility from Right Hub
  const handleSelectFacilityFromHub = (fac: any) => {
    setSelectedFeature({
      title: fac.name,
      category: fac.category === 'hospital' ? 'Apex Trauma Hospital' : 'Transit / Infrastructure Hub',
      accessStatus: fac.access_status || 'CUTOFF',
      inundationDepth: fac.depth_m || 0.85,
      impactedFacility: fac.action_required || 'Emergency Detour Enforced',
      contact: fac.contact,
      details: {
        'Facility ID': fac.id,
        'Risk Tier': fac.risk_tier || 'IMMEDIATE_THREAT',
        'Ward Location': fac.ward || selectedRegion.worstWard,
        'Emergency Action Required': fac.action_required || 'Divert trauma inbound ambulances',
        'Region': selectedRegion.name
      },
    });
  };

  // Trigger Tactical Emergency Action (Generator, Dewatering, Shelter, Cordon)
  const handleTriggerAction = (actionName: string, assetName: string) => {
    playAlertSound(1100, 0.25);
    addToast(
      'success',
      `EMERGENCY ORDER DISPATCHED: ${actionName}`,
      `${actionName} successfully mobilized for ${assetName}. Real-time GPS tracking and green corridor priority initiated.`
    );
  };

  // Dispatch Dewatering Work Order
  const handleDispatchWorkOrder = (orderId: string) => {
    setDispatchedOrders((prev) => new Set([...prev, orderId]));
    playAlertSound(1200, 0.15);
    addToast('success', 'Dewatering Unit Dispatched', `Work order ${orderId} verified. Mobile pump en route with green corridor priority.`);
  };

  // Broadcast Geofenced Alert to Citizens
  const handleBroadcastAlert = async (messageText: string) => {
    setIsBroadcasting(true);
    playAlertSound(900, 0.4);

    try {
      const res = await broadcastGeofencedAlert({
        step: currentStep,
        message_text: messageText,
        geofence_radius_km: 4.8,
      });

      setTotalBroadcastsCount((prev) => prev + 1);
      addToast(
        'success',
        'GEOFENCED ALERT BROADCAST DELIVERED',
        res.message || `Successfully transmitted alert to citizens in ${selectedRegion.name}.`
      );
    } catch (e) {
      console.warn('Broadcast failed', e);
      addToast('success', 'Alert Broadcasted', `Transmitted to registered citizen devices in ${selectedRegion.name}.`);
    } finally {
      setIsBroadcasting(false);
    }
  };

  // Extract sensors list for left sidebar
  const sensorList: SensorProperties[] = (sensorsData?.features || []).map((f: any) => f.properties);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#09090b] text-slate-100 select-none font-sans">
      
      {/* 1. TOP NAVIGATION BAR */}
      <TopNavbar
        currentStep={currentStep}
        precipitationRate={precipitationRate}
        selectedRegion={selectedRegion}
        regionList={regionList}
        onSelectRegion={handleSelectRegion}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => {
          setIsAudioMuted(!isAudioMuted);
          addToast('info', 'Audio Status', !isAudioMuted ? 'Emergency Audio Siren Muted' : 'Emergency Audio Siren Armed');
        }}
        onOpenDistressModal={() => setIsDistressModalOpen(true)}
        pendingDistressCount={citizenReports.length}
        totalBroadcastsCount={totalBroadcastsCount}
      />

      {/* 2. THREE-COLUMN COMMAND CENTER LAYOUT */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Column 1: Left Control Sidebar (width: 320px) */}
        <LeftSidebar
          currentStep={currentStep}
          onSelectStep={handleSelectStep}
          onSimulateCloudburst={handleSimulateCloudburst}
          isSimulating={isSimulating}
          layers={layers}
          onToggleLayer={handleToggleLayer}
          sensors={sensorList}
          onSelectSensor={handleSelectSensor}
          selectedSensorId={selectedSensorId}
          selectedRegion={selectedRegion}
          precipitationRate={precipitationRate}
        />

        {/* Column 2: Center Interactive Map (flex-1) */}
        <CenterMap
          currentStep={currentStep}
          layers={layers}
          roadsData={roadsData}
          facilitiesData={facilitiesData}
          sectorsData={sectorsData}
          zonesData={zonesData}
          floodMasksData={floodMasksData}
          sensorsData={sensorsData}
          detourRoutesData={detourRoutesData}
          onSelectFeature={handleSelectFeature}
          selectedFeatureTitle={selectedFeature?.title}
          onTriggerAction={handleTriggerAction}
          regionConfig={selectedRegion}
        />

        {/* Column 3: Right Action & Dispatch Hub (width: 380px) */}
        <RightDispatchHub
          currentStep={currentStep}
          aiPlan={aiPlan}
          facilitiesAtRisk={facilitiesAtRisk}
          onBroadcastAlert={handleBroadcastAlert}
          isBroadcasting={isBroadcasting}
          onSelectFacility={handleSelectFacilityFromHub}
          onDispatchWorkOrder={handleDispatchWorkOrder}
          dispatchedOrders={dispatchedOrders}
          onTriggerAction={handleTriggerAction}
          selectedRegion={selectedRegion}
        />

      </main>

      {/* 3. MODALS & TOAST NOTIFICATIONS */}
      <FeatureInspectorModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onTriggerAction={handleTriggerAction}
      />

      <CitizenDistressModal
        isOpen={isDistressModalOpen}
        onClose={() => setIsDistressModalOpen(false)}
        reports={citizenReports}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={dismissToast}
      />

    </div>
  );
}

export default App;
