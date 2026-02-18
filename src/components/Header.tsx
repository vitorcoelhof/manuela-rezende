'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [open, setOpen] = useState(false)
  const instagram = 'manuelarezendeimoveis'

  return (
    <>
      {/* Mobile Instagram banner */}
      <div className="md:hidden bg-[#b8976a] py-2 px-6">
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-white text-[12px] font-medium tracking-wide hover:opacity-80 transition-opacity"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.25-.148-4.768-1.693-4.917-4.919-.058-1.265-.07-1.645-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
            <circle cx="12" cy="12" r="3.5"/>
            <circle cx="18.406" cy="5.594" r="0.894"/>
          </svg>
          @{instagram}
        </a>
      </div>

      {/* Main header */}
      <header className="sticky top-8 md:top-0 z-40 w-full bg-white/98 backdrop-blur-sm border-b border-[#e5e5e5]">
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
    </>
  )
}
