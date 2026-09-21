/* ---------------------------------------------------------------------------
   Site search.

   Material's search plugin still builds search_index.json, but its own UI
   lives in the header partial this site replaces. Rather than resurrect
   Material's chrome, this reads the same index directly and renders results
   in a dialog that matches the rest of the interface.

   The index is fetched lazily — the first time the dialog opens — so it costs
   nothing on pages nobody searches from.
   --------------------------------------------------------------------------- */
(function () {
  // Arabic pages search the Arabic index, which the build writes to /ar/.
  var AR = document.documentElement.lang === "ar";
  var TEXT = AR
    ? {
        idle: "اكتب للبحث في الموقع.",
        none: function (q) { return "لا توجد نتائج لـ «" + q + "»."; },
        count: function (n) {
          return n === 1 ? "نتيجة واحدة" : n === 2 ? "نتيجتان" : n + (n <= 10 ? " نتائج" : " نتيجة");
        },
        untitled: "بدون عنوان",
      }
    : {
        idle: "Type to search the site.",
        none: function (q) { return "No matches for “" + q + "”."; },
        count: function (n) { return n + (n === 1 ? " result" : " results"); },
        untitled: "Untitled",
      };

  /* Arabic spelling varies in ways readers treat as the same word: hamza
     forms of alef, taa marbuta vs haa, alef maqsura vs yaa, and optional
     diacritics. Fold them on both sides so "اسعار" finds "أسعار". */
  function fold(value) {
    value = (value || "").toLowerCase();
    if (!AR) return value;
    return value
      .replace(/[\u064B-\u0652\u0640]/g, "")
      .replace(/[أإآ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي");
  }

  var docs = null;
  var loading = null;
  var activeIndex = -1;

  var dialog, input, results, status;

  function root() {
    var meta = document.querySelector('meta[name="blueprint-root"]');
    return meta ? meta.getAttribute("content") : "/";
  }

  function load() {
    if (docs) return Promise.resolve(docs);
    if (loading) return loading;
    loading = fetch(root() + (AR ? "ar/" : "") + "search/search_index.json")
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        // Drop section fragments with no prose; they add noise, not answers.
        docs = (data.docs || []).filter(function (d) {
          return d.text && d.text.trim().length > 20;
        });
        return docs;
      })
      .catch(function () {
        docs = [];
        return docs;
      });
    return loading;
  }

  function terms(query) {
    return fold(query).split(/\s+/).filter(Boolean);
  }

  function score(doc, list) {
    var title = fold(doc.title);
    var text = fold(doc.text);
    var total = 0;
    for (var i = 0; i < list.length; i++) {
      var t = list[i];
      var inTitle = title.indexOf(t) !== -1;
      var inText = text.indexOf(t) !== -1;
      if (!inTitle && !inText) return 0; // every term must appear
      if (inTitle) total += title.indexOf(t) === 0 ? 14 : 10;
      if (inText) total += 1;
    }
    return total;
  }

  function snippet(doc, list) {
    var text = doc.text || "";
    var lower = text.toLowerCase();
    var at = -1;
    for (var i = 0; i < list.length && at === -1; i++)
      at = lower.indexOf(list[i]);
    if (at === -1) at = 0;
    var from = Math.max(0, at - 60);
    var cut = text.slice(from, from + 180).trim();
    return (from > 0 ? "…" : "") + cut + (from + 180 < text.length ? "…" : "");
  }

  function mark(text, list) {
    var out = text.replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
    list.forEach(function (t) {
      if (!t) return;
      var safe = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      out = out.replace(new RegExp("(" + safe + ")", "ig"), "<mark>$1</mark>");
    });
    return out;
  }

  function render(query) {
    var list = terms(query);
    if (!list.length) {
      results.innerHTML = "";
      status.textContent = TEXT.idle;
      activeIndex = -1;
      return;
    }
    var scored = [];
    for (var i = 0; i < docs.length; i++) {
      var s = score(docs[i], list);
      if (s > 0) scored.push({ doc: docs[i], score: s });
    }
    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    // One result per page: the best-scoring section stands in for the page.
    var seen = {};
    var top = [];
    for (var j = 0; j < scored.length && top.length < 8; j++) {
      var page = scored[j].doc.location.split("#")[0];
      if (seen[page]) continue;
      seen[page] = true;
      top.push(scored[j].doc);
    }

    if (!top.length) {
      results.innerHTML = "";
      status.textContent = TEXT.none(query);
      activeIndex = -1;
      return;
    }

    status.textContent = TEXT.count(top.length);
    results.innerHTML = top
      .map(function (d, index) {
        return (
          '<li><a class="bp-search__hit" href="' +
          root() +
          d.location +
          '" data-index="' +
          index +
          '">' +
          '<span class="bp-search__hit-title">' +
          mark(d.title || TEXT.untitled, list) +
          "</span>" +
          '<span class="bp-search__hit-text">' +
          mark(snippet(d, list), list) +
          "</span>" +
          "</a></li>"
        );
      })
      .join("");
    activeIndex = -1;
  }

  function hits() {
    return Array.prototype.slice.call(
      results.querySelectorAll(".bp-search__hit"),
    );
  }

  function highlight(next) {
    var all = hits();
    if (!all.length) return;
    activeIndex = (next + all.length) % all.length;
    all.forEach(function (a, i) {
      a.classList.toggle("is-active", i === activeIndex);
    });
    all[activeIndex].scrollIntoView({ block: "nearest" });
  }

  function open() {
    dialog.classList.add("is-open");
    document.body.classList.add("bp-search-open");
    dialog.setAttribute("aria-hidden", "false");
    load().then(function () {
      if (input.value) render(input.value);
    });
    setTimeout(function () {
      input.focus();
    }, 40);
  }

  function close() {
    dialog.classList.remove("is-open");
    document.body.classList.remove("bp-search-open");
    dialog.setAttribute("aria-hidden", "true");
  }

  function init() {
    dialog = document.querySelector("[data-bp-search]");
    if (!dialog) return;
    input = dialog.querySelector("[data-bp-search-input]");
    results = dialog.querySelector("[data-bp-search-results]");
    status = dialog.querySelector("[data-bp-search-status]");

    document
      .querySelectorAll("[data-bp-search-open]")
      .forEach(function (button) {
        if (button.dataset.bound) return;
        button.dataset.bound = "true";
        button.addEventListener("click", open);
      });

    dialog.addEventListener("click", function (event) {
      if (
        event.target === dialog ||
        event.target.hasAttribute("data-bp-search-close")
      )
        close();
    });

    input.addEventListener("input", function () {
      load().then(function () {
        render(input.value.trim());
      });
    });

    input.addEventListener("keydown", function (event) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        highlight(activeIndex + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        highlight(activeIndex - 1);
      } else if (event.key === "Enter" && activeIndex > -1) {
        event.preventDefault();
        hits()[activeIndex].click();
      }
    });

    document.addEventListener("keydown", function (event) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(
        document.activeElement.tagName,
      );
      if (event.key === "Escape" && dialog.classList.contains("is-open"))
        close();
      else if (
        (event.key === "k" || event.key === "K") &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        open();
      } else if (
        event.key === "/" &&
        !typing &&
        !dialog.classList.contains("is-open")
      ) {
        event.preventDefault();
        open();
      }
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
