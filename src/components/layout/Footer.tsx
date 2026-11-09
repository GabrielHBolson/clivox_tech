import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { contactConfig } from '../../config/contact'
import { siteConfig } from '../../config/site'
import { PRIVACY_PATH, QUOTE_PATH, mainNav } from '../../data/navigation'
import { services } from '../../data/services'
import { getMailtoUrl } from '../../utils/links'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'

const linkClass = 'text-graphite-300 transition-colors duration-200 hover:text-white'

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="font-sans text-sm font-medium text-white">{title}</h2>
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  )
}

export function Footer() {
  const mailto = getMailtoUrl()

  return (
    <footer className="bg-graphite-950 text-white">
      <Container className="pt-20 pb-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/#inicio" aria-label="Clivox Tech, ir para o início" className="inline-block rounded-sm">
              <Logo />
            </Link>
            <p className="mt-5 max-w-xs text-lg leading-snug text-graphite-300">{siteConfig.slogan}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-[1fr_1fr_auto] md:col-span-7">
            <FooterColumn title="Navegação">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Serviços">
              {services.map((service) => (
                <li key={service.id}>
                  <Link to={`${QUOTE_PATH}?servico=${service.id}`} className={linkClass}>
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contato">
              <li>
                <a href={contactConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Instagram: @{contactConfig.instagram.handle}
                </a>
              </li>
              {mailto && (
                <li>
                  <a href={mailto} className={`${linkClass} [overflow-wrap:anywhere]`}>
                    {contactConfig.email}
                  </a>
                </li>
              )}
              <li>
                <Link to={QUOTE_PATH} className={linkClass}>
                  Solicitar orçamento
                </Link>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-graphite-400 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <Link to={PRIVACY_PATH} className="transition-colors duration-200 hover:text-white">
            Política de privacidade
          </Link>
        </div>
      </Container>
    </footer>
  )
}
