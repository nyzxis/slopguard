export type Ecosystem = 'npm' | 'pypi' | 'cargo';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'SAFE';
export type AnomalyType = 'HALLUCINATED' | 'TYPOSQUAT' | 'MALICIOUS_HOOK' | 'UNMAINTAINED' | 'VERIFIED';

export interface ScannedDependency {
  id: string;
  name: string;
  version: string;
  ecosystem: Ecosystem;
  riskLevel: RiskLevel;
  anomalyType: AnomalyType;
  registryExists: boolean;
  hallucinationProbability: number; // 0 - 100
  weeklyDownloads: string;
  age: string;
  reason: string;
  threatDetails: string;
  suggestedAction: string;
  claimCommand?: string;
}

export interface ManifestPreset {
  id: string;
  name: string;
  ecosystem: Ecosystem;
  filename: string;
  description: string;
  blastRadius: number; // 0 - 100
  rawContent: string;
  dependencies: ScannedDependency[];
}
