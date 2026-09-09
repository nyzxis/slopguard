import { Warning, ShieldCheck, Skull, ShieldPlus, ArrowRight, DownloadSimple } from '@phosphor-icons/react';
import type { ScannedDependency } from '../types/scanner';

interface DecontaminationBayProps {
  dependencies: ScannedDependency[];
  onOpenQuarantine: () => void;
  hallucinatedDeps: ScannedDependency[];
}

export function DecontaminationBay({
  dependencies,
  onOpenQuarantine,
  hallucinatedDeps
}: DecontaminationBayProps) {
  const getRiskBadge = (dep: ScannedDependency) => {
    switch (dep.anomalyType) {
      case 'HALLUCINATED':
        return {
          bg: 'bg-red-500/15 border-red-500/40 text-red-400',
          label: 'LLM PHANTOM PACKAGE',
          icon: <Skull size={14} weight="fill" className="text-red-400" />
        };
      case 'TYPOSQUAT':
        return {
          bg: 'bg-orange-500/15 border-orange-500/40 text-orange-400',
          label: 'TYPOSQUAT VECTOR',
          icon: <Warning size={14} weight="fill" className="text-orange-400" />
        };
      case 'MALICIOUS_HOOK':
        return {
          bg: 'bg-purple-500/15 border-purple-500/40 text-purple-400',
          label: 'POISONED HOOK',
          icon: <Warning size={14} weight="fill" className="text-purple-400" />
        };
      default:
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
          label: 'VERIFIED REGISTRY',
          icon: <ShieldCheck size={14} weight="fill" className="text-emerald-400" />
        };
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#0f141c] p-4">
      {/* Top Action Banner */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#263345] pb-3">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#facc15]">
            Decontamination Inspection Bay
          </span>
          <h2 className="font-display text-sm font-bold text-white">
            Dependency Triage Manifest ({dependencies.length} Packages Verified)
          </h2>
        </div>

        {/* Quarantine Generator Button */}
        {hallucinatedDeps.length > 0 && (
          <button
            onClick={onOpenQuarantine}
            className="flex items-center gap-2 rounded-lg border border-[#facc15] bg-[#facc15]/10 px-3 py-1.5 font-display text-xs font-bold text-[#facc15] transition-all hover:bg-[#facc15] hover:text-black shadow-sm"
          >
            <ShieldPlus size={16} weight="bold" />
            <span>Generate Defense Script ({hallucinatedDeps.length})</span>
            <ArrowRight size={12} weight="bold" />
          </button>
        )}
      </div>

      {/* Package Cards Scrollable Feed */}
      <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
        {dependencies.map((dep) => {
          const badge = getRiskBadge(dep);
          const isDanger = dep.riskLevel === 'CRITICAL' || dep.riskLevel === 'HIGH';

          return (
            <div
              key={dep.id}
              className={`rounded-xl border p-3.5 transition-all ${
                isDanger
                  ? 'border-[#263345] bg-[#161e29] shadow-md hover:border-slate-500'
                  : 'border-[#1b2432] bg-[#121824]/60 hover:border-[#263345]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Package Name & Version */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white">
                    {dep.name}
                  </span>
                  <span className="font-mono text-xs text-slate-400">
                    {dep.version}
                  </span>
                </div>

                {/* Risk Badge */}
                <span
                  className={`flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase ${badge.bg}`}
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
              </div>

              {/* Threat Details / Reason */}
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                {dep.threatDetails}
              </p>

              {/* Telemetry Row */}
              <div className="mt-3 flex flex-wrap items-center gap-4 rounded-lg bg-[#0b0f16] px-3 py-2 text-[11px] font-mono">
                <div className="flex items-center gap-1 text-slate-400">
                  <DownloadSimple size={14} className="text-slate-500" />
                  <span>Downloads: <strong className="text-slate-200">{dep.weeklyDownloads}</strong></span>
                </div>
                <div className="text-slate-400">
                  <span>Age: <strong className="text-slate-200">{dep.age}</strong></span>
                </div>
                <div className="text-slate-400">
                  <span>Registry: <strong className={dep.registryExists ? 'text-emerald-400' : 'text-red-400 font-black'}>
                    {dep.registryExists ? 'REGISTERED' : 'UNREGISTERED PHANTOM'}
                  </strong></span>
                </div>

                {/* Hallucination probability meter */}
                {dep.hallucinationProbability > 0 && (
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 uppercase">Slop Risk:</span>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[#1e293b]">
                      <div
                        className="h-full rounded-full bg-red-500"
                        style={{ width: `${dep.hallucinationProbability}%` }}
                      />
                    </div>
                    <span className="font-bold text-red-400">
                      {dep.hallucinationProbability}%
                    </span>
                  </div>
                )}
              </div>

              {/* Action Recommendation */}
              {isDanger && (
                <div className="mt-2 text-[11px] font-mono text-[#facc15]">
                  <strong className="uppercase">Remediation:</strong> {dep.suggestedAction}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
