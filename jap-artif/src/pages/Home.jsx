import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import FeaturedArtifacts from '../components/sections/FeaturedArtifacts.jsx'
import MakingProcess from '../components/sections/MakingProcess.jsx'
import History from '../components/sections/History.jsx'
import Gallery from '../components/sections/Gallery.jsx'
import Philosophy from '../components/sections/Philosophy.jsx'
import CTA from '../components/sections/CTA.jsx'

export default function Home() {
  useDocumentMeta({
    title: '匠の技と美の世界',
    description:
      '受け継がれる伝統と、磨き抜かれた匠の技。日本の工芸品が語る美と心の物語を、静かな美術館のように巡る体験。',
  })
  return (
    <>
      <Hero />
      <About />
      <FeaturedArtifacts />
      <MakingProcess />
      <History />
      <Gallery />
      <Philosophy />
      <CTA />
    </>
  )
}
