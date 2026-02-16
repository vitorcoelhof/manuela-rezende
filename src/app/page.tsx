import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imóveis à Venda',
  description: 'Encontre imóveis residenciais com a Manuela Rezende — corretora especializada. Casa, apartamento, terreno. Contato direto pelo WhatsApp.',
  openGraph: {
    title: 'Imóveis à Venda | Manuela Rezende Imóveis',
    description: 'Encontre imóveis residenciais com a Manuela Rezende.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Encontre seu imóvel ideal
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Imóveis residenciais com a Manuela Rezende. Em breve, conteúdo completo aqui.
      </p>
    </div>
  )
}
