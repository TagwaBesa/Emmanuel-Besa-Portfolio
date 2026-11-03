import { useRef } from 'react'
import { skillGroups } from '../data/content'
import { useReveal } from '../hooks/motion'
import { SectionHeading } from './ui'

export function Skills() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { step: 80 })
  return (
    <section id="skills" ref={root} aria-labelledby="skills-title" className="px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="skills-title" index="05" eyebrow="Technical skills">
          The toolkit <span className="font-serif font-normal text-fg/60 italic">behind the work.</span>
        </SectionHeading>

        <div className="divide-y divide-line border-y border-line">
          {skillGroups.map((g, i) => (
            <div key={g.title} className="reveal grid gap-6 py-8 md:grid-cols-[1fr_2.2fr] md:gap-12">
              <h3 className="flex items-baseline gap-4 font-display text-xl font-semibold tracking-tight">
                <span className="mono-label text-blue">{String(i + 1).padStart(2, '0')}</span>
                {g.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <li
                    key={s}
                    className="border border-line px-3.5 py-2 text-sm text-fg/85 transition-colors hover:border-blue hover:bg-blue/10 hover:text-fg"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
