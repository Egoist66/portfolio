<?php
/**
 * Block Manager — registers all custom Gutenberg blocks
 *
 * @package ContentBlocks
 */

defined('ABSPATH') || exit;

class CB_Block_Manager
{
    private $blocks = [];

    public function init()
    {
        $this->define_blocks();
        $this->register_category();
        $this->register_blocks();
    }

    private function define_blocks()
    {
        $this->blocks = [
            'hero'          => ['render' => 'render_hero',          'label' => __('Hero', 'content-blocks')],
            'testimonials'  => ['render' => 'render_testimonials',  'label' => __('Testimonials', 'content-blocks')],
            'pricing-table' => ['render' => 'render_pricing_table', 'label' => __('Pricing Table', 'content-blocks')],
            'faq-accordion' => ['render' => 'render_faq_accordion', 'label' => __('FAQ Accordion', 'content-blocks')],
            'team-members'  => ['render' => 'render_team_members',  'label' => __('Team Members', 'content-blocks')],
            'stats-counter' => ['render' => 'render_stats_counter', 'label' => __('Stats Counter', 'content-blocks')],
            'timeline'      => ['render' => 'render_timeline',      'label' => __('Timeline', 'content-blocks')],
        ];
    }

    private function register_category()
    {
        add_filter('block_categories_all', function ($categories) {
            $categories[] = [
                'slug'  => 'content-blocks',
                'title' => __('ContentBlocks', 'content-blocks'),
                'icon'  => 'grid-view',
            ];
            return $categories;
        }, 10, 1);
    }

    private function register_blocks()
    {
        foreach ($this->blocks as $slug => $config) {
            $render_callback = [$this, $config['render']];

            register_block_type("content-blocks/{$slug}", [
                'editor_script'   => 'cb-editor',
                'editor_style'    => 'cb-editor',
                'style'           => 'cb-frontend',
                'render_callback' => $render_callback,
                'category'        => 'content-blocks',
            ]);
        }
    }

