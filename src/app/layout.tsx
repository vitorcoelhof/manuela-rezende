import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://manuela-rezende.vercel.app'),
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
