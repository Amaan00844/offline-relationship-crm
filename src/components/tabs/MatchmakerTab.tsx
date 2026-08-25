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
  Layers
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
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              AI Super-Connector & Matchmaking Engine
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Continuously solves for reciprocal network density. Identifies high-value complementarities where Member A's critical need is solved by Member B's superpower (and vice versa), auto-generating high-touch warm intro drafts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
            {matches.length} Total Connections Identified
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'pending'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ready for Intro ({matches.filter(m => m.status === 'Pending Review').length})
          </button>

          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'high'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🔥 High Affinity 85%+ ({matches.filter(m => m.matchScore >= 85).length})
          </button>

          <button
            onClick={() => setFilter('sent')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'sent'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dispatched / Sent ({matches.filter(m => m.status === 'Accepted & Sent').length})
          </button>

          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Suggestions ({matches.length})
          </button>
        </div>
      </div>

      {/* Match Cards List */}
      {filteredMatches.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h4 className="text-sm font-bold text-white">No Matches in this Category</h4>
          <p className="text-xs text-slate-400">All suggestions have been reviewed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5">
          {filteredMatches.map(match => (
            <div
              key={match.id}
              className={`p-5 rounded-2xl bg-slate-900/80 border transition space-y-4 shadow-xl ${
                match.status === 'Accepted & Sent'
                  ? 'border-emerald-500/40 bg-emerald-950/10'
                  : 'border-slate-800 hover:border-indigo-500/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Match Proposal: {match.memberA.name} & {match.memberB.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>Shared Focus:</span>
                      {match.sharedDomains.map((d, i) => (
                        <span key={i} className="text-indigo-300 font-medium">
                          #{d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <div className="px-3 py-1 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{match.matchScore}% Match Score</span>
                  </div>

                  <button
                    onClick={() => onOpenIntroModal(match)}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Draft Warm Intro</span>
                  </button>
                </div>
              </div>

              {/* Bipartite Need-Offer Visual Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Member A */}
                <div
                  onClick={() => onSelectMember(match.memberA)}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{match.memberA.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {match.memberA.programTrack}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {match.memberA.companyStage}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {match.memberA.standardizedRole} @ <span className="font-semibold text-white">{match.memberA.company}</span>
                  </div>

                  {/* Asks */}
                  {match.memberA.asks[0] && (
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                      <span className="font-bold text-[10px] block text-amber-400 uppercase">Active Ask:</span>
                      {match.memberA.asks[0]}
                    </div>
                  )}
                </div>

                {/* Member B */}
                <div
                  onClick={() => onSelectMember(match.memberB)}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{match.memberB.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                        {match.memberB.programTrack}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {match.memberB.companyStage}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">
                    {match.memberB.standardizedRole} @ <span className="font-semibold text-white">{match.memberB.company}</span>
                  </div>

                  {/* Gives */}
                  {match.memberB.gives[0] && (
                    <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200">
                      <span className="font-bold text-[10px] block text-emerald-400 uppercase">Superpower Give:</span>
                      {match.memberB.gives[0]}
                    </div>
                  )}
                </div>
              </div>

              {/* Match Thesis & Status Footer */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-slate-300">
                  <strong className="text-indigo-400 font-semibold">Value Thesis: </strong>
                  {match.matchThesis}
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
                  {match.status === 'Accepted & Sent' ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Dispatched
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
