(function () {
  function isArabicPage() {
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    return lang.indexOf('ar') === 0;
  }

  function cleanHeadingText(node) {
    if (!node) {
      return '';
    }
    var clone = node.cloneNode(true);
    clone.querySelectorAll('.headerlink, .md-status, .md-nav__icon').forEach(function (el) {
      el.remove();
    });
    return (clone.textContent || '').replace(/¶/g, '').trim();
  }

  function iconSvg(path) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"></path></svg>';
  }

  function isArabicPage() {
    var lang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    return lang.indexOf('ar') === 0;
  }

  function injectHeaderActions() {
    var ar = isArabicPage();
    var labels = ar ? {
      github: 'ملف GitHub',
      left: 'إخفاء/إظهار القائمة اليسرى',
      right: 'إخفاء/إظهار جدول المحتويات',
      cta: 'ابدأ المشروع'
    } : {
      github: 'GitHub profile',
      left: 'Toggle left sidebar',
      right: 'Toggle right sidebar',
      cta: 'Start Project'
    };

    var right = document.querySelector('.md-header__option');
    if (!right || right.parentElement.querySelector('.header-actions')) {
      return;
    }

    var wrap = document.createElement('div');
    wrap.className = 'header-actions';
    wrap.innerHTML = [
      '<a class="header-icon-btn header-github" href="https://github.com/Shoug-Alomran" target="_blank" rel="noopener" aria-label="' + labels.github + '">' +
        iconSvg('M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.27-.01-1.01-.02-1.98-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.28-1.71-1.28-1.71-1.04-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.68 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.03 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.74.11 3.03.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.39-5.26 5.67.41.36.77 1.06.77 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5z') +
      '</a>',
      '<button class="header-icon-btn header-toggle-btn" data-sg-toggle="left" type="button" aria-label="' + labels.left + '">' +
        iconSvg('M3 5h18v2H3zm0 6h12v2H3zm0 6h18v2H3z') +
      '</button>',
      '<button class="header-icon-btn header-toggle-btn" data-sg-toggle="right" type="button" aria-label="' + labels.right + '">' +
        iconSvg('M4 5h16v2H4zm0 6h10v2H4zm0 6h16v2H4z') +
      '</button>',
      '<a class="header-cta" href="/contact/">' + labels.cta + '</a>'
    ].join('');

    right.parentElement.insertBefore(wrap, right.nextSibling);

    var leftBtn = wrap.querySelector('[data-sg-toggle="left"]');
    var rightBtn = wrap.querySelector('[data-sg-toggle="right"]');

    function syncSidebarState() {
      var desktop = window.matchMedia('(min-width: 1220px)').matches;
      if (!desktop) {
        document.body.classList.remove('sg-hide-left-sidebar', 'sg-hide-right-sidebar');
        if (leftBtn) {
          leftBtn.classList.remove('is-active');
        }
        if (rightBtn) {
          rightBtn.classList.remove('is-active');
        }
        return;
      }

      if (leftBtn) {
        leftBtn.classList.toggle('is-active', document.body.classList.contains('sg-hide-left-sidebar'));
      }
      if (rightBtn) {
        rightBtn.classList.toggle('is-active', document.body.classList.contains('sg-hide-right-sidebar'));
      }
    }

    syncSidebarState();
    window.addEventListener('resize', syncSidebarState);

    wrap.addEventListener('click', function (event) {
      var target = event.target.closest('[data-sg-toggle]');
      if (!target) {
        return;
      }

      var which = target.getAttribute('data-sg-toggle');
      if (which === 'left') {
        document.body.classList.toggle('sg-hide-left-sidebar');
        target.classList.toggle('is-active');
      }
      if (which === 'right') {
        document.body.classList.toggle('sg-hide-right-sidebar');
        target.classList.toggle('is-active');
      }
    });
  }

  function localizeHeaderUI() {
    if (!isArabicPage()) {
      return;
    }

    var tabMap = {
      '/': 'الرئيسية',
      '/index/': 'الرئيسية',
      '/packages/': 'الباقات',
      '/process/': 'العملية',
      '/web-platforms/': 'دراسات الحالة',
      '/about/': 'عنّا',
      '/contact/': 'تواصل'
    };

    document.querySelectorAll('.md-tabs__link').forEach(function (link) {
      try {
        var url = new URL(link.href, window.location.origin);
        var path = url.pathname;
        Object.keys(tabMap).forEach(function (prefix) {
          if (path === prefix || (prefix !== '/' && path.indexOf(prefix) === 0)) {
            link.textContent = tabMap[prefix];
          }
        });
      } catch (e) {}
    });

    var searchInput = document.querySelector('.md-search__input');
    if (searchInput) {
      searchInput.setAttribute('placeholder', 'ابحث');
      searchInput.setAttribute('aria-label', 'ابحث');
    }
  }

  function applyReveal() {
    var items = document.querySelectorAll('.md-typeset .grid.cards > ul > li, .card-grid .info-card, .terminal-hero, .page-hero');
    if (!items.length) {
      return;
    }

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    items.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  function enhancePageHero() {
    var typeset = document.querySelector('.md-content .md-typeset');
    if (!typeset || typeset.querySelector('.terminal-hero') || typeset.querySelector('.page-hero')) {
      return;
    }

    var firstH1 = typeset.querySelector(':scope > h1');
    if (!firstH1) {
      return;
    }

    var hero = document.createElement('section');
    hero.className = 'page-hero page-hero--terminal reveal';

    var pathBits = window.location.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    var pageRef = pathBits.length ? pathBits[pathBits.length - 1] : 'home';
    var bar = document.createElement('div');
    bar.className = 'page-hero__bar';
    bar.innerHTML =
      '<span class="dot dot-red"></span>' +
      '<span class="dot dot-yellow"></span>' +
      '<span class="dot dot-green"></span>' +
      '<span class="page-hero__ref">page://' + pageRef + '</span>';
    hero.appendChild(bar);

    var body = document.createElement('div');
    body.className = 'page-hero__body';

    var title = document.createElement('h1');
    title.className = 'page-hero__title';
    title.textContent = cleanHeadingText(firstH1);
    body.appendChild(title);

    var cursor = firstH1.nextElementSibling;
    var addedSummary = false;
    while (cursor && !/^H[2-6]$/.test(cursor.tagName)) {
      var next = cursor.nextElementSibling;
      if (!addedSummary && cursor.tagName === 'P') {
        var summary = document.createElement('p');
        summary.className = 'page-hero__summary';
        summary.textContent = cursor.textContent.trim().replace(/¶/g, '');
        body.appendChild(summary);
        cursor.remove();
        addedSummary = true;
      }
      cursor = next;
    }

    if (!addedSummary) {
      var fallbackSummary = document.createElement('p');
      fallbackSummary.className = 'page-hero__summary';
      fallbackSummary.textContent = isArabicPage()
        ? 'نظرة عامة مرتبة عن النطاق والقرارات والنتائج في هذه الصفحة.'
        : 'Structured overview of scope, decisions, and outcomes for this page.';
      body.appendChild(fallbackSummary);
    }

    var sectionLinks = [];
    typeset.querySelectorAll(':scope > h2[id]').forEach(function (h2) {
      if (sectionLinks.length >= 3) {
        return;
      }
      sectionLinks.push({
        href: '#' + h2.id,
        label: cleanHeadingText(h2)
      });
    });

    if (sectionLinks.length) {
      var actions = document.createElement('div');
      actions.className = 'page-hero__actions';
      sectionLinks.forEach(function (item) {
        var link = document.createElement('a');
        link.className = 'page-hero__chip';
        link.href = item.href;
        link.textContent = item.label;
        actions.appendChild(link);
      });
      body.appendChild(actions);
    }

    firstH1.remove();
    hero.appendChild(body);
    typeset.prepend(hero);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectHeaderActions();
    localizeHeaderUI();
    enhancePageHero();
    applyReveal();
  });

  if (typeof window.document$ !== 'undefined' && window.document$.subscribe) {
    window.document$.subscribe(function () {
      injectHeaderActions();
      localizeHeaderUI();
      enhancePageHero();
      applyReveal();
    });
  }
})();
