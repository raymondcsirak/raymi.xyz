(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let entrance;
  let revealId = 0;
  let revealed = false;

  const reset = () => {
    entrance?.cancel();
    entrance = undefined;
  };

  const enter = () => {
    reset();
    if (reducedMotion.matches || !document.body) return;
    entrance = document.body.animate(
      [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' },
    );
  };

  addEventListener('pagereveal', event => {
    revealed = true;
    const currentReveal = ++revealId;
    reset();
    if (event.viewTransition) {
      event.viewTransition.ready.catch(() => {
        if (currentReveal === revealId) enter();
      });
    } else {
      enter();
    }
  });

  // pageshow also covers browsers or history restores without pagereveal.
  addEventListener('pageshow', () => {
    const currentReveal = revealId;
    requestAnimationFrame(() => {
      if (!revealed && currentReveal === revealId) enter();
    });
  });

  // A restored page must not retain an interrupted entrance animation.
  addEventListener('pagehide', () => {
    revealId++;
    revealed = false;
    reset();
  });
  reducedMotion.addEventListener('change', reset);
})();
