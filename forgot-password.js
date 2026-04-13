document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgot-form');
  const feedback = document.getElementById('forgot-feedback');

  // Применяем переводы
  if (typeof applyTranslations === 'function') {
    applyTranslations();
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('forgot-email').value.trim();

      if (!email) {
        feedback.textContent = 'Please enter your email address.';
        feedback.className = 'form-feedback error';
        return;
      }

      // Визуальная имитация отправки (без бэкенда)
      feedback.textContent = `If an account exists with the email ${email}, you will receive a password reset link shortly.`;
      feedback.className = 'form-feedback success';
      form.reset();
    });
  }
});
