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
      '</div>',
      '</div>',
      '</div>'
    ].join('');

    footer.prepend(section);
  }

  document.addEventListener('DOMContentLoaded', injectFooter);
})();
