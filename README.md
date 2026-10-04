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

Supporting browsers animate the shared pixel portrait, name, and navigation between the homepage and blog. The page content fades with a short vertical shift. CSS cross-document View Transitions provide the shared-element movement. A small `page-transitions.js` handler replays an entrance fade on each arrival when the browser skips or cannot perform the native transition, including restored history entries. It cancels interrupted entrances on page exit. Reduced-motion preferences disable both effects. Links and history use normal browser navigation. The article template inherits the same transition through the shared stylesheet.

The test article is marked `noindex` and excluded from the sitemap. Its title shares a transition name with its index entry. Remove this test entry and page before publishing real articles. For future shared-title transitions, use a unique name for each article, with the same name on its listing title and article heading.

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
node --test scripts/page-transitions.test.cjs
```

The smoke check covers public pages, local links and fragments, assets, metadata, the custom 404, and removal of the design studies. The article template stays outside the deployment.

## Cloudflare Workers

```bash
npm run preview
npm run deploy
```

Cloudflare's Git integration uploads version previews for the current `design/five-directions` branch. Pushing this branch updates the preview without routing production traffic to it. The branch name is retained so the existing preview address continues to work.
