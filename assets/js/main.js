/**
* Template Name: Rapid
* Template URL: https://bootstrapmade.com/rapid-multipurpose-bootstrap-business-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  const onScrollOptions = { passive: true };
  const selectBody = document.body;
  const selectHeader = document.querySelector('#header');
  const scrollTop = document.querySelector('.scroll-top');
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileNavToggleIcon = mobileNavToggleBtn ? mobileNavToggleBtn.querySelector('i') : null;
  let isGlobalScrollTicking = false;

  function toggleScrolled() {
    if (!selectHeader) return;
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  function toggleScrollTop() {
    if (!scrollTop) return;
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }

  function runGlobalScrollEffects() {
    toggleScrolled();
    toggleScrollTop();
  }

  function onGlobalScroll() {
    if (isGlobalScrollTicking) return;

    isGlobalScrollTicking = true;
    window.requestAnimationFrame(() => {
      runGlobalScrollEffects();
      isGlobalScrollTicking = false;
    });
  }

  function setMobileNavState(isActive) {
    selectBody.classList.toggle('mobile-nav-active', isActive);

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.setAttribute('aria-expanded', String(isActive));
      mobileNavToggleBtn.setAttribute('aria-label', isActive ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    }

    if (mobileNavToggleIcon) {
      mobileNavToggleIcon.classList.toggle('bi-list', !isActive);
      mobileNavToggleIcon.classList.toggle('bi-x', isActive);
    }
  }

  function mobileNavToogle() {
    const isActive = !selectBody.classList.contains('mobile-nav-active');
    setMobileNavState(isActive);
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && selectBody.classList.contains('mobile-nav-active')) {
      setMobileNavState(false);
    }
  });

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (selectBody.classList.contains('mobile-nav-active')) {
        setMobileNavState(false);
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', runGlobalScrollEffects);
  document.addEventListener('scroll', onGlobalScroll, onScrollOptions);

  let swiperAssetsPromise;

  function loadSwiperAssets() {
    if (swiperAssetsPromise) return swiperAssetsPromise;

    swiperAssetsPromise = new Promise((resolve, reject) => {
      if (!document.querySelector('link[data-swiper-css]')) {
        const swiperCss = document.createElement('link');
        swiperCss.rel = 'stylesheet';
        swiperCss.href = 'https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.css';
        swiperCss.setAttribute('data-swiper-css', 'true');
        document.head.appendChild(swiperCss);
      }

      if (typeof Swiper !== 'undefined') {
        resolve();
        return;
      }

      const swiperScript = document.createElement('script');
      swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11.2.10/swiper-bundle.min.js';
      swiperScript.async = true;
      swiperScript.onload = () => resolve();
      swiperScript.onerror = () => reject(new Error('Erro ao carregar Swiper'));
      document.body.appendChild(swiperScript);
    });

    return swiperAssetsPromise;
  }

  function initSwiper() {
    if (typeof Swiper === 'undefined') return;

    document.querySelectorAll('.init-swiper').forEach(function(swiperElement) {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (!configElement) return;

      const config = JSON.parse(configElement.innerHTML.trim());

      if (swiperElement.classList.contains('swiper-tab') && typeof initSwiperWithCustomPagination === 'function') {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  function initTestimonialsWhenVisible() {
    const testimonialsSwiper = document.querySelector('#testimonials .init-swiper');
    if (!testimonialsSwiper) return;

    let initialized = false;

    const startSwiper = () => {
      if (initialized) return;
      initialized = true;
      loadSwiperAssets().then(initSwiper).catch(() => {
        initialized = false;
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          startSwiper();
        }
      }, {
        rootMargin: '200px 0px'
      });

      observer.observe(testimonialsSwiper);
    } else {
      window.addEventListener('load', startSwiper);
    }
  }
  initTestimonialsWhenVisible();

  function initWhatsAppCtaTracking() {
    document.querySelectorAll('.js-whatsapp-cta[data-cta="whatsapp-group"]').forEach((cta) => {
      cta.addEventListener('click', () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'whatsapp_group_click',
          cta_location: cta.dataset.ctaLocation || 'unknown',
          cta_text: cta.textContent.trim().replace(/\s+/g, ' '),
          page_path: window.location.pathname,
          page_title: document.title
        });
      });
    });
  }
  initWhatsAppCtaTracking();

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  const navmenulinks = Array.from(document.querySelectorAll('.navmenu a'));
  let navmenuSections = [];
  let activeNavLink = null;
  let isScrollspyTicking = false;

  function buildNavmenuSections() {
    navmenuSections = navmenulinks
      .map((navmenulink) => {
        if (!navmenulink.hash) return null;

        const section = document.querySelector(navmenulink.hash);
        if (!section) return null;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        return {
          link: navmenulink,
          top: sectionTop,
          bottom: sectionBottom
        };
      })
      .filter(Boolean);
  }

  function navmenuScrollspy() {
    const position = window.scrollY + 200;
    let nextActiveLink = null;

    for (const sectionInfo of navmenuSections) {
      if (position >= sectionInfo.top && position <= sectionInfo.bottom) {
        nextActiveLink = sectionInfo.link;
        break;
      }
    }

    if (nextActiveLink === activeNavLink) return;

    if (activeNavLink) {
      activeNavLink.classList.remove('active');
    }

    if (nextActiveLink) {
      nextActiveLink.classList.add('active');
    }

    activeNavLink = nextActiveLink;
  }

  function onScrollSpy() {
    if (isScrollspyTicking) return;

    isScrollspyTicking = true;
    window.requestAnimationFrame(() => {
      navmenuScrollspy();
      isScrollspyTicking = false;
    });
  }

  window.addEventListener('load', () => {
    buildNavmenuSections();
    navmenuScrollspy();
  });
  window.addEventListener('resize', buildNavmenuSections, onScrollOptions);
  window.addEventListener('orientationchange', buildNavmenuSections);
  document.addEventListener('scroll', onScrollSpy, onScrollOptions);

})();
