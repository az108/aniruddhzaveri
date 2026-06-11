import { Badge } from "@/components/ui/badge"
import { SectionShell } from "@/components/layout/SectionShell"
import { useT } from "@/lib/i18n"

export function About() {
  const { t } = useT()
  return (
    <SectionShell id="about" heading={t.about.heading}>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <p className="text-lg leading-relaxed text-muted-foreground">{t.about.body}</p>
        <div className="space-y-8">
          <div>
            <h3 className="text-sm tracking-widest text-primary uppercase">
              {t.about.interestsHeading}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {t.about.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm tracking-widest text-primary uppercase">
              {t.about.languagesHeading}
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
              {t.about.languages.map((language) => (
                <li key={language.name} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="text-foreground">{language.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
