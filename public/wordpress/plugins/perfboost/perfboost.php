<?php
/**
 * Plugin Name: PerfBoost
 * Plugin URI:  https://portfolio.dev/perfboost
 * Description: Performance optimization suite — page caching, asset minification, lazy loading, database optimization, and CDN integration.
 * Version:     1.0.0
 * Author:      Your Portfolio
 * Author URI:  https://portfolio.dev
 * License:     GPL v2 or later
 * Text Domain: perfboost
 * Domain Path: /languages
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

define('PB_VERSION', '1.0.0');
define('PB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PB_PLUGIN_URL', plugin_dir_url(__FILE__));
define('PB_CACHE_DIR', WP_CONTENT_DIR . '/cache/perfboost/');

$files = [
    'includes/class-admin.php',
    'includes/class-cache.php',
    'includes/class-assets-optimizer.php',
    'includes/class-database-optimizer.php',
    'includes/class-lazy-loader.php',
];

foreach ($files as $file) {
    $path = PB_PLUGIN_DIR . $file;
    if (file_exists($path)) {
        require_once $path;
    }
}

add_action('plugins_loaded', function () {
    load_plugin_textdomain('perfboost', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

register_activation_hook(__FILE__, 'pb_activate');
register_deactivation_hook(__FILE__, 'pb_deactivate');

function pb_activate()
{
    if (!is_dir(PB_CACHE_DIR)) {
        wp_mkdir_p(PB_CACHE_DIR);
    }

    add_option('pb_settings', [
        'cache_enabled'        => 1,
        'cache_ttl'            => 3600,
        'minify_html'          => 0,
        'minify_css'           => 0,
        'minify_js'            => 0,
        'lazy_images'          => 1,
        'auto_db_cleanup'      => 0,
        'cdn_enabled'          => 0,
        'cdn_url'              => '',
    ]);
}

function pb_deactivate()
{
    PB_Cache::clear_all();
}

add_action('init', function () {
    if (get_option('pb_settings')['cache_enabled'] ?? 0) {
        PB_Cache::instance()->init();
    }

    if (get_option('pb_settings')['lazy_images'] ?? 0) {
        PB_Lazy_Loader::instance()->init();
    }

    PB_Assets_Optimizer::instance()->init();
    PB_Database_Optimizer::instance()->init();
});

if (is_admin()) {
    PB_Admin::instance()->init();
}
