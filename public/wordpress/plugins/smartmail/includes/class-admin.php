<?php
/**
 * Admin page — SMTP settings, email log with WP_List_Table, stats cards
 *
 * @package SmartMail
 */

defined('ABSPATH') || exit;

if (!class_exists('WP_List_Table')) {
    require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}

class SM_Email_Log_Table extends WP_List_Table
{
    public function __construct()
    {
        parent::__construct([
            'singular' => 'email',
            'plural'   => 'emails',
            'ajax'     => false,
        ]);
    }

    public function get_columns()
    {
        return [
            'cb'         => '<input type="checkbox">',
            'subject'    => __('Subject', 'smartmail'),
            'to'         => __('To', 'smartmail'),
            'status'     => __('Status', 'smartmail'),
            'attachments'=> __('Attachments', 'smartmail'),
            'created_at' => __('Date', 'smartmail'),
        ];
    }

    protected function get_sortable_columns()
    {
        return [
            'subject'    => ['subject', false],
            'status'     => ['status', false],
            'created_at' => ['created_at', true],
        ];
    }

    protected function column_default($item, $column_name)
    {
        return esc_html($item[$column_name] ?? '');
    }

    protected function column_cb($item)
    {
        return '<input type="checkbox" name="email_ids[]" value="' . intval($item['id']) . '">';
    }

    protected function column_status($item)
    {
        if ($item['status'] === 'sent') {
            return '<span class="sm-status sm-status--sent">' . esc_html__('Sent', 'smartmail') . '</span>';
        }
        $error = !empty($item['error_msg']) ? esc_html($item['error_msg']) : esc_html__('Unknown error', 'smartmail');
        return '<span class="sm-status sm-status--failed" title="' . $error . '">' . esc_html__('Failed', 'smartmail') . '</span>';
    }

    public function prepare_items()
    {
        global $wpdb;
        $table = $wpdb->prefix . SM_Logger::TABLE;

        $per_page = 20;
        $current_page = $this->get_pagenum();
        $orderby = isset($_GET['orderby']) && in_array($_GET['orderby'], ['subject', 'status', 'created_at'])
            ? sanitize_sql_orderby($_GET['orderby'])
            : 'created_at';
        $order = isset($_GET['order']) && strtoupper($_GET['order']) === 'ASC' ? 'ASC' : 'DESC';

        $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}");
        $this->set_pagination_args([
            'total_items' => $total,
            'per_page'    => $per_page,
        ]);

        $this->_column_headers = [$this->get_columns(), [], $this->get_sortable_columns()];

        $offset = ($current_page - 1) * $per_page;
        $this->items = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$table} ORDER BY {$orderby} {$order} LIMIT %d OFFSET %d",
                $per_page,
                $offset
            ),
            ARRAY_A
        );
    }
}

