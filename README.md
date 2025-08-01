# Bytebank

Este projeto foi gerado usando o Angular CLI versão 19.2.11.

## Requisitos

* Node.js (versão recomendada: >= 20)
* Angular CLI (versão 19.2.11)
* NPM (versão recomendada >= 9)

## Instalação
```
git clone https://github.com/giovanna-godoy/bytebank.git
cd bytebank
npm install
```

## Servidor de desenvolvimento

Para iniciar a API localmente, execute:

```bash
npm run start:api:local
```

### Microfrontends

Para iniciar apenas o shell (aplicação principal):

```bash
npm run start:shell:local
```

Para iniciar apenas o MFE de investimentos:

```bash
npm run start:mfe:local
```

Para iniciar API + Shell + MFE simultaneamente:

```bash
npm run start:all:local
```

## Storybook

```bash
npm run storybook
```

## Docker - Only Dev

### Requisitos

* Docker (versão recomendada: >= 20)
* Docker Compose (versão 2.13.0)

Para inicializar:
```bash
docker-compose up -d
```

Para finalizar:
```bash
docker-compose down
```

## URL's - Vercel
* Aplicação Principal: https://bytebank-shell-gio.vercel.app/
* MFE Investments: https://bytebank-investments-mfe.vercel.app/
* API: https://bytebank-api-gio.vercel.app/

Os deploys foram feitos via CLI utilizando vercel --prod

## Vídeo da aplicação

* Anexado no zip :)

© 2025 Bytebank. Todos os direitos reservados. - Feito por Giovanna G. Lorente
