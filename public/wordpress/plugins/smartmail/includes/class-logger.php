<?php
/**
 * Email logger — stores outgoing emails in a custom table
 *
 * @package SmartMail
 */

defined('ABSPATH') || exit;

class SM_Logger
{
    private static $instance = null;

    const TABLE = 'smartmail_log';

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function init()
    {
        if (!get_option('smartmail_logging_enabled', 0)) {
            return;
        }

        add_filter('wp_mail', [$this, 'capture_email'], PHP_INT_MIN);
        add_action('wp_mail_failed', [$this, 'log_failure']);
        add_action('wp_mail_succeeded', [$this, 'mark_success'], 10, 0);
    }

    public static function install_table()
    {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE;
        $charset = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$table} (
            id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            subject     TEXT NOT NULL,
            message     LONGTEXT NOT NULL,
            headers     TEXT NOT NULL,
            attachments INT UNSIGNED DEFAULT 0,
            `to`        TEXT NOT NULL,
            status      VARCHAR(20) DEFAULT 'sent',
            error_msg   TEXT DEFAULT NULL,
            created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_status (status),
            INDEX idx_created (created_at)
        ) {$charset};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    public static function uninstall()
    {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE;
        $wpdb->query("DROP TABLE IF EXISTS {$table}");
        delete_option('smartmail_settings');
        delete_option('smartmail_logging_enabled');
    }

    private $current_email = [];

    public function capture_email($atts)
    {
        $this->current_email = $atts;
        return $atts;
    }

    public function mark_success()
    {
        $this->log_email('sent');
    }

    public function log_failure($wp_error)
    {
        $this->current_email['error_msg'] = $wp_error->get_error_message();
        $this->log_email('failed');
    }

    private function log_email($status)
    {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE;

        $headers = maybe_serialize($this->current_email['headers'] ?? '');
        $to      = is_array($this->current_email['to']) ? implode(', ', $this->current_email['to']) : ($this->current_email['to'] ?? '');

        $wpdb->insert($table, [
            'subject'     => $this->current_email['subject'] ?? '',
            'message'     => $this->current_email['message'] ?? '',
            'headers'     => $headers,
            'attachments' => is_array($this->current_email['attachments'] ?? null) ? count($this->current_email['attachments']) : 0,
            'to'          => $to,
            'status'      => $status,
            'error_msg'   => $this->current_email['error_msg'] ?? null,
        ]);
    }

    public static function get_stats()
    {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE;

        return [
            'total'  => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table}"),
            'sent'   => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table} WHERE status = 'sent'"),
            'failed' => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$table} WHERE status = 'failed'"),
        ];
    }

    public static function cleanup_old_logs($days = 30)
    {
        global $wpdb;
        $table = $wpdb->prefix . self::TABLE;
        $wpdb->query($wpdb->prepare(
            "DELETE FROM {$table} WHERE created_at < %s",
            date('Y-m-d H:i:s', strtotime("-{$days} days"))
        ));
    }
}
