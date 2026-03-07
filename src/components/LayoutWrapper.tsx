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
  const [isInStudio, setIsInStudio] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if we're in studio mode
    const checkStudio = () => {
      const inStudio = document.documentElement.dataset.studio === 'true'
      setIsInStudio(inStudio)
    }

    checkStudio()

    // Also listen for changes
    const observer = new MutationObserver(checkStudio)
    observer.observe(document.documentElement, { attributes: true })

    return () => observer.disconnect()
  }, [])

  const hideLayout = useMemo(() => {
    if (!pathname) return false
    // Hide layout for: /studio paths, individual property pages, or when studio signal is set
    if (isInStudio) return true
    const isPropertyDetail = pathname.startsWith('/imoveis/')
    return pathname.includes('/studio') || isPropertyDetail
  }, [pathname, isInStudio])

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
