(function ($) {
    'use strict';

    var cf = {
        fieldIndex: 100,

        init: function () {
            this.bindForms();
            this.bindDeletes();
            this.bindFieldRows();
            this.bindShortcodeType();
            this.bindColorPicker();
            this.bindImagePicker();
        },

        bindForms: function () {
            $('.cf-form').on('submit', function (e) {
                e.preventDefault();
                var $form = $(this);
                var action = $form.data('action');
                var data = $form.serializeArray();
                data.push({ name: 'action', value: action });
                data.push({ name: 'nonce', value: cfData.nonce });

                $.post(cfData.ajaxUrl, data)
                    .done(function (res) {
                        if (res.success) {
                            cf.notify(res.data.message, 'success');
                            setTimeout(function () { location.reload(); }, 800);
                        } else {
                            cf.notify(res.data.message || cfData.i18n.error, 'error');
                        }
                    })
                    .fail(function () { cf.notify(cfData.i18n.error, 'error'); });
            });
        },

        bindDeletes: function () {
            $('.cf-delete-cpt').on('click', function () {
                if (!confirm(cfData.i18n.confirmDel)) return;
                $.post(cfData.ajaxUrl, { action: 'cf_delete_cpt', slug: $(this).data('slug'), nonce: cfData.nonce })
                    .done(function (r) { if (r.success) location.reload(); });
            });

            $('.cf-delete-group').on('click', function () {
                if (!confirm(cfData.i18n.confirmDel)) return;
                $.post(cfData.ajaxUrl, { action: 'cf_delete_field_group', id: $(this).data('id'), nonce: cfData.nonce })
                    .done(function (r) { if (r.success) location.reload(); });
            });

            $('.cf-delete-shortcode').on('click', function () {
                if (!confirm(cfData.i18n.confirmDel)) return;
                $.post(cfData.ajaxUrl, { action: 'cf_delete_shortcode', tag: $(this).data('tag'), nonce: cfData.nonce })
                    .done(function (r) { if (r.success) location.reload(); });
            });
        },

        bindFieldRows: function () {
            var $list = $('.cf-fields-list');

            $list.on('click', '.cf-remove-field', function () {
                $(this).closest('.cf-field-row').remove();
            });

            $('.cf-add-field').on('click', function () {
                var i = cf.fieldIndex++;
                var html = '<div class="cf-field-row">'
                    + '<input type="text" name="fields[' + i + '][key]" placeholder="meta_key" class="cf-field-key">'
                    + '<input type="text" name="fields[' + i + '][label]" placeholder="Label">'
                    + '<select name="fields[' + i + '][type]">'
                    + '<option value="text">Text</option><option value="textarea">Textarea</option><option value="wysiwyg">WYSIWYG</option>'
                    + '<option value="url">URL</option><option value="email">Email</option><option value="number">Number</option>'
                    + '<option value="checkbox">Checkbox</option><option value="select">Select</option><option value="image">Image</option><option value="color">Color</option>'
                    + '</select>'
                    + '<input type="text" name="fields[' + i + '][description]" placeholder="Description" class="cf-field-desc">'
                    + '<button type="button" class="button cf-remove-field">&times;</button>'
                    + '</div>';
                $list.append(html);
            });
        },

        bindShortcodeType: function () {
            $('select[name="type"]').on('change', function () {
                var val = $(this).val();
                $('.cf-shortcode-static').toggle(val === 'static');
                $('.cf-shortcode-dynamic').toggle(val === 'dynamic');
            });
        },

        bindColorPicker: function () {
            if ($.fn.wpColorPicker) {
                $('.cf-color-picker').wpColorPicker();
            }
        },

        bindImagePicker: function () {
            $(document).on('click', '.cf-select-image', function (e) {
                e.preventDefault();
                var $btn = $(this);
                var frame = wp.media({
                    title: 'Select Image',
                    library: { type: 'image' },
                    button: { text: 'Use this image' },
                    multiple: false
                });

                frame.on('select', function () {
                    var attachment = frame.state().get('selection').first().toJSON();
                    $btn.siblings('.cf-image-id').val(attachment.id);
                    $btn.siblings('.cf-image-preview').attr('src', attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url).show();
                    $btn.siblings('.cf-remove-image').show();
                });

                frame.open();
            });

            $(document).on('click', '.cf-remove-image', function () {
                $(this).siblings('.cf-image-id').val('');
                $(this).siblings('.cf-image-preview').attr('src', '').hide();
                $(this).hide();
            });
        },

        notify: function (msg, type) {
            var $notice = $('<div class="notice notice-' + type + ' is-dismissible"><p>' + msg + '</p></div>');
            $('.cf-panel').prepend($notice);
            setTimeout(function () { $notice.fadeOut(300, function () { $(this).remove(); }); }, 3500);
        }
    };

    $(document).ready(function () { cf.init(); });
})(jQuery);
