# 📚 The Haunted Library | 5-Day Horror Challenge
### Band 1 EMI English Week &bull; HKDSE Paper 1 Gamified Reading Platform

A fully interactive frontend Proof of Concept (POC) for **The Haunted Library**, an educational gothic horror reading challenge tailored for Hong Kong Band 1 EMI secondary school students preparing for HKDSE English Language Paper 1 (Reading).

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+ (v24+ supported)
- **npm**: v9+ or v11+

### 2. Installation
Open your terminal inside the project directory:

```bash
cd haunted-library
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port indicated in your console) in your browser.

### 4. Build for Production
To test the production build:
```bash
npm run build
npm run start
```

---

## 🔑 Authorized Login Credentials

The application includes an Archival Portal Login Screen. Access is protected by hardcoded student credentials:

| Field | Value |
| :--- | :--- |
| **Candidate Email** | `reader404@stjudes.edu.hk` |
| **Username Alias** | `reader404` |
| **Archival Passkey** | `horror2026` |

> 💡 **Quick Autofill:** A **"⚡ Click to Auto-fill"** button is built directly into the login screen so you can log in with a single click.

---

## 🏰 Platform Features & Walkthrough

### 1. Gatekeeper Login Portal
- Eerie dark aesthetic with floating ambient glow and the St. Jude's EMI College seal.
- Validates student ID and password with instant feedback and audio cues.
- Once authenticated, transitions smoothly to the main interactive challenge dashboard.
- Includes an **"Exit / Logout"** button in the top header to return to the login screen at any time.

### 2. Live Campus Ticker & Header
- **Live Campus Wire**: Marquee ticker animating real-time student activities, high scores, and campus alerts.
- **Dynamic Stats Bar**: Tracks **Streak Days** (🔥), **Total XP** (✨), **Rank Badge** (e.g., *Novice Reader* &rarr; *Cryptic Scholar* &rarr; *Grand Lexicographer*), and completed chambers.
- **Audio Synthesizer Toggle**: Ambient spooky sound effects and UI audio powered natively by the **Web Audio API** (zero external MP3 assets required).
- **Tester Shortcuts**:
  - `Demo: Unlock All`: Instantly completes all 5 chambers and badges for rapid certificate evaluation.
  - `Reset`: Clears user answers and resets progress to initial state.

### 3. Tab 1 &bull; 5-Day Chambers
- **5 Horizontal Chamber Cards**:
  - **Day 1**: *"The Whispering Elevator of Shatin Tower"* (Gothic Narrative, 3 min read &bull; Unlocked).
  - **Days 2–5**: Progressive lock/unlock flow (*The Phantom Signal of Victoria Peak*, *Log of the Archduke*, *Echoes in the Red Brick Asylum*, *The Midnight Archivist*).
- **Interactive Reading Passage**:
  - Split-screen layout with narrative parts and lore background.
  - **Vocabulary Tooltips**: Click or hover on words like *inexorable*, *crepuscular*, *sibilant*, or *sepulchral* to open a detailed card showing IPA pronunciation, definitions, Band 1 example sentences, and HKDSE Paper 1 exam tips.
  - **Eerie Narrator**: Built-in speech synthesis read-aloud option.
- **HKDSE Comprehension Quiz**:
  - Multiple-choice questions categorized by skill (*Inference*, *Rhetorical Device*, *Tone & Mood*).
  - Immediate visual feedback: Glowing emerald green for correct answers (+XP awarded) or crimson red with pedagogical explanations.
  - Clearing all questions in a chamber triggers celebratory confetti (`canvas-confetti`), audio fanfares, unlocks the next day's chamber, and awards a badge.

### 4. Tab 2 &bull; The Haunted Vault & Badges
- **5 Mystical Badges**: *Shadow Scholar*, *Cryptic Decipherer*, *Spectral Investigator*, *Grim Historian*, and *Master of the Macabre*.
- Cards display unlock status, rarity tiers, criteria, and flavor quotes.
- **Official Certificate**:
  - Locked until all 5 chambers are cleared.
  - Clicking **"Claim Official Certificate"** (or the **"Preview Certificate Layout"** shortcut) opens an ornate, gothic-bordered **Certificate of Literary Commendation** issued by the Principal and English HOD, complete with student name, house crest, and a **Print/Save PDF** action.

### 5. Tab 3 &bull; Hall of Fame (Leaderboard)
- **House Standings**: Ranks *House Dragon*, *House Griffin*, *House Phoenix* (Your house), and *House Tiger*.
- **Interactive "Spook! 👻" Button**: Increments the house cheer counter in real-time, launches floating ghost animations, and plays eerie audio chords.
- **Matrix View**: Toggle between inter-house standings and individual top student scholars.

### 6. Tab 4 &bull; HOD Desk (Head of Department)
- **Pedagogical Guidelines**: Curriculum mapping aligned with the HKDSE English Language Curriculum and Section B2 (Tone & Mood, Pathetic Fallacy, Sensory Adjectives, Inferencing).
- **Ask Doofy AI Consultation**:
  - Interactive chat interface featuring Mr. Doofy, the spectral Senior English Panel Chair.
  - Quick-prompt suggestion pills (e.g., *"How do I identify Gothic tone?"*, *"What are common HKDSE vocabulary question types?"*, *"Why is Day 1 set in Shatin Tower?"*).
  - Intelligent keyword matching and automated pedagogical responses.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Modern React framework with server/client component architecture |
| **React 19 & TypeScript** | Strict type safety and component lifecycle management |
| **Tailwind CSS v4** | Dark eerie theme (`#0b0f19`), neon green/cyan/purple glows, glassmorphism |
| **Lucide React** | Clean, modern iconography |
| **Canvas Confetti** | Celebration effects on quiz completion and badge unlock |
| **Web Audio API** | Pure synthesizer sound generation (spooky chords, chimes, clicks) with zero external audio assets |
| **Web Speech API** | Atmospheric read-aloud narration for reading passages |

---

## 📁 Project Structure

```
haunted-library/
├── src/
│   ├── app/
│   │   ├── globals.css         # Dark eerie theme, scanlines, marquee ticker animations
│   │   ├── layout.tsx          # Root layout with metadata and dark background
│   │   └── page.tsx            # Main application coordinator with auth & tab state
│   ├── components/
│   │   ├── LoginScreen.tsx     # Archival gateway login with hardcoded credentials & autofill
│   │   ├── Header.tsx          # Top navigation, campus wire ticker, stats, sound & exit buttons
│   │   ├── ChambersView.tsx    # 5-day chamber selector, interactive reading & HKDSE quiz
│   │   ├── VaultView.tsx       # 5 badge showcase and certificate claim
│   │   ├── CertificateModal.tsx# Printable Band 1 Certificate of Commendation
│   │   ├── HallOfFameView.tsx  # Inter-house leaderboard with interactive Spook! cheers
│   │   └── HODDeskView.tsx     # Pedagogical guidelines and Ask Doofy AI consultation chat
│   ├── data/
│   │   └── mockData.ts         # Complete mock dataset: chambers, vocab, questions, badges, houses
│   └── utils/
│       └── sound.ts            # Web Audio API sound synthesizer
├── public/                     # Static assets
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎓 Pedagogical Alignment
Designed specifically for Band 1 EMI English Departments to gamify intensive reading and scaffold complex gothic prose for HKDSE Paper 1 Part B2 (Extended Section) candidates.
