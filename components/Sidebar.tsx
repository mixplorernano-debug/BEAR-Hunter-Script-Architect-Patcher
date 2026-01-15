import React from 'react';
import { ScriptConfig } from '../types';

interface SidebarProps {
  config: ScriptConfig;
  setConfig: React.Dispatch<React.SetStateAction<ScriptConfig>>;
  onDownload: () => void;
}

const metapackageOptions = [
  { id: 'kali-linux-default', label: 'Default Tools' },
  { id: 'kali-linux-large', label: 'Large Toolset' },
  { id: 'kali-linux-top10', label: 'Top 10 Password Tools' },
  { id: 'kali-linux-web', label: 'Web Pentesting Tools' }
];

const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, onDownload }) => {
  const updateConfig = (key: keyof ScriptConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleMetapackageChange = (pkg: string) => {
    const newPackages = config.metapackages.includes(pkg)
      ? config.metapackages.filter(p => p !== pkg)
      : [...config.metapackages, pkg];
    updateConfig('metapackages', newPackages);
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-[#0f0f12] p-6 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Environment Vars</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Faction Name</label>
            <input 
              type="text"
              value={config.faction}
              onChange={(e) => updateConfig('faction', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500"
              placeholder="e.g., BEAR"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Kali Prompt (PS1)</label>
            <input 
              type="text"
              value={config.kaliText}
              onChange={(e) => updateConfig('kaliText', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm mono text-zinc-300 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-800 w-full"></div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">File Paths</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">NH Bin Path</label>
            <input 
              type="text"
              value={config.nhPath}
              onChange={(e) => updateConfig('nhPath', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Chroot Directory</label>
            <input 
              type="text"
              value={config.chrootDir}
              onChange={(e) => updateConfig('chrootDir', e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>
      
      <div className="h-px bg-zinc-800 w-full"></div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Metapackages</h3>
        <p className="text-xs text-zinc-500 mb-4">Select optional toolsets to install inside Kali.</p>
        <div className="space-y-2">
            {metapackageOptions.map(pkg => (
                <label key={pkg.id} className="flex items-start space-x-3 cursor-pointer p-2 rounded-md hover:bg-zinc-800/50 transition-colors">
                    <input
                        type="checkbox"
                        checked={config.metapackages.includes(pkg.id)}
                        onChange={() => handleMetapackageChange(pkg.id)}
                        className="h-4 w-4 rounded bg-zinc-900 border-zinc-700 text-violet-600 focus:ring-violet-500 shrink-0 mt-0.5"
                    />
                    <div>
                        <span className="text-sm font-medium text-zinc-200">{pkg.label}</span>
                        <p className="text-xs text-zinc-500 mono">{pkg.id}</p>
                    </div>
                </label>
            ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800 w-full"></div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Add-ons & Fixes</h3>
        <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer p-2 rounded-md hover:bg-zinc-800/50 transition-colors">
                <input
                    type="checkbox"
                    checked={config.installKex}
                    onChange={(e) => updateConfig('installKex', e.target.checked)}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-700 text-violet-600 focus:ring-violet-500 shrink-0 mt-0.5"
                />
                <div>
                    <span className="text-sm font-medium text-zinc-200">Install Kali KeX</span>
                    <p className="text-xs text-zinc-500">Adds GUI support via VNC.</p>
                </div>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer p-2 rounded-md hover:bg-zinc-800/50 transition-colors">
                <input
                    type="checkbox"
                    checked={config.setSelinuxPermissive}
                    onChange={(e) => updateConfig('setSelinuxPermissive', e.target.checked)}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-700 text-violet-600 focus:ring-violet-500 shrink-0 mt-0.5"
                />
                <div>
                    <span className="text-sm font-medium text-zinc-200">Set SELinux Permissive</span>
                    <p className="text-xs text-zinc-500">Improves compatibility for some network tools.</p>
                </div>
            </label>
             <label className="flex items-start space-x-3 cursor-pointer p-2 rounded-md hover:bg-zinc-800/50 transition-colors">
                <input
                    type="checkbox"
                    checked={config.forceDns}
                    onChange={(e) => updateConfig('forceDns', e.target.checked)}
                    className="h-4 w-4 rounded bg-zinc-900 border-zinc-700 text-violet-600 focus:ring-violet-500 shrink-0 mt-0.5"
                />
                <div>
                    <span className="text-sm font-medium text-zinc-200">Force DNS Resolver</span>
                    <p className="text-xs text-zinc-500">Sets DNS to 8.8.8.8 to fix network issues.</p>
                </div>
            </label>
        </div>
      </div>

       <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Architecture</h3>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-md p-1">
          <button
            onClick={() => updateConfig('architecture', 'arm64')}
            className={`flex-1 text-center text-sm py-1.5 rounded transition-colors ${
              config.architecture === 'arm64'
                ? 'bg-violet-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            arm64
          </button>
          <button
            onClick={() => updateConfig('architecture', 'armhf')}
            className={`flex-1 text-center text-sm py-1.5 rounded transition-colors ${
              config.architecture === 'armhf'
                ? 'bg-violet-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            armhf
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Script Mode</h3>
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-md p-1">
          <button
            onClick={() => updateConfig('scriptMode', 'full')}
            className={`flex-1 text-center text-sm py-1.5 rounded transition-colors ${
              config.scriptMode === 'full'
                ? 'bg-violet-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Full Install
          </button>
          <button
            onClick={() => updateConfig('scriptMode', 'update')}
            className={`flex-1 text-center text-sm py-1.5 rounded transition-colors ${
              config.scriptMode === 'update'
                ? 'bg-violet-600 text-white font-semibold shadow'
                : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            Update
          </button>
        </div>
      </div>

      <div className="mt-auto">
        <button 
          onClick={onDownload}
          className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-lg shadow-lg shadow-violet-900/20 transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-file-code"></i>
          Generate Script
        </button>
        <p className="text-[10px] text-zinc-600 text-center mt-3 leading-tight">
          Ensure you have root access and Magisk installed before running the output script in Termux.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
