import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Zap, 
  Train, 
  Truck, 
  ArrowDown, 
  ChevronRight, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Send,
  Droplets,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  Activity,
  Layers,
  Radio
} from 'lucide-react';
import { CascadingImpactChain, ScenarioStep } from '../types';

interface CascadingImpactPipelineProps {
  currentStep: ScenarioStep;
  cascadingChain?: CascadingImpactChain;
  onTriggerAction?: (actionName: string, assetName: string) => void;
  onSelectFeatureByName?: (name: string) => void;
}

export const CascadingImpactPipeline: React.FC<CascadingImpactPipelineProps> = ({
  currentStep,
  cascadingChain,
  onTriggerAction,
  onSelectFeatureByName
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  // Default chain data for Step 2 fallback
  const defaultStep2Nodes = [
    {
      id: 'node-1',
      title: 'Rain Inundation',
      icon: 'rain',
      status: 'CRITICAL',
      desc: 'Khairatabad Underpass reaches 0.85m flood depth; Anand Nagar nala surcharge overflow.',
      impact_level: 'SEVERE',
      time_relative: 'T+35 min',
      asset_target: 'Khairatabad Low-Lying Underpass'
    },
    {
      id: 'node-2',
      title: 'Substation Tripped',
      icon: 'power',
      status: 'TRIPPED',
      desc: 'Power Substation Sub-02 (Mint Compound 33kV) TRIPPED due to basement transformer flooding.',
      impact_level: 'CRITICAL',
      action: 'Deploy Emergency Mobile Generator Crew',
      time_relative: 'T+42 min',
      asset_target: 'Mint Compound Substation'
    },
    {
      id: 'node-3',
      title: 'Metro Power Cut',
      icon: 'metro',
      status: 'POWER_LOSS',
      desc: 'Lakdikapul Metro Station set to POWER LOSS / ESCALATORS STOPPED (120 commuters sheltered on concourse).',
      impact_level: 'HIGH',
      action: 'Activate Skywalk Emergency Lighting',
      time_relative: 'T+46 min',
      asset_target: 'Lakdikapul Metro Station Entrance B'
    },
    {
      id: 'node-4',
      title: 'Traffic Gridlock',
      icon: 'traffic',
      status: 'DARK_SIGNALS',
      desc: 'Street signals at Raj Bhavan Junction DARK / SEVERE GRIDLOCK (Traffic speed < 4 km/h).',
      impact_level: 'HIGH',
      action: 'Deploy Traffic Police Manual Cordons',
      time_relative: 'T+51 min',
      asset_target: 'Hyderabad Traffic Command Center'
    },
    {
      id: 'node-5',
      title: 'Critical Route Delayed',
      icon: 'ambulance',
      status: 'DELAYED',
      desc: 'Delayed Ambulance Transit to Osmania General Hospital (+22 min detour via North Bypass).',
      impact_level: 'EMERGENCY_CRITICAL',
      action: 'Enforce Green Detour Corridor',
      time_relative: 'T+55 min',
      asset_target: 'Osmania General Hospital'
    }
  ];

  const nodes = cascadingChain?.chain_nodes || defaultStep2Nodes;
  const isStep2 = currentStep === 2;

  const handleActionClick = (actionName: string, assetName: string, keyId: string) => {
    setCompletedActions((prev) => new Set([...prev, keyId]));
    if (onTriggerAction) {
      onTriggerAction(actionName, assetName);
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'rain': return '🌧️';
      case 'power': return '⚡';
      case 'metro': return '🚇';
      case 'traffic': return '🚦';
      case 'ambulance': return '🚑';
      default: return '⚠️';
    }
  };

  return (
    <div className="border-b border-surface-border bg-gradient-to-b from-red-950/20 via-zinc-950 to-zinc-950 overflow-hidden select-none">
      
      {/* Header bar with expand toggle */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3 bg-red-950/30 hover:bg-red-950/40 cursor-pointer border-b border-red-900/30 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-300">
                Cascading Impact Chain Engine
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold">
                {isStep2 ? 'ACTIVE COLLAPSE' : currentStep === 1 ? 'SURGE WARNING' : 'STANDBY'}
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-sans mt-0.5 truncate max-w-[280px]" title={cascadingChain?.trigger_node}>
              {cascadingChain?.trigger_node 
                ? `Trigger: ${cascadingChain.trigger_node}`
                : isStep2 
                  ? 'Active Fluvial Breach ➔ Infrastructure Propagation'
                  : currentStep === 1
                    ? 'Runoff surge approaching critical threshold'
                    : 'All municipal dependency nodes nominal'}
            </p>
          </div>
        </div>

        <button className="text-zinc-400 hover:text-white p-1">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="p-3 space-y-3">
          
          {/* Visual Node-Link Flowchart Sequence Pills */}
          <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-red-900/40 shadow-inner">
            <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Failure Propagation Vector</span>
              <span className="text-red-400 font-bold">T+35m ➔ T+60m</span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono font-bold overflow-x-auto pb-1 scrollbar-none">
              {nodes.map((node: any, idx: number) => (
                <React.Fragment key={node.id || idx}>
                  <div className="flex items-center gap-1 bg-red-950/60 text-red-300 px-2 py-1 rounded border border-red-800/60 flex-shrink-0">
                    <span>{getNodeIcon(node.icon)} {node.title}</span>
                  </div>
                  {idx < nodes.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-red-500 flex-shrink-0 animate-pulse" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sequential Chain Reactions */}
          <div className="space-y-2">
            {nodes.map((node: any, idx: number) => {
              const actionKey = `action-node-${node.id || idx}`;
              const isActionDone = completedActions.has(actionKey);

              return (
                <div key={node.id || idx} className="relative">
                  {/* Step Card */}
                  <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-red-500/50 transition-all">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{getNodeIcon(node.icon)}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-zinc-100 font-mono">
                              Step {idx + 1}: {node.title}
                            </span>
                            {node.time_relative && (
                              <span className="text-[9px] font-mono text-zinc-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                                {node.time_relative}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                        {node.status}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-300 leading-relaxed font-sans mb-2">
                      {node.desc}
                    </p>

                    {/* Node Specific Direct Action Trigger */}
                    {node.action && (
                      <div className="pt-1.5 border-t border-zinc-800/80 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[190px]">
                          Trigger: {node.action}
                        </span>

                        <button
                          onClick={() => handleActionClick(node.action, node.asset_target || node.title, actionKey)}
                          disabled={isActionDone}
                          className={`px-2 py-1 rounded text-[10px] font-mono font-bold transition-all flex items-center gap-1 ${
                            isActionDone
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                              : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_8px_rgba(239,68,68,0.4)] active:scale-95'
                          }`}
                        >
                          {isActionDone ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>DEPLOYED</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3" />
                              <span>TRIGGER</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Down Connector Arrow if not last node */}
                  {idx < nodes.length - 1 && (
                    <div className="flex justify-center -my-1 py-0.5">
                      <div className="w-0.5 h-3 bg-gradient-to-b from-red-500 to-amber-500 opacity-60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Automated System Recommendations */}
          <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800">
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Automated Disaster Mitigations</span>
            </div>

            <div className="space-y-1.5">
              <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-300">
                  🏕️ Activate Red Rose Palace Shelter & Kotla Indoor Stadium
                </span>
                <button
                  onClick={() => handleActionClick('Activate Shelter', 'Red Rose Palace & Kotla Stadium', 'shelter-activate')}
                  disabled={completedActions.has('shelter-activate')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase ${
                    completedActions.has('shelter-activate')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {completedActions.has('shelter-activate') ? 'ACTIVATED' : 'ACTIVATE'}
                </button>
              </div>

              <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-300">
                  💧 Dispatch 1200-GPM mobile pump unit to Substation Sub-02
                </span>
                <button
                  onClick={() => handleActionClick('Dispatch 1200-GPM Dewatering Pump', 'Mint Compound Substation', 'pump-sub02')}
                  disabled={completedActions.has('pump-sub02')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase ${
                    completedActions.has('pump-sub02')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-600 hover:bg-cyan-500 text-white'
                  }`}
                >
                  {completedActions.has('pump-sub02') ? 'EN ROUTE' : 'DISPATCH'}
                </button>
              </div>

              <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-300">
                  ⚡ Deploy Emergency Mobile Generator Crew (1500kVA)
                </span>
                <button
                  onClick={() => handleActionClick('Deploy Mobile Generator', 'Mint Compound Substation', 'gen-crew')}
                  disabled={completedActions.has('gen-crew')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase ${
                    completedActions.has('gen-crew')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-600 hover:bg-red-500 text-white'
                  }`}
                >
                  {completedActions.has('gen-crew') ? 'DISPATCHED' : 'DEPLOY'}
                </button>
              </div>

              <div className="p-2 rounded bg-zinc-950/80 border border-zinc-800/80 flex items-center justify-between gap-2">
                <span className="text-[11px] text-zinc-300">
                  🚑 Enforce Green Corridor Detour via Banjara Hills Rd 1
                </span>
                <button
                  onClick={() => handleActionClick('Enforce Green Detour Corridor', 'Banjara Hills Rd 1', 'green-corridor')}
                  disabled={completedActions.has('green-corridor')}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold uppercase ${
                    completedActions.has('green-corridor')
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {completedActions.has('green-corridor') ? 'ENFORCED' : 'ENFORCE'}
                </button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
