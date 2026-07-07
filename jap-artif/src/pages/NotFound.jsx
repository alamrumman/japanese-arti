import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  useDocumentMeta({ title: 'ページが見つかりません', description: 'お探しのページは見つかりませんでした。' })
  return (
    <section className="flex min-h-[80svh] items-center bg-paper-texture">
      <div className="container-max flex flex-col items-center text-center">
        <p className="font-serif text-[clamp(5rem,18vw,12rem)] font-semibold leading-none text-gold">四〇四</p>
        <h1 className="mt-6 font-serif text-2xl font-semibold text-ink">ページが見つかりません</h1>
        <p className="mt-4 max-w-md font-sans text-sm text-ink/60">
          お探しのページは移動または削除された可能性があります。
        </p>
        <div className="mt-10">
          <Button to="/">ホームへ戻る</Button>
        </div>
      </div>
    </section>
  )
}
