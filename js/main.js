const LANG = document.documentElement.lang === 'fi' ? 'fi' : 'en';
const PREFIX = LANG === 'fi' ? '/fi' : '';
const T = (window.SITE_I18N || {})[LANG] || {};
const UI = T.ui || {};

// Site paths ('/about/') get the language prefix; external and mailto links pass through.
function localize(url) {
  return url.startsWith('/') ? PREFIX + url : url;
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const messageField = form.querySelector('#contact-message');
  const sendBtn = form.querySelector('#form-send');

  messageField.addEventListener('input', () => {
    sendBtn.classList.toggle('is-visible', messageField.value.trim().length > 0);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) return;

    sendBtn.disabled = true;
    sendBtn.textContent = UI.sending || 'Sending…';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: form.access_key.value,
          botcheck: form.botcheck.checked,
          subject: `New message from ${name} (victorabuchi.com)`,
          name,
          email,
          message,
        }),
      });
      const result = await response.json();

      if (result.success) {
        sendBtn.textContent = UI.sent || 'Sent';
        form.reset();
        sendBtn.classList.remove('is-visible');
      } else {
        sendBtn.textContent = UI.tryAgain || 'Try again';
      }
    } catch (err) {
      sendBtn.textContent = UI.tryAgain || 'Try again';
    }

    sendBtn.disabled = false;
    window.setTimeout(() => {
      sendBtn.textContent = UI.send || 'Send';
    }, 2500);
  });
}

/* -------------------------------------------------------- */
/* Theme switcher (Light / Dark / Auto)                        */
/* -------------------------------------------------------- */

function initThemeSwitcher() {
  const buttons = document.querySelectorAll('[data-theme-choice]');
  if (!buttons.length) return;

  const root = document.documentElement;

  function currentChoice() {
    return root.dataset.theme === 'light' || root.dataset.theme === 'dark' ? root.dataset.theme : 'auto';
  }

  function render() {
    const choice = currentChoice();
    buttons.forEach((btn) => {
      btn.setAttribute('aria-checked', String(btn.dataset.themeChoice === choice));
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const choice = btn.dataset.themeChoice;
      try {
        if (choice === 'auto') {
          delete root.dataset.theme;
          localStorage.removeItem('theme');
        } else {
          root.dataset.theme = choice;
          localStorage.setItem('theme', choice);
        }
      } catch (err) {
        if (choice === 'auto') delete root.dataset.theme;
        else root.dataset.theme = choice;
      }
      render();
    });
  });

  render();

  // Keep every open tab / restored page in step with the saved choice.
  function syncFromStorage() {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) { /* ignore */ }
    if (saved === 'light' || saved === 'dark') root.dataset.theme = saved;
    else delete root.dataset.theme;
    render();
  }

  window.addEventListener('storage', (event) => {
    if (event.key === 'theme' || event.key === null) syncFromStorage();
  });
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) syncFromStorage();
  });
}

/* -------------------------------------------------------- */
/* Site search                                                 */
/* -------------------------------------------------------- */

