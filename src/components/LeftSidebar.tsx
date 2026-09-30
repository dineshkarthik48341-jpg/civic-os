import React from 'react';
import { 
  Play, 
  RotateCcw, 
  Layers, 
  Activity, 
  Droplets, 
  ShieldCheck, 
  AlertOctagon, 
  Zap, 
  CheckSquare, 
  Square,
  Navigation,
  Crosshair,
  Gauge,
  Hospital,
  Train,
  Waves,
  Dam,
  Compass,
  AlertTriangle,
  PhoneCall
} from 'lucide-react';
import { ScenarioStep, LayerVisibility, SensorProperties, RegionConfig } from '../types';

interface LeftSidebarProps {
  currentStep: ScenarioStep;
  onSelectStep: (step: ScenarioStep) => void;
  onSimulateCloudburst: () => void;
  isSimulating: boolean;
  layers: LayerVisibility;
  onToggleLayer: (layerKey: keyof LayerVisibility) => void;
  sensors: SensorProperties[];
  onSelectSensor: (sensor: SensorProperties) => void;
  selectedSensorId?: string;
  selectedRegion: RegionConfig;
  precipitationRate: number;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  currentStep,
  onSelectStep,
  onSimulateCloudburst,
  isSimulating,
  layers,
  onToggleLayer,
  sensors,
  onSelectSensor,
  selectedSensorId,
  selectedRegion,
  precipitationRate
}) => {
  const currentRisk = currentStep === 0 
    ? selectedRegion.step0Risk 
    : currentStep === 1 
      ? selectedRegion.step1Risk 
      : selectedRegion.step2Risk;

  return (
    <aside className="w-[320px] h-[calc(100vh-3.5rem)] bg-surface border-r border-surface-border flex flex-col flex-shrink-0 select-none overflow-hidden text-slate-200 relative z-10">
      
      {/* 1. DYNAMIC REGIONAL HYDROLOGICAL & BASIN CARD */}
      <div className="p-3 border-b border-surface-border bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-cyan-400" />
            <h2 className="text-[11px] font-mono font-bold tracking-wider uppercase text-cyan-300">
              River Basin Telemetry
            </h2>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-bold">
            {selectedRegion.stateCode} // HUB
          </span>
        </div>

        {/* River & Basin Name */}
        <div className="p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 mb-2">
          <div className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
            Active Drainage Basin
          </div>
          <div className="text-xs font-bold text-slate-100 flex items-center justify-between mt-0.5">
            <span>{selectedRegion.primaryBasin}</span>
          </div>
        </div>

        {/* Hydrological Metrics Grid: Dam Discharge & Worst Ward */}
        <div className="grid grid-cols-2 gap-1.5 text-xs font-mono mb-2">
          <div className="p-2 rounded bg-zinc-900/70 border border-zinc-800/80 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
              <Dam className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              <span className="truncate">Dam Spillway</span>
            </div>
            <div className="text-[11px] font-bold text-amber-300 truncate mt-1" title={selectedRegion.damDischarge}>
              {selectedRegion.damDischarge}
            </div>
          </div>

          <div className="p-2 rounded bg-zinc-900/70 border border-zinc-800/80 flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[10px] text-zinc-400">
              <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
              <span className="truncate">Worst Ward Risk</span>
            </div>
            <div className="text-[11px] font-bold text-red-400 truncate mt-1 flex items-center justify-between">
              <span>{currentRisk}%</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold ${
                currentRisk > 80 ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {currentRisk > 80 ? 'CRITICAL' : currentRisk > 50 ? 'SURGE' : 'WATCH'}
              </span>
            </div>
          </div>
        </div>

        {/* Helpline & Worst Ward Tag */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded bg-zinc-950 border border-zinc-800/60 text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-1 truncate max-w-[170px]" title={selectedRegion.worstWard}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping flex-shrink-0" />
            <span className="truncate text-zinc-300">{selectedRegion.worstWard}</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400 flex-shrink-0">
            <PhoneCall className="w-3 h-3" />
            <span className="text-[10px]">{selectedRegion.emergencyContact.split('/')[0].trim()}</span>
          </div>
        </div>
      </div>

      {/* 2. SCENARIO PROGRESSION CONTROLLER */}
      <div className="p-3 border-b border-surface-border bg-surface-subtle">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
              Scenario Progression
            </h2>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            STEP {currentStep} / 2
          </span>
        </div>

        {/* Step Buttons */}
        <div className="space-y-1.5 mb-2.5">
          {/* Step 0: Normal */}
          <button
            onClick={() => onSelectStep(0)}
            className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2 ${
              currentStep === 0
                ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)] text-white'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
            }`}
          >
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
              currentStep === 0 ? 'bg-cyan-400 shadow-[0_0_6px_#06b6d4]' : 'bg-zinc-600'
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">
                  Step 0: Normal Conditions
                </span>
                <span className="text-[10px] font-mono px-1 rounded bg-zinc-800/80 text-emerald-400">
                  T + 00
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                Clear arteries, drains &lt; 35%, 0 critical alerts
              </p>
            </div>
          </button>

          {/* Step 1: Cloudburst Influx */}
          <button
            onClick={() => onSelectStep(1)}
            className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2 ${
              currentStep === 1
                ? 'bg-amber-950/40 border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.2)] text-white'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
            }`}
          >
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
              currentStep === 1 ? 'bg-amber-400 shadow-[0_0_6px_#f59e0b]' : 'bg-zinc-600'
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide">
                  Step 1: Cloudburst Influx
                </span>
                <span className="text-[10px] font-mono px-1 rounded bg-zinc-800/80 text-amber-400">
                  T + 30m
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                Drains &gt; 75%, localized waterlogging reported
              </p>
            </div>
          </button>

          {/* Step 2: SAR Satellite Detection */}
          <button
            onClick={() => onSelectStep(2)}
            className={`w-full text-left p-2 rounded-lg border transition-all flex items-start gap-2 ${
              currentStep === 2
                ? 'bg-red-950/40 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.25)] text-white'
                : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-200'
            }`}
          >
            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
              currentStep === 2 ? 'bg-red-500 shadow-[0_0_8px_#ef4444] animate-ping' : 'bg-zinc-600'
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-red-300">
                  Step 2: SAR Satellite Detection
                </span>
                <span className="text-[10px] font-mono px-1 rounded bg-red-950/80 text-red-400 border border-red-800/50">
                  T + 60m
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">
                Fluvial breach extent, primary transit severed
              </p>
            </div>
          </button>
        </div>

        {/* One-Click Action Trigger */}
        <button
          onClick={onSimulateCloudburst}
          disabled={isSimulating}
          className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <RotateCcw className="w-4 h-4 animate-spin" />
              <span>SYNTHESIZING RADAR & SENSORS...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Simulate Cloudburst Influx</span>
            </>
          )}
        </button>
      </div>

      {/* 3. MULTI-LAYER SPATIAL TOGGLES */}
      <div className="p-3 border-b border-surface-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
              Map Layers
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">11 Layers</span>
        </div>

        <div className="grid grid-cols-1 gap-1 text-xs font-sans max-h-36 overflow-y-auto pr-1">
          {/* Tri-Color Disaster Zones */}
          <label 
            onClick={() => onToggleLayer('disasterZones')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              <span className={layers.disasterZones ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                Tri-Color Disaster Zones (R/O/B)
              </span>
            </div>
            {layers.disasterZones ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Sector 1: Utilities */}
          <label 
            onClick={() => onToggleLayer('utilitiesSector')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className={layers.utilitiesSector ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                Utilities (Substations, Water, Sluice)
              </span>
            </div>
            {layers.utilitiesSector ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Sector 2: Emergency Services */}
          <label 
            onClick={() => onToggleLayer('emergencyServicesSector')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className={layers.emergencyServicesSector ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                Emergency Services & Relief Posts
              </span>
            </div>
            {layers.emergencyServicesSector ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Sector 3: Sensitive Populations */}
          <label 
            onClick={() => onToggleLayer('vulnerablePopulationsSector')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-purple-400 text-xs">🏫</span>
              <span className={layers.vulnerablePopulationsSector ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                Sensitive Populations & Shelters
              </span>
            </div>
            {layers.vulnerablePopulationsSector ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Sector 4: Transport Bottlenecks */}
          <label 
            onClick={() => onToggleLayer('transportBottlenecksSector')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-teal-400 text-xs">🚇</span>
              <span className={layers.transportBottlenecksSector ? 'text-zinc-200 font-medium' : 'text-zinc-500'}>
                Transit Portals & Choke Points
              </span>
            </div>
            {layers.transportBottlenecksSector ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Satellite SAR Inundation Mask */}
          <label 
            onClick={() => onToggleLayer('floodMasks')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500 inline-block shadow-[0_0_6px_rgba(239,68,68,0.4)]" />
              <span className={layers.floodMasks ? 'text-zinc-200' : 'text-zinc-500'}>
                Satellite SAR Inundation Mask
              </span>
            </div>
            {layers.floodMasks ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Road Artery Network & Severed Corridors */}
          <label 
            onClick={() => onToggleLayer('roadNetwork')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-amber-400 inline-block" />
              <span className={layers.roadNetwork ? 'text-zinc-200' : 'text-zinc-500'}>
                Road Arteries & Severed Corridors
              </span>
            </div>
            {layers.roadNetwork ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Telemetry Drainage Sensors */}
          <label 
            onClick={() => onToggleLayer('drainageSensors')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Droplets className="w-3.5 h-3.5 text-cyan-400" />
              <span className={layers.drainageSensors ? 'text-zinc-200' : 'text-zinc-500'}>
                Telemetry Drainage Sensors
              </span>
            </div>
            {layers.drainageSensors ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>

          {/* Evacuation & Ambulance Routes */}
          <label 
            onClick={() => onToggleLayer('emergencyRoutes')}
            className="flex items-center justify-between p-1.5 rounded hover:bg-zinc-900 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span className={layers.emergencyRoutes ? 'text-zinc-200' : 'text-zinc-500'}>
                Evacuation & Ambulance Routes
              </span>
            </div>
            {layers.emergencyRoutes ? (
              <CheckSquare className="w-4 h-4 text-cyan-400" />
            ) : (
              <Square className="w-4 h-4 text-zinc-600" />
            )}
          </label>
        </div>
      </div>

      {/* 4. TELEMETRY DRAINAGE SENSORS FEED */}
      <div className="flex-1 flex flex-col min-h-0 p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Regional Telemetry ({sensors.length})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Live IoT</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {sensors.map((sensor) => {
            const isSelected = selectedSensorId === sensor.id;
            const isCritical = sensor.level_pct >= 90;
            const isWarning = sensor.level_pct >= 70 && sensor.level_pct < 90;

            return (
              <div
                key={sensor.id}
                onClick={() => onSelectSensor(sensor)}
                className={`p-2 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-800 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                    : isCritical
                      ? 'bg-red-950/20 border-red-800/40 hover:bg-red-950/30'
                      : isWarning
                        ? 'bg-amber-950/20 border-amber-800/40 hover:bg-amber-950/30'
                        : 'bg-zinc-900/60 border-zinc-800/60 hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-zinc-200">
                      {sensor.code}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono truncate max-w-[120px]">
                      {sensor.ward}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isCritical
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                      : isWarning
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {sensor.level_pct}%
                  </span>
                </div>

                <div className="text-[11px] text-zinc-400 truncate mb-1">
                  {sensor.name}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mb-1">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isCritical ? 'bg-red-500 shadow-[0_0_6px_#ef4444]' : isWarning ? 'bg-amber-400' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${Math.min(sensor.level_pct, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>Depth: <strong className="text-zinc-300">{sensor.depth_m.toFixed(2)}m</strong></span>
                  <span>Flow: <strong className="text-zinc-300">{sensor.flow_rate_lps} L/s</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </aside>
  );
};
