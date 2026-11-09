import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { contactConfig } from '../../config/contact'
import { buildQuoteSummary } from '../../services/quoteRequest'
import type { QuoteFormValues } from '../../types'
import { getMailtoUrl, getWhatsappUrl } from '../../utils/links'
import { Button, ExternalButton } from '../ui/Button'

interface ContactFallbackProps {
  title: string
  description: string
  values: QuoteFormValues
}

type CopyState = 'idle' | 'copied' | 'failed'

/** Oferece canais reais quando o envio direto não está disponível. */
export function ContactFallback({ title, description, values }: ContactFallbackProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const summary = buildQuoteSummary(values)
  const whatsapp = getWhatsappUrl(summary)
  const mailto = getMailtoUrl('Solicitação de orçamento', summary)

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <div role="alert" className="animate-fade-up rounded-lg border border-graphite-300 bg-graphite-50 p-5 sm:p-6">
      <p className="font-medium">{title}</p>
      <p className="mt-1 leading-relaxed text-graphite-600">{description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {whatsapp && <ExternalButton href={whatsapp}>Enviar pelo WhatsApp</ExternalButton>}
        {mailto && (
          <a
            href={mailto}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-graphite-300 px-5 text-[15px] font-medium transition-colors duration-200 hover:border-graphite-950"
          >
            Enviar por e-mail
          </a>
        )}
        <Button variant="outlineOnLight" onClick={copySummary}>
          {copyState === 'copied' ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copyState === 'copied' ? 'Dados copiados' : 'Copiar meus dados'}
        </Button>
        <ExternalButton href={contactConfig.instagram.url} variant="outlineOnLight">
          Abrir Instagram
        </ExternalButton>
      </div>
      {copyState === 'failed' && (
        <p className="mt-3 text-sm text-red-700">Não foi possível copiar automaticamente. Selecione o texto do formulário e copie manualmente.</p>
      )}
    </div>
  )
}
