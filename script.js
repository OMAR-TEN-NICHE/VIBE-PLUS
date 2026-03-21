// 1. Countdown Timer
function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
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

// 2. Giỏ hàng & Like
let cartCount = 0;
function addToCart(name) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    showToast("🛒 Đã thêm " + name + " vào giỏ hàng!");
}

function toggleLike(el, name) {
    const icon = el.querySelector('i');
    if(icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        showToast("❤️ Đã thích " + name);
    } else {
        icon.classList.replace('fas', 'far');
    }
}

// 3. Thông báo ảo (Social Proof)
const buyers = ["Khánh Linh", "Tuấn Anh", "Minh Nguyệt", "Đức Huy", "Thanh Thảo"];
function showFakeOrder() {
    const name = buyers[Math.floor(Math.random() * buyers.length)];
    showToast(`🛍️ ${name} vừa đặt mua sản phẩm VIBE+!`);
}
setInterval(showFakeOrder, 10000);

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:#4cd137"></i> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 500); }, 3000);
}

// 4. Modal Logic
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

window.onclick = function(e) {
    if (e.target == document.getElementById("productModal")) closeModal();
}

window.onload = function() { startCountdown(7200); };
  
