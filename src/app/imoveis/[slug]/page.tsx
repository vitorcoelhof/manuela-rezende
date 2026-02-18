import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { IMOVEL_QUERY, IMOVEIS_SLUGS_QUERY } from '@/sanity/lib/queries'
import GalleryClient from './GalleryClient'
import MapClient from './MapClient'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(IMOVEIS_SLUGS_QUERY).catch(() => [])
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const imovel = await client.fetch(IMOVEL_QUERY, { slug }).catch(() => null)
  if (!imovel) return { title: 'Imóvel não encontrado' }

  return {
    title: imovel.titulo,
    description: `${imovel.tipo === 'casa' ? 'Casa' : imovel.tipo} em ${imovel.localizacao}. ${imovel.area ? `${imovel.area} m². ` : ''}${imovel.quartos ? `${imovel.quartos} quartos. ` : ''}Contato via WhatsApp.`,
    openGraph: {
      title: `${imovel.titulo} | Manuela Rezende Imóveis`,
      description: `${imovel.tipo} em ${imovel.localizacao}`,
      type: 'website',
      locale: 'pt_BR',
      ...((imovel.fotoCapa?.asset || imovel.fotos?.[0]?.asset) && {
        images: [{ url: urlFor(imovel.fotoCapa || imovel.fotos[0]).width(1200).height(630).fit('crop').url() }],
      }),
    },
  }
}

function formatPreco(preco: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(preco)
}

const TIPO_LABEL: Record<string, string> = {
  casa: 'Casa',
  apartamento: 'Apartamento',
  terreno: 'Terreno',
  comercial: 'Comercial',
}

export default async function ImovelPage({ params }: PageProps) {
  const { slug } = await params
  const imovel = await client.fetch(IMOVEL_QUERY, { slug }).catch(() => null)

  if (!imovel) notFound()

  const { titulo, tipo, preco, localizacao, area, quartos, banheiros, vagas, descricao, fotos, cep } = imovel

  const waMsg = encodeURIComponent(`Olá Manuela, tenho interesse no imóvel "${titulo}" (${localizacao}). Poderia me enviar mais informações?`)
  const waUrl = `https://wa.me/5548999770241?text=${waMsg}`

  const imageUrls = (fotos || [])
    .filter((f: { asset?: { _ref: string } }) => f?.asset)
    .map((f: { asset: { _ref: string }; alt?: string }, i: number) => ({
      url: urlFor(f).width(1200).height(800).fit('crop').auto('format').url(),
      thumb: urlFor(f).width(300).height(200).fit('crop').auto('format').url(),
      alt: f.alt || `${titulo} — foto ${i + 1}`,
    }))

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-[12px] text-[#999999]">
            <Link href="/" className="hover:text-[#111111] transition-colors">Início</Link>
            <span>/</span>
            <Link href="/vendas" className="hover:text-[#111111] transition-colors">Imóveis à Venda</Link>
            <span>/</span>
            <span className="text-[#111111] truncate max-w-[200px]">{titulo}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Left: gallery + description */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            {imageUrls.length > 0 && <GalleryClient images={imageUrls} titulo={titulo} />}

            {/* Title + location */}
            <div className="mt-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-2">
                {TIPO_LABEL[tipo] || tipo} · {localizacao}
              </p>
              <h1 className="text-3xl md:text-4xl font-light text-[#111111] tracking-tight">{titulo}</h1>
            </div>

            {/* Specs */}
            {(area || quartos || banheiros || typeof vagas === 'number') && (
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {area && (
                  <div className="border border-[#e5e5e5] p-4 text-center">
                    <p className="text-[22px] font-light text-[#111111]">{area}</p>
                    <p className="text-[11px] tracking-widest uppercase text-[#999999] mt-1">m²</p>
                  </div>
                )}
                {quartos && (
                  <div className="border border-[#e5e5e5] p-4 text-center">
                    <p className="text-[22px] font-light text-[#111111]">{quartos}</p>
                    <p className="text-[11px] tracking-widest uppercase text-[#999999] mt-1">{quartos === 1 ? 'Quarto' : 'Quartos'}</p>
                  </div>
                )}
                {banheiros && (
                  <div className="border border-[#e5e5e5] p-4 text-center">
                    <p className="text-[22px] font-light text-[#111111]">{banheiros}</p>
                    <p className="text-[11px] tracking-widest uppercase text-[#999999] mt-1">{banheiros === 1 ? 'Banheiro' : 'Banheiros'}</p>
                  </div>
                )}
                {typeof vagas === 'number' && (
                  <div className="border border-[#e5e5e5] p-4 text-center">
                    <p className="text-[22px] font-light text-[#111111]">{vagas}</p>
                    <p className="text-[11px] tracking-widest uppercase text-[#999999] mt-1">{vagas === 1 ? 'Vaga' : 'Vagas'}</p>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {descricao && descricao.length > 0 && (
              <div className="mt-8">
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-4">
                  Descrição
                </h2>
                <div className="space-y-4 text-[14px] text-[#444444] leading-relaxed">
                  {descricao.map((block: { _key: string; style?: string; children?: Array<{ _key: string; text: string }> }, i: number) => (
                    <p key={block._key || i}>
                      {block.children?.map((child) => child.text).join('')}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Map */}
            {cep && (
              <div className="mt-8">
                <h2 className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-4">
                  Localização
                </h2>
                <MapClient cep={cep} titulo={titulo} />
              </div>
            )}
          </div>

          {/* Right: sticky contact card */}
          <div className="lg:col-span-1">
            <div className="sticky top-[88px] border border-[#e5e5e5] p-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-2">
                Valor
              </p>
              <p className="text-[32px] font-light text-[#111111]">{formatPreco(preco)}</p>

              <div className="mt-6 h-px bg-[#e5e5e5]" />

              <div className="mt-6 space-y-3">
                <p className="text-[12px] text-[#666666] leading-relaxed">
                  Interessado? Fale diretamente com a Manuela pelo WhatsApp.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#25d366] text-white text-[13px] font-semibold tracking-wide uppercase hover:bg-[#1ebe5d] transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Tenho Interesse
                </a>
              </div>

              <div className="mt-6 h-px bg-[#e5e5e5]" />

              <div className="mt-6">
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#999999] mb-3">Atendimento</p>
                <div className="flex items-center gap-3">
                  <Image
                    src="/manuela-rezende.png"
                    alt="Manuela Rezende"
                    width={40}
                    height={40}
                    className="rounded-full object-cover object-top"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-[#111111]">Manuela Rezende</p>
                    <p className="text-[11px] text-[#999999]">Corretora de Imóveis</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/vendas"
                  className="text-[12px] text-[#666666] hover:text-[#111111] transition-colors"
                >
                  ← Ver outros imóveis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
