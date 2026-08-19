/* ==========================================================================
   جمعية واعتصموا الخيرية ببنجا - Logic & Navigation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Hamburger Navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // SPA View Router (Page Switching)
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');

    function navigateTo(targetId) {
        // Hide all views
        pageViews.forEach(view => view.classList.remove('active'));

        // Handle target ID clean
        const cleanId = targetId.replace('#', '');
        const targetView = document.getElementById(`page-${cleanId}`);

        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Active class on menu links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${cleanId}`) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        navMenu.classList.remove('active');
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                navigateTo(href);
            }
        });
    });

    // Subpages Switcher (Basmat, Anwar, Thimar, Hospital)
    window.showSubPage = function(subId) {
        pageViews.forEach(view => view.classList.remove('active'));
        const targetSub = document.getElementById(`sub-${subId}`);
        if (targetSub) {
            targetSub.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Statistics Counter Animation
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = '+' + Math.ceil(count).toLocaleString();
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = '+' + target.toLocaleString();
                }
            };
            updateCount();
        });
    }

    // Trigger Counter when stats section is visible
    window.addEventListener('scroll', () => {
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const position = statsSection.getBoundingClientRect();
            if (position.top < window.innerHeight && !animated) {
                runCounters();
                animated = true;
            }
        }
    });

    // Gallery Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Simple Search Bar Functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        if (query.includes('أنوار') || query.includes('قرآن')) {
            showSubPage('anwar');
        } else if (query.includes('بسمات') || query.includes('طفل')) {
            showSubPage('basmat');
        } else if (query.includes('ثمار') || query.includes('مساعدة')) {
            showSubPage('thimar');
        } else if (query.includes('مستشفى') || query.includes('نسائم') || query.includes('صح')) {
            showSubPage('hospital');
        } else {
            alert(`نتيجة البحث عن "${query}": يمكنك استكشاف الأقسام عبر قائمة التنقل الرئيسية.`);
        }
    }

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

});

// Global Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}