import React from 'react';
import { 
  X, 
  MapPin, 
  ShieldAlert, 
  Droplets, 
  Layers, 
  ExternalLink, 
  AlertOctagon, 
  CheckCircle2, 
  Activity,
  Phone
} from 'lucide-react';
import { FeatureInspectorData } from '../types';

interface FeatureInspectorModalProps {
  feature: FeatureInspectorData | null;
  onClose: () => void;
  onTriggerAction?: (actionName: string, assetName: string) => void;
}

export const FeatureInspectorModal: React.FC<FeatureInspectorModalProps> = ({
  feature,
  onClose,
  onTriggerAction
}) => {
  const [isActionTriggered, setIsActionTriggered] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsActionTriggered(false);
  }, [feature]);

  if (!feature) return null;

  const isSevered = feature.accessStatus.includes('SEVERED') || feature.accessStatus.includes('CUTOFF') || feature.accessStatus.includes('CRITICAL') || feature.accessStatus.includes('TRIPPED');
  const isImpeded = feature.accessStatus.includes('IMPEDED') || feature.accessStatus.includes('WARNING') || feature.accessStatus.includes('COMPROMISED');

  const getSectorIcon = (cat: string, title: string) => {
    const t = title.toLowerCase();
    const c = cat.toLowerCase();
    if (t.includes('substation') || c.includes('substation') || c.includes('power')) return '⚡';
    if (t.includes('water') || t.includes('pump') || c.includes('water') || c.includes('stp')) return '💧';
    if (t.includes('tower') || t.includes('telecom') || t.includes('cellular')) return '📡';
    if (t.includes('fire') || c.includes('fire')) return '🚒';
    if (t.includes('police') || t.includes('traffic') || c.includes('police')) return '👮';
    if (t.includes('shelter') || t.includes('stadium') || t.includes('palace') || t.includes('hall')) return '🏕️';
    if (t.includes('school') || t.includes('college') || c.includes('school')) return '🏫';
    if (t.includes('aged') || t.includes('senior') || c.includes('senior')) return '🧓';
    if (t.includes('metro') || c.includes('metro') || c.includes('portal')) return '🚇';
    if (t.includes('bridge') || t.includes('causeway') || t.includes('flyover') || t.includes('underpass')) return '🌉';
    return '🏢';
  };

  const sectorIcon = getSectorIcon(feature.category, feature.title);
  const actionLabel = feature.actionButtonLabel || (
    isSevered && feature.title.toLowerCase().includes('substation')
      ? 'Deploy Emergency Mobile Generator Crew'
      : isSevered && feature.title.toLowerCase().includes('underpass')
        ? 'Deploy 1200-GPM Mobile Dewatering Pump'
        : isSevered && feature.title.toLowerCase().includes('shelter')
          ? 'Activate Emergency Shelter Protocol'
          : isSevered 
            ? 'Dispatch Emergency Tactical Crew'
            : 'Initiate Telemetry Diagnostic'
  );

  const handleAction = () => {
    setIsActionTriggered(true);
    if (onTriggerAction) {
      onTriggerAction(actionLabel, feature.title);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-lg bg-surface border border-zinc-700/80 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-surface-border bg-surface-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border text-xl flex items-center justify-center ${
              isSevered 
                ? 'bg-red-950/60 border-red-500/50 text-red-400' 
                : isImpeded 
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-400' 
                  : 'bg-cyan-950/60 border-cyan-500/50 text-cyan-400'
            }`}>
              <span>{sectorIcon}</span>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                Spatial Feature Inspector // {feature.category}
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                {feature.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Metrics Strip */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-zinc-950 border-b border-zinc-800 font-mono">
          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">Operational Status Badge</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isSevered ? 'bg-red-500 animate-pulse' : isImpeded ? 'bg-amber-400' : 'bg-emerald-400'
              }`} />
              <span className={`text-xs font-extrabold uppercase ${
                isSevered ? 'text-red-400' : isImpeded ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {isSevered ? `🔴 ${feature.accessStatus}` : `🟢 ${feature.accessStatus}`}
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase">Inundation / Water Level</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Droplets className={`w-4 h-4 ${feature.inundationDepth > 0.4 ? 'text-red-400' : 'text-cyan-400'}`} />
              <span className="text-sm font-extrabold text-white">
                {feature.inundationDepth ? `${feature.inundationDepth.toFixed(2)}m` : '0.00m (Dry)'}
              </span>
            </div>
          </div>
        </div>

        {/* Dependent Assets Impacted */}
        {((feature.dependentAssets && feature.dependentAssets.length > 0) || feature.impactedFacility) && (
          <div className="p-4 border-b border-zinc-800/80 bg-red-950/15">
            <div className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
              <span>DEPENDENT ASSETS IMPACTED</span>
            </div>
            
            {feature.dependentAssets && feature.dependentAssets.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {feature.dependentAssets.map((asset, i) => (
                  <span 
                    key={i}
                    className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 text-red-300 border border-red-800/60"
                  >
                    ⚡ {asset}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-semibold text-zinc-200">
                {feature.impactedFacility}
              </p>
            )}
          </div>
        )}

        {/* Detailed Attribute Key-Values */}
        <div className="p-4 max-h-[180px] overflow-y-auto space-y-1.5 font-sans">
          {Object.entries(feature.details || {}).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between text-xs py-1 border-b border-zinc-800/60">
              <span className="text-zinc-400 font-mono">{key}</span>
              <span className="font-semibold text-zinc-200 text-right max-w-[280px] truncate">
                {String(val)}
              </span>
            </div>
          ))}

          {feature.contact && (
            <div className="flex items-center justify-between text-xs py-1 border-b border-zinc-800/60">
              <span className="text-zinc-400 font-mono">Emergency Hotline</span>
              <span className="font-mono font-bold text-cyan-400 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {feature.contact}
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions: Interactive Action Button */}
        <div className="p-3 bg-surface-subtle border-t border-surface-border flex items-center justify-between gap-3">
          <button
            onClick={handleAction}
            disabled={isActionTriggered}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
              isActionTriggered
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : isSevered
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)] active:scale-[0.98]'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)] active:scale-[0.98]'
            }`}
          >
            {isActionTriggered ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>ACTION EXECUTED // EN ROUTE</span>
              </>
            ) : (
              <>
                <span>[{actionLabel}]</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-200 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
