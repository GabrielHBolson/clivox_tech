import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

export const fieldErrorId = (id: string) => `${id}-erro`

const controlClass =
  'block w-full rounded-lg border bg-white px-4 text-base text-graphite-950 transition-colors duration-200 placeholder:text-graphite-500 hover:border-graphite-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500/30'

interface FieldShellProps {
  id: string
  label: string
  optional?: boolean
  error?: string
  aside?: ReactNode
  children: ReactNode
}

function FieldShell({ id, label, optional, error, aside, children }: FieldShellProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-medium">
          {label}
          {optional && <span className="ml-1.5 font-normal text-graphite-500">(opcional)</span>}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={fieldErrorId(id)} className="mt-2 animate-fade-up text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

function stateProps(id: string, error?: string) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? fieldErrorId(id) : undefined,
    className: cn(controlClass, error ? 'border-red-600' : 'border-graphite-300'),
  } as const
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string
  label: string
  optional?: boolean
  error?: string
}

export function TextField({ id, label, optional, error, ...inputProps }: TextFieldProps) {
  const state = stateProps(id, error)
  return (
    <FieldShell id={id} label={label} optional={optional} error={error}>
      <input id={id} {...inputProps} {...state} className={cn(state.className, 'h-12')} />
    </FieldShell>
  )
}

interface TextAreaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  id: string
  label: string
  error?: string
  aside?: ReactNode
}

export function TextAreaField({ id, label, error, aside, ...textareaProps }: TextAreaFieldProps) {
  const state = stateProps(id, error)
  return (
    <FieldShell id={id} label={label} error={error} aside={aside}>
      <textarea id={id} {...textareaProps} {...state} className={cn(state.className, 'min-h-40 resize-y py-3 leading-relaxed')} />
    </FieldShell>
  )
}
