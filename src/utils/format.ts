const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function discountPercent(original: number, promotional: number): number {
  return Math.round(((original - promotional) / original) * 100)
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

/** Aplica a máscara (11) 91234-5678 enquanto o número é digitado. */
export function formatBrazilianPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11)
  if (digits.length <= 2) return digits.length ? `(${digits}` : ''
  const area = digits.slice(0, 2)
  const rest = digits.slice(2)
  const splitAt = digits.length === 11 ? 5 : 4
  if (rest.length <= splitAt) return `(${area}) ${rest}`
  return `(${area}) ${rest.slice(0, splitAt)}-${rest.slice(splitAt)}`
}
