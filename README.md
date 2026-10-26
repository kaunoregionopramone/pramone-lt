# KKPDA - Kauno Krašto Pramonininkų ir Darbdavių Asociacija

Official website for the Kaunas Region Industrialists and Employers Association, built with Next.js and Sanity CMS.

## Project Structure

```
pramone.lt/
├── frontend/          # Next.js website
└── studio/            # Sanity CMS Studio
```

## Features

- **Modern Next.js 16**: App Router with server-side rendering
- **Sanity CMS**: Real-time content management with Lithuanian interface
- **Member Directory**: Searchable directory of association members
- **News & Events**: Publication date-based sorting, event management
- **SEO Optimized**: Open Graph images, sitemaps, metadata
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 24.22.1 or later in the 24.x LTS line
- npm or yarn

### Installation

1. Install dependencies:
```shell
npm install
```

2. Set up environment variables (see `/frontend/README.md` for details)

3. Run both Studio and frontend:
```shell
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3333](http://localhost:3333)

## Verification

Use `nvm use` to select the patched Node.js version from `.nvmrc`, then install
the committed dependency versions with `npm ci` at the repository root.

```shell
npm run lint
npm run typecheck
npm run build
npm audit
```

The build runs Studio schema extraction before generating frontend types. Configure
the environment variables in `studio/.env.example` and `frontend/.env.example`
before building. Preview testing requires a Sanity read token.

Scoped dependency overrides patch pinned YAML/TOML parsers, Undici, UUID, and the
typography selector parser until their parent packages update those dependencies.
The current `sanity-plugin-media` release still depends on Zod 3, so `npm audit`
reports two high-severity entries for that dependency chain. Keep the compatible
Zod version until the plugin supports the patched major version; forcing Zod 4
also requires migrating its form resolver.

## Content Management

The Sanity Studio uses Lithuanian titles for document types:
- **Nariai** - Member companies
- **Vadovybė** - Leadership team
- **Naujienos ir Renginiai** - News and events (sorted by publication date)
- **Apie mus** - Organization information

## Deployment

### Sanity Studio
```shell
cd studio
npx sanity deploy
```

### Next.js Frontend
Deploy to Vercel:
1. Connect repository to Vercel
2. Set root directory to `frontend`
3. Configure environment variables

The frontend pins the Vercel Node.js runtime to `24.x` through `engines.node`.
After reviewing and merging dependency updates, redeploy the frontend and run
`npm run deploy --workspace=studio` to publish the updated Studio separately.

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_SITE_URL=https://www.pramone.lt  # Optional
```

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)
