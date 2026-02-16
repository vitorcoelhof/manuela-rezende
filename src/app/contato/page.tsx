import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Manuela Rezende. Atendimento pelo WhatsApp, rápido e personalizado. Florianópolis - SC.',
  openGraph: {
    title: 'Contato | Manuela Rezende Imóveis',
    description: 'Entre em contato com Manuela Rezende pelo WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
  },
}

const WHATSAPP = '5548999770241'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá Manuela, gostaria de mais informações sobre imóveis')}`
const INSTAGRAM = 'manuelarezendeimoveis'

export default function ContatoPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white border-b border-[#e5e5e5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 md:py-24">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#b8976a] font-medium mb-6">
            Contato
          </p>
          <h1 className="text-4xl md:text-5xl font-light text-[#111111] tracking-tight">
            Fale com a Manuela
          </h1>
          <p className="mt-4 text-[15px] text-[#666666] max-w-xl leading-relaxed">
            Atendimento direto e personalizado. Sem formulários, sem intermediários.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#e5e5e5] p-8 hover:border-[#25d366] hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25d366]/10 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25d366" className="h-5 w-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-[#111111] uppercase tracking-wide mb-2">WhatsApp</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed mb-3">
                Canal principal de atendimento. Resposta rápida em horário comercial.
              </p>
              <p className="text-[13px] font-medium text-[#25d366] group-hover:underline">(48) 99977-0241 →</p>
            </a>

            {/* Instagram */}
            <a
              href={`https://instagram.com/${INSTAGRAM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-[#e5e5e5] p-8 hover:border-[#b8976a] hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#b8976a]/10 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#b8976a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-[#111111] uppercase tracking-wide mb-2">Instagram</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed mb-3">
                Acompanhe os imóveis disponíveis e novidades do mercado.
              </p>
              <p className="text-[13px] font-medium text-[#b8976a] group-hover:underline">@{INSTAGRAM} →</p>
            </a>

            {/* Location */}
            <div className="bg-white border border-[#e5e5e5] p-8">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#111111]/5 mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-[#111111] uppercase tracking-wide mb-2">Localização</h3>
              <p className="text-[13px] text-[#666666] leading-relaxed">
                Florianópolis, Santa Catarina
                <br />
                Atendimento em toda a região
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-[22px] font-light tracking-tight">Pronto para encontrar seu imóvel?</h2>
            <p className="text-[13px] text-[#999999] mt-1">Mande uma mensagem agora mesmo.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#111111] text-[13px] font-semibold tracking-wide uppercase hover:bg-[#f5f5f5] transition-colors"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
