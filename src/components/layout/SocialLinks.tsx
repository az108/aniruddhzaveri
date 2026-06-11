import { Briefcase, Camera, Code2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { links } from "@/content/shared"

const socials = [
  { href: links.github, icon: Code2, label: "GitHub" },
  { href: links.linkedin, icon: Briefcase, label: "LinkedIn" },
  { href: links.instagram, icon: Camera, label: "Instagram" },
  { href: `mailto:${links.email}`, icon: Mail, label: "Email" },
]

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {socials.map(({ href, icon: Icon, label }) => (
        <Button
          key={label}
          asChild
          variant="outline"
          size="icon"
          className="rounded-full border-border/60 bg-card/40 hover:border-teal-700 hover:text-primary"
        >
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
            <Icon />
          </a>
        </Button>
      ))}
    </div>
  )
}
