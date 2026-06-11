# Portfolio Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Aniruddh Zaveri's single-page portfolio website (dark teal×indigo theme, scroll-driven experience timeline with sticky year countdown, EN/DE toggle) and deploy it to GitHub Pages.

**Architecture:** Vite + React SPA at the repo root. All text/data lives in typed content files (`src/content/en.ts`, `src/content/de.ts`); components are purely presentational and read content via a tiny `LanguageContext`. Scroll animations use the Motion library (`motion/react`). Spec: `docs/superpowers/specs/2026-06-11-portfolio-homepage-design.md`.

**Tech Stack:** Vite, React 19, TypeScript (strict), Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui, Motion (`motion` package, the Framer Motion successor), lucide-react icons, Vitest + Testing Library, GitHub Actions → GitHub Pages.

**Conventions used throughout:**
- All commands run from the repo root `/Users/aniruddhzaveri/IdeaProjects/aniruddhzaveri`.
- Unknown personal info is written as `[PLACEHOLDER: …]` in content files — never invent facts.
- Commit after every task with the message given in the task.

## File structure (final)

```
.github/workflows/deploy.yml      — GitHub Pages deploy
index.html                        — title/meta
vite.config.ts                    — base path, plugins, alias, vitest config
src/
  main.tsx, App.tsx, index.css    — entry, assembly, theme tokens + keyframes
  test/setup.ts                   — jsdom mocks (IntersectionObserver, matchMedia)
  test/app.test.tsx               — EN/DE smoke tests
  lib/i18n.tsx                    — LanguageProvider + useT()
  lib/i18n.test.tsx               — i18n unit tests
  content/types.ts                — Content interface + entity types
  content/shared.ts               — links, photo path (not translated)
  content/en.ts, content/de.ts    — all text + data
  content/content.test.ts         — EN/DE structural parity test
  components/layout/Header.tsx, Footer.tsx, SectionShell.tsx, SocialLinks.tsx
  components/sections/Hero.tsx, About.tsx, SkillsMarquee.tsx,
    ExperienceTimeline.tsx, Projects.tsx, Teaching.tsx, Contact.tsx
  components/timeline/TimelineEntryCard.tsx
  components/ui/                  — shadcn (button, card, badge, separator)
public/profile.jpg                — copied from documents/newProfileCrop2.jpg
```

---

### Task 1: Scaffold Vite + React + TypeScript at repo root

**Files:**
- Create: Vite template files (`package.json`, `index.html`, `src/*`, `tsconfig*.json`, `vite.config.ts`)
- Modify: `.gitignore`, `index.html`, `src/App.tsx`
- Create: `public/profile.jpg`

- [ ] **Step 1: Scaffold into a temp dir and merge into root**

The repo root is non-empty (`docs/`, `documents/`), so scaffold into a temp dir and move the files:

```bash
npm create vite@latest tmp-scaffold -- --template react-ts
rsync -a --exclude .gitignore tmp-scaffold/ ./
rm -rf tmp-scaffold
npm install
```

(Our `.gitignore` already covers `node_modules/` and `dist/`.)

- [ ] **Step 2: Verify the scaffold builds**

Run: `npm run build`
Expected: `vite build` succeeds, `dist/` created.

- [ ] **Step 3: Remove template cruft, set title/meta, copy photo**

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
cp documents/newProfileCrop2.jpg public/profile.jpg
```

Replace `src/App.tsx` entirely with:

```tsx
export default function App() {
  return <main>Aniruddh Zaveri</main>
}
```

Replace `src/index.css` entirely with an empty file (Tailwind comes in Task 2).

In `index.html`, replace the `<title>` line and the vite.svg icon line inside `<head>` with:

```html
    <title>Aniruddh Zaveri — Software Engineer</title>
    <meta name="description" content="Portfolio of Aniruddh Zaveri — Software Engineer, Agile Coach and tutor at TUM, building TUMApply." />
```

- [ ] **Step 4: Verify build still passes**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React TypeScript app"
```

---

### Task 2: Tailwind CSS v4

**Files:**
- Modify: `vite.config.ts`, `src/index.css`, `src/App.tsx`

- [ ] **Step 1: Install**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Replace `vite.config.ts` entirely with:**

```ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: process.env.GHPAGES_BASE || "/",
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: Replace `src/index.css` entirely with:**

```css
@import "tailwindcss";
```

- [ ] **Step 4: Prove Tailwind works**

Replace `src/App.tsx` entirely with:

```tsx
export default function App() {
  return <main className="min-h-screen bg-slate-950 text-teal-400">Aniruddh Zaveri</main>
}
```

Run: `npm run dev` briefly (or `npm run build`), open the page — dark background, teal text.
Expected: Tailwind classes apply.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add Tailwind CSS v4"
```

---

### Task 3: Path alias + shadcn/ui

**Files:**
- Modify: `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`
- Create: `components.json`, `src/components/ui/*`, `src/lib/utils.ts` (generated)

- [ ] **Step 1: Add `@/*` alias to TypeScript**

In `tsconfig.json`, add to the top level (alongside `files`/`references`):

```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
```

In `tsconfig.app.json`, add inside the existing `compilerOptions`:

```json
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
```

- [ ] **Step 2: Add alias to Vite**

```bash
npm install -D @types/node
```

Replace `vite.config.ts` entirely with:

```ts
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: process.env.GHPAGES_BASE || "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
})
```

- [ ] **Step 3: Initialize shadcn/ui and add components**

```bash
npx shadcn@latest init -y -b slate
npx shadcn@latest add -y button card badge separator
```

Expected: `components.json`, `src/lib/utils.ts`, `src/components/ui/{button,card,badge,separator}.tsx` created; `src/index.css` rewritten with theme variables; `lucide-react` installed as dependency.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add path alias and shadcn/ui"
```

---

### Task 4: Theme tokens (teal × indigo dark) + animation keyframes

**Files:**
- Modify: `src/index.css` (full replace)

- [ ] **Step 1: Replace `src/index.css` entirely with:**

Note: keep the `@import "tw-animate-css";` line ONLY if shadcn init added it (check the current file first); the version below assumes it did.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/* Site is dark-only: dark palette lives directly in :root */
:root {
  --radius: 0.625rem;
  --background: #020617;
  --foreground: #f8fafc;
  --card: #0f172a;
  --card-foreground: #f1f5f9;
  --popover: #0f172a;
  --popover-foreground: #f1f5f9;
  --primary: #2dd4bf;
  --primary-foreground: #042f2e;
  --secondary: #1e293b;
  --secondary-foreground: #e2e8f0;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --accent: #134e4a;
  --accent-foreground: #ccfbf1;
  --destructive: #ef4444;
  --border: #1e293b;
  --input: #1e293b;
  --ring: #2dd4bf;
  --indigo: #818cf8;
}

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-indigo: var(--indigo);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--background);
  color: var(--foreground);
}

@utility animate-drift {
  animation: drift 24s ease-in-out infinite alternate;
}
@utility animate-drift-slow {
  animation: drift 36s ease-in-out infinite alternate-reverse;
}
@utility animate-float {
  animation: float 6s ease-in-out infinite;
}
@utility animate-marquee {
  animation: marquee 30s linear infinite;
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(80px, 40px) scale(1.15); }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: teal/indigo dark theme tokens and animation keyframes"
```

---

### Task 5: Motion + Vitest setup

**Files:**
- Modify: `package.json` (test script), `vite.config.ts`, `tsconfig.app.json`
- Create: `src/test/setup.ts`, `src/test/sanity.test.ts`

