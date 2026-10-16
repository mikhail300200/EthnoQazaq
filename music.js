(() => {
  const audio = document.getElementById('background-music');
  const button = document.getElementById('music-toggle');
  const label = document.getElementById('music-label');
  const dialog = document.getElementById('detail');
  const key = 'ethnoqazaq-miras-music';
  let wanted = true;
  let revision = 0;
  let suspended = false;
  try { wanted = localStorage.getItem(key) !== 'off'; } catch (_) {}
  audio.volume = 0.18;

  function render() {
    button.setAttribute('aria-pressed', String(wanted));
    label.textContent = wanted ? 'Музыканы өшіру' : 'Музыканы қосу';
    button.title = 'Тәттімбет — Сарыжайлау' + (wanted && suspended ? ' · бейне кезінде үзіліс' : '');
  }

  async function sync() {
    const current = ++revision;
    suspended = document.hidden || !!(dialog.open && dialog.querySelector('iframe, video'));
    render();
    if (!wanted || suspended) { audio.pause(); return; }
    try {
      await audio.play();
      if (!wanted || suspended) audio.pause();
    } catch (_) {
      // Autoplay may be blocked until the visitor presses the music button.
      if (current === revision) { wanted = false; render(); }
    }
  }

  button.addEventListener('click', () => {
    wanted = !wanted;
    try { localStorage.setItem(key, wanted ? 'on' : 'off'); } catch (_) {}
    sync();
  });
  audio.addEventListener('error', () => {
    wanted = false;
    audio.pause();
    render();
    label.textContent = 'Музыка жүктелмеді';
    button.disabled = true;
  });
  document.addEventListener('visibilitychange', sync);
  new MutationObserver(sync).observe(dialog, { attributes: true, attributeFilter: ['open'], childList: true, subtree: true });
  sync();
})();
