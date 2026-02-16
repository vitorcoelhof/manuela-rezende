import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { nome, email, telefone, tipo } = body
    if (!nome || !email || !telefone || !tipo) {
      return NextResponse.json(
        { error: 'Missing required fields: nome, email, telefone, tipo' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Save consulta to Sanity
    const consulta = await client.create({
      _type: 'consulta',
      nome,
      email,
      telefone,
      tipo,
      localizacao: body.localizacao || undefined,
      orcamento: body.orcamento || undefined,
      descricao: body.descricao || undefined,
      dataCriacao: new Date().toISOString(),
      contatado: false,
    })

    // Get broker WhatsApp number
    const corretora = await client.fetch(`*[_type == "corretora"][0] { whatsapp }`)
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

*Dados do Cliente:*
• Nome: ${nome}
• Email: ${email}
• Telefone: ${telefone}

*Detalhes da Busca:*
• Tipo de Imóvel: ${tiposNomes[tipo]}
${body.localizacao ? `• Localização: ${body.localizacao}` : ''}
${body.orcamento ? `• Orçamento: ${body.orcamento}` : ''}
${body.descricao ? `• Descrição: ${body.descricao}` : ''}

Responda a este contato para acompanhar.
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
