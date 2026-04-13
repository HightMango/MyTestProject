const API_BASE = "http://localhost:4000/api";

const nameEl = document.querySelector("#profile-name");
const emailEl = document.querySelector("#profile-email");
const bioForm = document.querySelector("#bio-form");
const bioInput = document.querySelector("#bio-input");
const bioCount = document.querySelector("#bio-count");
const bioFeedback = document.querySelector("#bio-feedback");
const recentList = document.querySelector("#recent-list");
const logoutBtn = document.querySelector("#logout-btn");

const ASSET_CATALOG = {
  "neon-city-streets-pack": {
    title: "Neon City Streets Pack",
    tag: "3D Environment",
    price: "$39",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80"
  },
  "fantasy-hero-bundle": {
    title: "Fantasy Hero Bundle",
    tag: "Characters",
    price: "$55",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
  },
  "boss-battle-sound-kit": {
    title: "Boss Battle Sound Kit",
    tag: "Audio",
    price: "$24",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80"
  },
  "magic-spell-vfx-library": {
    title: "Magic Spell VFX Library",
    tag: "VFX",
    price: "$29",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=900&q=80"
  },
  "medieval-castle-builder": {
    title: "Medieval Castle Builder",
    tag: "3D Environment",
    price: "$44",
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=900&q=80"
  },
  "sci-fi-weapons-fx-set": {
    title: "Sci-Fi Weapons FX Set",
    tag: "VFX",
    price: "$31",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
  },
  "ambient-worlds-collection": {
    title: "Ambient Worlds Collection",
    tag: "Audio",
    price: "$27",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80"
  },
  "rpg-hud-pro-kit": {
    title: "RPG HUD Pro Kit",
    tag: "UI",
    price: "$22",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80"
  },
  "level-design-toolkit": {
    title: "Level Design Toolkit",
    tag: "Tools",
    price: "$35",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80"
  },
  "melee-combat-motion-pack": {
    title: "Melee Combat Motion Pack",
    tag: "Animations",
    price: "$49",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80"
  },
  "survival-props-mega-pack": {
    title: "Survival Props Mega Pack",
    tag: "3D Props",
    price: "$33",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
  },
  "weather-fx-controller": {
    title: "Weather FX Controller",
    tag: "VFX",
    price: "$28",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=900&q=80"
  },
  "mobile-store-interface": {
    title: "Mobile Store Interface",
    tag: "UI",
    price: "$18",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"
  },
  "dialogue-system-runtime": {
    title: "Dialogue System Runtime",
    tag: "Tools",
    price: "$41",
    image: "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&w=900&q=80"
  },
  "parkour-animation-suite": {
    title: "Parkour Animation Suite",
    tag: "Animations",
    price: "$36",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80"
  },
  "stylized-forest-biome": {
    title: "Stylized Forest Biome",
    tag: "Environment",
    price: "$37",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80"
  }
};

function getToken() {
  return localStorage.getItem("gamelab_token");
}

function setFeedback(message, type = "") {
  bioFeedback.textContent = message;
  bioFeedback.classList.remove("error", "success");
  if (type) {
    bioFeedback.classList.add(type);
  }
}

function updateCounter() {
  bioCount.textContent = `${bioInput.value.length} / 300`;
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

function formatDate(input) {
  const value = new Date(input);
  if (Number.isNaN(value.getTime())) {
    return input;
  }
  return value.toLocaleString();
}

function renderRecentViews(items) {
  recentList.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "recent-empty";
    empty.textContent = "No viewed assets yet.";
    recentList.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const info = ASSET_CATALOG[item.asset_id] || {
      title: item.asset_id,
      tag: "Asset",
      price: "-",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
    };

    const card = document.createElement("a");
    card.className = "mini-card";
    card.href = `index.html?asset=${encodeURIComponent(item.asset_id)}`;
    card.innerHTML = `
      <img class="mini-thumb" src="${info.image}" alt="${info.title}">
      <span class="mini-tag">${info.tag}</span>
      <h3 class="mini-title">${info.title}</h3>
      <div class="mini-meta">
        <span>${info.price}</span>
        <span class="mini-time">${formatDate(item.viewed_at)}</span>
      </div>
    `;
    recentList.appendChild(card);
  });
}

async function loadProfile() {
  const profileResponse = await request("/profile/me");
  const recentResponse = await request("/profile/me/recent-views?limit=20", {
    method: "GET",
    headers: {}
  });

  const profile = profileResponse.profile;
  nameEl.textContent = profile.username || "-";
  emailEl.textContent = profile.email || "-";
  bioInput.value = profile.bio || "";
  updateCounter();

  renderRecentViews(recentResponse.items || []);
}

bioInput?.addEventListener("input", updateCounter);

bioForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setFeedback("Saving...");

  try {
    await request("/profile/me", {
      method: "PATCH",
      body: JSON.stringify({ bio: bioInput.value.trim() })
    });
    setFeedback("Bio updated successfully", "success");
  } catch (error) {
    setFeedback(error.message, "error");
  }
});

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("gamelab_token");
  localStorage.removeItem("gamelab_user");
  window.location.href = "auth.html";
});

loadProfile().catch((error) => {
  if (error.message !== "No token") {
    setFeedback(error.message, "error");
  }
});

/* ===== Обработка настроек ===== */
const langSelect = document.getElementById("lang-select");
const themeButtons = document.querySelectorAll(".theme-option");

// Установить текущий язык
if (langSelect) {
  langSelect.value = getLang();
  langSelect.addEventListener("change", () => {
    setLang(langSelect.value);
    applyTranslations();
  });
}

// Установить текущую тему
if (themeButtons.length) {
  themeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.theme === getTheme());
    btn.addEventListener("click", () => {
      setTheme(btn.dataset.theme);
      themeButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}
