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
