import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Manuela Rezende pelo WhatsApp. Atendimento rápido e personalizado.',
  openGraph: {
    title: 'Contato | Manuela Rezende Imóveis',
    description: 'Entre em contato com Manuela Rezende pelo WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Contato
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Informações de contato em breve.
      </p>
    </div>
  )
}
