import { contactConfig } from '../../config/contact'
import { finalCtaContent as content } from '../../data/content'
import { QUOTE_PATH } from '../../data/navigation'
import { getMailtoUrl, getWhatsappUrl } from '../../utils/links'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { SignalBars } from '../ui/SignalBars'

export function FinalCta() {
  const mailto = getMailtoUrl()
  const whatsapp = getWhatsappUrl()
  const channels = [
    { label: `Instagram: @${contactConfig.instagram.handle}`, href: contactConfig.instagram.url, external: true },
    ...(whatsapp ? [{ label: 'WhatsApp', href: whatsapp, external: true }] : []),
    ...(mailto ? [{ label: contactConfig.email as string, href: mailto, external: false }] : []),
  ]

  return (
    <section id="contato" className="relative isolate overflow-hidden bg-gradient-to-br from-green-400 to-green-600 text-graphite-950">
      <SignalBars className="absolute inset-x-0 bottom-0 -z-10 h-[46%] px-1" barClassName="bg-graphite-950/20" />
      <Container className="py-24 lg:py-40">
        <Reveal>
          <h2 className="max-w-[16ch] text-5xl leading-[1.02] font-medium tracking-[-0.025em] sm:text-7xl lg:text-[5.5rem]">
            {content.title}
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed sm:text-xl">{content.text}</p>
          <ButtonLink to={QUOTE_PATH} variant="dark" size="lg" className="mt-10 max-sm:w-full">
            {content.cta}
          </ButtonLink>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            {channels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="font-medium underline decoration-graphite-950/30 underline-offset-4 transition-colors duration-200 hover:decoration-graphite-950"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
