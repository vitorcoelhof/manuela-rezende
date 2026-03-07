import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio | Manuela Rezende Imóveis',
  robots: 'noindex,nofollow',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
