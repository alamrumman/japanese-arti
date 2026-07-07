import Reveal from '../ui/Reveal.jsx'
import Button from '../ui/Button.jsx'
import Photo from '../ui/Photo.jsx'
import BrushStroke from '../ui/BrushStroke.jsx'

export default function About() {
  return (
    <section className="relative bg-paper-texture section-pad" aria-labelledby="about-heading">
      <div className="container-max grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        {/* Image */}
        <Reveal className="order-2 lg:order-1">
          <div className="group relative overflow-hidden rounded-card shadow-card">
            <Photo
              src="/images/about.webp"
              alt="轆轤で器を成形する陶芸家の手"
              rounded="rounded-card"
              className="aspect-[4/5]"
              imgClassName="transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
            />
          </div>
        </Reveal>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <div className="relative mb-4 inline-block">
            <BrushStroke className="absolute -left-6 -top-2 h-16 w-56 opacity-[0.08]" />
            <p className="eyebrow relative">私たちについて</p>
          </div>
          <Reveal>
            <h2 id="about-heading" className="font-serif text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-tight text-ink">
              日本の工芸が
              <br />
              生まれる理由
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-8 max-w-prose space-y-5 font-sans text-ink/70">
            <p>
              自然との調和を大切にし、日常の中に美を見出す日本人の感性は、
              千年以上にわたり受け継がれてきました。
            </p>
            <p>
              素材と真摯に向き合い、手間を惜しまず、心を込めて生み出される工芸品。
              それは、使う人の暮らしにそっと寄り添う、かけがえのない存在です。
            </p>
          </Reveal>

          <Reveal delay={220} className="mt-10">
            <Button to="/about">私たちについて</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
