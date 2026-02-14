// Navigation toggle for responsive menu (shared across pages)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav') || document.querySelector('nav ul');
    if (!nav) return;

    // toggle mobile menu if button exists
    if (btn) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', nav.classList.contains('open'));
        });
    }

    // mark the current page's nav link as active
    try {
        const links = nav.querySelectorAll('a[href]');
        const current = (location.pathname.split('/').pop() || 'index.html');
        links.forEach((a) => {
            const href = a.getAttribute('href');
            const linkPage = href.split('/').pop();
            if (linkPage === current || (current === '' && (href === 'index.html' || href === './' || href === '/'))) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }
        });
    } catch (e) {
        // silent fail if nav structure is unexpected
    }
});
