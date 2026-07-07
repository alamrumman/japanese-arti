import { useEffect } from 'react'

/**
 * Lenis smooth scrolling, loaded lazily after first paint so it stays out of
 * the critical bundle and off the main thread during load. Disabled when the
 * user prefers reduced motion. PRD: duration 1.2, nothing snaps.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let lenis
    let rafId
    let cancelled = false

    const start = () => {
      import('lenis').then(({ default: Lenis }) => {
        if (cancelled) return
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })
        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)
      })
    }

    // Wait until the browser is idle so it doesn't compete with LCP.
    const idle =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(start, { timeout: 2000 })
        : setTimeout(start, 1200)

    return () => {
      cancelled = true
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(idle)
      else clearTimeout(idle)
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])
}
