function startCountdown(duration) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);
        document.querySelector('#countdown').textContent = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
        if (--timer < 0) timer = duration;
    }, 1000);
}

let count = 0;
function addToCart(name) {
    count++;
    document.getElementById('cart-count').innerText = count;
    alert("Đã thêm " + name + " vào giỏ hàng!");
}

window.onload = function () { startCountdown(7200); };
    
