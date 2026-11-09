import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import type { FaqItem } from '../../types'
import { cn } from '../../utils/cn'

export function Accordion({ items }: { items: FaqItem[] }) {
  const baseId = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="border-t border-graphite-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const buttonId = `${baseId}-botao-${index}`
        const panelId = `${baseId}-painel-${index}`
        return (
          <div key={item.question} className="border-b border-graphite-200">
            <h3 className="font-sans">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium transition-colors duration-200 hover:text-green-700"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-graphite-500 transition-transform duration-300 ease-brand',
                    isOpen && 'rotate-45',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-[grid-template-rows,visibility] duration-300 ease-brand',
                isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-10 pb-7 leading-relaxed text-graphite-600">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
