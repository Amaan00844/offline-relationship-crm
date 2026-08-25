import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { Cpu, Key, Check, Shield, ExternalLink, X, Zap, Sliders } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AISettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { nvidiaConfig, saveConfig } = useCRM();
  const [nvidiaApiKey, setNvidiaApiKey] = useState(nvidiaConfig.nvidiaApiKey);
  const [model, setModel] = useState(nvidiaConfig.model || 'meta/llama-3.3-70b-instruct');
  const [temperature, setTemperature] = useState(nvidiaConfig.temperature ?? 0.2);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveConfig({
      nvidiaApiKey: nvidiaApiKey.trim(),
      model,
      temperature
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">NVIDIA NIM Inference Setup</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                  Native NVIDIA
                </span>
              </div>
              <p className="text-xs text-slate-400">Direct integration with NVIDIA AI Foundation Endpoints</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          {/* NVIDIA Key Input */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" />
                NVIDIA API Key (`nvapi-...`)
              </label>
              <a
                href="https://build.nvidia.com/"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
              >
                Get key at build.nvidia.com <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <input
              type="password"
              value={nvidiaApiKey}
              onChange={e => setNvidiaApiKey(e.target.value)}
              placeholder="nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
            />
            <p className="text-[11px] text-slate-500">
              Keys can also be configured in <code className="text-slate-300 font-mono">.env</code> as <code className="text-emerald-300 font-mono">VITE_NVIDIA_API_KEY</code>.
            </p>
          </div>

          {/* Model Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              NVIDIA Hosted Model
            </label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="meta/llama-3.3-70b-instruct">meta/llama-3.3-70b-instruct (Recommended - Ultra-Fast & High Precision)</option>
              <option value="nvidia/llama-3.1-nemotron-70b-instruct">nvidia/llama-3.1-nemotron-70b-instruct (NVIDIA Optimized)</option>
              <option value="deepseek-ai/deepseek-r1">deepseek-ai/deepseek-r1 (Deep Mathematical Reasoning)</option>
              <option value="meta/llama-3.1-405b-instruct">meta/llama-3.1-405b-instruct (Maximum Context Frontier)</option>
              <option value="mistralai/mixtral-8x22b-instruct">mistralai/mixtral-8x22b-instruct (Mixture of Experts)</option>
            </select>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                Temperature (Precision vs Creativity)
              </span>
              <span className="font-mono text-emerald-400 font-bold">{temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={e => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0.0 (Strict Taxonomy)</span>
              <span>0.2 (Recommended)</span>
              <span>1.0 (Creative Intros)</span>
            </div>
          </div>

          {/* Intelligent Fallback Badge */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-xs text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-300">Deterministic Offline Simulation Guard</p>
              <p className="text-[11px] mt-0.5">
                If the NVIDIA API endpoint experiences rate limits or is offline, the relationship graph automatically switches to our deterministic intelligence engine with zero downtime.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" /> Connected & Saved!
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" /> Save NVIDIA Setup
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
