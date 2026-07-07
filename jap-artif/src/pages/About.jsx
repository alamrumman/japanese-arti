import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import PageHero from '../components/ui/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Photo from '../components/ui/Photo.jsx'
import Button from '../components/ui/Button.jsx'

const VALUES = [
  { title: '素材への敬意', desc: '土、木、漆、鉄。自然が育んだ素材の声に耳を澄まします。', kanji: '素' },
  { title: '手仕事の時間', desc: '効率ではなく、心を込めた手間の中に美は宿ると信じています。', kanji: '手' },
  { title: '未来への継承', desc: '受け継いだ技を磨き、次の世代へと確かに手渡していきます。', kanji: '継' },
]

const STATS = [
  { value: '1200', unit: '年', label: '受け継がれる技' },
  { value: '48', unit: '名', label: '契約する職人' },
  { value: '17', unit: '産地', label: '日本各地の工房' },
]

export default function About() {
  useDocumentMeta({
    title: '私たちについて',
    description:
      '日本の伝統工芸の魅力と、職人たちの想いを世界に伝える「日本の工芸品」。素材への敬意、手仕事の時間、未来への継承という理念をご紹介します。',
  })

  return (
    <>
      <PageHero
        eyebrow="私たちについて"
        breadcrumb="私たちについて"
        title={<>手のぬくもりを、<br />次の時代へ。</>}
        lede="「日本の工芸品」は、全国の職人と歩みをともにし、その手仕事の美しさと物語を世界へ届けるために生まれました。"
      />

      {/* Story */}
      <section className="bg-paper-texture section-pad" aria-labelledby="story-heading">
        <div className="container-max grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Photo
              src="/images/about.webp"
              alt="工房で器を成形する職人の手"
              className="aspect-[4/5] w-full shadow-card"
            />
          </Reveal>
          <div>
            <Reveal>
              <h2 id="story-heading" className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-ink">
                私たちの物語
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 max-w-prose space-y-5 font-sans text-ink/70">
              <p>
                かつて日常に息づいていた手仕事の道具たち。
                大量生産の時代の中で、その多くが姿を消そうとしています。
              </p>
              <p>
                私たちは、失われゆく技と美を守りたいという想いから、
                日本各地の工房を訪ね、職人たちと信頼を重ねてきました。
              </p>
              <p>
                ひとつの器、一本の刀に宿る時間と祈り。
                その価値を、まっすぐに伝えることが私たちの使命です。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg section-pad" aria-labelledby="values-heading">
        <div className="container-max">
          <Reveal>
            <p className="eyebrow mb-4">理念</p>
            <h2 id="values-heading" className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-ink">
              大切にしていること
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 120}>
                <article className="h-full rounded-card bg-paper p-8 shadow-card">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink font-serif text-2xl text-gold">
                    {v.kanji}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 font-sans text-sm text-ink/60">{v.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark text-bg section-pad" aria-label="実績">
        <div className="container-max grid gap-10 text-center sm:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 120}>
              <p className="font-serif text-5xl font-semibold text-gold md:text-6xl">
                {s.value}
                <span className="ml-1 text-2xl">{s.unit}</span>
              </p>
              <p className="mt-3 font-sans text-sm tracking-widest text-bg/60">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-paper-texture section-pad">
        <div className="container-max flex flex-col items-center text-center">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-[clamp(1.8rem,4vw,3rem)] font-semibold text-ink">
              工芸品について、お話しませんか。
            </h2>
          </Reveal>
          <Reveal delay={150} className="mt-8">
            <Button to="/contact">お問い合わせ</Button>
          </Reveal>
        </div>
      </section>
    </>
  )
}
