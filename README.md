# raymi.xyz

Raymond Csirák's static HTML and CSS portfolio, deployed with Cloudflare Workers Static Assets.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:8787](http://localhost:8787).

## Design studies

The `design/five-directions` branch adds five independent HTML/CSS designs. The original homepage remains at `/`.

| Route | Direction | Interaction |
| --- | --- | --- |
| `/1/` | The quiet operator: ivory, vermilion, editorial typography | CSS optical sculpture and expandable notebook outlines |
| `/2/` | Systems atlas: dark technical blueprint | Exploded infrastructure stack and layer disclosures |
| `/3/` | The workbench: sage desktop, paper, personal notes | Native radio controls switch work, biography, and notebook views |
| `/4/` | Built to hold: acid-yellow typographic poster | Problem selector changes the service explanation and contact link |
| `/5/` | Field journal: burgundy, serif typography, print layout | Expandable paper folios for future writing |

Each page includes a variant switcher, contact links, and the existing résumé. Career details come from the résumé and original site. Notebook topics are explicitly marked as proposals; no articles or outcome metrics are invented. All controls work without JavaScript. Designs include keyboard focus states, mobile layouts, reduced-motion rules, and `noindex` metadata.

With `npm run dev` running, verify routes, internal links, assets, metadata, controls, and the custom 404:

```bash
python3 scripts/check-variants.py
```

To publish a version preview without changing production traffic:

```bash
npx wrangler versions upload --preview-alias five-directions
```

Append `/1/` through `/5/` to the returned version URL. The smoke check also accepts that base URL as its argument.

## Checks

```bash
npm run build
```

## Cloudflare Workers

```bash
npm run preview
npm run deploy
```