class SM_Admin
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
        add_action('admin_menu', [$this, 'add_menu_pages']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('wp_ajax_sm_save_settings', [$this, 'ajax_save_settings']);
    }

    public function add_menu_pages()
    {
        add_options_page(
            __('SmartMail', 'smartmail'),
            __('SmartMail', 'smartmail'),
            'manage_options',
            'smartmail',
            [$this, 'render_page']
        );
    }

    public function enqueue_assets($hook)
    {
        if ('settings_page_smartmail' !== $hook) {
            return;
        }

        wp_enqueue_style('sm-admin', SM_PLUGIN_URL . 'assets/css/admin.css', [], SM_VERSION);
        wp_enqueue_script('sm-admin', SM_PLUGIN_URL . 'assets/js/admin.js', ['jquery'], SM_VERSION, true);

        wp_localize_script('sm-admin', 'smData', [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'nonce'   => wp_create_nonce('sm_nonce'),
            'i18n'    => [
                'saved'   => __('Settings saved.', 'smartmail'),
                'error'   => __('An error occurred.', 'smartmail'),
            ],
        ]);
    }

    public function render_page()
    {
        $tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'settings';
        ?>
        <div class="wrap sm-wrap">
            <h1><?php esc_html_e('SmartMail', 'smartmail'); ?></h1>
            <nav class="sm-nav-tabs">
                <a href="?page=smartmail&tab=settings" class="sm-nav-tab <?php echo 'settings' === $tab ? 'sm-nav-tab--active' : ''; ?>"><?php esc_html_e('SMTP Settings', 'smartmail'); ?></a>
                <a href="?page=smartmail&tab=log"      class="sm-nav-tab <?php echo 'log'      === $tab ? 'sm-nav-tab--active' : ''; ?>"><?php esc_html_e('Email Log', 'smartmail'); ?></a>
                <a href="?page=smartmail&tab=test"      class="sm-nav-tab <?php echo 'test'     === $tab ? 'sm-nav-tab--active' : ''; ?>"><?php esc_html_e('Test Email', 'smartmail'); ?></a>
            </nav>
            <div class="sm-panel">
                <?php $this->render_tab($tab); ?>
            </div>
        </div>
        <?php
    }

    private function render_tab($tab)
    {
        switch ($tab) {
            case 'settings': $this->render_settings_tab(); break;
            case 'log':      $this->render_log_tab();      break;
            case 'test':     $this->render_test_tab();      break;
        }
    }

    private function render_settings_tab()
    {
        $s = get_option('smartmail_settings', []);
        ?>
        <form class="sm-form" data-tab="settings">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Enable SMTP', 'smartmail'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="smtp_enabled" value="1" <?php checked(!empty($s['smtp_enabled'])); ?>>
                            <?php esc_html_e('Use custom SMTP server for all outgoing emails', 'smartmail'); ?>
                        </label>
                    </td>
                </tr>
                <tr><td colspan="2"><hr><strong><?php esc_html_e('SMTP Server', 'smartmail'); ?></strong></td></tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Host', 'smartmail'); ?></th>
                    <td><input type="text" name="smtp_host" value="<?php echo esc_attr($s['smtp_host'] ?? ''); ?>" class="regular-text" placeholder="smtp.sendgrid.net"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Port', 'smartmail'); ?></th>
                    <td><input type="number" name="smtp_port" value="<?php echo esc_attr($s['smtp_port'] ?? 587); ?>" class="small-text" min="1" max="65535"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Encryption', 'smartmail'); ?></th>
                    <td>
                        <select name="smtp_secure">
                            <option value="tls" <?php selected($s['smtp_secure'] ?? '', 'tls'); ?>>TLS</option>
                            <option value="ssl" <?php selected($s['smtp_secure'] ?? '', 'ssl'); ?>>SSL</option>
                            <option value=""    <?php selected($s['smtp_secure'] ?? '', '');   ?>><?php esc_html_e('None', 'smartmail'); ?></option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Authentication', 'smartmail'); ?></th>
                    <td>
                        <label><input type="checkbox" name="smtp_auth" value="1" <?php checked(!empty($s['smtp_auth'])); ?>> <?php esc_html_e('Use SMTP authentication', 'smartmail'); ?></label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Username', 'smartmail'); ?></th>
                    <td><input type="text" name="smtp_username" value="<?php echo esc_attr($s['smtp_username'] ?? ''); ?>" class="regular-text" autocomplete="off"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Password', 'smartmail'); ?></th>
                    <td><input type="password" name="smtp_password" value="<?php echo esc_attr($s['smtp_password'] ?? ''); ?>" class="regular-text" autocomplete="off"></td>
                </tr>
                <tr><td colspan="2"><hr><strong><?php esc_html_e('From Address', 'smartmail'); ?></strong></td></tr>
                <tr>
                    <th scope="row"><?php esc_html_e('From Email', 'smartmail'); ?></th>
                    <td><input type="email" name="from_email" value="<?php echo esc_attr($s['from_email'] ?? ''); ?>" class="regular-text" placeholder="<?php echo esc_attr(get_option('admin_email')); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('From Name', 'smartmail'); ?></th>
                    <td><input type="text" name="from_name" value="<?php echo esc_attr($s['from_name'] ?? ''); ?>" class="regular-text" placeholder="<?php echo esc_attr(get_bloginfo('name')); ?>"></td>
                </tr>
                <tr><td colspan="2"><hr><strong><?php esc_html_e('Logging', 'smartmail'); ?></strong></td></tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Log Emails', 'smartmail'); ?></th>
                    <td>
                        <label>
                            <input type="checkbox" name="logging_enabled" value="1" <?php checked(!empty($s['logging_enabled'])); ?>>
                            <?php esc_html_e('Save all outgoing emails to database', 'smartmail'); ?>
                        </label>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Retention', 'smartmail'); ?></th>
                    <td>
                        <input type="number" name="log_retention" value="<?php echo esc_attr($s['log_retention'] ?? 30); ?>" class="small-text" min="1" max="365">
                        <span><?php esc_html_e('days', 'smartmail'); ?></span>
                    </td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'smartmail'); ?></button></p>
        </form>
        <?php
    }

    private function render_log_tab()
    {
        $stats = SM_Logger::get_stats();
        ?>
        <div class="sm-stats-cards">
            <div class="sm-stat-card">
                <span class="sm-stat-card__value"><?php echo esc_html($stats['total']); ?></span>
                <span class="sm-stat-card__label"><?php esc_html_e('Total', 'smartmail'); ?></span>
            </div>
            <div class="sm-stat-card sm-stat-card--sent">
                <span class="sm-stat-card__value"><?php echo esc_html($stats['sent']); ?></span>
                <span class="sm-stat-card__label"><?php esc_html_e('Sent', 'smartmail'); ?></span>
            </div>
            <div class="sm-stat-card sm-stat-card--failed">
                <span class="sm-stat-card__value"><?php echo esc_html($stats['failed']); ?></span>
                <span class="sm-stat-card__label"><?php esc_html_e('Failed', 'smartmail'); ?></span>
            </div>
        </div>
        <?php
        $table = new SM_Email_Log_Table();
        $table->prepare_items();
        $table->display();
    }

    private function render_test_tab()
    {
        ?>
        <form class="sm-form sm-test-form" data-tab="test">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Send To', 'smartmail'); ?></th>
                    <td><input type="email" name="test_email" value="<?php echo esc_attr(get_option('admin_email')); ?>" class="regular-text" required></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Subject', 'smartmail'); ?></th>
                    <td><input type="text" name="test_subject" value="<?php esc_attr_e('SmartMail Test Email', 'smartmail'); ?>" class="regular-text"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Message', 'smartmail'); ?></th>
                    <td><textarea name="test_message" rows="6" class="large-text"><?php esc_html_e('This is a test email from SmartMail plugin.', 'smartmail'); ?></textarea></td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Send Test Email', 'smartmail'); ?></button></p>
            <div class="sm-test-result" style="display:none;"></div>
        </form>
        <?php
    }

    public function ajax_save_settings()
    {
        check_ajax_referer('sm_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die(-1);
        }

        $settings = [
            'smtp_enabled'    => !empty($_POST['smtp_enabled']) ? 1 : 0,
            'smtp_host'       => isset($_POST['smtp_host'])     ? sanitize_text_field(wp_unslash($_POST['smtp_host'])) : '',
            'smtp_port'       => isset($_POST['smtp_port'])     ? intval($_POST['smtp_port']) : 587,
            'smtp_secure'     => isset($_POST['smtp_secure'])   ? sanitize_text_field(wp_unslash($_POST['smtp_secure'])) : 'tls',
            'smtp_auth'       => !empty($_POST['smtp_auth'])    ? 1 : 0,
            'smtp_username'   => isset($_POST['smtp_username']) ? sanitize_text_field(wp_unslash($_POST['smtp_username'])) : '',
            'smtp_password'   => isset($_POST['smtp_password']) ? SM_Mailer::instance()->encrypt(wp_unslash($_POST['smtp_password'])) : '',
            'from_email'      => isset($_POST['from_email'])    ? sanitize_email(wp_unslash($_POST['from_email'])) : '',
            'from_name'       => isset($_POST['from_name'])     ? sanitize_text_field(wp_unslash($_POST['from_name'])) : '',
            'logging_enabled' => !empty($_POST['logging_enabled']) ? 1 : 0,
            'log_retention'   => isset($_POST['log_retention']) ? intval($_POST['log_retention']) : 30,
        ];

        update_option('smartmail_settings', $settings);

        if (!empty($settings['logging_enabled'])) {
            SM_Logger::install_table();
        }

        if (!$settings['logging_enabled']) {
            delete_option('smartmail_logging_enabled');
        } else {
            update_option('smartmail_logging_enabled', 1);
        }

        wp_send_json_success(['message' => __('Settings saved.', 'smartmail')]);
    }
}
