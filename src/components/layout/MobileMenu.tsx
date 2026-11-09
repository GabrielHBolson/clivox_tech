import { useEffect, useRef, type KeyboardEvent } from 'react'
import { Link } from 'react-router'
import { QUOTE_PATH, mainNav } from '../../data/navigation'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../ui/Button'

interface MobileMenuProps {
  id: string
  activeSection: string | null
  onClose: () => void
}

export function MobileMenu({ id, activeSection, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const keepFocusInside = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return
    const links = panelRef.current.querySelectorAll('a')
    const first = links[0]
    const last = links[links.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      id={id}
      ref={panelRef}
      onKeyDown={keepFocusInside}
      className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex animate-fade-up flex-col overflow-y-auto bg-graphite-950 px-5 pt-6 pb-8 text-white sm:px-8 lg:hidden"
    >
      <nav aria-label="Menu principal">
        <ul>
          {mainNav.map((item) => (
            <li key={item.href} className="border-b border-white/10">
              <Link
                to={item.href}
                onClick={onClose}
                aria-current={activeSection === item.sectionId ? 'location' : undefined}
                className={cn(
                  'block py-5 font-display text-3xl tracking-tight transition-colors',
                  activeSection === item.sectionId ? 'text-green-400' : 'text-white',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-8" onClick={onClose}>
        <ButtonLink to={QUOTE_PATH} size="lg" className="w-full">
          Solicitar orçamento
        </ButtonLink>
      </div>
    </div>
  )
}
