import type { CSSProperties } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../utils/cn'

const BAR_COUNT = 72

interface Bar {
  height: number
  opacity: number
  riseDelay: number
  duration: number
}

/** Combina uma curva ascendente com ondas, para unir crescimento e voz. */
function createBars(): Bar[] {
  return Array.from({ length: BAR_COUNT }, (_, index) => {
    const progress = index / (BAR_COUNT - 1)
    const growth = 0.05 + Math.pow(progress, 2.1) * 0.8
    const wave = 0.62 + Math.sin(index * 0.82) * 0.2 + Math.sin(index * 2.31) * 0.18
    return {
      height: Number(Math.min(1, growth * wave + 0.03).toFixed(3)),
      opacity: Number((0.22 + progress * 0.78).toFixed(3)),
      riseDelay: Math.round(index * 11),
      duration: Number((2.6 + (index % 7) * 0.32).toFixed(2)),
    }
  })
}

const bars = createBars()

interface SignalBarsProps {
  className?: string
  barClassName?: string
}

export function SignalBars({ className, barClassName }: SignalBarsProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none flex items-end gap-[3px] sm:gap-1.5', !inView && 'signal-paused', className)}
    >
      {bars.map((bar, index) => (
        <span
          key={index}
          className={cn('signal-bar h-full flex-1 rounded-t-[2px] max-sm:even:hidden', barClassName)}
          style={
            {
              '--bar-height': bar.height,
              '--bar-rise-delay': `${bar.riseDelay}ms`,
              '--bar-duration': `${bar.duration}s`,
              opacity: bar.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
