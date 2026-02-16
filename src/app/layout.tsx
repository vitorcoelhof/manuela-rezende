import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Manuela Rezende Imóveis',
    template: '%s | Manuela Rezende Imóveis',
  },
  description: 'Corretora de imóveis especializada em imóveis residenciais. Encontre seu imóvel ideal com a Manuela Rezende.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Manuela Rezende Imóveis',
  },
}

// WhatsApp number — PLACEHOLDER until confirmed by client
// Format: E.164 without '+' — e.g. '5511987654321' for São Paulo mobile
const WHATSAPP_NUMBER = 'PLACEHOLDER'
const WHATSAPP_MESSAGE = 'Olá, Manuela! Tenho interesse em um imóvel.'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex min-h-screen flex-col bg-white text-gray-900 antialiased`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={WHATSAPP_MESSAGE} />
      </body>
    </html>
  )
}
