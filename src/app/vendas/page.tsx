import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { IMOVEIS_QUERY } from '@/sanity/lib/queries'
import ImovelGrid from '@/components/ImovelGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Imóveis à Venda',
  description: 'Explore todos os imóveis disponíveis — casas, apartamentos e terrenos em Florianópolis. Filtre por tipo, preço e localização.',
  openGraph: {
    title: 'Imóveis à Venda | Manuela Rezende Imóveis',
    description: 'Explore todos os imóveis disponíveis em Florianópolis.',
    type: 'website',
    locale: 'pt_BR',
  },
}

interface VendasPageProps {
  searchParams: Promise<{ tipo?: string; faixa?: string }>
}

export default async function VendasPage({ searchParams }: VendasPageProps) {
  const [imoveis, params] = await Promise.all([
    client.fetch(IMOVEIS_QUERY).catch(() => []),
    searchParams,
  ])

  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12 md:py-16">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-4">
            Imóveis à Venda
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-[#111111] tracking-tight">
            Encontre o imóvel certo
          </h1>
        </div>
      </section>

      <ImovelGrid imoveis={imoveis} initialTipo={params.tipo || ''} initialFaixa={params.faixa || ''} />
    </>
  )
}
