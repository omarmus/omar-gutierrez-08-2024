export function useObserver (callback: () => void) {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback && callback()
      }
    })
  }, {
    rootMargin: '0px',
    threshold: 1.0
  })
}
