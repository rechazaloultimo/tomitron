// script.js — simple filter for work sections
document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('#filter-buttons .filter-btn');
  const sections = document.querySelectorAll('.work-section.image-grid-section');

  if (!buttons.length || !sections.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // set active class
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      sections.forEach(sec => {
        const cat = sec.dataset.category;
        if (filter === 'all') {
          sec.classList.remove('hidden-by-filter');
        } else if (cat === filter) {
          sec.classList.remove('hidden-by-filter');
        } else {
          sec.classList.add('hidden-by-filter');
        }
      });
    });
  });
});
