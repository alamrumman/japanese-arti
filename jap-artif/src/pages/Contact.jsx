import { useState } from 'react'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import PageHero from '../components/ui/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import Arrow from '../components/ui/Arrow.jsx'

const DETAILS = [
  { label: 'メール', value: 'info@nihon-kogei.example.com' },
  { label: '電話', value: '03-1234-5678（平日 10:00–18:00）' },
  { label: '所在地', value: '〒600-8001 京都府京都市中京区 工芸通一丁目' },
]

const FAQ = [
  { q: '工芸品は購入できますか？', a: '本サイトは工芸文化を紹介する目的で運営しています。購入をご希望の場合は、各職人・工房をご案内いたします。' },
  { q: '海外への発送は可能ですか？', a: '提携工房により対応が異なります。お問い合わせフォームより、ご希望の国と品目をお知らせください。' },
  { q: '取材や掲載の依頼をしたい', a: 'メディア関係のお問い合わせも歓迎しております。フォームの件名に「取材依頼」とご記入ください。' },
]

const FIELD =
  'w-full rounded-xl border border-ink/15 bg-paper/60 px-4 py-3 font-sans text-sm text-ink outline-none transition-colors duration-[250ms] ease-soft placeholder:text-ink/35 focus:border-gold'

export default function Contact() {
  useDocumentMeta({
    title: 'お問い合わせ',
    description:
      '日本の工芸品に関するご質問、取材や掲載のご依頼はこちらから。メール、電話、フォームにてお気軽にお問い合わせください。',
  })

  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend in this build — acknowledge locally.
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="お問い合わせ"
        breadcrumb="お問い合わせ"
        title="お気軽にご連絡ください"
        lede="工芸品や職人に関するご質問、ご依頼など、どのようなことでもお寄せください。二営業日以内にご返信いたします。"
      />

      <section className="bg-paper-texture section-pad" aria-labelledby="contact-heading">
        <div className="container-max grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          {/* Details */}
          <div>
            <Reveal>
              <h2 id="contact-heading" className="font-serif text-2xl font-semibold text-ink">
                連絡先
              </h2>
            </Reveal>
            <dl className="mt-8 space-y-7">
              {DETAILS.map((d, i) => (
                <Reveal as="div" key={d.label} delay={i * 90}>
                  <dt className="eyebrow mb-2">{d.label}</dt>
                  <dd className="font-sans text-ink/80">{d.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          {/* Form */}
          <Reveal delay={120}>
            {sent ? (
              <div
                role="status"
                className="flex h-full min-h-[20rem] flex-col items-center justify-center rounded-card bg-paper p-10 text-center shadow-card"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-ink font-serif text-2xl text-gold">
                  礼
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">お問い合わせありがとうございます</h3>
                <p className="mt-3 max-w-sm font-sans text-sm text-ink/60">
                  内容を確認のうえ、担当者より二営業日以内にご返信いたします。
                </p>
                <button className="btn-ghost group mt-8" onClick={() => setSent(false)}>
                  新しく入力する <Arrow />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-card bg-paper p-6 shadow-card sm:p-10" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-sans text-sm text-ink/70">
                      お名前 <span className="text-clay">*</span>
                    </label>
                    <input id="name" name="name" type="text" required autoComplete="name" className={FIELD} placeholder="山田 太郎" />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-sans text-sm text-ink/70">
                      メールアドレス <span className="text-clay">*</span>
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className={FIELD} placeholder="you@example.com" />
                  </div>
                </div>
                <div className="mt-5">
                  <label htmlFor="subject" className="mb-2 block font-sans text-sm text-ink/70">
                    件名
                  </label>
                  <input id="subject" name="subject" type="text" className={FIELD} placeholder="工芸品について" />
                </div>
                <div className="mt-5">
                  <label htmlFor="message" className="mb-2 block font-sans text-sm text-ink/70">
                    お問い合わせ内容 <span className="text-clay">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} className={`${FIELD} resize-none`} placeholder="ご質問やご依頼の内容をご記入ください。" />
                </div>
                <label className="mt-5 flex items-start gap-3 font-sans text-xs text-ink/60">
                  <input type="checkbox" required className="mt-1 h-4 w-4 accent-[color:var(--gold)]" />
                  <span>
                    <a href="/privacy" className="link-underline text-ink">プライバシーポリシー</a>
                    に同意します。
                  </span>
                </label>
                <button type="submit" className="btn-ink group mt-8 w-full justify-center sm:w-auto">
                  送信する <Arrow className="text-bg" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg section-pad" aria-labelledby="faq-heading">
        <div className="container-max max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">よくある質問</p>
            <h2 id="faq-heading" className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-semibold text-ink">
              お問い合わせの前に
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-ink/10">
            {FAQ.map((f, i) => (
              <Reveal as="details" key={f.q} delay={i * 80} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-ink">
                  {f.q}
                  <span className="text-gold transition-transform duration-[250ms] ease-soft group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 font-sans text-sm text-ink/65">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
