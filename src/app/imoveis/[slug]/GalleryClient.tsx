'use client'

import { useState } from 'react'
import Image from 'next/image'

interface GalleryImage {
  url: string
  thumb: string
  alt: string
}

interface GalleryClientProps {
  images: GalleryImage[]
  titulo: string
}

export default function GalleryClient({ images, titulo }: GalleryClientProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (images.length === 0) return null

  return (
    <>
      {/* Main photo */}
      <div
        className="relative w-full overflow-hidden cursor-zoom-in bg-[#f5f5f5]"
        style={{ paddingBottom: '66.67%' }}
        onClick={() => setLightbox(active)}
      >
        <Image
          src={images[active].url}
          alt={images[active].alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
        {images.length > 1 && (
          <span className="absolute bottom-3 right-3 bg-black/50 text-white text-[11px] tracking-wide px-2.5 py-1">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden transition-opacity ${i === active ? 'ring-2 ring-[#111111]' : 'opacity-60 hover:opacity-100'}`}
              style={{ paddingBottom: '100%' }}
              aria-label={`Ver foto ${i + 1}`}
            >
              <Image
                src={img.thumb}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-white/70 hover:text-white"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
              aria-label="Foto anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full px-12"
            style={{ aspectRatio: '3/2' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].url}
              alt={images[lightbox].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          {lightbox < images.length - 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
              aria-label="Próxima foto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-[12px] tracking-wide">
            {lightbox + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
