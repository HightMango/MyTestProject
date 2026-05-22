/**
 * DEMO: gate + fake approve/reject; no fetch(), state only in DOM.
 */

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
  if (!user) return false;
  const email = String(user.email || "").toLowerCase();
  if (email.includes("moderator")) return true;
  if (user.role === "moderator") return true;
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  if (!isModerator()) {
    window.location.replace("profile.html");
    return;
  }

  const list = document.getElementById("moderator-requests");
  if (!list) return;

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const card = btn.closest(".moderator-card");
    const action = btn.getAttribute("data-action");

    if (action === "approve") {
      alert("Демо: заявка одобрена");
    } else if (action === "reject") {
      alert("Демо: заявка отклонена");
    }

    if (card) {
      card.remove();
    }
  });
});
