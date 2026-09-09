import { ShieldCheck, WarningOctagon, Truck, Gauge, Question } from '@phosphor-icons/react';
import type { ManifestPreset } from '../types/scanner';

interface IndustrialHeaderProps {
  presets: ManifestPreset[];
  activePresetId: string;
  onSelectPreset: (preset: ManifestPreset) => void;
  blastRadius: number;
  totalDependencies: number;
  hallucinatedCount: number;
  onOpenGuide: () => void;
}

export function IndustrialHeader({
  presets,
  activePresetId,
  onSelectPreset,
  blastRadius,
  totalDependencies,
  hallucinatedCount,
  onOpenGuide
}: IndustrialHeaderProps) {
  return (
    <header className="border-b border-[#263345] bg-[#161e29]">
      {/* Top Hazard Warning Strip */}
      <div className="h-2 w-full bg-hazard-stripes" />

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3">
        {/* Brand & Terminal Checkpoint */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-black bg-[#facc15] shadow-md">
            <Truck size={22} weight="fill" className="text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-extrabold tracking-tight text-white uppercase">
                SLOPGUARD
              </span>
              <span className="rounded bg-black px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#facc15] border border-[#facc15]/30">
                DEP-DEFENSE
              </span>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
              AI PACKAGE HALLUCINATION & SUPPLY CHAIN DOCK
            </p>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="flex items-center gap-6 font-mono text-xs">
          {/* Blast Radius Dial */}
          <div className="flex items-center gap-2.5">
            <Gauge size={20} className="text-[#facc15]" />
            <div>
              <div className="text-[10px] uppercase text-slate-400">Blast Radius</div>
              <div className="font-display text-sm font-black text-[#facc15]">
                {blastRadius}% {blastRadius > 70 ? 'CRITICAL' : 'EVALUATED'}
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-[#263345]" />

          {/* Hallucinated Count */}
          <div className="flex items-center gap-2.5">
            <WarningOctagon size={20} className={hallucinatedCount > 0 ? 'text-red-400 animate-bounce' : 'text-slate-500'} />
            <div>
              <div className="text-[10px] uppercase text-slate-400">Phantom Packages</div>
              <div className={`font-display text-sm font-black ${hallucinatedCount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {hallucinatedCount} DETECTED
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-[#263345]" />

          {/* Scanned Count */}
          <div className="hidden sm:flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase text-slate-400">Inspected</div>
              <div className="font-display text-sm font-black text-slate-200">
                {totalDependencies} PKGS
              </div>
            </div>
          </div>
        </div>

        {/* Preset Selector & Guide */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded border border-[#facc15]/40 bg-[#facc15]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#facc15] hover:bg-[#facc15] hover:text-black transition-colors"
          >
            <Question size={14} weight="bold" />
            <span>How to Use</span>
          </button>

          <span className="font-mono text-[10px] uppercase text-slate-400 mr-1 hidden lg:inline">
            MANIFEST:
          </span>
          {presets.map((preset) => {
            const isActive = preset.id === activePresetId;

            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`rounded px-2.5 py-1 font-mono text-xs font-bold transition-all border ${
                  isActive
                    ? 'border-[#facc15] bg-[#facc15] text-black shadow-md'
                    : 'border-[#263345] bg-[#0f141c] text-slate-300 hover:border-slate-500 hover:text-white'
                }`}
              >
                {preset.ecosystem.toUpperCase()}: {preset.filename}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
