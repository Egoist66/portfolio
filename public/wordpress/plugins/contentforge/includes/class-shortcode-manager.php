<?php
/**
 * Shortcode manager — registers user-defined shortcodes
 *
 * @package ContentForge
 */

defined('ABSPATH') || exit;

class CF_Shortcode_Manager
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
        $shortcodes = get_option(CF_SHORTCODES_OPTION, []);

        foreach ($shortcodes as $tag => $config) {
            add_shortcode($tag, function ($atts, $content = null) use ($config) {
                return $this->render($config, $atts, $content);
            });
        }
    }

    private function render($config, $atts, $content)
    {
        $type       = $config['type'] ?? 'static';
        $post_type  = $config['post_type'] ?? 'post';
        $template   = $config['template'] ?? '<h3>{title}</h3><p>{excerpt}</p>';
        $limit      = intval($config['limit'] ?? 5);
        $static_html = $config['html'] ?? '';

        if ($type === 'static') {
            return do_shortcode($static_html);
        }

        if ($type === 'dynamic') {
            $args = [
                'post_type'      => $post_type,
                'posts_per_page' => $limit,
                'post_status'    => 'publish',
            ];

            $query = new WP_Query($args);
            $output = '';

            if ($query->have_posts()) {
                $output .= '<div class="cf-shortcode-list cf-shortcode-list--' . esc_attr($post_type) . '">';
                while ($query->have_posts()) {
                    $query->the_post();
                    $item = str_replace(
                        ['{title}', '{excerpt}', '{content}', '{date}', '{permalink}', '{thumbnail}'],
                        [
                            get_the_title(),
                            get_the_excerpt(),
                            get_the_content(),
                            get_the_date(),
                            get_permalink(),
                            get_the_post_thumbnail_url(get_the_ID(), 'thumbnail') ?: '',
                        ],
                        $template
                    );
                    $output .= '<div class="cf-shortcode-item">' . wp_kses_post($item) . '</div>';
                }
                $output .= '</div>';
                wp_reset_postdata();
            }

            return $output;
        }

        if ($type === 'custom') {
            $fn = $config['callback'] ?? '';
            if (function_exists($fn)) {
                return call_user_func($fn, $atts, $content);
            }
            return '<!-- cf: callback not found -->';
        }

        return '';
    }

    public static function get_all()
    {
        return get_option(CF_SHORTCODES_OPTION, []);
    }

    public static function save($tag, $config)
    {
        $shortcodes = get_option(CF_SHORTCODES_OPTION, []);
        $shortcodes[$tag] = $config;
        update_option(CF_SHORTCODES_OPTION, $shortcodes);
    }

    public static function delete($tag)
    {
        $shortcodes = get_option(CF_SHORTCODES_OPTION, []);
        unset($shortcodes[$tag]);
        update_option(CF_SHORTCODES_OPTION, $shortcodes);
    }
}
