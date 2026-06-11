import { useCallback, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { SectionShell } from "@/components/layout/SectionShell"
import { TimelineEntryCard } from "@/components/timeline/TimelineEntryCard"
import { useT } from "@/lib/i18n"

export function ExperienceTimeline() {
  const { t } = useT()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.5"],
  })
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 })
  const dotTop = useTransform(lineProgress, (v) => `calc(${v * 100}% - 6px)`)

  const entries = t.experience.entries
  const handleActive = useCallback((i: number) => setActiveIdx(i), [])

  return (
    <SectionShell id="experience" heading={t.experience.heading} sub={t.experience.sub}>
      <div ref={containerRef} className="relative flex gap-6 md:gap-10">
        <div className="hidden w-24 shrink-0 sm:block md:w-32">
          <div className="sticky top-1/3">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={entries[activeIdx].year}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25 }}
                className="text-5xl font-black text-primary tabular-nums md:text-6xl"
              >
                {entries[activeIdx].year}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="relative w-px shrink-0">
          <div className="absolute inset-0 w-px bg-border" />
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute inset-0 w-px origin-top bg-gradient-to-b from-teal-400 to-indigo-400"
          />
          <motion.div
            style={{ top: dotTop }}
            className="absolute -left-[5px] h-[11px] w-[11px] rounded-full bg-teal-300 shadow-[0_0_16px_#2dd4bf]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-8 pb-8">
          {entries.map((entry, i) => (
            <TimelineEntryCard
              key={entry.id}
              entry={entry}
              typeLabels={t.experience.typeLabels}
              onActive={() => handleActive(i)}
            />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
