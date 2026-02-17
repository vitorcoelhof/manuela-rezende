# 📚 Planning & Documentation

Esta pasta contém toda a documentação do projeto Manuela Rezende Imóveis.

## 📄 Documentos

### 1. [PROJECT.md](./PROJECT.md)
**Visão geral do projeto**
- Stack técnico
- Estrutura de pastas
- Fluxo de dados
- Status do projeto
- Deployment info

👉 **Leia quando:** Precisa entender o projeto do zero

---

### 2. [PHASES.md](./PHASES.md)
**Histórico de todas as fases implementadas**
- Fase 1: Setup inicial
- Fase 2: Schemas & CMS
- Fase 3: Homepage & Componentes
- Fase 4: Lead Capture
- Fase 5: Deployment & Segurança
- Fase 6: UX & Refinamentos

👉 **Leia quando:** Quer entender como o projeto foi construído

---

### 3. [LEARNINGS.md](./LEARNINGS.md)
**Tudo que aprendemos durante o desenvolvimento**
- Next.js 16 features
- TypeScript patterns
- Sanity best practices
- React hooks & performance
- Tailwind CSS v4
- WhatsApp integration
- Vercel deployment
- Security practices
- Git workflow
- Debugging tips
- UX decisions

👉 **Leia quando:** Quer aprender com a experiência

---

### 4. [DECISIONS.md](./DECISIONS.md)
**Racional por trás de cada decisão técnica**
- Por que Next.js 16?
- Por que Sanity?
- Por que Tailwind?
- Por que Vercel?
- Por que WhatsApp?
- Trade-offs de cada decisão
- Alternativas consideradas

👉 **Leia quando:** Quer entender o "por quê" das coisas

---

## 🗺️ Mapa Rápido

```
Novo no projeto?
├─ Leia PROJECT.md (5 min)
├─ Leia PHASES.md (overview, 15 min)
└─ Mergulhe no código

Quer manter para próximos projetos?
├─ LEARNINGS.md (25 min)
├─ DECISIONS.md (15 min)
└─ Bookmark nos favoritos

Ajudando alguém?
├─ Aponte para PROJECT.md (visão geral)
├─ Aponte para PHASES.md (entendimento)
└─ Responda questões com DECISIONS.md

Debugando um problema?
├─ Procure em LEARNINGS.md seção "Troubleshooting"
├─ Procure em DECISIONS.md por alternativas
└─ Procure em PHASES.md pelo contexto da feature
```

---

## 📊 Estatísticas do Projeto

- **Duração:** ~3 sessões de desenvolvimento
- **Commits:** 14+ commits semânticos
- **Fases:** 6 fases completadas
- **Stack:** Next.js 16 + Sanity + Tailwind + Vercel
- **Status:** ✅ MVP Completo e em Produção

---

## 🎯 Checkpoints Importantes

### ✅ Inicialização (Fase 1-2)
- [x] Next.js + Tailwind setup
- [x] Sanity schemas
- [x] CMS integration

### ✅ Features (Fase 3-4)
- [x] Homepage + filtros
- [x] Página de vendas
- [x] Lead capture + WhatsApp

### ✅ Deployment (Fase 5)
- [x] Vercel connected
- [x] Environment vars configured
- [x] Security headers

### ✅ Polish (Fase 6)
- [x] Ordem alfabética
- [x] UX compacta
- [x] Testes em produção

---

## 🚀 Para Próximos Passos

Veja o final de [PHASES.md](./PHASES.md) para:
- Possíveis melhorias
- Features futuras
- Analytics ideas
- Mobile app roadmap

---

## 📝 Convenções

### Commits Semânticos
```bash
feat:     Nova feature
fix:      Bug fix
style:    CSS/styling changes
refactor: Code refactor
docs:     Documentação
chore:    Manutencão, deps
```

### TypeScript
- Sempre usar tipos explícitos
- Evitar `any`
- Preferir `type` sobre `interface`

### React Components
- Usar functional components
- Usar hooks ao invés de classes
- Memoizar listas com `useMemo`

### Sanity
- Usar `authClient` para mutations
- Usar read-only `client` para queries
- NUNCA expor token ao cliente

---

## 💡 Quick Links

- **Repo:** https://github.com/vitorcoelhof/manuela-rezende
- **Live:** https://manuela-rezende.vercel.app
- **Sanity Studio:** https://sanity.io (após deploy)
- **Vercel Dashboard:** https://vercel.com/dashboard

---

## 📞 Contato & Créditos

**Desenvolvido com:** Claude Code + Next.js + Sanity + Vercel

**Última atualização:** Fevereiro 2026

---

**Dica:** Use Ctrl+F para buscar por palavra-chave nos documentos! 🔍
