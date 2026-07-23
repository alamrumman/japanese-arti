import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Reset scroll on route change; honour in-page hash anchors. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Defer one frame so Lenis finishes processing the route transition
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          return
        }
        window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
