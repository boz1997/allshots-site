/* AllShots — i18n (brief §4.3). One IIFE, flat keys, values may contain inline HTML. EN = the page's shipped text
   and lives here; tr/es/fr/de live in assets/i18n/<lang>.js (one file per language, so a visitor loads only their own).
   Language order: ?lang= → localStorage "gc_lang" → navigator.language → en. The inline script in index.html's <head>
   picks the same language, starts loading its file and hides the page (html.i18n-wait, 1.5 s failsafe) until it is applied,
   so non-English visitors never see an English flash. The dictionaries are hand-edited; check with R/tools/i18n-check.mjs. */
(function () {
  var I18N = window.ALLSHOTS_I18N = window.ALLSHOTS_I18N || {};
  I18N.en = {
"meta.title": "AllShots — Every guest is a photographer",
"meta.desc": "Share one QR code and every guest shoots into one live album, from the app or the phone’s browser. Free for up to 10 guests, one-time price per event.",
"nav.skip": "Skip to content",
"aria.nav": "Main",
"nav.how": "How it works",
"nav.pricing": "Pricing",
"nav.guides": "Guides",
"nav.faq": "FAQ",
"nav.code": "Have a code?",
"aria.lang": "Language",
"nav.getApp": "Get the app",
"nav.menu": "Menu",
"nav.host": "Host dashboard",
"nav.create": "Create your event",
"hero.title": "Every guest is a photographer.",
"hero.lead": "Share one QR code. Guests scan it and start shooting, with no app or account needed, and every photo and video lands in one live album you control.",
"hero.leadShort": "Guests scan one QR code and start shooting. Every shot lands in one live album.",
"hero.cta": "Get the app",
"hero.try": "Take a test shot",
"hero.note": "Free for up to 10 guests. One-time price per event when you need more. No subscription needed.",
"alt.hero": "A guest holds up her phone on a crowded dance floor; the AllShots camera on its screen shows 27 shots left.",
"hero.caption": "Late on the dance floor, from a guest’s phone.",
"album.title": "<span class=\"ln\">Your photographer is one person.</span> <span class=\"ln\">Your guests are 120.</span>",
"album.body": "She’ll get the vows and the first dance. She can’t also be at table nine when your grandfather tells that story, or out on the patio at midnight. Your guests are.",
"album.body2": "A good photographer is worth every dollar, and you should hire one.",
"alt.album1": "The best man mid-toast with a microphone while the long table laughs, lit by a camera flash.",
"album.cap1": "The toast, from the long table.",
"alt.album2": "A grandmother in a lace dress laughs as she dances with her teenage grandson.",
"album.cap2": "Dancing with her grandson, after the cake.",
"alt.album3": "The bride, barefoot with her shoes in one hand, spins with two friends on the dance floor.",
"album.cap3": "Shoes off, just after midnight.",
"disp.label": "Disposable mode",
"disp.title": "The magic of not seeing the photo.",
"disp.body": "No preview and no retakes: every shot uploads the moment it’s taken. Each guest gets a set number of shots, so every frame counts.",
"disp.facts": "Choose 10, 12, 24, 36, 48 or 72 shots per guest, or unlimited shots on the Unlimited plan. The no-preview camera is in the iPhone app; guests in a browser use their phone’s own camera, with the same shot count.",
"disp.cta": "Get the app",
"alt.demo": "Friends laughing on a sofa, seen through the camera.",
"demo.left": "left",
"demo.doneTitle": "Your shots are used up",
"demo.doneBody": "Thank you for capturing this event!",
"demo.reset": "Start over",
"demo.shutter": "Take a test shot",
"demo.label": "Shots per guest",
"aria.demoInf": "Unlimited shots, on the Unlimited plan",
"demo.note": "A demo of the shot counter. Nothing is taken or uploaded.",
"demo.last": "Last one!",
"demo.srLeft": "{n} shots left",
"demo.srInf": "Unlimited shots",
"how.title": "Scan. Shoot. That’s the whole setup.",
"alt.how1": "The AllShots app’s event setup, with 24 shots per guest selected.",
"how.s1label": "First",
"how.s1title": "Create your event.",
"how.s1body": "Name it, add the date and choose how many shots each guest gets. Your QR code is ready in the app, and you don’t need an account to start.",
"alt.how2": "An Elegant table card with a QR code on a candlelit dinner table.",
"how.s2label": "Then",
"how.s2title": "Put a card on every table.",
"how.s2body": "Pick one of 12 card designs with your QR code built in. Save it to Photos to print, or share it with the invite.",
"alt.how3": "The AllShots gallery in the app, with Select, Download All and ZIP.",
"how.s3label": "After",
"how.s3title": "Relive it together.",
"how.s3body": "Every photo lands in one live album as it’s taken. When the night is over, download the whole event as one ZIP, on every plan.",
"guests.title": "Any phone can join.",
"guests.body": "The QR code opens a page in the phone’s browser, on iPhone or Android. Guests tap Photo and their phone’s own camera opens. There’s nothing to install.",
"alt.guests": "A guest holds her phone next to a table card; the phone shows the AllShots page in the browser with Photo and 24 left.",
"guests.caption": "Joining from the browser, no app.",
"guests.p1t": "Name or anonymous.",
"guests.p1b": "Guests can add a name or stay anonymous. No account, no password.",
"guests.p2t": "iPhone or Android.",
"guests.p2b": "Any modern phone browser works. Guests with the iPhone app can use it instead, and everything lands in the same album.",
"guests.p3t": "Lost the card?",
"guests.p3b": "The 6-character code works too, at <a href=\"/app/\">allshots.app/app</a>.",
"guests.p4t": "Words and voices too.",
"guests.p4b": "On Medium and Unlimited, guests can leave a written note or a voice message from the browser as well.",
"guests.cta": "Have a code? Open the camera",
"feat.title": "Everything the night needs.",
"feat.aTitle": "Words and voices.",
"feat.aBody": "On Medium and Unlimited, each guest can leave one written note of up to 240 characters and one voice message of up to 60 seconds. Download the notes as a PDF and the voices as a ZIP.",
"alt.featA": "The AllShots memory book: short notes from guests, and a voice message ready to play.",
"feat.bTitle": "A card for every table.",
"feat.bBody": "12 invitation and table-card designs, each with your QR code built in. Save one to Photos, print it or send it.",
"alt.cardElegant": "Elegant table card with a QR code",
"alt.cardEditorial": "Editorial table card with a QR code",
"alt.cardFloral": "Floral table card with a QR code",
"alt.cardNight": "Night table card with a QR code",
"alt.cardBirthday": "Birthday table card with a QR code",
"aria.cardPrev": "Previous design",
"aria.cardNext": "Next design",
"alt.featC": "A guest’s photo open in the AllShots app, with Download and Delete.",
"feat.cTitle": "You decide what stays.",
"feat.cBody": "Delete any photo from the album. Anything a guest reports is hidden at once while it’s reviewed. End the event when the night is over, and uploads stop.",
"feat.dTitle": "Shared or private.",
"feat.dBody": "In a shared album, everyone who joins can browse every photo. In a private album, guests keep shooting and only you see the whole album.",
"ui.galleryMode": "Gallery",
"ui.galleryPublicTitle": "Shared album",
"ui.galleryPublicDesc": "Everyone who joins can browse the photos",
"ui.galleryPrivateTitle": "Private album",
"ui.galleryPrivateDesc": "Guests keep shooting — only you can see the photos",
"alt.featD": "The AllShots setting that chooses between a shared album and a private album.",
"feat.eTitle": "The whole night, in one ZIP.",
"feat.eBody": "Download every photo and video as one ZIP, on every plan, free included.",
"alt.featE": "The top of the AllShots gallery with Download All and ZIP.",
"feat.fTitle": "Your events, on any phone.",
"feat.fBody": "Start without an account. When you want your events on a new phone, sign in with Apple, Google or email.",
"feat.cta": "Get the app",
"occ.title": "Made for weddings. Ready for every milestone.",
"occ.frame": "Made for {w}.",
"occ.line2": "Ready for every milestone.",
"occ.hWed": "weddings",
"occ.hBday": "birthdays",
"occ.hGrad": "graduations",
"occ.hProm": "proms",
"occ.hHoco": "homecoming",
"occ.hShower": "baby showers",
"occ.hParty": "parties",
"occ.wed": "Weddings",
"occ.bday": "Birthdays",
"occ.grad": "Graduations",
"occ.prom": "Proms",
"occ.hoco": "Homecoming",
"occ.shower": "Baby showers",
"occ.party": "Parties",
"occ.cap1": "The last song, shoes in hand.",
"occ.cap2": "Frosting on his nose, candles still lit.",
"occ.cap3": "Her dad’s hug, cap still on.",
"occ.cap4": "The boutonniere, pinned on the dance floor.",
"occ.cap5": "Around the fire pit after the game.",
"occ.cap6": "The tiny cardigan gets the biggest laugh.",
"occ.cap7": "Dinner comes out under the string lights.",
"aria.occPause": "Pause",
"aria.occPlay": "Play",
"alt.occ2": "A little boy with frosting on his nose grins over his birthday cake.",
"alt.occ3": "A graduate in her gown and cap is hugged by her laughing father at a backyard party.",
"alt.occ4": "A young woman in a navy gown pins a white boutonniere on her date’s lapel on a crowded dance floor.",
"alt.occ5": "Friends in rust and cream sweaters cheer around a backyard fire pit, one waving a pennant.",
"alt.occ6": "A mother-to-be holds up a tiny knitted cardigan while her friends gasp and laugh.",
"alt.occ7": "Friends around a long table under string lights laugh as the host carries out a big platter.",
"occ.more": "Read the guides",
"price.title": "Priced by guest count.",
"price.sub": "Every event starts free. When the guest list grows, buy a one-time package for that event. No subscription needed.",
"price.n1": "Starter",
"price.free": "Free",
"price.rGuests": "Guests",
"price.rPhotos": "Photos",
"price.v50": "50 in total",
"price.rShots": "Shots per guest",
"price.vShots": "10 to 72",
"price.rVideo": "Video",
"aria.no": "Not included",
"price.rWords": "Notes and voices",
"price.rKeep": "Storage",
"price.v7": "7 days after the first upload",
"price.n2": "Small",
"price.per": "per event",
"price.vUnl": "Unlimited",
"price.vKeep": "No automatic deletion",
"price.n3": "Medium",
"price.vIncl": "Included",
"price.n4": "Unlimited",
"price.n4note": "No guest limit, and the only plan with video.",
"price.vShotsInf": "10 to 72, or",
"price.vVideo": "Up to 90&nbsp;s",
"price.webFree": "Create free on the web",
"price.webBuy": "Buy on the web",
"price.f1": "One-time purchase per event, in the AllShots iPhone app. Prices in USD; the App Store charges in your local currency, and prices may vary by region.",
"price.f2": "Every plan includes the live album and a ZIP download of everything.",
"price.fShots": "Shots per guest: 10 to 72 on every plan. On Starter, the album holds 50 photos in total.",
"price.f3": "Need more guests later? Upgrade the same event from the app.",
"price.f5": "You can also upgrade an event from the <a href=\"https://host.allshots.app/\">host dashboard</a> on the web.",
"price.f4": "Host often? Monthly and annual plans are in the app.",
"price.cta": "Get the app",
"price.compare": "Compare plans",
"privacy.title": "What we never do with your photos.",
"privacy.l1": "We don’t sell personal data.",
"privacy.l2": "We never share photos, videos, voice recordings or notes with advertising partners.",
"privacy.l3": "We don’t use your content to train machine-learning models.",
"privacy.l4": "We don’t use facial recognition or any other biometric analysis.",
"privacy.body": "The album isn’t public: it isn’t published or indexed by search engines. Anyone who joins with your QR code or code can open it, so share the code the way you’d share the invite.",
"privacy.link": "Read the privacy policy",
"faq.title": "Good questions.",
"faq.intro": "Anything else, write to <a href=\"mailto:allshots.app@gmail.com\">allshots.app@gmail.com</a>.",
"faq.q1": "Do guests need to download an app?",
"faq.a1": "No. They scan the QR code or type the 6-character code, and a page opens in their phone’s browser. Tapping Photo opens the phone’s own camera. Guests who have the iPhone app can use its camera instead, which is where disposable mode works in full, and everything lands in the same album.",
"faq.q2": "Does it work on Android?",
"faq.a2": "For guests, yes: any modern phone browser works. To create and manage an event you need an iPhone with iOS 16.4 or later<span data-host>, or a computer, at <a href=\"https://host.allshots.app/\">host.allshots.app</a></span>.",
"faq.q3": "What is disposable mode?",
"faq.a3": "A camera with a set number of shots and no preview or retakes: every shot uploads the moment it’s taken. It’s on by default in the iPhone app. You choose 10 to 72 shots per guest, or unlimited shots on the Unlimited plan.",
"faq.q4": "Can guests see each other’s photos?",
"faq.a4": "You choose. In a shared album, everyone who joins can browse every photo as it arrives. In a private album, guests keep shooting and only you see the whole album.",
"faq.q5": "Who can open the album?",
"faq.a5": "It isn’t public or indexed by search engines. Anyone who joins with your QR code or code can open it, so share the code the way you’d share the invite.",
"faq.q6": "Is it a subscription?",
"faq.a6": "No. Event packages are one-time purchases for one event, and every event starts free for up to 10 guests. If you host often, monthly and annual plans are also in the app.",
"faq.q7": "What if my guest list grows?",
"faq.a7": "Upgrade the same event from the app at any time.",
"faq.q8": "Can guests record video?",
"faq.a8": "Yes, on the Unlimited plan, up to 90 seconds per clip.",
"faq.q9": "Are photos saved in full resolution?",
"faq.a9": "No. Photos are resized on the phone before upload, to 1920&nbsp;px wide in the app and 1600&nbsp;px on the long edge in the browser, so they upload quickly on venue Wi-Fi. Re-encoding them on the phone also removes their location data. Videos aren’t re-encoded.",
"faq.q10": "How long are photos kept?",
"faq.a10": "On the free Starter plan, 7 days after the first upload, and you get a notification the day before. Paid events aren’t deleted automatically: the album stays until you delete the event. Guests can open a paid album for 30 days after the event date, or after the first photo if the event has no date.",
"faq.q11": "Can I remove a photo?",
"faq.a11": "Yes. You can delete any photo from the album, and anything a guest reports is hidden at once while it’s reviewed.",
"faq.q12": "How do refunds work?",
"faq.a12": "Purchases are made through Apple, so refunds are requested at <a href=\"https://reportaproblem.apple.com\">reportaproblem.apple.com</a>. If something went wrong on our side, write to us first. See the <a href=\"refund-policy.html\">refund policy</a>.",
"final.title": "You wake up to the whole night.",
"final.sub": "Create your event in the iPhone app. It’s free for up to 10 guests.",
"final.cta": "Get the app",
"final.code": "Have a code? Open the camera",
"final.card": "Scan to get the app",
"aria.cardQr": "QR code linking to AllShots on the App Store",
"footer.product": "Product",
"footer.how": "How it works",
"footer.pricing": "Pricing",
"footer.guides": "Guides",
"footer.code": "Have a code?",
"footer.legal": "Legal",
"footer.privacy": "Privacy",
"footer.terms": "Terms",
"footer.refund": "Refunds",
"footer.imprint": "Imprint",
"footer.delete": "Delete account",
"footer.help": "Help",
"footer.support": "Support",
"footer.hostGuide": "Host guide",
"footer.copy": "© 2026 AllShots"
  };

  var SUPPORTED = ['en', 'tr', 'es', 'fr', 'de'], current = 'en', want = null, root = document.documentElement;
  function saved(v) { try { if (v) localStorage.setItem('gc_lang', v); else return localStorage.getItem('gc_lang'); } catch (e) { return null; } }
  function pickLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q && SUPPORTED.indexOf(q) >= 0) return q;
    var s = saved();
    if (s && SUPPORTED.indexOf(s) >= 0) return s;
    var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) >= 0 ? nav : 'en';
  }
  function apply(lang) {
    var dict = I18N[lang] || I18N.en, first = !apply.done;
    var t = function (k) { return dict[k] != null ? dict[k] : I18N.en[k]; };
    root.lang = lang;
    document.title = t('meta.title');
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', t('meta.desc'));
    /* the HTML ships EN: on a first EN load there is nothing to swap (no reflow) */
    if (!(first && lang === 'en')) {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var v = t(el.getAttribute('data-i18n'));
        if (v != null) el.innerHTML = v;
      });
      document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
          var p = pair.split(':'), v = t(p[1].trim());
          if (v != null) el.setAttribute(p[0].trim(), v);
        });
      });
    }
    document.querySelectorAll('select[data-lang-select]').forEach(function (s) { s.value = lang; });
    current = lang; apply.done = true; root.classList.remove('i18n-wait');
    document.dispatchEvent(new CustomEvent('i18n:applied', { detail: { lang: lang } }));
  }
  /* load a language file once (the head script may already have started it), then apply */
  function use(lang) {
    want = lang;
    if (I18N[lang]) return apply(lang);
    if (!document.querySelector('script[data-lang-file="' + lang + '"]')) {
      var s = document.createElement('script');
      s.src = '/assets/i18n/' + lang + '.js'; s.async = true; s.setAttribute('data-lang-file', lang);
      s.onerror = function () { root.classList.remove('i18n-wait'); };
      document.head.appendChild(s);
    }
  }
  window.ALLSHOTS_I18N_READY = function (lang) { if (lang === want) apply(lang); };
  function init() {
    use(pickLang());
    document.querySelectorAll('select[data-lang-select]').forEach(function (s) {
      s.addEventListener('change', function () {
        if (s.value === current) return;
        saved(s.value);
        /* a shared ?lang= link keeps pointing at the language on screen */
        try { var u = new URL(location.href); if (u.searchParams.has('lang')) { u.searchParams.set('lang', s.value); history.replaceState(null, '', u); } } catch (e) {}
        use(s.value);
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
