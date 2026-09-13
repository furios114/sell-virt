(function(){
'use strict';

var SELLER='fuckdiscomfi';
var TG='https://t.me/'+SELLER;

var PRICE={2013:{p:null,l:'уточнять в ЛС'},2014:{p:950,l:'от 950 ₽'},2015:{p:850,l:'от 850 ₽'},2016:{p:750,l:'от 750 ₽'},2017:{p:650,l:'от 650 ₽'},2018:{p:550,l:'от 550 ₽'},2019:{p:450,l:'от 450 ₽'},2020:{p:375,l:'от 375 ₽'},2021:{p:300,l:'от 300 ₽'},2022:{p:250,l:'от 250 ₽'},2023:{p:200,l:'от 200 ₽'},2024:{p:150,l:'от 150 ₽'},2025:{p:100,l:'от 100 ₽'},2026:{p:75,l:'от 75 ₽'}};
var YEARS=Object.keys(PRICE).map(Number).sort(function(a,b){return a-b});
var COUNTRIES=window.DM_COUNTRIES||[];

function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}

function el(tag,attrs,kids){
  var n=document.createElement(tag);attrs=attrs||{};
  for(var k in attrs){var v=attrs[k];if(v==null||v===false)continue;
    if(k==='class')n.className=v;
    else if(k==='html')n.innerHTML=v;
    else if(k==='text')n.textContent=v;
    else if(k.indexOf('on')===0&&typeof v==='function')n.addEventListener(k.slice(2).toLowerCase(),v);
    else n.setAttribute(k,v);}
  if(kids!=null){if(!Array.isArray(kids))kids=[kids];
    kids.forEach(function(c){if(c==null||c===false)return;
      n.appendChild(typeof c==='string'?document.createTextNode(c):c);});}
  return n;
}

function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}

function tgLink(t){return t?TG+'?text='+encodeURIComponent(t):TG}
function tgBuy(c,code,y){return tgLink('Привет, хочу купить аккаунт '+c+' ('+code+'), отлега '+y)}
function tgSpecial(){return tgLink('Привет, хочу сменить номер')}

/* ============ РОУТЕР ============ */
var routes={
  '/':renderHome,
  '/catalog':renderCatalog,
  '/faq':renderFAQ,
  '/contacts':renderContacts
};

