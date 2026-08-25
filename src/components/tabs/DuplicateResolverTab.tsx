import React from 'react';
import { useCRM } from '../../context/CRMContext';
import { MemberProfile } from '../../types';
import {
  GitMerge,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Check
} from 'lucide-react';

interface Props {
  onOpenMerge: (groupId: string) => void;
  onSelectMember: (member: MemberProfile) => void;
}

export const DuplicateResolverTab: React.FC<Props> = ({ onOpenMerge, onSelectMember }) => {
  const {
    members,
    duplicateGroups,
    enrichRecord,
    enrichAllPending,
    isProcessing,
    activeProcessingTask
  } = useCRM();

  const incompleteMembers = members.filter(
    m => (m.completenessScore < 80 || m.missingFields.length > 0) && !m.isDuplicate
  );

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Data Quality & Deduplication Engine
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Continuously cleanses Airtable/Typeform noise. Detects multi-vector duplicates across normalized phone numbers, verified LinkedIn handles, and personal vs corporate email re-applications.
            </p>
          </div>
        </div>

        {incompleteMembers.length > 0 && (
          <button
            onClick={() => enrichAllPending()}
            disabled={isProcessing}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition whitespace-nowrap active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Auto-Enrich All Incomplete ({incompleteMembers.length})</span>
          </button>
        )}
      </div>

      {/* Section 1: Detected Duplicate Groups */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitMerge className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              1. Duplicate Clusters Requiring Resolution ({duplicateGroups.length})
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Fuzzy matching threshold: 80%+
          </span>
        </div>

        {duplicateGroups.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h5 className="text-sm font-bold text-white">All Duplicate Records Cleared!</h5>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your network database is clean and consolidated with zero pending merge conflicts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {duplicateGroups.map(group => {
              const recA = group.records[0];
              const recB = group.records[1];
              if (!recA || !recB) return null;

              return (
                <div
                  key={group.groupId}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 transition space-y-4 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                      <span className="font-bold text-sm text-white">
                        Cluster: {recA.name} & {recB.name}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono font-bold">
                        {group.confidence}% Confidence
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenMerge(group.groupId)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 transition active:scale-95 self-start sm:self-auto"
                    >
                      <GitMerge className="w-4 h-4" />
                      <span>Review & Merge Records</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    <span>Detection Rationale: {group.reason}</span>
                  </p>

                  {/* Side-by-side snapshot */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Record A */}
                    <div
                      onClick={() => onSelectMember(recA)}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-indigo-400">ID: {recA.id}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                          Health: {recA.completenessScore}%
                        </span>
                      </div>
                      <div className="font-bold text-xs text-white">{recA.name}</div>
                      <div className="text-[11px] text-slate-300">
                        {recA.standardizedRole} @ {recA.company}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{recA.email}</div>
                    </div>

                    {/* Record B */}
                    <div
                      onClick={() => onSelectMember(recB)}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-purple-400">ID: {recB.id}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-slate-300">
                          Health: {recB.completenessScore}%
                        </span>
                      </div>
                      <div className="font-bold text-xs text-white">{recB.name}</div>
                      <div className="text-[11px] text-slate-300">
                        {recB.standardizedRole} @ {recB.company}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{recB.email}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Incomplete Records Queue */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              2. Incomplete Applications Awaiting AI Auto-Enrichment ({incompleteMembers.length})
            </h4>
          </div>
          <span className="text-xs text-slate-400">
            Profiles with missing Asks, Gives, or Verified Roles
          </span>
        </div>

        {incompleteMembers.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400">
            All records meet high data completeness thresholds.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incompleteMembers.map(member => (
              <div
                key={member.id}
                className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5
                      onClick={() => onSelectMember(member)}
                      className="font-bold text-sm text-white hover:text-indigo-400 transition cursor-pointer"
                    >
                      {member.name}
                    </h5>
                    <p className="text-xs text-slate-400">
                      {member.rawRole} @ {member.company}
                    </p>
                  </div>

                  <button
                    onClick={() => enrichRecord(member.id)}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold hover:bg-purple-900 transition flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Auto-Enrich</span>
                  </button>
                </div>

                {/* Missing fields tags */}
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">
                    Missing Information:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.missingFields.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/30 text-rose-300"
                      >
                        Missing {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800 truncate">
                  Raw note: "{member.rawNotes || 'No notes provided'}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
