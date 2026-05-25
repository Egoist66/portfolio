<?php
/**
 * Database optimization — cleanup of revisions, drafts, spam, transients
 *
 * @package PerfBoost
 */

defined('ABSPATH') || exit;

class PB_Database_Optimizer
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
        $settings = get_option('pb_settings', []);

        if (!empty($settings['auto_db_cleanup'])) {
            if (!wp_next_scheduled('pb_weekly_db_cleanup')) {
                wp_schedule_event(time(), 'weekly', 'pb_weekly_db_cleanup');
            }
            add_action('pb_weekly_db_cleanup', [__CLASS__, 'cleanup']);
        } else {
            $timestamp = wp_next_scheduled('pb_weekly_db_cleanup');
            if ($timestamp) {
                wp_unschedule_event($timestamp, 'pb_weekly_db_cleanup');
            }
        }
    }

    public static function cleanup()
    {
        global $wpdb;

        self::delete_revisions();
        self::delete_auto_drafts();
        self::delete_spam_comments();
        self::delete_trash_comments();
        self::delete_expired_transients();
        self::delete_oembed_caches();
        self::optimize_tables();

        return true;
    }

    private static function delete_revisions()
    {
        global $wpdb;
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->posts} WHERE post_type = 'revision' AND post_date < %s",
                date('Y-m-d H:i:s', strtotime('-30 days'))
            )
        );
    }

    private static function delete_auto_drafts()
    {
        global $wpdb;
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->posts} WHERE post_status = 'auto-draft' AND post_date < %s",
                date('Y-m-d H:i:s', strtotime('-7 days'))
            )
        );
    }

    private static function delete_spam_comments()
    {
        global $wpdb;
        $wpdb->query("DELETE FROM {$wpdb->comments} WHERE comment_approved = 'spam'");
        $wpdb->query("DELETE FROM {$wpdb->commentmeta} WHERE comment_id NOT IN (SELECT comment_id FROM {$wpdb->comments})");
    }

    private static function delete_trash_comments()
    {
        global $wpdb;
        $wpdb->query("DELETE FROM {$wpdb->comments} WHERE comment_approved = 'trash'");
    }

    private static function delete_expired_transients()
    {
        global $wpdb;
        $time = time();
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->options} WHERE option_name LIKE %s AND option_value < %d",
                $wpdb->esc_like('_transient_timeout_') . '%',
                $time
            )
        );
        $wpdb->query(
            "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%' AND option_name NOT LIKE '_transient_timeout_%'"
        );
    }

    private static function delete_oembed_caches()
    {
        global $wpdb;
        $wpdb->query(
            $wpdb->prepare(
                "DELETE FROM {$wpdb->postmeta} WHERE meta_key LIKE %s",
                $wpdb->esc_like('_oembed_') . '%'
            )
        );
    }

    private static function optimize_tables()
    {
        global $wpdb;
        $tables = $wpdb->get_results("SHOW TABLES", ARRAY_N);
        foreach ($tables as $table) {
            $wpdb->query("OPTIMIZE TABLE {$table[0]}");
        }
    }
}
