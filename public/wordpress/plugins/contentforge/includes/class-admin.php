<?php
/**
 * Admin page — CPT builder, field groups, shortcode editor
 *
 * @package ContentForge
 */

defined('ABSPATH') || exit;

class CF_Admin
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
        add_action('admin_menu', [$this, 'add_menu_page']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
        add_action('wp_ajax_cf_save_cpt', [$this, 'ajax_save_cpt']);
        add_action('wp_ajax_cf_delete_cpt', [$this, 'ajax_delete_cpt']);
        add_action('wp_ajax_cf_save_field_group', [$this, 'ajax_save_field_group']);
        add_action('wp_ajax_cf_delete_field_group', [$this, 'ajax_delete_field_group']);
        add_action('wp_ajax_cf_save_shortcode', [$this, 'ajax_save_shortcode']);
        add_action('wp_ajax_cf_delete_shortcode', [$this, 'ajax_delete_shortcode']);
    }

    public function add_menu_page()
    {
        add_menu_page(
            __('ContentForge', 'contentforge'),
            __('ContentForge', 'contentforge'),
            'manage_options',
            'contentforge',
            [$this, 'render_page'],
            'dashicons-hammer',
            25
        );
    }

    public function enqueue_assets($hook)
    {
        if ('toplevel_page_contentforge' !== $hook) {
            return;
        }

        wp_enqueue_style('wp-color-picker');
        wp_enqueue_media();
        wp_enqueue_style('cf-admin', CF_PLUGIN_URL . 'assets/css/admin.css', [], CF_VERSION);
        wp_enqueue_script('cf-admin', CF_PLUGIN_URL . 'assets/js/admin.js', ['jquery', 'wp-color-picker'], CF_VERSION, true);

        wp_localize_script('cf-admin', 'cfData', [
            'ajaxUrl'         => admin_url('admin-ajax.php'),
            'nonce'           => wp_create_nonce('cf_nonce'),
            'postTypes'       => CF_CPT_Manager::get_all(),
            'fieldGroups'     => get_option(CF_FIELDS_OPTION, []),
            'shortcodes'      => CF_Shortcode_Manager::get_all(),
            'registeredTypes' => $this->get_registered_post_types(),
            'i18n'            => [
                'saved'       => __('Saved.', 'contentforge'),
                'deleted'     => __('Deleted.', 'contentforge'),
                'confirmDel'  => __('Are you sure?', 'contentforge'),
                'error'       => __('An error occurred.', 'contentforge'),
            ],
        ]);
    }

    private function get_registered_post_types()
    {
        $types = get_post_types(['public' => true], 'objects');
        $list = [];
        foreach ($types as $slug => $obj) {
            $list[$slug] = $obj->label;
        }
        return $list;
    }

    public function render_page()
    {
        $tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'cpt';
        ?>
        <div class="wrap cf-wrap">
            <h1><?php esc_html_e('ContentForge', 'contentforge'); ?></h1>
            <nav class="cf-nav-tabs">
                <a href="?page=contentforge&tab=cpt"     class="cf-nav-tab <?php echo 'cpt'     === $tab ? 'cf-nav-tab--active' : ''; ?>"><?php esc_html_e('Post Types', 'contentforge'); ?></a>
                <a href="?page=contentforge&tab=fields"  class="cf-nav-tab <?php echo 'fields'  === $tab ? 'cf-nav-tab--active' : ''; ?>"><?php esc_html_e('Custom Fields', 'contentforge'); ?></a>
                <a href="?page=contentforge&tab=shortcodes" class="cf-nav-tab <?php echo 'shortcodes' === $tab ? 'cf-nav-tab--active' : ''; ?>"><?php esc_html_e('Shortcodes', 'contentforge'); ?></a>
            </nav>
            <div class="cf-panel">
                <?php
                switch ($tab) {
                    case 'cpt':        $this->render_cpt_tab();        break;
                    case 'fields':     $this->render_fields_tab();     break;
                    case 'shortcodes': $this->render_shortcodes_tab(); break;
                }
                ?>
            </div>
        </div>
        <?php
    }

    /* ─── CPT Tab ─────────────────────────────────────────── */

    private function render_cpt_tab()
    {
        $types = CF_CPT_Manager::get_all();
        $editing = isset($_GET['edit_cpt']) ? sanitize_key($_GET['edit_cpt']) : '';
        $edit_data = $editing && isset($types[$editing]) ? $types[$editing] : null;
        ?>
        <h2><?php echo $edit_data ? esc_html__('Edit Post Type', 'contentforge') : esc_html__('New Post Type', 'contentforge'); ?></h2>
        <form class="cf-form cf-cpt-form" data-action="cf_save_cpt">
            <input type="hidden" name="original_slug" value="<?php echo esc_attr($editing); ?>">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Slug', 'contentforge'); ?></th>
                    <td><input type="text" name="slug" value="<?php echo esc_attr($editing); ?>" class="regular-text" pattern="[a-z0-9_-]+" required <?php echo $editing ? 'readonly' : ''; ?>><p class="description"><?php esc_html_e('Lowercase letters, numbers, hyphens, underscores.', 'contentforge'); ?></p></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Plural Name', 'contentforge'); ?></th>
                    <td><input type="text" name="plural" value="<?php echo esc_attr($edit_data['plural'] ?? ''); ?>" class="regular-text" required></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Singular Name', 'contentforge'); ?></th>
                    <td><input type="text" name="singular" value="<?php echo esc_attr($edit_data['singular'] ?? ''); ?>" class="regular-text" required></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Supports', 'contentforge'); ?></th>
                    <td>
                        <?php
                        $all_supports = ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields', 'comments', 'revisions', 'page-attributes'];
                        $selected = $edit_data['supports'] ?? ['title', 'editor', 'thumbnail'];
                        foreach ($all_supports as $s):
                        ?>
                            <label style="display:inline-block;width:140px;margin-bottom:4px;">
                                <input type="checkbox" name="supports[]" value="<?php echo esc_attr($s); ?>" <?php checked(in_array($s, $selected)); ?>>
                                <?php echo esc_html(ucfirst($s)); ?>
                            </label>
                        <?php endforeach; ?>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Public', 'contentforge'); ?></th>
                    <td><label><input type="checkbox" name="public" value="1" <?php checked(!empty($edit_data['public'])); ?>> <?php esc_html_e('Visible on front-end', 'contentforge'); ?></label></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Has Archive', 'contentforge'); ?></th>
                    <td><label><input type="checkbox" name="has_archive" value="1" <?php checked(!empty($edit_data['has_archive'])); ?>> <?php esc_html_e('Enable post type archive', 'contentforge'); ?></label></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Rewrite Slug', 'contentforge'); ?></th>
                    <td><input type="text" name="rewrite_slug" value="<?php echo esc_attr($edit_data['rewrite_slug'] ?? ''); ?>" class="regular-text" placeholder="<?php esc_attr_e('Same as slug', 'contentforge'); ?>"></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Menu Icon', 'contentforge'); ?></th>
                    <td><input type="text" name="icon" value="<?php echo esc_attr($edit_data['icon'] ?? 'dashicons-admin-post'); ?>" class="regular-text" placeholder="dashicons-admin-post"></td>
                </tr>
            </table>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e($edit_data ? 'Update Post Type' : 'Create Post Type', 'contentforge'); ?></button></p>
        </form>
        <?php if (!empty($types)): ?>
            <hr>
            <h2><?php esc_html_e('Existing Post Types', 'contentforge'); ?></h2>
            <table class="wp-list-table widefat fixed striped">
                <thead><tr><th><?php esc_html_e('Slug', 'contentforge'); ?></th><th><?php esc_html_e('Plural', 'contentforge'); ?></th><th><?php esc_html_e('Actions', 'contentforge'); ?></th></tr></thead>
                <tbody>
                    <?php foreach ($types as $slug => $cfg): ?>
                        <tr>
                            <td><code><?php echo esc_html($slug); ?></code></td>
                            <td><?php echo esc_html($cfg['plural'] ?? $slug); ?></td>
                            <td>
                                <a href="?page=contentforge&tab=cpt&edit_cpt=<?php echo esc_attr($slug); ?>" class="button button-small"><?php esc_html_e('Edit', 'contentforge'); ?></a>
                                <button type="button" class="button button-small cf-delete-cpt" data-slug="<?php echo esc_attr($slug); ?>"><?php esc_html_e('Delete', 'contentforge'); ?></button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <?php
    }

    /* ─── Fields Tab ──────────────────────────────────────── */

    private function render_fields_tab()
    {
        $groups = get_option(CF_FIELDS_OPTION, []);
        $editing_id = isset($_GET['edit_group']) ? sanitize_key($_GET['edit_group']) : '';
        $edit_group = $editing_id && isset($groups[$editing_id]) ? $groups[$editing_id] : null;
        ?>
        <h2><?php echo $edit_group ? esc_html__('Edit Field Group', 'contentforge') : esc_html__('New Field Group', 'contentforge'); ?></h2>
        <form class="cf-form cf-field-group-form" data-action="cf_save_field_group">
            <input type="hidden" name="group_id" value="<?php echo esc_attr($editing_id ?: 'group_' . uniqid()); ?>">
            <input type="hidden" name="original_id" value="<?php echo esc_attr($editing_id); ?>">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Group Title', 'contentforge'); ?></th>
                    <td><input type="text" name="group_title" value="<?php echo esc_attr($edit_group['title'] ?? ''); ?>" class="regular-text" required></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Post Types', 'contentforge'); ?></th>
                    <td>
                        <?php $selected_pts = $edit_group['post_types'] ?? ['post']; ?>
                        <?php foreach ($this->get_registered_post_types() as $slug => $label): ?>
                            <label style="display:inline-block;width:150px;margin-bottom:4px;">
                                <input type="checkbox" name="post_types[]" value="<?php echo esc_attr($slug); ?>" <?php checked(in_array($slug, $selected_pts)); ?>>
                                <?php echo esc_html($label); ?>
                            </label>
                        <?php endforeach; ?>
                    </td>
                </tr>
            </table>
            <hr>
            <h3><?php esc_html_e('Fields', 'contentforge'); ?></h3>
            <div class="cf-fields-list">
                <?php
                $fields = $edit_group['fields'] ?? [['key' => '', 'label' => '', 'type' => 'text', 'description' => '']];
                foreach ($fields as $i => $field):
                ?>
                <div class="cf-field-row">
                    <input type="text" name="fields[<?php echo $i; ?>][key]" value="<?php echo esc_attr($field['key'] ?? ''); ?>" placeholder="<?php esc_attr_e('meta_key', 'contentforge'); ?>" class="cf-field-key">
                    <input type="text" name="fields[<?php echo $i; ?>][label]" value="<?php echo esc_attr($field['label'] ?? ''); ?>" placeholder="<?php esc_attr_e('Label', 'contentforge'); ?>">
                    <select name="fields[<?php echo $i; ?>][type]">
                        <?php foreach (['text', 'textarea', 'wysiwyg', 'url', 'email', 'number', 'checkbox', 'select', 'image', 'color'] as $t): ?>
                            <option value="<?php echo $t; ?>" <?php selected(($field['type'] ?? 'text'), $t); ?>><?php echo esc_html(ucfirst($t)); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <input type="text" name="fields[<?php echo $i; ?>][description]" value="<?php echo esc_attr($field['description'] ?? ''); ?>" placeholder="<?php esc_attr_e('Description', 'contentforge'); ?>" class="cf-field-desc">
                    <button type="button" class="button cf-remove-field">&times;</button>
                </div>
                <?php endforeach; ?>
            </div>
            <button type="button" class="button cf-add-field"><?php esc_html_e('+ Add Field', 'contentforge'); ?></button>
            <p class="submit" style="margin-top:1rem;"><button type="submit" class="button button-primary"><?php esc_html_e($edit_group ? 'Update Group' : 'Create Group', 'contentforge'); ?></button></p>
        </form>
        <?php if (!empty($groups)): ?>
            <hr>
            <h2><?php esc_html_e('Existing Groups', 'contentforge'); ?></h2>
            <table class="wp-list-table widefat fixed striped">
                <thead><tr><th><?php esc_html_e('Title', 'contentforge'); ?></th><th><?php esc_html_e('Post Types', 'contentforge'); ?></th><th><?php esc_html_e('Fields', 'contentforge'); ?></th><th><?php esc_html_e('Actions', 'contentforge'); ?></th></tr></thead>
                <tbody>
                    <?php foreach ($groups as $gid => $group): ?>
                        <tr>
                            <td><?php echo esc_html($group['title'] ?? $gid); ?></td>
                            <td><?php echo esc_html(implode(', ', $group['post_types'] ?? [])); ?></td>
                            <td><?php echo count($group['fields'] ?? []); ?></td>
                            <td>
                                <a href="?page=contentforge&tab=fields&edit_group=<?php echo esc_attr($gid); ?>" class="button button-small"><?php esc_html_e('Edit', 'contentforge'); ?></a>
                                <button type="button" class="button button-small cf-delete-group" data-id="<?php echo esc_attr($gid); ?>"><?php esc_html_e('Delete', 'contentforge'); ?></button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <?php
    }

    /* ─── Shortcodes Tab ──────────────────────────────────── */

    private function render_shortcodes_tab()
    {
        $shortcodes = CF_Shortcode_Manager::get_all();
        $editing_tag = isset($_GET['edit_shortcode']) ? sanitize_key($_GET['edit_shortcode']) : '';
        $edit_sc = $editing_tag && isset($shortcodes[$editing_tag]) ? $shortcodes[$editing_tag] : null;
        ?>
        <h2><?php echo $edit_sc ? esc_html__('Edit Shortcode', 'contentforge') : esc_html__('New Shortcode', 'contentforge'); ?></h2>
        <form class="cf-form cf-shortcode-form" data-action="cf_save_shortcode">
            <input type="hidden" name="original_tag" value="<?php echo esc_attr($editing_tag); ?>">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Shortcode Tag', 'contentforge'); ?></th>
                    <td><input type="text" name="tag" value="<?php echo esc_attr($editing_tag); ?>" class="regular-text" pattern="[a-z_][a-z0-9_]*" required <?php echo $editing_tag ? 'readonly' : ''; ?>><p class="description"><?php esc_html_e('Usage: [your_tag]', 'contentforge'); ?></p></td>
                </tr>
                <tr>
                    <th scope="row"><?php esc_html_e('Type', 'contentforge'); ?></th>
                    <td>
                        <select name="type">
                            <option value="static"  <?php selected(($edit_sc['type'] ?? ''), 'static'); ?>><?php esc_html_e('Static HTML', 'contentforge'); ?></option>
                            <option value="dynamic" <?php selected(($edit_sc['type'] ?? ''), 'dynamic'); ?>><?php esc_html_e('Dynamic (WP Query)', 'contentforge'); ?></option>
                        </select>
                    </td>
                </tr>
            </table>
            <div class="cf-shortcode-static" style="<?php echo ($edit_sc['type'] ?? 'static') === 'static' ? '' : 'display:none;'; ?>">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php esc_html_e('HTML Content', 'contentforge'); ?></th>
                        <td><textarea name="html" rows="8" class="large-text"><?php echo esc_textarea($edit_sc['html'] ?? ''); ?></textarea><p class="description"><?php esc_html_e('Shortcodes inside this content will be processed.', 'contentforge'); ?></p></td>
                    </tr>
                </table>
            </div>
            <div class="cf-shortcode-dynamic" style="<?php echo ($edit_sc['type'] ?? '') === 'dynamic' ? '' : 'display:none;'; ?>">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php esc_html_e('Post Type', 'contentforge'); ?></th>
                        <td>
                            <select name="post_type">
                                <?php foreach ($this->get_registered_post_types() as $slug => $label): ?>
                                    <option value="<?php echo esc_attr($slug); ?>" <?php selected(($edit_sc['post_type'] ?? 'post'), $slug); ?>><?php echo esc_html($label); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Limit', 'contentforge'); ?></th>
                        <td><input type="number" name="limit" value="<?php echo esc_attr($edit_sc['limit'] ?? 5); ?>" class="small-text" min="1" max="100"></td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e('Template', 'contentforge'); ?></th>
                        <td>
                            <textarea name="template" rows="6" class="large-text"><?php echo esc_textarea($edit_sc['template'] ?? '<h3>{title}</h3><p>{excerpt}</p>'); ?></textarea>
                            <p class="description"><?php esc_html_e('Placeholders: {title}, {excerpt}, {content}, {date}, {permalink}, {thumbnail}', 'contentforge'); ?></p>
                        </td>
                    </tr>
                </table>
            </div>
            <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e($edit_sc ? 'Update Shortcode' : 'Create Shortcode', 'contentforge'); ?></button></p>
        </form>
        <?php if (!empty($shortcodes)): ?>
            <hr>
            <h2><?php esc_html_e('Existing Shortcodes', 'contentforge'); ?></h2>
            <table class="wp-list-table widefat fixed striped">
                <thead><tr><th><?php esc_html_e('Tag', 'contentforge'); ?></th><th><?php esc_html_e('Type', 'contentforge'); ?></th><th><?php esc_html_e('Actions', 'contentforge'); ?></th></tr></thead>
                <tbody>
                    <?php foreach ($shortcodes as $tag => $cfg): ?>
                        <tr>
                            <td><code>[<?php echo esc_html($tag); ?>]</code></td>
                            <td><?php echo esc_html($cfg['type'] ?? 'static'); ?></td>
                            <td>
                                <a href="?page=contentforge&tab=shortcodes&edit_shortcode=<?php echo esc_attr($tag); ?>" class="button button-small"><?php esc_html_e('Edit', 'contentforge'); ?></a>
                                <button type="button" class="button button-small cf-delete-shortcode" data-tag="<?php echo esc_attr($tag); ?>"><?php esc_html_e('Delete', 'contentforge'); ?></button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
        <?php
    }

    /* ─── AJAX ────────────────────────────────────────────── */

    public function ajax_save_cpt()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $slug = isset($_POST['slug']) ? sanitize_key($_POST['slug']) : '';
        $original = isset($_POST['original_slug']) ? sanitize_key($_POST['original_slug']) : '';

        if (!$slug) wp_send_json_error(['message' => __('Slug required.', 'contentforge')]);

        if ($original && $original !== $slug) {
            CF_CPT_Manager::delete($original);
        }

        CF_CPT_Manager::save($slug, [
            'plural'       => sanitize_text_field(wp_unslash($_POST['plural'] ?? '')),
            'singular'     => sanitize_text_field(wp_unslash($_POST['singular'] ?? '')),
            'supports'     => isset($_POST['supports']) ? array_map('sanitize_key', wp_unslash($_POST['supports'])) : ['title', 'editor'],
            'public'       => !empty($_POST['public']),
            'has_archive'  => !empty($_POST['has_archive']),
            'rewrite_slug' => sanitize_key(wp_unslash($_POST['rewrite_slug'] ?? '')),
            'icon'         => sanitize_text_field(wp_unslash($_POST['icon'] ?? 'dashicons-admin-post')),
        ]);

        wp_send_json_success(['message' => __('Post Type saved.', 'contentforge')]);
    }

    public function ajax_delete_cpt()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $slug = isset($_POST['slug']) ? sanitize_key($_POST['slug']) : '';
        if ($slug) CF_CPT_Manager::delete($slug);

        wp_send_json_success(['message' => __('Post Type deleted.', 'contentforge')]);
    }

    public function ajax_save_field_group()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $group_id    = isset($_POST['group_id']) ? sanitize_key(wp_unslash($_POST['group_id'])) : ('group_' . uniqid());
        $original_id = isset($_POST['original_id']) ? sanitize_key(wp_unslash($_POST['original_id'])) : '';

        $fields = [];
        if (isset($_POST['fields']) && is_array($_POST['fields'])) {
            foreach (wp_unslash($_POST['fields']) as $field) {
                $fields[] = [
                    'key'         => sanitize_key($field['key'] ?? ''),
                    'label'       => sanitize_text_field($field['label'] ?? ''),
                    'type'        => in_array($field['type'] ?? '', ['text', 'textarea', 'wysiwyg', 'url', 'email', 'number', 'checkbox', 'select', 'image', 'color']) ? $field['type'] : 'text',
                    'description' => sanitize_text_field($field['description'] ?? ''),
                ];
            }
        }

        $groups = get_option(CF_FIELDS_OPTION, []);

        if ($original_id && $original_id !== $group_id) {
            unset($groups[$original_id]);
        }

        $groups[$group_id] = [
            'id'         => $group_id,
            'title'      => sanitize_text_field(wp_unslash($_POST['group_title'] ?? '')),
            'post_types' => isset($_POST['post_types']) ? array_map('sanitize_key', wp_unslash($_POST['post_types'])) : ['post'],
            'fields'     => $fields,
        ];

        update_option(CF_FIELDS_OPTION, $groups);
        wp_send_json_success(['message' => __('Field group saved.', 'contentforge')]);
    }

    public function ajax_delete_field_group()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $id = isset($_POST['id']) ? sanitize_key($_POST['id']) : '';
        $groups = get_option(CF_FIELDS_OPTION, []);
        unset($groups[$id]);
        update_option(CF_FIELDS_OPTION, $groups);

        wp_send_json_success(['message' => __('Field group deleted.', 'contentforge')]);
    }

    public function ajax_save_shortcode()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $tag      = isset($_POST['tag']) ? sanitize_key($_POST['tag']) : '';
        $original = isset($_POST['original_tag']) ? sanitize_key($_POST['original_tag']) : '';
        $type     = isset($_POST['type']) && in_array($_POST['type'], ['static', 'dynamic']) ? $_POST['type'] : 'static';

        if (!$tag) wp_send_json_error(['message' => __('Tag required.', 'contentforge')]);

        if ($original && $original !== $tag) {
            CF_Shortcode_Manager::delete($original);
        }

        $config = ['type' => $type];

        if ($type === 'static') {
            $config['html'] = wp_kses_post(wp_unslash($_POST['html'] ?? ''));
        } else {
            $config['post_type'] = sanitize_key(wp_unslash($_POST['post_type'] ?? 'post'));
            $config['limit']     = intval($_POST['limit'] ?? 5);
            $config['template']  = wp_kses_post(wp_unslash($_POST['template'] ?? ''));
        }

        CF_Shortcode_Manager::save($tag, $config);
        wp_send_json_success(['message' => __('Shortcode saved.', 'contentforge')]);
    }

    public function ajax_delete_shortcode()
    {
        check_ajax_referer('cf_nonce', 'nonce');
        if (!current_user_can('manage_options')) wp_die(-1);

        $tag = isset($_POST['tag']) ? sanitize_key($_POST['tag']) : '';
        if ($tag) CF_Shortcode_Manager::delete($tag);

        wp_send_json_success(['message' => __('Shortcode deleted.', 'contentforge')]);
    }
}
