const API_BASE = "http://localhost:4000/api";
const API_ORIGIN = "http://localhost:4000";

const params = new URLSearchParams(window.location.search);
const submissionId = params.get("id");

const feedbackEl = document.getElementById("submission-feedback");
const submissionCardEl = document.getElementById("submission-card");
const titleEl = document.getElementById("submission-title");
const genreEl = document.getElementById("submission-genre");
const coverEl = document.getElementById("submission-cover");
const authorEl = document.getElementById("submission-author");
const descriptionEl = document.getElementById("submission-description");
const engineEl = document.getElementById("submission-engine");
const linkEl = document.getElementById("submission-link");
const videoEl = document.getElementById("submission-video");
const archiveSizeEl = document.getElementById("submission-archive-size");
const installedSizeEl = document.getElementById("submission-installed-size");
const platformEl = document.getElementById("submission-platform");
const multiplayerEl = document.getElementById("submission-multiplayer");
const releaseEl = document.getElementById("submission-release");
const archiveEl = document.getElementById("submission-archive");
const reqMinimumEl = document.getElementById("req-minimum");
const reqRecommendedEl = document.getElementById("req-recommended");
const screenshotsGridEl = document.getElementById("screenshots-grid");
const screenshotsSectionEl = document.getElementById("submission-screenshots-section");
const requirementsSectionEl = document.getElementById("submission-requirements");
const approveBtn = document.getElementById("btn-approve");
const rejectBtn = document.getElementById("btn-reject");

const REQ_LABELS = {
  os: "OS",
  cpu: "CPU",
  ram: "RAM",
  gpu: "GPU",
  storage: "Storage",
  additional: "Additional"
};

function getToken() {
  return localStorage.getItem("gamelab_token");
}

function setFeedback(message, type = "") {
  if (!feedbackEl) {
    return;
  }
  feedbackEl.textContent = message;
  feedbackEl.classList.remove("error", "success");
  if (type) {
    feedbackEl.classList.add(type);
  }
}

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

function hasRequirements(req) {
  if (!req || typeof req !== "object") {
    return false;
  }
  return Object.values(req).some((value) => typeof value === "string" && value.trim());
}

function renderLinkMeta(container, url) {
  if (!container) {
    return;
  }
  const href = typeof url === "string" ? url.trim() : "";
  if (!href) {
    container.textContent = "—";
    return;
  }
  container.innerHTML = `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(href)}</a>`;
}

function renderRequirementsList(container, req) {
  if (!container) {
    return;
  }
  container.innerHTML = "";
  if (!hasRequirements(req)) {
    const li = document.createElement("li");
    li.className = "req-empty";
    li.textContent = "Not specified";
    container.appendChild(li);
    return;
  }

  for (const [key, value] of Object.entries(req)) {
    const text = typeof value === "string" ? value.trim() : "";
    if (!text) {
      continue;
    }
    const li = document.createElement("li");
    li.className = "req-item";
    li.innerHTML = `<strong>${escapeHtml(REQ_LABELS[key] || key)}:</strong> ${escapeHtml(text)}`;
    container.appendChild(li);
  }
}

function renderScreenshots(screenshots, title) {
  if (!screenshotsGridEl) {
    return;
  }

  const list = Array.isArray(screenshots) ? screenshots.filter(Boolean) : [];
  screenshotsGridEl.innerHTML = "";

  if (list.length === 0) {
    if (screenshotsSectionEl) {
      screenshotsSectionEl.hidden = true;
    }
    return;
  }

  if (screenshotsSectionEl) {
    screenshotsSectionEl.hidden = false;
  }

  list.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = mediaUrl(src);
    img.alt = `${title} screenshot ${index + 1}`;
    img.loading = "lazy";
    screenshotsGridEl.appendChild(img);
  });
}

function showError(message) {
  if (submissionCardEl) {
    submissionCardEl.innerHTML = `
      <p class="game-not-found">${escapeHtml(message)}</p>
      <p class="game-not-found-hint">
        <a href="profile.html">Return to profile</a>
      </p>
    `;
  }
  if (requirementsSectionEl) {
    requirementsSectionEl.hidden = true;
  }
  if (screenshotsSectionEl) {
    screenshotsSectionEl.hidden = true;
  }
  if (approveBtn) {
    approveBtn.hidden = true;
  }
  if (rejectBtn) {
    rejectBtn.hidden = true;
  }
}

