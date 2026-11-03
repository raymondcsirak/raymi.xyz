// From the hero to Level 5, one flick, swipe or key press moves one stop, eased. Below Level 5 the page scrolls normally.
(() => {
  if (!matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

  const DURATION = 750;
  const GESTURE_GAP = 100;
  const FLICK = 4;
  const SWIPE = 12;
  const bar = document.querySelector(".bar");
  const sections = document.querySelectorAll(".hero, .level");
  const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (2 - 2 * t) ** 3 / 2);
  let moving = false;

  // Each section's top, then a screen at a time through any section taller than the screen.
  // Level 5 has one stop, with its whole box in view.
  const stops = () => {
    const head = bar.offsetHeight;
    const room = innerHeight - head;
    const all = [];
    for (const section of sections) {
      const box = section.getBoundingClientRect();
      const top = Math.round(box.top + scrollY - head);
      const bottom = top + Math.round(box.height) - room;
      const boxTop = Math.round(section.querySelector(".box")?.getBoundingClientRect().top + scrollY - head);
      const start = section.matches(".final") ? Math.min(boxTop, bottom) : top;
      for (let y = start; y < bottom; y += room) all.push(y);
      all.push(Math.max(start, bottom));
    }
    return all.sort((a, b) => a - b).filter((y, i, list) => i === 0 || y - list[i - 1] > 40);
  };

  // Past the last stop, or leaving it downwards, the browser scrolls as usual.
  const isNative = (direction) => {
    const end = stops().at(-1);
    return scrollY > end + 2 || (direction > 0 && scrollY >= end - 2);
  };

  const glide = (to) => {
    const from = scrollY;
    const start = performance.now();
    moving = true;
    const frame = (now) => {
      const t = Math.min((now - start) / DURATION, 1);
      scrollTo(0, from + (to - from) * ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else moving = false;
    };
    requestAnimationFrame(frame);
  };

  const step = (direction) => {
    const list = stops();
    const to = direction > 0 ? list.find((y) => y > scrollY + 2) : list.findLast((y) => y < scrollY - 2);
    if (to !== undefined) glide(to);
  };

  let lastWheel = 0;
  let lastDelta = 0;
  let armed = false;
  let held = false;
  let total = 0;

  addEventListener("wheel", (event) => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const size = Math.abs(event.deltaY);
    // A trackpad keeps sending shrinking events after a swipe. A pause, a sudden push or a reversal starts a new one.
    const fresh = event.timeStamp - lastWheel > GESTURE_GAP || (!moving && size > 20 && size > Math.abs(lastDelta) * 2) || event.deltaY * lastDelta < 0;
    lastWheel = event.timeStamp;
    lastDelta = event.deltaY;
    if (fresh) {
      armed = true;
      held = false;
      total = 0;
    }
    if (!held && isNative(event.deltaY)) {
      armed = false;
      return;
    }
    event.preventDefault();
    held = true;
    total += event.deltaY;
    if (armed && !moving && Math.abs(total) >= FLICK) {
      armed = false;
      step(total);
    }
  }, { passive: false });

  let touchY = null;
  let touchDecided = false;
  let touchNative = false;
  let touchFired = false;

  addEventListener("touchstart", (event) => {
    touchY = event.touches.length === 1 ? event.touches[0].clientY : null;
    touchDecided = false;
    touchFired = false;
  }, { passive: true });

  addEventListener("touchmove", (event) => {
    if (touchY === null || event.touches.length > 1) return;
    const distance = touchY - event.touches[0].clientY;
    if (!touchDecided) {
      touchDecided = true;
      touchNative = isNative(distance) || (distance < 0 && scrollY <= 2);
    }
    if (touchNative) return;
    if (event.cancelable) event.preventDefault();
    if (!touchFired && !moving && Math.abs(distance) >= SWIPE) {
      touchFired = true;
      step(distance);
    }
  }, { passive: false });

  addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const direction = { ArrowDown: 1, PageDown: 1, ArrowUp: -1, PageUp: -1, " ": event.shiftKey ? -1 : 1 }[event.key];
    if (direction === undefined || isNative(direction)) return;
    event.preventDefault();
    if (!moving) step(direction);
  });

  // The scrollbar, or scrolling back up from below, can stop between levels, so settle on the nearest stop.
  addEventListener("scrollend", () => {
    if (moving) return;
    const list = stops();
    if (scrollY > list.at(-1) + 2) return;
    const nearest = list.reduce((best, y) => (Math.abs(y - scrollY) < Math.abs(best - scrollY) ? y : best));
    if (Math.abs(nearest - scrollY) > 2) glide(nearest);
  });
})();
