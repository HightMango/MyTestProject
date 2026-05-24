const API_BASE = "http://localhost:4000/api";
const API_ORIGIN = "http://localhost:4000";

const params = new URLSearchParams(window.location.search);
const gameSlug = params.get("game") || "";

let loadedGame = null;
let currentUser = null;
let userRating = null;
let commentFormRating = null;
let ratingSubmitting = false;

const RATING_LABELS = ["Poor", "Fair", "Good", "Very Good", "Excellent!"];

async function getCurrentUser() {
  const token = localStorage.getItem("gamelab_token");
  if (!token) return null;
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

function getAuthToken() {
  return localStorage.getItem("gamelab_token");
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const gameCardEl = document.getElementById("game-card");
const gameTitleEl = document.getElementById("game-title");
const gameGenreEl = document.getElementById("game-genre");
const gameImageEl = document.getElementById("game-image");
const gameIntroEl = document.getElementById("game-intro");
const gameFullDescEl = document.getElementById("game-full-description");
const gameDeveloperEl = document.getElementById("game-developer");
const gameRatingEl = document.getElementById("game-rating");
const gameReleaseEl = document.getElementById("game-release");
const gameArchiveSizeEl = document.getElementById("game-archive-size");
const gameInstalledSizeEl = document.getElementById("game-installed-size");
const gamePlatformEl = document.getElementById("game-platform");
const gameMultiplayerEl = document.getElementById("game-multiplayer");
const gameFeaturesEl = document.getElementById("game-features");
const reqMinimumEl = document.getElementById("req-minimum");
const reqRecommendedEl = document.getElementById("req-recommended");
const screenshotsGridEl = document.getElementById("screenshots-grid");
const gameDownloadEl = document.getElementById("game-download");
const ratingValueEl = document.getElementById("rating-value");
const ratingVotesEl = document.getElementById("rating-votes");
const starsStaticEl = document.getElementById("stars-static");
const ratingBarsEl = document.getElementById("rating-bars");
const starsSelectEl = document.getElementById("stars-select");
const ratingLabelEl = document.getElementById("rating-label");
const ratingHintEl = document.getElementById("rating-hint");
const commentFormEl = document.getElementById("comment-form");
const commentInputEl = document.getElementById("comment-input");
const commentSubmitBtnEl = document.getElementById("comment-submit-btn");
const commentsListEl = document.getElementById("comments-list");
const commentsEmptyEl = document.getElementById("comments-empty");
const commentsHintEl = document.getElementById("comments-hint");
const commentStarsSelectEl = document.getElementById("comment-stars-select");
const commentRatingClearEl = document.getElementById("comment-rating-clear");
const gameNoticeEl = document.getElementById("game-notice");

const optionalSectionSelectors = [
  "#game-requirements",
  ".game-screenshots",
  ".game-rating-section",
  ".game-comments-section"
];

const REQ_LABELS = {
  os: "OS",
  cpu: "CPU",
  ram: "RAM",
  gpu: "GPU",
  storage: "Storage",
  additional: "Additional"
};

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mediaUrl(path) {
  if (!path) {
    return "";
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${API_ORIGIN}${path}`;
}

function metaValue(value) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || "—";
}

function shortDescription(text, maxLen = 200) {
  const value = typeof text === "string" ? text.trim() : "";
  if (!value) {
    return "";
  }
  if (value.length <= maxLen) {
    return value;
  }
  return `${value.slice(0, maxLen).trimEnd()}…`;
}

function formatRatingDisplay(avg, count) {
  const rating = Number(avg);
  if (!Number.isFinite(rating) || rating <= 0) {
    return "New";
  }
  return `${rating.toFixed(1)} / 5`;
}

function formatVotes(count) {
  const votes = Number(count);
  if (!Number.isFinite(votes) || votes <= 0) {
    return "0 votes";
  }
  return votes === 1 ? "1 vote" : `${votes} votes`;
}

function formatReleaseDate(value) {
  if (!value) {
    return "—";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function formatCommentDate(value) {
  if (!value) {
    return "";
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }
  return parsed.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function starsHtml(rating) {
  const value = Number(rating);
  if (!Number.isFinite(value) || value < 1) {
    return "";
  }
  const filled = Math.round(value);
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}

function staticStarsFromAvg(avg) {
  const value = Number(avg);
  if (!Number.isFinite(value) || value <= 0) {
    return "☆☆☆☆☆";
  }
  const full = Math.min(5, Math.round(value));
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function showNotice(message, isError = false) {
  if (!gameNoticeEl) {
    if (isError) {
      alert(message);
    }
    return;
  }
  gameNoticeEl.textContent = message;
  gameNoticeEl.hidden = false;
  gameNoticeEl.classList.toggle("is-error", isError);
  window.clearTimeout(showNotice._timer);
  showNotice._timer = window.setTimeout(() => {
    gameNoticeEl.hidden = true;
  }, 4000);
}

function hasRequirements(req) {
  if (!req || typeof req !== "object") {
    return false;
  }
  return Object.values(req).some((value) => typeof value === "string" && value.trim());
}

function setOptionalSectionsVisible(visible) {
  for (const selector of optionalSectionSelectors) {
    const section = document.querySelector(selector);
    if (section) {
      section.hidden = !visible;
    }
  }
}

function showNotFound(message) {
  setOptionalSectionsVisible(false);

  if (gameCardEl) {
    gameCardEl.innerHTML = `
      <p class="game-not-found">${escapeHtml(message)}</p>
      <p class="game-not-found-hint">
        <a href="games.html">Return to the games catalog</a>
      </p>
    `;
  }

  document.title = "GameLab - Game not found";
}

function renderRequirements(container, req) {
  if (!container) {
    return;
  }
  container.innerHTML = "";
  if (!hasRequirements(req)) {
    container.innerHTML = '<p class="req-empty">Not specified</p>';
    return;
  }

  for (const [key, value] of Object.entries(req)) {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text) {
      continue;
    }
    const div = document.createElement("div");
    div.className = "req-item";
    div.innerHTML = `<strong>${escapeHtml(REQ_LABELS[key] || key)}:</strong> <span>${escapeHtml(text)}</span>`;
    container.appendChild(div);
  }
}

function renderScreenshots(screenshots, title) {
  if (!screenshotsGridEl) {
    return;
  }

  const list = Array.isArray(screenshots) ? screenshots.filter(Boolean) : [];
  screenshotsGridEl.innerHTML = "";

  if (list.length === 0) {
    const section = screenshotsGridEl.closest(".game-screenshots");
    if (section) {
      section.hidden = true;
    }
    return;
  }

  const section = screenshotsGridEl.closest(".game-screenshots");
  if (section) {
    section.hidden = false;
  }

  list.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = mediaUrl(src);
    img.alt = `${title} screenshot ${index + 1}`;
    img.loading = "lazy";
    screenshotsGridEl.appendChild(img);
  });
}

function setupDownloadButton(downloadUrl) {
  if (!gameDownloadEl) {
    return;
  }

  const href = mediaUrl(downloadUrl);
  if (!href) {
    gameDownloadEl.hidden = true;
    return;
  }

  gameDownloadEl.href = href;
  gameDownloadEl.hidden = false;
}

function updateRatingSummary(avg, count, distribution) {
  const ratingAvg = Number(avg);
  const ratingCount = Number(count);

  if (gameRatingEl) {
    gameRatingEl.textContent = formatRatingDisplay(ratingAvg, ratingCount);
  }
  if (ratingValueEl) {
    ratingValueEl.textContent =
      Number.isFinite(ratingAvg) && ratingAvg > 0 ? ratingAvg.toFixed(1) : "0.0";
  }
  if (ratingVotesEl) {
    ratingVotesEl.textContent = formatVotes(ratingCount);
  }
  if (starsStaticEl) {
    starsStaticEl.textContent = staticStarsFromAvg(ratingAvg);
  }

  if (ratingBarsEl && distribution) {
    const total = Object.values(distribution).reduce((sum, n) => sum + Number(n), 0);
    for (let star = 5; star >= 1; star -= 1) {
      const row = ratingBarsEl.querySelector(`.bar-row[data-star="${star}"]`);
      if (!row) {
        continue;
      }
      const countForStar = Number(distribution[star]) || 0;
      const pct = total > 0 ? Math.round((countForStar / total) * 100) : 0;
      const fill = row.querySelector(".fill");
      const pctEl = row.querySelector(".bar-pct");
      if (fill) {
        fill.style.width = `${pct}%`;
      }
      if (pctEl) {
        pctEl.textContent = `${pct}%`;
      }
    }
  }

  if (loadedGame) {
    loadedGame.rating_avg = ratingAvg;
    loadedGame.rating_count = ratingCount;
    if (distribution) {
      loadedGame.rating_distribution = distribution;
    }
  }
}

function setStarsActive(container, value) {
  if (!container) {
    return;
  }
  const stars = container.querySelectorAll(".star");
  stars.forEach((star) => {
    const starValue = Number.parseInt(star.getAttribute("data-value"), 10);
    const active = value != null && starValue <= value;
    star.classList.toggle("active", active);
    star.style.color = active ? "#fbbf24" : "#3a4b85";
  });
}

function setupStarGroup(container, { onSelect, getValue }) {
  if (!container) {
    return;
  }

  const stars = container.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = Number.parseInt(star.getAttribute("data-value"), 10);
      if (onSelect) {
        onSelect(value);
      }
    });

    star.addEventListener("mouseenter", () => {
      const value = Number.parseInt(star.getAttribute("data-value"), 10);
      stars.forEach((s) => {
        const starValue = Number.parseInt(s.getAttribute("data-value"), 10);
        s.style.color = starValue <= value ? "#fbbf24" : "#3a4b85";
      });
    });

    star.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        star.click();
      }
    });
  });

  container.addEventListener("mouseleave", () => {
    const current = getValue ? getValue() : null;
    setStarsActive(container, current);
  });
}

function updateRatingLabel(value) {
  if (!ratingLabelEl) {
    return;
  }
  if (!value) {
    ratingLabelEl.textContent = "Select your rating";
    return;
  }
  ratingLabelEl.textContent = RATING_LABELS[value - 1] || "Thanks for rating!";
}

async function loadUserRating() {
  if (!getAuthToken() || !gameSlug) {
    userRating = null;
    setStarsActive(starsSelectEl, null);
    updateRatingLabel(null);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}/my-rating`, {
      headers: authHeaders()
    });
    if (!res.ok) {
      userRating = null;
      return;
    }
    const data = await res.json();
    userRating = data.rating ?? null;
    setStarsActive(starsSelectEl, userRating);
    updateRatingLabel(userRating);
  } catch {
    userRating = null;
  }
}

async function submitRating(value) {
  if (!getAuthToken()) {
    const goAuth = confirm("Sign in to rate this game. Open the login page?");
    if (goAuth) {
      window.location.href = "auth.html";
    }
    return;
  }
  if (!gameSlug || ratingSubmitting) {
    return;
  }

  ratingSubmitting = true;
  try {
    const res = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}/rate`, {
      method: "POST",
      headers: {
        ...authHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ rating: value })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Failed to submit rating");
    }

    userRating = value;
    setStarsActive(starsSelectEl, userRating);
    updateRatingLabel(userRating);
    updateRatingSummary(data.rating_avg, data.rating_count, data.distribution);
    showNotice("Your rating has been saved.");
  } catch (err) {
    showNotice(err.message, true);
  } finally {
    ratingSubmitting = false;
  }
}

function initStarRating() {
  setupStarGroup(starsSelectEl, {
    getValue: () => userRating,
    onSelect: (value) => submitRating(value)
  });

  setupStarGroup(commentStarsSelectEl, {
    getValue: () => commentFormRating,
    onSelect: (value) => {
      commentFormRating = value;
      setStarsActive(commentStarsSelectEl, commentFormRating);
      if (commentRatingClearEl) {
        commentRatingClearEl.hidden = false;
      }
    }
  });

  if (commentRatingClearEl) {
    commentRatingClearEl.addEventListener("click", () => {
      commentFormRating = null;
      setStarsActive(commentStarsSelectEl, null);
      commentRatingClearEl.hidden = true;
    });
  }
}

function canDeleteComment(comment) {
  if (!currentUser || !comment) {
    return false;
  }
  const role = currentUser.role;
  if (role === "moderator" || role === "admin") {
    return true;
  }
  return comment.user_id === currentUser.id;
}

function renderComments(comments) {
  if (!commentsListEl) {
    return;
  }

  const list = Array.isArray(comments) ? comments : [];
  commentsListEl.innerHTML = "";

  if (list.length === 0) {
    if (commentsEmptyEl) {
      const empty = commentsEmptyEl.cloneNode(true);
      commentsListEl.appendChild(empty);
    } else {
      commentsListEl.innerHTML = '<p class="comments-empty">No comments yet. Be the first!</p>';
    }
    return;
  }

  list.forEach((comment) => {
    const article = document.createElement("article");
    article.className = "comment-item";
    article.dataset.commentId = String(comment.id);

    const head = document.createElement("div");
    head.className = "comment-head";

    const author = document.createElement("strong");
    author.textContent = comment.username || "User";

    const date = document.createElement("span");
    date.textContent = formatCommentDate(comment.created_at);

    head.appendChild(author);
    head.appendChild(date);

    if (canDeleteComment(comment)) {
      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "comment-delete-btn";
      deleteBtn.title = "Delete comment";
      deleteBtn.setAttribute("aria-label", "Delete comment");
      deleteBtn.textContent = "🗑️";
      deleteBtn.addEventListener("click", () => deleteComment(comment.id));
      head.appendChild(deleteBtn);
    }

    article.appendChild(head);

    if (comment.rating) {
      const ratingEl = document.createElement("div");
      ratingEl.className = "comment-rating";
      ratingEl.textContent = starsHtml(comment.rating);
      article.appendChild(ratingEl);
    }

    const body = document.createElement("p");
    body.textContent = comment.content;
    article.appendChild(body);

    commentsListEl.appendChild(article);
  });
}

async function loadComments() {
  if (!gameSlug) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}/comments`);
    const data = await res.json().catch(() => ([]));
    if (!res.ok) {
      throw new Error(data.error || "Failed to load comments");
    }
    console.log("Raw comments from server:", data);
    renderComments(data);
  } catch (err) {
    if (commentsListEl) {
      commentsListEl.innerHTML = `<p class="comments-empty">${escapeHtml(err.message)}</p>`;
    }
  }
}

