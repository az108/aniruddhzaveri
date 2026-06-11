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
