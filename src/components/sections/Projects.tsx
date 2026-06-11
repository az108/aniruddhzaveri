import { motion } from "motion/react"
import { Badge } from "@/components/ui/badge"
import { SectionShell } from "@/components/layout/SectionShell"
import { useT } from "@/lib/i18n"
import type { Project } from "@/content/types"

function ProjectCard({ project, statusLabel }: { project: Project; statusLabel: string }) {
  const hasLink = project.link.startsWith("http")
  const className = `group block rounded-xl border border-border bg-card/60 p-6 transition-colors hover:border-teal-700 ${
    project.flagship
      ? "bg-gradient-to-br from-teal-950/40 to-indigo-950/30"
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
