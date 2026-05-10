import { useEffect, useRef, useState } from "react";
import {
  Phone,
  MapPin,
  Zap,
  Flame,
  Truck,
  ChevronDown,
  ShieldCheck,
  BadgeCheck,
  Award,
  Factory,
  Hammer,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Check,
  ExternalLink,
} from "lucide-react";

/* =========================================================
   PROPERTY CONSTANTS
   ========================================================= */
const WA_LINK =
  "https://wa.me/6289619093961?text=Halo,%20saya%20tertarik%20dengan%20workshop%20kayu%20Purworejo";
const PHONE_DISPLAY = "0896 1909 3961";
const PHONE_TEL = "tel:+6289619093961";
const MAPS_LINK = "https://maps.app.goo.gl/UoxXgQaUYQFShvFi6";
const MAPS_EMBED =
  "https://maps.google.com/maps?q=Purworejo,+Jawa+Tengah,+Indonesia&t=&z=13&ie=UTF8&iwloc=&output=embed";

/* Real workshop photos (artifacts) */
const PHOTO_WORKSHOP_KAYU =
  "https://customer-assets.emergentagent.com/job_kayu-kiln-purworejo/artifacts/8t6yifyw_workshop-kayu-oven-kiln-dry-purworejo-jateng.jpg";
const PHOTO_HALAMAN_DEPAN =
  "https://customer-assets.emergentagent.com/job_kayu-kiln-purworejo/artifacts/sz3taxb8_pabrik-furniture-bekas-purworejo-shm-halaman-depan.jpeg";
const PHOTO_JALAN_UTAMA =
  "https://customer-assets.emergentagent.com/job_kayu-kiln-purworejo/artifacts/y5xza0dn_jalan-utama-pabrik-furniture-purworejo.png";
const PHOTO_AREA_PRODUKSI =
  "https://customer-assets.emergentagent.com/job_kayu-kiln-purworejo/artifacts/rnwxsdh1_workshop-industri-furniture-dijual-purworejo.jpg.jpeg";
const PHOTO_SITE_PLAN =
  "https://customer-assets.emergentagent.com/job_kayu-kiln-purworejo/artifacts/0ah6uzjz_peta-gudang-industri-shm-35kva-candisari-purworejo.jpeg";

const HERO_PHOTO = PHOTO_WORKSHOP_KAYU;

const GALLERY = [
  {
    src: PHOTO_WORKSHOP_KAYU,
    title: "Workshop Aktif Kayu Olahan",
    caption:
      "Area produksi utama — stok kayu olahan, mesin band saw, planer & sander on-site",
    span: "large",
  },
  {
    src: PHOTO_HALAMAN_DEPAN,
    title: "Halaman Depan SHM",
    caption: "Gerbang & halaman bongkar muat — cukup untuk maneuver kontainer",
  },
  {
    src: PHOTO_JALAN_UTAMA,
    title: "Pinggir Jalan Nasional III",
    caption: "Akses langsung — kontainer 40ft lewat tanpa hambatan",
  },
  {
    src: PHOTO_AREA_PRODUKSI,
    title: "Area Produksi 1.000m²",
    caption: "Bangunan utama: struktur baja, atap tinggi, lantai cor",
  },
  {
    src: PHOTO_SITE_PLAN,
    title: "Site Plan Resmi",
    caption: "Layout tanah 2.893m² menghadap Jalan Nasional III",
  },
];

/* =========================================================
   COLOR TOKENS
   ========================================================= */
const C = {
  bg: "#111111",
  bgDeep: "#0a0a0a",
  bgPanel: "#1a1715",
  accent: "#C8860A",
  accentHi: "#E0A332",
  accentDeep: "#9A6608",
  text: "#F5F0EB",
  textMuted: "#a8a29e",
  border: "rgba(245, 240, 235, 0.08)",
  borderStrong: "rgba(245, 240, 235, 0.16)",
};

/* =========================================================
   IN-VIEW HOOK (Intersection Observer)
   ========================================================= */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, seen];
}

