import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { About } from "./About"
import { SkillsGrid } from "./SkillsGrid"

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

test("skills grid renders each skill once", () => {
  render(
    <LanguageProvider>
      <SkillsGrid />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Java")).toHaveLength(1)
  expect(screen.getByText("Software Architecture")).toBeInTheDocument()
})
