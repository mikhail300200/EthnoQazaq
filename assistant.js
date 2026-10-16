(function(){
  const $=id=>document.getElementById(id);
  const launcher=$('ai-assistant-launcher');
  const panel=$('ai-assistant-panel');
  const close=$('ai-assistant-close');
  const form=$('ai-assistant-form');
  const input=$('ai-assistant-input');
  const messages=$('ai-assistant-messages');
  if(!launcher||!panel||!form||!input||!messages)return;

  const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=s=>String(s||'').toLocaleLowerCase('kk-KZ')
    .replace(/[ә]/g,'а').replace(/[і]/g,'и').replace(/[ң]/g,'н').replace(/[ғ]/g,'г')
    .replace(/[үұ]/g,'у').replace(/[қ]/g,'к').replace(/[ө]/g,'о').replace(/[һ]/g,'х')
    .replace(/[^a-zа-яё0-9\s-]/gi,' ').replace(/\s+/g,' ').trim();
  const stop=new Set('мен және пен бен да де та те не ол бұл осы ана мына туралы жайлы қандай қайда қалай бар ма ме ба бе па пе үшін бойынша'.split(' '));
  const tokens=s=>normalize(s).split(' ').filter(x=>x.length>1&&!stop.has(x));

  function addMessage(text,who='bot'){
    const div=document.createElement('div');
    div.className='ai-msg '+who;
    div.innerHTML=text;
    messages.appendChild(div);
    messages.scrollTop=messages.scrollHeight;
  }

  function buildKnowledge(){
    const kb=[];
    const push=(title,text,tags='',kind='info')=>{
      if(!title&&!text)return;
      kb.push({title:String(title||''),text:String(text||''),tags:String(tags||''),kind});
    };

    if(typeof places!=='undefined') places.forEach(p=>push(p.name,`${p.district||''}. ${p.detail||p.description||''}`,`${p.type||''} орын карта табиғат киелі мұра`, 'place'));
    if(typeof recipes!=='undefined') recipes.forEach(r=>push(r.title,`${r.description||''} ${(r.ingredients||[]).join(', ')}`,`тағам рецепт асхана дастарқан`, 'food'));
    if(typeof restaurants!=='undefined') restaurants.forEach(r=>push(r.name,`${r.description||''} ${r.address||''} ${(r.dishes||[]).join(', ')}`,`ақтау мейрамхана дәм тағам мекенжай`, 'restaurant'));
    if(typeof artisanCatalog!=='undefined') artisanCatalog.forEach(m=>push(m.name,`${m.desc||''} ${m.address||''}`,`ұлттық сән киім шебер тігінші`, 'maker'));

    document.querySelectorAll('.culture-card').forEach(c=>push(c.dataset.title,c.dataset.info,`бейне видео youtube тірі мәдениет`, 'video'));
    document.querySelectorAll('.operator-grid article').forEach(a=>push(a.querySelector('h3')?.textContent,a.querySelector('p')?.textContent,`тур оператор саяхат бағыт`, 'tour'));
    document.querySelectorAll('.activity-grid article').forEach(a=>push(a.querySelector('h3')?.textContent,a.querySelector('p')?.textContent,`белсенділік тәжірибе`, 'activity'));

    document.querySelectorAll('section').forEach(s=>{
      const h=s.querySelector('h2,h3'); const p=s.querySelector('.section-head p, p');
      if(h&&p) push(h.textContent,p.textContent,`бөлім ақпарат`, 'section');
    });
    return kb;
  }
  const kb=buildKnowledge();

  function scoreItem(item,qTokens){
    const hay=normalize(`${item.title} ${item.text} ${item.tags}`);
    let score=0;
    qTokens.forEach(t=>{if(hay.includes(t))score+=item.title&&normalize(item.title).includes(t)?4:1;});
    return score;
  }

  function answer(q){
    const n=normalize(q); const qt=tokens(q);
    if(!n) return 'Сұрағыңызды жазыңыз.';
    if(/^(салем|сәлем|привет|hi|hello)/.test(n)) return 'Сәлем! Мен EthnoQazaq көмекшісімін. Маңғыстау орындары, мәдениет, тағам, шеберлер, турлар және сайттағы бейнелер туралы сұрай аласыз.';
    if(n.includes('сен ким')||n.includes('кто ты')) return 'Мен осы сайттың ішіндегі ақпарат бойынша жауап беретін шағын AI-көмекшімін.';

    if(/(видео|бейне|youtube|tiktok)/.test(n)){
      const named=kb.filter(x=>x.kind==='video').map(x=>`<strong>${escapeHtml(x.title)}</strong>`).slice(0,6).join(', ');
      const placeVideo=(typeof locationMedia!=='undefined'&&qt.some(t=>Object.values(locationMedia).some?.(()=>false)))?'' : '';
      return `Сайтта мына бейнелер бар: ${named}. Карточканы басқанда бейне сайттың ішінде ашылады. Бейненің кадрларын өзім талдамаймын, бірақ сайттағы атауы мен сипаттамасына сүйеніп түсіндіре аламын.`;
    }
    if(/(тур|саяхат|бага|баға|канша|қанша)/.test(n)){
      if(/(бага|баға|канша|қанша)/.test(n)) return 'Сайттағы тур калькуляторында: Джип тур — 75 000 ₸, Турбо тур — 29 500 ₸, 2 күндік тур — 160 000 ₸. Нақты баға мен бос орынды туроператордан тексерген дұрыс.';
      return 'Турлар бөлімінде Ves Mangystau, Kettik Mangystau және Mangystau Safari операторлары бар. Сондай-ақ тур калькуляторы мен дайындық тізімі берілген.';
    }
    if(/(тағам|тагам|асхана|дастаркан|дастарқан|рецепт|дәм|кумыс|қымыз|шубат|шұбат)/.test(n)){
      const foods=kb.filter(x=>x.kind==='food').slice(0,4).map(x=>`<strong>${escapeHtml(x.title)}</strong>`).join(', ');
      return `Этнодәм бөлімінде ${foods} сияқты рецепттер және Ақтауда дәм татуға болатын орындар берілген. Қай тағам қызықтырады?`;
    }
    if(/(зергер|сән|киім|тигин|тігін|шебер)/.test(n)){
      return 'Шеберлер бөлімінде зергерлік бұйымдар мен ұлттық сән ұсынылған. Zerger Serikqali, Zhaqut Kumisteri, Qazaq Silver және ұлттық киім шеберлерінің байланыстары бар.';
    }
    if(/(карта|орын|мекен|қайда|кайда)/.test(n)&&qt.length<3){
      return '«Мұра картасы» бөлімінен Бозжыра, Шерқала, Айрақты-Шоманай, Бекет ата, Шақпақ ата сияқты нысандарды картадан таңдауға болады.';
    }

    const ranked=kb.map(x=>({x,s:scoreItem(x,qt)})).filter(r=>r.s>0).sort((a,b)=>b.s-a.s).slice(0,3);
    if(ranked.length){
      const best=ranked[0].x;
      let out=`<strong>${escapeHtml(best.title)}</strong> — ${escapeHtml(best.text)}`;
      if(ranked.length>1&&ranked[1].s>=ranked[0].s-1){
        out+=`<br><br>Қатысты: ${ranked.slice(1).map(r=>`<strong>${escapeHtml(r.x.title)}</strong>`).join(', ')}.`;
      }
      return out;
    }
    return 'Бұл сұраққа сайт ішіндегі деректерден нақты жауап таба алмадым. Мысалы: «Бозжыра туралы айт», «Тур бағасы қанша?», «Ұлттық асхана», «Домбыра видеосы не туралы?» деп сұрап көріңіз.';
  }

  function openPanel(){panel.hidden=false;launcher.setAttribute('aria-expanded','true');setTimeout(()=>input.focus(),60)}
  function closePanel(){panel.hidden=true;launcher.setAttribute('aria-expanded','false')}
  launcher.addEventListener('click',()=>panel.hidden?openPanel():closePanel());
  close.addEventListener('click',closePanel);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)closePanel()});
  form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;addMessage(escapeHtml(q),'user');input.value='';setTimeout(()=>addMessage(answer(q),'bot'),120)});
  document.querySelectorAll('[data-ai-question]').forEach(b=>b.addEventListener('click',()=>{input.value=b.dataset.aiQuestion;form.requestSubmit()}));
})();
