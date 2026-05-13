var Gt=Object.defineProperty;var gt=m=>{throw TypeError(m)};var Jt=(m,t,e)=>t in m?Gt(m,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):m[t]=e;var yt=(m,t,e)=>Jt(m,typeof t!="symbol"?t+"":t,e),ht=(m,t,e)=>t.has(m)||gt("Cannot "+e);var i=(m,t,e)=>(ht(m,t,"read from private field"),e?e.call(m):t.get(m)),d=(m,t,e)=>t.has(m)?gt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(m):t.set(m,e),v=(m,t,e,a)=>(ht(m,t,"write to private field"),a?a.call(m,e):t.set(m,e),e),l=(m,t,e)=>(ht(m,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();var T;class P{static set(t,e){try{localStorage.setItem(i(this,T)+t,JSON.stringify(e))}catch(a){console.error("Storage.set error:",a)}}static get(t,e=null){try{const a=localStorage.getItem(i(this,T)+t);return a!==null?JSON.parse(a):e}catch{return e}}static remove(t){localStorage.removeItem(i(this,T)+t)}static clear(){Object.keys(localStorage).filter(t=>t.startsWith(i(this,T))).forEach(t=>localStorage.removeItem(t))}}T=new WeakMap,d(P,T,"nutritrack_");var p;class Kt{constructor(){d(this,p);v(this,p,P.get("profile",{name:"",gender:"female",age:25,height:165,weight:60,goal:"maintain",activity:"moderate"}))}get name(){return i(this,p).name}get gender(){return i(this,p).gender}get age(){return i(this,p).age}get height(){return i(this,p).height}get weight(){return i(this,p).weight}get goal(){return i(this,p).goal}get activity(){return i(this,p).activity}get data(){return{...i(this,p)}}update(t){v(this,p,{...i(this,p),...t}),P.set("profile",i(this,p))}calcBMR(){const{gender:t,weight:e,height:a,age:s}=i(this,p),r=10*e+6.25*a-5*s;return Math.round(t==="male"?r+5:r-161)}calcTDEE(){const t={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very_active:1.9};return Math.round(this.calcBMR()*(t[i(this,p).activity]||1.55))}calcTargetCalories(){return this.calcTDEE()+({lose:-500,maintain:0,gain:300}[i(this,p).goal]||0)}calcMacros(){const t=this.calcTargetCalories();return{protein:Math.round(t*.3/4),fat:Math.round(t*.25/9),carbs:Math.round(t*.45/4)}}calcBMI(){const t=i(this,p).height/100,e=i(this,p).weight/(t*t),a=Math.round(e*10)/10;let s;return e<18.5?s="Недостаточный вес":e<25?s="Норма":e<30?s="Избыточный вес":s="Ожирение",{value:a,category:s}}isComplete(){return i(this,p).age>0&&i(this,p).height>0&&i(this,p).weight>0}}p=new WeakMap;var ct,dt,O,z,vt,bt;class J{static async search(t,e=1,a,s=1){const r=`${t}_${e}`;if(i(this,O).has(r))return i(this,O).get(r);const o=new AbortController,n=setTimeout(()=>o.abort(),7e3);a==null||a.addEventListener("abort",()=>o.abort());const h=new URLSearchParams({search_terms:t,search_simple:1,action:"process",json:1,page:e,page_size:20,fields:"id,product_name,brands,nutriments,image_small_url,categories_tags,quantity"});try{const c=await fetch(`${i(this,dt)}?${h}`,{signal:o.signal});if(clearTimeout(n),c.status===503&&s>0)return await new Promise(x=>setTimeout(x,1e3)),this.search(t,e,a,s-1);if(!c.ok)throw new Error(`API error: ${c.status}`);const _=((await c.json()).products||[]).filter(x=>{var k;return x.product_name&&((k=x.nutriments)==null?void 0:k["energy-kcal_100g"])}).map(x=>l(this,z,vt).call(this,x));return i(this,O).set(r,_),_}catch(c){throw clearTimeout(n),c}}static async getByBarcode(t){const e=await fetch(`${i(this,ct)}/api/v0/product/${t}.json`);if(!e.ok)return null;const a=await e.json();return a.status!==1||!a.product?null:l(this,z,vt).call(this,a.product)}}ct=new WeakMap,dt=new WeakMap,O=new WeakMap,z=new WeakSet,vt=function(t){var s,r,o;const e=t.nutriments||{},a=Math.round(e["energy-kcal_100g"]||e["energy-kcal"]||(e.energy_100g?e.energy_100g/4.184:0));return{id:t.id||t.code||String(Math.random()),name:((s=t.product_name)==null?void 0:s.trim())||"Без названия",brand:((o=(r=t.brands)==null?void 0:r.split(",")[0])==null?void 0:o.trim())||"",calories:a,protein:Math.round((e.proteins_100g||0)*10)/10,fat:Math.round((e.fat_100g||0)*10)/10,carbs:Math.round((e.carbohydrates_100g||0)*10)/10,fiber:Math.round((e.fiber_100g||0)*10)/10,image:t.image_small_url||null,quantity:t.quantity||"100г",emoji:l(this,z,bt).call(this,t.categories_tags||[])}},bt=function(t){const e={meat:"🥩",chicken:"🍗",fish:"🐟",seafood:"🦐",dairy:"🥛",cheese:"🧀",egg:"🥚",bread:"🍞",cereal:"🌾",pasta:"🍝",rice:"🍚",vegetable:"🥦",fruit:"🍎",berry:"🍓",nut:"🥜",oil:"🫙",sauce:"🥫",sweet:"🍫",chocolate:"🍫",cake:"🎂",candy:"🍬",drink:"🥤",juice:"🧃",water:"💧",coffee:"☕",tea:"🍵",snack:"🍿",chips:"🥨",cookie:"🍪",soup:"🍲",salad:"🥗",sandwich:"🥪"},a=t.join(" ");for(const[s,r]of Object.entries(e))if(a.includes(s))return r;return"🥘"},d(J,z),d(J,ct,"https://world.openfoodfacts.org"),d(J,dt,"https://world.openfoodfacts.org/cgi/search.pl"),d(J,O,new Map);var D,ut,lt;class f{static today(){return l(this,D,lt).call(this,new Date)}static getDay(t){const e={};return this.MEALS.forEach(a=>{e[a.id]=[]}),P.get(l(this,D,ut).call(this,t),e)}static setDay(t,e){P.set(l(this,D,ut).call(this,t),e)}static addEntry(t,e,a,s){const r=this.getDay(t),o=s/100;r[e].push({id:Date.now()+Math.random(),productId:a.id,name:a.name,emoji:a.emoji,amount:s,calories:Math.round(a.calories*o),protein:Math.round(a.protein*o*10)/10,fat:Math.round(a.fat*o*10)/10,carbs:Math.round(a.carbs*o*10)/10}),this.setDay(t,r)}static removeEntry(t,e,a){const s=this.getDay(t);s[e]=s[e].filter(r=>r.id!==a),this.setDay(t,s)}static getDayTotals(t){const e=this.getDay(t),a={calories:0,protein:0,fat:0,carbs:0,entries:0};return this.MEALS.forEach(s=>{(e[s.id]||[]).forEach(r=>{a.calories+=r.calories,a.protein+=r.protein,a.fat+=r.fat,a.carbs+=r.carbs,a.entries++})}),a.protein=Math.round(a.protein*10)/10,a.fat=Math.round(a.fat*10)/10,a.carbs=Math.round(a.carbs*10)/10,a}static getWeekData(t){const e=[],a=new Date(t+"T00:00:00");for(let s=0;s<7;s++){const r=new Date(a.getFullYear(),a.getMonth(),a.getDate()+s),o=l(this,D,lt).call(this,r);e.push({date:o,totals:this.getDayTotals(o)})}return e}static formatDate(t){const e=new Date(t+"T00:00:00"),a=new Date;return a.setDate(a.getDate()-1),t===this.today()?"Сегодня":t===l(this,D,lt).call(this,a)?"Вчера":e.toLocaleDateString("ru-RU",{day:"numeric",month:"long",weekday:"short"})}}D=new WeakSet,ut=function(t){return`diary_${t}`},lt=function(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`},d(f,D),yt(f,"MEALS",[{id:"breakfast",name:"Завтрак",emoji:"🌅"},{id:"lunch",name:"Обед",emoji:"☀️"},{id:"dinner",name:"Ужин",emoji:"🌙"},{id:"snack",name:"Перекус",emoji:"🍎"}]);var W,mt,Et;class Z{static show(t,e="success",a=2500){const s=l(this,mt,Et).call(this),r=document.createElement("div");r.className=`toast toast--${e}`,r.textContent=t,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateY(10px)",r.style.transition="0.3s ease",setTimeout(()=>r.remove(),300)},a)}static success(t){this.show(t,"success")}static error(t){this.show(t,"error")}}W=new WeakMap,mt=new WeakSet,Et=function(){return i(this,W)||v(this,W,document.getElementById("toastContainer")),i(this,W)},d(Z,mt),d(Z,W,null);var S,B,M,q,X,Q,tt,I,u,$t,wt,nt,xt,kt,Ct,Mt,Lt,K;class Vt{constructor(){d(this,u);d(this,S);d(this,B);d(this,M);d(this,q);d(this,X);d(this,Q,null);d(this,tt,null);d(this,I,null);v(this,S,document.getElementById("searchInput")),v(this,B,document.getElementById("searchClear")),v(this,M,document.getElementById("searchResults")),v(this,q,document.getElementById("productModal")),v(this,X,document.getElementById("modalContent")),l(this,u,$t).call(this)}init(){l(this,u,nt).call(this)}}S=new WeakMap,B=new WeakMap,M=new WeakMap,q=new WeakMap,X=new WeakMap,Q=new WeakMap,tt=new WeakMap,I=new WeakMap,u=new WeakSet,$t=function(){i(this,S).addEventListener("input",()=>{const t=i(this,S).value.trim();if(i(this,B).classList.toggle("visible",t.length>0),clearTimeout(i(this,Q)),t.length<3){l(this,u,nt).call(this);return}v(this,Q,setTimeout(()=>{l(this,u,xt).call(this),l(this,u,wt).call(this,t)},800))}),i(this,B).addEventListener("click",()=>{i(this,S).value="",i(this,B).classList.remove("visible"),l(this,u,nt).call(this),i(this,S).focus()}),document.getElementById("modalOverlay").addEventListener("click",()=>l(this,u,K).call(this)),document.getElementById("modalClose").addEventListener("click",()=>l(this,u,K).call(this)),document.addEventListener("keydown",t=>{t.key==="Escape"&&l(this,u,K).call(this)})},wt=async function(t){try{i(this,I)&&i(this,I).abort(),v(this,I,new AbortController);const e=await J.search(t,1,i(this,I).signal);e.length===0?l(this,u,kt).call(this,t):l(this,u,Mt).call(this,e)}catch(e){if(e.name==="AbortError")return;l(this,u,Ct).call(this),console.error("Search error:",e)}},nt=function(){i(this,M).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🔍</div>
        <div class="search-state__text">Введите название продукта</div>
        <div class="search-state__hint">Например: куриная грудка, гречка, яблоко</div>
      </div>
    `},xt=function(){i(this,M).innerHTML=Array(4).fill(0).map(()=>`
      <div class="product-card" style="pointer-events:none">
        <div class="skeleton" style="width:44px;height:44px;border-radius:8px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div class="skeleton" style="height:16px;width:60%;border-radius:4px"></div>
          <div class="skeleton" style="height:12px;width:40%;border-radius:4px"></div>
        </div>
        <div class="skeleton" style="height:24px;width:40px;border-radius:4px"></div>
      </div>
    `).join("")},kt=function(t){i(this,M).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🤷</div>
        <div class="search-state__text">Ничего не найдено по запросу «${t}»</div>
        <div class="search-state__hint">Попробуйте другое название или на английском</div>
      </div>
    `},Ct=function(){i(this,M).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">⚠️</div>
        <div class="search-state__text">Ошибка загрузки</div>
        <div class="search-state__hint">Проверьте соединение с интернетом</div>
      </div>
    `},Mt=function(t){i(this,M).innerHTML=t.map(e=>`
      <div class="product-card" data-id="${e.id}">
        <div class="product-card__emoji">${e.emoji}</div>
        <div class="product-card__info">
          <div class="product-card__name">${e.name}</div>
          <div class="product-card__meta">${e.brand||"на 100г"}</div>
          <div class="macros">
            <div class="macros__item">
              <div class="macros__dot macros__dot--protein"></div>
              Б ${e.protein}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--fat"></div>
              Ж ${e.fat}г
            </div>
            <div class="macros__item">
              <div class="macros__dot macros__dot--carbs"></div>
              У ${e.carbs}г
            </div>
          </div>
        </div>
        <div class="product-card__calories">
          ${e.calories}
          <span>ккал/100г</span>
        </div>
      </div>
    `).join(""),i(this,M).querySelectorAll(".product-card").forEach((e,a)=>{e.addEventListener("click",()=>l(this,u,Lt).call(this,t[a]))})},Lt=function(t){v(this,tt,t),i(this,X).innerHTML=`
      <div class="modal__product-name">${t.emoji} ${t.name}</div>
      <div class="modal__product-brand">${t.brand||"Продукт"} · на 100г</div>

      <div class="modal__calories-display">
        <div class="modal__calories-value">${t.calories}</div>
        <div class="modal__calories-label">ккал</div>
        <div class="modal__serving-label">/ 100г</div>
      </div>

      <div class="modal__macros-grid">
        <div class="modal__macro-box modal__macro-box--protein">
          <div class="modal__macro-value">${t.protein}г</div>
          <div class="modal__macro-label">Белки</div>
        </div>
        <div class="modal__macro-box modal__macro-box--fat">
          <div class="modal__macro-value">${t.fat}г</div>
          <div class="modal__macro-label">Жиры</div>
        </div>
        <div class="modal__macro-box modal__macro-box--carbs">
          <div class="modal__macro-value">${t.carbs}г</div>
          <div class="modal__macro-label">Углеводы</div>
        </div>
      </div>

      ${t.fiber?`<div style="font-size:13px;color:var(--color-text-muted);margin-bottom:16px">Клетчатка: ${t.fiber}г</div>`:""}

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
    `;const e=document.getElementById("modalAmount"),a=document.getElementById("modalCalcResult"),s=()=>{const r=parseFloat(e.value)||0,o=r/100,n=Math.round(t.calories*o);a.textContent=r>0?`${r}г = ${n} ккал · Б ${Math.round(t.protein*o*10)/10}г · Ж ${Math.round(t.fat*o*10)/10}г · У ${Math.round(t.carbs*o*10)/10}г`:""};e.addEventListener("input",s),s(),document.getElementById("modalAddBtn").addEventListener("click",()=>{var h;const r=parseFloat(e.value),o=document.getElementById("modalMeal").value;if(!r||r<=0){Z.error("Укажите количество в граммах");return}f.addEntry(f.today(),o,t,r);const n=((h=f.MEALS.find(c=>c.id===o))==null?void 0:h.name)||o;Z.success(`Добавлено в «${n}»`),l(this,u,K).call(this)}),i(this,q).classList.add("open"),document.body.style.overflow="hidden"},K=function(){i(this,q).classList.remove("open"),document.body.style.overflow="",v(this,tt,null)};var $,H,et,A,at,C,pt,Dt,St,Tt;class Zt{constructor(t){d(this,C);d(this,$);d(this,H);d(this,et);d(this,A);d(this,at);v(this,$,f.today()),v(this,H,t),v(this,et,document.getElementById("diarySummary")),v(this,A,document.getElementById("diaryMeals")),v(this,at,document.getElementById("currentDate")),l(this,C,Dt).call(this)}render(){i(this,at).textContent=f.formatDate(i(this,$)),l(this,C,St).call(this),l(this,C,Tt).call(this)}}$=new WeakMap,H=new WeakMap,et=new WeakMap,A=new WeakMap,at=new WeakMap,C=new WeakSet,pt=function(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`},Dt=function(){document.getElementById("prevDay").addEventListener("click",()=>{const t=new Date(i(this,$)+"T00:00:00");t.setDate(t.getDate()-1),v(this,$,l(this,C,pt).call(this,t)),this.render()}),document.getElementById("nextDay").addEventListener("click",()=>{const t=f.today();if(i(this,$)>=t)return;const e=new Date(i(this,$)+"T00:00:00");e.setDate(e.getDate()+1),v(this,$,l(this,C,pt).call(this,e)),this.render()})},St=function(){const t=f.getDayTotals(i(this,$)),e=i(this,H).isComplete()?i(this,H).calcTargetCalories():2e3,a=Math.min(100,Math.round(t.calories/e*100)),s=e-t.calories;i(this,et).innerHTML=`
      <div class="diary__summary-row">
        <span class="diary__summary-label">Потреблено калорий</span>
        <span style="font-size:13px;color:var(--color-text-muted)">Цель: ${e} ккал</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:10px">
        <span class="diary__summary-cals">${t.calories}</span>
        <span style="color:var(--color-text-muted);font-size:14px">из ${e} ккал</span>
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
          Б ${t.protein}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-fat)"></div>
          Ж ${t.fat}г
        </div>
        <div class="diary__macro-chip">
          <div class="diary__macro-chip-dot" style="background:var(--color-carbs)"></div>
          У ${t.carbs}г
        </div>
      </div>
    `},Tt=function(){const t=f.getDay(i(this,$));i(this,A).innerHTML=f.MEALS.map(e=>{const a=t[e.id]||[],s=a.reduce((r,o)=>r+o.calories,0);return`
        <div class="diary__meal expanded" id="meal-${e.id}">
          <div class="diary__meal-header">
            <span class="diary__meal-emoji">${e.emoji}</span>
            <span class="diary__meal-name">${e.name}</span>
            <span class="diary__meal-total">${s>0?s+" ккал":""}</span>
            <svg class="diary__meal-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div class="diary__meal-items">
            ${a.length===0?'<div class="diary__empty">Нет записей. Добавьте через Поиск →</div>':a.map(r=>`
                <div class="diary__meal-item" data-meal="${e.id}" data-id="${r.id}">
                  <span>${r.emoji||"🥘"}</span>
                  <span class="diary__meal-item-name">${r.name}</span>
                  <span class="diary__meal-item-amount">${r.amount}г</span>
                  <span class="diary__meal-item-cals">${r.calories} кк</span>
                  <button class="diary__meal-item-remove" data-meal="${e.id}" data-entry-id="${r.id}" title="Удалить">✕</button>
                </div>
              `).join("")}
          </div>
        </div>
      `}).join(""),i(this,A).querySelectorAll(".diary__meal-header").forEach(e=>{e.addEventListener("click",()=>{e.closest(".diary__meal").classList.toggle("expanded")})}),i(this,A).querySelectorAll(".diary__meal-item-remove").forEach(e=>{e.addEventListener("click",a=>{a.stopPropagation();const s=e.dataset.meal,r=parseFloat(e.dataset.entryId);f.removeEntry(i(this,$),s,r),Z.success("Запись удалена"),this.render()})})};const Xt="modulepreload",Qt=function(m,t){return new URL(m,t).href},ft={},_t=function(t,e,a){let s=Promise.resolve();if(e&&e.length>0){const o=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),h=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));s=Promise.allSettled(e.map(c=>{if(c=Qt(c,a),c in ft)return;ft[c]=!0;const g=c.endsWith(".css"),_=g?'[rel="stylesheet"]':"";if(!!a)for(let G=o.length-1;G>=0;G--){const ot=o[G];if(ot.href===c&&(!g||ot.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${c}"]${_}`))return;const k=document.createElement("link");if(k.rel=g?"stylesheet":Xt,g||(k.as="script"),k.crossOrigin="",k.href=c,h&&k.setAttribute("nonce",h),document.head.appendChild(k),g)return new Promise((G,ot)=>{k.addEventListener("load",G),k.addEventListener("error",()=>ot(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(o){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=o,window.dispatchEvent(n),!n.defaultPrevented)throw o}return s.then(o=>{for(const n of o||[])n.status==="rejected"&&r(n.reason);return t().catch(r)})};var F,st,it,N,L,Bt,It,At,jt;class te{constructor(t){d(this,L);d(this,F);d(this,st);d(this,it);d(this,N,null);v(this,F,t),v(this,st,document.getElementById("plannerWeek")),v(this,it,document.getElementById("plannerStats"))}render(){const t=new Date,e=new Date(t),a=t.getDay()===0?6:t.getDay()-1;e.setDate(t.getDate()-a),e.setHours(0,0,0,0);const s=f.getWeekData(l(this,L,Bt).call(this,e)),r=i(this,F).isComplete()?i(this,F).calcTargetCalories():2e3;l(this,L,It).call(this,s,r,t),l(this,L,At).call(this,s,r)}}F=new WeakMap,st=new WeakMap,it=new WeakMap,N=new WeakMap,L=new WeakSet,Bt=function(t){const e=t.getFullYear(),a=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0");return`${e}-${a}-${s}`},It=function(t,e,a){const s=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],r=f.today();i(this,st).innerHTML=t.map((o,n)=>{const h=o.totals.calories,c=Math.min(100,Math.round(h/e*100)),g=o.date===r,_=new Date(o.date+"T00:00:00").getDate(),x=h>e;return`
        <div class="planner__day ${g?"planner__day--today":""}">
          <div class="planner__day-name">${s[n]}</div>
          <div class="planner__day-date">${_}</div>
          <div class="planner__day-cals">
            ${h>0?`<strong>${h}</strong> ккал`:'<span style="color:var(--color-text-muted);font-size:11px">нет данных</span>'}
          </div>
          <div class="planner__day-bar">
            <div class="planner__day-bar-fill ${x?"over":""}" style="width:${c}%"></div>
          </div>
        </div>
      `}).join("")},At=function(t,e){const a=t.filter(h=>h.totals.calories>0),s=a.reduce((h,c)=>h+c.totals.calories,0),r=a.length?Math.round(s/a.length):0,o=a.reduce((h,c)=>h+c.totals.protein,0),n=a.reduce((h,c)=>h+c.totals.carbs,0);i(this,it).innerHTML=`
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
    `,l(this,L,jt).call(this,t,e)},jt=async function(t,e){const{Chart:a,registerables:s}=await _t(async()=>{const{Chart:_,registerables:x}=await import("./chart-19k6OvwP.js");return{Chart:_,registerables:x}},[],import.meta.url);a.register(...s);const r=document.getElementById("weekChart");if(!r)return;i(this,N)&&i(this,N).destroy();const o=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],n=document.documentElement.dataset.theme==="dark",h=n?"#a8c4d8":"#5a6b48",c=n?"#3d5f7a":"#e2e8d0",g=n?"#6eb5e0":"#5c8a3c";v(this,N,new a(r,{type:"bar",data:{labels:o,datasets:[{label:"Калории",data:t.map(_=>_.totals.calories),backgroundColor:t.map(_=>_.totals.calories>e?"rgba(192,57,43,0.7)":g+"aa"),borderColor:t.map(_=>_.totals.calories>e?"#c0392b":g),borderWidth:1.5,borderRadius:6},{label:"Цель",data:Array(7).fill(e),type:"line",borderColor:n?"#e0b86e":"#d4a843",borderDash:[6,3],borderWidth:1.5,pointRadius:0,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:h,font:{size:12},boxWidth:14}},tooltip:{callbacks:{label:_=>`${_.dataset.label}: ${_.parsed.y} ккал`}}},scales:{x:{ticks:{color:h},grid:{color:c}},y:{ticks:{color:h,callback:_=>_+" кк"},grid:{color:c},beginAtZero:!0}}}}))};var y,rt,U,Y,b,Rt,Pt,zt,Ot,Wt,qt,Ht;class ee{constructor(t){d(this,b);d(this,y);d(this,rt);d(this,U,null);d(this,Y,null);v(this,y,t),v(this,rt,document.getElementById("profileGrid"))}render(){i(this,rt).innerHTML=`
      ${l(this,b,Rt).call(this)}
      ${l(this,b,Pt).call(this)}
      ${l(this,b,zt).call(this)}
      ${l(this,b,Ot).call(this)}
    `,l(this,b,Wt).call(this),i(this,y).isComplete()&&(l(this,b,qt).call(this),l(this,b,Ht).call(this))}}y=new WeakMap,rt=new WeakMap,U=new WeakMap,Y=new WeakMap,b=new WeakSet,Rt=function(){const t=i(this,y).data;return`
      <div class="profile__card">
        <div class="profile__card-title">Личные данные</div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Имя</label>
            <input class="profile__input" id="p-name" type="text" value="${t.name}" placeholder="Ваше имя" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Возраст</label>
            <input class="profile__input" id="p-age" type="number" value="${t.age}" min="10" max="120" />
          </div>
        </div>
        <div class="profile__form-row">
          <div class="profile__form-group">
            <label class="profile__label">Рост (см)</label>
            <input class="profile__input" id="p-height" type="number" value="${t.height}" min="100" max="250" />
          </div>
          <div class="profile__form-group">
            <label class="profile__label">Вес (кг)</label>
            <input class="profile__input" id="p-weight" type="number" value="${t.weight}" min="20" max="500" />
          </div>
        </div>
        <div class="profile__form-group">
          <label class="profile__label">Пол</label>
          <div class="radio-group" style="margin-top:4px;flex-direction:row">
            <label class="radio-option ${t.gender==="female"?"selected":""}" style="flex:1">
              <input type="radio" name="gender" value="female" ${t.gender==="female"?"checked":""} />
              Женский
            </label>
            <label class="radio-option ${t.gender==="male"?"selected":""}" style="flex:1">
              <input type="radio" name="gender" value="male" ${t.gender==="male"?"checked":""} />
              Мужской
            </label>
          </div>
        </div>
        <button class="btn btn--primary btn--full" id="saveProfileBtn" style="margin-top:16px">
          Сохранить
        </button>
      </div>
    `},Pt=function(){if(!i(this,y).isComplete())return`
        <div class="profile__card">
          <div class="profile__card-title">Расчёт нормы</div>
          <div class="empty-state">
            <div class="empty-state__icon">📊</div>
            <div class="empty-state__text">Заполните личные данные</div>
            <div class="empty-state__sub">для расчёта нормы калорий</div>
          </div>
        </div>
      `;const t=i(this,y).calcBMR(),e=i(this,y).calcTDEE(),a=i(this,y).calcTargetCalories(),s=i(this,y).calcBMI(),r=i(this,y).calcMacros();return`
      <div class="profile__card">
        <div class="profile__card-title">Расчёт нормы</div>
        <div class="profile__result">
          <div class="profile__result-grid">
            <div class="profile__result-item">
              <div class="profile__result-value">${t}</div>
              <div class="profile__result-label">BMR (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value">${e}</div>
              <div class="profile__result-label">TDEE (ккал/день)</div>
            </div>
            <div class="profile__result-item">
              <div class="profile__result-value" style="color:var(--color-accent-2)">${a}</div>
              <div class="profile__result-label">Цель · ${{lose:"Похудение",maintain:"Поддержание",gain:"Набор массы"}[i(this,y).goal]}</div>
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
    `},zt=function(){const t=i(this,y).data,e=[{id:"sedentary",label:"Сидячий образ жизни",sub:"Офисная работа, минимум движения"},{id:"light",label:"Лёгкая активность",sub:"Прогулки, 1-3 тренировки в неделю"},{id:"moderate",label:"Умеренная активность",sub:"3-5 тренировок в неделю"},{id:"active",label:"Высокая активность",sub:"6-7 интенсивных тренировок"},{id:"very_active",label:"Очень высокая",sub:"Физический труд + тренировки"}],a=[{id:"lose",label:"📉 Похудение",sub:"-500 ккал от TDEE"},{id:"maintain",label:"⚖️ Поддержание",sub:"Равно TDEE"},{id:"gain",label:"📈 Набор массы",sub:"+300 ккал к TDEE"}];return`
      <div class="profile__card">
        <div class="profile__card-title">Активность и цель</div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--color-text-muted);margin-bottom:8px">Уровень активности</div>
        <div class="radio-group" id="activityGroup">
          ${e.map(s=>`
            <label class="radio-option ${t.activity===s.id?"selected":""}">
              <input type="radio" name="activity" value="${s.id}" ${t.activity===s.id?"checked":""} />
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
            <label class="radio-option ${t.goal===s.id?"selected":""}" style="flex:1;min-width:110px">
              <input type="radio" name="goal" value="${s.id}" ${t.goal===s.id?"checked":""} />
              <div>
                <div style="font-size:13px">${s.label}</div>
                <div style="font-size:11px;color:var(--color-text-muted)">${s.sub}</div>
              </div>
            </label>
          `).join("")}
        </div>
      </div>
    `},Ot=function(){return`
      <div class="profile__card">
        <div class="profile__card-title">Статистика за неделю</div>
        <div class="profile__chart-container">
          <canvas id="profileWeekChart"></canvas>
        </div>
      </div>
    `},Wt=function(){var t;document.querySelectorAll('.radio-option input[type="radio"]').forEach(e=>{e.addEventListener("change",()=>{var a;(a=e.closest(".radio-group"))==null||a.querySelectorAll(".radio-option").forEach(s=>{s.classList.remove("selected")}),e.closest(".radio-option").classList.add("selected"),e.name==="activity"?i(this,y).update({activity:e.value}):e.name==="goal"&&i(this,y).update({goal:e.value})})}),(t=document.getElementById("saveProfileBtn"))==null||t.addEventListener("click",()=>{var s,r,o,n,h;const e=((s=document.querySelector('input[name="gender"]:checked'))==null?void 0:s.value)||"female",a={name:((r=document.getElementById("p-name"))==null?void 0:r.value.trim())||"",age:parseFloat((o=document.getElementById("p-age"))==null?void 0:o.value)||25,height:parseFloat((n=document.getElementById("p-height"))==null?void 0:n.value)||165,weight:parseFloat((h=document.getElementById("p-weight"))==null?void 0:h.value)||60,gender:e};i(this,y).update(a),this.render()})},qt=async function(){const{Chart:t,registerables:e}=await _t(async()=>{const{Chart:n,registerables:h}=await import("./chart-19k6OvwP.js");return{Chart:n,registerables:h}},[],import.meta.url);t.register(...e);const a=document.getElementById("macroChart");if(!a)return;i(this,U)&&i(this,U).destroy();const s=i(this,y).calcMacros(),r=document.documentElement.dataset.theme==="dark",o=r?"#a8c4d8":"#5a6b48";v(this,U,new t(a,{type:"doughnut",data:{labels:["Белки","Жиры","Углеводы"],datasets:[{data:[s.protein*4,s.fat*9,s.carbs*4],backgroundColor:[r?"#6eb5e0":"#5c8a3c",r?"#e0b86e":"#d4a843",r?"#7eb8e8":"#4a7ab5"],borderWidth:0,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{labels:{color:o,font:{size:12},boxWidth:12}},tooltip:{callbacks:{label:n=>`${n.label}: ${Math.round(n.parsed/(s.protein*4+s.fat*9+s.carbs*4)*100)}%`}}}}}))},Ht=async function(){const{Chart:t,registerables:e}=await _t(async()=>{const{Chart:c,registerables:g}=await import("./chart-19k6OvwP.js");return{Chart:c,registerables:g}},[],import.meta.url);t.register(...e);const a=document.getElementById("profileWeekChart");if(!a)return;i(this,Y)&&i(this,Y).destroy();const s=[],r=[];for(let c=6;c>=0;c--){const g=new Date;g.setDate(g.getDate()-c);const _=`${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-${String(g.getDate()).padStart(2,"0")}`;s.push(f.getDayTotals(_)),r.push(g.toLocaleDateString("ru-RU",{weekday:"short"}))}const o=document.documentElement.dataset.theme==="dark",n=o?"#a8c4d8":"#5a6b48",h=o?"#3d5f7a":"#e2e8d0";v(this,Y,new t(a,{type:"line",data:{labels:r,datasets:[{label:"Белки (г)",data:s.map(c=>c.protein),borderColor:o?"#6eb5e0":"#5c8a3c",backgroundColor:(o?"#6eb5e0":"#5c8a3c")+"20",fill:!0,tension:.4,pointRadius:3},{label:"Углеводы (г)",data:s.map(c=>c.carbs),borderColor:o?"#7eb8e8":"#4a7ab5",backgroundColor:"transparent",tension:.4,pointRadius:3},{label:"Жиры (г)",data:s.map(c=>c.fat),borderColor:o?"#e0b86e":"#d4a843",backgroundColor:"transparent",tension:.4,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:n,font:{size:11},boxWidth:12}}},scales:{x:{ticks:{color:n,font:{size:11}},grid:{color:h}},y:{ticks:{color:n,font:{size:11}},grid:{color:h},beginAtZero:!0}}}}))};var j,R,w,E,Ft,Nt,V,Ut,Yt;class ae{constructor(){d(this,E);d(this,j,"search");d(this,R);d(this,w,{});v(this,R,new Kt),l(this,E,Ut).call(this),l(this,E,Ft).call(this),l(this,E,Nt).call(this),l(this,E,Yt).call(this);const t=window.location.hash.replace("#","");["search","diary","planner","profile"].includes(t)?l(this,E,V).call(this,t):l(this,E,V).call(this,"search")}}j=new WeakMap,R=new WeakMap,w=new WeakMap,E=new WeakSet,Ft=function(){i(this,w).search=new Vt,i(this,w).diary=new Zt(i(this,R)),i(this,w).planner=new te(i(this,R)),i(this,w).profile=new ee(i(this,R)),i(this,w).search.init()},Nt=function(){document.querySelectorAll(".nav__item").forEach(t=>{t.addEventListener("click",()=>l(this,E,V).call(this,t.dataset.page))}),document.querySelectorAll(".mobile-nav__item").forEach(t=>{t.addEventListener("click",()=>l(this,E,V).call(this,t.dataset.page))})},V=function(t){var e;i(this,j)===t&&t!=="search"||(document.querySelectorAll(".page").forEach(a=>a.classList.remove("page--active")),(e=document.getElementById(`page-${t}`))==null||e.classList.add("page--active"),document.querySelectorAll(".nav__item, .mobile-nav__item").forEach(a=>{a.classList.toggle("nav__item--active",a.dataset.page===t),a.classList.toggle("mobile-nav__item--active",a.dataset.page===t)}),v(this,j,t),window.location.hash=t,t==="diary"&&i(this,w).diary.render(),t==="planner"&&i(this,w).planner.render(),t==="profile"&&i(this,w).profile.render(),window.scrollTo(0,0))},Ut=function(){const t=P.get("theme","light");document.documentElement.dataset.theme=t},Yt=function(){document.getElementById("themeToggle").addEventListener("click",()=>{const a=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=a,P.set("theme",a),i(this,j)==="planner"&&i(this,w).planner.render(),i(this,j)==="profile"&&i(this,w).profile.render()})};document.addEventListener("DOMContentLoaded",()=>{new ae});
