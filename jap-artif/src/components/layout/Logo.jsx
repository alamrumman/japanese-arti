/** Wordmark: seal-style mark + Japanese lockup. */
export default function Logo({ light = false, className = '' }) {
  const ink = light ? '#F7F4EF' : '#1A1A1A'
  const sub = light ? 'rgba(247,244,239,0.6)' : 'rgba(26,26,26,0.55)'
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" width="34" height="34" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="37" height="37" rx="7" stroke={ink} strokeWidth="1.4" />
        <path d="M20 8v24M11 15h18M13 24c4 3 10 3 14 0" stroke={ink} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2.4" fill="var(--gold)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-[0.14em]" style={{ color: ink }}>
          日本の工芸品
        </span>
        <span className="mt-1 font-sans text-[10px] tracking-[0.3em]" style={{ color: sub }}>
          匠の技と美の世界
        </span>
      </span>
    </span>
  )
}
