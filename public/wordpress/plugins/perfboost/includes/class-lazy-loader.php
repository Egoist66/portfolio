<?php
/**
 * Lazy loading — defers offscreen images and iframes
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

class PB_Lazy_Loader
{
    private static $instance = null;

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function init()
    {
        add_filter('wp_content_img_tag', [$this, 'lazy_image_markup'], 10, 3);
        add_filter('the_content', [$this, 'lazy_content_images'], PHP_INT_MAX);
        add_filter('post_thumbnail_html', [$this, 'lazy_image_markup'], 10, 2);
        add_filter('get_avatar', [$this, 'lazy_image_markup'], 10, 2);
        add_filter('wp_get_attachment_image_attributes', [$this, 'lazy_attributes'], 10, 3);
        add_filter('embed_oembed_html', [$this, 'lazy_iframes'], 10, 4);
    }

    public function lazy_content_images($content)
    {
        if (empty($content) || is_admin() || is_feed()) {
            return $content;
        }

        if (preg_match_all('/<img\s[^>]+>/i', $content, $matches)) {
            foreach ($matches[0] as $img_tag) {
                if (preg_match('/class=[\'"][^\'"]*skip-lazy[^\'"]*[\'"]/i', $img_tag)) {
                    continue;
                }
                if (preg_match('/loading\s*=\s*["\'](?:lazy|eager)["\']/i', $img_tag)) {
                    continue;
                }

                $new_tag = preg_replace('/<img\s/i', '<img loading="lazy" ', $img_tag, 1);
                $content = str_replace($img_tag, $new_tag, $content);
            }
        }

        return $content;
    }

    public function lazy_image_markup($html, $post_id = 0, $args = [])
    {
        if (empty($html) || is_admin() || is_feed()) {
            return $html;
        }

        if (preg_match('/class=[\'"][^\'"]*skip-lazy[^\'"]*[\'"]/i', $html)) {
            return $html;
        }

        if (preg_match('/loading\s*=\s*["\'](?:lazy|eager)["\']/i', $html)) {
            return $html;
        }

        return preg_replace('/<img\s/i', '<img loading="lazy" ', $html, 1);
    }

    public function lazy_attributes($attr, $attachment, $size)
    {
        if (is_admin() || is_feed()) {
            return $attr;
        }

        if (!isset($attr['loading'])) {
            $attr['loading'] = 'lazy';
        }

        return $attr;
    }

    public function lazy_iframes($html, $url, $attr, $post_id)
    {
        if (empty($html) || is_admin() || is_feed()) {
            return $html;
        }

        if (preg_match('/loading\s*=\s*["\'](?:lazy|eager)["\']/i', $html)) {
            return $html;
        }

        return preg_replace('/<iframe\s/i', '<iframe loading="lazy" ', $html, 1);
    }
}
