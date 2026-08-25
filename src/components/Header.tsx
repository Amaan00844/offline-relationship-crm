import React from 'react';
import { useCRM } from '../context/CRMContext';
import { ProgramTrack } from '../types';
import {
  Sparkles,
  UserPlus,
  Zap,
  Download,
  RotateCcw,
  Cpu,
  Layers,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Bot,
  Activity
} from 'lucide-react';

interface Props {
  onOpenNewApplicant: () => void;
  onOpenAISettings: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<Props> = ({
  onOpenNewApplicant,
  onOpenAISettings,
  activeTab,
  setActiveTab
}) => {
  const {
    selectedTrack,
    setSelectedTrack,
    nvidiaConfig,
    enrichAllPending,
    scoreAllUnscored,
    exportData,
    resetToSeedData,
    isProcessing,
    activeProcessingTask,
    stats
  } = useCRM();

  const tracks: { label: string; value: ProgramTrack | 'All'; badgeClass?: string }[] = [
    { label: 'All Cohorts', value: 'All' },
    { label: 'Offline Core', value: 'Offline Core', badgeClass: 'text-amber-400' },
    { label: 'Encore (Execs)', value: 'Encore', badgeClass: 'text-purple-400' },
    { label: 'TON (Network)', value: 'The Offline Network (TON)', badgeClass: 'text-emerald-400' }
  ];

  const hasNvidiaKey = Boolean(nvidiaConfig.nvidiaApiKey || import.meta.env.VITE_NVIDIA_API_KEY);

  return (
    <header className="sticky top-0 z-40 bg-[#06080D]/85 backdrop-blur-2xl border-b border-white/[0.08]">
      {/* Top Banner for Active Tasks */}
      {isProcessing && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 px-4 py-1.5 text-xs text-black font-bold flex items-center justify-center gap-2 animate-pulse shadow-lg">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{activeProcessingTask || 'Executing NVIDIA NIM AI relationship pipeline...'}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/80 via-emerald-500/80 to-indigo-500/80 p-0.5 shadow-xl shadow-amber-500/10">
              <div className="w-full h-full bg-[#080B11] rounded-[14px] flex items-center justify-center">
                <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-emerald-400 text-xl tracking-tighter">
                  Ø
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-base font-extrabold tracking-tight text-white font-mono flex items-center gap-1.5">
                  <span>OFFLINE</span>
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 tracking-wider">
                    FOUNDER'S OS
                  </span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                <span className="text-slate-300 font-medium">Relationship Intelligence Engine</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Offline • Encore • TON</span>
              </p>
            </div>
          </div>

          {/* Program Track Filter Buttons */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-2xl border border-white/[0.08] self-start lg:self-auto overflow-x-auto max-w-full shadow-inner">
            {tracks.map(track => (
              <button
                key={track.value}
                onClick={() => setSelectedTrack(track.value)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedTrack === track.value
                    ? 'bg-slate-800 text-white shadow-md border border-white/10 ring-1 ring-white/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {track.label}
              </button>
            ))}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* NVIDIA NIM Status Pill */}
            <button
              onClick={onOpenAISettings}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition shadow-sm ${
                hasNvidiaKey
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/50'
              }`}
              title="Configure NVIDIA NIM API Key"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] font-semibold">
                {hasNvidiaKey ? 'NVIDIA NIM 70B' : 'Set NVIDIA Key'}
              </span>
              <span className={`w-2 h-2 rounded-full ${hasNvidiaKey ? 'bg-emerald-400 shadow-[0_0_8px_#10B981] animate-pulse' : 'bg-amber-400'}`}></span>
            </button>

            {/* Ingest Applicant Button */}
            <button
              onClick={onOpenNewApplicant}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition active:scale-95 border border-indigo-400/30"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Ingest Form</span>
            </button>

            {/* Batch AI Automation Quick triggers */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-white/[0.08] rounded-xl p-0.5">
              <button
                onClick={() => enrichAllPending()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                title="Run NVIDIA AI auto-enrichment on all incomplete records"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Enrich</span>
              </button>
              <button
                onClick={() => scoreAllUnscored()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                title="Calculate NVIDIA AI multi-factor fit score for all applicants"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Score</span>
              </button>
            </div>

            {/* Export & Reset */}
            <button
              onClick={() => exportData('csv')}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Export CRM to Airtable CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={resetToSeedData}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Reset to Initial Seed Dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-4 border-t border-white/[0.06] pt-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'roster'
                ? 'bg-slate-800 text-white border border-white/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Network & Pipeline</span>
            <span className="px-2 py-0.5 bg-slate-700/60 text-slate-300 text-[10px] font-mono rounded-full">
              {stats.totalProfiles}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'duplicates'
                ? 'bg-slate-800 text-white border border-white/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Duplicate & Quality Studio</span>
            {stats.duplicatesDetected > 0 && (
              <span className="px-2 py-0.5 bg-amber-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold rounded-full animate-pulse">
                {stats.duplicatesDetected} alerts
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'matchmaker'
                ? 'bg-slate-800 text-white border border-white/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Super-Connector (Intros)</span>
            <span className="px-2 py-0.5 bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold rounded-full">
              {stats.highValueMatchesAvailable} matches
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'assistant'
                ? 'bg-slate-800 text-white border border-white/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>Founder's Office Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('memo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === 'memo'
                ? 'bg-slate-800 text-white border border-white/10 shadow-lg'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Architecture & Submission Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};
