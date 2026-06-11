import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { About } from "./About"
import { SkillsMarquee } from "./SkillsMarquee"

test("renders about heading, languages and interests", () => {
  render(
    <LanguageProvider>
      <About />
    </LanguageProvider>,
  )
  expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument()
  expect(screen.getByText("German")).toBeInTheDocument()
  expect(screen.getByText("Educational technology")).toBeInTheDocument()
})

test("marquee renders each skill twice for seamless looping", () => {
  render(
    <LanguageProvider>
      <SkillsMarquee />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Java")).toHaveLength(2)
})
