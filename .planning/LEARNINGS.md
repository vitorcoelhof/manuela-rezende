# 🎓 Aprendizados do Projeto

## 1. Next.js & App Router

### Next.js 16 Features
- ✅ **Turbopack:** Build mais rápido (35s vs ~60s com webpack)
- ✅ **App Router:** Melhor do que Pages Router, mais intuitivo
- ✅ **Server Components:** Default - reduz JavaScript no cliente
- ✅ **Dynamic Routes:** `[slug]` pattern simples e poderoso
- ✅ **Middleware (Deprecated):** Now use "proxy" pattern
- ✅ **ISR:** `export const revalidate = 60` para dados frescos

### Problemas Encontrados
- ⚠️ **Warning:** "middleware deprecated" - usar proxy pattern
- ⚠️ **Edge Runtime:** Desabilita static generation (encontrado em logs)
- ⚠️ **LCP Issues:** Imagens grandes prejudicam Core Web Vitals

---

## 2. TypeScript & Type Safety

### Padrões Implementados
```typescript
// ✅ Bom: Interface clara para props
interface ImovelGridProps {
  imoveis: Imovel[]
  initialTipo?: string
  initialFaixa?: string
}

// ✅ Bom: Union types para categorias
type TipoImovel = 'casa' | 'apartamento' | 'studio' | 'terreno' | 'comercial'

// ✅ Bom: Tipos aninhados para estruturas complexas
type Imovel = {
  _id: string
  titulo: string
  slug: { current: string }
  fotoCapa?: { asset: { _ref: string }; alt?: string }
}
```

### Aprendizados
- Sanity types são complexos mas valiosos
- Enums vs Union types: Ambos funcionam, mas Union é mais funcional
- Generic types para componentes reutilizáveis

---

## 3. Sanity CMS

### Cliente vs Autenticação

**Problema:**
```typescript
// ❌ Não funciona em production
const client = createClient({ projectId, dataset })
await client.create({ _type: 'consulta', ... }) // 403 Permission Denied!
```

**Solução:**
```typescript
// ✅ Funciona em API routes
const authClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN, // Token dev/prod
  useCdn: false,
})
```

### Regras Críticas
- 🔴 **NUNCA** colocar token no cliente
- 🔴 **NUNCA** usar `useCdn: true` com token
- 🟢 **SEMPRE** usar autenticação em API routes para mutations
- 🟢 **SEMPRE** usar `useCdn: true` para read-only queries (melhor performance)

### GROQ Queries
```groq
// Fetch com filtros
*[_type == "imovel" && destaque == true] | order(preco desc)

// Fetch com projeção
*[_type == "imovel"] { titulo, preco, "slug": slug.current }

// Fetch com referências
*[_type == "imovel"] { ..., "corretora": *[_type == "corretora"][0] }
```

### Token Sanity
- ✅ Deve começar com `sk_production_` ou `sk_`
- ✅ Role mínimo: "Contributor" para mutations
- ✅ Deve estar em environment variable, NUNCA hardcoded
- ✅ Rotação periódica recomendada para segurança

---

## 4. API Routes & HTTP

### POST vs GET
```typescript
// ✅ POST para criar dados
export async function POST(request: NextRequest) {
  const body = await request.json()
  // Validar, processar, retornar
  return NextResponse.json({ success: true }, { status: 201 })
}

// ✅ GET só para fetch (não implementado neste projeto)
export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Only POST allowed' }, { status: 405 })
}
```

### Validação de Entrada
```typescript
// ✅ Sempre validar dados do cliente
if (!nome || !tipo) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  )
}

// ✅ Validar contra lista permitida
const validTipos = ['casa', 'apartamento', 'studio', 'terreno', 'comercial']
if (!validTipos.includes(tipo)) {
  return NextResponse.json(
    { error: 'Invalid tipo' },
    { status: 400 }
  )
}
```

### Error Handling
```typescript
try {
  // Processamento
} catch (error) {
  console.error('Error creating consulta:', error)
  return NextResponse.json(
    { error: 'Failed to create consulta' },
    { status: 500 }
  )
}
```

---

## 5. React Hooks & Performance

### useMemo para Filtros
```typescript
// ❌ Recalcula a cada render (lento com muitos imóveis)
const filtered = imoveis.filter(...)

// ✅ Só recalcula quando dependências mudam
const filtered = useMemo(() => {
  return imoveis.filter(im => {
    if (tipo && im.tipo !== tipo) return false
    if (faixa) {
      const [min, max] = faixa.split('-').map(Number)
      if (min !== null && im.preco < min) return false
      if (max !== null && im.preco > max) return false
    }
    return true
  })
}, [imoveis, tipo, faixa])
```

### useRouter para Navegação
```typescript
// ✅ Usar em client components
const router = useRouter()
router.push(`/vendas?tipo=${tipo}&faixa=${faixa}`)

// ✅ URLSearchParams para query params
const params = new URLSearchParams()
if (tipo) params.set('tipo', tipo)
router.push(`/vendas?${params.toString()}`)
```

---

## 6. Tailwind CSS v4

### PostCSS Config
```js
// tailwind.config.ts precisa de
import { postcss } from '@tailwindcss/postcss'
```

### Custom Colors
```typescript
// ✅ Usar hex colors direto
className="bg-[#111111] hover:bg-[#222222]"

// ✅ ou definir em config
theme: {
  extend: {
    colors: {
      primary: '#b8976a', // Gold
      dark: '#111111',    // Black
    }
  }
}
```

