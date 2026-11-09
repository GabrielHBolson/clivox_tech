import { useEffect, useRef } from 'react'

let sharedObserver: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        ;(entry.target as HTMLElement).dataset.reveal = 'in'
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  return sharedObserver
}

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = getObserver()
    observer.observe(element)
    return () => observer.unobserve(element)
  }, [])

  return ref
}
