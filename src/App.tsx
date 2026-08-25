import React, { useState } from 'react';
import { CRMProvider, useCRM } from './context/CRMContext';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { NetworkRosterTab } from './components/tabs/NetworkRosterTab';
import { DuplicateResolverTab } from './components/tabs/DuplicateResolverTab';
import { MatchmakerTab } from './components/tabs/MatchmakerTab';
import { AIAssistantTab } from './components/tabs/AIAssistantTab';
import { ExecutiveMemoTab } from './components/tabs/ExecutiveMemoTab';
import { NewApplicantModal } from './components/NewApplicantModal';
import { AISettingsModal } from './components/AISettingsModal';
import { MemberDetailDrawer } from './components/MemberDetailDrawer';
import { MergeModal } from './components/MergeModal';
import { IntroDraftModal } from './components/IntroDraftModal';
import { MemberProfile, MatchSuggestion, DuplicateMatchGroup } from './types';

const MainDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('roster');
  const [isNewApplicantOpen, setIsNewApplicantOpen] = useState(false);
  const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberProfile | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<DuplicateMatchGroup | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchSuggestion | null>(null);

  const { duplicateGroups, matches } = useCRM();

  const handleOpenMerge = (groupId: string) => {
    const group = duplicateGroups.find(g => g.groupId === groupId);
    if (group) {
      setSelectedGroup(group);
    }
  };

  const handleFindMatchesForMember = (member: MemberProfile) => {
    setActiveTab('matchmaker');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenNewApplicant={() => setIsNewApplicantOpen(true)}
        onOpenAISettings={() => setIsAISettingsOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Executive Stats Bar */}
        <StatsBar />

        {/* Tab Content */}
        {activeTab === 'roster' && (
          <NetworkRosterTab
            onSelectMember={member => setSelectedMember(member)}
            onOpenMerge={handleOpenMerge}
          />
        )}

        {activeTab === 'duplicates' && (
          <DuplicateResolverTab
            onOpenMerge={handleOpenMerge}
            onSelectMember={member => setSelectedMember(member)}
          />
        )}

        {activeTab === 'matchmaker' && (
          <MatchmakerTab
            onOpenIntroModal={match => setSelectedMatch(match)}
            onSelectMember={member => setSelectedMember(member)}
          />
        )}

        {activeTab === 'assistant' && (
          <AIAssistantTab onSelectMember={member => setSelectedMember(member)} />
        )}

        {activeTab === 'memo' && <ExecutiveMemoTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-4 text-center text-xs text-slate-500 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Offline Relationship OS • Built for AI Automation Engineer — Founder's Office</span>
          <span className="font-mono text-[11px] text-slate-400">
            Supports NVIDIA NIM (Llama 3.3 70B) & OpenAI API
          </span>
        </div>
      </footer>

      {/* Modals & Slide-over Drawers */}
      <NewApplicantModal
        isOpen={isNewApplicantOpen}
        onClose={() => setIsNewApplicantOpen(false)}
        onSelectMember={member => setSelectedMember(member)}
      />

      <AISettingsModal
        isOpen={isAISettingsOpen}
        onClose={() => setIsAISettingsOpen(false)}
      />

      <MemberDetailDrawer
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onFindMatches={handleFindMatchesForMember}
      />

      <MergeModal
        group={selectedGroup}
        onClose={() => setSelectedGroup(null)}
      />

      <IntroDraftModal
        match={selectedMatch}
        onClose={() => setSelectedMatch(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CRMProvider>
      <MainDashboard />
    </CRMProvider>
  );
}
