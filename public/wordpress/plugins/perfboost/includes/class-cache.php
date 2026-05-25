<?php
/**
 * Page caching engine — stores rendered HTML as static files
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

class PB_Cache
{
    private static $instance = null;
    private $settings;
    private $cache_file;
    private $cache_ttl;

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function init()
    {
        $this->settings  = get_option('pb_settings', []);
        $this->cache_ttl = !empty($this->settings['cache_ttl']) ? intval($this->settings['cache_ttl']) : 3600;

        add_action('template_redirect', [$this, 'serve_cache'], PHP_INT_MIN);
        add_action('wp', [$this, 'start_buffer'], PHP_INT_MIN);
        add_action('shutdown', [$this, 'save_cache'], PHP_INT_MAX);
        add_action('save_post', [$this, 'purge_post_cache']);
        add_action('comment_post', [$this, 'purge_post_cache']);
        add_action('wp_trash_post', [$this, 'purge_post_cache']);
    }

    public function serve_cache()
    {
        if ($this->is_excluded()) {
            return;
        }

        $this->cache_file = $this->get_cache_file_path();

        if ($this->cache_file && file_exists($this->cache_file)) {
            $age = time() - filemtime($this->cache_file);
            if ($age < $this->cache_ttl) {
                header('X-PerfBoost-Cache: HIT');
                header('Content-Type: text/html; charset=' . get_bloginfo('charset'));
                readfile($this->cache_file);
                exit;
            }
        }
    }

    public function start_buffer()
    {
        if ($this->is_excluded()) {
            return;
        }

        $this->cache_file = $this->get_cache_file_path();

        ob_start(function ($buffer) {
            if (strlen($buffer) < 255) {
                return $buffer;
            }

            $this->write_cache($buffer);
            return $buffer;
        });
    }

    public function save_cache()
    {
        if (ob_get_level()) {
            ob_end_flush();
        }
    }

    private function write_cache($buffer)
    {
        if (!$this->cache_file) {
            return;
        }

        $dir = dirname($this->cache_file);
        if (!is_dir($dir)) {
            wp_mkdir_p($dir);
        }

        $buffer = preg_replace('/<!--(.|\s)*?-->/', '', $buffer);
        $buffer = preg_replace('/\s+/', ' ', $buffer);
        $buffer = trim($buffer);

        file_put_contents($this->cache_file, $buffer, LOCK_EX);
    }

    public static function clear_all()
    {
        if (is_dir(PB_CACHE_DIR)) {
            $items = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator(PB_CACHE_DIR, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::CHILD_FIRST
            );
            foreach ($items as $item) {
                $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
            }
        }
    }

    public function purge_post_cache($post_id)
    {
        $post = get_post($post_id);
        if (!$post) {
            return;
        }

        $permalink = get_permalink($post_id);
        if (!$permalink) {
            return;
        }

        $hash = md5($permalink);
        $file = PB_CACHE_DIR . substr($hash, 0, 2) . '/' . $hash . '.html';

        if (file_exists($file)) {
            unlink($file);
        }
    }

    public static function get_cache_size()
    {
        $size = 0;
        if (!is_dir(PB_CACHE_DIR)) {
            return '0 B';
        }

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator(PB_CACHE_DIR, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            $size += $file->getSize();
        }

        return size_format($size);
    }

    private function get_cache_file_path()
    {
        $scheme = is_ssl() ? 'https' : 'http';
        $host   = isset($_SERVER['HTTP_HOST']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_HOST'])) : '';
        $uri    = isset($_SERVER['REQUEST_URI']) ? esc_url_raw(wp_unslash($_SERVER['REQUEST_URI'])) : '/';
        $url    = $scheme . '://' . $host . $uri;
        $hash   = md5($url);
        $dir    = substr($hash, 0, 2);

        return PB_CACHE_DIR . $dir . '/' . $hash . '.html';
    }

    private function is_excluded()
    {
        if (is_user_logged_in()) {
            return true;
        }

        if (is_admin() || is_404() || is_search() || is_feed() || is_trackback() || is_robots() || is_preview()) {
            return true;
        }

        if (defined('DOING_AJAX') && DOING_AJAX) {
            return true;
        }

        if (defined('DOING_CRON') && DOING_CRON) {
            return true;
        }

        if (isset($_POST) && !empty($_POST)) {
            return true;
        }

        if (isset($_COOKIE) && !empty($_COOKIE)) {
            foreach (array_keys($_COOKIE) as $cookie) {
                if (strpos($cookie, 'wordpress_logged_in') !== false || strpos($cookie, 'comment_author') !== false) {
                    return true;
                }
            }
        }

        return false;
    }
}
