import React, { useState } from 'react';
import { useCRM } from '../context/CRMContext';
import { MemberProfile, CompanyStage, ProgramTrack } from '../types';
import { X, Sparkles, Wand2, UserPlus, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectMember?: (member: MemberProfile) => void;
}

export const NewApplicantModal: React.FC<Props> = ({ isOpen, onClose, onSelectMember }) => {
  const { addRecord, enrichRecord, scoreRecord } = useCRM();

  const [rawText, setRawText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [rawRole, setRawRole] = useState('');
  const [companyStage, setCompanyStage] = useState<CompanyStage>('Seed');
  const [location, setLocation] = useState('San Francisco, CA');
  const [programTrack, setProgramTrack] = useState<ProgramTrack>('Offline Core');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [phone, setPhone] = useState('');
  const [rawNotes, setRawNotes] = useState('');
  const [domainsInput, setDomainsInput] = useState('AI / LLMs, B2B SaaS');
  const [asksInput, setAsksInput] = useState('');
  const [givesInput, setGivesInput] = useState('');

  if (!isOpen) return null;

  // Auto-parse messy pasted text (e.g. from Airtable row or email)
  const handleAutoParseRawText = () => {
    if (!rawText.trim()) return;

    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    let parsedName = '';
    let parsedEmail = '';
    let parsedCompany = '';
    let parsedRole = '';
    let parsedLi = '';

    for (const line of lines) {
      if (line.includes('@') && !parsedEmail) {
        const match = line.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (match) parsedEmail = match[0];
      }
      if (line.toLowerCase().includes('linkedin.com') && !parsedLi) {
        parsedLi = line;
      }
      if (line.toLowerCase().includes('ceo') || line.toLowerCase().includes('founder') || line.toLowerCase().includes('vp') || line.toLowerCase().includes('cpo')) {
        if (!parsedRole) parsedRole = line;
      }
    }

    if (lines.length > 0 && !parsedName) {
      parsedName = lines[0].replace(/name:?/i, '').trim();
    }

    if (parsedName) setName(parsedName);
    if (parsedEmail) setEmail(parsedEmail);
    if (parsedRole) setRawRole(parsedRole);
    if (parsedLi) setLinkedinUrl(parsedLi);
    setRawNotes(rawText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const domains = domainsInput.split(',').map(s => s.trim()).filter(Boolean);
    const asks = asksInput.split('\n').map(s => s.trim()).filter(Boolean);
    const gives = givesInput.split('\n').map(s => s.trim()).filter(Boolean);

    const newRecord = addRecord({
      name: name || 'New Applicant',
      email,
      company: company || 'Stealth / Tech',
      rawRole: rawRole || 'Founder',
      companyStage,
      location,
      programTrack,
      linkedinUrl,
      phone,
      rawNotes,
      domains,
      asks,
      gives,
      status: 'Raw'
    });

    onClose();

    // Trigger AI pipeline in background
    setTimeout(async () => {
      await enrichRecord(newRecord.id);
      await scoreRecord(newRecord.id);
      if (onSelectMember) onSelectMember(newRecord);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Ingest Application / Raw Profile</h2>
              <p className="text-xs text-slate-400">Simulate Airtable webhook, Typeform, or manual submission</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Quick Paste Raw Text helper */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5" />
                Quick Paste / Raw Ingestion Dump
              </span>
              <button
                type="button"
                onClick={handleAutoParseRawText}
                className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-900/60 transition"
              >
                Auto-Extract Fields
              </button>
            </div>
            <textarea
              rows={2}
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              placeholder="Paste raw Airtable cell, LinkedIn bio, or application email snippet here..."
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                required
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Samantha Wright"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="samantha@axoninfra.com"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Company / Project *</label>
              <input
                required
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="e.g. Axon Infrastructure"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Raw Role / Title</label>
              <input
                type="text"
                value={rawRole}
                onChange={e => setRawRole(e.target.value)}
                placeholder="e.g. Founder & CEO / Head of Hacker Team"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Company Stage</label>
              <select
                value={companyStage}
                onChange={e => setCompanyStage(e.target.value as CompanyStage)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B+">Series B+</option>
                <option value="Bootstrapped">Bootstrapped</option>
                <option value="Public/Exited">Public/Exited</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Program Track</label>
              <select
                value={programTrack}
                onChange={e => setProgramTrack(e.target.value as ProgramTrack)}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
              >
                <option value="Offline Core">Offline Core (Founders)</option>
                <option value="Encore">Encore (Senior Execs & C-Suite)</option>
                <option value="The Offline Network (TON)">The Offline Network (TON)</option>
                <option value="General Applicant">General Applicant</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">LinkedIn Profile</label>
              <input
                type="text"
                value={linkedinUrl}
                onChange={e => setLinkedinUrl(e.target.value)}
                placeholder="linkedin.com/in/username"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="(415) 555-0199 or +91 98200..."
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Domains / Tech Areas (comma separated)</label>
            <input
              type="text"
              value={domainsInput}
              onChange={e => setDomainsInput(e.target.value)}
              placeholder="AI / LLMs, DevTools, Fintech, Enterprise"
              className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">What they need / Asks (1 per line)</label>
              <textarea
                rows={2}
                value={asksInput}
                onChange={e => setAsksInput(e.target.value)}
                placeholder="e.g. Tactical advice on US SOC2&#10;Series A lead investor intros"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">What they offer / Gives (1 per line)</label>
              <textarea
                rows={2}
                value={givesInput}
                onChange={e => setGivesInput(e.target.value)}
                placeholder="e.g. $50k angel checks&#10;Architecture teardowns for low-latency models"
                className="w-full px-3 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>
              Upon submission, the automated AI pipeline will normalize data, scan for duplicate entries, extract persona classification, and compute fit score.
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ingest & Run AI Pipeline</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
