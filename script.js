let cart = [];
let total = 0;

// Countdown Timer
let timeLeft = 7200;
const timerDisplay = document.getElementById("countdown");
setInterval(() => {
    let h = Math.floor(timeLeft / 3600);
    let m = Math.floor((timeLeft % 3600) / 60);
    let s = timeLeft % 60;
    timerDisplay.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    if (timeLeft > 0) timeLeft--;
}, 1000);

// Add to Cart
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCart();
    showToast(`Added ${name} to cart!`);
}

// Update Cart UI
function updateCart() {
    let html = "";
    total = 0;
    cart.forEach(i => {
        total += i.price * i.qty;
        html += `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:5px;">
                <span>${i.name} (x${i.qty})</span>
                <div>
                    <button onclick="changeQty('${i.name}', 1)" style="padding:2px 8px">+</button>
                    <button onclick="changeQty('${i.name}', -1)" style="padding:2px 8px">-</button>
                </div>
            </div>`;
    });
    document.getElementById("cart-items").innerHTML = html || "Your cart is empty";
    document.getElementById("total").innerText = total;
    document.getElementById("cart-count").innerText = cart.reduce((acc, curr) => acc + curr.qty, 0);
}

function changeQty(name, val) {
    let item = cart.find(i => i.name === name);
    item.qty += val;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    updateCart();
}

// Modals
function openCart() { document.getElementById("cartModal").style.display = "block"; }
function closeCart() { document.getElementById("cartModal").style.display = "none"; }

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    document.getElementById("checkoutModal").style.display = "block";
    document.getElementById("final").innerText = total;
}

function confirmOrder() {
    const name = document.getElementById("name").value;
    if(!name) return alert("Please enter your name");
    alert(`🎉 Thank you, ${name}! Order placed successfully.`);
    cart = [];
    updateCart();
    document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
}
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

// Notifications
function showToast(msg) {
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(() => t.style.display = "none", 3000);
}

// Random Sales Social Proof
setInterval(() => {
    const names = ["Alex", "Jordan", "Sarah", "Minh", "Elena"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    showToast(`🔥 ${randomName} just purchased a Bundle!`);
}, 12000);
    
  
// 1. Danh sách mã quà tặng (Bạn có thể thêm bớt tùy ý)
const giftDatabase = {
    "VIBEPRO": "🔥 Giảm 20% cho đơn sau! Mã: SUCCESS20",
    "STAYUP": "🚚 FREE SHIP cho đơn hàng tiếp theo: FREESHIP01",
    "ENERGY99": "🎁 Tặng 1 pack Basic khi mua đơn >200k!",
    "VIPMAX": "✨ Ưu đãi đặc quyền: Giảm trực tiếp 50k - Mã: VIBE50K"
};

// 2. Hàm kiểm tra mã
function checkGiftCode() {
    const input = document.getElementById('couponInput');
    const code = input.value.toUpperCase().trim();
    const resultDiv = document.getElementById('resultMessage');
    
    if (code === "") {
        showResult("❌ Vui lòng nhập mã vào ô!", "#ffcc00");
        return;
    }

    if (giftDatabase[code]) {
        // Nếu mã đúng
        showResult(`🎉 CHÚC MỪNG!<br><span style="font-size: 20px;">${giftDatabase[code]}</span>`, "#00ff88");
        // Hiệu ứng rung nhẹ khi thành công
        input.style.borderColor = "#00ff88";
    } else {
        // Nếu mã sai
        showResult("❌ Mã không hợp lệ. Vui lòng kiểm tra lại!", "#ff4444");
        input.style.borderColor = "#ff4444";
    }
}

// Hàm hiển thị thông báo
function showResult(text, color) {
    const resultDiv = document.getElementById('resultMessage');
    resultDiv.innerHTML = text;
    resultDiv.style.color = color;
    resultDiv.style.transform = "scale(1.1)";
    setTimeout(() => { resultDiv.style.transform = "scale(1)"; }, 200);
}

// 3. TỰ ĐỘNG LẤY MÃ TỪ LINK QR (Ví dụ: .../index.html?code=VIBEPRO)
window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    
    if (codeFromUrl) {
        // Cuộn trang xuống phần nhập mã
        const giftSection = document.getElementById('gift-code');
        if (giftSection) {
            giftSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Điền mã vào ô và tự động bấm kiểm tra
        document.getElementById('couponInput').value = codeFromUrl;
        setTimeout(checkGiftCode, 1000); // Đợi 1s sau khi cuộn rồi hiện kết quả
    }
});
