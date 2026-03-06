# Teste Técnico - Desenvolvedor Mobile (React Native)

Projeto desenvolvido como parte do processo seletivo da Feel Tech.

# Documentação do Projeto SupportTickets

## Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias](#tecnologias)
3. [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
4. [Estrutura do Projeto](#estrutura-do-projeto)
5. [Arquitetura](#arquitetura)
6. [Navegação](#navegação)
7. [Funcionalidades](#funcionalidades)
8. [Banco de Dados](#banco-de-dados)
9. [Estado e Persistência](#estado-e-persistência)
10. [Tema e Estilização](#tema-e-estilização)
11. [Configuração](#configuração)
12. [Scripts e Comandos](#scripts-e-comandos)
13. [Testes](#testes)
14. [Build e Deploy](#build-e-deploy)

---

## Visão Geral

**SupportTickets** é um aplicativo mobile multiplataforma (Android, iOS e Web) para gerenciamento de tickets de suporte. Desenvolvido com React Native e Expo, permite criar, listar, filtrar e acompanhar tickets com métricas e dashboards.

### Características principais

- Autenticação com persistência de sessão
- CRUD de tickets com armazenamento local (SQLite)
- Dashboard com gráficos e métricas de desempenho
- Filtros por status (aberto, em andamento, fechado)
- Carrossel dos 5 tickets com menor tempo de resolução
- Interface responsiva com tema centralizado

---

## Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Framework** | React Native 0.83.2 + Expo 55 |
| **Linguagem** | TypeScript 5.9 |
| **Navegação** | React Navigation 7 (native-stack, bottom-tabs) |
| **Estado** | Zustand + TanStack React Query |
| **Formulários** | React Hook Form + Yup + Zod |
| **Persistência** | expo-sqlite + react-native-mmkv |
| **UI/Icons** | lucide-react-native, react-native-reanimated |
| **Gráficos** | react-native-chart-kit, react-native-gifted-charts |
| **Fontes** | @expo-google-fonts/roboto |

---

## Pré-requisitos e Instalação

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) / Xcode (para iOS)
- EAS CLI (opcional, para builds)

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd supportTickets

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env

# Iniciar o projeto
npm start
```

### Executando em dispositivos

```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## Estrutura do Projeto

```
supportTickets/
├── android/                 # Projeto nativo Android
├── ios/                     # Projeto nativo iOS
├── assets/                  # Ícones, splash, favicon
├── src/
│   ├── @Types/              # Declarações de tipos (svg.d.ts, png.d.ts)
│   ├── core/                # Núcleo da aplicação
│   │   ├── assets/          # Ícones SVG
│   │   ├── components/      # Componentes base e layout
│   │   │   ├── base/        # Button, Container, Spacer, Switch, Text
│   │   │   ├── layout/      # Header, Input, TicketCard, FormContainer
│   │   │   └── FormContainer/
│   │   ├── database/        # SQLite client, migrations, schema
│   │   ├── storage/         # MMKV storage
│   │   ├── theme/           # colors, spacing, typography
│   │   └── utils/           # formatDate, formatRelativeDate, masks, constants
│   ├── features/
│   │   ├── auth/            # Autenticação (SignIn, store)
│   │   └── app/
│   │       ├── dashboard/   # Dashboard, gráficos, métricas
│   │       ├── newTicket/   # Criação de ticket
│   │       └── tickets/     # Lista, filtros, detalhe
│   └── routes/              # Navegação (auth, app, RootNavigator)
├── App.tsx                  # Componente raiz
├── index.ts                 # Entry point
├── app.json                 # Configuração Expo
├── eas.json                 # Configuração EAS Build
├── package.json
├── tsconfig.json
├── metro.config.js
├── jest.config.js
└── .env.example
```

---

## Arquitetura

### Padrões utilizados

- **Feature-based**: Organização por domínio (auth, tickets, dashboard)
- **Repository Pattern**: Abstração da camada de dados
- **Service Layer**: Lógica de negócio nos serviços
- **Compound Components**: Componentes compostos (Header, Input, TicketCard)

### Fluxo de dados (Tickets)

```
UI (View) → Hook (useTickets) → React Query → ticketService → TicketRepository → TicketSQLiteDataSource → SQLite
```

### Aliases de importação (tsconfig)

| Alias | Caminho |
|-------|---------|
| `@app/*` | `src/app/*` |
| `@core/*` | `src/core/*` |
| `@features/*` | `src/features/*` |
| `@tests/*` | `src/tests/*` |
| `@theme/*` | `src/core/theme/*` |
| `@components/*` | `src/components/*` |
| `@navigation/*` | `src/navigation/*` |

---

## Navegação

### Hierarquia

```
RootNavigator
├── Auth (não autenticado)
│   └── AuthStack
│       └── SignIn
└── Main (autenticado)
    └── AppStack
        ├── Tabs (TabNavigator)
        │   ├── Tickets      # Lista de tickets
        │   ├── NewTickets   # Novo ticket
        │   └── Dashboard    # Métricas
        └── TicketDetail     # Detalhe do ticket (stack)
```

### Arquivos de rotas

- `src/routes/RootNavigator.tsx` — Navegador raiz (Auth vs App)
- `src/routes/auth/AuthStack.tsx` — Stack de autenticação
- `src/routes/app/AppStack.tsx` — Stack principal
- `src/routes/app/TabNavigator.tsx` — Navegação por abas
- `src/routes/app/components/navigation/BottomTabBar.tsx` — Barra de abas customizada

---

## Funcionalidades

### Autenticação

- **Tela**: `SignIn.view.tsx`
- **Store**: `authStore` (Zustand) com persistência em MMKV
- **Validação**: react-hook-form + yup
- Token em base64 armazenado localmente

**Credenciais de Teste:**
- **Email:** `admin@admin.com`
- **Senha:** `123456`

### Tickets

| Funcionalidade | Descrição |
|----------------|-----------|
| **Lista** | Exibe todos os tickets com filtros por status |
| **Filtros** | Aberto, Em andamento, Fechado |
| **Detalhe** | Visualização completa com opção de fechamento |
| **Novo ticket** | Formulário com título, descrição, prioridade, deadline |
| **Fechamento** | Dropdown de status + descrição de fechamento |

### Dashboard

- **StatusPieChart**: Gráfico de pizza por status
- **MetricsSection**: Métricas gerais (total, abertos, fechados)
- **TicketPerformanceCarousel**: Carrossel dos 5 tickets com menor tempo de resolução

### Componentes principais

| Componente | Localização | Descrição |
|------------|-------------|-----------|
| TicketCard | `core/components/layout/TicketCard` | Card composto (Root, Header, Body, Footer, StatusBadge) |
| Header | `core/components/layout/Header` | Cabeçalho (Root, Title, Left, Right, Action) |
| Input | `core/components/layout/Input` | Campo de entrada composto |
| FormContainer | `core/components/FormContainer` | Layout de formulário com scroll |
| Button, Text, Spacer, Switch | `core/components/base` | Componentes base |

---

## Banco de Dados

### Tecnologia

- **expo-sqlite** com SQLCipher (iOS) e FTS habilitado
- Configuração em `app.json` plugins

### Schema (tickets)

```sql
CREATE TABLE tickets (
  id                  TEXT    PRIMARY KEY,
  title               TEXT    NOT NULL,
  description         TEXT    NOT NULL,
  status              TEXT    NOT NULL,
  priority            TEXT    NOT NULL,
  created_at          INTEGER NOT NULL,
  deadline            INTEGER NOT NULL,
  closed_at           INTEGER,
  closure_description TEXT
);
```

### Migrations

- `runMigrations.ts` — Executado na inicialização do App
- Schema em `src/core/database/schema/ticket.schema.ts`

### Camada de dados

- **DataSource**: `TicketSQLiteDataSource` — operações SQL diretas
- **Repository**: `TicketRepository` — implementa `ITicketRepository`
- **Service**: `ticketService` — lógica de negócio

---

## Estado e Persistência

### Zustand

- **authStore**: Sessão, token, `isAuthenticated`, `initializeAuth`
- Persistência via MMKV (`react-native-mmkv`)

### React Query

- `useTickets` — Lista de tickets (com filtros)
- `useTicketCounts` — Contagem por status
- `useAverageResolutionTime` — Tempo médio de resolução
- `useTop5FastestTickets` — 5 tickets mais rápidos
- `useCreateTicket` — Mutação para criar ticket

### React Hook Form

- Formulários em SignIn, NewTicket e fechamento de ticket
- Validação com Yup e Zod

---

## Tema e Estilização

- **StyleSheet** do React Native (sem Tailwind ou CSS Modules)
- Tema centralizado em `src/core/theme/`:

| Arquivo | Conteúdo |
|---------|----------|
| `colors.ts` | Paleta (primary, background, surface, status) |
| `spacing.ts` | Espaçamentos padronizados |
| `typography.ts` | Fontes e estilos de texto |
| `theme.ts` | Hook `useTheme()` e export |

- **Fontes**: Roboto (Light, Regular, Medium, SemiBold, Bold)
- **Ícones**: lucide-react-native
- **SVGs**: react-native-svg-transformer

---

## Configuração

### Variáveis de ambiente (.env)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `APP_NAME` | Nome da aplicação | SupportTickets |
| `APP_ENV` | Ambiente | development |
| `API_URL` | URL da API (futuro) | http://localhost:3000/api |
| `API_TIMEOUT` | Timeout em ms | 30000 |
| `DB_NAME` | Nome do banco | support_tickets.db |
| `ENABLE_LOGGING` | Logs habilitados | true |

### app.json (Expo)

- **Bundle ID iOS**: `com.jefersontrabalho.supportTickets`
- **Package Android**: `com.jefersontrabalho.supportTickets`
- **Plugins**: expo-sqlite (FTS, SQLCipher)

### ESLint e Prettier

- ESLint com `@typescript-eslint` e `prettier`
- Prettier: semi, trailing comma, single quote, 100 chars

---

## Scripts e Comandos

| Script | Comando | Descrição |
|--------|---------|-----------|
| `start` | `expo start --dev-client` | Inicia o servidor de desenvolvimento |
| `android` | `expo run:android` | Executa no Android |
| `ios` | `expo run:ios` | Executa no iOS |
| `web` | `expo start --web` | Executa na Web |
| `test` | `jest` | Executa testes |
| `test:watch` | `jest --watch` | Testes em modo watch |
| `test:coverage` | `jest --coverage` | Cobertura de testes |
| `lint` | `eslint . --ext .ts,.tsx` | Verifica lint |
| `lint:fix` | `eslint . --ext .ts,.tsx --fix` | Corrige lint |
| `format` | `prettier --write "src/**/*.{ts,tsx,json}"` | Formata código |

---

## Testes

- **Framework**: Jest com preset `jest-expo`
- **Biblioteca**: @testing-library/react-native
- **Setup**: `src/tests/setup.ts` (configurado em jest.config.js)
- **Padrão de arquivos**: `**/__tests__/**/*.test.{ts,tsx}` ou `**/tests/**/*.test.{ts,tsx}`
- **Coverage**: `src/**/*.{ts,tsx}` excluindo `.d.ts` e `tests/`
- **Module mapper**: Aliases configurados para imports

> O projeto está preparado para testes, mas ainda não possui arquivos de teste implementados.

---

## Build e Deploy

### EAS Build

- Configuração em `eas.json`
- Perfis: `development`, `preview`, `production`
- Project ID em `app.json` → `extra.eas.projectId`

### Comandos EAS

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Build para desenvolvimento
eas build --profile development --platform android

# Build para produção
eas build --profile production --platform all
```

---

## Resumo

| Aspecto | Detalhe |
|---------|---------|
| **Tipo** | App mobile multiplataforma (React Native + Expo) |
| **Dados** | Locais (SQLite), sem API REST |
| **Auth** | Simulada com persistência MMKV |
| **Plataformas** | Android, iOS, Web |
| **Versão** | 1.0.0 |

---

*Documentação gerada para o projeto SupportTickets.*
