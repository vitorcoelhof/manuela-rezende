# 🎯 Decisões Técnicas

## 1. Framework: Next.js 16 vs Alternativas

### ✅ Escolhido: Next.js 16

**Por quê?**
- ✅ App Router moderno + Server Components
- ✅ Turbopack: builds mais rápidos
- ✅ Deploy direto no Vercel (mesma companhia)
- ✅ TypeScript first-class support
- ✅ API routes integradas (sem Express separado)
- ✅ Image optimization automático

**Alternativas Consideradas:**
- ❌ Remix: Mais complexo para este caso
- ❌ Astro: Melhor para static sites, menos dinâmico
- ❌ Vue/Nuxt: Menos familiar para time
- ❌ SPA pura (React): Sem SEO, sem server-side rendering

---

## 2. CMS: Sanity vs Alternativas

### ✅ Escolhido: Sanity.io

**Por quê?**
- ✅ Headless CMS (API-first)
- ✅ Schema-driven (type-safe)
- ✅ GROQ queries poderosas
- ✅ Studio UI customizável
- ✅ Real-time previews
- ✅ Plano gratuito gerosamente
- ✅ Integração perfeita com Next.js

**Alternativas Consideradas:**
- ❌ Strapi: Self-hosted, mais overhead
- ❌ Contentful: Mais caro para caso pequeno
- ❌ Notion: Sem APIs robustas
- ❌ Spreadsheet manual: Zero escalabilidade
- ❌ Static JSON: Difícil de gerenciar

---

## 3. Styling: Tailwind CSS v4 vs Alternativas

### ✅ Escolhido: Tailwind CSS v4

**Por quê?**
- ✅ Utility-first: desenvolvimento rápido
- ✅ Tree-shaking automático (CSS mínimo)
- ✅ PostCSS v4: compilação mais rápida
- ✅ Customização fácil (cores, spacing)
- ✅ Comunidade grande (templates, componentes)
- ✅ Dark mode built-in (se quiser implementar)
- ✅ Responsive design simples

**Alternativas Consideradas:**
- ❌ CSS Modules: Muito verbose
- ❌ Styled Components: Runtime overhead
- ❌ CSS-in-JS (Emotion): Mais complexo
- ❌ SCSS: Sem tree-shaking automático
- ❌ Bootstrap: Muito genérico

---

## 4. Deploy: Vercel vs Alternativas

### ✅ Escolhido: Vercel

**Por quê?**
- ✅ Zero-config para Next.js
- ✅ Auto-deploy on git push
- ✅ Preview deployments automáticos
- ✅ CDN global (super rápido)
- ✅ Serverless functions automáticas
- ✅ Plano gratuito inclui production
- ✅ Mesma companhia que faz Next.js

**Alternativas Consideradas:**
- ❌ Netlify: Bom, mas Vercel é melhor para Next.js
- ❌ AWS: Muito complexo para MVP
- ❌ DigitalOcean: Requer gerenciamento manual
- ❌ Heroku: Descontinuado plano free
- ❌ Self-hosted: Overhead de manutenção

---

## 5. Autenticação Sanity: Token vs OAuth

### ✅ Escolhido: Token (SANITY_API_TOKEN)

**Por quê?**
- ✅ Simples para backend (API routes)
- ✅ Não requer user management
- ✅ Perfeito para app que cria dados
- ✅ Uma linha de código para setup

**Alternativas Consideradas:**
- ❌ OAuth: Overkill, requer user accounts
- ❌ Session-based: Mais complexo para API
- ❌ JWT: Similar a token, mas mais overhead

**Decisão de Segurança:**
- ✅ Token APENAS em API routes (backend)
- ✅ Token NUNCA no cliente
- ✅ Env var SANITY_API_TOKEN protegido
- ✅ Production env var apenas

---

## 6. Captura de Leads: WhatsApp vs Email vs SMS

### ✅ Escolhido: WhatsApp

**Por quê?**
- ✅ Sem necessidade de confirmar email
- ✅ Usuário já têm WhatsApp instalado
- ✅ Conversa direta com corretora
- ✅ Sem lista de emails para gerenciar
- ✅ Reduz fricção (no formulário de email)
- ✅ Integração simples (wa.me URLs)

**Alternativas Consideradas:**
- ❌ Email: Requer confirmação, pode ir spam
- ❌ SMS: Custo associado
- ❌ Phone call: Intrusivo demais
- ❌ Form + análise posterior: Sem urgência
- ❌ Chat widget: Requer sistema de chat

---

## 7. Formulário: Modal vs Page Inline vs Modal de Página Inteira

### ✅ Escolhido: Modal Colapsável

**Por quê?**
- ✅ Não interrompe fluxo de navegação
- ✅ Colapsável (usuário controla)
- ✅ Já está no contexto da página
- ✅ Reduz cognitive load

**Alternativas Consideradas:**
- ❌ Página separada: Quebra fluxo
- ❌ Modal fullscreen: Muito intrusivo
- ❌ Inline na página: Tira foco dos imóveis
- ❌ Popup externo: Spam-like, usuários bloqueiam

---

## 8. Estrutura de Pastas: Por Feature vs Por Tipo

### ✅ Escolhido: Misto (próximo ao Next.js conventions)

```
src/
├── app/          # Routes (por página/feature)
├── components/   # Reusable components
└── sanity/       # CMS integration
```

**Por quê?**
- ✅ Próximo ao Next.js padrão
- ✅ Fácil de navegar
- ✅ Clara separação de concerns
- ✅ App Router já força estrutura

**Alternativas Consideradas:**
- ❌ Feature folders: Overkill para projeto pequeno
- ❌ Type-based (containers, presentationals): Desatualizado
- ❌ Flat structure: Caótico em escala

---

