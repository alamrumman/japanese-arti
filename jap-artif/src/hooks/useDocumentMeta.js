import { useEffect } from 'react'

const SITE = '日本の工芸品'

/**
 * Lightweight per-page <title> + meta description management.
 * Avoids pulling in a helmet dependency (keeps bundle small for Lighthouse).
 */
export function useDocumentMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = `${title} — ${SITE}`
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [title, description])
}
