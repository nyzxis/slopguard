import { useState } from 'react';
import { X, Copy, Check, Terminal, ShieldCheck } from '@phosphor-icons/react';
import type { ScannedDependency } from '../types/scanner';

interface QuarantineModalProps {
  isOpen: boolean;
  onClose: () => void;
  hallucinatedDeps: ScannedDependency[];
}

export function QuarantineModal({ isOpen, onClose, hallucinatedDeps }: QuarantineModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate automated defense claim script
  const scriptContent = `#!/usr/bin/env bash
# ==========================================================
# SLOPGUARD DEFENSIVE REGISTRY PLACEHOLDER GENERATOR
# Preemptively claims AI-hallucinated package names on registry
# ==========================================================

set -e

echo "[+] Initializing defensive placeholder packaging..."

${hallucinatedDeps
  .map(
    (dep) => `
# Claiming ${dep.name} (${dep.ecosystem.toUpperCase()})
mkdir -p ./quarantine/${dep.name.replace('/', '_')}
cat << 'EOF' > ./quarantine/${dep.name.replace('/', '_')}/package.json
{
  "name": "${dep.name}",
  "version": "0.0.1",
  "description": "Defensive security placeholder against LLM hallucination squatting.",
  "main": "index.js",
  "scripts": {
    "preinstall": "echo '[SECURITY ALERT] This package name was hallucinated by an AI model and claimed defensively.' && exit 1"
  }
}
EOF
cat << 'EOF' > ./quarantine/${dep.name.replace('/', '_')}/index.js
throw new Error("Security placeholder package: ${dep.name}");
EOF
echo "[+] Publishing placeholder for ${dep.name}..."
# npm publish ./quarantine/${dep.name.replace('/', '_')} --access public
`
  )
  .join('')}

echo "[SUCCESS] All phantom dependencies quarantined and shielded."
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border-2 border-[#263345] bg-[#161e29] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#263345] px-5 py-3.5 bg-[#0f141c]">
          <div className="flex items-center gap-2.5">
            <Terminal size={18} className="text-[#facc15]" />
            <h3 className="font-display text-sm font-bold text-white">
              Defensive Package Claim Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#263345] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-[#facc15]/30 bg-[#facc15]/10 p-3 text-xs text-slate-200">
            <ShieldCheck size={20} weight="fill" className="text-[#facc15] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#facc15] block mb-0.5">Preemptive Threat Neutralization:</strong>
              These {hallucinatedDeps.length} packages do not exist on the public registry. Run this script to publish safe inert placeholders before malicious actors register them.
            </div>
          </div>

          {/* Code Viewer */}
          <div className="relative rounded-xl border border-[#263345] bg-[#0b0f16] p-4">
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 flex items-center gap-1.5 rounded bg-[#263345] px-2.5 py-1 font-mono text-[11px] font-bold text-slate-200 hover:bg-[#facc15] hover:text-black transition-colors"
            >
              {copied ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
              {copied ? 'COPIED SCRIPT' : 'COPY SCRIPT'}
            </button>
            <pre className="max-h-64 overflow-y-auto font-mono text-[11px] leading-relaxed text-slate-300 pr-12">
              {scriptContent}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-[#263345] px-5 py-3 bg-[#0f141c]">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#263345] px-4 py-2 font-display text-xs font-bold text-white hover:bg-slate-700"
          >
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  );
}