function navigate(){
  var hash=location.hash.replace(/^#/,'')||'/';
  var path=hash.split('?')[0];
  var fn=routes[path]||renderHome;
  var app=$('#app');
  app.innerHTML='';
  app.appendChild(fn());
  $$('.nav a').forEach(function(a){
    var href=a.getAttribute('href').replace(/^#/,'');
    a.classList.toggle('active',href===path);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

window.addEventListener('hashchange',navigate);

/* ============ ХЕДЕР ============ */
function initHeader(){
  var hdr=$('#hdr');
  window.addEventListener('scroll',function(){
    hdr.classList.toggle('scrolled',window.scrollY>10);
  },{passive:true});

  var burger=$('#burger'),nav=$('#nav');
  if(burger){
    burger.addEventListener('click',function(){
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
  }
}

/* ============ СТРАНИЦА: ГЛАВНАЯ ============ */
function renderHome(){
  var p=el('div',{class:'page'});
  var wrap=el('div',{class:'wrap'});

  // HERO
  var hero=el('section',{class:'hero'});
  hero.appendChild(el('h1',{class:'hero-title',html:'DISCOMFI <span class="grad">MARKET</span>'}));
  hero.appendChild(el('p',{class:'hero-sub',text:'Премиальные Telegram аккаунты с отлегой. 243 страны. Отлега 2013–2026. Быстро, надёжно, конфиденциально.'}));
  var actions=el('div',{class:'hero-actions'});
  actions.appendChild(el('a',{class:'btn btn-primary btn-lg',href:'#/catalog',text:'Смотреть каталог'}));
  actions.appendChild(el('a',{class:'btn btn-glass btn-lg',href:TG,target:'_blank',rel:'noopener',text:'Написать в Telegram'}));
  hero.appendChild(actions);

  var stats=el('div',{class:'hero-stats'});
  [
    {v:COUNTRIES.length||'240+',t:'Стран'},
    {v:'2013–2026',t:'Отлега'},
    {v:'24/7',t:'Поддержка'},
    {v:'100%',t:'Гарантия'}
  ].forEach(function(s){
    var c=el('div',{class:'hero-stat'});
    c.appendChild(el('b',{text:String(s.v)}));
    c.appendChild(el('span',{text:s.t}));
    stats.appendChild(c);
  });
  hero.appendChild(stats);
  wrap.appendChild(hero);

  // КАК ЭТО РАБОТАЕТ
  var sec=el('section',{class:'section'});
  sec.appendChild(el('div',{class:'section-head',html:'<h2 class="h2">Как это работает</h2><p class="sub">Четыре шага от выбора до получения аккаунта</p>'}));
  var steps=el('div',{class:'steps'});
  [
    {n:'1',t:'Выбери страну',d:'Открой каталог и выбери нужную страну из 243 доступных'},
    {n:'2',t:'Выбери отлегу',d:'Отлега — возраст аккаунта. Чем старше, тем дороже и надёжнее'},
    {n:'3',t:'Нажми «Купить»',d:'Откроется Telegram с готовым сообщением продавцу'},
    {n:'4',t:'Получи аккаунт',d:'Оплати и получи данные аккаунта в течение нескольких минут'}
  ].forEach(function(s){
    var c=el('div',{class:'step'});
    c.appendChild(el('div',{class:'step-num',text:s.n}));
    c.appendChild(el('h3',{text:s.t}));
    c.appendChild(el('p',{text:s.d}));
    steps.appendChild(c);
  });
  sec.appendChild(steps);
  wrap.appendChild(sec);

  p.appendChild(wrap);
  return p;
}

/* ============ СТРАНИЦА: FAQ ============ */
function renderFAQ(){
  var p=el('div',{class:'page'});
  var wrap=el('div',{class:'wrap'});

  var hdr=el('div',{class:'page-header'});
  hdr.appendChild(el('h1',{class:'page-title',html:'Частые <span class="grad">вопросы</span>'}));
  hdr.appendChild(el('p',{class:'page-sub',text:'Ответы на популярные вопросы о покупке аккаунтов'}));
  wrap.appendChild(hdr);

  var list=el('div',{class:'faq-list'});
  [
    {q:'Что такое отлега?',a:'Отлега — это возраст аккаунта. Аккаунт 2013 года зарегистрирован в 2013 году и имеет 12+ лет истории. Чем старше аккаунт, тем он ценнее, надёжнее и дороже.'},
    {q:'Как происходит покупка?',a:'Выбираете страну и отлегу в каталоге, нажимаете «Купить». Открывается Telegram с готовым сообщением продавцу. Продавец подтверждает наличие, вы оплачиваете, получаете данные аккаунта.'},
    {q:'Какие способы оплаты?',a:'Все детали оплаты обсуждаются напрямую с продавцом в Telegram — @fuckdiscomfi. Поддерживаются криптовалюты и другие удобные вам способы.'},
    {q:'Как быстро я получу аккаунт?',a:'Обычно в течение 5–15 минут после подтверждения оплаты. В редких случаях — до часа, если продавец занят.'},
    {q:'Есть ли гарантия?',a:'Да. Если аккаунт не работает или не соответствует заявленной отлеге — продавец заменит его или вернёт средства. Все вопросы решаются в Telegram.'},
    {q:'Как связаться с продавцом?',a:'Telegram: @fuckdiscomfi. Отвечаем 24/7, обычно в течение нескольких минут.'}
  ].forEach(function(f){
    var item=el('div',{class:'faq-item'});
    var q=el('button',{class:'faq-q'});
    q.appendChild(el('span',{text:f.q}));
    q.appendChild(el('span',{class:'faq-icon',text:'+'}));
    var a=el('div',{class:'faq-a'});
    a.appendChild(el('div',{class:'faq-a-in',text:f.a}));
    q.addEventListener('click',function(){
      var open=item.classList.contains('open');
      $$('.faq-item',list).forEach(function(x){
        x.classList.remove('open');
        $('.faq-a',x).style.maxHeight=null;
      });
      if(!open){
        item.classList.add('open');
        a.style.maxHeight=a.scrollHeight+'px';
      }
    });
    item.appendChild(q);
    item.appendChild(a);
    list.appendChild(item);
  });
  wrap.appendChild(list);
  p.appendChild(wrap);
  return p;
}

/* ============ СТРАНИЦА: КОНТАКТЫ ============ */
function renderContacts(){
  var p=el('div',{class:'page'});
  var wrap=el('div',{class:'wrap'});

  var hdr=el('div',{class:'page-header'});
  hdr.appendChild(el('h1',{class:'page-title',html:'Свяжитесь <span class="grad">с нами</span>'}));
  hdr.appendChild(el('p',{class:'page-sub',text:'Отвечаем в Telegram 24/7'}));
  wrap.appendChild(hdr);

  var card=el('div',{class:'contact-card'});
  card.appendChild(el('div',{class:'contact-avatar',text:'DM'}));
  card.appendChild(el('div',{class:'contact-name',text:'Discomfi Market'}));
  card.appendChild(el('div',{class:'contact-handle',text:'@fuckdiscomfi'}));
  card.appendChild(el('a',{class:'btn btn-primary btn-lg',href:TG,target:'_blank',rel:'noopener',text:'Открыть Telegram'}));
  card.appendChild(el('p',{class:'contact-note',text:'По любым вопросам — покупка, гарантия, консультация'}));
  wrap.appendChild(card);

  p.appendChild(wrap);
  return p;
}
/* ============ СТРАНИЦА: КАТАЛОГ ============ */
var state={country:'',year:'',sort:null,seed:Date.now()};

function renderCatalog(){
  var p=el('div',{class:'page'});
  var wrap=el('div',{class:'wrap'});

  // Заголовок
  var hdr=el('div',{class:'page-header'});
  hdr.appendChild(el('h1',{class:'page-title',html:'Каталог <span class="grad">аккаунтов</span>'}));
  hdr.appendChild(el('p',{class:'page-sub',text:'Выберите страну и отлегу, чтобы увидеть доступные аккаунты'}));
  wrap.appendChild(hdr);

  // Фильтр
  var bar=el('div',{class:'filter-bar'});

  // Поиск
  var fSearch=el('div',{class:'field'});
  fSearch.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  var inp=el('input',{type:'text',placeholder:'Поиск страны или кода…',value:state.country});
  fSearch.appendChild(inp);
  bar.appendChild(fSearch);

  // Страна
  var fCountry=el('div',{class:'field'});
  var selC=el('select');
  selC.appendChild(el('option',{value:'',text:'Все страны'}));
  COUNTRIES.forEach(function(c){
    selC.appendChild(el('option',{value:c.n,text:c.c+' '+c.n}));
  });
  selC.value=state.country;
  fCountry.appendChild(selC);
  bar.appendChild(fCountry);

  // Отлега
  var fYear=el('div',{class:'field'});
  var selY=el('select');
  selY.appendChild(el('option',{value:'',text:'Все отлеги'}));
  YEARS.forEach(function(y){
    selY.appendChild(el('option',{value:String(y),text:String(y)}));
  });
  selY.value=state.year;
  fYear.appendChild(selY);
  bar.appendChild(fYear);

  // Кнопки сортировки
  var acts=el('div',{class:'filter-actions'});
  var sUp=el('button',{class:'sort-btn'+(state.sort==='asc'?' active':''),title:'Сначала дешёвые'});
  sUp.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 19V5M5 12l7 7 7-7"/></svg>';
  var sDown=el('button',{class:'sort-btn'+(state.sort==='desc'?' active':''),title:'Сначала дорогие'});
  sDown.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12l7-7 7 7"/></svg>';
  var sReset=el('button',{class:'sort-btn',title:'Сбросить'});
  sReset.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>';

  sUp.addEventListener('click',function(){state.sort=state.sort==='asc'?null:'asc';state.seed=Date.now();rebuild()});
  sDown.addEventListener('click',function(){state.sort=state.sort==='desc'?null:'desc';state.seed=Date.now();rebuild()});
  sReset.addEventListener('click',function(){state.country='';state.year='';state.sort=null;state.seed=Date.now();rebuild()});

  acts.appendChild(sUp);acts.appendChild(sDown);acts.appendChild(sReset);
  bar.appendChild(acts);

  // События фильтра
  var debTimer;
  inp.addEventListener('input',function(){
    clearTimeout(debTimer);
    debTimer=setTimeout(function(){state.country=inp.value;state.seed=Date.now();rebuild()},300);
  });
  selC.addEventListener('change',function(){state.country=selC.value;state.seed=Date.now();rebuild()});
  selY.addEventListener('change',function(){state.year=selY.value;state.seed=Date.now();rebuild()});

  wrap.appendChild(bar);

  // Заголовок каталога
  var ch=el('div',{class:'catalog-head'});
  ch.appendChild(el('h2',{class:'catalog-title',text:'Доступные аккаунты'}));
  var meta=el('div',{class:'catalog-meta'});
  ch.appendChild(meta);
  wrap.appendChild(ch);

  // Сетка
  var grid=el('div',{class:'cards'});
  wrap.appendChild(grid);

  // Спец. карточка — смена номера
  var sp=el('div',{class:'special-card'});
  sp.appendChild(el('div',{class:'special-icon',html:'🔄'}));
  var spB=el('div',{class:'special-body'});
  spB.appendChild(el('h3',{text:'Смена номера'}));
  spB.appendChild(el('p',{text:'Смена номера на любой из 243 стран'}));
  sp.appendChild(spB);
  var spRight=el('div');
  spRight.appendChild(el('div',{class:'special-price',text:'100 ₽'}));
  spRight.appendChild(el('button',{class:'btn btn-primary btn-sm',text:'Купить',onclick:function(){window.open(tgSpecial(),'_blank')}}));
  sp.appendChild(spRight);
  wrap.appendChild(sp);

  p.appendChild(wrap);

  // Функция пересборки
  function rebuild(){
    // Синхронизируем фильтры
    if(inp.value!==state.country)inp.value=state.country;
    if(selC.value!==state.country)selC.value=state.country;
    if(selY.value!==state.year)selY.value=state.year;
    sUp.classList.toggle('active',state.sort==='asc');
    sDown.classList.toggle('active',state.sort==='desc');

    var list=buildList();
    grid.innerHTML='';
    meta.innerHTML='Найдено: <b>'+list.length+'</b>';

    if(!list.length){
      var e=el('div',{class:'empty'});
      e.appendChild(el('h3',{text:'Ничего не найдено'}));
      e.appendChild(el('p',{text:'Попробуйте изменить фильтры'}));
      grid.appendChild(e);
      return;
    }

    list.slice(0,120).forEach(function(item,i){
      grid.appendChild(makeCard(item,i));
    });
  }

  rebuild();
  return p;
}

function buildList(){
  var list=[];
  var q=state.country.toLowerCase().trim();

  COUNTRIES.forEach(function(c){
    if(state.country && c.n!==state.country){
      if(!q||(c.n.toLowerCase().indexOf(q)===-1 && c.c.indexOf(q)===-1))return;
    }
    YEARS.forEach(function(y){
      if(state.year && String(y)!==state.year)return;
      list.push({country:c,year:y});
    });
  });

  // Сортировка
  if(state.sort==='asc'){
    list.sort(function(a,b){
      var pa=PRICE[a.year].p==null?Infinity:PRICE[a.year].p;
      var pb=PRICE[b.year].p==null?Infinity:PRICE[b.year].p;
      return pa-pb;
    });
  }else if(state.sort==='desc'){
    list.sort(function(a,b){
      var pa=PRICE[a.year].p==null?-Infinity:PRICE[a.year].p;
      var pb=PRICE[b.year].p==null?-Infinity:PRICE[b.year].p;
      return pb-pa;
    });
  }else{
    // Рандом — но стабильный в рамках seed
    var seeded=shuffle(list.slice(0,300));
    list=seeded.concat(list.slice(300));
  }
  return list;
}

function makeCard(item,idx){
  var c=item.country,y=item.year,pr=PRICE[y];
  var card=el('div',{class:'card'});
  card.style.animationDelay=(Math.min(idx,20)*20)+'ms';

  var top=el('div',{class:'card-top'});
  top.appendChild(el('div',{class:'card-flag',text:c.f||'🌍'}));
  top.appendChild(el('div',{class:'card-year',text:String(y)}));
  card.appendChild(top);

  card.appendChild(el('div',{class:'card-country',text:c.n}));
  card.appendChild(el('div',{class:'card-code',text:c.c}));
  card.appendChild(el('div',{class:'card-divider'}));

  var row=el('div',{class:'card-row'});
  row.appendChild(el('div',{class:'card-label',text:'Цена'}));
  row.appendChild(el('div',{class:'card-price'+(pr.p==null?' ls':''),text:pr.l}));
  card.appendChild(row);

  var btn=el('button',{class:'btn btn-primary btn-block',text:'Купить'});
  btn.addEventListener('click',function(){
    window.open(tgBuy(c.n,c.c,y),'_blank');
  });
  card.appendChild(btn);

  return card;
}
/* ============ ИНИЦИАЛИЗАЦИЯ ============ */
function init(){
  // Год в футере
  var yr=$('#yr');
  if(yr)yr.textContent=new Date().getFullYear();

  // Хедер
  initHeader();

  // Роутинг
  if(!location.hash)location.hash='#/';
  navigate();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init);
}else{
  init();
}

})();