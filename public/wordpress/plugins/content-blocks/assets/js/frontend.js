(function () {
    'use strict';

    // ─── Testimonials Carousel ─────────────────────────────────

    function initCarousel(container) {
        var track = container.querySelector('.cb-testimonials__track');
        var prevBtn = container.querySelector('.cb-testimonials__prev');
        var nextBtn = container.querySelector('.cb-testimonials__next');
        if (!track || !prevBtn || !nextBtn) return;

        var slides = track.children;
        if (slides.length < 2) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }

        var current = 0;
        var autoplay = container.getAttribute('data-autoplay') === 'true';
        var interval = parseInt(container.getAttribute('data-interval'), 10) || 5000;
        var timer = null;

        function goTo(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            current = index;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
        }

        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function startAutoplay() {
            if (!autoplay) return;
            stopAutoplay();
            timer = setInterval(next, interval);
        }

        function stopAutoplay() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        prevBtn.addEventListener('click', function () { stopAutoplay(); prev(); });
        nextBtn.addEventListener('click', function () { stopAutoplay(); next(); });

        if (autoplay) {
            container.addEventListener('mouseenter', stopAutoplay);
            container.addEventListener('mouseleave', startAutoplay);
        }

        startAutoplay();
    }

    // ─── Stats Counter Animation ───────────────────────────────

    function animateCounters(container) {
        var numbers = container.querySelectorAll('.cb-stat__number');
        if (!numbers.length) return;

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-target'), 10);
                if (isNaN(target) || target <= 0) {
                    el.textContent = target || '0';
                    return;
                }
                var duration = 2000;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }

                requestAnimationFrame(step);
                io.unobserve(el);
            });
        }, { threshold: 0.3 });

        numbers.forEach(function (num) { io.observe(num); });
    }

    // ─── FAQ Accordion Toggle Icon ─────────────────────────────

    function initFaq(container) {
        container.querySelectorAll('.cb-faq__item').forEach(function (item) {
            item.addEventListener('toggle', function () {
                // icon rotation is handled via CSS [open] selector
            });
        });
    }

    // ─── Init ──────────────────────────────────────────────────

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.cb-testimonials').forEach(initCarousel);
        document.querySelectorAll('.cb-stats-grid').forEach(animateCounters);
        document.querySelectorAll('.cb-faq').forEach(initFaq);
    });
})();
