
# SanctumLink – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![TypeScript](https://img.shields.io/badge/Typescript-blue)
![Ionic](https://img.shields.io/badge/Ionic-lightgray)
![React](https://img.shields.io/badge/React-blue)
![CSS](https://img.shields.io/badge/CSS-blue)

> Seamless Identity Verification for Web3.

This is the frontend for the SanctumLink project at the [Chainlink Block Magic 2024 Hackathon](https://chain.link/hackathon). The repository was scaffolded with [`vite`](https://vitejs.dev/).

## Getting Started

> **Pre-requisites:**
>
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Install [pnpm](https://pnpm.io/installation) (recommended via [Node.js Corepack](https://nodejs.org/api/corepack.html) or `npm i -g pnpm`)
> - Clone this repository

```bash
# Install dependencies
pnpm install

# Copy & fill environments
cp .env.local.example .env.local
```

## Development

> [!TIP]  
> For the best development experience, install all recommended VSCode workspace plugins listed in `.vscode/extensions.json`.

```bash
# Start development server
pnpm run dev

# Build production frontend & start server
pnpm run build
pnpm run start
```

## Testing

We use Cypress for end-to-end testing. Ensure Cypress is installed and configured correctly.

```bash
# Run Cypress tests
pnpm run cypress:open
```
