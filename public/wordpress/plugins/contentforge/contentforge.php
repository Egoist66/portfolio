<?php
/**
 * Plugin Name: ContentForge
 * Plugin URI:  https://portfolio.dev/contentforge
 * Description: Content construction toolkit — UI for custom post types, meta fields, shortcodes, and template overrides.
 * Version:     1.0.0
 * Author:      Your Portfolio
 * Author URI:  https://portfolio.dev
 * License:     GPL v2 or later
 * Text Domain: contentforge
 *
 * @package ContentForge
 */

defined('ABSPATH') || exit;

define('CF_VERSION', '1.0.0');
define('CF_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CF_PLUGIN_URL', plugin_dir_url(__FILE__));
define('CF_POST_TYPES_OPTION', 'contentforge_post_types');
define('CF_FIELDS_OPTION', 'contentforge_fields');
define('CF_SHORTCODES_OPTION', 'contentforge_shortcodes');

require_once CF_PLUGIN_DIR . 'includes/class-cpt-manager.php';
require_once CF_PLUGIN_DIR . 'includes/class-field-manager.php';
require_once CF_PLUGIN_DIR . 'includes/class-shortcode-manager.php';
require_once CF_PLUGIN_DIR . 'includes/class-admin.php';

add_action('plugins_loaded', function () {
    load_plugin_textdomain('contentforge', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

register_activation_hook(__FILE__, function () {
    CF_CPT_Manager::instance()->register_all();
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

add_action('init', function () {
    CF_CPT_Manager::instance()->register_all();
    CF_Field_Manager::instance()->init();
    CF_Shortcode_Manager::instance()->init();
});

if (is_admin()) {
    CF_Admin::instance()->init();
}
