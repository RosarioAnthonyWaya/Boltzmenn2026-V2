// =====================================================================
// Boltzmenn main.js — Jekyll asset.
// Nav-specific toggle logic lives in navbar.js instead; this file is
// everything else interactive on the page (marquee, FAQ).
// =====================================================================

// Smooth scroll
var lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.7, gestureOrientation: "vertical", normalizeWheel: false, smoothTouch: false });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// Marquee -- plain requestAnimationFrame loop, drives every marquee
// track on the site (not just the homepage trust bar). The real
// template's marquees are all JS-driven too (confirmed: no CSS
// @keyframes exist for any of them in boltzmenn-brand.css), just via
// GSAP there instead of a plain loop.
(function(){
  var tracks = document.querySelectorAll('.bm-marquee-track, .marquee-services');
  tracks.forEach(function(track){
    var x = 0;
    function step(){
      x -= 0.6;
      var resetPoint = -(track.scrollWidth / 2);
      if(x <= resetPoint) x = 0;
      track.style.transform = 'translateX(' + x + 'px)';
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
})();

// FAQ tabs (General / Pricing / The Scan) -- sets display via inline
// style directly on every pane on each click, rather than only toggling
// the .w--tab-active class. A pane that starts with an inline
// style="display:block" safety net (the default-open tab) would
// otherwise stay visibly stuck open even after its class is removed,
// since inline styles take precedence over class-based rules.
(function(){
  document.querySelectorAll('.tab-link-faq').forEach(function(tab){
    tab.addEventListener('click', function(e){
      e.preventDefault();
      var menu = tab.closest('.tabs-faq');
      var idx = Array.from(tab.parentNode.children).indexOf(tab);
      menu.querySelectorAll('.tab-link-faq').forEach(function(t){ t.classList.remove('w--current'); });
      tab.classList.add('w--current');
      menu.querySelectorAll('.tab-pane-faq').forEach(function(p, i){
        var isActive = i === idx;
        p.classList.toggle('w--tab-active', isActive);
        p.style.display = isActive ? 'block' : 'none';
      });
    });
  });
})();

// FAQ accordion (question expand/collapse within a tab)
(function(){
  document.querySelectorAll('.expandable-top').forEach(function(top){
    top.addEventListener('click', function(){
      var bottom = top.nextElementSibling;
      var isOpen = bottom.style.height === 'auto';
      bottom.style.height = isOpen ? '0px' : 'auto';
      bottom.style.opacity = isOpen ? '0' : '1';
    });
  });
})();
