import React, { useState } from 'react';
import { useCRM } from '../../context/CRMContext';
import { MemberProfile, NetworkQueryInsight } from '../../types';
import { queryRelationshipWithNvidia } from '../../services/aiService';
import {
  Sparkles,
  Send,
  Search,
  Cpu,
  Bot,
  User,
  ArrowRight,
  Zap,
  Building,
  CheckCircle2,
  Loader2,
  Award,
  Flame,
  Lightbulb
} from 'lucide-react';

interface Props {
  onSelectMember: (member: MemberProfile) => void;
}

export const AIAssistantTab: React.FC<Props> = ({ onSelectMember }) => {
  const { members, nvidiaConfig } = useCRM();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [history, setHistory] = useState<NetworkQueryInsight[]>([
    {
      query: 'Who in our network can help an AI agent founder with US enterprise SOC2 and sales?',
      intent: 'Match early technical founder with senior engineering/security leaders',
      summary: 'Found 2 marquee operators with direct SOC2 Type II and US enterprise sales scaling playbooks: David Hoffman (Ex-Uber/AWS) and Elena Rostova (Ex-Stripe VP).',
      matchedMemberIds: ['mem-006', 'mem-002'],
      suggestedActions: [
        'Initiate double-opt-in warm intro with Vik Rao (AgentCraft AI)',
        'Invite David Hoffman to host private SOC2 masterclass for Offline Core'
      ]
    }
  ]);

  const quickCategories = [
    { label: '💰 Angel Checks ($50k+)', prompt: 'Find founders & operators who write $50k+ angel checks' },
    { label: '🛡️ SOC2 & Enterprise Security', prompt: 'Who can help an early founder scale enterprise SOC2 compliance?' },
    { label: '📈 Fintech Scale to $10M+ ARR', prompt: 'Who has scaled Fintech products from $0 to $10M+ ARR?' },
    { label: '🦄 Unicorn Engineering Leads', prompt: 'Find senior engineering operators from Uber, Stripe, or AWS' },
    { label: '🚀 High-Velocity OSS Founders', prompt: 'Which AI founders have breakthrough GitHub open-source traction?' }
  ];

  const handleRunQuery = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setQuery(searchQuery);
    try {
      const insight = await queryRelationshipWithNvidia(searchQuery, members, nvidiaConfig);
      setHistory(prev => [insight, ...prev]);
    } catch (e) {
      console.error('NVIDIA AI query failed', e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Assistant Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0B0F17] to-teal-950/30 border border-emerald-500/30 flex items-start gap-4 shadow-xl">
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/20">
          <Bot className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Founder's Office Relationship Copilot</h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300">
              NVIDIA Llama 3.3 70B
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ask complex relational questions about Offline Core, Encore, and TON members in plain English. The AI parses mutual needs, superpowers, and operational histories to generate instant high-signal answers.
          </p>
        </div>
      </div>

      {/* Query Input Box */}
      <div className="p-5 rounded-2xl luxury-card space-y-4 shadow-2xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRunQuery(query);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ask anything (e.g. 'Find all AI founders raising seed who need help with US sales')..."
            className="w-full pl-4 pr-28 py-3.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="absolute right-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition disabled:opacity-50 active:scale-95"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Query AI</span>
              </>
            )}
          </button>
        </form>

        {/* Quick category pills */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Quick Copilot Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {quickCategories.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleRunQuery(item.prompt)}
                className="text-[11px] px-3 py-1.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-slate-300 hover:text-white hover:border-emerald-500/40 hover:bg-white/[0.04] transition text-left font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Results Stream */}
      <div className="space-y-5">
        {history.map((item, idx) => {
          const matchedMembers = members.filter(m => item.matchedMemberIds?.includes(m.id));

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl luxury-card space-y-4 shadow-2xl animate-fadeIn"
            >
              {/* Question */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 font-mono">
                  Q
                </div>
                <div className="font-bold text-sm text-white">{item.query}</div>
              </div>

              {/* Answer / AI Summary */}
              <div className="flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-3.5 flex-1">
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {item.summary}
                  </p>

                  {/* Matched Member Recommendation Cards */}
                  {matchedMembers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {matchedMembers.map(member => (
                        <div
                          key={member.id}
                          onClick={() => onSelectMember(member)}
                          className="p-4 rounded-xl bg-[#090C12] border border-white/[0.08] hover:border-emerald-500/40 transition cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-xs text-white">{member.name}</div>
                            <span className="text-[10px] font-mono text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                              Fit: {member.fitScore.overall}%
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-300">
                            {member.standardizedRole} @ <span className="text-white font-medium">{member.company}</span>
                          </div>

                          {member.gives[0] && (
                            <div className="text-[10px] text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20 truncate">
                              <strong>Give:</strong> {member.gives[0]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggested Strategic Next Steps */}
                  {item.suggestedActions && item.suggestedActions.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/25 border border-emerald-500/25 text-xs text-emerald-200 space-y-1.5">
                      <span className="font-bold text-[10px] uppercase tracking-wider block text-emerald-300">
                        Strategic Next Steps for Founder's Office:
                      </span>
                      {item.suggestedActions.map((act, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
