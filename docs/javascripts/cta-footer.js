(function () {
  function isArabicPage() {
    var lang = (
      document.documentElement.getAttribute("lang") || ""
    ).toLowerCase();
    return lang.indexOf("ar") === 0;
  }

  function localizedPath(path, isArabic) {
    if (!isArabic) return path;
    return path.indexOf("/ar/") === 0 ? path : "/ar" + path;
  }

  function injectFooter() {
    var footer = document.querySelector(".md-footer");
    if (!footer || footer.querySelector(".bp-footer")) {
      return;
    }

    var ar = isArabicPage();
    var t = ar
      ? {
          brand: "برينت",
          title: "ابن حضور رقمي مرتب",
          subtitle:
            "مواقع ثابتة لبورتفوليو الطلاب، التوثيق الأكاديمي، وصفحات الورش.",
          placeholder: "اكتب بريدك الإلكتروني",
          cta: "إرسال",
          note: "النطاق: خدمات مواقع ثابتة فقط. لا Backend ولا SaaS.",
          products: "المنتجات",
          allProducts: "كل المنتجات",
          servicesPricing: "الخدمات والأسعار",
          addons: "الإضافات",
          cvTemplates: "متجر قوالب CV",
          htmlReports: "تحويل تقارير HTML",
          scope: "حدود النطاق",
          studio: "الاستوديو",
          process: "كيف نعمل",
          discovery: "مرحلة الاكتشاف",
          startProject: "ابدأ مشروعًا",
          work: "أعمال العملاء",
          demos: "العروض",
          about: "عنا",
          support: "الدعم",
          contact: "تواصل",
          policies: "السياسات",
          terms: "الشروط",
          privacy: "الخصوصية",
          content: "مسؤولية المحتوى",
          revision: "سياسة المراجعات",
          copyright: "حقوق النشر",
          licenseTitle: "رخصة العمل الحر",
          tagline: "حضور رقمي مرتب، مبني ليدوم. تجارب ويب ثابتة احترافية.",
          portfolios: "مواقع بورتفوليو",
          courseHubs: "منصات المقررات",
          documentation: "التوثيق",
          follow: "تواصل",
          email: "البريد الإلكتروني",
          rights: "© 2026 استوديو برينت · جميع الحقوق محفوظة",
          status: "ثابت أولاً · سريع · آمن",
        }
      : {
          brand: "Blueprint",
          title: "Build a Structured Digital Presence",
          subtitle:
            "Static websites for student portfolios, academic documentation, and workshop pages.",
          placeholder: "Enter your email address",
          cta: "Send",
          note: "Scope: static website services only. No backend or SaaS development.",
          products: "Products",
          allProducts: "All Products",
          servicesPricing: "Services & Pricing",
          addons: "Add-Ons",
          cvTemplates: "CV Template Shop",
          htmlReports: "HTML Report Conversion",
          scope: "Scope Boundaries",
          studio: "Studio",
          process: "How It Works",
          discovery: "Discovery",
          startProject: "Start a Project",
          work: "Client Work",
          demos: "Feature Demos",
          about: "About",
          support: "Support",
          contact: "Contact",
          policies: "Policies",
          terms: "Terms",
          privacy: "Privacy",
          content: "Content Responsibility",
          revision: "Revision Policy",
          copyright: "Copyright",
          licenseTitle: "Freelance License",
          tagline:
            "Structured digital presence, built to last. Premium static web experiences for professionals.",
          portfolios: "Portfolios",
          courseHubs: "Course Hubs",
          documentation: "Documentation",
          follow: "Connect",
          email: "Email",
          rights: "\u00A9 2026 BLUEPRINT STUDIO. ALL RIGHTS RESERVED.",
          status: "STATIC-FIRST \u00B7 FAST \u00B7 SECURE",
        };

    var section = document.createElement("section");
    section.className = "bp-footer";
    section.innerHTML = [
      '<div class="bp-footer__inner">',

      '<div class="bp-footer__brand">',
      '<a class="bp-footer__logo" href="' + localizedPath("/", ar) + '">',
      '<span class="bp-footer__mark" aria-hidden="true"></span>',
      '<span class="bp-footer__name">' + t.brand + "</span>",
      "</a>",
      '<p class="bp-footer__tagline">' + t.tagline + "</p>",
      "</div>",

      '<nav class="bp-footer__col" aria-label="' + t.products + '">',
      '<p class="bp-footer__heading">' + t.products + "</p>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/products/", ar) +
        '">' +
        t.portfolios +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/web-platforms/", ar) +
        '">' +
        t.courseHubs +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/products/", ar) +
        '">' +
        t.documentation +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/html-reports/", ar) +
        '">' +
        t.htmlReports +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/CV_index/", ar) +
        '">' +
        t.cvTemplates +
        "</a>",
      "</nav>",

      '<nav class="bp-footer__col" aria-label="' + t.studio + '">',
      '<p class="bp-footer__heading">' + t.studio + "</p>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/packages/", ar) +
        '">' +
        t.servicesPricing +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/process/", ar) +
        '">' +
        t.process +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/web-platforms/", ar) +
        '">' +
        t.work +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/about/", ar) +
        '">' +
        t.about +
        "</a>",
      '<a class="bp-footer__link" href="' +
        localizedPath("/contact/", ar) +
        '">' +
        t.contact +
        "</a>",
      "</nav>",

      '<nav class="bp-footer__col" aria-label="' + t.follow + '">',
      '<p class="bp-footer__heading">' + t.follow + "</p>",
      '<a class="bp-footer__link" href="mailto:blueprint@shoug-tech.com">' +
        t.email +
        "</a>",
      '<a class="bp-footer__link" href="https://github.com/Shoug-Alomran" target="_blank" rel="noopener">GitHub</a>',
      '<a class="bp-footer__link" href="' +
        localizedPath("/start-project/", ar) +
        '">' +
        t.startProject +
        "</a>",
      "</nav>",

      "</div>",

      '<div class="bp-footer__base">',
      '<span class="bp-footer__rights">' + t.rights + "</span>",
      '<span class="bp-footer__legal">',
      '<a href="' +
        localizedPath("/policies/privacy-policy/", ar) +
        '">' +
        t.privacy +
        "</a>",
      '<a href="' +
        localizedPath("/policies/terms-of-service/", ar) +
        '">' +
        t.terms +
        "</a>",
      '<a href="' +
        localizedPath("/policies/copyright/", ar) +
        '">' +
        t.copyright +
        "</a>",
      "</span>",
      "</div>",
    ].join("");

    footer.prepend(section);

    var emailInput = section.querySelector(".custom-footer__input");
    var submitBtn = section.querySelector(".custom-footer__button");
    if (!emailInput || !submitBtn) return;

    function resolveSubmitEndpoint() {
      if (window.BLUEPRINT_INTAKE_ENDPOINT)
        return window.BLUEPRINT_INTAKE_ENDPOINT;
      var meta = document.querySelector(
        'meta[name="blueprint-intake-endpoint"]',
      );
      if (meta && meta.content) return meta.content;
      return "https://blueprint-footer-intake-worker.shoug-alomran.workers.dev/submit";
    }

    function setStatus(type, text) {
      var statusEl = section.querySelector(".custom-footer__status");
      if (!statusEl) {
        statusEl = document.createElement("p");
        statusEl.className = "custom-footer__status";
        section.querySelector(".custom-footer__left").appendChild(statusEl);
      }
      statusEl.textContent = text;
      statusEl.style.margin = "0.55rem 0 0";
      statusEl.style.fontSize = "0.8rem";
      statusEl.style.color = type === "ok" ? "#7cc7ff" : "#ff9d9d";
    }

    async function submitEmail() {
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      var email = emailInput.value.trim();
      if (!email) return;

      submitBtn.disabled = true;
      setStatus("ok", ar ? "جاري الإرسال..." : "Sending...");

      try {
        var fd = new FormData();
        fd.append("email", email);
        fd.append("locale", ar ? "ar" : "en");
        fd.append("source", "footer-quick-intake");
        fd.append("_subject", ar ? "طلب مشروع جديد" : "New Project Inquiry");

        var endpoint = resolveSubmitEndpoint();
        var response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });

        if (!response.ok) {
          var errorMsg = "Failed";
          try {
            var errorData = await response.json();
            if (errorData && errorData.error)
              errorMsg = String(errorData.error);
          } catch (_) {
            try {
              var errorText = await response.text();
              if (errorText) errorMsg = errorText;
            } catch (_) {}
          }
          throw new Error(errorMsg);
        }

        setStatus("ok", ar ? "تم الإرسال بنجاح." : "Sent successfully.");
        emailInput.value = "";
      } catch (err) {
        var msg = err && err.message ? err.message : "";
        var likelyCors = /failed to fetch|networkerror|load failed/i.test(msg);

        if (likelyCors) {
          try {
            var fallbackBody = new URLSearchParams();
            fallbackBody.set("email", email);
            fallbackBody.set("locale", ar ? "ar" : "en");
            fallbackBody.set("source", "footer-quick-intake");
            fallbackBody.set(
              "_subject",
              ar ? "طلب مشروع جديد" : "New Project Inquiry",
            );

            await fetch(endpoint, {
              method: "POST",
              mode: "no-cors",
              body: fallbackBody,
            });

            setStatus(
              "ok",
              ar ? "تم استلام الطلب بنجاح." : "Inquiry received successfully.",
            );
            emailInput.value = "";
            return;
          } catch (_) {}
        }

        setStatus(
          "err",
          ar
            ? "تعذر الإرسال. حاول مرة أخرى."
            : "Unable to send. Please try again.",
        );
      } finally {
        submitBtn.disabled = false;
      }
    }

    submitBtn.addEventListener("click", submitEmail);
    emailInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        submitEmail();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", injectFooter);
})();
