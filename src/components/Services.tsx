import { animate } from 'animejs'
import { Boxes, Cloud, Code, Compass, Globe, KeyRound, Network, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useRef } from 'react'
import { services } from '../data/content'
import type { ServiceIcon } from '../data/content'
import { prefersReducedMotion, useReveal } from '../hooks/motion'
import { SectionHeading } from './ui'

const icons: Record<ServiceIcon, LucideIcon> = {
  web: Globe,
  software: Code,
  infra: Network,
  m365: Cloud,
  consulting: Compass,
  supply: Package,
  licensing: KeyRound,
}

function ServiceCard({ icon, title, text, n, wide }: { icon: ServiceIcon; title: string; text: string; n: number; wide: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const Icon = icons[icon] ?? Boxes

  const hover = (on: boolean) => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    animate(el.querySelector('[data-line]')!, { scaleX: on ? 1 : 0, duration: 600, ease: 'outExpo' })
    animate(el.querySelector('[data-icon]')!, { translateY: on ? -4 : 0, duration: 400, ease: 'outQuad' })
  }

  return (
    <article
      ref={ref}
      tabIndex={0}
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}
      onFocus={() => hover(true)}
      onBlur={() => hover(false)}
      className={`reveal group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-7 transition-colors hover:bg-raise sm:p-8 ${
        wide ? 'md:col-span-2' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span data-icon className="text-blue">
          <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="mono-label">{String(n).padStart(2, '0')}</span>
      </div>
      <div className="mt-16">
        <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-md leading-relaxed text-mute">{text}</p>
      </div>
      <span
        data-line
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue to-violet"
      />
    </article>
  )
}

export function Services() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { step: 70 })
  // Asymmetric rhythm: cards 1 and 6 span two columns on md+ (3-col grid).
  const wideAt = new Set([0, 5])

  return (
    <section id="services" ref={root} aria-labelledby="services-title" className="bg-surface/40 px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="services-title" index="02" eyebrow="Services">
          What I can do <span className="font-serif font-normal text-fg/60 italic">for your business.</span>
        </SectionHeading>
        <div className="grid gap-px md:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} n={i + 1} wide={wideAt.has(i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