## 9. Tipagem Sanity: Interface vs Type

### ✅ Escolhido: Type (mais flexível)

```typescript
// ✅ Escolhido
type Imovel = {
  _id: string
  titulo: string
  ...
}

// ❌ Alternativa (interface)
interface Imovel {
  _id: string
  titulo: string
  ...
}
```

**Por quê?**
- ✅ Type suporta unions (`'casa' | 'apto'`)
- ✅ Type suporta intersections (`Type & OtherType`)
- ✅ Mais comum em comunidade React

**Nota:** Para este projeto, ambos funcionariam

---

## 10. Filtros: Client-side vs Server-side

### ✅ Escolhido: Client-side (com useMemo)

**Por quê?**
- ✅ Interação instantânea (sem lag)
- ✅ Sem requisições extras ao servidor
- ✅ Dataset pequeno (pode ficar em memória)
- ✅ UX superior

**Quando considerar Server-side:**
- ❌ Se houver milhões de imóveis
- ❌ Se bandwidth for crítico
- ❌ Se precisar de filtros complexos (DB queries)

**Para este projeto:** ~50 imóveis, client-side é perfeito

---

## 11. Busca: indexOf vs Regex vs Full-text

### ✅ Escolhido: indexOf (simples)

```typescript
// ✅ Simples e suficiente
if (haystack.includes(q)) return true

// ❌ Alternativa: regex
if (new RegExp(q, 'i').test(haystack)) return true

// ❌ Alternativa: full-text (Sanity)
*[_type == "imovel" && title match $q]
```

**Por quê?**
- ✅ Rápido o suficiente
- ✅ Sintaxe simples
- ✅ Sem overhead de regex compilation
- ✅ Case-insensitive com .toLowerCase()

**Quando considerar regex:**
- Se precisar de partial match fuzzy
- Se precisar de diacritics handling

---

## 12. Imagens: Next.js Image vs HTML img

### ✅ Escolhido: HTML img (por simplicidade)

```typescript
// ✅ Simples (atual)
<img src={imageUrl} alt={alt} />

// ⚠️ Alternativa: Next.js Image (mais otimizado)
import Image from 'next/image'
<Image src={imageUrl} alt={alt} width={400} height={300} />
```

**Trade-off:**
- ✅ Simples, menos config
- ❌ Sem lazy loading automático
- ❌ Sem responsive images
- ❌ Sem WebP conversion

**Recomendação:** Implementar `next/image` em v2 para melhor performance

---

## 13. Roteamento: Next.js App Router vs Pages Router

### ✅ Escolhido: App Router (moderno)

**Por quê?**
- ✅ Next.js 16 padrão
- ✅ Server Components (menos JS)
- ✅ Melhor performance
- ✅ Mais intuitivo

---

## 14. Validação de Form: React Hook Form vs Zod vs Simples

### ✅ Escolhido: Simples (no estado React)

```typescript
// ✅ Atual (simples)
const [formData, setFormData] = useState({...})
const [error, setError] = useState('')

// ⚠️ Alternativa: Zod + React Hook Form
import { useForm } from 'react-hook-form'
import { z } from 'zod'
```

**Trade-off:**
- ✅ Simples, sem dependências extras
- ❌ Sem validação serverside automática
- ❌ Sem tipo-segurança na validação

**Recomendação:** Usar Zod em v2 para validação robusta

---

## 15. Rate Limiting: Nenhum vs Vercel Rate Limit vs Custom

### ✅ Escolhido: Nenhum (para MVP)

**Por quê?**
- ✅ Projeto pequeno, sem spam
- ✅ Vercel oferece proteção básica
- ✅ Simplicidade para MVP

**Quando implementar:**
- Se houver abuse pattern
- Se escalar para muitos usuários
- Se integrar com serviço pago

**Solução Simples:**
```typescript
// Redis + vercel/kv para rate limiting
```

---

## 16. Analytics: Nenhum vs Google Analytics vs Custom

### ✅ Escolhido: Nenhum (para MVP)

**Por quê?**
- ✅ Prioridade é features, não analytics
- ✅ Pode ser adicionado depois
- ✅ Privacy-first (menos rastreamento)

**Para v2:**
- Adicionar Google Analytics básico
- Rastrear: page views, button clicks, form submissions
- Verificar conversion rate do formulário

---

## 📋 Matriz de Decisões

| Aspecto | Escolhido | Alternativas | Trade-off |
|---------|-----------|--------------|-----------|
| Framework | Next.js 16 | Remix, Astro | Simplicidade vs Flexibilidade |
| CMS | Sanity | Strapi, Contentful | Velocidade vs Controle |
| Styling | Tailwind v4 | CSS Modules, Styled | Velocidade vs Type-safety |
| Deploy | Vercel | AWS, DigitalOcean | Simplicidade vs Controle |
| Filtros | Client-side | Server-side | UX vs Escalabilidade |
| Imagens | HTML img | next/image | Simplicidade vs Otimização |
| Validação | Simples | Zod + RHF | Velocidade vs Robustez |
| Analytics | Nenhum | GA, Custom | Privacidade vs Insights |

---

## 🔄 Revisão de Decisões

### ✅ Decisões que se Saíram Bem
- Next.js 16 + Vercel: Deploy perfeito
- Sanity: CMS intuitivo e poderoso
- Tailwind: Desenvolvimento super rápido
- WhatsApp: Leads sem fricção
- Client-side filters: UX excelente

### ⚠️ Decisões para Revisar
- HTML img: Implementar next/image para performance
- Validação simples: Adicionar Zod para robustez
- Sem rate limiting: Adicionar se escalar

### 🎯 Próximas Decisões (v2)
- Analytics implementation
- PWA/Service Workers
- Email notifications
- Chat ao vivo
- Mobile app
