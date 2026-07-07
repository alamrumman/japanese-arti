import { useEffect, useState } from 'react'

/**
 * Navbar behaviour: track whether the page is scrolled (paper bg) and
 * whether the user is scrolling down (hide) or up (show).
 */
export function useScrollDirection() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Only hide well past the hero, ignore tiny jitters
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240)
        lastY = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, hidden }
}
