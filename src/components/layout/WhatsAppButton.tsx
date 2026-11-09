import { MessageCircle } from 'lucide-react'
import { getWhatsappUrl } from '../../utils/links'

export function WhatsAppButton() {
  const href = getWhatsappUrl()
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="fixed right-5 bottom-5 z-30 flex size-14 items-center justify-center rounded-full bg-green-400 text-graphite-950 shadow-lg shadow-black/25 transition duration-200 ease-brand hover:scale-105 hover:bg-green-300 sm:right-8 sm:bottom-8"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  )
}
