# raymi.xyz

Raymond Csirák's static HTML and CSS portfolio, deployed with Cloudflare Workers Static Assets.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:8787](http://localhost:8787).

## Design studies

The `design/five-directions` branch contains ten independent HTML/CSS designs. The current shortlist keeps `/1/` and `/2/` alongside five new directions at `/6/`–`/10/`. The original homepage remains at `/`.

| Route | Direction | Interaction |
| --- | --- | --- |
| `/1/` | The quiet operator: ivory, vermilion, editorial typography | CSS optical sculpture and expandable notebook outlines |
| `/2/` | Systems atlas: dark technical blueprint | Exploded infrastructure stack and layer disclosures |
| `/3/` | The workbench: sage desktop, paper, personal notes | Native radio controls switch work, biography, and notebook views |
| `/4/` | Built to hold: acid-yellow typographic poster | Problem selector changes the service explanation and contact link |
| `/5/` | Field journal: burgundy, serif typography, print layout | Expandable paper folios for future writing |
| `/6/` | Orbit: midnight blue, peach, orbital geometry | Satellite links and rotating CSS rings |
| `/7/` | Small world: a miniature isometric infrastructure landscape | Native day/night switch and service signposts |
| `/8/` | Signal: soft olive, technical clarity, oscilloscope | Noise-filter switch and expandable service details |
| `/9/` | Working canvas: white and cobalt architecture drawing | Keyboard-operated selector highlights three infrastructure paths |
| `/10/` | Hello, operator: lavender, oversized type, character portrait | Separate client, recruiter, and curiosity disclosures |

The new directions keep the existing pixel character, with a transparent cutout for flexible placement. Rejected studies `/3/`–`/5/` remain accessible for reference but are omitted from the updated comparison bar.

Each page includes a variant switcher, contact links, and the existing résumé. Career details come from the résumé and original site. Notebook topics are explicitly marked as proposals; no articles or outcome metrics are invented. All controls work without JavaScript. Designs include keyboard focus states, mobile layouts, reduced-motion rules, and `noindex` metadata.

With `npm run dev` running, verify routes, internal links, assets, metadata, controls, and the custom 404:

```bash
python3 scripts/check-variants.py
```

To publish a version preview without changing production traffic:

```bash
npx wrangler versions upload --preview-alias five-directions
```

Append `/1/` through `/10/` to the returned version URL. The smoke check also accepts that base URL as its argument.

## Checks

```bash
npm run build
```

## Cloudflare Workers

```bash
npm run preview
npm run deploy
```
