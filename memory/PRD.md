# Workshop Industri Purworejo — Landing Page

## Original Problem
Build a high-converting property landing page in React (single JSX file) for an industrial workshop listing in Indonesia. Goal: Generate WhatsApp leads from serious buyers. Every design decision must push toward the WA CTA.

## Property Snapshot
- Title: Workshop Industri Kayu Dijual Purworejo — Pinggir Jalan Nasional
- Price: Rp 6.000.000.000 (Nego)
- WA: 089619093961
- Maps: https://maps.app.goo.gl/UoxXgQaUYQFShvFi6
- Specs: LT 2.893m² · LB 1.000m² · SHM Tangan Pertama · Listrik 35kVA · 3 Oven Kiln Dry · Akses Jalan Nasional (40ft)

## User Personas
1. Pengusaha mebel ekspor butuh kapasitas oven & akses kontainer
2. Pengusaha kayu olahan ingin scale-up produksi
3. Investor properti industri di pinggir jalan nasional
4. Pemilik pabrik existing yang mau ekspansi tanpa konstruksi baru

## Core Requirements (Static)
- Single JSX file (`/app/frontend/src/App.js`) — no Tailwind, inline styles + style tag
- Color: bg #111 / accent #C8860A / text #F5F0EB
- Fonts: Playfair Display (heading) + Inter (body) via Google Fonts
- Pure JS Intersection Observer fade-in
- All CTAs lead to WhatsApp deeplink (no form)
- Mobile sticky bottom bar
- Premium industrial feel — bukan iklan murahan

## What's Been Implemented (2025-12-10)
- [x] SEO: lang=id, title, meta description, OG tags (now with real workshop photo), Twitter card
- [x] JSON-LD: RealEstateListing schema + FAQPage schema
- [x] Hero: dark bg + real workshop interior photo overlay, H1 keyword-rich, price badge, 2 CTAs (WA primary + Maps secondary), 3 trust badges, quick-stats glassmorphism strip
- [x] Pain → Solution → CTA conversion flow above the fold
- [x] "Kenapa Ini Berbeda" — 3 cards (Oven Kiln Dry, Listrik 35kVA, Jalan Nasional) with stat highlights
- [x] **Galeri Aset** — 5-photo bento grid: Workshop kayu (large feature) + Halaman Depan + Jalan Nasional III + Area Produksi 1.000m² + Site Plan resmi. Hover zoom, click-to-enlarge, accent numbered indicator
- [x] Spesifikasi — 10-row clean 2-column table with sidebar copy + WA CTA
- [x] Untuk Siapa — 4 persona cards with icons + numbered indices
- [x] Objection Handler — 4-question accordion FAQ
- [x] Lokasi — Google Maps iframe embed + address card with travel times + open-in-Maps CTA
- [x] CTA Final — full-width amber section, big dark button, phone tel: link, trust badges
- [x] Sticky bottom bar mobile only (≤768px) with WA deeplink
- [x] Footer with WA + Maps links
- [x] Subtle "Penawaran serius dilayani langsung" honest urgency (no fake countdown)
- [x] CTA pulse animation on primary buttons
- [x] Subtle grain texture overlay on hero & final CTA
- [x] **Foto asli workshop terpasang** (5 foto): hero + gallery + OG/JSON-LD image

## Files Touched
- `/app/frontend/public/index.html` — SEO meta, JSON-LD, fonts
- `/app/frontend/src/App.js` — single-file landing page
- `/app/frontend/src/App.css` — minimal stub (inline styles used)

## Backlog / Next Items
- P0: Replace Unsplash placeholders with real workshop photos (user akan kirim)
- P1: Tambah photo gallery section (3-6 foto kondisi workshop, oven, jalan akses) — high-impact for conversion
- P1: Lead-tracking — UTM-tagged WA links untuk tau channel mana yang convert (FB Ads vs Google vs OLX)
- P2: A/B test headline alternatif ("Workshop Siap Pakai" vs "Workshop Kayu Dijual")
- P2: Add testimonial/reference section kalau owner bisa berikan
- P2: Hosting pada custom domain dengan SSL (workshop-purworejo.com atau sejenisnya) untuk OG preview WA yang clean
- P2: Schema markup tambahan untuk LocalBusiness/Organization

## Tech Notes
- No backend used — pure frontend single-page
- No 3rd party SDK — Google Maps via public iframe embed
- React 19 + craco + lucide-react icons
- Hot reload tested on https://f3055078-4bbf-4435-85d7-f0d16dce8066.preview.emergentagent.com/
