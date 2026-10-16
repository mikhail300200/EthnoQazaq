/* Word-тағы бөлімдер. Тексерілген байланыс пен әлі берілмеген материал бөлек көрсетіледі. */
const prepItems=['Жеке куәлік немесе паспорт','Ауызсу және жолға азық','Жабық, ыңғайлы аяқкиім','Желден қорғайтын киім','Баскиім және күннен қорғаныс','Жеке дәрілер және алғашқы көмек қобдишасы','Телефон, қуаттағыш және power bank','Офлайн карта және гидтің байланысы'];
let checks=[];try{const v=JSON.parse(localStorage.getItem('miras-preparation')||'[]');checks=Array.isArray(v)?v.filter(i=>Number.isInteger(i)&&i>=0&&i<8):[];}catch{}
function renderPreparation(){checks=[...new Set(checks)];$('checklist').innerHTML=prepItems.map((t,i)=>`<label class="check-item"><input type="checkbox" data-check="${i}" ${checks.includes(i)?'checked':''}><span>${t}</span></label>`).join('');$('ready-score').textContent=Math.round(checks.length/8*100)+'%';$('ready-progress').value=checks.length;}
const advice={autumn:'Күзде қабаттап киініңіз: ұзын жеңді киім, жылы үстіңгі киім және желге төзімді күрте. Сапар күні ауа райын тексеріңіз.',spring:'Көктемде жел мен жауынға бейімделіңіз. Су өтпейтін сыртқы киім мен табаны берік аяқкиім алыңыз.',summer:'Жазда жеңіл, ұзын жеңді киім, баскиім және күннен қорғаныс қажет. Су қорын гидпен келісіңіз.',winter:'Қыста жылы қабаттар, қолғап, баскиім және желден қорғайтын күрте қажет. Маршруттың қолжетімділігін оператордан растаңыз.'};
function seasonAdvice(){$('season-advice').textContent=advice[$('season').value];}
$('season').onchange=seasonAdvice;
$('checklist').onchange=e=>{if(e.target.dataset.check===undefined)return;const i=Number(e.target.dataset.check);checks=e.target.checked?[...checks,i]:checks.filter(x=>x!==i);try{localStorage.setItem('miras-preparation',JSON.stringify(checks));}catch{toast('Тізім осы сессияда ғана сақталады');}renderPreparation();};
$('reset-checklist').onclick=()=>{checks=[];try{localStorage.removeItem('miras-preparation');}catch{}renderPreparation();};renderPreparation();seasonAdvice();
function renderCulturalVideos(){
  $('live-topics').innerHTML=culturalVideos.map(v=>`<article><button class="live-video-cover" data-cultural-video="${v.key}" aria-label="${v.title}: бейнені көру"><img src="assets/${v.image}.jpg" alt="${v.title}" loading="lazy"><span class="play-badge" aria-hidden="true">▷</span></button><h3>${v.title}</h3><p>${v.short?'YouTube Shorts':'YouTube'}</p><button class="video-open" data-cultural-video="${v.key}">Бейнені көру →</button></article>`).join('');
}
function showCulturalVideo(key){
  const v=culturalVideos.find(v=>v.key===key);
  if(!v || !/^[A-Za-z0-9_-]{11}$/.test(v.videoId))return;
  const url='https://www.youtube.com/'+(v.short?'shorts/':'watch?v=')+v.videoId;
  openModal(`<span class="eyebrow">ТІРІ МӘДЕНИЕТ · ${v.short?'YOUTUBE SHORTS':'YOUTUBE'}</span><h2>${v.title}</h2><div class="youtube-player ${v.short?'short-video':''}"><iframe src="https://www.youtube-nocookie.com/embed/${v.videoId}?autoplay=0&amp;rel=0" title="${v.title}" loading="lazy" allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><p class="fine">Ойнатқыш ашылмаса, бейнені YouTube-та көріңіз.</p><div class="modal-actions"><a class="button" href="${url}" target="_blank" rel="noopener">YouTube-та ашу ↗</a></div>`);
}
document.addEventListener('click',event=>{const button=event.target.closest('[data-cultural-video]');if(button)showCulturalVideo(button.dataset.culturalVideo);});
// Диалог жабылғанда сыртқы ойнатқышты алып тастап, дыбысты тоқтатамыз.
$('detail').addEventListener('close',()=>{$('modal-content').querySelectorAll('iframe').forEach(frame=>frame.remove());});
renderCulturalVideos();
const jewelryShops=[
 {name:'Zerger Serikqali',handle:'@zerger_serikqali',instagram:'https://www.instagram.com/zerger_serikqali/',map:'https://go.2gis.com/3WgI2'},
 {name:'Zhaqut Kumisteri',handle:'@zhaqut.kumisteri',instagram:'https://www.instagram.com/zhaqut.kumisteri/',map:'https://go.2gis.com/Sg5c7'},
 {name:'Qazaq Silver',handle:'@qazaq_silver',instagram:'https://www.instagram.com/qazaq_silver/',map:'https://go.2gis.com/kZ2HR'}
];
const marketBanner=document.querySelector('.market-banner');
if(marketBanner){
 marketBanner.insertAdjacentHTML('afterend',`<section class="jewelry-directory" aria-label="Ақтаудағы зергерлер"><div class="jewelry-directory-head"><span class="eyebrow">ЗЕРГЕРЛІК ӨНЕР · INSTAGRAM + 2GIS</span><h3>Ақтаудағы зергерлер</h3><p>Әшекей үлгілерін Instagram-нан қарап, дүкен не шеберхананың орналасқан жерін 2GIS арқылы ашуға болады.</p></div><div class="jewelry-links">${jewelryShops.map((j,i)=>`<article class="jewelry-link"><span class="jewelry-no">${String(i+1).padStart(2,'0')}</span><span class="jewelry-main"><strong>${j.name}</strong><small>${j.handle}</small><span class="jewelry-actions"><a href="${j.instagram}" target="_blank" rel="noopener">Instagram ↗</a><a href="${j.map}" target="_blank" rel="noopener">📍 Мекенжай · 2GIS</a></span></span></article>`).join('')}</div><p class="fine">Жұмыс уақыты мен тапсырыс шарттарын барар алдында парақшадан немесе 2GIS-тен нақтылап алған дұрыс.</p></section>`);
}
const makers=artisanCatalog;
function renderMakers(){
 $('maker-list').innerHTML=makers.map((m,i)=>`<article class="maker-card">${m.image?`<a class="maker-photo" href="${m.instagram}" target="_blank" rel="noopener" aria-label="${m.name}: Instagram"><img src="assets/${m.image}" alt="${m.name}: ұлттық нақыштағы киім" loading="lazy"></a>`:'<div class="maker-photo-pending"><span>МБ</span><small>Өнім фотосы күтілуде</small></div>'}<span class="eyebrow">${String(i+1).padStart(2,'0')} / ҰЛТТЫҚ НАҚЫШ</span><h3>${m.name}</h3><p>${m.desc}</p>${m.address?`<p><strong>${m.address}</strong></p>`:''}${m.hours?`<p>${m.hours}</p>`:''}<div class="restaurant-links">${m.phone?`<a href="tel:${m.phone.replace(/[^+0-9]/g,'')}">${m.phone}</a>`:''}${m.whatsapp?m.whatsapp.map((number,index)=>`<a href="https://wa.me/${number}" target="_blank" rel="noopener">WhatsApp${m.whatsapp.length>1?' '+(index+1):''}</a>`).join(''):''}${m.site?`<a href="${m.site}" target="_blank" rel="noopener">Ресми сайт</a>`:''}${m.instagram?`<a href="${m.instagram}" target="_blank" rel="noopener">Instagram</a>`:''}${m.map?`<a href="${m.map}" target="_blank" rel="noopener">Дереккөз</a>`:''}${m.source&&!m.map?`<a href="${m.source}" target="_blank" rel="noopener">Дереккөз</a>`:''}</div><p class="fine">Баға, өлшемдер, тапсырыс және жеткізу шарттары — шеберден.</p></article>`).join('');
}
renderMakers();
// Қазақша контентке қосымша дәстүрлер.
Object.assign(culture,{
 clothing:{title:'Ұлттық киім — мәдениеттің көрінісі',image:'clothing',text:'Шапан, камзол және сәукеле ұлттық киім мәдениетінің таныс үлгілері. Киімнің пішіні, материалы мен әшекейі тұрмысқа, мерекеге және адамның әлеуметтік рөліне байланысты болған.',task:'Назар аудар: ұлттық киімдегі ою мен кестені тап.'},
 jewelry:{title:'Зергерлік өнер',image:'jewelry',text:'Сырға, білезік, сақина және алқа қазақ зергерлік өнерінде кең таралған. Бұйымды көргенде материалын, өрнегін және жасалу тәсілін салыстыруға болады.',task:'Бір әшекейдің пішіні мен өрнегін сипатта.'},
 tradition:{title:'Салт-дәстүр шежіресі',image:'tradition',text:'Бесікке салу, тұсаукесер, шілдехана және бата беру — отбасылық өмірмен байланысты дәстүрлер. Тұсаукесер баланың алғашқы қадамына арналады; батада жақсы тілек айтылады.',task:'Өз отбасыңда сақталған бір дәстүрді айтып бер.'},
 dombra:{title:'Домбыраның үні',image:'souvenir',text:'Домбыра — екі ішекті ұлттық музыкалық аспап. Күй арқылы музыкалық ой мен әңгіме жеткізіледі. Аспап жасау мен орындаушылық — мәдени мұраның өзара байланысты бағыттары.',task:'Бір күйді тыңдап, оның көңіл күйін сипатта.'}
});
const grid=document.querySelector('.culture-grid');grid.insertAdjacentHTML('beforeend',['clothing','jewelry','tradition','dombra'].map(id=>{const c=culture[id];return `<button class="culture-card" data-culture="${id}"><img src="assets/${c.image}.jpg" alt="${c.title}" loading="lazy"><span>ДӘСТҮРЛЕР ӘЛЕМІ</span><h3>${c.title}<b>↗</b></h3></button>`;}).join(''));
// Тағам туралы мәдени мәліметтер.
const foodNotes=[['Қымыз','Бие сүтінен дайындалатын дәстүрлі сусын. Қымыз ұсыну қонақ күту мәдениетімен байланысты.'],['Шұбат','Түйе сүтінен дайындалатын дәстүрлі сусын. Маңғыстаудың сүт тағамдары мәдениетінде таныс өнім.'],['Балқаймақ','Қаймақ негізіндегі тәтті тағам. Дайындау тәсілі отбасылық рецептке қарай өзгеруі мүмкін.'],['Құрт','Сүттен дайындалатын дәстүрлі тағам. Құрт ұзақ сақтауға қолайлы және қазақ дастарқанында кең таралған.']];
const foodContacts={
  'Қымыз':{name:'BQ Qymyzkhana 17.18',address:'2GIS-тегі мекенжай',map:'https://go.2gis.com/NduON',instagram:'https://www.instagram.com/bq.kymyzkhana.17.18',instaLabel:'@bq.kymyzkhana.17.18'},
  'Шұбат':{name:'Sarymay Aktau',address:'2GIS-тегі мекенжай',map:'https://go.2gis.com/7pX3m',instagram:'https://www.instagram.com/sarymay_aktau',instaLabel:'@sarymay_aktau'},
  'Балқаймақ':{name:'Suzbe Aktau',address:'2GIS-тегі мекенжай',map:'https://go.2gis.com/2WYGD',instagram:'https://www.instagram.com/suzbe_aktau',instaLabel:'@suzbe_aktau'},
  'Құрт':{name:'Qurt Ata',address:'2GIS-тегі мекенжай',map:'https://go.2gis.com/ppbzD',instagram:'https://www.instagram.com/qurt.ata',instaLabel:'@qurt.ata'}
};
$('recipe-list').insertAdjacentHTML('afterend','<div class="food-notes">'+foodNotes.map(([t,x])=>{const c=foodContacts[t];return `<article><h3>${t}</h3><p>${x}</p>${c?`<div class="food-contact"><strong>${c.name}</strong><span>📍 ${c.address}</span><div class="food-links"><a href="${c.map}" target="_blank" rel="noopener">Картадан ашу ↗</a>${c.instagram?`<a href="${c.instagram}" target="_blank" rel="noopener">Instagram: ${c.instaLabel} ↗</a>`:''}${c.phone?`<a href="${c.phone}">Қоңырау шалу</a>`:''}</div></div>`:''}</article>`}).join('')+'</div>');
$('tour-list').insertAdjacentHTML('afterend','<div class="operator-contact"><strong>Ves Mangystau</strong><a href="tel:+77073997735">+7 707 399 77 35</a><a href="https://wa.me/77073997735" target="_blank" rel="noopener">WhatsApp арқылы сұрау</a><a href="https://www.instagram.com/vesmangystau/" target="_blank" rel="noopener">Instagram</a><a class="contact-address" href="https://2gis.kz/aktau/search/9%20%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%204" target="_blank" rel="noopener" title="Картадан ашу">📍 Мекенжай: Ақтау, 9 ш/а, 4 үй, 110 кеңсе<br><small>Кіреберіс жол жағынан, Жеңіс скверіне қарама-қарсы</small></a><a href="https://aktau-tourist.kz/contacts" target="_blank" rel="noopener">«Турист» байланыстары</a></div>');
// Түзу сызық бойынша географиялық аралық. Автокөлік жолын есептемейді.
function directDistance(a,b){const r=x=>x*Math.PI/180;const h=Math.sin(r(b[0]-a[0])/2)**2+Math.cos(r(a[0]))*Math.cos(r(b[0]))*Math.sin(r(b[1]-a[1])/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(Math.max(0,1-h)));}
function updateDistance(){if(plan.length<2){$('route-distance').textContent='Қашықтықты көру үшін екі немесе одан көп орын қосыңыз.';return;}let km=0;for(let i=1;i<plan.length;i++)km+=directDistance(places.find(p=>p.id===plan[i-1]).coords,places.find(p=>p.id===plan[i]).coords);$('route-distance').textContent='Аялдамалар арасындағы түзу сызық бойынша аралық: ≈ '+Math.round(km)+' км. Бұл автокөлік жолының ұзындығы емес; жол бағыты мен уақытын гидтен нақтылаңыз.';}
new MutationObserver(updateDistance).observe($('plan-stops'),{childList:true});updateDistance();
// Үш тілдегі квест: сұрақ, жауап, түсіндірме және басқару мәтіндері.
const quizTranslations={ru:[
['Как называется верхняя круглая часть юрты?',['Шанырак','Кереге','Текемет'],0,'Шанырак расположен в верхней части юрты.'],['Чем известна долина Торыш?',['Ледниками','Шаровидными камнями','Густым лесом'],1,'В Торыш встречаются природные шаровидные конкреции.'],['В каком регионе находится Бозжыра?',['Жетысу','Акмола','Мангистау'],2,'Бозжыра находится в Каракиянском районе Мангистау.'],['Для чего служит уык?',['Закрывает дверь','Соединяет кереге с шаныраком','Покрывает пол'],1,'Уык соединяет стены юрты с шаныраком.'],['Какая игра развивает меткость?',['Асык','Шахматы','Волейбол'],0,'Игра в асыки развивает меткость и ловкость.'],['В каком материале высечена мечеть Шакпак-ата?',['Во льду','В дереве','В известняке'],2,'Мечеть высечена в известняковой скале.'],['Что особенно важно в тогызкумалак?',['Плавание','Счёт и мышление','Прыжки'],1,'Тогызкумалак основан на расчёте и стратегии.'],['Из чего делают войлок?',['Из шерсти','Из металла','Из стекла'],0,'Войлок получают путём обработки и валяния шерсти.'],['Где находится мечеть Бекет-ата?',['В Бурабае','В Алматы','В Огланды'],2,'Мечеть Бекет-ата находится в местности Огланды.'],['Как сохранить культурное наследие?',['Написать имя на стене','Бережно относиться к памятнику','Взять камень на память'],1,'Сохраняйте памятники и не повреждайте их.']],
en:[
['What is the upper circular part of a yurt called?',['Shanyrak','Kerege','Tekemet'],0,'The shanyrak sits at the top of a yurt.'],['What is Torysh Valley known for?',['Glaciers','Spherical stones','Dense forest'],1,'Torysh contains natural spherical concretions.'],['Which region is Bozzhyra in?',['Zhetysu','Akmola','Mangystau'],2,'Bozzhyra is in the Karakiya district of Mangystau.'],['What does an uyk do?',['Closes the door','Connects the kerege to the shanyrak','Covers the floor'],1,'The uyk roof poles connect the walls to the shanyrak.'],['Which game develops accuracy?',['Asyk','Chess','Volleyball'],0,'Asyk develops accuracy and coordination.'],['What rock is Shakpak Ata Mosque carved into?',['Ice','Wood','Limestone'],2,'The mosque is carved into limestone.'],['Which skill matters most in Togyzkumalak?',['Swimming','Calculation and thinking','Jumping'],1,'Togyzkumalak is based on calculation and strategy.'],['What is felt made from?',['Wool','Metal','Glass'],0,'Felt is made by processing and matting wool.'],['Where is Beket Ata Mosque located?',['Burabay','Almaty','Oglandy'],2,'Beket Ata Mosque is in Oglandy.'],['How should you protect cultural heritage?',['Write your name on a wall','Treat monuments with respect','Take a stone home'],1,'Keep monuments intact for future generations.']]};
const quizCopy={kk:{q:'СҰРАҚ',points:'дұрыс жауап',done:'КВЕСТ АЯҚТАЛДЫ',restart:'Қайта бастау',right:'Дұрыс!',correct:'Дұрыс жауап: ',next:'Келесі сұрақ',result:'Нәтижені көру',end:'Мәдениетке саяхат жалғасады. Дәстүрлерді оқып, қайта сынап көр.'},ru:{q:'ВОПРОС',points:'верных ответов',done:'КВЕСТ ЗАВЕРШЁН',restart:'Начать заново',right:'Верно!',correct:'Правильный ответ: ',next:'Следующий вопрос',result:'Результат',end:'Путешествие в культуру продолжается. Изучите традиции и попробуйте снова.'},en:{q:'QUESTION',points:'correct answers',done:'QUEST COMPLETE',restart:'Try again',right:'Correct!',correct:'Correct answer: ',next:'Next question',result:'View result',end:'Your cultural journey continues. Explore the traditions and try again.'}};
function currentQuestions(){return quizTranslations[$('quiz-language').value]||questions;}
renderQuiz=function(){answered=false;const lang=$('quiz-language').value,c=quizCopy[lang],qs=currentQuestions();if(quizIndex>=qs.length){$('quiz').innerHTML=`<span class="eyebrow">${c.done}</span><div class="result-num">${score}<small> / ${qs.length}</small></div><p>${c.end}</p><button class="button" id="restart">${c.restart} ↻</button>`;$('restart').onclick=()=>{quizIndex=0;score=0;renderQuiz();};return;}const [q,opts]=qs[quizIndex];$('quiz').innerHTML=`<div class="quiz-top"><span>${c.q} ${quizIndex+1} / ${qs.length}</span><span>${score} ${c.points}</span></div><div class="progress"><div style="width:${quizIndex/qs.length*100}%"></div></div><h3>${q}</h3>${opts.map((o,i)=>`<button class="answer" data-answer="${i}"><span>${String.fromCharCode(65+i)}</span>${o}</button>`).join('')}<div id="quiz-feedback"></div>`;};
answerQuestion=function(i){if(answered)return;const qs=currentQuestions(),[,opts,correct,explanation]=qs[quizIndex];if(!Number.isInteger(i)||i<0||i>=opts.length)return;answered=true;if(i===correct)score++;const c=quizCopy[$('quiz-language').value];document.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;const n=Number(b.dataset.answer);if(n===correct)b.classList.add('correct');else if(n===i)b.classList.add('wrong');});$('quiz-feedback').innerHTML=`<div class="feedback"><strong>${i===correct?c.right:c.correct+opts[correct]+'.'}</strong> ${explanation}</div><button class="button full" id="next-question">${quizIndex===qs.length-1?c.result:c.next} →</button>`;$('next-question').onclick=()=>{quizIndex++;renderQuiz();};$('next-question').focus();};
$('quiz-language').onchange=()=>{quizIndex=0;score=0;renderQuiz();};renderQuiz();


