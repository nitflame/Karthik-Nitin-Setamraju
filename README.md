# Karthik Nitin Setamraju — Portfolio ("Signal & Noise")

A single-page portfolio themed as clinical monitoring instrumentation:
an ECG-style trace, vitals panels, and a physiology-state-machine toggle
recreated from the actual VR project it documents.

## Stack
- Vite + React
- framer-motion (waveform divider draw-in animation)
- recharts (installed, available if you want to extend the dashboard later)

## Run locally
```
npm install
npm run dev
```

## Build
```
npm run build
```
Outputs to `dist/`.

## Deploy
- **Vercel**: import the repo, framework preset "Vite", no config needed.
- **GitHub Pages**: run `npm run build`, then either use the
  `gh-pages` package to publish `dist/`, or point a GitHub Actions
  workflow at `npm run build` + upload `dist/` as the Pages artifact.
  Note: GitHub Pages serves from a subpath (`username.github.io/repo`),
  so if you go this route add `base: '/repo-name/'` to `vite.config.js`.

## Things to confirm/fix before going live
1. **LinkedIn URL** — `src/content.js` has a guessed slug
   (`linkedin.com/in/karthik-nitin-setamraju`). Replace with your real one.
2. **LeetCode live fetch** — `src/components/Dashboard/ECGStrip.jsx` calls
   `https://leetcode-stats-api.herokuapp.com/GV2023002634` client-side.
   This could not be tested from the build sandbox (no general internet
   access there). Open the deployed site and confirm the ECG trace
   populates with real numbers instead of falling back to the static
   "250+" figure. If the API is flaky, `alfa-leetcode-api` is a
   commonly-used alternative with a similar shape.
3. **Project links** — the four AI/ML projects (`src/content.js`,
   `projects` array) have `link: null`. Add real GitHub repo URLs where
   you have them public.
4. **Resume PDF** — no download link is wired up yet. Drop your PDF into
   `public/` and add a link in the Hero or Contact section if you want
   a direct download button.

## What's real vs. illustrative
Every fact in `src/content.js` and the Flagship case study
(`src/components/Flagship.jsx`) is drawn directly from your resume and
the Final Project Report — team roll numbers, the exact compiler error
codes (CS0305 etc.), the architecture rules, the timeline. The one
explicitly illustrative piece is the Physiology State Machine BPM
numbers in the dashboard — labeled in the UI as a demo recreation of
the state machine's design, not live telemetry from the Unity build.
