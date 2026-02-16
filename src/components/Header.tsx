import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Manuela Rezende
        </Link>
        <nav className="hidden gap-6 md:flex">
          <Link href="/vendas" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Imóveis à Venda
          </Link>
          <Link href="/a-corretora" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            A Corretora
          </Link>
          <Link href="/contato" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Contato
          </Link>
        </nav>
        {/* Mobile nav is a future enhancement — Phase 1 establishes structure only */}
      </div>
    </header>
  )
}
