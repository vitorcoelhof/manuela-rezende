'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 lg:px-8" style={{ height: '72px' }}>
        {/* Logo / Brand */}
        <Link href="/" className="flex flex-col leading-none group" onClick={() => setOpen(false)}>
          <span className="text-[15px] font-semibold tracking-[0.12em] uppercase text-[#111111] group-hover:text-[#444444] transition-colors">
            Manuela Rezende
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-[#b8976a] font-medium mt-0.5">
            Imóveis
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/vendas"
            className="text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] transition-colors uppercase"
          >
            Imóveis à Venda
          </Link>
          <Link
            href="/a-corretora"
            className="text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] transition-colors uppercase"
          >
            A Corretora
          </Link>
          <Link
            href="/contato"
            className="text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] transition-colors uppercase"
          >
            Contato
          </Link>
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 -mr-1"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block w-5 h-px bg-[#111111] transition-transform duration-200 origin-center ${open ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-[#111111] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-3.5 h-px bg-[#111111] transition-transform duration-200 origin-center ${open ? 'w-5 -translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5]">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-0">
            <Link
              href="/vendas"
              onClick={() => setOpen(false)}
              className="py-4 text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] uppercase border-b border-[#f0f0f0] transition-colors"
            >
              Imóveis à Venda
            </Link>
            <Link
              href="/a-corretora"
              onClick={() => setOpen(false)}
              className="py-4 text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] uppercase border-b border-[#f0f0f0] transition-colors"
            >
              A Corretora
            </Link>
            <Link
              href="/contato"
              onClick={() => setOpen(false)}
              className="py-4 text-[13px] font-medium tracking-wide text-[#444444] hover:text-[#111111] uppercase transition-colors"
            >
              Contato
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
