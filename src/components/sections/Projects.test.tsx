import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Projects } from "./Projects"

test("renders all six projects with status badges", () => {
  render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
  for (const name of ["TUMApply", "Artemis", "TUMi Chatbot", "Athena", "Ares", "Harmonia"]) {
    expect(screen.getByText(name)).toBeInTheDocument()
  }
  expect(screen.getAllByText("Ongoing")).toHaveLength(3)
  expect(screen.getAllByText("Past")).toHaveLength(3)
})

test("projects with real links render as anchors", () => {
  render(
    <LanguageProvider>
      <Projects />
    </LanguageProvider>,
  )
  expect(screen.getByRole("link", { name: /Artemis/ })).toHaveAttribute(
    "href",
    "https://github.com/ls1intum/Artemis",
  )
})
