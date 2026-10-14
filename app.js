var RB=(function(){
var BOOKS=[
{id:1,t:"The Salt Road Home",a:"Ayesha Marlowe",c:"Fiction",p:24.99,e:12.99,col:"#7a3e8e",pub:"Rainbow Publishing",d:"After her mother dies, Nell drives the old salt road from Port Fairy to the far west of the state to deliver a box of letters. Each stop gives her another piece of the family she never knew.",new:1},
{id:2,t:"Tides of Southbank",a:"Ren Chen",c:"Australian stories",p:29.99,e:14.99,col:"#2b78b5",pub:"Rainbow Publishing",d:"A year of short stories set along the Yarra, from the early-morning rowers to the buskers who close the city down.",new:1},
{id:3,t:"The Quiet Orchard",a:"Mara Okafor",c:"Fiction",p:22.99,e:11.99,col:"#3e8e5b",pub:"Rainbow Publishing",d:"Two sisters inherit a failing apple orchard in the Goulburn Valley and have one season to decide whether to sell.",new:0},
{id:4,t:"Lantern Season",a:"Iris Tanaka",c:"Crime",p:26.99,e:13.99,col:"#b83b5e",pub:"",d:"A lantern festival, a missing violinist and a detective who would rather be fishing.",new:1},
{id:5,t:"The Last Tram to Footscray",a:"Dale Whitcombe",c:"Crime",p:24.99,e:12.99,col:"#1d6f6f",pub:"",d:"The final tram of the night carries a stranger with a briefcase, and nobody remembers him getting off.",new:0},
{id:6,t:"Field Notes from a Small Garden",a:"Hana Petrov",c:"Non-fiction",p:34.99,e:17.99,col:"#e9a820",dark:1,pub:"",d:"A year in a suburban backyard, with notes on soil, seasons and the birds that turn up uninvited.",new:0},
{id:7,t:"Atlas of Lost Rivers",a:"Tomas Reyes",c:"Non-fiction",p:39.99,e:19.99,col:"#4b6fb5",pub:"",d:"Maps and stories of the creeks and rivers that our cities buried, and the people who are bringing them back.",new:0},
{id:8,t:"Pip and the Paper Boat",a:"Lucy Armitage",c:"Children",p:16.99,e:8.99,col:"#f08a5d",dark:1,pub:"Rainbow Publishing",d:"Pip folds a paper boat and follows it down the gutter, under the road and out to sea. For ages 3 to 6.",new:1},
{id:9,t:"The Great Wombat Sleepover",a:"Sam Gill",c:"Children",p:15.99,e:7.99,col:"#d9482b",pub:"",d:"Eleven wombats, one burrow and a very loud snorer. For ages 4 to 8.",new:0},
{id:10,t:"Slow Kitchen",a:"Nina Costa",c:"Cooking",p:44.99,e:22.99,col:"#c98f4e",dark:1,pub:"",d:"Eighty recipes that start in the morning and finish at dinner, with very little effort in between.",new:0},
{id:11,t:"Winter at Wattle Creek",a:"Jonathan Croft",c:"Fiction",p:23.99,e:12.49,col:"#0f3b3f",pub:"Rainbow Publishing",d:"Six weeks of snow trap the residents of a small town together, and old arguments come back to the surface.",new:0},
{id:12,t:"The Cartographer's Daughter",a:"Veronica Watson",c:"Fiction",p:27.99,e:14.49,col:"#8b2f4a",pub:"Rainbow Publishing",d:"A mapmaker disappears in 1924, and his daughter spends forty years following the coastline he drew.",new:1}
];
var STORES=[
{n:"Collins Street",t:"Company",s:"Melbourne CBD",pc:"3000",h:"Mon-Fri 8:30-6, Sat 9-5, Sun 10-4",ph:"(03) 5550 0101"},
{n:"Southbank",t:"Company",s:"Southbank",pc:"3006",h:"Mon-Sun 9-7",ph:"(03) 5550 0102"},
{n:"Eastpoint Shopping Centre",t:"Franchise",s:"Bayswater",pc:"3153",h:"Mon-Sat 9-6, Sun 10-5",ph:"(03) 5550 0140"},
{n:"Geelong",t:"Company",s:"Geelong",pc:"3220",h:"Mon-Fri 9-5:30, Sat 9-5, Sun 10-4",ph:"(03) 5550 0120"},
{n:"Ballarat",t:"Franchise",s:"Ballarat Central",pc:"3350",h:"Mon-Sat 9-5:30, Sun 10-4",ph:"(03) 5550 0150"},
{n:"Bendigo",t:"Franchise",s:"Bendigo",pc:"3550",h:"Mon-Sat 9-5:30, Sun 10-4",ph:"(03) 5550 0160"},
{n:"Warrnambool",t:"Company",s:"Warrnambool",pc:"3280",h:"Mon-Sat 9-5, Sun 10-3",ph:"(03) 5550 0170"},
{n:"Shepparton",t:"Franchise",s:"Shepparton",pc:"3630",h:"Mon-Sat 9-5, Sun 10-3",ph:"(03) 5550 0180"}
];
function $(s,r){return (r||document).querySelector(s)}
function money(n){return "$"+n.toFixed(2)}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function get(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}}
function set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function cart(){return get("rb_cart",[])}
function saveCart(c){set("rb_cart",c);count()}
function count(){var n=cart().reduce(function(a,l){return a+l.q},0);var el=$("#cartcount");if(el)el.textContent=n}
function book(id){return BOOKS.filter(function(b){return b.id==id})[0]}
function cover(b,cls){return '<div class="cover '+(cls||"")+'" style="background:'+b.col+';'+(b.dark?'color:#0f3b3f':'')+'"><div class="t">'+esc(b.t)+'</div><div class="a">'+esc(b.a)+'</div><span class="g"></span></div>'}
function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(function(){t.classList.remove("show")},2200)}
function add(id,fmt,q){var c=cart(),f=false;c.forEach(function(l){if(l.id==id&&l.f==fmt){l.q+=q;f=true}});if(!f)c.push({id:id,f:fmt,q:q});saveCart(c);toast("Added to your cart: "+book(id).t+" ("+fmt+")")}
function price(l){var b=book(l.id);return l.f=="E-book"?b.e:b.p}
function card(b){return '<div class="card"><a class="cv" href="book.html?id='+b.id+'" aria-label="'+esc(b.t)+'">'+cover(b)+'</a><h3><a href="book.html?id='+b.id+'" style="text-decoration:none">'+esc(b.t)+'</a></h3><div class="by">'+esc(b.a)+'</div><div>'+(b.new?'<span class="tag">New</span>':'')+(b.pub?'<span class="tag s">Rainbow Publishing</span>':'')+'</div><div class="price" style="margin-top:6px">'+money(b.p)+' <span style="font-weight:400;color:var(--mute);font-size:14px">paperback</span></div><button class="btn ink sm" data-add="'+b.id+'">Add to cart</button></div>'}
function bindAdd(root){(root||document).querySelectorAll("[data-add]").forEach(function(btn){btn.onclick=function(){add(btn.getAttribute("data-add"),"Paperback",1)}})}
function init(page){
var cols=["#d9482b","#e9a820","#3e8e5b","#2b78b5","#7a3e8e"],hs=[26,20,30,23,28];
var sp=cols.map(function(c,i){return '<b style="height:'+hs[i]+'px;background:'+c+'"></b>'}).join("");
var nav=[["shop","Shop","shop.html"],["ebooks","E-books","ebooks.html"],["stores","Find a store","stores.html"],["authors","Authors","authors.html"],["staff","Staff","staff.html"]].map(function(n){return '<a class="'+(n[0]==page?"on":"")+'" href="'+n[2]+'">'+n[1]+'</a>'}).join("");
var user=get("rb_user",null);
$("#hd").innerHTML='<div class="wrap"><a class="logo" href="index.html"><span class="spines">'+sp+'</span><span class="n">Rainbow Books</span></a><nav class="nav" aria-label="Main">'+nav+'</nav><div class="right"><a href="account.html">'+(user?'Hi, '+esc(user):'Sign in')+'</a><a class="cartlink" href="cart.html">Cart (<span id="cartcount">0</span>)</a></div></div>';
$("#ft").innerHTML='<div class="wrap"><div><div class="serif" style="color:#fff;font-size:24px;margin-bottom:8px">Rainbow Books</div><div style="font-size:14px;max-width:300px">Books at the end of the rainbow. Victorian booksellers since 1946.</div></div><div><h4>Shop</h4><a href="shop.html">All books</a><a href="ebooks.html">E-books</a><a href="cart.html">Your cart</a></div><div><h4>Visit us</h4><a href="stores.html">Find a store</a><a href="stores.html">Events in store</a><a href="authors.html">Write for us</a></div><div><h4>Your account</h4><a href="account.html">Sign in</a><a href="staff.html">Staff area</a></div><div class="small">This website is a student prototype for ISYS1051 at RMIT University. Rainbow Books is a case-study business; titles, authors, stores and prices are sample data. No payments are taken.</div></div>';
var t=document.createElement("div");t.id="toast";t.className="toast";t.setAttribute("role","status");document.body.appendChild(t);
count()}
return {BOOKS:BOOKS,STORES:STORES,$:$,money:money,esc:esc,get:get,set:set,cart:cart,saveCart:saveCart,book:book,cover:cover,card:card,add:add,price:price,bindAdd:bindAdd,init:init,toast:toast}
})();
