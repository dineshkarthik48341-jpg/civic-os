import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Satellite, 
  CloudRain, 
  MapPin, 
  Clock, 
  Volume2, 
  VolumeX, 
  Radio, 
  ChevronDown,
  Navigation,
  Globe2
} from 'lucide-react';
import { ScenarioStep, RegionId, RegionConfig } from '../types';

interface TopNavbarProps {
  currentStep: ScenarioStep;
  precipitationRate: number;
  selectedRegion: RegionConfig;
  regionList: RegionConfig[];
  onSelectRegion: (id: RegionId) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenDistressModal: () => void;
  pendingDistressCount: number;
  totalBroadcastsCount: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentStep,
  precipitationRate,
  selectedRegion,
  regionList,
  onSelectRegion,
  isAudioMuted,
  onToggleAudio,
  onOpenDistressModal,
  pendingDistressCount,
  totalBroadcastsCount
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 border-b border-surface-border bg-surface px-3 sm:px-4 flex items-center justify-between z-30 select-none relative">
      
      {/* 1. Left: Branding & High-Contrast Live Badge */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-base text-slate-100 font-mono">
                CivicOS
              </span>
              <span className="text-[11px] text-cyan-400/90 font-mono tracking-wide hidden sm:inline px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/30">
                SOUTH INDIA COMMAND
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5">
              Hub: {selectedRegion.name}
            </div>
          </div>
        </div>

        {/* Live Satellite Status Pill */}
        <div className="hidden xl:flex items-center gap-2 ml-2 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono shadow-[0_0_10px_rgba(6,182,212,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <Satellite className="w-3.5 h-3.5 text-cyan-400" />
          <span>SAR // SATELLITE LIVE</span>
        </div>
      </div>

      {/* 2. Center: Top Bar Region Switcher (Pills & Dropdown) */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Label: State / Disaster Hub */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Disaster Hub:</span>
        </div>

        {/* Interactive Region Switcher Pills */}
        <div className="flex items-center bg-zinc-900/90 p-1 rounded-lg border border-zinc-800 shadow-inner">
          {regionList.map((region) => {
            const isActive = selectedRegion.id === region.id;
            return (
              <button
                key={region.id}
                onClick={() => onSelectRegion(region.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/40'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
                title={`Switch viewport & datasets to ${region.name} (${region.state})`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <span>{region.label}</span>
              </button>
            );
          })}
        </div>

        {/* Precipitation Rate Gauge */}
        <div className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded border text-xs font-mono transition-all duration-300 ${
          precipitationRate > 60 
            ? 'bg-red-950/40 border-red-500/50 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]' 
            : precipitationRate > 30 
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300' 
              : 'bg-zinc-900 border-zinc-800 text-zinc-400'
        }`}>
          <CloudRain className={`w-3.5 h-3.5 ${precipitationRate > 60 ? 'text-red-400 animate-bounce' : precipitationRate > 0 ? 'text-amber-400' : 'text-zinc-500'}`} />
          <span className="hidden lg:inline text-[11px]">PRECIP:</span>
          <span className="font-bold text-xs">
            {precipitationRate} mm/hr
          </span>
          {precipitationRate > 60 && (
            <span className="text-[9px] px-1 rounded bg-red-500/20 text-red-400 font-extrabold uppercase animate-pulse">
              SURGE
            </span>
          )}
        </div>

      </div>

      {/* 3. Right: Timestamp, Citizen Distress Alerts & Audio Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Citizen SOS Quick Badge */}
        <button
          onClick={onOpenDistressModal}
          className="relative flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
          title="Citizen Distress Emergency Reports"
        >
          <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          <span className="hidden sm:inline">SOS</span>
          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
            pendingDistressCount > 0 ? 'bg-red-500 text-white animate-pulse' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {pendingDistressCount}
          </span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleAudio}
          className={`p-1.5 rounded border text-xs transition-colors ${
            isAudioMuted 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300' 
              : 'bg-cyan-950/30 border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/50 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
          }`}
          title={isAudioMuted ? 'Unmute Emergency Siren Audio' : 'Mute Emergency Audio'}
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Current Time Clock */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{timeStr || 'LIVE SYNC'}</span>
        </div>
      </div>
    </header>
  );
};
