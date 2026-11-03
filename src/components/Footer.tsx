import { ArrowUp } from 'lucide-react'
import { navLinks, site } from '../data/content'
import { BrandIcon } from './ui'

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pt-16 pb-10 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight">
            Emmanuel Besa<span className="text-blue">.</span>
          </p>
          <p className="mt-4 max-w-sm text-mute">{site.statement}</p>
        </div>

        <nav aria-label="Footer">
          <p className="mono-label mb-4">Navigate</p>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-fg/80 hover:text-blue">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-label mb-4">Elsewhere</p>
          <ul className="space-y-2.5">
            <li>
              <a href={`mailto:${site.email}`} className="text-fg/80 hover:text-blue">
                Email
              </a>
            </li>
            <li>
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fg/80 hover:text-blue">
                <BrandIcon name="whatsapp" size={14} /> WhatsApp<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {([['linkedin', 'LinkedIn', site.linkedin], ['github', 'GitHub', site.github]] as const).map(([n, label, href]) => (
              <li key={n}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-fg/80 hover:text-blue">
                    <BrandIcon name={n} size={14} /> {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-mute/60">
                    <BrandIcon name={n} size={14} /> {label} (soon)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="text-sm text-mute">
          &copy; {new Date().getFullYear()} Emmanuel Besa. All rights reserved. Lusaka, Zambia.
        </p>
        <a href="#home" className="inline-flex items-center gap-2 border border-line px-4 py-2 text-sm hover:border-blue hover:text-blue">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
