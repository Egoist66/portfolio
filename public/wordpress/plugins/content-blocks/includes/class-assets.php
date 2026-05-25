<?php
/**
 * Asset enqueuing — registers and localizes block editor assets
 *
 * @package ContentBlocks
 */

defined('ABSPATH') || exit;

class CB_Assets
{
    public function init()
    {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_editor_assets']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_frontend_assets']);
    }

    public function enqueue_editor_assets()
    {
        $js_path  = 'assets/js/editor.js';
        $css_path = 'assets/css/editor.css';

        $js_url  = CB_PLUGIN_URL . $js_path;
        $css_url = CB_PLUGIN_URL . $css_path;

        $js_ver  = file_exists(CB_PLUGIN_DIR . $js_path) ? filemtime(CB_PLUGIN_DIR . $js_path) : CB_VERSION;
        $css_ver = file_exists(CB_PLUGIN_DIR . $css_path) ? filemtime(CB_PLUGIN_DIR . $css_path) : CB_VERSION;

        wp_register_script(
            'cb-editor',
            $js_url,
            ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-api-fetch'],
            $js_ver,
            true
        );

        wp_register_style(
            'cb-editor',
            $css_url,
            ['wp-edit-blocks'],
            $css_ver
        );

        wp_localize_script('cb-editor', 'cbData', [
            'siteUrl' => home_url(),
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'restUrl' => rest_url(),
            'nonce'   => wp_create_nonce('wp_rest'),
        ]);

        wp_set_script_translations('cb-editor', 'content-blocks', CB_PLUGIN_DIR . 'languages');
    }

    public function enqueue_frontend_assets()
    {
        if (!has_block('content-blocks/hero')
            && !has_block('content-blocks/testimonials')
            && !has_block('content-blocks/pricing-table')
            && !has_block('content-blocks/faq-accordion')
            && !has_block('content-blocks/team-members')
            && !has_block('content-blocks/stats-counter')
            && !has_block('content-blocks/timeline')
        ) {
            return;
        }

        $css_path = 'assets/css/style.css';
        $js_path  = 'assets/js/frontend.js';

        $css_url = CB_PLUGIN_URL . $css_path;
        $js_url  = CB_PLUGIN_URL . $js_path;

        $css_ver = file_exists(CB_PLUGIN_DIR . $css_path) ? filemtime(CB_PLUGIN_DIR . $css_path) : CB_VERSION;
        $js_ver  = file_exists(CB_PLUGIN_DIR . $js_path) ? filemtime(CB_PLUGIN_DIR . $js_path) : CB_VERSION;

        wp_enqueue_style('cb-frontend', $css_url, [], $css_ver);
        wp_enqueue_script('cb-frontend', $js_url, [], $js_ver, true);
    }
}
