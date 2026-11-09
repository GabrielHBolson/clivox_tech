import { quoteServiceOptions } from '../../data/services'
import type { QuoteServiceOption } from '../../types'
import { cn } from '../../utils/cn'
import { fieldErrorId } from './TextField'

interface ServiceOptionsProps {
  id: string
  value: QuoteServiceOption | ''
  error?: string
  onChange: (value: QuoteServiceOption) => void
}

export function ServiceOptions({ id, value, error, onChange }: ServiceOptionsProps) {
  return (
    <fieldset aria-describedby={error ? fieldErrorId(id) : undefined}>
      <legend className="mb-2 text-[15px] font-medium">Serviço desejado</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {quoteServiceOptions.map((option, index) => {
          const isSelected = value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'relative cursor-pointer rounded-lg border p-4 transition-colors duration-200 has-focus-visible:ring-2 has-focus-visible:ring-green-500/40',
                isSelected
                  ? 'border-green-600 bg-green-400/10'
                  : error
                    ? 'border-red-600 hover:border-graphite-500'
                    : 'border-graphite-300 hover:border-graphite-500',
              )}
            >
              <input
                id={index === 0 ? id : undefined}
                type="radio"
                name="service"
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="flex items-center justify-between font-medium">
                {option.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex size-[18px] items-center justify-center rounded-full border transition-colors duration-200',
                    isSelected ? 'border-green-700 bg-green-700' : 'border-graphite-400',
                  )}
                >
                  {isSelected && <span className="size-1.5 rounded-full bg-white" />}
                </span>
              </span>
              <span className="mt-1 block text-sm leading-snug text-graphite-600">{option.hint}</span>
            </label>
          )
        })}
      </div>
      {error && (
        <p id={fieldErrorId(id)} className="mt-2 animate-fade-up text-sm text-red-700">
          {error}
        </p>
      )}
    </fieldset>
  )
}
