import { MotionConfig } from "motion/react"
import { LanguageProvider } from "@/lib/i18n"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { SkillsGrid } from "@/components/sections/SkillsGrid"
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline"
import { Projects } from "@/components/sections/Projects"
import { Teaching } from "@/components/sections/Teaching"
import { Contact } from "@/components/sections/Contact"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Header />
        <main>
          <Hero />
          <About />
          <SkillsGrid />
          <ExperienceTimeline />
          <Projects />
          <Teaching />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </MotionConfig>
  )
}
