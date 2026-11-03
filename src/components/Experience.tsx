import { animate } from 'animejs'
import { useEffect, useRef } from 'react'
import { experience } from '../data/content'
import { prefersReducedMotion, useReveal } from '../hooks/motion'
import { SectionHeading } from './ui'

export function Experience() {
  const root = useRef<HTMLElement>(null)
  const headRef = useRef<HTMLDivElement>(null)
  useReveal(headRef)

  // Timeline: the spine draws down, then each entry reveals as it scrolls into view.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const entries = Array.from(el.querySelectorAll<HTMLElement>('[data-entry]'))
    const spine = el.querySelector<HTMLElement>('[data-spine]')
    if (prefersReducedMotion()) {
      entries.forEach((e) => (e.style.opacity = '1'))
      return
    }
    const anims: ReturnType<typeof animate>[] = []
    const io = new IntersectionObserver(
      (items) => {
        items.forEach((it) => {
          if (!it.isIntersecting) return
          io.unobserve(it.target)
          const t = it.target as HTMLElement
          if (t === spine) {
            anims.push(animate(t, { scaleY: [0, 1], duration: 2200, ease: 'inOutQuad' }))
          } else {
            anims.push(animate(t, { opacity: [0, 1], translateY: [30, 0], duration: 900, ease: 'outExpo' }))
            const dot = t.querySelector('[data-dot]')
            if (dot) anims.push(animate(dot, { scale: [0, 1], duration: 600, ease: 'outBack' }))
          }
        })
      },
      { threshold: 0.15 },
    )
    if (spine) io.observe(spine)
    entries.forEach((e) => io.observe(e))
    return () => {
      io.disconnect()
      anims.forEach((a) => a.pause())
    }
  }, [])

  return (
    <section id="experience" ref={root} aria-labelledby="experience-title" className="bg-surface/40 px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div ref={headRef}>
          <SectionHeading id="experience-title" index="04" eyebrow="Experience">
            Where I&apos;ve <span className="font-serif font-normal text-fg/60 italic">put the work in.</span>
          </SectionHeading>
        </div>

        <ol className="relative ml-2 md:ml-0">
          <span
            data-spine
            aria-hidden="true"
            className="absolute top-2 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-blue via-violet to-line md:left-[calc(25%-1px)]"
          />
          {experience.map((job) => (
            <li
              key={job.org + job.period}
              data-entry
              className="relative grid gap-4 pb-20 pl-8 opacity-0 last:pb-0 motion-reduce:opacity-100 md:grid-cols-4 md:gap-10 md:pl-0"
            >
              <span
                data-dot
                aria-hidden="true"
                className={`absolute top-2 left-0 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blue md:left-[25%] ${
                  job.current ? 'bg-blue' : 'bg-ink'
                }`}
              />
              <div className="md:pr-10 md:text-right">
                <p className="font-mono text-sm text-blue">{job.period}</p>
                {job.current && <p className="mono-label mt-2 text-ok">Current role</p>}
              </div>
              <div className="md:col-span-3 md:pl-10">
                <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{job.org}</h3>
                <p className="mt-1 font-serif text-xl text-fg/70 italic">{job.role}</p>
                <ul className="mt-6 max-w-3xl space-y-3 text-mute">
                  {job.points.map((p) => (
                    <li key={p} className="flex gap-3 leading-relaxed">
                      <span className="mt-3 h-px w-3 shrink-0 bg-mute/60" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
