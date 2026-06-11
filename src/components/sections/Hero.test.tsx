import { render, screen } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Hero } from "./Hero"

test("renders name, work profile link and portrait", () => {
  render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>,
  )
  expect(screen.getByRole("heading", { name: "Aniruddh Zaveri" })).toBeInTheDocument()
  const workLink = screen.getByRole("link", { name: /Work Profile/ })
  expect(workLink).toHaveAttribute("href", "https://aet.cit.tum.de/people/zaveri/")
  expect(screen.getByAltText("Portrait of Aniruddh Zaveri")).toBeInTheDocument()
})
