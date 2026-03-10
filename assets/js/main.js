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

  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled, onScrollOptions);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
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

  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, onScrollOptions);

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

  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      const section = document.querySelector(navmenulink.hash);
      if (!section) return;

      const position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy, onScrollOptions);

})();
