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
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa', label: 'Casa' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'studio', label: 'Studio' },
  { value: 'terreno', label: 'Terreno' },
]

const FAIXAS = [
  { value: '', label: 'Qualquer preço' },
  { value: '0-500000', label: 'Até R$ 500 mil' },
  { value: '500000-1000000', label: 'R$ 500 mil – R$ 1 mi' },
  { value: '1000000-2000000', label: 'R$ 1 mi – R$ 2 mi' },
  { value: '2000000-', label: 'Acima de R$ 2 mi' },
]

const QUARTOS = [
  { value: '', label: 'Qualquer nº de quartos' },
  { value: '1', label: '1 quarto' },
  { value: '2', label: '2 quartos' },
  { value: '3', label: '3 quartos' },
  { value: '4', label: '4 quartos' },
  { value: '5', label: '5+ quartos' },
]

const BANHEIROS = [
  { value: '', label: 'Qualquer nº de banheiros' },
  { value: '1', label: '1 banheiro' },
  { value: '2', label: '2 banheiros' },
  { value: '3', label: '3 banheiros' },
  { value: '4', label: '4+ banheiros' },
]

const VAGAS = [
  { value: '', label: 'Qualquer nº de vagas' },
  { value: '1', label: '1 vaga' },
  { value: '2', label: '2 vagas' },
  { value: '3', label: '3 vagas' },
  { value: '4', label: '4+ vagas' },
]

export default function ImovelGrid({ imoveis, initialTipo = '', initialFaixa = '' }: ImovelGridProps) {
  const [tipo, setTipo] = useState(initialTipo)
  const [faixa, setFaixa] = useState(initialFaixa)
  const [quartos, setQuartos] = useState('')
  const [banheiros, setBanheiros] = useState('')
  const [vagas, setVagas] = useState('')

  const filtered = useMemo(() => {
    return imoveis.filter((im) => {
      if (tipo && im.tipo !== tipo) return false

      if (faixa) {
        const [min, max] = faixa.split('-').map((v) => (v ? Number(v) : null))
        if (min !== null && im.preco < min) return false
        if (max !== null && im.preco > max) return false
      }

      if (quartos) {
        const qtQuartos = Number(quartos)
        if (quartos === '5') {
          if (!im.quartos || im.quartos < 5) return false
        } else {
          if (!im.quartos || im.quartos !== qtQuartos) return false
        }
      }

      if (banheiros) {
        const qtBanheiros = Number(banheiros)
        if (banheiros === '4') {
          if (!im.banheiros || im.banheiros < 4) return false
        } else {
          if (!im.banheiros || im.banheiros !== qtBanheiros) return false
        }
      }

      if (vagas) {
        const qtVagas = Number(vagas)
        if (vagas === '4') {
          if (!im.vagas || im.vagas < 4) return false
        } else {
          if (!im.vagas || im.vagas !== qtVagas) return false
        }
      }

      return true
    })
  }, [imoveis, tipo, faixa, quartos, banheiros, vagas])

  const hasFilters = tipo || faixa || quartos || banheiros || vagas

  return (
    <>
      {/* Filters bar */}
      <div className="bg-white border-b border-[#e5e5e5] sm:sticky sm:top-[72px] z-30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2 sm:py-4">
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3">
            {/* Tipo */}
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-[#e5e5e5] text-[11px] sm:text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-6 sm:pr-8"
            >
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            {/* Faixa de preço */}
            <select
              value={faixa}
              onChange={(e) => setFaixa(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-[#e5e5e5] text-[11px] sm:text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-6 sm:pr-8"
            >
              {FAIXAS.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>

            {/* Quartos */}
            <select
              value={quartos}
              onChange={(e) => setQuartos(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-[#e5e5e5] text-[11px] sm:text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-6 sm:pr-8"
            >
              {QUARTOS.map((q) => (
                <option key={q.value} value={q.value}>{q.label}</option>
              ))}
            </select>

            {/* Banheiros */}
            <select
              value={banheiros}
              onChange={(e) => setBanheiros(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-[#e5e5e5] text-[11px] sm:text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-6 sm:pr-8"
            >
              {BANHEIROS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>

            {/* Vagas */}
            <select
              value={vagas}
              onChange={(e) => setVagas(e.target.value)}
              className="px-2 sm:px-4 py-1.5 sm:py-2.5 border border-[#e5e5e5] text-[11px] sm:text-[13px] text-[#111111] focus:outline-none focus:border-[#111111] transition-colors bg-white appearance-none pr-6 sm:pr-8 col-span-2 sm:col-span-1"
            >
              {VAGAS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>

            {/* Clear */}
            {hasFilters && (
              <button
                onClick={() => { setTipo(''); setFaixa(''); setQuartos(''); setBanheiros(''); setVagas('') }}
                className="px-2 sm:px-4 py-1.5 sm:py-2.5 text-[10px] sm:text-[12px] font-medium tracking-wide uppercase text-[#666666] border border-[#e5e5e5] hover:border-[#111111] hover:text-[#111111] transition-colors col-span-2 sm:col-span-1"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] text-[#999999]">
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
              onClick={() => { setTipo(''); setFaixa(''); setQuartos(''); setBanheiros(''); setVagas('') }}
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
