const API_BASE = "http://localhost:4000/api";
const API_ORIGIN = "http://localhost:4000";

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

function formatRating(avg, count) {
  const rating = Number(avg);
  if (!Number.isFinite(rating) || rating <= 0) {
    return "New";
  }
  const label = `⭐ ${rating.toFixed(1)}`;
  const votes = Number(count) > 0 ? ` (${count})` : "";
  return `${label}${votes}`;
}

function renderGameCard(game) {
  const cover = mediaUrl(game.cover_url);
  const alt = `${game.title} preview`;
  const detailHref = `game-detail.html?game=${encodeURIComponent(game.slug)}`;

  return `
    <article class="game-card">
      <img class="game-thumb" src="${escapeHtml(cover)}" alt="${escapeHtml(alt)}">
      <div class="game-info">
        <div class="game-top">
          <h3>${escapeHtml(game.title)}</h3>
          <span class="game-rating">${escapeHtml(formatRating(game.rating_avg, game.rating_count))}</span>
        </div>
        <p class="game-desc">${escapeHtml(game.short_description || "")}</p>
        <div class="game-meta">
          <a href="${escapeHtml(detailHref)}" class="btn btn-details">Details</a>
        </div>
      </div>
    </article>
  `;
}

async function loadGames() {
  const grid = document.getElementById("games-grid");
  if (!grid) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/games`);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Failed to load games");
    }

    const games = Array.isArray(data) ? data : [];

    if (games.length === 0) {
      grid.innerHTML = '<p class="games-empty">No published games yet.</p>';
      return;
    }

    grid.innerHTML = games.map(renderGameCard).join("");
  } catch (error) {
    grid.innerHTML = `<p class="games-empty">${escapeHtml(error.message || "Failed to load games")}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadGames);
