(function () {
  function isArabicPage() {
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    return lang.indexOf('ar') === 0;
  }

  function injectFooter() {
    var footer = document.querySelector('.md-footer');
    if (!footer || footer.querySelector('.custom-footer')) {
      return;
    }

    var ar = isArabicPage();
    var t = ar ? {
      title: 'ابنِ حضور رقمي مرتب',
      subtitle: 'مواقع ثابتة لبورتفوليو الطلاب، التوثيق الأكاديمي، وصفحات الورش.',
      placeholder: 'نوع المشروع والمدة المتوقعة',
      cta: 'ابدأ المشروع',
      note: 'النطاق: خدمات مواقع ثابتة فقط. لا Backend ولا SaaS.',
      packages: 'الباقات',
      base: 'الباقة الأساسية',
      addons: 'الإضافات',
      scope: 'حدود النطاق',
      studio: 'الاستوديو',
      process: 'العملية',
      discovery: 'اكتشاف المتطلبات',
      cases: 'دراسات الحالة',
      about: 'عنّا',
      support: 'الدعم',
      contact: 'تواصل',
      policies: 'السياسات',
      terms: 'الشروط',
      privacy: 'الخصوصية',
      content: 'مسؤولية المحتوى',
      revision: 'سياسة المراجعات'
    } : {
      title: 'Build a Structured Digital Presence',
      subtitle: 'Static websites for student portfolios, academic documentation, and workshop pages.',
      placeholder: 'Project type and timeline',
      cta: 'Start Project',
      note: 'Scope: static website services only. No backend or SaaS development.',
      packages: 'Packages',
      base: 'Base Package',
      addons: 'Add-Ons',
      scope: 'Scope Boundaries',
      studio: 'Studio',
      process: 'Process',
      discovery: 'Discovery Checklist',
      cases: 'Case Studies',
      about: 'About',
      support: 'Support',
      contact: 'Contact',
      policies: 'Policies',
      terms: 'Terms',
      privacy: 'Privacy',
      content: 'Content Responsibility',
      revision: 'Revision Policy'
    };

    var section = document.createElement('section');
    section.className = 'custom-footer';
    section.innerHTML = [
      '<div class="custom-footer__inner">',
      '<div class="custom-footer__left">',
      '<p class="custom-footer__brand">Blueprint</p>',
      '<h2 class="custom-footer__title">' + t.title + '</h2>',
      '<p class="custom-footer__subtitle">' + t.subtitle + '</p>',
      '<div class="custom-footer__form">',
      '<input class="custom-footer__input" type="text" placeholder="' + t.placeholder + '" aria-label="' + t.placeholder + '">',
      '<button class="custom-footer__button" type="button">' + t.cta + '</button>',
      '</div>',
      '<p class="custom-footer__note">' + t.note + '</p>',
      '</div>',
      '<div class="custom-footer__right">',
      '<div class="footer-col">',
      '<p class="footer-col__title">' + t.packages + '</p>',
      '<a class="footer-link" href="/packages/">' + t.base + '</a>',
      '<a class="footer-link" href="/packages/">' + t.addons + '</a>',
      '<a class="footer-link" href="/packages/">' + t.scope + '</a>',
      '</div>',
      '<div class="footer-col">',
      '<p class="footer-col__title">' + t.studio + '</p>',
      '<a class="footer-link" href="/process/">' + t.process + '</a>',
      '<a class="footer-link" href="/process/discovery-content-checklist/">' + t.discovery + '</a>',
      '<a class="footer-link" href="/web-platforms/">' + t.cases + '</a>',
      '<a class="footer-link" href="/about/">' + t.about + '</a>',
      '</div>',
      '<div class="footer-col footer-col--support">',
      '<p class="footer-col__title">' + t.support + '</p>',
      '<a class="footer-link" href="/contact/">' + t.contact + '</a>',
      '<a class="footer-link" href="mailto:blueprint@shoug-tech.com">blueprint@shoug-tech.com</a>',
      '<a class="footer-link" href="https://github.com/Shoug-Alomran" target="_blank" rel="noopener">GitHub</a>',
      '</div>',
      '<div class="footer-col footer-col--policies">',
      '<p class="footer-col__title">' + t.policies + '</p>',
      '<a class="footer-link" href="/policies/terms-of-service/">' + t.terms + '</a>',
      '<a class="footer-link" href="/policies/privacy-policy/">' + t.privacy + '</a>',
      '<a class="footer-link" href="/policies/content-responsibility/">' + t.content + '</a>',
      '<a class="footer-link" href="/policies/revision-policy/">' + t.revision + '</a>',
      '</div>',
      '</div>',
      '</div>'
    ].join('');

    footer.prepend(section);
  }

  document.addEventListener('DOMContentLoaded', injectFooter);
})();
