import{S as c,I as i}from"./vendor.js";class a{constructor(e){this.links=document.querySelectorAll(e),this.openedPopup=null,this.setListeners()}open(e){const t=this.openedPopup!==document.querySelector(e);if(this.openedPopup&&this.close(this.openedPopup),t){document.body.classList.add("popup-opened");const s=document.querySelector(e);if(!s)return void console.error(e," не найден!");this.openedPopup=s,s.classList.add("opening"),setTimeout(()=>{s.classList.remove("opening"),s.classList.add("opened")},50),s.addEventListener("mousedown",n=>{(n.target.classList.contains("popup")||n.target.classList.contains("popup__close")||n.target.classList.contains("custom-close"))&&this.close(s)})}}close(e){typeof e=="string"&&(e=document.querySelector(e)),e.classList.add("closing"),setTimeout(()=>{e.classList.remove("closing"),e.classList.remove("opened"),document.body.classList.remove("popup-opened")},300),this.openedPopup=null,e.removeEventListener("mousedown",close)}setListeners(){this.links.length<1||this.links.forEach(e=>{e.addEventListener("click",()=>{this.open(e.getAttribute("data-popup"))})})}}document.addEventListener("DOMContentLoaded",()=>{window.host!=="archangel-michael.localhost"&&window.initUI()}),window.initUI=function(){(function(){const o=document.querySelectorAll(".trends-slider");o.length&&o.forEach(e=>{new c(e,{spaceBetween:8,breakpoints:{0:{slidesPerView:1.2,spaceBetween:8},550:{slidesPerView:2.2},768:{slidesPerView:3},1200:{slidesPerView:4.2,spaceBetween:32}}})})})(),function(){const o=document.querySelectorAll(".js-toggle-class"),e=document.querySelector(".js-count-fav");if(!o&&!e)return;let t=0;o.forEach(s=>{s.classList.contains("active")&&(t+=1,e.innerHTML=t),s.addEventListener("click",n=>{s.classList.toggle("active"),s.classList.contains("active")?t+=1:t-=1,e.innerHTML=t,t>0?e.classList.add("active"):e.classList.remove("active")})}),t>0?e.classList.add("active"):e.classList.remove("active")}(),window.popup=new a("[data-popup]"),function(){const o=new i("+7 (999) 999-99-99"),e=new i({mask:"*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",greedy:!1,onBeforePaste:t=>t.toLowerCase().replace("mailto:",""),definitions:{"*":{validator:"[0-9A-Za-z!#$%&'*+/=?^_`{|}~]",casing:"lower"}}});o.mask(document.querySelectorAll('input[type="tel"]')),e.mask(document.querySelectorAll("input[data-email]"))}()};
