import { Link } from 'react-router-dom'
import { FOOTER_COLUMNS } from '../../data/site.js'
import Logo from './Logo.jsx'

const SOCIALS = ['Instagram', 'Facebook', 'X', 'YouTube']

export default function Footer() {
  return (
    <footer className="bg-dark text-bg">
      <div className="container-max grid gap-12 py-20 md:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-6 font-sans text-sm leading-relaxed text-bg/60">
            日本の伝統工芸の魅力と、職人たちの想いを世界に伝えます。
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-serif text-sm font-medium tracking-widest text-gold">
              {col.headingTo ? (
                <Link to={col.headingTo} className="hover:opacity-80 transition-opacity duration-200">
                  {col.heading}
                </Link>
              ) : (
                col.heading
              )}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => {
                const item = typeof link === 'string' ? { label: link } : link
                return (
                  <li key={item.label}>
                    {item.to ? (
                      <Link to={item.to} className="link-underline font-sans text-sm text-bg/60 hover:text-bg">
                        {item.label}
                      </Link>
                    ) : (
                      <span className="font-sans text-sm text-bg/60">{item.label}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <p className="font-sans text-xs text-bg/45">© 2024 日本の工芸品. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  aria-label={s}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-sans text-[10px] text-bg/70 transition-colors duration-[250ms] ease-soft hover:border-gold hover:text-gold"
                >
                  {s[0]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
