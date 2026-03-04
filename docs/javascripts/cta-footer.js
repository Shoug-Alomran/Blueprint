(function () {
  function isArabicPage() {
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    return lang.indexOf('ar') === 0;
  }

  function localizedPath(path, isArabic) {
    if (!isArabic) return path;
    return path.indexOf('/ar/') === 0 ? path : '/ar' + path;
  }

  function injectFooter() {
    var footer = document.querySelector('.md-footer');
    if (!footer || footer.querySelector('.custom-footer')) {
      return;
    }

    var ar = isArabicPage();
    var t = ar ? {
      brand: 'بلو برنت',
      title: 'ابن حضور رقمي مرتب',
      subtitle: 'مواقع ثابتة لبورتفوليو الطلاب، التوثيق الأكاديمي، وصفحات الورش.',
      placeholder: 'اكتب بريدك الإلكتروني',
      cta: 'إرسال',
      note: 'النطاق: خدمات مواقع ثابتة فقط. لا Backend ولا SaaS.',
      packages: 'الباقات',
      base: 'الباقة الأساسية',
      addons: 'الإضافات',
      cvTemplates: 'قوالب CV',
      htmlReports: 'تقارير HTML',
      scope: 'حدود النطاق',
      studio: 'الاستوديو',
      process: 'العملية',
      discovery: 'مرحلة الاكتشاف',
      startProject: 'ابدأ المشروع',
      work: 'الأعمال',
      demos: 'العروض',
      about: 'عنا',
      support: 'الدعم',
      contact: 'تواصل',
      policies: 'السياسات',
      terms: 'الشروط',
      privacy: 'الخصوصية',
      content: 'مسؤولية المحتوى',
      revision: 'سياسة المراجعات',
      copyright: 'حقوق النشر'
    } : {
      brand: 'Blueprint',
      title: 'Build a Structured Digital Presence',
      subtitle: 'Static websites for student portfolios, academic documentation, and workshop pages.',
      placeholder: 'Enter your email address',
      cta: 'Send',
      note: 'Scope: static website services only. No backend or SaaS development.',
      packages: 'Packages',
      base: 'Base Package',
      addons: 'Add-Ons',
      cvTemplates: 'CV Templates',
      htmlReports: 'HTML Reports',
      scope: 'Scope Boundaries',
      studio: 'Studio',
      process: 'Process',
      discovery: 'Discovery',
      startProject: 'Start Project',
      work: 'Work',
      demos: 'Demos',
      about: 'About',
      support: 'Support',
      contact: 'Contact',
      policies: 'Policies',
      terms: 'Terms',
      privacy: 'Privacy',
      content: 'Content Responsibility',
      revision: 'Revision Policy',
      copyright: 'Copyright'
    };

    var section = document.createElement('section');
    section.className = 'custom-footer';
    section.innerHTML = [
      '<div class="custom-footer__inner">',
      '<div class="custom-footer__left">',
      '<p class="custom-footer__brand">' + t.brand + '</p>',
      '<h2 class="custom-footer__title">' + t.title + '</h2>',
      '<p class="custom-footer__subtitle">' + t.subtitle + '</p>',
      '<div class="custom-footer__form">',
      '<input class="custom-footer__input" type="email" inputmode="email" autocomplete="email" required placeholder="' + t.placeholder + '" aria-label="' + t.placeholder + '">',
      '<button class="custom-footer__button" type="button">' + t.cta + '</button>',
      '</div>',
      '<p class="custom-footer__note">' + t.note + '</p>',
      '</div>',
      '<div class="custom-footer__right">',
      '<div class="footer-col">',
      '<p class="footer-col__title">' + t.packages + '</p>',
      '<a class="footer-link" href="' + localizedPath('/packages/packages/#tier-1-personal-presence', ar) + '">' + t.base + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/packages/#website-add-ons', ar) + '">' + t.addons + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/packages/#cv-templates', ar) + '">' + t.cvTemplates + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/packages/#html-report-conversion', ar) + '">' + t.htmlReports + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/packages/#what-is-not-included', ar) + '">' + t.scope + '</a>',
      '</div>',
      '<div class="footer-col">',
      '<p class="footer-col__title">' + t.studio + '</p>',
      '<a class="footer-link" href="' + localizedPath('/process/', ar) + '">' + t.process + '</a>',
      '<a class="footer-link" href="' + localizedPath('/process/discovery/', ar) + '">' + t.discovery + '</a>',
      '<a class="footer-link" href="' + localizedPath('/start-project/', ar) + '">' + t.startProject + '</a>',
      '<a class="footer-link" href="' + localizedPath('/web-platforms/', ar) + '">' + t.work + '</a>',
      '<a class="footer-link" href="' + localizedPath('/work-demos/work-demos/', ar) + '">' + t.demos + '</a>',
      '<a class="footer-link" href="' + localizedPath('/about/about/', ar) + '">' + t.about + '</a>',
      '</div>',
      '<div class="footer-col footer-col--support">',
      '<p class="footer-col__title">' + t.support + '</p>',
      '<a class="footer-link" href="' + localizedPath('/contact/contact/', ar) + '">' + t.contact + '</a>',
      '<a class="footer-link" href="mailto:blueprint@shoug-tech.com">blueprint@shoug-tech.com</a>',
      '<a class="footer-link" href="https://github.com/Shoug-Alomran" target="_blank" rel="noopener">GitHub</a>',
      '</div>',
      '<div class="footer-col footer-col--policies">',
      '<p class="footer-col__title">' + t.policies + '</p>',
      '<a class="footer-link" href="' + localizedPath('/policies/terms-of-service/', ar) + '">' + t.terms + '</a>',
      '<a class="footer-link" href="' + localizedPath('/policies/privacy-policy/', ar) + '">' + t.privacy + '</a>',
      '<a class="footer-link" href="' + localizedPath('/policies/content-responsibility/', ar) + '">' + t.content + '</a>',
      '<a class="footer-link" href="' + localizedPath('/policies/revision-policy/', ar) + '">' + t.revision + '</a>',
      '<a class="footer-link" href="' + localizedPath('/policies/copyright/', ar) + '">' + t.copyright + '</a>',
      '</div>',
      '</div>',
      '</div>'
    ].join('');

    footer.prepend(section);

    var emailInput = section.querySelector('.custom-footer__input');
    var submitBtn = section.querySelector('.custom-footer__button');
    if (!emailInput || !submitBtn) return;

    function resolveSubmitEndpoint() {
      if (window.BLUEPRINT_INTAKE_ENDPOINT) return window.BLUEPRINT_INTAKE_ENDPOINT;
      var meta = document.querySelector('meta[name="blueprint-intake-endpoint"]');
      if (meta && meta.content) return meta.content;
      return 'https://blueprint-footer-intake-worker.shoug-alomran.workers.dev/submit';
    }

    function setStatus(type, text) {
      var statusEl = section.querySelector('.custom-footer__status');
      if (!statusEl) {
        statusEl = document.createElement('p');
        statusEl.className = 'custom-footer__status';
        section.querySelector('.custom-footer__left').appendChild(statusEl);
      }
      statusEl.textContent = text;
      statusEl.style.margin = '0.55rem 0 0';
      statusEl.style.fontSize = '0.8rem';
      statusEl.style.color = type === 'ok' ? '#d9f7ea' : '#ffd6d6';
    }

    async function submitEmail() {
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      var email = emailInput.value.trim();
      if (!email) return;

      submitBtn.disabled = true;
      setStatus('ok', ar ? 'جاري الإرسال...' : 'Sending...');

      try {
        var fd = new FormData();
        fd.append('email', email);
        fd.append('locale', ar ? 'ar' : 'en');
        fd.append('source', 'footer-quick-intake');
        fd.append('_subject', ar ? 'طلب مشروع جديد' : 'New Project Inquiry');

        var endpoint = resolveSubmitEndpoint();
        var response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: fd
        });

        if (!response.ok) {
          var errorMsg = 'Failed';
          try {
            var errorData = await response.json();
            if (errorData && errorData.error) errorMsg = String(errorData.error);
          } catch (_) {
            try {
              var errorText = await response.text();
              if (errorText) errorMsg = errorText;
            } catch (_) {}
          }
          throw new Error(errorMsg);
        }

        setStatus('ok', ar ? 'تم الإرسال بنجاح.' : 'Sent successfully.');
        emailInput.value = '';
      } catch (err) {
        var msg = err && err.message ? err.message : '';
        var likelyCors = /failed to fetch|networkerror|load failed/i.test(msg);

        if (likelyCors) {
          try {
            var fallbackBody = new URLSearchParams();
            fallbackBody.set('email', email);
            fallbackBody.set('locale', ar ? 'ar' : 'en');
            fallbackBody.set('source', 'footer-quick-intake');
            fallbackBody.set('_subject', ar ? 'طلب مشروع جديد' : 'New Project Inquiry');

            await fetch(endpoint, {
              method: 'POST',
              mode: 'no-cors',
              body: fallbackBody
            });

            setStatus(
              'ok',
              ar
                ? 'تم استلام الطلب بنجاح.'
                : 'Inquiry received successfully.'
            );
            emailInput.value = '';
            return;
          } catch (_) {}
        }

        setStatus('err', ar ? 'تعذر الإرسال. حاول مرة أخرى.' : 'Unable to send. Please try again.');
      } finally {
        submitBtn.disabled = false;
      }
    }

    submitBtn.addEventListener('click', submitEmail);
    emailInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        submitEmail();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', injectFooter);
})();
