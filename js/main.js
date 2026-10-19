
/* =========================================================
   Just4me LLC - Store Engine (just4me.store)
   ========================================================= */

const PRODUCTS = [
  { id:1, name:"Blush Bloom Eau de Parfum, 1.7 fl oz", price:48.00, img:"images/products/perfume.jpg",
    badge:"Best Seller", rating:"4.8",
    short:"A soft floral fragrance with notes of rose, peony, and warm vanilla.",
    desc:"Blush Bloom is a gentle, classic floral fragrance made for everyday elegance. Light top notes of fresh peony open into a heart of damask rose, resting on a soft base of vanilla and musk. Long-lasting yet never overpowering - a fragrance that feels like you, only lovelier." },
  { id:2, name:"Shea Rich Body Butter, 8 oz", price:19.99, img:"images/products/body-butter.jpg",
    badge:"Customer Favorite", rating:"4.9",
    short:"Thick, whipped shea butter that melts in for all-day softness.",
    desc:"Our richest body butter blends shea and cocoa butters with sweet almond oil. Whipped to a cloud-like texture, it absorbs without a greasy feel. Ideal for elbows, knees, hands, and anywhere skin feels dry. Gentle enough for daily use on all skin types." },
  { id:3, name:"Velvet Matte Lipstick Set - 6 Shades", price:24.95, img:"images/products/lipstick-set.jpg",
    badge:"Gift Ready", rating:"4.7",
    short:"Six flattering matte shades from soft nude to classic red.",
    desc:"Six comfortable matte lipsticks in one beautiful gift box. From everyday rose and nude tones to a confident classic red, every shade was chosen to flatter mature lips. Smooth glide-on formula with vitamin E - no feathering, no drying." },
  { id:4, name:"Rose Petal Refreshing Facial Mist, 12 fl oz", price:14.50, img:"images/products/rose-mist.jpg",
    badge:"", rating:"4.8",
    short:"A fine rosewater mist to refresh skin any time of day.",
    desc:"Pure rosewater in a fine, even spray. Mist over the face morning and night, or anytime you want a fresh, dewy feeling. Free of dyes and drying alcohol. Dermatologically tested and suitable for all skin types, including sensitive skin." },
  { id:5, name:"Pear Blossom Hand & Body Lotion, 10 fl oz", price:16.75, img:"images/products/pear-lotion.jpg",
    badge:"", rating:"4.6",
    short:"A silky, fast-absorbing lotion with a light pear blossom scent.",
    desc:"A silky daily lotion that absorbs quickly and leaves skin feeling soft and smooth. Scented with a delicate pear blossom fragrance - fresh, clean, and never heavy. The generous pump bottle is easy to use, even with arthritic hands." },
  { id:6, name:"Everyday Gentle Moisture Lotion, 12 fl oz", price:12.99, img:"images/products/daily-lotion.jpg",
    badge:"Sensitive Skin", rating:"4.7",
    short:"Fragrance-free option available - gentle daily hydration.",
    desc:"A fragrance-free daily moisturizer formulated for sensitive and easily-irritated skin. Light, non-greasy, and fast-absorbing. Use on face and body morning and night for comfortable, hydrated skin." },
  { id:7, name:"Classic Colour Lipstick Collection - 6 Pc", price:21.50, img:"images/products/lipstick-classic.jpg",
    badge:"", rating:"4.5",
    short:"Timeless cream lipsticks in wearable, everyday colors.",
    desc:"Six classic cream-finish lipsticks in the most-requested shades. Creamy, comfortable, and enriched with jojoba oil to glide on smoothly and keep lips feeling soft. A staple set for any makeup bag." },
  { id:8, name:"Fruit Garden Body Butter Trio - 3 x 8 oz", price:29.99, img:"images/products/fruit-butter.jpg",
    badge:"Great Value", rating:"4.8",
    short:"Strawberry, mango, and coconut whipped body butters.",
    desc:"Three full-size whipped body butters in Strawberry, Mango, and Coconut. Each jar blends fruit extracts with shea butter for deep, lasting softness and a fresh, light scent. Keep one, gift two - or keep them all." },
  { id:9, name:"Pure Rosewater Facial Toner, 1.8 fl oz", price:11.25, img:"images/products/rose-toner.jpg",
    badge:"", rating:"4.7",
    short:"One-ingredient rosewater toner for simple skincare routines.",
    desc:"Steam-distilled rosewater - nothing else. Use after cleansing to tone and refresh, or spritz throughout the day. Made for customers who love simple, honest skincare with ingredients they recognize." },
  { id:10, name:"Gentle Definition Hypoallergenic Mascara", price:13.95, img:"images/products/mascara.jpg",
    badge:"Hypoallergenic", rating:"4.6",
    short:"Ophthalmologist-tested tubing mascara for sensitive eyes.",
    desc:"A gentle tubing mascara that wraps each lash in tiny water-resistant tubes - no smudging, no flaking, and easy removal with warm water alone. Formulated for sensitive eyes and contact lens wearers." },
];

