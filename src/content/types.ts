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
  link: string
}

export interface Thesis {
  year: number
  title: string
  student: string
  status: "in-progress" | "finished"
  link: string
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
  }
}
