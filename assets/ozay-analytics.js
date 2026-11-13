/* ÖZAY GRUP • GA4 altyapısı: doğru G- kimliği oluşturulana kadar pasif.
 * Google Analytics > Yönetici > Veri akışları > Web akışından G- kimliği alın.
 * Eskiden kullanılan Avotekno GA4 mülkünün kimliğini BURAYA koymayın.
 */
(function () {
  'use strict';
  var GA4_ID = ''; // ÖZAY GRUP / ozaysistem.com web akışının gerçek G- kimliği eklenecek.
  var enabled = /^G-[A-Z0-9]{6,20}$/.test(GA4_ID);
  var storageKey = 'ozay_analytics_consent_v1';
  var consent = 'unset';
  var initialized = false;

  // Bu fonksiyon GA4 kurulmamışken ve onay yokken veri göndermez.
  window.ozayTrack = function (eventName, data) {
    if (!enabled || consent !== 'granted' || !initialized || typeof window.gtag !== 'function') return false;
    if (!/^(?:whatsapp_quote_opened|whatsapp_link_clicked|phone_link_clicked)$/.test(eventName)) return false;
    data = data || {};
    var safe = { source_page: (window.location.pathname || '/').slice(0, 120), transport_type: 'beacon' };
    // Serbest metin, müşteri adı, telefon numarası ve proje adresi GA4'e aktarılmaz.
    if (data.service) safe.service = String(data.service).slice(0, 60);
    if (data.form_type) safe.form_type = String(data.form_type).slice(0, 24);
    try {
      window.gtag('event', eventName, safe);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!enabled) return; // Kimlik yoksa Google çerezi, isteği ve izin afişi yok.

  try { consent = window.localStorage.getItem(storageKey) || 'unset'; }
  catch (error) { consent = 'unset'; }

  function loadAnalytics() {
    if (initialized || consent !== 'granted') return;
    initialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    // Açık rıza olmadan Google etiketini hiç yüklemiyoruz.
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('config', GA4_ID, { send_page_view: true });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_ID);
    document.head.appendChild(tag);
  }

  function saveConsent(value) {
    consent = value;
    try { window.localStorage.setItem(storageKey, value); }
    catch (error) { /* Depolama kapalıysa seçim bu sayfada uygulanır. */ }
    if (value === 'granted') loadAnalytics();
    else if (initialized && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    var box = document.getElementById('ozay-analytics-dialog');
    if (box) box.hidden = true;
  }

  function makeButton(label, action, className) {
    var b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.className = className;
    b.addEventListener('click', action);
    return b;
  }

  function buildPreferences() {
    var style = document.createElement('style');
    style.textContent = '.ozay-analytics-box{position:fixed;z-index:10000;bottom:18px;left:18px;max-width:480px;width:calc(100% - 36px);box-shadow:0 10px 36px rgba(0,0,0,.2);border:1px solid #c7d9cc;background:#fff;border-radius:12px;padding:16px;color:#152d20;font:14px/1.5 Arial,sans-serif}.ozay-analytics-box[hidden]{display:none}.ozay-analytics-box p{margin:0 0 12px}.ozay-analytics-box a{color:#086a42;text-decoration:underline}.ozay-analytics-actions{display:flex;flex-wrap:wrap;gap:8px}.ozay-analytics-actions button,.ozay-analytics-toggle{border:1px solid #8eaf9b;padding:9px 12px;border-radius:7px;background:#fff;color:#0c5c38;cursor:pointer;font-size:14px}.ozay-analytics-actions .accept{background:#0b7246;color:#fff}.ozay-analytics-toggle{position:fixed;bottom:86px;left:12px;z-index:9998;background:#fff;box-shadow:0 2px 10px #0002;font-size:12px;padding:6px 9px}.ozay-analytics-actions button:focus-visible,.ozay-analytics-toggle:focus-visible{outline:3px solid #84ba97;outline-offset:2px}@media(min-width:800px){.ozay-analytics-toggle{bottom:12px}}';
    document.head.appendChild(style);
    var box = document.createElement('aside');
    box.id = 'ozay-analytics-dialog';
    box.className = 'ozay-analytics-box';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'İsteğe bağlı analitik çerezleri');
    var txt = document.createElement('p');
    txt.textContent = 'Ziyaret ve iletişim tıklamalarını ölçmek için Google Analytics kullanmak istiyoruz. İzin vermezseniz analitik çerezleri yüklenmez. Kararınızı sonradan değiştirebilirsiniz.';
    box.appendChild(txt);
    var privacy = document.createElement('a');
    privacy.href = '/gizlilik-politikasi.html';
    privacy.textContent = 'Gizlilik ve çerez bilgileri';
    box.appendChild(privacy);
    var actions = document.createElement('div');
    actions.className = 'ozay-analytics-actions';
    actions.style.marginTop = '12px';
    actions.appendChild(makeButton('Reddet', function () { saveConsent('denied'); }, 'reject'));
    actions.appendChild(makeButton('Kabul et', function () { saveConsent('granted'); }, 'accept'));
    box.appendChild(actions);
    document.body.appendChild(box);
    var toggle = makeButton('Çerez tercihleri', function () { box.hidden = false; }, 'ozay-analytics-toggle');
    toggle.setAttribute('aria-label', 'Analitik çerez tercihlerini yeniden aç');
    document.body.appendChild(toggle);
    box.hidden = consent !== 'unset';
  }

  // Kişisel veri içermeyen yalnızca tıklama niyeti etkinlikleri.
  document.addEventListener('click', function (event) {
    if (consent !== 'granted') return;
    var link = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!link) return;
    var href = link.getAttribute('href') || '';
    if (/^tel:/i.test(href)) window.ozayTrack('phone_link_clicked', {});
    else if (/^https:\/\/wa\.me\/905384843479(?:[/?#]|$)/i.test(href)) window.ozayTrack('whatsapp_link_clicked', {});
  }, true);

  if (consent === 'granted') loadAnalytics();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', buildPreferences);
  else buildPreferences();
}());
