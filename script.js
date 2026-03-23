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
    const names = ["Alex", "Jordan", "Sarah", "Minh", "Elena", "Johanna", "Smith","Loan"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    showToast(`🔥 ${randomName} just purchased a Bundle!`);
}, 12000);
    
  
// --- 1. QUẢN LÝ GIỎ HÀNG & SẢN PHẨM ---
let cartCount = 0;
function addToCart(product) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert("🚀 Đã thêm " + product + " vào giỏ hàng!");
}

function openProduct(title, ingred, desc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalIngredText').innerText = ingred;
    document.getElementById('modalDescText').innerText = desc;
    document.getElementById('productModal').style.display = "flex";
}

function closeModal() {
    document.getElementById('productModal').style.display = "none";
}

// --- 2. HỆ THỐNG MÃ QUÀ TẶNG (GIFT CODE) ---
const giftDatabase = {
    "24424242": "🎁 Congratulation! You just received Voucher Sale 50.000 VND: VIBE50K",
    "VIBEPRO": "🔥 Promotion VIP: Sale 5-10% for the first order !",
    "STAYUP": "🚚 Free shipping for this order: FREESHIP01",
    "ENERGY99": "⚡ Receive a free VIBE+ Tote Bag with your purchase!"
};

function checkGiftCode() {
    const input = document.getElementById('couponInput');
    const resultDiv = document.getElementById('resultMessage');
    const code = input.value.toUpperCase().trim();

    // Hiệu ứng khi nhấn nút
    console.log("Đang kiểm tra mã: " + code);

    if (code === "") {
        resultDiv.innerHTML = "❌ Vui lòng nhập mã bí mật!";
        resultDiv.style.color = "#ffcc00";
        return;
    }

    if (giftDatabase[code]) {
        // Nếu mã ĐÚNG
        resultDiv.innerHTML = `🎉 CONGRATULATIONS!<br><b style="font-size: 1.2em;">${giftDatabase[code]}</b>`;
        resultDiv.style.color = "#00ff88";
        input.style.borderColor = "#00ff88";
        
        // Hiệu ứng rung nhẹ thành công
        resultDiv.style.animation = "bounce 0.5s";
    } else {
        // Nếu mã SAI
        resultDiv.innerHTML = "❌ Invalid or expired code!";
        resultDiv.style.color = "#ff4444";
        input.style.borderColor = "#ff4444";
    }
}

// --- 3. TỰ ĐỘNG XỬ LÝ KHI QUÉT QR (Link có đuôi ?code=...) ---
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    
    if (codeFromUrl) {
        // Cuộn xuống phần nhập mã
        document.getElementById('gift-code').scrollIntoView({ behavior: 'smooth' });
        // Điền mã và tự động kiểm tra
        document.getElementById('couponInput').value = codeFromUrl;
        setTimeout(checkGiftCode, 800); 
    }
};

// Đóng modal khi click ra ngoài
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
   
