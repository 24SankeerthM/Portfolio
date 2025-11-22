// script.js — theme, nav, scroll reveal, scroll spy, contact demo
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var docEl = document.documentElement;
    var toggleBtn = document.getElementById('theme-toggle');
    var navToggle = document.getElementById('nav-toggle');
    var navlinks = document.getElementById('navlinks');
    var header = document.getElementById('topnav');

    function updateToggleUI(isLight) {
      if (!toggleBtn) return;
      toggleBtn.textContent = isLight ? '☀️' : '🌙';
    }

    updateToggleUI(docEl.classList.contains('light'));

    // theme toggle
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var willBeLight = !docEl.classList.contains('light');
        docEl.classList.toggle('light', willBeLight);
        try { localStorage.setItem('theme', willBeLight ? 'light' : 'dark'); } catch (e) {}
        updateToggleUI(willBeLight);
      });
    }

    // mobile nav
    if (navToggle && navlinks) {
      navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        navlinks.style.display = navlinks.style.display === 'flex' ? 'none' : 'flex';
      });

      document.addEventListener('click', function (ev) {
        if (window.innerWidth < 900 &&
            !navlinks.contains(ev.target) &&
            ev.target !== navToggle) {
          navlinks.style.display = 'none';
        }
      });

      navlinks.addEventListener('click', function (ev) {
        if (ev.target.tagName === 'A' && window.innerWidth < 900) {
          navlinks.style.display = 'none';
        }
      });
    }

    // reveal on scroll
    (function () {
      var items = document.querySelectorAll('.reveal');
      if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18 });

      items.forEach(function (el) { obs.observe(el); });
    })();

    // scroll spy + header style + tiny parallax
    (function () {
      var sections = document.querySelectorAll('main section[id]');
      var links = document.querySelectorAll('.navlinks a');

      function onScroll() {
        var y = window.scrollY || window.pageYOffset;

        if (header) {
          if (y > 20) header.classList.add('scrolled');
          else header.classList.remove('scrolled');
        }

        var pos = y + window.innerHeight * 0.35;
        sections.forEach(function (sec) {
          if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
            links.forEach(function (l) { l.classList.remove('active'); });
            var active = document.querySelector('.navlinks a[href="#' + sec.id + '"]');
            if (active) active.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();

    // contact form demo
    var form = document.getElementById('contact-form');
    if (form) {

    }

    // footer year
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();

