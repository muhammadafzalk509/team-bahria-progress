import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  project,
  tracks,
  milestones,
  indentVettingModules,
  labOperationsModules,
  labDependencyNote,
  indentProgress,
  labProgress,
  totalProgress,
} from './data.js'

const NAVY = [31, 78, 121]
const MUTED = [120, 135, 150]

export function generateReport() {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const today = new Date().toISOString().slice(0, 10)

  // ---- Header band ----
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, W, 70, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(18)
  doc.text(project.company, 40, 32)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text('Project Progress Report', 40, 50)
  doc.setFontSize(9)
  doc.text(`Generated: ${today}`, W - 40, 32, { align: 'right' })
  doc.text(`Week ${project.currentWeek} / ${project.totalWeeks}`, W - 40, 48, { align: 'right' })

  // ---- Project title ----
  let y = 96
  doc.setTextColor(0, 0, 0)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Project', 40, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(doc.splitTextToSize(project.title, W - 80), 40, y + 16)

  // ---- Overall summary ----
  y += 48
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Overall Summary', 40, y)
  autoTable(doc, {
    startY: y + 8,
    head: [['Track', 'Status', 'Completion']],
    body: [
      ['AI-Enabled Indent Vetting', 'In Progress', `${indentProgress()}%`],
      ['AI-Enabled Lab Operations', 'Not Started', `${labProgress()}%`],
      ['TOTAL PROJECT', '', `${totalProgress()}%`],
    ],
    theme: 'grid',
    headStyles: { fillColor: NAVY },
    styles: { fontSize: 10, cellPadding: 6 },
  })

  // ---- Foundation phases ----
  y = doc.lastAutoTable.finalY + 24
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Foundation Phases (Cleared)', 40, y)
  autoTable(doc, {
    startY: y + 8,
    head: [['Phase', 'Status', 'Note']],
    body: milestones.map((m) => [m.name, 'Completed', m.note]),
    theme: 'grid',
    headStyles: { fillColor: NAVY },
    styles: { fontSize: 10, cellPadding: 6 },
  })

  // ---- Indent Vetting modules ----
  y = doc.lastAutoTable.finalY + 24
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('AI-Enabled Indent Vetting — Modules', 40, y)
  autoTable(doc, {
    startY: y + 8,
    head: [['#', 'Module', 'Weeks', 'Status', 'Progress']],
    body: indentVettingModules.map((m) => [
      m.id,
      m.name,
      `W${m.startWeek}-${m.endWeek}`,
      statusLabel(m.status),
      `${m.progress}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: NAVY },
    styles: { fontSize: 9, cellPadding: 5 },
  })

  // ---- Lab Operations modules ----
  y = doc.lastAutoTable.finalY + 24
  if (y > doc.internal.pageSize.getHeight() - 160) {
    doc.addPage()
    y = 50
  }
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('AI-Enabled Lab Operations — Modules', 40, y)
  autoTable(doc, {
    startY: y + 8,
    head: [['#', 'Module', 'Weeks', 'Status', 'Progress']],
    body: labOperationsModules.map((m) => [
      m.id,
      m.name,
      `W${m.startWeek}-${m.endWeek}`,
      statusLabel(m.status),
      `${m.progress}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: NAVY },
    styles: { fontSize: 9, cellPadding: 5 },
  })

  // ---- Dependency note ----
  y = doc.lastAutoTable.finalY + 20
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...NAVY)
  doc.text('Dependency', 40, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(60, 60, 60)
  doc.text(doc.splitTextToSize(labDependencyNote, W - 80), 40, y + 16)

  // ---- Footer ----
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(...MUTED)
    doc.text(
      `${project.company} — Project Progress Report`,
      40,
      doc.internal.pageSize.getHeight() - 20
    )
    doc.text(
      `Page ${i} / ${pages}`,
      W - 40,
      doc.internal.pageSize.getHeight() - 20,
      { align: 'right' }
    )
  }

  doc.save(`Team-Bahria-Progress-Report-${today}.pdf`)
}

function statusLabel(s) {
  return {
    done: 'Completed',
    'in-progress': 'In Progress',
    pending: 'Pending',
    'not-started': 'Not Started',
  }[s] || s
}