- [ ] **Step 1: Install**

```bash
npm install motion
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Replace `vite.config.ts` entirely with:**

```ts
/// <reference types="vitest/config" />
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  base: process.env.GHPAGES_BASE || "/",
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
})
```

- [ ] **Step 3: Create `src/test/setup.ts`:**

```ts
import "@testing-library/jest-dom/vitest"

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver

if (!window.matchMedia) {
  window.matchMedia = ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList) as typeof window.matchMedia
}

window.scrollTo = (() => {}) as typeof window.scrollTo
Element.prototype.scrollIntoView = () => {}

beforeEach(() => {
  localStorage.clear()
})
```

- [ ] **Step 4: Enable vitest globals types**

In `tsconfig.app.json` `compilerOptions`, add:

```json
    "types": ["vitest/globals"]
```

- [ ] **Step 5: Add test script**

In `package.json` `scripts`, add:

```json
    "test": "vitest"
```

- [ ] **Step 6: Write a sanity test — `src/test/sanity.test.ts`:**

```ts
test("vitest is wired up", () => {
  expect(1 + 1).toBe(2)
})
```

- [ ] **Step 7: Run tests**

Run: `npm test -- --run`
Expected: 1 test passes.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: add Motion, Vitest and Testing Library setup"
```

---

### Task 6: Content model + shared data + English content

**Files:**
- Create: `src/content/types.ts`, `src/content/shared.ts`, `src/content/en.ts`

- [ ] **Step 1: Create `src/content/types.ts`:**

```ts
export interface TimelineEntry {
  id: string
  year: number
  period: string
  title: string
  org: string
  location?: string
  description: string
  tags: string[]
  type: "work" | "education"
}

export interface Project {
  id: string
  name: string
  status: "ongoing" | "past"
  role: string
  description: string
  tags: string[]
  link: string
  flagship?: boolean
}

export interface Course {
  semester: string
  name: string
}

export interface Thesis {
  year: number
  title: string
  student: string
  status: "in-progress" | "finished"
}

export interface Content {
  nav: {
    home: string
    about: string
    experience: string
    projects: string
    teaching: string
    contact: string
  }
  hero: {
    eyebrow: string
    name: string
    tagline: string
    workProfileCta: string
    statusBadge: string
  }
  about: {
    heading: string
    body: string
    interestsHeading: string
    interests: string[]
    languagesHeading: string
    languages: { name: string; level: string }[]
  }
  skills: {
    heading: string
    items: string[]
  }
  experience: {
    heading: string
    sub: string
    typeLabels: { work: string; education: string }
    entries: TimelineEntry[]
  }
  projects: {
    heading: string
    sub: string
    statusLabels: { ongoing: string; past: string }
    items: Project[]
  }
  teaching: {
    heading: string
    coursesHeading: string
    courses: Course[]
    thesesHeading: string
    thesisStatusLabels: { "in-progress": string; finished: string }
    theses: Thesis[]
  }
  contact: {
    heading: string
    body: string
    emailCta: string
    builtWith: string
  }
}
```

- [ ] **Step 2: Create `src/content/shared.ts`:**

```ts
export const links = {
  workProfile: "https://aet.cit.tum.de/people/zaveri/",
  github: "[PLACEHOLDER: GitHub profile URL]",
  linkedin: "https://www.linkedin.com/in/aniruddh-zaveri-b7440b2a9/",
  instagram: "https://www.instagram.com/az1085/",
  email: "aniruddh.zaveri@tum.de",
} as const

export const photo = `${import.meta.env.BASE_URL}profile.jpg`
```

- [ ] **Step 3: Create `src/content/en.ts`:**

