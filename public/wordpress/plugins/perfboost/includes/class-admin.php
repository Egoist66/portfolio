<?php
/**
 * Admin settings page with tabbed interface
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

class PB_Admin
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
        add_action('admin_menu', [$this, 'add_menu_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('wp_ajax_pb_save_settings', [$this, 'ajax_save_settings']);
        add_action('wp_ajax_pb_clear_cache', [$this, 'ajax_clear_cache']);
        add_action('wp_ajax_pb_run_db_cleanup', [$this, 'ajax_run_db_cleanup']);
    }

    public function add_menu_page()
    {
        add_management_page(
            __('PerfBoost', 'perfboost'),
            __('PerfBoost', 'perfboost'),
            'manage_options',
            'perfboost',
            [$this, 'render_page']
        );
    }

    public function enqueue_assets($hook)
    {
        if ('tools_page_perfboost' !== $hook) {
            return;
        }

        wp_enqueue_style('pb-admin', PB_PLUGIN_URL . 'assets/css/admin.css', [], PB_VERSION);
        wp_enqueue_script('pb-admin', PB_PLUGIN_URL . 'assets/js/admin.js', ['jquery'], PB_VERSION, true);

        wp_localize_script('pb-admin', 'pbData', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('pb_nonce'),
            'i18n'    => [
                'saved'     => __('Settings saved.', 'perfboost'),
                'cleared'   => __('Cache cleared.', 'perfboost'),
                'dbDone'    => __('Database cleaned.', 'perfboost'),
                'error'     => __('An error occurred.', 'perfboost'),
                'confirmDb' => __('Are you sure you want to clean the database? This action cannot be undone.', 'perfboost'),
            ],
        ]);
    }

    public function render_page()
    {
        $tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'general';
        ?>
        <div class="wrap pb-wrap">
            <h1><?php esc_html_e('PerfBoost', 'perfboost'); ?></h1>
            <nav class="pb-nav-tabs">
                <a href="?page=perfboost&tab=general"   class="pb-nav-tab <?php echo 'general'   === $tab ? 'pb-nav-tab--active' : ''; ?>"><?php esc_html_e('General', 'perfboost'); ?></a>
                <a href="?page=perfboost&tab=cache"     class="pb-nav-tab <?php echo 'cache'     === $tab ? 'pb-nav-tab--active' : ''; ?>"><?php esc_html_e('Cache', 'perfboost'); ?></a>
                <a href="?page=perfboost&tab=assets"    class="pb-nav-tab <?php echo 'assets'    === $tab ? 'pb-nav-tab--active' : ''; ?>"><?php esc_html_e('Assets', 'perfboost'); ?></a>
                <a href="?page=perfboost&tab=database"  class="pb-nav-tab <?php echo 'database'  === $tab ? 'pb-nav-tab--active' : ''; ?>"><?php esc_html_e('Database', 'perfboost'); ?></a>
                <a href="?page=perfboost&tab=cdn"       class="pb-nav-tab <?php echo 'cdn'       === $tab ? 'pb-nav-tab--active' : ''; ?>"><?php esc_html_e('CDN', 'perfboost'); ?></a>
            </nav>

            <div class="pb-panel">
                <?php $this->render_tab($tab); ?>
            </div>
        </div>
        <?php
    }

    private function render_tab($tab)
    {
        $s = $this->settings;

        switch ($tab) {
            case 'general':
                $this->render_general_tab($s);
                break;
            case 'cache':
                $this->render_cache_tab($s);
                break;
            case 'assets':
                $this->render_assets_tab($s);
                break;
            case 'database':
                $this->render_database_tab($s);
                break;
            case 'cdn':
                $this->render_cdn_tab($s);
                break;
        }
    }

    private function render_general_tab($s)
    {
        ?>
        <form class="pb-form" data-tab="general">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Plugin Status', 'perfboost'); ?></th>
                    <td>
                        <div class="pb-status-cards">
                            <div class="pb-status-card">
                                <span class="pb-status-card__value"><?php echo !empty($s['cache_enabled']) ? esc_html__('Active', 'perfboost') : esc_html__('Inactive', 'perfboost'); ?></span>
                                <span class="pb-status-card__label"><?php esc_html_e('Page Cache', 'perfboost'); ?></span>
                            </div>
                            <div class="pb-status-card">
                                <span class="pb-status-card__value"><?php echo !empty($s['lazy_images']) ? esc_html__('Active', 'perfboost') : esc_html__('Inactive', 'perfboost'); ?></span>
                                <span class="pb-status-card__label"><?php esc_html_e('Lazy Load', 'perfboost'); ?></span>
                            </div>
                            <div class="pb-status-card">
                                <span class="pb-status-card__value"><?php echo !empty($s['minify_html']) || !empty($s['minify_css']) || !empty($s['minify_js']) ? esc_html__('Active', 'perfboost') : esc_html__('Inactive', 'perfboost'); ?></span>
                                <span class="pb-status-card__label"><?php esc_html_e('Minification', 'perfboost'); ?></span>
                            </div>
                        </div>
                        <p class="description"><?php esc_html_e('PerfBoost improves your WordPress site performance with caching, asset optimization, and database maintenance.', 'perfboost'); ?></p>
                    </td>
                </tr>
            </table>
        </form>
        <?php
    }

    private function render_cache_tab($s)
    {
        ?>
        <form class="pb-form" data-tab="cache">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Page Cache', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="cache_enabled" value="1" <?php checked(!empty($s['cache_enabled'])); ?>>
                            <?php esc_html_e('Enable page caching for unauthenticated visitors', 'perfboost'); ?>
                        </label>
                        <p class="description"><?php esc_html_e('Pages are stored as static HTML files and served without loading WordPress.', 'perfboost'); ?></p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Cache TTL', 'perfboost'); ?></th>
                    <td>
                        <input type="number" name="cache_ttl" value="<?php echo esc_attr($s['cache_ttl'] ?? 3600); ?>" min="60" max="86400" step="60" class="small-text">
                        <span><?php esc_html_e('seconds (default: 3600 = 1 hour)', 'perfboost'); ?></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Cache Status', 'perfboost'); ?></th>
                    <td>
                        <?php $cache_size = PB_Cache::get_cache_size(); ?>
                        <p><?php printf(esc_html__('Cache size: %s', 'perfboost'), esc_html($cache_size)); ?></p>
                        <button type="button" class="button pb-clear-cache"><?php esc_html_e('Clear Cache Now', 'perfboost'); ?></button>
                    </td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'perfboost'); ?></button></p>
        </form>
        <?php
    }

    private function render_assets_tab($s)
    {
        ?>
        <form class="pb-form" data-tab="assets">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('HTML Minification', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="minify_html" value="1" <?php checked(!empty($s['minify_html'])); ?>>
                            <?php esc_html_e('Remove whitespace and comments from HTML output', 'perfboost'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('CSS Minification', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="minify_css" value="1" <?php checked(!empty($s['minify_css'])); ?>>
                            <?php esc_html_e('Minify inline and enqueued CSS', 'perfboost'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('JS Minification', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="minify_js" value="1" <?php checked(!empty($s['minify_js'])); ?>>
                            <?php esc_html_e('Minify inline and enqueued JavaScript', 'perfboost'); ?>
                        </label>
                        <p class="description"><?php esc_html_e('Minification removes unnecessary characters without changing functionality.', 'perfboost'); ?></p>
                    </td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'perfboost'); ?></button></p>
        </form>
        <?php
    }

    private function render_database_tab($s)
    {
        global $wpdb;

        $stats = [
            'revisions'  => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_type = 'revision'"),
            'drafts'     => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->posts} WHERE post_status = 'auto-draft'"),
            'spam'       => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->comments} WHERE comment_approved = 'spam'"),
            'trash'      => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->comments} WHERE comment_approved = 'trash'"),
            'transients' => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->options} WHERE option_name LIKE '%_transient_%'"),
            'oembed'     => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$wpdb->postmeta} WHERE meta_key LIKE '%oembed%'"),
        ];
        ?>
        <form class="pb-form" data-tab="database">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Auto Cleanup', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="auto_db_cleanup" value="1" <?php checked(!empty($s['auto_db_cleanup'])); ?>>
                            <?php esc_html_e('Run database cleanup weekly (WP Cron)', 'perfboost'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Database Stats', 'perfboost'); ?></th>
                    <td>
                        <table class="pb-db-stats">
                            <tbody>
                                <tr><td><?php esc_html_e('Post Revisions', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['revisions']); ?></strong></td></tr>
                                <tr><td><?php esc_html_e('Auto Drafts', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['drafts']); ?></strong></td></tr>
                                <tr><td><?php esc_html_e('Spam Comments', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['spam']); ?></strong></td></tr>
                                <tr><td><?php esc_html_e('Trash Comments', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['trash']); ?></strong></td></tr>
                                <tr><td><?php esc_html_e('Expired Transients', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['transients']); ?></strong></td></tr>
                                <tr><td><?php esc_html_e('oEmbed Caches', 'perfboost'); ?></td><td><strong><?php echo esc_html($stats['oembed']); ?></strong></td></tr>
                            </tbody>
                        </table>
                        <button type="button" class="button pb-run-db-cleanup"><?php esc_html_e('Clean Database Now', 'perfboost'); ?></button>
                        <span class="pb-spinner" style="display:none;"></span>
                    </td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'perfboost'); ?></button></p>
        </form>
        <?php
    }

    private function render_cdn_tab($s)
    {
        ?>
        <form class="pb-form" data-tab="cdn">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('CDN Integration', 'perfboost'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="cdn_enabled" value="1" <?php checked(!empty($s['cdn_enabled'])); ?>>
                            <?php esc_html_e('Rewrite asset URLs to CDN', 'perfboost'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('CDN URL', 'perfboost'); ?></th>
                    <td>
                        <input type="url" name="cdn_url" value="<?php echo esc_attr($s['cdn_url'] ?? ''); ?>" class="regular-text" placeholder="https://cdn.example.com">
                        <p class="description"><?php esc_html_e('Enter your CDN base URL (without trailing slash). All static assets will be served from this URL.', 'perfboost'); ?></p>
                    </td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'perfboost'); ?></button></p>
        </form>
        <?php
    }

    public function ajax_save_settings()
    {
        check_ajax_referer('pb_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die(-1);
        }

        $tab    = isset($_POST['tab']) ? sanitize_key($_POST['tab']) : '';
        $fields = [];

        switch ($tab) {
            case 'cache':
                $fields = ['cache_enabled', 'cache_ttl'];
                break;
            case 'assets':
                $fields = ['minify_html', 'minify_css', 'minify_js'];
                break;
            case 'database':
                $fields = ['auto_db_cleanup'];
                break;
            case 'cdn':
                $fields = ['cdn_enabled', 'cdn_url'];
                break;
        }

        $settings = get_option('pb_settings', []);
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                $settings[$field] = is_numeric($_POST[$field])
                    ? intval($_POST[$field])
                    : sanitize_text_field(wp_unslash($_POST[$field]));
            } else {
                $settings[$field] = 0;
            }
        }

        if ($tab === 'cache') {
            if (!isset($_POST['cache_enabled'])) {
                PB_Cache::clear_all();
            }
        }

        update_option('pb_settings', $settings);
        wp_send_json_success(['message' => __('Settings saved.', 'perfboost')]);
    }

    public function ajax_clear_cache()
    {
        check_ajax_referer('pb_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die(-1);
        }

        PB_Cache::clear_all();
        wp_send_json_success(['message' => __('Cache cleared.', 'perfboost')]);
    }

    public function ajax_run_db_cleanup()
    {
        check_ajax_referer('pb_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die(-1);
        }

        PB_Database_Optimizer::cleanup();
        wp_send_json_success(['message' => __('Database cleaned.', 'perfboost')]);
    }
}
