(function (wp) {
    'use strict';

    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var __ = wp.i18n.__;

    // ─── Shared: Icon components ───────────────────────────────

    var icons = {
        hero: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z' })
        ),
        testimonials: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm0 14H4V4h16v12zM6 6h12v2H6V6zm0 4h12v2H6v-2zm0 4h8v2H6v-2z' })
        ),
        pricing: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M11.5 1L2 6v2h19V6l-9.5-5zM4 10v7h3v-7H4zm5 0v7h3v-7H9zm5 0v7h3v-7h-3zM2 19v2h19v-2H2z' })
        ),
        faq: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' })
        ),
        team: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' })
        ),
        stats: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z' })
        ),
        timeline: el('svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
            el('path', { d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z' })
        ),
    };

    // ─── Helper: shared InspectorControls wrapper ──────────────

    function withInspector(children, blockProps) {
        return el('div', blockProps,
            el(InspectorControls, null, children),
            el('div', { className: 'cb-editor-placeholder', style: { padding: '2rem', textAlign: 'center', background: '#f0f0f1', borderRadius: 4 } },
                el('p', { style: { margin: 0, fontWeight: 600 } }, blockProps['data-title'] || 'Block')
            )
        );
    }

    // ─── Registration ──────────────────────────────────────────

    var blocks = [
        { name: 'content-blocks/hero',          title: 'Hero',          icon: icons.hero,          cat: 'content-blocks' },
        { name: 'content-blocks/testimonials',   title: 'Testimonials',   icon: icons.testimonials, cat: 'content-blocks' },
        { name: 'content-blocks/pricing-table',  title: 'Pricing Table',  icon: icons.pricing,      cat: 'content-blocks' },
        { name: 'content-blocks/faq-accordion',  title: 'FAQ Accordion',  icon: icons.faq,          cat: 'content-blocks' },
        { name: 'content-blocks/team-members',   title: 'Team Members',   icon: icons.team,         cat: 'content-blocks' },
        { name: 'content-blocks/stats-counter',  title: 'Stats Counter',  icon: icons.stats,        cat: 'content-blocks' },
        { name: 'content-blocks/timeline',       title: 'Timeline',       icon: icons.timeline,     cat: 'content-blocks' },
    ];

    blocks.forEach(function (block) {
        registerBlockType(block.name, {
            title: block.title,
            icon: block.icon,
            category: block.cat,
            supports: { html: false },
            edit: function () {
                return el('div', {
                    style: { padding: '2rem', background: '#f8f9fa', borderRadius: 8, textAlign: 'center' },
                    'data-title': block.title
                },
                    block.icon,
                    el('p', { style: { margin: '0.5rem 0 0', fontWeight: 600 } }, block.title),
                    el('p', { style: { margin: '0.25rem 0 0', fontSize: '0.85rem', opacity: 0.7 } }, __('This block renders on the front-end.', 'content-blocks'))
                );
            },
            save: function () {
                return null; // server-side rendering
            },
        });
    });
})(window.wp);
