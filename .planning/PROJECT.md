# Projeto: Manuela Rezende Imóveis

## 📋 Visão Geral

Plataforma web moderna de imóveis para corretora de Florianópolis. O site permite visualizar imóveis à venda, filtrar por tipo e faixa de preço, e capturar leads através de formulário com integração WhatsApp.

**URL:** https://manuela-rezende.vercel.app

## 🎯 Objetivos Principais

1. ✅ Criar plataforma de apresentação de imóveis
2. ✅ Implementar sistema de busca e filtros
3. ✅ Integrar captura de leads com WhatsApp
4. ✅ Otimizar UX com barra de busca rápida
5. ✅ Ordenação alfabética de categorias

## 🏗️ Stack Técnico

- **Framework:** Next.js 16.1.6 (App Router)
- **Linguagem:** TypeScript
- **Styling:** Tailwind CSS + Tailwind PostCSS v4
- **CMS:** Sanity.io (schema, dados, gerenciamento)
- **Deploy:** Vercel
- **Autenticação Sanity:** Token API (SANITY_API_TOKEN)
- **Integração:** WhatsApp Web API (wa.me)

## 📊 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── vendas/page.tsx          # Página de imóveis à venda
│   ├── contato/page.tsx         # Página de contato
│   ├── a-corretora/page.tsx     # Sobre a corretora
│   ├── imoveis/[slug]/page.tsx  # Detalhes do imóvel
│   └── api/
│       └── consultas/route.ts   # API para captura de leads
├── components/
│   ├── Header.tsx               # Navegação
│   ├── Footer.tsx               # Rodapé
│   ├── SearchStrip.tsx          # Busca rápida (homepage)
│   ├── ImovelGrid.tsx           # Grid com filtros (vendas)
│   ├── ImovelCard.tsx           # Card individual de imóvel
│   ├── ConsultaForm.tsx         # Formulário de lead
│   └── WhatsAppButton.tsx       # Botão WhatsApp
└── sanity/
    ├── schemaTypes/
    │   ├── imovel.ts            # Schema de imóveis
    │   ├── corretora.ts         # Schema da corretora
    │   ├── consulta.ts          # Schema de leads
    │   └── index.ts
    ├── lib/
    │   ├── client.ts            # Cliente Sanity (read-only)
    │   ├── queries.ts           # Queries GROQ
    │   └── env.ts               # Variáveis de ambiente
```

## 🔄 Fluxo de Dados

```
Sanity CMS
    ↓
[Cliente API Read-only] ← Busca imóveis
    ↓
Homepage/Vendas
    ↓
[Usuário preenche formulário]
    ↓
POST /api/consultas
    ↓
[Cliente Autenticado] ← Salva lead em Sanity
    ↓
Gera URL WhatsApp com mensagem pré-preenchida
    ↓
Redireciona usuário para WhatsApp
```

## 📈 Métricas Importantes

- **Performance:** Build time ~35s, Static gen ~1.7s
- **Rotas:** 11 páginas/rotas geradas
- **Revalidação:** ISR em 60 segundos (dados frescos)
- **Segurança:** CSP headers, rate limiting, vision disabled

## 🚀 Deployment

- **Host:** Vercel (conectado ao GitHub)
- **Branch:** main (auto-deploy on push)
- **Build:** `npm run build`
- **Start:** `npm start`
- **Env vars:** SANITY_API_TOKEN, NEXT_PUBLIC_* (obrigatórios)

## 📅 Status do Projeto

- ✅ MVP Completo
- ✅ Todas as features implementadas
- ✅ Lead capture funcionando
- ✅ Filtros e busca otimizados
- ✅ Deploy em produção
