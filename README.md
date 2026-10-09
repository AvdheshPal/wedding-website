# Avdhesh & Shivani — Wedding Invitation

Plain HTML/CSS/JS. No build step. Open `index.html` in a browser (or run `python3 -m http.server` here).

## Your photos (never overwritten by the site)
- `images/events/tilak.jpg`, `sangeet.jpg`, `barat.jpg` — event card photos (tilak/barat are low-res crops from your reference; sangeet is empty until you add one)
- `images/gallery/photo-01.jpg … photo-14.jpg` — your engagement photos (already added; list + sizes in `js/config.js`, photo-08 is the wide "A Beautiful Beginning" photo, saved as `highlight.jpg`)
- Our Journey photos reuse gallery photos; change them in `story` in `js/config.js`
- `images/ganesha.png` — optional transparent Ganesha image for the hero (hidden if absent)
Missing photos show an elegant placeholder; once any gallery photo exists, empty slots hide.

## Edit content: `js/config.js`
Names, events, addresses, story text, countdown target, RSVP.
- Countdown defaults to **00:00 IST on 12 Dec 2026** because no ceremony time was given. Change `countdownTarget`.
- Story text is placeholder — replace with your own.

## RSVP
There is no backend. Until you set `rsvp.endpoint` in `config.js` (e.g. a Formspree URL accepting JSON POST), the form saves nothing and says so, letting guests copy their reply to send by WhatsApp.

## Notes
Fonts load from Google Fonts (needs internet); fallbacks are included. Map buttons use Google Maps search URLs built from venue + address.

## Kids' special invitation
Optional photos: `images/kids/advik.jpg`, `ayansh.jpg`, `devansh.jpg` (square-ish photos work best, faces in the upper half). Emojis show until you add them. Text lives in `kids` in `js/config.js`.

