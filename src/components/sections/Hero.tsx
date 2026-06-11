import { motion } from "motion/react"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SocialLinks } from "@/components/layout/SocialLinks"
import { useT } from "@/lib/i18n"
import { links, photo } from "@/content/shared"

export function Hero() {
  const { t } = useT()
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="animate-drift absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-teal-500/10 blur-3xl" />
        <div className="animate-drift-slow absolute right-0 bottom-0 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-3xl" />
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 md:grid-cols-[1fr_auto]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm tracking-[0.3em] text-primary uppercase">{t.hero.eyebrow}</p>
          <h1 className="mt-4 text-5xl font-extrabold md:text-7xl">{t.hero.name}</h1>
          <Badge variant="outline" className="mt-4 border-indigo-800 text-indigo-300">
            {t.hero.statusBadge}
          </Badge>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t.hero.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:opacity-90"
            >
              <a href={links.workProfile} target="_blank" rel="noreferrer">
                {t.hero.workProfileCta} <ExternalLink />
              </a>
            </Button>
            <SocialLinks />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="justify-self-center"
        >
          <div className="animate-float rounded-3xl bg-gradient-to-br from-teal-400 via-teal-500 to-indigo-500 p-[3px] shadow-[0_0_60px_-15px_#2dd4bf]">
            <img
              src={photo}
              alt="Portrait of Aniruddh Zaveri"
              className="h-72 w-60 rounded-[calc(1.5rem-3px)] object-cover md:h-96 md:w-80"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