### Responsive Design
```typescript
// ✅ Mobile-first approach
className="text-sm sm:text-base md:text-lg"

// ✅ Flex layout responsivo
className="flex flex-col sm:flex-row gap-3"
```

---

## 7. WhatsApp Integration

### URL Schema
```typescript
// Básico
const url = `https://wa.me/55XXXXXXXXXXX`

// Com mensagem pré-preenchida
const message = encodeURIComponent(`*Nova Consulta*\n\n*Nome:* João Silva`)
const url = `https://wa.me/55XXXXXXXXXXX?text=${message}`

// Formatação de número
let number = '11987654321' // São Paulo
if (!number.startsWith('55')) {
  number = '55' + number // Adicionar código país
}
```

### Boas Práticas
- ✅ Formatação clara da mensagem com markdown WhatsApp
- ✅ Encoding URI para caracteres especiais
- ✅ Código de país (55) obrigatório
- ✅ Redirecionar com `window.location.href` (página completa)

---

## 8. Vercel Deployment

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx    # Público (no cliente)
NEXT_PUBLIC_SANITY_DATASET=production  # Público
NEXT_PUBLIC_SANITY_API_VERSION=2024    # Público
SANITY_API_TOKEN=sk_prod_xxxxx          # Privado (servidor)
```

### Deployment Process
1. Push para GitHub main
2. Webhook automático dispara deployment
3. Vercel instala dependências
4. Executa `npm run build`
5. Deploy em CDN global

### Problemas & Soluções

**Problema 1: Arquivo não aparece em build**
```
Solução: git ls-files | grep consultas
         Verificar se arquivo foi commitado
```

**Problema 2: API returns 404**
```
Solução: Adicionar env vars em Vercel Settings
         Fazer redeploy manual
         Verificar build logs
```

**Problema 3: Cache de browser**
```
Solução: Ctrl+Shift+R (hard refresh)
         Limpar dados do site
         Usar DevTools Network tab
```

---

## 9. Security & Best Practices

### Headers de Segurança
```typescript
export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set('Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'")

  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('X-Frame-Options', 'DENY')
  requestHeaders.set('X-XSS-Protection', '1; mode=block')

  return NextResponse.next({ request: { headers: requestHeaders } })
}
```

### Validação de Entrada
- ✅ Sempre validar no servidor
- ✅ Nunca confiar em dados do cliente
- ✅ Usar listas whitelist para valores enum
- ✅ Sanitizar strings para evitar injection

### Token Management
- ✅ NUNCA commitar tokens (.env.local no .gitignore)
- ✅ Rotacionar tokens periodicamente
- ✅ Usar env vars para secrets
- ✅ Escopo mínimo de permissions

---

## 10. Git & Workflow

### Commits Semânticos
```bash
# ✅ Bom
git commit -m "feat: implement lead capture form with WhatsApp"
git commit -m "fix: add SANITY_API_TOKEN to authentication"
git commit -m "style: center search bar on homepage"
git commit -m "refactor: sort property types alphabetically"

# ❌ Ruim
git commit -m "updates"
git commit -m "fix bug"
git commit -m "changes"
```

### Workflow Básico
```bash
git status                    # Ver mudanças
git add <arquivo>            # Stage arquivo
git commit -m "mensagem"      # Commit local
git push                      # Push para GitHub
# Vercel auto-deploys!
```

---

## 11. Debugging & Troubleshooting

### Checklist de Deployment
- [ ] Arquivo existe: `git ls-files | grep <arquivo>`
- [ ] Build local: `npm run build` (sem erros)
- [ ] Env vars: Settings → Environment Variables
- [ ] Deploy status: Deployments tab → Logs
- [ ] Browser cache: Ctrl+Shift+R
- [ ] DevTools Console: Erros JavaScript?
- [ ] Network tab: Requests sendo feitas?

### Ferramentas Úteis
- 🔍 **DevTools Network:** Ver requests HTTP, status codes
- 🔍 **DevTools Console:** Erros JavaScript, logs
- 🔍 **Git log:** Ver histórico de commits
- 🔍 **Vercel Build Logs:** Erros de build específicos

---

## 12. UX & Design

### Busca Rápida
- ✅ Compacta (~50px altura vs ~80px antes)
- ✅ Centralizada (melhor harmonia visual)
- ✅ Alfabética (mais fácil encontrar tipo desejado)

### Formulário de Lead
- ✅ Modal (não intermitente)
- ✅ Colapsável (não preenche tela)
- ✅ WhatsApp direto (menos passos)
- ✅ Campos mínimos (menos fricção)

### Filtros
- ✅ Sticky (sempre acessível)
- ✅ Responsivos (mobile-first)
- ✅ Com contador (mostra resultados)
- ✅ Clear button (limpar filtros)

---

## 📌 Checklist para Próximos Projetos

- [ ] Setup Next.js 16 + Tailwind 4 + TypeScript desde início
- [ ] Implementar CI/CD com Vercel desde day 1
- [ ] Usar authenticated clients para mutations em Sanity
- [ ] Testar deployment antes de declarar pronto
- [ ] Adicionar analytics desde início
- [ ] Documentar decisões em .planning/
- [ ] Security headers implementados logo
- [ ] Commits semânticos desde primeiro commit
- [ ] README com setup instructions
- [ ] CONTRIBUTING guide para colaboradores
