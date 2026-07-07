/** Slim arrow that slides right on hover of a parent `.group`. */
export default function Arrow({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 12"
      width="32"
      height="12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-[250ms] ease-soft group-hover:translate-x-1.5 ${className}`}
    >
      <path d="M0 6h30M25 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
