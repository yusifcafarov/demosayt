import { useState, useEffect, useRef } from "react";

const menuItems = [
  {
    id: 1,
    name: "Philadelphia Roll",
    desc: "Tərəvəz krem pendiri, somon, xiyar ilə hazırlanmış klassik roll",
    price: "12.99",
    emoji: "🐟",
    tag: "Bestseller",
    color: "#FF3B3B",
  },
  {
    id: 2,
    name: "California Roll",
    desc: "Krab əti, avokado, xiyar, tobiko kürüsü ilə həlqəvi roll",
    price: "10.99",
    emoji: "🥑",
    tag: "Popular",
    color: "#FF6B35",
  },
  {
    id: 3,
    name: "Hot Tempura Roll",
    desc: "Karides tempura, ədviyyatlı mayo, teriyaki sousu ilə isti roll",
    price: "14.99",
    emoji: "🍤",
    tag: "Spicy",
    color: "#FF3B3B",
  },
  {
    id: 4,
    name: "Salmon Nigiri",
    desc: "Premium atlantik somon, wasabi, şirin limon yağı ilə nigiri",
    price: "9.99",
    emoji: "🍣",
    tag: "Premium",
    color: "#FF6B35",
  },
  {
    id: 5,
    name: "Dragon Roll",
    desc: "Karides tempura, avokado üzlüklü, unagi sousu ilə ecazkar roll",
    price: "16.99",
    emoji: "🐉",
    tag: "Chef's Pick",
    color: "#FF3B3B",
  },
  {
    id: 6,
    name: "Tuna Sashimi",
    desc: "Gündəlik təzə bluefin tuna, dəniz duzu, yuzu ilə 6 ədəd",
    price: "18.99",
    emoji: "🎣",
    tag: "Fresh",
    color: "#FF6B35",
  },
];

const reviews = [
  {
    name: "Aysel M.",
    rating: 5,
    text: "Tokyo Roll-un philadelphia rollu həyatımda yediyim ən yaxşı sushidir. Balığın təzəliyi, souların mükəmməlliyi - hər şey premium!",
    date: "3 gün əvvəl",
    avatar: "A",
  },
  {
    name: "Rauf K.",
    rating: 5,
    text: "Çatdırılma sürəti inanılmaz sürətlidir. 25 dəqiqədə gəldi, hər şey mükəmməl qablaşdırılmışdı. Mütləq tövsiyə edirəm!",
    date: "1 həftə əvvəl",
    avatar: "R",
  },
  {
    name: "Leyla H.",
    rating: 5,
    text: "Dragon Roll bütün gözləntiləri aşdı. Xidmət professional, qiymətlər ədalətlidir. Artıq həftəlik müştəriyəm.",
    date: "2 həftə əvvəl",
    avatar: "L",
  },
];

