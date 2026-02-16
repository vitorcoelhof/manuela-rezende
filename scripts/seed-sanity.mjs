/**
 * Seed script: uploads property photos to Sanity and creates the "centro" property document.
 * Run with: node scripts/seed-sanity.mjs
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

const PHOTOS_DIR = join(__dirname, '..', '..', 'fotos', 'Imoveis')

const photoFiles = [
  'imovel_centro_1.jpeg',
  'imovel_centro_2.jpeg',
  'imovel_centro_3.jpeg',
  'imovel_centro_4.jpeg',
  'imovel_centro_5.jpeg',
  'imovel_centro_6.jpeg',
  'imovel_centro_7.jpeg',
]

async function uploadImage(filename) {
  const filepath = join(PHOTOS_DIR, filename)
  if (!existsSync(filepath)) {
    console.warn(`⚠️  File not found: ${filepath}`)
    return null
  }
  const buffer = readFileSync(filepath)
  console.log(`  Uploading ${filename}...`)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  })
  return asset
}

async function checkExisting() {
  const existing = await client.fetch(`*[_type == "imovel" && slug.current == "casa-centro-florianopolis"][0]`)
  return existing
}

async function seed() {
  console.log('🌱 Starting Sanity seed...\n')

  // Check if already seeded
  const existing = await checkExisting()
  if (existing) {
    console.log('✅  Property "casa-centro-florianopolis" already exists. Skipping seed.')
    console.log(`   Document ID: ${existing._id}`)
    return
  }

  // Upload all photos
  console.log('📸 Uploading photos...')
  const uploadedAssets = []
  for (const file of photoFiles) {
    const asset = await uploadImage(file)
    if (asset) uploadedAssets.push(asset)
  }
  console.log(`   ${uploadedAssets.length} photos uploaded.\n`)

  if (uploadedAssets.length === 0) {
    console.error('❌  No photos uploaded. Check PHOTOS_DIR path.')
    process.exit(1)
  }

  // Build image array for Sanity document
  const fotos = uploadedAssets.map((asset, i) => ({
    _type: 'image',
    _key: `foto-${i + 1}`,
    asset: { _type: 'reference', _ref: asset._id },
    alt: `Casa no Centro de Florianópolis — foto ${i + 1}`,
  }))

  // Create property document
  console.log('📝 Creating property document...')
  const doc = await client.create({
    _type: 'imovel',
    titulo: 'Casa no Centro de Florianópolis',
    slug: { _type: 'slug', current: 'casa-centro-florianopolis' },
    tipo: 'casa',
    status: 'venda',
    preco: 850000,
    localizacao: 'Centro, Florianópolis - SC',
    bairro: 'Centro',
    cidade: 'Florianópolis',
    area: 180,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    descricao: [
      {
        _type: 'block',
        _key: 'desc-1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-1',
            text: 'Linda casa localizada no coração de Florianópolis, próxima a todos os serviços, comércio e transporte público. Imóvel em excelente estado de conservação, pronto para morar.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'desc-2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span-2',
            text: 'Sala ampla, cozinha equipada, área de serviço e quintal. Garagem para 2 carros. Localização privilegiada com fácil acesso a escolas, hospitais e ao centro histórico da ilha.',
          },
        ],
      },
    ],
    fotos,
    destaque: true,
  })

  console.log(`\n✅  Property created!`)
  console.log(`   ID: ${doc._id}`)
  console.log(`   Slug: /imoveis/casa-centro-florianopolis`)
  console.log('\n🎉 Seed complete!')
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
