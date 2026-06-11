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
        <a
          href="#home"
          aria-label="Aniruddh Zaveri — home"
          className="text-lg font-black tracking-tight"
        >
          A<span className="text-primary">Z</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {sectionIds.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`text-sm transition-colors focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
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
              type="button"
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
