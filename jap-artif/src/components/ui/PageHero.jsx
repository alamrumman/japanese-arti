import { Link } from 'react-router-dom'

/**
 * Compact banner for subpages: breadcrumb + eyebrow + title + lede.
 * Rendered statically (no scroll-reveal) so it's the immediate FCP/LCP paint
 * on prerendered subpages. A gentle CSS fade-in plays on load only.
 */
export default function PageHero({ eyebrow, title, lede, breadcrumb }) {
  return (
    <header className="relative overflow-hidden bg-paper-texture pb-16 pt-36 md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute right-[-8%] top-[-10%] h-[36vw] max-h-[420px] w-[36vw] max-w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(192,57,43,0.12), transparent 70%)' }}
      />
      <div className="container-max relative">
        <nav aria-label="パンくずリスト" className="mb-6 flex items-center gap-2 font-sans text-xs text-ink/50">
          <Link to="/" className="link-underline hover:text-ink">
            ホーム
          </Link>
          <span aria-hidden="true">／</span>
          <span className="text-ink/70">{breadcrumb ?? title}</span>
        </nav>
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-tight text-ink">
          {title}
        </h1>
        {lede && <p className="mt-6 max-w-prose font-sans text-ink/65">{lede}</p>}
      </div>
    </header>
  )
}
