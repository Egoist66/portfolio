import { WordPressPluginTranslation } from "../types/wordpress";

export const wordpressPluginTranslations: Record<
  "en" | "ru",
  WordPressPluginTranslation[]
> = {
  en: [
    {
      name: "ContentForge",
      description:
        "Content construction toolkit — build custom post types, meta field groups, and shortcodes from the WordPress admin UI without writing code.",
      features: [
        "Visual custom post type builder with labels, supports, and rewrite rules",
        "Meta field groups: text, WYSIWYG, image, select, color picker, and more",
        "Static and dynamic shortcodes with post query templates",
        "Template overrides for custom content structures",
      ],
    },
    {
      name: "ContentBlocks",
      description:
        "Seven powerful Gutenberg blocks with server-side rendering: Hero, Testimonials, Pricing, FAQ, Team, Stats, and Timeline.",
      features: [
        "Hero section with CTA and background overlay",
        "Testimonials carousel with ratings and autoplay",
        "Pricing table, FAQ accordion, and team grid",
        "Animated stats counter and vertical timeline",
      ],
    },
    {
      name: "SmartMail",
      description:
        "Transactional email management — SMTP configuration, delivery logging, HTML test tool, and delivery statistics.",
      features: [
        "SMTP setup for SendGrid, Mailgun, SES, Postmark, and others",
        "Full email log with sent/failed status and error messages",
        "Sortable log table with search and pagination",
        "Encrypted credentials and configurable log retention",
      ],
    },
    {
      name: "PerfBoost",
      description:
        "Performance optimization suite — page caching, asset minification, lazy loading, database cleanup, and CDN integration.",
      features: [
        "HTML page cache with auto-purge on content updates",
        "CSS/JS minification and script deferral",
        "Native lazy loading for images and iframes",
        "Database cleanup and CDN URL rewriting",
      ],
    },
    {
      name: "FM Clean Head",
      description:
        "Removes unnecessary meta tags, emoji scripts, and generator links from wp_head for a lighter and cleaner HTML output.",
      features: [
        "Disables WordPress emoji scripts and styles",
        "Removes RSD, WLW manifest, and shortlink tags",
        "Hides WordPress generator version in HTML",
        "Lightweight — no settings page required",
      ],
    },
    {
      name: "FM SVG Upload",
      description:
        "Enables safe SVG uploads in the WordPress media library with basic sanitization for admin users.",
      features: [
        "Allows SVG mime type in Media Library",
        "Restricts uploads to users with upload_files capability",
        "Strips script tags from uploaded SVG content",
        "Works with the block editor and classic media modal",
      ],
    },
  ],
  ru: [
    {
      name: "ContentForge",
      description:
        "Конструктор контента — создание custom post types, групп meta-полей и шорткодов из админки WordPress без написания кода.",
      features: [
        "Визуальный конструктор CPT с labels, supports и rewrite rules",
        "Группы meta-полей: text, WYSIWYG, image, select, color picker и др.",
        "Статические и динамические шорткоды с шаблонами выборки постов",
        "Переопределение шаблонов для кастомных структур контента",
      ],
    },
    {
      name: "ContentBlocks",
      description:
        "Семь Gutenberg-блоков с server-side rendering: Hero, Testimonials, Pricing, FAQ, Team, Stats и Timeline.",
      features: [
        "Hero-секция с CTA и фоновым overlay",
        "Карусель отзывов с рейтингом и autoplay",
        "Таблица тарифов, FAQ-аккордеон и сетка команды",
        "Анимированные счётчики и вертикальный timeline",
      ],
    },
    {
      name: "SmartMail",
      description:
        "Управление транзакционной почтой — SMTP, логирование доставки, HTML-тест и статистика отправок.",
      features: [
        "Настройка SMTP для SendGrid, Mailgun, SES, Postmark и др.",
        "Полный лог писем со статусами sent/failed и ошибками",
        "Сортируемая таблица логов с поиском и пагинацией",
        "Шифрование credentials и настраиваемое хранение логов",
      ],
    },
    {
      name: "PerfBoost",
      description:
        "Комплекс оптимизации — кеш страниц, минификация ассетов, lazy loading, очистка БД и интеграция с CDN.",
      features: [
        "HTML-кеш страниц с авто-сбросом при обновлении контента",
        "Минификация CSS/JS и defer для скриптов",
        "Native lazy loading для изображений и iframe",
        "Очистка базы данных и подмена URL на CDN",
      ],
    },
    {
      name: "FM Clean Head",
      description:
        "Убирает лишние meta-теги, emoji-скрипты и generator-ссылки из wp_head — HTML становится легче и чище.",
      features: [
        "Отключает emoji-скрипты и стили WordPress",
        "Удаляет RSD, WLW manifest и shortlink",
        "Скрывает версию WordPress в HTML",
        "Лёгкий плагин — без страницы настроек",
      ],
    },
    {
      name: "FM SVG Upload",
      description:
        "Разрешает безопасную загрузку SVG в медиабиблиотеку WordPress с базовой санитизацией для администраторов.",
      features: [
        "Добавляет mime-type SVG в медиабиблиотеку",
        "Загрузка доступна пользователям с правом upload_files",
        "Удаляет script-теги из содержимого SVG",
        "Работает с блочным редактором и классическим медиа-окном",
      ],
    },
  ],
};

export const wordpressTagLabels: Record<"en" | "ru", Record<string, string>> = {
  en: {
    performance: "Performance",
    security: "Security",
    media: "Media",
    svg: "SVG",
    content: "Content",
    cpt: "Custom Post Types",
    shortcodes: "Shortcodes",
    gutenberg: "Gutenberg",
    blocks: "Blocks",
    email: "Email",
    smtp: "SMTP",
    cache: "Cache",
  },
  ru: {
    performance: "Производительность",
    security: "Безопасность",
    media: "Медиа",
    svg: "SVG",
    content: "Контент",
    cpt: "Custom Post Types",
    shortcodes: "Шорткоды",
    gutenberg: "Gutenberg",
    blocks: "Блоки",
    email: "Email",
    smtp: "SMTP",
    cache: "Кеш",
  },
};
