(function(){
  const params=new URLSearchParams(location.search);
  if(params.get('variant')!=='15')return;
  document.body.dataset.variant='15';
  function addDiscovery(){
    if(document.querySelector('.ux-discovery')||!document.querySelector('.hero'))return;
    const block=document.createElement('section');
    block.className='ux-discovery';
    block.setAttribute('aria-label','Hitta rätt ingång');
    block.innerHTML='<div class="ux-discovery__lead"><span class="eyebrow">Börja där det känns</span><strong>Hitta ett verk som passar rummet.</strong><p>Utforska efter uttryck, kollektion eller format och låt bilden leda dig vidare.</p></div><div class="ux-discovery__links"><a class="ux-discovery__link" href="#works" data-route="works">Alla verk<span>Se katalogen</span></a><a class="ux-discovery__link" href="#collections" data-route="collections">Efter känsla<span>Kuraterade världar</span></a><a class="ux-discovery__link" href="#prints" data-route="prints">Prints<span>Format och material</span></a><a class="ux-discovery__link" href="#studio" data-route="studio">Ateljén<span>Processen bakom</span></a></div></section>';
    document.querySelector('.hero').after(block);
  }
  function addProductTools(){
    const stage=document.querySelector('[data-product-stage]');
    const product=document.querySelector('.product');
    if(!stage||!product)return;
    document.querySelector('.product-view-grid')?.remove();
    document.querySelector('.product-gallery > .eyebrow')?.remove();
    const stageLabel=stage.querySelector('.product-stage-label');
    if(stageLabel)stageLabel.textContent='01 / Verket';
    if(!document.querySelector('.ux-wishlist')){
      const id=(location.hash.match(/product-(\d+)/)||[])[1]||'01';
      const saved=JSON.parse(localStorage.getItem('angies-art-wishlist')||'[]');
      const button=document.createElement('button');button.type='button';button.className='ux-wishlist';button.dataset.wishlist=id;button.setAttribute('aria-pressed',saved.includes(id)?'true':'false');button.textContent=saved.includes(id)?'Sparat i önskelistan':'Spara verk i önskelistan';
      document.querySelector('.panel .buy')?.after(button);
      button.addEventListener('click',()=>{const list=JSON.parse(localStorage.getItem('angies-art-wishlist')||'[]');const next=list.includes(id)?list.filter(item=>item!==id):[...list,id];localStorage.setItem('angies-art-wishlist',JSON.stringify(next));const active=next.includes(id);button.classList.toggle('is-saved',active);button.setAttribute('aria-pressed',active?'true':'false');button.textContent=active?'Sparat i önskelistan':'Spara verk i önskelistan'});
    }
    if(!document.querySelector('.ux-room-preview')){
      const room=document.createElement('section');room.className='ux-room-preview';room.setAttribute('aria-label','Se verket i ett rum');room.innerHTML='<div class="ux-room-preview__head"><div><span class="eyebrow">Fast miljö</span><strong>Se verket på väggen.</strong></div><p>Ändra tavlans storlek, inte rummet.</p></div><div class="ux-room"><img class="ux-room__image" src="test-gallery-room.png" alt="Ljust galleri med en fri vägg"><img class="ux-room__art" src="assets/placeholders/art-01.jpg" alt="Verket placerat på väggen"></div><div class="ux-room__scale" role="group" aria-label="Välj tavlans storlek"><button type="button" data-room-scale="small">Liten</button><button type="button" data-room-scale="medium" class="is-active">Mellan</button><button type="button" data-room-scale="large">Stor</button></div>';
      document.querySelector('.product-gallery').append(room);
      room.addEventListener('click',e=>{const button=e.target.closest('[data-room-scale]');if(!button)return;const sizes={small:'13%',medium:'18%',large:'25%'};room.querySelector('.ux-room__art').style.width=sizes[button.dataset.roomScale];room.querySelectorAll('[data-room-scale]').forEach(item=>item.classList.toggle('is-active',item===button))});
    }
  }
  function addToast(){
    if(document.querySelector('.ux-toast'))return;
    const toast=document.createElement('div');toast.className='ux-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.append(toast);
    document.addEventListener('click',e=>{if(!e.target.closest('[data-add]'))return;toast.textContent='Verket har lagts i varukorgen.';toast.classList.add('is-visible');clearTimeout(toast._timer);toast._timer=setTimeout(()=>toast.classList.remove('is-visible'),2600)});
  }
  function improveSearch(){
    const toggle=document.querySelector('#searchToggle'),input=document.querySelector('#searchInput');
    if(toggle&&input&&!toggle.dataset.uxReady){toggle.dataset.uxReady='true';toggle.addEventListener('click',()=>setTimeout(()=>input.focus(),0))}
  }
  function improveMenu(){
    const menu=document.querySelector('#menuToggle');
    if(menu&&!menu.dataset.uxReady){menu.dataset.uxReady='true';menu.setAttribute('aria-label','Öppna alla sidor');menu.title='Öppna alla sidor';menu.addEventListener('click',()=>setTimeout(()=>menu.setAttribute('aria-expanded',document.querySelector('#nav')?.classList.contains('open')?'true':'false'),0))}
  }
  function enhance(){addDiscovery();addProductTools();addToast();improveSearch();improveMenu()}
  const app=document.querySelector('#app');
  let enhancing=false,scheduled=false;
  enhance();
  if(app){
    const observer=new MutationObserver(()=>{
      if(enhancing||scheduled)return;
      scheduled=true;
      queueMicrotask(()=>{
        scheduled=false;
        if(enhancing)return;
        enhancing=true;
        observer.disconnect();
        try{enhance()}finally{enhancing=false;observer.observe(app,{childList:true,subtree:true})}
      });
    });
    observer.observe(app,{childList:true,subtree:true});
  }
})();
