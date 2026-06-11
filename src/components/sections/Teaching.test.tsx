import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Teaching } from "./Teaching"

test("renders courses and supervised theses", () => {
  render(
    <LanguageProvider>
      <Teaching />
    </LanguageProvider>,
  )
  expect(screen.getAllByText("Introduction to Programming")).toHaveLength(3)
  expect(screen.getByText(/Catherine Kalra/)).toBeInTheDocument()
  expect(screen.getAllByText("Finished")).toHaveLength(6)
  expect(screen.getAllByText("In progress")).toHaveLength(3)
})
