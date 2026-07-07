import { useRef } from 'react'
import Button from '../ui/Button.jsx'
import Petals from '../hero/Petals.jsx'

export default function Hero() {
  const stageRef = useRef(null)
  const artRef = useRef(null)

  // Subtle mouse parallax on the artwork (±desktop only, reduced-motion safe).
  const handleMove = (e) => {
    const stage = stageRef.current
    const art = artRef.current
    if (!stage || !art) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = stage.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    art.style.transform = `scale(1.05) translate3d(${(px * -14).toFixed(1)}px, ${(py * -10).toFixed(1)}px, 0)`
  }
  const handleLeave = () => {
    if (artRef.current) artRef.current.style.transform = 'scale(1.05)'
  }

  return (
    <section
      ref={stageRef}
      className="relative min-h-[100svh] overflow-hidden bg-bg"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Real hero artwork — LCP image, eager + high priority */}
      <img
        ref={artRef}
        src="/images/hero.webp"
        alt="金継ぎの茶碗と朝日、桜の枝"
        fetchpriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-[72%_center] transition-transform duration-500 ease-soft"
        style={{ animation: 'sunRise 2s cubic-bezier(0.16,1,0.3,1) both' }}
      />

      {/* Left paper scrim for text legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(247,244,239,0.94) 0%, rgba(247,244,239,0.82) 32%, rgba(247,244,239,0.32) 52%, rgba(247,244,239,0) 68%)',
        }}
      />

      <Petals />

      <div className="container-max relative grid min-h-[100svh] items-center pt-28 lg:pt-20">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow mb-6" style={{ animation: 'fadeUp 0.8s ease-soft 0.3s both' }}>
            日本の伝統工芸
          </p>
          <h1 className="font-serif text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.08] text-ink">
            <span className="block overflow-hidden">
              <span className="block" style={{ animation: 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
                日本の美
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block" style={{ animation: 'fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.7s both' }}>
                匠の心
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-md font-sans text-base leading-relaxed text-ink/75"
            style={{ animation: 'fadeUp 1s ease-soft 1s both' }}
          >
            受け継がれる伝統、磨き抜かれた技。
            <br />
            日本の工芸品が語る、美と心の物語。
          </p>

          <div className="mt-10" style={{ animation: 'fadeUp 1s ease-soft 1.2s both' }}>
            <Button href="#artifacts">工芸品を見る</Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-6 hidden flex-col items-center gap-3 sm:left-10 lg:flex">
        <span className="font-sans text-[10px] tracking-[0.35em] text-ink/50 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span className="h-16 w-px bg-ink/30" />
      </div>

      {/* Counter */}
      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-sans text-xs text-ink/50 lg:flex">
        <span className="text-ink">01</span>
        <span className="h-px w-8 bg-ink/30" />
        <span>03</span>
      </div>
    </section>
  )
}
