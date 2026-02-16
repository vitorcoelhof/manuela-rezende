import { defineField, defineType } from 'sanity'

export const imovelType = defineType({
  name: 'imovel',
  title: 'Imóvel',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'titulo', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Casa', value: 'casa' },
          { title: 'Apartamento', value: 'apartamento' },
          { title: 'Terreno', value: 'terreno' },
          { title: 'Comercial', value: 'comercial' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'À Venda', value: 'venda' },
          { title: 'Vendido', value: 'vendido' },
          { title: 'Aluguel', value: 'aluguel' },
          { title: 'Arquivado', value: 'arquivado' },
        ],
      },
      initialValue: 'venda',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'preco',
      title: 'Preço (R$)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'localizacao',
      title: 'Localização',
      type: 'string',
      description: 'Ex: Centro, Florianópolis - SC',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bairro',
      title: 'Bairro',
      type: 'string',
    }),
    defineField({
      name: 'cidade',
      title: 'Cidade',
      type: 'string',
      initialValue: 'Florianópolis',
    }),
    defineField({
      name: 'area',
      title: 'Área (m²)',
      type: 'number',
    }),
    defineField({
      name: 'quartos',
      title: 'Quartos',
      type: 'number',
    }),
    defineField({
      name: 'banheiros',
      title: 'Banheiros',
      type: 'number',
    }),
    defineField({
      name: 'vagas',
      title: 'Vagas de Garagem',
      type: 'number',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'fotos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'destaque',
      title: 'Imóvel em Destaque',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'localizacao',
      media: 'fotos.0',
    },
  },
  orderings: [
    {
      title: 'Mais Recentes',
      name: 'recentFirst',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
    {
      title: 'Preço: Menor para Maior',
      name: 'priceLow',
      by: [{ field: 'preco', direction: 'asc' }],
    },
  ],
})
