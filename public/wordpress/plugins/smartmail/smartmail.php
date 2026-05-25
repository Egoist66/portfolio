<?php
/**
 * Plugin Name: SmartMail
 * Plugin URI:  https://portfolio.dev/smartmail
 * Description: Enterprise-grade transactional email — SMTP, logging with status/history, HTML templates, test tool, and weekly digests.
 * Version:     1.0.0
 * Author:      Your Portfolio
 * Author URI:  https://portfolio.dev
 * License:     GPL v2 or later
 * Text Domain: smartmail
 *
 * @package SmartMail
 */

defined('ABSPATH') || exit;

define('SM_VERSION', '1.0.0');
define('SM_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SM_PLUGIN_URL', plugin_dir_url(__FILE__));

require_once SM_PLUGIN_DIR . 'includes/class-mailer.php';
require_once SM_PLUGIN_DIR . 'includes/class-logger.php';
require_once SM_PLUGIN_DIR . 'includes/class-admin.php';
require_once SM_PLUGIN_DIR . 'includes/class-tester.php';

add_action('plugins_loaded', function () {
    load_plugin_textdomain('smartmail', false, dirname(plugin_basename(__FILE__)) . '/languages');
});

register_activation_hook(__FILE__, ['SM_Logger', 'install_table']);
register_uninstall_hook(__FILE__, ['SM_Logger', 'uninstall']);

add_action('init', function () {
    SM_Mailer::instance()->init();
    SM_Logger::instance()->init();
});

if (is_admin()) {
    SM_Admin::instance()->init();
    SM_Tester::instance()->init();
}
