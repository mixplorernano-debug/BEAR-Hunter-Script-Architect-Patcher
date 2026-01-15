
import React from 'react';

interface EditorPreviewProps {
  script: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({ script }) => {
  const lines = script.split('\n');

  return (
    <div className="p-4 mono text-[13px] leading-relaxed selection:bg-violet-500/30 selection:text-white">
      <div className="flex">
        {/* Line Numbers */}
        <div className="flex flex-col text-right pr-4 text-zinc-600 select-none border-r border-zinc-800 min-w-[3rem]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        
        {/* Code Content */}
        <div className="pl-4 whitespace-pre text-zinc-300 overflow-x-auto">
          {lines.map((line, i) => {
            // Simple syntax highlighting via CSS classes logic
            let colorClass = "text-zinc-300";
            if (line.trim().startsWith('#')) colorClass = "text-zinc-500 italic";
            else if (line.includes('echo "')) colorClass = "text-emerald-400";
            else if (line.includes('export ') || line.includes('set -e')) colorClass = "text-amber-400";
            else if (line.includes('=') && !line.includes('==')) {
                const parts = line.split('=');
                return (
                    <div key={i}>
                        <span className="text-sky-400">{parts[0]}</span>
                        <span className="text-zinc-400">=</span>
                        <span className="text-emerald-300">{parts.slice(1).join('=')}</span>
                    </div>
                )
            }
            
            return (
              <div key={i} className={colorClass}>
                {line || ' '}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditorPreview;
