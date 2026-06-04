import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  weeklyProgress,
  indentProgress,
  labProgress,
  totalProgress,
} from './data.js'

const C_DONE = '#2ecc71'
const C_REMAIN = '#2b3a4a'
const C_INDENT = '#3b8be6'
const C_LAB = '#b061f0'

function donut(done) {
  return [
    { name: 'Completed', value: done },
    { name: 'Remaining', value: 100 - done },
  ]
}

function ProgressPie({ title, done, color }) {
  const data = donut(done)
  return (
    <div className="pie-card">
      <h4 className="pie-title">{title}</h4>
      <div className="pie-wrap">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={75}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill={C_REMAIN} />
            </Pie>
            <Tooltip
              formatter={(v, n) => [`${v}%`, n]}
              contentStyle={{
                background: '#0f2a43',
                border: '1px solid #28384a',
                borderRadius: 8,
                color: '#e8eef5',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pie-center">
          <span className="pie-pct">{done}%</span>
          <span className="pie-sub">done</span>
        </div>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div className="analytics">
      {/* ---- Pie charts ---- */}
      <section className="card">
        <h3 className="card-title">Project Completion — Pie Charts</h3>
        <div className="pie-grid">
          <ProgressPie title="Total Project" done={totalProgress()} color={C_DONE} />
          <ProgressPie title="AI-Enabled Indent Vetting" done={indentProgress()} color={C_INDENT} />
          <ProgressPie title="AI-Enabled Lab Operations" done={labProgress()} color={C_LAB} />
        </div>
        <div className="pie-legend">
          <span><i style={{ background: C_DONE }} /> Completed</span>
          <span><i style={{ background: C_REMAIN }} /> Remaining</span>
        </div>
      </section>

      {/* ---- Line graph ---- */}
      <section className="card">
        <h3 className="card-title">Weekly Progress — Both Modules (Cumulative %)</h3>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={weeklyProgress} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#28384a" />
            <XAxis dataKey="week" stroke="#94a7bb" fontSize={12} />
            <YAxis stroke="#94a7bb" fontSize={12} domain={[0, 100]} unit="%" />
            <Tooltip
              formatter={(v, n) => [`${v}%`, n]}
              contentStyle={{
                background: '#0f2a43',
                border: '1px solid #28384a',
                borderRadius: 8,
                color: '#e8eef5',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="indent"
              name="Indent Vetting"
              stroke={C_INDENT}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="lab"
              name="Lab Operations"
              stroke={C_LAB}
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="chart-note">
          Indent Vetting (blue) runs Weeks 1–12. Lab Operations (purple) begins Week 9 — only after
          Indent Vetting data is inserted into the Vector DB.
        </p>
      </section>
    </div>
  )
}
