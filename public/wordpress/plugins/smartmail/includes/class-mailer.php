<?php
/**
 * SMTP mailer — overrides PHPMailer with provider-specific settings
 *
 * @package SmartMail
 */

defined('ABSPATH') || exit;

class SM_Mailer
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
        $settings = get_option('smartmail_settings', []);

        if (empty($settings['smtp_enabled'])) {
            return;
        }

        add_action('phpmailer_init', [$this, 'configure_phpmailer']);
        add_filter('wp_mail_from', [$this, 'set_from_email']);
        add_filter('wp_mail_from_name', [$this, 'set_from_name']);
    }

    public function configure_phpmailer($phpmailer)
    {
        $settings = get_option('smartmail_settings', []);

        $phpmailer->isSMTP();
        $phpmailer->Host       = $settings['smtp_host'] ?? '';
        $phpmailer->Port       = intval($settings['smtp_port'] ?? 587);
        $phpmailer->SMTPAuth   = !empty($settings['smtp_auth']);
        $phpmailer->Username   = $settings['smtp_username'] ?? '';
        $phpmailer->Password   = $this->decrypt($settings['smtp_password'] ?? '');
        $phpmailer->SMTPSecure = $settings['smtp_secure'] ?? 'tls';
        $phpmailer->From       = $settings['from_email'] ?? get_option('admin_email');
        $phpmailer->FromName   = $settings['from_name'] ?? get_bloginfo('name');
        $phpmailer->Timeout    = 30;
    }

    public function set_from_email($email)
    {
        $settings = get_option('smartmail_settings', []);
        return !empty($settings['from_email']) ? $settings['from_email'] : $email;
    }

    public function set_from_name($name)
    {
        $settings = get_option('smartmail_settings', []);
        return !empty($settings['from_name']) ? $settings['from_name'] : $name;
    }

    public function encrypt($value)
    {
        if (empty($value)) return '';
        return base64_encode(wp_salt() . '||' . $value);
    }

    public function decrypt($value)
    {
        if (empty($value)) return '';
        $parts = explode('||', base64_decode($value), 2);
        return isset($parts[1]) && $parts[0] === wp_salt() ? $parts[1] : '';
    }
}
