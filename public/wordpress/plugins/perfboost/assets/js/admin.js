(function ($) {
    'use strict';

    var pb = {
        init: function () {
            this.bindForms();
            this.bindClearCache();
            this.bindDbCleanup();
        },

        bindForms: function () {
            $('.pb-form').on('submit', function (e) {
                e.preventDefault();
                var $form = $(this);
                var data = $form.serializeArray();
                data.push({ name: 'action', value: 'pb_save_settings' });
                data.push({ name: 'nonce', value: pbData.nonce });
                data.push({ name: 'tab', value: $form.data('tab') });

                pb.ajax(data, function () {
                    pb.notify(pbData.i18n.saved, 'success');
                });
            });
        },

        bindClearCache: function () {
            $('.pb-clear-cache').on('click', function () {
                if (!confirm('Clear the entire page cache?')) return;
                var data = {
                    action: 'pb_clear_cache',
                    nonce: pbData.nonce
                };
                pb.ajax(data, function () {
                    pb.notify(pbData.i18n.cleared, 'success');
                });
            });
        },

        bindDbCleanup: function () {
            $('.pb-run-db-cleanup').on('click', function () {
                if (!confirm(pbData.i18n.confirmDb)) return;
                var $btn = $(this);
                var $spinner = $btn.siblings('.pb-spinner');
                $spinner.show();
                var data = {
                    action: 'pb_run_db_cleanup',
                    nonce: pbData.nonce
                };
                pb.ajax(data, function () {
                    $spinner.hide();
                    pb.notify(pbData.i18n.dbDone, 'success');
                    location.reload();
                }, function () {
                    $spinner.hide();
                });
            });
        },

        ajax: function (data, done, fail) {
            $.post(pbData.ajaxUrl, data)
                .done(function (res) {
                    if (res.success) {
                        if (done) done(res.data);
                    } else {
                        pb.notify(pbData.i18n.error, 'error');
                        if (fail) fail();
                    }
                })
                .fail(function () {
                    pb.notify(pbData.i18n.error, 'error');
                    if (fail) fail();
                });
        },

        notify: function (message, type) {
            var $notice = $('<div class="pb-notice pb-notice--' + type + '">' + message + '</div>');
            $('.pb-panel').prepend($notice);
            setTimeout(function () {
                $notice.fadeOut(300, function () { $(this).remove(); });
            }, 3500);
        }
    };

    $(document).ready(function () {
        pb.init();
    });
})(jQuery);
