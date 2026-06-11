import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { en } from "@/content/en"
import { de } from "@/content/de"
import type { Content } from "@/content/types"

export type Lang = "en" | "de"

const dict: Record<Lang, Content> = { en, de }

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Content
}

const LanguageContext = createContext<LangContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("lang")
    return stored === "de" || stored === "en" ? stored : "en"
  })

  useEffect(() => {
    localStorage.setItem("lang", lang)
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dict[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useT(): LangContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useT must be used within LanguageProvider")
  return ctx
}
