import { HISTORY } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Photo from '../ui/Photo.jsx'

export default function History() {
  return (
    <section id="history" className="relative scroll-mt-24 bg-bg section-pad" aria-labelledby="history-heading">
      <div className="container-max">
        <SectionHeading eyebrow="歴史" title={<span id="history-heading">受け継がれる時</span>} />

        <div className="relative mt-16">
          {/* center gold line */}
          <span className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:left-1/2" />

          <ol className="space-y-14">
            {HISTORY.map((h, i) => (
              <li key={h.year} className="relative">
                <Reveal delay={i * 80}>
                  <div
                    className={`grid items-center gap-6 pl-12 md:grid-cols-2 md:gap-16 md:pl-0 ${
                      i % 2 === 1 ? 'md:[direction:rtl]' : ''
                    }`}
                  >
                    {/* node */}
                    <span className="absolute left-[9px] top-2 h-3 w-3 rounded-full border-2 border-gold bg-bg md:left-1/2 md:-translate-x-1/2" />

                    <div className={`[direction:ltr] ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                      <p className="font-serif text-4xl font-semibold text-gold md:text-5xl">{h.year}</p>
                      <h3 className="mt-3 font-serif text-xl font-semibold text-ink">{h.title}</h3>
                      <p className="mt-2 font-sans text-sm text-ink/60">{h.desc}</p>
                    </div>

                    <div className="[direction:ltr]">
                      <Photo
                        src={h.img}
                        alt={`${h.year}年の工芸`}
                        className="aspect-[16/10] w-full max-w-sm shadow-card"
                      />
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
