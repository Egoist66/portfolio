=== PerfBoost ===
Contributors: portfolio
Tags: performance, cache, lazy loading, minify, database optimization, cdn
Requires at least: 5.9
Tested up to: 6.4
Stable tag: 1.0.0
License: GPL v2 or later

WordPress performance suite — page caching, asset minification, lazy loading, database optimization, and CDN integration.

== Description ==

PerfBoost is a comprehensive performance optimization plugin. It includes five modules that can be configured independently:

* **Page Cache** — Serves cached HTML files to unauthenticated visitors. Auto-purges on post save/comment.
* **Asset Optimization** — HTML minification, CSS minification, and JavaScript deferral.
* **Lazy Loading** — Defers offscreen images, thumbnails, avatars, and iframes using native `loading="lazy"`.
* **Database Cleanup** — Removes post revisions, auto-drafts, spam/trash comments, expired transients, and oEmbed caches. Supports manual or weekly automatic cleanup.
* **CDN Integration** — Rewrites static asset URLs to your CDN domain.

== Installation ==

1. Upload the `perfboost` folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Go to Tools → PerfBoost to configure

== Changelog ==

= 1.0.0 =
* Initial release with caching, minification, lazy loading, DB cleanup, and CDN rewrite
