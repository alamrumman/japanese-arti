import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../data/site.js'
import { useScrollDirection } from '../../hooks/useScrollDirection.js'
import Logo from './Logo.jsx'

export default function Navbar() {
  const { scrolled } = useScrollDirection()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-soft
          ${scrolled ? 'bg-bg/80 shadow-[0_1px_0_rgba(26,26,26,0.06)] backdrop-blur-md' : 'bg-transparent'}`}
      >
        <nav className="container-max flex items-center justify-between py-4" aria-label="メインナビゲーション">
          <Link to="/" aria-label="ホームへ" onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                {l.to.startsWith('/#') ? (
                  <a href={l.to} className="link-underline font-sans text-sm text-ink/80 hover:text-ink">
                    {l.label}
                  </a>
                ) : (
                  <Link to={l.to} className="link-underline font-sans text-sm text-ink/80 hover:text-ink">
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1 rounded-full border border-ink/15 px-3 py-1.5 font-sans text-xs text-ink/70 sm:flex">
              JP
              <svg viewBox="0 0 10 6" width="9" height="6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.2" />
              </svg>
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 lg:hidden"
              aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 top-1.5 block h-px w-4 bg-ink transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-ink transition-all duration-300 ${menuOpen ? 'top-1.5 -rotate-45' : 'top-3'}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper-texture transition-[opacity,visibility] duration-500 ease-soft lg:hidden
          ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
      >
        <ul className="flex h-full flex-col items-center justify-center gap-7">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.label}
              style={{ transitionDelay: menuOpen ? `${120 + i * 60}ms` : '0ms' }}
              className={`transition-all duration-500 ease-soft ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              {l.to.startsWith('/#') ? (
                <a href={l.to} onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-ink">
                  {l.label}
                </a>
              ) : (
                <Link to={l.to} onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-ink">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
