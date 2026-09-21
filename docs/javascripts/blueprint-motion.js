/* ==========================================================================
   Blueprint — motion layer
   Scroll reveals, construction-line drawing, header state, hero parallax.
   Everything here is additive: with JS off the page stays fully readable
   because `.is-revealed` is only an enhancement over static CSS fallbacks.
   ========================================================================== */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Header solidifies once the page moves ---------------------------- */
  function initHeaderState() {
    var ticking = false;

    function apply() {
      document.body.classList.toggle("bp-scrolled", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(apply);
        }
      },
      { passive: true },
    );

    apply();
  }

  /* --- Scroll reveals ---------------------------------------------------- */
  /* --- Reveal coverage --------------------------------------------------
     Several templates (about, contact, portfolio) were never annotated with
     data-bp-reveal, so they arrived fully static while the rest of the site
     animated. Rather than hand-tag every block, give any section that has no
     reveals of its own a sensible default set: the direct children of its
     inner wrapper. Templates that already opt in are left exactly as they are.
     --------------------------------------------------------------------- */
  function initAutoReveal() {
    var WRAPPERS = ".studio-wrap, .bp-section__head, .bp-shell";
    document.querySelectorAll("section").forEach(function (section) {
      if (section.querySelector("[data-bp-reveal]")) return;
      if (section.hasAttribute("data-bp-reveal")) return;
      if (section.hasAttribute("data-bp-no-reveal")) return;

      var wrap = section.querySelector(WRAPPERS) || section;
      Array.prototype.forEach.call(wrap.children, function (child) {
        // Skip decorative layers and anything already animating.
        if (child.hasAttribute("aria-hidden")) return;
        if (child.hasAttribute("data-bp-reveal")) return;
        if (
          !child.textContent.trim() &&
          !child.querySelector("img, svg, iframe")
        )
          return;
        child.setAttribute("data-bp-reveal", "");
      });
    });
  }

  /* Stagger consecutive revealed siblings so a grid lands as a sequence
     rather than all at once. Capped so long lists never feel slow. */
  function initStagger() {
    var STEP = 70;
    var MAX = 6;
    var groups = new Map();
    document.querySelectorAll("[data-bp-reveal]").forEach(function (el) {
      var parent = el.parentElement;
      if (!parent) return;
      if (!groups.has(parent)) groups.set(parent, 0);
      var index = groups.get(parent);
      if (index > 0 && !el.style.getPropertyValue("--bp-delay")) {
        el.style.setProperty("--bp-delay", Math.min(index, MAX) * STEP + "ms");
      }
      groups.set(parent, index + 1);
    });
  }

  function initReveals() {
    var targets = document.querySelectorAll("[data-bp-reveal]");
    if (!targets.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Blueprint construction lines drawing themselves ------------------- */
  function initRails() {
    var rails = document.querySelectorAll("[data-bp-stages]");
    if (!rails.length) return;

    if (reduced || !("IntersectionObserver" in window)) {
      rails.forEach(function (el) {
        el.classList.add("is-drawn");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 },
    );

    rails.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Hero composition parallax ---------------------------------------- */
  function initParallax() {
    var stage = document.querySelector("[data-bp-parallax]");
    if (!stage || reduced) return;

    var layers = stage.querySelectorAll("[data-bp-depth]");
    if (!layers.length) return;

    var pointerX = 0;
    var pointerY = 0;
    var scrollY = 0;
    var queued = false;

    function render() {
      layers.forEach(function (layer) {
        var depth = parseFloat(layer.getAttribute("data-bp-depth")) || 0.03;
        var x = pointerX * depth * 100;
        var y = pointerY * depth * 100 + scrollY * depth * 0.9;
        layer.style.transform =
          "translate3d(" + x.toFixed(2) + "px," + y.toFixed(2) + "px,0)";
      });
      queued = false;
    }

    function schedule() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(render);
    }

    window.addEventListener(
      "pointermove",
      function (event) {
        var rect = stage.getBoundingClientRect();
        pointerX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        pointerY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        schedule();
      },
      { passive: true },
    );

    window.addEventListener(
      "scroll",
      function () {
        scrollY = Math.min(window.scrollY, 600);
        schedule();
      },
      { passive: true },
    );
  }

  function init() {
    initHeaderState();
    initAutoReveal();
    initStagger();
    initReveals();
    initRails();
    initParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* Material's instant navigation swaps content without a reload. */
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function () {
      initAutoReveal();
      initStagger();
      initReveals();
      initRails();
      initParallax();
    });
  }
})();
