/* =============================================
   VIBE+ — COMPLETE SCRIPT
   All features: cursor, cart, timers,
   lucky draw wheel, loyalty, gift code,
   video popup, scroll reveal
   ============================================= */

let cart = [];
let timeLeft = 7200;

// ══ 1. CUSTOM CURSOR ══
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
if (cursor && cursorRing) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top = e.clientY + 'px';
        }, 60);
    });
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(0.7)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(0.85)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    });
    document.querySelectorAll('button, a, input, label, .card, .bundle-card, .perk-card, .stack img').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorRing.style.width = '54px';
            cursorRing.style.height = '54px';
            cursorRing.style.borderColor = 'rgba(240,192,64,0.8)';
            cursor.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
            cursorRing.style.width = '36px';
            cursorRing.style.height = '36px';
            cursorRing.style.borderColor = 'rgba(240,192,64,0.5)';
            cursor.style.opacity = '1';
        });
    });
}

// ══ 2. NAVBAR SCROLL ══
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.style.background = window.scrollY > 60
            ? 'rgba(8,20,42,0.98)'
            : 'rgba(8,20,42,0.92)';
    });
}

// ══ 3. COUNTDOWN TIMER (hero) ══
const timerDisplay = document.getElementById("countdown");
if (timerDisplay) {
    const tick = () => {
        let h = Math.floor(timeLeft / 3600);
        let m = Math.floor((timeLeft % 3600) / 60);
        let s = timeLeft % 60;
        timerDisplay.innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if (timeLeft > 0) timeLeft--;
    };
    tick();
    setInterval(tick, 1000);
}

// ══ 4. FLASH BAR TIMER (10PM–2AM) ══
function updateFlashCountdown() {
    const now = new Date();
    const flashEnd = new Date();
    flashEnd.setHours(2, 0, 0, 0); // 2AM
    if (now.getHours() >= 22) flashEnd.setDate(flashEnd.getDate() + 1);
    const flashStart = new Date();
    flashStart.setHours(22, 0, 0, 0);

    const el = document.getElementById('flash-countdown');
    if (!el) return;

    const isActive = now.getHours() >= 22 || now.getHours() < 2;
    if (isActive) {
        const diff = Math.max(0, flashEnd - now);
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.innerText = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    } else {
        const diff = Math.max(0, flashStart - now);
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        el.innerText = `Bắt đầu lúc 10PM (còn ${h}h${String(m).padStart(2,'0')}m)`;
    }
}
updateFlashCountdown();
setInterval(updateFlashCountdown, 1000);

// ══ 5. CART ══
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) item.qty++;
    else cart.push({ name, price, qty: 1 });
    updateCartUI();
    showToast(`✓ ${name} added to cart`);
}

function changeQty(name, val) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty += val;
        if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    }
    updateCartUI();
}

