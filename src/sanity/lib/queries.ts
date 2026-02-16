import { defineQuery } from 'next-sanity'

// ── Imovel queries ────────────────────────────────────────────────────────────

export const IMOVEIS_QUERY = defineQuery(`
  *[_type == "imovel" && status == "venda"] | order(_createdAt desc) {
    _id,
    titulo,
    slug,
    tipo,
    status,
    preco,
    localizacao,
    bairro,
    cidade,
    area,
    quartos,
    banheiros,
    vagas,
    destaque,
    "fotoCapa": fotos[0] {
      asset,
      alt
    }
  }
`)

export const IMOVEL_QUERY = defineQuery(`
  *[_type == "imovel" && slug.current == $slug][0] {
    _id,
    titulo,
    slug,
    tipo,
    status,
    preco,
    localizacao,
    bairro,
    cidade,
    area,
    quartos,
    banheiros,
    vagas,
    destaque,
    descricao,
    fotos[] {
      asset,
      alt
    }
  }
`)

export const IMOVEIS_SLUGS_QUERY = defineQuery(`
  *[_type == "imovel" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// ── Corretora query ───────────────────────────────────────────────────────────

export const CORRETORA_QUERY = defineQuery(`
  *[_type == "corretora"][0] {
    _id,
    nome,
    creci,
    bio,
    valores,
    whatsapp,
    instagram,
    foto {
      asset,
      alt
    }
  }
`)
