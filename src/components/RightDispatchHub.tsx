import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  Cpu, 
  CheckCircle2, 
  Hospital, 
  Train, 
  Truck, 
  ShieldAlert, 
  Smartphone, 
  MessageSquare, 
  Check, 
  Clock, 
  TrendingUp, 
  Building2,
  ExternalLink,
  Zap
} from 'lucide-react';
import { CascadingImpactPipeline } from './CascadingImpactPipeline';
import { 
  ScenarioStep, 
  AIDispatchPlan, 
  DewateringWorkOrder,
  FeatureInspectorData,
  RegionConfig
} from '../types';

interface RightDispatchHubProps {
  currentStep: ScenarioStep;
  aiPlan: AIDispatchPlan | null;
  facilitiesAtRisk: any[];
  onBroadcastAlert: (message: string) => void;
  isBroadcasting: boolean;
  onSelectFacility: (facility: any) => void;
  onDispatchWorkOrder: (orderId: string) => void;
  dispatchedOrders: Set<string>;
  onTriggerAction?: (actionName: string, assetName: string) => void;
  selectedRegion: RegionConfig;
}

export const RightDispatchHub: React.FC<RightDispatchHubProps> = ({
  currentStep,
  aiPlan,
  facilitiesAtRisk,
  onBroadcastAlert,
  isBroadcasting,
  onSelectFacility,
  onDispatchWorkOrder,
  dispatchedOrders,
  onTriggerAction,
  selectedRegion
}) => {
  const [alertTab, setAlertTab] = useState<'sms_en' | 'sms_regional' | 'whatsapp'>('sms_en');
  const [broadcastDone, setBroadcastDone] = useState<boolean>(false);

  // Dynamic Risk Score from active region config
  const riskScore = currentStep === 0 
    ? selectedRegion.step0Risk 
    : currentStep === 1 
      ? selectedRegion.step1Risk 
      : selectedRegion.step2Risk;
  const isCritical = riskScore >= 80;
  const isHigh = riskScore >= 50 && riskScore < 80;

  // SVG Radial Gauge Calculations
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  const handleBroadcast = () => {
    if (!aiPlan) return;
    const msg = alertTab === 'sms_regional' 
      ? (aiPlan.citizen_broadcast.sms_telugu || aiPlan.citizen_broadcast.sms_english) 
      : aiPlan.citizen_broadcast.sms_english;
    
    onBroadcastAlert(msg);
    setBroadcastDone(true);
    setTimeout(() => setBroadcastDone(false), 4000);
  };

  return (
    <aside className="w-[380px] h-[calc(100vh-3.5rem)] bg-surface border-l border-surface-border flex flex-col flex-shrink-0 select-none overflow-y-auto text-slate-200 relative z-10">
      
      {/* 1. WARD RISK INDEX RADIAL GAUGE */}
      <div className="p-3.5 border-b border-surface-border bg-surface-subtle">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
              Ward Risk Index
            </h2>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 truncate max-w-[180px]" title={selectedRegion.worstWard}>
            {selectedRegion.stateCode} // {selectedRegion.worstWard.split('(')[0].trim()}
          </span>
        </div>

        <div className="flex items-center gap-4 bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
          {/* Radial SVG Gauge */}
          <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-zinc-800"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                className={`transition-all duration-1000 ease-out ${
                  isCritical 
                    ? 'stroke-red-500 shadow-[0_0_12px_#ef4444]' 
                    : isHigh 
                      ? 'stroke-amber-400 shadow-[0_0_10px_#f59e0b]' 
                      : 'stroke-cyan-500 shadow-[0_0_8px_#06b6d4]'
                }`}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-xl font-bold font-mono tracking-tight ${
                isCritical ? 'text-red-400' : isHigh ? 'text-amber-300' : 'text-cyan-300'
              }`}>
                {riskScore}%
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest -mt-0.5">
                VULN
              </span>
            </div>
          </div>

          {/* Metric Details */}
          <div className="flex-1 space-y-1 font-mono text-xs">
            <div className="flex items-center justify-between pb-1 border-b border-zinc-800">
              <span className="text-zinc-400 text-[11px]">Threat Tier:</span>
              <span className={`font-bold text-[11px] px-1.5 py-0.2 rounded ${
                isCritical 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' 
                  : isHigh 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isCritical ? 'CATASTROPHIC' : isHigh ? 'HIGH ALERT' : 'MONITORING'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-zinc-400">Worst Ward:</span>
              <span className="text-zinc-200 font-semibold truncate max-w-[120px]" title={selectedRegion.worstWard}>
                {selectedRegion.worstWard}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-400">Basin Inflow:</span>
              <span className="text-amber-300 font-semibold truncate max-w-[120px]" title={selectedRegion.damDischarge}>
                {selectedRegion.damDischarge.split(':')[1]?.trim() || selectedRegion.damDischarge}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CASCADING IMPACT FAILURE PIPELINE */}
      <div className="p-3.5 border-b border-surface-border">
        <CascadingImpactPipeline
          currentStep={currentStep}
          cascadingChain={aiPlan?.cascading_impact_chain}
          onTriggerAction={onTriggerAction}
          onSelectFeatureByName={onSelectFacility}
        />
      </div>

      {/* 3. STRUCTURED DEWATERING & PUMP ALLOCATIONS */}
      <div className="p-3.5 border-b border-surface-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
              Emergency Work Orders ({(aiPlan?.dewatering_work_orders || []).length})
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
            AI Automated
          </span>
        </div>

        <div className="space-y-2">
          {(!aiPlan?.dewatering_work_orders || aiPlan.dewatering_work_orders.length === 0) && (
            <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 text-center text-xs text-zinc-500 font-mono">
              All hydraulic nodes operating within nominal thresholds. 0 work orders pending.
            </div>
          )}

          <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
            {(aiPlan?.dewatering_work_orders || []).map((order) => {
              const isDispatched = dispatchedOrders.has(order.order_id);
              const isCritical = order.priority === 'EMERGENCY_CRITICAL';

              return (
                <div
                  key={order.order_id}
                  className={`p-2.5 rounded-lg border transition-all ${
                    isDispatched
                      ? 'bg-emerald-950/20 border-emerald-800/40'
                      : isCritical
                        ? 'bg-red-950/20 border-red-800/50 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
                        : 'bg-zinc-900/80 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-xs text-zinc-200">
                        {order.order_id}
                      </span>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isCritical
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {order.priority.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {order.eta_minutes}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-zinc-100 truncate mb-0.5">
                    {order.target_asset}
                  </div>

                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {order.action}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                    <div className="flex items-center gap-1 truncate max-w-[200px]">
                      <Truck className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      <span className="truncate">{order.equipment}</span>
                    </div>

                    <button
                      onClick={() => onDispatchWorkOrder(order.order_id)}
                      disabled={isDispatched}
                      className={`px-2 py-1 rounded font-mono font-bold text-[10px] uppercase transition-all flex items-center gap-1 ${
                        isDispatched
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 cursor-default'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_8px_rgba(6,182,212,0.3)] active:scale-95'
                      }`}
                    >
                      {isDispatched ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>EN ROUTE</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3 h-3" />
                          <span>DISPATCH</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. AUTOMATED CITIZEN MOBILE ALERT PREVIEW */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-slate-300">
                Citizen Mobile Alert Broadcast
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              {currentStep === 2 ? '58,000 Target' : currentStep === 1 ? '24,000 Target' : '0 Standby'}
            </span>
          </div>

          {/* Sub-channel Tab Selector */}
          <div className="flex items-center gap-1 p-0.5 rounded bg-zinc-900 border border-zinc-800 mb-2 text-[10px] font-mono">
            <button
              onClick={() => setAlertTab('sms_en')}
              className={`flex-1 py-1 rounded transition-colors ${
                alertTab === 'sms_en' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              SMS (EN)
            </button>
            <button
              onClick={() => setAlertTab('sms_regional')}
              className={`flex-1 py-1 rounded transition-colors truncate px-1 ${
                alertTab === 'sms_regional' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
              title={`SMS in ${selectedRegion.regionalLanguageLabel}`}
            >
              SMS ({selectedRegion.regionalLanguageLabel.split(' ')[0]})
            </button>
            <button
              onClick={() => setAlertTab('whatsapp')}
              className={`flex-1 py-1 rounded transition-colors ${
                alertTab === 'whatsapp' ? 'bg-cyan-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              WhatsApp
            </button>
          </div>

          {/* Smartphone Styled Card Preview */}
          <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-700/80 shadow-inner relative overflow-hidden font-sans">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider truncate max-w-[240px]">
                  {selectedRegion.name.toUpperCase()} EMERGENCY BROADCAST
                </span>
              </div>
              <span className="text-[9px] font-mono text-zinc-500">NOW</span>
            </div>

            <div className="text-xs text-zinc-200 leading-relaxed font-sans min-h-[70px]">
              {alertTab === 'sms_en' && (
                <p>
                  {aiPlan?.citizen_broadcast?.sms_english ||
                    `CIVIC FLOOD ADVISORY: Flash flooding reported in ${selectedRegion.name}. Follow safe high ground bypass. Emergency helpline: ${selectedRegion.emergencyContact}.`}
                </p>
              )}
              {alertTab === 'sms_regional' && (
                <p className="font-sans leading-normal">
                  {aiPlan?.citizen_broadcast?.sms_telugu ||
                    aiPlan?.citizen_broadcast?.sms_english}
                </p>
              )}
              {alertTab === 'whatsapp' && (
                <div className="whitespace-pre-line font-mono text-[11px] text-zinc-300">
                  {aiPlan?.citizen_broadcast?.whatsapp_card ||
                    `🚨 *CIVICOS FLOOD EMERGENCY ALERT*\n\n📍 Sector: ${selectedRegion.name}\n🌊 Risk: Inundation along ${selectedRegion.primaryBasin}\n📞 Helpline: ${selectedRegion.emergencyContact}`}
                </div>
              )}
            </div>

            <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[9px] font-mono text-zinc-500">
              <span>Geofence: <strong>{aiPlan?.citizen_broadcast?.geofence_radius_km || 4.5} km radius</strong></span>
              <span>Cell Broadcast: <strong>{selectedRegion.stateCode} Grid Towers</strong></span>
            </div>
          </div>
        </div>

        {/* Action Button: Approve & Broadcast Geofenced Alerts */}
        <div className="mt-3">
          <button
            onClick={handleBroadcast}
            disabled={isBroadcasting || broadcastDone}
            className={`w-full py-2.5 px-3 rounded-lg font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg ${
              broadcastDone
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] disabled:opacity-50'
            }`}
          >
            {isBroadcasting ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>BROADCASTING TO GATEWAYS...</span>
              </>
            ) : broadcastDone ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                <span>ALERTS TRANSMITTED TO CITIZENS!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                <span>[Broadcast Warning] (Approve & Geofence)</span>
              </>
            )}
          </button>
        </div>

      </div>

    </aside>
  );
};
