/* =========================================================
   مطعم المصري B.B.Q — دهب
   كل بيانات المطعم والمنيو هنا. عدّل الملف ده بس.
   ========================================================= */

window.CONFIG = {
  name: { ar: "مطعم المصري", en: "El Masry B.B.Q" },
  tagline: { ar: "مشويات على الفحم • دهب، جنوب سيناء", en: "Charcoal grill • Dahab, South Sinai" },
  // رقم الواتساب بالصيغة الدولية بدون + أو أصفار في الأول
  whatsapp: "201060460290",
  phone: "+20 106 046 0290",
  currency: { ar: "ج.م", en: "EGP" },
  deliveryFee: 30,          // رسوم التوصيل
  minDeliveryOrder: 150,    // أقل طلب للتوصيل
  openHour: 12,             // يفتح الساعة 12 الظهر
  closeHour: 2,             // يقفل 2 بالليل (لو أصغر من openHour يعني بعد نص الليل)
  mapsUrl: "https://maps.google.com/?q=El+Masry+Restaurant+Dahab",
  instagram: "",
  facebook: "",
  // مناطق التوصيل في دهب
  areas: [
    { ar: "المشربة", en: "Mashraba" },
    { ar: "المسبط / اللايت هاوس", en: "Masbat / Lighthouse" },
    { ar: "العصلة", en: "Asala" },
    { ar: "الممشى", en: "Promenade" },
    { ar: "المدينة (دهب سيتي)", en: "Dahab City" },
    { ar: "اللاجونا", en: "Laguna" },
    { ar: "منطقة الفنادق", en: "Hotels area" }
  ]
};

