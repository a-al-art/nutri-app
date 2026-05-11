var Ue=Object.defineProperty;var pe=d=>{throw TypeError(d)};var Ye=(d,e,t)=>e in d?Ue(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var _e=(d,e,t)=>Ye(d,typeof e!="symbol"?e+"":e,t),ce=(d,e,t)=>e.has(d)||pe("Cannot "+t);var i=(d,e,t)=>(ce(d,e,"read from private field"),t?t.call(d):e.get(d)),c=(d,e,t)=>e.has(d)?pe("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(d):e.set(d,t),h=(d,e,t,a)=>(ce(d,e,"write to private field"),a?a.call(d,t):e.set(d,t),t),l=(d,e,t)=>(ce(d,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var S;class A{static set(e,t){try{localStorage.setItem(i(this,S)+e,JSON.stringify(t))}catch(a){console.error("Storage.set error:",a)}}static get(e,t=null){try{const a=localStorage.getItem(i(this,S)+e);return a!==null?JSON.parse(a):t}catch{return t}}static remove(e){localStorage.removeItem(i(this,S)+e)}static clear(){Object.keys(localStorage).filter(e=>e.startsWith(i(this,S))).forEach(e=>localStorage.removeItem(e))}}S=new WeakMap,c(A,S,"nutritrack_");var p;class Ge{constructor(){c(this,p);h(this,p,A.get("profile",{name:"",gender:"female",age:25,height:165,weight:60,goal:"maintain",activity:"moderate"}))}get name(){return i(this,p).name}get gender(){return i(this,p).gender}get age(){return i(this,p).age}get height(){return i(this,p).height}get weight(){return i(this,p).weight}get goal(){return i(this,p).goal}get activity(){return i(this,p).activity}get data(){return{...i(this,p)}}update(e){h(this,p,{...i(this,p),...e}),A.set("profile",i(this,p))}calcBMR(){const{gender:e,weight:t,height:a,age:s}=i(this,p),r=10*t+6.25*a-5*s;return Math.round(e==="male"?r+5:r-161)}calcTDEE(){const e={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very_active:1.9};return Math.round(this.calcBMR()*(e[i(this,p).activity]||1.55))}calcTargetCalories(){return this.calcTDEE()+({lose:-500,maintain:0,gain:300}[i(this,p).goal]||0)}calcMacros(){const e=this.calcTargetCalories();return{protein:Math.round(e*.3/4),fat:Math.round(e*.25/9),carbs:Math.round(e*.45/4)}}calcBMI(){const e=i(this,p).height/100,t=i(this,p).weight/(e*e),a=Math.round(t*10)/10;let s;return t<18.5?s="Недостаточный вес":t<25?s="Норма":t<30?s="Избыточный вес":s="Ожирение",{value:a,category:s}}isComplete(){return i(this,p).age>0&&i(this,p).height>0&&i(this,p).weight>0}}p=new WeakMap;var le,ne,R,me,ye;class ie{static async search(e,t=1){const a=new URLSearchParams({search_terms:e,search_simple:1,action:"process",json:1,page:t,page_size:20,fields:"id,product_name,brands,nutriments,image_small_url,categories_tags,quantity"}),s=await fetch(`${i(this,ne)}?${a}`);if(!s.ok)throw new Error(`API error: ${s.status}`);return((await s.json()).products||[]).filter(o=>{var n;return o.product_name&&((n=o.nutriments)==null?void 0:n["energy-kcal_100g"])}).map(o=>l(this,R,me).call(this,o))}static async getByBarcode(e){const t=await fetch(`${i(this,le)}/api/v0/product/${e}.json`);if(!t.ok)return null;const a=await t.json();return a.status!==1||!a.product?null:l(this,R,me).call(this,a.product)}}le=new WeakMap,ne=new WeakMap,R=new WeakSet,me=function(e){var s,r,o;const t=e.nutriments||{},a=Math.round(t["energy-kcal_100g"]||t["energy-kcal"]||(t.energy_100g?t.energy_100g/4.184:0));return{id:e.id||e.code||String(Math.random()),name:((s=e.product_name)==null?void 0:s.trim())||"Без названия",brand:((o=(r=e.brands)==null?void 0:r.split(",")[0])==null?void 0:o.trim())||"",calories:a,protein:Math.round((t.proteins_100g||0)*10)/10,fat:Math.round((t.fat_100g||0)*10)/10,carbs:Math.round((t.carbohydrates_100g||0)*10)/10,fiber:Math.round((t.fiber_100g||0)*10)/10,image:e.image_small_url||null,quantity:e.quantity||"100г",emoji:l(this,R,ye).call(this,e.categories_tags||[])}},ye=function(e){const t={meat:"🥩",chicken:"🍗",fish:"🐟",seafood:"🦐",dairy:"🥛",cheese:"🧀",egg:"🥚",bread:"🍞",cereal:"🌾",pasta:"🍝",rice:"🍚",vegetable:"🥦",fruit:"🍎",berry:"🍓",nut:"🥜",oil:"🫙",sauce:"🥫",sweet:"🍫",chocolate:"🍫",cake:"🎂",candy:"🍬",drink:"🥤",juice:"🧃",water:"💧",coffee:"☕",tea:"🍵",snack:"🍿",chips:"🥨",cookie:"🍪",soup:"🍲",salad:"🥗",sandwich:"🥪"},a=e.join(" ");for(const[s,r]of Object.entries(t))if(a.includes(s))return r;return"🥘"},c(ie,R),c(ie,le,"https://world.openfoodfacts.org"),c(ie,ne,"https://world.openfoodfacts.org/cgi/search.pl");var M,ve,re;class f{static today(){return l(this,M,re).call(this,new Date)}static getDay(e){const t={};return this.MEALS.forEach(a=>{t[a.id]=[]}),A.get(l(this,M,ve).call(this,e),t)}static setDay(e,t){A.set(l(this,M,ve).call(this,e),t)}static addEntry(e,t,a,s){const r=this.getDay(e),o=s/100;r[t].push({id:Date.now()+Math.random(),productId:a.id,name:a.name,emoji:a.emoji,amount:s,calories:Math.round(a.calories*o),protein:Math.round(a.protein*o*10)/10,fat:Math.round(a.fat*o*10)/10,carbs:Math.round(a.carbs*o*10)/10}),this.setDay(e,r)}static removeEntry(e,t,a){const s=this.getDay(e);s[t]=s[t].filter(r=>r.id!==a),this.setDay(e,s)}static getDayTotals(e){const t=this.getDay(e),a={calories:0,protein:0,fat:0,carbs:0,entries:0};return this.MEALS.forEach(s=>{(t[s.id]||[]).forEach(r=>{a.calories+=r.calories,a.protein+=r.protein,a.fat+=r.fat,a.carbs+=r.carbs,a.entries++})}),a.protein=Math.round(a.protein*10)/10,a.fat=Math.round(a.fat*10)/10,a.carbs=Math.round(a.carbs*10)/10,a}static getWeekData(e){const t=[],a=new Date(e+"T00:00:00");for(let s=0;s<7;s++){const r=new Date(a.getFullYear(),a.getMonth(),a.getDate()+s),o=l(this,M,re).call(this,r);t.push({date:o,totals:this.getDayTotals(o)})}return t}static formatDate(e){const t=new Date(e+"T00:00:00"),a=new Date;return a.setDate(a.getDate()-1),e===this.today()?"Сегодня":e===l(this,M,re).call(this,a)?"Вчера":t.toLocaleDateString("ru-RU",{day:"numeric",month:"long",weekday:"short"})}}M=new WeakSet,ve=function(e){return`diary_${e}`},re=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},c(f,M),_e(f,"MEALS",[{id:"breakfast",name:"Завтрак",emoji:"🌅"},{id:"lunch",name:"Обед",emoji:"☀️"},{id:"dinner",name:"Ужин",emoji:"🌙"},{id:"snack",name:"Перекус",emoji:"🍎"}]);var P,de,fe;class G{static show(e,t="success",a=2500){const s=l(this,de,fe).call(this),r=document.createElement("div");r.className=`toast toast--${t}`,r.textContent=e,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateY(10px)",r.style.transition="0.3s ease",setTimeout(()=>r.remove(),300)},a)}static success(e){this.show(e,"success")}static error(e){this.show(e,"error")}}P=new WeakMap,de=new WeakSet,fe=function(){return i(this,P)||h(this,P,document.getElementById("toastContainer")),i(this,P)},c(G,de),c(G,P,null);var D,B,k,z,J,V,Z,u,be,Ee,oe,$e,we,xe,ke,Ce,U;class Je{constructor(){c(this,u);c(this,D);c(this,B);c(this,k);c(this,z);c(this,J);c(this,V,null);c(this,Z,null);h(this,D,document.getElementById("searchInput")),h(this,B,document.getElementById("searchClear")),h(this,k,document.getElementById("searchResults")),h(this,z,document.getElementById("productModal")),h(this,J,document.getElementById("modalContent")),l(this,u,be).call(this)}init(){l(this,u,oe).call(this)}}D=new WeakMap,B=new WeakMap,k=new WeakMap,z=new WeakMap,J=new WeakMap,V=new WeakMap,Z=new WeakMap,u=new WeakSet,be=function(){i(this,D).addEventListener("input",()=>{const e=i(this,D).value.trim();if(i(this,B).classList.toggle("visible",e.length>0),clearTimeout(i(this,V)),e.length<2){l(this,u,oe).call(this);return}l(this,u,$e).call(this),h(this,V,setTimeout(()=>l(this,u,Ee).call(this,e),400))}),i(this,B).addEventListener("click",()=>{i(this,D).value="",i(this,B).classList.remove("visible"),l(this,u,oe).call(this),i(this,D).focus()}),document.getElementById("modalOverlay").addEventListener("click",()=>l(this,u,U).call(this)),document.getElementById("modalClose").addEventListener("click",()=>l(this,u,U).call(this)),document.addEventListener("keydown",e=>{e.key==="Escape"&&l(this,u,U).call(this)})},Ee=async function(e){try{const t=await ie.search(e);t.length===0?l(this,u,we).call(this,e):l(this,u,ke).call(this,t)}catch(t){l(this,u,xe).call(this),console.error("Search error:",t)}},oe=function(){i(this,k).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🔍</div>
        <div class="search-state__text">Введите название продукта</div>
        <div class="search-state__hint">Например: куриная грудка, гречка, яблоко</div>
      </div>
    `},$e=function(){i(this,k).innerHTML=Array(4).fill(0).map(()=>`
      <div class="product-card" style="pointer-events:none">
        <div class="skeleton" style="width:44px;height:44px;border-radius:8px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div class="skeleton" style="height:16px;width:60%;border-radius:4px"></div>
          <div class="skeleton" style="height:12px;width:40%;border-radius:4px"></div>
        </div>
        <div class="skeleton" style="height:24px;width:40px;border-radius:4px"></div>
      </div>
    `).join("")},we=function(e){i(this,k).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🤷</div>
        <div class="search-state__text">Ничего не найдено по запросу «${e}»</div>
        <div class="search-state__hint">Попробуйте другое название или на английском</div>
      </div>
    `},xe=function(){i(this,k).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">⚠️</div>
        <div class="search-state__text">Ошибка загрузки</div>
        <div class="search-state__hint">Проверьте соединение с интернетом</div>
      </div>
    `},ke=function(e){i(this,k).innerHTML=e.map(t=>`
      <div class="product-card" data-id="${t.id}">
        <div class="product-card__emoji">${t.emoji}</div>
        <div class="product-card__info">
          <div class="product-card__name">${t.name}</div>
          <div class="product-card__meta">${t.brand||"на 100г"}</div>
          <div class="macros">
            <div class="macros__item">
              <div class="macros__dot macros__dot--protein"></div>
              Б ${t.protein}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--fat"></div>
              Ж ${t.fat}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--carbs"></div>
              У ${t.carbs}г
            </div>
          </div>
        </div>
        <div class="product-card__calories">
          ${t.calories}
          <span>ккал/100г</span>
        </div>
      </div>
    `).join(""),i(this,k).querySelectorAll(".product-card").forEach((t,a)=>{t.addEventListener("click",()=>l(this,u,Ce).call(this,e[a]))})},Ce=function(e){h(this,Z,e),i(this,J).innerHTML=`
      <div class="modal__product-name">${e.emoji} ${e.name}</div>
      <div class="modal__product-brand">${e.brand||"Продукт"} · на 100г</div>

      <div class="modal__calories-display">
        <div class="modal__calories-value">${e.calories}</div>
        <div class="modal__calories-label">ккал</div>
        <div class="modal__serving-label">/ 100г</div>
      </div>

      <div class="modal__macros-grid">
        <div class="modal__macro-box modal__macro-box--protein">
          <div class="modal__macro-value">${e.protein}г</div>
          <div class="modal__macro-label">Белки</div>
        </div>
        <div class="modal__macro-box modal__macro-box--fat">
          <div class="modal__macro-value">${e.fat}г</div>
          <div class="modal__macro-label">Жиры</div>
        </div>
        <div class="modal__macro-box modal__macro-box--carbs">
          <div class="modal__macro-value">${e.carbs}г</div>
          <div class="modal__macro-label">Углеводы</div>
        </div>
      </div>

      ${e.fiber?`<div style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">Клетчатка: ${e.fiber}г</div>`:""}

      <div class="modal__add-section">
        <div class="modal__add-title">Добавить в дневник</div>
        <div class="modal__add-row">
          <input class="modal__input" id="modalAmount" type="number" value="100" min="1" max="9999" placeholder="г" />
          <span style="font-size:14px;color:var(--color-text-muted)">г →</span>
          <select class="modal__select" id="modalMeal">
            ${f.MEALS.map(r=>`<option value="${r.id}">${r.emoji} ${r.name}</option>`).join("")}
          </select>
        </div>
        <div id="modalCalcResult" style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px"></div>
        <button class="btn btn--primary btn--full" id="modalAddBtn">
          Добавить в дневник
        </button>
      </div>
    `;const t=document.getElementById("modalAmount"),a=document.getElementById("modalCalcResult"),s=()=>{const r=parseFloat(t.value)||0,o=r/100,n=Math.round(e.calories*o);a.textContent=r>0?`${r}г = ${n} ккал · Б ${Math.round(e.protein*o*10)/10}г · Ж ${Math.round(e.fat*o*10)/10}г · У ${Math.round(e.carbs*o*10)/10}г`:""};t.addEventListener("input",s),s(),document.getElementById("modalAddBtn").addEventListener("click",()=>{var v;const r=parseFloat(t.value),o=document.getElementById("modalMeal").value;if(!r||r<=0){G.error("Укажите количество в граммах");return}f.addEntry(f.today(),o,e,r);const n=((v=f.MEALS.find(m=>m.id===o))==null?void 0:v.name)||o;G.success(`Добавлено в «${n}»`),l(this,u,U).call(this)}),i(this,z).classList.add("open"),document.body.style.overflow="hidden"},U=function(){i(this,z).classList.remove("open"),document.body.style.overflow="",h(this,Z,null)};var $,O,K,I,X,x,he,Me,Le,De;class Ve{constructor(e){c(this,x);c(this,$);c(this,O);c(this,K);c(this,I);c(this,X);h(this,$,f.today()),h(this,O,e),h(this,K,document.getElementById("diarySummary")),h(this,I,document.getElementById("diaryMeals")),h(this,X,document.getElementById("currentDate")),l(this,x,Me).call(this)}render(){i(this,X).textContent=f.formatDate(i(this,$)),l(this,x,Le).call(this),l(this,x,De).call(this)}}$=new WeakMap,O=new WeakMap,K=new WeakMap,I=new WeakMap,X=new WeakMap,x=new WeakSet,he=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},Me=function(){document.getElementById("prevDay").addEventListener("click",()=>{const e=new Date(i(this,$)+"T00:00:00");e.setDate(e.getDate()-1),h(this,$,l(this,x,he).call(this,e)),this.render()}),document.getElementById("nextDay").addEventListener("click",()=>{const e=f.today();if(i(this,$)>=e)return;const t=new Date(i(this,$)+"T00:00:00");t.setDate(t.getDate()+1),h(this,$,l(this,x,he).call(this,t)),this.render()})},Le=function(){const e=f.getDayTotals(i(this,$)),t=i(this,O).isComplete()?i(this,O).calcTargetCalories():2e3,a=Math.min(100,Math.round(e.calories/t*100)),s=t-e.calories;i(this,K).innerHTML=`
      <div class="diary__summary-row">
        <span class="diary__summary-label">Потреблено калорий</span>
        <span style="font-size:13px;color:var(--color-text-muted)">Цель: ${t} ккал</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:10px">
        <span class="diary__summary-cals">${e.calories}</span>
        <span style="color:var(--color-text-muted);font-size:14px">из ${t} ккал</span>
      </div>
      <div class="diary__progress-bar">
        <div class="diary__progress-fill" style="width:${a}%;${a>=100?"background:var(--color-danger)":""}"></div>
      </div>
      <div style="font-size:13px;color:var(--color-text-muted);margin-bottom:8px">
        ${s>=0?`Осталось: <strong style="color:var(--color-text)">${s} ккал</strong>`:`Превышено: <strong style="color:var(--color-danger)">${Math.abs(s)} ккал</strong>`}
      </div>
      <div class="diary__macros-summary">
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-protein)"></div>
          Б ${e.protein}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-fat)"></div>
          Ж ${e.fat}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-carbs)"></div>
          У ${e.carbs}г
        </div>
      </div>
    `},De=function(){const e=f.getDay(i(this,$));i(this,I).innerHTML=f.MEALS.map(t=>{const a=e[t.id]||[],s=a.reduce((r,o)=>r+o.calories,0);return`
        <div class="diary__meal expanded" id="meal-${t.id}">
          <div class="diary__meal-header">
            <span class="diary__meal-emoji">${t.emoji}</span>
            <span class="diary__meal-name">${t.name}</span>
            <span class="diary__meal-total">${s>0?s+" ккал":""}</span>
            <svg class="diary__meal-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="diary__meal-items">
            ${a.length===0?'<div class="diary__empty">Нет записей. Добавьте через Поиск →</div>':a.map(r=>`
                <div class="diary__meal-item" data-meal="${t.id}" data-id="${r.id}">
                  <span>${r.emoji||"🥘"}</span>
                  <span class="diary__meal-item-name">${r.name}</span>
                  <span class="diary__meal-item-amount">${r.amount}г</span>
                  <span class="diary__meal-item-cals">${r.calories} кк</span>
                  <button class="diary__meal-item-remove" data-meal="${t.id}" data-entry-id="${r.id}" title="Удалить">✕</button>
                </div>
              `).join("")}
          </div>
        </div>
      `}).join(""),i(this,I).querySelectorAll(".diary__meal-header").forEach(t=>{t.addEventListener("click",()=>{t.closest(".diary__meal").classList.toggle("expanded")})}),i(this,I).querySelectorAll(".diary__meal-item-remove").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const s=t.dataset.meal,r=parseFloat(t.dataset.entryId);f.removeEntry(i(this,$),s,r),G.success("Запись удалена"),this.render()})})};const Ze="modulepreload",Ke=function(d,e){return new URL(d,e).href},ge={},ue=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),v=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(t.map(m=>{if(m=Ke(m,a),m in ge)return;ge[m]=!0;const y=m.endsWith(".css"),_=y?'[rel="stylesheet"]':"";if(!!a)for(let N=o.length-1;N>=0;N--){const se=o[N];if(se.href===m&&(!y||se.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${m}"]${_}`))return;const L=document.createElement("link");if(L.rel=y?"stylesheet":Ze,y||(L.as="script"),L.crossOrigin="",L.href=m,v&&L.setAttribute("nonce",v),document.head.appendChild(L),y)return new Promise((N,se)=>{L.addEventListener("load",N),L.addEventListener("error",()=>se(new Error(`Unable to preload CSS for ${m}`)))})}))}function r(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return s.then(o=>{for(const n of o||[])n.status==="rejected"&&r(n.reason);return e().catch(r)})};var W,Q,ee,q,C,Se,Be,Ie,Te;class Xe{constructor(e){c(this,C);c(this,W);c(this,Q);c(this,ee);c(this,q,null);h(this,W,e),h(this,Q,document.getElementById("plannerWeek")),h(this,ee,document.getElementById("plannerStats"))}render(){const e=new Date,t=new Date(e),a=e.getDay()===0?6:e.getDay()-1;t.setDate(e.getDate()-a),t.setHours(0,0,0,0);const s=f.getWeekData(l(this,C,Se).call(this,t)),r=i(this,W).isComplete()?i(this,W).calcTargetCalories():2e3;l(this,C,Be).call(this,s,r,e),l(this,C,Ie).call(this,s,r)}}W=new WeakMap,Q=new WeakMap,ee=new WeakMap,q=new WeakMap,C=new WeakSet,Se=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},Be=function(e,t,a){const s=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],r=f.today();i(this,Q).innerHTML=e.map((o,n)=>{const v=o.totals.calories,m=Math.min(100,Math.round(v/t*100)),y=o.date===r,_=new Date(o.date+"T00:00:00").getDate(),ae=v>t;return`
        <div class="planner__day ${y?"planner__day--today":""}">
          <div class="planner__day-name">${s[n]}</div>
          <div class="planner__day-date">${_}</div>
          <div class="planner__day-cals">
            ${v>0?`<strong>${v}</strong> ккал`:'<span style="color:var(--color-text-muted);font-size:11px">нет данных</span>'}
          </div>
          <div class="planner__day-bar">
            <div class="planner__day-bar-fill ${ae?"over":""}" style="width:${m}%"></div>
          </div>
        </div>
      `}).join("")},Ie=function(e,t){const a=e.filter(v=>v.totals.calories>0),s=a.reduce((v,m)=>v+m.totals.calories,0),r=a.length?Math.round(s/a.length):0,o=a.reduce((v,m)=>v+m.totals.protein,0),n=a.reduce((v,m)=>v+m.totals.carbs,0);i(this,ee).innerHTML=`
      <div class="planner__stats-title">Итоги недели</div>
      <div class="planner__stats-grid">
        <div class="planner__stat-box">
          <div class="planner__stat-value">${s}</div>
          <div class="planner__stat-label">Всего ккал за неделю</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${r}</div>
          <div class="planner__stat-label">Среднее ккал/день</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${Math.round(o)}г</div>
          <div class="planner__stat-label">Белки за неделю</div>
        </div>
        <div class="planner__stat-box">
          <div class="planner__stat-value">${Math.round(n)}г</div>
          <div class="planner__stat-label">Углеводы за неделю</div>
        </div>
      </div>
      <div class="planner__chart-container">
        <canvas id="weekChart"></canvas>
      </div>
    `,l(this,C,Te).call(this,e,t)},Te=async function(e,t){const{Chart:a,registerables:s}=await ue(async()=>{const{Chart:_,registerables:ae}=await import("./chart-19k6OvwP.js");return{Chart:_,registerables:ae}},[],import.meta.url);a.register(...s);const r=document.getElementById("weekChart");if(!r)return;i(this,q)&&i(this,q).destroy();const o=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],n=document.documentElement.dataset.theme==="dark",v=n?"#a8c4d8":"#5a6b48",m=n?"#3d5f7a":"#e2e8d0",y=n?"#6eb5e0":"#5c8a3c";h(this,q,new a(r,{type:"bar",data:{labels:o,datasets:[{label:"Калории",data:e.map(_=>_.totals.calories),backgroundColor:e.map(_=>_.totals.calories>t?"rgba(192,57,43,0.7)":y+"aa"),borderColor:e.map(_=>_.totals.calories>t?"#c0392b":y),borderWidth:1.5,borderRadius:6},{label:"Цель",data:Array(7).fill(t),type:"line",borderColor:n?"#e0b86e":"#d4a843",borderDash:[6,3],borderWidth:1.5,pointRadius:0,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:v,font:{size:12},boxWidth:14}},tooltip:{callbacks:{label:_=>`${_.dataset.label}: ${_.parsed.y} ккал`}}},scales:{x:{ticks:{color:v},grid:{color:m}},y:{ticks:{color:v,callback:_=>_+" кк"},grid:{color:m},beginAtZero:!0}}}}))};var g,te,H,F,b,je,Ae,Re,Pe,ze,Oe,We;class Qe{constructor(e){c(this,b);c(this,g);c(this,te);c(this,H,null);c(this,F,null);h(this,g,e),h(this,te,document.getElementById("profileGrid"))}render(){i(this,te).innerHTML=`
      ${l(this,b,je).call(this)}
      ${l(this,b,Ae).call(this)}
      ${l(this,b,Re).call(this)}
      ${l(this,b,Pe).call(this)}
    `,l(this,b,ze).call(this),i(this,g).isComplete()&&(l(this,b,Oe).call(this),l(this,b,We).call(this))}}g=new WeakMap,te=new WeakMap,H=new WeakMap,F=new WeakMap,b=new WeakSet,je=function(){const e=i(this,g).data;return`
      <div class="profile__card">
        <div class="profile__card-title">Личные данные</div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Имя</label>
            <input class="profile__input" id="p-name" type="text" value="${e.name}" placeholder="Ваше имя" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Возраст</label>
            <input class="profile__input" id="p-age" type="number" value="${e.age}" min="10" max="120" />
          </div>
        </div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Рост (см)</label>
            <input class="profile__input" id="p-height" type="number" value="${e.height}" min="100" max="250" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Вес (кг)</label>
            <input class="profile__input" id="p-weight" type="number" value="${e.weight}" min="20" max="500" />
          </div>
        </div>
        <div class="profile__form-group">
          <label class="profile__label">Пол</label>
          <div class="radio-group" style="margin-top:4px;flex-direction:row">
            <label class="radio-option ${e.gender==="female"?"selected":""}" style="flex:1">
              <input type="radio" name="gender" value="female" ${e.gender==="female"?"checked":""} />
              Женский
            </label>
            <label class="radio-option ${e.gender==="male"?"selected":""}" style="flex:1">
              <input type="radio" name="gender" value="male" ${e.gender==="male"?"checked":""} />
              Мужской
            </label>
          </div>
        </div>
        <button class="btn btn--primary btn--full" id="saveProfileBtn" style="margin-top:16px">
          Сохранить
        </button>
      </div>
    `},Ae=function(){if(!i(this,g).isComplete())return`
        <div class="profile__card">
          <div class="profile__card-title">Расчёт нормы</div>
          <div class="empty-state">
            <div class="empty-state__icon">📊</div>
            <div class="empty-state__text">Заполните личные данные</div>
            <div class="empty-state__sub">для расчёта нормы калорий</div>
          </div>
        </div>
      `;const e=i(this,g).calcBMR(),t=i(this,g).calcTDEE(),a=i(this,g).calcTargetCalories(),s=i(this,g).calcBMI(),r=i(this,g).calcMacros();return`
      <div class="profile__card">
        <div class="profile__card-title">Расчёт нормы</div>
        <div class="profile__result">
          <div class="profile__result-grid">
            <div class="profile__result-item">
              <div class="profile__result-value">${e}</div>
              <div class="profile__result-label">BMR (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value">${t}</div>
              <div class="profile__result-label">TDEE (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value" style="color:var(--color-accent-2)">${a}</div>
              <div class="profile__result-label">Цель · ${{lose:"Похудение",maintain:"Поддержание",gain:"Набор массы"}[i(this,g).goal]}</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value" style="font-size:22px">${s.value}</div>
              <div class="profile__result-label">ИМТ · ${s.category}</div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div style="font-size:13px;color:var(--color-text-secondary);margin-bottom:8px">Рекомендуемые БЖУ</div>
        <div class="diary__macros-summary" style="margin-top:0">
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-protein)"></div>
            Б ${r.protein}г
          </div>
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-fat)"></div>
            Ж ${r.fat}г
          </div>
          <div class="diary__macro-chip">
            <div class="diary__macro-chip-dot" style="background:var(--color-carbs)"></div>
            У ${r.carbs}г
          </div>
        </div>
        <div class="profile__chart-container">
          <canvas id="macroChart"></canvas>
        </div>
      </div>
    `},Re=function(){const e=i(this,g).data,t=[{id:"sedentary",label:"Сидячий образ жизни",sub:"Офисная работа, минимум движения"},{id:"light",label:"Лёгкая активность",sub:"Прогулки, 1-3 тренировки в неделю"},{id:"moderate",label:"Умеренная активность",sub:"3-5 тренировок в неделю"},{id:"active",label:"Высокая активность",sub:"6-7 интенсивных тренировок"},{id:"very_active",label:"Очень высокая",sub:"Физический труд + тренировки"}],a=[{id:"lose",label:"📉 Похудение",sub:"-500 ккал от TDEE"},{id:"maintain",label:"⚖️ Поддержание",sub:"Равно TDEE"},{id:"gain",label:"📈 Набор массы",sub:"+300 ккал к TDEE"}];return`
      <div class="profile__card">
        <div class="profile__card-title">Активность и цель</div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">Уровень активности</div>
        <div class="radio-group" id="activityGroup">
          ${t.map(s=>`
            <label class="radio-option ${e.activity===s.id?"selected":""}">
              <input type="radio" name="activity" value="${s.id}" ${e.activity===s.id?"checked":""} />
              <div>
                <div style="font-weight:500;font-size:13px">${s.label}</div>
                <div style="font-size:11px;color:var(--color-text-muted)">${s.sub}</div>
              </div>
            </label>
          `).join("")}
        </div>
        <div class="divider"></div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">Цель</div>
        <div class="radio-group" id="goalGroup" style="flex-direction:row;flex-wrap:wrap">
          ${a.map(s=>`
            <label class="radio-option ${e.goal===s.id?"selected":""}" style="flex:1;min-width:110px">
              <input type="radio" name="goal" value="${s.id}" ${e.goal===s.id?"checked":""} />
              <div>
                <div style="font-size:13px">${s.label}</div>
                <div style="font-size:11px;color:var(--color-text-muted)">${s.sub}</div>
              </div>
            </label>
          `).join("")}
        </div>
      </div>
    `},Pe=function(){return`
      <div class="profile__card">
        <div class="profile__card-title">Статистика за неделю</div>
        <div class="profile__chart-container">
          <canvas id="profileWeekChart"></canvas>
        </div>
      </div>
    `},ze=function(){var e;document.querySelectorAll('.radio-option input[type="radio"]').forEach(t=>{t.addEventListener("change",()=>{var a;(a=t.closest(".radio-group"))==null||a.querySelectorAll(".radio-option").forEach(s=>{s.classList.remove("selected")}),t.closest(".radio-option").classList.add("selected"),t.name==="activity"?i(this,g).update({activity:t.value}):t.name==="goal"&&i(this,g).update({goal:t.value})})}),(e=document.getElementById("saveProfileBtn"))==null||e.addEventListener("click",()=>{var s,r,o,n,v;const t=((s=document.querySelector('input[name="gender"]:checked'))==null?void 0:s.value)||"female",a={name:((r=document.getElementById("p-name"))==null?void 0:r.value.trim())||"",age:parseFloat((o=document.getElementById("p-age"))==null?void 0:o.value)||25,height:parseFloat((n=document.getElementById("p-height"))==null?void 0:n.value)||165,weight:parseFloat((v=document.getElementById("p-weight"))==null?void 0:v.value)||60,gender:t};i(this,g).update(a),this.render()})},Oe=async function(){const{Chart:e,registerables:t}=await ue(async()=>{const{Chart:n,registerables:v}=await import("./chart-19k6OvwP.js");return{Chart:n,registerables:v}},[],import.meta.url);e.register(...t);const a=document.getElementById("macroChart");if(!a)return;i(this,H)&&i(this,H).destroy();const s=i(this,g).calcMacros(),r=document.documentElement.dataset.theme==="dark",o=r?"#a8c4d8":"#5a6b48";h(this,H,new e(a,{type:"doughnut",data:{labels:["Белки","Жиры","Углеводы"],datasets:[{data:[s.protein*4,s.fat*9,s.carbs*4],backgroundColor:[r?"#6eb5e0":"#5c8a3c",r?"#e0b86e":"#d4a843",r?"#7eb8e8":"#4a7ab5"],borderWidth:0,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{labels:{color:o,font:{size:12},boxWidth:12}},tooltip:{callbacks:{label:n=>`${n.label}: ${Math.round(n.parsed/(s.protein*4+s.fat*9+s.carbs*4)*100)}%`}}}}}))},We=async function(){const{Chart:e,registerables:t}=await ue(async()=>{const{Chart:m,registerables:y}=await import("./chart-19k6OvwP.js");return{Chart:m,registerables:y}},[],import.meta.url);e.register(...t);const a=document.getElementById("profileWeekChart");if(!a)return;i(this,F)&&i(this,F).destroy();const s=[],r=[];for(let m=6;m>=0;m--){const y=new Date;y.setDate(y.getDate()-m);const _=y.toISOString().split("T")[0];s.push(f.getDayTotals(_)),r.push(y.toLocaleDateString("ru-RU",{weekday:"short"}))}const o=document.documentElement.dataset.theme==="dark",n=o?"#a8c4d8":"#5a6b48",v=o?"#3d5f7a":"#e2e8d0";h(this,F,new e(a,{type:"line",data:{labels:r,datasets:[{label:"Белки (г)",data:s.map(m=>m.protein),borderColor:o?"#6eb5e0":"#5c8a3c",backgroundColor:(o?"#6eb5e0":"#5c8a3c")+"20",fill:!0,tension:.4,pointRadius:3},{label:"Углеводы (г)",data:s.map(m=>m.carbs),borderColor:o?"#7eb8e8":"#4a7ab5",backgroundColor:"transparent",tension:.4,pointRadius:3},{label:"Жиры (г)",data:s.map(m=>m.fat),borderColor:o?"#e0b86e":"#d4a843",backgroundColor:"transparent",tension:.4,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:n,font:{size:11},boxWidth:12}}},scales:{x:{ticks:{color:n,font:{size:11}},grid:{color:v}},y:{ticks:{color:n,font:{size:11}},grid:{color:v},beginAtZero:!0}}}}))};var T,j,w,E,qe,He,Y,Fe,Ne;class et{constructor(){c(this,E);c(this,T,"search");c(this,j);c(this,w,{});h(this,j,new Ge),l(this,E,Fe).call(this),l(this,E,qe).call(this),l(this,E,He).call(this),l(this,E,Ne).call(this);const e=window.location.hash.replace("#","");["search","diary","planner","profile"].includes(e)?l(this,E,Y).call(this,e):l(this,E,Y).call(this,"search")}}T=new WeakMap,j=new WeakMap,w=new WeakMap,E=new WeakSet,qe=function(){i(this,w).search=new Je,i(this,w).diary=new Ve(i(this,j)),i(this,w).planner=new Xe(i(this,j)),i(this,w).profile=new Qe(i(this,j)),i(this,w).search.init()},He=function(){document.querySelectorAll(".nav__item").forEach(e=>{e.addEventListener("click",()=>l(this,E,Y).call(this,e.dataset.page))}),document.querySelectorAll(".mobile-nav__item").forEach(e=>{e.addEventListener("click",()=>l(this,E,Y).call(this,e.dataset.page))})},Y=function(e){var t;i(this,T)===e&&e!=="search"||(document.querySelectorAll(".page").forEach(a=>a.classList.remove("page--active")),(t=document.getElementById(`page-${e}`))==null||t.classList.add("page--active"),document.querySelectorAll(".nav__item, .mobile-nav__item").forEach(a=>{a.classList.toggle("nav__item--active",a.dataset.page===e),a.classList.toggle("mobile-nav__item--active",a.dataset.page===e)}),h(this,T,e),window.location.hash=e,e==="diary"&&i(this,w).diary.render(),e==="planner"&&i(this,w).planner.render(),e==="profile"&&i(this,w).profile.render(),window.scrollTo(0,0))},Fe=function(){const e=A.get("theme","light");document.documentElement.dataset.theme=e},Ne=function(){document.getElementById("themeToggle").addEventListener("click",()=>{const a=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=a,A.set("theme",a),i(this,T)==="planner"&&i(this,w).planner.render(),i(this,T)==="profile"&&i(this,w).profile.render()})};document.addEventListener("DOMContentLoaded",()=>{new et});
