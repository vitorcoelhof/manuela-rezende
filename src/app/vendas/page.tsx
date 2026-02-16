import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Imóveis à Venda',
  description: 'Explore todos os imóveis disponíveis — casas, apartamentos e terrenos. Filtre por tipo, preço e localização.',
  openGraph: {
    title: 'Imóveis à Venda | Manuela Rezende Imóveis',
    description: 'Explore todos os imóveis disponíveis.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function VendasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Imóveis à Venda
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Listagem de imóveis disponível em breve.
      </p>
    </div>
  )
}
