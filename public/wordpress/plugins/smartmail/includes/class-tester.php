<?php
/**
 * Test email sender — validates SMTP configuration
 *
 * @package SmartMail
 */

defined('ABSPATH') || exit;

class SM_Tester
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
        add_action('wp_ajax_sm_send_test', [$this, 'ajax_send_test']);
    }

    public function ajax_send_test()
    {
        check_ajax_referer('sm_nonce', 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die(-1);
        }

        $to      = isset($_POST['test_email'])   ? sanitize_email(wp_unslash($_POST['test_email'])) : '';
        $subject = isset($_POST['test_subject']) ? sanitize_text_field(wp_unslash($_POST['test_subject'])) : __('Test', 'smartmail');
        $message = isset($_POST['test_message']) ? wp_kses_post(wp_unslash($_POST['test_message'])) : '';

        if (!is_email($to)) {
            wp_send_json_error(['message' => __('Invalid email address.', 'smartmail')]);
        }

        add_filter('wp_mail_content_type', function () {
            return 'text/html';
        });

        $headers = ['Content-Type: text/html; charset=UTF-8'];
        $body    = '<html><body style="font-family:sans-serif;padding:2rem;">'
                 . '<h2 style="color:#1a1a2e;">' . esc_html($subject) . '</h2>'
                 . '<p>' . nl2br(esc_html($message)) . '</p>'
                 . '<hr><p style="color:#999;font-size:0.85rem;">' . esc_html__('Sent via SmartMail', 'smartmail') . '</p>'
                 . '</body></html>';

        $result = wp_mail($to, $subject, $body, $headers);

        remove_all_filters('wp_mail_content_type');

        if ($result) {
            wp_send_json_success(['message' => __('Test email sent successfully! Check your inbox.', 'smartmail')]);
        } else {
            wp_send_json_error(['message' => __('Failed to send test email. Check your SMTP settings.', 'smartmail')]);
        }
    }
}
