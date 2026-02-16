# Guia de Segurança

Documento de boas práticas e configurações de segurança do projeto.

---

## Configurações de Segurança Implementadas

### 1. Security Headers (next.config.ts)

Todos os endpoints recebem headers de segurança:

| Header | Valor | Propósito |
|--------|-------|----------|
| **Content-Security-Policy** | `default-src 'self'; img-src 'self' https://cdn.sanity.io data:; ...` | Restringe recursos a origens confiáveis |
| **X-Frame-Options** | `DENY` | Previne clickjacking (site não pode ser embedded em iframes) |
| **X-Content-Type-Options** | `nosniff` | Previne MIME sniffing (navegador respeita Content-Type) |
| **X-XSS-Protection** | `1; mode=block` | Ativa proteção XSS em navegadores antigos |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains; preload` | Força HTTPS por 1 ano + subdomínios |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Controla info de referrer enviada a sites externos |

### 2. Rate Limiting (src/middleware.ts)

- **Limite**: 100 requisições por minuto por IP
- **Aplicado a**: `/studio` (CMS editor)
- **Resposta**: HTTP 429 quando excedido
- **Armazenamento**: In-memory (por servidor; em produção considerar Redis/Vercel KV)

### 3. @sanity/vision Desativado em Produção

A ferramenta de debug Vision Tool (permite executar queries GROQ arbitrárias) está ativa **apenas em desenvolvimento**.

```typescript
// sanity.config.ts
const plugins = process.env.NODE_ENV === 'development'
  ? [structureTool(), visionTool()]
  : [structureTool()]
```

---

## Rotação de Token Sanity (CRÍTICO)

### ⚠️ Token Atual Expirado

O token `SANITY_API_TOKEN` em `.env.local` foi exposto neste documento de análise. **Deve ser rotacionado imediatamente.**

### Como Rotacionar

1. **Acessar Sanity Dashboard**
   - https://manage.sanity.io/
   - Projeto: Manuela Rezende Imóveis

2. **Gerar novo token**
   - Settings → API → Tokens → Create New Token
   - Nome: `prod-api-token-v2`
   - Permissões: `editor` (permite criar/editar documentos)

3. **Copiar novo token**
   - Será mostrado UMA VEZ

4. **Atualizar .env.local localmente**
   ```
   SANITY_API_TOKEN=<novo-token>
   ```
   - **NÃO fazer commit** (`.gitignore` está configurado)

5. **Atualizar no Vercel**
   - Vercel Dashboard → Projeto → Settings → Environment Variables
   - Atualizar `SANITY_API_TOKEN`

6. **Revogar token antigo**
   - Sanity Dashboard → API → Tokens
   - Encontrar token antigo (`skXpFP...`)
   - Clicar em "..." → Delete

7. **Verificar em produção**
   - Scripts de seed ainda devem funcionar com novo token
   - `/studio` deve continuar funcionando

---

## Checklist de Segurança

### ✅ Implementado

- [x] Security Headers (CSP, X-Frame-Options, HSTS, etc)
- [x] Rate Limiting em `/studio`
- [x] Vision Tool desativado em produção
- [x] CORS restrito apenas a `cdn.sanity.io`
- [x] Validação de entrada (whitelist de tipos, preços, etc)
- [x] GROQ Injection: queries usam `defineQuery()` + typed params
- [x] XSS Prevention: sem `dangerouslySetInnerHTML`
- [x] HTTPS obrigatório (Vercel)
- [x] npm audit: 0 vulnerabilities

### ⚠️ Pendente

- [ ] **Token Sanity rotacionado** (URGENTE)
- [ ] Considerar Redis/Vercel KV para rate limiting persistente
- [ ] Ativar MFA no Sanity (se disponível no plano)
- [ ] Backup automático de dados do Sanity
- [ ] Logs centralizados (Sentry, Vercel Analytics)
- [ ] Monitoramento de eventos de segurança

---

## Vulnerabilidades Conhecidas (Resolvidas)

### 🔴 CRÍTICO (Corrigido)
- **@sanity/vision em produção** → Desativado em prod
- **Sem Security Headers** → Headers implementados

### 🟡 ALTO (Parcial)
- **Rate Limiting** → Implementado para /studio
- **Token exposto** → Remover/rotacionar (manual)

### 🟢 BAIXO (Seguro)
- GROQ Injection: Safe (defineQuery)
- XSS: Safe (sem dangerouslySetInnerHTML)
- Image Access: Safe (remotePatterns restrito)
- Dependencies: Safe (npm audit: 0)

---

## Políticas de Desenvolvimento

### Ao adicionar nova funcionalidade

1. **Validar entrada**
   - Sempre usar whitelist para valores conhecidos
   - Nunca confiar em `searchParams` direto

2. **Evitar métodos inseguros**
   - ❌ `dangerouslySetInnerHTML`
   - ❌ `eval()` ou `Function()`
   - ❌ Secrets em código

3. **Usar Sanity corretamente**
   - ✅ `defineQuery()` para GROQ
   - ✅ Typed parameters
   - ✅ Schemas com validação

4. **Testar segurança**
   ```bash
   npm audit
   npm update
   ```

---

## Respostas a Incidentes

### Suspeita de Token Comprometido

1. Rotacionar token IMEDIATAMENTE (passos acima)
2. Revisar logs de acesso ao `/studio`
3. Verificar modificações não autorizadas em documentos
4. Notificar corretora (Manuela)

### Ataque de DDoS

- Vercel bloqueará automaticamente
- Aumentar rate limiting se necessário
- Considerar Vercel Enterprise DDoS protection

### Data Breach

1. Notificar usuários
2. Revogar todos os tokens
3. Fazer audit de segurança
4. Revisar logs de acesso

---

## Contatos de Segurança

- **Sanity Security**: https://sanity.io/security
- **Vercel Support**: https://vercel.com/support
- **Next.js Security**: https://nextjs.org/docs/architecture/security-considerations
- **OWASP**: https://owasp.org/

---

**Última atualização**: 16 de fevereiro de 2026
**Score de Segurança**: 8.5/10 (após implementação)
**Próxima revisão**: 16 de maio de 2026
