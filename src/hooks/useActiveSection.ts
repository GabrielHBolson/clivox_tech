import { useEffect, useState } from 'react'

/** Identifica a seção que ocupa o centro da tela. */
export function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) {
      setActive(null)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main section').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [enabled])

  return active
}
