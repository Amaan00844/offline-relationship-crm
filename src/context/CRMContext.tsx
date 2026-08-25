import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  MemberProfile,
  DuplicateMatchGroup,
  MatchSuggestion,
  SystemStats,
  ProgramTrack
} from '../types';
import { INITIAL_MEMBERS } from '../data/seedDataset';
import { cleanAndStructureRecord } from '../core/cleaner';
import { detectDuplicates, mergeDuplicateRecords } from '../core/deduplicator';
import { generateMatchSuggestions } from '../core/matchmaker';
import {
  NvidiaAIConfig,
  getStoredNvidiaConfig,
  saveNvidiaConfig,
  enrichProfileWithNvidia,
  calculateFitScoreWithNvidia
} from '../services/aiService';

interface CRMContextType {
  members: MemberProfile[];
  duplicateGroups: DuplicateMatchGroup[];
  matches: MatchSuggestion[];
  stats: SystemStats;
  nvidiaConfig: NvidiaAIConfig;
  selectedTrack: ProgramTrack | 'All';
  setSelectedTrack: (track: ProgramTrack | 'All') => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isProcessing: boolean;
  activeProcessingTask: string;

  // Actions
  addRecord: (raw: Partial<MemberProfile>) => MemberProfile;
  updateRecord: (id: string, updates: Partial<MemberProfile>) => void;
  deleteRecord: (id: string) => void;
  mergeDuplicateGroup: (groupId: string, masterId: string, overrides?: Partial<MemberProfile>) => void;
  enrichRecord: (id: string) => Promise<void>;
  enrichAllPending: () => Promise<void>;
  scoreRecord: (id: string) => Promise<void>;
  scoreAllUnscored: () => Promise<void>;
  acceptApplicant: (id: string) => void;
  declineApplicant: (id: string) => void;
  updateMatchStatus: (matchId: string, status: MatchSuggestion['status']) => void;
  saveConfig: (newConfig: NvidiaAIConfig) => void;
  resetToSeedData: () => void;
  exportData: (format: 'json' | 'csv') => void;
  importRecords: (records: Partial<MemberProfile>[]) => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<MemberProfile[]>(() => {
    try {
      const saved = localStorage.getItem('offline_crm_members_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load members from localStorage', e);
    }
    return INITIAL_MEMBERS;
  });

