// 1. Đồng hồ đếm ngược
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        const countdownEl = document.querySelector('#countdown');
        if (countdownEl) {
            countdownEl.textContent = 
                (hours < 10 ? "0" + hours : hours) + ":" + 
                (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                (seconds < 10 ? "0" + seconds : seconds);
        }
            
        if (--timer < 0) timer = duration;
    }, 1000);
}

// 2. Giỏ hàng & Thông báo Toast
let cartCount = 0;
function addToCart(name) {
    cartCount++;
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) cartBadge.innerText = cartCount;
    showToast("🛒 Đã thêm " + name + " vào giỏ hàng!");
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:#4cd137"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { 
        toast.style.opacity = '0'; 
        setTimeout(() => toast.remove(), 500); 
    }, 3000);
}

// 3. Logic Đặt hàng (Checkout)
function openCheckout(name, price) {
    document.getElementById("orderItemName").innerText = name;
    document.getElementById("orderItemPrice").innerText = price;
    document.getElementById("checkoutModal").style.display = "block";
}

function closeCheckout() {
    document.getElementById("checkoutModal").style.display = "none";
}

function handleOrder(event) {
    event.preventDefault();
    const name = document.getElementById("custName").value;
    const phone = document.getElementById("custPhone").value;
    const address = document.getElementById("custAddress").value;
    const product = document.getElementById("orderItemName").innerText;
    const price = document.getElementById("orderItemPrice").innerText;
    const payment = document.querySelector('input[name="payment"]:checked').value;

    alert(`🎉 ĐẶT HÀNG THÀNH CÔNG!\n\nKhách hàng: ${name}\nSĐT: ${phone}\nSản phẩm: ${product}\nTổng tiền: ${price}\nThanh toán qua: ${payment}\n\nNhân viên VIBE+ sẽ gọi xác nhận đơn cho bạn ngay!`);
    
    // Dẫn khách về Facebook để gửi ảnh chuyển khoản
    window.open("https://facebook.com", "_blank");
    closeCheckout();
    document.getElementById("orderForm").reset();
}

// 4. Modal Chi tiết & Tab
function openProduct(name, ingred, desc) {
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalIngredText").innerText = ingred;
    document.getElementById("modalDescText").innerText = desc;
    document.getElementById("productModal").style.display = "block";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function openTab(evt, tabName) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].style.display = "none";
    let btns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < btns.length; i++) btns[i].className = btns[i].className.replace(" active", "");
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// 5. Yêu thích (Thả tim)
function toggleLike(el, name) {
    const icon = el.querySelector('i');
    if(icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        showToast("❤️ Đã thích " + name);
    } else {
        icon.classList.replace('fas', 'far');
    }
}

window.onload = () => { startCountdown(7200); };
window.onclick = (e) => { 
    if (e.target.className === 'modal') { closeModal(); closeCheckout(); }
};
   
