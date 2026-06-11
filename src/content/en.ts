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
