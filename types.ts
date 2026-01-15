export interface ScriptConfig {
  faction: string;
  kaliText: string;
  nhPath: string;
  chrootDir: string;
  scriptMode: 'full' | 'update';
  architecture: 'arm64' | 'armhf';
  metapackages: string[];
  setSelinuxPermissive: boolean;
  forceDns: boolean;
  installKex: boolean;
}

export interface GeminiResponse {
  explanation: string;
  optimizationTips: string[];
}
