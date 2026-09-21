/* ---------------------------------------------------------------------------
   Theme toggle.

   The scheme itself is applied by an inline script in <head> so the page never
   flashes the wrong colours. This file only owns the switch: click handling,
   persistence, the button's accessible label, and following the system setting
   for visitors who have never chosen explicitly.

   Three states, two buttons' worth of UI:

     nothing stored   -> follow the OS, live, including mid-session changes
     'default'        -> the visitor asked for light
     'slate'          -> the visitor asked for dark

   Toggling to whichever scheme the OS is already on clears the stored value
   rather than writing it, so the visitor lands back in "follow the system"
   instead of being pinned to a snapshot of it.
   --------------------------------------------------------------------------- */
(function () {
  var AR = document.documentElement.lang === "ar";

  var STORAGE_KEY = "bp-scheme";
  var root = document.documentElement;
  var lightQuery = null;

  try {
    lightQuery = window.matchMedia("(prefers-color-scheme: light)");
  } catch (e) {
    /* matchMedia unavailable */
  }

  function systemScheme() {
    return lightQuery && lightQuery.matches ? "default" : "slate";
  }

  function stored() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "default" || value === "slate" ? value : null;
    } catch (e) {
      return null;
    }
  }

  function current() {
    return root.getAttribute("data-md-color-scheme") === "default"
      ? "default"
      : "slate";
  }

  function label(scheme) {
    return scheme === "default"
      ? AR ? "التبديل إلى الوضع الداكن" : "Switch to dark theme"
      : AR ? "التبديل إلى الوضع الفاتح" : "Switch to light theme";
  }

  function syncButtons(scheme) {
    document
      .querySelectorAll("[data-bp-theme-toggle]")
      .forEach(function (button) {
        button.setAttribute("aria-label", label(scheme));
        button.setAttribute("aria-pressed", String(scheme === "default"));
      });
  }

  function apply(scheme) {
    root.setAttribute("data-md-color-scheme", scheme);
    syncButtons(scheme);
  }

  function choose(scheme) {
    apply(scheme);
    try {
      // Matching the OS again means "follow the system", not "pin this value".
      if (scheme === systemScheme()) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, scheme);
    } catch (e) {
      /* private mode */
    }
  }

  function init() {
    // The head script already picked a scheme; re-assert it in case anything
    // (Material's own palette handling, a cached attribute) disagrees.
    apply(stored() || systemScheme());

    document
      .querySelectorAll("[data-bp-theme-toggle]")
      .forEach(function (button) {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", function () {
          choose(current() === "default" ? "slate" : "default");
        });
      });
  }

  // Follow the OS setting until the visitor picks a side themselves.
  if (lightQuery) {
    var onChange = function () {
      if (!stored()) apply(systemScheme());
    };
    if (lightQuery.addEventListener)
      lightQuery.addEventListener("change", onChange);
    else if (lightQuery.addListener) lightQuery.addListener(onChange);
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
