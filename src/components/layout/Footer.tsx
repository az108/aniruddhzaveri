import { useT } from "@/lib/i18n"

export function Footer() {
  const { t } = useT()
  return (
    <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
      © 2026 Aniruddh Zaveri · {t.contact.builtWith}
    </footer>
  )
}