// Site rating and browser-local reviews.
(function(){
  const form=document.getElementById('rating-form');
  if(!form)return;
  const stars=[...document.querySelectorAll('.star-picker [data-star]')];
  const value=document.getElementById('rating-value');
  const hint=document.getElementById('star-hint');
  const textArea=document.getElementById('review-text');
  const count=document.getElementById('review-char-count');
  const list=document.getElementById('review-list');
  const avg=document.getElementById('rating-average');
  const avgStars=document.getElementById('rating-summary-stars');
  const ratingCount=document.getElementById('rating-count');
  const key='ethnoqazaq_reviews_v1';
  const labels=['','Өте әлсіз','Жақсартуға болады','Жақсы','Өте жақсы','Керемет!'];
  let selected=0;
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
  function getReviews(){try{return JSON.parse(localStorage.getItem(key)||'[]').filter(r=>r&&r.rating&&r.text);}catch(e){return [];}}
  function setSelected(n){selected=n;value.value=n;stars.forEach(b=>b.classList.toggle('on',Number(b.dataset.star)<=n));hint.textContent=labels[n]||'Жұлдызшаны таңдаңыз';}
  stars.forEach(b=>{b.addEventListener('click',()=>setSelected(Number(b.dataset.star)));b.addEventListener('mouseenter',()=>stars.forEach(x=>x.classList.toggle('on',Number(x.dataset.star)<=Number(b.dataset.star))));});
  document.querySelector('.star-picker').addEventListener('mouseleave',()=>setSelected(selected));
  textArea.addEventListener('input',()=>count.textContent=`${textArea.value.length} / 280`);
  function render(){
    const reviews=getReviews();
    if(reviews.length){
      const mean=reviews.reduce((a,r)=>a+Number(r.rating),0)/reviews.length;
      avg.textContent=mean.toFixed(1);
      avgStars.textContent='★'.repeat(Math.round(mean))+'☆'.repeat(5-Math.round(mean));
      ratingCount.textContent=`${reviews.length} пікір`;
      list.innerHTML=reviews.slice().reverse().slice(0,6).map(r=>`<article class="review-item"><div class="review-stars" aria-label="${r.rating} жұлдыз">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div><p>${esc(r.text)}</p><div class="review-meta"><strong>${esc(r.name||'Қонақ')}</strong><span>${esc(r.date||'')}</span></div></article>`).join('');
    }else{
      avg.textContent='—';avgStars.textContent='☆☆☆☆☆';ratingCount.textContent='Әзірге пікір жоқ';
      list.innerHTML='<div class="review-empty">Алғашқы пікірді сіз қалдыра аласыз ✦</div>';
    }
  }
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const txt=textArea.value.trim();
    if(!selected){hint.textContent='Алдымен жұлдызша арқылы баға таңдаңыз';stars[0].focus();return;}
    if(!txt){textArea.focus();return;}
    const reviews=getReviews();
    reviews.push({rating:selected,name:document.getElementById('review-name').value.trim(),text:txt,date:new Date().toLocaleDateString('kk-KZ')});
    localStorage.setItem(key,JSON.stringify(reviews.slice(-30)));
    form.reset();textArea.value='';count.textContent='0 / 280';setSelected(0);render();
    hint.textContent='Рақмет! Пікіріңіз сақталды ✦';
  });
  render();
})();
