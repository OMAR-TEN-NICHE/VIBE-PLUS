// 1. Đếm ngược Flash Sale
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

// 2. Giỏ hàng
let count = 0;
function addToCart(name) {
    count++;
    document.getElementById('cart-count').innerText = count;
    alert("Đã thêm " + name + " vào giỏ hàng!");
}

// 3. Logic Hiện/Ẩn Chi tiết sản phẩm (Modal)
function openModal(name, description) {
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("productModal").style.display = "block";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

// Đóng modal khi click ra ngoài
window.onclick = function(event) {
    let modal = document.getElementById("productModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Khởi chạy khi load trang
window.onload = function () { 
    startCountdown(7200); // 2 tiếng
};
     
