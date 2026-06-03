# Team Bahria — Project Progress Dashboard

A React.js (Vite) dashboard that tracks progress of the **AI-Enabled Indent Vetting & AI-Enabled Lab Operations** project, following the approved 12-week Gantt chart.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build      # output in dist/
npm run preview    # preview the production build
```

## Update progress

All data (modules, %, status, current week) lives in **`src/data.js`** — edit that one file and the whole dashboard updates.

---

## Deploy on Render (Static Site)

### 1. Push to GitHub

```bash
git add .
git commit -m "Team Bahria progress dashboard"
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

### 2. Connect on Render

1. Go to https://dashboard.render.com → **New +** → **Static Site**.
2. Connect your GitHub account and pick this repository.
3. Render reads `render.yaml` automatically. If asked manually, use:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site**. First build takes ~1–2 min.

Your dashboard goes live at `https://team-bahria-progress.onrender.com` (or your chosen name).

Every future `git push` to `main` auto-redeploys.
