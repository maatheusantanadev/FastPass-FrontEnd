# FastPass — Front-end

Interface de uma plataforma de gestão de turismo e excursões cujo diferencial é o
**embarque inteligente**: reconhecimento facial (Face ID), QR Code e conferência
manual. Um único código-base atende três superfícies distintas — o app do
passageiro, o app de operação do motorista e o painel administrativo da empresa —
mantendo a mesma identidade visual.

> Projeto **somente front-end**. Não há back-end: todos os dados são mocks em
> memória (`src/data/`) e as integrações sensíveis — câmera e pagamento — são
> simuladas no cliente. A ideia é validar fluxo, arquitetura de UI e identidade.

Contexto do produto: turismo na Bahia/Brasil — Pix, valores em R$ e destinos como
Praia do Forte, Chapada Diamantina e Morro de São Paulo.

---

## Stack

| Camada | Ferramenta |
| --- | --- |
| Build / dev server | Vite 6 |
| UI | React 18 |
| Estilo | Tailwind CSS 3 (tokens próprios) |
| Animação | Framer Motion 11 |
| Ícones | lucide-react |
| Rotas | React Router 6 |
| QR Code | qrcode.react |
| Deploy | Docker multi-stage + Nginx |

Sem UI kit de terceiros: todos os componentes visuais são próprios, construídos
sobre os tokens do `tailwind.config.js`.

---

## Arquitetura

```
src/
├─ main.jsx                 # entrada; providers (Pedido, Operação) + Router
├─ App.jsx                  # tabela de rotas das 3 superfícies
├─ index.css                # base Tailwind, foco, safe-area, prefers-reduced-motion
├─ components/              # 30 componentes compartilhados (design system)
├─ context/
│  ├─ PedidoContext.jsx     # estado do checkout do passageiro
│  └─ OperacaoContext.jsx   # lista de embarque (compartilhada motorista ↔ admin)
├─ data/                    # mocks: excursões, passageiros, viagens, relatórios
├─ utils/                   # formatação (R$), máscaras (telefone/CPF)
└─ screens/
   ├─ passageiro/           # app mobile-first
   ├─ operacao/             # app do motorista, mobile-first
   └─ admin/                # painel web, desktop-first
```

São **42 telas** apoiadas em **30 componentes** reutilizáveis. As telas nunca
duplicam layout: composição a partir de `MobileShell`, `DashboardShell`,
`AppHeader`, `Button`, `TextField`, etc.

---

## Design system

Os tokens vivem em `tailwind.config.js` e são a única fonte de cor/tipografia.

| Token | Hex | Uso |
| --- | --- | --- |
| `cobalt` | `#2B50FF` | primária, protagonista |
| `cobalt-dark` | `#1E3AD6` | hover/pressionado |
| `cobalt-soft` | `#C9D4FF` | botão secundário |
| `cobalt-tint` | `#EEF1FF` | fundos de campo/superfície |
| `ink` | `#0E1330` | texto |
| `muted` | `#6B7191` | texto secundário |
| `line` | `#E7EAF6` | bordas |
| `success` / `warning` / `danger` | `#16B26A` / `#E8A33D` / `#E5484D` | estados |
| `night` | `#080B1C` | fundo das telas de câmera |

- **Tipografia:** `Jost` (marca em peso 300, títulos 500–600) + `Inter` (corpo).
  O selo `FACE ID` em Inter 700, caixa alta e `letter-spacing` largo é a
  assinatura da marca.
- **Formas:** botões em pílula, campos com raio de ~14px, muito espaço em branco.
- **Estados e selos de método** (Face ID / QR / Manual) são idênticos nas três
  superfícies — um passageiro embarcado por Face ID aparece igual no app do
  motorista e no painel do admin.

---

## As três superfícies

### Passageiro — `/` · mobile-first
Fluxo completo: splash → onboarding → cadastro → termos → permissões → Face ID →
explorar → detalhes → assentos → passeios → resumo/cupom → pagamento (Cartão/Pix)
→ confirmação. Mais viagens, bilhete com QR, avisos, embarque, rastreamento e
avaliação com fidelidade.

### Operação (motorista) — `/operacao` · mobile-first
Seleção da viagem do dia, KPIs, e as telas de validação **imersivas** (fundo
escuro, tela cheia): reconhecimento facial, QR e conferência manual, com os
caminhos de aprovado e não identificado, lista de embarque ao vivo e encerramento.

### Admin (empresa) — `/painel` · desktop-first
Painel com sidebar colapsável: visão geral (KPIs + gráficos), gestão de excursões
e vagas, **validação em tempo real** (acompanha o que o motorista valida) e
relatórios com histórico.

No desktop, os apps mobile mantêm a “cara de app”: uma coluna de ~430px
centralizada sobre um fundo cobalto ambiente. O painel admin é responsivo até
tablet (a sidebar vira _drawer_).

---

## Estado e dados

