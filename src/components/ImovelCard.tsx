import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

interface ImovelCardProps {
  imovel: {
    _id: string
    titulo: string
    slug: { current: string }
    tipo: string
    preco: number
    localizacao: string
    area?: number
    quartos?: number
    banheiros?: number
    vagas?: number
    fotoCapa?: {
      asset: { _ref: string }
      alt?: string
    }
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

const WHATSAPP = '5548999770241'

export default function ImovelCard({ imovel }: ImovelCardProps) {
  const { titulo, slug, tipo, preco, localizacao, area, quartos, banheiros, vagas, fotoCapa } = imovel
  const imageUrl = fotoCapa?.asset
    ? urlFor(fotoCapa).width(600).height(400).fit('crop').auto('format').url()
    : null

  const waMsg = encodeURIComponent(`Olá Manuela, tenho interesse no imóvel "${titulo}". Poderia me enviar mais informações?`)
  const waUrl = `https://wa.me/${WHATSAPP}?text=${waMsg}`

  return (
    <article className="group bg-white border border-[#e5e5e5] hover:border-[#999999] hover:shadow-sm transition-all">
      {/* Photo */}
      <Link href={`/imoveis/${slug.current}`} className="block relative overflow-hidden" style={{ paddingBottom: '66.67%' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={fotoCapa?.alt || titulo}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[#f5f5f5] flex items-center justify-center">
            <span className="text-[11px] tracking-widest uppercase text-[#999999]">Sem foto</span>
          </div>
        )}
        {/* Tipo badge */}
        <span className="absolute top-3 left-3 bg-white text-[10px] font-semibold tracking-[0.15em] uppercase text-[#111111] px-2.5 py-1">
          {TIPO_LABEL[tipo] || tipo}
        </span>
      </Link>

      {/* Info */}
      <div className="p-5">
        <p className="text-[11px] tracking-[0.15em] uppercase text-[#999999] mb-1">{localizacao}</p>
        <Link href={`/imoveis/${slug.current}`}>
          <h3 className="text-[15px] font-semibold text-[#111111] leading-snug hover:text-[#444444] transition-colors line-clamp-2">
            {titulo}
          </h3>
        </Link>

        <p className="mt-2 text-[18px] font-light text-[#111111]">{formatPreco(preco)}</p>

        {/* Specs */}
        {(area || quartos || banheiros || vagas) && (
          <div className="mt-3 flex flex-wrap gap-3 text-[12px] text-[#666666]">
            {area && <span>{area} m²</span>}
            {quartos && <span>{quartos} {quartos === 1 ? 'quarto' : 'quartos'}</span>}
            {banheiros && <span>{banheiros} {banheiros === 1 ? 'banheiro' : 'banheiros'}</span>}
            {vagas && <span>{vagas} {vagas === 1 ? 'vaga' : 'vagas'}</span>}
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link
            href={`/imoveis/${slug.current}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-[#e5e5e5] text-[12px] font-semibold tracking-wide uppercase text-[#111111] hover:border-[#111111] transition-colors"
          >
            Ver Detalhes
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contato via WhatsApp"
            className="flex items-center justify-center px-3 py-2.5 bg-[#25d366] text-white hover:bg-[#1ebe5d] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}