async function deleteComment(commentId) {
  if (!confirm("Delete this comment?")) {
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/games/comments/${commentId}`, {
      method: "DELETE",
      headers: authHeaders()
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete comment");
    }
    showNotice("Comment deleted.");
    await loadComments();
  } catch (err) {
    showNotice(err.message, true);
  }
}

async function reloadGameRating() {
  if (!gameSlug) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return;
    }
    updateRatingSummary(data.rating_avg, data.rating_count, data.rating_distribution);
    await loadUserRating();
  } catch {
    /* ignore */
  }
}

function setupCommentForm() {
  if (!commentFormEl) {
    return;
  }

  const isLoggedIn = Boolean(getAuthToken());

  if (commentFormEl) {
    commentFormEl.classList.toggle("is-disabled", !isLoggedIn);
  }
  if (commentSubmitBtnEl) {
    commentSubmitBtnEl.disabled = !isLoggedIn;
  }
  if (commentsHintEl) {
    commentsHintEl.textContent = isLoggedIn
      ? "Share your experience about this game."
      : "Sign in to leave a comment.";
  }
  if (ratingHintEl) {
    ratingHintEl.textContent = isLoggedIn
      ? "Click a star to rate this game."
      : "Sign in to rate this game.";
  }

  commentFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!getAuthToken()) {
      const goAuth = confirm("Sign in to post a comment. Open the login page?");
      if (goAuth) {
        window.location.href = "auth.html";
      }
      return;
    }

    const content = commentInputEl?.value?.trim() || "";
    if (!content) {
      showNotice("Please write a comment first.", true);
      return;
    }

    if (commentSubmitBtnEl) {
      commentSubmitBtnEl.disabled = true;
    }

    try {
      const body = { content };
      if (commentFormRating != null) {
        body.rating = commentFormRating;
      }

      const res = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}/comments`, {
        method: "POST",
        headers: {
          ...authHeaders(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to post comment");
      }

      if (commentInputEl) {
        commentInputEl.value = "";
      }
      commentFormRating = null;
      setStarsActive(commentStarsSelectEl, null);
      if (commentRatingClearEl) {
        commentRatingClearEl.hidden = true;
      }

showNotice("Comment published.");
loadComments();

      if (body.rating != null) {
        await reloadGameRating();
        await loadUserRating();
      }
    } catch (err) {
      showNotice(err.message, true);
    } finally {
      if (commentSubmitBtnEl) {
        commentSubmitBtnEl.disabled = !getAuthToken();
      }
    }
  });
}

