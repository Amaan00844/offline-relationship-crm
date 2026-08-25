import React, { useState } from 'react';
import { MemberProfile } from '../types';
import { useCRM } from '../context/CRMContext';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Share2,
  Building,
  MapPin,
  Award,
  AlertTriangle,
  Flame,
  ArrowRight,
  Send,
  Copy,
  Check
} from 'lucide-react';

interface Props {
  member: MemberProfile | null;
  onClose: () => void;
  onFindMatches: (member: MemberProfile) => void;
}

export const MemberDetailDrawer: React.FC<Props> = ({ member, onClose, onFindMatches }) => {
  const {
    enrichRecord,
    scoreRecord,
    acceptApplicant,
    declineApplicant,
    isProcessing,
    activeProcessingTask
  } = useCRM();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);

  if (!member) return null;

  const handleAccept = () => {
    acceptApplicant(member.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDecline = () => {
    declineApplicant(member.id);
    setShowDeclineModal(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/40';
    if (score >= 75) return 'text-indigo-400 border-indigo-500/40 bg-indigo-950/40';
    if (score >= 50) return 'text-amber-400 border-amber-500/40 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/40 bg-rose-950/40';
  };

  const declineEmailBody = `Hi ${member.name.split(' ')[0]},\n\nThank you for applying to join Offline. We review every application with great care.\n\nWhile we were impressed by your work at ${member.company}, our current cohort is focused closely on specific peer operator/founder stage groups, and we unfortunately cannot extend an invitation at this time.\n\nWe'll keep your details on file and reach out as we open future chapters and thematic salons.\n\nWarmly,\nThe Offline Team`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn flex justify-end">
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {member.id}
            </span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                member.status === 'Accepted'
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                  : member.status === 'Declined'
                  ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                  : member.status === 'Scored'
                  ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300'
                  : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
              }`}
            >
              ● {member.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Main Identity Banner */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              {member.avatarUrl ? (
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-700 shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-xl text-indigo-300">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  {member.name}
                  {member.isDuplicate && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950 border border-rose-500/40 text-rose-300">
                      DUPLICATE ALERT
                    </span>
                  )}
                </h2>
                <div className="text-sm font-medium text-slate-300 mt-0.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{member.standardizedRole}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white font-semibold">{member.company}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {member.companyStage}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {member.location}
                  </span>
                  <span className="text-indigo-400 font-medium">
                    Track: {member.programTrack}
                  </span>
                </div>
              </div>
            </div>

            {/* Fit Score Badge */}
            <div className={`p-3 rounded-2xl border flex flex-col items-center justify-center min-w-[90px] ${getScoreColor(member.fitScore?.overall || 0)}`}>
              <span className="text-[10px] font-semibold uppercase tracking-wider">FIT SCORE</span>
              <span className="text-2xl font-black font-mono">{member.fitScore?.overall || '--'}</span>
              <span className="text-[9px] opacity-80">/ 100</span>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => enrichRecord(member.id)}
              disabled={isProcessing}
              className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-900/60 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Auto-Enrich</span>
            </button>

            <button
              onClick={() => scoreRecord(member.id)}
              disabled={isProcessing}
              className="px-3 py-2 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-indigo-200 text-xs font-semibold hover:bg-indigo-900/60 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Recalculate Fit</span>
            </button>

            <button
              onClick={handleAccept}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Accept Member</span>
            </button>

            <button
              onClick={() => setShowDeclineModal(true)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-500/40 border border-slate-700 text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Decline / Email</span>
            </button>
          </div>

          {/* AI Fit Analysis Card */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-400" />
                AI Admissions Intelligence
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                {member.fitScore?.actionRecommendation || 'Under Review'}
              </span>
            </div>

            {/* Metric Meters */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Pedigree & Velocity</span>
                <span className="text-lg font-bold text-white font-mono">{member.fitScore?.pedigreeVelocity || 0}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Community Gives</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">{member.fitScore?.communityContribution || 0}%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Network Synergy</span>
                <span className="text-lg font-bold text-cyan-400 font-mono">{member.fitScore?.networkSynergy || 0}%</span>
              </div>
            </div>

            {/* AI Reasoning Bullets */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Decision Rationale:</span>
              {member.fitScore?.reasoning?.map((r, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>

            {/* Suggested Next Step */}
            <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 flex items-center justify-between">
              <span className="font-medium">Next Action: {member.fitScore?.suggestedNextStep || 'Review application'}</span>
              <button
                onClick={() => {
                  onClose();
                  onFindMatches(member);
                }}
                className="text-[11px] text-indigo-300 font-bold hover:underline flex items-center gap-1"
              >
                Find Intros <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Persona & Domain Focus */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Persona & Domain Focus
            </span>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Persona:</span>
                <span className="text-xs font-bold text-slate-200 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                  {member.personaClassification}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {member.domains?.map((domain, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-500/30 text-indigo-300"
                  >
                    #{domain}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Asks & Gives (The Heart of Relationship CRM) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Asks / Needs */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" />
                Needs / Asks ({member.asks?.length || 0})
              </span>
              {member.asks && member.asks.length > 0 ? (
                <div className="space-y-2 pt-1">
                  {member.asks.map((ask, i) => (
                    <div key={i} className="text-xs text-slate-200 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                      {ask}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No specific asks listed. Run AI auto-enrichment.</p>
              )}
            </div>

            {/* Gives / Offers */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Superpowers / Gives ({member.gives?.length || 0})
              </span>
              {member.gives && member.gives.length > 0 ? (
                <div className="space-y-2 pt-1">
                  {member.gives.map((give, i) => (
                    <div key={i} className="text-xs text-slate-200 p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                      {give}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No gives listed. Run AI auto-enrichment.</p>
              )}
            </div>
          </div>

          {/* Backing & Raw Notes */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 block mb-1">Pedigree / Backing Signal:</span>
              <p className="text-xs text-slate-200">{member.backingOrPedigree || 'None documented'}</p>
            </div>

            {member.rawNotes && (
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Founder's Office Notes:</span>
                <p className="text-xs text-slate-300 font-mono">{member.rawNotes}</p>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
              Contact & Links
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{member.email}</span>
              </div>
              {member.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.phone}</span>
                </div>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-indigo-400 hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {member.twitterUrl && (
                <a
                  href={member.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:underline"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>X / Twitter</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decline & Email Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Decline Applicant & Copy Response</h3>
              <button
                onClick={() => setShowDeclineModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Generated empathetic, high-respect polite decline email for {member.name}:
            </p>
            <textarea
              readOnly
              rows={8}
              value={declineEmailBody}
              className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 select-all"
            />
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(declineEmailBody);
                  setCopiedEmail(true);
                  setTimeout(() => setCopiedEmail(false), 2000);
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 flex items-center gap-1.5"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDeclineModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                >
                  Confirm Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
