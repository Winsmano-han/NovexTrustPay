import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  to: number
  suffix?: string
  prefix?: string
}

export function AnimatedCounter({ to, suffix = '', prefix = '' }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const frame = 16
    const steps = Math.ceil(duration / frame)
    let current = 0

    const id = setInterval(() => {
      current += 1
      const next = Math.round((current / steps) * to)
      setValue(next)
      if (current >= steps) clearInterval(id)
    }, frame)

    return () => clearInterval(id)
  }, [inView, to])

  return <span ref={ref}>{prefix}{value.toLocaleString()}{suffix}</span>
}