async function request(path, options = {}) {
  const token = getToken();
  if (!token) {
    window.location.href = "auth.html";
    throw new Error("No token");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

function renderSubmission(submission) {
  const title = submission.title || "Untitled";
  document.title = `GameLab - Review: ${title}`;

  if (genreEl) {
    genreEl.textContent = metaValue(submission.genre);
  }
  if (titleEl) {
    titleEl.textContent = title;
  }
  if (authorEl) {
    const author =
      submission.author_username || submission.author_email || "Unknown";
    authorEl.textContent = `Author: ${author}`;
  }
  if (descriptionEl) {
    descriptionEl.textContent = submission.description || "—";
  }
  if (coverEl) {
    const cover = mediaUrl(submission.cover_url);
    if (cover) {
      coverEl.src = cover;
      coverEl.alt = `${title} cover`;
      coverEl.hidden = false;
    } else {
      coverEl.hidden = true;
    }
  }
  if (engineEl) {
    engineEl.textContent = metaValue(submission.engine);
  }
  renderLinkMeta(linkEl, submission.project_link);
  renderLinkMeta(videoEl, submission.trailer_link);
  if (archiveSizeEl) {
    archiveSizeEl.textContent = metaValue(submission.archive_size);
  }
  if (installedSizeEl) {
    installedSizeEl.textContent = metaValue(submission.installed_size);
  }
  if (platformEl) {
    platformEl.textContent = metaValue(submission.platform);
  }
  if (multiplayerEl) {
    multiplayerEl.textContent = metaValue(submission.multiplayer);
  }
  if (releaseEl) {
    releaseEl.textContent = formatReleaseDate(submission.release_date);
  }
  if (archiveEl) {
    const archiveUrl = mediaUrl(submission.archive_url);
    if (archiveUrl) {
      archiveEl.innerHTML = `<a href="${escapeHtml(archiveUrl)}" download>Download archive</a>`;
    } else {
      archiveEl.textContent = "—";
    }
  }

  const minReq = submission.min_requirements || {};
  const recReq = submission.rec_requirements || {};
  renderRequirementsList(reqMinimumEl, minReq);
  renderRequirementsList(reqRecommendedEl, recReq);

  if (requirementsSectionEl) {
    requirementsSectionEl.hidden = !hasRequirements(minReq) && !hasRequirements(recReq);
  }

  renderScreenshots(submission.screenshots, title);

  const pending = submission.status === "pending";
  if (approveBtn) {
    approveBtn.hidden = !pending;
  }
  if (rejectBtn) {
    rejectBtn.hidden = !pending;
  }
}

async function loadSubmission() {
  if (!submissionId) {
    showError("No submission id specified.");
    return;
  }

  setFeedback("Loading submission...");

  try {
    const submission = await request(`/games/moderator/submissions/${submissionId}`);
    renderSubmission(submission);
    setFeedback("");
  } catch (error) {
    setFeedback(error.message, "error");
    showError(error.message);
  }
}

async function handleApprove() {
  if (!submissionId) {
    return;
  }
  if (!window.confirm("Approve this submission and publish the game?")) {
    return;
  }

  if (approveBtn) {
    approveBtn.disabled = true;
  }
  if (rejectBtn) {
    rejectBtn.disabled = true;
  }
  setFeedback("Approving...");

  try {
    await request(`/games/moderator/submissions/${submissionId}/approve`, {
      method: "POST"
    });
    window.alert("Submission approved and published.");
    window.location.href = "profile.html";
  } catch (error) {
    setFeedback(error.message, "error");
    if (approveBtn) {
      approveBtn.disabled = false;
    }
    if (rejectBtn) {
      rejectBtn.disabled = false;
    }
  }
}

async function handleReject() {
  if (!submissionId) {
    return;
  }

  const reason = window.prompt("Rejection reason (required):");
  if (reason === null) {
    return;
  }
  const trimmed = reason.trim();
  if (!trimmed) {
    setFeedback("Rejection reason is required.", "error");
    return;
  }

  if (approveBtn) {
    approveBtn.disabled = true;
  }
  if (rejectBtn) {
    rejectBtn.disabled = true;
  }
  setFeedback("Rejecting...");

  try {
    await request(`/games/moderator/submissions/${submissionId}/reject`, {
      method: "POST",
      body: JSON.stringify({ reason: trimmed })
    });
    window.location.href = "profile.html";
  } catch (error) {
    setFeedback(error.message, "error");
    if (approveBtn) {
      approveBtn.disabled = false;
    }
    if (rejectBtn) {
      rejectBtn.disabled = false;
    }
  }
}

approveBtn?.addEventListener("click", handleApprove);
rejectBtn?.addEventListener("click", handleReject);

const accountLink = document.querySelector(".account-link");
const token = getToken();
if (accountLink) {
  accountLink.href = token ? "profile.html" : "auth.html";
}

loadSubmission();