```ts
import type { Content } from "./types"

export const en: Content = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    teaching: "Teaching",
    contact: "Contact",
  },
  hero: {
    eyebrow: "Software Engineer · Agile Coach",
    name: "Aniruddh Zaveri",
    tagline:
      "I build TUMApply, teach software engineering at TUM, and care about LLMs, EdTech and data-driven systems.",
    workProfileCta: "Work Profile",
    statusBadge: "M.Sc. Information Systems @ TUM",
  },
  about: {
    heading: "About Me",
    body: "I'm an Information Systems student at TU München and a software engineer at the Applied Education Technologies research group. I lead the agile process behind TUMApply, supervise bachelor's theses and teach courses from Intro to Programming to DevOps. [PLACEHOLDER: 2-3 personal sentences — hobbies, what drives you, a fun fact]",
    interestsHeading: "Interests",
    interests: [
      "LLMs & AI applications",
      "Educational technology",
      "Data-driven systems",
      "Automotive industry",
      "Agile project management",
    ],
    languagesHeading: "Languages",
    languages: [
      { name: "German", level: "Native" },
      { name: "English", level: "Native" },
      { name: "Hindi", level: "Expert" },
      { name: "French", level: "Beginner" },
    ],
  },
  skills: {
    heading: "Tech I work with",
    items: [
      "Java",
      "TypeScript",
      "Angular",
      "React",
      "Python",
      "Docker",
      "SQL",
      "Spring",
      "AspectJ",
      "Git & GitHub",
      "Agile / Scrum",
      "Software Architecture",
    ],
  },
  experience: {
    heading: "Experience",
    sub: "My journey so far — newest first.",
    typeLabels: { work: "Work", education: "Education" },
    entries: [
      {
        id: "tum-pm",
        year: 2025,
        period: "Feb 2025 – Present",
        title: "Project Management & System Administration",
        org: "TU München · Applied Education Technologies",
        location: "Munich",
        description:
          "Digitalizing TUM's doctoral hiring process with TUMApply. Agile Coach for a team of 6 developers, server administration, hands-on development and supervision of bachelor's theses.",
        tags: ["Agile", "Java", "Angular", "Server Admin", "Mentoring"],
        type: "work",
      },
      {
        id: "msc",
        year: 2025,
        period: "2025 – 2027 (expected)",
        title: "M.Sc. Information Systems",
        org: "TU München",
        description:
          "Master's studies focusing on the intersection of software engineering, data and business.",
        tags: [],
        type: "education",
      },
      {
        id: "tum-tutor",
        year: 2024,
        period: "Feb 2024 – Feb 2025",
        title: "Tutor & Instructor",
        org: "TU München",
        description:
          "Tutor for Introduction to Software Engineering, Introduction to Programming, DevOps and Patterns in Software Engineering.",
        tags: ["Teaching", "Java", "DevOps"],
        type: "work",
      },
      {
        id: "bcg",
        year: 2022,
        period: "Mar 2022 – Feb 2024",
        title: "IT Working Student",
        org: "Boston Consulting Group",
        location: "Munich",
        description:
          "IT service management, process optimization, IT trainings and support, conference talks, programming and agile ways of working.",
        tags: ["ITSM", "Process Optimization", "Trainings"],
        type: "work",
      },
      {
        id: "ise",
        year: 2022,
        period: "Apr 2022 – Aug 2022",
        title: "Instructor — Introduction to Software Engineering",
        org: "TU München",
        description:
          "Lecture support, exercise creation, tutorial group coordination and exam assistance.",
        tags: ["Teaching"],
        type: "work",
      },
      {
        id: "bsc",
        year: 2020,
        period: "2020 – 2025",
        title: "B.Sc. Information Systems",
        org: "TU München",
        description:
          "Bachelor's thesis: Visualization of Test Case Errors — Enhancing Autograding Feedback (developed in Artemis).",
        tags: [],
        type: "education",
      },
      {
        id: "head-tutor",
        year: 2020,
        period: "Oct 2020 – Feb 2021",
        title: "Head Tutor — Introduction to Programming",
        org: "TU München",
        description:
          "Coordinated tutors and supported students in one of TUM's biggest programming courses.",
        tags: ["Teaching"],
        type: "work",
      },
      {
        id: "telis",
        year: 2020,
        period: "Aug 2020 – Dec 2020",
        title: "Consulting / Financial Analysis",
        org: "TELIS FINANZ AG",
        description: "[PLACEHOLDER: 1 sentence about your work at TELIS]",
        tags: ["Consulting"],
        type: "work",
      },
      {
        id: "bmw",
        year: 2017,
        period: "Sep 2017 – Oct 2017",
        title: "International Accounting Intern",
        org: "BMW Group",
        location: "Munich",
        description: "[PLACEHOLDER: 1 sentence about the BMW internship]",
        tags: ["Finance"],
        type: "work",
      },
    ],
  },
  projects: {
    heading: "Projects",
    sub: "Things I build, maintain and care about at the Applied Education Technologies group.",
    statusLabels: { ongoing: "Ongoing", past: "Past" },
    items: [
      {
        id: "tumapply",
        name: "TUMApply",
        status: "ongoing",
        flagship: true,
        role: "Agile Coach · SysAdmin · Developer",
        description:
          "An inclusive and efficient doctoral application portal for TUM. I lead the agile process for 6 developers, run the server infrastructure, contribute code and supervise bachelor's theses around the platform.",
        tags: ["Java", "Spring", "Angular", "Agile", "CI/CD"],
        link: "[PLACEHOLDER: TUMApply project link]",
      },
      {
        id: "artemis",
        name: "Artemis",
        status: "ongoing",
        role: "Reviewer · Contributor",
        description:
          "Interactive learning platform used by thousands of students. Developer during my bachelor's thesis, now contributing as reviewer and with occasional pull requests.",
        tags: ["Java", "Spring", "Angular"],
        link: "https://github.com/ls1intum/Artemis",
      },
      {
        id: "tumi",
        name: "TUMi Chatbot",
        status: "ongoing",
        role: "Quality Assurance",
        description: "Chatbot for TUM — I take care of quality assurance.",
        tags: ["LLM", "QA"],
        link: "[PLACEHOLDER: TUMi Chatbot project link]",
      },
      {
        id: "athena",
        name: "Athena",
        status: "past",
        role: "Developer",
        description:
          "AI-powered assessment system. I developed the programming exercise code quality assessment feature.",
        tags: ["Python", "LLM"],
        link: "[PLACEHOLDER: Athena project link]",
      },
      {
        id: "ares",
        name: "Ares",
        status: "past",
        role: "Developer",
        description:
          "Secure test execution for programming exercises, built with AspectJ and aspect-oriented programming.",
        tags: ["Java", "AspectJ"],
        link: "[PLACEHOLDER: Ares project link]",
      },
      {
        id: "harmonia",
        name: "Harmonia",
        status: "past",
        role: "Developer",
        description:
          "LLM-driven collaboration assessment and code quality feedback for team-based programming courses, developed as part of a team.",
        tags: ["LLM", "Python"],
        link: "[PLACEHOLDER: Harmonia project link]",
      },
    ],
  },
  teaching: {
    heading: "Teaching & Mentoring",
    coursesHeading: "Courses",
    courses: [
      { semester: "Summer 2026", name: "DevOps: Engineering for Deployment and Operations" },
      { semester: "Winter 2025/26", name: "Introduction to Programming" },
      { semester: "Winter 2025/26", name: "Patterns in Software Engineering" },
      { semester: "Winter 2025/26", name: "Practical Course: Interactive Learning" },
      { semester: "Summer 2025", name: "DevOps: Engineering for Deployment and Operations" },
      { semester: "Winter 2024/25", name: "Introduction to Programming" },
      { semester: "Winter 2023/24", name: "Introduction to Programming" },
      { semester: "Summer 2022", name: "Introduction to Software Engineering" },
    ],
    thesesHeading: "Supervised Theses",
    thesisStatusLabels: { "in-progress": "In progress", finished: "Finished" },
    theses: [
      {
        year: 2026,
        title: "Integrating AI Assistance in TUM's Doctoral Application Portal",
        student: "Catherine Kalra",
        status: "in-progress",
      },
      {
        year: 2026,
        title:
          "Integrating AI-Assisted Job Advertisement Creation and Compliance Checking in TUMApply",
        student: "Melissa Sioukri Oglou",
        status: "in-progress",
      },
      {
        year: 2026,
        title:
          "Enhancing Notifications and Profile Management in TUM's Doctoral Application Portal",
        student: "Celine Lahnor",
        status: "in-progress",
      },
      {
        year: 2025,
        title:
          "Development of an Appointment Scheduler for the TUM Doctoral Application Portal",
        student: "Abinaya Anita Sivaguru",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of Administrative Tools and Privacy Compliance for the TUM Doctoral Application Portal",
        student: "Sehmuel Wagner",
        status: "finished",
      },
      {
        year: 2025,
        title: "Improving Usability and Inclusivity in TUM's Doctoral Application Portal",
        student: "Kiara Pia Copony",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "A Modular Review and Notification System for the Doctoral Application Portal at TUM",
        student: "Moritz Schmidt",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of a User-Centric Application Management Module for the TUM Doctoral Portal",
        student: "Sarah Douglas",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of a Job Management Interface for an Inclusive and Efficient Doctoral Application Portal at TUM",
        student: "Ishani Budhwar",
        status: "finished",
      },
    ],
  },
  contact: {
    heading: "Let's connect",
    body: "Whether you're a recruiter, a student looking for a thesis, or just curious — my inbox is open.",
    emailCta: "Say hello",
    builtWith: "Built with React, Tailwind & Motion",
  },
}
```

- [ ] **Step 4: Verify it type-checks**

Run: `npx tsc -p tsconfig.app.json --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: content model, shared links and English content"
```

---

### Task 7: German content + structural parity test

**Files:**
- Create: `src/content/content.test.ts`, `src/content/de.ts`

- [ ] **Step 1: Write the failing test — `src/content/content.test.ts`:**

```ts
import { en } from "./en"
import { de } from "./de"

test("en and de content are structurally parallel", () => {
  expect(de.experience.entries.map((e) => e.id)).toEqual(
    en.experience.entries.map((e) => e.id),
  )
  expect(de.projects.items.map((p) => p.id)).toEqual(
    en.projects.items.map((p) => p.id),
  )
  expect(de.teaching.theses.length).toBe(en.teaching.theses.length)
  expect(de.teaching.courses.length).toBe(en.teaching.courses.length)
  expect(de.about.languages.length).toBe(en.about.languages.length)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/content/content.test.ts`
Expected: FAIL — cannot resolve `./de`.

- [ ] **Step 3: Create `src/content/de.ts`:**

Same structure as `en.ts` with German text. Non-translatable values (ids, years, periods, tags, links, names, course names where official titles are English) stay identical to `en.ts`.

