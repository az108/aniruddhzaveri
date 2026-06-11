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
