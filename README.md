# Manuela Rezende Imóveis

Site institucional de corretora de imóveis. Desenvolvido com Next.js, Sanity CMS e Vercel.

**Produção:** https://manuela-rezende.vercel.app

---

## Stack

| Tecnologia | Função |
|---|---|
| **Next.js 16** (App Router) | Framework React — renderização, roteamento, SEO |
| **Tailwind CSS v4** | Estilização (CSS-first, sem `tailwind.config.ts`) |
| **Sanity CMS** | Banco de dados e editor de conteúdo (imóveis, perfil) |
| **Vercel** | Hospedagem e deploy automático |
| **TypeScript** | Tipagem estática |

---

## Páginas

| Rota | Descrição |
|---|---|
| `/` | Homepage — hero com foto, busca rápida, diferenciais, CTA |
| `/vendas` | Listagem de imóveis com filtros (tipo, preço, busca livre) |
| `/imoveis/[slug]` | Página individual do imóvel — galeria, dados, botão WhatsApp |
| `/a-corretora` | Bio, foto, valores e diferenciais da Manuela |
| `/contato` | WhatsApp, Instagram e localização |
| `/studio` | Sanity Studio — editor de conteúdo (protegido por login) |

---

## Funcionalidades

### Frontend
- **Design minimal luxury** — paleta escura (#111111) com dourado (#b8976a), tipografia com tracking largo
- **Responsivo** — mobile-first, layout adaptado para todos os tamanhos de tela
- **Busca rápida na homepage** — filtros por tipo e faixa de preço que redirecionam para `/vendas`
- **Listagem com filtros client-side** — tipo de imóvel, faixa de preço e busca por texto (sem reload de página)
- **Galeria com lightbox** — miniaturas clicáveis, navegação por setas, contador de fotos
- **WhatsApp flutuante** — botão fixo em todas as páginas (bottom-right)
- **WhatsApp por imóvel** — cada card e página de imóvel tem botão com mensagem pré-formatada identificando o imóvel
- **SEO completo** — `title`, `description` e Open Graph individuais por página
- **ISR (Incremental Static Regeneration)** — páginas de imóveis revalidam a cada 60s
- **Otimização de imagens** — `next/image` com lazy loading, formato moderno, CDN Sanity

### CMS (Sanity Studio)
- **Tipo `imovel`** — título, slug, tipo, status, preço, localização, bairro, cidade, área, quartos, banheiros, vagas, fotos, descrição, destaque
- **Tipo `corretora`** — nome, CRECI, foto, bio, valores/diferenciais, WhatsApp, Instagram
- Manuela gerencia todo o conteúdo diretamente pelo Studio em `/studio`
- Novo imóvel publicado aparece no site em até 60 segundos

---

## Estrutura de Arquivos

```
manuela-rezende/
├── sanity/
│   └── schemaTypes/
│       ├── index.ts          # Registro dos schemas
│       ├── imovel.ts         # Schema do imóvel
│       └── corretora.ts      # Schema do perfil da corretora
├── sanity.config.ts          # Configuração do Sanity Studio
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Layout global (Header, Footer, WhatsAppButton)
│   │   ├── page.tsx          # Homepage
│   │   ├── vendas/
│   │   │   └── page.tsx      # Listagem de imóveis
│   │   ├── imoveis/[slug]/
│   │   │   ├── page.tsx      # Página individual do imóvel
│   │   │   └── GalleryClient.tsx  # Galeria interativa (client component)
│   │   ├── a-corretora/
│   │   │   └── page.tsx      # Página "A Corretora"
│   │   ├── contato/
│   │   │   └── page.tsx      # Página de contato
│   │   └── studio/[[...tool]]/
│   │       ├── page.tsx      # Rota do Studio (server, exporta metadata)
│   │       ├── StudioClient.tsx   # NextStudio (client component)
│   │       └── loading.tsx   # Loading state do Studio
│   ├── components/
│   │   ├── Header.tsx        # Navegação sticky com menu mobile
│   │   ├── Footer.tsx        # Rodapé com links e copyright
│   │   ├── WhatsAppButton.tsx # Botão flutuante do WhatsApp
│   │   ├── ImovelCard.tsx    # Card de imóvel (foto, preço, specs, ações)
│   │   ├── ImovelGrid.tsx    # Grid com filtros client-side
│   │   └── SearchStrip.tsx   # Busca rápida da homepage
│   └── sanity/
│       ├── env.ts            # Variáveis de ambiente do Sanity
│       └── lib/
│           ├── client.ts     # Cliente Sanity
│           ├── image.ts      # Helper urlFor() para imagens
│           └── queries.ts    # Queries GROQ (imoveis, corretora)
├── public/
│   └── manuela-rezende.png   # Foto da Manuela (hero)
├── scripts/
│   └── seed-sanity.mjs       # Script para seed inicial de conteúdo
└── next.config.ts            # Config Next.js (remotePatterns, serverExternalPackages)
```

---

## Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Conta Sanity com acesso ao projeto `ks20n411`

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/vitorcoelhof/manuela-rezende.git
cd manuela-rezende

# Instalar dependências
npm install

# Criar arquivo de variáveis de ambiente
cp .env.example .env.local
# Preencher com os valores do projeto Sanity
```

### Variáveis de Ambiente

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=ks20n411
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

Para popular o banco com conteúdo inicial (imóvel exemplo):

```bash
node scripts/seed-sanity.mjs
```

Requer `SANITY_API_TOKEN` no `.env.local` com permissão de escrita. As fotos devem estar em `../fotos/Imoveis/`.

---

## Deploy

O projeto faz deploy automático na Vercel. Para deploy manual:

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
- `https://manuela-rezende.vercel.app` (Allow credentials: ✓)

---

## Replicar para Outro Corretor

O projeto foi desenvolvido como template reutilizável. Para usar em outro projeto:

1. **Criar novo projeto Sanity** em manage.sanity.io → novo `projectId`
2. **Criar novo repositório** no GitHub (fork ou novo repo)
3. **Criar novo projeto Vercel** vinculado ao repositório
4. **Atualizar variáveis de ambiente** com o novo `projectId` e token
5. **Atualizar dados do corretor** em:
   - `src/app/layout.tsx` — número WhatsApp e mensagem padrão
   - `src/app/contato/page.tsx` — WhatsApp, Instagram
   - `public/` — foto do corretor
6. **Executar seed** com as fotos do corretor e imóveis iniciais

---

## Decisões Técnicas

- **Tailwind v4** — CSS-first com `@import "tailwindcss"` e bloco `@theme` no `globals.css`. Sem `tailwind.config.ts`.
- **Sanity Studio** — separado em `StudioClient.tsx` com `'use client'` para evitar erro de serialização de funções no Next.js App Router.
- **ISR com revalidate: 60** — imóveis individuais e listagem revalidam a cada 60s após publicação no CMS.
- **Filtros client-side** — `ImovelGrid.tsx` gerencia estado local para evitar requisições desnecessárias ao servidor.
- **`serverExternalPackages: ['sanity', 'styled-components']`** — evita crash SSR do Sanity/styled-components no Vercel.
- **Schemas na raiz** — `sanity/schemaTypes/` na raiz do projeto (não em `src/`) para compatibilidade com `sanity.config.ts`.
