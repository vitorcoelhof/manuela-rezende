'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TIPOS = [
  { value: '', label: 'Tipo' },
  { value: 'casa', label: 'Casa' },
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'terreno', label: 'Terreno' },
]

const FAIXAS = [
  { value: '', label: 'Preço' },
  { value: '0-500000', label: 'Até R$ 500 mil' },
  { value: '500000-1000000', label: 'R$ 500k – R$ 1mi' },
  { value: '1000000-2000000', label: 'R$ 1mi – R$ 2mi' },
  { value: '2000000-', label: 'Acima de R$ 2mi' },
]

export default function SearchStrip() {
  const router = useRouter()
  const [tipo, setTipo] = useState('')
  const [faixa, setFaixa] = useState('')

  function handleSearch() {
    const params = new URLSearchParams()
    if (tipo) params.set('tipo', tipo)
    if (faixa) params.set('faixa', faixa)
    router.push(`/vendas?${params.toString()}`)
  }

  return (
    <section className="bg-[#111111]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#b8976a] font-medium shrink-0 sm:mr-2 hidden sm:block">
            Busca Rápida
          </p>

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-[13px] focus:outline-none focus:border-white/50 transition-colors appearance-none"
          >
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value} className="bg-[#111111]">{t.label}</option>
            ))}
          </select>

          <select
            value={faixa}
            onChange={(e) => setFaixa(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white text-[13px] focus:outline-none focus:border-white/50 transition-colors appearance-none"
          >
            {FAIXAS.map((f) => (
              <option key={f.value} value={f.value} className="bg-[#111111]">{f.label}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="px-8 py-3 bg-white text-[#111111] text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-[#f5f5f5] transition-colors shrink-0"
          >
            Buscar
          </button>
        </div>
      </div>
    </section>
  )
}
