/**
 * SEGA MUSIC - Page Transitions & Interactions
 * SPA-like smooth experience with staggered animations
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration
  // ==========================================================================
  const CONFIG = {
    transitionDuration: 600,
    staggerDelay: 80,
    revealThreshold: 0.15,
    revealRootMargin: '0px 0px -50px 0px'
  };

  // ==========================================================================
  // Page Transition
  // ==========================================================================
  class PageTransition {
    constructor() {
      this.overlay = null;
      this.isTransitioning = false;
      this.init();
    }

    init() {
      // Create transition overlay
      this.overlay = document.createElement('div');
      this.overlay.className = 'page-transition';
      document.body.appendChild(this.overlay);

      // Intercept internal links
      this.bindLinks();

      // Handle browser back/forward
      window.addEventListener('popstate', () => this.handlePopState());

      // Handle bfcache (back-forward cache) restoration
      window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
          // page-transition overlay
          this.overlay.classList.remove('is-active', 'is-entering');
          this.isTransitioning = false;
          // page-enter-overlay
          const enterOverlay = document.querySelector('.page-enter-overlay');
          if (enterOverlay) {
            enterOverlay.style.display = 'none';
          }
        }
      });
    }

    bindLinks() {
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href) return;

        // Skip external links, anchors, PDFs, and special links
        if (
          link.target === '_blank' ||
          href.startsWith('http') ||
          href.startsWith('#') ||
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.endsWith('.pdf')
        ) {
          return;
        }

        e.preventDefault();
        this.navigateTo(href);
      });
    }

    async navigateTo(url) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      // Start enter animation
      this.overlay.classList.add('is-entering');

      // Wait for animation
      await this.wait(CONFIG.transitionDuration);

      // Navigate
      window.location.href = url;
    }

    handlePopState() {
      // bfcache復元時は pageshow で処理されるためここでは何もしない
    }

    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  // ==========================================================================
  // Reveal on Scroll (Intersection Observer)
  // ==========================================================================
  class RevealOnScroll {
    constructor() {
      this.observer = null;
      this.init();
    }

    init() {
      // Check for IntersectionObserver support
      if (!('IntersectionObserver' in window)) {
        this.showAllElements();
        return;
      }

      // Create observer
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: CONFIG.revealThreshold,
          rootMargin: CONFIG.revealRootMargin
        }
      );

      // Observe all reveal elements
      this.observeElements();
    }

    observeElements() {
      const elements = document.querySelectorAll('.reveal, .reveal-right, .reveal-scale');
      elements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.observer.unobserve(entry.target);
        }
      });
    }

    showAllElements() {
      const elements = document.querySelectorAll('.reveal, .reveal-right, .reveal-scale');
      elements.forEach(el => el.classList.add('is-visible'));
    }
  }

  // ==========================================================================
  // Staggered Children Animation
  // ==========================================================================
  class StaggeredReveal {
    constructor() {
      this.init();
    }

    init() {
      // Auto-apply stagger delays to children of .stagger-children containers
      const containers = document.querySelectorAll('.stagger-children');
      containers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
          child.style.transitionDelay = `${index * CONFIG.staggerDelay}ms`;
        });
      });
    }
  }

  // ==========================================================================
  // Mobile Hamburger Menu
  // ==========================================================================
  class MobileMenu {
    constructor() {
      this.hamburger = null;
      this.mobileNav = null;
      this.isOpen = false;
      this.init();
    }

    init() {
      this.hamburger = document.querySelector('.hamburger');
      this.mobileNav = document.querySelector('.mobile-nav');
      this.closeBtn = document.querySelector('.mobile-nav__close');

      if (!this.hamburger || !this.mobileNav) return;

      this.hamburger.addEventListener('click', () => this.toggle());

      // Close button click
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      // Close menu when clicking on a link
      const links = this.mobileNav.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', () => this.close());
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.isOpen = true;
      this.hamburger.classList.add('is-active');
      this.mobileNav.classList.add('is-open');
      document.body.classList.add('menu-open');
      this.hamburger.setAttribute('aria-label', 'メニューを閉じる');
    }

    close() {
      this.isOpen = false;
      this.hamburger.classList.remove('is-active');
      this.mobileNav.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      this.hamburger.setAttribute('aria-label', 'メニューを開く');
    }
  }

  // ==========================================================================
  // Smooth Hover Effects
  // ==========================================================================
  class HoverEffects {
    constructor() {
      this.init();
    }

    init() {
      // Hover effects initialization (magnetic effect removed)
    }
  }

  // ==========================================================================
  // Loading Screen
  // ==========================================================================
  class LoadingScreen {
    constructor() {
      this.screen = null;
      this.minDisplayTime = 1800; // Minimum display time in ms
      this.startTime = Date.now();
      this.init();
    }

    init() {
      this.screen = document.querySelector('.loading-screen');
      if (!this.screen) return;

      // Wait for page to be fully loaded
      if (document.readyState === 'complete') {
        this.hide();
      } else {
        window.addEventListener('load', () => this.hide());
      }
    }

    hide() {
      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, this.minDisplayTime - elapsed);

      setTimeout(() => {
        if (this.screen) {
          this.screen.classList.add('is-hidden');
        }
      }, remaining);
    }
  }

  // ==========================================================================
  // Page Enter Overlay
  // ==========================================================================
  class PageEnterOverlay {
    constructor() {
      this.overlay = null;
      this.init();
    }

    init() {
      this.overlay = document.querySelector('.page-enter-overlay');
      if (!this.overlay) return;

      // Make body visible and start animation immediately
      document.body.classList.add('is-ready');

      // Start the slide up animation
      requestAnimationFrame(() => {
        this.overlay.classList.add('is-animating');
      });

      // Clean up after animation
      this.overlay.addEventListener('animationend', () => {
        this.overlay.classList.add('is-done');
      });
    }
  }

  // ==========================================================================
  // Page Load Animation
  // ==========================================================================
  class PageLoadAnimation {
    constructor() {
      this.hasLoadingScreen = !!document.querySelector('.loading-screen');
      this.hasEnterOverlay = !!document.querySelector('.page-enter-overlay');
      this.init();
    }

    init() {
      // Wait for DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.animate());
      } else {
        this.animate();
      }
    }

    animate() {
      // Determine delay based on what's present
      let delay = 100;
      if (this.hasLoadingScreen) {
        delay = 1900; // After loading screen
      } else if (this.hasEnterOverlay) {
        delay = 800; // After page enter overlay
      }

      setTimeout(() => {
        // Trigger reveal for elements in viewport
        const revealElements = document.querySelectorAll('.reveal, .reveal-right, .reveal-scale');
        revealElements.forEach((el, index) => {
          const rect = el.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;

          if (inViewport) {
            setTimeout(() => {
              el.classList.add('is-visible');
            }, index * CONFIG.staggerDelay);
          }
        });
      }, delay);
    }
  }

  // ==========================================================================
  // Parallax Effect (subtle)
  // ==========================================================================
  class ParallaxEffect {
    constructor() {
      this.elements = [];
      this.init();
    }

    init() {
      this.elements = document.querySelectorAll('[data-parallax]');
      if (this.elements.length === 0) return;

      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
      const scrollY = window.scrollY;

      this.elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const yPos = scrollY * speed;
        el.style.transform = `translateY(${yPos}px)`;
      });
    }
  }

  // ==========================================================================
  // Dynamic Breadcrumb
  // ==========================================================================
  class DynamicBreadcrumb {
    constructor() {
      this.init();
    }

    init() {
      const breadcrumbCurrent = document.querySelector('.breadcrumb__current');
      const articleTitle = document.querySelector('.article__title');

      if (breadcrumbCurrent && articleTitle) {
        // 記事タイトルをパンくずに反映（長い場合は省略）
        const title = articleTitle.textContent.trim();
        const maxLength = 30;
        breadcrumbCurrent.textContent = title.length > maxLength
          ? title.substring(0, maxLength) + '...'
          : title;
      }
    }
  }

  // ==========================================================================
  // Initialize Everything
  // ==========================================================================
  function init() {
    new LoadingScreen();
    new PageEnterOverlay();
    new PageTransition();
    new RevealOnScroll();
    new StaggeredReveal();
    new HoverEffects();
    new MobileMenu();
    new PageLoadAnimation();
    new ParallaxEffect();
    new DynamicBreadcrumb();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
