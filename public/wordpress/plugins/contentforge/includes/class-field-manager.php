<?php
/**
 * Custom Field manager — meta boxes for user-defined fields on any post type
 *
 * @package ContentForge
 */

defined('ABSPATH') || exit;

class CF_Field_Manager
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
        add_action('add_meta_boxes', [$this, 'register_meta_boxes']);
        add_action('save_post', [$this, 'save_fields']);
    }

    public function register_meta_boxes()
    {
        $fields = get_option(CF_FIELDS_OPTION, []);

        foreach ($fields as $group) {
            $post_types = $group['post_types'] ?? ['post'];
            $fields_list = $group['fields'] ?? [];

            if (empty($fields_list)) {
                continue;
            }

            foreach ($post_types as $pt) {
                add_meta_box(
                    'cf-group-' . sanitize_key($group['id']),
                    esc_html($group['title'] ?? __('Custom Fields', 'contentforge')),
                    [$this, 'render_meta_box'],
                    $pt,
                    'normal',
                    'default',
                    ['fields' => $fields_list, 'group_id' => $group['id']]
                );
            }
        }
    }

    public function render_meta_box($post, $meta)
    {
        $fields   = $meta['args']['fields'] ?? [];
        $group_id = $meta['args']['group_id'] ?? '';

        wp_nonce_field('cf_save_fields_' . $group_id, 'cf_nonce_' . $group_id);

        echo '<table class="form-table">';
        foreach ($fields as $field) {
            $key   = $field['key'] ?? '';
            $type  = $field['type'] ?? 'text';
            $label = $field['label'] ?? '';
            $value = get_post_meta($post->ID, $key, true);

            echo '<tr>';
            echo '<th><label for="' . esc_attr($key) . '">' . esc_html($label) . '</label></th>';
            echo '<td>';

            switch ($type) {
                case 'text':
                    echo '<input type="text" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" class="regular-text">';
                    break;
                case 'textarea':
                    echo '<textarea name="' . esc_attr($key) . '" rows="4" class="large-text">' . esc_textarea($value) . '</textarea>';
                    break;
                case 'wysiwyg':
                    wp_editor($value, $key, ['textarea_rows' => 6, 'media_buttons' => false]);
                    break;
                case 'url':
                    echo '<input type="url" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" class="regular-text">';
                    break;
                case 'email':
                    echo '<input type="email" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" class="regular-text">';
                    break;
                case 'number':
                    echo '<input type="number" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" class="small-text" step="any">';
                    break;
                case 'checkbox':
                    echo '<label><input type="checkbox" name="' . esc_attr($key) . '" value="1" ' . checked($value, '1', false) . '> ' . esc_html($field['description'] ?? '') . '</label>';
                    break;
                case 'select':
                    echo '<select name="' . esc_attr($key) . '">';
                    $options = $field['options'] ?? [];
                    foreach ($options as $opt_val => $opt_label) {
                        echo '<option value="' . esc_attr($opt_val) . '" ' . selected($value, $opt_val, false) . '>' . esc_html($opt_label) . '</option>';
                    }
                    echo '</select>';
                    break;
                case 'image':
                    $img = $value ? wp_get_attachment_image_url($value, 'thumbnail') : '';
                    echo '<div class="cf-image-picker">';
                    echo '<input type="hidden" name="' . esc_attr($key) . '" value="' . intval($value) . '" class="cf-image-id">';
                    echo '<img src="' . esc_url($img ?: '') . '" class="cf-image-preview" style="' . ($img ? '' : 'display:none;') . 'max-width:150px;display:block;margin-bottom:8px;">';
                    echo '<button type="button" class="button cf-select-image">' . esc_html__('Select Image', 'contentforge') . '</button>';
                    echo '<button type="button" class="button cf-remove-image" style="' . ($img ? '' : 'display:none;') . 'margin-left:4px;">' . esc_html__('Remove', 'contentforge') . '</button>';
                    echo '</div>';
                    break;
                case 'color':
                    echo '<input type="text" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" class="cf-color-picker" data-default-color="#000000">';
                    break;
            }

            if (!empty($field['description']) && $type !== 'checkbox') {
                echo '<p class="description">' . esc_html($field['description']) . '</p>';
            }

            echo '</td></tr>';
        }
        echo '</table>';
    }

    public function save_fields($post_id)
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        $fields = get_option(CF_FIELDS_OPTION, []);

        foreach ($fields as $group) {
            $group_id = $group['id'] ?? '';
            $nonce_key = 'cf_nonce_' . $group_id;

            if (!isset($_POST[$nonce_key]) || !wp_verify_nonce(sanitize_key($_POST[$nonce_key]), 'cf_save_fields_' . $group_id)) {
                continue;
            }

            foreach (($group['fields'] ?? []) as $field) {
                $key   = $field['key'] ?? '';
                $type  = $field['type'] ?? 'text';

                if (!isset($_POST[$key])) {
                    if ($type === 'checkbox') {
                        delete_post_meta($post_id, $key);
                    }
                    continue;
                }

                $value = wp_unslash($_POST[$key]);

                switch ($type) {
                    case 'number':
                        $value = floatval($value);
                        break;
                    case 'checkbox':
                        $value = '1';
                        break;
                    case 'image':
                        $value = intval($value);
                        break;
                    case 'wysiwyg':
                        $value = wp_kses_post($value);
                        break;
                    default:
                        $value = sanitize_text_field($value);
                        break;
                }

                update_post_meta($post_id, $key, $value);
            }
        }
    }

    public static function get_field_value($post_id, $key)
    {
        return get_post_meta($post_id, $key, true);
    }
}
