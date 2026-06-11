import "@testing-library/jest-dom/vitest"

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver

if (!window.matchMedia) {
  window.matchMedia = ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList) as typeof window.matchMedia
}

window.scrollTo = (() => {}) as typeof window.scrollTo
Element.prototype.scrollIntoView = () => {}

beforeEach(() => {
  localStorage.clear()
})
