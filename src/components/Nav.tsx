import { animate } from 'animejs'
import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import type { SectionId } from '../data/content'
import { prefersReducedMotion, useScrolled } from '../hooks/motion'

export function Nav({ active }: { active: SectionId }) {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLUListElement>(null)
  const indicator = useRef<HTMLSpanElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Skills has no nav item of its own; keep Experience highlighted.
  const current = active === 'skills' ? 'experience' : active

  const moveIndicator = useCallback(() => {
    const list = listRef.current
    const bar = indicator.current
    if (!list || !bar) return
    const link = list.querySelector<HTMLElement>(`[data-id="${current}"]`)
    if (!link) return
    const params = { translateX: link.offsetLeft, width: link.offsetWidth }
    if (prefersReducedMotion()) {
      Object.assign(bar.style, { transform: `translateX(${params.translateX}px)`, width: `${params.width}px` })
    } else {
      animate(bar, { ...params, duration: 500, ease: 'outExpo' })
    }
  }, [current])

  useLayoutEffect(moveIndicator, [moveIndicator])
  useEffect(() => {
    window.addEventListener('resize', moveIndicator)
    return () => window.removeEventListener('resize', moveIndicator)
  }, [moveIndicator])

  // Mobile menu: lock scroll, close on Escape, trap focus.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []).concat(menuButton.current!)
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
      if (e.key === 'Tab') {
        const items = focusables()
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    if (!prefersReducedMotion() && menuRef.current) {
      animate(menuRef.current.querySelectorAll('li'), {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: (_, i) => 60 + (i ?? 0) * 60,
        duration: 600,
        ease: 'outExpo',
      })
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-md border px-4 py-2.5 transition-all duration-500 ${
          scrolled || open
            ? 'border-line bg-ink/85 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a
          href="#home"
          aria-label="Emmanuel Besa - home"
          className="font-display text-xl font-extrabold tracking-tight"
        >
          EB<span className="text-blue">.</span>
        </a>

        <ul ref={listRef} className="relative hidden items-center md:flex">
          <span
            ref={indicator}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 -z-0 w-0 rounded-sm bg-white/[0.07]"
            style={{ willChange: 'transform, width' }}
          />
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                data-id={l.id}
                href={`#${l.id}`}
                aria-current={current === l.id ? 'true' : undefined}
                className={`relative block px-4 py-2 text-sm transition-colors ${
                  current === l.id ? 'text-fg' : 'text-mute hover:text-fg'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden bg-fg px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-white sm:inline-block"
          >
            Let&apos;s Talk
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid h-10 w-10 place-items-center border border-line md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-0 -z-10 flex flex-col justify-center bg-ink px-8 pt-20 md:hidden"
        >
          <ul className="space-y-2">
            {navLinks.map((l) => (
              <li key={l.id} className="opacity-0">
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-2 font-display text-5xl font-semibold tracking-tight ${
                    current === l.id ? 'text-fg' : 'text-mute'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="opacity-0 pt-6">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-block bg-fg px-6 py-3.5 text-sm font-medium text-ink"
              >
                Let&apos;s Talk
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
