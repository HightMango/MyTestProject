const API_BASE = "http://localhost:4000/api";

/** Порог (px): считаем, что пользователь «внизу» ленты */
const SCROLL_NEAR_BOTTOM_THRESHOLD = 50;

/** Часто используемые эмодзи для панели ввода */
const EMOJI_LIST = [
  "😀", "😂", "😍", "😎", "👍", "❤️", "🔥", "🎉",
  "😢", "😡", "😱", "🤔", "🍕", "⚽", "🐱", "🚀", "⭐"
];

let currentPinnedId = null;
/** id сообщения, у которого открыто меню модератора */
let openModMenuMessageId = null;

function getToken() {
  return localStorage.getItem("gamelab_token");
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem("gamelab_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function isModerator() {
  const user = getStoredUser();
  const role = user?.role;
  return role === "moderator" || role === "admin";
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMessageTime(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (date >= startOfToday) {
    return `сегодня, ${time}`;
  }
  if (date >= startOfYesterday) {
    return `вчера, ${time}`;
  }

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}.${month}.${year}, ${time}`;
}

function hasMention(content, username) {
  if (!username || !content) {
    return false;
  }
  const pattern = new RegExp(`@${username.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  return pattern.test(content);
}

async function apiFetch(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

// ——— Скролл ленты ———

function getMessagesList() {
  return document.getElementById("chat-messages");
}

/** true, если пользователь прокрутил почти до конца ленты */
function isNearBottom(listEl) {
  if (!listEl) {
    return true;
  }
  const distanceFromBottom =
    listEl.scrollHeight - listEl.scrollTop - listEl.clientHeight;
  return distanceFromBottom < SCROLL_NEAR_BOTTOM_THRESHOLD;
}

/** Сохранить метрики скролла перед полной перерисовкой */
function captureScrollState(listEl) {
  return {
    wasNearBottom: isNearBottom(listEl),
    scrollTop: listEl?.scrollTop ?? 0,
    scrollHeight: listEl?.scrollHeight ?? 0
  };
}

/** Восстановить скролл после перерисовки (или прокрутить вниз) */
function applyScrollAfterRender(listEl, before, forceBottom = false) {
  if (!listEl) {
    return;
  }
  if (forceBottom || before.wasNearBottom) {
    listEl.scrollTop = listEl.scrollHeight;
    return;
  }
  const heightDiff = listEl.scrollHeight - before.scrollHeight;
  listEl.scrollTop = before.scrollTop + heightDiff;
}

function scrollMessagesToBottom() {
  const list = getMessagesList();
  if (list) {
    list.scrollTop = list.scrollHeight;
  }
}

// ——— Меню модератора (по клику на сообщение) ———

function closeModMenus() {
  document.querySelectorAll(".msg-mod-actions.is-open").forEach((el) => {
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
  });
  openModMenuMessageId = null;
}

function toggleModMenu(messageEl) {
  const actions = messageEl.querySelector(".msg-mod-actions");
  if (!actions) {
    return;
  }

  const id = Number.parseInt(messageEl.dataset.id, 10);

  if (openModMenuMessageId === id) {
    closeModMenus();
    return;
  }

  closeModMenus();
  actions.classList.add("is-open");
  actions.setAttribute("aria-hidden", "false");
  openModMenuMessageId = id;
}

/** Клик по автору / времени / тексту — показать или скрыть действия модератора */
function onModeratorMessageBodyClick(e) {
  if (!isModerator()) {
    return;
  }

  if (e.target.closest(".msg-mod-actions")) {
    return;
  }

  const clickable = e.target.closest(
    ".msg-author, .msg-time, .msg-text, .pinned-label"
  );
  if (!clickable) {
    return;
  }

  const messageEl = e.target.closest(".message");
  if (!messageEl) {
    return;
  }

  e.stopPropagation();
  toggleModMenu(messageEl);
}

function buildModeratorActions(message, pinnedId) {
  if (!isModerator()) {
    return "";
  }

  const isPinned = pinnedId === message.id;
  const pinLabel = isPinned ? "Открепить" : "Закрепить";
  const pinClass = isPinned ? "msg-unpin" : "msg-pin";

  return `
    <div class="msg-mod-actions" aria-hidden="true">
      <button type="button" class="msg-delete" data-id="${message.id}" aria-label="Удалить сообщение" title="Удалить">🗑️</button>
      <button type="button" class="${pinClass}" data-id="${message.id}" data-pinned="${isPinned}" aria-label="${pinLabel}" title="${pinLabel}">📌</button>
    </div>
  `;
}

function renderMessageEl(message, pinnedId) {
  const user = getStoredUser();
  const el = document.createElement("div");
  el.className = "message";
  el.dataset.id = String(message.id);

  if (hasMention(message.content, user?.username)) {
    el.classList.add("mention");
  }

  el.innerHTML = `
    <span class="msg-author">${escapeHtml(message.username)}</span>
    <span class="msg-time">${formatMessageTime(message.createdAt)}</span>
    <p class="msg-text">${escapeHtml(message.content)}</p>
    ${buildModeratorActions(message, pinnedId)}
  `;

  return el;
}

function renderPinned(pinned, pinnedId) {
  const container = document.getElementById("chat-pinned");
  if (!container) {
    return;
  }

  if (!pinned) {
    container.hidden = true;
    container.innerHTML = "";
    return;
  }

  container.hidden = false;
  const user = getStoredUser();
  const mentionClass = hasMention(pinned.content, user?.username) ? " mention" : "";
  const modActions = buildModeratorActions(pinned, pinnedId);

  container.innerHTML = `
    <div class="message message-pinned${mentionClass}" data-id="${pinned.id}">
      <span class="pinned-label">📌 Закреплено</span>
      <span class="msg-author">${escapeHtml(pinned.username)}</span>
      <span class="msg-time">${formatMessageTime(pinned.createdAt)}</span>
      <p class="msg-text">${escapeHtml(pinned.content)}</p>
      ${modActions}
    </div>
  `;
}

function renderMessages(messages, pinned, pinnedId, scrollOptions = {}) {
  const list = getMessagesList();
  if (!list) {
    return;
  }

  const scrollBefore = captureScrollState(list);
  const { forceBottom = false } = scrollOptions;

  renderPinned(pinned, pinnedId);

  const pinnedInFeed = pinned ? new Set([pinned.id]) : new Set();
  const fragment = document.createDocumentFragment();

  for (const message of messages) {
    if (pinnedInFeed.has(message.id)) {
      continue;
    }
    fragment.appendChild(renderMessageEl(message, pinnedId));
  }

  list.innerHTML = "";
  list.appendChild(fragment);

  closeModMenus();
  applyScrollAfterRender(list, scrollBefore, forceBottom);
}

function renderOnline(users) {
  const list = document.getElementById("online-list");
  const count = document.getElementById("online-count");
  if (!list || !count) {
    return;
  }

  if (!users.length) {
    list.innerHTML = '<p class="online-empty">No one online</p>';
    count.textContent = "0 users online";
    return;
  }

  list.innerHTML = users
    .map(
      (name) => `
        <div class="online-item">
          <span class="online-dot"></span>
          <span class="online-name">${escapeHtml(name)}</span>
        </div>
      `
    )
    .join("");

  const label = users.length === 1 ? "user" : "users";
  count.textContent = `${users.length} ${label} online`;
}

async function loadMessages() {
  const data = await apiFetch("/forum/messages");
  currentPinnedId = data.pinned?.id ?? null;
  renderMessages(data.messages || [], data.pinned || null, currentPinnedId);
}

async function loadOnline() {
  const data = await apiFetch("/forum/online");
  renderOnline(data.users || []);
}

function appendMessage(message) {
  const list = getMessagesList();
  if (!list) {
    return;
  }
  if (currentPinnedId === message.id) {
    return;
  }
  list.appendChild(renderMessageEl(message, currentPinnedId));
  scrollMessagesToBottom();
}

function setupAuthUi() {
  const token = getToken();
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const hint = document.getElementById("chat-auth-hint");

  if (token) {
    if (hint) {
      hint.hidden = true;
    }
    if (form) {
      form.hidden = false;
    }
    if (input) {
      input.disabled = false;
    }
    return;
  }

  if (hint) {
    hint.hidden = false;
  }
  if (form) {
    form.hidden = true;
  }
}

// ——— Панель эмодзи ———

function insertEmojiAtCursor(input, emoji) {
  if (!input) {
    return;
  }

  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  input.value = before + emoji + after;

  const newPos = start + emoji.length;
  input.setSelectionRange(newPos, newPos);
  input.focus();
}

function setupEmojiPicker() {
  const panel = document.getElementById("emoji-panel");
  const toggle = document.getElementById("emoji-toggle");
  const input = document.getElementById("chat-input");

  if (!panel || !toggle) {
    return;
  }

  panel.innerHTML = EMOJI_LIST.map(
    (emoji) =>
      `<button type="button" class="emoji-btn" data-emoji="${emoji}" role="menuitem" aria-label="${emoji}">${emoji}</button>`
  ).join("");

  function isPanelOpen() {
    return !panel.hidden;
  }

  function openPanel() {
    panel.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closePanel() {
    panel.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  function togglePanel() {
    if (isPanelOpen()) {
      closePanel();
    } else {
      openPanel();
    }
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePanel();
  });

  panel.addEventListener("click", (e) => {
    const btn = e.target.closest(".emoji-btn");
    if (!btn) {
      return;
    }
    e.stopPropagation();
    const emoji = btn.dataset.emoji;
    if (emoji) {
      insertEmojiAtCursor(input, emoji);
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest("#emoji-panel") &&
      !e.target.closest("#emoji-toggle")
    ) {
      closePanel();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const messages = getMessagesList();
  const pinned = document.getElementById("chat-pinned");

  if (!messages) {
    return;
  }

  setupAuthUi();
  setupEmojiPicker();

  loadMessages().catch((err) => console.error(err));
  loadOnline().catch((err) => console.error(err));

  setInterval(() => {
    loadMessages().catch((err) => console.error(err));
  }, 5000);

  setInterval(() => {
    loadOnline().catch((err) => console.error(err));
  }, 10000);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!getToken()) {
      window.location.href = "auth.html";
      return;
    }

    const text = input?.value.trim();
    if (!text) {
      return;
    }

    try {
      const message = await apiFetch("/forum/messages", {
        method: "POST",
        body: JSON.stringify({ content: text })
      });
      appendMessage(message);
      if (input) {
        input.value = "";
      }
    } catch (err) {
      alert(err.message || "Failed to send message");
    }
  });

  async function handleDelete(id) {
    await apiFetch(`/forum/messages/${id}`, { method: "DELETE" });
    document.querySelector(`.message[data-id="${id}"]`)?.remove();
    if (openModMenuMessageId === id) {
      openModMenuMessageId = null;
    }
    if (currentPinnedId === id) {
      currentPinnedId = null;
      if (pinned) {
        pinned.hidden = true;
        pinned.innerHTML = "";
      }
    }
  }

  async function handlePin(messageId) {
    const body =
      messageId == null ? { messageId: null } : { messageId };
    const data = await apiFetch("/forum/pin", {
      method: "POST",
      body: JSON.stringify(body)
    });
    currentPinnedId = data.pinned?.id ?? null;
    await loadMessages();
  }

  function onChatClick(e) {
    const deleteBtn = e.target.closest(".msg-delete");
    if (deleteBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = Number.parseInt(deleteBtn.dataset.id, 10);
      closeModMenus();
      handleDelete(id).catch((err) => alert(err.message));
      return;
    }

    const pinBtn = e.target.closest(".msg-pin, .msg-unpin");
    if (pinBtn) {
      e.preventDefault();
      e.stopPropagation();
      const isPinned = pinBtn.dataset.pinned === "true";
      const id = Number.parseInt(pinBtn.dataset.id, 10);
      closeModMenus();
      handlePin(isPinned ? null : id).catch((err) => alert(err.message));
      return;
    }

    onModeratorMessageBodyClick(e);
  }

  messages.addEventListener("click", onChatClick);
  pinned?.addEventListener("click", onChatClick);

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".message") &&
      !e.target.closest(".chat-pinned")
    ) {
      closeModMenus();
    }
  });
});
