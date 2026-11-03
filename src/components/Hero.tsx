import { animate, createTimeline, stagger } from 'animejs'
import { ArrowDown, Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { floatingLabels, heroWords, site } from '../data/content'
import { prefersReducedMotion } from '../hooks/motion'
import { LinkButton, SplitChars } from './ui'

/** Cycles BUILD / SUPPORT / DEVELOP / SOLVE with a letter-by-letter mask reveal. */
function WordCycler() {
  const [i, setI] = useState(0)
  const wrap = useRef<HTMLSpanElement>(null)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    const el = wrap.current
    if (!el || reduced) return
    const letters = el.querySelectorAll('[data-l]')
    const inAnim = animate(letters, {
      translateY: ['110%', '0%'],
      duration: 700,
      delay: stagger(40),
      ease: 'outExpo',
    })
    let outAnim: ReturnType<typeof animate> | undefined
    const hold = window.setTimeout(() => {
      outAnim = animate(letters, {
        translateY: ['0%', '-110%'],
        duration: 450,
        delay: stagger(25),
        ease: 'inQuad',
        onComplete: () => setI((n) => (n + 1) % heroWords.length),
      })
    }, 1900)
    return () => {
      window.clearTimeout(hold)
      inAnim.pause()
      outAnim?.pause()
    }
  }, [i, reduced])

  const word = heroWords[i]
  return (
    <span className="inline-flex items-baseline gap-3 sm:gap-4" aria-live="off">
      <span className="font-serif text-fg/50 italic">I</span>
      <span ref={wrap} key={word} aria-label={`${word}.`} className="inline-flex overflow-hidden pb-1">
        {word.split('').map((c, n) => (
          <span key={n} data-l aria-hidden="true" className="text-gradient inline-block">
            {c}
          </span>
        ))}
        <span aria-hidden="true" className="inline-block text-blue">
          .
        </span>
      </span>
    </span>
  )
}

function Particles() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const dots = Array.from(root.children) as HTMLElement[]
    const anims = dots.map((d) =>
      animate(d, {
        translateX: () => (Math.random() - 0.5) * 60,
        translateY: () => (Math.random() - 0.5) * 80,
        opacity: [0.15, 0.6],
        duration: () => 4000 + Math.random() * 4000,
        delay: () => Math.random() * 2000,
        alternate: true,
        loop: true,
        ease: 'inOutSine',
      }),
    )
    return () => anims.forEach((a) => a.pause())
  }, [])
  const dots = Array.from({ length: 22 }, (_, n) => ({
    left: `${(n * 37 + 11) % 100}%`,
    top: `${(n * 53 + 7) % 100}%`,
    size: n % 4 === 0 ? 3 : 2,
  }))
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {dots.map((d, n) => (
        <span
          key={n}
          className="absolute rounded-full bg-blue/70"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, opacity: 0.25 }}
        />
      ))}
    </div>
  )
}

const consoleRows = [
  ['Microsoft 365', 'Exchange · Teams · SharePoint'],
  ['Identity & devices', 'Entra ID · Intune · Defender'],
  ['Infrastructure', 'LAN · Wi-Fi · VPN · Windows Server'],
  ['Development', 'PHP · MySQL · JavaScript · React'],
]

const labelPos: React.CSSProperties[] = [
  { top: -14, left: '8%' },
  { top: '18%', right: -28 },
  { top: '46%', right: -34 },
  { bottom: -14, left: '10%' },
  { bottom: '12%', right: -22 },
  { bottom: -14, right: '14%' },
]