const SHIPPING_FLAT = 5.95;
const FREE_SHIP_OVER = 50.00;
const TAX_RATE = 0.00; // set your state sales tax here before launch

/* ---------- Cart helpers ---------- */
function getCart(){ try { return JSON.parse(localStorage.getItem("j4m_cart")) || []; } catch(e){ return []; } }
function saveCart(c){ localStorage.setItem("j4m_cart", JSON.stringify(c)); updateCartBadge(); }
function cartItemCount(){ return getCart().reduce((s,i)=>s+i.qty,0); }
function updateCartBadge(){
  document.querySelectorAll(".cart-count").forEach(el => el.textContent = cartItemCount());
}
function addToCart(id, qty){
  const cart = getCart();
  const found = cart.find(i => i.id === id);
  if (found) found.qty += qty; else cart.push({id, qty});
  saveCart(cart);
  const p = PRODUCTS.find(p=>p.id===id);
  showToast("Added to cart: " + p.name);
}
function money(n){ return "$" + n.toFixed(2); }

/* ---------- Toast ---------- */
function showToast(msg){
  let t = document.querySelector(".toast");
  if (!t){ t = document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._timer); t._timer = setTimeout(()=>t.classList.remove("show"), 2600);
}

/* ---------- Product rendering ---------- */
function productCard(p){
  return '<article class="card">' +
    '<img src="'+p.img+'" alt="'+p.name+'" loading="lazy">' +
    '<div class="card-body">' +
      (p.badge ? '<span class="badge">'+p.badge+'</span>' : '') +
      '<h3>'+p.name+'</h3>' +
      '<div class="stars" aria-label="Rated '+p.rating+' out of 5">'+"\u2605".repeat(5)+' <span class="qty-note">'+p.rating+' / 5</span></div>' +
      '<p class="qty-note">'+p.short+'</p>' +
      '<div class="price">'+money(p.price)+'</div>' +
      '<div class="card-actions">' +
        '<button class="btn btn-outline" onclick="openProduct('+p.id+')">Details</button>' +
        '<button class="btn" onclick="addToCart('+p.id+',1)">Add to Cart</button>' +
      '</div>' +
    '</div>' +
  '</article>';
}
function renderGrid(elId, list){
  const el = document.getElementById(elId);
  if (el) el.innerHTML = list.map(productCard).join("");
}

/* ---------- Product modal ---------- */
function openProduct(id){
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  let bd = document.querySelector(".modal-backdrop");
  if (!bd){
    bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-label="Product details"></div>';
    bd.addEventListener("click", e => { if (e.target === bd) closeProduct(); });
    document.body.appendChild(bd);
  }
  bd.querySelector(".modal").innerHTML =
    '<button class="modal-close" onclick="closeProduct()" aria-label="Close dialog">\u00D7</button>' +
    '<img src="'+p.img+'" alt="'+p.name+'">' +
    '<h3>'+p.name+'</h3>' +
    '<div class="price">'+money(p.price)+'</div>' +
    '<p>'+p.desc+'</p>' +
    '<p class="qty-note"><strong>Free shipping</strong> on orders over '+money(FREE_SHIP_OVER)+'. 30-day easy returns.</p>' +
    '<div class="card-actions" style="margin-top:18px">' +
      '<button class="btn" onclick="addToCart('+p.id+',1)">Add to Cart - '+money(p.price)+'</button>' +
    '</div>';
  bd.classList.add("open");
  bd.querySelector(".modal-close").focus();
}
function closeProduct(){
  const bd = document.querySelector(".modal-backdrop");
  if (bd) bd.classList.remove("open");
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeProduct(); });

