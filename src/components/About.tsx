import { useRef } from 'react'
import { skillGroups, stats } from '../data/content'
import { useCountUp, useReveal } from '../hooks/motion'
import { SectionHeading } from './ui'

// Drop a photo at src/assets/profile.jpg (or .png/.webp) and it replaces the placeholder automatically.
const photos = import.meta.glob('../assets/profile.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>
const photo = Object.values(photos)[0]

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value)
  return (
    <div className="reveal border-t border-line pt-5">
      <p className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        <span ref={ref}>{value}</span>
        <span className="text-blue">{suffix}</span>
      </p>
      <p className="mono-label mt-3">{label}</p>
    </div>
  )
}

export function About() {
  const root = useRef<HTMLElement>(null)
  useReveal(root)
  const highlights = [skillGroups[0].items.slice(0, 4), skillGroups[1].items, skillGroups[2].items.slice(0, 4)].flat()

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="about-title" index="01" eyebrow="About">
          More than IT support.{' '}
          <span className="font-serif font-normal text-fg/60 italic">I build and manage technology.</span>
        </SectionHeading>

        <div className="grid gap-14 lg:grid-cols-12">
<figure className="reveal lg:col-span-4">
  <div className="relative aspect-[4/5] overflow-hidden border border-line bg-surface">
    <img
      src="/images/Besa Suit.jpg"
      alt="Portrait of Emmanuel Besa"
      loading="lazy"
      decoding="async"
      className="h-full w-full object-cover"
    />

    <figcaption className="mono-label absolute bottom-0 left-0 bg-ink/90 px-3 py-2">
      Lusaka, Zambia
    </figcaption>
  </div>
</figure>

          <div className="lg:col-span-8 lg:pl-10">
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-mute">
              <p className="reveal text-xl text-fg sm:text-2xl">
                I am an IT professional with experience across IT infrastructure, Microsoft 365 administration, web
                development, software development, and technical support.
              </p>
              <p className="reveal">
                My work combines practical IT operations with software development, allowing me to support users, manage
                systems, and build solutions that improve business processes.
              </p>
              <p className="reveal">
                I have worked in non-profit, education, and private-sector environments, supporting users, maintaining
                systems, and developing technology solutions.
              </p>
            </div>

            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>

            <div className="reveal mt-14">
              <p className="mono-label mb-4">Technical highlights</p>
              <ul className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <li key={h} className="border border-line px-3 py-1.5 font-mono text-xs text-fg/80">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
