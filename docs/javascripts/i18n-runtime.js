/* ---------------------------------------------------------------------------
   Runtime Arabic for text that scripts insert after the page loads.

   Arabic pages are translated at build time (hooks/i18n_ar.py), but some text
   only exists once JavaScript runs: the cart counter, empty-cart and checkout
   messages, storefront buttons. Rather than thread a translation function
   through every one of those scripts, this watches the page and translates
   inserted text from the same catalog. The build hook embeds the entries from
   i18n/ar/runtime.yml into each Arabic page as window.BP_I18N.

   Does nothing on English pages.
   --------------------------------------------------------------------------- */
(function () {
  if (document.documentElement.lang !== "ar") return;
  var data = window.BP_I18N;
  if (!data) return;

  var strings = data.strings || {};
  var patterns = (data.patterns || []).map(function (p) {
    return [new RegExp(p[0]), p[1]];
  });
  var ATTRS = ["aria-label", "title", "placeholder", "alt"];

  function lookup(text) {
    var key = text.replace(/\s+/g, " ").trim();
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(strings, key)) return strings[key];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i][0].test(key)) return key.replace(patterns[i][0], patterns[i][1]);
    }
    return null;
  }

  function skip(el) {
    return !el || el.closest("script, style, code, pre, textarea, [translate='no']");
  }

  function translateText(node) {
    if (skip(node.parentElement)) return;
    var raw = node.nodeValue;
    var found = lookup(raw);
    if (found === null) return;
    var lead = raw.match(/^\s*/)[0];
    var trail = raw.match(/\s*$/)[0];
    var next = lead + found + trail;
    if (next !== raw) node.nodeValue = next;
  }

  function translateAttrs(el) {
    if (skip(el)) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var value = el.getAttribute(ATTRS[i]);
      if (!value) continue;
      var found = lookup(value);
      if (found !== null && found !== value) el.setAttribute(ATTRS[i], found);
    }
    if (el.tagName === "INPUT" && /^(button|submit)$/i.test(el.type)) {
      var v = lookup(el.value || "");
      if (v !== null) el.value = v;
    }
  }

  function walk(root) {
    if (root.nodeType === 3) {
      translateText(root);
      return;
    }
    if (root.nodeType !== 1) return;
    translateAttrs(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === 3) translateText(node);
      else translateAttrs(node);
    }
  }

  // Start observing immediately: this file loads before the scripts whose
  // output it translates.
  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var m = mutations[i];
      if (m.type === "characterData") translateText(m.target);
      else if (m.type === "attributes") translateAttrs(m.target);
      else for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ATTRS,
  });

  function initial() { walk(document.body); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initial);
  else initial();
})();
