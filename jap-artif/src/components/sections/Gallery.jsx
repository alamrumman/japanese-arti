import { GALLERY } from '../../data/site.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Photo from '../ui/Photo.jsx'
import Arrow from '../ui/Arrow.jsx'

const SPAN = {
  tall: 'row-span-2 aspect-[3/4]',
  wide: 'aspect-[16/10]',
  base: 'aspect-square',
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 bg-paper-texture section-pad" aria-labelledby="gallery-heading">
      <div className="container-max">
        <SectionHeading
          eyebrow="ギャラリー"
          title={<span id="gallery-heading">日本の美の記録</span>}
          action={
            <a href="#artifacts" className="btn-ghost group">
              すべての写真を見る <Arrow />
            </a>
          }
        />

        <div className="mt-14 grid auto-rows-auto grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.id} delay={(i % 4) * 80} className={g.span === 'tall' ? 'row-span-2' : ''}>
              <figure className="group relative h-full overflow-hidden rounded-card shadow-card">
                <Photo
                  src={g.img}
                  alt={`${g.title}の工芸`}
                  rounded="rounded-card"
                  className={`h-full w-full ${SPAN[g.span]}`}
                  imgClassName="transition-transform duration-[600ms] ease-soft group-hover:scale-[1.08]"
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-dark/70 via-dark/10 to-transparent p-5 opacity-0 transition-opacity duration-[400ms] ease-soft group-hover:opacity-100">
                  <span className="flex items-center gap-2 font-serif text-lg text-bg">
                    {g.title}
                    <Arrow className="text-bg" />
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
