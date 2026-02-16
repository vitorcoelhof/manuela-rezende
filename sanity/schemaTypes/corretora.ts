import { defineField, defineType } from 'sanity'

export const corretoraType = defineType({
  name: 'corretora',
  title: 'A Corretora',
  type: 'document',
  // Singleton — only one document of this type
  groups: [
    { name: 'perfil', title: 'Perfil' },
    { name: 'homepage', title: 'Homepage' },
    { name: 'contato', title: 'Contato' },
  ],
  fields: [
    // ── Perfil ──────────────────────────────────────────────
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      group: 'perfil',
      initialValue: 'Manuela Rezende',
    }),
    defineField({
      name: 'creci',
      title: 'CRECI',
      type: 'string',
      group: 'perfil',
    }),
    defineField({
      name: 'foto',
      title: 'Foto profissional (hero)',
      type: 'image',
      group: 'perfil',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografia (página A Corretora)',
      type: 'array',
      group: 'perfil',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'valores',
      title: 'Valores & Diferenciais (página A Corretora)',
      type: 'array',
      group: 'perfil',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string' }),
            defineField({ name: 'descricao', title: 'Descrição', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'titulo' },
          },
        },
      ],
    }),

    // ── Homepage ─────────────────────────────────────────────
    defineField({
      name: 'heroTitulo',
      title: 'Hero — Título principal',
      type: 'string',
      group: 'homepage',
      initialValue: 'Encontre o imóvel certo com quem entende do mercado.',
    }),
    defineField({
      name: 'heroSubtitulo',
      title: 'Hero — Subtítulo',
      type: 'text',
      rows: 2,
      group: 'homepage',
      initialValue: 'Atendimento personalizado, seleção de imóveis residenciais e contato direto pelo WhatsApp.',
    }),
    defineField({
      name: 'homeDiferenciais',
      title: 'Diferenciais da Homepage (3 cards numerados)',
      type: 'array',
      group: 'homepage',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'titulo', title: 'Título', type: 'string' }),
            defineField({ name: 'descricao', title: 'Descrição', type: 'text', rows: 2 }),
          ],
          preview: {
            select: { title: 'titulo' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitulo',
      title: 'CTA — Título',
      type: 'string',
      group: 'homepage',
      initialValue: 'Pronto para encontrar seu imóvel?',
    }),
    defineField({
      name: 'ctaSubtitulo',
      title: 'CTA — Subtítulo',
      type: 'string',
      group: 'homepage',
      initialValue: 'Explore os imóveis disponíveis ou entre em contato diretamente.',
    }),

    // ── Contato ───────────────────────────────────────────────
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp (com código do país, sem +)',
      type: 'string',
      group: 'contato',
      initialValue: '5548999770241',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram (usuário, sem @)',
      type: 'string',
      group: 'contato',
    }),
    defineField({
      name: 'localizacao',
      title: 'Localização',
      type: 'string',
      group: 'contato',
      initialValue: 'Florianópolis, Santa Catarina',
    }),
    defineField({
      name: 'localizacaoComplemento',
      title: 'Localização — complemento',
      type: 'string',
      group: 'contato',
      initialValue: 'Atendimento em toda a região',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'creci',
      media: 'foto',
    },
  },
})