```ts
import type { Content } from "./types"

export const de: Content = {
  nav: {
    home: "Start",
    about: "Über mich",
    experience: "Werdegang",
    projects: "Projekte",
    teaching: "Lehre",
    contact: "Kontakt",
  },
  hero: {
    eyebrow: "Software Engineer · Agile Coach",
    name: "Aniruddh Zaveri",
    tagline:
      "Ich baue TUMApply, unterrichte Software Engineering an der TUM und begeistere mich für LLMs, EdTech und datengetriebene Systeme.",
    workProfileCta: "Arbeitsprofil",
    statusBadge: "M.Sc. Wirtschaftsinformatik @ TUM",
  },
  about: {
    heading: "Über mich",
    body: "Ich studiere Wirtschaftsinformatik an der TU München und arbeite als Software Engineer in der Forschungsgruppe Applied Education Technologies. Ich leite den agilen Prozess hinter TUMApply, betreue Bachelorarbeiten und unterrichte Kurse von Einführung in die Programmierung bis DevOps. [PLACEHOLDER: 2-3 persönliche Sätze — Hobbys, Antrieb, Fun Fact]",
    interestsHeading: "Interessen",
    interests: [
      "LLMs & KI-Anwendungen",
      "Educational Technology",
      "Datengetriebene Systeme",
      "Automobilindustrie",
      "Agiles Projektmanagement",
    ],
    languagesHeading: "Sprachen",
    languages: [
      { name: "Deutsch", level: "Muttersprache" },
      { name: "Englisch", level: "Muttersprache" },
      { name: "Hindi", level: "Fließend" },
      { name: "Französisch", level: "Grundkenntnisse" },
    ],
  },
  skills: {
    heading: "Technologien",
    items: [
      "Java",
      "TypeScript",
      "Angular",
      "React",
      "Python",
      "Docker",
      "SQL",
      "Spring",
      "AspectJ",
      "Git & GitHub",
      "Agile / Scrum",
      "Softwarearchitektur",
    ],
  },
  experience: {
    heading: "Werdegang",
    sub: "Mein Weg bis heute — Neuestes zuerst.",
    typeLabels: { work: "Arbeit", education: "Ausbildung" },
    entries: [
      {
        id: "tum-pm",
        year: 2025,
        period: "Feb 2025 – heute",
        title: "Projektmanagement & Systemadministration",
        org: "TU München · Applied Education Technologies",
        location: "München",
        description:
          "Digitalisierung des Promotions-Bewerbungsprozesses der TUM mit TUMApply. Agile Coach für ein Team von 6 Entwicklern, Serveradministration, Entwicklung und Betreuung von Bachelorarbeiten.",
        tags: ["Agile", "Java", "Angular", "Server Admin", "Mentoring"],
        type: "work",
      },
      {
        id: "msc",
        year: 2025,
        period: "2025 – 2027 (voraussichtlich)",
        title: "M.Sc. Wirtschaftsinformatik",
        org: "TU München",
        description:
          "Masterstudium an der Schnittstelle von Software Engineering, Daten und Wirtschaft.",
        tags: [],
        type: "education",
      },
      {
        id: "tum-tutor",
        year: 2024,
        period: "Feb 2024 – Feb 2025",
        title: "Tutor & Instructor",
        org: "TU München",
        description:
          "Tutor für Einführung in die Softwaretechnik, Einführung in die Programmierung, DevOps und Patterns in Software Engineering.",
        tags: ["Lehre", "Java", "DevOps"],
        type: "work",
      },
      {
        id: "bcg",
        year: 2022,
        period: "Mär 2022 – Feb 2024",
        title: "IT Werkstudent",
        org: "Boston Consulting Group",
        location: "München",
        description:
          "IT-Service-Management, Prozessoptimierung, IT-Trainings und Support, Konferenzvorträge, Programmierung und agile Arbeitsmethoden.",
        tags: ["ITSM", "Prozessoptimierung", "Trainings"],
        type: "work",
      },
      {
        id: "ise",
        year: 2022,
        period: "Apr 2022 – Aug 2022",
        title: "Instructor — Einführung in die Softwaretechnik",
        org: "TU München",
        description:
          "Vorlesungsbetreuung, Erstellung von Übungen, Koordination der Tutorien und Klausurunterstützung.",
        tags: ["Lehre"],
        type: "work",
      },
      {
        id: "bsc",
        year: 2020,
        period: "2020 – 2025",
        title: "B.Sc. Wirtschaftsinformatik",
        org: "TU München",
        description:
          "Bachelorarbeit: Visualization of Test Case Errors — Enhancing Autograding Feedback (entwickelt in Artemis).",
        tags: [],
        type: "education",
      },
      {
        id: "head-tutor",
        year: 2020,
        period: "Okt 2020 – Feb 2021",
        title: "Head Tutor — Einführung in die Programmierung",
        org: "TU München",
        description:
          "Koordination der Tutoren und Unterstützung der Studierenden in einem der größten Programmierkurse der TUM.",
        tags: ["Lehre"],
        type: "work",
      },
      {
        id: "telis",
        year: 2020,
        period: "Aug 2020 – Dez 2020",
        title: "Beratung / Finanzanalyse",
        org: "TELIS FINANZ AG",
        description: "[PLACEHOLDER: 1 Satz zu deiner Tätigkeit bei TELIS]",
        tags: ["Beratung"],
        type: "work",
      },
      {
        id: "bmw",
        year: 2017,
        period: "Sep 2017 – Okt 2017",
        title: "Praktikant International Accounting",
        org: "BMW Group",
        location: "München",
        description: "[PLACEHOLDER: 1 Satz zum BMW-Praktikum]",
        tags: ["Finanzen"],
        type: "work",
      },
    ],
  },
  projects: {
    heading: "Projekte",
    sub: "Woran ich in der Forschungsgruppe Applied Education Technologies baue und mitwirke.",
    statusLabels: { ongoing: "Laufend", past: "Abgeschlossen" },
    items: [
      {
        id: "tumapply",
        name: "TUMApply",
        status: "ongoing",
        flagship: true,
        role: "Agile Coach · SysAdmin · Entwickler",
        description:
          "Ein inklusives und effizientes Bewerbungsportal für Promotionsstellen an der TUM. Ich leite den agilen Prozess für 6 Entwickler, betreibe die Serverinfrastruktur, entwickle mit und betreue Bachelorarbeiten rund um die Plattform.",
        tags: ["Java", "Spring", "Angular", "Agile", "CI/CD"],
        link: "[PLACEHOLDER: TUMApply project link]",
      },
      {
        id: "artemis",
        name: "Artemis",
        status: "ongoing",
        role: "Reviewer · Contributor",
        description:
          "Interaktive Lernplattform mit tausenden Studierenden. Entwickler während meiner Bachelorarbeit, heute Reviewer mit gelegentlichen Pull Requests.",
        tags: ["Java", "Spring", "Angular"],
        link: "https://github.com/ls1intum/Artemis",
      },
      {
        id: "tumi",
        name: "TUMi Chatbot",
        status: "ongoing",
        role: "Qualitätssicherung",
        description: "Chatbot für die TUM — ich verantworte die Qualitätssicherung.",
        tags: ["LLM", "QA"],
        link: "[PLACEHOLDER: TUMi Chatbot project link]",
      },
      {
        id: "athena",
        name: "Athena",
        status: "past",
        role: "Entwickler",
        description:
          "KI-gestütztes Bewertungssystem. Ich habe das Code-Quality-Assessment für Programmieraufgaben entwickelt.",
        tags: ["Python", "LLM"],
        link: "[PLACEHOLDER: Athena project link]",
      },
      {
        id: "ares",
        name: "Ares",
        status: "past",
        role: "Entwickler",
        description:
          "Sichere Testausführung für Programmieraufgaben, umgesetzt mit AspectJ und aspektorientierter Programmierung.",
        tags: ["Java", "AspectJ"],
        link: "[PLACEHOLDER: Ares project link]",
      },
      {
        id: "harmonia",
        name: "Harmonia",
        status: "past",
        role: "Entwickler",
        description:
          "LLM-gestützte Bewertung von Zusammenarbeit und Codequalität für teambasierte Programmierkurse, im Team entwickelt.",
        tags: ["LLM", "Python"],
        link: "[PLACEHOLDER: Harmonia project link]",
      },
    ],
  },
  teaching: {
    heading: "Lehre & Mentoring",
    coursesHeading: "Kurse",
    courses: [
      { semester: "Sommer 2026", name: "DevOps: Engineering for Deployment and Operations" },
      { semester: "Winter 2025/26", name: "Einführung in die Programmierung" },
      { semester: "Winter 2025/26", name: "Patterns in Software Engineering" },
      { semester: "Winter 2025/26", name: "Praktikum: Interactive Learning" },
      { semester: "Sommer 2025", name: "DevOps: Engineering for Deployment and Operations" },
      { semester: "Winter 2024/25", name: "Einführung in die Programmierung" },
      { semester: "Winter 2023/24", name: "Einführung in die Programmierung" },
      { semester: "Sommer 2022", name: "Einführung in die Softwaretechnik" },
    ],
    thesesHeading: "Betreute Abschlussarbeiten",
    thesisStatusLabels: { "in-progress": "Laufend", finished: "Abgeschlossen" },
    theses: [
      {
        year: 2026,
        title: "Integrating AI Assistance in TUM's Doctoral Application Portal",
        student: "Catherine Kalra",
        status: "in-progress",
      },
      {
        year: 2026,
        title:
          "Integrating AI-Assisted Job Advertisement Creation and Compliance Checking in TUMApply",
        student: "Melissa Sioukri Oglou",
        status: "in-progress",
      },
      {
        year: 2026,
        title:
          "Enhancing Notifications and Profile Management in TUM's Doctoral Application Portal",
        student: "Celine Lahnor",
        status: "in-progress",
      },
      {
        year: 2025,
        title:
          "Development of an Appointment Scheduler for the TUM Doctoral Application Portal",
        student: "Abinaya Anita Sivaguru",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of Administrative Tools and Privacy Compliance for the TUM Doctoral Application Portal",
        student: "Sehmuel Wagner",
        status: "finished",
      },
      {
        year: 2025,
        title: "Improving Usability and Inclusivity in TUM's Doctoral Application Portal",
        student: "Kiara Pia Copony",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "A Modular Review and Notification System for the Doctoral Application Portal at TUM",
        student: "Moritz Schmidt",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of a User-Centric Application Management Module for the TUM Doctoral Portal",
        student: "Sarah Douglas",
        status: "finished",
      },
      {
        year: 2025,
        title:
          "Development of a Job Management Interface for an Inclusive and Efficient Doctoral Application Portal at TUM",
        student: "Ishani Budhwar",
        status: "finished",
      },
    ],
  },
  contact: {
    heading: "Lass uns connecten",
    body: "Ob Recruiter, Studierende auf Themensuche für eine Abschlussarbeit oder einfach neugierig — meine Inbox ist offen.",
    emailCta: "Schreib mir",
    builtWith: "Gebaut mit React, Tailwind & Motion",
  },
}
```

