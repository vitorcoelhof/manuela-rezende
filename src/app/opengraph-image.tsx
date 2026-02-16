import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Manuela Rezende Imóveis'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          backgroundColor: '#111111',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Left: text content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#b8976a',
              marginBottom: '24px',
            }}
          >
            Corretora de Imóveis
          </div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 300,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '24px',
            }}
          >
            Manuela Rezende
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#999999',
              lineHeight: 1.5,
              maxWidth: '420px',
            }}
          >
            Imóveis residenciais selecionados. Atendimento direto pelo WhatsApp.
          </div>
          {/* Gold divider */}
          <div
            style={{
              width: '40px',
              height: '2px',
              backgroundColor: '#b8976a',
              marginTop: '40px',
            }}
          />
        </div>

        {/* Right: photo */}
        <div
          style={{
            width: '380px',
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://manuela-rezende.vercel.app/manuela-rezende.png"
            alt="Manuela Rezende"
            style={{
              width: '380px',
              height: '630px',
              objectFit: 'cover',
              objectPosition: 'top',
            }}
          />
          {/* fade on left */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '100%',
              background: 'linear-gradient(to right, #111111, transparent)',
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  )
}
