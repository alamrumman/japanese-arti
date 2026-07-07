import Reveal from './Reveal.jsx'

/** Eyebrow + large serif title, optional link on the right. */
export default function SectionHeading({ eyebrow, title, action, light = false, className = '' }) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <Reveal>
        {eyebrow && <p className={`eyebrow mb-4 ${light ? 'text-gold' : ''}`}>{eyebrow}</p>}
        <h2
          className={`font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight ${light ? 'text-bg' : 'text-ink'}`}
        >
          {title}
        </h2>
      </Reveal>
      {action && <Reveal delay={120}>{action}</Reveal>}
    </div>
  )
}
