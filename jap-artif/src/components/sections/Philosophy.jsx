import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'

/** Gold dust motes — few, GPU transforms only. */
function GoldDust() {
  const dots = [
    { l: '14%', t: '30%', s: 3, d: 0 },
    { l: '24%', t: '64%', s: 2, d: 1.5 },
    { l: '40%', t: '22%', s: 4, d: 0.6 },
    { l: '58%', t: '72%', s: 2, d: 2 },
    { l: '70%', t: '38%', s: 3, d: 1 },
    { l: '82%', t: '58%', s: 2, d: 2.4 },
    { l: '90%', t: '28%', s: 3, d: 0.9 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: d.l,
            top: d.t,
            width: d.s,
            height: d.s,
            background: 'var(--gold)',
            boxShadow: '0 0 8px var(--gold)',
            animation: `breathe ${6 + d.d}s ease-in-out ${d.d}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  )
}

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative scroll-mt-24 overflow-hidden bg-dark text-bg section-pad"
      aria-labelledby="philosophy-heading"
    >
      <div
        className="pointer-events-none absolute right-[-10%] top-1/2 h-[60vw] max-h-[560px] w-[60vw] max-w-[560px] -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(199,155,82,0.16), transparent 68%)' }}
      />
      <GoldDust />

      <div className="container-max relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-6 text-gold">職人の哲学</p>
          </Reveal>
          <Reveal delay={120}>
            <blockquote>
              <h2
                id="philosophy-heading"
                className="font-serif text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.35] text-bg"
              >
                美は、完璧の中にはなく、
                <br />
                不完全の中に宿る。
              </h2>
              <footer className="mt-8 font-serif text-lg text-gold">— 千利休</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={240} className="mt-10">
            <Button to="/about" className="!bg-transparent !text-bg [border-color:rgba(247,244,239,0.35)]">
              美の哲学を見る
            </Button>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div
            className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full"
            style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)', animation: 'breathe 10s ease-in-out infinite' }}
          >
            <img
              src="/images/philobowl.webp"
              alt="金継ぎが施された茶碗"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ boxShadow: 'inset 0 0 80px 20px rgba(17,17,17,0.55)' }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