(Thesis titles stay in English — they are official titles. Course names are translated where the official German course name exists.)

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/content/content.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content/
git commit -m "feat: German content with EN/DE parity test"
```

---

### Task 8: i18n context

**Files:**
- Create: `src/lib/i18n.test.tsx`, `src/lib/i18n.tsx`

- [ ] **Step 1: Write the failing tests — `src/lib/i18n.test.tsx`:**

```tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { LanguageProvider, useT } from "./i18n"

function Probe() {
  const { t, lang, setLang } = useT()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="heading">{t.about.heading}</span>
      <button onClick={() => setLang("de")}>switch</button>
    </div>
  )
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  )
}

test("defaults to English", () => {
  renderProbe()
  expect(screen.getByTestId("lang")).toHaveTextContent("en")
  expect(screen.getByTestId("heading")).toHaveTextContent("About Me")
})

test("switches to German", () => {
  renderProbe()
  fireEvent.click(screen.getByText("switch"))
  expect(screen.getByTestId("heading")).toHaveTextContent("Über mich")
})

test("persists language choice to localStorage", () => {
  renderProbe()
  fireEvent.click(screen.getByText("switch"))
  expect(localStorage.getItem("lang")).toBe("de")
})

test("reads initial language from localStorage", () => {
  localStorage.setItem("lang", "de")
  renderProbe()
  expect(screen.getByTestId("lang")).toHaveTextContent("de")
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run src/lib/i18n.test.tsx`
Expected: FAIL — cannot resolve `./i18n`.

- [ ] **Step 3: Create `src/lib/i18n.tsx`:**

```tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { en } from "@/content/en"
import { de } from "@/content/de"
import type { Content } from "@/content/types"

export type Lang = "en" | "de"

const dict: Record<Lang, Content> = { en, de }

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Content
}

const LanguageContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang")
    return stored === "de" || stored === "en" ? stored : "en"
  })

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useT(): LangContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useT must be used within LanguageProvider")
  return ctx
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run src/lib/i18n.test.tsx`
Expected: 4 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/
git commit -m "feat: language context with localStorage persistence"
```

---

### Task 9: Layout components (SectionShell, SocialLinks, Header, Footer)

**Files:**
- Create: `src/components/layout/SectionShell.tsx`, `src/components/layout/SocialLinks.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Test: `src/components/layout/Header.test.tsx`

- [ ] **Step 1: Write the failing test — `src/components/layout/Header.test.tsx`:**

```tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Header } from "./Header"

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>,
  )
}

test("renders all nav links in English", () => {
  renderHeader()
  for (const label of ["Home", "About", "Experience", "Projects", "Teaching", "Contact"]) {
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument()
  }
})

