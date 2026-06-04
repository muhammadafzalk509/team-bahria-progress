import { useState } from 'react'
import {
  project,
  tracks,
  milestones,
  modules,
  ganttCharts,
  combinedTimeline,
  labOperationsModules,
  labDependencyNote,
  overallProgress,
} from './data.js'
import Analytics from './Analytics.jsx'
import { generateReport } from './pdfReport.js'

const STATUS_LABEL = {
  done: 'Completed',
  'in-progress': 'In Progress',
  pending: 'Pending',
  'not-started': 'Not Started',
}

function StatusPill({ status }) {
  return (
    <span className={`pill pill-${status}`}>
      <span className="dot" />
      {STATUS_LABEL[status] || status}
    </span>
  )
}

function Header({ view, setView }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo">TB</div>
        <div>
          <h1>{project.company}</h1>
          <p className="brand-sub">Project Progress Dashboard</p>
        </div>
      </div>
      <div className="header-meta">
        <span className="week-badge">
          Currently in Week {project.currentWeek} / {project.totalWeeks}
        </span>
        <div className="toolbar">
          <button
            className={`tab-btn ${view === 'dashboard' ? 'active' : ''}`}
            onClick={() => setView('dashboard')}
          >
            📋 Dashboard
          </button>
          <button
            className={`tab-btn ${view === 'analytics' ? 'active' : ''}`}
            onClick={() => setView('analytics')}
          >
            📊 Analytics
          </button>
          <button className="pdf-btn" onClick={generateReport}>
            📄 Generate PDF Report
          </button>
        </div>
      </div>
    </header>
  )
}

