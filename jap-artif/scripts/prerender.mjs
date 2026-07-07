// Post-build prerender: render each route to static HTML so the browser paints
// content immediately (fast FCP/LCP) instead of waiting for the JS bundle.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const { render } = await import(pathToFileURL(resolve(root, 'dist-server/entry-server.js')).href)
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')

const SITE = '日本の工芸品'
const META = {
  '/': { title: `${SITE} — 匠の技と美の世界`, desc: '受け継がれる伝統と、磨き抜かれた匠の技。日本の工芸品が語る美と心の物語を、静かな美術館のように巡る体験。' },
  '/about': { title: `私たちについて — ${SITE}`, desc: '日本の伝統工芸の魅力と、職人たちの想いを世界に伝える「日本の工芸品」。素材への敬意、手仕事の時間、未来への継承という理念をご紹介します。' },
  '/contact': { title: `お問い合わせ — ${SITE}`, desc: '日本の工芸品に関するご質問、取材や掲載のご依頼はこちらから。メール、電話、フォームにてお気軽にお問い合わせください。' },
  '/privacy': { title: `プライバシーポリシー — ${SITE}`, desc: '日本の工芸品における個人情報の取り扱い、利用目的、クッキーの使用、開示・訂正・削除の手続きについてのご案内。' },
  '/terms': { title: `利用規約 — ${SITE}`, desc: '日本の工芸品のサービス利用条件、禁止事項、知的財産権、免責事項、準拠法などを定めた利用規約です。' },
}

const routes = Object.keys(META)

for (const url of routes) {
  const appHtml = render(url)
  const meta = META[url]

  let html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/(<meta name="description" content=").*?("\s*\/>)/, `$1${meta.desc}$2`)

  const outDir = url === '/' ? resolve(root, 'dist') : resolve(root, 'dist' + url)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  console.log('prerendered', url, '→', appHtml.length, 'bytes')
}
