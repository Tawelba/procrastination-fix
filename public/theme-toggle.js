(() => {
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (!themeToggle) return;

  const applyTheme = (theme, save = true) => {
    const safeTheme = theme === 'dark' ? 'dark' : 'light';
    const icon = themeToggle.querySelector('.theme-toggle-icon');
    const label = themeToggle.querySelector('.theme-toggle-label');
    const nextTheme = safeTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = safeTheme;

    if (save) {
      try {
        localStorage.setItem('theme', safeTheme);
      } catch {
        // The toggle still works for this page when storage is unavailable.
      }
    }

    if (icon) icon.textContent = safeTheme === 'dark' ? '☾' : '☀';
    if (label) label.textContent = safeTheme === 'dark' ? 'Dark' : 'Light';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} color mode`);
    themeToggle.setAttribute('title', `Switch to ${nextTheme} color mode`);
  };

  themeToggle.addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });

  applyTheme(document.documentElement.dataset.theme || 'light', false);
})();
