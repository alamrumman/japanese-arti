import { useEffect, useRef, useState } from 'react'

/**
 * Reveal-on-scroll via a SINGLE shared IntersectionObserver for the whole page.
 * One observer instead of dozens keeps hydration/effect cost (TBT) low on
 * mobile. Targets are registered with a per-element callback and unobserved
 * after first reveal. Honours reduced motion / no-IO environments.
 */
let sharedObserver = null
const callbacks = new WeakMap()

function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === 'undefined') return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const cb = callbacks.get(entry.target)
          if (cb) cb()
          callbacks.delete(entry.target)
          sharedObserver.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )
  return sharedObserver
}

export function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = getObserver()
    if (!observer) {
      setVisible(true)
      return
    }

    callbacks.set(el, () => setVisible(true))
    observer.observe(el)
    return () => {
      callbacks.delete(el)
      observer.unobserve(el)
    }
  }, [])

  return { ref, visible }
}
