# مطعم المصري B.B.Q — منيو أونلاين

موقع خفيف (HTML/CSS/JS بس، من غير أي سيرفر) لعرض المنيو وإرسال الطلب على الواتساب.

## الملفات
| الملف | الوظيفة |
|---|---|
| `menu.js` | **كل البيانات**: رقم الواتساب، رسوم التوصيل، مواعيد الفتح، المناطق، الأقسام، المنتجات والأسعار |
| `index.html` / `styles.css` / `app.js` | الموقع نفسه |
| `qr.html` | صفحة طباعة QR لكل طاولة + QR عام للمنيو |
| `assets/` | اللوجو |

## أهم حاجة تتعدل قبل التسليم
في `menu.js`:
- `whatsapp: "201000000000"` ← رقم واتساب المطعم (مثال: 01012345678 تتكتب 201012345678)
- `phone`, `deliveryFee`, `minDeliveryOrder`, `openHour`, `closeHour`, `mapsUrl`
- المنتجات: غيّر الأسماء والأسعار والصور (`img` ممكن يبقى رابط أو `assets/kofta.jpg`)

## الروابط
- المنيو العادي: `https://USERNAME.github.io/elmasry/`
- طاولة رقم 5: `https://USERNAME.github.io/elmasry/?table=5` (بيفتح على "في المطعم" ورقم الطاولة مقفول)
- بالإنجليزي: `?lang=en`
- QR للطباعة: `https://USERNAME.github.io/elmasry/qr.html`

## الرفع على GitHub Pages (مجاني)
1. اعمل repo جديد Public على github.com باسم `elmasry`
2. ارفع كل محتويات الفولدر ده (Add file → Upload files) أو:
   ```bash
   git init && git add . && git commit -m "El Masry menu" && git branch -M main
   git remote add origin https://github.com/USERNAME/elmasry.git
   git push -u origin main
   ```
3. Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `root` → Save
4. بعد دقيقة الموقع يبقى شغال على `https://USERNAME.github.io/elmasry/`