  const [nvidiaConfig, setNvidiaConfigState] = useState<NvidiaAIConfig>(getStoredNvidiaConfig);
  const [selectedTrack, setSelectedTrack] = useState<ProgramTrack | 'All'>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeProcessingTask, setActiveProcessingTask] = useState<string>('');
  const [matches, setMatches] = useState<MatchSuggestion[]>([]);

  // Persist members to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('offline_crm_members_v2', JSON.stringify(members));
    } catch (e) {
      console.error('Failed to save members to localStorage', e);
    }
  }, [members]);

  // Recalculate duplicate groups
  const duplicateGroups = useMemo(() => {
    const { groups } = detectDuplicates(members);
    return groups;
  }, [members]);

  // Recalculate matchmaking suggestions
  useEffect(() => {
    const suggestions = generateMatchSuggestions(members);
    setMatches(suggestions);
  }, [members]);

  // System Stats calculation
  const stats: SystemStats = useMemo(() => {
    const total = members.length;
    const active = members.filter(m => m.status === 'Accepted' && !m.isDuplicate).length;
    const pending = members.filter(m => ['Raw', 'Cleaned', 'Enriched', 'Scored'].includes(m.status) && !m.isDuplicate).length;
    const duplicates = members.filter(m => m.isDuplicate).length;
    
    const validScores = members.filter(m => m.fitScore?.overall).map(m => m.fitScore.overall);
    const avgScore = validScores.length ? Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;
    
    const highMatches = matches.filter(m => m.matchScore >= 80).length;
    const totalCompleteness = members.reduce((acc, m) => acc + (m.completenessScore || 0), 0);
    const qualityScore = total > 0 ? Math.round(totalCompleteness / total) : 0;

    return {
      totalProfiles: total,
      activeMembers: active,
      pendingReview: pending,
      duplicatesDetected: duplicates,
      averageFitScore: avgScore,
      highValueMatchesAvailable: highMatches,
      enrichmentQualityScore: qualityScore
    };
  }, [members, matches]);

  const saveConfig = (newConfig: NvidiaAIConfig) => {
    setNvidiaConfigState(newConfig);
    saveNvidiaConfig(newConfig);
  };

  const addRecord = (raw: Partial<MemberProfile>): MemberProfile => {
    const cleaned = cleanAndStructureRecord(raw);
    setMembers(prev => [cleaned, ...prev]);
    return cleaned;
  };

  const updateRecord = (id: string, updates: Partial<MemberProfile>) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, ...updates, lastUpdated: new Date().toISOString() } : m));
  };

  const deleteRecord = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id));
  };

  const mergeDuplicateGroup = (groupId: string, masterId: string, overrides?: Partial<MemberProfile>) => {
    const group = duplicateGroups.find(g => g.groupId === groupId);
    if (!group) return;

    const master = members.find(m => m.id === masterId);
    const secondary = group.records.find(m => m.id !== masterId);

    if (!master || !secondary) return;

    const merged = mergeDuplicateRecords(master, secondary, overrides);

    setMembers(prev => {
      const filtered = prev.filter(m => m.id !== master.id && m.id !== secondary.id);
      return [merged, ...filtered];
    });
  };

  const enrichRecord = async (id: string) => {
    const target = members.find(m => m.id === id);
    if (!target) return;

    setIsProcessing(true);
    setActiveProcessingTask(`NVIDIA NIM: Enriching ${target.name}...`);
    try {
      const enrichedUpdates = await enrichProfileWithNvidia(target, nvidiaConfig);
      const cleaned = cleanAndStructureRecord({ ...target, ...enrichedUpdates });
      updateRecord(id, cleaned);
    } catch (e) {
      console.error('Enrichment failed', e);
    } finally {
      setIsProcessing(false);
      setActiveProcessingTask('');
    }
  };

  const enrichAllPending = async () => {
    const pending = members.filter(m => (m.completenessScore < 80 || m.status === 'Raw') && !m.isDuplicate);
    if (pending.length === 0) return;

    setIsProcessing(true);
    for (let i = 0; i < pending.length; i++) {
      const target = pending[i];
      setActiveProcessingTask(`NVIDIA NIM: Enriching (${i + 1}/${pending.length}): ${target.name}...`);
      try {
        const enrichedUpdates = await enrichProfileWithNvidia(target, nvidiaConfig);
        const cleaned = cleanAndStructureRecord({ ...target, ...enrichedUpdates });
        setMembers(prev => prev.map(m => m.id === target.id ? cleaned : m));
      } catch (e) {
        console.error('Batch enrichment item error', e);
      }
    }
    setIsProcessing(false);
    setActiveProcessingTask('');
  };

  const scoreRecord = async (id: string) => {
    const target = members.find(m => m.id === id);
    if (!target) return;

    setIsProcessing(true);
    setActiveProcessingTask(`NVIDIA NIM: Evaluating fit score for ${target.name}...`);
    try {
      const fitScore = await calculateFitScoreWithNvidia(target, nvidiaConfig);
      updateRecord(id, { fitScore, status: 'Scored' });
    } catch (e) {
      console.error('Scoring failed', e);
    } finally {
      setIsProcessing(false);
      setActiveProcessingTask('');
    }
  };

  const scoreAllUnscored = async () => {
    const unscored = members.filter(m => m.status !== 'Scored' && m.status !== 'Accepted' && m.status !== 'Declined' && !m.isDuplicate);
    if (unscored.length === 0) return;

    setIsProcessing(true);
    for (let i = 0; i < unscored.length; i++) {
      const target = unscored[i];
      setActiveProcessingTask(`NVIDIA NIM: Scoring (${i + 1}/${unscored.length}): ${target.name}...`);
      try {
        const fitScore = await calculateFitScoreWithNvidia(target, nvidiaConfig);
        setMembers(prev => prev.map(m => m.id === target.id ? { ...m, fitScore, status: 'Scored' } : m));
      } catch (e) {
        console.error('Batch scoring error', e);
      }
    }
    setIsProcessing(false);
    setActiveProcessingTask('');
  };

  const acceptApplicant = (id: string) => {
    updateRecord(id, { status: 'Accepted' });
  };

  const declineApplicant = (id: string) => {
    updateRecord(id, { status: 'Declined' });
  };

  const updateMatchStatus = (matchId: string, status: MatchSuggestion['status']) => {
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, status } : m));
  };

  const resetToSeedData = () => {
    setMembers(INITIAL_MEMBERS);
    localStorage.removeItem('offline_crm_members_v2');
  };

  const exportData = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(members, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `offline-crm-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    } else {
      const headers = ['ID', 'Name', 'Email', 'Company', 'Role', 'Stage', 'Track', 'Status', 'FitScore', 'Domains', 'Asks', 'Gives', 'Backing'];
      const rows = members.map(m => [
        m.id,
        `"${m.name.replace(/"/g, '""')}"`,
        m.email,
        `"${m.company.replace(/"/g, '""')}"`,
        `"${m.standardizedRole.replace(/"/g, '""')}"`,
        m.companyStage,
        m.programTrack,
        m.status,
        m.fitScore.overall,
        `"${m.domains.join('; ')}"`,
        `"${m.asks.join('; ')}"`,
        `"${m.gives.join('; ')}"`,
        `"${(m.backingOrPedigree || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `offline-crm-export-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
    }
  };

  const importRecords = (records: Partial<MemberProfile>[]) => {
    const cleanedList = records.map(cleanAndStructureRecord);
    setMembers(prev => [...cleanedList, ...prev]);
  };

  return (
    <CRMContext.Provider
      value={{
        members,
        duplicateGroups,
        matches,
        stats,
        nvidiaConfig,
        selectedTrack,
        setSelectedTrack,
        statusFilter,
        setStatusFilter,
        searchQuery,
        setSearchQuery,
        isProcessing,
        activeProcessingTask,
        addRecord,
        updateRecord,
        deleteRecord,
        mergeDuplicateGroup,
        enrichRecord,
        enrichAllPending,
        scoreRecord,
        scoreAllUnscored,
        acceptApplicant,
        declineApplicant,
        updateMatchStatus,
        saveConfig,
        resetToSeedData,
        exportData,
        importRecords
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
