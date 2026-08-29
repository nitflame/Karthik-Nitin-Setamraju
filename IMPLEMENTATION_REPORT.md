# Implementation Report — "Signal & Noise" Portfolio

## 1. Objective
Build a portfolio that works for two audiences at once — a recruiter
scanning for 30 seconds, and a VR/ML-literate reader who lingers — around
one bold, ownable visual idea, without letting that idea override
professionalism or slow down the core content.

## 2. Visual direction: why "Signal & Noise"
Karthik's actual work is medical/physiological simulation (heart,
nervous system, real-time monitoring) — so the chosen concept isn't
decoration borrowed from elsewhere, it's the literal subject of his
flagship project re-applied to the site's own chrome. The site presents
itself as a clinical monitor, and the "patient" it's reading is
Karthik's own activity (LeetCode, skills, achievements) instead of a
fictional one.

**Design tokens** (`src/styles/global.css`):
- Base: near-black (`#0a0c0d`) with two panel elevations, not pure black —
  avoids the "generic edgy dark site" default.
- One signal color carries the theme: phosphor green (`#4dff9a`), used for
  the active state, the live indicator, and the ECG/physiology traces.
  Amber and coral-red are reserved for genuine alert/status meaning
  (medium/hard difficulty, arrhythmia state) rather than used decoratively.
- Typography: JetBrains Mono for all headers/UI chrome (instrument-label
  feel), Inter for body copy — so paragraph-length project descriptions
  stay readable and don't read as terminal output.
- A very low-opacity grid texture (2.8% opacity) sits behind everything —
  present, not visible as "a pattern."

**Restraint rule applied throughout:** the oscilloscope/clinical motif is
confined to chrome — dividers, the dashboard, section markers, the side
rail's "channel" framing. Body text and project descriptions are in
plain, direct language with no medical puns in the copy itself. This was
a deliberate choice to keep the "bold" idea from fighting the reader who
just wants to know what Karthik built.

## 3. Structure & content sourcing
Every fact rendered on the site is sourced from two documents you
provided: the resume PDF and the Final Project Report (VR sim). Nothing
was invented. Where the source didn't specify something (e.g. a live
GitHub repo link for a project), the field is left `null`/placeholder
and flagged in the README rather than filled with a plausible-sounding
guess.

Section order, and why:
1. **Hero** — name, one-line tagline (AI/ML-first, XR as differentiator,
   per your instruction), full professional summary from the resume.
2. **Experience** — the CXR internship, verbatim bullet points.
3. **Flagship case study (Heart & Nervous System VR Sim)** — the deepest
   content on the site: team with real roll numbers, all 7 delivered
   systems, the 7 architecture rules with rationale, the real compiler
   error codes (CS0305, CS0061, CS0103, CS0618, CS0672, CS0414) presented
   as an expandable list rather than a wall of text, the 7-phase
   timeline, and the closing outcome paragraph. This is the "Engineering
   Notes" aside from the original plan — it's what should make a VR/ML
   reader take the site seriously, because it's real architectural
   judgment (MaterialPropertyBlock over per-object materials,
   OnDestroy unsubscription) and not just "I used Unity."
4. **AI/ML Projects** — given equal visual weight to the flagship, per
   your explicit instruction not to let the Heart sim overshadow
   everything else: AI Network Intelligence System, Smart Classroom
   Attention Analyzer, HealthKare, Personal Finance Analyzer.
5. **Dashboard** — see below.
6. **Skills, Education, Contact** — straightforward, data-driven from
   the resume.

## 4. The Dashboard (signature section)
Four widgets, each justified against "does this add real signal or is it
decoration":

- **ECG Strip** (`ECGStrip.jsx`) — fetches real LeetCode stats for
  `GV2023002634` client-side at runtime and renders the submission
  calendar as a scrolling ECG-style trace instead of a generic calendar
  heatmap, with a solved/easy/medium/hard readout. **This could not be
  tested from the build sandbox** (no general internet access there) —
  it will make its first real request once you open the deployed site.
  If it fails, it falls back to the confirmed static "250+ solved"
  figure from your resume rather than fabricating a wave shape.
- **Physiology State Toggle** (`PhysiologyToggle.jsx`) — the dashboard's
  signature interactive moment. Clicking a state actually redraws the
  waveform and changes the BPM readout and color, using the six real
  states from your project (Healthy → Stress → Arrhythmia →
  Bradycardia → Tachycardia → Recovery). Labeled explicitly in the UI as
  "interactive demo... illustrative BPM values, not live telemetry" —
  it's honest about being a browser recreation of your state machine's
  design, not a live feed from the Unity build.
- **Vitals Panel** (`VitalsPanel.jsx`) — skills reframed as coverage
  tiles. The bar widths represent relative *breadth* of items listed per
  category (languages vs. AI/ML vs. tools, etc.) — not a fabricated
  proficiency score, since the resume doesn't contain one.
- **Achievements Strip** (`AchievementsStrip.jsx`) — the 250+ LeetCode
  milestone and SIH clearance, as a compact ticker rather than a bullet
  list.

**Explicitly left out**, per your and my earlier agreement: GitHub
contribution graph (needs your GitHub username — a `null`-labeled slot
was intentionally not built provisionally), and any model training
curves for the Classroom Attention Analyzer (no real accuracy/loss
numbers were in the source documents — inventing a results chart would
be the one thing that could actually hurt credibility with the ML-literate
audience, so it's simply not there instead of faked).

## 5. Engineering notes on the build itself
- Scaffolded with Vite + React (`npm create vite -- --template react`),
  `framer-motion` and `recharts` added (recharts installed but not yet
  used beyond what's needed — available for you to extend the dashboard).
- `src/content.js` is the single source of truth for all copy — every
  section reads from it rather than hardcoding strings, so future resume
  updates are a one-file edit.
- Production build verified clean (`npm run build` — 433 modules,
  no errors, ~111 KB gzipped JS).
- Responsive down to mobile: side rail hides under 720px, dashboard grid
  collapses to one column, all panels reflow.
- `prefers-reduced-motion` respected globally — all animations collapse
  to instant for users who've asked for that.

## 6. Known gaps — action items for you
1. Confirm/replace the guessed LinkedIn URL in `content.js`.
2. Verify the LeetCode ECG strip against the live API once deployed.
3. Add real project links for the four AI/ML projects if you have public
   repos for them.
4. Decide if/when you want to send a GitHub username to add the
   contribution-graph widget (v2, per the original plan).
5. If you get real training metrics for the Classroom Attention
   Analyzer, send them and I'll add a real results chart rather than
   an architecture-only description.

## 7. Professionalism check
The stated risk with a themed portfolio is looking like a costume
instead of a portfolio. Guardrails applied:
- No fabricated data anywhere (see dashboard section above for the one
  explicitly-labeled illustrative exception).
- Copy stays plain and factual; the theme lives in layout/color/motion,
  not in how sentences are written.
- One signature interactive moment (physiology toggle), not five —
  everything else is calm, scannable, and gets out of the way of a
  recruiter looking for "what did this person actually build."
