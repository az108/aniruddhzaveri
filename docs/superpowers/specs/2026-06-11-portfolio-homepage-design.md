# Personal Portfolio Homepage — Design

**Date:** 2026-06-11
**Owner:** Aniruddh Zaveri
**Status:** Approved design, pending implementation plan

## Purpose

A single-page portfolio website that serves as an entry point for recruiters checking
Aniruddh's applications. It must be modern and flashy, but also informative about him
as a person. The hero links to his TUM work profile; social media is linked throughout.

## Decisions (made during brainstorming)

| Topic | Decision |
|---|---|
| Color theme | **Teal × Indigo Hybrid** — türkis/teal as primary accent on near-black slate (`#020617`-style base), indigo as secondary gradient partner |
| Page structure | **Single scrolling page** with anchor navigation |
| Timeline layout | **Sticky Year + Line** — big year number sticks left and counts down while scrolling; glowing teal line fills top-to-bottom with a moving glow-dot |
| Hero layout | **Split** — text left, photo right in glowing gradient frame |
| Hosting | **GitHub Pages** via GitHub Actions auto-deploy |
| Languages | **English + German toggle** in the header |
| Stack | Vite + React + TypeScript + Tailwind v4 + shadcn/ui + Motion (Framer Motion successor) |

## Page structure (top to bottom)

1. **Header** — sticky, glass-blur background. Logo "AZ". Nav: Home · About · Experience ·
   Projects · Teaching · Contact (smooth-scroll anchors, active section highlighted).
   DE/EN toggle.
2. **Hero** — eyebrow "Software Engineer · Agile Coach", large name, short tagline.
   Buttons: "Work Profile ↗" → https://aet.cit.tum.de/people/zaveri, social icons
   (GitHub, LinkedIn, Instagram, Email). Right side: `newProfileCrop2.jpg` in a
   teal→indigo gradient frame, gentle float animation. Background: slow-drifting
   radial teal/indigo glow blobs.
3. **About** — short personal intro (placeholder for personal bits), spoken languages
   (German native, English native, Hindi expert, French beginner), interests:
   LLMs, EdTech, data-driven systems, automotive.
4. **Skills strip** — animated marquee: Java, TypeScript, Angular, React, Python,
   Docker, SQL, AspectJ, Git/GitHub, Agile/Scrum, software architecture.
5. **Experience timeline** — newest → oldest, work + education on one line
   (work = teal styling, education = indigo styling):
   - 2025–present: Project Management & SysAdmin, TUM (TUMApply, Agile Coach, leading 6 devs, thesis supervision)
   - 2025–2027: M.Sc. Information Systems, TUM (education)
   - 2024–2025: Tutor, TUM (Intro to SE, Intro to Programming, DevOps, Patterns in SE)
   - 2022–2024: IT Working Student, BCG (IT service management, process optimization, trainings, talks)
   - 2022: Instructor Intro to Software Engineering, TUM
   - 2020–2025: B.Sc. Information Systems, TUM (education)
   - 2020–2021: Head Tutor Intro to Programming, TUM
   - 2020: Beratung/Finanzanalyse, TELIS FINANZ
   - 2017: International Accountant Intern, BMW Group
   - (Abitur, Hans-Leinberger-Gymnasium — optional last node)
6. **Projects** — TUMApply as flagship (larger card), then Artemis, Athena, Harmonia,
   Ares, TUMi Chatbot. Each card: role, tech tags, status badge (ongoing/past), link.
7. **Teaching & Mentoring** — courses grouped by semester (from work profile) +
   9 supervised bachelor theses with status (in progress / finished).
8. **Contact / Footer** — "Let's connect" CTA, email, socials, built-with note.

## Architecture

```
src/
  components/
    layout/    Header, Footer, SectionShell
    sections/  Hero, About, SkillsMarquee, ExperienceTimeline, Projects, Teaching, Contact
    timeline/  TimelineEntry, StickyYear, TimelineLine
    ui/        shadcn primitives (button, card, badge, tooltip, separator)
  content/
    en.ts, de.ts   — ALL text and data (jobs, projects, theses), typed
  lib/
    i18n.tsx       — LanguageContext + useT() hook, persisted in localStorage
  index.css        — Tailwind v4 theme tokens (teal/indigo palette)
```

- Content is fully data-driven from `en.ts`/`de.ts`; components never hardcode text.
- Unknown personal details are marked `[PLACEHOLDER: …]` in content files for easy grep.
- Timeline entry shape: `{ period, title, org, description, tags, type: 'work' | 'education' }`.
- Photo copied to `public/`; CV stays in `documents/` (optionally linked later).

## Animations

- Timeline: Motion `useScroll` on the timeline container drives line `scaleY`,
  glow-dot position, and the sticky year value.
- Sections animate in with `whileInView` (once).
- Hero: CSS keyframe drift on glow blobs; float on photo frame.
- All animation honors `prefers-reduced-motion`.

## Deployment

GitHub Actions: on push to `main` → Vite build → deploy to GitHub Pages.
Base path configurable so it works as project page (`/aniruddhzaveri/`) or user site
(`aniruddhzaveri.github.io` after repo rename — flagged at deploy time).
Custom domain (e.g. aniruddhzaveri.com, ~12 €/yr) attachable later without code changes.

## Error handling & testing

- Static site, no runtime data fetching → no network error states needed.
- TypeScript strict + ESLint.
- Vitest smoke test: app renders in both EN and DE.
- Manual browser verification of scroll-driven timeline, nav highlighting, language
  toggle, and responsive layout (mobile collapses timeline gracefully).

## Out of scope (YAGNI)

- No blog, no CMS, no contact form backend, no analytics (can add later).
- No per-project detail pages (single page only).
- No react-i18next — a tiny custom context suffices for one page.
