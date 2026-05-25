# Portfolio Update Guide

## Add a New Project (My Works)

### 1. Add project data
**File:** `src/data/project.json`

Add a new object to the `"project"` array (at the end, before `]`):

```json
{
     "name": "Project Name",
     "link": "https://live-demo-url.com/",
     "github": "https://github.com/username/repo",
     "description": "Short description of what the project does"
}
```

Note the **index** of your new project (0-based). If it's the 21st item, index = `20`.

### 2. Add project screenshot
Place a screenshot image (PNG recommended) in:

```
src/assets/project/<project-name>.png
```

### 3. Create single project page
**File:** `src/components/Content/MyWorks/Single/<ProjectName>.tsx`

```tsx
import { FC } from "react";
import data from '../../../../data/project.json'
import WorkCards from "../WorksCards/WorkCards";

import projectImg from '../../../../assets/project/<project-name>.png'

const ProjectName: FC = () => {
     const {project} = data
     return (
          <div style={{
               maxWidth: 650,
               margin: '0 auto'
          }}>
               <WorkCards 
                    title={project[INDEX].name}
                    imglink={ projectImg}
                    projectLink={project[INDEX].link}
                    descr={project[INDEX].description}
                    code={{
                         code_name:"Code",
                         path: project[INDEX].github
                    }}
               />
          </div>
     )
}

export default ProjectName
```

Replace `INDEX` with the actual array index from step 1.

### 4. Add route
**File:** `src/components/Router/WorkRoutes.tsx`

Add lazy import (after the last existing one):
```tsx
const _ProjectName = lazy(() => import('../Content/MyWorks/Single/<ProjectName>'))
```

Add Route (before the `*` catch-all route):
```tsx
<Route path='/project-slug' element={<_ProjectName />} />
```

### 5. Add navigation link
**File:** `src/components/Router/WorkLinks.tsx`

Add to the `routes` array (at the end, before `]`):
```tsx
{name: "Project-name", path: "/project-slug"},
```

---

## Add a New Skill (My Skills)

### 1. Add skill name
**File:** `src/data/skills.json`

Add at the end of the array (before `]`):
```json
{
    "title": "Skill Name"
}
```

### 2. Add skill icon
Place the icon image in:
```
src/assets/images-2/<skill-name>.png
```

### 3. Register icon in SkillsCards
**File:** `src/components/Content/MySkills/SkillsCards/SkillsCards.tsx`

Add import (after the last existing one):
```tsx
import skillname from '../../../../assets/images-2/<skill-name>.png'
```

Add to `_skillsImages` array (at the end, before `]`):
```tsx
    skillname
]
```

**Important:** The order of items in `_skillsImages` MUST match the order in `skills.json` exactly. The arrays are mapped by index.

---

## Quick Checklist

### New project:
- [ ] Add entry to `project.json`
- [ ] Place screenshot in `assets/project/`
- [ ] Create `Single/<ProjectName>.tsx` with correct index
- [ ] Add lazy import + Route in `WorkRoutes.tsx`
- [ ] Add nav link in `WorkLinks.tsx`

### New skill:
- [ ] Add entry to `skills.json`
- [ ] Place icon in `assets/images-2/`
- [ ] Add import + array entry in `SkillsCards.tsx`

### Career / CV:
- [ ] Update `public/resume/resume.ru.json` + `resume.en.json` (sync `resume.json`)
- [ ] Replace `public/resume/FM-resume.pdf` if static rabota.by CV changed
- [ ] Replace `public/resume/avatar.jpg` if CV photo changed
- [ ] Set `meta.updatedAt` and keep `personal.pdfUrl` / `personal.photoUrl`
- [ ] Test `/career` in RU and EN — generate PDF + rabota.by button (if BY+RU work permit)

---

## Career Page & CV Generator (`/career`)

The Career page is **locale-aware**. Resume content comes from JSON; UI labels from i18n.

### Data files

| File | Role |
|------|------|
| `public/resume/resume.ru.json` | Resume data (Russian) |
| `public/resume/resume.en.json` | Resume data (English) |
| `public/resume/resume.json` | Legacy/fallback copy — keep in sync with `resume.ru.json` |
| `public/resume/FM-resume.pdf` | Static CV export (rabota.by / hh.ru) |
| `public/resume/avatar.jpg` | Photo embedded in generated PDF |
| `src/types/resume.ts` | TypeScript schema |
| `src/hooks/useResumeData.ts` | Fetches `resume.{locale}.json` |

Do **not** store resume content in `src/data/`.

### CV buttons on `/career`

| Button | Behavior |
|--------|----------|
| **Generate CV (PDF)** | Builds PDF client-side from current locale JSON + i18n section labels |
| **Download rabota.by CV** | Direct download of `personal.pdfUrl` (`/resume/FM-resume.pdf`) |

The rabota.by button is shown **only** when `personal.workPermit` includes both **Belarus** and **Russia** (RU/EN spellings). Logic: `src/utils/resumeRegion.ts` → `hasBelarusRussiaWorkPermit()`.

### PDF generator (important)

- **Library:** pdfmake **0.2.10 via CDN** (loaded on button click only — **do not** add `pdfmake` to npm)
- **Generator:** `src/utils/generateResumePdf.ts`
- **Page:** `src/components/Content/Career/CareerPage.tsx` (lazy-loaded in `App.tsx`)
- **Photo:** `personal.photoUrl` (default fallback `/resume/avatar.jpg`) — fetched as base64 and placed in PDF header
- **Never pass live React state arrays** (e.g. `highlights`) directly to pdfmake — it mutates them. Always clone data (`JSON.parse(JSON.stringify(data))`) and copy arrays before PDF build.

### Update resume JSON from PDF

1. Read `public/resume/FM-resume.pdf`
2. Update **`public/resume/resume.ru.json`** and **`public/resume/resume.en.json`** (and `resume.json` if present)
3. Set `meta.updatedAt` from PDF footer date
4. Keep `personal.pdfUrl`: `/resume/FM-resume.pdf`
5. Keep `personal.photoUrl`: `/resume/avatar.jpg` (replace `public/resume/avatar.jpg` to change photo)
6. See `.cursor/rules/resume-json-from-pdf.mdc` for PDF → JSON field mapping

After JSON-only updates, React changes are usually **not** needed. Verify:

```bash
pnpm dev    # open /career, test both locales + PDF generation
pnpm build
```

### i18n keys (Career UI)

Add/edit labels in `src/i18n/en.ts` and `src/i18n/ru.ts` under `career`:

- `downloadPdf` — generate button
- `generatingPdf`, `generatePdfError` — PDF loading/error
- `downloadLocalPdf` — rabota.by static PDF button
- Section labels: `skills`, `languages`, `education`, `about`, `workExperience`, etc.

### Key files

| File | Purpose |
|------|---------|
| `src/components/Content/Career/CareerPage.tsx` | Career UI + PDF buttons |
| `src/utils/generateResumePdf.ts` | PDF document builder + CDN pdfmake loader |
| `src/utils/resumeRegion.ts` | BY/RU work-permit check for local PDF button |
| `src/hooks/useResumeData.ts` | Locale resume fetch |
| `src/types/resume.ts` | Resume schema (`photoUrl`, `pdfUrl`, …) |
| `.cursor/rules/resume-json-from-pdf.mdc` | PDF → JSON sync rules |
| `.cursor/rules/career-cv-pdf.mdc` | PDF generator maintenance rules |

---

## Run & Verify

```bash
pnpm dev        # start dev server
pnpm build      # production build
```
