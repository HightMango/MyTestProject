const ASSET_CATALOG = [
  {
    id: "neon-city-streets-pack",
    title: "Neon City Streets Pack",
    type: "3D Environment",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    intro: "Modular cyberpunk roads, props, signs, and building fronts with PBR textures.",
    price: "$39",
    rating: 4.8,
    features: ["58 models", "4K textures", "Unreal + Unity ready"]
  },
  {
    id: "fantasy-hero-bundle",
    title: "Fantasy Hero Bundle",
    type: "Characters",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    intro: "Stylized knight, archer, and mage with walk, attack, and idle animation sets.",
    price: "$55",
    rating: 4.9,
    features: ["3 hero rigs", "120+ animations", "Humanoid retargeting"]
  },
  {
    id: "boss-battle-sound-kit",
    title: "Boss Battle Sound Kit",
    type: "Audio",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    intro: "High-energy combat music loops, hit effects, and cinematic transition stingers.",
    price: "$24",
    rating: 4.6,
    features: ["34 music loops", "90 SFX", "WAV + OGG formats"]
  },
  {
    id: "magic-spell-vfx-library",
    title: "Magic Spell VFX Library",
    type: "VFX",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=900&q=80",
    intro: "Elemental spells with impact bursts, trail effects, and shader-based glows.",
    price: "$29",
    rating: 4.7,
    features: ["45 effects", "Color variants", "Performance presets"]
  },
  {
    id: "medieval-castle-builder",
    title: "Medieval Castle Builder",
    type: "3D Environment",
    image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=900&q=80",
    intro: "Snap-fit walls, towers, gates, and props for RPG towns and fortress scenes.",
    price: "$44",
    rating: 4.7,
    features: ["76 modules", "LOD included", "URP + HDRP"]
  },
  {
    id: "sci-fi-weapons-fx-set",
    title: "Sci-Fi Weapons FX Set",
    type: "VFX",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    intro: "Muzzle flashes, beam impacts, shield hits, and plasma trails for shooters.",
    price: "$31",
    rating: 4.5,
    features: ["62 prefabs", "GPU particles", "Mobile presets"]
  },
  {
    id: "ambient-worlds-collection",
    title: "Ambient Worlds Collection",
    type: "Audio",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
    intro: "Forest, cave, city, and space ambience loops for immersive exploration games.",
    price: "$27",
    rating: 4.4,
    features: ["48 ambience loops", "Layer-ready stems", "Seamless looping"]
  },
  {
    id: "rpg-hud-pro-kit",
    title: "RPG HUD Pro Kit",
    type: "UI",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    intro: "Health bars, quest widgets, inventory panels, and scalable icon packs.",
    price: "$22",
    rating: 4.8,
    features: ["220 UI elements", "Figma source", "Dark/light themes"]
  },
  {
    id: "level-design-toolkit",
    title: "Level Design Toolkit",
    type: "Tools",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    intro: "Grid snapping, procedural placement, and prefab randomizer for faster blockouts.",
    price: "$35",
    rating: 4.6,
    features: ["Editor extensions", "Batch workflow", "Docs included"]
  },
  {
    id: "melee-combat-motion-pack",
    title: "Melee Combat Motion Pack",
    type: "Animations",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    intro: "Combo chains, dodges, parries, and finishers for swords and dual-wield sets.",
    price: "$49",
    rating: 4.9,
    features: ["180 clips", "Root motion variants", "Humanoid rig"]
  },
  {
    id: "survival-props-mega-pack",
    title: "Survival Props Mega Pack",
    type: "3D Props",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    intro: "Tents, crates, camp gear, and industrial clutter for realistic world building.",
    price: "$33",
    rating: 4.5,
    features: ["140 props", "PBR materials", "Game-ready UVs"]
  },
  {
    id: "weather-fx-controller",
    title: "Weather FX Controller",
    type: "VFX",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=900&q=80",
    intro: "Rain, snow, fog, lightning, and wind systems with time-of-day blending.",
    price: "$28",
    rating: 4.3,
    features: ["12 weather profiles", "Timeline support", "Performance LOD"]
  },
  {
    id: "mobile-store-interface",
    title: "Mobile Store Interface",
    type: "UI",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    intro: "Shop screens, reward popups, and monetization widgets for F2P games.",
    price: "$18",
    rating: 4.4,
    features: ["45 templates", "Adaptive layout", "Localization ready"]
  },
  {
    id: "dialogue-system-runtime",
    title: "Dialogue System Runtime",
    type: "Tools",
    image: "https://images.unsplash.com/photo-1480694313141-fce5e697ee25?auto=format&fit=crop&w=900&q=80",
    intro: "Branching conversations, localization, and quest hooks for narrative games.",
    price: "$41",
    rating: 4.7,
    features: ["Node editor", "Save support", "Voice-over hooks"]
  },
  {
    id: "parkour-animation-suite",
    title: "Parkour Animation Suite",
    type: "Animations",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
    intro: "Vaults, wall-runs, climbs, slides, and landings tuned for third-person games.",
    price: "$36",
    rating: 4.6,
    features: ["96 clips", "Blend trees included", "Motion matching ready"]
  },
  {
    id: "stylized-forest-biome",
    title: "Stylized Forest Biome",
    type: "Environment",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    intro: "Trees, foliage, rocks, and terrain shaders for colorful adventure worlds.",
    price: "$37",
    rating: 4.8,
    features: ["80 prefabs", "Wind animation", "Terrain tools"]
  }
];

