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
