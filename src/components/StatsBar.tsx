import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Users, UserCheck, Clock, AlertTriangle, Target, Flame, TrendingUp } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { stats, selectedTrack } = useCRM();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
      {/* 1. Total Network */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-indigo-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Network Size</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white font-mono tracking-tight">{stats.totalProfiles}</span>
          <span className="text-[10px] text-slate-400 font-medium truncate">
            {selectedTrack === 'All' ? 'in network' : selectedTrack}
          </span>
        </div>
      </div>

      {/* 2. Active Members */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-emerald-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Admitted Members</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{stats.activeMembers}</span>
          <span className="text-[10px] text-emerald-400/80 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> Active
          </span>
        </div>
      </div>

      {/* 3. Pending Review */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-amber-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Review Pipeline</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-400 font-mono tracking-tight">{stats.pendingReview}</span>
          <span className="text-[10px] text-amber-400/80 font-medium">In Queue</span>
        </div>
      </div>

      {/* 4. Duplicates Detected */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-rose-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Duplicate Alerts</span>
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-400 font-mono tracking-tight">{stats.duplicatesDetected}</span>
          <span className="text-[10px] text-rose-400/80 font-medium">Merge Ready</span>
        </div>
      </div>

      {/* 5. Avg Fit Score */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-purple-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Network Fit</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition">
            <Target className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-300 font-mono tracking-tight">{stats.averageFitScore}</span>
          <span className="text-[10px] text-purple-400/80 font-medium">/ 100 avg</span>
        </div>
      </div>

      {/* 6. Intros Ready */}
      <div className="p-4 rounded-2xl bg-gradient-to-b from-[#111723]/90 to-[#0C1018]/90 border border-white/[0.08] backdrop-blur-xl shadow-luxury hover:border-cyan-500/40 transition-all group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">Intros Matched</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
            <Flame className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-300 font-mono tracking-tight">{stats.highValueMatchesAvailable}</span>
          <span className="text-[10px] text-cyan-400/80 font-medium">High Impact</span>
        </div>
      </div>
    </div>
  );
};
