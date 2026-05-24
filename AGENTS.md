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

---

## Update Career Page (from PDF resume)

The Career page (`/career`) loads data from **`public/resume/resume.json`** via fetch.  
PDF source: **`public/resume/FM-resume.pdf`**

### Regenerate JSON from PDF

1. Read `public/resume/FM-resume.pdf`
2. Update `public/resume/resume.json` following the schema in `src/types/resume.ts`
3. Set `meta.updatedAt` from PDF footer date
4. See `.cursor/rules/resume-json-from-pdf.mdc` for full PDF → JSON mapping

### After JSON update

No React changes needed unless the schema changed. Verify:

```bash
pnpm dev    # open /career
pnpm build
```

### Key files

| File | Purpose |
|------|---------|
| `public/resume/resume.json` | Resume data (JSON "DB") |
| `public/resume/FM-resume.pdf` | Source PDF |
| `src/hooks/useResumeData.ts` | Fetches JSON at runtime |
| `src/types/resume.ts` | TypeScript types |
| `src/components/Content/Career/CareerPage.tsx` | UI (dynamic render) |

---

## Run & Verify

```bash
pnpm dev        # start dev server
pnpm build      # production build
```