const U = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=70`;

window.CATEGORIES = [
  { id: "offers",   icon: "🔥", ar: "العروض",            en: "Offers" },
  { id: "grill",    icon: "🥩", ar: "مشويات على الفحم",  en: "Charcoal Grill" },
  { id: "chicken",  icon: "🍗", ar: "فراخ",               en: "Chicken" },
  { id: "pizza",    icon: "🍕", ar: "بيتزا",              en: "Pizza" },
  { id: "sandwich", icon: "🥙", ar: "ساندوتشات",          en: "Sandwiches" },
  { id: "sea",      icon: "🐟", ar: "مأكولات بحرية",     en: "Seafood" },
  { id: "sides",    icon: "🥗", ar: "سلطات ومقبلات",     en: "Salads & Sides" },
  { id: "drinks",   icon: "🥤", ar: "مشروبات",            en: "Drinks" },
  { id: "dessert",  icon: "🍰", ar: "حلويات",             en: "Desserts" }
];

/* شكل المنتج:
   id, cat, img, price (أو sizes), best (الأكثر طلباً), spicy, serves,
   name{ar,en}, desc{ar,en},
   sizes: [{ar,en,price}]   ← أحجام (اختياري)
   extras: [{ar,en,price}]  ← إضافات (اختياري)
*/
const EXTRAS_GRILL = [
  { ar: "رز بسمتي إضافي", en: "Extra basmati rice", price: 40 },
  { ar: "طحينة", en: "Tahini", price: 15 },
  { ar: "بطاطس", en: "Fries", price: 35 },
  { ar: "عيش إضافي", en: "Extra bread", price: 10 }
];
const EXTRAS_PIZZA = [
  { ar: "جبنة موتزاريلا زيادة", en: "Extra mozzarella", price: 40 },
  { ar: "زيتون", en: "Olives", price: 15 },
  { ar: "هالبينو", en: "Jalapeño", price: 15 },
  { ar: "أطراف محشية جبنة", en: "Cheese-stuffed crust", price: 50 }
];
const PIZZA_SIZES = (s, m, l) => [
  { ar: "صغير", en: "Small", price: s },
  { ar: "وسط", en: "Medium", price: m },
  { ar: "كبير", en: "Large", price: l }
];

window.PRODUCTS = [
  // ---------- العروض ----------
  { id: "o1", cat: "offers", best: true, serves: 4, img: U("1544025162-d76694265947"), price: 1150, old: 1350,
    name: { ar: "صينية المصري العائلية", en: "El Masry Family Tray" },
    desc: { ar: "نص كيلو كفتة + نص كيلو طرب + فرخة مشوية + رز بسمتي + 3 سلطات + طحينة وعيش. تكفي 4 أفراد.",
            en: "½kg kofta + ½kg tarb + whole grilled chicken + basmati rice + 3 salads, tahini & bread. Serves 4." },
    extras: EXTRAS_GRILL },
  { id: "o2", cat: "offers", best: true, serves: 2, img: U("1555939594-58d7cb561ad1"), price: 520, old: 620,
    name: { ar: "عرض الاتنين", en: "Duo Deal" },
    desc: { ar: "ربع كفتة + ربع شيش طاووق + نص فرخة + رز وسلطة وطحينة. تكفي فردين.",
            en: "¼kg kofta + ¼kg shish tawook + ½ chicken + rice, salad & tahini. Serves 2." },
    extras: EXTRAS_GRILL },
  { id: "o3", cat: "offers", img: U("1513104890138-7c749659a591"), price: 380, old: 460,
    name: { ar: "عرض 2 بيتزا وسط", en: "2 Medium Pizzas" },
    desc: { ar: "أي 2 بيتزا وسط من اختيارك + 1 لتر بيبسي. اكتب الأنواع في الملاحظات.",
            en: "Any 2 medium pizzas + 1L Pepsi. Write your choices in the notes." } },

  // ---------- مشويات ----------
  { id: "g1", cat: "grill", best: true, img: U("1529193591184-b1d58069ecdd"),
    name: { ar: "كفتة مشوية على الفحم", en: "Charcoal Kofta" },
    desc: { ar: "كفتة لحم بلدي متبلة بخلطة المصري ومشوية على الفحم، بتتقدم مع رز وسلطة وطحينة وعيش.",
            en: "Local beef kofta with our house spice, charcoal grilled. Served with rice, salad, tahini & bread." },
    sizes: [ { ar: "ربع كيلو", en: "¼ kg", price: 220 }, { ar: "نص كيلو", en: "½ kg", price: 420 }, { ar: "كيلو", en: "1 kg", price: 800 } ],
    extras: EXTRAS_GRILL },
  { id: "g2", cat: "grill", best: true, img: U("1546964124-0cce460f38ef"),
    name: { ar: "كباب ضاني", en: "Lamb Kebab" },
    desc: { ar: "قطع لحم ضاني طازة على الفحم، طرية وبتدوب في البق.",
            en: "Fresh lamb cubes on charcoal — tender and juicy." },
    sizes: [ { ar: "ربع كيلو", en: "¼ kg", price: 320 }, { ar: "نص كيلو", en: "½ kg", price: 620 }, { ar: "كيلو", en: "1 kg", price: 1200 } ],
    extras: EXTRAS_GRILL },
  { id: "g3", cat: "grill", img: U("1544025162-d76694265947"),
    name: { ar: "ريش ضاني", en: "Lamb Chops" },
    desc: { ar: "ريش ضاني بلدي بتتبيلة خاصة على الفحم.", en: "Local lamb chops with a special marinade." },
    sizes: [ { ar: "ربع كيلو", en: "¼ kg", price: 350 }, { ar: "نص كيلو", en: "½ kg", price: 680 } ],
    extras: EXTRAS_GRILL },
  { id: "g4", cat: "grill", img: U("1529193591184-b1d58069ecdd"),
    name: { ar: "طرب ضاني", en: "Lamb Tarb" },
    desc: { ar: "طرب ضاني مشوي على الفحم مع رز وخضار.", en: "Grilled lamb tarb with rice & vegetables." },
    sizes: [ { ar: "ربع كيلو", en: "¼ kg", price: 280 }, { ar: "نص كيلو", en: "½ kg", price: 540 } ],
    extras: EXTRAS_GRILL },
  { id: "g5", cat: "grill", best: true, serves: 3, img: U("1555939594-58d7cb561ad1"), price: 750,
    name: { ar: "مشكل مشويات", en: "Mixed Grill" },
    desc: { ar: "كفتة + كباب + طرب + شيش طاووق + سجق، مع رز وسلطات. تكفي 2-3 أفراد.",
            en: "Kofta, kebab, tarb, shish tawook & sausage with rice and salads. Serves 2–3." },
    extras: EXTRAS_GRILL },

  // ---------- فراخ ----------
  { id: "c1", cat: "chicken", best: true, img: U("1598103442097-8b74394b95c6"),
    name: { ar: "فراخ مشوية على الفحم", en: "Charcoal Chicken" },
    desc: { ar: "فراخ متبلة بتتبيلة المصري السرية، مع رز بسمتي وبطاطس وسلطة.",
            en: "Chicken in our secret marinade, with basmati rice, fries & salad." },
    sizes: [ { ar: "ربع فرخة", en: "Quarter", price: 150 }, { ar: "نص فرخة", en: "Half", price: 230 }, { ar: "فرخة كاملة", en: "Whole", price: 440 } ],
    extras: EXTRAS_GRILL },
  { id: "c2", cat: "chicken", spicy: true, img: U("1532550907401-a500c9a57435"),
    name: { ar: "شيش طاووق", en: "Shish Tawook" },
    desc: { ar: "قطع صدور فراخ متبلة بالزبادي والتوابل على الفحم.", en: "Yogurt-marinated chicken breast skewers." },
    sizes: [ { ar: "ربع كيلو", en: "¼ kg", price: 190 }, { ar: "نص كيلو", en: "½ kg", price: 360 } ],
    extras: EXTRAS_GRILL },
  { id: "c3", cat: "chicken", spicy: true, img: U("1562967914-608f82629710"), price: 210,
    name: { ar: "أجنحة باربكيو", en: "BBQ Wings" },
    desc: { ar: "12 قطعة أجنحة بصوص الباربكيو أو الحار.", en: "12 wings in BBQ or hot sauce." },
    sizes: [ { ar: "باربكيو", en: "BBQ", price: 210 }, { ar: "حار", en: "Hot", price: 210 } ] },

  // ---------- بيتزا ----------
  { id: "p1", cat: "pizza", best: true, img: U("1513104890138-7c749659a591"),
    name: { ar: "بيتزا مارجريتا", en: "Margherita Pizza" },
    desc: { ar: "صوص طماطم وموتزاريلا وريحان.", en: "Tomato sauce, mozzarella & basil." },
    sizes: PIZZA_SIZES(130, 180, 230), extras: EXTRAS_PIZZA },
  { id: "p2", cat: "pizza", best: true, img: U("1628840042765-356cda07504e"),
    name: { ar: "بيتزا بيبروني", en: "Pepperoni Pizza" },
    desc: { ar: "بيبروني بقري وموتزاريلا.", en: "Beef pepperoni & mozzarella." },
    sizes: PIZZA_SIZES(160, 220, 280), extras: EXTRAS_PIZZA },
  { id: "p3", cat: "pizza", img: U("1565299624946-b28f40a0ae38"),
    name: { ar: "بيتزا مشكل لحوم", en: "Meat Lovers Pizza" },
    desc: { ar: "سجق وبسطرمة ولحمة مفرومة وفلفل.", en: "Sausage, pastrami, minced beef & peppers." },
    sizes: PIZZA_SIZES(180, 250, 320), extras: EXTRAS_PIZZA },
  { id: "p4", cat: "pizza", img: U("1571407970349-bc81e7e96d47"),
    name: { ar: "بيتزا فراخ باربكيو", en: "BBQ Chicken Pizza" },
    desc: { ar: "فراخ مشوية وصوص باربكيو وبصل.", en: "Grilled chicken, BBQ sauce & onion." },
    sizes: PIZZA_SIZES(170, 235, 300), extras: EXTRAS_PIZZA },
  { id: "p5", cat: "pizza", img: U("1574071318508-1cdbab80d002"),
    name: { ar: "بيتزا خضار", en: "Veggie Pizza" },
    desc: { ar: "فلفل ألوان ومشروم وزيتون وطماطم.", en: "Bell peppers, mushroom, olives & tomato." },
    sizes: PIZZA_SIZES(140, 190, 245), extras: EXTRAS_PIZZA },

  // ---------- ساندوتشات ----------
  { id: "s1", cat: "sandwich", best: true, img: U("1529006557810-274b9b2fc783"), price: 95,
    name: { ar: "شاورما فراخ", en: "Chicken Shawarma" },
    desc: { ar: "شاورما فراخ بالتومية والمخلل في عيش سوري.", en: "Chicken shawarma with garlic sauce & pickles." },
    sizes: [ { ar: "عادي", en: "Regular", price: 95 }, { ar: "سوبر", en: "Super", price: 130 } ] },
  { id: "s2", cat: "sandwich", img: U("1561651823-34feb02250e4"), price: 85,
    name: { ar: "ساندوتش كفتة", en: "Kofta Sandwich" },
    desc: { ar: "كفتة مشوية بالطحينة والسلطة.", en: "Grilled kofta with tahini & salad." } },
  { id: "s3", cat: "sandwich", best: true, img: U("1568901346375-23c9450c58cd"), price: 160,
    name: { ar: "برجر المصري", en: "El Masry Burger" },
    desc: { ar: "برجر لحم بلدي 200 جم مشوي على الفحم بالجبنة والبصل المكرمل، مع بطاطس.",
            en: "200g charcoal-grilled beef burger, cheese & caramelized onion, with fries." },
    extras: [ { ar: "شريحة جبنة", en: "Cheese slice", price: 20 }, { ar: "بيف بيكون", en: "Beef bacon", price: 35 }, { ar: "برجر إضافي", en: "Extra patty", price: 70 } ] },

  // ---------- بحري ----------
  { id: "f1", cat: "sea", best: true, img: U("1519708227418-c8fd9a32b7a2"),
    name: { ar: "سمك مشوي (حسب الوزن)", en: "Grilled Fish (by weight)" },
    desc: { ar: "سمك طازة من البحر الأحمر، مشوي ردة أو سنجاري، مع رز صيادية وسلطة.",
            en: "Fresh Red Sea fish, grilled or Singari style, with sayadeya rice & salad." },
    sizes: [ { ar: "نص كيلو", en: "½ kg", price: 300 }, { ar: "كيلو", en: "1 kg", price: 580 } ] },
  { id: "f2", cat: "sea", img: U("1565680018434-b513d5e5fd47"), price: 450,
    name: { ar: "جمبري مشوي", en: "Grilled Shrimp" },
    desc: { ar: "ربع كيلو جمبري جامبو بالزبدة والتوم.", en: "¼kg jumbo shrimp with garlic butter." } },
  { id: "f3", cat: "sea", img: U("1599487488170-d11ec9c172f0"), price: 280,
    name: { ar: "كاليماري مقلي", en: "Fried Calamari" },
    desc: { ar: "حلقات كاليماري مقرمشة بالصوص.", en: "Crispy calamari rings with dip." } },

  // ---------- مقبلات ----------
  { id: "a1", cat: "sides", img: U("1512621776951-a57141f2eefd"), price: 45,
    name: { ar: "سلطة خضرا", en: "Green Salad" }, desc: { ar: "خيار وطماطم وخس وليمون.", en: "Cucumber, tomato, lettuce & lemon." } },
  { id: "a2", cat: "sides", img: U("1573080496219-bb080dd4f877"), price: 50,
    name: { ar: "بطاطس مقلية", en: "French Fries" }, desc: { ar: "بطاطس مقرمشة.", en: "Crispy fries." } },
  { id: "a3", cat: "sides", img: U("1577805947697-89e18249d767"), price: 40,
    name: { ar: "حمص بالطحينة", en: "Hummus" }, desc: { ar: "حمص كريمي بزيت الزيتون.", en: "Creamy hummus with olive oil." } },
  { id: "a4", cat: "sides", img: U("1585937421612-70a008356fbe"), price: 60,
    name: { ar: "رز بسمتي", en: "Basmati Rice" }, desc: { ar: "طبق رز بسمتي بالمكسرات.", en: "Basmati rice with nuts." } },

  // ---------- مشروبات ----------
  { id: "d1", cat: "drinks", img: U("1600271886742-f049cd451bba"), price: 60,
    name: { ar: "عصير برتقال فريش", en: "Fresh Orange Juice" }, desc: { ar: "برتقال طازة.", en: "Freshly squeezed." } },
  { id: "d2", cat: "drinks", img: U("1556679343-c7306c1976bc"), price: 55,
    name: { ar: "ليمون نعناع", en: "Lemon Mint" }, desc: { ar: "ليمون بالنعناع مثلج.", en: "Iced lemon with mint." } },
  { id: "d3", cat: "drinks", img: U("1622483767028-3f66f32aef97"), price: 30,
    name: { ar: "مشروب غازي", en: "Soft Drink" }, desc: { ar: "بيبسي / سفن أب / ميرندا.", en: "Pepsi / 7Up / Mirinda." },
    sizes: [ { ar: "كانز", en: "Can", price: 30 }, { ar: "1 لتر", en: "1 L", price: 45 } ] },
  { id: "d4", cat: "drinks", img: U("1564890369478-c89ca6d9cde9"), price: 25,
    name: { ar: "شاي بدوي", en: "Bedouin Tea" }, desc: { ar: "شاي بالحبق على الطريقة السيناوي.", en: "Sinai-style tea with habaq herbs." } },

  // ---------- حلويات ----------
  { id: "z1", cat: "dessert", img: U("1563805042-7684c019e1cb"), price: 70,
    name: { ar: "أم علي", en: "Om Ali" }, desc: { ar: "أم علي بالمكسرات والقشطة في الفرن.", en: "Baked Om Ali with nuts & cream." } },
  { id: "z2", cat: "dessert", img: U("1551024506-0bccd828d307"), price: 65,
    name: { ar: "كنافة بالقشطة", en: "Kunafa with Cream" }, desc: { ar: "كنافة مقرمشة بالقشطة والشربات.", en: "Crispy kunafa with cream & syrup." } }
];
