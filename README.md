# raymi.xyz

Raymond Csirák's portfolio. Static HTML and custom CSS, deployed with Cloudflare Workers Static Assets. The career plays as six pixel-art levels, built around the pixel portrait.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:8787](http://localhost:8787).

## Files

- `public/index.html`: homepage and career history.
- `public/styles.css`: site styles.
- `public/paging.js`: one flick, swipe or key press moves one stop, from the hero to Level 5.
- `public/art/`: generated pixel-art scenes.
- `public/sitemap.xml`: public page URLs.

The discarded design studies and their assets have been removed. Numbered routes `/1/` through `/10/` return the custom 404 page.

## Checks

With `npm run dev` running:

```bash
npm run build
python3 scripts/check-site.py
```

The smoke check covers public pages, local links and fragments, assets, metadata, the custom 404, and removal of the design studies and blog.

## Cloudflare Workers

```bash
npm run preview
npm run deploy
```

Cloudflare's Git integration uploads version previews for the current `design/five-directions` branch. Pushing this branch updates the preview without routing production traffic to it. The branch name is retained so the existing preview address continues to work.
