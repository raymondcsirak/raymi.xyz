# raymi.xyz

Raymond Csirák's portfolio and blog. Static HTML and custom CSS, deployed with Cloudflare Workers Static Assets. The original design and pixel portrait remain the basis of the site.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:8787](http://localhost:8787). The blog is at `/blog/`. A clearly labeled test article is at `/blog/test-post/`.

## Files

- `public/index.html`: homepage, career history, and blog introduction.
- `public/blog/index.html`: blog index with a test entry, separate from published articles.
- `public/styles.css`: shared portfolio, blog, and article styles.
- `templates/blog-post.html`: unpublished article template. Nothing in `templates/` is deployed.
- `public/sitemap.xml`: public page URLs.

The discarded design studies and their assets have been removed. Numbered routes `/1/` through `/10/` return the custom 404 page.

## Page transitions

The site uses native CSS cross-document View Transitions. There is no executable client-side JavaScript, router, or animation dependency. The transparent portrait, name, and navigation are shared between pages. Reduced-motion preferences disable transitions; unsupported browsers navigate normally.

Article titles use the word-level technique observed on [Naman Goel's site](https://nmn.sh/blog/2026-02-01-fixing-web-components): each word has a unique transition name shared between the listing and the article. The article renders each word as SVG text in a wrapping flex layout. Flex growth is proportional to word width, so words fill their rows and scale individually as the viewport changes. The browser matches and animates each word's position and size, including when line breaks change. The heading itself has no transition name.

The test article at `/blog/test-post/` is marked `noindex` and excluded from the sitemap. Remove it before publishing real articles.

### Prepare a word title

Use a unique article prefix and word index, including for repeated words. Put a literal space or newline between listing spans so the title remains readable as text:

```html
<h3 class="home-film-word-title">
  <span class="home-film-title-word" style="--word-name: your-slug-word-1">A</span>
  <span class="home-film-title-word" style="--word-name: your-slug-word-2">test</span>
</h3>
```

The article uses matching names and proportional SVG widths. These widths are the words' natural advance widths in Georgia at 100px, measured once during authoring. Keep the full title as the heading's accessible label; the SVG copies are decorative to assistive technology. `textLength` preserves the layout if the reader's serif fallback font has different metrics.

```html
<h1 class="home-film-word-title home-film-fluid-title" aria-label="A test">
  <span class="home-film-title-word" style="--word-name: your-slug-word-1; --word-width: 67.094">
    <svg viewBox="0 0 67.094 110" aria-hidden="true" focusable="false"><text x="0" y="85" textLength="67.094" lengthAdjust="spacingAndGlyphs">A</text></svg>
  </span>
  <span class="home-film-title-word" style="--word-name: your-slug-word-2; --word-width: 160.602">
    <svg viewBox="0 0 160.602 110" aria-hidden="true" focusable="false"><text x="0" y="85" textLength="160.602" lengthAdjust="spacingAndGlyphs">test</text></svg>
  </span>
</h1>
```

Use matching words and punctuation in both locations. Never reuse a transition name within one document. No word measurement or text splitting runs in the visitor's browser.

## Publish a post

1. Copy `templates/blog-post.html` to `public/blog/your-slug/index.html`.
2. Replace every bracketed placeholder. Remove the draft notice, `DRAFT TEMPLATE` label, and authoring comments. Update the table of contents to match your section IDs. Remove any example elements you don't need.
3. Set the page title, description, Open Graph title and description. Add a canonical link and `og:url` using `https://raymi.xyz/blog/your-slug/`. Set robots to `index, follow`.
4. Replace `Unpublished` with a `<time datetime="YYYY-MM-DD">Day Month Year</time>` element. Add `<meta property="article:published_time" content="YYYY-MM-DD" />` in the head. Use the actual publication date.
5. Add an entry to `public/blog/index.html` inside `.home-film-blog-entries`, after the index line. Remove the test entry and `public/blog/test-post/` when publishing the first real post. Update the published count. Entries go newest first.
6. Replace the homepage's "First entries to follow" sentence with a link to the new article. Add the article URL to `public/sitemap.xml`.
7. Run the checks below. Review the article on mobile and desktop, including code blocks, links, and table overflow. Commit and push to the intended branch.

Blog entry markup, already styled in `public/styles.css`:

```html
<a class="home-film-blog-entry" href="/blog/your-slug/">
  <time datetime="YYYY-MM-DD">Day Month Year</time>
  <div>
    <h3>Article title</h3>
    <p>A short description of the problem and what the reader will learn.</p>
  </div>
  <span aria-hidden="true">↗</span>
</a>
```

Store article images beside the article, reference them with root-relative URLs, and include descriptive alt text and dimensions. Escape `&` and `<` in code blocks. Keep credentials, customer data, and private infrastructure details out of posts.

No CMS or build dependency is required. Article content and navigation work with JavaScript disabled. Add an RSS feed when the first article is published, using its real URL and publication date.

## Checks

With `npm run dev` running:

```bash
npm run build
python3 scripts/check-site.py
```

The smoke check covers public pages, local links and fragments, assets, metadata, the custom 404, and removal of the design studies. The article template stays outside the deployment.

## Cloudflare Workers

```bash
npm run preview
npm run deploy
```

Cloudflare's Git integration uploads version previews for the current `design/five-directions` branch. Pushing this branch updates the preview without routing production traffic to it. The branch name is retained so the existing preview address continues to work.
