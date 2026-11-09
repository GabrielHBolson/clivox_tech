import type { QuoteFieldName, QuoteFormErrors, QuoteFormValues } from '../types'
import { onlyDigits } from './format'

export const DESCRIPTION_MIN = 20
export const DESCRIPTION_MAX = 2000

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateWhatsapp(value: string): string | undefined {
  const digits = onlyDigits(value)
  if (!digits) return 'Informe seu WhatsApp.'
  const hasValidArea = /^[1-9][1-9]/.test(digits)
  const isValidLength = digits.length === 10 || (digits.length === 11 && digits[2] === '9')
  if (!hasValidArea || !isValidLength) return 'Informe um número com DDD. Ex.: (11) 91234-5678.'
  return undefined
}

const validators: Record<QuoteFieldName, (value: string) => string | undefined> = {
  name: (value) => {
    const name = value.trim()
    if (!name) return 'Informe seu nome.'
    if (name.length < 2) return 'Informe seu nome completo.'
    return undefined
  },
  company: () => undefined,
  email: (value) => {
    const email = value.trim()
    if (!email) return 'Informe seu e-mail.'
    if (!EMAIL_PATTERN.test(email)) return 'Informe um e-mail válido. Ex.: nome@empresa.com.br.'
    return undefined
  },
  whatsapp: validateWhatsapp,
  service: (value) => (value ? undefined : 'Selecione uma opção.'),
  description: (value) => {
    const length = value.trim().length
    if (!length) return 'Conte um pouco sobre o projeto.'
    if (length < DESCRIPTION_MIN) return `Escreva pelo menos ${DESCRIPTION_MIN} caracteres para entendermos o que você precisa.`
    if (length > DESCRIPTION_MAX) return `Use no máximo ${DESCRIPTION_MAX} caracteres.`
    return undefined
  },
}

export const quoteFieldOrder: QuoteFieldName[] = ['name', 'company', 'email', 'whatsapp', 'service', 'description']

export function validateQuoteField(name: QuoteFieldName, value: string): string | undefined {
  return validators[name](value)
}

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {}
  for (const name of quoteFieldOrder) {
    const error = validateQuoteField(name, values[name])
    if (error) errors[name] = error
  }
  return errors
}
