(function ($) {
    'use strict';

    var sm = {
        init: function () {
            this.bindSettingsForm();
            this.bindTestForm();
        },

        bindSettingsForm: function () {
            $('.sm-form[data-tab="settings"]').on('submit', function (e) {
                e.preventDefault();
                var data = $(this).serializeArray();
                data.push({ name: 'action', value: 'sm_save_settings' });
                data.push({ name: 'nonce', value: smData.nonce });

                $.post(smData.ajaxUrl, data)
                    .done(function (res) {
                        if (res.success) sm.notify(res.data.message, 'success');
                        else sm.notify(smData.i18n.error, 'error');
                    })
                    .fail(function () { sm.notify(smData.i18n.error, 'error'); });
            });
        },

        bindTestForm: function () {
            $('.sm-test-form').on('submit', function (e) {
                e.preventDefault();
                var $btn = $(this).find('button[type="submit"]');
                $btn.prop('disabled', true).text('Sending...');

                var data = $(this).serializeArray();
                data.push({ name: 'action', value: 'sm_send_test' });
                data.push({ name: 'nonce', value: smData.nonce });

                $.post(smData.ajaxUrl, data)
                    .done(function (res) {
                        var $result = $('.sm-test-result');
                        $result.show();
                        if (res.success) {
                            $result.removeClass('sm-test-result--error').addClass('sm-test-result--success').text(res.data.message);
                        } else {
                            $result.removeClass('sm-test-result--success').addClass('sm-test-result--error').text(res.data.message);
                        }
                    })
                    .fail(function () { sm.notify(smData.i18n.error, 'error'); })
                    .always(function () { $btn.prop('disabled', false).text('Send Test Email'); });
            });
        },

        notify: function (msg, type) {
            var $notice = $('<div class="notice notice-' + type + ' is-dismissible"><p>' + msg + '</p></div>');
            $('.sm-panel').prepend($notice);
            setTimeout(function () { $notice.fadeOut(300, function () { $(this).remove(); }); }, 3500);
        }
    };

    $(document).ready(function () { sm.init(); });
})(jQuery);
