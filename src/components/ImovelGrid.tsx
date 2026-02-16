'use client'

import { useState, useMemo } from 'react'
import ImovelCard from './ImovelCard'

type Imovel = {
  _id: string
  titulo: string
  slug: { current: string }
  tipo: string
  preco: number
  localizacao: string
  bairro?: string
  area?: number
  quartos?: number
  banheiros?: number
  vagas?: number
  fotoCapa?: {
    asset: { _ref: string }
    alt?: string
  }
}

interface ImovelGridProps {
  imoveis: Imovel[]
  initialTipo?: string
  initialFaixa?: string
}

const TIPOS = [
  { value: '', label: 'Todos os tipos' },
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'studio', label: 'Studio' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'comercial', label: 'Comercial' },
]

const FAIXAS = [
  { value: '', label: 'Qualquer preço' },
  { value: '0-500000', label: 'Até R$ 500 mil' },
  { value: '500000-1000000', label: 'R$ 500 mil – R$ 1 mi' },
  { value: '1000000-2000000', label: 'R$ 1 mi – R$ 2 mi' },
  { value: '2000000-', label: 'Acima de R$ 2 mi' },
]

export default function ImovelGrid({ imoveis, initialTipo = '', initialFaixa = '' }: ImovelGridProps) {
  const [tipo, setTipo] = useState(initialTipo)
  const [faixa, setFaixa] = useState(initialFaixa)
  const [busca, setBusca] = useState('')

  const filtered = useMemo(() => {
    return imoveis.filter((im) => {
      if (tipo && im.tipo !== tipo) return false

      if (faixa) {
        const [min, max] = faixa.split('-').map((v) => (v ? Number(v) : null))
        if (min !== null && im.preco < min) return false
        if (max !== null && im.preco > max) return false
      }

      if (busca.trim()) {
        const q = busca.toLowerCase()
        const haystack = `${im.titulo} ${im.localizacao} ${im.bairro || ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
  }, [imoveis, tipo, faixa, busca])

  const hasFilters = tipo || faixa || busca.trim()

  return (
    <>
      {/* Filters bar */}
      <div className="bg-white border-b border-[#e5e5e5] sticky top-[72px] z-30">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999999]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Buscar por título ou localização..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-[#e5e5e5] text-[13px] text-[#111111] placeholder:text-[#999999] focus:outline-none focus:border-[#111111] transition-colors bg-white"
              />
            </div>

            {/* Tipo */}
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="px-4 py-2.5 border border-[#e5e5e5] text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-8"
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            {/* Faixa de preço */}
            <select
              value={faixa}
              onChange={(e) => setFaixa(e.target.value)}
              className="px-4 py-2.5 border border-[#e5e5e5] text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-8"
            >
              {FAIXAS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={() => { setTipo(''); setFaixa(''); setBusca('') }}
                className="px-4 py-2.5 text-[12px] font-medium tracking-wide uppercase text-[#666666] border border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111] transition-colors"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="mt-2 text-[11px] text-[#999999]">
            {filtered.length} {filtered.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            {hasFilters && ' (com filtros aplicados)'}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[15px] text-[#666666]">Nenhum imóvel encontrado com os filtros selecionados.</p>
            <button
              onClick={() => { setTipo(''); setFaixa(''); setBusca('') }}
              className="mt-4 text-[13px] font-medium text-[#b8976a] hover:underline"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((im) => (
              <ImovelCard key={im._id} imovel={im} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
