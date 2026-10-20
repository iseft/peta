'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
}

function parseNumeric(value: string): number | null {
  const stripped = value.replace(/,/g, '')
  const n = parseFloat(stripped)
  return isNaN(n) ? null : n
}

function reformat(value: string, current: number): string {
  // Detect decimal places from original string
  const stripped = value.replace(/,/g, '')
  const dotIndex = stripped.indexOf('.')
  if (dotIndex !== -1) {
    const decimals = stripped.length - dotIndex - 1
    return current.toFixed(decimals)
  }
  return Math.round(current).toLocaleString('en-US')
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function CountUpStatValue({ value }: Props) {
  const numeric = parseNumeric(value)
  const [display, setDisplay] = useState(numeric !== null ? reformat(value, 0) : value)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (numeric === null) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true
          observer.disconnect()

          const duration = 1800
          const start = performance.now()

          function tick(now: number) {
            const elapsed = now - start
            const t = Math.min(elapsed / duration, 1)
            const current = easeOut(t) * numeric!
            setDisplay(reformat(value, current))
            if (t < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, numeric])

  return <span ref={ref}>{display}</span>
}