    public function render_hero($attributes, $content)
    {
        $title    = esc_html($attributes['title'] ?? '');
        $subtitle = esc_html($attributes['subtitle'] ?? '');
        $bg_color = esc_attr($attributes['backgroundColor'] ?? '#1a1a2e');
        $text_color = esc_attr($attributes['textColor'] ?? '#ffffff');
        $btn_text = esc_html($attributes['buttonText'] ?? '');
        $btn_url  = esc_url($attributes['buttonUrl'] ?? '');
        $alignment = esc_attr($attributes['alignment'] ?? 'center');
        $height   = esc_attr($attributes['height'] ?? '80vh');

        ob_start();
        ?>
        <div class="cb-hero" style="background-color:<?php echo $bg_color; ?>;color:<?php echo $text_color; ?>;height:<?php echo $height; ?>;text-align:<?php echo $alignment; ?>;">
            <div class="cb-hero__overlay"></div>
            <div class="cb-hero__content">
                <?php if ($title): ?>
                    <h1 class="cb-hero__title"><?php echo $title; ?></h1>
                <?php endif; ?>
                <?php if ($subtitle): ?>
                    <p class="cb-hero__subtitle"><?php echo $subtitle; ?></p>
                <?php endif; ?>
                <?php if ($btn_text && $btn_url): ?>
                    <a href="<?php echo $btn_url; ?>" class="cb-hero__button"><?php echo $btn_text; ?></a>
                <?php endif; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_testimonials($attributes)
    {
        $items = $attributes['items'] ?? [];
        if (empty($items)) {
            return '';
        }

        $autoplay = !empty($attributes['autoplay']) ? 'true' : 'false';
        $interval = intval($attributes['interval'] ?? 5000);

        ob_start();
        ?>
        <div class="cb-testimonials" data-autoplay="<?php echo $autoplay; ?>" data-interval="<?php echo $interval; ?>">
            <div class="cb-testimonials__track">
                <?php foreach ($items as $item): ?>
                    <div class="cb-testimonial">
                        <div class="cb-testimonial__stars"><?php echo str_repeat('★', min(5, intval($item['rating'] ?? 5))); ?></div>
                        <blockquote class="cb-testimonial__text"><?php echo esc_html($item['text'] ?? ''); ?></blockquote>
                        <div class="cb-testimonial__author">
                            <?php if (!empty($item['avatar'])): ?>
                                <img src="<?php echo esc_url($item['avatar']); ?>" alt="<?php echo esc_attr($item['name'] ?? ''); ?>" class="cb-testimonial__avatar">
                            <?php endif; ?>
                            <cite class="cb-testimonial__name"><?php echo esc_html($item['name'] ?? ''); ?></cite>
                            <span class="cb-testimonial__position"><?php echo esc_html($item['position'] ?? ''); ?></span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <div class="cb-testimonials__nav">
                <button class="cb-testimonials__prev" aria-label="<?php esc_attr_e('Previous', 'content-blocks'); ?>">←</button>
                <button class="cb-testimonials__next" aria-label="<?php esc_attr_e('Next', 'content-blocks'); ?>">→</button>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_pricing_table($attributes)
    {
        $plans = $attributes['plans'] ?? [];
        if (empty($plans)) {
            return '';
        }

        $columns = min(4, intval($attributes['columns'] ?? 3));

        ob_start();
        ?>
        <div class="cb-pricing-grid" style="--cb-columns:<?php echo $columns; ?>;">
            <?php foreach ($plans as $plan): ?>
                <?php $popular = !empty($plan['popular']); ?>
                <div class="cb-pricing-card <?php echo $popular ? 'cb-pricing-card--popular' : ''; ?>">
                    <?php if ($popular): ?>
                        <span class="cb-pricing-card__badge"><?php esc_html_e('Most Popular', 'content-blocks'); ?></span>
                    <?php endif; ?>
                    <h3 class="cb-pricing-card__title"><?php echo esc_html($plan['title'] ?? ''); ?></h3>
                    <div class="cb-pricing-card__price">
                        <span class="cb-pricing-card__currency"><?php echo esc_html($plan['currency'] ?? '$'); ?></span>
                        <span class="cb-pricing-card__amount"><?php echo esc_html($plan['price'] ?? '0'); ?></span>
                        <span class="cb-pricing-card__period">/ <?php echo esc_html($plan['period'] ?? 'month'); ?></span>
                    </div>
                    <ul class="cb-pricing-card__features">
                        <?php foreach (($plan['features'] ?? []) as $feature): ?>
                            <li class="cb-pricing-card__feature <?php echo !empty($feature['included']) ? '' : 'cb-pricing-card__feature--muted'; ?>">
                                <?php echo esc_html($feature['text'] ?? ''); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php if (!empty($plan['buttonText']) && !empty($plan['buttonUrl'])): ?>
                        <a href="<?php echo esc_url($plan['buttonUrl']); ?>" class="cb-pricing-card__button"><?php echo esc_html($plan['buttonText']); ?></a>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_faq_accordion($attributes)
    {
        $items = $attributes['items'] ?? [];
        if (empty($items)) {
            return '';
        }

        ob_start();
        ?>
        <div class="cb-faq">
            <?php foreach ($items as $index => $item): ?>
                <details class="cb-faq__item" <?php echo !empty($item['open']) ? 'open' : ''; ?>>
                    <summary class="cb-faq__question">
                        <?php echo esc_html($item['question'] ?? ''); ?>
                        <span class="cb-faq__icon">+</span>
                    </summary>
                    <div class="cb-faq__answer">
                        <?php echo wp_kses_post($item['answer'] ?? ''); ?>
                    </div>
                </details>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_team_members($attributes)
    {
        $members = $attributes['members'] ?? [];
        if (empty($members)) {
            return '';
        }

        $columns = min(4, intval($attributes['columns'] ?? 3));

        ob_start();
        ?>
        <div class="cb-team-grid" style="--cb-columns:<?php echo $columns; ?>;">
            <?php foreach ($members as $member): ?>
                <div class="cb-team-card">
                    <?php if (!empty($member['photo'])): ?>
                        <div class="cb-team-card__photo-wrap">
                            <img src="<?php echo esc_url($member['photo']); ?>" alt="<?php echo esc_attr($member['name'] ?? ''); ?>" class="cb-team-card__photo">
                        </div>
                    <?php endif; ?>
                    <h3 class="cb-team-card__name"><?php echo esc_html($member['name'] ?? ''); ?></h3>
                    <span class="cb-team-card__position"><?php echo esc_html($member['position'] ?? ''); ?></span>
                    <p class="cb-team-card__bio"><?php echo esc_html($member['bio'] ?? ''); ?></p>
                    <?php if (!empty($member['socials'])): ?>
                        <div class="cb-team-card__socials">
                            <?php foreach ($member['socials'] as $social): ?>
                                <a href="<?php echo esc_url($social['url'] ?? '#'); ?>" class="cb-team-card__social-link" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr($social['platform'] ?? ''); ?>">
                                    <?php echo esc_html($social['platform'] ?? ''); ?>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_stats_counter($attributes)
    {
        $stats = $attributes['stats'] ?? [];
        if (empty($stats)) {
            return '';
        }

        $columns = min(4, intval($attributes['columns'] ?? 4));

        ob_start();
        ?>
        <div class="cb-stats-grid" style="--cb-columns:<?php echo $columns; ?>;">
            <?php foreach ($stats as $stat): ?>
                <div class="cb-stat">
                    <span class="cb-stat__prefix"><?php echo esc_html($stat['prefix'] ?? ''); ?></span>
                    <span class="cb-stat__number" data-target="<?php echo intval($stat['value'] ?? 0); ?>">0</span>
                    <span class="cb-stat__suffix"><?php echo esc_html($stat['suffix'] ?? ''); ?></span>
                    <span class="cb-stat__label"><?php echo esc_html($stat['label'] ?? ''); ?></span>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }

    public function render_timeline($attributes)
    {
        $events = $attributes['events'] ?? [];
        if (empty($events)) {
            return '';
        }

        ob_start();
        ?>
        <div class="cb-timeline">
            <?php foreach ($events as $event): ?>
                <div class="cb-timeline__event">
                    <div class="cb-timeline__dot"></div>
                    <div class="cb-timeline__date"><?php echo esc_html($event['date'] ?? ''); ?></div>
                    <div class="cb-timeline__content">
                        <h3 class="cb-timeline__title"><?php echo esc_html($event['title'] ?? ''); ?></h3>
                        <p class="cb-timeline__description"><?php echo esc_html($event['description'] ?? ''); ?></p>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        <?php
        return ob_get_clean();
    }
}
