import { ARTIFACTS } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Photo from '../ui/Photo.jsx'
import Arrow from '../ui/Arrow.jsx'

export default function FeaturedArtifacts() {
  return (
    <section id="artifacts" className="relative scroll-mt-24 bg-bg section-pad" aria-labelledby="artifacts-heading">
      <div className="container-max">
        <SectionHeading
          eyebrow="特集"
          title={<span id="artifacts-heading">注目の工芸品</span>}
          action={
            <a href="#gallery" className="btn-ghost group">
              すべて見る <Arrow />
            </a>
          }
        />

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ARTIFACTS.map((a, i) => (
            <li key={a.id}>
              <Reveal delay={i * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-card bg-paper shadow-card transition-[transform,box-shadow] duration-[400ms] ease-soft hover:-translate-y-3 hover:shadow-cardHover">
                  <div className="overflow-hidden">
                    <Photo
                      src={a.img}
                      alt={`${a.title}の工芸品`}
                      rounded="rounded-none"
                      className="aspect-[4/5]"
                      imgClassName="transition-transform duration-[600ms] ease-soft group-hover:scale-[1.08]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-semibold text-ink">{a.title}</h3>
                    <p className="mt-2 flex-1 font-sans text-sm text-ink/60">{a.desc}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="relative inline-block h-px w-8 bg-ink/20">
                        <span className="absolute inset-y-0 left-0 w-0 bg-gold transition-[width] duration-[400ms] ease-soft group-hover:w-full" />
                      </span>
                      <span className="text-ink/70">
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
