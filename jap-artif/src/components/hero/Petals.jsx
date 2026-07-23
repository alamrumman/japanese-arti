/** Drifting cherry petals — decorative, GPU transforms, reduced-motion safe. */
const PETALS = [
  { left: '12%', size: 12, delay: 0, dur: 15 },
  { left: '28%', size: 9, delay: 4, dur: 18 },
  { left: '46%', size: 14, delay: 8, dur: 16 },
  { left: '63%', size: 8, delay: 2, dur: 20 },
  { left: '78%', size: 11, delay: 6, dur: 17 },
  { left: '90%', size: 10, delay: 11, dur: 19 },
]

export default function Petals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 block"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.72,
            background: 'linear-gradient(135deg, #f7dfe4, #eab7c3)',
            borderRadius: '60% 0 60% 0',
            animation: `floatPetal ${p.dur}s linear ${p.delay}s infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