const Reveal = ({ children, delay = 0, as: Tag = "div", style, ...rest }) => {
  const [ref, seen] = useInView(0.12);
  return (
    <Tag
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/* =========================================================
   GLOBAL STYLE TAG
   ========================================================= */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { margin: 0; padding: 0; background: ${C.bg}; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: ${C.text};
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.6;
      overflow-x: hidden;
    }
    h1, h2, h3, h4 {
      font-family: 'Playfair Display', Georgia, serif;
      font-weight: 700;
      letter-spacing: -0.01em;
      line-height: 1.1;
      margin: 0;
    }
    p { margin: 0; }
    a { color: inherit; text-decoration: none; }
    button { font-family: inherit; cursor: pointer; border: none; background: none; }

    ::selection { background: ${C.accent}; color: ${C.bg}; }

    /* Subtle grain overlay */
    .grain::after {
      content: '';
      position: absolute; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.06;
      pointer-events: none;
      mix-blend-mode: overlay;
    }

    /* CTA pulse */
    @keyframes pulseAmber {
      0%, 100% { box-shadow: 0 0 0 0 rgba(200, 134, 10, 0.55); }
      50% { box-shadow: 0 0 0 14px rgba(200, 134, 10, 0); }
    }
    .cta-pulse { animation: pulseAmber 2.4s ease-out infinite; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Hover & focus */
    .btn-primary:hover { background: ${C.accentHi}; transform: translateY(-2px); }
    .btn-primary:active { transform: translateY(0); }
    .btn-secondary:hover { border-color: ${C.accent}; color: ${C.accent}; }
    .link-underline { position: relative; }
    .link-underline::after {
      content: ''; position: absolute; left: 0; bottom: -2px; height: 1px; width: 100%;
      background: currentColor; transform: scaleX(0); transform-origin: left;
      transition: transform 300ms ease;
    }
    .link-underline:hover::after { transform: scaleX(1); }

    .card-hover { transition: transform 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms ease, background 400ms ease; }
    .card-hover:hover { transform: translateY(-4px); border-color: ${C.accent}; background: rgba(200, 134, 10, 0.05); }

    .faq-item { transition: background 300ms ease; }
    .faq-item:hover { background: rgba(200, 134, 10, 0.04); }

    /* Mobile sticky bar visibility */
    .sticky-mobile { display: none; }
    @media (max-width: 768px) {
      .sticky-mobile { display: flex; }
      .desktop-only { display: none !important; }
      body { padding-bottom: 76px; }
    }
    @media (min-width: 769px) {
      .mobile-only { display: none !important; }
    }

    /* Hero fade-in (no-JS friendly) */
    .hero-anim > * {
      animation: slideUp 1100ms cubic-bezier(0.22,1,0.36,1) both;
    }
    .hero-anim > *:nth-child(1) { animation-delay: 100ms; }
    .hero-anim > *:nth-child(2) { animation-delay: 250ms; }
    .hero-anim > *:nth-child(3) { animation-delay: 400ms; }
    .hero-anim > *:nth-child(4) { animation-delay: 550ms; }
    .hero-anim > *:nth-child(5) { animation-delay: 700ms; }
    .hero-anim > *:nth-child(6) { animation-delay: 850ms; }
  `}</style>
);

/* =========================================================
   REUSABLE PIECES
   ========================================================= */
const TrustBadge = ({ icon: Icon, label, testId }) => (
  <div
    data-testid={testId}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 999,
      background: "rgba(200, 134, 10, 0.08)",
      border: `1px solid rgba(200, 134, 10, 0.28)`,
      color: C.text,
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: "nowrap",
    }}
  >
    <Icon size={15} strokeWidth={2} color={C.accent} />
    <span>{label}</span>
  </div>
);

const SectionLabel = ({ children }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: C.accent,
      marginBottom: 20,
    }}
  >
    <span
      style={{
        display: "inline-block",
        width: 32,
        height: 1,
        background: C.accent,
      }}
    />
    {children}
  </div>
);

/* =========================================================
   FAQ ITEM (Accordion)
   ========================================================= */
const FaqItem = ({ q, a, isOpen, onToggle, index }) => (
  <div
    className="faq-item"
    style={{
      borderTop: `1px solid ${C.border}`,
      borderBottom: index === 3 ? `1px solid ${C.border}` : "none",
    }}
  >
    <button
      data-testid={`faq-toggle-${index}`}
      onClick={onToggle}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        padding: "28px 0",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
        textAlign: "left",
        color: C.text,
      }}
    >
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 600,
          lineHeight: 1.35,
          paddingRight: 16,
        }}
      >
        {q}
      </span>
      <span
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 999,
          border: `1px solid ${isOpen ? C.accent : C.borderStrong}`,
          background: isOpen ? C.accent : "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 300ms ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <ChevronDown
          size={18}
          color={isOpen ? C.bg : C.text}
          strokeWidth={2.2}
        />
      </span>
    </button>
    <div
      style={{
        maxHeight: isOpen ? 400 : 0,
        overflow: "hidden",
        transition: "max-height 500ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <p
        data-testid={`faq-answer-${index}`}
        style={{
          fontSize: 16,
          lineHeight: 1.75,
          color: C.textMuted,
          paddingBottom: 28,
          paddingRight: 56,
          maxWidth: 760,
        }}
      >
        {a}
      </p>
    </div>
  </div>
);

/* =========================================================
   FAQ DATA
   ========================================================= */
const FAQS = [
  {
    q: "Kenapa workshop ini dijual? Apakah ada masalah?",
    a: "Tidak ada masalah pada aset. Pemilik fokus diversifikasi bisnis ke sektor lain. Semua dokumen lengkap (SHM Tangan Pertama), aset siap pakai, mesin oven kiln dry kondisi prima. Silakan datang langsung untuk verifikasi fisik.",
  },
  {
    q: "Apakah harga 6 Miliar bisa dinegosiasi?",
    a: "Sangat bisa. Harga listing 6M dengan status Nego untuk pembeli serius. Silakan hubungi langsung owner via WhatsApp untuk pembahasan harga dan terms pembayaran — bisa cash atau bertahap dengan jaminan yang wajar.",
  },
  {
    q: "Apakah workshop siap pakai untuk produksi langsung?",
    a: "Ya. Listrik 35kVA sudah terpasang dan aktif, 3 ruang oven kiln dry siap operasi, kantor dan 2 kamar mandi tersedia, akses jalan nasional bisa dilewati kontainer 40ft. Pembeli bisa mulai produksi tanpa biaya konstruksi tambahan.",
  },
  {
    q: "Bagaimana proses pembayaran dan balik nama sertifikat?",
    a: "Transaksi melalui Notaris/PPAT terpercaya. SHM Tangan Pertama atas nama owner langsung memudahkan proses balik nama tanpa rantai panjang. Biaya BPHTB dan PPh sesuai ketentuan pemerintah, dapat dibahas saat kunjungan ke lokasi.",
  },
];

/* =========================================================
   SECTION: HERO
   ========================================================= */
const Hero = () => (
  <section
    data-testid="hero-section"
    style={{
      position: "relative",
      minHeight: "100vh",
      background: C.bg,
      overflow: "hidden",
      paddingTop: 28,
      paddingBottom: 60,
    }}
  >
    {/* Photo with dark overlay — split-screen feel on desktop */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `linear-gradient(90deg, ${C.bg} 0%, ${C.bg} 35%, rgba(17,17,17,0.85) 55%, rgba(17,17,17,0.5) 100%), url(${HERO_PHOTO})`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        backgroundRepeat: "no-repeat",
      }}
    />
    {/* Mobile darker overlay */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.85) 100%)`,
        display: "none",
      }}
      className="mobile-overlay"
    />
    <div
      className="grain"
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    />

    {/* Top bar */}
    <div
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 clamp(20px, 5vw, 64px)",
      }}
    >
      <div
        data-testid="brand-logo"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        <Factory size={20} color={C.accent} />
        <span>Workshop Industri Purworejo</span>
      </div>
      <a
        data-testid="hero-top-wa"
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline desktop-only"
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: C.text,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Phone size={14} />
        {PHONE_DISPLAY}
      </a>
    </div>

    {/* Main content */}
    <div
      style={{
        position: "relative",
        zIndex: 5,
        maxWidth: 1280,
        margin: "0 auto",
        padding: "clamp(48px, 8vh, 100px) clamp(20px, 5vw, 64px) 0",
      }}
    >
      <div className="hero-anim" style={{ maxWidth: 760 }}>
        {/* Eyebrow / pain hook */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(200, 134, 10, 0.1)",
            border: `1px solid rgba(200, 134, 10, 0.3)`,
            color: C.accent,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: C.accent,
            }}
          />
          Dijual Langsung Owner — SHM Tangan Pertama
        </div>

        {/* H1 */}
        <h1
          data-testid="hero-h1"
          style={{
            fontSize: "clamp(40px, 6.5vw, 78px)",
            fontWeight: 800,
            color: C.text,
            marginBottom: 24,
            lineHeight: 1.02,
          }}
        >
          Workshop Kayu Dijual{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: C.accent,
            }}
          >
            Purworejo
          </em>{" "}
          <br />
          Pinggir Jalan Nasional
        </h1>

        {/* Pain → Solution */}
        <p
          style={{
            fontSize: "clamp(16px, 1.5vw, 19px)",
            color: C.textMuted,
            maxWidth: 620,
            marginBottom: 14,
            lineHeight: 1.65,
          }}
        >
          <strong style={{ color: C.text, fontWeight: 600 }}>
            Butuh ekspansi produksi? Bangun pabrik baru itu mahal dan lama.
          </strong>{" "}
          Workshop ini sudah punya semua infrastruktur yang kamu butuhkan —
          listrik 35kVA, 3 oven kiln dry, akses kontainer 40ft.
        </p>

        {/* Price */}
        <div
          data-testid="hero-price"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 14,
            margin: "36px 0 32px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: C.textMuted,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 600,
            }}
          >
            Harga Listing
          </span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: C.text,
              lineHeight: 1,
            }}
          >
            Rp 6.000.000.000
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: C.accent,
              padding: "4px 12px",
              borderRadius: 999,
              background: "rgba(200, 134, 10, 0.12)",
              border: `1px solid rgba(200, 134, 10, 0.4)`,
              alignSelf: "center",
            }}
          >
            Nego
          </span>
        </div>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          <a
            data-testid="hero-cta-wa"
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary cta-pulse"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 32px",
              background: C.accent,
              color: C.bg,
              fontSize: 16,
              fontWeight: 700,
              borderRadius: 999,
              transition: "all 300ms ease",
            }}
          >
            <Phone size={18} strokeWidth={2.5} />
            Tanya Sekarang via WhatsApp
            <ArrowRight size={18} strokeWidth={2.5} />
          </a>
          <a
            data-testid="hero-cta-maps"
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "18px 28px",
              background: "transparent",
              color: C.text,
              fontSize: 16,
              fontWeight: 500,
              border: `1px solid ${C.borderStrong}`,
              borderRadius: 999,
              transition: "all 300ms ease",
            }}
          >
            <MapPin size={18} />
            Lihat di Google Maps
          </a>
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <TrustBadge
            icon={ShieldCheck}
            label="SHM Tangan Pertama"
            testId="badge-shm"
          />
          <TrustBadge
            icon={BadgeCheck}
            label="Langsung Owner"
            testId="badge-owner"
          />
          <TrustBadge
            icon={MapPin}
            label="Lokasi Terverifikasi Google Maps"
            testId="badge-maps"
          />
        </div>
      </div>

      {/* Quick stats strip */}
      <div
        data-testid="hero-quickstats"
        style={{
          marginTop: "clamp(60px, 10vh, 100px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 0,
          background: "rgba(245, 240, 235, 0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${C.border}`,
          borderRadius: 4,
          overflow: "hidden",
          maxWidth: 920,
        }}
      >
        {[
          { v: "2.893", u: "m²", l: "Luas Tanah" },
          { v: "1.000", u: "m²", l: "Luas Bangunan" },
          { v: "35", u: "kVA", l: "Listrik" },
          { v: "3", u: "Unit", l: "Oven Kiln Dry" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              padding: "22px 24px",
              borderRight: i < 3 ? `1px solid ${C.border}` : "none",
              borderBottom: `1px solid transparent`,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 32,
                fontWeight: 700,
                color: C.text,
                lineHeight: 1,
              }}
            >
              {s.v}
              <span
                style={{
                  fontSize: 14,
                  marginLeft: 4,
                  color: C.accent,
                  fontWeight: 500,
                }}
              >
                {s.u}
              </span>
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 12,
                color: C.textMuted,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 600,
              }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll cue */}
    <div
      aria-hidden
      style={{
        position: "absolute",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 5,
        fontSize: 11,
        color: C.textMuted,
        textTransform: "uppercase",
        letterSpacing: "0.2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
      className="desktop-only"
    >
      Geser ke bawah
      <ChevronDown size={14} />
    </div>
  </section>
);

/* =========================================================
   SECTION: WHY DIFFERENT (3 cards)
   ========================================================= */
const WhyDifferent = () => {
  const cards = [
    {
      icon: Flame,
      title: "3 Ruang Oven Kiln Dry",
      desc: "Pengeringan kayu industrial-grade — siap untuk produksi mebel ekspor, parket, atau kayu olahan premium. Hemat investasi Rp 1,2M+ untuk membangun dari nol.",
      stat: "Rp 1,2M+",
      statLabel: "Nilai oven terpasang",
    },
    {
      icon: Zap,
      title: "Listrik 35 kVA Aktif",
      desc: "Kapasitas industri penuh — cukup untuk mesin planer, band saw, sander, oven, dan kompresor sekaligus. Tidak perlu antri PLN berbulan-bulan.",
      stat: "35 kVA",
      statLabel: "Daya terpasang",
    },
    {
      icon: Truck,
      title: "Akses Jalan Nasional",
      desc: "Pinggir jalan nasional — kontainer 40ft bisa langsung masuk halaman. Logistik ekspor lebih murah, faster turnaround, kurangi biaya bongkar muat.",
      stat: "40 ft",
      statLabel: "Kontainer langsung",
    },
  ];
  return (
    <section
      data-testid="why-different-section"
      style={{
        background: C.bgDeep,
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Kenapa Workshop Ini Berbeda</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              maxWidth: 760,
              marginBottom: 64,
            }}
          >
            Bukan{" "}
            <em style={{ fontStyle: "italic", color: C.accent, fontWeight: 500 }}>
              gudang kosong
            </em>{" "}
            — ini infrastruktur pabrik yang sudah jalan.
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                data-testid={`why-card-${i}`}
                className="card-hover"
                style={{
                  height: "100%",
                  padding: "36px 32px 32px",
                  background: C.bgPanel,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 4,
                    background: "rgba(200, 134, 10, 0.1)",
                    border: `1px solid rgba(200, 134, 10, 0.25)`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 28,
                  }}
                >
                  <c.icon size={26} color={C.accent} strokeWidth={1.8} />
                </div>
                <h3
                  style={{
                    fontSize: 26,
                    marginBottom: 14,
                    color: C.text,
                  }}
                >
                  {c.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    color: C.textMuted,
                    lineHeight: 1.7,
                    marginBottom: 28,
                    flexGrow: 1,
                  }}
                >
                  {c.desc}
                </p>
                <div
                  style={{
                    paddingTop: 20,
                    borderTop: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "baseline",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: C.accent,
                    }}
                  >
                    {c.stat}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 600,
                    }}
                  >
                    {c.statLabel}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SECTION: GALLERY (Bento)
   ========================================================= */
