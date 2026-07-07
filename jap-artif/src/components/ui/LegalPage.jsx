import { useDocumentMeta } from '../../hooks/useDocumentMeta.js'
import PageHero from './PageHero.jsx'
import Reveal from './Reveal.jsx'

/**
 * Shared layout for legal documents (privacy / terms).
 * `sections` = [{ heading, body: string[] }]
 */
export default function LegalPage({ meta, eyebrow, title, updated, intro, sections }) {
  useDocumentMeta(meta)
  return (
    <>
      <PageHero eyebrow={eyebrow} breadcrumb={title} title={title} lede={intro} />
      <article className="bg-paper-texture section-pad">
        <div className="container-max max-w-prose">
          {updated && (
            <Reveal>
              <p className="mb-12 font-sans text-xs tracking-widest text-ink/45">最終更新日：{updated}</p>
            </Reveal>
          )}
          <div className="space-y-12">
            {sections.map((s, i) => (
              <Reveal as="section" key={s.heading} delay={i * 40}>
                <h2 className="font-serif text-xl font-semibold text-ink">
                  <span className="mr-3 text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-ink/70">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </>
  )
}
