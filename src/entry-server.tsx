import { text } from 'node:stream/consumers'
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router'
import { App } from './App'

export { buildOrganizationJsonLd, getPageMeta, pageMetaByPath } from './config/seo'
export { siteConfig } from './config/site'

export async function render(location: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // Mantém todo o conteúdo em ordem no HTML, sem depender de scripts inline.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  )
  return text(prelude)
}
