/* ==========================================================
   EDIT EVERYTHING HERE — names, events, gallery, story, RSVP.
   ========================================================== */
window.SITE_CONFIG = {
  groom: { name: "Avdhesh Pal",  father: "Shyam Sunder Pal" },
  bride: { name: "Shivani Pal",  father: "Sohan Pal" },

  /* Countdown target. The ceremony time was NOT provided, so the default is
     00:00 (start of the day) on 12 Dec 2026, India Standard Time (+05:30).
     Change the time part (e.g. "2026-12-12T19:00:00+05:30") once confirmed. */
  countdownTarget: "2026-12-12T00:00:00+05:30",
  weddingDateLabel: "12 December 2026",

  events: [
    {
      id: "tilak",
      name: "Tilak",
      icon: "diya",
      dateLabel: "06 December 2026",
      venue: "Aashirwad Guest House",
      address: "Akbarpur, Prayagraj – 212202",
      /* Map button location (from your Google Maps link). */
      lat: 25.41989572355783, lng: 81.66841480088036,
      photo: "images/events/tilak.jpg",
      photoAlt: "Tilak ceremony photograph"
    },
    {
      id: "sangeet",
      name: "Haldi, Mehendi & Sangeet",
      icon: "music",
      dateLabel: "11 December 2026",
      /* Held at home — no venue shown. Add venue/address here to show a location + map button. */
      venue: "",
      address: "",
      photo: "images/events/sangeet.jpg",
      photoAlt: "Haldi, Mehendi and Sangeet celebrations"
    },
    {
      id: "barat",
      name: "Barat (Wedding)",
      icon: "rings",
      dateLabel: "12 December 2026",
      venue: "Kusum Vatika",
      address: "Ramchandra Mission Road, Chak Mundera, Prayagraj – 211011",
      photo: "images/events/barat.jpg",
      photoAlt: "Barat wedding photograph"
    }
  ],

  /* Special invitation from the kids. Add photos in images/kids/ (optional —
     an emoji shows until then). */
  kids: [
    { name: "Advik", role: "नन्हा निमंत्रण अधिकारी",
      avatars: [{ photo: "images/kids/advik.jpg", emoji: "🧒" }],
      text: "मेले चाचा जी की छादी में जुलूल-जुलूल आना!" },
    { name: "Ayansh & Devansh", role: "नटखट निमंत्रण-दूत",
      avatars: [{ photo: "images/kids/ayansh.jpg", emoji: "👦" }, { photo: "images/kids/devansh.jpg", emoji: "👦" }],
      text: "हल्दी है चंदन है, रिश्तों का बंधन है,\nमेरे मामा जी की शादी में आपका अभिनंदन है" }
  ],

  /* Story: placeholders only — replace with your real story. */
  story: [
    { title: "How We Met",            text: "Your story goes here. Tell guests how it all began.",            photo: "images/gallery/photo-11.jpg" },
    { title: "Our First Memories",    text: "Share a favourite early memory together.",                      photo: "images/gallery/photo-05.jpg" },
    { title: "Our Engagement",        text: "The day two families came together in joy.",                    photo: "images/gallery/photo-07.jpg" },
    { title: "The Beginning of Forever", text: "And now, we begin our forever — with your blessings.",      photo: "images/gallery/photo-12.jpg" }
  ],

  /* Gallery: photos live in images/gallery/. w/h = image size in pixels (keeps
     layout stable and photos uncropped). photo-08 is used as the highlight photo. */
  gallery: [
    { src: "images/gallery/photo-01.jpg", alt: "Avdhesh and Shivani standing together arm in arm", w: 1080, h: 1350, focus: "center 25%" },
    { src: "images/gallery/photo-02.jpg", alt: "Avdhesh and Shivani with a bouquet", w: 1200, h: 1800, focus: "center 25%" },
    { src: "images/gallery/photo-03.jpg", alt: "Avdhesh presenting a bouquet to Shivani on one knee", w: 1200, h: 1800, focus: "center 25%" },
    { src: "images/gallery/photo-04.jpg", alt: "Avdhesh kneeling with a bouquet as Shivani looks on", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-05.jpg", alt: "Avdhesh kissing Shivani's hand", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-06.jpg", alt: "Mehendi-decorated hands holding a ring", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-07.jpg", alt: "The couple exchanging the engagement ring", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-09.jpg", alt: "The couple holding a gift tray", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-10.jpg", alt: "Engagement rings among marigolds and roses", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-11.jpg", alt: "Shivani smiling at Avdhesh", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-12.jpg", alt: "The couple holding hands", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-13.jpg", alt: "Shivani's reflection in a mirror", w: 1800, h: 1200, focus: "center 25%" },
    { src: "images/gallery/photo-14.jpg", alt: "Avdhesh standing in a mustard field", w: 1200, h: 1800, focus: "center 25%" }
  ],

  /* Full-width highlight photo ("A Beautiful Beginning"). */
  highlight: {
    src: "images/gallery/highlight.jpg",
    position: "center 28%"        // focus point (faces kept in frame)
  },

  /* RSVP destination. Paste your Google Apps Script web-app URL here
     (steps in SETUP-RSVP.md) so replies land in your Google Sheet.
     A Formspree-style JSON endpoint also works.
     Leave empty and the form will NOT claim to save anything — it lets the
     guest copy their reply to send by WhatsApp/message instead. */
  rsvp: { endpoint: "https://script.google.com/macros/s/AKfycbzFeIp5oGsdKuwgqR1ZsHhjE2yuKDHVSbA2bmpgt2v6ZFPB1ye6xEtLmLWCtl-Xn3qk/exec" }
};
