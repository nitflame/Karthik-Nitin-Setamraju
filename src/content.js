// content.js — single source of truth for all copy on the site.
// Every fact here traces back to the resume PDF or the Final Project Report.
// Nothing here is fabricated; anything not confirmed is left out rather than invented.

export const profile = {
  name: "Karthik Nitin Setamraju",
  shortName: "Karthik",
  tagline: "AI/ML undergrad who ships — backend APIs, computer vision, and the occasional VR Project.",
  location: "Visakhapatnam, India",
  email: "snitink532@gmail.com",
  phone: "+91-6305539374",
  github: "https://github.com/nitflame",
  githubUsername: "nitflame",
  linkedin: "https://www.linkedin.com/in/kartik-nitin-setamraju-5861aa282",
  leetcode: "GV2023002634",
  summary:
    "AI & Machine Learning undergraduate with hands-on experience in backend development, computer vision, machine learning, and immersive AR/VR applications. Built scalable REST APIs with FastAPI, AI-powered software, and interactive XR experiences using Unity, Meta XR SDK, and Blender. 250+ LeetCode problems solved.",
};

export const education = {
  school: "GITAM University",
  degree: "B.Tech, Computer Science and Engineering (AI & ML)",
  years: "2023 – 2027",
  cgpa: "8.70 / 10.00",
  coursework: [
    "Data Structures & Algorithms",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Artificial Intelligence",
  ],
};

export const experience = [
  {
    role: "Summer Intern — AR/VR Developer",
    org: "Center for Extended Reality (CXR), GITAM University",
    period: "05/2026 – 06/2026",
    bullets: [
      "Developed immersive Virtual Reality and Augmented Reality learning experiences using Unity and Meta XR SDK.",
      "Designed and optimized interactive 3D assets and environments using Blender for real-time rendering.",
      "Built reusable XR interaction workflows and contributed to scalable application architecture.",
      "Collaborated with mentors and researchers to integrate immersive technologies into educational applications.",
    ],
  },
  {
    role: "Agentic Development Lead",
    org: "GitHub Community GITAM",
    period: "Aug 2026 – Present",
    bullets: [
      "Lead of the Agentic Development Domain.",
    ],
  },
  {
    role: "Core Team Member",
    org: "ACM – GITAM (Association for Computing Machinery)",
    period: "Aug 2026 – Present",
    bullets: [],
  },
  {
    role: "Winter Intern — Augmented Reality Development",
    org: "Center for Extended Reality (CXR), GITAM University",
    period: "Dec 2025 – Apr 2026",
    bullets: [
      "Worked on a medical simulation project for educational purposes and a mixed reality computer assembly experience, using Unity and Blender.",
    ],
  },
  {
    role: "Media Team Member",
    org: "Directorate of Sports & NCC, GITAM University",
    period: "Jan 2025 – Jul 2026",
    bullets: [
      "Core member of the eSports club within the Directorate of Sports.",
    ],
  },
];

// Skills grouped for the vitals-panel dashboard AND the plain skills section.
export const skills = {
  languages: ["Java", "Python", "SQL", "JavaScript"],
  frameworks: ["FastAPI", "Unity", "Meta XR SDK"],
  aiml: ["Computer Vision", "Image Classification", "EfficientNet-B0", "RAG", "Model Context Protocol (MCP)", "Claude API", "Agentic Workflows"],
  tools: ["Git", "GitHub", "Blender", "VS Code"],
  databases: ["MySQL", "MongoDB"],
  coreCS: ["OOP", "REST APIs", "Software Engineering"],
};

