import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { ExperienceTimeline } from "./ExperienceTimeline"

test("renders all timeline entries newest first", () => {
  render(
    <LanguageProvider>
      <ExperienceTimeline />
    </LanguageProvider>,
  )
  expect(screen.getByText("Master's Thesis — Project Nexus")).toBeInTheDocument()
  expect(
    screen.getByText("Project Management & System Administration"),
  ).toBeInTheDocument()
  expect(screen.getByText("Student Internship — International Accounting")).toBeInTheDocument()
  const articles = screen.getAllByRole("article")
  expect(articles).toHaveLength(13)
})

test("education entries carry the education badge", () => {
  render(
    <LanguageProvider>
      <ExperienceTimeline />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Education")).toHaveLength(6)
})
