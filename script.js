// script.js — theme toggle, nav, reveal, scroll spy, contact demo
(function(){
  // Wait for DOM ready
  document.addEventListener('DOMContentLoaded', function(){
    var docEl = document.documentElement; // <html>
    var toggleBtn = document.getElementById('theme-toggle');
    var navToggle = document.getElementById('nav-toggle');
    var navlinks = document.getElementById('navlinks');

    // Helper: update toggle UI
    function updateToggleUI(isLight) {
      if (!toggleBtn) return;
      toggleBtn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      toggleBtn.textContent = isLight ? '☀️' : '🌙';
      try {
        toggleBtn.animate([{ transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 160 });
      } catch(e) { /* animation optional */ }
    }

    // Initialize toggle UI from current class
    var isLightNow = docEl.classList.contains('light');
    updateToggleUI(isLightNow);

    // Theme toggle handler
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function(){
        var willBeLight = !docEl.classList.contains('light');
        if (willBeLight) docEl.classList.add('light');
        else docEl.classList.remove('light');
        try { localStorage.setItem('theme', willBeLight ? 'light' : 'dark'); } catch(e) { /* ignore */ }
        updateToggleUI(willBeLight);
      });
    }

    // Mobile nav toggle
    if (navToggle && navlinks) {
      navToggle.addEventListener('click', function(e){
        e.stopPropagation();
        var shown = navlinks.style.display === 'flex';
        navlinks.style.display = shown ? 'none' : 'flex';
      });

      document.addEventListener('click', function(ev){
        if (window.innerWidth < 1000) {
          if (!navlinks.contains(ev.target) && ev.target !== navToggle) {
            navlinks.style.display = 'none';
          }
        }
      });
    }

    // IntersectionObserver reveal on scroll
    (function(){
      if (!('IntersectionObserver' in window)) {
        // fallback: just show all
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-visible');
        return;
      }
      var obs = new IntersectionObserver(function(entries){
        for (var i = 0; i < entries.length; i++) {
          var e = entries[i];
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        }
      }, { threshold: 0.12 });
      var els = document.querySelectorAll('.reveal');
      for (var k = 0; k < els.length; k++) obs.observe(els[k]);
    })();

    // Scroll spy to mark active nav item
    (function(){
      var sections = document.querySelectorAll('main section[id]');
      var navAnchors = document.querySelectorAll('.navlinks a');
      function onScroll(){
        var pos = window.scrollY + window.innerHeight * 0.35;
        for (var i = 0; i < sections.length; i++) {
          var s = sections[i];
          if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
            for (var j = 0; j < navAnchors.length; j++) navAnchors[j].classList.remove('active');
            var link = document.querySelector('.navlinks a[href="#' + s.id + '"]');
            if (link) link.classList.add('active');
          }
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();

    // Contact form demo (no backend)
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var nameInput = form.elements['name'];
        var nameVal = (nameInput && nameInput.value) ? nameInput.value : 'there';
        alert('Thanks ' + nameVal + '! This demo contact form does not send email yet.');
        form.reset();
      });
    }

    // Set year in footer
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
