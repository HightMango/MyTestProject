const searchForm = document.querySelector(".search-wrap");
const searchInput = document.querySelector(".search-input");
const filterLinks = Array.from(document.querySelectorAll(".filter-link"));
const cards = Array.from(document.querySelectorAll(".card"));
const cardGrid = document.querySelector(".card-grid");
const resultsCount = document.querySelector(".results-count");
const sortSelect = document.querySelector(".sort-select");
const accountLink = document.querySelector(".account-link");
const totalCards = cards.length;
const selectedFilters = new Set();
const API_BASE = "http://localhost:4000/api";

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function prepareCardAssetIds() {
  cards.forEach((card) => {
    if (!card.dataset.assetId) {
      const title = card.querySelector("h3")?.textContent || "asset";
      card.dataset.assetId = slugify(title);
    }
  });
}

function focusAssetFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const targetAssetId = params.get("asset");
  if (!targetAssetId) {
    return;
  }

  const targetCard = cards.find((card) => card.dataset.assetId === targetAssetId);
  if (!targetCard) {
    return;
  }

  selectedFilters.clear();
  setActiveFilter("all");
  searchInput.value = "";
  applyFiltersAndSorting();

  targetCard.classList.add("focused-card");
  targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => {
    targetCard.classList.remove("focused-card");
  }, 2600);
}

function setActiveFilter(filter) {
  filterLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.filter === filter);
    link.classList.remove("multi-selected");
  });
}

function getPrice(card) {
  const priceText = card.querySelector(".price")?.textContent || "";
  return Number.parseFloat(priceText.replace("$", "")) || 0;
}

function getRating(card) {
  return Number.parseFloat(card.dataset.rating || "0") || 0;
}

function sortCards() {
  const mode = sortSelect.value;
  const sorted = [...cards];

  sorted.sort((a, b) => {
    if (mode === "price-asc") {
      return getPrice(a) - getPrice(b);
    }
    if (mode === "price-desc") {
      return getPrice(b) - getPrice(a);
    }
    if (mode === "rating-asc") {
      return getRating(a) - getRating(b);
    }
    if (mode === "rating-desc") {
      return getRating(b) - getRating(a);
    }
    return 0;
  });

  sorted.forEach((card) => cardGrid.appendChild(card));
}

function applyFiltersAndSorting() {
  const activeFilters = Array.from(selectedFilters);
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const type = (card.dataset.type || "").toLowerCase();
    const text = card.textContent.toLowerCase();
    const typeMatches =
      activeFilters.length === 0 ||
      activeFilters.some((filter) => type.includes(filter));
    const queryMatches = !query || text.includes(query);
    const isVisible = typeMatches && queryMatches;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) {
      visibleCount += 1;
    }
  });

  resultsCount.textContent = `Showing ${visibleCount} of ${totalCards}`;
  sortCards();
}

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const selected = link.dataset.filter || "all";

    if (selected === "all") {
      selectedFilters.clear();
      setActiveFilter("all");
      searchInput.value = "";
    } else if (selectedFilters.has(selected)) {
      selectedFilters.delete(selected);
      link.classList.remove("multi-selected");
      if (selectedFilters.size === 0) {
        setActiveFilter("all");
      }
    } else {
      selectedFilters.add(selected);
      link.classList.add("multi-selected");
      filterLinks.forEach((item) => {
        if (item.dataset.filter === "all") {
          item.classList.remove("active");
        }
      });
    }

    if (selectedFilters.size > 0) {
      filterLinks.forEach((item) => {
        if (item.dataset.filter !== "all") {
          item.classList.toggle(
            "multi-selected",
            selectedFilters.has(item.dataset.filter)
          );
        }
      });
    }

    applyFiltersAndSorting();
  });
});

searchInput.addEventListener("input", applyFiltersAndSorting);

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
  } else {
    applyFiltersAndSorting();
  }
});

sortSelect.addEventListener("change", applyFiltersAndSorting);

applyFiltersAndSorting();
prepareCardAssetIds();
focusAssetFromQuery();

// Применяем поиск из URL параметра
function applySearchFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const searchQuery = params.get("search");
  if (searchQuery) {
    searchInput.value = searchQuery;
    applyFiltersAndSorting();
  }
}

applySearchFromQuery();

// Применяем переводы после инициализации
if (typeof applyTranslations === "function") {
  applyTranslations();
}

const token = localStorage.getItem("gamelab_token");
if (accountLink) {
  accountLink.href = token ? "profile.html" : "auth.html";
  accountLink.setAttribute("aria-label", token ? "Open profile" : "Open account");
}

async function trackAssetView(card) {
  const token = localStorage.getItem("gamelab_token");
  if (!token) {
    return;
  }

  const assetId = card.dataset.assetId || "asset";

  try {
    await fetch(`${API_BASE}/assets/${encodeURIComponent(assetId)}/view`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (_error) {
    // Ignore tracking errors to keep UI responsive.
  }
}

cards.forEach((card) => {
  const viewButton = card.querySelector(".btn-small");
  viewButton?.addEventListener("click", () => {
    trackAssetView(card);
    const assetId = card.dataset.assetId || "asset";
    window.location.href = `asset.html?asset=${encodeURIComponent(assetId)}`;
  });
});
