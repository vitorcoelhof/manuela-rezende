import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A Corretora',
  description: 'Conheça Manuela Rezende — corretora de imóveis especializada em imóveis residenciais. Experiência, dedicação e atendimento personalizado.',
  openGraph: {
    title: 'A Corretora | Manuela Rezende Imóveis',
    description: 'Conheça Manuela Rezende — corretora de imóveis especializada.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function ACorretoraPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        A Corretora
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Conteúdo sobre Manuela Rezende em breve.
      </p>
    </div>
  )
}
