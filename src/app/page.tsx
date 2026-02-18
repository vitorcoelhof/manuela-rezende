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
            {/* Text content */}
            <div className="flex-1 py-24 md:py-36 md:pr-12">
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
                  className="hidden sm:inline-flex items-center justify-center px-8 py-3.5 border border-white/30 text-white text-[13px] font-semibold tracking-wide uppercase hover:border-white/60 transition-colors"
                >
                  Falar com a Manuela
                </Link>
              </div>

              {/* Manuela card - Mobile only */}
              <div className="sm:hidden mt-8 bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#b8976a]">
                    <Image
                      src="/manuela-rezende.png"
                      alt="Manuela Rezende"
                      fill
                      className="object-cover object-top"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-[14px]">Manuela Rezende</h3>
                    <p className="text-[12px] text-[#b8976a] mt-0.5">Corretora de Imóveis</p>
                    <a
                      href={`https://wa.me/5548999770241?text=${encodeURIComponent('Olá Manuela, tenho interesse em conhecer mais sobre os imóveis disponíveis')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-[#25d366] text-white text-[11px] font-semibold tracking-wide uppercase hover:bg-[#1ebe5d] transition-colors rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Falar
                    </a>
                  </div>
                </div>
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

      {/* Quem Atende Você - mobile only */}
      <section className="md:hidden bg-[#f5f5f5] border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center text-center">
            {/* Photo */}
            <div className="w-24 h-24 relative mb-4 rounded-full overflow-hidden ring-2 ring-[#b8976a]">
              <Image
                src="/manuela-rezende.png"
                alt="Manuela Rezende"
                fill
                className="object-cover object-top"
                sizes="96px"
              />
            </div>
            {/* Label */}
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-2">
              Quem Atende Você
            </p>
            {/* Name */}
            <h3 className="text-[18px] font-semibold text-[#111111] mb-1">Manuela Rezende</h3>
            {/* Title */}
            <p className="text-[12px] text-[#999999] mb-6">Corretora de Imóveis</p>
            {/* CTA */}
            <a
              href={`https://wa.me/5548999770241?text=${encodeURIComponent('Olá Manuela, gostaria de conhecer mais sobre os imóveis disponíveis')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#25d366] text-white text-[13px] font-semibold tracking-wide uppercase hover:bg-[#1ebe5d] transition-colors"
            >
              Falar pelo WhatsApp
            </a>
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
