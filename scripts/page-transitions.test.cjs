const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const source = readFileSync(new URL('../public/page-transitions.js', `file://${__filename}`), 'utf8');

function page() {
  const events = {};
  const animations = [];
  const frames = [];
  const motion = { matches: false, addEventListener: (_, handler) => { events.motion = handler; } };
  runInNewContext(source, {
    requestAnimationFrame: handler => frames.push(handler),
    matchMedia: () => motion,
    addEventListener: (name, handler) => { events[name] = handler; },
    document: { body: { animate: () => {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      animations.push(animation);
      return animation;
    } } },
  });
  return { events, animations, motion, frame: () => frames.splice(0).forEach(handler => handler()) };
}

test('every arrival without a native transition animates, including restores', () => {
  const p = page();
  for (let i = 0; i < 4; i++) {
    p.events.pagereveal({ viewTransition: null });
    assert.equal(p.animations.length, i + 1);
    p.events.pagehide();
    assert.equal(p.animations[i].cancelled, true);
  }
});

test('successful native transitions are not doubled; failed ones replay the entrance', async () => {
  const p = page();
  p.events.pagereveal({ viewTransition: { ready: Promise.resolve() } });
  await Promise.resolve();
  assert.equal(p.animations.length, 0);
  for (let i = 0; i < 3; i++) {
    p.events.pagereveal({ viewTransition: { ready: Promise.reject(new Error('Skipped')) } });
    await Promise.resolve();
    assert.equal(p.animations.length, i + 1);
  }
  assert.equal(p.animations[0].cancelled, true);
});

test('pageshow replays the entrance with and without the back-forward cache', () => {
  const p = page();
  for (const persisted of [false, true, true]) {
    p.events.pageshow({ persisted });
    p.frame();
    p.events.pagehide();
  }
  assert.equal(p.animations.length, 3);
  assert.equal(p.animations[1].cancelled, true);
});

test('reduced motion disables entrances and cancels an active animation', () => {
  const p = page();
  p.motion.matches = true;
  p.events.pagereveal({ viewTransition: null });
  assert.equal(p.animations.length, 0);
  p.motion.matches = false;
  p.events.pagereveal({ viewTransition: null });
  p.motion.matches = true;
  p.events.motion();
  assert.equal(p.animations[0].cancelled, true);
  p.events.pagereveal({ viewTransition: null });
  assert.equal(p.animations.length, 1);
});

test('a late failure from an abandoned navigation cannot replay an entrance', async () => {
  const p = page();
  let reject;
  const ready = new Promise((_, fail) => { reject = fail; });
  p.events.pagereveal({ viewTransition: { ready } });
  p.events.pagehide();
  reject(new Error('Navigation interrupted'));
  await Promise.resolve();
  assert.equal(p.animations.length, 0);
});

test('pageshow and pagereveal do not double-animate an arrival in either order', () => {
  for (const order of [['pageshow', 'pagereveal'], ['pagereveal', 'pageshow']]) {
    const p = page();
    for (const event of order) p.events[event]({ viewTransition: null });
    p.frame();
    assert.equal(p.animations.length, 1);
  }
});
