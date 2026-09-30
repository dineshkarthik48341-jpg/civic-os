import React from 'react';
import { 
  X, 
  Radio, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  LifeBuoy,
  Search
} from 'lucide-react';
import { CitizenReportProperties } from '../types';

interface CitizenDistressModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: CitizenReportProperties[];
}

export const CitizenDistressModal: React.FC<CitizenDistressModalProps> = ({
  isOpen,
  onClose,
  reports
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-2xl bg-surface border border-zinc-700/80 rounded-xl shadow-[0_0_35px_rgba(0,0,0,0.8)] overflow-hidden text-slate-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-surface-border bg-surface-subtle flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-950/60 border border-red-500/50 text-red-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-red-400">
                Live 112 / GHMC Distress Queue
              </div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Citizen Emergency Distress Reports ({reports.length})
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

        {/* Reports List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {reports.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 font-mono text-sm">
              No active citizen distress calls recorded for this step.
            </div>
          ) : (
            reports.map((report) => (
              <div 
                key={report.id}
                className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-100">
                      {report.caller_name}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {report.phone_masked}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      report.urgency === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : report.urgency === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {report.urgency}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium mb-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{report.location_desc}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-red-400 font-mono">Depth: {report.water_depth_est}</span>
                </div>

                <p className="text-xs text-zinc-300 bg-zinc-950/60 p-2 rounded border border-zinc-800/80">
                  "{report.notes}"
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Reported: {report.timestamp_relative}</span>
                  </span>
                  <span>Category: <strong className="text-zinc-300">{report.category}</strong></span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-subtle border-t border-surface-border flex items-center justify-between">
          <div className="text-[10px] font-mono text-zinc-500">
            Emergency Response Patrol 108/DRF Interlinked
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-200 transition-colors"
          >
            Close Distress Queue
          </button>
        </div>

      </div>
    </div>
  );
};