/* ---------- Cart page ---------- */
function renderCart(){
  const wrap = document.getElementById("cart-content");
  if (!wrap) return;
  const cart = getCart();
  if (!cart.length){
    wrap.innerHTML = '<div class="confirm-box"><h1 style="color:var(--deep)">Your cart is empty</h1>' +
      '<p style="margin:16px 0">Browse our collection and find something you will love.</p>' +
      '<a class="btn" href="shop.html">Shop All Products</a></div>';
    return;
  }
  let rows = "", subtotal = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(x=>x.id===item.id);
    if (!p) return;
    subtotal += p.price * item.qty;
    rows += '<tr>' +
      '<td><img src="'+p.img+'" alt="'+p.name+'" style="width:80px;height:80px;object-fit:cover;border-radius:8px"></td>' +
      '<td><strong>'+p.name+'</strong></td>' +
      '<td>'+money(p.price)+'</td>' +
      '<td>' +
        '<button class="qty-btn" aria-label="Decrease quantity" onclick="changeQty('+p.id+',-1)">\u2212</button> ' +
        '<span style="font-size:20px;padding:0 8px">'+item.qty+'</span> ' +
        '<button class="qty-btn" aria-label="Increase quantity" onclick="changeQty('+p.id+',1)">+</button>' +
      '</td>' +
      '<td><strong>'+money(p.price*item.qty)+'</strong></td>' +
      '<td><button class="qty-btn" aria-label="Remove item" onclick="removeItem('+p.id+')">\u00D7</button></td>' +
    '</tr>';
  });
  const shipping = (subtotal >= FREE_SHIP_OVER) ? 0 : SHIPPING_FLAT;
  wrap.innerHTML =
    '<div class="table-wrap"><table class="cart-table">' +
    '<thead><tr><th>Product</th><th>Name</th><th>Price</th><th>Quantity</th><th>Total</th><th>Remove</th></tr></thead>' +
    '<tbody>'+rows+'</tbody></table></div>' +
    '<div class="totals">' +
      '<div class="row"><span>Subtotal</span><span>'+money(subtotal)+'</span></div>' +
      '<div class="row"><span>Shipping'+(shipping===0?' (Free!)':'')+'</span><span>'+money(shipping)+'</span></div>' +
      '<div class="row grand"><span>Total</span><span>'+money(subtotal+shipping+subtotal*TAX_RATE)+'</span></div>' +
      (shipping>0 ? '<p class="qty-note">Add '+money(FREE_SHIP_OVER-subtotal)+' more for free shipping.</p>' : '') +
      '<a class="btn btn-green" href="checkout.html" style="width:100%;margin-top:16px;text-align:center">Proceed to Secure Checkout</a>' +
      '<a href="shop.html" class="qty-note" style="display:block;text-align:center;margin-top:12px">\u2190 Continue shopping</a>' +
    '</div>';
}
function changeQty(id, delta){
  let cart = getCart();
  const item = cart.find(i=>i.id===id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i=>i.id!==id);
  saveCart(cart); renderCart();
}
function removeItem(id){ saveCart(getCart().filter(i=>i.id!==id)); renderCart(); }

/* ---------- Checkout ---------- */
function renderCheckoutSummary(){
  const el = document.getElementById("checkout-summary");
  if (!el) return;
  const cart = getCart();
  if (!cart.length){ window.location.href = "cart.html"; return; }
  let subtotal = 0, rows = "";
  cart.forEach(item => {
    const p = PRODUCTS.find(x=>x.id===item.id);
    subtotal += p.price*item.qty;
    rows += '<div class="row"><span>'+p.name+' \u00D7 '+item.qty+'</span><span>'+money(p.price*item.qty)+'</span></div>';
  });
  const shipping = (subtotal >= FREE_SHIP_OVER) ? 0 : SHIPPING_FLAT;
  el.innerHTML = rows +
    '<div class="row"><span>Subtotal</span><span>'+money(subtotal)+'</span></div>' +
    '<div class="row"><span>Shipping</span><span>'+money(shipping)+'</span></div>' +
    '<div class="row grand"><span>Total (USD)</span><span>'+money(subtotal+shipping+subtotal*TAX_RATE)+'</span></div>';
}

function initCheckoutForm(){
  const form = document.getElementById("checkout-form");
  if (!form) return;
  form.addEventListener("submit", function(e){
    e.preventDefault();
    if (!validateCheckout()) return;
    const btn = document.getElementById("pay-btn");
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Processing payment\u2026';
    setTimeout(function(){
      const orderId = "J4M-" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random()*900+100);
      const name = document.getElementById("full-name").value.trim();
      const email = document.getElementById("email").value.trim();
      const total = getCart().reduce((s,i)=>{const p=PRODUCTS.find(x=>x.id===i.id);return s+p.price*i.qty;},0);
      const shipping = (total >= FREE_SHIP_OVER) ? 0 : SHIPPING_FLAT;
      const order = { id: orderId, name, email, total: total+shipping+total*TAX_RATE, items: getCart(), date: new Date().toISOString() };
      localStorage.setItem("j4m_last_order", JSON.stringify(order));
      saveCart([]);
      window.location.href = "order-confirmation.html";
    }, 1800);
  });
}

