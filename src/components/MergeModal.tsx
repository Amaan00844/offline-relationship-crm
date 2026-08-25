import React, { useState } from 'react';
import { DuplicateMatchGroup, MemberProfile } from '../types';
import { useCRM } from '../context/CRMContext';
import {
  X,
  GitMerge,
  Check,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  UserCheck,
  Building,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

interface Props {
  group: DuplicateMatchGroup | null;
  onClose: () => void;
}

export const MergeModal: React.FC<Props> = ({ group, onClose }) => {
  const { mergeDuplicateGroup } = useCRM();

  if (!group || group.records.length < 2) return null;

  const recordA = group.records[0];
  const recordB = group.records[1];

  // Default master record is the recommended one
  const [masterId, setMasterId] = useState<string>(group.recommendedMasterRecordId || recordA.id);
  const [selectedEmail, setSelectedEmail] = useState<string>(
    recordA.email.includes('@gmail') ? recordB.email : recordA.email
  );
  const [selectedPhone, setSelectedPhone] = useState<string>(recordA.phone || recordB.phone || '');
  const [selectedLinkedIn, setSelectedLinkedIn] = useState<string>(
    recordA.linkedinUrl || recordB.linkedinUrl || ''
  );

  const handleMerge = () => {
    mergeDuplicateGroup(group.groupId, masterId, {
      email: selectedEmail,
      phone: selectedPhone,
      linkedinUrl: selectedLinkedIn
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">Duplicate Resolution Studio</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 font-mono font-bold">
                  {group.confidence}% Match Confidence
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Reason: {group.reason}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Master Record Selector */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              1. Select Primary / Surviving Record Identity
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMasterId(recordA.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                  masterId === recordA.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500'
                    : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    {recordA.name}
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 font-mono text-slate-300">
                      {recordA.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {recordA.standardizedRole} @ {recordA.company}
                  </div>
                  <div className="text-[11px] text-indigo-300 mt-1 font-mono">
                    Completeness: {recordA.completenessScore}%
                  </div>
                </div>
                {masterId === recordA.id && <Check className="w-5 h-5 text-indigo-400" />}
              </button>

              <button
                type="button"
                onClick={() => setMasterId(recordB.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                  masterId === recordB.id
                    ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500'
                    : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-2">
                    {recordB.name}
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700 font-mono text-slate-300">
                      {recordB.id}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {recordB.standardizedRole} @ {recordB.company}
                  </div>
                  <div className="text-[11px] text-indigo-300 mt-1 font-mono">
                    Completeness: {recordB.completenessScore}%
                  </div>
                </div>
                {masterId === recordB.id && <Check className="w-5 h-5 text-indigo-400" />}
              </button>
            </div>
          </div>

          {/* Side-by-Side Field Comparison */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              2. Field-by-Field Conflict Resolution
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Record A Column */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-indigo-400 flex items-center justify-between">
                  <span>Record A ({recordA.id})</span>
                  <span className="text-[10px] font-mono text-slate-500">{recordA.createdAt.slice(0, 10)}</span>
                </div>

                <div
                  onClick={() => setSelectedEmail(recordA.email)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedEmail === recordA.email
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Email Address</span>
                  <span className="font-mono font-medium">{recordA.email}</span>
                </div>

                <div
                  onClick={() => setSelectedPhone(recordA.phone || '')}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedPhone === recordA.phone
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Phone Number</span>
                  <span>{recordA.phone || '(empty)'}</span>
                </div>

                <div
                  onClick={() => setSelectedLinkedIn(recordA.linkedinUrl || '')}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedLinkedIn === recordA.linkedinUrl
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">LinkedIn URL</span>
                  <span className="truncate block">{recordA.linkedinUrl || '(empty)'}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block mb-1">Gives & Asks Count</span>
                  <span className="text-slate-300 font-medium">
                    {recordA.gives.length} gives • {recordA.asks.length} asks
                  </span>
                </div>
              </div>

              {/* Record B Column */}
              <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-purple-400 flex items-center justify-between">
                  <span>Record B ({recordB.id})</span>
                  <span className="text-[10px] font-mono text-slate-500">{recordB.createdAt.slice(0, 10)}</span>
                </div>

                <div
                  onClick={() => setSelectedEmail(recordB.email)}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedEmail === recordB.email
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Email Address</span>
                  <span className="font-mono font-medium">{recordB.email}</span>
                </div>

                <div
                  onClick={() => setSelectedPhone(recordB.phone || '')}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedPhone === recordB.phone
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">Phone Number</span>
                  <span>{recordB.phone || '(empty)'}</span>
                </div>

                <div
                  onClick={() => setSelectedLinkedIn(recordB.linkedinUrl || '')}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedLinkedIn === recordB.linkedinUrl
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] block opacity-75">LinkedIn URL</span>
                  <span className="truncate block">{recordB.linkedinUrl || '(empty)'}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-[10px] text-slate-500 block mb-1">Gives & Asks Count</span>
                  <span className="text-slate-300 font-medium">
                    {recordB.gives.length} gives • {recordB.asks.length} asks
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Automatic Union synthesis note */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Intelligent Data Synthesis</p>
              <p className="text-[11px] text-indigo-300/80 mt-0.5">
                Merging automatically unions all unique Gives, Asks, and Domain tags from both profiles, appends notes, and preserves the highest verified pedigree signals.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleMerge}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95"
          >
            <GitMerge className="w-4 h-4" />
            <span>Merge & Cleanse Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};