Sem back-end, o estado vive em dois contextos React, em memória:

- **`PedidoContext`** — excursão, assento, passeios extras, cupom e os totais
  derivados do checkout do passageiro.
- **`OperacaoContext`** — a lista de embarque. É **compartilhada** entre o app do
  motorista e o painel do admin: confirmar um passageiro manualmente no painel
  atualiza a mesma lista que o motorista vê, ilustrando a validação à distância.

Os dados de origem (excursões, passageiros, viagens do dia, métricas) são módulos
estáticos em `src/data/`.

---

## Decisões de implementação

- **Câmera mockada.** As telas de validação não usam `getUserMedia`: renderizam um
  viewport escuro com moldura/retículo e linha de varredura animada. A leitura é
  simulada por toque/timer, com caminho de sucesso e de falha — suficiente para o
  fluxo sem depender de hardware.
- **QR Code real.** Gerados no cliente com `qrcode.react`, na moldura da marca.
- **Gráficos à mão.** Barras em CSS e donut com `stroke-dasharray` — na paleta
  cobalto, sem biblioteca de charts, para não destoar da identidade.
- **Mapa sem SDK.** O rastreamento usa uma rota estilizada em SVG com o ônibus
  animado via `animateMotion`.
- **Transições contidas.** Framer Motion para entrada de marca, foco de campo,
  `scale` ao pressionar e transição de página (`AnimatePresence`).
- **Acessibilidade.** `<label>` associado a cada campo, foco de teclado visível,
  alvos de toque ≥ 44px, contraste AA, `aria-*` onde faz sentido e respeito a
  `prefers-reduced-motion` (inclusive nas animações JS, via `useReducedMotion`).
- **Mobile de verdade.** `env(safe-area-inset-*)` para notch, `meta viewport`
  correta e ação primária de largura total na base (zona do polegar).

---

## Rodando o projeto

Pré-requisito: Node 18+.

```bash
npm install
npm run dev       # http://localhost:5173
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento (HMR) |
| `npm run build` | build de produção em `dist/` |
| `npm run preview` | serve o build localmente |

### Docker

Imagem multi-stage (build com Node → estáticos servidos por Nginx). O Nginx usa
`try_files` para as rotas do SPA e aplica cache imutável nos assets com hash.

```bash
# Produção — http://localhost:8080
docker compose up -d web

# Desenvolvimento com HMR dentro do container — http://localhost:5173
docker compose --profile dev up dev
```

---

## Integração com a API

A camada de acesso ao backend (Laravel) fica em **`src/api/`**:

| Arquivo | Responsabilidade |
| --- | --- |
| `client.js` | wrapper de `fetch` — injeta o token Bearer, trata JSON e normaliza erros (`ApiError`); `status: 0` indica backend offline |
| `auth.js` | `/auth/register`, `/login`, `/me`, `/logout` |
| `excursoes.js` | `/excursoes`, detalhe, painel e conclusão |
| `compras.js` | listar/criar passagens e registrar a biometria facial |
| `embarque.js` | validação de embarque por facial e por QR Code |
| `adapters.js` | traduz o JSON do backend para o formato das telas (datas formatadas, `vagas`/`total`, `cena`, etc.) |

A sessão é gerida pelo **`AuthContext`** (token persistido em `localStorage`). O
**Login** e o **Cadastro** já chamam a API real; **Explorar** e **Detalhes**
carregam as excursões do backend.

> **Degradação graciosa:** se o backend estiver fora do ar, o app cai
> automaticamente em modo demonstração (dados mock de `src/data/`), sem quebrar
> o fluxo — ideal para apresentações.

Configure a URL da API copiando `.env.example` para `.env`:

```bash
cp .env.example .env   # VITE_API_URL=http://localhost:8000/api
```

---

## Mapa de rotas

**Entrada** `/` · `/onboarding` · `/boas-vindas` · `/login` · `/cadastro` · `/recuperar-senha`

**Passageiro** `/termos` · `/permissoes` · `/faceid` · `/qr` · `/conta-criada` ·
`/app/explorar` · `/app/excursao/:id` · `/app/assentos` · `/app/passeios` ·
`/app/resumo` · `/app/pagamento` · `/app/confirmacao` · `/app/viagens` ·
`/app/viagem/:id` · `/app/avisos` · `/app/aviso/:id` · `/app/perfil` ·
`/app/perfil/editar` · `/app/embarque` · `/app/rastreamento` · `/app/avaliacao`

**Operação** `/operacao` · `/operacao/viagens` · `/operacao/facial` ·
`/operacao/qr` · `/operacao/aprovado` · `/operacao/nao-identificado` ·
`/operacao/manual` · `/operacao/lista` · `/operacao/fim`

**Admin** `/painel` · `/painel/excursoes` · `/painel/excursoes/nova` ·
`/painel/excursoes/:id` · `/painel/validacao` · `/painel/relatorios`
