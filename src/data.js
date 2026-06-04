// ============================================================
//  Team Bahria — Project Progress Data
//  Single source of truth for the dashboard.
//  Update progress %, status and currentWeek here as work moves.
// ============================================================

export const project = {
  company: 'Team Bahria',
  title: 'AI-Enabled Indent Vetting & AI-Enabled Lab Operations',
  totalWeeks: 12,
  currentWeek: 3, // we are mid Week 3 (Gathering + Architecture overlap)
}

// Project tracks (the two AI systems)
export const tracks = [
  {
    name: 'AI-Enabled Indent Vetting',
    status: 'in-progress',
    note: 'Active track — all current work is on this system.',
  },
  {
    name: 'AI-Enabled Lab Operations',
    status: 'not-started',
    note: 'Not started yet — begins after Indent Vetting matures.',
  },
]

// Completed foundation phases (before the Gantt timeline tasks)
export const milestones = [
  {
    name: 'Initial Paper Documentation',
    status: 'done',
    note: 'Requirement & concept paperwork completed.',
  },
  {
    name: 'Proof of Concept (POC)',
    status: 'done',
    note: 'Feasibility validated — concept proven.',
  },
]

// ---- Track 1: AI-Enabled Indent Vetting (active) ----
// Weeks taken EXACTLY from the approved Gantt chart.
// status: done | in-progress | pending
const indentVettingModules = [
  {
    id: 1,
    name: 'Gathering Indent Data (Digitalization)',
    startWeek: 1,
    endWeek: 2,
    duration: '2 Weeks',
    dependency: 'Initial Phase',
    status: 'in-progress',
    progress: 80,
    detail:
      'Hardcopy data is being converted into softcopy (digital form). 80% complete — remaining relevant data is still pending.',
  },
  {
    id: 2,
    name: 'System Architecture',
    startWeek: 2,
    endWeek: 4,
    duration: '3 Weeks',
    dependency: 'Starts during Data Gathering',
    status: 'in-progress',
    progress: 60,
    detail:
      'Design is 60% complete as per requirements. The remaining ~30% will be finalized once data gathering reaches 100%.',
  },
  {
    id: 3,
    name: 'FastAPI & Vector DB',
    startWeek: 5,
    endWeek: 8,
    duration: '4 Weeks',
    dependency: 'Core Backend (Requires finalized architecture)',
    status: 'pending',
    progress: 0,
    detail:
      'Data alignment for Vector DB + backend implementation. Will begin once the architecture is finalized.',
  },
  {
    id: 4,
    name: 'Frontend & Integration',
    startWeek: 9,
    endWeek: 12,
    duration: '4 Weeks',
    dependency: 'UI/UX & Full Stack Connection',
    status: 'pending',
    progress: 0,
    detail: 'UI/UX build + full-stack integration with backend. Currently pending.',
  },
  {
    id: 5,
    name: 'Testing',
    startWeek: 11,
    endWeek: 12,
    duration: '2 Weeks',
    dependency: 'Parallel with final Integration',
    status: 'pending',
    progress: 0,
    detail: 'Testing in parallel with final integration. Currently pending.',
  },
]

// ---- Track 2: AI-Enabled Lab Operations (not started) ----
// Same 12-week pipeline structure — ALL modules pending until kickoff.
const labOperationsModules = [
  {
    id: 1,
    name: 'Gathering Lab Data (Digitalization)',
    startWeek: 1,
    endWeek: 2,
    duration: '2 Weeks',
    dependency: 'Initial Phase',
    status: 'pending',
    progress: 0,
    detail: 'Collection & digitalization of lab operation records. Not started yet.',
  },
  {
    id: 2,
    name: 'System Architecture',
    startWeek: 2,
    endWeek: 4,
    duration: '3 Weeks',
    dependency: 'Starts during Data Gathering',
    status: 'pending',
    progress: 0,
    detail: 'System design for lab operations module. Not started yet.',
  },
  {
    id: 3,
    name: 'FastAPI & Vector DB',
    startWeek: 5,
    endWeek: 8,
    duration: '4 Weeks',
    dependency: 'Core Backend (Requires finalized architecture)',
    status: 'pending',
    progress: 0,
    detail: 'Backend + Vector DB for lab operations. Not started yet.',
  },
  {
    id: 4,
    name: 'Frontend & Integration',
    startWeek: 9,
    endWeek: 12,
    duration: '4 Weeks',
    dependency: 'UI/UX & Full Stack Connection',
    status: 'pending',
    progress: 0,
    detail: 'UI/UX + full-stack integration for lab operations. Not started yet.',
  },
  {
    id: 5,
    name: 'Testing',
    startWeek: 11,
    endWeek: 12,
    duration: '2 Weeks',
    dependency: 'Parallel with final Integration',
    status: 'pending',
    progress: 0,
    detail: 'Testing for lab operations module. Not started yet.',
  },
]

// Both Gantt charts rendered on the dashboard, in order.
export const ganttCharts = [
  {
    track: 'AI-Enabled Indent Vetting',
    status: 'in-progress',
    modules: indentVettingModules,
  },
  {
    track: 'AI-Enabled Lab Operations',
    status: 'not-started',
    modules: labOperationsModules,
  },
]

// Active track used for stat cards & detailed module progress.
export const modules = indentVettingModules

// Weighted overall completion (by module duration in weeks) for the ACTIVE track.
export function overallProgress() {
  const weeks = { 1: 2, 2: 3, 3: 4, 4: 4, 5: 2 }
  let totalW = 0
  let done = 0
  for (const m of indentVettingModules) {
    const w = weeks[m.id]
    totalW += w
    done += w * (m.progress / 100)
  }
  return Math.round((done / totalW) * 100)
}
