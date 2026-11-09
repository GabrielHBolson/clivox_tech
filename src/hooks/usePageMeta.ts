import { useEffect } from 'react'
import { getPageMeta } from '../config/seo'
import { siteConfig } from '../config/site'

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string | null) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (content === null) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(href: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (href === null) {
    element?.remove()
    return
  }
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

/** Mantém título e descrição corretos durante a navegação no navegador. */
export function usePageMeta(pathname: string) {
  useEffect(() => {
    const meta = getPageMeta(pathname)
    const pageUrl = siteConfig.url && !meta.noindex ? `${siteConfig.url}${pathname === '/' ? '/' : pathname}` : null

    document.title = meta.title
    setMeta('meta[name="description"]', 'name', 'description', meta.description)
    setMeta('meta[name="robots"]', 'name', 'robots', meta.noindex ? 'noindex' : null)
    setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', pageUrl)
    setCanonical(pageUrl)
  }, [pathname])
}