// Flagship case study — full detail, drawn directly from the Final Project Report.
export const flagshipProject = {
  id: "heart-vr",
  title: "3D Human Heart & Nervous System — VR Educational Simulation",
  role: "Lead XR Interaction, Educational Systems, Physiology Visualization, UI Integration",
  period: "1 May 2026 – 30 June 2026 · 9 weeks",
  team: [
    { name: "Karthik Nitin Setamraju", roll: "2023002634", focus: "Lead XR Interaction, Educational Systems, Physiology Visualization, UI Integration" },
    { name: "Saravana Sai Nunna", roll: "2023001628", focus: "Anatomy Integration, Physiological Simulation, XR Testing, System Optimization" },
    { name: "Venkat Padimi", roll: "2023001209", focus: "VR Environment Support, XR Configuration, Interaction Testing, XR Interaction" },
  ],
  stack: ["Blender", "Unity 6000.1.1f1", "URP", "C#", "XR Interaction Toolkit (XRI) 3.5.0", "FBX pipeline"],
  status: "Completed — all planned systems delivered",
  summary:
    "Began as a Blender anatomical modelling exercise and grew, over nine weeks, into a fully interactive VR-native physiology platform — synchronized cardiovascular and nervous system simulation, real-time physiological monitoring, and three clinical-education modules: Coronary Stent Deployment, IV Learning, and Endoscopy.",
  systems: [
    { name: "Central Nervous System Visualization", detail: "3D brain, spinal cord, cranial nerves and major neural pathways, with anatomical labeling, click detection, and info popups." },
    { name: "Peripheral Nervous System", detail: "Reusable modular cervical, thoracic, lumbar and sacral nerve segments, anatomically placed and spine-connected." },
    { name: "Interactive Heart System", detail: "Full heart anatomy, chamber identification, blood-flow visualization, highlight effects, educational descriptions." },
    { name: "Educational Interaction System", detail: "VR controller support, object selection, information panels, educational navigation." },
    { name: "Coronary Stent Deployment Module", detail: "Blockage → stent insertion → expansion → flow restoration → recovery, manual and autoplay modes." },
    { name: "IV Learning Module", detail: "Interactive procedural IV-access training, in the same XR interaction and UI framework." },
    { name: "Endoscopy Module", detail: "Endoscopic navigation and visualization, with dedicated HUD fields, built from scratch." },
  ],
  architecture: [
    { rule: "MaterialPropertyBlock", why: "used for all runtime material changes instead of per-object material instances, avoiding draw-call and memory overhead." },
    { rule: "Non-generic IEnumerators", why: "coroutines stay compatible across Unity/XRI version upgrades and refactors." },
    { rule: "HapticImpulsePlayer", why: "all controller haptic feedback, matching the XRI 3.x input architecture." },
    { rule: "SerializeField over public fields", why: "Inspector-exposed config stays explicit and encapsulated." },
    { rule: "No GameObject.Find / FindObjectOfType", why: "explicit serialized references only — avoids runtime lookup cost and hidden dependencies." },
    { rule: "Null checks on every serialized reference", why: "prevents null-reference crashes from missing Inspector wiring." },
    { rule: "Event unsubscription in OnDestroy", why: "prevents memory leaks and dangling listeners between scenes." },
  ],
  physiologyStates: ["Healthy", "Stress Response", "Arrhythmia", "Bradycardia", "Tachycardia", "Recovery"],
  challenges: {
    headline: "Migrating across XR Interaction Toolkit 3.x API changes mid-project",
    errors: [
      { code: "CS0305", meaning: "generic type argument mismatches" },
      { code: "CS0061", meaning: "loop/control variable typing" },
      { code: "CS0103", meaning: "names no longer in scope after interactor/interactable renames" },
      { code: "CS0618", meaning: "use of newly-obsoleted XRI APIs" },
      { code: "CS0672", meaning: "missing obsolete attribute on method overrides" },
      { code: "CS0414", meaning: "unused private fields left over from refactors" },
    ],
    resolution:
      "Each error was resolved by refactoring against the project's architecture rules rather than patching symptoms, keeping fixes consistent across the whole codebase. The team also resolved world-space canvas rendering issues, anatomy interaction layer mismatches, mesh intersections between vascular and nervous geometry, FBX import hierarchy glitches, Blender-to-Unity material discrepancies, and a final texture-compression pass to keep VR frame rates stable.",
  },
  timeline: [
    { period: "May 1 – May 6", focus: "Research & Setup", outcome: "Anatomy research, Blender environment setup, Git/GitHub workflow established" },
    { period: "May 7 – May 11", focus: "Nervous System & Body", outcome: "Modular nerve segments built and assigned across a base human body model" },
    { period: "May 11 – May 15", focus: "Heart Development", outcome: "Heart geometry, texturing, shading, and heartbeat pulse animation completed" },
    { period: "May 15 – May 17", focus: "Full System Integration", outcome: "Heart, nervous system, arteries, veins merged into one unified Blender scene" },
    { period: "May 18 – May 19", focus: "Unity Import & Debugging", outcome: "FBX export/import pipeline completed; geometry and material bugs resolved" },
    { period: "May 20 – May 30", focus: "XR Interaction, HUD, Physiology & Stent", outcome: "XRI migration, Educational Anatomy UI, Medical HUD, Physiology State Manager, Coronary Stent module delivered" },
    { period: "June 2026", focus: "Final Systems & Polish", outcome: "IV Learning and Endoscopy modules built; audio integration, labels, texture compression, comfort validation, final playtest" },
  ],
  outcome:
    "Every system in the original project plan was delivered, plus three additional clinical modules added in the final phase. As of 30 June 2026 the project is complete, stable, and demonstration-ready — and it directly reinforced the team's Unity/AI-ML skills for placement preparation.",
};