function renderGame(game) {
  loadedGame = game;
  console.log("Game ID:", game.id);
  console.log("Game slug:", gameSlug);
  const title = game.title || "Untitled";
  const description = game.description || "";

  document.title = `GameLab - ${title}`;

  if (gameGenreEl) {
    gameGenreEl.textContent = metaValue(game.genre);
  }
  if (gameTitleEl) {
    gameTitleEl.textContent = title;
  }
  if (gameImageEl) {
    const cover = mediaUrl(game.cover_url);
    if (cover) {
      gameImageEl.src = cover;
      gameImageEl.alt = `${title} preview`;
    }
  }
  if (gameIntroEl) {
    gameIntroEl.textContent = shortDescription(description) || description;
  }
  if (gameFullDescEl) {
    gameFullDescEl.textContent = description;
  }
  if (gameDeveloperEl) {
    gameDeveloperEl.textContent = metaValue(game.publisher);
  }
  if (gameReleaseEl) {
    gameReleaseEl.textContent = formatReleaseDate(game.release_date || game.created_at);
  }
  if (gameArchiveSizeEl) {
    gameArchiveSizeEl.textContent = metaValue(game.archive_size);
  }
  if (gameInstalledSizeEl) {
    gameInstalledSizeEl.textContent = metaValue(game.installed_size);
  }
  if (gamePlatformEl) {
    gamePlatformEl.textContent = metaValue(game.platform);
  }
  if (gameMultiplayerEl) {
    gameMultiplayerEl.textContent = metaValue(game.multiplayer);
  }

  updateRatingSummary(game.rating_avg, game.rating_count, game.rating_distribution);

  if (gameFeaturesEl) {
    gameFeaturesEl.innerHTML = "";
    const features = Array.isArray(game.features) ? game.features : [];
    if (features.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No features listed yet.";
      gameFeaturesEl.appendChild(li);
    } else {
      features.forEach((feature) => {
        const li = document.createElement("li");
        li.textContent = feature;
        gameFeaturesEl.appendChild(li);
      });
    }
  }

  const minReq = game.min_requirements || {};
  const recReq = game.rec_requirements || {};
  renderRequirements(reqMinimumEl, minReq);
  renderRequirements(reqRecommendedEl, recReq);

  const reqSection = document.getElementById("game-requirements");
  if (reqSection) {
    reqSection.hidden = !hasRequirements(minReq) && !hasRequirements(recReq);
  }

  renderScreenshots(game.screenshots, title);
  setupDownloadButton(game.download_url);
  setOptionalSectionsVisible(true);
}