function Console() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>('[data-row]').forEach((r) => (r.style.opacity = '1'))
      return
    }
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add(el, { opacity: [0, 1], translateY: [40, 0], duration: 1100 }, 900).add(
      el.querySelectorAll('[data-row]'),
      { opacity: [0, 1], translateX: [-14, 0], duration: 700, delay: stagger(110) },
      1300,
    )
    const labels = animate(el.querySelectorAll('[data-float]'), {
      translateY: [-8, 8],
      duration: 3600,
      alternate: true,
      loop: true,
      ease: 'inOutSine',
      delay: stagger(300),
    })
    return () => {
      tl.pause()
      labels.pause()
    }
  }, [])

  return (
    <div ref={ref} className="relative opacity-0 motion-reduce:opacity-100" aria-hidden="true">
      <div className="border border-line bg-surface/80 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <span className="mono-label">capabilities.sys</span>
        </div>
        <ul className="divide-y divide-line">
          {consoleRows.map(([k, v]) => (
            <li key={k} data-row className="flex items-center justify-between gap-6 py-4 pr-14 pl-4 opacity-0 motion-reduce:opacity-100">
              <div>
                <p className="font-display text-sm font-semibold">{k}</p>
                <p className="mono-label mt-1 normal-case tracking-normal">{v}</p>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 border-t border-line px-4 py-3">
          <span className="h-3 w-1.5 animate-pulse bg-blue" />
          <span className="mono-label normal-case tracking-normal">ready for the next project</span>
        </div>
      </div>
      {floatingLabels.map((l, n) => (
        <span
          key={l}
          data-float
          className="mono-label absolute border border-line bg-ink/90 px-2.5 py-1 normal-case tracking-normal text-fg/80"
          style={labelPos[n]}
        >
          {l}
        </span>
      ))}
    </div>
  )
}

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>('.hero-in').forEach((n) => (n.style.opacity = '1'))
      return
    }
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })
    tl.add('.hero-chars .char', { translateY: ['115%', '0%'], duration: 1100, delay: stagger(22) }, 200)
      .add('.hero-in', { opacity: [0, 1], translateY: [24, 0], duration: 900, delay: stagger(110) }, 700)
      .add('.hero-rule', { scaleX: [0, 1], duration: 1200 }, 500)
    return () => {
      tl.pause()
    }
  }, [])

  // Cursor-follow glow: transforms only, rAF throttled by anime's engine.
  useEffect(() => {
    const el = root.current
    const g = glow.current
    if (!el || !g || prefersReducedMotion()) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      animate(g, { translateX: e.clientX - r.left - 300, translateY: e.clientY - r.top - 300, duration: 900, ease: 'outQuad' })
    }
    el.addEventListener('pointermove', onMove)
    return () => el.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section
      id="home"
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pt-24 pb-24 sm:px-8"
    >
      <div aria-hidden="true" className="grid-bg absolute inset-0" />
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full opacity-30 blur-3xl max-md:hidden"
        style={{ background: 'radial-gradient(closest-side, #4f7cff55, transparent)' }}
      />
      <Particles />

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <div>
          <p className="hero-in mono-label mb-8 flex items-center gap-3 opacity-0 motion-reduce:opacity-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            Available for new projects · {site.location}
          </p>

          <h1 id="hero-title" className="font-display font-extrabold tracking-tight">
            <span className="hero-chars block text-[clamp(2.5rem,min(7.2vw,9.5vh),6.25rem)] leading-[0.98]">
              <SplitChars text="Technology that works." className="block" />
              <SplitChars text="Digital solutions" className="block font-serif font-normal italic text-fg/70" />
              <SplitChars text="that deliver." className="block" />
            </span>
          </h1>

          <div className="hero-rule my-7 h-px origin-left bg-gradient-to-r from-blue via-violet to-transparent" aria-hidden="true" />

          <div className="hero-in font-display text-[clamp(1.5rem,3.4vw,2.6rem)] font-extrabold tracking-tight opacity-0 motion-reduce:opacity-100">
            <WordCycler />
          </div>

          <p className="hero-in mt-6 max-w-xl text-base leading-relaxed text-mute opacity-0 sm:text-lg motion-reduce:opacity-100">
            I&apos;m Emmanuel Besa, an IT professional and developer focused on building digital solutions, supporting IT
            infrastructure, and helping businesses get more from technology.
          </p>

          <div className="hero-in mt-8 flex flex-wrap items-center gap-3 opacity-0 motion-reduce:opacity-100">
            <LinkButton href="#projects" arrow>
              View My Work
            </LinkButton>
            <LinkButton href="#contact" variant="ghost">
              Let&apos;s Work Together
            </LinkButton>
            <LinkButton href={site.cv} download variant="text" icon={<Download size={16} aria-hidden="true" />}>
              Download CV
            </LinkButton>
          </div>
        </div>

        <div className="hidden lg:block">
          <Console />
        </div>
      </div>

      <a
        href="#about"
        className="mono-label absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 hover:text-fg sm:flex"
      >
        Scroll
        <ArrowDown size={14} className="animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </a>
    </section>
  )
}
