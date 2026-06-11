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
    status: 'done',
    progress: 100,
    detail:
      'Data scanning & digitalization module is 100% complete — all hardcopy indent data has been converted into softcopy (digital form).',
  },
  {
    id: 2,
    name: 'Gathering Relevant Data (Standards)',
    startWeek: 2,
    endWeek: 3,
    duration: '2 Weeks',
    dependency: 'Follows Data Scanning',
    status: 'pending',
    progress: 0,
    detail:
      'Collection & digitalization of the remaining relevant data (standards). Currently pending.',
  },
  {
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

// Dependency: Lab Operations cannot start until Indent Vetting data
// has been inserted into the Vector DB (i.e. after IV Week 8).
export const labDependencyNote =
  'AI-Enabled Lab Operations starts only AFTER the AI-Enabled Indent Vetting data is inserted into the Vector DB (post Week 8). Until then all Lab modules remain pending.'

// ---- Track 2: AI-Enabled Lab Operations (not started) ----
// Same 12-week pipeline structure — ALL modules pending until kickoff.
export const labOperationsModules = [
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
export { indentVettingModules }

// ---- Combined timeline (both tracks on ONE schedule) ----
// Lab Operations is offset by +8 weeks because it can only begin after
// Indent Vetting's Vector DB data insertion (post Week 8). Total = 20 weeks.
const LAB_OFFSET = 8
export const combinedTimeline = {
  totalWeeks: 20,
  note: labDependencyNote,
  rows: [
    ...indentVettingModules.map((m) => ({
      name: `IV · ${m.name}`,
      track: 'indent',
      startWeek: m.startWeek,
      endWeek: m.endWeek,
      status: m.status,
    })),
    ...labOperationsModules.map((m) => ({
      name: `LAB · ${m.name}`,
      track: 'lab',
      startWeek: m.startWeek + LAB_OFFSET,
      endWeek: m.endWeek + LAB_OFFSET,
      status: m.status,
    })),
  ],
}

// ---- Weekly cumulative progress (for the line graph) ----
// Planned cumulative completion % per week for each track.
// Indent Vetting runs Weeks 1-12; Lab Operations begins Week 9 (after IV Vector DB).
export const weeklyProgress = [
  { week: 'W1', indent: 5, lab: 0 },
  { week: 'W2', indent: 15, lab: 0 },
  { week: 'W3', indent: 22, lab: 0 }, // current actual point
  { week: 'W4', indent: 30, lab: 0 },
  { week: 'W5', indent: 40, lab: 0 },
  { week: 'W6', indent: 52, lab: 0 },
  { week: 'W7', indent: 64, lab: 0 },
  { week: 'W8', indent: 76, lab: 0 },
  { week: 'W9', indent: 83, lab: 5 },
  { week: 'W10', indent: 90, lab: 12 },
  { week: 'W11', indent: 96, lab: 22 },
  { week: 'W12', indent: 100, lab: 34 },
  { week: 'W13', indent: 100, lab: 46 },
  { week: 'W14', indent: 100, lab: 56 },
  { week: 'W15', indent: 100, lab: 66 },
  { week: 'W16', indent: 100, lab: 76 },
  { week: 'W17', indent: 100, lab: 84 },
  { week: 'W18', indent: 100, lab: 91 },
  { week: 'W19', indent: 100, lab: 96 },
  { week: 'W20', indent: 100, lab: 100 },
]

// Generic weighted completion for any module set (by week duration).
function weightedProgress(mods) {
  let totalW = 0
  let done = 0
  for (const m of mods) {
    const w = m.endWeek - m.startWeek + 1
    totalW += w
    done += w * (m.progress / 100)
  }
  return totalW ? Math.round((done / totalW) * 100) : 0
}

export function indentProgress() {
  return weightedProgress(indentVettingModules)
}
export function labProgress() {
  return weightedProgress(labOperationsModules)
}
// Total project = average of both tracks.
export function totalProgress() {
  return Math.round((indentProgress() + labProgress()) / 2)
}

// Weighted overall completion (by module duration in weeks) for the ACTIVE track.
// Duration is derived from each module's startWeek/endWeek so adding or
// renumbering modules can never produce NaN.
export function overallProgress() {
  let totalW = 0
  let done = 0
  for (const m of indentVettingModules) {
    const w = Math.max(1, m.endWeek - m.startWeek + 1)
    totalW += w
    done += w * (m.progress / 100)
  }
  return totalW ? Math.round((done / totalW) * 100) : 0
}
