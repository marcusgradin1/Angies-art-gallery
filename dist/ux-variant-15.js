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
    if(!document.querySelector('.ux-view-status')){
      const status=document.createElement('div');status.className='ux-view-status';status.innerHTML='<span>Bildvisning</span><span>Tre perspektiv · klicka för fullscreen</span>';
      stage.after(status);
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
  function enhance(){addDiscovery();addProductTools();addToast();improveSearch()}
  enhance();
  new MutationObserver(enhance).observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
})();
