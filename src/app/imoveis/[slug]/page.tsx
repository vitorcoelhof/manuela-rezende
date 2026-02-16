import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  // Schema will be defined in Phase 2; fallback metadata until then
  try {
    const imovel = await client.fetch(
      `*[_type == "imovel" && slug.current == $slug][0]{title, description}`,
      { slug }
    )
    if (imovel) {
      return {
        title: imovel.title,
        description: imovel.description,
        openGraph: {
          title: `${imovel.title} | Manuela Rezende Imóveis`,
          description: imovel.description,
          type: 'website',
          locale: 'pt_BR',
        },
      }
    }
  } catch {
    // Sanity schema not yet defined — return fallback
  }

  return {
    title: `Imóvel ${slug}`,
    description: 'Detalhes do imóvel disponíveis em breve.',
  }
}

export default async function ImovelPage({ params }: PageProps) {
  const { slug } = await params

  // Image usage pattern (ready for Phase 2):
  // import Image from 'next/image'
  // import { urlFor } from '@/sanity/lib/image'
  // <Image
  //   src={urlFor(imovel.mainImage).width(800).url()}
  //   alt={imovel.title}
  //   width={800}
  //   height={600}
  //   sizes="(max-width: 768px) 100vw, 50vw"
  //   className="object-cover w-full h-full"
  // />

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        Imóvel: {slug}
      </h1>
      <p className="mt-4 text-xl text-gray-600">
        Detalhes completos disponíveis após Phase 2.
      </p>
    </div>
  )
}
