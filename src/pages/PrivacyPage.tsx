import { Container } from '../components/ui/Container'
import { PageHero } from '../components/ui/PageHero'
import { contactConfig } from '../config/contact'
import { privacySections, privacyUpdatedAt } from '../data/privacy'
import { getMailtoUrl } from '../utils/links'

const linkClass = 'font-medium text-green-700 underline underline-offset-2 hover:text-green-800'

export default function PrivacyPage() {
  const mailto = getMailtoUrl('Privacidade e dados pessoais')

  return (
    <>
      <PageHero title="Política de privacidade">
        <p className="mt-5 text-graphite-300">Última atualização: {privacyUpdatedAt}</p>
      </PageHero>
      <Container className="py-14 lg:py-24">
        <article className="max-w-2xl">
          {privacySections.map((section) => (
            <section key={section.title} className="mb-12">
              <h2 className="text-2xl font-medium tracking-tight">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-graphite-700">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-4 list-disc space-y-1.5 pl-5 leading-relaxed text-graphite-700 marker:text-green-600">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <section>
            <h2 className="text-2xl font-medium tracking-tight">Como falar conosco</h2>
            <p className="mt-4 leading-relaxed text-graphite-700">
              Para exercer seus direitos ou tirar dúvidas sobre esta política, fale conosco pelo{' '}
              {mailto && (
                <>
                  e-mail{' '}
                  <a href={mailto} className={linkClass}>
                    {contactConfig.email}
                  </a>{' '}
                  ou pelo{' '}
                </>
              )}
              Instagram{' '}
              <a href={contactConfig.instagram.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                @{contactConfig.instagram.handle}
              </a>
              .
            </p>
          </section>
        </article>
      </Container>
    </>
  )
}
