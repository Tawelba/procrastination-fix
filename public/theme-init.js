(() => {
  let savedTheme = 'system';

  try {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      savedTheme = storedTheme;
    }
  } catch {
    // The site remains usable when browser storage is unavailable.
  }

  const initialTheme = savedTheme === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : savedTheme;

  document.documentElement.dataset.theme = initialTheme;
})();
