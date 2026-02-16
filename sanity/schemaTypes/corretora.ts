import { defineField, defineType } from 'sanity'

export const corretoraType = defineType({
  name: 'corretora',
  title: 'A Corretora',
  type: 'document',
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      initialValue: 'Manuela Rezende',
    }),
    defineField({
      name: 'creci',
      title: 'CRECI',
      type: 'string',
    }),
    defineField({
      name: 'foto',
      title: 'Foto profissional',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'valores',
      title: 'Valores & Diferenciais',
      type: 'array',
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
      name: 'whatsapp',
      title: 'WhatsApp (com código do país, sem +)',
      type: 'string',
      initialValue: '5548999770241',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram (usuário, sem @)',
      type: 'string',
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
