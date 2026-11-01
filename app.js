(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme');
  function setTheme(value) {
    root.dataset.theme = value;
    if (toggle) {
      toggle.setAttribute('aria-label', value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      toggle.setAttribute('aria-pressed', String(value === 'light'));
    }
    try { localStorage.setItem('kg-theme', value); } catch {}
  }
  setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  toggle?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const count = document.getElementById('project-count');
  buttons.forEach(button => button.addEventListener('click', () => {
    const selection = button.dataset.filter;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      const show = selection === 'all' || card.dataset.category.split(' ').includes(selection);
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = String(visible).padStart(2, '0');
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
