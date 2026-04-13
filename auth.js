const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const panels = Array.from(document.querySelectorAll(".auth-panel"));
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const loginFeedback = document.querySelector("#login-feedback");
const registerFeedback = document.querySelector("#register-feedback");
const passwordToggles = Array.from(document.querySelectorAll(".password-toggle"));

const API_BASE = "http://localhost:4000/api";

function showPanel(targetId) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.target === targetId;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    panel.classList.toggle("visible", panel.id === targetId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPanel(button.dataset.target);
  });
});

passwordToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.dataset.target;
    const input = targetId ? document.getElementById(targetId) : null;
    if (!input) return;

    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(showPassword));
    toggle.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
  });
});

function setFeedback(el, message, type = "") {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("error", "success");
  if (type) {
    el.classList.add(type);
  }
}

async function apiRequest(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedback(loginFeedback, "Signing in...");

  const formData = new FormData(loginForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const data = await apiRequest("/auth/login", { email, password });
    localStorage.setItem("gamelab_token", data.token);
    localStorage.setItem("gamelab_user", JSON.stringify(data.user));
    setFeedback(loginFeedback, "Login successful. Redirecting...", "success");
    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  } catch (error) {
    setFeedback(loginFeedback, error.message, "error");
  }
});

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedback(registerFeedback, "Creating account...");

  const formData = new FormData(registerForm);
  const username = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  try {
    const data = await apiRequest("/auth/register", { username, email, password });
    localStorage.setItem("gamelab_token", data.token);
    localStorage.setItem("gamelab_user", JSON.stringify(data.user));
    setFeedback(registerFeedback, "Account created. Redirecting...", "success");
    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  } catch (error) {
    setFeedback(registerFeedback, error.message, "error");
  }
});