function updateCartUI() {
    const listEl = document.getElementById("cart-items-list");
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total-price");
    let total = 0, qty = 0;

    if (listEl) {
        if (cart.length === 0) {
            listEl.innerHTML = `<div class="cart-empty"><div style="font-size:2rem;margin-bottom:10px">🛒</div><p>Your cart is empty</p><p style="font-size:0.8rem;margin-top:4px;color:var(--muted2)">Add some patches to get started!</p></div>`;
        } else {
            listEl.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div style="flex:1">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">${item.price * item.qty}k</div>
                    </div>
                    <div style="display:flex;align-items:center;gap:4px">
                        <button class="cart-qty-btn" onclick="changeQty('${item.name}',-1)">−</button>
                        <span style="font-family:var(--font-ui);font-size:0.85rem;font-weight:700;min-width:20px;text-align:center">${item.qty}</span>
                        <button class="cart-qty-btn" onclick="changeQty('${item.name}',1)">+</button>
                    </div>
                    <button class="cart-item-remove" onclick="changeQty('${item.name}',-99)">✕</button>
                </div>`).join('');
            cart.forEach(i => { total += i.price * i.qty; qty += i.qty; });
        }
    }
    if (countEl) countEl.innerText = qty;
    if (totalEl) totalEl.innerText = total;
}

function openCart() {
    document.getElementById("cart-sidebar").classList.add("open");
    document.getElementById("cart-overlay").classList.add("open");
    updateCartUI();
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById("cart-sidebar").classList.remove("open");
    document.getElementById("cart-overlay").classList.remove("open");
    document.body.style.overflow = '';
}

// ══ 6. CHECKOUT ══
const checkoutForm = document.getElementById('checkout-form');
if (checkoutForm) {
    checkoutForm.onsubmit = function(e) {
        e.preventDefault();
        if (cart.length === 0) { showToast('⚠ Your cart is empty!'); return; }
        const name = document.getElementById("cus-name").value;
        const address = document.getElementById("cus-address").value;
        const phone = document.getElementById("cus-phone").value;
        const payment = document.querySelector('input[name="payment"]:checked').value;
        const total = document.getElementById("cart-total-price").innerText;
        alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\n──────────────────────\nKhách hàng: ${name}\nSĐT: ${phone}\nĐịa chỉ: ${address}\nTổng tiền: ${total}k\nThanh toán: ${payment}\n──────────────────────\nCảm ơn bạn đã tin tưởng VIBE+! ⚡`);
        cart = []; updateCartUI(); closeCart(); this.reset();
    };
}

