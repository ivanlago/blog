This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code Quality Tools

This project uses [Biome](https://biomejs.dev/) for code formatting, linting, and import organization. Biome has replaced ESLint and Prettier in this project.

### Available Commands

- `npm run lint` - Check for formatting and linting issues
- `npm run lint:fix` - Automatically fix formatting and linting issues
- `npm run format` - Format all files in the project

### VS Code Integration

To get full Biome integration with VS Code (formatting on save, error highlighting, etc.):

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Biome"
4. Install the official "Biome" extension by "BiomeJS"

The extension ID is: `biomejs.biome`

With the Biome VS Code extension installed:
- Code will be automatically formatted on save
- Linting errors will be shown in real-time
- Import sorting will be applied automatically

## Gerenciamento de Anúncios

Este blog inclui um sistema de gerenciamento de anúncios para produtos afiliados. Você pode:

- Criar anúncios com imagem, título e link para produtos
- Associar anúncios a categorias específicas
- Marcar anúncios como "destaque"
- Gerenciar anúncios através do painel administrativo

Para acessar o painel administrativo, faça login como administrador e acesse `/admin`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.