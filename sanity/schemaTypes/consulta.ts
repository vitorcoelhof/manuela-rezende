import { defineField, defineType } from 'sanity'

export const consultaType = defineType({
  name: 'consulta',
  title: 'Consultas de Clientes',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'telefone',
      title: 'Telefone',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tipo',
      title: 'Tipo de Imóvel',
      type: 'string',
      options: {
        list: [
          { title: 'Casa', value: 'casa' },
          { title: 'Apartamento', value: 'apartamento' },
          { title: 'Studio', value: 'studio' },
          { title: 'Terreno', value: 'terreno' },
          { title: 'Comercial', value: 'comercial' },
          { title: 'Não sei', value: 'nao_sei' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'localizacao',
      title: 'Localização preferida',
      type: 'string',
      description: 'Ex: Centro, Lagoa da Conceição, etc',
    }),
    defineField({
      name: 'orcamento',
      title: 'Orçamento (opcional)',
      type: 'string',
      description: 'Ex: Até R$ 500 mil, R$ 500k-1M, etc',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição da necessidade',
      type: 'text',
      rows: 3,
      description: 'Mais detalhes sobre o que procura',
    }),
    defineField({
      name: 'dataCriacao',
      title: 'Data da Consulta',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'contatado',
      title: 'Contatado?',
      type: 'boolean',
      initialValue: false,
      description: 'Marque quando a corretora entrar em contato',
    }),
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'tipo',
      media: 'email',
    },
  },
})
