import { X, Truck, Code, Skull, ShieldPlus, ShieldCheck } from '@phosphor-icons/react';

interface SlopGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SlopGuideModal({ isOpen, onClose }: SlopGuideModalProps) {
  if (!isOpen) return null;

  const steps = [
    {
      icon: <Code size={18} className="text-[#facc15]" />,
      title: '1. Load or Paste Dependency Manifest',
      description: 'Select your ecosystem (npm, PyPI, Cargo) and choose a manifest preset or paste custom package.json / requirements.txt dependencies into the Cargo Manifest Bay.'
    },
    {
      icon: <Truck size={18} className="text-[#facc15]" />,
      title: '2. Execute Manifest Security Audit',
      description: 'Click "Audit Manifest for Slop". The engine verifies package provenance, age, download velocity, and AI hallucination probabilities.'
    },
    {
      icon: <Skull size={18} className="text-red-400" />,
      title: '3. Triage Supply Chain Risks',
      description: 'Inspect highlighted risk badges in the Decontamination Bay: "LLM PHANTOM PACKAGE" (unclaimed name that attackers can register to backdoor builds), "TYPOSQUAT VECTOR", or "POISONED HOOK".'
    },
    {
      icon: <ShieldPlus size={18} className="text-[#facc15]" />,
      title: '4. Generate Defensive Claim Scripts',
      description: 'Click "Generate Defense Script". Copy the automated bash script to publish inert defensive placeholder packages to npm/PyPI to preemptively neutralize hallucinated name squatting.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border-2 border-[#263345] bg-[#161e29] shadow-2xl overflow-hidden flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#263345] px-6 py-4 bg-[#0f141c]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black bg-[#facc15] text-black">
              <ShieldCheck size={18} weight="fill" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                SLOPGUARD CHECKPOINT PROTOCOL
              </h3>
              <p className="font-mono text-[10px] text-[#facc15]">
                AI SUPPLY CHAIN DEFENSE & QUARANTINE WORKFLOW
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-[#263345] hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Steps */}
        <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto font-body text-xs">
          {steps.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3.5 rounded-xl border border-[#263345] bg-[#0f141c] p-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#263345]/50">
                {s.icon}
              </div>
              <div>
                <h4 className="font-display text-xs font-bold text-white">
                  {s.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-[#263345] px-6 py-3 bg-[#0f141c]">
          <button
            onClick={onClose}
            className="rounded-lg border border-black bg-[#facc15] px-4 py-2 font-display text-xs font-bold text-black hover:bg-[#eab308] transition-colors"
          >
            Access Checkpoint
          </button>
        </div>
      </div>
    </div>
  );
}
