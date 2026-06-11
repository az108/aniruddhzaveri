import { render, screen, fireEvent } from "@testing-library/react"
import { LanguageProvider } from "@/lib/i18n"
import { Header } from "./Header"

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>,
  )
}

test("renders all nav links in English", () => {
  renderHeader()
  for (const label of ["Home", "About", "Experience", "Projects", "Teaching", "Contact"]) {
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument()
  }
})

test("language toggle switches nav labels to German", () => {
  renderHeader()
  fireEvent.click(screen.getByRole("button", { name: "de" }))
  expect(screen.getByRole("link", { name: "Über mich" })).toBeInTheDocument()
})
