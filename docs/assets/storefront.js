(function () {
  var CART_STORAGE_KEY = "bp-storefront-cart";
  var BUYNOW_STORAGE_KEY = "bp-storefront-buynow";
  var ORDER_STORAGE_KEY = "bp-storefront-last-order";
  var CHECKOUT_ENDPOINT =
    window.BLUEPRINT_CART_CHECKOUT_ENDPOINT ||
    "https://blueprint-checkout-submit.shoug-alomran.workers.dev/submit";
  var FALLBACK_EMAIL = "blueprint@shoug-tech.com";
  var PATHS = {
    products: "/products/",
    cart: "/cart/",
    checkout: "/checkout/",
    thankYou: "/thank-you/",
    cvIndex: "/CV_index/",
    packages: "/packages/",
    htmlReports: "/html-reports/"
  };
  var CV_PRICING = {
    Basic: {
      self: 68,
      blueprint: 100
    },
    Pro: {
      self: 95,
      blueprint: 130
    }
  };
  var CV_PRODUCTS = {
    "/cv-templates/temp_1.html": {
      id: "cv-template-1-basic",
      title: "Template 1",
      tier: "Basic"
    },
    "/cv-templates/temp_4.html": {
      id: "cv-template-4-basic",
      title: "Template 4",
      tier: "Basic"
    },
    "/cv-templates/temp_8.html": {
      id: "cv-template-8-basic",
      title: "Template 8",
      tier: "Basic"
    },
    "/cv-templates/temp_9.html": {
      id: "cv-template-9-basic",
      title: "Template 9",
      tier: "Basic"
    },
    "/cv-templates/temp_2_pro.html": {
      id: "cv-template-2-pro",
      title: "Template 2",
      tier: "Pro"
    },
    "/cv-templates/temp_3_pro.html": {
      id: "cv-template-3-pro",
      title: "Template 3",
      tier: "Pro"
    },
    "/cv-templates/temp_5_pro.html": {
      id: "cv-template-5-pro",
      title: "Template 5",
      tier: "Pro"
    },
    "/cv-templates/temp_6_pro.html": {
      id: "cv-template-6-pro",
      title: "Template 6",
      tier: "Pro"
    },
    "/cv-templates/temp_7_pro.html": {
      id: "cv-template-7-pro",
      title: "Template 7",
      tier: "Pro"
    },
    "/cv-templates/temp_10_pro.html": {
      id: "cv-template-10-pro",
      title: "Template 10",
      tier: "Pro"
    }
  };
  var HTML_REPORT_PRODUCT = {
    id: "html-report-conversion",
    title: "HTML Report Conversion",
    href: PATHS.packages,
    basePrice: 150,
    addons: [
      {
        id: "large-document",
        title: "Large Document",
        price: 50
      },
      {
        id: "bilingual-report",
        title: "Bilingual Report",
        price: 60
      }
    ]
  };
  var WEBSITE_TIERS = [
    {
      id: "website-tier-1",
      title: "Tier 1, Personal Presence",
      price: 600,
      summary: "Clean digital presence without unnecessary complexity."
    },
    {
      id: "website-tier-2",
      title: "Tier 2, Project Documentation",
      price: 950,
      summary: "Structured documentation websites for academic or technical projects."
    },
    {
      id: "website-tier-3",
      title: "Tier 3, Research Documentation",
      price: 1400,
      summary: "Publication-ready research documentation and structured technical presentation."
    }
  ];
  var WEBSITE_ADDONS = [
    {
      id: "addon-additional-section",
      title: "Additional Section",
      price: 150,
      summary: "Expand the agreed website scope with an extra standalone section."
    },
    {
      id: "addon-bilingual-setup",
      title: "Bilingual Setup (Arabic + English)",
      price: 300,
      summary: "Duplicate structure and navigation across both language versions."
    },
    {
      id: "addon-custom-domain",
      title: "Custom Domain Setup",
      price: 250,
      summary: "DNS and HTTPS setup for connecting your own domain reliably."
    },
    {
      id: "addon-priority-delivery",
      title: "Priority Delivery",
      price: 200,
      summary: "Move the project into an expedited execution queue."
    },
    {
      id: "addon-monthly-maintenance",
      title: "Monthly Maintenance",
      price: 50,
      summary: "Ongoing content updates and minor structural edits within existing sections."
    }
  ];

  function normalizePath(path) {
    return (path || "/").replace(/\/+$/, "") || "/";
  }

  function formatSAR(amount) {
    return amount.toFixed(0) + " SAR";
  }

  function parseJson(value, fallback) {
    if (!value) {
      return fallback;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function cartLoad() {
    var cart = parseJson(window.localStorage.getItem(CART_STORAGE_KEY), {
      items: []
    });

    if (!cart || !Array.isArray(cart.items)) {
      return { items: [] };
    }

    cart.items = cart.items
      .filter(function (item) {
        return item && item.id && item.title && Number(item.qty) > 0;
      })
      .map(function (item) {
        item.qty = Number(item.qty) || 1;
        item.price = Number(item.price) || 0;
        return item;
      });

    return cart;
  }

  function saveCart(cart) {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent("bp:cartchange", { detail: clone(cart) }));
  }

  function cartAdd(item) {
    var cart = cartLoad();
    var existing = null;
    var index = 0;

    for (index = 0; index < cart.items.length; index += 1) {
      if (cart.items[index].id === item.id) {
        existing = cart.items[index];
        break;
      }
    }

    if (existing) {
      existing.qty += Number(item.qty) || 1;
    } else {
      cart.items.push({
        id: item.id,
        title: item.title,
        option: item.option || "",
        price: Number(item.price) || 0,
        qty: Number(item.qty) || 1,
        href: item.href || "",
        kind: item.kind || "product",
        meta: item.meta || {}
      });
    }

    saveCart(cart);
    return cart;
  }

  function cartRemove(id) {
    var cart = cartLoad();
    cart.items = cart.items.filter(function (item) {
      return item.id !== id;
    });
    saveCart(cart);
    return cart;
  }

  function cartUpdateQty(id, qty) {
    var cart = cartLoad();
    var value = Number(qty) || 0;
    cart.items = cart.items.filter(function (item) {
      if (item.id !== id) {
        return true;
      }
      if (value <= 0) {
        return false;
      }
      item.qty = value;
      return true;
    });
    saveCart(cart);
    return cart;
  }

  function cartClear() {
    var cart = { items: [] };
    saveCart(cart);
    return cart;
  }

  function cartTotal(items) {
    var source = items || cartLoad().items;
    return source.reduce(function (sum, item) {
      return sum + Number(item.price) * Number(item.qty);
    }, 0);
  }

  function cartCount(items) {
    var source = items || cartLoad().items;
    return source.reduce(function (sum, item) {
      return sum + Number(item.qty);
    }, 0);
  }

  function getOptionMeta(tier, key) {
    var normalizedTier = tier === "Pro" ? "Pro" : "Basic";
    var normalizedKey = key === "blueprint" ? "blueprint" : "self";
    return {
      key: normalizedKey,
      label: normalizedKey === "blueprint" ? "Blueprint Setup" : "Self Setup",
      price: CV_PRICING[normalizedTier][normalizedKey]
    };
  }

  function createCvItem(meta, optionKey) {
    var option = getOptionMeta(meta.tier, optionKey);
    return {
      id: meta.id + "-" + option.key,
      title: meta.title + " (" + meta.tier + ")",
      option: option.label,
      price: option.price,
      qty: 1,
      href: meta.href || "",
      kind: "cv-template",
      meta: {
        tier: meta.tier,
        optionKey: option.key
      }
    };
  }

  function createHtmlReportItem(selectedAddonIds) {
    var addons = HTML_REPORT_PRODUCT.addons.filter(function (addon) {
      return selectedAddonIds.indexOf(addon.id) !== -1;
    });
    var optionParts = ["Base Service"];
    var price = HTML_REPORT_PRODUCT.basePrice;

    addons.forEach(function (addon) {
      optionParts.push(addon.title);
      price += addon.price;
    });

    return {
      id: HTML_REPORT_PRODUCT.id + "-" + (selectedAddonIds.sort().join("-") || "base"),
      title: HTML_REPORT_PRODUCT.title,
      option: optionParts.join(" + "),
      price: price,
      qty: 1,
      href: HTML_REPORT_PRODUCT.href,
      kind: "html-report",
      meta: {
        addons: selectedAddonIds.slice()
      }
    };
  }

  function createSimpleProductItem(product, kind) {
    return {
      id: product.id,
      title: product.title,
      option: kind === "website-addon" ? "Add-On" : "Website Package",
      price: product.price,
      qty: 1,
      href: PATHS.packages,
      kind: kind,
      meta: {}
    };
  }

  function setBuyNowItem(item) {
    window.sessionStorage.setItem(BUYNOW_STORAGE_KEY, JSON.stringify(item));
  }

  function getBuyNowItem() {
    return parseJson(window.sessionStorage.getItem(BUYNOW_STORAGE_KEY), null);
  }

  function clearBuyNowItem() {
    window.sessionStorage.removeItem(BUYNOW_STORAGE_KEY);
  }

  function setLastOrder(order) {
    window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  }

  function getLastOrder() {
    return parseJson(window.sessionStorage.getItem(ORDER_STORAGE_KEY), null);
  }

  function createActionButton(label, modifier) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "bp-storefront-button" + (modifier ? " " + modifier : "");
    button.textContent = label;
    return button;
  }

  function createSelect(options) {
    var select = document.createElement("select");
    select.className = "bp-storefront-select";
    options.forEach(function (option) {
      var optionEl = document.createElement("option");
      optionEl.value = option.value;
      optionEl.textContent = option.label;
      select.appendChild(optionEl);
    });
    return select;
  }

  function flashButton(button, label) {
    var original = button.textContent;
    button.textContent = label;
    window.setTimeout(function () {
      button.textContent = original;
    }, 1200);
  }

  function addItemAndStay(item, button) {
    cartAdd(item);
    if (button) {
      flashButton(button, "Added");
    }
  }

  function startBuyNow(item) {
    setBuyNowItem(item);
    window.location.assign(PATHS.checkout + "?mode=buynow");
  }

  function renderCvInlineControls(link, meta) {
    if (!link || link.dataset.bpStorefrontReady === "true") {
      return;
    }

    link.dataset.bpStorefrontReady = "true";
    link.style.display = "none";
    link.removeAttribute("data-cv-buy");
    link.removeAttribute("data-cv-tier");

    var shell = document.createElement("span");
    shell.className = "bp-storefront-inline";

    var select = createSelect([
      {
        value: "self",
        label: "Self Setup · " + formatSAR(CV_PRICING[meta.tier].self)
      },
      {
        value: "blueprint",
        label: "Blueprint Setup · " + formatSAR(CV_PRICING[meta.tier].blueprint)
      }
    ]);
    var addButton = createActionButton("Add to Cart", "bp-storefront-button--muted");
    var buyButton = createActionButton("Buy Now", "bp-storefront-button--primary");

    addButton.addEventListener("click", function () {
      addItemAndStay(createCvItem(meta, select.value), addButton);
    });

    buyButton.addEventListener("click", function () {
      startBuyNow(createCvItem(meta, select.value));
    });

    shell.appendChild(select);
    shell.appendChild(addButton);
    shell.appendChild(buyButton);
    link.insertAdjacentElement("afterend", shell);
  }

  function getCvMetaFromLink(link) {
    var previewLink = null;
    var title = "";
    var tier = "";
    var card = link.closest ? link.closest(".cv-template-card") : null;

    if (card) {
      previewLink = card.querySelector('a[href^="/cv-templates/"]');
      title = (card.querySelector("h3") || {}).textContent || "";
    }

    if (!previewLink) {
      previewLink = link.parentNode ? link.parentNode.querySelector('a[href^="/cv-templates/"]') : null;
    }

    if (previewLink) {
      var meta = CV_PRODUCTS[normalizePath(previewLink.getAttribute("href"))];
      if (meta) {
        return {
          id: meta.id,
          title: meta.title,
          tier: meta.tier,
          href: previewLink.getAttribute("href")
        };
      }
    }

    title = title || link.getAttribute("data-cv-buy") || "CV Template";
    tier = link.getAttribute("data-cv-tier") || (/pro/i.test(title) ? "Pro" : "Basic");
    return {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: title.replace(/\s*\((Basic|Pro)\)\s*/i, "").trim(),
      tier: tier,
      href: previewLink ? previewLink.getAttribute("href") : PATHS.cvIndex
    };
  }

  function enhanceCatalogBuyLinks() {
    var links = document.querySelectorAll("a[data-cv-buy]");
    var index = 0;

    for (index = 0; index < links.length; index += 1) {
      renderCvInlineControls(links[index], getCvMetaFromLink(links[index]));
    }
  }

  function renderTemplatePanel(meta) {
    if (window.self !== window.top) {
      return;
    }

    if (document.querySelector("[data-bp-template-panel]")) {
      return;
    }

    var panel = document.createElement("aside");
    panel.className = "bp-template-panel";
    panel.setAttribute("data-bp-template-panel", "true");

    var title = document.createElement("strong");
    title.className = "bp-template-panel__title";
    title.textContent = meta.title + " · " + meta.tier;

    var helper = document.createElement("p");
    helper.className = "bp-template-panel__copy";
    helper.textContent = "Choose delivery mode without changing the preview page.";

    var select = createSelect([
      {
        value: "self",
        label: "Self Setup · " + formatSAR(CV_PRICING[meta.tier].self)
      },
      {
        value: "blueprint",
        label: "Blueprint Setup · " + formatSAR(CV_PRICING[meta.tier].blueprint)
      }
    ]);
    var backLink = document.createElement("a");
    backLink.className = "bp-storefront-link";
    backLink.href = document.referrer || PATHS.cvIndex;
    backLink.textContent = "Back";

    backLink.addEventListener("click", function (event) {
      if (window.history.length > 1) {
        event.preventDefault();
        window.history.back();
      }
    });

    var addButton = createActionButton("Add to Cart", "bp-storefront-button--muted");
    var buyButton = createActionButton("Buy Now", "bp-storefront-button--primary");
    var actions = document.createElement("div");
    actions.className = "bp-storefront-actions bp-storefront-actions--stack";

    addButton.addEventListener("click", function () {
      addItemAndStay(createCvItem(meta, select.value), addButton);
    });

    buyButton.addEventListener("click", function () {
      startBuyNow(createCvItem(meta, select.value));
    });

    panel.appendChild(title);
    panel.appendChild(helper);
    panel.appendChild(select);
    actions.appendChild(backLink);
    actions.appendChild(addButton);
    actions.appendChild(buyButton);
    panel.appendChild(actions);
    document.body.appendChild(panel);
  }

  function enhanceStandaloneTemplatePage() {
    var meta = CV_PRODUCTS[normalizePath(window.location.pathname)];
    if (!meta) {
      return;
    }

    meta = {
      id: meta.id,
      title: meta.title,
      tier: meta.tier,
      href: window.location.pathname
    };

    renderTemplatePanel(meta);
  }

  function createEmptyState(title, copy, actionHref, actionLabel) {
    var wrapper = document.createElement("div");
    wrapper.className = "bp-storefront-empty";
    wrapper.innerHTML =
      "<h2>" +
      title +
      "</h2>" +
      "<p>" +
      copy +
      "</p>" +
      '<p><a class="bp-storefront-link" href="' +
      actionHref +
      '">' +
      actionLabel +
      "</a></p>";
    return wrapper;
  }

  function renderProductsPage(root) {
    var wrapper = document.createElement("div");
    wrapper.className = "bp-storefront-page";

    function createSection(title, description) {
      var section = document.createElement("section");
      section.className = "bp-products-section";
      section.innerHTML = '<div class="bp-products-section__head"><h2>' + title + "</h2></div>";
      if (description) {
        section.querySelector(".bp-products-section__head").insertAdjacentHTML(
          "beforeend",
          "<p>" + description + "</p>"
        );
      }
      return section;
    }

    function createProductCard(product, kind) {
      var card = document.createElement("article");
      card.className = "bp-storefront-card bp-storefront-card--product";
      card.innerHTML =
        "<h3>" +
        product.title +
        "</h3>" +
        '<p class="bp-storefront-price">' +
        formatSAR(product.price) +
        "</p>" +
        "<p>" +
        product.summary +
        "</p>" +
        '<div class="bp-storefront-actions"></div>';

      var actions = card.querySelector(".bp-storefront-actions");
      var addButton = createActionButton("Add to Cart", "bp-storefront-button--muted");
      var buyButton = createActionButton("Buy Now", "bp-storefront-button--primary");

      addButton.addEventListener("click", function () {
        addItemAndStay(createSimpleProductItem(product, kind), addButton);
      });

      buyButton.addEventListener("click", function () {
        startBuyNow(createSimpleProductItem(product, kind));
      });

      actions.appendChild(addButton);
      actions.appendChild(buyButton);
      return card;
    }

    function createCvCard(meta) {
      var href = meta && meta.href ? meta.href : PATHS.cvIndex;
      var title = meta && meta.title ? meta.title : "CV Template";
      var tier = meta && meta.tier ? meta.tier : "";
      var card = document.createElement("article");
      card.className = "bp-storefront-card bp-storefront-card--cv";
      card.innerHTML =
        '<a class="bp-storefront-preview" href="' +
        href +
        '" target="_blank" rel="noopener">' +
        '<iframe src="' +
        href +
        '" loading="lazy" title="' +
        title +
        ' preview"></iframe>' +
        '<span class="bp-storefront-preview__label">Open Preview</span>' +
        "</a>" +
        "<h3>" +
        title +
        (tier ? " · " + tier : "") +
        "</h3>" +
        '<div class="bp-storefront-actions bp-storefront-actions--stack"></div>';

      var actions = card.querySelector(".bp-storefront-actions");
      var select = createSelect([
        {
          value: "self",
          label: "Self Setup · " + formatSAR(CV_PRICING[tier || "Basic"].self)
        },
        {
          value: "blueprint",
          label: "Blueprint Setup · " + formatSAR(CV_PRICING[tier || "Basic"].blueprint)
        }
      ]);
      var addButton = createActionButton("Add to Cart", "bp-storefront-button--muted");
      var buyButton = createActionButton("Buy Now", "bp-storefront-button--primary");

      addButton.addEventListener("click", function () {
        addItemAndStay(createCvItem(meta, select.value), addButton);
      });

      buyButton.addEventListener("click", function () {
        startBuyNow(createCvItem(meta, select.value));
      });

      actions.appendChild(select);
      actions.appendChild(addButton);
      actions.appendChild(buyButton);
      return card;
    }

    var tiersSection = createSection(
      "Website Tiers",
      "Choose the website package that fits your project."
    );
    var tiersGrid = document.createElement("div");
    tiersGrid.className = "bp-storefront-card-grid";
    WEBSITE_TIERS.forEach(function (tier) {
      tiersGrid.appendChild(createProductCard(tier, "website-tier"));
    });
    tiersSection.appendChild(tiersGrid);
    wrapper.appendChild(tiersSection);

    var addonsSection = createSection(
      "Website Add-Ons",
      "Optional add-ons for your website order."
    );
    var addonsGrid = document.createElement("div");
    addonsGrid.className = "bp-storefront-card-grid";
    WEBSITE_ADDONS.forEach(function (addon) {
      addonsGrid.appendChild(createProductCard(addon, "website-addon"));
    });
    addonsSection.appendChild(addonsGrid);
    wrapper.appendChild(addonsSection);

    var reportsSection = createSection(
      "HTML Report Conversion",
      "Base service with optional add-ons."
    );
    var reportCard = document.createElement("div");
    reportCard.className = "bp-storefront-card bp-storefront-card--product";
    reportCard.innerHTML =
      "<h2>Order HTML Report Conversion</h2>" +
      "<p>Base service: <strong>" +
      formatSAR(HTML_REPORT_PRODUCT.basePrice) +
      "</strong></p>" +
      '<div class="bp-storefront-addon-list"></div>' +
      '<div class="bp-storefront-summary" data-bp-report-total></div>' +
      '<div class="bp-storefront-actions"></div>';

    var addonList = reportCard.querySelector(".bp-storefront-addon-list");
    var actions = reportCard.querySelector(".bp-storefront-actions");
    var totalNode = reportCard.querySelector("[data-bp-report-total]");
    var inputs = [];

    HTML_REPORT_PRODUCT.addons.forEach(function (addon) {
      var label = document.createElement("label");
      label.className = "bp-storefront-check";
      label.innerHTML =
        '<input type="checkbox" value="' +
        addon.id +
        '"> <span>' +
        addon.title +
        " (+ " +
        formatSAR(addon.price) +
        ")</span>";
      addonList.appendChild(label);
      inputs.push(label.querySelector("input"));
    });

    function getSelectedAddons() {
      return inputs
        .filter(function (input) {
          return input.checked;
        })
        .map(function (input) {
          return input.value;
        });
    }

    function syncSummary() {
      totalNode.textContent = "Total: " + formatSAR(createHtmlReportItem(getSelectedAddons()).price);
    }

    inputs.forEach(function (input) {
      input.addEventListener("change", syncSummary);
    });

    var addButton = createActionButton("Add to Cart", "bp-storefront-button--muted");
    var buyButton = createActionButton("Buy Now", "bp-storefront-button--primary");

    addButton.addEventListener("click", function () {
      addItemAndStay(createHtmlReportItem(getSelectedAddons()), addButton);
    });

    buyButton.addEventListener("click", function () {
      startBuyNow(createHtmlReportItem(getSelectedAddons()));
    });

    actions.appendChild(addButton);
    actions.appendChild(buyButton);
    syncSummary();
    reportsSection.appendChild(reportCard);
    wrapper.appendChild(reportsSection);

    var cvSection = createSection(
      "CV Templates"
    );
    var cvGrid = document.createElement("div");
    cvGrid.className = "bp-storefront-card-grid bp-storefront-card-grid--cv";
    Object.keys(CV_PRODUCTS).forEach(function (href) {
      var meta = CV_PRODUCTS[href];
      cvGrid.appendChild(
        createCvCard({
          id: meta.id,
          title: meta.title,
          tier: meta.tier,
          href: href
        })
      );
    });
    cvSection.appendChild(cvGrid);
    wrapper.appendChild(cvSection);

    root.replaceChildren(wrapper);
  }

  function renderCartPage(root) {
    var cart = cartLoad();
    var wrapper = document.createElement("div");
    wrapper.className = "bp-storefront-page";

    if (!cart.items.length) {
      wrapper.appendChild(
        createEmptyState(
          "Your cart is empty.",
          "Browse products and add what you need.",
          PATHS.products,
          "Go to Products"
        )
      );
      root.replaceChildren(wrapper);
      return;
    }

    var list = document.createElement("div");
    list.className = "bp-storefront-list";

    cart.items.forEach(function (item) {
      var row = document.createElement("article");
      row.className = "bp-storefront-line";
      row.innerHTML =
        '<div class="bp-storefront-line__main">' +
        "<h2>" +
        item.title +
        "</h2>" +
        "<p>" +
        (item.option || "Standard") +
        "</p>" +
        (item.href ? '<p><a class="bp-storefront-inline-link" href="' + item.href + '">View product</a></p>' : "") +
        "</div>" +
        '<div class="bp-storefront-line__side">' +
        "<strong>" +
        formatSAR(Number(item.price) * Number(item.qty)) +
        "</strong>" +
        '<label class="bp-storefront-qty">Qty <input min="1" step="1" type="number" value="' +
        item.qty +
        '"></label>' +
        '<button type="button" class="bp-storefront-remove">Remove</button>' +
        "</div>";

      row.querySelector("input").addEventListener("change", function (event) {
        cartUpdateQty(item.id, event.target.value);
        renderCartPage(root);
      });

      row.querySelector(".bp-storefront-remove").addEventListener("click", function () {
        cartRemove(item.id);
        renderCartPage(root);
      });

      list.appendChild(row);
    });

    var footer = document.createElement("section");
    footer.className = "bp-storefront-card";
    footer.innerHTML =
      "<h2>Order total</h2>" +
      "<p class=\"bp-storefront-total\">" +
      formatSAR(cartTotal(cart.items)) +
      "</p>" +
      '<div class="bp-storefront-actions">' +
      '<a class="bp-storefront-link" href="' +
      PATHS.products +
      '">Continue Shopping</a>' +
      '<a class="bp-storefront-link bp-storefront-link--primary" href="' +
      PATHS.checkout +
      '">Checkout</a>' +
      "</div>";

    wrapper.appendChild(list);
    wrapper.appendChild(footer);
    root.replaceChildren(wrapper);
  }

  function getCheckoutItems() {
    var mode = new URLSearchParams(window.location.search).get("mode");
    if (mode === "buynow") {
      var buyNowItem = getBuyNowItem();
      return buyNowItem ? [buyNowItem] : [];
    }
    return cartLoad().items;
  }

  function buildOrderSummary(items) {
    return items
      .map(function (item) {
        return (
          item.title +
          " | " +
          (item.option || "Standard") +
          " | qty " +
          item.qty +
          " | " +
          formatSAR(Number(item.price) * Number(item.qty))
        );
      })
      .join("\n");
  }

  function buildMailtoFallback(payload) {
      var lines = [
        "Name: " + payload.name,
        "Email: " + payload.email,
        "Phone: " + (payload.phone || "None"),
        "Preferred Contact: " + (payload.contactPreference || "Email"),
        "Notes: " + (payload.notes || "None"),
        "",
        "Items:",
      buildOrderSummary(payload.items),
      "",
      "Total: " + formatSAR(payload.total)
    ];

    return (
      "mailto:" +
      FALLBACK_EMAIL +
      "?subject=" +
      encodeURIComponent("Blueprint storefront order") +
      "&body=" +
      encodeURIComponent(lines.join("\n"))
    );
  }

  function isEndpointConfigured() {
    return CHECKOUT_ENDPOINT.indexOf("YOURDOMAIN") === -1;
  }

  function renderCheckoutPage(root) {
    var items = getCheckoutItems();
    var wrapper = document.createElement("div");
    wrapper.className = "bp-storefront-page";

    if (!items.length) {
      wrapper.appendChild(
        createEmptyState(
          "No items ready for checkout.",
          "Add a product to the cart first, or use Buy Now from a product page.",
          PATHS.products,
          "Open Products"
        )
      );
      root.replaceChildren(wrapper);
      return;
    }

    var total = cartTotal(items);
    var summary = document.createElement("section");
    summary.className = "bp-storefront-card";
    summary.innerHTML = "<h2>Order summary</h2>";

    items.forEach(function (item) {
      var line = document.createElement("div");
      line.className = "bp-storefront-summary-line";
      line.innerHTML =
        "<span>" +
        item.title +
        " · " +
        (item.option || "Standard") +
        " × " +
        item.qty +
        "</span>" +
        "<strong>" +
        formatSAR(Number(item.price) * Number(item.qty)) +
        "</strong>";
      summary.appendChild(line);
    });

    var totalLine = document.createElement("div");
    totalLine.className = "bp-storefront-summary-line bp-storefront-summary-line--total";
    totalLine.innerHTML = "<span>Total</span><strong>" + formatSAR(total) + "</strong>";
    summary.appendChild(totalLine);

    var formCard = document.createElement("section");
    formCard.className = "bp-storefront-card";
    formCard.innerHTML =
      "<h2>Customer details</h2>" +
      '<form class="bp-storefront-form">' +
      '<label>Name<input name="name" type="text" required autocomplete="name"></label>' +
      '<label>Email<input name="email" type="email" required autocomplete="email"></label>' +
      '<label>Phone Number<input name="phone" type="tel" autocomplete="tel" placeholder="+966..."></label>' +
      '<fieldset class="bp-storefront-fieldset">' +
      "<legend>Preferred Contact Method</legend>" +
      '<label class="bp-storefront-choice"><input name="contact_preference" type="radio" value="Email" checked> Email</label>' +
      '<label class="bp-storefront-choice"><input name="contact_preference" type="radio" value="WhatsApp"> WhatsApp</label>' +
      "</fieldset>" +
      '<label>Notes (optional)<textarea name="notes" rows="4" placeholder="Anything Blueprint should know before fulfilling the order?"></textarea></label>' +
      '<div class="bp-storefront-actions">' +
      '<button type="submit" class="bp-storefront-button bp-storefront-button--primary">Submit Order</button>' +
      '<a class="bp-storefront-link" href="' +
      PATHS.cart +
      '">Back to Cart</a>' +
      "</div>" +
      '<p class="bp-storefront-helper">Submit your details and Blueprint will follow up to complete your order.</p>' +
      '<p class="bp-storefront-status" aria-live="polite"></p>' +
      "</form>";

    var form = formCard.querySelector("form");
    var status = form.querySelector(".bp-storefront-status");
    var submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      submitButton.disabled = true;
      status.textContent = "Submitting order...";

      var formData = new FormData(form);
      var payload = {
        name: (formData.get("name") || "").toString().trim(),
        email: (formData.get("email") || "").toString().trim(),
        phone: (formData.get("phone") || "").toString().trim(),
        contactPreference: (formData.get("contact_preference") || "Email").toString().trim(),
        notes: (formData.get("notes") || "").toString().trim(),
        items: items,
        total: total
      };

      var workerFormData = new FormData();
      workerFormData.append("name", payload.name);
      workerFormData.append("email", payload.email);
      workerFormData.append("phone", payload.phone);
      workerFormData.append("contact_preference", payload.contactPreference);
      workerFormData.append("notes", payload.notes);
      workerFormData.append("items_json", JSON.stringify(items));
      workerFormData.append("order_total_sar", String(total));

      try {
        if (!isEndpointConfigured()) {
          throw new Error("Checkout worker endpoint is not configured.");
        }

        var response = await fetch(CHECKOUT_ENDPOINT, {
          method: "POST",
          mode: "cors",
          body: workerFormData
        });

        if (!response.ok) {
          throw new Error("Checkout request failed with status " + response.status);
        }

        setLastOrder(payload);
        if (new URLSearchParams(window.location.search).get("mode") === "buynow") {
          clearBuyNowItem();
        } else {
          cartClear();
        }
        window.location.assign(PATHS.thankYou);
      } catch (error) {
        status.textContent = "Worker submission failed. Opening email fallback...";
        window.location.href = buildMailtoFallback(payload);
      } finally {
        submitButton.disabled = false;
      }
    });

    wrapper.appendChild(summary);
    wrapper.appendChild(formCard);
    root.replaceChildren(wrapper);
  }

  function enhanceThankYouPage() {
    var order = getLastOrder();
    if (!order) {
      return;
    }

    var lead = document.querySelector(".purchase-thankyou__lead");
    var nextCard = document.querySelector(".purchase-thankyou__card");
    if (lead) {
      lead.textContent =
        "Blueprint has received your order successfully. A confirmation will be sent to " +
        order.email +
        " after the worker finishes processing.";
    }
    if (nextCard) {
      var summary = document.createElement("p");
      summary.innerHTML =
        "<strong>Order total:</strong> " +
        formatSAR(order.total) +
        "<br><strong>Items:</strong><br>" +
        buildOrderSummary(order.items).replace(/\n/g, "<br>");
      nextCard.appendChild(summary);
    }
  }

  function updateCartIndicator(button) {
    button.textContent = "Cart (" + cartCount() + ")";
  }

  function mountCartIndicator() {
    if (window.self !== window.top) {
      return;
    }

    var existing = document.querySelector("[data-bp-cart-indicator]");
    if (existing) {
      updateCartIndicator(existing);
      return;
    }

    var button = document.createElement("a");
    button.href = PATHS.cart;
    button.className = "bp-cart-indicator";
    button.setAttribute("data-bp-cart-indicator", "true");
    updateCartIndicator(button);
    document.body.appendChild(button);

    document.addEventListener("bp:cartchange", function () {
      updateCartIndicator(button);
    });
  }

  function injectStyles() {
    if (document.getElementById("bp-storefront-styles")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "bp-storefront-styles";
    style.textContent =
      ".bp-storefront-inline{display:inline-flex;flex-wrap:wrap;gap:.45rem;align-items:center;margin-left:.45rem}" +
      ".bp-storefront-select{min-width:13rem;max-width:100%;padding:.55rem .7rem;border:1px solid rgba(15,94,89,.26);border-radius:.7rem;background:#fff;color:#12343b}" +
      ".bp-storefront-button{border:1px solid rgba(15,94,89,.28);border-radius:.7rem;padding:.6rem .9rem;background:#fff;color:#12343b;font:inherit;font-weight:700;cursor:pointer}" +
      ".bp-storefront-button--primary{background:#0f5e59;color:#fff;border-color:#0f5e59}" +
      ".bp-storefront-button--muted{background:rgba(15,94,89,.08)}" +
      ".bp-storefront-page{display:grid;gap:1rem}" +
      ".bp-products-section{display:grid;gap:.85rem}" +
      ".bp-products-section__head h2{margin:0}" +
      ".bp-products-section__head p{margin:.2rem 0 0;color:#486581}" +
      ".bp-storefront-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,18rem),1fr));gap:1rem}" +
      ".bp-storefront-card,.bp-storefront-line,.bp-storefront-empty{border:1px solid var(--line-soft,rgba(15,94,89,.18));border-radius:1rem;background:linear-gradient(160deg,rgba(255,255,255,.98),rgba(241,245,249,.96));box-shadow:0 18px 50px rgba(15,23,42,.08);padding:1rem}" +
      ".bp-storefront-card h2,.bp-storefront-line h2,.bp-storefront-empty h2{margin-top:0}" +
      ".bp-storefront-card h3{margin-top:0;margin-bottom:.45rem}" +
      ".bp-storefront-card--product p{margin:.2rem 0 0}" +
      ".bp-storefront-card--cv{display:grid;gap:.7rem}" +
      ".bp-storefront-price{font-size:1.15rem;font-weight:800;color:#0f5e59}" +
      ".bp-storefront-actions{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1rem}" +
      ".bp-storefront-actions--stack{margin-top:0}" +
      ".bp-storefront-link{display:inline-flex;align-items:center;justify-content:center;min-height:3.35rem;padding:.78rem 1.18rem;border-radius:999px;text-decoration:none !important;border:1px solid rgba(15,94,89,.26);color:#124e57 !important;background:linear-gradient(180deg,rgba(15,94,89,.06),rgba(15,94,89,.12));font-weight:800;letter-spacing:-.01em;box-shadow:inset 0 1px 0 rgba(255,255,255,.42);transition:transform 160ms ease,box-shadow 160ms ease,background-color 160ms ease,color 160ms ease}" +
      ".bp-storefront-link:hover,.bp-storefront-link:focus-visible{color:#0b3e46 !important;background:linear-gradient(180deg,rgba(15,94,89,.1),rgba(15,94,89,.16));box-shadow:0 10px 24px rgba(15,94,89,.12),inset 0 1px 0 rgba(255,255,255,.48);transform:translateY(-1px)}" +
      ".bp-storefront-link--primary{background:linear-gradient(135deg,#0f5e59,#11766f);color:#f5fffd !important;border-color:transparent;box-shadow:0 14px 30px rgba(15,94,89,.26)}" +
      ".bp-storefront-link--primary:hover,.bp-storefront-link--primary:focus-visible{color:#ffffff !important;background:linear-gradient(135deg,#106863,#138178);box-shadow:0 18px 34px rgba(15,94,89,.32)}" +
      ".bp-storefront-addon-list{display:grid;gap:.5rem;margin-top:.9rem}" +
      ".bp-storefront-check{display:flex;align-items:center;gap:.55rem}" +
      ".bp-storefront-summary{margin-top:.9rem;font-weight:700}" +
      ".bp-storefront-list{display:grid;gap:.8rem}" +
      ".bp-storefront-line{display:flex;justify-content:space-between;gap:1rem;align-items:flex-start}" +
      ".bp-storefront-line__main p{margin:.2rem 0 0}" +
      ".bp-storefront-line__side{display:grid;gap:.55rem;justify-items:end;min-width:9rem}" +
      ".bp-storefront-qty{display:grid;gap:.25rem;font-size:.92rem}" +
      ".bp-storefront-qty input{width:5rem;padding:.45rem .55rem;border:1px solid rgba(15,94,89,.26);border-radius:.65rem}" +
      ".bp-storefront-remove{background:none;border:none;color:#9f1239;font:inherit;cursor:pointer;text-decoration:underline;padding:0}" +
      ".bp-storefront-total{font-size:1.6rem;font-weight:800}" +
      ".bp-storefront-summary-line{display:flex;justify-content:space-between;gap:1rem;padding:.45rem 0;border-bottom:1px solid rgba(15,94,89,.12)}" +
      ".bp-storefront-summary-line--total{border-bottom:none;padding-top:.8rem;font-size:1.05rem}" +
      ".bp-storefront-form{display:grid;gap:.85rem}" +
      ".bp-storefront-form label{display:grid;gap:.35rem;font-weight:600}" +
      ".bp-storefront-form input,.bp-storefront-form textarea{padding:.7rem .78rem;border:1px solid rgba(15,94,89,.24);border-radius:.75rem;background:#fff;color:#102a43;font:inherit}" +
      ".bp-storefront-fieldset{border:1px solid rgba(15,94,89,.18);border-radius:.75rem;padding:.8rem .85rem;display:grid;gap:.55rem}" +
      ".bp-storefront-fieldset legend{padding:0 .25rem;font-weight:700}" +
      ".bp-storefront-choice{display:flex !important;align-items:center;gap:.5rem;font-weight:600}" +
      ".bp-storefront-choice input{margin:0}" +
      ".bp-storefront-helper,.bp-storefront-status{margin:0;color:#486581}" +
      ".bp-storefront-inline-link{color:#0f5e59}" +
      ".bp-storefront-preview{display:block;position:relative;overflow:hidden;border-radius:.85rem;border:1px solid rgba(15,94,89,.18);background:#fff;aspect-ratio:3/4;text-decoration:none}" +
      ".bp-storefront-preview iframe{width:100%;height:100%;border:0;pointer-events:none;background:#fff}" +
      ".bp-storefront-preview__label{position:absolute;right:.6rem;bottom:.6rem;padding:.35rem .55rem;border-radius:999px;background:rgba(15,94,89,.88);color:#fff;font-size:.8rem;font-weight:700}" +
      ".bp-cart-indicator{position:fixed;right:1rem;bottom:1rem;z-index:999;display:inline-flex;align-items:center;justify-content:center;padding:.8rem 1rem;border-radius:999px;background:#0f5e59;color:#fff;text-decoration:none;font-weight:800;box-shadow:0 12px 35px rgba(15,94,89,.3)}" +
      ".bp-template-panel{position:fixed;left:1rem;bottom:1rem;z-index:998;display:grid;gap:.6rem;max-width:20rem;padding:1rem;border-radius:1rem;background:rgba(255,255,255,.94);backdrop-filter:blur(10px);box-shadow:0 12px 35px rgba(15,23,42,.18)}" +
      ".bp-template-panel__title{font-size:1rem}" +
      ".bp-template-panel__copy{margin:0;font-size:.95rem;color:#334e68}" +
      "@media (max-width: 720px){.bp-storefront-inline{display:grid;margin-left:0;margin-top:.6rem}.bp-storefront-line{display:grid}.bp-storefront-line__side{justify-items:start}.bp-template-panel{left:.75rem;right:.75rem;bottom:4.75rem;max-width:none}.bp-cart-indicator{left:.75rem;right:.75rem;bottom:.75rem}.bp-storefront-actions{display:grid}.bp-storefront-select,.bp-storefront-button,.bp-storefront-link{width:100%}}";

    document.head.appendChild(style);
  }

  function renderRoots() {
    var productsRoot = document.querySelector("[data-bp-products-root]");
    var cartRoot = document.querySelector("[data-bp-cart-root]");
    var checkoutRoot = document.querySelector("[data-bp-checkout-root]");

    if (productsRoot) {
      renderProductsPage(productsRoot);
    }
    if (cartRoot) {
      renderCartPage(cartRoot);
    }
    if (checkoutRoot) {
      renderCheckoutPage(checkoutRoot);
    }
  }

  function init() {
    injectStyles();
    enhanceCatalogBuyLinks();
    enhanceStandaloneTemplatePage();
    renderRoots();
    mountCartIndicator();
    enhanceThankYouPage();
  }

  window.cartAdd = cartAdd;
  window.cartRemove = cartRemove;
  window.cartUpdateQty = cartUpdateQty;
  window.cartClear = cartClear;
  window.cartTotal = cartTotal;
  window.cartCount = cartCount;
  window.cartLoad = cartLoad;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
