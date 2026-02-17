import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { client as readClient } from '@/sanity/lib/client'

// Create authenticated client for mutations
const authClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { nome, tipo } = body
    if (!nome || !tipo) {
      return NextResponse.json(
        { error: 'Missing required fields: nome, tipo' },
        { status: 400 }
      )
    }

    // Validate tipo field
    const validTipos = ['casa', 'apartamento', 'studio', 'terreno', 'comercial', 'nao_sei']
    if (!validTipos.includes(tipo)) {
      return NextResponse.json(
        { error: `Invalid tipo. Must be one of: ${validTipos.join(', ')}` },
        { status: 400 }
      )
    }

    // Save consulta to Sanity using authenticated client
    const consulta = await authClient.create({
      _type: 'consulta',
      nome,
      tipo,
      localizacao: body.localizacao || undefined,
      orcamento: body.orcamento || undefined,
      descricao: body.descricao || undefined,
      dataCriacao: new Date().toISOString(),
      contatado: false,
    })

    // Get broker WhatsApp number (can use read-only client for queries)
    const corretora = await readClient.fetch(`*[_type == "corretora"][0] { whatsapp }`)
    const whatsappNumber = corretora?.whatsapp

    if (!whatsappNumber) {
      return NextResponse.json(
        { error: 'WhatsApp number not configured' },
        { status: 500 }
      )
    }

    // Format WhatsApp message
    const tiposNomes: { [key: string]: string } = {
      casa: 'Casa',
      apartamento: 'Apartamento',
      studio: 'Studio',
      terreno: 'Terreno',
      comercial: 'Comercial',
      nao_sei: 'Não sei',
    }

    const message = `
*Nova Consulta de Imóvel*

*Nome:* ${nome}

*Tipo de Imóvel:* ${tiposNomes[tipo]}
${body.localizacao ? `*Localização:* ${body.localizacao}` : ''}
${body.orcamento ? `*Orçamento:* ${body.orcamento}` : ''}
${body.descricao ? `*Detalhes:* ${body.descricao}` : ''}
    `.trim()

    // Format WhatsApp number (remove non-digits, add country code if needed)
    let formattedNumber = whatsappNumber.replace(/\D/g, '')
    if (!formattedNumber.startsWith('55')) {
      formattedNumber = '55' + formattedNumber
    }

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

    return NextResponse.json({
      success: true,
      consultaId: consulta._id,
      whatsappUrl,
      message: 'Consulta salva com sucesso. Redirecionando para WhatsApp...',
    })
  } catch (error) {
    console.error('Error creating consulta:', error)
    return NextResponse.json(
      { error: 'Failed to create consulta' },
      { status: 500 }
    )
  }
}
