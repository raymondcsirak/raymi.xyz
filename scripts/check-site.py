"""Smoke-test the static site with wrangler dev running."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlsplit
from urllib.request import urlopen
import json
import re
import xml.etree.ElementTree as ET

BASE = 'http://127.0.0.1:8787'
PUBLIC = Path(__file__).resolve().parents[1] / 'public'


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.tags = []
        self.words = []
        self.word = None
        self.feed(html)
        self.ids = [attrs['id'] for _, attrs in self.tags if 'id' in attrs]

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'home-film-title-word' in attrs.get('class', '').split():
            name = re.search(r'--word-name:\s*([\w-]+)', attrs.get('style', ''))
            assert name, 'Title word must have a stable name'
            self.word = {'name': name[1], 'text': ''}

    def handle_data(self, data):
        if self.word is not None:
            self.word['text'] += data

    def handle_endtag(self, tag):
        if tag == 'span' and self.word is not None:
            self.word['text'] = ' '.join(self.word['text'].split())
            self.words.append(self.word)
            self.word = None


def fetch(path):
    with urlopen(BASE + path, timeout=15) as response:
        assert response.status == 200, path
        return response.read()


pages = {}
for file in PUBLIC.rglob('index.html'):
    route = '/' + file.relative_to(PUBLIC).as_posix().removesuffix('index.html')
    pages[route] = Page(fetch(route).decode())

assert all(f'/{n}/' in pages for n in range(1, 6)), 'missing design variant route'
checked = set()
for route, page in pages.items():
    assert len(page.ids) == len(set(page.ids)), f'{route}: duplicate IDs'
    assert sum(tag == 'h1' for tag, _ in page.tags) == 1, f'{route}: expected one h1'
    assert any(tag == 'link' and attrs.get('rel') == 'canonical' and attrs.get('href') == 'https://raymi.xyz' + route for tag, attrs in page.tags), f'{route}: missing canonical'
    for tag, attrs in page.tags:
        if tag == 'script':
            assert attrs.get('type') == 'application/ld+json', f'{route}: unexpected executable JavaScript'
        if tag == 'img':
            assert 'alt' in attrs, f'{route}: missing alt attribute'
        target = attrs.get('href') if tag in ('a', 'link') else attrs.get('src') if tag in ('img', 'script') else None
        if not target or not target.startswith(('/', '#')):
            continue
        link = urlsplit(target)
        path = link.path or route
        if path not in checked:
            fetch(path)
            checked.add(path)
        if link.fragment:
            linked = pages.get(path) or Page(fetch(path).decode())
            assert link.fragment in linked.ids, f'{route}: missing anchor {target}'
    word_names = [word['name'] for word in page.words]
    assert len(word_names) == len(set(word_names)), f'{route}: duplicate word transition names'
    if route.startswith('/blog/') and route != '/blog/' and page.words:
        listing = {word['name']: word['text'] for word in pages['/blog/'].words}
        for word in page.words:
            assert listing.get(word['name']) == word['text'], f'{route}: title word does not match listing: {word}'
        label = next(attrs.get('aria-label') for tag, attrs in page.tags if tag == 'h1')
        assert label == ' '.join(word['text'] for word in page.words), f'{route}: incorrect accessible title'
    if re.fullmatch(r'/[1-5]/', route):
        switcher = [attrs.get('href') for tag, attrs in page.tags if tag == 'a' and attrs.get('aria-current') == 'page']
        assert route in switcher, f'{route}: variant switcher does not mark the current page'
        assert any(tag == 'meta' and attrs.get('name') == 'robots' and 'noindex' in attrs.get('content', '') for tag, attrs in page.tags), f'{route}: design variant must be noindex'
    print(f'PASS {route}: content, metadata, links, fragments, assets, title words')

for path in ('/robots.txt', '/sitemap.xml', '/favicon.ico', '/styles.css', '/profile-pixel-transparent.png', '/Raymond_Csirak.pdf'):
    fetch(path)
sitemap = ET.fromstring(fetch('/sitemap.xml'))
locations = {node.text for node in sitemap.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')}
for route, page in pages.items():
    noindex = any(tag == 'meta' and attrs.get('name') == 'robots' and 'noindex' in attrs.get('content', '') for tag, attrs in page.tags)
    if noindex:
        assert 'https://raymi.xyz' + route not in locations, f'{route}: test content in sitemap'
    else:
        assert 'https://raymi.xyz' + route in locations, f'{route}: missing from sitemap'
home = fetch('/').decode()
structured = home.split('<script type="application/ld+json">')[1].split('</script>')[0]
json.loads(structured)
for path in [f'/{n}/' for n in range(6, 11)] + ['/missing-page', '/variants/character.png', '/templates/blog-post.html', '/page-transitions.js', '/blog/test-post/']:
    try:
        fetch(path)
    except HTTPError as error:
        assert error.code == 404, (path, error.code)
        assert 'That route' in error.read().decode(), f'{path}: missing custom 404'
    else:
        raise AssertionError(f'{path}: expected 404')
print('PASS static metadata, sitemap, portrait, résumé, structured data, and removed routes')
