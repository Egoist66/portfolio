<?php
/**
 * Plugin Name: FM SVG Upload
 * Plugin URI: https://portfolio-six-gamma-33.vercel.app/wordpress
 * Description: Enables safe SVG uploads in the WordPress media library for trusted users.
 * Version: 1.0.0
 * Author: Farid Makhmudov
 * Author URI: https://portfolio-six-gamma-33.vercel.app
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL v2 or later
 * Text Domain: fm-svg-upload
 */

if (!defined('ABSPATH')) {
    exit;
}

final class FM_SVG_Upload {
    public static function init(): void {
        add_filter('upload_mimes', [self::class, 'allow_svg_mime']);
        add_filter('wp_check_filetype_and_ext', [self::class, 'fix_svg_filetype'], 10, 4);
        add_filter('wp_handle_upload_prefilter', [self::class, 'sanitize_svg_upload']);
    }

    public static function allow_svg_mime(array $mimes): array {
        if (current_user_can('upload_files')) {
            $mimes['svg'] = 'image/svg+xml';
        }

        return $mimes;
    }

    public static function fix_svg_filetype($data, $file, $filename, $mimes) {
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        if ($extension === 'svg') {
            $data['ext'] = 'svg';
            $data['type'] = 'image/svg+xml';
        }

        return $data;
    }

    public static function sanitize_svg_upload(array $file): array {
        if (empty($file['type']) || $file['type'] !== 'image/svg+xml') {
            return $file;
        }

        if (!current_user_can('upload_files')) {
            $file['error'] = __('You are not allowed to upload SVG files.', 'fm-svg-upload');
            return $file;
        }

        $contents = file_get_contents($file['tmp_name']);

        if ($contents === false) {
            $file['error'] = __('Unable to read SVG file.', 'fm-svg-upload');
            return $file;
        }

        if (preg_match('/<script|onload=|onerror=|javascript:/i', $contents)) {
            $file['error'] = __('SVG file contains potentially unsafe content.', 'fm-svg-upload');
            return $file;
        }

        $sanitized = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $contents);
        file_put_contents($file['tmp_name'], $sanitized);

        return $file;
    }
}

FM_SVG_Upload::init();
