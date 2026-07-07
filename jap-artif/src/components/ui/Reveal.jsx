import { useReveal } from '../../hooks/useReveal.js'

/**
 * Wraps children in a scroll-reveal. `as` lets it render any element,
 * `delay` staggers groups. Motion is pure CSS transform/opacity.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
