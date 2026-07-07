import { Link } from 'react-router-dom'
import Arrow from './Arrow.jsx'

/**
 * Primary CTA. Renders a router <Link> when `to` is set, otherwise a <button>.
 */
export default function Button({ to, href, children, arrow = true, className = '', ...rest }) {
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className="text-bg" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`btn-ink group ${className}`} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={`btn-ink group ${className}`} {...rest}>
        {inner}
      </a>
    )
  }
  return (
    <button className={`btn-ink group ${className}`} {...rest}>
      {inner}
    </button>
  )
}
