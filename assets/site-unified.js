(() => {
  'use strict';
  const toggle = document.querySelector('.site-menu-toggle');
  const menu = document.getElementById('mobile-navigation');
  const closeMenu = () => {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
    menu.hidden = true;
  };
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const opened = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opened));
      toggle.setAttribute('aria-label', opened ? 'Menüyü kapat' : 'Menüyü aç');
      menu.hidden = !opened;
    });
    menu.addEventListener('click', event => {
      if (event.target.closest('a')) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) {
        closeMenu();
        toggle.focus();
      }
    });
  }
  const form = document.getElementById('projectForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const value = id => document.getElementById(id).value.trim();
      const message = [
        'Merhaba Özay Grup, proje talebim var.', '',
        `Ad Soyad: ${value('qName')}`,
        `Telefon: ${value('qPhone')}`,
        `Hizmet: ${value('qService')}`,
        `Konum: ${value('qLocation')}`,
        `Detay: ${value('qDetail')}`
      ].join('\n');
      if (typeof window.ozayTrack === 'function') window.ozayTrack('whatsapp_quote_opened', { service: value('qService'), form_type: 'detailed' });
      window.location.assign('https://wa.me/905384843479?text=' + encodeURIComponent(message));
    });
  }
  // Shared bootstrap: all modern pages load the privacy-safe analytics layer.
  const ozayAnalyticsScript = document.createElement('script');
  ozayAnalyticsScript.src = '/assets/ozay-analytics.js?v=20261113';
  ozayAnalyticsScript.async = true;
  document.head.appendChild(ozayAnalyticsScript);
})();
