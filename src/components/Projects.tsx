import { animate } from 'animejs'
import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/content'
import type { Project, ProjectCategory } from '../data/content'
import { prefersReducedMotion, useReveal } from '../hooks/motion'
import { ProjectArt } from './ProjectArt'
import { LinkButton, SectionHeading } from './ui'

const categories: ('All' | ProjectCategory)[] = ['All', 'Web Development', 'Software Development', 'IT Systems', 'Business Solutions']

function StatusBadge({ status }: { status: Project['status'] }) {
  const done = status === 'Completed'
  return (
    <span className="mono-label inline-flex items-center gap-2 bg-ink/85 px-2.5 py-1.5 text-fg/90">
      <span className={`h-1.5 w-1.5 rounded-full ${done ? 'bg-ok' : 'bg-violet'}`} aria-hidden="true" />
      {status}
    </span>
  )
}

function ProjectCard({ project, n, onOpen }: { project: Project; n: number; onOpen: (p: Project) => void }) {
  const art = useRef<HTMLDivElement>(null)
  const tilt = (on: boolean) => {
    if (!art.current || prefersReducedMotion()) return
    animate(art.current, { scale: on ? 1.05 : 1, duration: 700, ease: 'outExpo' })
  }
  return (
    <article
      className={`group reveal ${n % 2 === 1 ? 'md:mt-20' : ''}`}
      onMouseEnter={() => tilt(true)}
      onMouseLeave={() => tilt(false)}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        onFocus={() => tilt(true)}
        onBlur={() => tilt(false)}
        aria-label={`View project: ${project.title}`}
        className="block w-full text-left"
      >
        <div className="relative aspect-[16/10] overflow-hidden border border-line">
          <div ref={art} className="h-full w-full">
            <ProjectArt kind={project.art} title={project.title} />
          </div>
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={project.status} />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <p className="mono-label text-blue">{project.category}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-2 max-w-lg text-mute">{project.summary}</p>
          </div>
          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center border border-line transition-colors group-hover:border-blue group-hover:bg-blue">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="border border-line px-2.5 py-1 font-mono text-xs text-fg/75">
              {s}
            </li>
          ))}
        </ul>
      </button>
    </article>
  )
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    if (project && !d.open) {
      d.showModal()
      if (!prefersReducedMotion()) {
        animate(d.querySelector('[data-panel]')!, { opacity: [0, 1], translateY: [30, 0], duration: 600, ease: 'outExpo' })
      }
    }
    if (!project && d.open) d.close()
  }, [project])

  return (
    <dialog
      ref={dialog}
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose()
      }}
      className="m-auto max-h-[92svh] w-[min(56rem,94vw)] overflow-y-auto border border-line bg-surface p-0 text-fg"
    >
      {project && (
        <div data-panel>
          <div className="relative aspect-[16/9] border-b border-line">
            <ProjectArt kind={project.art} title={project.title} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-3 right-3 grid h-10 w-10 place-items-center bg-ink/90 hover:bg-ink"
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="mono-label text-blue">{project.category}</p>
              <h3 id="project-modal-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-mute">{project.summary}</p>
              <p className="mono-label mt-8 mb-3">Scope</p>
              <ul className="space-y-2">
                {project.scope.map((s) => (
                  <li key={s} className="flex gap-3 text-fg/90">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-blue" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <dl className="space-y-6 border-t border-line pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
              <div>
                <dt className="mono-label mb-2">Status</dt>
                <dd>
                  <StatusBadge status={project.status} />
                </dd>
              </div>
              <div>
                <dt className="mono-label mb-2">Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt className="mono-label mb-2">Stack</dt>
                <dd className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="border border-line px-2.5 py-1 font-mono text-xs">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <LinkButton
                href={`mailto:besaemmanuel99@gmail.com?subject=${encodeURIComponent(`Question about ${project.title}`)}`}
                variant="ghost"
                arrow
                className="w-full"
              >
                Ask about this project
              </LinkButton>
            </dl>
          </div>
        </div>
      )}
    </dialog>
  )
}

export function Projects() {
  const root = useRef<HTMLElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  useReveal(root, { step: 110 })
  const [filter, setFilter] = useState<(typeof categories)[number]>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const visible = projects.filter((p) => filter === 'All' || p.category === filter)

  const firstRun = useRef(true)
  useEffect(() => {
    // The initial entrance is handled by useReveal; only re-animate when the filter changes.
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    if (!grid.current || prefersReducedMotion()) return
    const a = animate(grid.current.children, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 600,
      delay: (_, i) => (i ?? 0) * 70,
      ease: 'outExpo',
    })
    return () => {
      a.pause()
    }
  }, [filter])

  return (
    <section id="projects" ref={root} aria-labelledby="projects-title" className="px-5 py-28 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading id="projects-title" index="03" eyebrow="Selected work">
          Projects <span className="font-serif font-normal text-fg/60 italic">built and in progress.</span>
        </SectionHeading>

        <div role="group" aria-label="Filter projects by category" className="reveal mb-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`border px-4 py-2 font-mono text-xs transition-colors ${
                filter === c ? 'border-fg bg-fg text-ink' : 'border-line text-mute hover:border-fg/40 hover:text-fg'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div ref={grid} className="grid gap-x-8 gap-y-16 md:grid-cols-2" aria-live="polite">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} n={i} onOpen={setOpen} />
          ))}
        </div>
      </div>
      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </section>
  )
}
