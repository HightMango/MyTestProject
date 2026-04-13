document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('publish-form');
  const feedback = document.getElementById('publish-feedback');
  const descInput = document.getElementById('game-desc');
  const descCount = document.getElementById('desc-count');

  // Счётчик символов описания
  if (descInput && descCount) {
    descInput.addEventListener('input', () => {
      descCount.textContent = `${descInput.value.length} / 1000`;
    });
  }

  // Отправка формы (визуальная)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('game-title').value.trim();
      const archive = document.getElementById('game-archive').files[0];
      const thumb = document.getElementById('game-thumb').files[0];
      const agreed = document.getElementById('rules-agree').checked;

      if (!title || !archive || !thumb || !agreed) {
        feedback.textContent = t('publish_feedback_please');
        feedback.className = 'form-feedback error';
        return;
      }

      const successMsg = t('publish_feedback_success').replace('{title}', title);
      feedback.textContent = successMsg;
      feedback.className = 'form-feedback success';
    });
  }
});
