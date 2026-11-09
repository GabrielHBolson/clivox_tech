import { useCallback, useState, type FormEvent } from 'react'
import { submitQuoteRequest } from '../services/quoteRequest'
import type { FormStatus, QuoteFieldName, QuoteFormErrors, QuoteFormValues, SubmitResult } from '../types'
import { formatBrazilianPhone } from '../utils/format'
import { quoteFieldOrder, validateQuoteField, validateQuoteForm } from '../utils/validation'

const initialValues: QuoteFormValues = {
  name: '',
  company: '',
  email: '',
  whatsapp: '',
  service: '',
  description: '',
  website: '',
}

export const quoteFieldId = (name: QuoteFieldName) => `orcamento-${name}`

export function useQuoteForm() {
  const [values, setValues] = useState<QuoteFormValues>(initialValues)
  const [errors, setErrors] = useState<QuoteFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorReason, setErrorReason] = useState<Extract<SubmitResult, { status: 'error' }>['reason'] | null>(null)

  const setValue = useCallback(<K extends keyof QuoteFormValues>(name: K, value: QuoteFormValues[K]) => {
    const nextValue = (name === 'whatsapp' ? formatBrazilianPhone(value) : value) as QuoteFormValues[K]
    setValues((current) => ({ ...current, [name]: nextValue }))
    if (name !== 'website') {
      const field = name as QuoteFieldName
      // Depois que um erro aparece, ele some assim que o campo fica válido.
      setErrors((previous) =>
        previous[field] ? { ...previous, [field]: validateQuoteField(field, nextValue) } : previous,
      )
    }
    setStatus((current) => (current === 'submitting' ? current : 'idle'))
  }, [])

  const validateOnBlur = useCallback(
    (name: QuoteFieldName) => {
      setErrors((previous) => ({ ...previous, [name]: validateQuoteField(name, values[name]) }))
    },
    [values],
  )

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (status === 'submitting') return

      const nextErrors = validateQuoteForm(values)
      setErrors(nextErrors)
      const firstInvalid = quoteFieldOrder.find((name) => nextErrors[name])
      if (firstInvalid) {
        document.getElementById(quoteFieldId(firstInvalid))?.focus()
        return
      }

      setStatus('submitting')
      setErrorReason(null)
      const result = await submitQuoteRequest(values)
      setStatus(result.status)
      if (result.status === 'error') setErrorReason(result.reason)
    },
    [status, values],
  )

  return { values, errors, status, errorReason, setValue, validateOnBlur, submit }
}
