import React, { useState } from 'react';
import { MemberProfile, ProgramTrack } from '../../types';
import { useCRM } from '../../context/CRMContext';
import {
  Search,
  Filter,
  Layers,
  Kanban,
  Table as TableIcon,
  Sparkles,
  Zap,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  Building,
  ArrowUpDown,
  Tag
} from 'lucide-react';

interface Props {
  onSelectMember: (member: MemberProfile) => void;
  onOpenMerge: (groupId: string) => void;
}

export const NetworkRosterTab: React.FC<Props> = ({ onSelectMember, onOpenMerge }) => {
  const {
    members,
    selectedTrack,
    enrichRecord,
    scoreRecord,
    acceptApplicant,
    isProcessing
  } = useCRM();

  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [localSearch, setLocalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'fit' | 'date' | 'name' | 'completeness'>('fit');

  // Collect all unique domains
  const allDomains = Array.from(
    new Set(members.flatMap(m => m.domains || []))
  ).filter(Boolean);

  // Filtered and sorted members
  const filteredMembers = members.filter(m => {
    // Track filter
    if (selectedTrack !== 'All' && m.programTrack !== selectedTrack) return false;

    // Status filter
    if (statusFilter === 'Duplicates') return m.isDuplicate;
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;

    // Domain filter
    if (selectedDomain !== 'All' && !m.domains?.includes(selectedDomain)) return false;

    // Search query
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase();
      const haystack = `${m.name} ${m.company} ${m.standardizedRole} ${m.rawRole} ${m.email} ${m.domains?.join(' ')} ${m.backingOrPedigree} ${m.location}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'fit') return (b.fitScore?.overall || 0) - (a.fitScore?.overall || 0);
    if (sortBy === 'completeness') return (b.completenessScore || 0) - (a.completenessScore || 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/10';
    if (score >= 75) return 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300';
    if (score >= 50) return 'bg-amber-950/80 border-amber-500/50 text-amber-300';
    return 'bg-rose-950/80 border-rose-500/50 text-rose-300';
  };

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'Seed':
        return 'bg-cyan-950/70 border-cyan-500/30 text-cyan-300';
      case 'Series A':
        return 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300';
      case 'Series B+':
        return 'bg-purple-950/70 border-purple-500/30 text-purple-300';
      case 'Bootstrapped':
        return 'bg-amber-950/70 border-amber-500/30 text-amber-300';
      case 'Public/Exited':
        return 'bg-gold-950/70 border-amber-400/40 text-amber-200';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-4">
      {/* Control & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-4 rounded-2xl luxury-card">
        {/* Search Input with Hotkey badge */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder="Search by founder, company, domain, backing (e.g. 'YC', 'DevTools', 'Stripe', 'Benchmark')..."
            className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            ⌘K
          </kbd>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 font-medium"
          >
            <option value="All">All Domains ({allDomains.length})</option>
            {allDomains.map(d => (
              <option key={d} value={d}>
                #{d}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 font-medium"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted Members</option>
            <option value="Scored">Scored (In Review)</option>
            <option value="Enriched">Enriched</option>
            <option value="Raw">Raw Ingestion</option>
            <option value="Duplicates">Duplicate Alerts</option>
            <option value="Declined">Declined</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3.5 py-2.5 rounded-xl bg-[#090C12] border border-white/[0.08] text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 font-medium"
          >
            <option value="fit">Sort: Fit Score (High to Low)</option>
            <option value="completeness">Sort: Data Health</option>
            <option value="date">Sort: Newest First</option>
            <option value="name">Sort: Alphabetical</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-[#090C12] border border-white/[0.08] shadow-inner">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'kanban' ? 'bg-white/[0.1] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Pipeline Kanban View"
            >
              <Kanban className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Rendering */}
      {viewMode === 'table' ? (
        <div className="rounded-2xl luxury-card overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#080B11]/90 border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <tr>
                  <th className="py-3.5 px-4">Member / Founder</th>
                  <th className="py-3.5 px-4">Role & Stage</th>
                  <th className="py-3.5 px-4">Program Track</th>
                  <th className="py-3.5 px-4 text-center">Fit Score</th>
                  <th className="py-3.5 px-4">Core Asks & Gives</th>
                  <th className="py-3.5 px-4">Quality & Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center text-slate-500">
                      No records match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map(member => (
                    <tr
                      key={member.id}
                      onClick={() => onSelectMember(member)}
                      className={`hover:bg-white/[0.04] transition-all duration-150 cursor-pointer ${
                        member.isDuplicate ? 'bg-rose-950/15 border-l-2 border-rose-500' : ''
                      }`}
                    >
                      {/* Column 1: Member Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-10 h-10 rounded-xl object-cover border border-white/10 shadow-sm"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-indigo-500/20 border border-white/10 text-emerald-300 font-bold flex items-center justify-center text-xs">
                              {member.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                              <span>{member.name}</span>
                              {member.isDuplicate && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-950 border border-rose-500/40 text-rose-300">
                                  DUPLICATE
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[180px] font-mono">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Role & Stage */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-200">{member.standardizedRole}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="text-white font-medium">{member.company}</span>
                          <span className="text-slate-600">•</span>
                          <span className={`font-mono text-[10px] px-2 py-0.2 rounded-full border ${getStageBadge(member.companyStage)}`}>
                            {member.companyStage}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: Program Track */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            member.programTrack === 'Offline Core'
                              ? 'bg-amber-950/70 border-amber-500/40 text-amber-300'
                              : member.programTrack === 'Encore'
                              ? 'bg-purple-950/70 border-purple-500/40 text-purple-300'
                              : 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                          }`}
                        >
                          {member.programTrack}
                        </span>
                      </td>

                      {/* Column 4: Fit Score */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={`px-2.5 py-1 rounded-xl font-mono font-black text-xs border ${getScoreBadge(
                              member.fitScore?.overall || 0
                            )}`}
                          >
                            {member.fitScore?.overall || '--'}
                          </span>
                          <span className="text-[9px] text-slate-400 mt-1 truncate max-w-[95px] font-medium">
                            {member.fitScore?.actionRecommendation?.split(' ')[0] || ''}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Gives / Asks */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="space-y-1.5">
                          {member.gives && member.gives.length > 0 && (
                            <div className="text-[11px] text-emerald-300/90 truncate flex items-center gap-1.5">
                              <span className="font-bold text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/90 border border-emerald-500/30 text-emerald-400">
                                GIVE
                              </span>
                              <span className="truncate">{member.gives[0]}</span>
                            </div>
                          )}
                          {member.asks && member.asks.length > 0 && (
                            <div className="text-[11px] text-amber-300/90 truncate flex items-center gap-1.5">
                              <span className="font-bold text-[9px] px-1.5 py-0.2 rounded bg-amber-950/90 border border-amber-500/30 text-amber-400">
                                ASK
                              </span>
                              <span className="truncate">{member.asks[0]}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 6: Status & Completeness */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1.5">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              member.status === 'Accepted'
                                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                                : member.status === 'Declined'
                                ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                                : member.status === 'Scored'
                                ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            ● {member.status}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>Health:</span>
                            <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${
                                  member.completenessScore >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                                }`}
                                style={{ width: `${member.completenessScore}%` }}
                              />
                            </div>
                            <span className="font-mono">{member.completenessScore}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={e => e.stopPropagation()}
                        >
                          {member.isDuplicate && member.duplicateGroupId ? (
                            <button
                              onClick={() => onOpenMerge(member.duplicateGroupId!)}
                              className="px-3 py-1.5 rounded-lg bg-amber-950/90 border border-amber-500/50 text-amber-300 text-[11px] font-bold hover:bg-amber-900 transition shadow-sm"
                            >
                              Merge
                            </button>
                          ) : (
                            <>
                              {member.status !== 'Accepted' && (
                                <button
                                  onClick={() => acceptApplicant(member.id)}
                                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-emerald-950 text-slate-400 hover:text-emerald-400 border border-white/[0.08] transition"
                                  title="Accept Member"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => onSelectMember(member)}
                                className="p-2 rounded-xl bg-white/[0.04] hover:bg-indigo-950 text-slate-400 hover:text-indigo-400 border border-white/[0.08] transition"
                                title="View Member Details"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban Pipeline View */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: '1. Raw Ingestion', statuses: ['Raw'], badgeColor: 'bg-slate-800' },
            { title: '2. Enriched & Tagged', statuses: ['Cleaned', 'Enriched'], badgeColor: 'bg-purple-950 text-purple-300 border border-purple-500/30' },
            { title: '3. Scored & In Review', statuses: ['Scored'], badgeColor: 'bg-amber-950 text-amber-300 border border-amber-500/30' },
            { title: '4. Admitted Members', statuses: ['Accepted'], badgeColor: 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' }
          ].map(col => {
            const colMembers = filteredMembers.filter(m => col.statuses.includes(m.status));
            return (
              <div key={col.title} className="p-4 rounded-2xl luxury-card space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                  <span className="text-xs font-bold text-white tracking-wide">{col.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${col.badgeColor}`}>
                    {colMembers.length}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
                  {colMembers.map(member => (
                    <div
                      key={member.id}
                      onClick={() => onSelectMember(member)}
                      className="p-3.5 rounded-xl bg-[#090C12] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-150 cursor-pointer space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-white leading-tight">
                          {member.name}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-lg font-mono text-[10px] font-black border ${getScoreBadge(
                            member.fitScore?.overall || 0
                          )}`}
                        >
                          {member.fitScore?.overall || '--'}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        {member.standardizedRole} @ <span className="text-slate-200 font-medium">{member.company}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {member.domains?.slice(0, 2).map((d, i) => (
                          <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                            #{d}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