function OrderModal({ item, onClose }) {
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    const total = (parseFloat(item.price) * qty).toFixed(2);
    const msg = encodeURIComponent(
      `🍣 *TOKYO ROLL - YENİ SİFARİŞ*\n\n` +
        `📦 Məhsul: ${item.name}\n` +
        `🔢 Miqdar: ${qty} ədəd\n` +
        `💰 Ümumi: $${total}\n` +
        `📍 Ünvan: ${address || "Qeyd edilməyib"}\n` +
        `📝 Qeyd: ${note || "Yoxdur"}\n\n` +
        `Sifariş üçün təşəkkür edirik! 🙏`
    );
    window.open(`https://wa.me/994501234567?text=${msg}`, "_blank");
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.classList.contains("modal-overlay") && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
          border: "1px solid rgba(255,59,59,0.3)",
          borderRadius: "24px",
          padding: "40px",
          maxWidth: "460px",
          width: "100%",
          position: "relative",
          boxShadow: "0 0 60px rgba(255,59,59,0.2), 0 40px 80px rgba(0,0,0,0.6)",
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            color: "#fff",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div style={{ fontSize: "64px", marginBottom: "8px", filter: "drop-shadow(0 4px 12px rgba(255,59,59,0.4))" }}>
            {item.emoji}
          </div>
          <h3 style={{ color: "#fff", fontSize: "22px", fontFamily: "'Playfair Display', serif", margin: "0 0 4px" }}>
            {item.name}
          </h3>
          <span style={{ color: "#FF3B3B", fontSize: "24px", fontWeight: "700" }}>${item.price}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Miqdar
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "0", background: "rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ background: "none", border: "none", color: "#FF3B3B", fontSize: "22px", width: "48px", height: "48px", cursor: "pointer", fontWeight: "bold" }}
              >−</button>
              <span style={{ flex: 1, textAlign: "center", color: "#fff", fontSize: "18px", fontWeight: "600" }}>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{ background: "none", border: "none", color: "#FF3B3B", fontSize: "22px", width: "48px", height: "48px", cursor: "pointer", fontWeight: "bold" }}
              >+</button>
            </div>
          </div>

          <div>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Çatdırılma ünvanı
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ünvanınızı daxil edin..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div>
            <label style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Əlavə qeyd
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Xüsusi istəyiniz varsa yazın..."
              rows={3}
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                padding: "12px 16px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>Cəmi:</span>
            <span style={{ color: "#FF3B3B", fontSize: "22px", fontWeight: "700" }}>
              ${(parseFloat(item.price) * qty).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleOrder}
            style={{
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              border: "none",
              borderRadius: "14px",
              padding: "16px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(37,211,102,0.4)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp ilə Sifariş Et
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TokyoRoll() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});
  const observerRef = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "#080808",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 9999,
        gap: "24px",
        animation: loading ? "none" : "fadeOut 0.5s ease forwards",
      }}>
        <div style={{ position: "relative", width: "80px", height: "80px" }}>
          <div style={{
            position: "absolute", inset: 0,
            border: "2px solid transparent",
            borderTopColor: "#FF3B3B",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <div style={{
            position: "absolute", inset: "8px",
            border: "2px solid transparent",
            borderTopColor: "rgba(255,59,59,0.4)",
            borderRadius: "50%",
            animation: "spin 1.5s linear infinite reverse",
          }} />
          <span style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px",
          }}>🍣</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            color: "#fff",
            letterSpacing: "0.15em",
            marginBottom: "4px",
          }}>TOKYO ROLL</div>
          <div style={{ color: "rgba(255,59,59,0.8)", fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
            Hazırlanır...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#080808", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FF3B3B; border-radius: 2px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroReveal { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-16px) rotate(2deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(0.97); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .menu-card:hover { transform: translateY(-8px) !important; border-color: rgba(255,59,59,0.5) !important; box-shadow: 0 20px 60px rgba(255,59,59,0.15) !important; }
        .order-btn:hover { background: linear-gradient(135deg, #FF5555 0%, #CC0000 100%) !important; transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(255,59,59,0.4) !important; }
        .nav-link:hover { color: #FF3B3B !important; }
        .whatsapp-btn:hover { transform: scale(1.05) !important; box-shadow: 0 8px 32px rgba(37,211,102,0.4) !important; }
        @media (max-width: 768px) {
          .hero-title { font-size: 42px !important; }
          .hero-btns { flex-direction: column !important; }
          .menu-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .reviews-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          .nav-links { display: none !important; }
        }
        @media (max-width: 480px) {
          .hero-title { font-size: 34px !important; }
          .section-title { font-size: 32px !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 32px",
        height: "72px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>🍣</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", letterSpacing: "0.1em" }}>
            TOKYO <span style={{ color: "#FF3B3B" }}>ROLL</span>
          </span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          {["Menü", "Haqqımızda", "Rəylər", "Əlaqə"].map((l, i) => (
            <button key={i} className="nav-link" onClick={() => scrollTo(["menu","about","reviews","footer"][i])}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: "500", cursor: "pointer", letterSpacing: "0.05em", transition: "color 0.2s", fontFamily: "inherit" }}>
              {l}
            </button>
          ))}
        </div>
        <button
          onClick={() => window.open("https://wa.me/994501234567", "_blank")}
          style={{
            background: "linear-gradient(135deg, #FF3B3B, #CC0000)",
            border: "none", borderRadius: "10px",
            padding: "10px 20px", color: "#fff",
            fontSize: "13px", fontWeight: "600",
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "transform 0.2s, box-shadow 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,59,59,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >
          Sifariş Et
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        padding: "100px 32px 60px",
      }}>
        {/* Background effects */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,59,59,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,107,53,0.08) 0%, transparent 50%)",
        }} />
        <div style={{
          position: "absolute",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(255,59,59,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
        }} />

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ maxWidth: "900px", width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,59,59,0.1)", border: "1px solid rgba(255,59,59,0.3)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "28px",
            animation: "heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF3B3B", display: "inline-block", animation: "pulse 2s ease infinite" }} />
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Bakı'nın ən yaxşı sushisi
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "80px",
              fontWeight: "900",
              lineHeight: 1.05,
              marginBottom: "8px",
              animation: "heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both",
            }}
          >
            TOKYO
            <br />
            <span style={{
              background: "linear-gradient(135deg, #FF3B3B 0%, #FF6B35 50%, #FF3B3B 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}>ROLL</span>
          </h1>

          <p style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "48px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            animation: "heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
          }}>
            Fresh Sushi & Fast Delivery
          </p>

          <div style={{
            fontSize: "100px",
            marginBottom: "40px",
            animation: "float 4s ease-in-out infinite, heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both",
            filter: "drop-shadow(0 20px 40px rgba(255,59,59,0.3))",
          }}>
            🍱
          </div>

          <div
            className="hero-btns"
            style={{
              display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap",
              animation: "heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both",
            }}
          >
            <button
              onClick={() => scrollTo("menu")}
              style={{
                background: "linear-gradient(135deg, #FF3B3B 0%, #CC0000 100%)",
                border: "none", borderRadius: "14px",
                padding: "16px 36px", color: "#fff",
                fontSize: "15px", fontWeight: "700",
                cursor: "pointer", letterSpacing: "0.05em",
                transition: "transform 0.2s, box-shadow 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,59,59,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              🍣 Menuya Bax
            </button>
            <button
              className="whatsapp-btn"
              onClick={() => window.open("https://wa.me/994501234567?text=Salam! Sifariş vermək istəyirəm.", "_blank")}
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                border: "none", borderRadius: "14px",
                padding: "16px 36px", color: "#fff",
                fontSize: "15px", fontWeight: "700",
                cursor: "pointer", letterSpacing: "0.05em",
                transition: "transform 0.2s, box-shadow 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
                fontFamily: "inherit",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Sifariş
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: "40px", justifyContent: "center",
            marginTop: "60px",
            animation: "heroReveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both",
          }}>
            {[["500+", "Gündəlik Sifariş"], ["4.9★", "Ortalama Reytinq"], ["25 dəq", "Çatdırılma"]].map(([val, lbl], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", fontWeight: "800", color: "#FF3B3B", fontFamily: "'Playfair Display', serif" }}>{val}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "pulse 2s ease infinite",
        }}>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>Davam et</span>
          <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,59,59,0.6), transparent)" }} />
        </div>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          data-id="menu-title"
          className={`reveal ${visible["menu-title"] ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{ fontSize: "12px", color: "#FF3B3B", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: "600" }}>
            — Premium Seçim —
          </span>
          <h2
            className="section-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "48px", fontWeight: "900",
              marginTop: "12px", lineHeight: 1.1,
            }}
          >
            Bizim Menü
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: "12px", fontSize: "16px", maxWidth: "400px", margin: "12px auto 0" }}>
            Hər gün təzə hazırlanan, premium materiallarla yoğrulmuş lezzətlər
          </p>
        </div>

        <div
          className="menu-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
        >
          {menuItems.map((item, i) => (
            <div
              key={item.id}
              data-id={`card-${item.id}`}
              className={`menu-card reveal ${visible[`card-${item.id}`] ? "visible" : ""}`}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s",
                transitionDelay: `${i * 0.07}s`,
                cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{
                height: "180px",
                background: `radial-gradient(circle at 50% 60%, rgba(255,59,59,0.12), transparent 70%), linear-gradient(135deg, rgba(255,255,255,0.03), rgba(0,0,0,0.2))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "80px",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 60%)`,
                }} />
                <span style={{ filter: "drop-shadow(0 8px 20px rgba(255,59,59,0.3))", zIndex: 1 }}>{item.emoji}</span>
                <span style={{
                  position: "absolute", top: "12px", right: "12px",
                  background: item.tag === "Bestseller" ? "linear-gradient(135deg, #FF3B3B, #CC0000)" : "rgba(255,255,255,0.08)",
                  border: item.tag === "Bestseller" ? "none" : "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "100px", padding: "4px 10px",
                  fontSize: "10px", fontWeight: "700",
                  color: "#fff", letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  {item.tag}
                </span>
              </div>

              <div style={{ padding: "24px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", fontFamily: "'Playfair Display', serif", marginBottom: "8px" }}>
                  {item.name}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: "1.6", marginBottom: "20px", minHeight: "42px" }}>
                  {item.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "22px", fontWeight: "800", color: "#FF3B3B" }}>${item.price}</span>
                  <button
                    className="order-btn"
                    onClick={() => setSelectedItem(item)}
                    style={{
                      background: "linear-gradient(135deg, #FF3B3B 0%, #CC0000 100%)",
                      border: "none", borderRadius: "10px",
                      padding: "10px 20px", color: "#fff",
                      fontSize: "13px", fontWeight: "700",
                      cursor: "pointer", letterSpacing: "0.05em",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                  >
                    Sifariş et
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 32px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            data-id="about"
            className={`about-grid reveal ${visible["about"] ? "visible" : ""}`}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
          >
            <div>
              <span style={{ fontSize: "12px", color: "#FF3B3B", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: "600" }}>
                — Bizimlə Tanış Olun —
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px", fontWeight: "900", marginTop: "16px", lineHeight: 1.15, marginBottom: "24px" }}>
                Hər roll bir<br />
                <em style={{ color: "#FF3B3B" }}>sənət əsəridir</em>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.9", fontSize: "15px", marginBottom: "20px" }}>
                Tokyo Roll 2019-cu ildən Bakı'da Yapon mətbəxinin ən yüksək standartlarını təqdim edir. Baş aşpazımız Tokioda 8 il təhsil almış, hər bir resepti mükəmməlliyi üçün yaratmışdır.
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.9", fontSize: "15px", marginBottom: "32px" }}>
                Gündəlik gətirilən təzə balıq, premium düyü və əl ilə hazırlanmış souslarmızla hər loğma bir Tokio səfəri kimidir.
              </p>
              <div style={{ display: "flex", gap: "32px" }}>
                {[["8+", "İl Təcrübə"], ["50+", "Menü Növü"], ["5000+", "Məmnun Müştəri"]].map(([v, l], i) => (
                  <div key={i} style={{ borderLeft: "2px solid rgba(255,59,59,0.4)", paddingLeft: "16px" }}>
                    <div style={{ fontSize: "24px", fontWeight: "800", color: "#FF3B3B" }}>{v}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {["🍣", "🍜", "🥢", "🍱"].map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: `radial-gradient(circle at 50% 40%, rgba(255,59,59,0.1), transparent 60%), rgba(255,255,255,0.03)`,
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    height: "130px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "52px",
                    backdropFilter: "blur(10px)",
                    transform: i % 2 === 1 ? "translateY(20px)" : "none",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = i % 2 === 1 ? "translateY(14px) scale(1.05)" : "scale(1.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = i % 2 === 1 ? "translateY(20px)" : "none"; }}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: "100px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          data-id="reviews-title"
          className={`reveal ${visible["reviews-title"] ? "visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <span style={{ fontSize: "12px", color: "#FF3B3B", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: "600" }}>
            — Müştəri Rəyləri —
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px", fontWeight: "900", marginTop: "12px" }}>
            Onlar nə düşünür?
          </h2>
        </div>
        <div
          className="reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              data-id={`review-${i}`}
              className={`reveal ${visible[`review-${i}`] ? "visible" : ""}`}
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "28px",
                backdropFilter: "blur(10px)",
                transitionDelay: `${i * 0.1}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: "80px", height: "80px",
                background: "radial-gradient(circle at 100% 0%, rgba(255,59,59,0.08), transparent 60%)",
              }} />
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} style={{ color: "#FF3B3B", fontSize: "16px" }}>{s}</span>
                ))}
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.8", fontSize: "14px", marginBottom: "20px", fontStyle: "italic" }}>
                "{r.text}"
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px", height: "40px",
                  background: "linear-gradient(135deg, #FF3B3B, #CC0000)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "16px", fontWeight: "700",
                }}>
                  {r.avatar}
                </div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "600" }}>{r.name}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        margin: "0 32px 80px",
        maxWidth: "1136px",
        marginLeft: "auto", marginRight: "auto",
        background: "linear-gradient(135deg, rgba(255,59,59,0.15) 0%, rgba(204,0,0,0.1) 100%)",
        border: "1px solid rgba(255,59,59,0.3)",
        borderRadius: "24px",
        padding: "48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,59,59,0.05), transparent)" }} />
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>Hər Gün Saat 11:00 - 23:00</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: "900", marginBottom: "8px" }}>
          İndiki Sifarişdə <span style={{ color: "#FF3B3B" }}>10% Endirim!</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "28px" }}>İlk sifarişinizə xüsusi endirim — WhatsApp üzərindən sifariş verin.</p>
        <button
          onClick={() => window.open("https://wa.me/994501234567?text=Salam! İndirim istəyirəm!", "_blank")}
          className="whatsapp-btn"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            border: "none", borderRadius: "14px",
            padding: "16px 40px", color: "#fff",
            fontSize: "15px", fontWeight: "700",
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "transform 0.2s, box-shadow 0.2s",
            fontFamily: "inherit",
          }}
        >
          🎉 İndi Sifariş Ver
        </button>
      </section>

      {/* FOOTER */}
      <footer id="footer" style={{
        background: "rgba(0,0,0,0.8)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 32px 32px",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <span style={{ fontSize: "22px" }}>🍣</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: "700", letterSpacing: "0.1em" }}>
                  TOKYO <span style={{ color: "#FF3B3B" }}>ROLL</span>
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: "1.8", maxWidth: "260px", marginBottom: "20px" }}>
                Bakı'nın ən premium sushi restoranı. Hər gün təzə, hər loğma mükəmməl.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href="https://instagram.com/tokyoroll.az"
                  target="_blank" rel="noreferrer"
                  style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", fontSize: "18px",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(225,48,108,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
                >
                  📸
                </a>
                <a
                  href="https://wa.me/994501234567"
                  target="_blank" rel="noreferrer"
                  style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", fontSize: "18px",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = ""; }}
                >
                  💬
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Menü</h4>
              {["Philadelphia Roll", "California Roll", "Dragon Roll", "Salmon Nigiri", "Tuna Sashimi"].map((m, i) => (
                <div key={i} style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginBottom: "10px", cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FF3B3B"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}>
                  {m}
                </div>
              ))}
            </div>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>Əlaqə</h4>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: "2" }}>
                <div>📞 +994 50 123 45 67</div>
                <div>📧 info@tokyoroll.az</div>
                <div>📍 Nizami küç. 45, Bakı</div>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: "13px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>İş Saatları</h4>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", lineHeight: "2.2" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                  <span>B.E. – Cümə</span>
                  <span style={{ color: "#FF3B3B" }}>11:00 – 23:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                  <span>Ş.E. – B.G.</span>
                  <span style={{ color: "#FF3B3B" }}>12:00 – 24:00</span>
                </div>
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#25D366", display: "inline-block", animation: "pulse 2s ease infinite" }} />
                  <span style={{ color: "#25D366", fontSize: "12px" }}>Şu anda açıqdır</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
              © 2025 Tokyo Roll. Bütün hüquqlar qorunur.
            </span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
              Made with ❤️ in Baku
            </span>
          </div>
        </div>
      </footer>

      {selectedItem && <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
