import { animate } from 'animejs'
import { ArrowUpRight } from 'lucide-react'
import { useRef } from 'react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { prefersReducedMotion } from '../hooks/motion'

/** Splits text into per-letter spans (aria-hidden) with an accessible label on the wrapper. */
export function SplitChars({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span aria-label={text} className={className}>
      {text.split(' ').map((word, wi, arr) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split('').map((ch, ci) => (
            <span key={ci} className="char-wrap inline-block overflow-hidden align-bottom">
              <span className="char">{ch}</span>
            </span>
          ))}
          {wi < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

type Variant = 'primary' | 'ghost' | 'text'

const base =
  'group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide transition-colors select-none'
const variants: Record<Variant, string> = {
  primary: 'bg-fg text-ink hover:bg-white',
  ghost: 'border border-line text-fg hover:border-fg/40',
  text: 'px-0 py-1 text-mute hover:text-fg',
}

/** Subtle magnetic nudge on hover, driven by anime.js. */
function useNudge<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const onEnter = () => {
    if (prefersReducedMotion() || !ref.current) return
    animate(ref.current.querySelectorAll('[data-arrow]'), { translateX: 4, translateY: -4, duration: 300, ease: 'outQuad' })
  }
  const onLeave = () => {
    if (prefersReducedMotion() || !ref.current) return
    animate(ref.current.querySelectorAll('[data-arrow]'), { translateX: 0, translateY: 0, duration: 400, ease: 'outQuad' })
  }
  return { ref, onMouseEnter: onEnter, onMouseLeave: onLeave, onFocus: onEnter, onBlur: onLeave }
}

interface CommonProps {
  variant?: Variant
  icon?: ReactNode
  arrow?: boolean
  children: ReactNode
  className?: string
}

export function LinkButton({
  variant = 'primary',
  icon,
  arrow,
  children,
  className = '',
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const nudge = useNudge<HTMLAnchorElement>()
  return (
    <a {...rest} {...nudge} className={`${base} ${variants[variant]} ${className}`}>
      {icon}
      {children}
      {arrow && <ArrowUpRight data-arrow size={16} aria-hidden="true" />}
    </a>
  )
}

export function Button({
  variant = 'primary',
  icon,
  arrow,
  children,
  className = '',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const nudge = useNudge<HTMLButtonElement>()
  return (
    <button {...rest} {...nudge} className={`${base} ${variants[variant]} disabled:opacity-60 ${className}`}>
      {icon}
      {children}
      {arrow && <ArrowUpRight data-arrow size={16} aria-hidden="true" />}
    </button>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  children,
  id,
}: {
  index: string
  eyebrow: string
  children: ReactNode
  id: string
}) {
  return (
    <div className="mb-14 md:mb-20">
      <p className="reveal mono-label mb-5 flex items-center gap-3">
        <span className="text-blue">{index}</span>
        <span className="h-px w-10 bg-line" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="reveal max-w-4xl font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl"
      >
        {children}
      </h2>
    </div>
  )
}

export function BrandIcon({ name, size = 18 }: { name: 'github' | 'linkedin' | 'whatsapp'; size?: number }) {
  const paths: Record<string, string> = {
    github:
      'M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z',
    linkedin:
      'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
    whatsapp:
      'M12.04 2a9.9 9.9 0 0 0-8.4 15.1L2 22l5-1.6A9.9 9.9 0 1 0 12.04 2Zm5.8 14.1c-.25.7-1.45 1.34-2 1.4-.52.06-1.18.09-1.9-.12a17 17 0 0 1-1.73-.64c-3.04-1.3-5-4.37-5.16-4.58-.15-.2-1.24-1.65-1.24-3.15 0-1.5.78-2.24 1.06-2.55.28-.3.6-.38.8-.38l.58.01c.19 0 .43-.07.67.5.25.6.84 2.06.91 2.2.07.16.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.53-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.13 1 2.09 1.32 2.39 1.47.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.74.82 2.04.97.3.15.5.22.57.35.07.12.07.72-.18 1.42Z',
  }
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  )
}
