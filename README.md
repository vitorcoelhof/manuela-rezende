# Site Corretor de Imóveis

Template de site institucional para corretor de imóveis. Desenvolvido com Next.js, Sanity CMS e Vercel.

> Instância atual em produção: https://manuela-rezende.vercel.app

---

## Stack

| Tecnologia | Função |
|---|---|
| **Next.js 16** (App Router) | Framework React — renderização, roteamento, SEO |
| **Tailwind CSS v4** | Estilização (CSS-first, sem `tailwind.config.ts`) |
| **Sanity CMS** | Banco de dados e editor de conteúdo (imóveis, perfil, textos do site) |
| **Vercel** | Hospedagem e deploy |
| **TypeScript** | Tipagem estática |

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Homepage — hero, busca rápida, cards de imóveis, diferenciais, CTA |
| `/vendas` | Listagem de imóveis com filtros (tipo, preço, busca livre) |
| `/imoveis/[slug]` | Página individual do imóvel — galeria, dados, botão WhatsApp |
| `/a-corretora` | Bio, foto, valores e diferenciais do corretor |
| `/contato` | WhatsApp, Instagram e localização |
| `/studio` | Sanity Studio — editor de conteúdo (protegido por login Sanity) |

---

## Funcionalidades

### Frontend
- **Design minimal luxury** — paleta escura (#111111) com dourado (#b8976a), tipografia com tracking largo
- **Responsivo** — mobile-first, menu mobile com animação hamburger → X, layout adaptado para todos os tamanhos
- **Imóveis na homepage** — cards de imóveis exibidos logo após a busca rápida (até 6, revalidados a cada 60s)
- **Busca rápida na homepage** — filtros por tipo e faixa de preço com ícone de lupa (mobile-first design compacto)
- **Card Manuela mobile** — seção com foto, nome e CTA WhatsApp aparece no hero apenas em mobile
- **Seção "Quem Atende Você"** — mobile-only, com foto circular da corretora e botão WhatsApp (hero e homepage)
- **Instagram integrado** — banner mobile com @manuelarezendecorretora; ícone clicável no header desktop
- **Listagem com filtros client-side** — tipo de imóvel, faixa de preço e busca por texto (sem reload de página)
- **Galeria com lightbox** — miniaturas clicáveis, navegação por setas, contador de fotos
- **WhatsApp flutuante** — botão fixo em todas as páginas (bottom-right)
- **WhatsApp por imóvel** — cada card e página de imóvel tem botão com mensagem pré-formatada identificando o imóvel
- **Display de vagas corrigido** — mostra "0 vagas" quando aplicável (antes estava oculto)
- **SEO + Open Graph** — `title`, `description` e imagem OG individuais por página; imagem padrão com foto do corretor gerada dinamicamente (1200×630)
- **ISR (Incremental Static Regeneration)** — páginas de imóveis revalidam a cada 60s
- **Otimização de imagens** — `next/image` com lazy loading, formato moderno, CDN Sanity
- **Mapa Interativo** — localização do imóvel em mapa OpenStreetMap + Leaflet na página de detalhe (campo opcional no CMS, 100% gratuito, autocompleta com ViaCEP)

### CMS (Sanity Studio `/studio`)

Todo o conteúdo do site é gerenciado pelo corretor diretamente no Studio, sem tocar em código.

#### Tipo `imovel`
| Campo | Descrição |
|---|---|
| Título, Slug | Nome e URL do imóvel |
| Tipo | Casa / Apartamento / Studio / Terreno / Comercial |
| Status | **À Venda** (visível no site) · **Pausado** (oculto no site, editável no Studio) · Vendido · Aluguel · Arquivado |
| Preço, Área, Quartos, Banheiros, Vagas | Dados numéricos |
| Localização, Bairro, Cidade | Endereço |
| Foto Capa | Foto exibida nos cards e listagem (se vazia, usa a 1ª da galeria) |
| Galeria de Fotos | Upload múltiplo (Ctrl/⌘ para selecionar vários arquivos), layout grid, drag para reordenar |
| Descrição | Texto rich-text |
| Destaque | Booleano |
| CEP | CEP do imóvel (opcional) — aceita formato `88015-902` ou `88015902`; converte automaticamente para coordenadas e exibe mapa interativo na página de detalhes (100% gratuito) |

#### Tipo `corretora` (singleton — 3 grupos)

**Perfil** — nome, CRECI, foto, biografia, valores/diferenciais da página A Corretora

**Homepage** — título e subtítulo do hero, 3 diferenciais numerados, texto do CTA

**Contato** — WhatsApp, Instagram, localização e complemento de localização

> Alterações salvas no Studio aparecem no site em até 60 segundos.

### 🗺️ Como Usar o Campo CEP para Mapas

O campo CEP na página de detalhes do imóvel funciona de forma automática:

1. **Adicionar CEP no Studio**
   - Acesse o imóvel em `/studio`
   - Preencha o campo "CEP" com formato `88015-902` ou `88015902`
   - Salve o documento

2. **Fluxo de Geocodificação (automático)**
   - **Passo 1**: ViaCEP API converte CEP → endereço completo (com rua, cidade, estado)
   - **Passo 2**: Nominatim API geocodifica endereço → latitude/longitude
   - **Passo 3**: Leaflet renderiza mapa OpenStreetMap com marcador no local

3. **Resultado na Página**
   - Mapa interativo aparece na seção "Localização" da página de detalhes
   - Zoom nível 16 (rua)
   - Marcador com popup exibindo o título do imóvel
   - Funciona offline após carregamento (tiles armazenados em cache)

**Tecnologias (100% Gratuitas):**
- **ViaCEP** — API brasileira para conversão CEP → endereço
- **Nominatim** — API do OpenStreetMap para geocodificação
- **Leaflet** — biblioteca JavaScript para mapas interativos
- **OpenStreetMap** — tiles de mapa gratuitos

---

## Estrutura de Arquivos

```
site-corretor/
├── sanity/
│   └── schemaTypes/
│       ├── index.ts               # Registro dos schemas
│       ├── imovel.ts              # Schema do imóvel
│       └── corretora.ts           # Schema do perfil do corretor + textos do site
├── sanity.config.ts               # Configuração do Sanity Studio
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout global (Header, Footer, WhatsAppButton, metadataBase)
│   │   ├── opengraph-image.tsx    # Imagem OG padrão 1200×630 (foto do corretor + branding)
│   │   ├── page.tsx               # Homepage (fetch imoveis + corretora, textos do CMS)
│   │   ├── vendas/
│   │   │   └── page.tsx           # Listagem de imóveis
│   │   ├── imoveis/[slug]/
│   │   │   ├── page.tsx           # Página individual do imóvel
│   │   │   ├── GalleryClient.tsx  # Galeria interativa (client component)
│   │   │   └── MapClient.tsx      # Mapa Leaflet com geocodificação ViaCEP + Nominatim
│   │   ├── a-corretora/
│   │   │   └── page.tsx           # Página "A Corretora"
│   │   ├── contato/
│   │   │   └── page.tsx           # Página de contato (dados do CMS)
│   │   └── studio/[[...tool]]/
│   │       ├── page.tsx           # Rota do Studio (server, exporta metadata)
│   │       ├── StudioClient.tsx   # NextStudio (client component)
│   │       └── loading.tsx        # Loading state do Studio
│   ├── components/
│   │   ├── Header.tsx             # Navegação sticky + Instagram icon desktop + mobile banner
│   │   ├── Footer.tsx             # Rodapé com links e copyright
│   │   ├── WhatsAppButton.tsx     # Botão flutuante do WhatsApp
│   │   ├── ImovelCard.tsx         # Card de imóvel (foto, preço, specs, ações, vagas fix)
│   │   ├── ImovelGrid.tsx         # Grid com filtros client-side
│   │   └── SearchStrip.tsx        # Busca rápida (título bold, ícone lupa, mobile compact)
│   └── sanity/
│       ├── env.ts                 # Variáveis de ambiente do Sanity
│       └── lib/
│           ├── client.ts          # Cliente Sanity
│           ├── image.ts           # Helper urlFor() para imagens
│           └── queries.ts         # Queries GROQ (imoveis, corretora)
├── public/
│   └── corretor.png               # Foto do corretor (hero + OG image)
├── scripts/
│   ├── seed-sanity.mjs            # Seed do imóvel inicial (com upload de fotos)
│   └── seed-corretora.mjs         # Seed do documento corretora (executar uma vez)
└── next.config.ts                 # Config Next.js (remotePatterns, serverExternalPackages)
```

---

## Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Conta Sanity com acesso ao projeto (ver `NEXT_PUBLIC_SANITY_PROJECT_ID`)

### Instalação

```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
npm install
cp .env.example .env.local
# Preencher .env.local com os valores abaixo
```

### Variáveis de Ambiente

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-07-11
SANITY_API_TOKEN=<token com permissão de escrita>
```

### Desenvolvimento

```bash
npm run dev
```

Abre em http://localhost:3000. Studio disponível em http://localhost:3000/studio.

### Seed de Conteúdo

Executar uma vez para criar o documento do corretor no Sanity:

```bash
node scripts/seed-corretora.mjs
```

Para popular com um imóvel de exemplo (fotos em `../fotos/Imoveis/`):

```bash
node scripts/seed-sanity.mjs
```

Ambos requerem `SANITY_API_TOKEN` no `.env.local` com permissão de escrita.

---

## Deploy

O deploy é manual via Vercel CLI:

```bash
npx vercel --prod
git push origin main
```

### Variáveis de Ambiente na Vercel

Configurar em Settings → Environment Variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

### CORS no Sanity

Para o Studio funcionar em produção, adicionar em [manage.sanity.io](https://manage.sanity.io) → API → CORS Origins:
- `https://<dominio-do-projeto>.vercel.app` (Allow credentials: ✓)

---

## Melhorias Recentes

### v2.1
- ✅ **Mapa OpenStreetMap com CEP** — localização do imóvel com mapa interativo Leaflet + OpenStreetMap na página de detalhes
  - Campo CEP opcional no Sanity Studio (formato: `88015-902` ou `88015902`)
  - Geocodificação automática: ViaCEP (CEP → endereço) + Nominatim (endereço → coordenadas)
  - Mapa renderizado com zoom 16, marcador interativo, tiles em cache
  - 100% gratuito (sem Google Maps, sem custos de API)

### v2.0
- ✅ **Search Strip Otimizado** — título "Encontre seu imóvel" em bold, filtros lado a lado, ícone de lupa
- ✅ **Seção Mobile "Quem Atende Você"** — foto circular da corretora com CTA WhatsApp destacado
- ✅ **Manuela Card no Hero** — mobile-only, com foto da corretora e botão WhatsApp no header
- ✅ **Instagram Header** — ícone clicável ao lado do logo (desktop); banner no topo (mobile)
- ✅ **Vagas Display Fix** — mostra corretamente "0 vagas" em cards e página de detalhes
- ✅ **Estrutura Mobile-First** — layout totalmente otimizado para mobile com componentes responsivos

---

## Replicar para Outro Corretor

O projeto foi desenvolvido como template reutilizável. Para usar em novo projeto:

1. **Criar novo projeto Sanity** em manage.sanity.io → novo `projectId`
2. **Criar novo repositório** no GitHub (fork ou novo repo)
3. **Criar novo projeto Vercel** vinculado ao repositório
4. **Atualizar variáveis de ambiente** com o novo `projectId` e token
5. **Atualizar dados fixos no código:**
   - `src/app/layout.tsx` — número WhatsApp do botão flutuante
   - `src/app/opengraph-image.tsx` — URL da foto do corretor para a imagem OG
   - `public/` — foto do corretor
6. **Executar seeds** para criar os documentos iniciais no Sanity
7. **Editar conteúdo no Studio** — todos os textos, WhatsApp, Instagram, localização

---

## Decisões Técnicas

- **Tailwind v4** — CSS-first com `@import "tailwindcss"` e bloco `@theme` no `globals.css`. Sem `tailwind.config.ts`.
- **Sanity Studio em `'use client'`** — `StudioClient.tsx` importa o config diretamente para evitar erro de serialização de funções no Next.js App Router ("Functions cannot be passed directly to Client Components").
- **ISR com revalidate: 60** — homepage, listagem, imóveis individuais e contato revalidam a cada 60s após publicação no CMS.
- **Filtros client-side** — `ImovelGrid.tsx` gerencia estado local para evitar requisições desnecessárias ao servidor.
- **`serverExternalPackages: ['sanity', 'styled-components']`** — evita crash SSR do Sanity/styled-components no Vercel.
- **Schemas na raiz** — `sanity/schemaTypes/` na raiz do projeto (não em `src/`) para compatibilidade com `sanity.config.ts`.
- **`fotoCapa` dedicada** — campo separado para capa dos cards; query usa `coalesce(fotoCapa, fotos[0])` como fallback.
- **`opengraph-image.tsx`** — imagem OG gerada dinamicamente via `ImageResponse` (edge runtime), sem arquivo estático adicional.
- **Status `pausado`** — imóvel fica editável no Studio mas invisível no site (query filtra apenas `status == "venda"`).
- **Mapa com Geocodificação em 2 Passos**
  - ViaCEP → converte CEP para endereço completo (melhor cobertura brasileira)
  - Nominatim → geocodifica endereço para coordenadas
  - Fallback de erro com mensagens claras ao usuário
  - CSP configurado para permitir `https://viacep.com.br` e `https://nominatim.openstreetmap.org`
