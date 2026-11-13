/* ÖZAY GRUP: Veriler yalnızca tarayıcıda WhatsApp mesajına dönüştürülür. */
(function () {
  'use strict';
  var forms = document.querySelectorAll('form.oz-lead__form');
  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function (event) {
      event.preventDefault();
      if (!this.checkValidity()) {
        this.reportValidity();
        return;
      }
      var service = this.elements.service.value.trim();
      var region = this.elements.region.value.trim();
      var details = this.elements.details.value.trim();
      if (!service || !region) {
        this.reportValidity();
        return;
      }
      var message = [
        'Merhaba ÖZAY GRUP, keşif ve teklif almak istiyorum.',
        'Hizmet: ' + service,
        'Bölge: ' + region
      ];
      if (details) message.push('İhtiyacım: ' + details.slice(0, 600));
      var source = this.getAttribute('data-lead-source');
      if (source) message.push('İlgilendiğim sayfa: ' + source);
      if (typeof window.ozayTrack === 'function') window.ozayTrack('whatsapp_quote_opened', { service: service, form_type: 'quick' });
      window.location.assign('https://wa.me/905384843479?text=' + encodeURIComponent(message.join('\n')));
    });
  }
}());