// ══ 7. VIDEO POPUP ══
function openVideo() {
    document.getElementById('video-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeVideo() {
    document.getElementById('video-overlay').classList.remove('open');
    document.body.style.overflow = '';
    const v = document.getElementById('review-video');
    if (v) v.pause();
}
// ══ 7. VIDEO POPUP 1══
function openVideo() {
    document.getElementById('video-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeVideo() {
    document.getElementById('video-overlay').classList.remove('open');
    document.body.style.overflow = '';
    const v = document.getElementById('review-video');
    if (v) v.pause();
}
// ══ 8. LUCKY DRAW ══
function openLucky() {
    document.getElementById('lucky-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    document.getElementById('lucky-result').innerText = '';
    document.getElementById('luckyCodeInput').value = '';
    document.getElementById('lucky-spin-area').style.display = 'none';
}
function closeLucky() {
    document.getElementById('lucky-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

const luckyCodeList = ['VIBE2024','VIBE+WIN','LUCKY99','TENNICHE','PATCH01'];

function validateLuckyCode() {
    const code = document.getElementById('luckyCodeInput').value.toUpperCase().trim();
    const resultEl = document.getElementById('lucky-result');
    if (!code) { resultEl.innerText = '⚠ Vui lòng nhập mã!'; resultEl.style.color = 'var(--muted)'; return; }
    if (luckyCodeList.includes(code)) {
        resultEl.innerText = '✅ Mã hợp lệ! Nhấn QUAY để nhận thưởng 🎉';
        resultEl.style.color = '#4db8ff';
        document.getElementById('lucky-spin-area').style.display = 'block';
        drawWheel();
    } else {
        resultEl.innerText = '❌ Mã không hợp lệ. Kiểm tra lại bao bì nhé!';
        resultEl.style.color = 'var(--hot)';
        document.getElementById('lucky-spin-area').style.display = 'none';
    }
}

const prizes = [
    { label: 'Free Patch 🩹', color: '#1a3357', text: '#f0c040' },
    { label: 'Voucher 5%', color: '#0f2040', text: '#4db8ff' },
    { label: 'Free Ship 🚚', color: '#1a3357', text: '#f0c040' },
    { label: 'Thử lại 😅', color: '#0a1628', text: '#7890b8' },
    { label: 'Voucher 10%', color: '#132550', text: '#ffd966' },
    { label: 'Free Box 📦', color: '#0f2040', text: '#ff6b35' },
    { label: 'Free Patch 🩹', color: '#1a3357', text: '#f0c040' },
    { label: 'Thử lại 😅', color: '#0a1628', text: '#7890b8' },
];

function drawWheel(rotation = 0) {
    const canvas = document.getElementById('luckyWheel');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 10;
    const arc = (2 * Math.PI) / prizes.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    prizes.forEach((p, i) => {
        const start = rotation + i * arc - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, start + arc);
        ctx.closePath();
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = p.text;
        ctx.font = 'bold 11px Syne, sans-serif';
        ctx.fillText(p.label, r - 12, 5);
        ctx.restore();
    });
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#f0c040';
    ctx.fill();
    ctx.fillStyle = '#08142a';
    ctx.font = 'bold 10px Bebas Neue, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', cx, cy);
}

let spinning = false;
function spinWheel() {
    if (spinning) return;
    spinning = true;
    const btn = document.getElementById('spinBtn');
    if (btn) btn.disabled = true;

    const winIdx = Math.floor(Math.random() * prizes.length);
    const arc = (2 * Math.PI) / prizes.length;
    const totalRotation = (Math.PI * 2 * (5 + Math.random() * 5))
        + (prizes.length - winIdx) * arc - arc / 2;

    let start = null, current = 0;
    const duration = 4000;

    function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

    function animate(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        current = easeOut(progress) * totalRotation;
        drawWheel(current);
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            if (btn) btn.disabled = false;
            const resultEl = document.getElementById('lucky-result');
            resultEl.innerHTML = `🎉 Chúc mừng! Bạn nhận được: <strong style="color:var(--gold)">${prizes[winIdx].label}</strong>`;
            resultEl.style.color = '#4db8ff';
            showToast(`🎁 ${prizes[winIdx].label}`);
        }
    }
    requestAnimationFrame(animate);
}

// ══ 9. LOYALTY ══
function openLoyalty() {
    document.getElementById('loyalty-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLoyalty() {
    document.getElementById('loyalty-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

// ══ 10. LIGHTBOX ══
function openLightbox(src) {
    const lb = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    if (lb && img) { img.src = src; lb.style.display = "flex"; }
}

// ══ 11. TOAST ══
function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
    t.innerText = msg;
    t.style.display = 'block';
    t.style.animation = 'none';
    void t.offsetWidth;
    t.style.animation = 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1)';
    clearTimeout(t._timeout);
    t._timeout = setTimeout(() => t.style.display = 'none', 3000);
}

// ══ 12. GIFT CODE ══
function checkGiftCode() {
    const code = document.getElementById('couponInput')?.value.toUpperCase().trim();
    const resultDiv = document.getElementById('resultMessage');
    if (!resultDiv) return;
    const gifts = {
        "VIBEPRO": { msg: "🎉 Chúc mừng! Bạn nhận được Sale 10%!", color: "#f0c040" },
        "ENERGY99": { msg: "🎁 Tuyệt vời! Bạn nhận được Free Tote Bag!", color: "#4db8ff" },
    };
    if (!code) { resultDiv.innerText = "Please enter a code."; resultDiv.style.color = "var(--muted)"; return; }
    if (gifts[code]) {
        resultDiv.innerHTML = gifts[code].msg;
        resultDiv.style.color = gifts[code].color;
    } else {
        resultDiv.innerHTML = "❌ Invalid code. Try again!";
        resultDiv.style.color = "var(--hot)";
    }
}
document.getElementById('couponInput')?.addEventListener('keydown', e => { if (e.key === 'Enter') checkGiftCode(); });

// ══ 13. SCROLL REVEAL ══
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.card, .bundle-card, .review-card, .step-card, .hl-row, .stat-card, .perk-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`;
    revealObserver.observe(el);
});

// ══ 14. HERO IMAGE CYCLE ══
const heroImg = document.querySelector('.hero-img');
const heroImages = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
let heroIdx = 0;
if (heroImg) {
    setInterval(() => {
        heroIdx = (heroIdx + 1) % heroImages.length;
        heroImg.style.opacity = '0';
        heroImg.style.transition = 'opacity 0.5s ease';
        setTimeout(() => { heroImg.src = heroImages[heroIdx]; heroImg.style.opacity = '1'; }, 500);
    }, 3200);
}

// Init
updateCartUI();
drawWheel();
