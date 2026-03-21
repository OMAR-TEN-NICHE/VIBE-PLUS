let cart=[];
let total=0;

/* countdown */
let t=7200;
setInterval(()=>{
let h=Math.floor(t/3600);
let m=Math.floor((t%3600)/60);
let s=t%60;
document.getElementById("countdown").innerText=`${h}:${m}:${s}`;
if(t>0)t--;
},1000);

/* add cart */
function addToCart(name,price){
let item=cart.find(i=>i.name===name);

if(item){item.qty++;}
else{cart.push({name,price,qty:1});}

updateCart();
showToast("Đã thêm "+name);
}

/* update */
function updateCart(){
let html="";
total=0;

cart.forEach(i=>{
total+=i.price*i.qty;

html+=`
<div>${i.name} x${i.qty}
<button onclick="change('${i.name}',1)">+</button>
<button onclick="change('${i.name}',-1)">-</button>
</div>`;
});

document.getElementById("cart-items").innerHTML=html;
document.getElementById("total").innerText=total;
document.getElementById("cart-count").innerText=cart.length;
}

/* change qty */
function change(name,val){
let item=cart.find(i=>i.name===name);
item.qty+=val;
if(item.qty<=0){
cart=cart.filter(i=>i.name!==name);
}
updateCart();
}

/* cart modal */
function openCart(){document.getElementById("cartModal").style.display="block";}
function closeCart(){document.getElementById("cartModal").style.display="none";}

/* checkout */
function checkout(){
document.getElementById("checkoutModal").style.display="block";
document.getElementById("final").innerText=total;
}

/* confirm */
function confirmOrder(){
alert("🎉 Đặt hàng thành công!");
cart=[];
updateCart();
}

/* toast */
function showToast(msg){
let t=document.getElementById("toast");
t.innerText=msg;
t.style.display="block";
setTimeout(()=>t.style.display="none",2000);
}

/* fake buyer */
setInterval(()=>{
showToast("🔥 Có người vừa mua hàng!");
},8000);
