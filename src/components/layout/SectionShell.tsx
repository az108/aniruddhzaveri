import { motion } from "motion/react"
import type { ReactNode } from "react"

interface SectionShellProps {
  id: string
  heading: string
  sub?: string
  children: ReactNode
}

export function SectionShell({ id, heading, sub, children }: SectionShellProps) {
  return (
    <section id={id} className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>
          {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
          <div className="mt-12">{children}</div>
        </motion.div>
      </div>
    </section>
  )
}
