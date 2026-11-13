/* Інтерактивність макета: перемикач меню, пошук та фільтри. */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const form = document.getElementById('search-form');
  const input = document.getElementById('site-search');
  const cards = [...document.querySelectorAll('.video-card')];
  const chips = [...document.querySelectorAll('.filter-chip')];
  const empty = document.getElementById('empty-state');
  let activeCategory = 'all';

  function applyFilters() {
    const query = input.value.trim().toLocaleLowerCase('uk');
    let visible = 0;
    for (const card of cards) {
      const matchesCategory = activeCategory === 'all' || card.dataset.category === activeCategory;
      const matchesQuery = card.dataset.title.toLocaleLowerCase('uk').includes(query) ||
        card.textContent.toLocaleLowerCase('uk').includes(query);
      const show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    }
    empty.hidden = visible !== 0;
  }

  toggle.addEventListener('click', () => {
    const collapsed = document.body.classList.toggle('menu-collapsed');
    toggle.setAttribute('aria-expanded', String(!collapsed));
  });
  form.addEventListener('submit', (event) => { event.preventDefault(); applyFilters(); });
  input.addEventListener('input', applyFilters);
  for (const chip of chips) {
    chip.addEventListener('click', () => {
      chips.forEach(item => item.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeCategory = chip.dataset.filter;
      applyFilters();
    });
  }
});
