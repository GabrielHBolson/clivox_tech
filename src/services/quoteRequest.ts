import { quoteEndpoint } from '../config/integrations'
import { quoteServiceOptions } from '../data/services'
import type { QuoteFormValues, SubmitResult } from '../types'
import { onlyDigits } from '../utils/format'

const REQUEST_TIMEOUT_MS = 15_000

function buildPayload(values: QuoteFormValues) {
  return {
    name: values.name.trim(),
    company: values.company.trim() || null,
    email: values.email.trim(),
    whatsapp: onlyDigits(values.whatsapp),
    service: values.service,
    serviceLabel: quoteServiceOptions.find((option) => option.value === values.service)?.label ?? null,
    description: values.description.trim(),
    source: 'site',
    _gotcha: values.website,
  }
}

export async function submitQuoteRequest(values: QuoteFormValues): Promise<SubmitResult> {
  if (!quoteEndpoint) return { status: 'not_configured' }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(quoteEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(buildPayload(values)),
      signal: controller.signal,
    })
    return response.ok ? { status: 'success' } : { status: 'error', reason: 'server' }
  } catch (error) {
    const reason = error instanceof DOMException && error.name === 'AbortError' ? 'timeout' : 'network'
    return { status: 'error', reason }
  } finally {
    window.clearTimeout(timeout)
  }
}

/** Texto usado quando o visitante envia a solicitação por outro canal. */
export function buildQuoteSummary(values: QuoteFormValues): string {
  const service = quoteServiceOptions.find((option) => option.value === values.service)?.label
  return [
    'Solicitação de orçamento',
    `Nome: ${values.name.trim()}`,
    values.company.trim() && `Empresa: ${values.company.trim()}`,
    `E-mail: ${values.email.trim()}`,
    `WhatsApp: ${values.whatsapp}`,
    service && `Serviço: ${service}`,
    `Projeto: ${values.description.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}
