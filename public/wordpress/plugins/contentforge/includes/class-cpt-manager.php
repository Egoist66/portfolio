<?php
/**
 * Custom Post Type manager — registers CPTs from saved configuration
 *
 * @package ContentForge
 */

defined('ABSPATH') || exit;

class CF_CPT_Manager
{
    private static $instance = null;

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function register_all()
    {
        $post_types = get_option(CF_POST_TYPES_OPTION, []);

        foreach ($post_types as $slug => $config) {
            $this->register_single($slug, $config);
        }
    }

    public function register_single($slug, $config)
    {
        $plural   = $config['plural']   ?? $slug;
        $singular = $config['singular'] ?? $slug;
        $icon     = $config['icon']     ?? 'dashicons-admin-post';
        $supports = $config['supports'] ?? ['title', 'editor', 'thumbnail'];
        $public   = !empty($config['public']);
        $has_archive = !empty($config['has_archive']);
        $rewrite_slug = !empty($config['rewrite_slug']) ? $config['rewrite_slug'] : $slug;

        register_post_type($slug, [
            'labels' => [
                'name'               => $plural,
                'singular_name'      => $singular,
                'add_new'            => sprintf(__('Add New %s', 'contentforge'), $singular),
                'add_new_item'       => sprintf(__('Add New %s', 'contentforge'), $singular),
                'edit_item'          => sprintf(__('Edit %s', 'contentforge'), $singular),
                'view_item'          => sprintf(__('View %s', 'contentforge'), $singular),
                'search_items'       => sprintf(__('Search %s', 'contentforge'), $plural),
                'not_found'          => sprintf(__('No %s found', 'contentforge'), $plural),
                'all_items'          => sprintf(__('All %s', 'contentforge'), $plural),
            ],
            'public'       => $public,
            'has_archive'  => $has_archive,
            'rewrite'      => ['slug' => $rewrite_slug],
            'supports'     => $supports,
            'menu_icon'    => $icon,
            'show_in_rest' => true,
        ]);
    }

    public static function get_all()
    {
        return get_option(CF_POST_TYPES_OPTION, []);
    }

    public static function save($slug, $config)
    {
        $types = get_option(CF_POST_TYPES_OPTION, []);
        $types[$slug] = $config;
        update_option(CF_POST_TYPES_OPTION, $types);
        self::instance()->register_all();
        flush_rewrite_rules();
    }

    public static function delete($slug)
    {
        $types = get_option(CF_POST_TYPES_OPTION, []);
        unset($types[$slug]);
        update_option(CF_POST_TYPES_OPTION, $types);
        flush_rewrite_rules();
    }
}
