<?php
/**
 * Plugin Name: FM Clean Head
 * Plugin URI: https://portfolio-six-gamma-33.vercel.app/wordpress
 * Description: Removes unnecessary meta tags, emoji scripts, and generator links from wp_head.
 * Version: 1.0.0
 * Author: Farid Makhmudov
 * Author URI: https://portfolio-six-gamma-33.vercel.app
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL v2 or later
 * Text Domain: fm-clean-head
 */

if (!defined('ABSPATH')) {
    exit;
}

final class FM_Clean_Head {
    public static function init(): void {
        remove_action('wp_head', 'wp_generator');
        remove_action('wp_head', 'rsd_link');
        remove_action('wp_head', 'wlwmanifest_link');
        remove_action('wp_head', 'wp_shortlink_wp_head');
        remove_action('wp_head', 'rest_output_link_wp_head');
        remove_action('wp_head', 'wp_oembed_add_discovery_links');
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');
    }
}

FM_Clean_Head::init();
