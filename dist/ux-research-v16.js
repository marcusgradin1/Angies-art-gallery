(function(){
  const css=document.createElement('link');css.rel='stylesheet';css.href='ux-research-v16.css?rev=1';document.head.append(css);
  document.body.classList.add('ux-v16');
  const app=document.querySelector('#app');
  const route=()=>location.hash.slice(1)||'home';
  function closeSearch({restoreFocus=false}={}){
    const panel=document.querySelector('#search'),toggle=document.querySelector('#searchToggle');
    if(!panel||!toggle)return;
    panel.classList.remove('open');toggle.setAttribute('aria-expanded','false');
    if(restoreFocus)toggle.focus();
  }
  function enhanceSearch(){
    const panel=document.querySelector('#search'),toggle=document.querySelector('#searchToggle'),input=document.querySelector('#searchInput'),results=document.querySelector('#results');
    if(!panel||!toggle||!input||!results||panel.dataset.v16Ready)return;
    panel.dataset.v16Ready='true';
    const actions=document.createElement('div');actions.className='ux-v16-search-actions';actions.innerHTML='<button type="button" data-search-clear>Rensa</button><button type="button" data-search-close>Stäng</button>';panel.append(actions);
    toggle.addEventListener('click',()=>setTimeout(()=>{if(panel.classList.contains('open'))input.focus()},0));
    panel.addEventListener('click',event=>{if(event.target.closest('[data-search-close]'))closeSearch({restoreFocus:true});if(event.target.closest('[data-search-clear]')){input.value='';results.innerHTML='<span class="ux-v16-empty">Sök efter verk 01–09.</span>';input.focus()}});
    input.addEventListener('input',()=>setTimeout(()=>{if(input.value.trim()&&!results.querySelector('a'))results.innerHTML='<span class="ux-v16-empty">Inga verk matchar sökningen.</span>'},0));
    input.addEventListener('keydown',event=>{if(event.key==='Escape')closeSearch({restoreFocus:true});if(event.key==='Enter'){const first=results.querySelector('a');if(first)first.click()}});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&panel.classList.contains('open'))closeSearch({restoreFocus:true})});
  }
  function enhanceProduct(){
    const panel=document.querySelector('.product .panel');if(!panel||panel.querySelector('.ux-v16-product-note'))return;
    const note=document.createElement('aside');note.className='ux-v16-product-note';note.innerHTML='<strong>Förhandsvisning</strong><p>Pris, material och leveransvillkor fastställs före lansering.</p>';
    const status=panel.querySelector('.signal');status?.after(note);
  }
  function enhanceFooter(){
    const nav=document.querySelector('footer nav');if(!nav||nav.querySelector('[href="#studio"]'))return;
    const link=document.createElement('a');link.href='#studio';link.dataset.route='studio';link.textContent='Ateljé';nav.insertBefore(link,nav.firstChild);
  }
  function enhanceRoute(){
    [...document.body.classList].filter(name=>name.startsWith('route-')).forEach(name=>document.body.classList.remove(name));document.body.classList.add(`route-${route()}`);
    closeSearch();enhanceSearch();enhanceProduct();enhanceFooter();
    if(route()==='works'&&!document.querySelector('.ux-v16-route-note'))document.querySelector('.intro .lede')?.insertAdjacentHTML('afterend','<p class="ux-v16-route-note">Visar nio tillfälliga verk. Riktiga titlar, material och priser läggs in inför lansering.</p>');
  }
  let queued=false;const schedule=()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;enhanceRoute()})};
  window.addEventListener('hashchange',schedule);new MutationObserver(schedule).observe(app,{childList:true,subtree:true});enhanceRoute();
})();