function ProjectBanner() {
  return (
    <section className="banner">
      <p className="banner-label">Project</p>
      <h2>{project.title}</h2>
      <div className="tracks">
        {tracks.map((t) => (
          <div key={t.name} className={`track track-${t.status}`}>
            <div className="track-head">
              <strong>{t.name}</strong>
              <StatusPill status={t.status} />
            </div>
            <p>{t.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatCards() {
  const overall = overallProgress()
  const inProgress = modules.filter((m) => m.status === 'in-progress').length
  const pending = modules.filter((m) => m.status === 'pending').length
  const cards = [
    { label: 'Indent Vetting Completion', value: `${overall}%`, accent: 'blue' },
    { label: 'Foundation Phases', value: `${milestones.length}/${milestones.length} Done`, accent: 'green' },
    { label: 'Active Modules', value: inProgress, accent: 'amber' },
    { label: 'Pending Modules', value: pending, accent: 'grey' },
  ]
  return (
    <section className="stat-grid">
      {cards.map((c) => (
        <div key={c.label} className={`stat-card accent-${c.accent}`}>
          <p className="stat-value">{c.value}</p>
          <p className="stat-label">{c.label}</p>
        </div>
      ))}
    </section>
  )
}

function Milestones() {
  return (
    <section className="card">
      <h3 className="card-title">Foundation Phases (Cleared)</h3>
      <div className="milestone-row">
        {milestones.map((m) => (
          <div key={m.name} className="milestone done">
            <div className="check">✓</div>
            <div>
              <strong>{m.name}</strong>
              <p>{m.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function GanttChart({ track, status, modules: mods }) {
  const weeks = Array.from({ length: project.totalWeeks }, (_, i) => i + 1)
  return (
    <section className="card">
      <div className="gantt-title-row">
        <h3 className="card-title gantt-card-title">Gantt Timeline — {track}</h3>
        <StatusPill status={status} />
      </div>
      <div className="gantt">
        <div className="gantt-head">
          <div className="gantt-name-col">Module</div>
          <div className="gantt-weeks">
            {weeks.map((w) => (
              <div
                key={w}
                className={`gantt-week-label ${w === project.currentWeek ? 'now' : ''}`}
              >
                W{w}
              </div>
            ))}
          </div>
        </div>

        {mods.map((m) => (
          <div className="gantt-row" key={m.id}>
            <div className="gantt-name-col">
              <span className="gantt-mod-name">{m.name}</span>
              <span className="gantt-mod-weeks">
                Week {m.startWeek}–{m.endWeek} · {m.duration}
              </span>
            </div>
            <div className="gantt-weeks">
              {weeks.map((w) => {
                const active = w >= m.startWeek && w <= m.endWeek
                return (
                  <div
                    key={w}
                    className={`gantt-cell ${w === project.currentWeek ? 'now-col' : ''}`}
                  >
                    {active && (
                      <div className={`gantt-bar bar-${m.status}`}>
                        {w === m.startWeek && m.progress > 0 && (
                          <div className="gantt-fill" style={{ width: `${m.progress}%` }} />
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="gantt-legend">
          <span><i className="lg bar-done" /> Completed</span>
          <span><i className="lg bar-in-progress" /> In Progress</span>
          <span><i className="lg bar-pending" /> Pending</span>
          <span><i className="lg now-line" /> Current Week</span>
        </div>
      </div>
    </section>
  )
}

// Combined timeline — both tracks on one schedule, coloured by track.
function CombinedGantt() {
  const weeks = Array.from({ length: combinedTimeline.totalWeeks }, (_, i) => i + 1)
  return (
    <section className="card">
      <div className="gantt-title-row">
        <h3 className="card-title gantt-card-title">
          Combined Gantt Timeline — Both Modules
        </h3>
        <span className="combined-span">{combinedTimeline.totalWeeks} Weeks</span>
      </div>
      <div className="dependency-note">⛓ {combinedTimeline.note}</div>
      <div className="gantt">
        <div className="gantt-head">
          <div className="gantt-name-col">Module (Track)</div>
          <div className="gantt-weeks" style={gridCols(weeks.length)}>
            {weeks.map((w) => (
              <div key={w} className="gantt-week-label">W{w}</div>
            ))}
          </div>
        </div>

        {combinedTimeline.rows.map((m, idx) => (
          <div className="gantt-row" key={idx}>
            <div className="gantt-name-col">
              <span className="gantt-mod-name">{m.name}</span>
              <span className="gantt-mod-weeks">Week {m.startWeek}–{m.endWeek}</span>
            </div>
            <div className="gantt-weeks" style={gridCols(weeks.length)}>
              {weeks.map((w) => {
                const active = w >= m.startWeek && w <= m.endWeek
                return (
                  <div key={w} className="gantt-cell">
                    {active && <div className={`gantt-bar track-bar-${m.track}`} />}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        <div className="gantt-legend">
          <span><i className="lg track-bar-indent" /> Indent Vetting</span>
          <span><i className="lg track-bar-lab" /> Lab Operations</span>
        </div>
      </div>
    </section>
  )
}

function gridCols(n) {
  return { gridTemplateColumns: `repeat(${n}, 1fr)`, minWidth: `${n * 46}px` }
}

function ModuleProgress({ title, mods, note }) {
  return (
    <section className="card">
      <h3 className="card-title">{title}</h3>
      {note && <div className="dependency-note">⛓ {note}</div>}
      <div className="module-list">
        {mods.map((m) => (
          <div className="module-item" key={m.id}>
            <div className="module-top">
              <div className="module-id">{m.id}</div>
              <div className="module-info">
                <div className="module-head">
                  <strong>{m.name}</strong>
                  <StatusPill status={m.status} />
                </div>
                <p className="module-dep">
                  Week {m.startWeek}–{m.endWeek} · {m.duration} · {m.dependency}
                </p>
              </div>
              <div className="module-pct">{m.progress}%</div>
            </div>
            <div className="bar-track">
              <div
                className={`bar-value fill-${m.status}`}
                style={{ width: `${m.progress}%` }}
              />
            </div>
            <p className="module-detail">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>{project.company} · {project.title}</p>
      <p className="footer-sub">
        Status as of Week {project.currentWeek} — Timeline follows the approved Gantt chart.
      </p>
    </footer>
  )
}

export default function App() {
  const [view, setView] = useState('dashboard')
  return (
    <div className="app">
      <Header view={view} setView={setView} />
      <main className="content">
        {view === 'dashboard' ? (
          <>
            <ProjectBanner />
            <StatCards />
            <Milestones />
            {ganttCharts.map((g) => (
              <GanttChart
                key={g.track}
                track={g.track}
                status={g.status}
                modules={g.modules}
              />
            ))}
            <CombinedGantt />
            <ModuleProgress
              title="Module-wise Progress & Details — AI-Enabled Indent Vetting"
              mods={modules}
            />
            <ModuleProgress
              title="Module-wise Progress & Details — AI-Enabled Lab Operations"
              mods={labOperationsModules}
              note={labDependencyNote}
            />
          </>
        ) : (
          <Analytics />
        )}
      </main>
      <Footer />
    </div>
  )
}
