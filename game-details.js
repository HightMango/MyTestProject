// Game details page script
const params = new URLSearchParams(window.location.search);
const gameId = params.get("game") || "";

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
const ratingValueEl = document.getElementById("rating-value");
const ratingVotesEl = document.getElementById("rating-votes");

// Mock data for games (visual only)
const gamesData = {
  "cyber-odyssey": {
    title: "Cyber Odyssey",
    genre: "RPG / Open World",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    intro: "An open-world cyberpunk RPG with branching storylines and dynamic combat.",
    fullDescription: "Dive into the neon-lit streets of Neo Tokyo in this immersive cyberpunk RPG. Cyber Odyssey offers a rich narrative experience with deep character customization, branching questlines, and a dynamic combat system that adapts to your playstyle. Explore a sprawling open world filled with hidden secrets, corporate conspiracies, and unforgettable characters. Every choice you matter, and every path leads to a unique destiny.",
    developer: "NeonForge Studios",
    rating: 4.7,
    release: "March 15, 2026",
    archiveSize: "2.4 GB",
    installedSize: "4.1 GB",
    platform: "Windows / macOS / Linux",
    multiplayer: "No",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i5-8400 / AMD Ryzen 5 2600",
        ram: "8 GB",
        gpu: "GTX 1060 / RX 580",
        storage: "10 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i7-10700 / AMD Ryzen 7 5800X",
        ram: "16 GB",
        gpu: "RTX 3060 / RX 6700 XT",
        storage: "10 GB SSD"
      }
    },
    features: [
      "Over 60 hours of main story content",
      "Dynamic combat system with 5 weapon types",
      "Branching narrative with 12 unique endings",
      "Full character customization and skill trees",
      "Original synthwave soundtrack with 45 tracks"
    ]
  },
  "kingdoms-ash": {
    title: "Kingdoms of Ash",
    genre: "Strategy / Medieval",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    intro: "Medieval strategy game with base building and large-scale battles.",
    fullDescription: "Command your kingdom through ages of conquest and diplomacy. Build mighty fortresses, train legendary armies, and forge alliances in this epic medieval strategy game. With procedurally generated campaigns and real-time tactical battles, every playthrough offers fresh challenges. Will you rule with honor or conquer all through fire and steel?",
    developer: "Iron Crown Games",
    rating: 4.5,
    release: "January 22, 2026",
    archiveSize: "1.8 GB",
    installedSize: "3.2 GB",
    platform: "Windows",
    multiplayer: "Yes (up to 8 players)",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i5-9400 / AMD Ryzen 5 3600",
        ram: "8 GB",
        gpu: "GTX 1650 / RX 5500 XT",
        storage: "8 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i7-11700 / AMD Ryzen 7 5800X",
        ram: "16 GB",
        gpu: "RTX 3070 / RX 6800",
        storage: "8 GB SSD"
      }
    },
    features: [
      "Procedurally generated campaigns",
      "Real-time tactical battles with 1000+ units",
      "Deep diplomacy and alliance system",
      "4 unique factions with special abilities",
      "Mod support and custom scenario editor"
    ]
  },
  "neon-drift": {
    title: "Neon Drift",
    genre: "Racing / Arcade",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    intro: "Arcade racing game with synthwave soundtrack and drifting mechanics.",
    fullDescription: "Feel the rush of high-speed racing through neon-lit cityscapes. Neon Drift combines tight drifting mechanics with an incredible synthwave soundtrack to create an unforgettable racing experience. Master 20 unique tracks, customize your ride, and climb the global leaderboards in this love letter to 80s arcade racers.",
    developer: "RetroVelocity",
    rating: 4.3,
    release: "February 8, 2026",
    archiveSize: "890 MB",
    installedSize: "1.5 GB",
    platform: "Windows / macOS",
    multiplayer: "Yes (up to 4 players local)",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i3-8100 / AMD Ryzen 3 3100",
        ram: "4 GB",
        gpu: "GTX 1050 Ti / RX 560",
        storage: "3 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i5-10400 / AMD Ryzen 5 5600X",
        ram: "8 GB",
        gpu: "GTX 1660 / RX 5600 XT",
        storage: "3 GB SSD"
      }
    },
    features: [
      "20 unique tracks across 5 environments",
      "Deep car customization system",
      "Original synthwave soundtrack (30 tracks)",
      "Global leaderboards and weekly challenges",
      "Smooth 60 FPS gameplay"
    ]
  },
  "starbound-survivors": {
    title: "Starbound Survivors",
    genre: "Survival / Space",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
    intro: "Space survival with crafting, exploration, and multiplayer support.",
    fullDescription: "Stranded in an uncharted star system, survival is just the beginning. Explore procedurally generated planets, gather resources, craft advanced technology, and build your base among the stars. With seamless multiplayer co-op, you can team up with friends to face alien threats, discover ancient artifacts, and uncover the mysteries of the cosmos.",
    developer: "Cosmic Forge Interactive",
    rating: 4.9,
    release: "April 1, 2026",
    archiveSize: "3.1 GB",
    installedSize: "5.6 GB",
    platform: "Windows / macOS / Linux",
    multiplayer: "Yes (up to 6 players co-op)",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i5-8400 / AMD Ryzen 5 2600",
        ram: "8 GB",
        gpu: "GTX 1060 / RX 580",
        storage: "12 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i7-11700 / AMD Ryzen 7 5800X",
        ram: "16 GB",
        gpu: "RTX 3060 Ti / RX 6800 XT",
        storage: "12 GB SSD"
      }
    },
    features: [
      "Procedurally generated planets with unique biomes",
      "Deep crafting system with 200+ items",
      "Seamless multiplayer co-op",
      "Dynamic weather and environmental hazards",
      "Story-driven campaign with 40+ hours of content"
    ]
  },
  "pixel-dungeon-quest": {
    title: "Pixel Dungeon Quest",
    genre: "Roguelike / Retro",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
    intro: "Retro-style roguelike dungeon crawler with procedural level generation.",
    fullDescription: "Descend into the ever-changing depths of the Pixel Dungeon in this addictive roguelike adventure. With procedurally generated levels, permadeath, and hundreds of unique items to discover, no two runs are the same. Master 8 character classes, battle fierce bosses, and unlock secret rooms in this love letter to classic dungeon crawlers.",
    developer: "8-Bit Adventures",
    rating: 4.6,
    release: "December 10, 2025",
    archiveSize: "420 MB",
    installedSize: "780 MB",
    platform: "Windows / macOS / Linux / Mobile",
    multiplayer: "No",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i3-6100 / AMD FX-6300",
        ram: "4 GB",
        gpu: "GTX 750 Ti / RX 460",
        storage: "2 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i5-8400 / AMD Ryzen 5 3600",
        ram: "8 GB",
        gpu: "GTX 1060 / RX 580",
        storage: "2 GB SSD"
      }
    },
    features: [
      "Procedurally generated dungeons with 50+ levels",
      "8 unique character classes",
      "200+ items and equipment pieces",
      "12 challenging boss encounters",
      "Daily challenges and seasonal events"
    ]
  },
  "shadow-protocol": {
    title: "Shadow Protocol",
    genre: "Stealth-Action / Tactical",
    image: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?auto=format&fit=crop&w=900&q=80",
    intro: "Stealth-action tactical shooter with cooperative campaign.",
    fullDescription: "In a world of covert operations and high-stakes missions, Shadow Protocol puts you in command of an elite black-ops team. Plan your approach, execute precision strikes, and adapt to dynamic objectives in this tactical stealth-action game. The cooperative campaign supports up to 4 players, allowing you to coordinate complex multi-pronged assaults or slip through enemy lines undetected.",
    developer: "Phantom Division Studios",
    rating: 4.4,
    release: "February 28, 2026",
    archiveSize: "5.2 GB",
    installedSize: "9.8 GB",
    platform: "Windows",
    multiplayer: "Yes (up to 4 players co-op)",
    requirements: {
      minimum: {
        os: "Windows 10 64-bit",
        cpu: "Intel i5-8400 / AMD Ryzen 5 2600",
        ram: "8 GB",
        gpu: "GTX 1060 / RX 590",
        storage: "15 GB"
      },
      recommended: {
        os: "Windows 11 64-bit",
        cpu: "Intel i7-10700 / AMD Ryzen 7 5800X",
        ram: "16 GB",
        gpu: "RTX 3070 / RX 6800 XT",
        storage: "15 GB SSD"
      }
    },
    features: [
      "Cooperative campaign for 1-4 players",
      "Dynamic mission objectives and enemy AI",
      "Deep stealth and infiltration mechanics",
      "30+ weapons with customization options",
      "Multiple difficulty modes for all skill levels"
    ]
  }
};

