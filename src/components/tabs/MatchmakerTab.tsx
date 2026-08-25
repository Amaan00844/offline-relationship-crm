import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { MatchSuggestion, MemberProfile } from '../../types';
import {
  Sparkles,
  Flame,
  Mail,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Send,
  Building,
  RefreshCw,
  Award,
  Layers,
  ArrowLeftRight
} from 'lucide-react';

interface Props {
  onOpenIntroModal: (match: MatchSuggestion) => void;
  onSelectMember: (member: MemberProfile) => void;
}

export const MatchmakerTab: React.FC<Props> = ({ onOpenIntroModal, onSelectMember }) => {
  const { matches, updateMatchStatus, members } = useCRM();
  const [filter, setFilter] = useState<'all' | 'pending' | 'sent' | 'high'>('pending');

  const filteredMatches = matches.filter(m => {
    if (filter === 'pending') return m.status === 'Pending Review';
    if (filter === 'sent') return m.status === 'Accepted & Sent';
    if (filter === 'high') return m.matchScore >= 85;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0B0F17] to-teal-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              AI Super-Connector & Matchmaking Engine
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Continuously solves for reciprocal network density across Offline Core and Encore. Pairs founders and senior operators based on mutual Need-Offer synergies and drafts tailored double-opt-in warm intros.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3.5 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-sm">
            {matches.length} Matches Synthesized
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilter('pending')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'pending'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ready for Intro ({matches.filter(m => m.status === 'Pending Review').length})
          </button>

          <button
            onClick={() => setFilter('high')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'high'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔥 High Affinity 85%+ ({matches.filter(m => m.matchScore >= 85).length})
          </button>

          <button
            onClick={() => setFilter('sent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'sent'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dispatched ({matches.filter(m => m.status === 'Accepted & Sent').length})
          </button>

          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-white/[0.08] text-white border border-white/10 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Suggestions ({matches.length})
          </button>
        </div>
      </div>

      {/* Match Cards List */}
      {filteredMatches.length === 0 ? (
        <div className="p-16 rounded-2xl luxury-card text-center space-y-3">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h4 className="text-base font-bold text-white">All Matching Introductions Reviewed</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            All current pair suggestions in this queue have been dispatched or reviewed.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredMatches.map(match => (
            <div
              key={match.id}
              className={`p-6 rounded-2xl luxury-card transition-all duration-200 space-y-5 ${
                match.status === 'Accepted & Sent'
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'hover:border-emerald-500/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <ArrowLeftRight className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{match.memberA.name}</span>
                      <span className="text-slate-500">&lt;&gt;</span>
                      <span>{match.memberB.name}</span>
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>Shared Cohort:</span>
                      {match.sharedDomains.map((d, i) => (
                        <span key={i} className="text-emerald-300 font-semibold">
                          #{d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-black text-xs flex items-center gap-1.5 shadow-sm">
                    <Flame className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{match.matchScore}% Match Score</span>
                  </div>

                  <button
                    onClick={() => onOpenIntroModal(match)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Draft Warm Intro</span>
                  </button>
                </div>
              </div>

              {/* Bipartite Need-Offer Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Member A Card */}
                <div
                  onClick={() => onSelectMember(match.memberA)}
                  className="p-4 rounded-xl bg-[#090C12] border border-white/[0.08] hover:border-white/20 transition cursor-pointer space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{match.memberA.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                        {match.memberA.programTrack}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {match.memberA.companyStage}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {match.memberA.standardizedRole} @ <span className="font-semibold text-white">{match.memberA.company}</span>
                  </div>

                  {/* Ask */}
                  {match.memberA.asks[0] && (
                    <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                      <span className="font-bold text-[10px] block text-amber-400 uppercase tracking-wider">Active Need / Ask:</span>
                      {match.memberA.asks[0]}
                    </div>
                  )}
                </div>

                {/* Member B Card */}
                <div
                  onClick={() => onSelectMember(match.memberB)}
                  className="p-4 rounded-xl bg-[#090C12] border border-white/[0.08] hover:border-white/20 transition cursor-pointer space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{match.memberB.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                        {match.memberB.programTrack}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {match.memberB.companyStage}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {match.memberB.standardizedRole} @ <span className="font-semibold text-white">{match.memberB.company}</span>
                  </div>

                  {/* Give */}
                  {match.memberB.gives[0] && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
                      <span className="font-bold text-[10px] block text-emerald-400 uppercase tracking-wider">Superpower / Give:</span>
                      {match.memberB.gives[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Match Thesis & Status Footer */}
              <div className="p-3.5 rounded-xl bg-[#090C12] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="text-slate-300">
                  <strong className="text-emerald-400 font-semibold">Value Thesis: </strong>
                  {match.matchThesis}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  {match.status === 'Accepted & Sent' ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Dispatched
                    </span>
                  ) : (
                    <button
                      onClick={() => updateMatchStatus(match.id, 'Accepted & Sent')}
                      className="text-[11px] text-slate-400 hover:text-emerald-300 transition"
                    >
                      Quick Mark as Sent
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
