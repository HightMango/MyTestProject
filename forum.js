document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  if (form && input && messages) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = input.value.trim();
      if (!text) return;

      const now = new Date();
      const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

      const msgEl = document.createElement('div');
      msgEl.className = 'message';
      msgEl.innerHTML = `
        <span class="msg-author">You</span>
        <span class="msg-time">${time}</span>
        <p class="msg-text">${text}</p>
      `;

      messages.appendChild(msgEl);
      messages.scrollTop = messages.scrollHeight;
      input.value = '';
    });
  }
});
