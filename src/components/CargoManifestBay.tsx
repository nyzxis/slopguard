import { Code, Play, ArrowClockwise } from '@phosphor-icons/react';
import type { Ecosystem } from '../types/scanner';

interface CargoManifestBayProps {
  manifestText: string;
  setManifestText: (val: string) => void;
  ecosystem: Ecosystem;
  setEcosystem: (eco: Ecosystem) => void;
  onRunAudit: () => void;
  isAuditing: boolean;
  filename: string;
}

export function CargoManifestBay({
  manifestText,
  setManifestText,
  ecosystem,
  setEcosystem,
  onRunAudit,
  isAuditing,
  filename
}: CargoManifestBayProps) {
  return (
    <div className="flex h-full flex-col border-r border-[#263345] bg-[#121824] p-4">
      {/* Top Controls */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code size={16} className="text-[#facc15]" />
          <span className="font-display text-xs font-bold uppercase tracking-wider text-slate-200">
            Cargo Manifest Bay
          </span>
        </div>

        {/* Ecosystem Pills */}
        <div className="flex items-center gap-1 rounded bg-[#0f141c] p-0.5 border border-[#263345]">
          {(['npm', 'pypi', 'cargo'] as Ecosystem[]).map((eco) => (
            <button
              key={eco}
              onClick={() => setEcosystem(eco)}
              className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase transition-colors ${
                ecosystem === eco
                  ? 'bg-[#facc15] text-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {eco}
            </button>
          ))}
        </div>
      </div>

      {/* Filename & Info */}
      <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>Target: <strong className="text-slate-200">{filename}</strong></span>
        <span>{manifestText.split('\n').length} lines</span>
      </div>

      {/* Editor Box */}
      <div className="relative flex-1">
        <textarea
          value={manifestText}
          onChange={(e) => setManifestText(e.target.value)}
          placeholder="Paste package.json or requirements.txt dependencies here..."
          className="h-full w-full resize-none rounded-lg border border-[#263345] bg-[#0b0f16] p-3.5 font-mono text-xs leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-[#facc15] focus:outline-none focus:ring-1 focus:ring-[#facc15]"
        />
      </div>

      {/* Trigger Button */}
      <div className="mt-3">
        <button
          onClick={onRunAudit}
          disabled={isAuditing || !manifestText.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-[#facc15] py-2.5 font-display text-xs font-black uppercase tracking-wider text-black transition-all hover:bg-[#eab308] active:scale-[0.99] disabled:opacity-50"
        >
          {isAuditing ? (
            <>
              <ArrowClockwise size={16} className="animate-spin" />
              <span>Verifying Registry Provenance...</span>
            </>
          ) : (
            <>
              <Play size={16} weight="fill" />
              <span>Audit Manifest for Slop</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
