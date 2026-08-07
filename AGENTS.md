# AGENTS.md

Guidelines for agents working in this repository.

## Project overview

This is Raymond Csirák's personal portfolio. It is a static, editorial-style single-page site built with semantic HTML and custom CSS and deployed with Cloudflare Workers Static Assets.

## Commands

```bash
npm run dev          # Local development
npm run build        # Validate the asset-only Workers deployment
npm run preview      # Preview with the Workers runtime
npm run deploy       # Deploy to Cloudflare Workers
```

## Structure

```text
public/index.html        Homepage markup, metadata, and structured data
public/styles.css        Homepage design and responsive rules
public/404.html          Custom not-found page
public/robots.txt        Crawler directives
public/sitemap.xml       Search-engine sitemap
public/                  Portrait, résumé, and favicon assets
```

## Conventions

- Keep the site free of client-side JavaScript unless a feature genuinely needs state or interaction.
- Keep homepage content and metadata in `public/index.html`.
- Use the existing `home-film-*` class naming in `public/styles.css`.
- Preserve the current Arial/Georgia type pairing and the charcoal, slate, and orange palette unless a redesign is requested.
- Prefer semantic HTML and keep the skip link, focus styles, alt text, and reduced-motion rules intact.
- Do not add a framework, build tool, component library, or client-side animation dependency for simple markup and styling.
- Never commit secrets or local environment files.

## Deployment

- Cloudflare Workers is the primary Git-triggered deployment target.
- Files in `public/` are deployed directly with Workers Static Assets.
- Keep the deployment asset-only unless a feature genuinely requires runtime Worker code.

## Verification

Before committing, run `npm run build`, then smoke-test the homepage, static metadata files, assets, and 404 response through `wrangler dev`. Fix all warnings and errors introduced by the work.

Always use conventional commits for git commit messages.
