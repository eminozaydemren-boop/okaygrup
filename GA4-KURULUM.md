# ÖZAY GRUP – Google Analytics 4

## Etkinleştirme (13 Kasım 2026)

- Google hesabında yeni **ÖZAY GRUP – ozaysistem.com** GA4 mülkü oluşturuldu.
- GA4 mülkü: `properties/564250983`.
- Web akışı: `16333593970`, **ÖZAY GRUP – Web Sitesi**.
- Ölçüm kimliği: `G-5L8KVF5JXF`.
- OpenSEO projesi (`7434cbc9-0554-4b9b-83fb-d7f73dd3391d`) doğru yeni mülke bağlandı.
- Eski `www.avotekno.com` GA4 mülküne dokunulmadı.
- `assets/ozay-analytics.js` yeni mülkün kimliğini kullanıyor; etiket yalnızca kullanıcı analitik çerezlerine açık rıza verdiğinde yüklenir.
- Analitik izin seçiminden önce Google Analytics betiği yüklenmez.

## Önemli yönetim ayrıntısı

Yeni GA4 web akışının Google tarafındaki varsayılan URL'si şu anda `http://ozaysistem.com` görünüyor. Canlı site `https://ozaysistem.com/` olduğundan **Google Analytics → Yönetici → Veri akışları → ÖZAY GRUP – Web Sitesi** altında URL'yi `https://ozaysistem.com` olarak güncelleyin. Bu akışın ölçüm kimliğini değiştirmez. Site kodu HTTPS kullanır.

## Ölçülen etkinlikler

| Olay | Anlamı | Hassas veri |
| --- | --- | --- |
| `whatsapp_quote_opened` | Kullanıcı teklif formunda WhatsApp mesajını açmayı denedi | İsim, telefon, adres, serbest metin gönderilmez |
| `whatsapp_link_clicked` | Kullanıcı WhatsApp bağlantısını tıkladı | Mesaj metni gönderilmez |
| `phone_link_clicked` | Kullanıcı telefon bağlantısını tıkladı | Telefon görüşmesi kaydedilmez |

Olaylar yalnızca açık analitik rızası alındıktan sonra iletilir. Bu olaylar mesajın gerçekten gönderildiğini veya telefonun bağlandığını **garanti etmez**. Gerçek müşteri dönüşümü ayrıca WhatsApp/arama kayıtlarıyla doğrulanmalıdır.

## Doğrulama

1. Siteyi yeni gizli sekmede açın ve analitik izin afişinde **Kabul et** seçeneğini seçin.
2. Google Analytics → Raporlar → Gerçek zamanlı raporunda aktif kullanıcının görünüp görünmediğini kontrol edin.
3. Sayfada bir telefon ya da WhatsApp bağlantısına tıklayın; gerçek zamanlı etkinlik akışında `phone_link_clicked` veya `whatsapp_link_clicked` olayının oluşmasını denetleyin.
4. Teklif formunda WhatsApp mesajı hazırlayarak `whatsapp_quote_opened` etkinliğini kontrol edin.
5. Google Analytics Yönetici ekranında uygun `whatsapp_quote_opened` ve `phone_link_clicked` olaylarını **önemli etkinlik** olarak tanımlayın. Bu işlemler mevcut OpenSEO entegrasyonunda yazma yetkisi olmadığından buradan değiştirilemez.
6. OpenSEO raporlarında yeni GA4 mülkü seçilmiş durumda. Ölçüm sonuçları zamanla görünecektir.

## Teknik doğrulamalar

- [x] Google Analytics yeni mülk ve web akışı oluşturuldu.
- [x] OpenSEO yeni mülke bağlandı.
- [x] Site koduna yalnızca yeni `G-` kimliği eklendi.
- [x] İzin reddinde etiket yüklenmiyor.
- [x] İzin kabulünde doğru `G-` ID ve yalnızca kişisel olmayan tıklama olayları hazır.
- [ ] Kullanıcının gerçek tarayıcı etkileşimiyle GA4 gerçek zamanlı olay doğrulaması.
- [ ] Google Analytics akışının varsayılan `http` URL'sini `https` yapma.
- [ ] Kullanılacak önemli etkinliklerin Google yönetim ekranında işaretlenmesi.

Bu dosya canlı performans değerleri veya müşteri satışları için kanıt değildir.
