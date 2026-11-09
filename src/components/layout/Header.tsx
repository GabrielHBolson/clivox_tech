import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { QUOTE_PATH, mainNav } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../utils/cn'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'

const MENU_ID = 'menu-mobile'

export function Header() {
  const { pathname } = useLocation()
  const scrolled = useScrolled()
  const activeSection = useActiveSection(pathname === '/')
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      toggleRef.current?.focus()
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktopChange = () => desktop.matches && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktopChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktopChange)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b text-white transition-colors duration-300',
          scrolled || menuOpen
            ? 'border-white/10 bg-graphite-950/90 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link to="/#inicio" onClick={closeMenu} aria-label="Clivox Tech, ir para o início" className="rounded-sm">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const isActive = activeSection === item.sectionId
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'rounded-md px-4 py-2 text-[15px] transition-colors duration-200',
                        isActive ? 'text-green-400' : 'text-graphite-300 hover:text-white',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ButtonLink to={QUOTE_PATH}>Solicitar orçamento</ButtonLink>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="-mr-2 flex size-11 items-center justify-center rounded-md transition-colors hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
            </button>
          </div>
        </Container>
      </header>
      {menuOpen && <MobileMenu id={MENU_ID} activeSection={activeSection} onClose={closeMenu} />}
    </>
  )
}
