import { render, screen, fireEvent } from "@testing-library/react"
import App from "@/App"

test("renders all sections in English", () => {
  render(<App />)
  expect(screen.getByRole("heading", { name: "Aniruddh Zaveri" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Experience" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Teaching & Mentoring" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Let's connect" })).toBeInTheDocument()
})

test("switches the whole page to German", () => {
  render(<App />)
  fireEvent.click(screen.getByRole("button", { name: "de" }))
  expect(screen.getByRole("heading", { name: "Über mich" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Werdegang" })).toBeInTheDocument()
  expect(screen.getByRole("heading", { name: "Lehre & Mentoring" })).toBeInTheDocument()
})

test("contact email link points to TUM address", () => {
  render(<App />)
  expect(screen.getByRole("link", { name: /Say hello/ })).toHaveAttribute(
    "href",
    "mailto:aniruddh.zaveri@tum.de",
  )
})