test("language toggle switches nav labels to German", () => {
  renderHeader()
  fireEvent.click(screen.getByRole("button", { name: "de" }))
  expect(screen.getByRole("link", { name: "Über mich" })).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/layout/Header.test.tsx`
Expected: FAIL — cannot resolve `./Header`.

- [ ] **Step 3: Create `src/components/layout/SectionShell.tsx`:**

```tsx
import { motion } from "motion/react"
import type { ReactNode } from "react"

interface SectionShellProps {
  id: string
  heading: string
  sub?: string
  children: ReactNode
}

export function SectionShell({ id, heading, sub, children }: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>
          {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
          <div className="mt-12">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create `src/components/layout/SocialLinks.tsx`:**

```tsx
import { Github, Instagram, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { links } from "@/content/shared"

const socials = [
  { href: links.github, icon: Github, label: "GitHub" },
  { href: links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: links.instagram, icon: Instagram, label: "Instagram" },
  { href: `mailto:${links.email}`, icon: Mail, label: "Email" },
]

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socials.map(({ href, icon: Icon, label }) => (
        <Button
          key={label}
          asChild
          variant="outline"
          size="icon"
          className="rounded-full border-border/60 bg-card/40 hover:border-teal-700 hover:text-primary"
        >
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon />
          </a>
        </Button>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Create `src/components/layout/Header.tsx`:**

```tsx
import { useEffect, useState } from "react"
import { useT, type Lang } from "@/lib/i18n"

const sectionIds = ["home", "about", "experience", "projects", "teaching", "contact"] as const

export function Header() {
  const { t, lang, setLang } = useT()
  const [active, setActive] = useState<string>("home")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const labels: Record<(typeof sectionIds)[number], string> = {
    home: t.nav.home,
    about: t.nav.about,
    experience: t.nav.experience,
    projects: t.nav.projects,
    teaching: t.nav.teaching,
    contact: t.nav.contact,
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="text-lg font-black tracking-tight">
          A<span className="text-primary">Z</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm transition-colors ${
                active === id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {labels[id]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 rounded-full border border-border p-1 text-xs">
          {(["en", "de"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-2 py-0.5 uppercase transition-colors ${
                lang === l
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
```

(Mobile: nav links are hidden below `md`; logo + language toggle remain. The page is a single scroll, so mobile users navigate by scrolling — no hamburger menu by design/YAGNI.)

- [ ] **Step 6: Create `src/components/layout/Footer.tsx`:**

```tsx
import { useT } from "@/lib/i18n"

export function Footer() {
  const { t } = useT()
  return (
    <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
      © 2026 Aniruddh Zaveri · {t.contact.builtWith}
    </footer>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm test -- --run src/components/layout/Header.test.tsx`
Expected: 2 tests PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/layout/
git commit -m "feat: header with section tracking and language toggle, footer, section shell"
```

---

### Task 10: Hero section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Test: `src/components/sections/Hero.test.tsx`

- [ ] **Step 1: Write the failing test — `src/components/sections/Hero.test.tsx`:**

```tsx
import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Hero } from "./Hero"

test("renders name, work profile link and portrait", () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  )
  expect(screen.getByRole("heading", { name: "Aniruddh Zaveri" })).toBeInTheDocument()
  const workLink = screen.getByRole("link", { name: /Work Profile/ })
  expect(workLink).toHaveAttribute("href", "https://aet.cit.tum.de/people/zaveri/")
  expect(screen.getByAltText("Portrait of Aniruddh Zaveri")).toBeInTheDocument()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/sections/Hero.test.tsx`
Expected: FAIL — cannot resolve `./Hero`.

- [ ] **Step 3: Create `src/components/sections/Hero.tsx`:**

```tsx
import { motion } from "motion/react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SocialLinks } from "@/components/layout/SocialLinks"
import { useT } from "@/lib/i18n"
import { links, photo } from "@/content/shared"

export function Hero() {
  const { t } = useT()
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="animate-drift absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="animate-drift-slow absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.3em] text-primary uppercase">{t.hero.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">{t.hero.name}</h1>
          <Badge variant="outline" className="mt-4 border-indigo-800 text-indigo-300">
            {t.hero.statusBadge}
          </Badge>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.hero.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:opacity-90"
            >
              <a href={links.workProfile} target="_blank" rel="noreferrer">
                {t.hero.workProfileCta} <ExternalLink />
              </a>
            </Button>
            <SocialLinks />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="justify-self-center"
        >
          <div className="animate-float rounded-3xl bg-gradient-to-br from-teal-400 via-teal-500 to-indigo-500 p-[3px] shadow-[0_0_60px_-15px_#2dd4bf]">
            <img
              src={photo}
              alt="Portrait of Aniruddh Zaveri"
              className="h-72 w-60 rounded-[calc(1.5rem-3px)] object-cover md:h-96 md:w-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/components/sections/Hero.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/
git commit -m "feat: hero section with animated glow background and framed portrait"
```

---

### Task 11: About section + Skills marquee

**Files:**
- Create: `src/components/sections/About.tsx`, `src/components/sections/SkillsMarquee.tsx`
- Test: `src/components/sections/About.test.tsx`

- [ ] **Step 1: Write the failing test — `src/components/sections/About.test.tsx`:**

```tsx
import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { About } from "./About"
import { SkillsMarquee } from "./SkillsMarquee"

test("renders about heading, languages and interests", () => {
  render(
    <LanguageProvider>
      <About />
    </LanguageProvider>,
  )
  expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument()
  expect(screen.getByText("German")).toBeInTheDocument()
  expect(screen.getByText("Educational technology")).toBeInTheDocument()
})

test("marquee renders each skill twice for seamless looping", () => {
  render(
    <LanguageProvider>
      <SkillsMarquee />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Java")).toHaveLength(2)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/sections/About.test.tsx`
Expected: FAIL — cannot resolve `./About`.

- [ ] **Step 3: Create `src/components/sections/About.tsx`:**

```tsx
import { Badge } from "@/components/ui/badge"
import { SectionShell } from "@/components/layout/SectionShell"
import { useT } from "@/lib/i18n"

export function About() {
  const { t } = useT()
  return (
    <SectionShell id="about" heading={t.about.heading}>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <p className="text-lg leading-relaxed text-muted-foreground">{t.about.body}</p>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm tracking-widest text-primary uppercase">
              {t.about.interestsHeading}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.about.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm tracking-widest text-primary uppercase">
              {t.about.languagesHeading}
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {t.about.languages.map((language) => (
                <li key={language.name} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="text-foreground">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Create `src/components/sections/SkillsMarquee.tsx`:**

```tsx
import { useT } from "@/lib/i18n"

export function SkillsMarquee() {
  const { t } = useT()
  const items = [...t.skills.items, ...t.skills.items]
  return (
    <div
      aria-label={t.skills.heading}
      className="relative overflow-hidden border-y border-border/40 bg-card/30 py-4"
    >
      <div className="animate-marquee flex w-max items-center gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm whitespace-nowrap text-muted-foreground"
          >
            <span>{item}</span>
            <span aria-hidden className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- --run src/components/sections/About.test.tsx`
Expected: 2 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/
git commit -m "feat: about section and skills marquee"
```

---

### Task 12: Experience timeline (scroll-driven line + sticky year)

**Files:**
- Create: `src/components/timeline/TimelineEntryCard.tsx`, `src/components/sections/ExperienceTimeline.tsx`
- Test: `src/components/sections/ExperienceTimeline.test.tsx`

How it works:
- `useScroll` (Motion) tracks progress through the timeline container; a spring-smoothed value drives `scaleY` of a gradient line (origin top) over a dim base line, plus the `top` position of a glowing dot.
- Each entry card reports via `useInView` (margin `-45% 0px -45% 0px` ≈ viewport center) when it is the "current" entry; the sticky year number animates to that entry's year.
- Work entries are teal-accented, education entries indigo-accented (per spec).

- [ ] **Step 1: Write the failing test — `src/components/sections/ExperienceTimeline.test.tsx`:**

```tsx
import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { ExperienceTimeline } from "./ExperienceTimeline"

test("renders all timeline entries newest first", () => {
  render(
    <LanguageProvider>
      <ExperienceTimeline />
    </LanguageProvider>,
  )
  expect(
    screen.getByText("Project Management & System Administration"),
  ).toBeInTheDocument()
  expect(screen.getByText("International Accounting Intern")).toBeInTheDocument()
  const articles = screen.getAllByRole("article")
  expect(articles).toHaveLength(9)
})

test("education entries carry the education badge", () => {
  render(
    <LanguageProvider>
      <ExperienceTimeline />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Education")).toHaveLength(2)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/sections/ExperienceTimeline.test.tsx`
Expected: FAIL — cannot resolve `./ExperienceTimeline`.

- [ ] **Step 3: Create `src/components/timeline/TimelineEntryCard.tsx`:**

```tsx
import { useEffect, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Badge } from "@/components/ui/badge"
import type { TimelineEntry } from "@/content/types"

interface TimelineEntryCardProps {
  entry: TimelineEntry
  typeLabels: { work: string; education: string }
  onActive: () => void
}

export function TimelineEntryCard({ entry, typeLabels, onActive }: TimelineEntryCardProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" })

  useEffect(() => {
    if (isInView) onActive()
  }, [isInView, onActive])

  const isWork = entry.type === "work"
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border bg-card/60 p-5 backdrop-blur ${
        isWork ? "border-teal-900/60" : "border-indigo-900/60"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-medium ${isWork ? "text-primary" : "text-indigo"}`}>
          {entry.period}
        </span>
        <Badge
          variant="outline"
          className={isWork ? "border-teal-800 text-teal-300" : "border-indigo-800 text-indigo-300"}
        >
          {isWork ? typeLabels.work : typeLabels.education}
        </Badge>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{entry.title}</h3>
      <p className="text-sm text-muted-foreground">
        {entry.org}
        {entry.location ? ` · ${entry.location}` : ""}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
      {entry.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </motion.article>
  )
}
```

- [ ] **Step 4: Create `src/components/sections/ExperienceTimeline.tsx`:**

```tsx
import { useCallback, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { SectionShell } from "@/components/layout/SectionShell"
import { TimelineEntryCard } from "@/components/timeline/TimelineEntryCard"
import { useT } from "@/lib/i18n"

export function ExperienceTimeline() {
  const { t } = useT()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.5"],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  const dotTop = useTransform(lineProgress, (v) => `calc(${v * 100}% - 6px)`)

  const entries = t.experience.entries
  const handleActive = useCallback((i: number) => setActiveIdx(i), [])

  return (
    <SectionShell id="experience" heading={t.experience.heading} sub={t.experience.sub}>
      <div ref={containerRef} className="relative flex gap-6 md:gap-10">
        <div className="hidden w-24 shrink-0 sm:block md:w-32">
          <div className="sticky top-1/3">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={entries[activeIdx].year}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="text-5xl font-black text-primary tabular-nums md:text-6xl"
              >
                {entries[activeIdx].year}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative w-px shrink-0">
          <div className="absolute inset-0 w-px bg-border" />
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute inset-0 w-px origin-top bg-gradient-to-b from-teal-400 to-indigo-400"
          />
          <motion.div
            style={{ top: dotTop }}
            className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-teal-300 shadow-[0_0_16px_#2dd4bf]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-8 pb-8">
          {entries.map((entry, i) => (
            <TimelineEntryCard
              key={entry.id}
              entry={entry}
              typeLabels={t.experience.typeLabels}
              onActive={() => handleActive(i)}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- --run src/components/sections/ExperienceTimeline.test.tsx`
Expected: 2 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: scroll-driven experience timeline with sticky year countdown"
```

---

### Task 13: Projects section

**Files:**
- Create: `src/components/sections/Projects.tsx`
- Test: `src/components/sections/Projects.test.tsx`

- [ ] **Step 1: Write the failing test — `src/components/sections/Projects.test.tsx`:**

```tsx
import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Projects } from "./Projects"

test("renders all six projects with status badges", () => {
  render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
  for (const name of ["TUMApply", "Artemis", "TUMi Chatbot", "Athena", "Ares", "Harmonia"]) {
    expect(screen.getByText(name)).toBeInTheDocument()
  }
  expect(screen.getAllByText("Ongoing")).toHaveLength(3)
  expect(screen.getAllByText("Past")).toHaveLength(3)
})

test("projects with real links render as anchors", () => {
  render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
  expect(screen.getByRole("link", { name: /Artemis/ })).toHaveAttribute(
    "href",
    "https://github.com/ls1intum/Artemis",
  )
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/sections/Projects.test.tsx`
Expected: FAIL — cannot resolve `./Projects`.

- [ ] **Step 3: Create `src/components/sections/Projects.tsx`:**

Placeholder links (strings not starting with `http`) render as a `div` instead of an anchor, so no broken links ship.

```tsx
import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { SectionShell } from "@/components/layout/SectionShell"
import { useT } from "@/lib/i18n"
import type { Project } from "@/content/types"

function ProjectCard({ project, statusLabel }: { project: Project; statusLabel: string }) {
  const hasLink = project.link.startsWith("http")
  const className = `group block rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-teal-700 ${
    project.flagship
      ? "bg-gradient-to-br from-teal-950/40 to-indigo-950/30 md:col-span-2"
      : ""
  }`

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xl font-semibold group-hover:text-primary">{project.name}</h3>
        <Badge
          className={
            project.status === "ongoing"
              ? "bg-teal-500/15 text-teal-300"
              : "bg-indigo-500/15 text-indigo-300"
          }
        >
          {statusLabel}
        </Badge>
      </div>
      <p className="mt-1 text-xs tracking-wider text-primary uppercase">{project.role}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </>
  )

  return (
    <motion.div whileHover={{ y: -4 }} className={project.flagship ? "md:col-span-2" : ""}>
      {hasLink ? (
        <a href={project.link} target="_blank" rel="noreferrer" className={className}>
          {body}
        </a>
      ) : (
        <div className={className}>{body}</div>
      )}
    </motion.div>
  )
}

export function Projects() {
  const { t } = useT()
  return (
    <SectionShell id="projects" heading={t.projects.heading} sub={t.projects.sub}>
      <div className="grid gap-6 md:grid-cols-2">
        {t.projects.items.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            statusLabel={t.projects.statusLabels[project.status]}
          />
        ))}
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run src/components/sections/Projects.test.tsx`
Expected: 2 tests PASS.

- [ ] **Step 5: Try to fill placeholder project links**

Fetch https://aet.cit.tum.de/people/zaveri/ (WebFetch or `curl -s`) and extract the project page URLs for TUMApply, TUMi Chatbot, Athena, Ares and Harmonia. If found, replace the corresponding `[PLACEHOLDER: … link]` values in BOTH `src/content/en.ts` and `src/content/de.ts`. If the page is unreachable, leave the placeholders — do not invent URLs.

Run: `npm test -- --run` (content parity test still passes)

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ src/content/
git commit -m "feat: projects section with flagship TUMApply card"
```

---

### Task 14: Teaching & Mentoring section

**Files:**
- Create: `src/components/sections/Teaching.tsx`
- Test: `src/components/sections/Teaching.test.tsx`

- [ ] **Step 1: Write the failing test — `src/components/sections/Teaching.test.tsx`:**

```tsx
import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Teaching } from "./Teaching"

test("renders courses and supervised theses", () => {
  render(
    <LanguageProvider>
      <Teaching />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Introduction to Programming")).toHaveLength(3)
  expect(screen.getByText(/Catherine Kalra/)).toBeInTheDocument()
  expect(screen.getAllByText("Finished")).toHaveLength(6)
  expect(screen.getAllByText("In progress")).toHaveLength(3)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/sections/Teaching.test.tsx`
Expected: FAIL — cannot resolve `./Teaching`.

- [ ] **Step 3: Create `src/components/sections/Teaching.tsx`:**

```tsx
import { Badge } from "@/components/ui/badge"
import { SectionShell } from "@/components/layout/SectionShell"
import { useT } from "@/lib/i18n"

export function Teaching() {
  const { t } = useT()
  return (
    <SectionShell id="teaching" heading={t.teaching.heading}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h3 className="text-sm tracking-widest text-primary uppercase">
            {t.teaching.coursesHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.teaching.courses.map((course, i) => (
              <li
                key={`${course.semester}-${i}`}
                className="flex items-baseline gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3"
              >
                <span className="w-28 shrink-0 text-xs text-muted-foreground">
                  {course.semester}
                </span>
                <span className="text-sm">{course.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm tracking-widest text-primary uppercase">
            {t.teaching.thesesHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {t.teaching.theses.map((thesis) => (
              <li
                key={thesis.title}
                className="rounded-lg border border-border/60 bg-card/40 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-muted-foreground">
                    {thesis.year} · {thesis.student}
                  </span>
                  <Badge
                    variant="outline"
                    className={
                      thesis.status === "finished"
                        ? "border-teal-800 text-teal-300"
                        : "border-indigo-800 text-indigo-300"
                    }
                  >
                    {t.teaching.thesisStatusLabels[thesis.status]}
                  </Badge>
                </div>
                <p className="mt-1 text-sm">{thesis.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- --run src/components/sections/Teaching.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/
git commit -m "feat: teaching and mentoring section with courses and theses"
```

---

### Task 15: Contact section + app assembly + full smoke tests

**Files:**
- Create: `src/components/sections/Contact.tsx`, `src/test/app.test.tsx`
- Modify: `src/App.tsx`, `src/main.tsx`
- Delete: `src/test/sanity.test.ts`

- [ ] **Step 1: Write the failing tests — `src/test/app.test.tsx`:**

```tsx
import { render, screen, fireEvent } from "@testing-library/react"
import App from "@/App"

test("renders all sections in English", () => {
  render(<App />)
  expect(screen.getByRole("heading", { name: "Aniruddh Zaveri" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Teaching & Mentoring" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Let's connect" })).toBeInTheDocument()
})

test("switches the whole page to German", () => {
  render(<App />)
  fireEvent.click(screen.getByRole("button", { name: "de" }))
  expect(screen.getByRole("heading", { name: "Über mich" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Werdegang" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Lehre & Mentoring" })).toBeInTheDocument()
})

test("contact email link points to TUM address", () => {
  render(<App />)
  expect(screen.getByRole("link", { name: /Say hello/ })).toHaveAttribute(
    "href",
    "mailto:aniruddh.zaveri@tum.de",
  )
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- --run src/test/app.test.tsx`
Expected: FAIL — `Contact` does not exist yet / App still renders the Task 2 placeholder.

- [ ] **Step 3: Create `src/components/sections/Contact.tsx`:**

```tsx
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionShell } from "@/components/layout/SectionShell"
import { SocialLinks } from "@/components/layout/SocialLinks"
import { useT } from "@/lib/i18n"
import { links } from "@/content/shared"

export function Contact() {
  const { t } = useT()
  return (
    <SectionShell id="contact" heading={t.contact.heading}>
      <div className="rounded-2xl border border-border bg-gradient-to-br from-teal-950/40 via-card to-indigo-950/30 p-10 text-center">
        <p className="mx-auto max-w-xl text-muted-foreground">{t.contact.body}</p>
        <Button
          asChild
          size="lg"
          className="mt-6 bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:opacity-90"
        >
          <a href={`mailto:${links.email}`}>
            {t.contact.emailCta} <Mail />
          </a>
        </Button>
        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </SectionShell>
  )
}
```

- [ ] **Step 4: Replace `src/App.tsx` entirely with:**

```tsx
import { MotionConfig } from "motion/react"
import { LanguageProvider } from "@/lib/i18n"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { SkillsMarquee } from "@/components/sections/SkillsMarquee"
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline"
import { Projects } from "@/components/sections/Projects"
import { Teaching } from "@/components/sections/Teaching"
import { Contact } from "@/components/sections/Contact"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Header />
        <main>
          <Hero />
          <About />
          <SkillsMarquee />
          <ExperienceTimeline />
          <Projects />
          <Teaching />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionConfig>
  )
}
```

(`MotionConfig reducedMotion="user"` disables Motion animations for users with `prefers-reduced-motion`; the CSS clamp in `index.css` covers the keyframe animations.)

- [ ] **Step 5: Verify `src/main.tsx` imports `./index.css`** (Vite template default — no change expected):

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Delete the sanity test**

```bash
rm src/test/sanity.test.ts
```

- [ ] **Step 7: Run the full suite and build**

Run: `npm test -- --run && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: contact section and full page assembly"
```

---

### Task 16: GitHub Actions deploy to GitHub Pages

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`:**

The `GHPAGES_BASE` expression makes the build work for BOTH repo names: as user site `aniruddhzaveri.github.io` (base `/`) or as project page `aniruddhzaveri` (base `/aniruddhzaveri/`).

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
        env:
          GHPAGES_BASE: ${{ github.event.repository.name == format('{0}.github.io', github.repository_owner) && '/' || format('/{0}/', github.event.repository.name) }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Verify the production build locally with a project-page base**

Run: `GHPAGES_BASE=/aniruddhzaveri/ npm run build && GHPAGES_BASE=/aniruddhzaveri/ npx vite preview`
Expected: build succeeds; open the preview URL + `/aniruddhzaveri/` — page loads, photo visible (this validates `import.meta.env.BASE_URL` usage for the photo).

- [ ] **Step 3: Commit**

```bash
git add .github/
git commit -m "ci: deploy to GitHub Pages on push to main"
```

- [ ] **Step 4: STOP — user actions required (do not do these yourself):**

Tell the user:
1. Create the GitHub repo and push (`git remote add origin … && git push -u origin main`) — pushing is the user's call.
2. In repo Settings → Pages, set Source to "GitHub Actions".
3. Optional: rename the repo to `aniruddhzaveri.github.io` for the clean URL — the workflow adapts automatically.

---

### Task 17: Manual browser verification (REQUIRED before claiming done)

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Verify in a real browser (use the superpowers verification approach or Playwright MCP if available):**

Golden path:
- Hero shows name, eyebrow, status badge, photo in gradient frame; glow blobs drift.
- "Work Profile" opens https://aet.cit.tum.de/people/zaveri/ in a new tab; all 4 social icons have correct hrefs.
- Header nav scrolls smoothly to each section; active link highlights while scrolling.
- Timeline: gradient line fills top→bottom while scrolling; glow dot follows; sticky year counts 2025 → 2017 going down and back up when scrolling up; education entries are indigo, work entries teal.
- Skills marquee scrolls continuously without a visible seam.
- Projects: TUMApply card is double-width; hover lifts cards; placeholder-link cards are not clickable.
- Teaching: 8 courses, 9 theses with correct status badges.
- Contact: email button opens mailto; footer renders.
- DE/EN toggle: switch to DE — every section switches language; reload — choice persists.

Edge cases:
- Narrow window (~375px): nav links hidden, layout stacks, timeline year column hidden, no horizontal overflow.
- OS reduced-motion enabled (macOS: System Settings → Accessibility → Display → Reduce motion): page renders without animations.

- [ ] **Step 3: Fix anything broken, re-verify, commit fixes**

```bash
git add -A
git commit -m "fix: polish issues found during browser verification"
```

(Skip the commit if nothing needed fixing.)

---

## Self-review notes

- Spec coverage: header/nav+toggle (T9), hero+links+photo (T10), about+languages+interests (T11), skills marquee (T11), timeline incl. education entries + sticky year + scroll line (T12), projects incl. flagship (T13), teaching+theses (T14), contact/footer (T15, T9), theme+reduced motion (T4, T15), deploy (T16), manual verification (T17). Education woven into timeline per spec; Abitur node intentionally omitted (spec marks it optional).
- Placeholders in CONTENT files are intentional per spec (user fills in personal info later); the plan itself contains no unresolved TBDs.
- Type names (`Content`, `TimelineEntry`, `Project`, `Course`, `Thesis`), `useT()`, `links`, `photo` are used consistently across tasks.





