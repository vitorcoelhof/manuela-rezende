'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

const WHATSAPP_NUMBER = '5548999770241'
const WHATSAPP_MESSAGE = 'Olá, gostaria de mais informações sobre um imóvel'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const hideLayout = useMemo(() => {
    if (!pathname) return false
    return pathname.includes('/studio') || pathname.startsWith('/imoveis/')
  }, [pathname])

  // Only render layout after client mounts to ensure pathname is available
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <div className={hideLayout ? '' : 'flex min-h-screen flex-col bg-white text-gray-900 antialiased'}>
      {!hideLayout && <Header />}
      <main className={hideLayout ? '' : 'flex-1'}>
        {children}
      </main>
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={WHATSAPP_MESSAGE} />}
    </div>
  )
}
