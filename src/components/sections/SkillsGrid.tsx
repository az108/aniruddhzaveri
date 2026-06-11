import { motion } from "motion/react"
import { useT } from "@/lib/i18n"

export function SkillsGrid() {
  const { t } = useT()
  return (
    <section aria-label={t.skills.heading} className="border-y border-border/40 bg-card/30 py-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h3 className="text-sm tracking-widest text-primary uppercase">{t.skills.heading}</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {t.skills.items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-teal-700 hover:text-primary"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
