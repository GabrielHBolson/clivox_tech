import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/** Cuida da rolagem até âncoras e do foco ao trocar de página. */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const previousPath = useRef(pathname)
  const isFirstRun = useRef(true)

  useEffect(() => {
    const changedPage = previousPath.current !== pathname
    previousPath.current = pathname

    if (hash) {
      // Ao abrir um link direto para uma seção, posiciona sem animar desde o topo.
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView(isFirstRun.current ? { behavior: 'instant' } : undefined)
    } else if (changedPage) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (changedPage) {
      document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true })
    }

    isFirstRun.current = false
  }, [pathname, hash, key])

  return null
}
