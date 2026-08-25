import React, { useState } from 'react';
import { MatchSuggestion } from '../types';
import { useCRM } from '../context/CRMContext';
import { generateWarmIntroWithNvidia } from '../services/aiService';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Send,
  Building,
  Flame,
  ArrowRight,
  RefreshCw,
  Mail
} from 'lucide-react';

interface Props {
  match: MatchSuggestion | null;
  onClose: () => void;
}

export const IntroDraftModal: React.FC<Props> = ({ match, onClose }) => {
  const { updateMatchStatus, nvidiaConfig } = useCRM();
  const [activeTab, setActiveTab] = useState<'joint' | 'blurbA' | 'blurbB'>('joint');
  const [copied, setCopied] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentDraft, setCurrentDraft] = useState(match?.draftIntroEmail);

  if (!match) return null;

  const draft = currentDraft || match.draftIntroEmail;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleMarkSent = () => {
    updateMatchStatus(match.id, 'Accepted & Sent');
    onClose();
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const newDraft = await generateWarmIntroWithNvidia(
        match.memberA,
        match.memberB,
        match.matchThesis,
        nvidiaConfig
      );
      setCurrentDraft(newDraft);
    } catch (e) {
      console.error('Failed to regenerate intro draft via NVIDIA NIM', e);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">NVIDIA NIM Warm Introduction Generator</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono font-bold">
                  {match.matchScore}% Match Affinity
                </span>
              </div>
              <p className="text-xs text-slate-400">Double-opt-in intro between {match.memberA.name} and {match.memberB.name}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Member Pair Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            {/* Member A */}
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Member A</span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {match.memberA.name}
                <span className="text-xs font-mono text-indigo-400">({match.memberA.company})</span>
              </h4>
              <p className="text-xs text-slate-300">{match.memberA.standardizedRole}</p>
              <div className="text-[11px] text-amber-300/90 pt-1">
                <strong>Ask:</strong> {match.memberA.asks[0] || 'Scaling advice'}
              </div>
            </div>

            {/* Member B */}
            <div className="space-y-1 sm:border-l sm:border-slate-800 sm:pl-4">
              <span className="text-[10px] uppercase font-bold text-slate-400">Member B</span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {match.memberB.name}
                <span className="text-xs font-mono text-cyan-400">({match.memberB.company})</span>
              </h4>
              <p className="text-xs text-slate-300">{match.memberB.standardizedRole}</p>
              <div className="text-[11px] text-emerald-300/90 pt-1">
                <strong>Give:</strong> {match.memberB.gives[0] || 'Domain scaling mastery'}
              </div>
            </div>
          </div>

          {/* Match Thesis */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
            <span className="font-bold text-white block mb-0.5">Matchmaking Thesis:</span>
            {match.matchThesis}
          </div>

          {/* Email View Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('joint')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    activeTab === 'joint'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Joint Warm Intro
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('blurbA')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    activeTab === 'blurbA'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Double-Opt Blurb (For {match.memberA.name.split(' ')[0]})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('blurbB')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                    activeTab === 'blurbB'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Double-Opt Blurb (For {match.memberB.name.split(' ')[0]})
                </button>
              </div>

              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="text-xs text-slate-400 hover:text-emerald-300 flex items-center gap-1 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRegenerating ? 'animate-spin' : ''}`} />
                <span>Regenerate with NVIDIA NIM</span>
              </button>
            </div>

            {/* Email Text Area */}
            <div className="relative">
              <textarea
                readOnly
                rows={8}
                value={
                  activeTab === 'joint'
                    ? `Subject: ${draft.subject}\n\n${draft.fullJointEmail}`
                    : activeTab === 'blurbA'
                    ? draft.blurbForA
                    : draft.blurbForB
                }
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none select-all leading-relaxed"
              />

              <button
                onClick={() =>
                  handleCopy(
                    activeTab === 'joint'
                      ? `Subject: ${draft.subject}\n\n${draft.fullJointEmail}`
                      : activeTab === 'blurbA'
                      ? draft.blurbForA
                      : draft.blurbForB,
                    activeTab
                  )
                }
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-md transition"
              >
                {copied === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-950/80">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
          >
            Close
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleCopy(`Subject: ${draft.subject}\n\n${draft.fullJointEmail}`, 'all');
                handleMarkSent();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Copy & Mark Intro Dispatched</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
