import { render, screen, fireEvent } from "@testing-library/react"
import { LanguageProvider, useT } from "./i18n"

function Probe() {
  const { t, lang, setLang } = useT()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="heading">{t.about.heading}</span>
      <button onClick={() => setLang("de")}>switch</button>
    </div>
  )
}

function renderProbe() {
  return render(
    <LanguageProvider>
      <Probe />
    </LanguageProvider>,
  )
}

test("defaults to English", () => {
  renderProbe()
  expect(screen.getByTestId("lang")).toHaveTextContent("en")
  expect(screen.getByTestId("heading")).toHaveTextContent("About Me")
})

test("switches to German", () => {
  renderProbe()
  fireEvent.click(screen.getByText("switch"))
  expect(screen.getByTestId("heading")).toHaveTextContent("Über mich")
})

test("persists language choice to localStorage", () => {
  renderProbe()
  fireEvent.click(screen.getByText("switch"))
  expect(localStorage.getItem("lang")).toBe("de")
})

test("reads initial language from localStorage", () => {
  localStorage.setItem("lang", "de")
  renderProbe()
  expect(screen.getByTestId("lang")).toHaveTextContent("de")
})
