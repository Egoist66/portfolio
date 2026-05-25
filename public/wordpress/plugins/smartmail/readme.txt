=== SmartMail ===
Contributors: portfolio
Tags: smtp, email, mail, logging, transactional
Requires at least: 5.9
Tested up to: 6.4
Stable tag: 1.0.0
License: GPL v2 or later

Enterprise-grade transactional email management — SMTP configuration, full email logging, HTML test tool, and delivery stats.

== Description ==

SmartMail replaces WordPress default `wp_mail()` with a proper SMTP client and provides full visibility into email delivery.

Features:
* **SMTP Configuration** — support for any SMTP provider (SendGrid, Mailgun, SES, Postmark, etc.) with TLS/SSL encryption
* **Email Logging** — every outgoing email is stored in a custom DB table with status (sent/failed), error messages, headers, and timestamps
* **Stats Dashboard** — total/sent/failed counts at a glance
* **WP_List_Table** — sortable, searchable email log with pagination
* **Test Email** — send HTML test emails to verify SMTP configuration
* **Password Encryption** — SMTP credentials encrypted with WordPress salt before storage
* **Log Retention** — configurable auto-cleanup (default 30 days)

== Installation ==

1. Upload `smartmail` to `/wp-content/plugins/`
2. Activate via Plugins screen
3. Go to Settings → SmartMail to configure SMTP

== Changelog ==

= 1.0.0 =
* Initial release
