document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.study-tab');
  const cards = document.querySelectorAll('.study-card');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.dataset.category;

      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      cards.forEach((card) => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});
