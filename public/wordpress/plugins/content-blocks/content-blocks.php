<?php
/**
 * Plugin Name: ContentBlocks
 * Plugin URI:  https://portfolio.dev/content-blocks
 * Description: A collection of 7 powerful Gutenberg blocks: Hero, Testimonials, Pricing Table, FAQ Accordion, Team Grid, Stats Counter, and Timeline. Built with server-side rendering for optimal performance.
 * Version:     1.0.0
 * Author:      Your Portfolio
 * Author URI:  https://portfolio.dev
 * License:     GPL v2 or later
 * Text Domain: content-blocks
 * Domain Path: /languages
 *
 * @package ContentBlocks
 */

defined('ABSPATH') || exit;

define('CB_VERSION', '1.0.0');
define('CB_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CB_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once CB_PLUGIN_DIR . 'includes/class-block-manager.php';
require_once CB_PLUGIN_DIR . 'includes/class-assets.php';

add_action('plugins_loaded', function () {
    load_plugin_textdomain('content-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

register_activation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

function cb_init_blocks()
{
    $block_manager = new CB_Block_Manager();
    $block_manager->init();
}

function cb_init_assets()
{
    $assets = new CB_Assets();
    $assets->init();
}

add_action('init', 'cb_init_blocks');
add_action('enqueue_block_assets', 'cb_init_assets');
