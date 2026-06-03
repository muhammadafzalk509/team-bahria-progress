import {
  project,
  tracks,
  milestones,
  modules,
  overallProgress,
} from './data.js'

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

function Header() {
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
        <span className="week-badge">Currently in Week {project.currentWeek} / {project.totalWeeks}</span>
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
    { label: 'Overall Completion', value: `${overall}%`, accent: 'blue' },
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

function GanttChart() {
  const weeks = Array.from({ length: project.totalWeeks }, (_, i) => i + 1)
  return (
    <section className="card">
      <h3 className="card-title">Gantt Timeline — 12 Weeks</h3>
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

        {modules.map((m) => (
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
                          <div
                            className="gantt-fill"
                            style={{
                              width: `${m.progress}%`,
                            }}
                          />
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

function ModuleProgress() {
  return (
    <section className="card">
      <h3 className="card-title">Module-wise Progress & Details</h3>
      <div className="module-list">
        {modules.map((m) => (
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
      <p>
        {project.company} · {project.title}
      </p>
      <p className="footer-sub">
        Status as of Week {project.currentWeek} — Timeline follows the approved Gantt chart.
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app">
      <Header />
      <main className="content">
        <ProjectBanner />
        <StatCards />
        <Milestones />
        <GanttChart />
        <ModuleProgress />
      </main>
      <Footer />
    </div>
  )
}
