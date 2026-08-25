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
  ArrowUpDown
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
    if (score >= 90) return 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300';
    if (score >= 75) return 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300';
    if (score >= 50) return 'bg-amber-950/80 border-amber-500/40 text-amber-300';
    return 'bg-rose-950/80 border-rose-500/40 text-rose-300';
  };

  return (
    <div className="space-y-4">
      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={localSearch}
            onChange={e => setLocalSearch(e.target.value)}
            placeholder="Search by founder, company, domain, backing (e.g. 'YC', 'DevTools', 'Stripe')..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Domain Filter */}
          <select
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Domains</option>
            {allDomains.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Accepted">Accepted Members</option>
            <option value="Scored">Scored (Ready for Review)</option>
            <option value="Enriched">Enriched</option>
            <option value="Raw">Raw Applicants</option>
            <option value="Duplicates">Duplicate Alerts</option>
            <option value="Declined">Declined</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="fit">Sort: Fit Score (High to Low)</option>
            <option value="completeness">Sort: Completeness</option>
            <option value="date">Sort: Newest First</option>
            <option value="name">Sort: Name</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <TableIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'kanban' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'
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
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Member / Applicant</th>
                  <th className="py-3 px-4">Role & Stage</th>
                  <th className="py-3 px-4">Program Track</th>
                  <th className="py-3 px-4 text-center">Fit Score</th>
                  <th className="py-3 px-4">Core Asks & Gives</th>
                  <th className="py-3 px-4">Status & Quality</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No records match the current filters.
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map(member => (
                    <tr
                      key={member.id}
                      onClick={() => onSelectMember(member)}
                      className={`hover:bg-slate-800/40 transition cursor-pointer ${
                        member.isDuplicate ? 'bg-rose-950/10' : ''
                      }`}
                    >
                      {/* Column 1: Member Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {member.avatarUrl ? (
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                              {member.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{member.name}</span>
                              {member.isDuplicate && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-950 border border-rose-500/40 text-rose-300">
                                  DUP
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Role & Stage */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-200">{member.standardizedRole}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="text-white font-semibold">{member.company}</span>
                          <span className="text-slate-600">•</span>
                          <span className="font-mono text-[10px] text-indigo-300">
                            {member.companyStage}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: Program Track */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                            member.programTrack === 'Offline Core'
                              ? 'bg-indigo-950/70 border-indigo-500/30 text-indigo-300'
                              : member.programTrack === 'Encore'
                              ? 'bg-purple-950/70 border-purple-500/30 text-purple-300'
                              : 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
                          }`}
                        >
                          {member.programTrack}
                        </span>
                      </td>

                      {/* Column 4: Fit Score */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg font-mono font-bold text-xs border ${getScoreBadge(
                              member.fitScore?.overall || 0
                            )}`}
                          >
                            {member.fitScore?.overall || '--'}
                          </span>
                          <span className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[90px]">
                            {member.fitScore?.actionRecommendation?.split(' ')[0] || ''}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Gives / Asks */}
                      <td className="py-3 px-4 max-w-xs">
                        <div className="space-y-1">
                          {member.gives && member.gives.length > 0 && (
                            <div className="text-[11px] text-emerald-400/90 truncate flex items-center gap-1">
                              <span className="font-bold text-[9px] px-1 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                                GIVE
                              </span>
                              <span className="truncate">{member.gives[0]}</span>
                            </div>
                          )}
                          {member.asks && member.asks.length > 0 && (
                            <div className="text-[11px] text-amber-400/90 truncate flex items-center gap-1">
                              <span className="font-bold text-[9px] px-1 rounded bg-amber-950 border border-amber-500/30 text-amber-300">
                                ASK
                              </span>
                              <span className="truncate">{member.asks[0]}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Column 6: Status & Completeness */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              member.status === 'Accepted'
                                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300'
                                : member.status === 'Declined'
                                ? 'bg-rose-950 border-rose-500/40 text-rose-300'
                                : member.status === 'Scored'
                                ? 'bg-indigo-950 border-indigo-500/40 text-indigo-300'
                                : 'bg-slate-800 border-slate-700 text-slate-300'
                            }`}
                          >
                            {member.status}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>Health:</span>
                            <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className={`h-full ${
                                  member.completenessScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                                }`}
                                style={{ width: `${member.completenessScore}%` }}
                              />
                            </div>
                            <span className="font-mono">{member.completenessScore}%</span>
                          </div>
                        </div>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="py-3 px-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={e => e.stopPropagation()}
                        >
                          {member.isDuplicate && member.duplicateGroupId ? (
                            <button
                              onClick={() => onOpenMerge(member.duplicateGroupId!)}
                              className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/50 text-amber-300 text-[10px] font-bold hover:bg-amber-900 transition"
                            >
                              Merge
                            </button>
                          ) : (
                            <>
                              {member.status !== 'Accepted' && (
                                <button
                                  onClick={() => acceptApplicant(member.id)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950 text-slate-400 hover:text-emerald-400 transition"
                                  title="Accept Member"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => onSelectMember(member)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-950 text-slate-400 hover:text-indigo-400 transition"
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
            { title: '1. Raw Ingestion', statuses: ['Raw'], color: 'border-slate-700' },
            { title: '2. Cleaned & Enriched', statuses: ['Cleaned', 'Enriched'], color: 'border-indigo-500/30' },
            { title: '3. Scored & In Review', statuses: ['Scored'], color: 'border-amber-500/30' },
            { title: '4. Admitted Members', statuses: ['Accepted'], color: 'border-emerald-500/30' }
          ].map(col => {
            const colMembers = filteredMembers.filter(m => col.statuses.includes(m.status));
            return (
              <div key={col.title} className="p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-slate-200">{col.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
                    {colMembers.length}
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
                  {colMembers.map(member => (
                    <div
                      key={member.id}
                      onClick={() => onSelectMember(member)}
                      className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition cursor-pointer space-y-2 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-white leading-tight">
                          {member.name}
                        </div>
                        <span
                          className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold border ${getScoreBadge(
                            member.fitScore?.overall || 0
                          )}`}
                        >
                          {member.fitScore?.overall || '--'}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        {member.standardizedRole} @ <span className="text-slate-200">{member.company}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {member.domains?.slice(0, 2).map((d, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
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
