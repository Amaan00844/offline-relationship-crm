# Offline Relationship OS (AI-Native CRM)

> **Designed for:** Founder's Office @ Offline, Encore, and The Offline Network (TON)  
> **Role:** AI Automation Engineer — Founder's Office  
> **Tech Stack:** React 18, TypeScript, Tailwind CSS, NVIDIA NIM (`meta/llama-3.3-70b-instruct`), OpenAI API, Fuzzy Multi-Vector Deduplication Engine, Bipartite Graph Matchmaker.

---

## 🚀 Quick Start (Runs in 10 seconds)

```bash
# 1. Install dependencies (already completed)
npm install

# 2. Start the local server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Using Your NVIDIA API Key

1. Click on the **AI Engine** status badge in the top right header (or open **AI Engine & API Keys**).
2. Select **NVIDIA NIM** as the provider.
3. Paste your NVIDIA API Key (starts with `nvapi-...`).
4. Select your preferred model (Default: `meta/llama-3.3-70b-instruct` or `deepseek-ai/deepseek-r1`).
5. Click **Save Configuration**. All profile classification, fit scoring, warm intro drafting, and natural language relationship search will now execute live on NVIDIA NIM endpoints!

> *Note: If no API key is entered, the app seamlessly runs on our built-in high-precision deterministic intelligence simulation engine, ensuring zero downtime and instant responsiveness during demos.*

---

## 🌟 Real-Life Operational Features

### 1. Ingest Messy Real-Life Applications
- Click **"+ Ingest Form"** in the top bar.
- Paste raw application text (from Typeform, Airtable, or email).
- The system automatically sanitizes phone numbers, normalizes LinkedIn URLs, classifies the applicant's persona, structures their **Asks** and **Gives**, and calculates an explainable **Applicant Fit Score (0-100)**.

### 2. Duplicate & Quality Studio
- Resolves the classic Airtable issue where applicants apply multiple times (e.g. with personal Gmail vs corporate email).
- Evaluates multi-vector match confidence (Phone hash, LinkedIn handle, Levenshtein name-company similarity).
- Open the **Duplicate & Quality Studio** tab to launch the interactive **Side-by-Side Merge Modal** with 1-click synthesis.

### 3. AI Super-Connector (Warm Intros)
- Automatically pairs complementary needs and offers (e.g. an AI agent founder needing SOC2 compliance paired with a former Uber/AWS VP of Engineering who offers enterprise security audits).
- Generates context-aware **Double-Opt-In Warm Intro Emails** with tailored blurbs for Member A, Member B, and joint email threads.

### 4. Founder's Office Relationship Copilot
- Ask questions in plain English:
  - *"Who in our network can help an AI founder with US enterprise SOC2?"*
  - *"Who is writing $50k+ angel checks in developer tools?"*
  - *"Find senior engineering operators from Uber, Stripe, or AWS."*
- Returns interactive member cards with direct 1-click actions.

### 5. Airtable & CSV Two-Way Export
- Click the **Export** button in the header to download a cleaned, structured CSV or JSON file ready to import directly into Airtable or Attio.

---

## 📁 Repository Structure

```
├── SUBMISSION_NOTE.md        # Comprehensive Founder's Office submission note
├── src/
│   ├── components/           # UI components, modals, and tabs
│   │   ├── tabs/
│   │   │   ├── NetworkRosterTab.tsx       # Table & Kanban pipeline view
│   │   │   ├── DuplicateResolverTab.tsx   # Merge & data quality studio
│   │   │   ├── MatchmakerTab.tsx          # Bipartite intro engine
│   │   │   ├── AIAssistantTab.tsx         # Natural language copilot
│   │   │   └── ExecutiveMemoTab.tsx       # In-app submission note viewer
│   │   ├── Header.tsx                     # Track filter & AI status
│   │   ├── StatsBar.tsx                   # Executive relationship metrics
│   │   ├── MemberDetailDrawer.tsx         # Slide-over applicant score card
│   │   ├── MergeModal.tsx                 # Side-by-side duplicate resolution
│   │   ├── IntroDraftModal.tsx            # Double-opt-in email generator
│   │   ├── NewApplicantModal.tsx          # Raw form ingestion
│   │   └── AISettingsModal.tsx            # NVIDIA NIM / OpenAI config
│   ├── core/
│   │   ├── cleaner.ts        # Normalization & taxonomy standardizer
│   │   ├── deduplicator.ts   # Multi-vector fuzzy deduplication
│   │   └── matchmaker.ts     # Need-Offer complementarity algorithm
│   ├── data/
│   │   └── seedDataset.ts    # 15 realistic founder/operator/duplicate profiles
│   ├── services/
│   │   └── aiService.ts      # NVIDIA NIM & OpenAI LLM service
│   ├── context/
│   │   └── CRMContext.tsx    # State management & localStorage sync
│   └── types/
│       └── index.ts          # TypeScript type definitions
```
