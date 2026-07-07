// Central content source — Japanese-only, aligned with the PRD structure.

export const NAV_LINKS = [
  { label: 'ホーム', to: '/' },
  { label: '工芸品', to: '/#artifacts' },
  { label: '職人の技', to: '/#process' },
  { label: '美の哲学', to: '/#philosophy' },
  { label: 'ギャラリー', to: '/#gallery' },
  { label: '私たちについて', to: '/about' },
  { label: 'お問い合わせ', to: '/contact' },
]

export const ARTIFACTS = [
  { id: 'chawan', title: '茶碗', desc: '茶の湯を映す、侘び寂びの器。', img: '/images/chawan.webp' },
  { id: 'sensu', title: '京扇子', desc: '風を彩る、日本の美意識。', img: '/images/sensu.webp' },
  { id: 'shikki', title: '漆器', desc: '時を重ねて美しくなる、漆の器。', img: '/images/shikki.webp' },
  { id: 'katana', title: '日本刀の技', desc: '武士の魂、匠の技が宿る。', img: '/images/katana.webp' },
  { id: 'nomen', title: '能面', desc: '感情を超えた、美の表現。', img: '/images/nomen.webp' },
]

export const PROCESS_STEPS = [
  { no: '01', title: '土づくり', desc: '素材を選び、土の個性を引き出す。', img: '/images/p1.webp' },
  { no: '02', title: '成形', desc: '手や道具を使い、形を生み出す。', img: '/images/p2.webp' },
  { no: '03', title: '乾燥・素焼き', desc: '時間をかけて、土を強くする。', img: '/images/p3.webp' },
  { no: '04', title: '釉薬・絵付け', desc: '美しさを与え、想いを込める。', img: '/images/p4.webp' },
  { no: '05', title: '本焼成', desc: '炎と向き合い、完成へと導く。', img: '/images/p5.webp' },
]

export const HISTORY = [
  { year: '1600', title: '桃山の残響', desc: '茶の湯とともに、器の美が磨かれる。', img: '/images/chawan.webp' },
  { year: '1700', title: '町人文化', desc: '暮らしの中に、工芸の彩りが広がる。', img: '/images/sensu.webp' },
  { year: '1800', title: '技の円熟', desc: '各地の窯が、独自の表情を深める。', img: '/images/shikki.webp' },
  { year: '1900', title: '民藝の目', desc: '無名の職人の手仕事に、美が見出される。', img: '/images/g_basket.webp' },
  { year: '現在', title: '受け継ぐ手', desc: '伝統と現代が出会い、新たな美が生まれる。', img: '/images/katana.webp' },
]

export const GALLERY = [
  { id: 'g1', title: '茶の湯', span: 'tall', img: '/images/chawan.webp' },
  { id: 'g2', title: '鉄瓶', span: 'wide', img: '/images/g_teapot.webp' },
  { id: 'g3', title: '花入', span: 'base', img: '/images/g_pot.webp' },
  { id: 'g4', title: '藍染', span: 'tall', img: '/images/g_indigo.webp' },
  { id: 'g5', title: '竹細工', span: 'base', img: '/images/g_basket.webp' },
  { id: 'g6', title: '漆黒', span: 'wide', img: '/images/philobowl.webp' },
  { id: 'g7', title: '能面', span: 'base', img: '/images/nomen.webp' },
  { id: 'g8', title: '金彩', span: 'tall', img: '/images/shikki.webp' },
  { id: 'g9', title: '炎', span: 'base', img: '/images/p5.webp' },
]

export const FOOTER_COLUMNS = [
  {
    heading: '工芸品',
    links: ['茶道具', '陶磁器', '漆器', '木工品', '金工品', '染織品'],
  },
  {
    heading: '職人の技',
    links: ['工芸の工程', '素材について', '伝統の継承', '道具の紹介'],
  },
  {
    heading: '美の哲学',
    links: ['美意識', '侘び寂び', '自然との調和', '日本の心'],
  },
  {
    heading: 'サポート',
    links: [
      { label: 'よくある質問', to: '/contact' },
      { label: 'プライバシーポリシー', to: '/privacy' },
      { label: '利用規約', to: '/terms' },
      { label: 'お問い合わせ', to: '/contact' },
    ],
  },
]
