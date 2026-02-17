'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  nome: string
  tipo: string
  localizacao: string
  orcamento: string
  descricao: string
}

export default function ConsultaForm() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    tipo: '',
    localizacao: '',
    orcamento: '',
    descricao: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Erro ao enviar formulário')
        return
      }

      // Redirect to WhatsApp
      if (data.whatsappUrl) {
        window.location.href = data.whatsappUrl
      }
    } catch (err) {
      setError('Erro ao conectar com o servidor')
      console.error('Form submission error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!showForm) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-[#111111] hover:bg-[#222222] text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Não encontrou seu imóvel? Envie sua necessidade
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Sua Busca Personalizada</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Não encontrou o imóvel que procura? Preencha rapidamente e envie via seu WhatsApp. Nossa corretora responderá com as melhores opções para você.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Seu nome *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8976a] focus:border-transparent outline-none transition"
              placeholder="João Silva"
            />
          </div>

          {/* Tipo de Imóvel */}
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de imóvel que procura *
            </label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8976a] focus:border-transparent outline-none transition"
            >
              <option value="">Selecione uma opção</option>
              <option value="casa">Casa</option>
              <option value="apartamento">Apartamento</option>
              <option value="studio">Studio</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
              <option value="nao_sei">Não sei ainda</option>
            </select>
          </div>

          {/* Localização */}
          <div>
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700 mb-1">
              Localização/Bairro (opcional)
            </label>
            <input
              type="text"
              id="localizacao"
              name="localizacao"
              value={formData.localizacao}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8976a] focus:border-transparent outline-none transition"
              placeholder="Ex: Centro, Vila Madalena"
            />
          </div>

          {/* Orçamento */}
          <div>
            <label htmlFor="orcamento" className="block text-sm font-medium text-gray-700 mb-1">
              Orçamento estimado (opcional)
            </label>
            <input
              type="text"
              id="orcamento"
              name="orcamento"
              value={formData.orcamento}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8976a] focus:border-transparent outline-none transition"
              placeholder="Ex: R$ 300.000 - R$ 500.000"
            />
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
              Detalhes adicionais (opcional)
            </label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8976a] focus:border-transparent outline-none transition resize-none"
              placeholder="Conte-nos mais sobre o que procura..."
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] hover:bg-[#222222] text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar via WhatsApp'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            * Campos obrigatórios
          </p>
        </form>
      </div>
    </div>
  )
}
