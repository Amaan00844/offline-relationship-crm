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
  Loader2
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

  const tracks: (ProgramTrack | 'All')[] = [
    'All',
    'Offline Core',
    'Encore',
    'The Offline Network (TON)'
  ];

  const hasNvidiaKey = Boolean(nvidiaConfig.nvidiaApiKey || import.meta.env.VITE_NVIDIA_API_KEY);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      {/* Top Banner for Active Tasks */}
      {isProcessing && (
        <div className="bg-gradient-to-r from-emerald-600/90 via-teal-600/90 to-indigo-600/90 px-4 py-1.5 text-xs text-white flex items-center justify-center gap-2 font-medium animate-pulse">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>{activeProcessingTask || 'Executing NVIDIA AI relationship pipeline...'}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-indigo-600 to-purple-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 text-lg">
                  Ø
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-white font-mono">
                  OFFLINE <span className="text-emerald-400 font-sans font-medium text-xs px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">RELATIONSHIP OS</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>Founder's Office Intelligence</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Offline & Encore & TON</span>
              </p>
            </div>
          </div>

          {/* Program Track Filter Buttons */}
          <div className="flex items-center p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            {tracks.map(track => (
              <button
                key={track}
                onClick={() => setSelectedTrack(track)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedTrack === track
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {track === 'All' ? '🌐 All Programs' : track}
              </button>
            ))}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* NVIDIA NIM Status Pill */}
            <button
              onClick={onOpenAISettings}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                hasNvidiaKey
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-500/50'
              }`}
              title="Configure NVIDIA NIM API Key"
            >
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[11px]">
                {hasNvidiaKey ? 'NVIDIA NIM Active' : 'Configure NVIDIA Key'}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${hasNvidiaKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            </button>

            {/* Ingest Applicant Button */}
            <button
              onClick={onOpenNewApplicant}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Ingest Form</span>
            </button>

            {/* Batch AI Automation Quick triggers */}
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button
                onClick={() => enrichAllPending()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition flex items-center gap-1 disabled:opacity-50"
                title="Run NVIDIA AI auto-enrichment on all incomplete records"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Enrich</span>
              </button>
              <button
                onClick={() => scoreAllUnscored()}
                disabled={isProcessing}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded transition flex items-center gap-1 disabled:opacity-50"
                title="Calculate NVIDIA AI multi-factor fit score for all applicants"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Score</span>
              </button>
            </div>

            {/* Export & Reset */}
            <button
              onClick={() => exportData('csv')}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Export CRM to Airtable CSV"
            >
              <Download className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={resetToSeedData}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Reset to Initial Seed Dataset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-4 border-t border-slate-800/60 pt-2.5 overflow-x-auto">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'roster'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Network & Pipeline</span>
            <span className="px-1.5 py-0.2 bg-slate-700/60 text-slate-300 text-[10px] rounded-full">
              {stats.totalProfiles}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'duplicates'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Duplicate & Quality Studio</span>
            {stats.duplicatesDetected > 0 && (
              <span className="px-1.5 py-0.2 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold rounded-full">
                {stats.duplicatesDetected} alerts
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('matchmaker')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'matchmaker'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
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
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'assistant'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Founder's Office Copilot</span>
          </button>

          <button
            onClick={() => setActiveTab('memo')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition ${
              activeTab === 'memo'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
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
