(() => {
  const C = window.CONFIG, CATS = window.CATEGORIES, P = window.PRODUCTS;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("elmasry_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem("elmasry_" + k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- i18n ---------- */
  const T = {
    ar: {
      kicker: "🔥 مشويات على الفحم في قلب دهب",
      heroTitle: "طعم المصري <em>الأصلي</em><br>على الفحم",
      heroSub: "اختار أكلك من المنيو، وابعت الطلب على الواتساب في ثواني. دليفري، استلام، أو وانت قاعد على الطاولة.",
      delivery: "دليفري", deliverySub: "لحد باب البيت",
      pickup: "استلام", pickupSub: "جهّزه وأنا جاي",
      dinein: "في المطعم", dineinSub: "اطلب من الطاولة",
      search: "دوّر على أكلة… كفتة، بيتزا، شاورما",
      best: "الأكثر طلباً", all: "الكل", items: "صنف",
      noResults: "مفيش نتايج… جرّب كلمة تانية 🙂",
      from: "يبدأ من", bestBadge: "🔥 الأكثر طلباً", spicy: "🌶️ حار", serves: "يكفي {n} أفراد", save: "وفّر {n}",
      size: "اختار الحجم", required: "مطلوب", extras: "إضافات", optional: "اختياري",
      notes: "ملاحظات على الطلب", notesPh: "مثلاً: من غير بصل، الصوص على جنب…",
      addToCart: "أضف للسلة", added: "اتضاف للسلة ✓",
      viewCart: "عرض السلة", cart: "سلة الطلبات", emptyCart: "السلة فاضية", emptyCartSub: "ضيف أكلك المفضل من المنيو",
      browse: "تصفّح المنيو", orderType: "طريقة الاستلام",
      name: "الاسم", phone: "رقم الموبايل", area: "المنطقة", chooseArea: "اختار منطقتك",
      address: "العنوان بالتفصيل", addressPh: "اسم الشارع / الفندق / رقم الشقة أو علامة مميزة",
      locate: "📍 ابعت موقعي الحالي", locating: "جاري تحديد الموقع…", located: "✓ تم إرفاق موقعك",
      pickupTime: "هتيجي إمتى؟", asap: "في أسرع وقت", in30: "بعد 30 دقيقة", in60: "بعد ساعة",
      table: "رقم الطاولة", tablePh: "مكتوب على الطاولة",
      orderNotes: "ملاحظات للمطعم", subtotal: "الحساب", deliveryFee: "التوصيل", total: "الإجمالي",
      sendWa: "ابعت الطلب على واتساب", minOrder: "أقل طلب للتوصيل {n}",
      waHint: "هيتفتح الواتساب والرسالة جاهزة، اضغط إرسال بس.",
      fill: "كمّل البيانات المطلوبة", tableBanner: "🍽️ إنت على طاولة رقم {n} — اطلب وهنجيبلك لحد عندك",
      open: "مفتوح الآن", closed: "مغلق الآن",
      footerAbout: "مطعم المصري B.B.Q — أشهى المشويات على الفحم في دهب. لحوم طازة يومياً وتتبيلة مصري أصلية.",
      location: "موقعنا", remove: "حذف", clear: "مسح السلة"
    },
    en: {
      kicker: "🔥 Charcoal grill in the heart of Dahab",
      heroTitle: "The <em>real</em> Egyptian<br>BBQ taste",
      heroSub: "Pick from the menu and send your order on WhatsApp in seconds. Delivery, pickup, or right from your table.",
      delivery: "Delivery", deliverySub: "To your door",
      pickup: "Pickup", pickupSub: "Ready when you arrive",
      dinein: "Dine-in", dineinSub: "Order from table",
      search: "Search… kofta, pizza, shawarma",
      best: "Most popular", all: "All", items: "items",
      noResults: "No results… try another word 🙂",
      from: "From", bestBadge: "🔥 Popular", spicy: "🌶️ Spicy", serves: "Serves {n}", save: "Save {n}",
      size: "Choose size", required: "Required", extras: "Extras", optional: "Optional",
      notes: "Special requests", notesPh: "e.g. no onions, sauce on the side…",
      addToCart: "Add to cart", added: "Added to cart ✓",
      viewCart: "View cart", cart: "Your order", emptyCart: "Your cart is empty", emptyCartSub: "Add your favourites from the menu",
      browse: "Browse menu", orderType: "Order type",
      name: "Name", phone: "Phone / WhatsApp", area: "Area", chooseArea: "Choose your area",
      address: "Full address", addressPh: "Street / hotel / room no. or landmark",
      locate: "📍 Share my current location", locating: "Getting location…", located: "✓ Location attached",
      pickupTime: "When will you arrive?", asap: "ASAP", in30: "In 30 min", in60: "In 1 hour",
      table: "Table number", tablePh: "Written on your table",
      orderNotes: "Notes for the kitchen", subtotal: "Subtotal", deliveryFee: "Delivery", total: "Total",
      sendWa: "Send order on WhatsApp", minOrder: "Minimum delivery order {n}",
      waHint: "WhatsApp will open with your order ready — just tap send.",
      fill: "Please complete the required fields", tableBanner: "🍽️ You're at table {n} — order and we'll bring it to you",
      open: "Open now", closed: "Closed now",
      footerAbout: "El Masry B.B.Q — Dahab's favourite charcoal grill. Fresh meat daily and authentic Egyptian spices.",
      location: "Find us", remove: "Remove", clear: "Clear cart"
    }
  };

  /* ---------- state ---------- */
  const params = new URLSearchParams(location.search);
  const urlTable = (params.get("table") || params.get("t") || "").replace(/[^\w-]/g, "").slice(0, 6);
  const state = {
    lang: params.get("lang") || store.get("lang", "ar"),
    mode: urlTable ? "dinein" : (params.get("mode") || store.get("mode", "delivery")),
    table: urlTable || "",
    cart: store.get("cart", []),
    cust: store.get("cust", {}),
    geo: null
  };
  if (!["delivery", "pickup", "dinein"].includes(state.mode)) state.mode = "delivery";

  const t = (k, n) => (T[state.lang][k] || k).replace("{n}", n);
  const L = (o) => (o ? o[state.lang] || o.ar : "");
  const money = (n) => `${Number(n).toLocaleString(state.lang === "ar" ? "ar-EG" : "en-US")} <small>${L(C.currency)}</small>`;
  const moneyTxt = (n) => `${Number(n).toLocaleString("en-US")} ${C.currency.ar}`;
  const byId = (id) => P.find((p) => p.id === id);
  const basePrice = (p) => (p.sizes ? Math.min(...p.sizes.map((s) => s.price)) : p.price);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- static text ---------- */
  function applyLang() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    $$("[data-t]").forEach((el) => (el.innerHTML = t(el.dataset.t)));
    $("#search").placeholder = t("search");
    $("#langBtn").textContent = state.lang === "ar" ? "EN" : "ع";
    document.title = `${L(C.name)} | ${state.lang === "ar" ? "دهب" : "Dahab"}`;
    $("#phoneText").textContent = C.phone;
    $("#callLink").href = "tel:" + C.phone.replace(/\s/g, "");
    $("#waLink").href = "https://wa.me/" + C.whatsapp;
    $("#mapsLink").href = C.mapsUrl;
    $("#year").textContent = new Date().getFullYear();
    if (state.table) { $("#tableBanner").hidden = false; $("#tableBanner").textContent = t("tableBanner", state.table); }
    renderStatus(); renderModes(); renderMenu(); renderFab();
  }

  function renderStatus() {
    const h = new Date().getHours();
    const open = C.closeHour > C.openHour ? h >= C.openHour && h < C.closeHour : h >= C.openHour || h < C.closeHour;
    const el = $("#status");
    el.className = "status " + (open ? "open" : "closed");
    el.textContent = t(open ? "open" : "closed");
  }

  function renderModes() {
    $$(".mode").forEach((b) => b.classList.toggle("active", b.dataset.mode === state.mode));
  }
  function setMode(m) {
    state.mode = m; store.set("mode", m); renderModes();
    if ($("#cartSheet").classList.contains("show")) renderCart();
  }

  /* ---------- menu ---------- */
  function imgTag(p, cls = "") {
    const cat = CATS.find((c) => c.id === p.cat);
    return `<img class="${cls}" src="${p.img}" alt="${esc(L(p.name))}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'fallback',textContent:'${cat ? cat.icon : "🍽️"}'}))">`;
  }
  function qtyInCart(id) { return state.cart.filter((i) => i.id === id).reduce((a, i) => a + i.qty, 0); }

  function cardHTML(p, best) {
    const q = qtyInCart(p.id);
    const badges = [
      p.best && !best ? `<span class="badge hot">${t("bestBadge")}</span>` : "",
      p.old ? `<span class="badge sale">${t("save", (p.old - basePrice(p)).toLocaleString())}</span>` : "",
      p.spicy ? `<span class="badge">${t("spicy")}</span>` : ""
    ].join("");
    const price = `<span class="price">${p.sizes ? `<span class="from">${t("from")}</span>` : ""}${money(basePrice(p))}${p.old ? `<span class="old">${p.old}</span>` : ""}</span>`;
    return `<button class="${best ? "best-card" : "card"}" data-open="${p.id}">
      <div class="ph">${imgTag(p)}<div class="badges">${badges}</div>${q ? `<span class="in-cart">${q}</span>` : ""}</div>
      <div class="${best ? "bc-body" : "card-body"}">
        <h3>${esc(L(p.name))}</h3>
        ${best ? "" : `<p class="d">${esc(L(p.desc))}</p>`}
        <div class="card-foot">${price}<span class="add" aria-hidden="true">+</span></div>
      </div></button>`;
  }

  function renderMenu() {
    const q = $("#search").value.trim().toLowerCase();
    const match = (p) => !q || [p.name.ar, p.name.en, p.desc.ar, p.desc.en].join(" ").toLowerCase().includes(q);

    $("#chips").innerHTML = CATS.filter((c) => P.some((p) => p.cat === c.id && match(p)))
      .map((c) => `<button class="chip" data-cat="${c.id}">${c.icon} ${esc(L(c))}</button>`).join("");

    const best = P.filter((p) => p.best);
    $("#bestWrap").hidden = !!q;
    $("#best").innerHTML = best.map((p) => cardHTML(p, true)).join("");

    let html = "", count = 0;
    CATS.forEach((c) => {
      const items = P.filter((p) => p.cat === c.id && match(p));
      if (!items.length) return;
      count += items.length;
      html += `<section class="cat-sec" id="cat-${c.id}" data-cat="${c.id}">
        <h2 class="sec-title"><span>${c.icon}</span> ${esc(L(c))} <small>${items.length} ${t("items")}</small></h2>
        <div class="grid">${items.map((p) => cardHTML(p)).join("")}</div></section>`;
    });
    $("#sections").innerHTML = html;
    $("#noResults").hidden = count > 0;
    observeSections();
  }

  let io;
  function observeSections() {
    io && io.disconnect();
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const id = e.target.dataset.cat;
        $$(".chip").forEach((ch) => {
          const on = ch.dataset.cat === id;
          ch.classList.toggle("active", on);
          if (on) ch.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
        });
      });
    }, { rootMargin: "-140px 0px -60% 0px" });
    $$(".cat-sec").forEach((s) => io.observe(s));
  }

  /* ---------- product sheet ---------- */
  let cur = null;
  function openProduct(id) {
    const p = byId(id); if (!p) return;
    cur = { p, size: p.sizes ? 0 : -1, extras: new Set(), qty: 1, note: "" };
    const sh = $("#productSheet");
    sh.innerHTML = `
      <button class="sheet-close" data-close aria-label="close">✕</button>
      <div class="sheet-scroll">
        <div class="p-hero">${imgTag(p)}</div>
        <div class="p-body">
          <h2>${esc(L(p.name))}</h2>
          <div class="p-meta">
            ${p.best ? `<span class="pill">${t("bestBadge")}</span>` : ""}
            ${p.spicy ? `<span class="pill">${t("spicy")}</span>` : ""}
            ${p.serves ? `<span class="pill">👥 ${t("serves", p.serves)}</span>` : ""}
          </div>
          <p class="p-desc">${esc(L(p.desc))}</p>
          ${p.sizes ? `<div class="opt-group"><h4>${t("size")} <small>${t("required")}</small></h4>
            ${p.sizes.map((s, i) => `<label class="opt"><input type="radio" name="size" value="${i}" ${i === 0 ? "checked" : ""}><span>${esc(L(s))}</span><em>${money(s.price)}</em></label>`).join("")}</div>` : ""}
          ${p.extras ? `<div class="opt-group"><h4>${t("extras")} <small>${t("optional")}</small></h4>
            ${p.extras.map((x, i) => `<label class="opt"><input type="checkbox" name="extra" value="${i}"><span>${esc(L(x))}</span><em>+${money(x.price)}</em></label>`).join("")}</div>` : ""}
          <div class="opt-group"><h4>${t("notes")} <small>${t("optional")}</small></h4>
            <textarea class="note" id="pNote" placeholder="${t("notesPh")}"></textarea></div>
        </div>
      </div>
      <div class="sheet-foot">
        <div class="qty"><button data-q="1">+</button><span id="pQty">1</span><button data-q="-1">−</button></div>
        <button class="btn" id="addBtn"></button>
      </div>`;
    sh.addEventListener("change", onProdChange);
    updateAddBtn();
    openSheet(sh);
  }
  function onProdChange(e) {
    if (!cur) return;
    if (e.target.name === "size") cur.size = +e.target.value;
    if (e.target.name === "extra") e.target.checked ? cur.extras.add(+e.target.value) : cur.extras.delete(+e.target.value);
    updateAddBtn();
  }
  function unitPrice(p, size, extras) {
    const base = size >= 0 ? p.sizes[size].price : p.price;
    return base + [...extras].reduce((a, i) => a + p.extras[i].price, 0);
  }
  function updateAddBtn() {
    $("#pQty").textContent = cur.qty;
    $("#addBtn").innerHTML = `${t("addToCart")} • ${money(unitPrice(cur.p, cur.size, cur.extras) * cur.qty)}`;
  }
  function addCurrent() {
    const { p, size, qty } = cur;
    const extras = [...cur.extras].sort();
    const note = $("#pNote").value.trim();
    const key = [p.id, size, extras.join("."), note].join("|");
    const ex = state.cart.find((i) => i.key === key);
    if (ex) ex.qty += qty;
    else state.cart.push({ key, id: p.id, size, extras, note, qty });
    saveCart(); closeSheets(); toast(t("added"));
    const fab = $("#cartFab"); fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump");
  }

  /* ---------- cart ---------- */
  function line(i) {
    const p = byId(i.id); if (!p) return null;
    return { p, unit: unitPrice(p, i.size, i.extras), total: unitPrice(p, i.size, i.extras) * i.qty };
  }
  const subtotal = () => state.cart.reduce((a, i) => a + (line(i)?.total || 0), 0);
  const count = () => state.cart.reduce((a, i) => a + i.qty, 0);
  const fee = () => (state.mode === "delivery" ? C.deliveryFee : 0);

  function saveCart() {
    state.cart = state.cart.filter((i) => i.qty > 0 && byId(i.id));
    store.set("cart", state.cart);
    renderFab(); renderMenu();
    if ($("#cartSheet").classList.contains("show")) renderCart();
  }
  function renderFab() {
    const n = count();
    $("#cartFab").hidden = n === 0;
    $("#fabCount").textContent = n;
    $("#fabTotal").innerHTML = money(subtotal());
  }

  function renderCart() {
    const sh = $("#cartSheet");
    const c = state.cust;
    if (!state.cart.length) {
      sh.innerHTML = `<div class="cart-head"><h2>${t("cart")}</h2><button class="sheet-close" data-close>✕</button></div>
        <div class="cart-empty"><div>🛒</div><h3>${t("emptyCart")}</h3><p>${t("emptyCartSub")}</p><br>
        <button class="btn" data-close style="max-width:240px;margin:auto">${t("browse")}</button></div>`;
      return;
    }
    const items = state.cart.map((i, idx) => {
      const l = line(i); if (!l) return "";
      const opts = [i.size >= 0 ? L(l.p.sizes[i.size]) : "", ...i.extras.map((x) => L(l.p.extras[x]))].filter(Boolean).join(" + ");
      return `<div class="c-item">
        <img src="${l.p.img}" alt="" onerror="this.style.visibility='hidden'">
        <div class="c-info"><b>${esc(L(l.p.name))}</b>${opts ? `<small>${esc(opts)}</small>` : ""}${i.note ? `<small>📝 ${esc(i.note)}</small>` : ""}<span class="price">${money(l.total)}</span></div>
        <div class="qty"><button data-ci="${idx}" data-d="1">+</button><span>${i.qty}</span><button data-ci="${idx}" data-d="-1">${i.qty === 1 ? "🗑" : "−"}</button></div>
      </div>`;
    }).join("");

    const m = state.mode;
    const areaOpts = C.areas.map((a) => `<option value="${esc(a.ar)}" ${c.area === a.ar ? "selected" : ""}>${esc(L(a))}</option>`).join("");
    const fields = m === "delivery" ? `
        <div class="row2">
          <label class="field" data-req="name"><span>${t("name")} *</span><input id="fName" value="${esc(c.name || "")}" autocomplete="name"></label>
          <label class="field" data-req="phone"><span>${t("phone")} *</span><input id="fPhone" type="tel" inputmode="tel" value="${esc(c.phone || "")}" autocomplete="tel" dir="ltr"></label>
        </div>
        <label class="field" data-req="area"><span>${t("area")} *</span><select id="fArea"><option value="">${t("chooseArea")}</option>${areaOpts}</select></label>
        <label class="field" data-req="address"><span>${t("address")} *</span><textarea id="fAddress" placeholder="${t("addressPh")}">${esc(c.address || "")}</textarea></label>
        <button class="locate" id="locBtn" type="button">${state.geo ? t("located") : t("locate")}</button>`
      : m === "pickup" ? `
        <div class="row2">
          <label class="field" data-req="name"><span>${t("name")} *</span><input id="fName" value="${esc(c.name || "")}" autocomplete="name"></label>
          <label class="field" data-req="phone"><span>${t("phone")} *</span><input id="fPhone" type="tel" inputmode="tel" value="${esc(c.phone || "")}" autocomplete="tel" dir="ltr"></label>
        </div>
        <label class="field"><span>${t("pickupTime")}</span><select id="fTime">
          <option value="asap">${t("asap")}</option><option value="in30">${t("in30")}</option><option value="in60">${t("in60")}</option></select></label>`
      : `
        <div class="row2">
          <label class="field" data-req="table"><span>${t("table")} *</span><input id="fTable" inputmode="numeric" value="${esc(state.table || c.table || "")}" placeholder="${t("tablePh")}" ${state.table ? "readonly" : ""}></label>
          <label class="field"><span>${t("name")}</span><input id="fName" value="${esc(c.name || "")}" autocomplete="name"></label>
        </div>`;

    const sub = subtotal(), f = fee(), below = m === "delivery" && sub < C.minDeliveryOrder;
    sh.innerHTML = `
      <div class="cart-head"><h2>${t("cart")} <small style="font-family:var(--font);font-size:14px;color:var(--muted)">(${count()})</small></h2><button class="sheet-close" data-close>✕</button></div>
      <div class="sheet-scroll">
        ${items}
        <div class="cart-section"><h4>${t("orderType")}</h4>
          <div class="seg">
            <button data-mode="delivery" class="${m === "delivery" ? "active" : ""}">🛵 ${t("delivery")}</button>
            <button data-mode="pickup" class="${m === "pickup" ? "active" : ""}">🛍️ ${t("pickup")}</button>
            <button data-mode="dinein" class="${m === "dinein" ? "active" : ""}">🍽️ ${t("dinein")}</button>
          </div>
        </div>
        <div class="cart-section" style="padding-top:0">${fields}
          <label class="field"><span>${t("orderNotes")}</span><textarea id="fNotes">${esc(c.notes || "")}</textarea></label>
        </div>
        <div class="summary">
          <div><span>${t("subtotal")}</span><span>${money(sub)}</span></div>
          ${m === "delivery" ? `<div><span>${t("deliveryFee")}</span><span>${money(f)}</span></div>` : ""}
          <div class="tot"><span>${t("total")}</span><span>${money(sub + f)}</span></div>
        </div>
        <p class="hint">${below ? "⚠️ " + t("minOrder", C.minDeliveryOrder) : "💬 " + t("waHint")}</p>
      </div>
      <div class="sheet-foot">
        <button class="btn wa" id="sendBtn" ${below ? "disabled" : ""}>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>
          ${t("sendWa")} • ${money(sub + f)}
        </button>
      </div>`;
  }

  function readForm() {
    const v = (id) => ($("#" + id) ? $("#" + id).value.trim() : "");
    const c = state.cust;
    ["name", "phone", "address", "notes"].forEach((k) => { const el = $("#f" + k[0].toUpperCase() + k.slice(1)); if (el) c[k] = el.value.trim(); });
    if ($("#fArea")) c.area = v("fArea");
    if ($("#fTable") && !state.table) c.table = v("fTable");
    store.set("cust", c);
    return { time: v("fTime"), table: state.table || v("fTable") };
  }

  function validate() {
    let ok = true;
    $$("#cartSheet .field[data-req]").forEach((f) => {
      const inp = $("input,select,textarea", f);
      let bad = !inp.value.trim();
      if (f.dataset.req === "phone") bad = inp.value.replace(/\D/g, "").length < 8;
      f.classList.toggle("err", bad);
      if (bad) ok = false;
    });
    return ok;
  }

  function send() {
    const extra = readForm();
    if (!validate()) { toast(t("fill")); const e = $("#cartSheet .field.err"); e && e.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
    const c = state.cust, m = state.mode;
    const no = "M" + Date.now().toString().slice(-5);
    const modeAr = { delivery: "🛵 دليفري", pickup: "🛍️ استلام من المطعم", dinein: "🍽️ في المطعم (سفرة)" }[m];
    const timeAr = { asap: "في أسرع وقت", in30: "بعد 30 دقيقة", in60: "بعد ساعة" }[extra.time] || "";
    const L2 = [];
    L2.push(`🔥 *طلب جديد — مطعم المصري B.B.Q*`);
    L2.push(`رقم الطلب: *#${no}*`);
    L2.push(`النوع: *${modeAr}*`);
    if (m === "dinein") L2.push(`🪑 طاولة رقم: *${extra.table}*`);
    L2.push("━━━━━━━━━━━━");
    state.cart.forEach((i) => {
      const l = line(i); if (!l) return;
      L2.push(`▪️ *${i.qty}×* ${l.p.name.ar}${i.size >= 0 ? ` (${l.p.sizes[i.size].ar})` : ""} — ${moneyTxt(l.total)}`);
      i.extras.forEach((x) => L2.push(`    + ${l.p.extras[x].ar}`));
      if (i.note) L2.push(`    📝 ${i.note}`);
    });
    L2.push("━━━━━━━━━━━━");
    L2.push(`الحساب: ${moneyTxt(subtotal())}`);
    if (m === "delivery") L2.push(`التوصيل: ${moneyTxt(C.deliveryFee)}`);
    L2.push(`💰 *الإجمالي: ${moneyTxt(subtotal() + fee())}*`);
    L2.push("━━━━━━━━━━━━");
    if (c.name) L2.push(`👤 الاسم: ${c.name}`);
    if (m !== "dinein" && c.phone) L2.push(`📞 الموبايل: ${c.phone}`);
    if (m === "delivery") {
      L2.push(`📍 المنطقة: ${c.area}`);
      L2.push(`🏠 العنوان: ${c.address}`);
      if (state.geo) L2.push(`🗺️ اللوكيشن: https://maps.google.com/?q=${state.geo}`);
    }
    if (m === "pickup") L2.push(`⏰ الاستلام: ${timeAr}`);
    if (c.notes) L2.push(`📝 ملاحظات: ${c.notes}`);
    if (state.lang === "en") L2.push(`🌍 Customer speaks English`);

    const url = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(L2.join("\n"))}`;
    state.cart = []; saveCart(); closeSheets();
    setTimeout(() => (location.href = url), 50);
  }

  function locate() {
    if (!navigator.geolocation) return;
    const b = $("#locBtn"); b.textContent = t("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => { state.geo = pos.coords.latitude.toFixed(6) + "," + pos.coords.longitude.toFixed(6); b.textContent = t("located"); },
      () => { b.textContent = t("locate"); },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  /* ---------- sheets / ui ---------- */
  function openSheet(sh) {
    $$(".sheet.show").forEach((s) => s.classList.remove("show"));
    $("#overlay").classList.add("show"); sh.classList.add("show"); document.body.classList.add("lock");
    history.pushState({ sheet: 1 }, "");
  }
  function closeSheets(fromPop) {
    if (!$(".sheet.show")) return;
    if ($("#cartSheet").classList.contains("show")) readForm();
    $$(".sheet").forEach((s) => s.classList.remove("show"));
    $("#overlay").classList.remove("show"); document.body.classList.remove("lock");
    if (!fromPop && history.state && history.state.sheet) history.back();
  }
  let tt;
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), 1800); }

  /* ---------- events ---------- */
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]"); if (o) return openProduct(o.dataset.open);
    if (e.target.closest("[data-close]") || e.target.id === "overlay") return closeSheets();
    const chip = e.target.closest(".chip");
    if (chip) { const s = $("#cat-" + chip.dataset.cat); s && window.scrollTo({ top: s.getBoundingClientRect().top + scrollY - 120, behavior: "smooth" }); return; }
    const md = e.target.closest("[data-mode]");
    if (md) { if ($("#cartSheet").classList.contains("show")) readForm(); setMode(md.dataset.mode); return; }
    const q = e.target.closest("[data-q]");
    if (q && cur) { cur.qty = Math.max(1, cur.qty + +q.dataset.q); updateAddBtn(); return; }
    if (e.target.closest("#addBtn")) return addCurrent();
    const ci = e.target.closest("[data-ci]");
    if (ci) { readForm(); state.cart[+ci.dataset.ci].qty += +ci.dataset.d; saveCart(); return; }
    if (e.target.closest("#cartFab")) { renderCart(); openSheet($("#cartSheet")); return; }
    if (e.target.closest("#sendBtn")) return send();
    if (e.target.closest("#locBtn")) return locate();
    if (e.target.closest("#langBtn")) { state.lang = state.lang === "ar" ? "en" : "ar"; store.set("lang", state.lang); applyLang(); }
  });
  window.addEventListener("popstate", () => closeSheets(true));
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeSheets());
  let st; $("#search").addEventListener("input", () => { clearTimeout(st); st = setTimeout(renderMenu, 120); });
  const catbar = $("#catbar");
  window.addEventListener("scroll", () => catbar.classList.toggle("stuck", catbar.getBoundingClientRect().top <= 0), { passive: true });

  applyLang();
})();
