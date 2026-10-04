"""Run against wrangler dev: python3 scripts/check-variants.py [base URL]."""
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.parse import urljoin
from urllib.request import urlopen
import sys

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8787').rstrip('/')

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.ids, self.links, self.assets, self.tags = [], [], [], []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'a':
            self.links.append(attrs.get('href', ''))
        if tag == 'img' or (tag == 'link' and attrs.get('rel') == 'stylesheet'):
            self.assets.append(attrs.get('src') or attrs.get('href'))

checked = set()
def fetch(path):
    with urlopen(urljoin(base + '/', path), timeout=15) as response:
        assert response.status == 200, path
        return response.read().decode('utf-8')

for number in range(1, 11):
    route = f'/{number}'
    page = Page(fetch(route))
    assert len(page.ids) == len(set(page.ids)), f'{route}: duplicate IDs'
    assert sum(tag == 'h1' for tag, _ in page.tags) == 1, f'{route}: expected one h1'
    assert not any(tag == 'script' for tag, _ in page.tags), f'{route}: unexpected JavaScript'
    assert any(tag == 'meta' and attrs.get('name') == 'robots' and 'noindex' in attrs.get('content', '') for tag, attrs in page.tags), f'{route}: preview must not be indexed'
    assert 'mailto:hello@raymi.xyz' in page.links, f'{route}: missing contact'
    assert '/Raymond_Csirak.pdf' in page.links, f'{route}: missing résumé'
    if number >= 6:
        assert '/variants/character.png' in page.assets, f'{route}: missing pixel character'
    for tag, attrs in page.tags:
        if tag == 'label':
            assert attrs.get('for') in page.ids, f'{route}: broken control label'
        if tag == 'img':
            assert attrs.get('alt'), f'{route}: missing portrait description'
    for target in page.links + page.assets:
        assert target, f'{route}: empty link'
        if target.startswith('#'):
            assert target[1:] in page.ids, f'{route}: missing anchor {target}'
        elif target.startswith('/') and target not in checked:
            with urlopen(base + target, timeout=15) as response:
                assert response.status == 200, target
            checked.add(target)
    print(f'PASS {route}: content, navigation, controls, assets')

for path in ('/', '/robots.txt', '/sitemap.xml', '/favicon.ico', '/styles.css'):
    with urlopen(base + path, timeout=15) as response:
        assert response.status == 200, path
try:
    urlopen(base + '/variant-smoke-test-missing-page', timeout=15)
except HTTPError as error:
    assert error.code == 404, f'Expected 404, got {error.code}'
    assert b'<!doctype html>' in error.read().lower(), 'Expected custom HTML 404'
else:
    raise AssertionError('Missing route did not return 404')
print('PASS original homepage, metadata, favicon, CSS, and custom 404')