const Gallery = () => (
  <section
    data-testid="gallery-section"
    style={{
      background: C.bg,
      padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
    }}
  >
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 24,
          marginBottom: 48,
        }}
      >
        <div>
          <Reveal>
            <SectionLabel>Galeri Aset</SectionLabel>
          </Reveal>
          <Reveal delay={100}>
            <h2
              style={{
                fontSize: "clamp(32px, 4.5vw, 56px)",
                maxWidth: 760,
              }}
            >
              Lihat sendiri{" "}
              <em
                style={{
                  fontStyle: "italic",
                  color: C.accent,
                  fontWeight: 500,
                }}
              >
                kondisi nyata
              </em>{" "}
              workshop hari ini.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p
            style={{
              fontSize: 14,
              color: C.textMuted,
              maxWidth: 320,
              lineHeight: 1.7,
            }}
          >
            Foto on-site terbaru. Kunjungan langsung dipersilakan kapan saja
            untuk verifikasi fisik dan dokumen.
          </p>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "minmax(220px, 32vh) minmax(220px, 32vh)",
            gap: 12,
          }}
        >
          {GALLERY.map((g, i) => (
            <a
              key={i}
              data-testid={`gallery-item-${i}`}
              href={g.src}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-item"
              style={{
                position: "relative",
                gridColumn: g.span === "large" ? "span 2" : "span 1",
                gridRow: g.span === "large" ? "span 2" : "span 1",
                overflow: "hidden",
                borderRadius: 4,
                border: `1px solid ${C.border}`,
                background: C.bgPanel,
                cursor: "zoom-in",
                display: "block",
              }}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 800ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.4) 45%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: g.span === "large" ? "28px 28px 24px" : "18px 18px 16px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: C.accent,
                    }}
                  />
                  {String(i + 1).padStart(2, "0")} / {GALLERY.length}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: g.span === "large" ? "clamp(22px, 2.4vw, 30px)" : 18,
                    color: C.text,
                    fontWeight: 600,
                    marginBottom: 6,
                    lineHeight: 1.2,
                  }}
                >
                  {g.title}
                </h3>
                <p
                  style={{
                    fontSize: g.span === "large" ? 14 : 12.5,
                    color: C.textMuted,
                    lineHeight: 1.5,
                    maxWidth: 480,
                  }}
                >
                  {g.caption}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal delay={300}>
        <p
          style={{
            marginTop: 32,
            fontSize: 13,
            color: C.textMuted,
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Klik foto untuk perbesar — atau langsung WA kami untuk request foto
          tambahan & video walkthrough.
        </p>
      </Reveal>
    </div>

    <style>{`
      .gallery-item:hover img { transform: scale(1.05); }
      @media (max-width: 900px) {
        .bento-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          grid-template-rows: auto !important;
        }
        .bento-grid > a { grid-column: span 1 !important; grid-row: auto !important; min-height: 180px; }
        .bento-grid > a:first-child { grid-column: span 2 !important; min-height: 240px; }
      }
    `}</style>
  </section>
);

/* =========================================================
   SECTION: SPECS
   ========================================================= */
const Specs = () => {
  const specs = [
    { label: "Luas Tanah", value: "2.893 m²" },
    { label: "Luas Bangunan", value: "1.000 m²" },
    { label: "Sertifikat", value: "SHM Tangan Pertama" },
    { label: "Listrik", value: "35 kVA (Industri)" },
    { label: "Oven Kiln Dry", value: "3 Ruang Aktif" },
    { label: "Kantor & Fasilitas", value: "Kantor + 2 KM" },
    { label: "Akses Jalan", value: "Jalan Nasional (40ft)" },
    { label: "Status Lahan", value: "Non Lahan Hijau" },
    { label: "Lokasi", value: "Purworejo, Jawa Tengah" },
    { label: "Hadap", value: "Pinggir Jalan Utama" },
  ];

  return (
    <section
      data-testid="specs-section"
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(260px, 1fr) 2fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="specs-grid"
        >
          <div>
            <Reveal>
              <SectionLabel>Spesifikasi Aset</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  marginBottom: 20,
                }}
              >
                Detail teknis yang penting buat bisnis kamu.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p
                style={{
                  fontSize: 15,
                  color: C.textMuted,
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                Semua angka di bawah ini bisa diverifikasi langsung saat kunjungan
                ke lokasi. Dokumen SHM, IMB, dan tagihan listrik tersedia untuk
                pemeriksaan.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <a
                data-testid="specs-cta-wa"
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.accent,
                }}
              >
                Minta dokumen lengkap via WA
                <ArrowRight size={16} />
              </a>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 4,
                overflow: "hidden",
                background: C.bgPanel,
              }}
            >
              {specs.map((s, i) => (
                <div
                  key={i}
                  data-testid={`spec-row-${i}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    padding: "20px 24px",
                    borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
                    transition: "background 200ms ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      fontWeight: 600,
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      color: C.text,
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .specs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================
   SECTION: PERSONA (Untuk Siapa)
   ========================================================= */
const Personas = () => {
  const personas = [
    {
      icon: Factory,
      title: "Pengusaha Mebel Ekspor",
      desc: "Butuh kapasitas oven kiln dry & akses kontainer 40ft? Workshop ini langsung siap kirim ke pelabuhan Semarang.",
    },
    {
      icon: Hammer,
      title: "Pengusaha Kayu Olahan",
      desc: "Mau scale-up produksi parket, decking, atau papan? 35kVA + 3 oven = produksi konsisten sepanjang tahun.",
    },
    {
      icon: TrendingUp,
      title: "Investor Properti Industri",
      desc: "LT 2.893m² SHM di pinggir jalan nasional Purworejo — appreciate value tinggi, atau disewakan ke operator pabrik.",
    },
    {
      icon: Briefcase,
      title: "Pemilik Pabrik Mau Ekspansi",
      desc: "Skip tahap perizinan, konstruksi, dan instalasi listrik. Take over → renovasi minor → mulai produksi 30 hari.",
    },
  ];

  return (
    <section
      data-testid="persona-section"
      style={{
        background: C.bgDeep,
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <Reveal>
          <SectionLabel>Untuk Siapa Workshop Ini</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontSize: "clamp(32px, 4.5vw, 56px)",
              maxWidth: 820,
              marginBottom: 64,
            }}
          >
            Cocok kalau kamu salah satu dari{" "}
            <em style={{ fontStyle: "italic", color: C.accent, fontWeight: 500 }}>
              4 profil
            </em>{" "}
            ini.
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {personas.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                data-testid={`persona-card-${i}`}
                className="card-hover"
                style={{
                  height: "100%",
                  padding: "32px 28px",
                  background: C.bgPanel,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 4,
                      background: "rgba(200, 134, 10, 0.1)",
                      border: `1px solid rgba(200, 134, 10, 0.25)`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p.icon size={22} color={C.accent} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 13,
                      color: C.accent,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 style={{ fontSize: 22, marginBottom: 12, color: C.text }}>
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14.5,
                    color: C.textMuted,
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   SECTION: FAQ (Objection Handler)
   ========================================================= */
const FAQ = () => {
  const [open, setOpen] = useState(0);
  return (
    <section
      data-testid="faq-section"
      style={{
        background: C.bg,
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 380px) 1fr",
            gap: "clamp(40px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="faq-grid"
        >
          <div>
            <Reveal>
              <SectionLabel>Pertanyaan Umum Buyer</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2
                style={{
                  fontSize: "clamp(30px, 4vw, 48px)",
                  marginBottom: 24,
                }}
              >
                Sebelum kamu hubungi, mungkin{" "}
                <em
                  style={{ fontStyle: "italic", color: C.accent, fontWeight: 500 }}
                >
                  ini
                </em>{" "}
                jawabannya.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p
                style={{
                  fontSize: 15,
                  color: C.textMuted,
                  lineHeight: 1.7,
                }}
              >
                Pertanyaan paling sering muncul dari calon pembeli serius. Kalau
                ada yang masih kurang jelas, langsung tanya owner via WA — kami
                respon dalam jam kerja.
              </p>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div data-testid="faq-list">
              {FAQS.map((f, i) => (
                <FaqItem
                  key={i}
                  index={i}
                  q={f.q}
                  a={f.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

/* =========================================================
   SECTION: LOCATION
   ========================================================= */
const Location = () => (
  <section
    data-testid="location-section"
    style={{
      background: C.bgDeep,
      padding: "clamp(80px, 12vh, 140px) clamp(20px, 5vw, 64px)",
    }}
  >
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <Reveal>
        <SectionLabel>Lokasi & Akses</SectionLabel>
      </Reveal>
      <Reveal delay={100}>
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            maxWidth: 720,
            marginBottom: 16,
          }}
        >
          Pinggir jalan nasional Purworejo,{" "}
          <em style={{ fontStyle: "italic", color: C.accent, fontWeight: 500 }}>
            Jawa Tengah
          </em>
          .
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <p
          style={{
            fontSize: 16,
            color: C.textMuted,
            lineHeight: 1.7,
            maxWidth: 640,
            marginBottom: 40,
          }}
        >
          Strategis untuk distribusi Jawa Tengah & Yogyakarta. Akses tol Trans
          Jawa & Pelabuhan Tanjung Emas Semarang dapat ditempuh dalam 2 jam.
        </p>
      </Reveal>

      <Reveal delay={250}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 24,
            alignItems: "stretch",
          }}
          className="loc-grid"
        >
          <div
            style={{
              borderRadius: 4,
              overflow: "hidden",
              border: `1px solid ${C.borderStrong}`,
              minHeight: 420,
              position: "relative",
              background: C.bgPanel,
            }}
          >
            <iframe
              data-testid="location-map"
              title="Lokasi Workshop Purworejo"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                width: "100%",
                height: "100%",
                minHeight: 420,
                border: 0,
                filter: "grayscale(0.3) contrast(1.05)",
              }}
            />
          </div>

          <div
            style={{
              padding: "32px 28px",
              background: C.bgPanel,
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  color: C.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  fontWeight: 600,
                  marginBottom: 10,
                }}
              >
                Alamat
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: C.text,
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                Pinggir Jalan Nasional, Purworejo, Jawa Tengah, Indonesia
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingTop: 20,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {[
                { l: "Jakarta", v: "± 8 jam" },
                { l: "Semarang (Pelabuhan)", v: "± 2 jam" },
                { l: "Yogyakarta", v: "± 1,5 jam" },
                { l: "Tol Trans Jawa", v: "± 30 menit" },
              ].map((d, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: C.textMuted }}>{d.l}</span>
                  <span style={{ color: C.text, fontWeight: 600 }}>{d.v}</span>
                </div>
              ))}
            </div>

            <a
              data-testid="location-cta-maps"
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{
                marginTop: "auto",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px 22px",
                background: "transparent",
                color: C.text,
                fontSize: 14,
                fontWeight: 600,
                border: `1px solid ${C.borderStrong}`,
                borderRadius: 999,
                transition: "all 300ms ease",
              }}
            >
              Buka di Google Maps
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </Reveal>
    </div>

    <style>{`
      @media (max-width: 900px) {
        .loc-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

/* =========================================================
   SECTION: FINAL CTA
   ========================================================= */
const FinalCta = () => (
  <section
    data-testid="final-cta-section"
    style={{
      background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDeep} 100%)`,
      color: C.bg,
      padding: "clamp(80px, 14vh, 160px) clamp(20px, 5vw, 64px)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      className="grain"
      aria-hidden
      style={{ position: "absolute", inset: 0, opacity: 0.4 }}
    />

    <div
      style={{
        maxWidth: 1080,
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
        textAlign: "center",
      }}
    >
      <Reveal>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            borderRadius: 999,
            background: "rgba(17, 17, 17, 0.18)",
            border: "1px solid rgba(17, 17, 17, 0.28)",
            color: C.bg,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: C.bg,
            }}
          />
          Penawaran Serius Dilayani Langsung
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            color: C.bg,
            marginBottom: 24,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          Mari bicara langsung —
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 500 }}>
            owner siap diskusi
          </em>
          .
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p
          style={{
            fontSize: "clamp(16px, 1.6vw, 19px)",
            color: "rgba(17, 17, 17, 0.78)",
            maxWidth: 640,
            margin: "0 auto 48px",
            lineHeight: 1.6,
          }}
        >
          Kami tidak pakai countdown palsu. Aset ini akan tetap dijual sampai
          ketemu pembeli yang cocok. Kalau kamu serius, langsung WA — kami balas
          personal, bukan bot.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <a
          data-testid="final-cta-wa"
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "22px 40px",
            background: C.bg,
            color: C.text,
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 999,
            transition: "all 300ms ease",
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.35)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow =
              "0 28px 50px -10px rgba(0,0,0,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 20px 40px -10px rgba(0,0,0,0.35)";
          }}
        >
          <Phone size={20} strokeWidth={2.5} />
          Tanya Sekarang via WhatsApp
          <ArrowRight size={20} strokeWidth={2.5} />
        </a>
      </Reveal>

      <Reveal delay={400}>
        <div
          style={{
            marginTop: 28,
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            color: C.bg,
            fontWeight: 600,
          }}
        >
          <a
            data-testid="final-phone-link"
            href={PHONE_TEL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              borderBottom: "1px solid rgba(17,17,17,0.4)",
              paddingBottom: 4,
            }}
          >
            <Phone size={18} />
            {PHONE_DISPLAY}
          </a>
        </div>
      </Reveal>

      <Reveal delay={500}>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {[
            { i: ShieldCheck, t: "SHM Tangan Pertama" },
            { i: BadgeCheck, t: "Langsung Owner" },
            { i: Award, t: "Lokasi Terverifikasi" },
          ].map((b, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                background: "rgba(17, 17, 17, 0.12)",
                border: "1px solid rgba(17, 17, 17, 0.2)",
                color: C.bg,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <b.i size={15} strokeWidth={2.2} />
              {b.t}
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);

/* =========================================================
   FOOTER
   ========================================================= */
const Footer = () => (
  <footer
    data-testid="footer"
    style={{
      background: C.bgDeep,
      borderTop: `1px solid ${C.border}`,
      padding: "40px clamp(20px, 5vw, 64px)",
      color: C.textMuted,
      fontSize: 13,
    }}
  >
    <div
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'Playfair Display', serif",
          fontSize: 16,
          fontWeight: 600,
          color: C.text,
        }}
      >
        <Factory size={18} color={C.accent} />
        Workshop Industri Purworejo
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          WhatsApp Owner
        </a>
        <a
          href={MAPS_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          Google Maps
        </a>
        <span>© 2025 Listing Aset Industri</span>
      </div>
    </div>
  </footer>
);

/* =========================================================
   STICKY MOBILE BAR
   ========================================================= */
const StickyMobile = () => (
  <div
    data-testid="sticky-mobile-bar"
    className="sticky-mobile"
    style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: C.bg,
      borderTop: `1px solid ${C.borderStrong}`,
      padding: "12px 16px 14px",
      gap: 10,
      boxShadow: "0 -10px 30px rgba(0,0,0,0.4)",
    }}
  >
    <a
      data-testid="sticky-mobile-wa"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        flex: 1,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: "14px 16px",
        background: C.accent,
        color: C.bg,
        fontSize: 15,
        fontWeight: 700,
        borderRadius: 999,
      }}
    >
      <Phone size={18} strokeWidth={2.5} />
      Hubungi via WhatsApp
    </a>
  </div>
);

/* =========================================================
   APP
   ========================================================= */
function App() {
  return (
    <div data-testid="app-root">
      <GlobalStyles />
      <Hero />
      <WhyDifferent />
      <Gallery />
      <Specs />
      <Personas />
      <FAQ />
      <Location />
      <FinalCta />
      <Footer />
      <StickyMobile />
    </div>
  );
}

export default App;
