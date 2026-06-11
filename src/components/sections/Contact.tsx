import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionShell } from "@/components/layout/SectionShell"
import { SocialLinks } from "@/components/layout/SocialLinks"
import { useT } from "@/lib/i18n"
import { links } from "@/content/shared"

export function Contact() {
  const { t } = useT()
  return (
    <SectionShell id="contact" heading={t.contact.heading}>
      <div className="rounded-2xl border border-border bg-gradient-to-br from-teal-950/40 via-card to-indigo-950/30 p-10 text-center">
        <p className="mx-auto max-w-xl text-muted-foreground">{t.contact.body}</p>
        <Button
          asChild
          size="lg"
          className="mt-6 bg-gradient-to-r from-teal-500 to-indigo-500 text-white hover:opacity-90"
        >
          <a href={`mailto:${links.email}`}>
            {t.contact.emailCta} <Mail />
          </a>
        </Button>
        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </SectionShell>
  )
}
