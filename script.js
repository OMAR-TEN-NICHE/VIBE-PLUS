let cart = 0;

/* COUNTDOWN */
let t = 7200;
setInterval(()=>{
let h=Math.floor(t/3600);
let m=Math.floor((t%3600)/60);
let s=t%60;

document.getElementById("countdown").innerText =
`${h}:${m}:${s}`;

if(t>0) t--;
},1000);

/* DETAIL */
function openDetail(name){
document.getElementById("modal").style.display="block";
document.getElementById("name").innerText=name;
}

function closeDetail(){
document.getElementById("modal").style.display="none";
}

/* BUY */
function buyNow(){
cart++;
document.getElementById("cart-count").innerText=cart;
showToast("🛒 Đã thêm vào giỏ");

/* upsell */
setTimeout(()=>{
showToast("🔥 Mua combo tiết kiệm hơn!");
},2000);
}

/* COMBO */
function buyCombo(name,price){
cart++;
document.getElementById("cart-count").innerText=cart;
showToast("🔥 Đã chọn " + name);
}

/* TOAST */
function showToast(msg){
let t=document.getElementById("toast");
t.innerText=msg;
t.style.display="block";
setTimeout(()=>t.style.display="none",2000);
}

/* FAKE BUY */
setInterval(()=>{
showToast("🔥 Có người vừa mua sản phẩm!");
},8000);

/* LANGUAGE */
function setLang(lang){
alert("Demo thôi 😆");
}
    
