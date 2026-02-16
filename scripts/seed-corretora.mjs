/**
 * Creates the singleton "corretora" document in Sanity.
 * Run with: node scripts/seed-corretora.mjs
 * Requires SANITY_API_TOKEN in .env.local (write access token).
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Load .env.local manually
const envPath = join(__dirname, '..', '.env.local')
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8')
  for (const line of envContent.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('❌  SANITY_API_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-07-11',
  token,
  useCdn: false,
})

async function seed() {
  console.log('🌱 Seeding corretora document...\n')

  // Check if already exists
  const existing = await client.fetch(`*[_type == "corretora"][0]`)
  if (existing) {
    console.log('✅  Documento "corretora" já existe.')
    console.log(`   ID: ${existing._id}`)
    console.log('   Nenhuma alteração feita.\n')
    return
  }

  const doc = await client.create({
    _type: 'corretora',
    nome: 'Manuela Rezende',
    creci: '',
    whatsapp: '5548999770241',
    instagram: 'manuelarezendeimoveis',
    localizacao: 'Florianópolis, Santa Catarina',
    localizacaoComplemento: 'Atendimento em toda a região',
    heroTitulo: 'Encontre o imóvel certo com quem entende do mercado.',
    heroSubtitulo: 'Atendimento personalizado, seleção de imóveis residenciais e contato direto pelo WhatsApp.',
    homeDiferenciais: [
      {
        _type: 'object',
        _key: 'dif-1',
        titulo: 'Imóveis Residenciais',
        descricao: 'Casas, apartamentos e terrenos selecionados com atenção aos detalhes que importam para você.',
      },
      {
        _type: 'object',
        _key: 'dif-2',
        titulo: 'Atendimento Direto',
        descricao: 'Sem intermediários. Fale diretamente com a Manuela pelo WhatsApp e tire todas as suas dúvidas.',
      },
      {
        _type: 'object',
        _key: 'dif-3',
        titulo: 'Experiência e Confiança',
        descricao: 'Profissional dedicada a encontrar o imóvel certo para cada cliente, com transparência em cada etapa.',
      },
    ],
    ctaTitulo: 'Pronto para encontrar seu imóvel?',
    ctaSubtitulo: 'Explore os imóveis disponíveis ou entre em contato diretamente.',
  })

  console.log('✅  Documento "corretora" criado!')
  console.log(`   ID: ${doc._id}`)
  console.log('\n🎉 Agora acesse /studio → A Corretora para editar todos os textos do site.')
}

seed().catch((err) => {
  console.error('❌  Falhou:', err.message)
  process.exit(1)
})
