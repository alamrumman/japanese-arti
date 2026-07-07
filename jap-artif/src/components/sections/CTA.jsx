import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import BrushStroke from '../ui/BrushStroke.jsx'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-paper-texture section-pad" aria-labelledby="cta-heading">
      {/* gold accents */}
      <svg className="pointer-events-none absolute -right-16 top-8 h-48 w-80 text-gold" viewBox="0 0 200 120" fill="none" aria-hidden="true">
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3, 4].map((c) => (
            <path
              key={`${r}-${c}`}
              d={`M${c * 44 - 20} ${r * 26 + 20}a22 22 0 0 1 44 0`}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.22"
            />
          )),
        )}
      </svg>

      <div className="container-max relative flex flex-col items-center text-center">
        <BrushStroke className="mb-6 h-16 w-64 opacity-[0.1]" />
        <Reveal>
          <p className="eyebrow mb-6">お問い合わせ</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 id="cta-heading" className="max-w-2xl font-serif text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-tight text-ink text-balance">
            工芸の物語を、
            <br />
            あなたの暮らしへ。
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-prose font-sans text-ink/65">
            ひとつひとつ手仕事で生まれる工芸品について、
            お気軽にお問い合わせください。
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10">
          <Button to="/contact">お問い合わせはこちら</Button>
        </Reveal>
      </div>
    </section>
  )
}
