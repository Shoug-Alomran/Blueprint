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
      title: 'ابنِ حضور رقمي مرتب',
      subtitle: 'مواقع ثابتة لبورتفوليو الطلاب، التوثيق الأكاديمي، وصفحات الورش.',
      placeholder: 'اكتب بريدك الإلكتروني',
      cta: 'إرسال',
      note: 'النطاق: خدمات مواقع ثابتة فقط. لا Backend ولا SaaS.',
      packages: 'الباقات',
      base: 'الباقة الأساسية',
      addons: 'الإضافات',
      scope: 'حدود النطاق',
      studio: 'الاستوديو',
      process: 'العملية',
      discovery: 'مرحلة الاكتشاف',
      templates: 'نماذج السيرة',
      startProject: 'ابدأ المشروع',
      work: 'الأعمال',
      about: 'عنّا',
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
      scope: 'Scope Boundaries',
      studio: 'Studio',
      process: 'Process',
      discovery: 'Discovery',
      templates: 'CV Templates',
      startProject: 'Start Project',
      work: 'Work',
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
      '<a class="footer-link" href="' + localizedPath('/packages/', ar) + '">' + t.base + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/', ar) + '">' + t.addons + '</a>',
      '<a class="footer-link" href="' + localizedPath('/packages/', ar) + '">' + t.scope + '</a>',
      '</div>',
      '<div class="footer-col">',
      '<p class="footer-col__title">' + t.studio + '</p>',
      '<a class="footer-link" href="' + localizedPath('/process/', ar) + '">' + t.process + '</a>',
      '<a class="footer-link" href="' + localizedPath('/process/discovery/', ar) + '">' + t.discovery + '</a>',
      '<a class="footer-link" href="' + localizedPath('/CV_index/', ar) + '">' + t.templates + '</a>',
      '<a class="footer-link" href="' + localizedPath('/start-project/', ar) + '">' + t.startProject + '</a>',
      '<a class="footer-link" href="' + localizedPath('/web-platforms/', ar) + '">' + t.work + '</a>',
      '<a class="footer-link" href="' + localizedPath('/about/', ar) + '">' + t.about + '</a>',
      '</div>',
      '<div class="footer-col footer-col--support">',
      '<p class="footer-col__title">' + t.support + '</p>',
      '<a class="footer-link" href="' + localizedPath('/contact/', ar) + '">' + t.contact + '</a>',
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

    function submitEmail() {
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
      }

      var email = encodeURIComponent(emailInput.value.trim());
      if (!email) return;

      var subject = ar ? 'طلب مشروع جديد' : 'New Project Inquiry';
      var body = ar
        ? 'البريد الإلكتروني: ' + decodeURIComponent(email)
        : 'Email: ' + decodeURIComponent(email);

      window.location.href = 'mailto:blueprint@shoug-tech.com?subject=' +
        encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
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
