(function () {
  function normalizePath(path) {
    return (path || "/").replace(/\/$/, "") || "/";
  }

  function shouldAutoHideSidePanels() {
    var path = normalizePath(window.location.pathname);
    return path === "/products" || path.indexOf("/start-project") === 0;
  }

  function createEl(tag, className, html) {
    var el = document.createElement(tag);
    if (className) {
      el.className = className;
    }
    if (html) {
      el.innerHTML = html;
    }
    return el;
  }

  function markActiveLinks(container) {
    if (!container) {
      return;
    }
    var path = window.location.pathname.replace(/\/$/, "") || "/";
    container.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href.startsWith("#")) {
        return;
      }
      var url = new URL(href, window.location.origin + window.location.pathname);
      var normalized = url.pathname.replace(/\/$/, "") || "/";
      if (normalized === path) {
        link.classList.add("active");
      }
    });
  }

  function cloneTopNavLinks() {
    var navRoot = document.querySelector("#navbar-collapse > ul.nav.navbar-nav");
    if (!navRoot) {
      return [];
    }
    var links = [];
    navRoot.querySelectorAll(":scope > li.nav-item").forEach(function (item) {
      var direct = item.querySelector(":scope > a.nav-link");
      if (direct && direct.getAttribute("href") && direct.getAttribute("href") !== "#") {
        links.push({
          label: direct.textContent.trim(),
          href: direct.getAttribute("href")
        });
      }
      var menuItems = item.querySelectorAll(":scope .dropdown-menu a.dropdown-item");
      menuItems.forEach(function (menuItem) {
        links.push({
          label: menuItem.textContent.trim(),
          href: menuItem.getAttribute("href")
        });
      });
    });
    return links;
  }

  function buildSidePanels() {
    var row = document.querySelector(".container > .row");
    var leftCol = row ? row.querySelector(".col-md-3") : null;
    var main = row ? row.querySelector('.col-md-9[role="main"]') : null;
    if (!row || !leftCol || !main) {
      return;
    }

    var tocSource = leftCol.querySelector(".nav.flex-column");
    var tocHtml = tocSource ? tocSource.innerHTML : "";
    var linkItems = cloneTopNavLinks();

    var leftPanel = createEl("aside", "doc-nav-panel");
    leftPanel.appendChild(createEl("h3", "panel-title", "Site Map"));
    var sectionPills = createEl("nav", "section-pills");
    if (linkItems.length === 0) {
      sectionPills.appendChild(createEl("span", "panel-empty", "No pages"));
    } else {
      linkItems.forEach(function (item) {
        var a = createEl("a");
        a.href = item.href;
        a.textContent = item.label;
        sectionPills.appendChild(a);
      });
    }
    leftPanel.appendChild(sectionPills);

    leftCol.innerHTML = "";
    leftCol.appendChild(leftPanel);

    var rightPanel = createEl("aside", "doc-toc-panel");
    rightPanel.appendChild(createEl("h3", "panel-title", "Page Outline"));
    var tocPills = createEl("nav", "toc-pills");
    if (tocHtml) {
      tocPills.innerHTML = tocHtml;
      tocPills.querySelectorAll("ul").forEach(function (nested) {
        nested.classList.remove("nav", "flex-column");
      });
    } else {
      tocPills.appendChild(createEl("span", "panel-empty", "No headings available"));
    }
    rightPanel.appendChild(tocPills);
    row.appendChild(rightPanel);

    markActiveLinks(sectionPills);
    markActiveLinks(tocPills);

    function closeDrawers() {
      document.body.classList.remove("drawer-open");
      navDrawer.classList.remove("open");
      tocDrawer.classList.remove("open");
    }

    var overlay = createEl("div", "drawer-overlay");
    overlay.addEventListener("click", closeDrawers);
    document.body.appendChild(overlay);

    var navDrawer = createEl("aside", "mobile-drawer left", "<h3>Site Map</h3>");
    var navDrawerList = sectionPills.cloneNode(true);
    navDrawer.appendChild(navDrawerList);

    var tocDrawer = createEl("aside", "mobile-drawer right", "<h3>Page Outline</h3>");
    var tocDrawerList = tocPills.cloneNode(true);
    tocDrawer.appendChild(tocDrawerList);

    document.body.appendChild(navDrawer);
    document.body.appendChild(tocDrawer);

    markActiveLinks(navDrawerList);
    markActiveLinks(tocDrawerList);

    [navDrawer, tocDrawer].forEach(function (drawer) {
      drawer.addEventListener("click", function (event) {
        if (event.target.closest("a[href]")) {
          closeDrawers();
        }
      });
    });

    function openDrawer(which) {
      var targetDrawer = which === "nav" ? navDrawer : tocDrawer;
      var otherDrawer = which === "nav" ? tocDrawer : navDrawer;
      var targetIsOpen =
        document.body.classList.contains("drawer-open") &&
        targetDrawer.classList.contains("open");

      if (targetIsOpen) {
        closeDrawers();
        return;
      }

      document.body.classList.add("drawer-open");
      targetDrawer.classList.add("open");
      otherDrawer.classList.remove("open");
    }

    function syncLayoutForViewport() {
      if (window.matchMedia("(max-width: 991.98px)").matches) {
        document.body.classList.remove("hide-left-nav", "hide-right-toc");
      } else {
        closeDrawers();
        if (shouldAutoHideSidePanels()) {
          document.body.classList.add("hide-left-nav", "hide-right-toc");
        }
      }
    }

    syncLayoutForViewport();
    window.addEventListener("resize", syncLayoutForViewport);
    window.addEventListener("pageshow", closeDrawers);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeDrawers();
      }
    });

    document.addEventListener("click", function (event) {
      var button = event.target.closest("[data-dashboard-action]");
      if (!button) {
        return;
      }
      var action = button.getAttribute("data-dashboard-action");
      if (action === "toggle-nav") {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          openDrawer("nav");
        } else {
          document.body.classList.toggle("hide-left-nav");
        }
      }
      if (action === "toggle-toc") {
        if (window.matchMedia("(max-width: 991.98px)").matches) {
          openDrawer("toc");
        } else {
          document.body.classList.toggle("hide-right-toc");
        }
      }
    });
  }

  function enhanceHeader() {
    var navbar = document.querySelector(".navbar > .container");
    var brand = document.querySelector(".navbar-brand");
    if (!navbar || !brand) {
      return;
    }

    if (!brand.querySelector(".brand-icon")) {
      var icon = createEl("span", "brand-icon");
      icon.setAttribute("aria-hidden", "true");
      brand.prepend(icon);
    }

    if (brand.tagName === "A") {
      brand.setAttribute("href", "/");
    }

    if (navbar.querySelector(".dashboard-tools")) {
      return;
    }

    var tools = createEl("div", "dashboard-tools");
    tools.innerHTML =
      '<label class="search-shell" aria-label="Search website pages">' +
      '<i class="fa fa-search" aria-hidden="true"></i>' +
      '<input type="search" placeholder="Search pages..." />' +
      "</label>" +
      '<button class="pill-btn desktop-toggle" data-dashboard-action="toggle-nav" type="button">Collapse Menu</button>' +
      '<button class="pill-btn desktop-toggle" data-dashboard-action="toggle-toc" type="button">Collapse Outline</button>' +
      '<button class="pill-btn mobile-toggle" data-dashboard-action="toggle-nav" type="button">Menu</button>' +
      '<button class="pill-btn mobile-toggle" data-dashboard-action="toggle-toc" type="button">Outline</button>';

    var toggler = navbar.querySelector(".navbar-toggler");
    if (toggler) {
      navbar.insertBefore(tools, toggler);
    } else {
      navbar.appendChild(tools);
    }

    var input = tools.querySelector("input[type='search']");
    var searchLink = document.querySelector("[data-bs-target='#mkdocs_search_modal']");
    if (input && searchLink) {
      input.addEventListener("focus", function () {
        searchLink.click();
      });
      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          searchLink.click();
        }
      });
    }
  }

  function buildFooter() {
    var footer = document.querySelector("footer.col-md-12");
    if (!footer) {
      return;
    }

    footer.innerHTML =
      '<div class="dashboard-footer">' +
      '<div class="footer-main">' +
      '<section>' +
      '<h2 class="footer-heading">Build a Clear Digital Presence</h2>' +
      '<p class="footer-copy">Structured static websites for portfolios, academic documentation, and workshop pages.</p>' +
      '<div class="subscribe-shell">' +
      '<input type="text" placeholder="Project type and timeline" aria-label="Project scope placeholder" />' +
      '<button type="button">Start a Project</button>' +
      '</div>' +
      '</section>' +
      '<section class="footer-links-grid">' +
      '<div class="link-panel">' +
      '<h4>Products</h4>' +
      '<a href="/products/">All Products</a>' +
      '<a href="/packages/">Services & Pricing</a>' +
      '<a href="/CV_index/">CV Template Shop</a>' +
      '<a href="/html-reports/">HTML Report Conversion</a>' +
      '</div>' +
      '<div class="link-panel">' +
      '<h4>Studio</h4>' +
      '<a href="/process/">How It Works</a>' +
      '<a href="/start-project/">Start a Project</a>' +
      '<a href="/web-platforms/">Client Work</a>' +
      '<a href="/work-demos/">Feature Demos</a>' +
      '<a href="/about/">About</a>' +
      '</div>' +
      '<div class="link-panel">' +
      '<h4>Support</h4>' +
      '<a href="/contact/">Contact</a>' +
      '<a href="/packages/#what-is-not-included">Scope</a>' +
      '<a href="/process/">Delivery Flow</a>' +
      '</div>' +
      '</section>' +
      '</div>' +
      '<div class="footer-meta">Blueprint Studio · Static website services only</div>' +
      '</div>';
  }

  document.addEventListener("DOMContentLoaded", function () {
    enhanceHeader();
    buildSidePanels();
    buildFooter();
  });
})();
