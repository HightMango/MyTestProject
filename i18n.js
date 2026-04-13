/* ===== Переводы ===== */
const TRANSLATIONS = {
  ru: {
    /* Навигация */
    nav_games: "Игры",
    nav_forum: "Форум",
    nav_study: "Учебные материалы",
    back_store: "← Назад в магазин",
    search_placeholder: "Поиск ассетов, инструментов, категорий...",

    /* Главная */
    hero_title: "GameLab",
    hero_subtitle: "Премиум ассеты для инди и AAA проектов.",
    featured_title: "Популярные ассеты",
    featured_desc: "Просматривайте по типу слева или ищите по ключевым словам.",
    asset_types: "Типы ассетов",
    all_assets: "Все ассеты",
    models_3d: "3D модели",
    environments: "Окружения",
    characters: "Персонажи",
    vfx: "VFX",
    audio: "Аудио",
    ui: "Интерфейсы",
    tools: "Инструменты",
    animations: "Анимации",
    sort_by: "Сортировка",
    sort_featured: "Популярные",
    sort_price_asc: "Цена: по возрастанию",
    sort_price_desc: "Цена: по убыванию",
    sort_rating_desc: "Рейтинг: по убыванию",
    sort_rating_asc: "Рейтинг: по возрастанию",
    view: "Просмотр",

    /* Описания ассетов */
    asset_neon_desc: "Модульные киберпанк дороги, пропсы, вывески и фасады зданий с PBR текстурами.",
    asset_fantasy_desc: "Стилизованные рыцарь, лучник и маг с наборами анимаций ходьбы, атаки и простоя.",
    asset_boss_desc: "Высокоэнергетическая музыка боевых столкновений, эффекты ударов и кинематографические переходы.",
    asset_magic_desc: "Элементальные заклинания с эффектами взрывов, следами и свечением на шейдерах.",
    asset_castle_desc: "Стыкующиеся стены, башни, ворота и пропсы для городов и крепостей в RPG.",
    asset_scifi_desc: "Вспышки выстрелов, удары лучей, попадания щитов и плазменные следы для шутеров.",
    asset_ambient_desc: "Лесные, пещерные, городские и космические эмбиент-лупы для игр с исследованием мира.",
    asset_rpg_desc: "Полоски здоровья, квестовые виджеты, панели инвентаря и масштабируемые наборы иконок.",
    asset_level_desc: "Привязка к сетке, процедурная расстановка и рандомизация префабов для быстрого блок-аута.",
    asset_melee_desc: "Комбо-цепочки, уклонения, парирования и добивания для мечей и парного оружия.",
    asset_survival_desc: "Палатки, ящики, кемпинговое снаряжение и промышленный хлам для реалистичного мира.",
    asset_weather_desc: "Системы дождя, снега, тумана, молний и ветра с смешиванием по времени суток.",
    asset_mobile_desc: "Экраны магазина, всплывающие окна наград и виджеты монетизации для F2P игр.",
    asset_dialogue_desc: "Ветвящиеся диалоги, локализация и зацепки для квестов в нарративных играх.",
    asset_parkour_desc: "Прыжки, бег по стенам, подъёмы, скольжения и приземления для игр от третьего лица.",
    asset_forest_desc: "Деревья, растительность, камни и шейдеры ландшафта для красочных приключенческих миров.",

    /* Теги типов ассетов */
    tag_3d_environment: "3D окружение",
    tag_characters: "Персонажи",
    tag_audio: "Аудио",
    tag_vfx: "VFX",
    tag_ui: "UI",
    tag_tools: "Инструменты",
    tag_animations: "Анимации",
    tag_3d_props: "3D пропсы",
    tag_environment: "Окружение",

    /* Профиль */
    profile_title: "Профиль GameLab",
    profile_head: "Мой профиль",
    profile_desc: "Управляйте био и просматривайте недавние ассеты.",
    account: "Аккаунт",
    name_label: "Имя",
    email_label: "Почта",
    bio_section: "Биография",
    bio_label: "О себе",
    bio_placeholder: "Расскажите немного о себе...",
    bio_save: "Сохранить",
    recent_assets: "Недавние ассеты",
    no_recent: "Пока нет просмотренных ассетов.",
    logout: "Выйти",

    /* Настройки */
    settings: "Настройки",
    language: "Язык",
    theme: "Тема",
    theme_dark: "Тёмная",
    theme_light: "Светлая",

    /* Авторизация */
    auth_title: "Аккаунт GameLab",
    auth_head: "Добро пожаловать в GameLab",
    auth_desc: "Войдите или создайте аккаунт.",
    tab_login: "Вход",
    tab_register: "Регистрация",
    login_email: "Почта",
    login_email_ph: "you@example.com",
    login_password: "Пароль",
    login_password_ph: "Введите пароль",
    remember_me: "Запомнить меня",
    forgot_password: "Забыли пароль?",
    sign_in: "Войти",
    register_name: "Полное имя",
    register_name_ph: "Ваше полное имя",
    register_email: "Почта",
    register_email_ph: "you@example.com",
    register_password: "Пароль",
    register_password_ph: "Придумайте пароль",
    consent_text: 'Я согласен с <a href="#" class="policy-link">Политикой конфиденциальности</a> и <a href="#" class="policy-link">Условиями использования</a>',
    create_account: "Создать аккаунт",
    or_continue: "или продолжить через",

    /* Игры */
    games_title: "Витрина игр GameLab",
    games_head: "Витрина игр",
    games_desc: "Здесь вы можете опубликовать свой проект, чтобы пользователи оценили вашу игру и дали обратную связь.",
    publish_game: "Опубликовать игру",
    archive_label: "Архив",
    installed_label: "После установки",
    details: "Подробнее",

    /* Описания игр */
    game_cyber_desc: "Открытый мир в стиле киберпанк-RPG с ветвящимися сюжетами и динамичным боем.",
    game_kingdoms_desc: "Средневековая стратегия с постройкой базы и масштабными сражениями.",
    game_neon_desc: "Аркадные гонки с синтвейв-саундтреком и механикой дрифта.",
    game_starbound_desc: "Космическое выживание с крафтом, исследованием и поддержкой мультиплеера.",
    game_pixel_desc: "Рогалик в ретро-стиле с процедурной генерацией уровней подземелий.",
    game_shadow_desc: "Тактический шутер от третьего лица с кооперативной кампанией.",

    /* Форум */
    forum_title: "Форум GameLab",
    online_users: "Пользователи онлайн",
    online_count: "пользователей онлайн",
    general_chat: "Общий чат",
    chat_live: "В эфире",
    chat_placeholder: "Введите сообщение...",
    chat_send: "Отправить",

    /* Учебные материалы */
    study_title: "Учебные материалы GameLab",
    study_head: "Учебные материалы",
    study_desc: "Подобранные ресурсы для изучения геймдева — от новичка до продвинутого.",
    study_all: "Все",
    study_engines: "Движки",
    study_docs: "Документация",
    study_videos: "Видеоуроки",
    study_communities: "Сообщества",
    study_tools: "Инструменты",

    /* Публикация */
    publish_title_page: "Опубликовать игру GameLab",
    publish_head: "Опубликовать игру",
    publish_desc: "Заполните все обязательные поля, чтобы отправить проект на модерацию.",
    basic_info: "Основная информация",
    game_title: "Название игры",
    game_title_ph: "Введите название игры",
    game_desc_label: "Описание",
    game_desc_ph: "Опишите игру, жанр, особенности и что делает её уникальной...",
    genre_label: "Жанр",
    genre_select: "Выберите жанр",
    genre_action: "Экшен",
    genre_rpg: "RPG",
    genre_strategy: "Стратегия",
    genre_adventure: "Приключение",
    genre_simulation: "Симуляция",
    genre_puzzle: "Головоломка",
    genre_platformer: "Платформер",
    genre_horror: "Хоррор",
    genre_racing: "Гонки",
    genre_sports: "Спорт",
    genre_other: "Другое",
    files_media: "Файлы и медиа",
    game_archive: "Архив игры (ZIP / RAR)",
    file_hint_archive: "Макс. размер архива: 10 ГБ",
    cover_image: "Обложка",
    file_hint_cover: "Рекомендуется: соотношение 16:9, PNG или JPG",
    screenshots: "Скриншоты (до 5)",
    file_hint_screenshots: "Загрузите 2-5 скриншотов вашей игры",
    sys_requirements: "Системные требования",
    min_requirements: "Минимальные требования",
    rec_requirements: "Рекомендуемые требования",
    os_label: "ОС",
    os_min_ph: "напр. Windows 10 64-bit",
    os_rec_ph: "напр. Windows 11 64-bit",
    cpu_label: "Процессор",
    cpu_min_ph: "напр. Intel i5-8400 / AMD Ryzen 5 2600",
    cpu_rec_ph: "напр. Intel i7-10700 / AMD Ryzen 7 5800X",
    ram_label: "ОЗУ",
    ram_min_ph: "напр. 8 ГБ",
    ram_rec_ph: "напр. 16 ГБ",
    gpu_label: "Видеокарта",
    gpu_min_ph: "напр. GTX 1060 / RX 580",
    gpu_rec_ph: "напр. RTX 3060 / RX 6700 XT",
    storage_label: "Хранилище",
    storage_min_ph: "напр. 10 ГБ",
    storage_rec_ph: "напр. 10 ГБ SSD",
    additional_notes: "Дополнительные заметки",
    additional_placeholder: "Версия DirectX, сеть и т.д.",
    additional_info: "Дополнительная информация",
    engine_label: "Игровой движок",
    engine_ph: "напр. Unreal Engine 5, Unity, Godot",
    project_link: "Ссылка на проект / магазин (необязательно)",
    link_ph: "https://...",
    trailer_link: "Ссылка на трейлер (необязательно)",
    consent_rules: "Я подтверждаю, что игра соблюдает <a href='#' class='policy-link'>правила сообщества</a> и не содержит запрещённого контента",
    submit_moderation: "Отправить на модерацию",
    publish_feedback_please: "Пожалуйста, заполните все обязательные поля и примите правила.",
    publish_feedback_success: 'Ваша игра "{title}" отправлена на модерацию. Вы получите уведомление по завершении проверки.',

    /* Страница деталей игры */
    game_detail_title: "Детали игры",
    back_games: "← Назад к играм",
    loading_game: "Загрузка игры...",
    publisher_label: "Издатель",
    rating_label_game: "Рейтинг",
    release_label: "Дата выхода",
    archive_size_label: "Размер архива",
    installed_size_label: "Размер установки",
    platform_label: "Платформа",
    multiplayer_label: "Мультиплеер",
    screenshots_title: "Скриншоты",
    system_requirements: "Системные требования",
    requirements_minimum: "Минимальные",
    requirements_recommended: "Рекомендуемые",
    req_os: "ОС",
    req_cpu: "Процессор",
    req_ram: "ОЗУ",
    req_gpu: "Видеокарта",
    req_storage: "Хранилище",
    download_btn: "Скачать",
    /* Cyber Odyssey */
    game_cyber_intro: "RPG с открытым миром в сеттинге киберпанка с ветвящимися сюжетами и динамичным боем.",
    game_cyber_full: "Погрузитесь в неоновые улицы Нео-Токио в этой захватывающей киберпанк-RPG. Cyber Odyssey предлагает богатый нарратив с глубокой кастомизацией персонажа, ветвящимися квестами и динамичной боевой системой, адаптирующейся к вашему стилю игры. Исследуйте обширный открытый мир, полный скрытых секретов, корпоративных заговоров и незабываемых персонажей. Каждый выбор имеет значение, и каждый путь ведёт к уникальной судьбе.",
    /* Kingdoms of Ash */
    game_kingdoms_intro: "Средневековая стратегия с постройкой базы и масштабными сражениями.",
    game_kingdoms_full: "Ведите своё королевство сквозь эпохи завоеваний и дипломатии. Стройте могучие крепости, тренируйте легендарные армии и заключайте альянсы в этой эпической средневековой стратегии. С процедурно генерируемыми кампаниями и тактическими сражениями в реальном времени каждая партия предлагает новые испытания. Будете ли вы править с честью или завоюете всё огнём и мечом?",
    /* Neon Drift */
    game_neon_intro: "Аркадные гонки с синтвейв-саундтреком и механикой дрифта.",
    game_neon_full: "Почувствуйте азарт скоростных гонок по неоновым городским пейзажам. Neon Drift сочетает точную механику дрифта с невероятным синтвейв-саундтреком, создавая незабываемый гоночный опыт. Освойте 20 уникальных трасс, настройте свой болид и поднимайтесь в глобальных таблицах лидеров в этом любовном письме аркадным гонщикам 80-х.",
    /* Starbound Survivors */
    game_starbound_intro: "Космическое выживание с крафтом, исследованием и поддержкой мультиплеера.",
    game_starbound_full: "Затерянные в неизведанной звёздной системе выживание — это только начало. Исследуйте процедурно генерируемые планеты, собирайте ресурсы, создавайте передовые технологии и стройте базу среди звёзд. С бесшовным кооперативным мультиплеером вы можете объединиться с друзьями против инопланетных угроз, обнаружить древние артефакты и раскрыть тайны космоса.",
    /* Pixel Dungeon Quest */
    game_pixel_intro: "Рогалик в ретро-стиле с процедурной генерацией уровней подземелий.",
    game_pixel_full: "Спуститесь в вечно меняющиеся глубины Пиксельного подземелья в этом затягивающем рогалике. С процедурно генерируемыми уровнями, перманентной смертью и сотнями уникальных предметов для обнаружения ни два забега не одинаковы. Освойте 8 классов персонажей, сразитесь с свирепыми боссами и откройте секретные комнаты в этом любовном письме классическим подземным приключениям.",
    /* Shadow Protocol */
    game_shadow_intro: "Тактический шутер от третьего лица с кооперативной кампанией.",
    game_shadow_full: "В мире тайных операций и миссий с высокими ставками Shadow Protocol ставит вас во главе элитной команды чёрных операций. Планируйте подход, выполняйте точные удары и адаптируйтесь к динамичным целям в этой тактической стелс-экшен игре. Кооперативная кампания поддерживает до 4 игроков, позволяя координировать сложные многовекторные штурмы или незаметно проскальзывать сквозь линии врага.",
    game_genre_rpg_open: "RPG / Открытый мир",
    game_genre_strategy_medieval: "Стратегия / Средневековье",
    game_genre_racing_arcade: "Гонки / Аркада",
    game_genre_survival_space: "Выживание / Космос",
    game_genre_roguelike_retro: "Рогалик / Ретро",
    game_genre_stealth_tactical: "Стелс-экшен / Тактика",
    rate_game: "Оцените игру",
    rate_preview_note: "Визуальный блок — логика рейтинга будет подключена позже.",
    select_rating: "Выберите оценку",
    rating_poor: "Плохо",
    rating_fair: "Средне",
    rating_good: "Хорошо",
    rating_very_good: "Очень хорошо",
    rating_excellent: "Отлично!",
    comments_feedback: "Комментарии и отзывы",
    comments_hint: "Поделитесь своим опытом об этой игре.",
    comment_game_placeholder: "Поделитесь мнением об этой игре...",

    /* Учебные материалы — описания карточек */
    study_unity_desc: "Популярный кроссплатформенный движок для 2D и 3D проектов. Поддерживает скрипты на C#, URP, HDRP и имеет обширный Asset Store.",
    study_unreal_desc: "Двиок AAA-класса с Nanite, Lumen и визуальным программированием Blueprints. Используется в Fortnite, PUBG и многих AAA-проектах.",
    study_godot_desc: "Бесплатный движок с открытым исходным кодом для 2D/3D с собственным языком GDScript. Лёгкий, разрабатывается сообществом, отлично подходит для инди-проектов.",
    study_unity_docs_desc: "Официальная справка по API скриптов Unity, руководство и материалы по всем подсистемам движка.",
    study_unreal_docs_desc: "Полная документация UE5, охватывающая C++ API, Blueprints, рендеринг, анимацию и многое другое.",
    study_godot_docs_desc: "Подробное руководство Godot с пошаговыми уроками, справочником GDScript и документацией классов.",
    study_csharp_desc: "Официальная документация Microsoft по C# — необходима для скриптов Unity и .NET разработки игр.",
    study_cpp_desc: "Справочник по C++ для нативной разработки в Unreal Engine и низкоуровневого программирования игр.",
    study_lua_desc: "Справочник по скриптам Lua — используется в Defold, Roblox и многих моддинг-сообществах.",
    study_brackeys_desc: "Один из самых популярных каналов по Unity. Охватывает основы и продвинутые темы в ясном, лаконичном стиле.",
    study_unreal_sensei_desc: "Глубокие уроки по Unreal Engine — от вводных курсов до продвинутого создания окружения и персонажей.",
    study_gdquest_desc: "Качественные уроки по Godot, охватывающие 2D, 3D, GDScript, шейдеры и паттерны архитектуры игр.",
    study_code_monkey_desc: "Практические уроки по Unity с полными проектами игр, паттернами чистой архитектуры и советами.",
    study_ryan_laley_desc: "Уроки по Blueprints Unreal Engine — системы инвентаря, ИИ, квесты и механики диалогов.",
    study_game_dev_arts_desc: "Креативный контент по разработке игр — шейдеры, VFX, процедурная генерация и визуальное программирование.",
    study_stackoverflow_desc: "Платформа вопросов и ответов по программированию. Тысячи ответов с тгом разработки игр.",
    study_reddit_desc: "Активный сабреддит для разработчиков игр. Делитесь проектами, получайте отзывы, обсуждайте новости индустрии.",
    study_discord_desc: "Чат в реальном времени с разработчиками игр. Получайте мгновенную помощь, сотрудничайте и делитесь прогрессом.",
    study_blender_desc: "Бесплатный пакет для 3D-творчества с открытым исходным кодом. Моделируйте, скульптурируйте, анимируйте и экспортируйте ассеты для игр.",
    study_gimp_desc: "Бесплатный графический редактор для создания текстур, редактирования спрайтов и подготовки 2D-ассетов.",
    study_audacity_desc: "Бесплатный кроссплатформенный аудио-редактор. Записывайте, редактируйте и экспортируйте звуковые эффекты для игр.",
    study_figma_desc: "Инструмент совместного дизайна UI/UX. Идеально подходит для прототипирования интерфейсов и HUD игр.",

    /* Футер */
    footer_copy: "© 2026 GameLab. Все права защищены.",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия использования",
    footer_support: "Поддержка",

    /* Страница ассета */
    asset_details_title: "Детали ассета",
    back_catalog: "← Назад в каталог",
    asset_type_label: "Тип ассета",
    loading_asset: "Загрузка ассета...",
    price_label: "Цена",
    rating_label: "Рейтинг",
    compatibility_label: "Совместимость",
    file_size_label: "Размер файла",
    last_update_label: "Последнее обновление",
    asset_rating: "Рейтинг ассета",
    rating_preview_note: "Только визуальный блок, логика рейтинга будет подключена позже.",
    rating_votes: "голосов",
    comments_section: "Комментарии",
    comments_placeholder: "Подготовлен визуальный блок. Можно подключить API/хранилище позже.",
    comment_label: "Напишите комментарий",
    comment_placeholder: "Поделитесь мнением об этом ассете...",
    comment_publish: "Опубликовать (скоро)",
    comment_ago_days: "дн. назад",
    comment_ago_week: "нед. назад",
  },
  en: {
    nav_games: "Games",
    nav_forum: "Forum",
    nav_study: "Study materials",
    back_store: "← Back to store",
    search_placeholder: "Search assets, tools, categories...",

    hero_title: "GameLab",
    hero_subtitle: "Premium assets for indie and AAA game projects.",
    featured_title: "Featured Game Assets",
    featured_desc: "Browse by type on the left or search by keyword to find the right pack faster.",
    asset_types: "Asset Types",
    all_assets: "All assets",
    models_3d: "3D Models",
    environments: "Environments",
    characters: "Characters",
    vfx: "VFX",
    audio: "Audio",
    ui: "UI",
    tools: "Tools",
    animations: "Animations",
    sort_by: "Sort by",
    sort_featured: "Featured",
    sort_price_asc: "Price: Low to High",
    sort_price_desc: "Price: High to Low",
    sort_rating_desc: "Rating: High to Low",
    sort_rating_asc: "Rating: Low to High",
    view: "View",

    /* Asset descriptions */
    asset_neon_desc: "Modular cyberpunk roads, props, signs, and building fronts with PBR textures.",
    asset_fantasy_desc: "Stylized knight, archer, and mage with walk, attack, and idle animation sets.",
    asset_boss_desc: "High-energy combat music loops, hit effects, and cinematic transition stingers.",
    asset_magic_desc: "Elemental spells with impact bursts, trail effects, and shader-based glows.",
    asset_castle_desc: "Snap-fit walls, towers, gates, and props for RPG towns and fortress scenes.",
    asset_scifi_desc: "Muzzle flashes, beam impacts, shield hits, and plasma trails for shooters.",
    asset_ambient_desc: "Forest, cave, city, and space ambience loops for immersive exploration games.",
    asset_rpg_desc: "Health bars, quest widgets, inventory panels, and scalable icon packs.",
    asset_level_desc: "Grid snapping, procedural placement, and prefab randomizer for faster blockouts.",
    asset_melee_desc: "Combo chains, dodges, parries, and finishers for swords and dual-wield sets.",
    asset_survival_desc: "Tents, crates, camp gear, and industrial clutter for realistic world building.",
    asset_weather_desc: "Rain, snow, fog, lightning, and wind systems with time-of-day blending.",
    asset_mobile_desc: "Shop screens, reward popups, and monetization widgets for F2P games.",
    asset_dialogue_desc: "Branching conversations, localization, and quest hooks for narrative games.",
    asset_parkour_desc: "Vaults, wall-runs, climbs, slides, and landings tuned for third-person games.",
    asset_forest_desc: "Trees, foliage, rocks, and terrain shaders for colorful adventure worlds.",

    /* Asset type tags */
    tag_3d_environment: "3D Environment",
    tag_characters: "Characters",
    tag_audio: "Audio",
    tag_vfx: "VFX",
    tag_ui: "UI",
    tag_tools: "Tools",
    tag_animations: "Animations",
    tag_3d_props: "3D Props",
    tag_environment: "Environment",

    profile_title: "GameLab Profile",
    profile_head: "My Profile",
    profile_desc: "Manage your public bio and view recently opened assets.",
    account: "Account",
    name_label: "Name",
    email_label: "Email",
    bio_section: "Bio",
    bio_label: "About you",
    bio_placeholder: "Tell a few words about yourself...",
    bio_save: "Save bio",
    recent_assets: "Recently viewed assets",
    no_recent: "No recently viewed assets yet.",
    logout: "Log out",

    settings: "Settings",
    language: "Language",
    theme: "Theme",
    theme_dark: "Dark",
    theme_light: "Light",

    auth_title: "GameLab Account",
    auth_head: "Welcome to GameLab",
    auth_desc: "Sign in to your account or create a new one.",
    tab_login: "Login",
    tab_register: "Register",
    login_email: "Email",
    login_email_ph: "you@example.com",
    login_password: "Password",
    login_password_ph: "Enter your password",
    remember_me: "Remember me",
    forgot_password: "Forgot password?",
    sign_in: "Sign In",
    register_name: "Full name",
    register_name_ph: "Your full name",
    register_email: "Email",
    register_email_ph: "you@example.com",
    register_password: "Password",
    register_password_ph: "Create a password",
    consent_text: 'I agree to the <a href="#" class="policy-link">Privacy Policy</a> and <a href="#" class="policy-link">Terms of Service</a>',
    create_account: "Create Account",
    or_continue: "or continue with",

    games_title: "GameLab - Games Showcase",
    games_head: "Games Showcase",
    games_desc: "This is the place where you can publish your project so users can rate your game and give you feedback on whether your game is good or needs improvement.",
    publish_game: "Publish your game",
    archive_label: "Archive",
    installed_label: "Installed",
    details: "Details",

    /* Game descriptions */
    game_cyber_desc: "An open-world cyberpunk RPG with branching storylines and dynamic combat.",
    game_kingdoms_desc: "Medieval strategy game with base building and large-scale battles.",
    game_neon_desc: "Arcade racing game with synthwave soundtrack and drifting mechanics.",
    game_starbound_desc: "Space survival with crafting, exploration, and multiplayer support.",
    game_pixel_desc: "Retro-style roguelike dungeon crawler with procedural level generation.",
    game_shadow_desc: "Stealth-action tactical shooter with cooperative campaign.",

    forum_title: "GameLab Forum",
    online_users: "Online Users",
    online_count: "users online",
    general_chat: "General Chat",
    chat_live: "Live",
    chat_placeholder: "Type a message...",
    chat_send: "Send",

    study_title: "GameLab - Study Materials",
    study_head: "Study Materials",
    study_desc: "Curated resources to help you learn game development — from beginner guides to advanced tutorials and official documentation.",
    study_all: "All",
    study_engines: "Engines",
    study_docs: "Documentation",
    study_videos: "Video Tutorials",
    study_communities: "Communities",
    study_tools: "Tools",

    publish_title_page: "GameLab - Publish Your Game",
    publish_head: "Publish Your Game",
    publish_desc: "Fill in all required fields to submit your project for moderation. Make sure your game meets the requirements before submitting.",
    basic_info: "Basic Information",
    game_title: "Game Title",
    game_title_ph: "Enter your game title",
    game_desc_label: "Description",
    game_desc_ph: "Describe your game, its genre, features, and what makes it unique...",
    genre_label: "Genre",
    genre_select: "Select a genre",
    genre_action: "Action",
    genre_rpg: "RPG",
    genre_strategy: "Strategy",
    genre_adventure: "Adventure",
    genre_simulation: "Simulation",
    genre_puzzle: "Puzzle",
    genre_platformer: "Platformer",
    genre_horror: "Horror",
    genre_racing: "Racing",
    genre_sports: "Sports",
    genre_other: "Other",
    files_media: "Files & Media",
    game_archive: "Game Archive (ZIP / RAR)",
    file_hint_archive: "Max archive size: 10 GB",
    cover_image: "Cover Image",
    file_hint_cover: "Recommended: 16:9 ratio, PNG or JPG",
    screenshots: "Screenshots (up to 5)",
    file_hint_screenshots: "Upload 2-5 screenshots of your game",
    sys_requirements: "System Requirements",
    min_requirements: "Minimum Requirements",
    rec_requirements: "Recommended Requirements",
    os_label: "OS",
    os_min_ph: "e.g. Windows 10 64-bit",
    os_rec_ph: "e.g. Windows 11 64-bit",
    cpu_label: "Processor",
    cpu_min_ph: "e.g. Intel i5-8400 / AMD Ryzen 5 2600",
    cpu_rec_ph: "e.g. Intel i7-10700 / AMD Ryzen 7 5800X",
    ram_label: "RAM",
    ram_min_ph: "e.g. 8 GB",
    ram_rec_ph: "e.g. 16 GB",
    gpu_label: "Graphics Card",
    gpu_min_ph: "e.g. GTX 1060 / RX 580",
    gpu_rec_ph: "e.g. RTX 3060 / RX 6700 XT",
    storage_label: "Storage",
    storage_min_ph: "e.g. 10 GB available space",
    storage_rec_ph: "e.g. 10 GB SSD",
    additional_notes: "Additional Notes",
    additional_placeholder: "DirectX version, network, etc.",
    additional_info: "Additional Information",
    engine_label: "Game Engine",
    engine_ph: "e.g. Unreal Engine 5, Unity, Godot",
    project_link: "Project / Store Link (optional)",
    link_ph: "https://...",
    trailer_link: "Trailer Video URL (optional)",
    consent_rules: "I confirm that this game follows <a href='#' class='policy-link'>community rules</a> and does not contain prohibited content",
    submit_moderation: "Submit for Moderation",
    publish_feedback_please: "Please fill in all required fields and accept the rules.",
    publish_feedback_success: 'Your game "{title}" has been submitted for moderation. You will be notified when the review is complete.',

    /* Game detail page */
    game_detail_title: "Game Details",
    back_games: "← Back to games",
    loading_game: "Loading game...",
    publisher_label: "Publisher",
    rating_label_game: "Rating",
    release_label: "Release date",
    archive_size_label: "Archive size",
    installed_size_label: "Installed size",
    platform_label: "Platform",
    multiplayer_label: "Multiplayer",
    screenshots_title: "Screenshots",
    system_requirements: "System Requirements",
    requirements_minimum: "Minimum",
    requirements_recommended: "Recommended",
    req_os: "OS",
    req_cpu: "CPU",
    req_ram: "RAM",
    req_gpu: "GPU",
    req_storage: "Storage",
    download_btn: "Download",
    rate_game: "Rate this game",
    rate_preview_note: "Visual preview — rating logic can be connected later.",
    select_rating: "Select your rating",
    rating_poor: "Poor",
    rating_fair: "Fair",
    rating_good: "Good",
    rating_very_good: "Very Good",
    rating_excellent: "Excellent!",
    comments_feedback: "Comments & Feedback",
    comments_hint: "Share your experience about this game.",
    comment_game_placeholder: "Share your feedback about this game...",

    footer_copy: "© 2026 GameLab. All rights reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_support: "Support",

    /* Asset detail page */
    asset_details_title: "Asset Details",
    back_catalog: "← Back to catalog",
    asset_type_label: "Asset type",
    loading_asset: "Loading asset...",
    price_label: "Price",
    rating_label: "Rating",
    compatibility_label: "Compatibility",
    file_size_label: "File size",
    last_update_label: "Last update",
    asset_rating: "Asset Rating",
    rating_preview_note: "UI only for now, rating logic can be connected later.",
    rating_votes: "votes",
    comments_section: "Comments",
    comments_placeholder: "Prepared visual block. You can connect API/storage later.",
    comment_label: "Write your comment",
    comment_placeholder: "Share your feedback about this asset...",
    comment_publish: "Publish (soon)",
    comment_ago_days: "days ago",
    comment_ago_week: "week ago",
  }
};

