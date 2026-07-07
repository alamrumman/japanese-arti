import { useReveal } from '../../hooks/useReveal.js'

/**
 * Self-drawing ink brush stroke. Draws once when scrolled into view.
 */
export default function BrushStroke({ className = '' }) {
  const { ref, visible } = useReveal({ threshold: 0.3 })
  return (
    <svg
      ref={ref}
      viewBox="0 0 600 120"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M12 78C120 34 210 30 300 52c86 21 150 30 288-18"
        stroke="var(--ink)"
        strokeWidth="26"
        strokeLinecap="round"
        opacity="0.9"
        style={{
          strokeDasharray: 640,
          strokeDashoffset: visible ? 0 : 640,
          transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)',
        }}
      />
    </svg>
  )
}
