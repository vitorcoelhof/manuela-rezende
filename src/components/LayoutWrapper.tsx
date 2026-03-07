'use client'

import { usePathname } from 'next/navigation'
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
  const isStudio = pathname.startsWith('/studio')

  return (
    <>
      {!isStudio && <Header />}
      <main className="flex-1">
        {children}
      </main>
      {!isStudio && <Footer />}
      {!isStudio && <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={WHATSAPP_MESSAGE} />}
    </>
  )
}
