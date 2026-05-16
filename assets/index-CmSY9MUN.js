var Ze=Object.defineProperty;var _e=d=>{throw TypeError(d)};var Qe=(d,e,t)=>e in d?Ze(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var ge=(d,e,t)=>Qe(d,typeof e!="symbol"?e+"":e,t),ue=(d,e,t)=>e.has(d)||_e("Cannot "+t);var i=(d,e,t)=>(ue(d,e,"read from private field"),t?t.call(d):e.get(d)),c=(d,e,t)=>e.has(d)?_e("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(d):e.set(d,t),h=(d,e,t,a)=>(ue(d,e,"write to private field"),a?a.call(d,t):e.set(d,t),t),n=(d,e,t)=>(ue(d,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();var T;class z{static set(e,t){try{localStorage.setItem(i(this,T)+e,JSON.stringify(t))}catch(a){console.error("Storage.set error:",a)}}static get(e,t=null){try{const a=localStorage.getItem(i(this,T)+e);return a!==null?JSON.parse(a):t}catch{return t}}static remove(e){localStorage.removeItem(i(this,T)+e)}static clear(){Object.keys(localStorage).filter(e=>e.startsWith(i(this,T))).forEach(e=>localStorage.removeItem(e))}}T=new WeakMap,c(z,T,"nutritrack_");var f;class Xe{constructor(){c(this,f);h(this,f,z.get("profile",{name:"",gender:"female",age:25,height:165,weight:60,goal:"maintain",activity:"moderate"}))}get name(){return i(this,f).name}get gender(){return i(this,f).gender}get age(){return i(this,f).age}get height(){return i(this,f).height}get weight(){return i(this,f).weight}get goal(){return i(this,f).goal}get activity(){return i(this,f).activity}get data(){return{...i(this,f)}}update(e){h(this,f,{...i(this,f),...e}),z.set("profile",i(this,f))}calcBMR(){const{gender:e,weight:t,height:a,age:s}=i(this,f),r=10*t+6.25*a-5*s;return Math.round(e==="male"?r+5:r-161)}calcTDEE(){const e={sedentary:1.2,light:1.375,moderate:1.55,active:1.725,very_active:1.9};return Math.round(this.calcBMR()*(e[i(this,f).activity]||1.55))}calcTargetCalories(){return this.calcTDEE()+({lose:-500,maintain:0,gain:300}[i(this,f).goal]||0)}calcMacros(){const e=this.calcTargetCalories();return{protein:Math.round(e*.3/4),fat:Math.round(e*.25/9),carbs:Math.round(e*.45/4)}}calcBMI(){const e=i(this,f).height/100,t=i(this,f).weight/(e*e),a=Math.round(t*10)/10;let s;return t<18.5?s="Недостаточный вес":t<25?s="Норма":t<30?s="Избыточный вес":s="Ожирение",{value:a,category:s}}isComplete(){return i(this,f).age>0&&i(this,f).height>0&&i(this,f).weight>0}}f=new WeakMap;var de,F,me,pe,$,ne,Ee,$e,we,et,je;class P{static async search(e,t=1,a){if(/[а-яёА-ЯЁ]/.test(e)){const r=n(this,$,we).call(this,e);try{const o=await n(this,$,ne).call(this,e,a);return n(this,$,$e).call(this,r,o)}catch(o){if(o.name==="AbortError")throw o;return r}}return n(this,$,ne).call(this,e,a)}}de=new WeakMap,F=new WeakMap,me=new WeakMap,pe=new WeakMap,$=new WeakSet,ne=async function(e,t,a=1){const s=`off_${e.toLowerCase().trim()}`;if(i(this,F).has(s))return i(this,F).get(s);const r=new AbortController,o=setTimeout(()=>r.abort(),8e3);t==null||t.addEventListener("abort",()=>r.abort());const l=new URLSearchParams({search_terms:e,search_simple:1,action:"process",json:1,page_size:20,fields:"id,product_name,brands,nutriments,categories_tags,quantity"});try{const m=await fetch(`${i(this,de)}?${l}`,{signal:r.signal});if(clearTimeout(o),m.status===503&&a>0)return await new Promise(u=>setTimeout(u,1e3)),n(this,$,ne).call(this,e,t,a-1);if(!m.ok)throw new Error(`OFF error: ${m.status}`);const b=((await m.json()).products||[]).filter(u=>{var L;return u.product_name&&((L=u.nutriments)==null?void 0:L["energy-kcal_100g"])}).map((u,L)=>n(this,$,Ee).call(this,u,L));return i(this,F).set(s,b),b}catch(m){throw clearTimeout(o),m}},Ee=function(e,t){var r,o,l;const a=e.nutriments||{},s=Math.round(a["energy-kcal_100g"]||a["energy-kcal"]||(a.energy_100g?a.energy_100g/4.184:0));return{id:`off_${t}_${e.id||e.code}`,name:((r=e.product_name)==null?void 0:r.trim())||"Без названия",brand:((l=(o=e.brands)==null?void 0:o.split(",")[0])==null?void 0:l.trim())||"Open Food Facts",calories:s,protein:Math.round((a.proteins_100g||0)*10)/10,fat:Math.round((a.fat_100g||0)*10)/10,carbs:Math.round((a.carbohydrates_100g||0)*10)/10,fiber:Math.round((a.fiber_100g||0)*10)/10,image:null,emoji:n(this,$,je).call(this,e.product_name||"")}},$e=function(e,t){const a=[...e];return t.forEach(s=>{a.some(o=>Math.abs(o.calories-s.calories)<5&&Math.abs(o.protein-s.protein)<1)||a.push(s)}),a.slice(0,20)},we=function(e){const t=e.toLowerCase().trim();return i(this,pe).filter(a=>a.name.toLowerCase().includes(t)).slice(0,15).map((a,s)=>({id:`local_${s}_${a.name}`,name:a.name,brand:"на 100 г",calories:a.calories,protein:a.protein,fat:a.fat,carbs:a.carbs,fiber:a.fiber||0,image:null,emoji:a.emoji}))},et=function(e){const t=e.toLowerCase();for(const[a,s]of Object.entries(i(this,me)))if(t.includes(a))return s;return null},je=function(e){const t=e.toLowerCase(),a=[[["chicken","turkey","poultry"],"🍗"],[["beef","steak","hamburger","patty"],"🥩"],[["pork","bacon","ham"],"🥩"],[["salmon","tuna","cod","fish","tilapia","mackerel"],"🐟"],[["shrimp","prawn","lobster"],"🦐"],[["egg"],"🥚"],[["milk"],"🥛"],[["yogurt","kefir"],"🥛"],[["cheese","cottage"],"🧀"],[["butter"],"🧈"],[["bread","toast","bun","bagel"],"🍞"],[["rice"],"🍚"],[["pasta","spaghetti","noodle"],"🍝"],[["oat","cereal","granola","buckwheat"],"🌾"],[["potato"],"🥔"],[["carrot"],"🥕"],[["tomato"],"🍅"],[["cucumber"],"🥒"],[["broccoli","cabbage","spinach"],"🥦"],[["apple"],"🍎"],[["banana"],"🍌"],[["orange"],"🍊"],[["grape"],"🍇"],[["strawberry"],"🍓"],[["blueberry"],"🫐"],[["watermelon"],"🍉"],[["nut","walnut","almond","peanut"],"🥜"],[["chocolate"],"🍫"],[["honey"],"🍯"],[["coffee"],"☕"],[["tea"],"🍵"],[["sugar"],"🧂"],[["oil","olive"],"🫙"],[["bean","lentil","chickpea"],"🫘"],[["corn"],"🌽"],[["avocado"],"🥑"],[["pizza"],"🍕"],[["soup"],"🍲"],[["salad"],"🥗"]];for(const[s,r]of a)if(s.some(o=>t.includes(o)))return r;return"🥘"},c(P,$),c(P,de,"https://world.openfoodfacts.org/cgi/search.pl"),c(P,F,new Map),c(P,me,{курин:"chicken breast",грудка:"chicken breast",филе:"chicken fillet",говядин:"beef",свинин:"pork",индейк:"turkey",котлет:"beef patty",лосос:"salmon",тунец:"tuna",треск:"cod",скумбри:"mackerel",минтай:"pollock",сельд:"herring",креветк:"shrimp",яйц:"egg",молок:"milk",кефир:"kefir",творог:"cottage cheese",сметан:"sour cream",йогурт:"greek yogurt",сыр:"cheese",масл:"butter",гречк:"buckwheat",рис:"rice",овсян:"oatmeal",макарон:"pasta",спагетт:"spaghetti",хлеб:"bread",картофел:"potato",картошк:"potato",морков:"carrot",капуст:"cabbage",брокколи:"broccoli",огурец:"cucumber",огурц:"cucumber",помидор:"tomato",перец:"bell pepper",свёкл:"beet",кукуруз:"corn",горошек:"green peas",яблок:"apple",банан:"banana",апельсин:"orange",виноград:"grapes",клубник:"strawberry",черник:"blueberry",груш:"pear",персик:"peach",арбуз:"watermelon",орех:"walnut",миндал:"almond",арахис:"peanut",семечк:"sunflower seeds",шоколад:"dark chocolate",мёд:"honey",мед:"honey",сахар:"sugar",кофе:"coffee",чай:"tea",фасол:"beans",чечевиц:"lentils",нут:"chickpeas",перловк:"barley",пшен:"millet",рыб:"fish",мясо:"meat",фрукт:"fruit",овощ:"vegetables",салат:"salad",суп:"soup"}),c(P,pe,[{name:"Куриная грудка варёная",calories:165,protein:31,fat:3.6,carbs:0,emoji:"🍗"},{name:"Куриное филе запечённое",calories:172,protein:29,fat:5,carbs:1,emoji:"🍗"},{name:"Куриное бедро без кожи",calories:185,protein:25,fat:9,carbs:0,emoji:"🍗"},{name:"Говядина варёная",calories:254,protein:26,fat:16,carbs:0,emoji:"🥩"},{name:"Свинина варёная",calories:294,protein:25,fat:21,carbs:0,emoji:"🥩"},{name:"Индейка варёная",calories:189,protein:29,fat:7.4,carbs:0,emoji:"🍗"},{name:"Котлета домашняя",calories:235,protein:18,fat:16,carbs:6,emoji:"🥩"},{name:"Лосось запечённый",calories:208,protein:28,fat:10,carbs:0,emoji:"🐟"},{name:"Тунец консервированный",calories:116,protein:26,fat:1,carbs:0,emoji:"🐟"},{name:"Треска варёная",calories:105,protein:23,fat:.9,carbs:0,emoji:"🐟"},{name:"Скумбрия запечённая",calories:239,protein:20,fat:17,carbs:0,emoji:"🐟"},{name:"Сельдь солёная",calories:217,protein:17,fat:16,carbs:0,emoji:"🐟"},{name:"Минтай варёный",calories:79,protein:17,fat:.9,carbs:0,emoji:"🐟"},{name:"Креветки варёные",calories:99,protein:24,fat:.3,carbs:0,emoji:"🦐"},{name:"Яйцо куриное варёное",calories:155,protein:13,fat:11,carbs:1.1,emoji:"🥚"},{name:"Яйцо куриное жареное",calories:196,protein:14,fat:15,carbs:.4,emoji:"🥚"},{name:"Молоко 2,5%",calories:52,protein:2.8,fat:2.5,carbs:4.7,emoji:"🥛"},{name:"Молоко 3,2%",calories:60,protein:2.8,fat:3.2,carbs:4.7,emoji:"🥛"},{name:"Кефир 2,5%",calories:53,protein:2.9,fat:2.5,carbs:3.9,emoji:"🥛"},{name:"Творог 0%",calories:71,protein:18,fat:.6,carbs:1.8,emoji:"🧀"},{name:"Творог 5%",calories:121,protein:17,fat:5,carbs:2.7,emoji:"🧀"},{name:"Творог 9%",calories:159,protein:16,fat:9,carbs:2,emoji:"🧀"},{name:"Сметана 15%",calories:158,protein:2.6,fat:15,carbs:3,emoji:"🥛"},{name:"Сметана 20%",calories:204,protein:2.5,fat:20,carbs:3,emoji:"🥛"},{name:"Сыр российский",calories:364,protein:23,fat:30,carbs:0,emoji:"🧀"},{name:"Сыр моцарелла",calories:280,protein:22,fat:22,carbs:2.2,emoji:"🧀"},{name:"Сыр фета",calories:264,protein:14,fat:21,carbs:4.1,emoji:"🧀"},{name:"Йогурт греческий 2%",calories:73,protein:8,fat:2,carbs:3.5,emoji:"🥛"},{name:"Йогурт натуральный",calories:68,protein:5,fat:3.2,carbs:3.5,emoji:"🥛"},{name:"Масло сливочное",calories:748,protein:.5,fat:82,carbs:.8,emoji:"🧈"},{name:"Масло растительное",calories:884,protein:0,fat:100,carbs:0,emoji:"🫙"},{name:"Масло оливковое",calories:884,protein:0,fat:100,carbs:0,emoji:"🫙"},{name:"Гречка варёная",calories:92,protein:3.4,fat:.6,carbs:19,emoji:"🌾"},{name:"Гречка сухая",calories:343,protein:13,fat:3.4,carbs:68,emoji:"🌾"},{name:"Рис варёный",calories:130,protein:2.7,fat:.3,carbs:28,emoji:"🍚"},{name:"Рис сухой",calories:360,protein:6.7,fat:.7,carbs:78,emoji:"🍚"},{name:"Овсянка варёная",calories:88,protein:3.2,fat:1.7,carbs:15,emoji:"🌾"},{name:"Овсяные хлопья сухие",calories:366,protein:13,fat:6.9,carbs:66,emoji:"🌾"},{name:"Перловка варёная",calories:123,protein:2.3,fat:.4,carbs:28,emoji:"🌾"},{name:"Пшено варёное",calories:119,protein:3.5,fat:1.1,carbs:23,emoji:"🌾"},{name:"Макароны варёные",calories:158,protein:5.5,fat:.9,carbs:31,emoji:"🍝"},{name:"Макароны сухие",calories:338,protein:12,fat:1.8,carbs:68,emoji:"🍝"},{name:"Хлеб белый",calories:265,protein:7.7,fat:3.2,carbs:51,emoji:"🍞"},{name:"Хлеб ржаной",calories:259,protein:6.8,fat:3.3,carbs:49,emoji:"🍞"},{name:"Хлебцы рисовые",calories:384,protein:8,fat:2.8,carbs:83,emoji:"🍞"},{name:"Картофель варёный",calories:87,protein:2,fat:.4,carbs:19,emoji:"🥔"},{name:"Картофель запечённый",calories:93,protein:2.5,fat:.1,carbs:21,emoji:"🥔"},{name:"Морковь сырая",calories:41,protein:.9,fat:.2,carbs:10,emoji:"🥕"},{name:"Морковь варёная",calories:35,protein:.8,fat:.2,carbs:8.2,emoji:"🥕"},{name:"Капуста белокочанная",calories:27,protein:1.8,fat:.1,carbs:5.4,emoji:"🥦"},{name:"Брокколи варёная",calories:35,protein:2.4,fat:.4,carbs:7.2,emoji:"🥦"},{name:"Огурец свежий",calories:15,protein:.7,fat:.1,carbs:3.1,emoji:"🥒"},{name:"Помидор свежий",calories:20,protein:.9,fat:.2,carbs:3.9,emoji:"🍅"},{name:"Перец болгарский",calories:31,protein:1,fat:.3,carbs:6.7,emoji:"🫑"},{name:"Свёкла варёная",calories:49,protein:1.9,fat:.2,carbs:10,emoji:"🥬"},{name:"Кукуруза варёная",calories:123,protein:4.1,fat:1.5,carbs:25,emoji:"🌽"},{name:"Горошек зелёный",calories:73,protein:5.4,fat:.4,carbs:12,emoji:"🫛"},{name:"Яблоко",calories:52,protein:.3,fat:.2,carbs:14,emoji:"🍎"},{name:"Банан",calories:89,protein:1.1,fat:.3,carbs:23,emoji:"🍌"},{name:"Апельсин",calories:47,protein:.9,fat:.1,carbs:12,emoji:"🍊"},{name:"Виноград",calories:69,protein:.6,fat:.2,carbs:18,emoji:"🍇"},{name:"Клубника",calories:32,protein:.7,fat:.3,carbs:7.7,emoji:"🍓"},{name:"Черника",calories:57,protein:.7,fat:.3,carbs:14,emoji:"🫐"},{name:"Груша",calories:57,protein:.4,fat:.1,carbs:15,emoji:"🍐"},{name:"Персик",calories:39,protein:.9,fat:.3,carbs:9.5,emoji:"🍑"},{name:"Арбуз",calories:30,protein:.6,fat:.2,carbs:7.6,emoji:"🍉"},{name:"Грецкий орех",calories:654,protein:15,fat:65,carbs:14,emoji:"🥜"},{name:"Миндаль",calories:576,protein:21,fat:49,carbs:22,emoji:"🥜"},{name:"Арахис",calories:567,protein:26,fat:49,carbs:16,emoji:"🥜"},{name:"Семечки подсолнуха",calories:584,protein:21,fat:51,carbs:20,emoji:"🌻"},{name:"Шоколад тёмный",calories:598,protein:7.8,fat:43,carbs:46,emoji:"🍫"},{name:"Шоколад молочный",calories:535,protein:6.9,fat:30,carbs:60,emoji:"🍫"},{name:"Мёд",calories:304,protein:.3,fat:0,carbs:82,emoji:"🍯"},{name:"Сахар",calories:387,protein:0,fat:0,carbs:100,emoji:"🧂"},{name:"Майонез",calories:680,protein:2.8,fat:74,carbs:2.6,emoji:"🥫"},{name:"Фасоль варёная",calories:127,protein:9,fat:.5,carbs:23,emoji:"🫘"},{name:"Чечевица варёная",calories:116,protein:9,fat:.4,carbs:20,emoji:"🫘"},{name:"Нут варёный",calories:164,protein:9,fat:2.6,carbs:27,emoji:"🫘"},{name:"Кофе чёрный",calories:2,protein:.3,fat:0,carbs:0,emoji:"☕"},{name:"Чай зелёный",calories:1,protein:0,fat:0,carbs:0,emoji:"🍵"}]);var M,ve,le;class g{static today(){return n(this,M,le).call(this,new Date)}static getDay(e){const t={};return this.MEALS.forEach(a=>{t[a.id]=[]}),z.get(n(this,M,ve).call(this,e),t)}static setDay(e,t){z.set(n(this,M,ve).call(this,e),t)}static addEntry(e,t,a,s){const r=this.getDay(e),o=s/100;r[t].push({id:Date.now()+Math.random(),productId:a.id,name:a.name,emoji:a.emoji,amount:s,calories:Math.round(a.calories*o),protein:Math.round(a.protein*o*10)/10,fat:Math.round(a.fat*o*10)/10,carbs:Math.round(a.carbs*o*10)/10}),this.setDay(e,r)}static removeEntry(e,t,a){const s=this.getDay(e);s[t]=s[t].filter(r=>r.id!==a),this.setDay(e,s)}static getDayTotals(e){const t=this.getDay(e),a={calories:0,protein:0,fat:0,carbs:0,entries:0};return this.MEALS.forEach(s=>{(t[s.id]||[]).forEach(r=>{a.calories+=r.calories,a.protein+=r.protein,a.fat+=r.fat,a.carbs+=r.carbs,a.entries++})}),a.protein=Math.round(a.protein*10)/10,a.fat=Math.round(a.fat*10)/10,a.carbs=Math.round(a.carbs*10)/10,a}static getWeekData(e){const t=[],a=new Date(e+"T00:00:00");for(let s=0;s<7;s++){const r=new Date(a.getFullYear(),a.getMonth(),a.getDate()+s),o=n(this,M,le).call(this,r);t.push({date:o,totals:this.getDayTotals(o)})}return t}static formatDate(e){const t=new Date(e+"T00:00:00"),a=new Date;return a.setDate(a.getDate()-1),e===this.today()?"Сегодня":e===n(this,M,le).call(this,a)?"Вчера":t.toLocaleDateString("ru-RU",{day:"numeric",month:"long",weekday:"short"})}}M=new WeakSet,ve=function(e){return`diary_${e}`},le=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},c(g,M),ge(g,"MEALS",[{id:"breakfast",name:"Завтрак",emoji:"🌅"},{id:"lunch",name:"Обед",emoji:"☀️"},{id:"dinner",name:"Ужин",emoji:"🌙"},{id:"snack",name:"Перекус",emoji:"🍎"}]);var W,he,ke;class Z{static show(e,t="success",a=2500){const s=n(this,he,ke).call(this),r=document.createElement("div");r.className=`toast toast--${t}`,r.textContent=e,s.appendChild(r),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateY(10px)",r.style.transition="0.3s ease",setTimeout(()=>r.remove(),300)},a)}static success(e){this.show(e,"success")}static error(e){this.show(e,"error")}}W=new WeakMap,he=new WeakSet,ke=function(){return i(this,W)||h(this,W,document.getElementById("toastContainer")),i(this,W)},c(Z,he),c(Z,W,null);var S,B,x,H,Q,X,ee,I,v,xe,Ce,ce,Le,Me,De,Se,Te,K;class tt{constructor(){c(this,v);c(this,S);c(this,B);c(this,x);c(this,H);c(this,Q);c(this,X,null);c(this,ee,null);c(this,I,null);h(this,S,document.getElementById("searchInput")),h(this,B,document.getElementById("searchClear")),h(this,x,document.getElementById("searchResults")),h(this,H,document.getElementById("productModal")),h(this,Q,document.getElementById("modalContent")),n(this,v,xe).call(this)}init(){n(this,v,ce).call(this)}}S=new WeakMap,B=new WeakMap,x=new WeakMap,H=new WeakMap,Q=new WeakMap,X=new WeakMap,ee=new WeakMap,I=new WeakMap,v=new WeakSet,xe=function(){i(this,S).addEventListener("input",()=>{const e=i(this,S).value.trim();if(i(this,B).classList.toggle("visible",e.length>0),clearTimeout(i(this,X)),e.length<3){n(this,v,ce).call(this);return}h(this,X,setTimeout(()=>{n(this,v,Le).call(this),n(this,v,Ce).call(this,e)},800))}),i(this,B).addEventListener("click",()=>{i(this,S).value="",i(this,B).classList.remove("visible"),n(this,v,ce).call(this),i(this,S).focus()}),document.getElementById("modalOverlay").addEventListener("click",()=>n(this,v,K).call(this)),document.getElementById("modalClose").addEventListener("click",()=>n(this,v,K).call(this)),document.addEventListener("keydown",e=>{e.key==="Escape"&&n(this,v,K).call(this)})},Ce=async function(e){try{i(this,I)&&i(this,I).abort(),h(this,I,new AbortController);const t=await P.search(e,1,i(this,I).signal);t.length===0?n(this,v,Me).call(this,e):n(this,v,Se).call(this,t)}catch(t){if(t.name==="AbortError")return;n(this,v,De).call(this),console.error("Search error:",t)}},ce=function(){i(this,x).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🔍</div>
        <div class="search-state__text">Введите название продукта</div>
        <div class="search-state__hint">Например: куриная грудка, гречка, яблоко</div>
      </div>
    `},Le=function(){i(this,x).innerHTML=Array(4).fill(0).map(()=>`
      <div class="product-card" style="pointer-events:none">
        <div class="skeleton" style="width:44px;height:44px;border-radius:8px;flex-shrink:0"></div>
        <div style="flex:1;display:flex;flex-direction:column;gap:6px">
          <div class="skeleton" style="height:16px;width:60%;border-radius:4px"></div>
          <div class="skeleton" style="height:12px;width:40%;border-radius:4px"></div>
        </div>
        <div class="skeleton" style="height:24px;width:40px;border-radius:4px"></div>
      </div>
    `).join("")},Me=function(e){i(this,x).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">🤷</div>
        <div class="search-state__text">Ничего не найдено по запросу «${e}»</div>
        <div class="search-state__hint">Попробуйте другое название или на английском</div>
      </div>
    `},De=function(){i(this,x).innerHTML=`
      <div class="search-state">
        <div class="search-state__icon">⚠️</div>
        <div class="search-state__text">Ошибка загрузки</div>
        <div class="search-state__hint">Проверьте соединение с интернетом</div>
      </div>
    `},Se=function(e){i(this,x).innerHTML=e.map(t=>`
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
    `).join(""),i(this,x).querySelectorAll(".product-card").forEach((t,a)=>{t.addEventListener("click",()=>n(this,v,Te).call(this,e[a]))})},Te=function(e){h(this,ee,e),i(this,Q).innerHTML=`
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
            ${g.MEALS.map(r=>`<option value="${r.id}">${r.emoji} ${r.name}</option>`).join("")}
          </select>
        </div>
        <div id="modalCalcResult" style="font-size:13px;color:var(--color-text-secondary);margin-bottom:12px"></div>
        <button class="btn btn--primary btn--full" id="modalAddBtn">
          Добавить в дневник
        </button>
      </div>
    `;const t=document.getElementById("modalAmount"),a=document.getElementById("modalCalcResult"),s=()=>{const r=parseFloat(t.value)||0,o=r/100,l=Math.round(e.calories*o);a.textContent=r>0?`${r}г = ${l} ккал · Б ${Math.round(e.protein*o*10)/10}г · Ж ${Math.round(e.fat*o*10)/10}г · У ${Math.round(e.carbs*o*10)/10}г`:""};t.addEventListener("input",s),s(),document.getElementById("modalAddBtn").addEventListener("click",()=>{var m;const r=parseFloat(t.value),o=document.getElementById("modalMeal").value;if(!r||r<=0){Z.error("Укажите количество в граммах");return}g.addEntry(g.today(),o,e,r);const l=((m=g.MEALS.find(p=>p.id===o))==null?void 0:m.name)||o;Z.success(`Добавлено в «${l}»`),n(this,v,K).call(this)}),i(this,H).classList.add("open"),document.body.style.overflow="hidden"},K=function(){i(this,H).classList.remove("open"),document.body.style.overflow="",h(this,ee,null)};var w,N,te,R,ae,k,fe,Be,Ie,Re;class at{constructor(e){c(this,k);c(this,w);c(this,N);c(this,te);c(this,R);c(this,ae);h(this,w,g.today()),h(this,N,e),h(this,te,document.getElementById("diarySummary")),h(this,R,document.getElementById("diaryMeals")),h(this,ae,document.getElementById("currentDate")),n(this,k,Be).call(this)}render(){i(this,ae).textContent=g.formatDate(i(this,w)),n(this,k,Ie).call(this),n(this,k,Re).call(this)}}w=new WeakMap,N=new WeakMap,te=new WeakMap,R=new WeakMap,ae=new WeakMap,k=new WeakSet,fe=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},Be=function(){document.getElementById("prevDay").addEventListener("click",()=>{const e=new Date(i(this,w)+"T00:00:00");e.setDate(e.getDate()-1),h(this,w,n(this,k,fe).call(this,e)),this.render()}),document.getElementById("nextDay").addEventListener("click",()=>{const e=g.today();if(i(this,w)>=e)return;const t=new Date(i(this,w)+"T00:00:00");t.setDate(t.getDate()+1),h(this,w,n(this,k,fe).call(this,t)),this.render()})},Ie=function(){const e=g.getDayTotals(i(this,w)),t=i(this,N).isComplete()?i(this,N).calcTargetCalories():2e3,a=Math.min(100,Math.round(e.calories/t*100)),s=t-e.calories;i(this,te).innerHTML=`
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
    `},Re=function(){const e=g.getDay(i(this,w));i(this,R).innerHTML=g.MEALS.map(t=>{const a=e[t.id]||[],s=a.reduce((r,o)=>r+o.calories,0);return`
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
      `}).join(""),i(this,R).querySelectorAll(".diary__meal-header").forEach(t=>{t.addEventListener("click",()=>{t.closest(".diary__meal").classList.toggle("expanded")})}),i(this,R).querySelectorAll(".diary__meal-item-remove").forEach(t=>{t.addEventListener("click",a=>{a.stopPropagation();const s=t.dataset.meal,r=parseFloat(t.dataset.entryId);g.removeEntry(i(this,w),s,r),Z.success("Запись удалена"),this.render()})})};const st="modulepreload",it=function(d,e){return new URL(d,e).href},ye={},be=function(e,t,a){let s=Promise.resolve();if(t&&t.length>0){const o=document.getElementsByTagName("link"),l=document.querySelector("meta[property=csp-nonce]"),m=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));s=Promise.allSettled(t.map(p=>{if(p=it(p,a),p in ye)return;ye[p]=!0;const b=p.endsWith(".css"),u=b?'[rel="stylesheet"]':"";if(!!a)for(let J=o.length-1;J>=0;J--){const oe=o[J];if(oe.href===p&&(!b||oe.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${p}"]${u}`))return;const D=document.createElement("link");if(D.rel=b?"stylesheet":st,b||(D.as="script"),D.crossOrigin="",D.href=p,m&&D.setAttribute("nonce",m),document.head.appendChild(D),b)return new Promise((J,oe)=>{D.addEventListener("load",J),D.addEventListener("error",()=>oe(new Error(`Unable to preload CSS for ${p}`)))})}))}function r(o){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=o,window.dispatchEvent(l),!l.defaultPrevented)throw o}return s.then(o=>{for(const l of o||[])l.status==="rejected"&&r(l.reason);return e().catch(r)})};var q,se,ie,U,C,Ae,Oe,ze,Pe;class rt{constructor(e){c(this,C);c(this,q);c(this,se);c(this,ie);c(this,U,null);h(this,q,e),h(this,se,document.getElementById("plannerWeek")),h(this,ie,document.getElementById("plannerStats"))}render(){const e=new Date,t=new Date(e),a=e.getDay()===0?6:e.getDay()-1;t.setDate(e.getDate()-a),t.setHours(0,0,0,0);const s=g.getWeekData(n(this,C,Ae).call(this,t)),r=i(this,q).isComplete()?i(this,q).calcTargetCalories():2e3;n(this,C,Oe).call(this,s,r,e),n(this,C,ze).call(this,s,r)}}q=new WeakMap,se=new WeakMap,ie=new WeakMap,U=new WeakMap,C=new WeakSet,Ae=function(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`},Oe=function(e,t,a){const s=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],r=g.today();i(this,se).innerHTML=e.map((o,l)=>{const m=o.totals.calories,p=Math.min(100,Math.round(m/t*100)),b=o.date===r,u=new Date(o.date+"T00:00:00").getDate(),L=m>t;return`
        <div class="planner__day ${b?"planner__day--today":""}">
          <div class="planner__day-name">${s[l]}</div>
          <div class="planner__day-date">${u}</div>
          <div class="planner__day-cals">
            ${m>0?`<strong>${m}</strong> ккал`:'<span style="color:var(--color-text-muted);font-size:11px">нет данных</span>'}
          </div>
          <div class="planner__day-bar">
            <div class="planner__day-bar-fill ${L?"over":""}" style="width:${p}%"></div>
          </div>
        </div>
      `}).join("")},ze=function(e,t){const a=e.filter(m=>m.totals.calories>0),s=a.reduce((m,p)=>m+p.totals.calories,0),r=a.length?Math.round(s/a.length):0,o=a.reduce((m,p)=>m+p.totals.protein,0),l=a.reduce((m,p)=>m+p.totals.carbs,0);i(this,ie).innerHTML=`
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
          <div class="planner__stat-value">${Math.round(l)}г</div>
          <div class="planner__stat-label">Углеводы за неделю</div>
        </div>
      </div>
      <div class="planner__chart-container">
        <canvas id="weekChart"></canvas>
      </div>
    `,n(this,C,Pe).call(this,e,t)},Pe=async function(e,t){const{Chart:a,registerables:s}=await be(async()=>{const{Chart:u,registerables:L}=await import("./chart-19k6OvwP.js");return{Chart:u,registerables:L}},[],import.meta.url);a.register(...s);const r=document.getElementById("weekChart");if(!r)return;i(this,U)&&i(this,U).destroy();const o=["Пн","Вт","Ср","Чт","Пт","Сб","Вс"],l=document.documentElement.dataset.theme==="dark",m=l?"#a8c4d8":"#5a6b48",p=l?"#3d5f7a":"#e2e8d0",b=l?"#6eb5e0":"#5c8a3c";h(this,U,new a(r,{type:"bar",data:{labels:o,datasets:[{label:"Калории",data:e.map(u=>u.totals.calories),backgroundColor:e.map(u=>u.totals.calories>t?"rgba(192,57,43,0.7)":b+"aa"),borderColor:e.map(u=>u.totals.calories>t?"#c0392b":b),borderWidth:1.5,borderRadius:6},{label:"Цель",data:Array(7).fill(t),type:"line",borderColor:l?"#e0b86e":"#d4a843",borderDash:[6,3],borderWidth:1.5,pointRadius:0,fill:!1}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:m,font:{size:12},boxWidth:14}},tooltip:{callbacks:{label:u=>`${u.dataset.label}: ${u.parsed.y} ккал`}}},scales:{x:{ticks:{color:m},grid:{color:p}},y:{ticks:{color:m,callback:u=>u+" кк"},grid:{color:p},beginAtZero:!0}}}}))};var _,re,Y,G,y,Fe,We,He,Ne,qe,Ue,Ye;class ot{constructor(e){c(this,y);c(this,_);c(this,re);c(this,Y,null);c(this,G,null);h(this,_,e),h(this,re,document.getElementById("profileGrid"))}render(){i(this,re).innerHTML=`
      ${n(this,y,Fe).call(this)}
      ${n(this,y,We).call(this)}
      ${n(this,y,He).call(this)}
      ${n(this,y,Ne).call(this)}
    `,n(this,y,qe).call(this),i(this,_).isComplete()&&(n(this,y,Ue).call(this),n(this,y,Ye).call(this))}}_=new WeakMap,re=new WeakMap,Y=new WeakMap,G=new WeakMap,y=new WeakSet,Fe=function(){const e=i(this,_).data;return`
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
    `},We=function(){if(!i(this,_).isComplete())return`
        <div class="profile__card">
          <div class="profile__card-title">Расчёт нормы</div>
          <div class="empty-state">
            <div class="empty-state__icon">📊</div>
            <div class="empty-state__text">Заполните личные данные</div>
            <div class="empty-state__sub">для расчёта нормы калорий</div>
          </div>
        </div>
      `;const e=i(this,_).calcBMR(),t=i(this,_).calcTDEE(),a=i(this,_).calcTargetCalories(),s=i(this,_).calcBMI(),r=i(this,_).calcMacros();return`
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
              <div class="profile__result-label">Цель · ${{lose:"Похудение",maintain:"Поддержание",gain:"Набор массы"}[i(this,_).goal]}</div>
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
    `},He=function(){const e=i(this,_).data,t=[{id:"sedentary",label:"Сидячий образ жизни",sub:"Офисная работа, минимум движения"},{id:"light",label:"Лёгкая активность",sub:"Прогулки, 1-3 тренировки в неделю"},{id:"moderate",label:"Умеренная активность",sub:"3-5 тренировок в неделю"},{id:"active",label:"Высокая активность",sub:"6-7 интенсивных тренировок"},{id:"very_active",label:"Очень высокая",sub:"Физический труд + тренировки"}],a=[{id:"lose",label:"📉 Похудение",sub:"-500 ккал от TDEE"},{id:"maintain",label:"⚖️ Поддержание",sub:"Равно TDEE"},{id:"gain",label:"📈 Набор массы",sub:"+300 ккал к TDEE"}];return`
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
    `},Ne=function(){return`
      <div class="profile__card">
        <div class="profile__card-title">Статистика за неделю</div>
        <div class="profile__chart-container">
          <canvas id="profileWeekChart"></canvas>
        </div>
      </div>
    `},qe=function(){var e;document.querySelectorAll('.radio-option input[type="radio"]').forEach(t=>{t.addEventListener("change",()=>{var a;(a=t.closest(".radio-group"))==null||a.querySelectorAll(".radio-option").forEach(s=>{s.classList.remove("selected")}),t.closest(".radio-option").classList.add("selected"),t.name==="activity"?i(this,_).update({activity:t.value}):t.name==="goal"&&i(this,_).update({goal:t.value})})}),(e=document.getElementById("saveProfileBtn"))==null||e.addEventListener("click",()=>{var s,r,o,l,m;const t=((s=document.querySelector('input[name="gender"]:checked'))==null?void 0:s.value)||"female",a={name:((r=document.getElementById("p-name"))==null?void 0:r.value.trim())||"",age:parseFloat((o=document.getElementById("p-age"))==null?void 0:o.value)||25,height:parseFloat((l=document.getElementById("p-height"))==null?void 0:l.value)||165,weight:parseFloat((m=document.getElementById("p-weight"))==null?void 0:m.value)||60,gender:t};i(this,_).update(a),this.render()})},Ue=async function(){const{Chart:e,registerables:t}=await be(async()=>{const{Chart:l,registerables:m}=await import("./chart-19k6OvwP.js");return{Chart:l,registerables:m}},[],import.meta.url);e.register(...t);const a=document.getElementById("macroChart");if(!a)return;i(this,Y)&&i(this,Y).destroy();const s=i(this,_).calcMacros(),r=document.documentElement.dataset.theme==="dark",o=r?"#a8c4d8":"#5a6b48";h(this,Y,new e(a,{type:"doughnut",data:{labels:["Белки","Жиры","Углеводы"],datasets:[{data:[s.protein*4,s.fat*9,s.carbs*4],backgroundColor:[r?"#6eb5e0":"#5c8a3c",r?"#e0b86e":"#d4a843",r?"#7eb8e8":"#4a7ab5"],borderWidth:0,hoverOffset:6}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"65%",plugins:{legend:{labels:{color:o,font:{size:12},boxWidth:12}},tooltip:{callbacks:{label:l=>`${l.label}: ${Math.round(l.parsed/(s.protein*4+s.fat*9+s.carbs*4)*100)}%`}}}}}))},Ye=async function(){const{Chart:e,registerables:t}=await be(async()=>{const{Chart:p,registerables:b}=await import("./chart-19k6OvwP.js");return{Chart:p,registerables:b}},[],import.meta.url);e.register(...t);const a=document.getElementById("profileWeekChart");if(!a)return;i(this,G)&&i(this,G).destroy();const s=[],r=[];for(let p=6;p>=0;p--){const b=new Date;b.setDate(b.getDate()-p);const u=`${b.getFullYear()}-${String(b.getMonth()+1).padStart(2,"0")}-${String(b.getDate()).padStart(2,"0")}`;s.push(g.getDayTotals(u)),r.push(b.toLocaleDateString("ru-RU",{weekday:"short"}))}const o=document.documentElement.dataset.theme==="dark",l=o?"#a8c4d8":"#5a6b48",m=o?"#3d5f7a":"#e2e8d0";h(this,G,new e(a,{type:"line",data:{labels:r,datasets:[{label:"Белки (г)",data:s.map(p=>p.protein),borderColor:o?"#6eb5e0":"#5c8a3c",backgroundColor:(o?"#6eb5e0":"#5c8a3c")+"20",fill:!0,tension:.4,pointRadius:3},{label:"Углеводы (г)",data:s.map(p=>p.carbs),borderColor:o?"#7eb8e8":"#4a7ab5",backgroundColor:"transparent",tension:.4,pointRadius:3},{label:"Жиры (г)",data:s.map(p=>p.fat),borderColor:o?"#e0b86e":"#d4a843",backgroundColor:"transparent",tension:.4,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:l,font:{size:11},boxWidth:12}}},scales:{x:{ticks:{color:l,font:{size:11}},grid:{color:m}},y:{ticks:{color:l,font:{size:11}},grid:{color:m},beginAtZero:!0}}}}))};var A,O,j,E,Ge,Je,V,Ke,Ve;class nt{constructor(){c(this,E);c(this,A,"search");c(this,O);c(this,j,{});h(this,O,new Xe),n(this,E,Ke).call(this),n(this,E,Ge).call(this),n(this,E,Je).call(this),n(this,E,Ve).call(this);const e=window.location.hash.replace("#","");["search","diary","planner","profile"].includes(e)?n(this,E,V).call(this,e):n(this,E,V).call(this,"search")}}A=new WeakMap,O=new WeakMap,j=new WeakMap,E=new WeakSet,Ge=function(){i(this,j).search=new tt,i(this,j).diary=new at(i(this,O)),i(this,j).planner=new rt(i(this,O)),i(this,j).profile=new ot(i(this,O)),i(this,j).search.init()},Je=function(){document.querySelectorAll(".nav__item").forEach(e=>{e.addEventListener("click",()=>n(this,E,V).call(this,e.dataset.page))}),document.querySelectorAll(".mobile-nav__item").forEach(e=>{e.addEventListener("click",()=>n(this,E,V).call(this,e.dataset.page))})},V=function(e){var t;i(this,A)===e&&e!=="search"||(document.querySelectorAll(".page").forEach(a=>a.classList.remove("page--active")),(t=document.getElementById(`page-${e}`))==null||t.classList.add("page--active"),document.querySelectorAll(".nav__item, .mobile-nav__item").forEach(a=>{a.classList.toggle("nav__item--active",a.dataset.page===e),a.classList.toggle("mobile-nav__item--active",a.dataset.page===e)}),h(this,A,e),window.location.hash=e,e==="diary"&&i(this,j).diary.render(),e==="planner"&&i(this,j).planner.render(),e==="profile"&&i(this,j).profile.render(),window.scrollTo(0,0))},Ke=function(){const e=z.get("theme","light");document.documentElement.dataset.theme=e},Ve=function(){document.getElementById("themeToggle").addEventListener("click",()=>{const a=document.documentElement.dataset.theme==="dark"?"light":"dark";document.documentElement.dataset.theme=a,z.set("theme",a),i(this,A)==="planner"&&i(this,j).planner.render(),i(this,A)==="profile"&&i(this,j).profile.render()})};document.addEventListener("DOMContentLoaded",()=>{new nt});
