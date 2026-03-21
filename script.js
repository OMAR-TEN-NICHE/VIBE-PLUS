// 1. Countdown
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        document.querySelector('#countdown').textContent = 
            (hours < 10 ? "0" + hours : hours) + ":" + 
            (minutes < 10 ? "0" + minutes : minutes) + ":" + 
            (seconds < 10 ? "0" + seconds : seconds);
        if (--timer < 0) timer = duration;
    }, 1000);
}

// 2. Cart & Toast
let cartCount = 0;
function addToCart(name) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    showToast("🛒 Đã thêm " + name + " vào giỏ hàng!");
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:#4cd137"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 3000);
}

// 3. Social Proof (Thông báo ảo)
const buyers = ["Anh Quân", "Bảo Ngọc", "Minh Hằng", "Tuấn Khải", "Thùy Trang"];
setInterval(() => {
    const name = buyers[Math.floor(Math.random() * buyers.length)];
    showToast(`🛍️ ${name} vừa chốt đơn Combo Vip Pro!`);
}, 12000);

// 4. Modal Chi tiết
function openProduct(name, ingred, desc) {
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalIngredText").innerText = ingred;
    document.getElementById("modalDescText").innerText = desc;
    document.getElementById("productModal").style.display = "block";
}

function closeModal() { document.getElementById("productModal").style.display = "none"; }

function openTab(evt, tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].style.display = "none";
    let btns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < btns.length; i++) btns[i].className = btns[i].className.replace(" active", "");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 5. Checkout Logic
function openCheckout(name, price) {
    document.getElementById("orderItemName").innerText = name;
    document.getElementById("orderItemPrice").innerText = price;
    document.getElementById("checkoutModal").style.display = "block";
}

function closeCheckout() { document.getElementById("checkoutModal").style.display = "none"; }

function handleOrder(event) {
    event.preventDefault();
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;
    const address = document.getElementById("custAddress").value;
    const product = document.getElementById("orderItemName").innerText;
    const price = document.getElementById("orderItemPrice").innerText;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\n\nKhách hàng: ${name}\nSĐT: ${phone}\nSản phẩm: ${product}\nTổng tiền: ${price}\nThanh toán: ${payment}\n\nVIBE+ sẽ gọi xác nhận đơn hàng cho bạn ngay!`);
    
    window.open("https://facebook.com", "_blank");
    closeCheckout();
    document.getElementById("orderForm").reset();
}

window.onload = () => { startCountdown(7200); };
window.onclick = (e) => { 
    if (e.target.className == 'modal') { closeModal(); closeCheckout(); }
}  
