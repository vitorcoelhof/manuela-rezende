import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#111111]">
              Manuela Rezende
            </p>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#b8976a] font-medium mt-0.5">
              Corretora de Imóveis
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            <Link href="/vendas" className="text-[12px] tracking-wide uppercase text-[#444444] hover:text-[#111111] transition-colors">
              Imóveis à Venda
            </Link>
            <Link href="/a-corretora" className="text-[12px] tracking-wide uppercase text-[#444444] hover:text-[#111111] transition-colors">
              A Corretora
            </Link>
            <Link href="/contato" className="text-[12px] tracking-wide uppercase text-[#444444] hover:text-[#111111] transition-colors">
              Contato
            </Link>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-[#e5e5e5]">
          <p className="text-[11px] text-[#999999] tracking-wide">
            © {new Date().getFullYear()} Manuela Rezende Imóveis. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
