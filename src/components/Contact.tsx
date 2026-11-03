import { CheckCircle2, Mail, MapPin, Phone, Send, TriangleAlert } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { services, site } from '../data/content'
import { useReveal } from '../hooks/motion'
import { BrandIcon, Button } from './ui'

type Fields = { name: string; email: string; service: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'error' | 'mailto'

// Set VITE_FORM_ENDPOINT to a Formspree form URL (https://formspree.io/f/xxxx) to deliver submissions by email.
const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

const validate = (v: Fields): Errors => {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Please enter a valid email address.'
  if (!v.service) e.service = 'Please choose a service.'
  if (v.message.trim().length < 10) e.message = 'Please tell me a little more (at least 10 characters).'
  return e
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mono-label mb-2 block">
        {label}
      </label>
      {children}
      <p id={`${id}-err`} role={error ? 'alert' : undefined} className="mt-1.5 min-h-5 text-sm text-[#ff8a8a]">
        {error}
      </p>
    </div>
  )
}

const inputCls =
  'w-full border border-line bg-surface px-4 py-3.5 text-fg placeholder:text-mute/60 transition-colors focus:border-blue focus:outline-none aria-[invalid=true]:border-[#ff8a8a]'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  useReveal(root, { step: 100 })
  const uid = useId()
  const [values, setValues] = useState<Fields>({ name: '', email: '', service: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (errors[k]) setErrors((p) => ({ ...p, [k]: validate(next)[k] }))
  }
  const blur = (k: keyof Fields) => () => setErrors((p) => ({ ...p, [k]: validate(values)[k] }))

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      root.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    if (!endpoint) {
      // No email service configured: hand the message to the visitor's mail app instead of faking a send.
      const body = `${values.message}\n\nFrom: ${values.name} <${values.email}>\nService: ${values.service}`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Enquiry: ${values.service}`)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, _subject: `Portfolio enquiry: ${values.service}` }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('success')
      setValues({ name: '', email: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const id = (k: string) => `${uid}-${k}`
  const common = (k: keyof Fields) => ({
    id: id(k),
    'aria-invalid': errors[k] ? (true as const) : undefined,
    'aria-describedby': `${id(k)}-err`,
    onBlur: blur(k),
    onChange: set(k),
    value: values[k],
  })

  return (
    <section id="contact" ref={root} aria-labelledby="contact-title" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      <div aria-hidden="true" className="absolute -right-40 -bottom-40 h-[520px] w-[520px] rounded-full bg-violet/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="reveal mono-label mb-5 flex items-center gap-3">
            <span className="text-blue">06</span>
            <span className="h-px w-10 bg-line" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="reveal font-display text-5xl leading-[1] font-semibold tracking-tight sm:text-6xl md:text-7xl">
            Have a project?{' '}
            <span className="font-serif font-normal text-fg/60 italic">Let&apos;s make it happen.</span>
          </h2>

          <ul className="mt-12 space-y-5">
            <li className="reveal">
              <a href={`mailto:${site.email}`} className="group flex items-center gap-4 hover:text-blue">
                <Mail size={20} className="text-blue" aria-hidden="true" />
                <span>{site.email}</span>
              </a>
            </li>
            {site.phones.map((p) => (
              <li key={p.href} className="reveal">
                <a href={p.href} className="flex items-center gap-4 hover:text-blue">
                  <Phone size={20} className="text-blue" aria-hidden="true" />
                  <span>{p.label}</span>
                </a>
              </li>
            ))}
            <li className="reveal">
              <a href={site.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-4 hover:text-blue">
                <span className="text-blue">
                  <BrandIcon name="whatsapp" size={20} />
                </span>
                <span>
                  WhatsApp <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
            <li className="reveal flex items-center gap-4">
              <MapPin size={20} className="text-blue" aria-hidden="true" />
              <span>{site.location}</span>
            </li>
          </ul>

          <div className="reveal mt-10 flex gap-3">
            <SocialChip name="linkedin" label="LinkedIn" href={site.linkedin} />
            <SocialChip name="github" label="GitHub" href={site.github} />
          </div>
        </div>

        <form onSubmit={submit} noValidate className="reveal border border-line bg-surface/70 p-6 backdrop-blur-sm sm:p-10 lg:col-span-7">
          <div className="grid gap-x-6 sm:grid-cols-2">
            <Field label="Name" id={id('name')} error={errors.name}>
              <input type="text" autoComplete="name" required placeholder="Your name" className={inputCls} {...common('name')} />
            </Field>
            <Field label="Email" id={id('email')} error={errors.email}>
              <input type="email" autoComplete="email" required placeholder="you@company.com" className={inputCls} {...common('email')} />
            </Field>
          </div>
          <Field label="Service required" id={id('service')} error={errors.service}>
            <select required className={inputCls} {...common('service')}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
          </Field>
          <Field label="Message" id={id('message')} error={errors.message}>
            <textarea rows={5} required placeholder="Tell me about your project or what you need help with" className={`${inputCls} resize-y`} {...common('message')} />
          </Field>

          {/* Honeypot for bots; hidden from people and assistive tech. */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Leave this empty
              <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-5">
            <Button type="submit" disabled={status === 'sending'} icon={<Send size={16} aria-hidden="true" />}>
              {status === 'sending' ? 'Sending...' : 'Send message'}
            </Button>
            <div aria-live="polite" className="text-sm">
              {status === 'success' && (
                <p className="flex items-center gap-2 text-ok">
                  <CheckCircle2 size={18} aria-hidden="true" /> Thank you. Your message was sent and I&apos;ll reply soon.
                </p>
              )}
              {status === 'mailto' && (
                <p className="flex items-center gap-2 text-mute">
                  <CheckCircle2 size={18} aria-hidden="true" /> Your email app should open with the message ready to send.
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-[#ff8a8a]">
                  <TriangleAlert size={18} aria-hidden="true" /> Something went wrong. Please try again or email{' '}
                  <a className="underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

function SocialChip({ name, label, href }: { name: 'github' | 'linkedin'; label: string; href: string }) {
  const cls = 'inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm'
  if (!href) {
    return (
      <span className={`${cls} text-mute/70`} title={`${label} profile coming soon`}>
        <BrandIcon name={name} size={16} />
        {label}
        <span className="mono-label normal-case tracking-normal">soon</span>
      </span>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${cls} hover:border-blue hover:text-blue`}>
      <BrandIcon name={name} size={16} />
      {label}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
