import { LoaderCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router'
import { quoteEndpoint } from '../../config/integrations'
import { PRIVACY_PATH } from '../../data/navigation'
import { isQuoteServiceOption } from '../../data/services'
import { quoteFieldId, useQuoteForm } from '../../hooks/useQuoteForm'
import { cn } from '../../utils/cn'
import { DESCRIPTION_MAX } from '../../utils/validation'
import { Button } from '../ui/Button'
import { ContactFallback } from './ContactFallback'
import { QuoteSuccess } from './QuoteSuccess'
import { ServiceOptions } from './ServiceOptions'
import { TextAreaField, TextField } from './TextField'

const errorMessages = {
  timeout: 'O envio demorou mais do que o esperado.',
  network: 'Não foi possível conectar. Verifique sua internet.',
  server: 'Nosso serviço de envio não respondeu como deveria.',
}

export function QuoteForm() {
  const { values, errors, status, errorReason, setValue, validateOnBlur, submit } = useQuoteForm()
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('servico')
  const isSubmitting = status === 'submitting'

  useEffect(() => {
    if (isQuoteServiceOption(preselected)) setValue('service', preselected)
  }, [preselected, setValue])

  if (status === 'success') return <QuoteSuccess />

  return (
    <form onSubmit={submit} noValidate aria-busy={isSubmitting} className="space-y-6">
      {!quoteEndpoint && (
        <p className="rounded-lg bg-graphite-100 p-4 text-[15px] leading-relaxed text-graphite-700">
          O envio direto por este formulário ainda não está ativo. Preencha os campos e, ao continuar, escolha um canal
          para nos enviar sua solicitação.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={quoteFieldId('name')}
          label="Nome"
          name="name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          onChange={(event) => setValue('name', event.target.value)}
          onBlur={() => validateOnBlur('name')}
        />
        <TextField
          id={quoteFieldId('company')}
          label="Empresa"
          name="company"
          optional
          autoComplete="organization"
          value={values.company}
          onChange={(event) => setValue('company', event.target.value)}
        />
        <TextField
          id={quoteFieldId('email')}
          label="E-mail"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          onChange={(event) => setValue('email', event.target.value)}
          onBlur={() => validateOnBlur('email')}
        />
        <TextField
          id={quoteFieldId('whatsapp')}
          label="WhatsApp"
          name="whatsapp"
          type="tel"
          autoComplete="tel-national"
          inputMode="tel"
          placeholder="(00) 00000-0000"
          value={values.whatsapp}
          error={errors.whatsapp}
          onChange={(event) => setValue('whatsapp', event.target.value)}
          onBlur={() => validateOnBlur('whatsapp')}
        />
      </div>

      <ServiceOptions
        id={quoteFieldId('service')}
        value={values.service}
        error={errors.service}
        onChange={(service) => setValue('service', service)}
      />

      <TextAreaField
        id={quoteFieldId('description')}
        label="Descrição do projeto"
        name="description"
        placeholder="Conte o que você precisa, para quem é e o que gostaria de melhorar."
        maxLength={DESCRIPTION_MAX}
        value={values.description}
        error={errors.description}
        aside={
          <span
            className={cn(
              'text-sm tabular-nums',
              values.description.length >= DESCRIPTION_MAX ? 'text-red-700' : 'text-graphite-500',
            )}
          >
            {values.description.length}/{DESCRIPTION_MAX}
          </span>
        }
        onChange={(event) => setValue('description', event.target.value)}
        onBlur={() => validateOnBlur('description')}
      />

      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="orcamento-website">Não preencha este campo</label>
        <input
          id="orcamento-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValue('website', event.target.value)}
        />
      </div>

      {status === 'not_configured' && (
        <ContactFallback
          title="Falta só escolher como enviar."
          description="O envio direto ainda não está ativo, então seus dados não foram transmitidos. Use um dos canais abaixo para falar com a Clivox."
          values={values}
        />
      )}

      {status === 'error' && errorReason && (
        <ContactFallback
          title={`${errorMessages[errorReason]} Sua solicitação não foi enviada.`}
          description="Seus dados continuam preenchidos. Tente novamente ou fale conosco por outro canal."
          values={values}
        />
      )}

      <div className="flex flex-col gap-5 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-graphite-600">
          Ao continuar, você concorda com o uso dos seus dados conforme a nossa{' '}
          <Link to={PRIVACY_PATH} className="underline underline-offset-2 transition-colors hover:text-graphite-950">
            política de privacidade
          </Link>
          .
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="shrink-0 max-sm:w-full">
          {isSubmitting && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {isSubmitting ? 'Enviando...' : quoteEndpoint ? 'Enviar solicitação' : 'Continuar'}
        </Button>
      </div>
    </form>
  )
}
