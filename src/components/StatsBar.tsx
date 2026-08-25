import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Users, UserCheck, Clock, AlertTriangle, Target, Flame, Database } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { stats, selectedTrack } = useCRM();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
      {/* 1. Total Network */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Network Size</span>
          <Users className="w-3.5 h-3.5 text-indigo-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white font-mono">{stats.totalProfiles}</span>
          <span className="text-[10px] text-slate-400 font-sans truncate">
            {selectedTrack === 'All' ? 'across tracks' : selectedTrack}
          </span>
        </div>
      </div>

      {/* 2. Active Members */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Active Members</span>
          <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-emerald-400 font-mono">{stats.activeMembers}</span>
          <span className="text-[10px] text-emerald-400/80 font-sans">Admitted</span>
        </div>
      </div>

      {/* 3. Pending Review */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Review Queue</span>
          <Clock className="w-3.5 h-3.5 text-amber-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-amber-400 font-mono">{stats.pendingReview}</span>
          <span className="text-[10px] text-amber-400/80 font-sans">Pipeline</span>
        </div>
      </div>

      {/* 4. Duplicates Detected */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Duplicate Alerts</span>
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-rose-400 font-mono">{stats.duplicatesDetected}</span>
          <span className="text-[10px] text-rose-400/80 font-sans">Needs merge</span>
        </div>
      </div>

      {/* 5. Avg Fit Score */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Avg Network Fit</span>
          <Target className="w-3.5 h-3.5 text-purple-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-purple-300 font-mono">{stats.averageFitScore}</span>
          <span className="text-[10px] text-purple-400/80 font-sans">/ 100</span>
        </div>
      </div>

      {/* 6. Intros Ready */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px] font-medium tracking-wide uppercase">Intros Matched</span>
          <Flame className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-cyan-300 font-mono">{stats.highValueMatchesAvailable}</span>
          <span className="text-[10px] text-cyan-400/80 font-sans">High value</span>
        </div>
      </div>
    </div>
  );
};
