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

  function normalizeNavPath(pathname) {
    var path = pathname || '/';
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    if (path === '/ar' || path === '/ar/') {
      return '/';
    }
    if (path.indexOf('/ar/') === 0) {
      return '/' + path.slice(4);
    }
    return path;
  }

  function dropdownChevronSvg() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5z"></path></svg>';
  }

  function resolveStartProjectHref(ar) {
    var links = document.querySelectorAll('.md-tabs__link, .md-nav__link');
    for (var i = 0; i < links.length; i += 1) {
      var href = links[i].getAttribute('href') || '';
      if (href.indexOf('start-project') !== -1) {
        return href;
      }
    }
    return '/start-project/';
  }

  function arabicNavLabelForPath(pathname) {
    var p = normalizeNavPath(pathname);
    var map = [
      { prefix: '/packages/', label: 'الباقات' },
      { prefix: '/start-project/', label: 'ابدأ المشروع' },
      { prefix: '/CV_index/', label: 'قوالب السيرة الذاتية' },
      { prefix: '/cv_index/', label: 'قوالب السيرة الذاتية' },
      { prefix: '/process/discovery/', label: 'اكتشاف المتطلبات' },
      { prefix: '/process/structure-sitemap/', label: 'الهيكلة وخريطة الموقع' },
      { prefix: '/process/build/', label: 'النسخة الأولى' },
      { prefix: '/process/revisions/', label: 'جولات المراجعة' },
      { prefix: '/process/deployment-handover/', label: 'النشر والتسليم' },
      { prefix: '/process/', label: 'العملية' },
      { prefix: '/web-platforms/student-portfolio/', label: 'موقع بورتفوليو طالب' },
      { prefix: '/web-platforms/academic-documentation/', label: 'موقع توثيق أكاديمي' },
      { prefix: '/web-platforms/workshop-course-page/', label: 'صفحة ورشة أو دورة' },
      { prefix: '/web-platforms/', label: 'دراسات الحالة' },
      { prefix: '/work-demos/', label: 'العروض' },
      { prefix: '/work-demos/', label: 'العروض' },
      { prefix: '/about/', label: 'عنا' },
      { prefix: '/contact/', label: 'تواصل' },
      { prefix: '/policies/terms-of-service/', label: 'الشروط' },
      { prefix: '/policies/privacy-policy/', label: 'الخصوصية' },
      { prefix: '/policies/content-responsibility/', label: 'مسؤولية المحتوى' },
      { prefix: '/policies/revision-policy/', label: 'سياسة المراجعات' }
    ];
    for (var i = 0; i < map.length; i += 1) {
      if (p.indexOf(map[i].prefix) === 0) {
        return map[i].label;
      }
    }
    if (p === '/' || p === '/index/') {
      return 'الرئيسية';
    }
    return '';
  }

  function injectHeaderActions() {
    var ar = isArabicPage();
    var startProjectHref = resolveStartProjectHref(ar);
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
    var titleWrap = document.querySelector('.md-header__title');
    if (!right || !titleWrap || right.parentElement.querySelector('.header-actions')) {
      return;
    }

    if (!document.querySelector('.header-cta--left')) {
      var leftCta = document.createElement('a');
      leftCta.className = 'header-cta header-cta--left';
      leftCta.href = startProjectHref;
      leftCta.textContent = labels.cta;
      titleWrap.insertAdjacentElement('afterend', leftCta);
    }

    var wrap = document.createElement('div');
    wrap.className = 'header-actions';
    wrap.innerHTML = [
      '<a class="header-icon-btn header-github" href="https://github.com/Shoug-Alomran" target="_blank" rel="noopener" aria-label="' + labels.github + '">' +
        iconSvg('M12 .5C5.65.5.5 5.66.5 12.02c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.27-.01-1.01-.02-1.98-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.28-1.71-1.28-1.71-1.04-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.02 1.76 2.68 1.25 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.03 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.74.11 3.03.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.39-5.26 5.67.41.36.77 1.06.77 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.66 18.35.5 12 .5z') +
      '</a>',
      '<button class="header-icon-btn header-toggle-btn" data-sg-toggle="left" type="button" aria-label="' + labels.left + '">' +
        iconSvg('M3 5h6v14H3zm8 0h10v2H11zm0 6h10v2H11zm0 6h10v2H11z') +
      '</button>',
      '<button class="header-icon-btn header-toggle-btn" data-sg-toggle="right" type="button" aria-label="' + labels.right + '">' +
        iconSvg('M15 5h6v14h-6zM3 5h10v2H3zm0 6h10v2H3zm0 6h10v2H3z') +
      '</button>'
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

  function makeHeaderTitleGoHome() {
    var titleWrap = document.querySelector('.md-header__title');
    var logoLink = document.querySelector('.md-header__button.md-logo');
    if (!titleWrap || !logoLink || titleWrap.dataset.homeBound === 'true') {
      return;
    }

    var homeHref = logoLink.getAttribute('href') || '/';
    titleWrap.dataset.homeBound = 'true';
    titleWrap.classList.add('sg-home-title');
    titleWrap.setAttribute('role', 'link');
    titleWrap.setAttribute('tabindex', '0');
    titleWrap.setAttribute('aria-label', isArabicPage() ? 'العودة إلى الصفحة الرئيسية' : 'Go to home page');

    function goHome() {
      window.location.href = homeHref;
    }

    titleWrap.addEventListener('click', function (event) {
      if (event.target.closest('a, button, input, label')) {
        return;
      }
      goHome();
    });

    titleWrap.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        goHome();
      }
    });
  }

  function enhanceMobileDrawerNav() {
    var drawerToggle = document.querySelector('#__drawer');
    var primaryNav = document.querySelector('.md-sidebar--primary .md-nav--primary');
    var primaryList = primaryNav ? primaryNav.querySelector(':scope > .md-nav__list') : null;
    if (!drawerToggle || !primaryNav || !primaryList) {
      return;
    }

    primaryNav.querySelectorAll('.sg-mobile-quick-nav').forEach(function (node) {
      node.remove();
    });

    if (!window.matchMedia('(max-width: 76.234375em)').matches) {
      return;
    }

    var quickNav = document.createElement('nav');
    quickNav.className = 'sg-mobile-quick-nav';
    quickNav.setAttribute('aria-label', isArabicPage() ? 'روابط أقسام الموقع' : 'Site sections');

    function addQuickLink(href, label, active) {
      if (!href || !label) {
        return;
      }
      var link = document.createElement('a');
      link.className = 'sg-mobile-quick-nav__link';
      if (active) {
        link.classList.add('is-active');
      }
      link.href = href;
      link.textContent = label;
      quickNav.appendChild(link);
    }

    primaryList.querySelectorAll(':scope > .md-nav__item').forEach(function (item) {
      var link = item.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
      if (!link) {
        return;
      }

      var labelNode = link.querySelector('.md-ellipsis');
      var label = labelNode ? (labelNode.textContent || '').trim() : (link.textContent || '').trim();
      addQuickLink(
        link.getAttribute('href') || link.href,
        label,
        item.classList.contains('md-nav__item--active')
      );
    });

    var drawerTitle = primaryNav.querySelector(':scope > .md-nav__title, :scope > label.md-nav__title');
    if (drawerTitle) {
      drawerTitle.insertAdjacentElement('afterend', quickNav);
    } else {
      primaryNav.insertBefore(quickNav, primaryList);
    }

    primaryNav.querySelectorAll('a.md-nav__link, .sg-mobile-quick-nav__link').forEach(function (link) {
      if (link.dataset.drawerCloseBound === 'true') {
        return;
      }
      link.dataset.drawerCloseBound = 'true';
      link.addEventListener('click', function () {
        drawerToggle.checked = false;
      });
    });
  }

  function buildTabDropdowns() {
    var tabs = document.querySelector('.md-tabs__list');
    var primaryRoot = document.querySelector('.md-sidebar--primary .md-nav--primary > .md-nav__list');
    if (!tabs || !primaryRoot) {
      return;
    }

    tabs.querySelectorAll('.md-tabs__dropdown').forEach(function (el) {
      el.remove();
    });
    tabs.querySelectorAll('.md-tabs__item').forEach(function (item) {
      item.classList.remove('md-tabs__item--has-dropdown');
    });
    tabs.querySelectorAll('.md-tabs__link .tabs-caret').forEach(function (el) {
      el.remove();
    });

    var childMap = new Map();
    primaryRoot.querySelectorAll(':scope > .md-nav__item').forEach(function (item) {
      var parentLink = item.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
      if (!parentLink) {
        return;
      }
      var parentPath = normalizeNavPath(new URL(parentLink.href, window.location.origin).pathname);
      var childLinks = [];

      item.querySelectorAll(':scope > .md-nav a.md-nav__link').forEach(function (child) {
        var childPath = normalizeNavPath(new URL(child.href, window.location.origin).pathname);
        if (childPath === parentPath) {
          return;
        }
        childLinks.push({
          href: child.getAttribute('href') || child.href,
          label: (child.textContent || '').trim(),
          path: childPath
        });
      });

      var seen = new Set();
      var uniqueChildren = childLinks.filter(function (entry) {
        if (!entry.path || seen.has(entry.path)) {
          return false;
        }
        seen.add(entry.path);
        return true;
      });

      var dropdownItems = uniqueChildren.slice();
      if (parentPath === '/products/') {
        dropdownItems.unshift({
          href: parentLink.getAttribute('href') || parentLink.href,
          label: isArabicPage() ? 'كل المنتجات' : 'All Products',
          path: parentPath
        });
      }
      if (parentPath === '/web-platforms/' && uniqueChildren.some(function (entry) { return entry.path.indexOf('/work-demos/') === 0; })) {
        dropdownItems.unshift({
          href: parentLink.getAttribute('href') || parentLink.href,
          label: (parentLink.textContent || '').trim() || 'Work',
          path: parentPath
        });
      }

      if (dropdownItems.length >= 2) {
        childMap.set(parentPath, dropdownItems);
      }
    });

    tabs.querySelectorAll(':scope > .md-tabs__item').forEach(function (tabItem) {
      var tabLink = tabItem.querySelector(':scope > .md-tabs__link');
      if (!tabLink) {
        return;
      }

      var tabPath = normalizeNavPath(new URL(tabLink.href, window.location.origin).pathname);
      var children = childMap.get(tabPath);
      if (!children || children.length < 2) {
        return;
      }

      tabItem.classList.add('md-tabs__item--has-dropdown');
      if (!tabLink.querySelector('.tabs-caret')) {
        var caret = document.createElement('span');
        caret.className = 'tabs-caret';
        caret.innerHTML = dropdownChevronSvg();
        tabLink.appendChild(caret);
      }

      var menu = document.createElement('div');
      menu.className = 'md-tabs__dropdown';
      var list = document.createElement('ul');
      list.className = 'md-tabs__dropdown-list';
      children.forEach(function (entry) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'md-tabs__dropdown-link';
        a.href = entry.href;
        a.textContent = entry.label;
        li.appendChild(a);
        list.appendChild(li);
      });
      menu.appendChild(list);
      tabItem.appendChild(menu);
    });
  }

  function relabelProductsChildLinks() {
    var label = isArabicPage() ? 'كل المنتجات' : 'All Products';
    document.querySelectorAll('.md-sidebar--primary .md-nav__link').forEach(function (link) {
      var href = link.getAttribute('href') || link.href || '';
      if (normalizeNavPath(new URL(href, window.location.origin).pathname) !== '/products/') {
        return;
      }
      if (link.closest('.md-nav--secondary')) {
        return;
      }
      link.textContent = label;
    });
  }

  function setupTabDropdownInteractions() {
    var tabs = document.querySelector('.md-tabs__list');
    if (!tabs || tabs.dataset.dropdownBound === 'true') {
      return;
    }
    tabs.dataset.dropdownBound = 'true';

    function positionDropdown(item) {
      if (!item) {
        return;
      }
      var menu = item.querySelector(':scope > .md-tabs__dropdown');
      var link = item.querySelector(':scope > .md-tabs__link');
      if (!menu || !link) {
        return;
      }

      var linkRect = link.getBoundingClientRect();
      var width = Math.max(menu.scrollWidth || 0, linkRect.width, 248);
      var maxLeft = window.innerWidth - width - 8;
      var left = Math.min(Math.max(linkRect.left, 8), Math.max(8, maxLeft));

      menu.style.position = 'fixed';
      menu.style.top = Math.max(8, Math.round(linkRect.bottom + 6)) + 'px';
      menu.style.left = Math.round(left) + 'px';
      menu.style.right = 'auto';
      menu.style.minWidth = Math.round(width) + 'px';
    }

    function positionOpenDropdowns() {
      tabs.querySelectorAll('.md-tabs__item--has-dropdown.is-open').forEach(function (item) {
        positionDropdown(item);
      });
    }

    function closeAllDropdowns() {
      tabs.querySelectorAll('.md-tabs__item--has-dropdown.is-open').forEach(function (item) {
        item.classList.remove('is-open');
      });
    }

    function isDesktopTabs() {
      return !window.matchMedia('(max-width: 76.234375em)').matches;
    }

    tabs.querySelectorAll('.md-tabs__item--has-dropdown').forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        if (!isDesktopTabs()) {
          return;
        }
        closeAllDropdowns();
        item.classList.add('is-open');
        positionDropdown(item);
      });

      item.addEventListener('mouseleave', function () {
        if (!isDesktopTabs()) {
          return;
        }
        item.classList.remove('is-open');
      });
    });

    tabs.addEventListener('click', function (event) {
      var link = event.target.closest('.md-tabs__item--has-dropdown > .md-tabs__link');
      if (!link) {
        return;
      }

      if (!isDesktopTabs()) {
        return;
      }

      var item = link.parentElement;
      if (!item) {
        return;
      }

      var clickedCaret = !!event.target.closest('.tabs-caret');
      if (!clickedCaret) {
        closeAllDropdowns();
        return;
      }

      if (!item.classList.contains('is-open')) {
        event.preventDefault();
        closeAllDropdowns();
        item.classList.add('is-open');
        positionDropdown(item);
        return;
      }

      event.preventDefault();
      item.classList.remove('is-open');
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest('.md-tabs__item--has-dropdown')) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    });

    window.addEventListener('resize', positionOpenDropdowns);
    window.addEventListener('scroll', positionOpenDropdowns, { passive: true });
  }

  function applyPageLayoutOverrides() {
    var currentPath = normalizeNavPath(window.location.pathname);
    var primaryRoot = document.querySelector('.md-sidebar--primary .md-nav--primary > .md-nav__list');
    var shouldHideLeft =
      currentPath === '/cart/' ||
      currentPath === '/cart' ||
      currentPath === '/thank-you/' ||
      currentPath === '/thank-you' ||
      currentPath === '/checkout/' ||
      currentPath === '/checkout';
    var shouldHideRight =
      currentPath === '/start-project/' ||
      currentPath === '/start-project' ||
      currentPath === '/cart/' ||
      currentPath === '/cart' ||
      currentPath === '/thank-you/' ||
      currentPath === '/thank-you' ||
      currentPath === '/checkout/' ||
      currentPath === '/checkout';

    if (!shouldHideLeft && primaryRoot) {
      var activeTopLevel = primaryRoot.querySelector(':scope > .md-nav__item--active');
      if (activeTopLevel) {
        var parentLink = activeTopLevel.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
        var parentPath = '';
        var childPaths = new Set();

        try {
          parentPath = parentLink ? normalizeNavPath(new URL(parentLink.href, window.location.origin).pathname) : '';
        } catch (e) {}

        activeTopLevel.querySelectorAll(':scope > .md-nav > .md-nav__list > .md-nav__item > .md-nav__container > a.md-nav__link, :scope > .md-nav > .md-nav__list > .md-nav__item > a.md-nav__link').forEach(function (childLink) {
          try {
            var childPath = normalizeNavPath(new URL(childLink.href, window.location.origin).pathname);
            if (childPath && childPath !== parentPath) {
              childPaths.add(childPath);
            }
          } catch (e) {}
        });

        shouldHideLeft = childPaths.size === 0;
      }
    }

    document.body.classList.toggle('sg-hide-left-sidebar', shouldHideLeft);
    document.body.classList.toggle('sg-hide-right-sidebar', shouldHideRight);
  }

  function ensureMobileWorkNavLink() {
    document.querySelectorAll('.sg-injected-work-link').forEach(function (node) {
      node.remove();
    });

    if (!window.matchMedia('(max-width: 76.234375em)').matches) {
      return;
    }

    var primaryList = document.querySelector('.md-sidebar--primary .md-nav--primary > .md-nav__list');
    if (!primaryList) {
      return;
    }

    var workSection = null;
    primaryList.querySelectorAll(':scope > .md-nav__item').forEach(function (item) {
      if (workSection) {
        return;
      }
      var sectionLink = item.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
      if (!sectionLink) {
        return;
      }
      try {
        var sectionPath = normalizeNavPath(new URL(sectionLink.href, window.location.href).pathname);
        var sectionLabelNode = sectionLink.querySelector('.md-ellipsis');
        var sectionLabel = sectionLabelNode ? (sectionLabelNode.textContent || '').trim() : (sectionLink.textContent || '').trim();
        if (sectionPath === '/web-platforms/' || sectionLabel === 'Work' || sectionLabel === 'دراسات الحالة') {
          workSection = item;
        }
      } catch (e) {}
    });

    if (!workSection) {
      return;
    }

    var sectionLink = workSection.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
    var subList = workSection.querySelector(':scope > .md-nav > .md-nav__list');
    if (!sectionLink || !subList) {
      return;
    }

    var hasWorkLink = false;
    subList.querySelectorAll(':scope > .md-nav__item > a.md-nav__link').forEach(function (link) {
      if (hasWorkLink) {
        return;
      }
      try {
        var childPath = normalizeNavPath(new URL(link.href, window.location.href).pathname);
        var childLabelNode = link.querySelector('.md-ellipsis');
        var childLabel = childLabelNode ? (childLabelNode.textContent || '').trim() : (link.textContent || '').trim();
        if (childPath === '/web-platforms/' || childLabel === 'Work' || childLabel === 'دراسات الحالة') {
          hasWorkLink = true;
        }
      } catch (e) {}
    });

    if (hasWorkLink) {
      return;
    }

    var labelNode = sectionLink.querySelector('.md-ellipsis');
    var label = labelNode ? (labelNode.textContent || '').trim() : ((sectionLink.textContent || '').trim() || 'Work');

    var li = document.createElement('li');
    li.className = 'md-nav__item sg-injected-work-link';

    var link = document.createElement('a');
    link.className = 'md-nav__link';
    try {
      link.href = '/web-platforms/';
    } catch (e) {
      link.href = sectionLink.getAttribute('href') || sectionLink.href;
    }

    var span = document.createElement('span');
    span.className = 'md-ellipsis';
    span.textContent = label;
    link.appendChild(span);

    li.appendChild(link);
    subList.insertBefore(li, subList.firstChild);
  }

  function ensureMobileProductsNavLink() {
    document.querySelectorAll('.sg-injected-products-link').forEach(function (node) {
      node.remove();
    });

    if (!window.matchMedia('(max-width: 76.234375em)').matches) {
      return;
    }

    var primaryList = document.querySelector('.md-sidebar--primary .md-nav--primary > .md-nav__list');
    if (!primaryList) {
      return;
    }

    var productsSection = null;
    primaryList.querySelectorAll(':scope > .md-nav__item').forEach(function (item) {
      if (productsSection) {
        return;
      }
      var sectionLink = item.querySelector(':scope > .md-nav__container > a.md-nav__link, :scope > a.md-nav__link');
      if (!sectionLink) {
        return;
      }
      try {
        var sectionPath = normalizeNavPath(new URL(sectionLink.href, window.location.href).pathname);
        if (sectionPath === '/products/') {
          productsSection = item;
        }
      } catch (e) {}
    });

    if (!productsSection) {
      return;
    }

    var subList = productsSection.querySelector(':scope > .md-nav > .md-nav__list');
    if (!subList) {
      return;
    }

    var hasOverviewLink = false;
    subList.querySelectorAll(':scope > .md-nav__item > a.md-nav__link').forEach(function (link) {
      if (hasOverviewLink) {
        return;
      }
      try {
        var childPath = normalizeNavPath(new URL(link.href, window.location.href).pathname);
        if (childPath === '/products/') {
          hasOverviewLink = true;
        }
      } catch (e) {}
    });

    if (hasOverviewLink) {
      return;
    }

    var li = document.createElement('li');
    li.className = 'md-nav__item sg-injected-products-link';

    var link = document.createElement('a');
    link.className = 'md-nav__link';
    link.href = normalizeNavPath(window.location.pathname).indexOf('/ar/') === 0 ? '/ar/products/' : '/products/';

    var span = document.createElement('span');
    span.className = 'md-ellipsis';
    span.textContent = isArabicPage() ? 'كل المنتجات' : 'All Products';
    link.appendChild(span);

    li.appendChild(link);
    subList.insertBefore(li, subList.firstChild);
  }

  function localizeHeaderUI() {
    if (!isArabicPage()) {
      return;
    }

    document.querySelectorAll('.md-tabs__link').forEach(function (link) {
      try {
        var url = new URL(link.href, window.location.origin);
        var label = arabicNavLabelForPath(url.pathname);
        if (label) {
          link.textContent = label;
        }
      } catch (e) {}
    });

    document.querySelectorAll('.md-tabs__dropdown-link').forEach(function (link) {
      try {
        var ddUrl = new URL(link.href, window.location.origin);
        var ddLabel = arabicNavLabelForPath(ddUrl.pathname);
        if (ddLabel) {
          link.textContent = ddLabel;
        }
      } catch (e) {}
    });

    var searchInput = document.querySelector('.md-search__input');
    if (searchInput) {
      searchInput.setAttribute('placeholder', 'ابحث');
      searchInput.setAttribute('aria-label', 'ابحث');
    }

    document.querySelectorAll('.md-sidebar--primary a.md-nav__link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.indexOf('#') !== -1) {
        return;
      }
      try {
        var linkUrl = new URL(link.href, window.location.origin);
        var linkLabel = arabicNavLabelForPath(linkUrl.pathname);
        if (linkLabel) {
          link.textContent = linkLabel;
        }
      } catch (e) {}
    });

    var currentSectionLabel = arabicNavLabelForPath(window.location.pathname);
    if (!currentSectionLabel) {
      currentSectionLabel = 'القسم';
    }

    document.querySelectorAll('.md-sidebar--primary .md-nav--primary > .md-nav__title, .md-sidebar--primary .md-nav--primary > label.md-nav__title').forEach(function (el) {
      el.textContent = currentSectionLabel;
    });

    document.querySelectorAll('.md-sidebar--secondary .md-nav__title').forEach(function (el) {
      el.textContent = 'جدول المحتويات';
    });
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
    makeHeaderTitleGoHome();
    applyPageLayoutOverrides();
    localizeHeaderUI();
    relabelProductsChildLinks();
    ensureMobileProductsNavLink();
    ensureMobileWorkNavLink();
    enhanceMobileDrawerNav();
    buildTabDropdowns();
    setupTabDropdownInteractions();
    enhancePageHero();
    applyReveal();
  });

  window.addEventListener('resize', function () {
    ensureMobileProductsNavLink();
    ensureMobileWorkNavLink();
    enhanceMobileDrawerNav();
  });

  if (typeof window.document$ !== 'undefined' && window.document$.subscribe) {
    window.document$.subscribe(function () {
      injectHeaderActions();
      makeHeaderTitleGoHome();
      applyPageLayoutOverrides();
      localizeHeaderUI();
      relabelProductsChildLinks();
      ensureMobileProductsNavLink();
      ensureMobileWorkNavLink();
      enhanceMobileDrawerNav();
      buildTabDropdowns();
      setupTabDropdownInteractions();
      enhancePageHero();
      applyReveal();
    });
  }
})();