async function enableDeleteForModerator() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "moderator" && user.role !== "admin")) {
    return;
  }

  const deleteBtn = document.getElementById("delete-game-btn");
  if (!deleteBtn || !loadedGame?.id) {
    return;
  }

  deleteBtn.style.display = "inline-block";
  deleteBtn.addEventListener("click", async () => {
    const title = loadedGame.title || "this game";
    if (!confirm(`Delete game "${title}" permanently? This action cannot be undone.`)) {
      return;
    }

    const token = localStorage.getItem("gamelab_token");
    try {
      const res = await fetch(`${API_BASE}/games/${loadedGame.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Deletion failed");
      }
      alert("Game deleted successfully.");
      window.location.href = "games.html";
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  });
}

async function loadGameDetails() {
  if (!gameSlug) {
    showNotFound("No game specified. Open a game from the catalog.");
    return;
  }

  try {
    currentUser = await getCurrentUser();
    setupCommentForm();

    const response = await fetch(`${API_BASE}/games/${encodeURIComponent(gameSlug)}`);
    const data = await response.json().catch(() => ({}));

    if (response.status === 404) {
      showNotFound("Game not found. The link may be outdated.");
      return;
    }

    if (!response.ok) {
      showNotFound(data.error || "Failed to load game details.");
      return;
    }

    renderGame(data);
    await Promise.all([loadUserRating(), loadComments(), enableDeleteForModerator()]);

    setTimeout(() => {
      loadComments();
    }, 1000);
  } catch {
    showNotFound("Could not connect to the server. Please try again later.");
  }
}

const accountLinkDetail = document.querySelector(".account-link");
const token = localStorage.getItem("gamelab_token");
if (accountLinkDetail) {
  accountLinkDetail.href = token ? "profile.html" : "auth.html";
  accountLinkDetail.setAttribute("aria-label", token ? "Open profile" : "Open account");
}

initStarRating();
loadGameDetails().then(() => {
  if (typeof applyTranslations === "function") {
    applyTranslations();
  }
});
