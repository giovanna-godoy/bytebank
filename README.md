# Bytebank - Sistema de Gerenciamento Financeiro

![Bytebank Logo](src/assets/images/ByteBank-Logo.png)

## Sobre o Projeto

Sistema bancário moderno desenvolvido com **Angular 19** aplicando **Clean Architecture**, **microfrontends** e **PWA**. Evolução do Tech Challenge 2 para o Tech Challenge 4 da FIAP.

## Arquitetura

### Clean Architecture
```
src/
├── app/
│   ├── domain/          # Regras de negócio puras
│   │   ├── entities/    # Modelos de dados
│   │   ├── usecases/    # Casos de uso
│   │   └── repositories/# Contratos de dados
│   ├── data/           # Implementações externas
│   │   └── repositories/# HTTP repositories
│   ├── presentation/   # Interface do usuário
│   │   ├── auth/       # Módulo de autenticação
│   │   ├── dashboard/  # Módulo principal
│   │   └── shared/     # Componentes reutilizáveis
│   └── core/          # Services transversais
```

### Microfrontends
- **Shell**: Aplicação principal
- **MFE Investments**: Módulo de investimentos independente

## Tecnologias

- **Angular 19** - Framework principal
- **NgRx** - Gerenciamento de estado
- **RxJS** - Programação reativa
- **Angular Material** - UI Components
- **Module Federation** - Microfrontends
- **Service Worker** - PWA
- **IndexedDB** - Armazenamento offline
- **Web Crypto API** - Criptografia

## Instalação

```bash
# Clone o repositório
git clone https://github.com/giovanna-godoy/bytebank.git
cd bytebank

# Instale as dependências
npm install

# Execute a aplicação
npm run start:all:local
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:shell:local    # Shell principal
npm run start:mfe:local      # MFE investimentos
npm run start:api:local      # API local
npm run start:all:local      # Tudo simultaneamente

# Build e Deploy
npm run build               # Build produção
npm run test               # Testes unitários
npm run storybook          # Documentação componentes

# Docker
docker-compose up -d       # Ambiente completo
```

## Credenciais de Acesso

Disponíveis no txt via portal do aluno

## Funcionalidades

### Implementadas
- **Autenticação JWT** com refresh token
- **Dashboard** com resumo financeiro
- **Transações** (visualizar, criar, editar, excluir)
- **Funcionamento offline** (PWA)
- **Criptografia** de dados sensíveis
- **Validação avançada** de formulários
- **Cache inteligente** de requisições
- **Lazy loading** de módulos

## Padrões Implementados

### State Management (NgRx)
- **Actions**: Ações tipadas
- **Reducers**: Estado imutável
- **Effects**: Side effects
- **Selectors**: Consultas otimizadas

### Segurança
- **JWT Authentication**
- **Refresh Token** automático
- **Criptografia AES-GCM**
- **Sanitização** de inputs
- **CSP** configurado

### Performance
- **Lazy Loading** de rotas
- **Code Splitting** por feature
- **Bundle optimization**
- **Service Worker** para cache
- **RxJS operators** otimizados

## PWA Features

- ✅ Funciona offline
- ✅ Cache inteligente
- ✅ Sincronização automática

## Testes

```bash
# Testes unitários
npm test

# Coverage
npm run test:coverage

# E2E (quando disponível)
npm run e2e
```

## URLs de Produção

- **Shell**: https://bytebank-shell-gio.vercel.app/
- **MFE Investments**: https://bytebank-investments-mfe.vercel.app/
- **API**: https://bytebank-api-gio.vercel.app/

## Métricas de Qualidade

- **Lighthouse Score**: 95+ Performance
- **Bundle Size**: Main < 500KB, Vendor < 2MB
- **Test Coverage**: 60%+
- **TypeScript**: Strict mode

## Autora

**Giovanna G. Lorente**
- GitHub: [@giovanna-godoy](https://github.com/giovanna-godoy)
- LinkedIn: [Giovanna Lorente](https://linkedin.com/in/giovanna-lorente)

---

© 2025 Bytebank. Todos os direitos reservados. - Tech Challenge 4 FIAP
