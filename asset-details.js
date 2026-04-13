const accountLinkDetail = document.querySelector(".account-link");
const params = new URLSearchParams(window.location.search);
const assetId = params.get("asset") || "";

const assetTitleEl = document.getElementById("asset-title");
const assetTypeEl = document.getElementById("asset-type");
const assetImageEl = document.getElementById("asset-image");
const assetIntroEl = document.getElementById("asset-intro");
const assetFullDescriptionEl = document.getElementById("asset-full-description");
const assetPriceEl = document.getElementById("asset-price");
const assetRatingEl = document.getElementById("asset-rating");
const assetCompatibilityEl = document.getElementById("asset-compatibility");
const assetFileSizeEl = document.getElementById("asset-file-size");
const assetUpdateEl = document.getElementById("asset-update");
const assetFeaturesEl = document.getElementById("asset-features");
const ratingValueEl = document.getElementById("rating-value");
const ratingVotesEl = document.getElementById("rating-votes");

function renderAsset() {
  const fallbackAsset = typeof getAssetById === "function" ? getAssetById(assetId) : null;
  const detailMeta = typeof getAssetDetailById === "function" ? getAssetDetailById(assetId) : null;
  const asset = fallbackAsset;

  // Определяем язык
  const lang = typeof getLang === "function" ? getLang() : "en";
  const ruAsset = (lang === "ru" && typeof getAssetRu === "function") ? getAssetRu(assetId) : null;

  if (!asset) {
    assetTitleEl.textContent = lang === "ru" ? "Ассет не найден" : "Asset not found";
    assetIntroEl.textContent = lang === "ru"
      ? "Возможно, ссылка устарела. Вернитесь в каталог и откройте ассет заново."
      : "The link may be outdated. Please return to the catalog and open the asset again.";
    assetFullDescriptionEl.textContent = "";
    return;
  }

  assetTypeEl.textContent = ruAsset?.type || asset.type;
  assetTitleEl.textContent = asset.title;
  assetImageEl.src = asset.image;
  assetImageEl.alt = `${asset.title} preview`;
  assetIntroEl.textContent = ruAsset?.intro || asset.intro;
  assetFullDescriptionEl.textContent =
    ruAsset?.fullDescription || detailMeta?.fullDescription || asset.fullDescription;
  assetPriceEl.textContent = asset.price;
  assetRatingEl.textContent = `${asset.rating.toFixed(1)} / 5`;
  assetCompatibilityEl.textContent = ruAsset?.compatibility || detailMeta?.compatibility || "Unity / Unreal";
  assetFileSizeEl.textContent = ruAsset?.fileSize || detailMeta?.fileSize || "N/A";
  assetUpdateEl.textContent = ruAsset?.updateInfo || detailMeta?.updateInfo || (lang === "ru" ? "Обновлений пока нет" : "No updates yet");
  ratingValueEl.textContent = asset.rating.toFixed(1);
  ratingVotesEl.textContent = `${detailMeta?.commentsCount || 0} ${lang === "ru" ? "отзывов" : "reviews"}`;

  assetFeaturesEl.innerHTML = "";
  const features = ruAsset?.features || asset.features;
  features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    assetFeaturesEl.appendChild(li);
  });
}

const token = localStorage.getItem("gamelab_token");
if (accountLinkDetail) {
  accountLinkDetail.href = token ? "profile.html" : "auth.html";
  accountLinkDetail.setAttribute("aria-label", token ? "Open profile" : "Open account");
}

renderAsset();

// Применяем переводы после загрузки ассета
if (typeof applyTranslations === "function") {
  // Небольшая задержка, чтобы данные ассета уже были в DOM
  setTimeout(() => {
    applyTranslations();
  }, 50);
}
