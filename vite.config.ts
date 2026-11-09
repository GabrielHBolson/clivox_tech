import { existsSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Faz o `npm run preview` servir as rotas pré-renderizadas como uma hospedagem estática. */
function staticRoutesPreview(): Plugin {
  return {
    name: 'static-routes-preview',
    configurePreviewServer(server) {
      const dist = resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, _res, next) => {
        const [pathname, query] = (req.url ?? '/').split('?')
        if (pathname !== '/' && !extname(pathname)) {
          const route = `${pathname.replace(/\/+$/, '')}/index.html`
          const target = existsSync(resolve(dist, `.${route}`)) ? route : '/404.html'
          req.url = query ? `${target}?${query}` : target
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRoutesPreview()],
})
