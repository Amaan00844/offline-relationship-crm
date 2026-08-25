import React, { useState } from 'react';
import { Copy, Check, Sparkles, BookOpen, Layers, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';

export const ExecutiveMemoTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const memoContent = `# Executive Memo: AI-Native Relationship CRM for Offline
**Role:** AI Automation Engineer — Founder's Office  
**Community Tracks:** Offline Core • Encore • The Offline Network (TON)

---

## 1. What I Built

I built **Offline Relationship OS** — a production-grade, AI-native relationship intelligence platform designed specifically for the Founder's Office to replace manual Airtable spreadsheet operations.

### Key Capabilities Built:
1. **Intelligent Ingestion & Normalization Engine:**
   - Cleans messy raw application data (standardizes non-uniform phone numbers, sanitizes LinkedIn/Twitter URLs, and normalizes unstructured job titles like "Chief Hustler" or "VPE" into standard taxonomy).
   - Detects completeness score and flags missing critical fields.

2. **Multi-Vector Fuzzy & Semantic Deduplicator:**
   - Multi-factor deduplication scanning across phone hashes, canonical LinkedIn handles, name-company Levenshtein similarity, and personal vs corporate email re-applications.
   - Interactive **Duplicate Resolution Studio** with field-by-field conflict resolution and 1-click synthesis.

3. **AI Persona Classification & Structured Tag Extraction:**
   - Classifies applicants into distinct personas (*Tier 1 Scaled Founder, Hypergrowth Operator, Angel / Super-Operator, Emerging High-Velocity Founder, Domain Specialist*).
   - Automatically extracts concrete **Asks/Needs** and **Gives/Superpowers** from unstructured bios and notes.

4. **Multi-Dimensional Applicant Fit Scorer (0-100):**
   - Evaluates three core axes: *Pedigree & Velocity (35%)*, *Community Contribution / Gives (35%)*, and *Network Synergy (30%)*.
   - Generates transparent, explainable decision rationales and action recommendations (*Fast-track Accept, Direct to Encore, Route to TON, Polite Decline*).
   - Includes 1-click personalized acceptance and polite decline email drafts.

5. **AI Super-Connector Matchmaking Engine (The Magic Feature):**
   - Computes bipartite Need-Offer complementarity across the entire network graph (matching Member A's critical need with Member B's superpower).
   - Auto-generates double-opt-in warm introduction emails with personalized blurbs for both parties and a joint intro thread.

6. **Founder's Office Natural Language Copilot:**
   - Conversational query interface allowing founders to search relationships intuitively (e.g. *"Who in our network has experience scaling B2B sales in the US?"*).
   - Returns interactive member recommendation cards and strategic action recommendations.

7. **Flexible Multi-Model AI Engine:**
   - Direct integration with **NVIDIA NIM** (Llama 3.3 70B / Nemotron / DeepSeek R1), **OpenAI**, and built-in deterministic simulation fallback for zero-downtime execution.

---

## 2. Architecture & Data Pipeline

\`\`\`
Raw Ingestion (Airtable / Typeform / Webhook)
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│        Data Cleaning & Normalization Engine       │
│  - Phone & URL Sanitizer                         │
│  - Role Taxonomy Standardizer                    │
│  - Completeness Calculator (0-100%)              │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│      Multi-Vector Deduplication & Merge Engine   │
│  - Exact Contact Match (Phone / LinkedIn)        │
│  - Fuzzy Dice / Levenshtein Token Match          │
│  - Corporate vs Personal Email Cross-Matching    │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│       AI Persona & Ask/Give Enrichment           │
│  - NVIDIA NIM (Llama 3.3 70B) / OpenAI API       │
│  - Persona Classifier                            │
│  - Structured Need & Superpower Tag Extractor    │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│        Multi-Factor Fit Scoring Engine           │
│  - Pedigree & Traction (35%)                     │
│  - Give-to-Ask Ratio (35%)                       │
│  - Network Synergy & Density (30%)               │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│         Offline Relationship Graph               │
│  ┌─────────────────────────┬──────────────────┐  │
│  │ AI Matchmaking Engine   │ Natural Language │  │
│  │ (Bipartite Need-Offer)  │ Query Copilot    │  │
│  └─────────────────────────┴──────────────────┘  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
Double-Opt-In Warm Intros / Acceptance Onboarding
\`\`\`

---

## 3. Where AI Was Actually Useful (vs Deterministic Logic)

A core principle of great AI engineering is knowing **when to use an LLM and when NOT to**.

### Where AI Was High Leverage:
- **Unstructured Bio Extraction:** Turning ambiguous free-form sentences into structured Asks and Gives (e.g., extracting *"Can mentor on SOC2 compliance"* from *"spent 5 years setting up enterprise security reviews at Uber"*).
- **Explainable Fit Scoring:** Providing human-readable, multi-dimensional reasoning that founder's office staff can quickly audit rather than a black-box number.
- **Context-Aware Double-Opt-In Intro Generation:** Drafting natural, high-touch intro blurbs that capture the specific context of both members without feeling like cold templates.
- **Natural Language Relationship Search:** Translating conversational queries like *"Who can help with healthcare pilot sales?"* into semantic profile matches.

### Where Deterministic Code Was Superior:
- **Phone & URL Normalization:** Regex and string parsing are 100% deterministic, cost \$0, and run in 0.1ms without hallucinations.
- **Exact Contact Deduplication:** Comparing canonical LinkedIn URLs and phone hashes in memory is instantaneous and deterministic.
- **Bipartite Score Gating:** Mathematical thresholds (preventing commercial vendors from being matched with Tier 1 founders) ensure strict community quality control.

---

## 4. What I Would Build Next With Another Week

If given another week to take this from prototype to company-wide production deployment at Offline, I would build:

1. **Two-Way n8n / Make Sync with Airtable & Attio:**
   - Real-time webhook listeners on Airtable/Typeform forms.
   - Bidirectional sync so approvals, tags, and fit scores written in this OS automatically update the team's Airtable and Attio workspaces.

2. **WhatsApp / Telegram Double-Opt-In Bot:**
   - Enable the Founder's Office to trigger introductions directly via a Telegram/WhatsApp command (e.g., \`/intro Aarav Elena\`).
   - Bot pings Member A with the blurb: *"Hey Aarav, want to meet Elena (Ex-Stripe VP Product)? [Yes] [No]"*. If both reply "Yes", the bot creates an instant 3-way WhatsApp group or calendar invite.

3. **Automated Live Web & Social Enricher:**
   - Automated background worker (via Firecrawl / Tavily / GitHub API) that pulls GitHub repo star history, Crunchbase funding rounds, and recent podcast transcripts for each applicant before review.

4. **Offline Salon & Dinner Table Optimizer:**
   - An algorithmic seating planner that clusters 10-person dinner tables at Offline retreats and Encore events to maximize complementary ask-give pairings and topic cohesion.

5. **Voice AI Screening Agent (ElevenLabs / LiveKit):**
   - An optional 5-minute conversational voice bot for high-volume applicant screening to evaluate communication velocity and authentic give orientation.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(memoContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Founder's Office Submission Note</h3>
            <p className="text-xs text-slate-300">
              Complete technical documentation and strategic vision for Offline's AI relationship engine
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition whitespace-nowrap active:scale-95"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied Markdown' : 'Copy Full Submission Note'}</span>
        </button>
      </div>

      {/* Formatted Memo Card */}
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-2xl text-slate-200 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            1. What I Built
          </h2>
          <p className="text-xs text-slate-300">
            I built <strong>Offline Relationship OS</strong> — an AI-native relationship intelligence platform designed specifically for the Founder's Office to replace manual Airtable spreadsheet operations across <strong>Offline Core</strong>, <strong>Encore</strong>, and <strong>The Offline Network (TON)</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-indigo-400">Data Normalizer & Cleaner</span>
              <p className="text-[11px] text-slate-400">Standardizes phone numbers, sanitizes LinkedIn URLs, and maps weird job titles ("Chief Hustler") to standard taxonomy.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400">Multi-Vector Deduplicator</span>
              <p className="text-[11px] text-slate-400">Detects personal vs corporate re-applications, phone duplicates, and provides an interactive Side-by-Side Merge Studio.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-purple-400">AI Persona & Ask/Give Extractor</span>
              <p className="text-[11px] text-slate-400">Classifies applicants into 5 core personas and extracts structured Give/Superpower and Ask/Need tags.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-emerald-400">AI Super-Connector Matchmaker</span>
              <p className="text-[11px] text-slate-400">Bipartite Need-Offer matching that generates high-touch double-opt-in warm intro emails with 1-click dispatch.</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            2. System Architecture & Data Flow
          </h2>
          <p className="text-xs text-slate-300">
            The platform is architected as a modular pipeline combining deterministic rule-based pre-processing with high-throughput LLM reasoning:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-indigo-300 space-y-2 overflow-x-auto">
            <div>[Raw Application] ➔ [Normalizer] ➔ [Fuzzy Deduplication Engine]</div>
            <div className="pl-6">➔ [LLM Persona & Structured Give/Ask Extraction]</div>
            <div className="pl-12">➔ [Multi-Factor Fit Scorer (Pedigree + Contribution + Synergy)]</div>
            <div className="pl-18">➔ [Offline Relationship Graph: AI Matchmaker + Copilot]</div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            3. Where AI Was Actually Useful vs Deterministic Logic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                ✓ Where AI Was High Leverage
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Extracting implicit Asks & Gives from messy unstructured text</li>
                <li>Generating transparent, explainable fit decision rationales</li>
                <li>Drafting personalized, high-conviction warm intros</li>
                <li>Natural language relationship graph querying</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                ✓ Where Deterministic Code Was Superior
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                <li>Phone and LinkedIn URL normalization (0ms, 100% reliable)</li>
                <li>Exact hash and token-distance duplicate detection</li>
                <li>Commercial vendor gating and state management</li>
                <li>Zero-cost, instantaneous in-browser reactivity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            4. What I Would Build Next With Another Week
          </h2>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="font-bold text-purple-400">1.</span>
              <div>
                <strong className="text-white">Two-Way n8n / Make Webhook Engine:</strong> Live bidirectional sync with Airtable and Attio so all enrichment and scoring updates occur automatically in the background.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="font-bold text-purple-400">2.</span>
              <div>
                <strong className="text-white">WhatsApp & Telegram Double-Opt-In Bot:</strong> Dispatch double-opt-in intro blurbs directly through founder WhatsApp/Telegram with 1-click group creation.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="font-bold text-purple-400">3.</span>
              <div>
                <strong className="text-white">Automated Web & Social Enrichment:</strong> Pull live GitHub stars, Crunchbase financing rounds, and recent tweets automatically on form submission.
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <span className="font-bold text-purple-400">4.</span>
              <div>
                <strong className="text-white">Offline Retreat & Salon Table Seating Optimizer:</strong> Algorithmic diner seating planner to maximize high-reciprocity discussions.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
