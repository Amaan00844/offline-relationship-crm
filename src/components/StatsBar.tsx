import React from 'react';
import { useCRM } from '../context/CRMContext';
import { Users, UserCheck, Clock, AlertTriangle, Target, Flame, TrendingUp, ShieldCheck } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { stats, selectedTrack } = useCRM();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-6">
      {/* 1. Total Network Size */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">Total Network</span>
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition">
            <Users className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white font-mono tracking-tight">{stats.totalProfiles}</span>
          <span className="text-[10px] text-indigo-400 font-semibold px-1.5 py-0.2 rounded bg-indigo-950/60 border border-indigo-500/20">
            {selectedTrack === 'All' ? '3 Tracks' : selectedTrack.slice(0, 10)}
          </span>
        </div>
      </div>

      {/* 2. Active Admitted Members */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400/90">Active Members</span>
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight">{stats.activeMembers}</span>
          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +14%
          </span>
        </div>
      </div>

      {/* 3. Review Queue Pipeline */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400/90">Review Queue</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-300 font-mono tracking-tight">{stats.pendingReview}</span>
          <span className="text-[10px] text-amber-400/80 font-medium font-mono">
            &lt; 24h SLA
          </span>
        </div>
      </div>

      {/* 4. Duplicate Alerts */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-rose-400/90">Duplicate Alerts</span>
          <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition">
            <AlertTriangle className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-400 font-mono tracking-tight">{stats.duplicatesDetected}</span>
          <span className="text-[10px] text-rose-400/80 font-semibold px-1.5 py-0.2 rounded bg-rose-950/60 border border-rose-500/20">
            Fuzzy 80%+
          </span>
        </div>
      </div>

      {/* 5. Average Fit Score */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400/90">Avg Fit Score</span>
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition">
            <Target className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-300 font-mono tracking-tight">{stats.averageFitScore}</span>
          <span className="text-[10px] text-purple-400/80 font-medium">/ 100 benchmark</span>
        </div>
      </div>

      {/* 6. AI Intros Matched */}
      <div className="p-4 rounded-2xl luxury-card luxury-card-hover group">
        <div className="flex items-center justify-between text-slate-400 mb-1.5">
          <span className="text-[11px] font-bold tracking-wider uppercase text-cyan-400/90">Intros Ready</span>
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
            <Flame className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-cyan-300 font-mono tracking-tight">{stats.highValueMatchesAvailable}</span>
          <span className="text-[10px] text-cyan-400 font-semibold px-1.5 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/20">
            High Synergy
          </span>
        </div>
      </div>
    </div>
  );
};