function renderGame() {
  // Default to first game if no ID provided (visual demo)
  const game = gamesData[gameId] || gamesData["cyber-odyssey"];

  if (!game) {
    gameTitleEl.textContent = "Game not found";
    gameIntroEl.textContent = "The link may be outdated. Please return to the games page and try again.";
    gameFullDescEl.textContent = "";
    return;
  }

  gameGenreEl.textContent = game.genre;
  gameTitleEl.textContent = game.title;
  gameImageEl.src = game.image;
  gameImageEl.alt = `${game.title} preview`;
  gameIntroEl.textContent = game.intro;
  gameFullDescEl.textContent = game.fullDescription;
  gameDeveloperEl.textContent = game.developer;
  gameRatingEl.textContent = `${game.rating.toFixed(1)} / 5`;
  gameReleaseEl.textContent = game.release;
  gameArchiveSizeEl.textContent = game.archiveSize;
  gameInstalledSizeEl.textContent = game.installedSize;
  gamePlatformEl.textContent = game.platform;
  gameMultiplayerEl.textContent = game.multiplayer;
  ratingValueEl.textContent = game.rating.toFixed(1);
  ratingVotesEl.textContent = "0 votes";

  // Render features
  gameFeaturesEl.innerHTML = "";
  game.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    gameFeaturesEl.appendChild(li);
  });

  // Render system requirements
  if (game.requirements) {
    renderRequirements(reqMinimumEl, game.requirements.minimum);
    renderRequirements(reqRecommendedEl, game.requirements.recommended);
  }
}

