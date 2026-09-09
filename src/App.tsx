import { useState, useMemo } from 'react';
import { MANIFEST_PRESETS } from './data/manifestPresets';
import type { ManifestPreset, Ecosystem } from './types/scanner';
import { IndustrialHeader } from './components/IndustrialHeader';
import { CargoManifestBay } from './components/CargoManifestBay';
import { DecontaminationBay } from './components/DecontaminationBay';
import { QuarantineModal } from './components/QuarantineModal';
import { SlopGuideModal } from './components/SlopGuideModal';

export default function App() {
  const [activePreset, setActivePreset] = useState<ManifestPreset>(MANIFEST_PRESETS[0]);
  const [manifestText, setManifestText] = useState(MANIFEST_PRESETS[0].rawContent);
  const [ecosystem, setEcosystem] = useState<Ecosystem>(MANIFEST_PRESETS[0].ecosystem);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isQuarantineOpen, setIsQuarantineOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Switch preset
  const handleSelectPreset = (preset: ManifestPreset) => {
    setActivePreset(preset);
    setManifestText(preset.rawContent);
    setEcosystem(preset.ecosystem);
  };

  // Run simulated audit
  const handleRunAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 700);
  };

  // Computed hallucinated packages
  const hallucinatedDeps = useMemo(() => {
    return activePreset.dependencies.filter((d) => d.anomalyType === 'HALLUCINATED');
  }, [activePreset]);

  return (
    <div className="min-h-screen w-full bg-[#0a0e14] text-slate-100 font-body py-3 sm:py-8 px-3 sm:px-6 flex flex-col items-center justify-start selection:bg-[#facc15]/30 selection:text-white">
      {/* Containerized Shell */}
      <div className="w-full max-w-7xl mx-auto rounded-2xl border border-[#263345] bg-[#121824] shadow-2xl overflow-hidden flex flex-col">
        {/* Top Industrial Hazard Header */}
        <IndustrialHeader
          presets={MANIFEST_PRESETS}
          activePresetId={activePreset.id}
          onSelectPreset={handleSelectPreset}
          blastRadius={activePreset.blastRadius}
          totalDependencies={activePreset.dependencies.length}
          hallucinatedCount={hallucinatedDeps.length}
          onOpenGuide={() => setIsGuideOpen(true)}
        />

        {/* Main Two-Tier Industrial Checkpoint */}
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-[#263345]">
          {/* Left: Cargo Manifest Bay (38%) */}
          <div className="w-full lg:w-[38%] min-h-[400px] lg:min-h-[580px] flex flex-col">
            <CargoManifestBay
              manifestText={manifestText}
              setManifestText={setManifestText}
              ecosystem={ecosystem}
              setEcosystem={setEcosystem}
              onRunAudit={handleRunAudit}
              isAuditing={isAuditing}
              filename={activePreset.filename}
            />
          </div>

          {/* Right: Decontamination Bay (62%) */}
          <div className="w-full lg:w-[62%] min-h-[440px] lg:min-h-[580px] flex flex-col">
            <DecontaminationBay
              dependencies={activePreset.dependencies}
              onOpenQuarantine={() => setIsQuarantineOpen(true)}
              hallucinatedDeps={hallucinatedDeps}
            />
          </div>
        </div>
      </div>

      {/* Footer Attribution */}
      <footer className="mt-6 text-center font-mono text-[11px] text-slate-600">
        SlopGuard • AI Package Hallucination & Supply Chain Defense • Built by <a href="https://nyzxis.vercel.app/" target="_blank" rel="noreferrer" className="text-[#facc15]/80 hover:text-[#facc15]">nyzxis</a>
      </footer>

      {/* Quarantine Defense Claim Modal */}
      <QuarantineModal
        isOpen={isQuarantineOpen}
        onClose={() => setIsQuarantineOpen(false)}
        hallucinatedDeps={hallucinatedDeps}
      />

      {/* Instructional Guide Modal */}
      <SlopGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
