# ÖZAY GRUP – GA4 ölçüm kurulumu

## Durum (13 Kasım 2026)

- Site: https://ozaysistem.com/
- Search Console: OpenSEO ile bağlı.
- OpenSEO hesabında mevcut görünen tek GA4 mülkü: **www.avotekno.com**. Kullanılmamalı.
- Özay Grup için yeni GA4 mülkü ve web veri akışı **henüz oluşturulmadı**.
- `assets/ozay-analytics.js` içinde `var GA4_ID = ''` olduğu sürece Google Analytics ölçümü **kapalıdır**; dışarıya GA isteği gönderilmez ve analitik izin afişi gösterilmez.
- Kod testlerinde izin verilmeden ölçüm yapılmadığı doğrulandı.

## Google tarafında gereken kurulum

1. https://analytics.google.com/ adresinde doğru hesapla giriş yapın.
2. Yönetici > Oluştur > Mülk seçeneklerinden bir **yeni GA4 mülkü** oluşturun.
3. Önerilen isim: **ÖZAY GRUP – ozaysistem.com**. Saat dilimi: **Türkiye / İstanbul**, para birimi: **TRY**.
4. Web veri akışını https://ozaysistem.com/ alan adı için oluşturun.
5. Web veri akışı ayrıntılarından **G- ile başlayan Ölçüm Kimliği** değerini alın.
6. Bu kimlik `assets/ozay-analytics.js` dosyasındaki `GA4_ID` değişkenine yerleştirilmelidir. Eski GA4 mülkünün kimliğini kullanmayın.
7. GitHub ana dalına yayımlandıktan sonra Google Analytics > Raporlar > Gerçek Zamanlı ile izin verilmiş test ziyaretini doğrulayın.
8. OpenSEO > Proje Ayarları > Entegrasyonlar'dan **yeni** GA4 mülkünü seçin ve eşleyin.

## Ölçüm tasarımı

| GA4 olay adı | Anlamı | Ticari dönüşüm sayılır mı? |
| --- | --- | --- |
| `whatsapp_quote_opened` | Sitede hazırlanan WhatsApp teklif mesajı açılmaya çalışıldı | Potansiyel iletişim niyeti; **gerçekten mesaj gönderildiği kanıtı değildir** |
| `whatsapp_link_clicked` | Bir WhatsApp bağlantısına tıklandı | Tıklama; müşteri sayılmaz |
| `phone_link_clicked` | Telefon bağlantısına tıklandı | Tıklama; arama bağlandı anlamına gelmez |

Kaynak sayfa yolu (`source_page`), seçilen hizmet (`service`) ve form tipi (`form_type`) olaylarla gönderilir. İsim, telefon numarası, serbest metin proje açıklaması, açık adres ve WhatsApp mesajının tamamı GA4'e gönderilmez.

GA4 kurulduktan sonra `whatsapp_quote_opened` ve `phone_link_clicked` olaylarını isteğe göre **önemli etkinlik** olarak işaretlemek mümkündür. Gerçek müşteri taleplerini WhatsApp'ta gelen mesajlar ve tamamlanmış telefon görüşmeleri ile ayrıca sayın.

Analitik etiket yalnızca ziyaretçinin açık tercihi **Kabul et** ise yüklenir. Tercih `localStorage`'da saklanır ve sayfanın altındaki **Çerez tercihleri** ile değiştirilebilir. Eski veri aktarımını geriye dönük olarak oluşturmaz.

## Site kapsaması

24 modern HTML sayfası `assets/site-unified.js` üzerinden ölçüm altyapısını yükler.
5 eski/ayrı tasarımlı elektrik ve güneş enerjisi sayfasında ölçüm betiği doğrudan tanımlıdır.
Toplam: **29 site haritası URL'si**.

## Kontrol listesi

- [x] Siteye izin tabanlı ölçüm altyapısı hazırlandı.
- [x] WhatsApp teklif, doğrudan WhatsApp ve telefon tıklamaları için üç ayrı olay.
- [x] Müşteri açıklamasını ve kişisel verileri analitik olayından ayırma.
- [x] Gizlilik metnini güncelleme.
- [ ] Özay Grup GA4 mülkü oluşturma (Google Analytics yöneticisi işlemi).
- [ ] Doğru G- ölçüm kimliğini siteye ekleme.
- [ ] OpenSEO'ya yeni GA4 mülkünü bağlama.
- [ ] Gerçek zamanlı test ve önemli etkinlik doğrulaması.