/* ===== Управление языком ===== */
function getLang() {
  return localStorage.getItem("gamelab_lang") || "ru";
}

function setLang(lang) {
  localStorage.setItem("gamelab_lang", lang);
  document.documentElement.lang = lang;
}

function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || key;
}

/* ===== Управление темой ===== */
function getTheme() {
  return localStorage.getItem("gamelab_theme") || "dark";
}

function setTheme(theme) {
  localStorage.setItem("gamelab_theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

/* ===== Применить переводы ===== */
function applyTranslations() {
  const lang = getLang();

  // Навигация
  const navGames = document.querySelector('.top-nav .btn-nav[href="games.html"]');
  const navForum = document.querySelector('.top-nav .btn-nav[href="forum.html"]');
  const navStudy = document.querySelector('.top-nav .btn-nav[href="study.html"]');
  if (navGames) navGames.textContent = t("nav_games");
  if (navForum) navForum.textContent = t("nav_forum");
  if (navStudy) navStudy.textContent = t("nav_study");

  // Поиск
  const searchInput = document.querySelector(".search-input");
  if (searchInput) searchInput.placeholder = t("search_placeholder");

  // Back link
  document.querySelectorAll(".back-link").forEach(el => {
    el.textContent = t("back_store");
  });

  // Профиль
  const profileHead = document.querySelector(".profile-head h1");
  const profileDesc = document.querySelector(".profile-head p");
  if (profileHead) profileHead.textContent = t("profile_head");
  if (profileDesc) profileDesc.textContent = t("profile_desc");

  // Панели профиля
  const accountLabel = document.querySelector('[aria-label="Account details"] h2');
  if (accountLabel) accountLabel.textContent = t("account");

  const bioLabel = document.querySelector('[aria-label="Profile bio"] h2');
  if (bioLabel) bioLabel.textContent = t("bio_section");
  const aboutLabel = document.querySelector("label[for='bio-input']");
  if (aboutLabel) aboutLabel.textContent = t("bio_label");
  const bioInput = document.getElementById("bio-input");
  if (bioInput) {
    bioInput.placeholder = t("bio_placeholder");
  }
  const bioSave = document.querySelector("#bio-form .btn");
  if (bioSave) bioSave.textContent = t("bio_save");

  const recentLabel = document.querySelector('[aria-label="Recent asset views"] h2');
  if (recentLabel) recentLabel.textContent = t("recent_assets");
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.textContent = t("logout");

  // Настройки
  const settingsTitle = document.querySelector(".settings-panel h2");
  if (settingsTitle) settingsTitle.textContent = t("settings");
  const langLabel = document.querySelector(".settings-panel label[for='lang-select']");
  if (langLabel) langLabel.textContent = t("language");
  const themeLabel = document.querySelector(".settings-panel label[for='theme-toggle']");
  if (themeLabel) themeLabel.textContent = t("theme");
  const themeDarkOpt = document.querySelector(".settings-panel .theme-option[data-theme='dark']");
  const themeLightOpt = document.querySelector(".settings-panel .theme-option[data-theme='light']");
  if (themeDarkOpt) themeDarkOpt.querySelector("span").textContent = t("theme_dark");
  if (themeLightOpt) themeLightOpt.querySelector("span").textContent = t("theme_light");

  // Авторизация
  const authHead = document.querySelector(".auth-head h1");
  const authDesc = document.querySelector(".auth-head p");
  if (authHead) authHead.textContent = t("auth_head");
  if (authDesc) authDesc.textContent = t("auth_desc");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  if (tabLogin) tabLogin.textContent = t("tab_login");
  if (tabRegister) tabRegister.textContent = t("tab_register");

  const loginEmail = document.querySelector("label[for='login-email']");
  if (loginEmail) loginEmail.textContent = t("login_email");
  const loginEmailInput = document.getElementById("login-email");
  if (loginEmailInput) loginEmailInput.placeholder = t("login_email_ph");
  const loginPassword = document.querySelector("label[for='login-password']");
  if (loginPassword) loginPassword.textContent = t("login_password");
  const loginPasswordInput = document.getElementById("login-password");
  if (loginPasswordInput) loginPasswordInput.placeholder = t("login_password_ph");
  const rememberMe = document.querySelector(".remember-me span");
  if (rememberMe) rememberMe.textContent = t("remember_me");
  const forgotLink = document.querySelector(".forgot-link");
  if (forgotLink) forgotLink.textContent = t("forgot_password");
  const signInBtn = document.querySelector("#login-form .btn-primary");
  if (signInBtn) signInBtn.textContent = t("sign_in");

  const regName = document.querySelector("label[for='register-name']");
  if (regName) regName.textContent = t("register_name");
  const regNameInput = document.getElementById("register-name");
  if (regNameInput) regNameInput.placeholder = t("register_name_ph");
  const regEmail = document.querySelector("label[for='register-email']");
  if (regEmail) regEmail.textContent = t("register_email");
  const regEmailInput = document.getElementById("register-email");
  if (regEmailInput) regEmailInput.placeholder = t("register_email_ph");
  const regPassword = document.querySelector("label[for='register-password']");
  if (regPassword) regPassword.textContent = t("register_password");
  const regPasswordInput = document.getElementById("register-password");
  if (regPasswordInput) regPasswordInput.placeholder = t("register_password_ph");
  const consentSpan = document.querySelector(".register-consent span");
  if (consentSpan) consentSpan.innerHTML = t("consent_text");
  const createBtn = document.querySelector("#register-form .btn-secondary");
  if (createBtn) createBtn.textContent = t("create_account");
  const dividerSpan = document.querySelector(".divider span");
  if (dividerSpan) dividerSpan.textContent = t("or_continue");

  // Главная
  const brandH1 = document.querySelector(".brand h1");
  const brandP = document.querySelector(".brand p");
  if (brandH1) brandH1.textContent = t("hero_title");
  if (brandP) brandP.textContent = t("hero_subtitle");
  const sectionH2 = document.querySelector(".section-title h2");
  const sectionP = document.querySelector(".section-title p");
  if (sectionH2) sectionH2.textContent = t("featured_title");
  if (sectionP) sectionP.textContent = t("featured_desc");

  // Сайдбар ассетов
  const assetTypes = document.querySelector(".asset-sidebar h3");
  if (assetTypes) assetTypes.textContent = t("asset_types");

  // Фильтры
  const filterAll = document.querySelector('.filter-link[data-filter="all"]');
  const filter3d = document.querySelector('.filter-link[data-filter="3d"]');
  const filterEnv = document.querySelector('.filter-link[data-filter="environment"]');
  const filterChar = document.querySelector('.filter-link[data-filter="characters"]');
  const filterVfx = document.querySelector('.filter-link[data-filter="vfx"]');
  const filterAudio = document.querySelector('.filter-link[data-filter="audio"]');
  const filterUi = document.querySelector('.filter-link[data-filter="ui"]');
  const filterTools = document.querySelector('.filter-link[data-filter="tools"]');
  const filterAnim = document.querySelector('.filter-link[data-filter="animations"]');
  if (filterAll) filterAll.textContent = t("all_assets");
  if (filter3d) filter3d.textContent = t("models_3d");
  if (filterEnv) filterEnv.textContent = t("environments");
  if (filterChar) filterChar.textContent = t("characters");
  if (filterVfx) filterVfx.textContent = t("vfx");
  if (filterAudio) filterAudio.textContent = t("audio");
  if (filterUi) filterUi.textContent = t("ui");
  if (filterTools) filterTools.textContent = t("tools");
  if (filterAnim) filterAnim.textContent = t("animations");

  // Сортировка
  const sortLabel = document.querySelector(".sort-label");
  if (sortLabel) sortLabel.textContent = t("sort_by");
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    const opts = sortSelect.querySelectorAll("option");
    const keys = ["sort_featured","sort_price_asc","sort_price_desc","sort_rating_desc","sort_rating_asc"];
    opts.forEach((opt, i) => { if (keys[i]) opt.textContent = t(keys[i]); });
  }

  // Кнопки View на карточках
  document.querySelectorAll(".card-footer .btn-small").forEach(btn => {
    btn.textContent = t("view");
  });

  // Описания ассетов — храним оригинал и переводим
  const assetDescMap = [
    "asset_neon_desc", "asset_fantasy_desc", "asset_boss_desc", "asset_magic_desc",
    "asset_castle_desc", "asset_scifi_desc", "asset_ambient_desc", "asset_rpg_desc",
    "asset_level_desc", "asset_melee_desc", "asset_survival_desc", "asset_weather_desc",
    "asset_mobile_desc", "asset_dialogue_desc", "asset_parkour_desc", "asset_forest_desc"
  ];
  document.querySelectorAll(".card-grid .card > p").forEach((desc, i) => {
    if (!desc.dataset.enText) desc.dataset.enText = desc.textContent.trim();
    const original = desc.dataset.enText;
    if (assetDescMap[i]) {
      if (lang === "ru") {
        desc.textContent = t(assetDescMap[i]);
      } else {
        desc.textContent = original;
      }
    }
  });

  // Теги типов ассетов — храним оригинал и переводим
  const tagMap = {
    "3d environment": "tag_3d_environment",
    "characters": "tag_characters",
    "characters animations": "tag_characters",
    "audio": "tag_audio",
    "vfx": "tag_vfx",
    "ui": "tag_ui",
    "tools": "tag_tools",
    "animations": "tag_animations",
    "3d": "tag_3d_props",
    "environment": "tag_environment",
    "environment 3d": "tag_environment"
  };
  document.querySelectorAll(".card-tag").forEach((tag) => {
    if (!tag.dataset.enText) tag.dataset.enText = tag.textContent.trim().toLowerCase();
    const original = tag.dataset.enText;
    for (const [key, val] of Object.entries(tagMap)) {
      if (original.includes(key)) {
        if (lang === "ru") {
          tag.textContent = t(val);
        } else {
          // Восстанавливаем оригинал
          const tagLabels = {
            "3d environment": "3D Environment",
            "characters": "Characters",
            "characters animations": "Characters",
            "audio": "Audio",
            "vfx": "VFX",
            "ui": "UI",
            "tools": "Tools",
            "animations": "Animations",
            "3d": "3D Props",
            "environment": "Environment",
            "environment 3d": "Environment"
          };
          tag.textContent = tagLabels[key] || original;
        }
        break;
      }
    }
  });

  // Списки <li> на карточках
  const featureTranslations = {
    "58 models": "58 моделей",
    "4K textures": "4K текстуры",
    "Unreal + Unity ready": "Unreal + Unity готовы",
    "3 hero rigs": "3 героя с ригами",
    "120+ animations": "120+ анимаций",
    "Humanoid retargeting": "Гуманоидный ретаргетинг",
    "34 music loops": "34 музыкальных лупа",
    "90 SFX": "90 SFX",
    "WAV + OGG formats": "WAV + OGG форматы",
    "45 effects": "45 эффектов",
    "Color variants": "Варианты цветов",
    "Performance presets": "Пресеты производительности",
    "76 modules": "76 модулей",
    "LOD included": "LOD включён",
    "URP + HDRP": "URP + HDRP",
    "62 prefabs": "62 префаба",
    "GPU particles": "GPU частицы",
    "Mobile presets": "Мобильные пресеты",
    "48 ambience loops": "48 эмбиент-лупов",
    "Layer-ready stems": "Многослойные стемы",
    "Seamless looping": "Бесшовное зацикливание",
    "220 UI elements": "220 UI элементов",
    "Figma source": "Figma исходник",
    "Dark/light themes": "Тёмная/светлая темы",
    "Editor extensions": "Расширения редактора",
    "Batch workflow": "Пакетный воркфлоу",
    "Docs included": "Документация",
    "180 clips": "180 клипов",
    "Root motion variants": "Root motion варианты",
    "Humanoid rig": "Гуманоидный риг",
    "140 props": "140 пропсов",
    "PBR materials": "PBR материалы",
    "Game-ready UVs": "Game-ready UV",
    "12 weather profiles": "12 погодных профилей",
    "Timeline support": "Поддержка Timeline",
    "Performance LOD": "LOD производительности",
    "45 templates": "45 шаблонов",
    "Adaptive layout": "Адаптивная вёрстка",
    "Localization ready": "Локализация готова",
    "Node editor": "Нодовый редактор",
    "Save support": "Поддержка сохранений",
    "Voice-over hooks": "Голосовые зацепки",
    "96 clips": "96 клипов",
    "Blend trees included": "Деревья смешивания",
    "Motion matching ready": "Motion matching готов",
    "80 prefabs": "80 префабов",
    "Wind animation": "Анимация ветра",
    "Terrain tools": "Инструменты террейна"
  };

  // Списки <li> на карточках — храним оригинал и переводим
  document.querySelectorAll(".card-grid .card ul li").forEach((li) => {
    // Сохраняем оригинал
    if (!li.dataset.enText) li.dataset.enText = li.textContent.trim();
    const original = li.dataset.enText;

    if (featureTranslations[original] && lang === "ru") {
      li.textContent = featureTranslations[original];
    } else {
      li.textContent = original;
    }
  });

  // Игры
  const gamesH1 = document.querySelector(".games-intro h1");
  const gamesP = document.querySelector(".games-intro p");
  if (gamesH1) gamesH1.textContent = t("games_head");
  if (gamesP) gamesP.textContent = t("games_desc");
  const pubBtn = document.querySelector(".btn-publish");
  if (pubBtn) pubBtn.textContent = t("publish_game");
  document.querySelectorAll(".game-sizes").forEach(container => {
    const spans = container.querySelectorAll(".game-size");
    if (spans[0]) spans[0].innerHTML = `<span class="size-icon">📦</span> ${t("archive_label")}: ` + spans[0].textContent.split(": ")[1];
    if (spans[1]) spans[1].innerHTML = `<span class="size-icon">💿</span> ${t("installed_label")}: ` + spans[1].textContent.split(": ")[1];
  });
  document.querySelectorAll(".btn-details").forEach(btn => {
    btn.textContent = t("details");
  });

  // Описания игр — храним оригинал и переводим
  document.querySelectorAll(".game-desc").forEach((desc, i) => {
    if (!desc.dataset.enText) desc.dataset.enText = desc.textContent.trim();
    const original = desc.dataset.enText;
    const gameDescMap = ["game_cyber_desc", "game_kingdoms_desc", "game_neon_desc", "game_starbound_desc", "game_pixel_desc", "game_shadow_desc"];
    if (gameDescMap[i]) {
      if (lang === "ru") {
        desc.textContent = t(gameDescMap[i]);
      } else {
        desc.textContent = original;
      }
    }
  });

  // Страница деталей игры
  const gameDetailBack = document.querySelector(".game-detail-page .back-link");
  if (gameDetailBack) gameDetailBack.textContent = t("back_games");

  const gameDetailTitle = document.getElementById("game-title");
  if (gameDetailTitle && gameDetailTitle.textContent === "Loading game...") {
    gameDetailTitle.textContent = t("loading_game");
  }

  // Жанр (badge)
  const gameGenreBadge = document.getElementById("game-genre");
  if (gameGenreBadge) {
    const genreMap = {
      "RPG / Open World": "game_genre_rpg_open",
      "Strategy / Medieval": "game_genre_strategy_medieval",
      "Racing / Arcade": "game_genre_racing_arcade",
      "Survival / Space": "game_genre_survival_space",
      "Roguelike / Retro": "game_genre_roguelike_retro",
      "Stealth-Action / Tactical": "game_genre_stealth_tactical"
    };
    const genre = gameGenreBadge.textContent.trim();
    if (genreMap[genre] && lang === "ru") {
      gameGenreBadge.textContent = t(genreMap[genre]);
    }
  }

  // Описания игр — перевод intro и fullDescription
  const gameTitleVal = document.getElementById("game-title")?.textContent || "";
  const gameIntroEl = document.getElementById("game-intro");
  const gameFullDescEl = document.getElementById("game-full-description");
  const gameDescMap = {
    "Cyber Odyssey": { intro: "game_cyber_intro", full: "game_cyber_full" },
    "Kingdoms of Ash": { intro: "game_kingdoms_intro", full: "game_kingdoms_full" },
    "Neon Drift": { intro: "game_neon_intro", full: "game_neon_full" },
    "Starbound Survivors": { intro: "game_starbound_intro", full: "game_starbound_full" },
    "Pixel Dungeon Quest": { intro: "game_pixel_intro", full: "game_pixel_full" },
    "Shadow Protocol": { intro: "game_shadow_intro", full: "game_shadow_full" }
  };
  const descKeys = gameDescMap[gameTitleVal];
  if (descKeys && lang === "ru") {
    if (gameIntroEl) gameIntroEl.textContent = t(descKeys.intro);
    if (gameFullDescEl) gameFullDescEl.textContent = t(descKeys.full);
  }

  // Мета-лейблы страницы игры — привязка через ближайший <strong> к span по id
  const metaIdMap = {
    "game-developer": "publisher_label",
    "game-rating": "rating_label_game",
    "game-release": "release_label",
    "game-archive-size": "archive_size_label",
    "game-installed-size": "installed_size_label",
    "game-platform": "platform_label",
    "game-multiplayer": "multiplayer_label"
  };
  for (const [spanId, translationKey] of Object.entries(metaIdMap)) {
    const spanEl = document.getElementById(spanId);
    if (spanEl && spanEl.previousElementSibling && spanEl.previousElementSibling.tagName === "STRONG") {
      spanEl.previousElementSibling.textContent = t(translationKey);
    }
  }

  // Перевод значений даты и мультиплеера по id
  const gameReleaseVal = document.getElementById("game-release");
  const gameMultiplayerVal = document.getElementById("game-multiplayer");
  if (gameReleaseVal) {
    // Перевод месяцев
    const monthRu = {
      "January": "января", "February": "февраля", "March": "марта",
      "April": "апреля", "May": "мая", "June": "июня",
      "July": "июля", "August": "августа", "September": "сентября",
      "October": "октября", "November": "ноября", "December": "декабря"
    };
    let ruDate = gameReleaseVal.textContent;
    if (lang === "ru") {
      for (const [en, ru] of Object.entries(monthRu)) {
        ruDate = ruDate.replace(en, ru);
      }
    }
    gameReleaseVal.textContent = ruDate;
  }
  if (gameMultiplayerVal) {
    const mpText = gameMultiplayerVal.textContent.trim();
    if (lang === "ru") {
      if (mpText === "No") gameMultiplayerVal.textContent = "Нет";
      else if (mpText.startsWith("Yes")) {
        const rest = mpText.replace("Yes", "");
        // Перевод "(up to X players)" / "(up to X players local)" / "(up to X players co-op)"
        let translated = rest.replace(/up to (\d+) players/g, "до $1 игроков")
                             .replace(/local/g, "локально")
                             .replace(/co-op/g, "кооператив")
                             .replace(/\(\s+/g, "(")
                             .replace(/\s+\)/g, ")");
        gameMultiplayerVal.textContent = "Да" + translated;
      }
    } else {
      // back to English
      const mpRuText = gameMultiplayerVal.textContent.trim();
      if (mpRuText === "Нет") gameMultiplayerVal.textContent = "No";
      else if (mpRuText.startsWith("Да")) {
        const rest = mpRuText.replace("Да", "");
        let translated = rest.replace(/до (\d+) игроков/g, "up to $1 players")
                             .replace(/локально/g, "local")
                             .replace(/кооператив/g, "co-op");
        gameMultiplayerVal.textContent = "Yes" + translated;
      }
    }
  }

  const screenshotsH3 = document.querySelector(".game-screenshots h3");
  if (screenshotsH3) screenshotsH3.textContent = t("screenshots_title");

  // Системные требования
  const sysReqH3 = document.querySelector(".game-requirements h3");
  if (sysReqH3) sysReqH3.textContent = t("system_requirements");
  const reqMinH4 = document.querySelector("#req-minimum")?.previousElementSibling;
  const reqRecH4 = document.querySelector("#req-recommended")?.previousElementSibling;
  if (reqMinH4) reqMinH4.textContent = t("requirements_minimum");
  if (reqRecH4) reqRecH4.textContent = t("requirements_recommended");

  // Метки системных требований (OS, CPU, RAM, GPU, Storage)
  const reqLabels = document.querySelectorAll(".req-item strong");
  const reqKeys = ["req_os", "req_cpu", "req_ram", "req_gpu", "req_storage"];
  reqLabels.forEach((el, i) => {
    const keyIndex = i % 5;
    if (reqKeys[keyIndex]) el.textContent = t(reqKeys[keyIndex]);
  });

  // Кнопка Download
  const downloadBtn = document.querySelector(".game-actions .btn-large");
  if (downloadBtn) downloadBtn.textContent = t("download_btn");

  // Фичи игры — храним оригинал и переводим
  document.querySelectorAll(".game-features li").forEach((li) => {
    if (!li.dataset.enText) li.dataset.enText = li.textContent.trim();
    const original = li.dataset.enText;
    if (lang === "ru") {
      const ruMap = {
        "Over 60 hours of main story content": "Более 60 часов основного сюжета",
        "Dynamic combat system with 5 weapon types": "Динамичная боевая система с 5 типами оружия",
        "Branching narrative with 12 unique endings": "Ветвящийся сюжет с 12 уникальными концовками",
        "Full character customization and skill trees": "Полная кастомизация персонажа и деревья навыков",
        "Original synthwave soundtrack with 45 tracks": "Оригинальный синтвейв саундтрек из 45 треков",
        "Procedurally generated campaigns": "Процедурно генерируемые кампании",
        "Real-time tactical battles with 1000+ units": "Тактические сражения в реальном времени с 1000+ юнитов",
        "Deep diplomacy and alliance system": "Глубокая система дипломатии и альянсов",
        "4 unique factions with special abilities": "4 уникальные фракции со специальными способностями",
        "Mod support and custom scenario editor": "Поддержка модов и редактор сценариев",
        "20 unique tracks across 5 environments": "20 уникальных трасс в 5 окружениях",
        "Deep car customization system": "Глубокая система кастомизации автомобилей",
        "Original synthwave soundtrack (30 tracks)": "Оригинальный синтвейв саундтрек (30 треков)",
        "Global leaderboards and weekly challenges": "Глобальные таблицы лидеров и еженедельные испытания",
        "Smooth 60 FPS gameplay": "Плавный геймплей при 60 FPS",
        "Procedurally generated planets with unique biomes": "Процедурно генерируемые планеты с уникальными биомами",
        "Deep crafting system with 200+ items": "Глубокая система крафта с 200+ предметами",
        "Seamless multiplayer co-op": "Бесшовный мультиплеер кооператив",
        "Dynamic weather and environmental hazards": "Динамическая погода и экологические опасности",
        "Story-driven campaign with 40+ hours of content": "Сюжетная кампания с 40+ часами контента",
        "Procedurally generated dungeons with 50+ levels": "Процедурно генерируемые подземелья с 50+ уровнями",
        "8 unique character classes": "8 уникальных классов персонажей",
        "200+ items and equipment pieces": "200+ предметов и элементов экипировки",
        "12 challenging boss encounters": "12 сложных боссов",
        "Daily challenges and seasonal events": "Ежедневные испытания и сезонные события",
        "Cooperative campaign for 1-4 players": "Кооперативная кампания для 1-4 игроков",
        "Dynamic mission objectives and enemy AI": "Динамические цели миссий и ИИ врагов",
        "Deep stealth and infiltration mechanics": "Глубокая механика стелса и проникновения",
        "30+ weapons with customization options": "30+ видов оружия с вариантами кастомизации",
        "Multiple difficulty modes for all skill levels": "Несколько режимов сложности для всех уровней"
      };
      if (ruMap[original]) {
        li.textContent = ruMap[original];
      } else {
        li.textContent = original;
      }
    } else {
      li.textContent = original;
    }
  });

  const rateH3 = document.querySelector(".game-rating-section h3");
  if (rateH3) rateH3.textContent = t("rate_game");
  const rateHint = document.querySelector(".game-rating-section .section-hint");
  if (rateHint) rateHint.textContent = t("rate_preview_note");

  const ratingLabelEl = document.getElementById("rating-label");
  if (ratingLabelEl && ratingLabelEl.textContent === "Select your rating") {
    ratingLabelEl.textContent = t("select_rating");
  }

  // Голоса на странице игры
  const gameRatingVotes = document.getElementById("rating-votes");
  if (gameRatingVotes) {
    const count = gameRatingVotes.textContent.match(/\d+/)?.[0] || "0";
    gameRatingVotes.textContent = `${count} ${t("rating_votes")}`;
  }

  // Комментарии на странице игры
  const gameCommentsH3 = document.querySelector(".game-comments-section h3");
  if (gameCommentsH3) gameCommentsH3.textContent = t("comments_feedback");
  const gameCommentsHint = document.querySelector(".game-comments-section .section-hint");
  if (gameCommentsHint) gameCommentsHint.textContent = t("comments_hint");
  const gameCommentLabel = document.querySelector(".game-comments-section .comment-form label");
  if (gameCommentLabel) gameCommentLabel.textContent = t("comment_label");
  const gameCommentInput = document.getElementById("comment-input");
  if (gameCommentInput) gameCommentInput.placeholder = t("comment_game_placeholder");
  const gameCommentBtn = document.querySelector(".game-comments-section .comment-form .btn-small");
  if (gameCommentBtn) gameCommentBtn.textContent = t("comment_publish");

  // Форум
  const onlineH2 = document.querySelector(".forum-sidebar h2");
  if (onlineH2) onlineH2.textContent = t("online_users");
  const onlineCount = document.querySelector(".online-count");
  if (onlineCount) {
    const count = onlineCount.textContent.match(/\d+/)?.[0] || "0";
    onlineCount.textContent = `${count} ${t("online_count")}`;
  }
  const chatH2 = document.querySelector(".chat-header h2");
  if (chatH2) chatH2.textContent = t("general_chat");
  const chatStatus = document.querySelector(".chat-status");
  if (chatStatus) chatStatus.innerHTML = `<span class="online-dot"></span> ${t("chat_live")}`;
  const chatInput = document.getElementById("chat-input");
  if (chatInput) chatInput.placeholder = t("chat_placeholder");
  const chatSend = document.querySelector(".btn-send");
  if (chatSend) chatSend.textContent = t("chat_send");

  // Учебные материалы
  const studyH1 = document.querySelector(".study-intro h1");
  const studyP = document.querySelector(".study-intro p");
  if (studyH1) studyH1.textContent = t("study_head");
  if (studyP) studyP.textContent = t("study_desc");
  document.querySelectorAll(".study-tab").forEach(tab => {
    const cat = tab.dataset.category;
    const map = { all: "study_all", engines: "study_engines", documentation: "study_docs", videos: "study_videos", communities: "study_communities", tools: "study_tools" };
    if (cat && map[cat]) tab.textContent = t(map[cat]);
  });

  // Описания карточек учебных материалов
  const studyDescMap = {
    "Unity": "study_unity_desc",
    "Unreal Engine 5": "study_unreal_desc",
    "Godot Engine": "study_godot_desc",
    "Unity Documentation": "study_unity_docs_desc",
    "Unreal Engine Documentation": "study_unreal_docs_desc",
    "Godot Documentation": "study_godot_docs_desc",
    "C# Language Reference": "study_csharp_desc",
    "C++ Documentation": "study_cpp_desc",
    "Lua Documentation": "study_lua_desc",
    "Brackeys (YouTube)": "study_brackeys_desc",
    "Unreal Sensei (YouTube)": "study_unreal_sensei_desc",
    "GDQuest (YouTube)": "study_gdquest_desc",
    "Code Monkey (YouTube)": "study_code_monkey_desc",
    "Ryan Laley (YouTube)": "study_ryan_laley_desc",
    "Game Dev Arts (YouTube)": "study_game_dev_arts_desc",
    "Stack Overflow — Game Dev": "study_stackoverflow_desc",
    "r/gamedev (Reddit)": "study_reddit_desc",
    "GameDev Discord": "study_discord_desc",
    "Blender": "study_blender_desc",
    "GIMP": "study_gimp_desc",
    "Audacity": "study_audacity_desc",
    "Figma": "study_figma_desc"
  };
  document.querySelectorAll(".study-info").forEach(infoBlock => {
    const h3 = infoBlock.querySelector("h3");
    const descP = infoBlock.querySelector(".study-desc");
    if (h3 && descP) {
      const title = h3.textContent.trim();
      if (!descP.dataset.enText) descP.dataset.enText = descP.textContent.trim();
      const key = studyDescMap[title];
      if (key && lang === "ru") {
        descP.textContent = t(key);
      } else if (key) {
        descP.textContent = descP.dataset.enText;
      }
    }
  });

  // Публикация
  const pubHead = document.querySelector(".publish-head h1");
  const pubDesc = document.querySelector(".publish-head p");
  if (pubHead) pubHead.textContent = t("publish_head");
  if (pubDesc) pubDesc.textContent = t("publish_desc");
  const secTitles = document.querySelectorAll(".form-section h2");
  const secH3s = document.querySelectorAll(".form-section h3");
  // Basic info, files, sys req, additional
  if (secTitles[0]) secTitles[0].textContent = t("basic_info");
  if (secTitles[1]) secTitles[1].textContent = t("files_media");
  if (secTitles[2]) secTitles[2].textContent = t("sys_requirements");
  if (secTitles[3]) secTitles[3].textContent = t("additional_info");
  if (secH3s[0]) secH3s[0].textContent = t("min_requirements");
  if (secH3s[1]) secH3s[1].textContent = t("rec_requirements");

  // Плейсхолдеры формы публикации
  const gameTitleInput = document.getElementById("game-title");
  if (gameTitleInput) gameTitleInput.placeholder = t("game_title_ph");
  const gameDescTextarea = document.getElementById("game-desc");
  if (gameDescTextarea) gameDescTextarea.placeholder = t("game_desc_ph");
  const minOs = document.getElementById("min-os");
  if (minOs) minOs.placeholder = t("os_min_ph");
  const minCpu = document.getElementById("min-cpu");
  if (minCpu) minCpu.placeholder = t("cpu_min_ph");
  const minRam = document.getElementById("min-ram");
  if (minRam) minRam.placeholder = t("ram_min_ph");
  const minGpu = document.getElementById("min-gpu");
  if (minGpu) minGpu.placeholder = t("gpu_min_ph");
  const minStorage = document.getElementById("min-storage");
  if (minStorage) minStorage.placeholder = t("storage_min_ph");
  const minAdditional = document.getElementById("min-additional");
  if (minAdditional) minAdditional.placeholder = t("additional_placeholder");
  const recOs = document.getElementById("rec-os");
  if (recOs) recOs.placeholder = t("os_rec_ph");
  const recCpu = document.getElementById("rec-cpu");
  if (recCpu) recCpu.placeholder = t("cpu_rec_ph");
  const recRam = document.getElementById("rec-ram");
  if (recRam) recRam.placeholder = t("ram_rec_ph");
  const recGpu = document.getElementById("rec-gpu");
  if (recGpu) recGpu.placeholder = t("gpu_rec_ph");
  const recStorage = document.getElementById("rec-storage");
  if (recStorage) recStorage.placeholder = t("storage_rec_ph");
  const recAdditional = document.getElementById("rec-additional");
  if (recAdditional) recAdditional.placeholder = t("additional_placeholder");
  const engineInput = document.getElementById("game-engine");
  if (engineInput) engineInput.placeholder = t("engine_ph");
  const linkInput = document.getElementById("game-link");
  if (linkInput) linkInput.placeholder = t("link_ph");

  // Лейблы формы публикации
  const gameTitleLabel = document.querySelector('label[for="game-title"]');
  if (gameTitleLabel) gameTitleLabel.textContent = t("game_title");
  const gameDescLabel = document.querySelector('label[for="game-desc"]');
  if (gameDescLabel) gameDescLabel.textContent = t("game_desc_label");
  const genreLabel = document.querySelector('label[for="game-genre"]');
  if (genreLabel) genreLabel.textContent = t("genre_label");
  const genreSelect = document.getElementById("game-genre");
  if (genreSelect) {
    const defaultOption = genreSelect.querySelector('option[value=""]');
    if (defaultOption) defaultOption.textContent = t("genre_select");
    const options = genreSelect.querySelectorAll('option[value]:not([value=""])');
    const genreKeys = ["genre_action", "genre_rpg", "genre_strategy", "genre_adventure", "genre_simulation", "genre_puzzle", "genre_platformer", "genre_horror", "genre_racing", "genre_sports", "genre_other"];
    options.forEach((opt, i) => {
      if (genreKeys[i]) opt.textContent = t(genreKeys[i]);
    });
  }
  const archiveLabel = document.querySelector('label[for="game-archive"]');
  if (archiveLabel) archiveLabel.textContent = t("game_archive");
  const coverLabel = document.querySelector('label[for="game-thumb"]');
  if (coverLabel) coverLabel.textContent = t("cover_image");
  const screenshotsLabel = document.querySelector('label[for="game-screenshots"]');
  if (screenshotsLabel) screenshotsLabel.textContent = t("screenshots");
  const osLabelMin = document.querySelector('label[for="min-os"]');
  if (osLabelMin) osLabelMin.textContent = t("os_label");
  const cpuLabelMin = document.querySelector('label[for="min-cpu"]');
  if (cpuLabelMin) cpuLabelMin.textContent = t("cpu_label");
  const ramLabelMin = document.querySelector('label[for="min-ram"]');
  if (ramLabelMin) ramLabelMin.textContent = t("ram_label");
  const gpuLabelMin = document.querySelector('label[for="min-gpu"]');
  if (gpuLabelMin) gpuLabelMin.textContent = t("gpu_label");
  const storageLabelMin = document.querySelector('label[for="min-storage"]');
  if (storageLabelMin) storageLabelMin.textContent = t("storage_label");
  const additionalLabelMin = document.querySelector('label[for="min-additional"]');
  if (additionalLabelMin) additionalLabelMin.textContent = t("additional_notes");
  const osLabelRec = document.querySelector('label[for="rec-os"]');
  if (osLabelRec) osLabelRec.textContent = t("os_label");
  const cpuLabelRec = document.querySelector('label[for="rec-cpu"]');
  if (cpuLabelRec) cpuLabelRec.textContent = t("cpu_label");
  const ramLabelRec = document.querySelector('label[for="rec-ram"]');
  if (ramLabelRec) ramLabelRec.textContent = t("ram_label");
  const gpuLabelRec = document.querySelector('label[for="rec-gpu"]');
  if (gpuLabelRec) gpuLabelRec.textContent = t("gpu_label");
  const storageLabelRec = document.querySelector('label[for="rec-storage"]');
  if (storageLabelRec) storageLabelRec.textContent = t("storage_label");
  const additionalLabelRec = document.querySelector('label[for="rec-additional"]');
  if (additionalLabelRec) additionalLabelRec.textContent = t("additional_notes");
  const engineLabel = document.querySelector('label[for="game-engine"]');
  if (engineLabel) engineLabel.textContent = t("engine_label");
  const projectLinkLabel = document.querySelector('label[for="game-link"]');
  if (projectLinkLabel) projectLinkLabel.textContent = t("project_link");
  const trailerLinkLabel = document.querySelector('label[for="game-video"]');
  if (trailerLinkLabel) trailerLinkLabel.textContent = t("trailer_link");
  const videoInput = document.getElementById("game-video");
  if (videoInput) videoInput.placeholder = t("link_ph");

  // Подсказки формы публикации
  const archiveHint = document.querySelector('#game-archive + .file-hint');
  if (archiveHint) archiveHint.textContent = t("file_hint_archive");
  const coverHint = document.querySelector('#game-thumb + .file-hint');
  if (coverHint) coverHint.textContent = t("file_hint_cover");
  const screenshotsHint = document.querySelector('#game-screenshots + .file-hint');
  if (screenshotsHint) screenshotsHint.textContent = t("file_hint_screenshots");

  // Кнопка отправки и соглашение (data-i18n или прямое присваивание)
  const submitBtn = document.querySelector('.btn-submit[data-i18n="submit_moderation"]') || document.querySelector('.btn-submit');
  if (submitBtn && !submitBtn.dataset.i18n) submitBtn.textContent = t("submit_moderation");
  
  const pubConsentSpan = document.querySelector('.publish-consent span[data-i18n="consent_rules"]') || document.querySelector('.publish-consent span');
  if (pubConsentSpan && !pubConsentSpan.dataset.i18n) {
    pubConsentSpan.innerHTML = t("consent_rules");
  }

  // Футер
  const footerCopy = document.querySelector(".footer-copy");
  if (footerCopy) footerCopy.textContent = t("footer_copy");
  const footerLinks = document.querySelectorAll(".footer-links a");
  if (footerLinks[0]) footerLinks[0].textContent = t("footer_privacy");
  if (footerLinks[1]) footerLinks[1].textContent = t("footer_terms");
  if (footerLinks[2]) footerLinks[2].textContent = t("footer_support");

  /* Страница ассета */
  // Ограничиваем .asset-page чтобы не ломать game-detail.html
  const assetPage = document.querySelector(".asset-page");

  const backLink = document.querySelector(".back-link");
  if (backLink) backLink.textContent = t("back_catalog");

  const assetType = document.getElementById("asset-type");
  if (assetType) assetType.textContent = t("asset_type_label");

  const assetTitle = document.getElementById("asset-title");
  if (assetTitle && assetTitle.textContent === "Loading asset...") {
    assetTitle.textContent = t("loading_asset");
  }

  // Мета-лейблы — только внутри .asset-page
  const metaItems = assetPage ? assetPage.querySelectorAll(".meta-item strong") : [];
  const metaKeys = ["price_label", "rating_label", "compatibility_label", "file_size_label", "last_update_label"];
  metaItems.forEach((el, i) => {
    if (metaKeys[i]) el.textContent = t(metaKeys[i]);
  });

  const ratingH3 = assetPage ? assetPage.querySelector(".asset-rating-section h3") : null;
  if (ratingH3) ratingH3.textContent = t("asset_rating");
  const ratingHint = assetPage ? assetPage.querySelector(".asset-rating-section .section-hint") : null;
  if (ratingHint) ratingHint.textContent = t("rating_preview_note");

  // Голоса
  const ratingVotes = document.getElementById("rating-votes");
  if (ratingVotes) {
    const count = ratingVotes.textContent.match(/\d+/)?.[0] || "0";
    ratingVotes.textContent = `${count} ${t("rating_votes")}`;
  }

  // Комментарии — только внутри .asset-page
  const commentsH3 = assetPage ? assetPage.querySelector(".asset-comments-section h3") : null;
  if (commentsH3) commentsH3.textContent = t("comments_section");
  const commentsHint = assetPage ? assetPage.querySelector(".asset-comments-section .section-hint") : null;
  if (commentsHint) commentsHint.textContent = t("comments_placeholder");
  const commentLabel = assetPage ? assetPage.querySelector(".comment-form label") : null;
  if (commentLabel) commentLabel.textContent = t("comment_label");
  const commentInput = document.getElementById("comment-input");
  if (commentInput && assetPage) commentInput.placeholder = t("comment_placeholder");
  const commentBtn = assetPage ? assetPage.querySelector(".comment-form .btn-small") : null;
  if (commentBtn) commentBtn.textContent = t("comment_publish");
}

/* ===== Инициализация ===== */
document.addEventListener("DOMContentLoaded", () => {
  // Установить тему
  setTheme(getTheme());

  // Установить язык
  document.documentElement.lang = getLang();

  // Применить переводы
  applyTranslations();
});
