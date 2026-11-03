import { animate, stagger } from 'animejs'
import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import type { SectionId } from '../data/content'

const query = '(prefers-reduced-motion: reduce)'

/** True when the visitor asked the OS for reduced motion. Safe to call outside React. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(query).matches

/** Marks <html> so CSS only hides `.reveal` elements when animations will actually run. */
export function initMotionClass() {
  if (!prefersReducedMotion()) document.documentElement.classList.add('motion')
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * Staggered scroll reveal. Every `.reveal` descendant of the ref fades and rises
 * once the container enters the viewport. Runs once; cleans up on unmount.
 */
export function useReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: { distance?: number; delay?: number; step?: number } = {},
) {
  const { distance = 28, delay = 0, step = 90 } = options
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = Array.from(root.querySelectorAll<HTMLElement>('.reveal'))
    if (prefersReducedMotion() || targets.length === 0) {
      targets.forEach((t) => (t.style.opacity = '1'))
      return
    }
    let anim: ReturnType<typeof animate> | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        anim = animate(targets, {
          opacity: [0, 1],
          translateY: [distance, 0],
          duration: 900,
          delay: stagger(step, { start: delay }),
          ease: 'outExpo',
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      anim?.pause()
    }
  }, [ref, distance, delay, step])
}

/** Counts a number up when the element scrolls into view. */
export function useCountUp(target: number) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = String(target)
      return
    }
    const state = { v: 0 }
    let anim: ReturnType<typeof animate> | undefined
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        anim = animate(state, {
          v: target,
          duration: 1600,
          ease: 'outExpo',
          onUpdate: () => {
            el.textContent = String(Math.round(state.v))
          },
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      anim?.pause()
    }
  }, [target])
  return ref
}

/** Tracks which section is under the top third of the viewport. */
export function useActiveSection(ids: SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id as SectionId)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}
