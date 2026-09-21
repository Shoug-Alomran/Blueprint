/* Progressive enhancements: navigation, construction story, and shared icons. */
(function () {
  "use strict";
  function init() {
    var button = document.querySelector(".studio-menu");
    var nav = document.querySelector(".studio-nav");
    if (button && nav && !button.dataset.bound) {
      button.dataset.bound = "true";
      function close() {
        nav.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation");
      }
      button.addEventListener("click", function () {
        var open = button.getAttribute("aria-expanded") !== "true";
        nav.classList.toggle("is-open", open);
        button.setAttribute("aria-expanded", String(open));
        button.setAttribute(
          "aria-label",
          open ? "Close navigation" : "Open navigation",
        );
      });
      nav.addEventListener("click", function (event) {
        if (event.target.closest("a")) close();
      });
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          close();
          button.focus();
        }
      });
      document.addEventListener("click", function (event) {
        if (!event.target.closest(".studio-header")) close();
      });
      window.matchMedia("(min-width: 901px)").addEventListener("change", close);
    }
    var shapes = [
      '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M8 9v11"/>',
      '<path d="m12 3 10 6-10 6L2 9ZM2 13l10 6 10-6M2 17l10 6 10-6"/>',
      '<rect x="9" y="3" width="6" height="5"/><rect x="2" y="16" width="6" height="5"/><rect x="16" y="16" width="6" height="5"/><path d="M12 8v4M5 16v-4h14v4"/>',
      '<path d="M14 2H4v20h16V8ZM14 2v6h6M8 12h8M8 16h6"/>',
    ];
    document
      .querySelectorAll(".md-typeset .bp-tile,.md-typeset .info-card")
      .forEach(function (card, i) {
        if (card.querySelector(".studio-editorial-icon,svg,img")) return;
        var el = document.createElement("span");
        el.className = "studio-editorial-icon";
        el.setAttribute("aria-hidden", "true");
        el.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round">' +
          shapes[i % shapes.length] +
          "</svg>";
        card.prepend(el);
      });
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced && "IntersectionObserver" in window) {
      var reveal = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("studio-entered");
              reveal.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          ".md-typeset .bp-tile,.md-typeset .info-card,.studio-panel,.studio-plan",
        )
        .forEach(function (el) {
          el.classList.add("studio-motion");
          reveal.observe(el);
        });
    }
    var stages = Array.from(document.querySelectorAll("[data-journey-stage]"));
    if (stages.length && !document.body.dataset.journeyBound) {
      document.body.dataset.journeyBound = "true";
      var names = [
        "IDEA",
        "DEFINITION",
        "SPECIFICATION",
        "BLUEPRINT",
        "INTERFACE",
        "TESTED BUILD",
        "LIVE WEBSITE",
      ];
      var queued = false;
      function update() {
        var current = 1;
        var anchor = window.innerHeight * 0.45;
        stages.forEach(function (stage) {
          if (stage.getBoundingClientRect().top < anchor)
            current = Number(stage.dataset.journeyStage);
        });
        var transform = document.querySelector(".journey-transform");
        if (transform) transform.dataset.stage = current;
        document.getElementById("journey-count").textContent =
          "0" + current + " / 07";
        document.getElementById("journey-state").textContent =
          names[current - 1];
        document
          .querySelector(".journey-navigation")
          .style.setProperty("--journey-progress", (current / 7) * 100 + "%");
        document
          .querySelectorAll(".journey-navigation a")
          .forEach(function (link, index) {
            if (index === current - 1)
              link.setAttribute("aria-current", "step");
            else link.removeAttribute("aria-current");
          });
        stages.forEach(function (stage, index) {
          stage.classList.toggle("is-active", index === current - 1);
        });
        queued = false;
      }
      window.addEventListener(
        "scroll",
        function () {
          if (!queued) {
            queued = true;
            requestAnimationFrame(update);
          }
        },
        { passive: true },
      );
      window.addEventListener("resize", update);
      update();
    }
    document.querySelectorAll("[data-work-filter]").forEach(function (button) {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", function () {
        var filter = button.dataset.workFilter;
        var count = 0;
        document
          .querySelectorAll("[data-work-filter]")
          .forEach(function (item) {
            item.setAttribute("aria-pressed", String(item === button));
          });
        document
          .querySelectorAll("[data-work-category]")
          .forEach(function (card) {
            card.hidden =
              filter !== "all" && card.dataset.workCategory !== filter;
            if (!card.hidden) count++;
          });
        document.getElementById("studio-work-count").textContent =
          count + (count === 1 ? " project" : " projects");
      });
    });
    // Deep links such as /web-platforms/#course arrive from the Products page
    // and should open with that filter already applied. A hash-only navigation
    // never reloads the page, so listen for hashchange as well as applying it
    // on first load.
    function applyHashFilter() {
      var wanted = (window.location.hash || "")
        .replace("#", "")
        .replace(/"/g, "");
      if (!wanted) return;
      var preset = document.querySelector(
        '[data-work-filter="' + wanted + '"]',
      );
      if (preset && preset.getAttribute("aria-pressed") !== "true")
        preset.click();
    }
    if (!document.body.dataset.workHashBound) {
      document.body.dataset.workHashBound = "true";
      window.addEventListener("hashchange", applyHashFilter);
    }
    applyHashFilter();
    var range = document.getElementById("journey-compare");
    if (range && !range.dataset.bound) {
      range.dataset.bound = "true";
      range.addEventListener("input", function () {
        document
          .querySelector(".journey-comparison")
          .style.setProperty("--compare", 100 - Number(range.value) + "%");
      });
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
