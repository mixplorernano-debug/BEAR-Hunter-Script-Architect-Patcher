
export interface ScriptConfig {
  faction: string;
  kaliText: string;
  nhPath: string;
  chrootDir: string;
  scriptMode: 'full' | 'update';
  architecture: 'arm64' | 'armhf';
  metapackages: string[];
}

export interface GeminiResponse {
  explanation: string;
  optimizationTips: string[];
}
