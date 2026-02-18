import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SearchStrip from '@/components/SearchStrip'
import ImovelCard from '@/components/ImovelCard'
import { client } from '@/sanity/lib/client'
import { IMOVEIS_QUERY, CORRETORA_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60

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

// Static fallbacks (used when CMS fields are not yet filled)
const FALLBACK_HERO_TITULO = 'Encontre o imóvel certo com quem entende do mercado.'
const FALLBACK_HERO_SUBTITULO = 'Atendimento personalizado, seleção de imóveis residenciais e contato direto pelo WhatsApp.'
const FALLBACK_CTA_TITULO = 'Pronto para encontrar seu imóvel?'
const FALLBACK_CTA_SUBTITULO = 'Explore os imóveis disponíveis ou entre em contato diretamente.'
const FALLBACK_DIFERENCIAIS = [
  {
    titulo: 'Imóveis Residenciais',
    descricao: 'Casas, apartamentos e terrenos selecionados com atenção aos detalhes que importam para você.',
  },
  {
    titulo: 'Atendimento Direto',
    descricao: 'Sem intermediários. Fale diretamente com a Manuela pelo WhatsApp e tire todas as suas dúvidas.',
  },
  {
    titulo: 'Experiência e Confiança',
    descricao: 'Profissional dedicada a encontrar o imóvel certo para cada cliente, com transparência em cada etapa.',
  },
]

export default async function HomePage() {
  const [imoveis, corretora] = await Promise.all([
    client.fetch(IMOVEIS_QUERY, {}, { next: { revalidate: 60 } }),
    client.fetch(CORRETORA_QUERY, {}, { next: { revalidate: 60 } }),
  ])

  const heroTitulo = corretora?.heroTitulo || FALLBACK_HERO_TITULO
  const heroSubtitulo = corretora?.heroSubtitulo || FALLBACK_HERO_SUBTITULO
  const ctaTitulo = corretora?.ctaTitulo || FALLBACK_CTA_TITULO
  const ctaSubtitulo = corretora?.ctaSubtitulo || FALLBACK_CTA_SUBTITULO
  const diferenciais = corretora?.homeDiferenciais?.length ? corretora.homeDiferenciais : FALLBACK_DIFERENCIAIS

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] text-white overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-0">
            {/* Manuela photo - mobile version (appears before text on mobile) */}
            <div className="md:hidden mb-6 w-40 h-48 relative flex-shrink-0">
              <Image
                src="/manuela-rezende.png"
                alt="Manuela Rezende — Corretora de Imóveis"
                fill
                className="object-cover object-top"
                priority
                sizes="160px"
              />
            </div>

            {/* Text content */}
            <div className="flex-1 py-24 md:py-36 md:pr-12 text-center md:text-left">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-6">
                Corretora de Imóveis
              </p>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-tight">
                {heroTitulo}
              </h1>
              <p className="mt-6 text-[15px] text-[#999999] max-w-lg leading-relaxed">
                {heroSubtitulo}
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

            {/* Manuela photo - desktop version (large) */}
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

      {/* Imóveis em destaque */}
      {imoveis && imoveis.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-2">
                  Disponíveis agora
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-[#111111] tracking-tight">
                  Imóveis à Venda
                </h2>
              </div>
              <Link
                href="/vendas"
                className="shrink-0 text-[12px] font-medium tracking-wide uppercase text-[#444444] hover:text-[#111111] transition-colors border-b border-[#e5e5e5] hover:border-[#111111] pb-0.5"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {imoveis.slice(0, 6).map((imovel: (typeof imoveis)[number]) => (
                <ImovelCard key={imovel._id} imovel={imovel} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="h-px bg-[#e5e5e5]" />

      {/* Feature strip */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {diferenciais.map((item: { titulo: string; descricao: string }, i: number) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-[15px] font-semibold text-[#111111] mb-2">{item.titulo}</h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#f5f5f5] border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-light text-[#111111] tracking-tight">
              {ctaTitulo}
            </h2>
            <p className="text-[13px] text-[#666666] mt-1">
              {ctaSubtitulo}
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
