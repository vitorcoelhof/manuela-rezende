import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-sm border-b border-[#e5e5e5]">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 lg:px-8" style={{ height: '72px' }}>
        {/* Logo / Brand */}
        <Link href="/" className="flex flex-col leading-none group">
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

        {/* Mobile menu icon */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-1"
          aria-label="Menu"
        >
          <span className="block w-5 h-px bg-[#111111]" />
          <span className="block w-5 h-px bg-[#111111]" />
          <span className="block w-3.5 h-px bg-[#111111]" />
        </button>
      </div>
    </header>
  )
}