const ASSET_DETAILS = [
  {
    id: "neon-city-streets-pack",
    heroNote: "Best for cyberpunk cities and night scenes.",
    fullDescription:
      "A modular urban kit with roads, signs, facades, lights, and props designed for fast level assembly. The pack focuses on clean pivots, consistent texel density, and PBR materials to speed up production in both prototyping and final environments.",
    compatibility: "Unity (URP/HDRP), Unreal Engine 5",
    updateInfo: "Updated 2 weeks ago",
    fileSize: "2.1 GB",
    commentsCount: 18
  },
  {
    id: "fantasy-hero-bundle",
    heroNote: "Perfect starter set for fantasy RPGs.",
    fullDescription:
      "Contains three stylized hero characters with complete rigs and broad animation coverage. Includes combat and traversal basics, with skin variations and retarget-ready humanoid setups for easier pipeline integration.",
    compatibility: "Unity, Unreal, Blender",
    updateInfo: "Updated 1 month ago",
    fileSize: "1.7 GB",
    commentsCount: 31
  },
  {
    id: "boss-battle-sound-kit",
    heroNote: "High-energy soundtrack and SFX combo.",
    fullDescription:
      "A focused audio set for boss encounters with layered loops, impact hits, and transitions that can be chained dynamically. Delivered in game-ready formats with loop points prepared for seamless playback.",
    compatibility: "FMOD, Wwise, Unity, Unreal",
    updateInfo: "Updated 9 days ago",
    fileSize: "820 MB",
    commentsCount: 12
  },
  {
    id: "magic-spell-vfx-library",
    heroNote: "Elemental effects with quick color tuning.",
    fullDescription:
      "A library of stylized and semi-realistic spell effects, including cast, projectile, impact, and area variants. Built with scalable quality presets so teams can target both desktop and mobile tiers.",
    compatibility: "Unity VFX Graph, Unreal Niagara",
    updateInfo: "Updated 3 weeks ago",
    fileSize: "1.3 GB",
    commentsCount: 24
  }
];

function getAssetDetailById(assetId) {
  return ASSET_DETAILS.find((asset) => asset.id === assetId) || null;
}

function getAssetById(assetId) {
  return ASSET_CATALOG.find((asset) => asset.id === assetId) || null;
}

