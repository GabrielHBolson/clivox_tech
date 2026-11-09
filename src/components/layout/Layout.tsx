import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { usePageMeta } from '../../hooks/usePageMeta'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollManager } from './ScrollManager'
import { WhatsAppButton } from './WhatsAppButton'

export function Layout() {
  const { pathname } = useLocation()
  usePageMeta(pathname)

  return (
    <>
      <a
        href="#conteudo"
        className="fixed top-3 left-3 z-[60] -translate-y-20 rounded-md bg-green-400 px-4 py-2 font-medium text-graphite-950 transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-screen bg-graphite-950" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollManager />
    </>
  )
}