// Other projects — kept as first-class entries, not footnotes to the VR sim.
export const projects = [
  {
    id: "ai-network",
    title: "AI Network Intelligence System",
    category: "AI/ML",
    period: "03/2026 – 04/2026",
    status: "Archived",
    stack: ["Python", "FastAPI", "Machine Learning", "REST APIs"],
    summary: "Predicts and reroutes network traffic before congestion hits — a FastAPI backend wrapping the ML decision logic, with a simulation layer to stress-test scenarios before they're real.",
    bullets: [
      "Built scalable backend APIs using FastAPI and integrated machine learning decision logic.",
      "Designed simulation modules for intelligent network analysis.",
    ],
    link: "https://github.com/nitflame/AI-network-System",
  },
  {
    id: "classroom-attention",
    title: "Smart Classroom Attention Analyzer",
    category: "AI/ML",
    period: "2025",
    status: "Archived",
    stack: ["Python", "EfficientNet-B0", "Computer Vision"],
    summary: "Points a camera at a classroom and reads the room — an EfficientNet-B0 classifier trained to recognize 12 distinct student behaviour patterns in real time.",
    bullets: [
      "Built a real-time inference interface for classroom attention monitoring.",
      "Trained an EfficientNet-B0 classifier across 12 distinct behaviour classes.",
    ],
    link: "https://github.com/nitflame/Smart-Classroom-Attention-Analyzer",
  },
  {
    id: "healthkare",
    title: "HealthKare",
    category: "Full-Stack",
    period: "09/2025 – 10/2025",
    status: "Live",
    stack: ["Java", "SQL"],
    summary: "A secure, SQL-backed healthcare records system built to keep patient data structured and auditable, not scattered across spreadsheets.",
    bullets: [
      "Implemented CRUD operations and structured database architecture.",
    ],
    link: "https://github.com/nitflame/HealthKare",
  },
  {
    id: "finance-analyzer",
    title: "Personal Finance Analyzer",
    category: "Data Analytics",
    period: "03/2026",
    status: "Archived",
    stack: ["Python", "Data Analytics"],
    summary: "Turns raw expense data into a budget you'd actually look at twice — visual analytics over your own spending patterns.",
    bullets: [],
    link: "https://github.com/nitflame/finance-analyzer",
  },
  {
    id: "anatomy-vr",
    title: "VR Human Anatomy Education System",
    category: "Unity",
    period: "05/2026 – 06/2026",
    status: "Live",
    stack: ["Unity 6", "C#", "XR Interaction Toolkit (XRI)", "Meta Quest SDK", "OpenXR", "URP", "Blender"],
    summary: "An immersive learning platform focused on interactive 3D anatomy visualization and physiology simulations, featuring cardiovascular and nervous system telemetry.",
    bullets: [
      "Developed XR interactions, heartbeat / nervous system simulations, and educational HUD interfaces.",
      "Built interactive IV Learning and Coronary Stent Deployment training modules.",
      "Optimized scene frames, validated playtest comfort, and resolved interaction layer glitches.",
    ],
    link: null,
  },
  {
    id: "pc-assembly-mr",
    title: "Mixed Reality PC Assembly Simulator",
    category: "Unity",
    period: "12/2025 – 04/2026",
    status: "Beta",
    stack: ["Unity 6", "C#", "XR Interaction Toolkit", "Meta Quest SDK", "Meta Quest Passthrough", "OpenXR"],
    summary: "A VR/MR application enabling users to assemble PC hardware components with realistic physics-based sockets and Meta Quest passthrough overlay integration.",
    bullets: [
      "Implemented and validated grab interactions, snap-to-install sockets, haptic feedback, and locomotion.",
      "Identified and resolved collider alignment, snapping, and physics collision issues.",
      "Tested and integrated VR-to-MR passthrough workflows on Meta Quest 2 and Quest 3 devices.",
    ],
    link: null,
  },
];

export const achievements = [
  { label: "250+ LeetCode problems solved", detail: "Data Structures & Algorithms", date: null },
  { label: "Smart India Hackathon (SIH) 2025", detail: "Qualified the internal college round", date: "Sep 2025" },
  { label: "TMCG Ideasprint 3.0", detail: "GITAM University", date: "Mar 2026" },
];

export const certifications = [
  {
    title: "Programming In Java",
    issuer: "NPTEL Online Certification (IIT Kharagpur)",
    period: "Jan – Apr 2025",
    score: "70% consolidated (Assignments: 24.6/25 · Exam: 45/75)",
    credentialId: "NPTEL25CS57S1160300244",
    downloadLink: "/Karthik_Nitin_Setamraju_Java_Certificate.pdf",
  },
  {
    title: "Unity Junior Programmer",
    issuer: "Unity",
    period: "Apr 2026",
    credentialId: "6febaef7-d4f8-462f-92ce-94684840642d",
  },
  {
    title: "Building with the Claude API",
    issuer: "Claude Academy — Anthropic",
    period: "Aug 2026",
    credentialId: "66b08da91845d0f52302cc161c787dba",
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Claude Academy — Anthropic",
    period: "Aug 2026",
    credentialId: "50aaaae88c012c20af5908cdcb2afe4d",
  },
];