function setInvalid(id, msg){
  const field = document.getElementById(id).closest(".form-field");
  field.classList.add("invalid");
  field.querySelector(".field-error").textContent = msg;
}
function clearInvalid(){ document.querySelectorAll(".form-field.invalid").forEach(f=>f.classList.remove("invalid")); }

function validateCheckout(){
  clearInvalid();
  let ok = true;
  const req = [
    ["full-name","Please enter your full name"],
    ["email","Please enter your email address"],
    ["address","Please enter your street address"],
    ["city","Please enter your city"],
    ["state","Please select your state"],
    ["zip","Please enter your ZIP code"],
    ["card-name","Please enter the name on the card"],
    ["card-number","Please enter your card number"],
    ["card-exp","Please enter the expiry date (MM/YY)"],
    ["card-cvv","Please enter the 3-digit security code"],
  ];
  req.forEach(([id,msg])=>{
    const el = document.getElementById(id);
    if (!el.value.trim()){ setInvalid(id,msg); ok=false; }
  });
  const email = document.getElementById("email");
  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())){ setInvalid("email","Please enter a valid email address"); ok=false; }
  const zip = document.getElementById("zip");
  if (zip.value.trim() && !/^\d{5}(-\d{4})?$/.test(zip.value.trim())){ setInvalid("zip","Please enter a valid 5-digit ZIP code"); ok=false; }
  const num = document.getElementById("card-number").value.replace(/\s/g,"");
  if (num && !/^\d{15,16}$/.test(num)){ setInvalid("card-number","Card number must be 15-16 digits"); ok=false; }
  const exp = document.getElementById("card-exp");
  if (exp.value.trim() && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp.value.trim())){ setInvalid("card-exp","Use MM/YY format, e.g. 08/28"); ok=false; }
  const cvv = document.getElementById("card-cvv");
  if (cvv.value.trim() && !/^\d{3,4}$/.test(cvv.value.trim())){ setInvalid("card-cvv","Security code must be 3-4 digits"); ok=false; }
  if (!document.getElementById("agree-terms").checked){ alert("Please agree to the Terms of Service and Privacy Policy to continue."); ok=false; }
  return ok;
}

/* ---------- Order confirmation ---------- */
function renderConfirmation(){
  const el = document.getElementById("order-details");
  if (!el) return;
  let order = null;
  try { order = JSON.parse(localStorage.getItem("j4m_last_order")); } catch(e){}
  if (!order){ el.innerHTML = '<div class="confirm-box"><h1 style="color:var(--deep)">No recent order found</h1><p style="margin:16px 0"><a href="shop.html">Return to the shop</a></p></div>'; return; }
  let rows = "";
  order.items.forEach(i => {
    const p = PRODUCTS.find(x=>x.id===i.id);
    rows += '<tr><td>'+p.name+'</td><td>'+i.qty+'</td><td>'+money(p.price*i.qty)+'</td></tr>';
  });
  el.innerHTML = '<div class="confirm-box">' +
    '<h1>Thank you, '+order.name.split(" ")[0]+'! Your order is confirmed.</h1>' +
    '<p class="order-id">Order Number: '+order.id+'</p>' +
    '<p>A confirmation email has been sent to <strong>'+order.email+'</strong>.</p>' +
    '<div class="table-wrap" style="margin:24px 0;text-align:left"><table class="cart-table"><thead><tr><th>Item</th><th>Qty</th><th>Total</th></tr></thead><tbody>'+rows+'</tbody></table></div>' +
    '<div class="totals" style="margin:0 auto"><div class="row grand"><span>Total Charged</span><span>'+money(order.total)+'</span></div></div>' +
    '<p class="qty-note" style="margin-top:20px">We will ship your order within 1-2 business days. Track your package with the link in your confirmation email.</p>' +
    '<a class="btn" href="shop.html" style="margin-top:20px">Continue Shopping</a>' +
  '</div>';
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", function(){
  updateCartBadge();
  renderGrid("featured-grid", PRODUCTS.slice(0,4));
  renderGrid("all-products-grid", PRODUCTS);
  renderCart();
  renderCheckoutSummary();
  initCheckoutForm();
  renderConfirmation();
  const yr = document.getElementById("year"); if (yr) yr.textContent = new Date().getFullYear();
});
