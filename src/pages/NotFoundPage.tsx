import { ButtonLink } from '../components/ui/Button'
import { PageHero } from '../components/ui/PageHero'

export default function NotFoundPage() {
  return (
    <PageHero eyebrow="Erro 404" title="Não encontramos esta página.">
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-graphite-300">
        O endereço pode ter mudado ou não existir mais.
      </p>
      <ButtonLink to="/" size="lg" className="mt-9 mb-32 max-sm:w-full">
        Voltar para o início
      </ButtonLink>
    </PageHero>
  )
}