function initSearch() {
  const trigger = document.querySelector('.site-nav-search');
  if (!trigger || !T.index) return;

  trigger.setAttribute('aria-label', UI.searchLabel);

  const overlay = document.createElement('div');
  overlay.className = 'site-search';
  overlay.innerHTML = `
    <div class="site-search-scrim" data-search-close></div>
    <div class="site-search-panel" role="dialog" aria-modal="true" aria-label="${UI.searchLabel}">
      <div class="site-search-bar">
        <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><circle cx="6.5" cy="6.5" r="4.75" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input class="site-search-input" type="search" placeholder="${UI.searchPlaceholder}" autocomplete="off" spellcheck="false" aria-label="${UI.searchLabel}">
        <button type="button" class="site-search-close" data-search-close>${UI.searchCancel}</button>
      </div>
      <p class="site-search-heading"></p>
      <ul class="site-search-results"></ul>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.site-search-input');
  const heading = overlay.querySelector('.site-search-heading');
  const list = overlay.querySelector('.site-search-results');

  function render(query) {
    const q = query.trim().toLowerCase();
    let items;
    if (!q) {
      heading.textContent = UI.quickLinks;
      items = T.quick.map((url) => T.index.find((i) => i.url === url));
    } else {
      const terms = q.split(/\s+/);
      items = T.index
        .map((i) => {
          const title = i.title.toLowerCase();
          const hay = `${title} ${i.keywords} ${i.kind.toLowerCase()}`;
          if (!terms.every((t) => hay.includes(t))) return null;
          return { item: i, score: title.startsWith(q) ? 0 : title.includes(q) ? 1 : 2 };
        })
        .filter(Boolean)
        .sort((a, b) => a.score - b.score)
        .map((r) => r.item);
      heading.textContent = items.length ? UI.results : '';
    }

    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('li');
      empty.className = 'site-search-empty';
      empty.textContent = UI.noResults(query.trim());
      list.appendChild(empty);
      return;
    }
    items.forEach((i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = localize(i.url);
      a.textContent = i.title;
      const small = document.createElement('small');
      small.textContent = i.kind;
      a.appendChild(small);
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function open() {
    document.dispatchEvent(new CustomEvent('site:close-menu'));
    overlay.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    input.value = '';
    render('');
    input.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus();
  }

  trigger.addEventListener('click', () => {
    if (overlay.classList.contains('is-open')) close();
    else open();
  });
  overlay.addEventListener('click', (event) => {
    if (event.target.closest('[data-search-close]')) close();
    else if (event.target.closest('a')) overlay.classList.remove('is-open');
  });
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const first = list.querySelector('a');
      if (first) first.click();
    } else if (event.key === 'ArrowDown') {
      const first = list.querySelector('a');
      if (first) { event.preventDefault(); first.focus(); }
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
}

/* -------------------------------------------------------- */
/* Hover menu: flyout preview under the nav                    */
/* -------------------------------------------------------- */

function initNavMenu() {
  const header = document.querySelector('header');
  const links = document.querySelectorAll('.site-nav-links a');
  if (!header || !links.length || !T.menu) return;

  const desktop = window.matchMedia('(min-width: 64rem) and (hover: hover)');

  const panel = document.createElement('div');
  panel.className = 'site-menu';
  panel.setAttribute('aria-hidden', 'true');
  header.appendChild(panel);

  const scrim = document.createElement('div');
  scrim.className = 'site-menu-scrim';
  document.body.appendChild(scrim);

  function menuKey(link) {
    const path = new URL(link.href).pathname;
    return path.startsWith('/fi/') ? path.slice(3) : path;
  }

  function fill(menu) {
    const list = (items, cls) => {
      const ul = document.createElement('ul');
      ul.className = `site-menu-list ${cls}`;
      items.forEach(([label, url]) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = localize(url);
        a.textContent = label;
        if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
        li.appendChild(a);
        ul.appendChild(li);
      });
      return ul;
    };
    const col = (label, ul) => {
      const div = document.createElement('div');
      const p = document.createElement('p');
      p.className = 'site-menu-label';
      p.textContent = label;
      div.append(p, ul);
      return div;
    };
    const inner = document.createElement('div');
    inner.className = 'site-menu-inner';
    inner.append(col(menu.label, list(menu.main, 'site-menu-main')), col(menu.sideLabel, list(menu.side, 'site-menu-side')));
    panel.replaceChildren(inner);
  }

  let openTimer = null;
  let closeTimer = null;
  let isOpen = false;

  function open(link) {
    const menu = T.menu[menuKey(link)];
    if (!menu || !desktop.matches) return;
    window.clearTimeout(closeTimer);
    fill(menu);
    isOpen = true;
    panel.classList.add('is-open');
    scrim.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
  }

  function close() {
    window.clearTimeout(openTimer);
    isOpen = false;
    panel.classList.remove('is-open');
    scrim.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
  }

  function scheduleClose() {
    window.clearTimeout(openTimer);
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(close, 120);
  }

  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(closeTimer);
      if (isOpen) open(link);
      else openTimer = window.setTimeout(() => open(link), 90);
    });
    link.addEventListener('focus', () => open(link));
  });

  // Hovering the logo or the search button dismisses the flyout.
  header.querySelector('.site-nav-name')?.addEventListener('mouseenter', close);
  header.querySelector('.site-nav-search')?.addEventListener('mouseenter', close);

  header.addEventListener('mouseleave', scheduleClose);
  header.addEventListener('mouseenter', () => window.clearTimeout(closeTimer));
  scrim.addEventListener('mouseenter', close);
  header.addEventListener('focusout', (event) => {
    if (!header.contains(event.relatedTarget)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
  document.addEventListener('site:close-menu', close);
  desktop.addEventListener('change', close);
}

/* -------------------------------------------------------- */
/* Language selector                                           */
/* -------------------------------------------------------- */

function initLanguageSelect() {
  const select = document.querySelector('.language-select select');
  if (!select) return;

  select.value = LANG;
  select.addEventListener('change', () => {
    const target = select.value;
    if (target === LANG) return;
    const path = window.location.pathname;
    const base = path.startsWith('/fi/') || path === '/fi' ? path.slice(3) || '/' : path;
    const next = target === 'fi' ? '/fi' + base : base;
    try { localStorage.setItem('lang', target); } catch (err) { /* ignore */ }
    window.location.href = next + window.location.search + window.location.hash;
  });
}

/* -------------------------------------------------------- */
/* Project folders: open the folder holding a #hash target     */
/* -------------------------------------------------------- */

function initProjectFolders() {
  function openHashTarget() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    let folder = target && target.closest('details.project-folder');
    if (!folder) return;
    while (folder) {
      folder.open = true;
      folder = folder.parentElement.closest('details.project-folder');
    }
    window.requestAnimationFrame(() => target.scrollIntoView({ block: 'center' }));
  }

  openHashTarget();
  window.addEventListener('hashchange', openHashTarget);
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectFolders();
  initThemeSwitcher();
  initNavMenu();
  initSearch();
  initLanguageSelect();
  initContactForm();
});
