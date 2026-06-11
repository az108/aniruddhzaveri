import { en } from "./en"
import { de } from "./de"

test("en and de content are structurally parallel", () => {
  expect(de.experience.entries.map((e) => e.id)).toEqual(
    en.experience.entries.map((e) => e.id),
  )
  expect(de.projects.items.map((p) => p.id)).toEqual(
    en.projects.items.map((p) => p.id),
  )
  expect(de.teaching.theses.length).toBe(en.teaching.theses.length)
  expect(de.teaching.courses.length).toBe(en.teaching.courses.length)
  expect(de.about.languages.length).toBe(en.about.languages.length)
})
