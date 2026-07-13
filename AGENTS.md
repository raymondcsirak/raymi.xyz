# AGENTS.md

Guidelines for agents working in this repository.

## Project overview

This is Raymond Csirák's personal portfolio, built with Next.js 16 and TypeScript. It is a static, editorial-style single-page site with custom CSS and a mailto contact link.

## Commands

```bash
npm run dev          # Local development
npm run lint         # ESLint
npx tsc --noEmit     # Type checking
npm run build        # Production build
npm run preview      # Build and preview with the Workers runtime
npm run deploy       # Build and deploy to Cloudflare Workers
```

## Structure

```text
app/page.tsx             Homepage markup
app/layout.tsx           Metadata, structured data, and analytics
app/globals.css          Minimal document-level styles
app/long-uptime.css      Homepage design and responsive rules
lib/portfolio-data.ts    Profile and experience content
public/                  Portrait, résumé, and favicon assets
```

## Conventions

- Keep the page server-rendered unless a feature genuinely needs client-side state.
- Keep profile and experience copy in `lib/portfolio-data.ts` when it is shared or repeated.
- Use the existing `home-film-*` class naming in `app/long-uptime.css`.
- Preserve the current Arial/Georgia type pairing and the charcoal, slate, and orange palette unless a redesign is requested.
- Prefer semantic HTML and keep the skip link, focus styles, alt text, and reduced-motion rules intact.
- Use explicit TypeScript types for function parameters and object shapes where inference is insufficient.
- Organize imports as external packages, project aliases, then relative files.
- Do not add Tailwind, shadcn/ui, a component library, or a client-side animation dependency for simple styling.
- Never commit secrets or local environment files.

## Deployment

- Cloudflare Workers is the primary Git-triggered deployment target.
- The site is statically exported to `out/` and deployed with Workers Static Assets.
- Keep the deployment asset-only unless a feature genuinely requires runtime Worker code.

## Verification

Before committing, run lint, type checking, and the production build. Run `npx wrangler deploy --dry-run` when deployment configuration or dependencies change. Fix all warnings and errors introduced by the work.

Always use conventional commits for git commit messages.
