import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SearchStrip from '@/components/SearchStrip'

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
    <>
      {/* Hero */}
      <section className="bg-[#111111] text-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-0">
            {/* Text content */}
            <div className="flex-1 py-24 md:py-36 md:pr-12">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-6">
                Corretora de Imóveis
              </p>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                Encontre o imóvel certo com quem entende do mercado.
              </h1>
              <p className="mt-6 text-[15px] text-[#999999] max-w-lg leading-relaxed">
                Atendimento personalizado, seleção de imóveis residenciais e contato direto pelo WhatsApp.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/vendas"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#111111] text-[13px] font-semibold tracking-wide uppercase hover:bg-[#f5f5f5] transition-colors"
                >
                  Ver Imóveis
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white text-[13px] font-semibold tracking-wide uppercase hover:border-white/60 transition-colors"
                >
                  Falar com a Manuela
                </Link>
              </div>
            </div>

            {/* Manuela photo */}
            <div className="hidden md:flex flex-shrink-0 w-[340px] lg:w-[400px] relative self-stretch">
              <Image
                src="/manuela-rezende.png"
                alt="Manuela Rezende — Corretora de Imóveis"
                fill
                className="object-cover object-top"
                priority
                sizes="400px"
              />
              {/* Fade gradient on left edge to blend with dark bg */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#111111] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Search strip */}
      <SearchStrip />

      {/* Divider */}
      <div className="h-px bg-[#e5e5e5]" />

      {/* Feature strip */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-3">01</p>
              <h3 className="text-[15px] font-semibold text-[#111111] mb-2">Imóveis Residenciais</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed">
                Casas, apartamentos e terrenos selecionados com atenção aos detalhes que importam para você.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-3">02</p>
              <h3 className="text-[15px] font-semibold text-[#111111] mb-2">Atendimento Direto</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed">
                Sem intermediários. Fale diretamente com a Manuela pelo WhatsApp e tire todas as suas dúvidas.
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-3">03</p>
              <h3 className="text-[15px] font-semibold text-[#111111] mb-2">Experiência e Confiança</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed">
                Profissional dedicada a encontrar o imóvel certo para cada cliente, com transparência em cada etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#f5f5f5] border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-light text-[#111111] tracking-tight">
              Pronto para encontrar seu imóvel?
            </h2>
            <p className="text-[13px] text-[#666666] mt-1">
              Explore os imóveis disponíveis ou entre em contato diretamente.
            </p>
          </div>
          <Link
            href="/vendas"
            className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 bg-[#111111] text-white text-[13px] font-semibold tracking-wide uppercase hover:bg-[#333333] transition-colors"
          >
            Ver Imóveis à Venda
          </Link>
        </div>
      </section>
    </>
  )
}
