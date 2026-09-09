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
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0f141c] text-slate-100 font-body">
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
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left: Cargo Manifest Bay (35%) */}
        <div className="h-1/2 md:h-full md:w-[35%] overflow-hidden">
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

        {/* Right: Decontamination Bay (65%) */}
        <div className="h-1/2 md:h-full md:w-[65%] overflow-hidden">
          <DecontaminationBay
            dependencies={activePreset.dependencies}
            onOpenQuarantine={() => setIsQuarantineOpen(true)}
            hallucinatedDeps={hallucinatedDeps}
          />
        </div>
      </div>

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
