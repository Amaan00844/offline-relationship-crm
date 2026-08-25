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
  GitMerge,
  Bot
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

  const tracks: { label: string; value: ProgramTrack | 'All'; badgeColor: string }[] = [
    { label: 'All Cohorts', value: 'All', badgeColor: 'text-slate-400' },
    { label: 'Offline Core', value: 'Offline Core', badgeColor: 'text-amber-300' },
    { label: 'Encore', value: 'Encore', badgeColor: 'text-purple-300' },
    { label: 'TON (Network)', value: 'The Offline Network (TON)', badgeColor: 'text-emerald-300' }
  ];

  const hasNvidiaKey = Boolean(nvidiaConfig.nvidiaApiKey || import.meta.env.VITE_NVIDIA_API_KEY);

  return (
    <header className="sticky top-0 z-40 bg-[#06080D]/90 backdrop-blur-2xl border-b border-white/[0.08]">
      {/* Top Banner for Active Tasks */}
      {isProcessing && (
        <div className="bg-gradient-to-r from-emerald-600/95 via-teal-600/95 to-indigo-600/95 px-4 py-1.5 text-xs text-white flex items-center justify-center gap-2 font-medium animate-pulse shadow-md">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span className="font-mono text-[11px] tracking-wide">
            {activeProcessingTask || 'Executing NVIDIA AI relationship pipeline...'}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-emerald-400/20 to-purple-400/20 p-px border border-white/10 shadow-lg shadow-black/60">
              <div className="w-full h-full bg-[#080B11] rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-300 to-teal-200 text-lg">
                  Ø
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold tracking-tight text-white font-mono flex items-center gap-1.5">
                  OFFLINE <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 tracking-wider">RELATIONSHIP OS</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                <span>Founder's Office Intelligence</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Offline & Encore & TON</span>
              </p>
            </div>
          </div>

          {/* Program Cohort Switcher */}
          <div className="flex items-center p-1 bg-[#0B0F17] rounded-xl border border-white/[0.08] self-start lg:self-auto overflow-x-auto max-w-full shadow-inner">
            {tracks.map(t => (
              <button
                key={t.value}
                onClick={() => setSelectedTrack(t.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedTrack === t.value
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* NVIDIA NIM Status Pill */}
            <button
              onClick={onOpenAISettings}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all duration-200 ${
                hasNvidiaKey
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-500/60 shadow-sm shadow-emerald-500/10'
                  : 'bg-[#0B0F17] border-white/10 text-slate-300 hover:border-emerald-500/40'
              }`}
              title="Configure NVIDIA NIM API Inference Key"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px] font-semibold">
                {hasNvidiaKey ? 'NVIDIA Llama 3.3 70B' : 'Configure NVIDIA Key'}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${hasNvidiaKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            </button>

            {/* Ingest Applicant Button */}
            <button
              onClick={onOpenNewApplicant}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 transition active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Ingest Form</span>
            </button>

            {/* Batch AI Automation Quick triggers */}
            <div className="flex items-center gap-1 bg-[#0B0F17] border border-white/[0.08] rounded-xl p-1 shadow-sm">
              <button
                onClick={() => enrichAllPending()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                title="Run NVIDIA AI auto-enrichment on all incomplete records"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Enrich</span>
              </button>
              <button
                onClick={() => scoreAllUnscored()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition flex items-center gap-1 disabled:opacity-50"
                title="Calculate NVIDIA AI multi-factor fit score for all applicants"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Score</span>
              </button>
            </div>

            {/* Export & Reset */}
            <button
              onClick={() => exportData('csv')}
              className="p-2 rounded-xl bg-[#0B0F17] border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition"
              title="Export CRM to Airtable CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={resetToSeedData}
              className="p-2 rounded-xl bg-[#0B0F17] border border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition"
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
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'roster'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Network & Pipeline</span>
            <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 text-[10px] rounded-full font-mono">
              {stats.totalProfiles}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'duplicates'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-amber-400" />
            <span>Duplicate & Quality Studio</span>
            {stats.duplicatesDetected > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold rounded-full">
                {stats.duplicatesDetected} alerts
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'matchmaker'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Super-Connector (Intros)</span>
            <span className="px-1.5 py-0.2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold rounded-full">
              {stats.highValueMatchesAvailable} matches
            </span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'assistant'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span>Founder's Office Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('memo')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'memo'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
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