function renderRequirements(container, req) {
  if (!container || !req) return;
  container.innerHTML = "";
  const labels = {
    os: "OS",
    cpu: "CPU",
    ram: "RAM",
    gpu: "GPU",
    storage: "Storage"
  };
  for (const [key, value] of Object.entries(req)) {
    const div = document.createElement("div");
    div.className = "req-item";
    div.innerHTML = `<strong>${labels[key] || key}:</strong> <span>${value}</span>`;
    container.appendChild(div);
  }
}

// Interactive star rating
const starsSelect = document.getElementById("stars-select");
const ratingLabel = document.getElementById("rating-label");

if (starsSelect) {
  const stars = starsSelect.querySelectorAll(".star");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = parseInt(star.getAttribute("data-value"));
      
      // Update active state
      stars.forEach((s, index) => {
        s.classList.toggle("active", index < value);
      });

      // Update label
      const labels = [
        "Poor",
        "Fair",
        "Good",
        "Very Good",
        "Excellent!"
      ];
      ratingLabel.textContent = labels[value - 1];
    });

    // Hover effect
    star.addEventListener("mouseenter", () => {
      const value = parseInt(star.getAttribute("data-value"));
      stars.forEach((s, index) => {
        s.style.color = index < value ? "#fbbf24" : "#3a4b85";
      });
    });
  });

  // Reset on mouse leave
  starsSelect.addEventListener("mouseleave", () => {
    stars.forEach((s) => {
      const isActive = s.classList.contains("active");
      s.style.color = isActive ? "#fbbf24" : "#3a4b85";
    });
  });
}

// Account link
const accountLinkDetail = document.querySelector(".account-link");
const token = localStorage.getItem("gamelab_token");
if (accountLinkDetail) {
  accountLinkDetail.href = token ? "profile.html" : "auth.html";
  accountLinkDetail.setAttribute("aria-label", token ? "Open profile" : "Open account");
}

// Initialize
renderGame();

// Применяем переводы после загрузки данных игры
if (typeof applyTranslations === "function") {
  setTimeout(() => {
    applyTranslations();
  }, 100);
}
