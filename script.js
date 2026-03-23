let cart = [];
let timeLeft = 7200;

// 1. COUNTDOWN TIMER
const timerDisplay = document.getElementById("countdown");
if (timerDisplay) {
    setInterval(() => {
        let h = Math.floor(timeLeft / 3600);
        let m = Math.floor((timeLeft % 3600) / 60);
        let s = timeLeft % 60;
        timerDisplay.innerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (timeLeft > 0) timeLeft--;
    }, 1000);
}

// 2. QUẢN LÝ GIỎ HÀNG
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
    showToast(`Added ${name} to cart!`);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById("cart-items-list"); // Đảm bảo ID này có trong HTML
    const cartCount = document.getElementById("cart-count");
    const totalPriceElem = document.getElementById("cart-total-price");

    let html = "";
    let total = 0;
    let totalQty = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        totalQty += item.qty;
        html += `
            <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #333; padding-bottom:5px;">
                <span>${item.name} (x${item.qty})</span>
                <span>${item.price * item.qty}k 
                    <button onclick="changeQty('${item.name}', -1)" style="margin-left:5px">-</button>
                </span>
            </div>`;
    });

    if (cartItemsContainer) cartItemsContainer.innerHTML = html || "Your cart is empty";
    if (cartCount) cartCount.innerText = totalQty;
    if (totalPriceElem) totalPriceElem.innerText = total;
}

function changeQty(name, val) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty += val;
        if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    }
    updateCartUI();
}

// 3. ĐÓNG/MỞ MODAL (Giỏ hàng & Thanh toán)
function openCart() {
    document.getElementById("cart-modal").style.display = "flex";
    updateCartUI();
}

function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// 4. XÁC NHẬN ĐẶT HÀNG
document.getElementById('checkout-form').onsubmit = function(e) {
    e.preventDefault();
    if (cart.length === 0) return alert("Giỏ hàng đang trống!");

    const name = document.getElementById("cus-name").value;
    const address = document.getElementById("cus-address").value;
    const phone = document.getElementById("cus-phone").value;
    const payment = document.querySelector('input[name="payment"]:checked').value;
    const total = document.getElementById("cart-total-price").innerText;

    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\n------------------\nKhách hàng: ${name}\nSĐT: ${phone}\nĐịa chỉ: ${address}\nTổng tiền: ${total}k\nThanh toán: ${payment}`);
    
    // Reset giỏ hàng
    cart = [];
    updateCartUI();
    closeCart();
    this.reset();
};

// 5. CÁC TÍNH NĂNG KHÁC (Lightbox, Toast, GiftCode)
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = src;
    lightbox.style.display = "flex";
}

function showToast(msg) {
    let t = document.getElementById("toast");
    if(!t) { // Tạo toast nếu chưa có
        t = document.createElement('div');
        t.id = 'toast';
        t.style = "position:fixed; bottom:20px; left:20px; background:#ff0055; color:#white; padding:10px 20px; border-radius:5px; z-index:10001; display:none;";
        document.body.appendChild(t);
    }
    t.innerText = msg;
    t.style.display = "block";
    setTimeout(() => t.style.display = "none", 3000);
}

function checkGiftCode() {
    const code = document.getElementById('couponInput').value.toUpperCase().trim();
    const resultDiv = document.getElementById('resultMessage');
    const giftDatabase = { "VIBEPRO": "Sale 10%", "ENERGY99": "Free Tote Bag" };

    if (giftDatabase[code]) {
        resultDiv.innerHTML = `🎉 ${giftDatabase[code]}`;
        resultDiv.style.color = "#00ff88";
    } else {
        resultDiv.innerHTML = "❌ Invalid code!";
        resultDiv.style.color = "#ff4444";
    }
}
