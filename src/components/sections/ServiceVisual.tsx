import type { ServiceId } from '../../types'

const line = 'stroke-white/25'
const block = 'fill-white/10'
const accent = 'fill-green-400'

/** Janela de site em tela grande e pequena: o mesmo projeto, responsivo. */
function SitesVisual() {
  return (
    <>
      <rect x="40" y="52" width="270" height="196" rx="8" className={`fill-graphite-900 ${line}`} />
      <path d="M40 80h270" className={line} />
      <circle cx="58" cy="66" r="3" className={block} />
      <circle cx="70" cy="66" r="3" className={block} />
      <circle cx="82" cy="66" r="3" className={block} />
      <rect x="62" y="102" width="138" height="14" rx="3" className="fill-white/70" />
      <rect x="62" y="124" width="96" height="14" rx="3" className="fill-white/70" />
      <rect x="62" y="152" width="120" height="5" rx="2.5" className={block} />
      <rect x="62" y="163" width="88" height="5" rx="2.5" className={block} />
      <rect x="62" y="186" width="64" height="20" rx="4" className={accent} />
      <rect x="282" y="112" width="86" height="164" rx="11" className={`fill-graphite-850 ${line}`} />
      <rect x="295" y="134" width="60" height="9" rx="2.5" className="fill-white/70" />
      <rect x="295" y="149" width="42" height="9" rx="2.5" className="fill-white/70" />
      <rect x="295" y="172" width="60" height="4" rx="2" className={block} />
      <rect x="295" y="181" width="50" height="4" rx="2" className={block} />
      <rect x="295" y="202" width="60" height="18" rx="4" className={accent} />
    </>
  )
}

/** Painel com navegação, indicadores em barras e linhas de registros. */
function SistemasVisual() {
  const bars = [34, 52, 44, 70, 60, 88, 76]
  return (
    <>
      <rect x="36" y="50" width="328" height="220" rx="8" className={`fill-graphite-900 ${line}`} />
      <path d="M108 50v220" className={line} />
      <rect x="52" y="72" width="40" height="6" rx="3" className={accent} />
      {[96, 116, 136, 156].map((y) => (
        <rect key={y} x="52" y={y} width="40" height="6" rx="3" className={block} />
      ))}
      {bars.map((height, index) => (
        <rect
          key={index}
          x={130 + index * 30}
          y={166 - height}
          width="18"
          height={height}
          rx="2"
          className={index === 5 ? accent : 'fill-white/15'}
        />
      ))}
      <path d="M126 180h218" className={line} />
      {[196, 218, 240].map((y) => (
        <g key={y}>
          <rect x="130" y={y} width="86" height="6" rx="3" className="fill-white/25" />
          <rect x="240" y={y} width="42" height="6" rx="3" className={block} />
          <rect x="316" y={y} width="24" height="6" rx="3" className={y === 196 ? accent : block} />
        </g>
      ))}
    </>
  )
}

/** Etapas conectadas, com um pulso percorrendo o fluxo. */
function AutomacoesVisual() {
  const paths = ['M112 160C170 160 150 86 214 86', 'M112 160C170 160 150 234 214 234', 'M270 86C330 86 310 160 322 160', 'M270 234C330 234 310 160 322 160']
  return (
    <>
      {paths.map((path) => (
        <g key={path} fill="none" strokeWidth="1.5">
          <path d={path} className={line} />
          <path d={path} strokeLinecap="round" strokeWidth="2.5" className="flow-line stroke-green-400" />
        </g>
      ))}
      <rect x="56" y="132" width="56" height="56" rx="10" className={accent} />
      <path d="m76 160 6 6 12-13" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-graphite-950" />
      {[58, 206].map((y) => (
        <g key={y}>
          <rect x="214" y={y} width="56" height="56" rx="10" className={`fill-graphite-850 ${line}`} />
          <rect x="228" y={y + 21} width="28" height="5" rx="2.5" className="fill-white/40" />
          <rect x="228" y={y + 32} width="18" height="5" rx="2.5" className={block} />
        </g>
      ))}
      <circle cx="344" cy="160" r="22" className={`fill-graphite-850 ${line}`} />
      <circle cx="344" cy="160" r="7" className={accent} />
    </>
  )
}

const visuals: Record<ServiceId, () => React.JSX.Element> = {
  sites: SitesVisual,
  sistemas: SistemasVisual,
  automacoes: AutomacoesVisual,
}

export function ServiceVisual({ serviceId }: { serviceId: ServiceId }) {
  const Visual = visuals[serviceId]
  return (
    <svg viewBox="0 0 400 320" aria-hidden="true" className="h-full max-h-[380px] w-full">
      <Visual />
    </svg>
  )
}
