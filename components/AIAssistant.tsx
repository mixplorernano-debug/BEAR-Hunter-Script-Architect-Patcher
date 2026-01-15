
import React, { useState } from 'react';

interface AIAssistantProps {
  onAsk: (query: string) => void;
  loading: boolean;
  response: string | null;
  setResponse: (res: string | null) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onAsk, loading, response, setResponse }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onAsk(query);
      setQuery("");
    }
  };

  return (
    <div className="w-96 flex-shrink-0 bg-[#0c0c0f] border-l border-zinc-800 flex flex-col overflow-hidden">
      <div className="p-4 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-sparkles text-violet-400"></i>
          <h4 className="text-sm font-semibold text-zinc-100 uppercase tracking-tight">AI Debugger</h4>
        </div>
        {response && (
            <button 
                onClick={() => setResponse(null)}
                className="text-xs text-zinc-500 hover:text-zinc-300"
            >
                Clear
            </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!response && !loading && (
          <div className="text-center py-12 px-6">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-robot text-zinc-500 text-xl"></i>
            </div>
            <p className="text-sm text-zinc-400">Ask about Termux, NetHunter errors, or script optimizations.</p>
            <div className="mt-6 space-y-2">
                {["Explain Kali Shim", "Improve Magisk Detection", "Android 14 Perms Fix"].map(tip => (
                    <button 
                        key={tip}
                        onClick={() => onAsk(tip)}
                        className="block w-full text-xs text-left px-3 py-2 rounded border border-zinc-800 hover:bg-zinc-800/50 text-zinc-500"
                    >
                        {tip}
                    </button>
                ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-zinc-500">Architect is thinking...</p>
          </div>
        )}

        {response && (
          <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 prose prose-invert prose-sm max-w-none">
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm">{response}</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
            placeholder="Ask the AI Assistant..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-4 pr-12 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500 disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 w-8 h-8 flex items-center justify-center bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 text-white rounded-md transition-all"
          >
            <i className={`fa-solid ${loading ? 'fa-circle-notch fa-spin' : 'fa-arrow-up'}`}></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;
