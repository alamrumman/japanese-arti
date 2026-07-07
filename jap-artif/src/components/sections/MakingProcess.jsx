import { PROCESS_STEPS } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Photo from '../ui/Photo.jsx'
import Arrow from '../ui/Arrow.jsx'

export default function MakingProcess() {
  return (
    <section id="process" className="relative scroll-mt-24 bg-paper-texture section-pad" aria-labelledby="process-heading">
      <div className="container-max">
        <SectionHeading
          eyebrow="職人の技"
          title={<span id="process-heading">工芸品ができるまで</span>}
          action={
            <a href="/about" className="btn-ghost group">
              詳しく見る <Arrow />
            </a>
          }
        />

        {/* Desktop: horizontal timeline / Mobile: vertical */}
        <ol className="mt-16 grid gap-12 md:grid-cols-5 md:gap-4">
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.no} className="relative">
              {/* gold connector (desktop) */}
              {i < PROCESS_STEPS.length - 1 && (
                <span className="absolute left-[calc(50%+3.5rem)] top-16 hidden h-px w-[calc(100%-7rem)] md:block">
                  <span className="block h-full w-full origin-left bg-gradient-to-r from-gold/70 to-gold/30" />
                  <svg viewBox="0 0 12 12" width="10" height="10" className="absolute -right-1 -top-[4.5px] text-gold" aria-hidden="true">
                    <path d="M1 1l5 5-5 5" stroke="currentColor" fill="none" strokeWidth="1.4" />
                  </svg>
                </span>
              )}
              <Reveal delay={i * 120} className="flex flex-col items-center text-center">
                <span className="mb-4 font-serif text-2xl font-semibold text-gold">{s.no}</span>
                <div className="group">
                  <Photo
                    src={s.img}
                    alt={`${s.title}の工程`}
                    rounded="rounded-full"
                    className="mx-auto aspect-square w-28 shadow-card transition-transform duration-[400ms] ease-soft group-hover:scale-110 md:w-32"
                  />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-[16rem] font-sans text-sm text-ink/60">{s.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
