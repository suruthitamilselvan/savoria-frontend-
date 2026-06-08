
import { useState, useEffect, useRef } from "react";
const API = "https://savoria-backend-production.up.railway.app";

const MENU = {
  Starters: [
    { id: 1, name: "Truffle Arancini", price: 1200, cal: 320, img: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg", desc: "Crispy risotto balls with black truffle & parmesan", veg: true, spicy: false, mood: ["light", "romantic"], pairs: "Crispy Calamari", emoji: "🧆", rating: 4.9, tags: ["Chef's Pick"] },
    { id: 2, name: "Crispy Calamari", price: 980, cal: 280, img: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg", desc: "Lightly fried squid with lemon aioli & chilli", veg: false, spicy: true, mood: ["bold", "adventurous"], pairs: "Truffle Arancini", emoji: "🦑", rating: 4.7, tags: [] },
    { id: 3, name: "Burrata Bruschetta", price: 1100, cal: 290, img: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg", desc: "Fresh burrata with heirloom tomatoes & basil oil", veg: true, spicy: false, mood: ["light", "romantic"], pairs: "Truffle Arancini", emoji: "🍅", rating: 4.8, tags: ["Popular"] },
    { id: 4, name: "Spiced Lamb Kofta", price: 1400, cal: 360, img: "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg", desc: "Grilled lamb with harissa yogurt & pomegranate", veg: false, spicy: true, mood: ["bold", "adventurous"], pairs: "Crispy Calamari", emoji: "🍢", rating: 4.6, tags: [] },
  ],
  Mains: [
    { id: 5, name: "Wagyu Beef Tenderloin", price: 4800, cal: 680, img: "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg", desc: "A5 wagyu with bone marrow butter & truffle jus", veg: false, spicy: false, mood: ["romantic", "bold"], pairs: "Lobster Thermidor", emoji: "🥩", rating: 5.0, tags: ["Chef's Pick", "Signature"] },
    { id: 6, name: "Lobster Thermidor", price: 4200, cal: 590, img: "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg", desc: "Half lobster gratin with cognac cream & gruyère", veg: false, spicy: false, mood: ["romantic"], pairs: "Wagyu Beef Tenderloin", emoji: "🦞", rating: 4.9, tags: ["Signature"] },
    { id: 7, name: "Wild Mushroom Risotto", price: 2200, cal: 420, img: "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg", desc: "Porcini & chanterelle risotto with aged parmesan", veg: true, spicy: false, mood: ["light", "cozy"], pairs: "Truffle Arancini", emoji: "🍄", rating: 4.7, tags: ["Popular"] },
    { id: 8, name: "Pan-Seared Duck Breast", price: 3200, cal: 510, img: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg", desc: "Magret duck with cherry gastrique & dauphinoise", veg: false, spicy: false, mood: ["bold", "cozy"], pairs: "Spiced Lamb Kofta", emoji: "🦆", rating: 4.8, tags: [] },
  ],
  Desserts: [
    { id: 9, name: "Valrhona Chocolate Fondant", price: 1200, cal: 480, img: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg", desc: "Dark 72% molten cake with salted caramel ice cream", veg: true, spicy: false, mood: ["romantic", "cozy"], pairs: "Tiramisu Classico", emoji: "🍫", rating: 4.9, tags: ["Popular"] },
    { id: 10, name: "Tiramisu Classico", price: 950, cal: 390, img: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg", desc: "House-made with Kahlúa, mascarpone & espresso", veg: true, spicy: false, mood: ["light", "romantic"], pairs: "Valrhona Chocolate Fondant", emoji: "☕", rating: 4.8, tags: [] },
    { id: 11, name: "Mango Panna Cotta", price: 850, cal: 310, img: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg", desc: "Silky coconut panna cotta with alphonso mango", veg: true, spicy: false, mood: ["light"], pairs: "Tiramisu Classico", emoji: "🥭", rating: 4.6, tags: [] },
  ],
  Drinks: [
    { id: 12, name: "Signature Savoria Sling", price: 1400, cal: 180, img: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/gin-sling-5762501.jpg", desc: "Gin, lychee, elderflower & champagne foam", veg: true, spicy: false, mood: ["romantic", "light"], pairs: "Burrata Bruschetta", emoji: "🍹", rating: 4.8, tags: ["Signature"] },
    { id: 13, name: "Aged Negroni", price: 1600, cal: 210, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Negroni_in_glass.jpg/640px-Negroni_in_glass.jpg", desc: "Barrel-aged campari, sweet vermouth & gin", veg: true, spicy: false, mood: ["bold"], pairs: "Wagyu Beef Tenderloin", emoji: "🍸", rating: 4.9, tags: ["Chef's Pick"] },
    { id: 14, name: "Virgin Sunset", price: 750, cal: 120, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Sunrise_cocktail.jpg/640px-Sunrise_cocktail.jpg", desc: "Passionfruit, blood orange & sparkling water", veg: true, spicy: false, mood: ["light"], pairs: "Mango Panna Cotta", emoji: "🌅", rating: 4.5, tags: [] },
  ],
};

const REVIEWS = [
  { name: "Priya M.", stars: 5, text: "The wagyu was life-changing. Best fine dining in the city by a mile.", avatar: "PM", date: "2 days ago" },
  { name: "James T.", stars: 5, text: "Lobster Thermidor was absolutely divine. The AI recommender picked perfectly for me!", avatar: "JT", date: "1 week ago" },
  { name: "Sofia R.", stars: 5, text: "Every single dish was flawless. The atmosphere is magical — we'll be back for our anniversary.", avatar: "SR", date: "2 weeks ago" },
  { name: "Arjun K.", stars: 5, text: "Spin the wheel gave me 20% off! Food was incredible and the staff were so attentive.", avatar: "AK", date: "3 weeks ago" },
];

const MOODS = ["romantic", "bold", "light", "adventurous", "cozy"];
const MOOD_EMOJI = { romantic: "❤️", bold: "🔥", light: "🌿", adventurous: "⚡", cozy: "🍂" };

const TABLES = [
  { id: 1, seats: 2, x: 60, y: 60, shape: "round", label: "T1" },
  { id: 2, seats: 2, x: 200, y: 60, shape: "round", label: "T2" },
  { id: 3, seats: 4, x: 340, y: 50, shape: "rect", label: "T3" },
  { id: 4, seats: 6, x: 60, y: 200, shape: "rect", label: "T4" },
  { id: 5, seats: 4, x: 250, y: 200, shape: "rect", label: "T5" },
  { id: 6, seats: 2, x: 410, y: 200, shape: "round", label: "T6" },
  { id: 7, seats: 8, x: 60, y: 330, shape: "rect", label: "T7" },
  { id: 8, seats: 4, x: 310, y: 330, shape: "rect", label: "T8" },
];

const BOOKED = [1, 3, 7];

const LOYALTY_TIERS = [
  { name: "Bronze", min: 0, max: 499, color: "#CD7F32", emoji: "🥉" },
  { name: "Silver", min: 500, max: 999, color: "#C0C0C0", emoji: "🥈" },
  { name: "Gold", min: 1000, max: 1999, color: "#FFD700", emoji: "🥇" },
  { name: "Diamond", min: 2000, max: Infinity, color: "#00CFFF", emoji: "💎" },
];

const WEATHER_MENUS = {
  sunny: { label: "☀️ Sunny Day Picks", items: [1, 3, 14, 11] },
  rainy: { label: "🌧️ Cozy Rainy Day", items: [7, 10, 13, 9] },
  cold: { label: "❄️ Warming Choices", items: [4, 8, 13, 9] },
  hot: { label: "🌡️ Cool & Light", items: [3, 11, 14, 1] },
};

const SPIN_PRIZES = ["10% OFF", "Free Dessert", "20% OFF", "Free Drink", "5% OFF", "Free Starter", "15% OFF", "Loyalty 2x"];

function StarRating({ rating }) {
  return (
    <span style={{ color: "#FFD700", fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#888", fontSize: 11, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function Savoria() {
  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [menuCat, setMenuCat] = useState("Starters");
  const [vegOnly, setVegOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(0);
  const [spinPrize, setSpinPrize] = useState(null);
  const [loyaltyPoints] = useState(750);
  const [mood, setMood] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [showAI, setShowAI] = useState(false);
  const [weather] = useState("sunny");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", date: "", time: "", guests: 2, requests: "" });

  const bg = dark ? "#0A0A0A" : "#FAFAF7";
  const surface = dark ? "#141414" : "#FFFFFF";
  const card = dark ? "#1C1C1C" : "#F5F5F0";
  const border = dark ? "#2A2A2A" : "#E5E5E0";
  const text = dark ? "#F0EDE8" : "#1A1A1A";
  const muted = dark ? "#888" : "#666";
  const gold = "#C9A84C";
  const cream = "#F5E6C8";

  const loyalTier = LOYALTY_TIERS.find(t => loyaltyPoints >= t.min && loyaltyPoints <= t.max);

  const allItems = Object.values(MENU).flat();
  const weatherItems = WEATHER_MENUS[weather].items.map(id => allItems.find(i => i.id === id)).filter(Boolean);

  const filtered = MENU[menuCat].filter(item => {
    if (vegOnly && !item.veg) return false;
    if (spicyOnly && !item.spicy) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (mood && !item.mood.includes(mood)) return false;
    return true;
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  function addToCart(item) {
    setCart(prev => {
      const ex = prev.find(i => i.id === item.id);
      if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);
  }

  function removeFromCart(id) {
    setCart(prev => {
      const ex = prev.find(i => i.id === id);
      if (ex && ex.qty > 1) return prev.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i);
      return prev.filter(i => i.id !== id);
    });
  }

  function pickMood(m) {
    setMood(m === mood ? null : m);
    const suggestions = allItems.filter(i => i.mood.includes(m)).slice(0, 4);
    setAiSuggestions(suggestions);
    setShowAI(true);
  }

  function spinWheel() {
    if (spinning) return;
    setSpinning(true);
    setSpinPrize(null);
    const spins = 4 + Math.random() * 4;
    const extra = Math.floor(Math.random() * 360);
    const total = spins * 360 + extra;
    setSpinAngle(prev => prev + total);
    setTimeout(() => {
      setSpinning(false);
      const prizeIdx = Math.floor(((extra % 360) / 360) * SPIN_PRIZES.length);
      setSpinPrize(SPIN_PRIZES[SPIN_PRIZES.length - 1 - prizeIdx]);
    }, 3500);
  }

  async function handleBook() {
    if (!selectedTable || !bookingForm.name || !bookingForm.date || !bookingForm.time) return;
    try {
      await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookingForm,
          table: TABLES.find(t => t.id === selectedTable)?.label,
        }),
      });
    } catch (err) {
      console.log("Booking error:", err);
    }
    setBookingDone(true);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4000);
  }
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
    setActiveSection(id);
  };

  useEffect(() => {
    const timer = setInterval(() => setReviewIdx(i => (i + 1) % REVIEWS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = ["home", "menu", "reserve", "offers", "story", "contact"];

  return (
    <div style={{ background: bg, color: text, fontFamily: "'Playfair Display', Georgia, serif", minHeight: "100vh", overflowX: "hidden", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Lato:wght@300;400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${gold};border-radius:2px}
        .gold-btn{background:linear-gradient(135deg,#C9A84C,#E8C97A,#C9A84C);color:#1A1A1A;border:none;border-radius:4px;padding:13px 32px;font-family:'Lato',sans-serif;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:transform .2s,box-shadow .2s}
        .gold-btn:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(201,168,76,.5)}
        .outline-btn{background:transparent;border:1px solid ${gold};color:${gold};border-radius:4px;padding:11px 28px;font-family:'Lato',sans-serif;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all .2s}
        .outline-btn:hover{background:${gold};color:#1A1A1A}
        .nav-link{font-family:'Lato',sans-serif;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${muted};background:none;border:none;cursor:pointer;padding:4px 0;position:relative;transition:color .2s}
        .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:${gold};transition:width .3s}
        .nav-link:hover,.nav-link.active{color:${gold}}
        .nav-link:hover::after,.nav-link.active::after{width:100%}
        .menu-card{background:${card};border:1px solid ${border};border-radius:12px;padding:24px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
        .menu-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(201,168,76,0.05),transparent);opacity:0;transition:opacity .3s}
        .menu-card:hover{transform:translateY(-6px) scale(1.02);border-color:${gold};box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .menu-card:hover::before{opacity:1}
        .tag{display:inline-block;font-family:'Lato',sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;padding:3px 10px;border-radius:20px;text-transform:uppercase}
        .table-btn{border:none;cursor:pointer;transition:all .2s;font-family:'Lato',sans-serif;font-size:11px;font-weight:700}
        .table-btn:hover{transform:scale(1.1)}
        .input-field{width:100%;background:${dark ? "#111" : "#F5F5F0"};border:1px solid ${border};border-radius:6px;padding:12px 16px;color:${text};font-family:'Lato',sans-serif;font-size:14px;outline:none;transition:border-color .2s}
        .input-field:focus{border-color:${gold}}
        .input-field::placeholder{color:${muted}}
        .spin-section{cursor:pointer;position:relative}
        .confetti-piece{position:fixed;pointer-events:none;animation:fall 4s linear forwards;z-index:9999}
        @keyframes fall{0%{transform:translateY(-100px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
        .cart-btn{position:fixed;bottom:32px;right:32px;width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#C9A84C,#E8C97A);border:none;cursor:pointer;z-index:998;display:flex;align-items:center;justify-content:center;font-size:28px;box-shadow:0 8px 32px rgba(201,168,76,.5);transition:transform .2s}
        .cart-btn.bounce{animation:cartBounce .4s ease}
        @keyframes cartBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
        .cart-badge{position:absolute;top:-4px;right:-4px;background:#E53E3E;color:#fff;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;font-family:'Lato',sans-serif}
        .hero-title{font-size:clamp(52px,9vw,120px);font-weight:900;line-height:.95;letter-spacing:-2px}
        .section-title{font-size:clamp(36px,5vw,60px);font-weight:700;letter-spacing:-1px;line-height:1}
        .gold-line{width:60px;height:2px;background:linear-gradient(90deg,${gold},transparent);margin:16px 0 32px}
        .parallax-hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden}
        .floating{animation:floating 6s ease-in-out infinite}
        @keyframes floating{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        .glow{animation:glow 3s ease-in-out infinite}
        @keyframes glow{0%,100%{text-shadow:0 0 20px rgba(201,168,76,0.3)}50%{text-shadow:0 0 60px rgba(201,168,76,0.8)}}
        .ticker{display:flex;gap:60px;animation:ticker 20s linear infinite;white-space:nowrap}
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        select option{background:${dark ? "#1C1C1C" : "#FFFFFF"};color:${text}}
        @media(max-width:768px){.hero-title{font-size:52px}.nav-desktop{display:none!important}.nav-mobile-toggle{display:flex!important}.two-col{grid-template-columns:1fr!important}.three-col{grid-template-columns:1fr 1fr!important}}
        @media(min-width:769px){.nav-mobile-toggle{display:none!important}.mobile-nav{display:none!important}}
      `}</style>

      {confetti && Array.from({ length: 80 }).map((_, i) => (
        <div key={i} className="confetti-piece" style={{
          left: `${Math.random() * 100}%`, top: 0, width: `${Math.random() * 10 + 6}px`, height: `${Math.random() * 10 + 6}px`,
          background: ["#C9A84C", "#E8C97A", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"][Math.floor(Math.random() * 6)],
          animationDelay: `${Math.random() * 2}s`, borderRadius: Math.random() > 0.5 ? "50%" : "0"
        }} />
      ))}

      {/* CART BUTTON */}
      <button className={`cart-btn ${cartBounce ? "bounce" : ""}`} onClick={() => setCartOpen(o => !o)}>
        🛒
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>

      {/* CART PANEL */}
      {cartOpen && (
        <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: 360, background: surface, zIndex: 999, boxShadow: "-20px 0 60px rgba(0,0,0,.5)", display: "flex", flexDirection: "column", borderLeft: `1px solid ${border}` }}>
          <div style={{ padding: "24px 24px 16px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>Your Order</div>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: muted, fontSize: 24, cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: "center", color: muted, paddingTop: 60, fontFamily: "'Lato',sans-serif" }}>
                <div style={{ fontSize: 48 }}>🍽️</div>
                <div style={{ marginTop: 16 }}>Your cart is empty</div>
              </div>
            ) : cart.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "14px 16px", background: card, borderRadius: 10, border: `1px solid ${border}` }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <img src={item.img} alt={item.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: "cover" }} onError={e => { e.target.style.display="none"; }} />
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{item.name}</div>
                    </div>
                  <div style={{ fontFamily: "'Lato',sans-serif", color: gold, fontSize: 13, marginTop: 4 }}>₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, borderRadius: "50%", background: border, border: "none", color: text, cursor: "pointer", fontSize: 16 }}>−</button>
                  <span style={{ fontFamily: "'Lato',sans-serif", fontWeight: 700 }}>{item.qty}</span>
                  <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, borderRadius: "50%", background: gold, border: "none", color: "#1A1A1A", cursor: "pointer", fontSize: 16 }}>+</button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: 24, borderTop: `1px solid ${border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
                <span>Total</span><span style={{ color: gold }}>₹{cartTotal.toLocaleString()}</span>
              </div>
              <button className="gold-btn" style={{ width: "100%", textAlign: "center" }} onClick={async () => {
  try {
    await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, total: cartTotal }),
    });
  } catch (err) { console.log(err); }
  alert("Order placed! Thank you 🎉");
  setCart([]);
  setCartOpen(false);
}}>
                Place Order
              </button>
            </div>
          )}
        </div>
      )}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 997, background: `${dark ? "rgba(10,10,10,0.95)" : "rgba(250,250,247,0.95)"}`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 900, color: gold, letterSpacing: 3, cursor: "pointer" }} onClick={() => scrollTo("home")}>
            SAVORIA
          </div>
          <div className="nav-desktop" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map(n => <button key={n} className={`nav-link ${activeSection === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</button>)}
            <button onClick={() => setDark(d => !d)} style={{ background: "none", border: `1px solid ${border}`, borderRadius: 20, padding: "6px 14px", color: muted, cursor: "pointer", fontFamily: "'Lato',sans-serif", fontSize: 13 }}>
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="gold-btn" style={{ padding: "8px 20px", fontSize: 11, letterSpacing: 2 }} onClick={() => scrollTo("reserve")}>Reserve</button>
          </div>
          <button className="nav-mobile-toggle" onClick={() => setMobileMenu(o => !o)} style={{ background: "none", border: "none", color: text, fontSize: 24, cursor: "pointer", display: "none" }}>☰</button>
        </div>
        {mobileMenu && (
          <div className="mobile-nav" style={{ background: surface, padding: "20px 40px", display: "flex", flexDirection: "column", gap: 20, borderTop: `1px solid ${border}` }}>
            {navLinks.map(n => <button key={n} className="nav-link" onClick={() => scrollTo(n)} style={{ textAlign: "left", fontSize: 16 }}>{n}</button>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="parallax-hero" style={{ background: dark ? "linear-gradient(135deg,#0A0A0A 0%,#1A1200 50%,#0A0A0A 100%)" : "linear-gradient(135deg,#FAFAF7 0%,#F5E6C8 50%,#FAFAF7 100%)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 50%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "15%", right: "8%", fontSize: "clamp(120px,18vw,220px)", opacity: 0.04, fontFamily: "'Playfair Display',serif", fontWeight: 900, pointerEvents: "none", color: gold }}>S</div>

        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "140px 40px 80px", width: "100%", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 6, color: gold, textTransform: "uppercase", marginBottom: 24 }}>
              ✦ Fine Dining Redefined ✦
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="hero-title glow" style={{ color: text, marginBottom: 32 }}>
              Where Every<br />
              <span style={{ color: gold, fontStyle: "italic" }}>Bite</span> Tells<br />
              a Story
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 18, color: muted, lineHeight: 1.8, maxWidth: 480, marginBottom: 48, fontWeight: 300 }}>
              Award-winning cuisine crafted from the world's finest ingredients. An unforgettable experience awaits you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 80 }}>
              <button className="gold-btn" onClick={() => scrollTo("reserve")}>Reserve a Table</button>
              <button className="outline-btn" onClick={() => scrollTo("menu")}>Explore Menu</button>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
              {[["12+", "Years of Excellence"], ["50+", "Signature Dishes"], ["4.9★", "Guest Rating"], ["2", "Michelin Stars"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, fontWeight: 900, color: gold }}>{n}</div>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, marginTop: 4, letterSpacing: 1 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* floating food cards */}
        <div className="floating" style={{ position: "absolute", right: "5%", top: "20%", background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: "20px 24px", boxShadow: "0 20px 60px rgba(0,0,0,.4)", maxWidth: 220 }}>
          <div style={{ fontSize: 40 }}>🥩</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 10 }}>Wagyu Tenderloin</div>
          <div style={{ fontFamily: "'Lato',sans-serif", color: gold, fontSize: 14, marginTop: 6 }}>₹4,800 · ⭐ 5.0</div>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: muted, marginTop: 4 }}>Chef's Signature</div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: dark ? "#111" : "#F0EAD6", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "14px 0", overflow: "hidden" }}>
        <div className="ticker">
          {[...Array(2)].map((_, rep) => (
            ["🍽️ Fine Dining", "✦ Est. 2012", "🥂 Michelin Stars", "✦ Open Daily", "🎵 Live Jazz Thursdays", "✦ Private Dining", "🍷 Wine Cellar", "✦ Book Now"].map((t, i) => (
              <span key={`${rep}-${i}`} style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, color: muted, textTransform: "uppercase" }}>{t}</span>
            ))
          ))}
        </div>
      </div>

      {/* WEATHER MENU */}
      <section style={{ padding: "60px 40px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: dark ? "linear-gradient(135deg,#1C1C00,#1C1C1C)" : "linear-gradient(135deg,#FFF8E7,#F5F5F0)", border: `1px solid ${gold}44`, borderRadius: 16, padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 8 }}>Today's Weather Pick</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700 }}>{WEATHER_MENUS[weather].label}</div>
              <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 13, marginTop: 6 }}>Our chef recommends these dishes for today's weather</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {weatherItems.map(item => (
                <div key={item.id} onClick={() => addToCart(item)} style={{ background: card, border: `1px solid ${border}`, borderRadius: 10, padding: "12px 16px", cursor: "pointer", textAlign: "center", transition: "all .2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = gold} onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                  <div style={{ width: "100%", height: 80, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display="none"; }} />
                  </div>
                  <div style={{ fontSize: 20 }}>{item.emoji}</div>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, marginTop: 6 }}>{item.name}</div>
                  <div style={{ fontFamily: "'Lato',sans-serif", color: gold, fontSize: 12 }}>₹{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* AI MOOD RECOMMENDER */}
      <section style={{ padding: "40px 40px 80px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ background: dark ? "linear-gradient(135deg,#0D0D1A,#1C1C1C)" : "linear-gradient(135deg,#F0F0FF,#F5F5F0)", border: `1px solid ${border}`, borderRadius: 20, padding: "40px 40px" }}>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 12 }}>🤖 AI Sommelier</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>What's Your Mood Tonight?</div>
            <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 14, marginBottom: 28 }}>Our AI will craft the perfect menu for your mood</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
              {MOODS.map(m => (
                <button key={m} onClick={() => pickMood(m)} style={{ background: mood === m ? gold : card, color: mood === m ? "#1A1A1A" : text, border: `1px solid ${mood === m ? gold : border}`, borderRadius: 30, padding: "10px 22px", fontFamily: "'Lato',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 1, cursor: "pointer", textTransform: "capitalize", transition: "all .2s" }}>
                  {MOOD_EMOJI[m]} {m}
                </button>
              ))}
            </div>
            {showAI && aiSuggestions.length > 0 && (
              <div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: gold, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>✨ AI Recommends for {mood} mood:</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
                  {aiSuggestions.map(item => (
                    <div key={item.id} style={{ background: card, border: `1px solid ${gold}44`, borderRadius: 12, padding: "16px 20px" }}>
                      <div style={{ width: "100%", height: 100, borderRadius: 8, overflow: "hidden", marginBottom: 8 }}>
                        <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display="none"; }} />
                      </div>
                      <div style={{ fontSize: 24 }}>{item.emoji}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>{item.name}</div>
                      <div style={{ fontFamily: "'Lato',sans-serif", color: gold, fontSize: 13, margin: "4px 0" }}>₹{item.price}</div>
                      <button onClick={() => addToCart(item)} style={{ marginTop: 10, background: gold, border: "none", borderRadius: 4, padding: "6px 14px", fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>ADD +</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* MENU */}
      <section id="menu" style={{ padding: "80px 40px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Our Offerings</div>
          <div className="section-title" style={{ marginBottom: 8 }}>The Menu</div>
          <div className="gold-line" />
        </Reveal>

        {/* Filters */}
        <Reveal delay={0.1}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
            <input className="input-field" placeholder="🔍 Search dishes..." value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 240 }} />
            {["Starters", "Mains", "Desserts", "Drinks"].map(cat => (
              <button key={cat} onClick={() => setMenuCat(cat)} style={{ background: menuCat === cat ? gold : card, color: menuCat === cat ? "#1A1A1A" : text, border: `1px solid ${menuCat === cat ? gold : border}`, borderRadius: 4, padding: "10px 20px", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all .2s" }}>{cat}</button>
            ))}
            <button onClick={() => setVegOnly(v => !v)} style={{ background: vegOnly ? "#22C55E" : card, color: vegOnly ? "#fff" : text, border: `1px solid ${vegOnly ? "#22C55E" : border}`, borderRadius: 4, padding: "10px 16px", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🌿 Veg</button>
            <button onClick={() => setSpicyOnly(s => !s)} style={{ background: spicyOnly ? "#EF4444" : card, color: spicyOnly ? "#fff" : text, border: `1px solid ${spicyOnly ? "#EF4444" : border}`, borderRadius: 4, padding: "10px 16px", fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>🌶️ Spicy</button>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {filtered.length === 0 ? (
            <div style={{ gridColumn: "1/-1", textAlign: "center", color: muted, padding: "60px 0", fontFamily: "'Lato',sans-serif" }}>No dishes match your filters. Try adjusting them!</div>
          ) : filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <div className="menu-card" onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)}>
                {item.tags.length > 0 && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                    {item.tags.map(t => (
                      <span key={t} className="tag" style={{ background: t === "Chef's Pick" ? `${gold}22` : t === "Signature" ? "#C084FC22" : "#3B82F622", color: t === "Chef's Pick" ? gold : t === "Signature" ? "#C084FC" : "#3B82F6", border: `1px solid ${t === "Chef's Pick" ? gold + "44" : t === "Signature" ? "#C084FC44" : "#3B82F644"}` }}>{t}</span>
                    ))}
                  </div>
                )}
                <div style={{ width: "100%", height: 180, borderRadius: 10, overflow: "hidden", marginBottom: 16, position: "relative" }}>
                  <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                  />
                  <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: 56, background: card }}>{item.emoji}</div>
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", borderRadius: 20, padding: "4px 10px", fontFamily: "'Lato',sans-serif", fontSize: 11, color: "#FFD700", fontWeight: 700, backdropFilter: "blur(4px)" }}>₹{item.price.toLocaleString()}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{item.name}</div>
                <StarRating rating={item.rating} />
                <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 13, lineHeight: 1.7, margin: "10px 0 16px" }}>{item.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    {item.veg && <span style={{ background: "#22C55E22", color: "#22C55E", border: "1px solid #22C55E44", borderRadius: 20, padding: "2px 10px", fontFamily: "'Lato',sans-serif", fontSize: 10, fontWeight: 700 }}>🌿 VEG</span>}
                    {item.spicy && <span style={{ background: "#EF444422", color: "#EF4444", border: "1px solid #EF444444", borderRadius: 20, padding: "2px 10px", fontFamily: "'Lato',sans-serif", fontSize: 10, fontWeight: 700 }}>🌶️ SPICY</span>}
                  </div>
                  <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: muted }}>{item.cal} kcal</span>
                </div>
                {hoveredItem === item.id && (
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, marginBottom: 12, padding: "8px 12px", background: `${gold}11`, borderRadius: 6, borderLeft: `2px solid ${gold}` }}>
                    🍷 Pairs with: <span style={{ color: gold }}>{item.pairs}</span>
                  </div>
                )}
                <button className="gold-btn" style={{ width: "100%", padding: "10px", textAlign: "center" }} onClick={() => addToCart(item)}>Add to Order</button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" style={{ padding: "100px 40px", background: dark ? "#0D0D0D" : "#F5F0E8" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Reservations</div>
            <div className="section-title" style={{ marginBottom: 8 }}>Reserve Your Table</div>
            <div className="gold-line" />
          </Reveal>

          {!bookingDone ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="two-col">
              {/* Table Map */}
              <Reveal delay={0.1}>
                <div>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, color: muted, textTransform: "uppercase", marginBottom: 20 }}>Select Your Table</div>
                  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 24, position: "relative" }}>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: muted, marginBottom: 16, display: "flex", gap: 20 }}>
                      <span>🟢 Available</span><span>🔴 Booked</span><span style={{ color: gold }}>⭐ Selected</span>
                    </div>
                    <div style={{ position: "relative", height: 420, background: dark ? "#111" : "#F0EAD6", borderRadius: 12, overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontFamily: "'Lato',sans-serif", fontSize: 10, color: muted, letterSpacing: 2, textTransform: "uppercase" }}>Stage / Entrance</div>
                      {TABLES.map(t => {
                        const booked = BOOKED.includes(t.id);
                        const selected = selectedTable === t.id;
                        return (
                          <button key={t.id} className="table-btn" onClick={() => !booked && setSelectedTable(t.id)}
                            style={{ position: "absolute", left: t.x, top: t.y, background: selected ? gold : booked ? "#EF444433" : dark ? "#2A2A2A" : "#E5E5E0", border: `2px solid ${selected ? gold : booked ? "#EF4444" : border}`, borderRadius: t.shape === "round" ? "50%" : 8, width: t.seats > 4 ? 100 : t.seats > 2 ? 80 : 60, height: t.seats > 4 ? 60 : 52, color: selected ? "#1A1A1A" : booked ? "#EF4444" : text, cursor: booked ? "not-allowed" : "pointer", fontSize: 10, letterSpacing: 1 }}>
                            {t.label}<br />{t.seats}p
                          </button>
                        );
                      })}
                    </div>
                    {selectedTable && (
                      <div style={{ marginTop: 16, fontFamily: "'Lato',sans-serif", fontSize: 13, color: gold }}>
                        ✓ Table {TABLES.find(t => t.id === selectedTable)?.label} selected — {TABLES.find(t => t.id === selectedTable)?.seats} seats
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Booking Form */}
              <Reveal delay={0.2}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 2, color: muted, textTransform: "uppercase", marginBottom: 4 }}>Your Details</div>
                  <input className="input-field" placeholder="Full Name *" value={bookingForm.name} onChange={e => setBookingForm(f => ({ ...f, name: e.target.value }))} />
                  <input className="input-field" placeholder="Email Address *" type="email" value={bookingForm.email} onChange={e => setBookingForm(f => ({ ...f, email: e.target.value }))} />
                  <div style={{ display: "flex", gap: 12 }}>
                    <input className="input-field" type="date" value={bookingForm.date} onChange={e => setBookingForm(f => ({ ...f, date: e.target.value }))} style={{ flex: 1 }} />
                    <select className="input-field" value={bookingForm.time} onChange={e => setBookingForm(f => ({ ...f, time: e.target.value }))} style={{ flex: 1 }}>
                      <option value="">Time *</option>
                      {["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 13, color: muted }}>Guests:</span>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <button key={n} onClick={() => setBookingForm(f => ({ ...f, guests: n }))} style={{ width: 36, height: 36, borderRadius: "50%", background: bookingForm.guests === n ? gold : card, color: bookingForm.guests === n ? "#1A1A1A" : text, border: `1px solid ${bookingForm.guests === n ? gold : border}`, cursor: "pointer", fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 13 }}>{n}</button>
                    ))}
                  </div>
                  <textarea className="input-field" placeholder="Special requests or dietary requirements..." rows={3} value={bookingForm.requests} onChange={e => setBookingForm(f => ({ ...f, requests: e.target.value }))} style={{ resize: "none" }} />
                  <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, padding: "10px 14px", background: `${gold}11`, borderRadius: 6, border: `1px solid ${gold}33` }}>
                    ⏱ Estimated wait: <span style={{ color: gold, fontWeight: 700 }}>~5 mins</span> · Kitchen status: <span style={{ color: "#22C55E", fontWeight: 700 }}>Ready</span>
                  </div>
                  <button className="gold-btn" onClick={handleBook} style={{ marginTop: 8 }}>Confirm Reservation</button>
                </div>
              </Reveal>
            </div>
          ) : (
            <Reveal>
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 80 }}>🎉</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, fontWeight: 700, color: gold, margin: "20px 0 12px" }}>Reservation Confirmed!</div>
                <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 16 }}>Thank you, {bookingForm.name}! We look forward to welcoming you.</div>
                <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 14, marginTop: 12 }}>
                  📅 {bookingForm.date} at {bookingForm.time} · Table {TABLES.find(t => t.id === selectedTable)?.label} · {bookingForm.guests} guests
                </div>
                <div style={{ marginTop: 16, fontFamily: "'Lato',sans-serif", fontSize: 13, color: gold }}>+50 loyalty points added to your account! 🌟</div>
                <button className="outline-btn" style={{ marginTop: 32 }} onClick={() => { setBookingDone(false); setSelectedTable(null); setBookingForm({ name: "", email: "", date: "", time: "", guests: 2, requests: "" }); }}>Make Another Reservation</button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* OFFERS — Spin Wheel + Loyalty */}
      <section id="offers" style={{ padding: "100px 40px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Exclusive Perks</div>
          <div className="section-title" style={{ marginBottom: 8 }}>Offers & Loyalty</div>
          <div className="gold-line" />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="two-col">
          {/* Spin Wheel */}
          <Reveal delay={0.1}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 40, textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🎰 Spin to Win!</div>
              <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 13, marginBottom: 32 }}>Once per visit — exclusive discounts & perks</div>
              <div style={{ position: "relative", display: "inline-block" }}>
                <div style={{ fontSize: 12, position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", color: gold, fontWeight: 700 }}>▼</div>
                <div style={{ width: 220, height: 220, borderRadius: "50%", border: `4px solid ${gold}`, position: "relative", overflow: "hidden", transform: `rotate(${spinAngle}deg)`, transition: spinning ? "transform 3.5s cubic-bezier(.2,.8,.2,1)" : "none", background: `conic-gradient(${SPIN_PRIZES.map((p, i) => `${["#C9A84C","#3B82F6","#22C55E","#EF4444","#8B5CF6","#F59E0B","#EC4899","#14B8A6"][i]} ${i * (100 / SPIN_PRIZES.length)}% ${(i + 1) * (100 / SPIN_PRIZES.length)}%`).join(",")})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: surface, border: `3px solid ${gold}`, zIndex: 2 }} />
                </div>
              </div>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <button className="gold-btn" onClick={spinWheel} disabled={spinning}>{spinning ? "Spinning..." : "Spin the Wheel!"}</button>
                {spinPrize && (
                  <div style={{ background: `${gold}22`, border: `1px solid ${gold}`, borderRadius: 12, padding: "16px 24px", fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: gold }}>
                    🎁 You won: {spinPrize}!
                  </div>
                )}
              </div>
            </div>
          </Reveal>

          {/* Loyalty */}
          <Reveal delay={0.2}>
            <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 20, padding: 40 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>⭐ Loyalty Program</div>
              <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 13, marginBottom: 32 }}>Earn points with every visit & redeem exclusive rewards</div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ fontSize: 48 }}>{loyalTier?.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 700, color: loyalTier?.color, marginTop: 8 }}>{loyalTier?.name} Member</div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, color: muted, marginTop: 4 }}>{loyaltyPoints} points</div>
              </div>
              <div style={{ background: dark ? "#111" : "#F0EAD6", borderRadius: 100, height: 8, overflow: "hidden", marginBottom: 12 }}>
                <div style={{ height: "100%", background: `linear-gradient(90deg,${loyalTier?.color},${gold})`, borderRadius: 100, width: `${Math.min(100, ((loyaltyPoints - loyalTier.min) / (loyalTier.max - loyalTier.min + 1)) * 100)}%`, transition: "width 1.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Lato',sans-serif", fontSize: 11, color: muted, marginBottom: 32 }}>
                <span>{loyalTier?.name}</span><span>Next: {LOYALTY_TIERS[Math.min(3, LOYALTY_TIERS.indexOf(loyalTier) + 1)]?.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["🍷 Free glass of wine", 100], ["🎂 Free dessert", 200], ["🥗 Free starter", 300], ["🍽️ Free main course", 500]].map(([reward, pts]) => (
                  <div key={reward} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: loyaltyPoints >= pts ? `${gold}11` : dark ? "#111" : "#F5F5F0", borderRadius: 8, border: `1px solid ${loyaltyPoints >= pts ? gold + "44" : border}` }}>
                    <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 13 }}>{reward}</span>
                    <span style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: loyaltyPoints >= pts ? gold : muted, fontWeight: 700 }}>{loyaltyPoints >= pts ? "✓ Unlocked" : `${pts} pts`}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STORY */}
      <section id="story" style={{ padding: "100px 40px", background: dark ? "#0D0D0D" : "#F5F0E8" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Our Heritage</div>
            <div className="section-title" style={{ marginBottom: 8 }}>The Savoria Story</div>
            <div className="gold-line" />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="two-col">
            <Reveal delay={0.1}>
              <div style={{ fontFamily: "'Lato',sans-serif", color: muted, fontSize: 16, lineHeight: 1.9 }}>
                <p style={{ marginBottom: 20 }}>Founded in 2012 by Chef Marco Bellini, Savoria was born from a simple belief: that food is the purest form of storytelling. Every dish on our menu carries a narrative — of place, season, and passion.</p>
                <p style={{ marginBottom: 20 }}>We source our ingredients from a network of 40+ artisan producers across Europe, from the truffle forests of Périgord to the wagyu farms of Kagoshima. Our wine cellar holds over 800 labels, curated by our resident sommelier.</p>
                <p>Two Michelin stars. Twelve years. One unwavering mission — to make every guest feel extraordinary.</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
                {[["🌍", "40+", "Artisan Suppliers"], ["🍷", "800+", "Wine Labels"], ["👨‍🍳", "18", "Kitchen Brigade"], ["🏆", "12", "Industry Awards"]].map(([emoji, n, l]) => (
                  <div key={l} style={{ background: surface, border: `1px solid ${border}`, borderRadius: 12, padding: "20px", textAlign: "center" }}>
                    <div style={{ fontSize: 28 }}>{emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: gold, marginTop: 8 }}>{n}</div>
                    <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: 40 }}>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, color: gold, textTransform: "uppercase", marginBottom: 20 }}>Guest Reviews</div>
                <div style={{ position: "relative", overflow: "hidden", minHeight: 160 }}>
                  {REVIEWS.map((r, i) => (
                    <div key={i} style={{ position: "absolute", top: 0, left: 0, right: 0, opacity: reviewIdx === i ? 1 : 0, transform: reviewIdx === i ? "translateX(0)" : "translateX(40px)", transition: "all 0.6s ease" }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>{"★★★★★".split("").map((s, j) => <span key={j} style={{ color: gold, fontSize: 18 }}>{s}</span>)}</div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, marginBottom: 16, color: text }}>"{r.text}"</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${gold},#E8C97A)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 13, color: "#1A1A1A" }}>{r.avatar}</div>
                        <div>
                          <div style={{ fontFamily: "'Lato',sans-serif", fontWeight: 700, fontSize: 14 }}>{r.name}</div>
                          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted }}>{r.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 160 }}>
                  {REVIEWS.map((_, i) => (
                    <button key={i} onClick={() => setReviewIdx(i)} style={{ width: reviewIdx === i ? 24 : 8, height: 8, borderRadius: 4, background: reviewIdx === i ? gold : border, border: "none", cursor: "pointer", transition: "all .3s" }} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 4, color: gold, textTransform: "uppercase", marginBottom: 12 }}>Find Us</div>
          <div className="section-title" style={{ marginBottom: 8 }}>Contact & Hours</div>
          <div className="gold-line" />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {[
            ["📍", "Location", "14 Mayfair Row, London W1K 4NR"],
            ["📞", "Phone", "+44 20 7123 4567"],
            ["✉️", "Email", "reservations@savoria.co.uk"],
            ["🕐", "Mon–Thu", "18:00 – 22:30"],
            ["🕐", "Fri–Sat", "17:30 – 23:00"],
            ["🕐", "Sunday", "12:00 – 21:00"],
          ].map(([emoji, label, val]) => (
            <Reveal key={label}>
              <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: "24px 28px" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = gold} onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, color: muted, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>{label}</div>
                <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 14, fontWeight: 700 }}>{val}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "48px 40px", background: dark ? "#080808" : "#F0EAD6" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 900, color: gold, letterSpacing: 3 }}>SAVORIA</div>
            <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, marginTop: 6, letterSpacing: 2 }}>FINE DINING REDEFINED · EST. 2012</div>
          </div>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 12, color: muted, textAlign: "center" }}>
            © 2024 Savoria. All rights reserved. · 2 Michelin Stars
          </div>
          <button onClick={() => setDark(d => !d)} className="outline-btn" style={{ fontSize: 12 }}>
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </footer>
    </div>
  );
}
