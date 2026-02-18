import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { CORRETORA_QUERY } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'A Corretora',
  description: 'Conheça Manuela Rezende — corretora de imóveis especializada em imóveis residenciais em Florianópolis. Experiência, dedicação e atendimento personalizado.',
  openGraph: {
    title: 'A Corretora | Manuela Rezende Imóveis',
    description: 'Conheça Manuela Rezende — corretora especializada em imóveis residenciais.',
    type: 'website',
    locale: 'pt_BR',
  },
}

const WHATSAPP = '5548999770241'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá Manuela, gostaria de conhecer mais sobre o seu trabalho')}`

// Static fallback values (used until Sanity data is populated)
const STATIC_VALORES = [
  {
    titulo: 'Atendimento Personalizado',
    descricao: 'Cada cliente tem necessidades únicas. Dedico atenção total para entender o que você procura e encontrar o imóvel certo.',
  },
  {
    titulo: 'Transparência',
    descricao: 'Informações claras e honestas em todas as etapas da negociação. Sem surpresas, sem promessas vazias.',
  },
  {
    titulo: 'Conhecimento do Mercado',
    descricao: 'Atuo em Florianópolis com profundo conhecimento dos bairros, preços e oportunidades do mercado imobiliário local.',
  },
]

export default async function ACorretoraPage() {
  const corretora = await client.fetch(CORRETORA_QUERY).catch(() => null)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-0">
            {/* Text */}
            <div className="flex-1 py-20 md:py-32 md:pr-12">
              <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-6">
                A Corretora
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                Manuela Rezende
              </h1>
              {corretora?.creci && (
                <p className="mt-3 text-[13px] text-[#888888] tracking-wide">
                  CRECI {corretora.creci}
                </p>
              )}
              <p className="mt-6 text-[15px] text-[#999999] max-w-lg leading-relaxed">
                Corretora de imóveis especializada em imóveis residenciais em Florianópolis.
                Atendimento direto, personalizado e com total transparência.
              </p>
              <div className="mt-10">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#111111] text-[13px] font-semibold tracking-wide uppercase hover:bg-[#f5f5f5] transition-colors"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>

            {/* Photo */}
            <div className="hidden md:flex flex-shrink-0 w-[300px] lg:w-[360px] relative self-stretch">
              <Image
                src="/manuela-rezende.png"
                alt="Manuela Rezende — Corretora de Imóveis"
                fill
                className="object-cover object-top"
                sizes="360px"
              />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#111111] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Photo section */}
      <section className="bg-white border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-64 md:w-64 md:h-80">
              <Image
                src="/manuela-rezenda-transparente.png"
                alt="Manuela Rezende — Corretora de Imóveis"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 192px, 256px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-6">
              Sobre Mim
            </p>
            {corretora?.bio ? (
              <div className="space-y-4 text-[15px] text-[#444444] leading-relaxed text-justify">
                {corretora.bio.map((block: { _key: string; children?: Array<{ _key: string; text: string }> }, i: number) => (
                  <p key={block._key || i}>
                    {block.children?.map((child) => child.text).join('')}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-4 text-[15px] text-[#444444] leading-relaxed text-justify">
                <p>
                  Sou corretora de imóveis atuando em Florianópolis com foco em imóveis residenciais.
                  Minha missão é simplificar um dos momentos mais importantes da sua vida — a compra ou
                  venda do seu imóvel — com atenção, profissionalismo e total dedicação.
                </p>
                <p>
                  Acredito que a confiança é a base de qualquer boa negociação. Por isso, ofereço
                  informações claras, presença em todas as etapas e um atendimento que coloca seus
                  interesses sempre em primeiro lugar.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-[#e5e5e5]" />

      {/* Values */}
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-12">
            Meus Valores
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(corretora?.valores?.length
              ? corretora.valores
              : STATIC_VALORES
            ).map((v: { titulo: string; descricao: string }, i: number) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#b8976a] font-medium mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-[15px] font-semibold text-[#111111] mb-2">{v.titulo}</h3>
                <p className="text-[13px] text-[#666666] leading-relaxed">{v.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-light text-[#111111] tracking-tight">
              Vamos conversar sobre seu imóvel?
            </h2>
            <p className="text-[13px] text-[#666666] mt-1">
              Envie uma mensagem diretamente pelo WhatsApp.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 bg-[#111111] text-white text-[13px] font-semibold tracking-wide uppercase hover:bg-[#333333] transition-colors"
            >
              Falar pelo WhatsApp
            </a>
            <Link
              href="/vendas"
              className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 border border-[#e5e5e5] text-[#111111] text-[13px] font-semibold tracking-wide uppercase hover:border-[#999999] transition-colors"
            >
              Ver Imóveis
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
