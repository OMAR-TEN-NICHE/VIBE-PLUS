let cart=[];
let total=0;

/* ADD */
function addToCart(name,price){
let item=cart.find(i=>i.name===name);

if(item){
item.qty++;
}else{
cart.push({name,price,qty:1});
}

updateCart();
}

/* UPDATE */
function updateCart(){
let html="";
total=0;

cart.forEach(i=>{
total+=i.price*i.qty;

html+=`
<div>
${i.name} x${i.qty}
<button onclick="changeQty('${i.name}',1)">+</button>
<button onclick="changeQty('${i.name}',-1)">-</button>
</div>
`;
});

document.getElementById("cart-items").innerHTML=html;
document.getElementById("total").innerText=total;
document.getElementById("cart-count").innerText=cart.length;
}

/* CHANGE */
function changeQty(name,val){
let item=cart.find(i=>i.name===name);
item.qty+=val;
if(item.qty<=0){
cart=cart.filter(i=>i.name!==name);
}
updateCart();
}

/* OPEN CART */
function openCart(){
document.getElementById("cartModal").style.display="block";
}

function closeCart(){
document.getElementById("cartModal").style.display="none";
}

/* DETAIL */
function openDetail(name,price){
addToCart(name,price);
}

/* CHECKOUT */
function checkout(){
document.getElementById("checkoutModal").style.display="block";
document.getElementById("final").innerText=total;
}

/* CONFIRM */
function confirmOrder(){
alert("🎉 Đặt hàng thành công!");
cart=[];
updateCart();
}

/* SWIPE smooth */
document.querySelectorAll('.scroll').forEach(el=>{
el.addEventListener('wheel', (evt)=>{
evt.preventDefault();
el.scrollLeft += evt.deltaY;
});
});
    
