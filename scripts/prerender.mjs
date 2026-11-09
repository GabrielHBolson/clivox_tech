// Gera um HTML completo para cada rota, com título e metadados próprios.
import { existsSync } from 'node:fs'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrEntry = resolve(root, 'dist-ssr/entry-server.js')
const NOT_FOUND_SOURCE = '/__nao-encontrada'

const { render, getPageMeta, pageMetaByPath, buildOrganizationJsonLd, siteConfig } = await import(
  pathToFileURL(ssrEntry).href
)

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const assets = await readdir(resolve(dist, 'assets'))
const preloadFonts = assets
  .filter((file) => /^(onest|funnel-display)-latin-wght-normal-.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`)

function buildHead(pathname) {
  const meta = getPageMeta(pathname)
  const pageUrl = siteConfig.url && !meta.noindex ? `${siteConfig.url}${pathname}` : null
  const image = siteConfig.url ? `${siteConfig.url}${siteConfig.ogImagePath}` : siteConfig.ogImagePath
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)
  const jsonLd = JSON.stringify(buildOrganizationJsonLd()).replace(/</g, '\\u003c')

  return [
    ...preloadFonts,
    `<meta name="description" content="${description}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : '',
    pageUrl ? `<link rel="canonical" href="${pageUrl}" />` : '',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(siteConfig.name)}" />`,
    `<meta property="og:locale" content="${siteConfig.ogLocale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    pageUrl ? `<meta property="og:url" content="${pageUrl}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

const template = await readFile(resolve(dist, 'index.html'), 'utf8')

async function writeRoute(location, outputPath) {
  const meta = getPageMeta(location)
  const html = template
    .replace('<title>Clivox Tech</title>', () => `<title>${escapeHtml(meta.title)}</title>`)
    .replace('<!--app-head-->', () => buildHead(location))
    .replace('<!--app-html-->', () => appHtml)
  const output = resolve(dist, outputPath)
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, html)
  console.log(`  ${location} -> dist/${outputPath}`)
}

let appHtml = ''
const paths = Object.keys(pageMetaByPath)

for (const pathname of paths) {
  appHtml = await render(pathname)
  await writeRoute(pathname, pathname === '/' ? 'index.html' : `${pathname.slice(1)}/index.html`)
}

appHtml = await render(NOT_FOUND_SOURCE)
await writeRoute(NOT_FOUND_SOURCE, '404.html')

const robotsLines = ['User-agent: *', 'Allow: /']
if (siteConfig.url) {
  robotsLines.push('', `Sitemap: ${siteConfig.url}/sitemap.xml`)
  const urls = paths
    .map((pathname) => `  <url><loc>${siteConfig.url}${pathname === '/' ? '/' : pathname}</loc></url>`)
    .join('\n')
  await writeFile(
    resolve(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
} else {
  console.log('  sitemap.xml não gerado: defina siteConfig.url em src/config/site.ts')
}
await writeFile(resolve(dist, 'robots.txt'), `${robotsLines.join('\n')}\n`)

if (existsSync(resolve(root, 'dist-ssr'))) await rm(resolve(root, 'dist-ssr'), { recursive: true })
console.log('Pré-renderização concluída.')
