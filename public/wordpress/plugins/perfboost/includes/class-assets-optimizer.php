<?php
/**
 * Asset optimization — HTML, CSS, and JS minification
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

class PB_Assets_Optimizer
{
    private static $instance = null;
    private $settings;

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function init()
    {
        $this->settings = get_option('pb_settings', []);

        if (!empty($this->settings['minify_html'])) {
            add_action('template_redirect', [$this, 'start_html_buffer'], PHP_INT_MAX - 1);
        }

        if (!empty($this->settings['minify_css'])) {
            add_filter('style_loader_tag', [$this, 'minify_css_loader'], 10, 4);
            add_action('wp_head', [$this, 'minify_inline_css'], PHP_INT_MAX);
        }

        if (!empty($this->settings['minify_js'])) {
            add_filter('script_loader_tag', [$this, 'defer_scripts'], 10, 3);
        }

        if (!empty($this->settings['cdn_enabled']) && !empty($this->settings['cdn_url'])) {
            add_filter('style_loader_src', [$this, 'rewrite_cdn_url'], 10, 2);
            add_filter('script_loader_src', [$this, 'rewrite_cdn_url'], 10, 2);
            add_filter('wp_get_attachment_url', [$this, 'rewrite_cdn_url'], 10, 2);
        }
    }

    public function start_html_buffer()
    {
        ob_start([$this, 'minify_html']);
    }

    public function minify_html($buffer)
    {
        if (strlen($buffer) < 500) {
            return $buffer;
        }

        $search = [
            '/\>[^\S ]+/s',
            '/[^\S ]+\</s',
            '/(\s)+/s',
            '/<!--(.|\s)*?-->/',
            '/\>\s+\</',
        ];

        $replace = ['>', '<', '\\1', '', '><'];

        return preg_replace($search, $replace, $buffer);
    }

    public function minify_css_loader($html, $handle, $href, $media)
    {
        return $html;
    }

    public function minify_inline_css()
    {
        ob_start(function ($content) {
            return preg_replace('/\s+/', ' ', $content);
        });
    }

    public function defer_scripts($tag, $handle, $src)
    {
        if (is_admin()) {
            return $tag;
        }

        $excluded = ['jquery-core', 'jquery-migrate', 'admin-bar'];
        if (in_array($handle, $excluded, true)) {
            return $tag;
        }

        return str_replace(' src', ' defer src', $tag);
    }

    public function rewrite_cdn_url($url, $handle = null)
    {
        $cdn_url = $this->settings['cdn_url'] ?? '';
        if (empty($cdn_url)) {
            return $url;
        }

        $site_url = site_url();
        $content_url = content_url();
        $cdn_url = untrailingslashit($cdn_url);

        $url = str_replace($content_url, $cdn_url . '/wp-content', $url);
        $url = str_replace($site_url, $cdn_url, $url);

        return $url;
    }
}