/* ===== Русские переводы для ассетов ===== */
const ASSET_RU = {
  "neon-city-streets-pack": {
    intro: "Модульные киберпанк дороги, пропсы, вывески и фасады зданий с PBR текстурами.",
    fullDescription: "Модульный городской набор с дорогами, вывесками, фасадами, освещением и пропсами, разработанный для быстрой сборки уровней. Пакет фокусируется на чистых точках опоры, согласованной плотности текселей и PBR материалах для ускорения производства как в прототипировании, так и в финальных окружениях.",
    type: "3D окружение",
    heroNote: "Лучше всего для киберпанк городов и ночных сцен.",
    compatibility: "Unity (URP/HDRP), Unreal Engine 5",
    updateInfo: "Обновлено 2 недели назад",
    fileSize: "2.1 ГБ",
    features: ["58 моделей", "4K текстуры", "Unreal + Unity готовы"]
  },
  "fantasy-hero-bundle": {
    intro: "Стилизованные рыцарь, лучник и маг с наборами анимаций ходьбы, атаки и простоя.",
    fullDescription: "Содержит трёх стилизованных героев с полными ригами и широким набором анимаций. Включает основы боя и перемещения, с вариантами кожи и настройкой под гуманоидный ретаргетинг для более простой интеграции в пайплайн.",
    type: "Персонажи",
    heroNote: "Идеальный стартовый набор для фэнтези RPG.",
    compatibility: "Unity, Unreal, Blender",
    updateInfo: "Обновлено 1 месяц назад",
    fileSize: "1.7 ГБ",
    features: ["3 героя с ригами", "120+ анимаций", "Гуманоидный ретаргетинг"]
  },
  "boss-battle-sound-kit": {
    intro: "Высокоэнергетическая музыка боевых столкновений, эффекты ударов и кинематографические переходы.",
    fullDescription: "Сфокусированный аудионабор для босс-файтов со слоями лупов, ударами и переходами, которые можно динамически комбинировать. Поставляется в игровых форматах с подготовленными точками зацикливания для бесшовного воспроизведения.",
    type: "Аудио",
    heroNote: "Высокоэнергетический саундтрек и комбинация SFX.",
    compatibility: "FMOD, Wwise, Unity, Unreal",
    updateInfo: "Обновлено 9 дней назад",
    fileSize: "820 МБ",
    features: ["34 музыкальных лупа", "90 SFX", "WAV + OGG форматы"]
  },
  "magic-spell-vfx-library": {
    intro: "Элементальные заклинания с эффектами взрывов, следами и свечением на шейдерах.",
    fullDescription: "Библиотека стилизованных и полуреалистичных эффектов заклинаний, включая варианты каста, снаряда, попадания и зоны. Построена с масштабируемыми пресетами качества, чтобы команды могли ориентироваться как на десктоп, так и на мобильные платформы.",
    type: "VFX",
    heroNote: "Эффекты с быстрой настройкой цвета.",
    compatibility: "Unity VFX Graph, Unreal Niagara",
    updateInfo: "Обновлено 3 недели назад",
    fileSize: "1.3 ГБ",
    features: ["45 эффектов", "Варианты цветов", "Пресеты производительности"]
  },
  "medieval-castle-builder": {
    intro: "Стыкующиеся стены, башни, ворота и пропсы для городов и крепостей в RPG.",
    fullDescription: "Набор для средневековых крепостей с модульными стенами, башнями, воротами и пропсами. Всё спроектировано для быстрой стыковки и создания масштабных осадных сцен.",
    type: "3D окружение",
    heroNote: "Идеально для RPG-крепостей и осад.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 1 неделю назад",
    fileSize: "2.8 ГБ",
    features: ["76 модулей", "LOD включён", "URP + HDRP"]
  },
  "sci-fi-weapons-fx-set": {
    intro: "Вспышки выстрелов, удары лучей, попадания щитов и плазменные следы для шутеров.",
    fullDescription: "Пакет эффектов для научно-фантастического оружия: вспышки, лучи, попадания щитов и плазменные траектории. Оптимизирован для шутеров с поддержкой мобильных платформ.",
    type: "VFX",
    heroNote: "Эффекты оружия для sci-fi шутеров.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 2 недели назад",
    fileSize: "980 МБ",
    features: ["62 префаба", "GPU частицы", "Мобильные пресеты"]
  },
  "ambient-worlds-collection": {
    intro: "Лесные, пещерные, городские и космические эмбиент-лупы для игр с исследованием мира.",
    fullDescription: "Коллекция атмосферных эмбиент-звуков для различных биомов. Каждый луп зациклен бесшовно и готов к использованию в игровых движках.",
    type: "Аудио",
    heroNote: "Атмосферные звуки для погружения в мир.",
    compatibility: "FMOD, Wwise, Unity, Unreal",
    updateInfo: "Обновлено 3 недели назад",
    fileSize: "1.1 ГБ",
    features: ["48 эмбиент-лупов", "Многослойные стемы", "Бесшовное зацикливание"]
  },
  "rpg-hud-pro-kit": {
    intro: "Полоски здоровья, квестовые виджеты, панели инвентаря и масштабируемые наборы иконок.",
    fullDescription: "Полный набор UI-элементов для RPG интерфейсов. Включает полоски здоровья, панели квестов, инвентарь и масштабируемые иконки.",
    type: "UI",
    heroNote: "Профессиональный HUD для RPG проектов.",
    compatibility: "Unity UI, Unreal UMG, Figma",
    updateInfo: "Обновлено 1 неделю назад",
    fileSize: "340 МБ",
    features: ["220 UI элементов", "Figma исходник", "Тёмная/светлая темы"]
  },
  "level-design-toolkit": {
    intro: "Привязка к сетке, процедурная расстановка и рандомизация префабов для быстрого блок-аута.",
    fullDescription: "Набор инструментов для ускорения левел-дизайна. Включает привязку к сетке, процедурную расстановку и рандомизатор префабов.",
    type: "Инструменты",
    heroNote: "Ускорьте блок-аут уровней в разы.",
    compatibility: "Unity Editor, Unreal Editor",
    updateInfo: "Обновлено 5 дней назад",
    fileSize: "120 МБ",
    features: ["Расширения редактора", "Пакетный воркфлоу", "Документация"]
  },
  "melee-combat-motion-pack": {
    intro: "Комбо-цепочки, уклонения, парирования и добивания для мечей и парного оружия.",
    fullDescription: "Полный набор анимаций ближнего боя с комбо-цепочками, уклонениями, парированиями и добиваниями. Оптимизирован для игр от третьего лица.",
    type: "Анимации",
    heroNote: "Полная система ближнего боя.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 2 недели назад",
    fileSize: "1.9 ГБ",
    features: ["180 клипов", "Root motion варианты", "Гуманоидный риг"]
  },
  "survival-props-mega-pack": {
    intro: "Палатки, ящики, кемпинговое снаряжение и промышленный хлам для реалистичного мира.",
    fullDescription: "Огромный набор пропсов для выживания: палатки, ящики, снаряжение и промышленный хлам. Всё с PBR материалами и готовыми UV.",
    type: "3D пропсы",
    heroNote: "Мега-набор для реалистичных миров.",
    compatibility: "Unity, Unreal Engine 5, Blender",
    updateInfo: "Обновлено 1 месяц назад",
    fileSize: "2.3 ГБ",
    features: ["140 пропсов", "PBR материалы", "Game-ready UV"]
  },
  "weather-fx-controller": {
    intro: "Системы дождя, снега, тумана, молний и ветра с смешиванием по времени суток.",
    fullDescription: "Контроллер погодных систем с поддержкой дождя, снега, тумана, молний и ветра. Включает смешивание по времени суток и профили производительности.",
    type: "VFX",
    heroNote: "Полная система погоды для открытых миров.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 3 недели назад",
    fileSize: "1.5 ГБ",
    features: ["12 погодных профилей", "Поддержка Timeline", "LOD производительности"]
  },
  "mobile-store-interface": {
    intro: "Экраны магазина, всплывающие окна наград и виджеты монетизации для F2P игр.",
    fullDescription: "UI-набор для мобильных F2P игр: экраны магазина, всплывающие окна наград, виджеты монетизации. Адаптивная вёрстка и поддержка локализации.",
    type: "UI",
    heroNote: "Интерфейс магазина для мобильных F2P.",
    compatibility: "Unity UI, Unreal UMG",
    updateInfo: "Обновлено 2 недели назад",
    fileSize: "280 МБ",
    features: ["45 шаблонов", "Адаптивная вёрстка", "Локализация готова"]
  },
  "dialogue-system-runtime": {
    intro: "Ветвящиеся диалоги, локализация и зацепки для квестов в нарративных играх.",
    fullDescription: "Система диалогов с ветвлениями, поддержкой локализации и интеграцией квестовых зацепок. Включает нодовый редактор и поддержку сохранений.",
    type: "Инструменты",
    heroNote: "Мощная система диалогов для нарративных игр.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 1 неделю назад",
    fileSize: "450 МБ",
    features: ["Нодовый редактор", "Поддержка сохранений", "Голосовые зацепки"]
  },
  "parkour-animation-suite": {
    intro: "Прыжки, бег по стенам, подъёмы, скольжения и приземления для игр от третьего лица.",
    fullDescription: "Набор анимаций паркура: прыжки, бег по стенам, подъёмы, скольжения и приземления. Оптимизирован для игр от третьего лица с деревьями смешивания.",
    type: "Анимации",
    heroNote: "Паркур анимации для第三人-игр.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 2 недели назад",
    fileSize: "1.6 ГБ",
    features: ["96 клипов", "Деревья смешивания", "Motion matching готов"]
  },
  "stylized-forest-biome": {
    intro: "Деревья, растительность, камни и шейдеры ландшафта для красочных приключенческих миров.",
    fullDescription: "Стилизованный лесной биом с деревьями, растительностью, камнями и шейдерами ландшафта. Включает анимацию ветра и инструменты для террейна.",
    type: "Окружение",
    heroNote: "Красочный лес для приключенческих миров.",
    compatibility: "Unity, Unreal Engine 5",
    updateInfo: "Обновлено 1 месяц назад",
    fileSize: "2.5 ГБ",
    features: ["80 префабов", "Анимация ветра", "Инструменты террейна"]
  }
};

function getAssetRu(assetId) {
  return ASSET_RU[assetId] || null;
}
