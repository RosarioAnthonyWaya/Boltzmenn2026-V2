// =====================================================================
// Boltzmenn main.js — Jekyll asset.
// Nav-specific toggle logic lives in navbar.js instead; this file is
// everything else interactive on the page (marquee, FAQ, smooth scroll).
//
// Order matters here: marquee and FAQ run FIRST, each in their own
// isolated IIFE, before Lenis initializes. Previously Lenis sat at the
// top of this file completely unguarded -- if it threw for any reason
// (failed CDN load, offline testing, ad blocker), JS execution stopped
// dead at that line, and everything below it in the file -- including
// the marquee driver -- never ran at all. That's almost certainly why
// the hero marquee on /the-scan/ wasn't animating. Every block below
// is now independent: one failing can't take the others down with it.
// =====================================================================

// Marquee -- plain requestAnimationFrame loop, drives every marquee
// track on the site (not just the homepage trust bar). The real
// template's marquees are all JS-driven too (confirmed: no CSS
// @keyframes exist for any of them in boltzmenn-brand.css), just via
// GSAP there instead of a plain loop.
(function(){
  try{
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
  } catch(e) { console.error('Marquee init failed:', e); }
})();

// FAQ tabs (General / Pricing / The Scan) -- sets display via inline
// style directly on every pane on each click, rather than only toggling
// the .w--tab-active class. A pane that starts with an inline
// style="display:block" safety net (the default-open tab) would
// otherwise stay visibly stuck open even after its class is removed,
// since inline styles take precedence over class-based rules.
(function(){
  try{
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
  } catch(e) { console.error('FAQ tabs init failed:', e); }
})();

// FAQ accordion (question expand/collapse within a tab)
(function(){
  try{
    document.querySelectorAll('.expandable-top').forEach(function(top){
      top.addEventListener('click', function(){
        var bottom = top.nextElementSibling;
        var isOpen = bottom.style.height === 'auto';
        bottom.style.height = isOpen ? '0px' : 'auto';
        bottom.style.opacity = isOpen ? '0' : '1';
      });
    });
  } catch(e) { console.error('FAQ accordion init failed:', e); }
})();

// Smooth scroll -- guarded last. If Lenis fails to load or throws, it
// only costs the smooth-scroll effect, not the marquee or FAQ above.
(function(){
  try{
    var lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.7, gestureOrientation: "vertical", normalizeWheel: false, smoothTouch: false });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  } catch(e) { console.error('Lenis init failed:', e); }
})();
