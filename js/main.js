(function () {
  "use strict";
  var C = window.SITE_CONFIG;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function mapsUrl(e) {
    if (typeof e.lat === "number") return "https://www.google.com/maps/search/?api=1&query=" + e.lat + "," + e.lng;
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venue + ", " + e.address);
  }
  function mapBtn(e, label) {
    return e.venue ? '<a class="btn" target="_blank" rel="noopener" href="' + mapsUrl(e) + '">' + label + "</a>" : "";
  }
  function placeholder(label) {
    return '<div class="ph" role="img" aria-label="Photo placeholder"><svg><use href="#lotus"/></svg><span>' + esc(label) + "</span></div>";
  }
  function fname(p) { return p.split("/").pop(); }

  /* Fill in names from config */
  function bind(k, v) { $$('[data-bind="' + k + '"]').forEach(function (n) { n.textContent = v; }); }
  bind("groom-name", C.groom.name); bind("groom-father", C.groom.father);
  bind("bride-name", C.bride.name); bind("bride-father", C.bride.father);

  /* Images that fail to load: swap in an elegant placeholder */
  function fallbackImg(img, label) {
    var ph = document.createElement("div");
    ph.innerHTML = placeholder(label);
    var el = ph.firstChild;
    if (img.parentNode) img.parentNode.replaceChild(el, img);
  }
  function safeImg(src, alt, label, extra) {
    var img = new Image();
    img.src = src; img.alt = alt; img.loading = "lazy"; img.decoding = "async";
    if (extra) Object.keys(extra).forEach(function (k) { img.style[k] = extra[k]; });
    img.addEventListener("error", function () { fallbackImg(img, label); });
    return img;
  }
  var ganesha = $(".hero-ganesha");
  if (ganesha) {
    ganesha.addEventListener("error", function () { ganesha.classList.add("missing"); });
    if (ganesha.complete && ganesha.naturalWidth === 0) ganesha.classList.add("missing");
  }

  /* ---------- Events ---------- */
  var ICONS = {
    diya: '<svg viewBox="0 0 48 40"><use href="#diya"/></svg>',
    rings: '<svg viewBox="0 0 48 40"><use href="#rings"/></svg>',
    music: '<svg viewBox="0 0 48 40"><use href="#music"/></svg>'
  };
  function nameHtml(n) { var m = n.match(/^(.*?)\s*(\(.*\))$/); return m ? esc(m[1]) + ' <small>' + esc(m[2]) + "</small>" : esc(n); }
  var eg = $("#eventGrid");
  C.events.forEach(function (e) {
    var a = document.createElement("article");
    a.className = "event reveal";
    a.innerHTML =
      '<div class="event-photo"></div><div class="event-body">' +
      '<div class="event-icon" aria-hidden="true">' + ICONS[e.icon] + "</div>" +
      "<h3>" + nameHtml(e.name) + "</h3>" +
      '<p class="event-row"><svg class="ri" viewBox="0 0 24 24"><use href="#i-cal"/></svg><span>' + esc(e.dateLabel) + "</span></p>" +
      (e.venue ? '<p class="event-row"><svg class="ri" viewBox="0 0 24 24"><use href="#i-pin"/></svg><span><b>' + esc(e.venue) + "</b>,<br>" + esc(e.address) + "</span></p>" : "") +
      '' + mapBtn(e, "View on Google Maps") + '</div>';
    $(".event-photo", a).appendChild(safeImg(e.photo, e.photoAlt, "Add photo: " + fname(e.photo)));
    eg.appendChild(a);
  });

  /* ---------- Venues ---------- */
  var vg = $("#venueGrid");
  C.events.filter(function (e) { return e.venue; }).forEach(function (e) {
    var d = document.createElement("article");
    d.className = "venue reveal";
    d.innerHTML =
      "<h3>" + esc(e.name) + "</h3>" +
      '<div class="venue-date">' + esc(e.dateLabel) + "</div>" +
      '<div class="event-venue">' + esc(e.venue) + "</div>" +
      '<p class="event-addr">' + esc(e.address) + "</p>" +
      '' + mapBtn(e, "Open in Google Maps");
    vg.appendChild(d);
  });

  /* ---------- Kids' invitation ---------- */
  var kl = $("#kidList");
  (C.kids || []).forEach(function (k, i) {
    var r = document.createElement("article");
    r.className = "kid reveal" + (i % 2 ? " flip" : "");
    var av = document.createElement("div"); av.className = "kid-avatars";
    (k.avatars || []).forEach(function (a) {
      var ring = document.createElement("div"); ring.className = "kid-avatar";
      ring.innerHTML = '<span class="kid-emoji" aria-hidden="true">' + a.emoji + "</span>";
      var img = new Image(); img.alt = k.name; img.decoding = "async"; img.src = a.photo;
      img.addEventListener("load", function () { ring.innerHTML = ""; ring.appendChild(img); });
      av.appendChild(ring);
    });
    var bub = document.createElement("div"); bub.className = "kid-bubble";
    bub.innerHTML = '<p class="kid-text hindi">' + esc(k.text).replace(/\n/g, "<br>") + '</p><p class="kid-by"><b>' + esc(k.name) + '</b> · <span class="hindi">' + esc(k.role) + "</span></p>";
    r.appendChild(av); r.appendChild(bub); kl.appendChild(r);
  });

  /* ---------- Story ---------- */
  var tl = $("#timeline");
  C.story.forEach(function (s) {
    var li = document.createElement("li");
    li.className = "tl-item reveal";
    li.innerHTML = '<div class="tl-dot" aria-hidden="true"><svg><use href="#lotus"/></svg></div>' +
      '<div class="tl-text"><h3>' + esc(s.title) + "</h3><p>" + esc(s.text) + '</p></div><div class="tl-photo"></div>';
    $(".tl-photo", li).appendChild(safeImg(s.photo, s.title, "Add photo: " + fname(s.photo)));
    tl.appendChild(li);
  });

  /* ---------- Gallery + Lightbox ---------- */
  var gg = $("#galleryGrid"), items = [];
  C.gallery.forEach(function (g, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "g-item reveal";
    if (g.w && g.h) b.style.aspectRatio = g.w + " / " + g.h;
    b.setAttribute("aria-label", "Open photo: " + g.alt);
    var img = safeImg(g.src, g.alt, "Add photo: " + fname(g.src), { objectPosition: g.focus || "center 25%" });
    b.appendChild(img);
    gg.appendChild(b);
    items.push({ btn: b, img: img, data: g, ok: null });
  });
  /* Probe: hide empty slots once at least one real photo exists */
  Promise.all(items.map(function (it) {
    return new Promise(function (res) {
      var p = new Image();
      p.onload = function () { it.ok = true; res(); };
      p.onerror = function () { it.ok = false; res(); };
      p.src = it.data.src;
    });
  })).then(function () {
    var any = items.some(function (i) { return i.ok; });
    if (any) items.forEach(function (i) { if (!i.ok) i.btn.classList.add("hidden"); });
    else $("#galleryHint").hidden = false;
    items = items.filter(function (i) { return i.ok; });
  });

  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap"), cur = 0, lastFocus = null;
  function shown() { return items.length ? items : []; }
  function show(i) {
    var list = shown(); if (!list.length) return;
    cur = (i + list.length) % list.length;
    lbImg.style.opacity = 0;
    lbImg.src = list[cur].data.src; lbImg.alt = list[cur].data.alt; lbCap.textContent = list[cur].data.alt;
    lbImg.onload = function () { lbImg.style.opacity = 1; };
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("open"); });
    show(i); $("#lbClose").focus();
  }
  function closeLb() {
    lb.classList.remove("open"); document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, reduce ? 0 : 280);
    if (lastFocus) lastFocus.focus();
  }
  gg.addEventListener("click", function (e) {
    var b = e.target.closest(".g-item"); if (!b) return;
    var idx = items.findIndex(function (i) { return i.btn === b; });
    if (idx > -1) openLb(idx);
  });
  $("#lbClose").onclick = closeLb;
  $("#lbPrev").onclick = function () { show(cur - 1); };
  $("#lbNext").onclick = function () { show(cur + 1); };
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(cur - 1);
    else if (e.key === "ArrowRight") show(cur + 1);
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });

  /* ---------- Highlight photo ---------- */
  (function () {
    var bg = $("#highlightBg"), p = new Image();
    p.onload = function () {
      bg.style.backgroundImage = 'url("' + C.highlight.src + '")';
      bg.style.backgroundPosition = C.highlight.position || "center";
    };
    p.src = C.highlight.src;
  })();

  /* ---------- Countdown (Asia/Kolkata target, computed live) ---------- */
  (function () {
    var target = new Date(C.countdownTarget).getTime();
    var ids = ["cdD", "cdH", "cdM", "cdS"], els = ids.map(function (i) { return document.getElementById(i); });
    var prev = [];
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function tick() {
      var diff = target - Date.now();
      if (isNaN(target)) { return; }
      if (diff <= 0) {
        $("#countdown-grid").hidden = true; $("#cdNote").hidden = true; $("#cdDone").hidden = false;
        clearInterval(t); return;
      }
      var s = Math.floor(diff / 1000);
      var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      v.forEach(function (n, i) {
        var txt = i === 0 ? String(n) : pad(n);
        if (els[i].textContent !== txt) {
          els[i].textContent = txt;
          if (!reduce && prev.length) { els[i].classList.remove("tick"); void els[i].offsetWidth; els[i].classList.add("tick"); }
        }
      });
      prev = v;
    }
    var t = setInterval(tick, 1000); tick();
  })();

  /* ---------- Header, nav, active state ---------- */
  var header = $("#siteHeader"), nav = $("#mainNav"), toggle = $("#navToggle");
  function onScroll() { header.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open); toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  $$("a", nav).forEach(function (a) { a.addEventListener("click", function () {
    nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open menu");
  }); });
  var links = {}; $$("a", nav).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      $$("a", nav).forEach(function (a) { a.classList.remove("active"); a.removeAttribute("aria-current"); });
      var a = links[e.target.id]; if (a) { a.classList.add("active"); a.setAttribute("aria-current", "true"); }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(links).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Scroll reveal ---------- */
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (n) { io.observe(n); });
  } else { $$(".reveal").forEach(function (n) { n.classList.add("in"); }); }

  /* ---------- Petals (few, light) ---------- */
  if (!reduce) {
    var box = $("#petals"), n = window.innerWidth < 700 ? 7 : 12;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("i");
      p.className = "petal" + (i % 3 === 0 ? " rose" : "");
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 16 + Math.random() * 14 + "s";
      p.style.animationDelay = -Math.random() * 25 + "s";
      p.style.setProperty("--dx", (Math.random() * 160 - 60) + "px");
      p.style.transform = "scale(" + (0.6 + Math.random() * 0.7) + ")";
      box.appendChild(p);
    }
  }

  /* ---------- Invitation toast (once per tab session) ---------- */
  (function () {
    var t = $("#toast"), seen = false;
    try { seen = sessionStorage.getItem("toastSeen") === "1"; } catch (e) {}
    if (seen) return;
    setTimeout(function () { t.hidden = false; setTimeout(close, 8000); }, 2500);
    function close() { t.hidden = true; try { sessionStorage.setItem("toastSeen", "1"); } catch (e) {} }
    $("#toastClose").onclick = close; $("#toastLink").onclick = close;
  })();

  /* ---------- RSVP ---------- */
  (function () {
    var f = $("#rsvpForm"), msg = $("#rsvpMsg"), note = $("#rsvpNote"), btn = $("#rsvpBtn");
    var labels = { attending: "Joyfully attending", declined: "Unable to attend", undecided: "Not sure yet" };
    var idle = btn.textContent;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      msg.className = "rsvp-msg"; note.hidden = true;
      var d = { name: f.name.value.trim(), guests: parseInt(f.guests.value, 10), status: f.status.value, message: f.message.value.trim(), website: f.website ? f.website.value : "" };
      if (!d.name) { msg.textContent = "Please enter your name."; msg.classList.add("err"); f.name.focus(); return; }
      if (!(d.guests >= 1 && d.guests <= 20)) { msg.textContent = "Please enter between 1 and 20 guests."; msg.classList.add("err"); f.guests.focus(); return; }
      var endpoint = C.rsvp && C.rsvp.endpoint;

      /* No destination configured: be honest, nothing is saved. */
      if (!endpoint) {
        var text = "RSVP for " + C.groom.name + " & " + C.bride.name + "'s wedding\nName: " + d.name + "\nGuests: " + d.guests +
          "\nStatus: " + labels[d.status] + (d.message ? "\nMessage: " + d.message : "");
        msg.textContent = "Online RSVP isn't connected yet — nothing has been saved.";
        msg.classList.add("err");
        note.hidden = false; note.textContent = "Please copy your reply and send it to the family by message or WhatsApp.";
        btn.textContent = "Copy my reply";
        btn.onclick = function (ev) {
          ev.preventDefault();
          var done = function () { msg.textContent = "Reply copied — please send it to the family. Thank you!"; msg.className = "rsvp-msg ok"; };
          if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { msg.textContent = text; });
          else msg.textContent = text;
        };
        return;
      }

      var thanks = function () {
        msg.textContent = "Thank you, " + d.name + "! 🙏 Your RSVP has been received.";
        msg.classList.add("ok"); f.reset(); f.guests.value = 1;
      };
      var fail = function () { msg.textContent = "Sorry, we couldn't send your RSVP. Please check your connection and try again."; msg.classList.add("err"); };
      btn.disabled = true; btn.textContent = "Sending…";
      var req;
      if (/^https:\/\/script\.google\.com\//.test(endpoint)) {
        /* Google Apps Script web app: fire-and-forget form post (browser can't read its reply). */
        req = fetch(endpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams({ name: d.name, guests: d.guests, status: d.status, message: d.message, website: d.website }) }).then(thanks);
      } else {
        req = fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); thanks(); });
      }
      req.catch(fail).then(function () { btn.disabled = false; btn.textContent = idle; });
    });
  })();
})();
