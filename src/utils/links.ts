import { contactConfig } from '../config/contact'

export function getWhatsappUrl(message: string = contactConfig.whatsapp.defaultMessage): string | null {
  const { number } = contactConfig.whatsapp
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null
}

export function getMailtoUrl(subject?: string, body?: string): string | null {
  const { email } = contactConfig
  if (!email) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${email}${query ? `?${query}` : ''}`
}
