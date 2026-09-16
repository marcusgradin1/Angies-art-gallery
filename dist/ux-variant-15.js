(function(){
  const params=new URLSearchParams(location.search);
  if(params.get('variant')&&params.get('variant')!=='15')return;
  document.body.dataset.variant='15';
  if(!document.querySelector('link[data-room-scale-css]')){const style=document.createElement('link');style.rel='stylesheet';style.href='ux-variant-15.css?rev=real-room-scale-1';style.dataset.roomScaleCss='true';document.head.append(style)}
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
    const productInfo=document.querySelector('.details details');
    if(productInfo&&!productInfo.dataset.variant15Initialized){productInfo.removeAttribute('open');productInfo.dataset.variant15Initialized='true'}
    document.querySelector('.product-view-grid')?.remove();
    document.querySelector('.product-gallery > .eyebrow')?.remove();
    const stageLabel=stage.querySelector('.product-stage-label');
    if(stageLabel)stageLabel.textContent='01 / Verket';
    if(!document.querySelector('.ux-wishlist')){
      const id=(location.hash.match(/product-(\d+)/)||[])[1]||'01';
      const saved=JSON.parse(localStorage.getItem('angies-art-wishlist')||'[]');
      const button=document.createElement('button');button.type='button';button.className='ux-wishlist';button.dataset.wishlist=id;button.setAttribute('aria-pressed',saved.includes(id)?'true':'false');button.textContent=saved.includes(id)?'Sparat i önskelistan':'Spara verk i önskelistan';
      document.querySelector('.panel .buy')?.after(button);
      button.addEventListener('click',()=>{const list=JSON.parse(localStorage.getItem('angies-art-wishlist')||'[]');const next=list.includes(id)?list.filter(item=>item!==id):[...list,id];localStorage.setItem('angies-art-wishlist',JSON.stringify(next));const active=next.includes(id);button.classList.toggle('is-saved',active);button.setAttribute('aria-pressed',active?'true':'false');button.textContent=active?'Sparat i önskelistan':'Spara verk i önskelistan';ensureWishlistLink()});
    }
    if(!document.querySelector('.ux-room-preview')){
      const room=document.createElement('section');room.className='ux-room-preview';room.setAttribute('aria-label','Se verket i ett rum');room.innerHTML='<div class="ux-room-preview__head"><div><span class="eyebrow">Fast miljö</span><strong>Se verket på väggen.</strong></div><p>Välj ett tillgängligt mått för att se proportionen i rummet.</p></div><div class="ux-room"><div class="ux-room__scene"><img class="ux-room__image" src="test-gallery-living-room.png" alt="Ljust vardagsrum med öppen köksdel och fri vägg"><img class="ux-room__art" src="assets/placeholders/art-01.jpg" alt="Verket placerat på väggen"></div><div class="ux-room__zoom-controls" role="group" aria-label="Zooma rumsvisningen"><button type="button" data-room-zoom="out" aria-label="Zooma ut rumsvisningen">−</button><button type="button" data-room-zoom="reset" aria-label="Återställ rumsvisningen">↺</button><button type="button" data-room-zoom="in" aria-label="Zooma in rumsvisningen">+</button></div></div><div class="ux-room__scale" role="group" aria-label="Välj tillgängligt mått"><button type="button" data-room-size="30 x 30 cm">30 × 30</button><button type="button" data-room-size="50 x 50 cm" class="is-active">50 × 50</button><button type="button" data-room-size="70 x 70 cm">70 × 70</button><button type="button" data-room-size="100 x 100 cm">100 × 100</button></div>';
      document.querySelector('.product-gallery').append(room);
      room.querySelector('.ux-room__image').loading='lazy';room.querySelector('.ux-room__image').decoding='async';
      const wallWidthCm=400;
      const sizeSpec=value=>{const match=value?.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i);if(!match)return{width:'12.5%',ratio:'1 / 1'};const width=Number(match[1]),height=Number(match[2]);return{width:`${Math.min(42,width/wallWidthCm*100)}%`,ratio:`${width} / ${height}`}};
      const syncRoom=size=>{const spec=sizeSpec(size);const art=room.querySelector('.ux-room__art');art.style.width=spec.width;art.style.aspectRatio=spec.ratio;room.querySelectorAll('[data-room-size]').forEach(item=>item.classList.toggle('is-active',item.dataset.roomSize===size))};
      let roomZoom=1,roomX=0,roomY=0,roomDragging=false,startX=0,startY=0,pinchStart=null;const touchPoints=new Map(),frame=room.querySelector('.ux-room');const scene=room.querySelector('.ux-room__scene');const applyRoomZoom=()=>{const maxX=Math.max(0,frame.clientWidth*(roomZoom-1)),maxY=Math.max(0,frame.clientHeight*(roomZoom-1));roomX=Math.max(-maxX,Math.min(maxX,roomX));roomY=Math.max(-maxY,Math.min(maxY,roomY));scene.style.transform=`translate3d(${roomX}px,${roomY}px,0) scale(${roomZoom})`;frame.classList.toggle('is-zoomed',roomZoom>1);frame.classList.toggle('is-dragging',roomDragging);room.querySelectorAll('[data-room-zoom]').forEach(button=>{button.disabled=(button.dataset.roomZoom==='out'&&roomZoom<=1)||(button.dataset.roomZoom==='in'&&roomZoom>=2.2)})};
      room.addEventListener('click',e=>{const zoomButton=e.target.closest('[data-room-zoom]');if(zoomButton){roomZoom=zoomButton.dataset.roomZoom==='reset'?1:Math.max(1,Math.min(2.2,roomZoom+(zoomButton.dataset.roomZoom==='in'?.2:-.2)));applyRoomZoom();return}const button=e.target.closest('[data-room-size]');if(!button)return;const size=document.querySelector('.panel select[id^="size-"]');if(size&&!size.disabled){size.value=button.dataset.roomSize;size.dispatchEvent(new Event('change',{bubbles:true}))}syncRoom(button.dataset.roomSize)});applyRoomZoom();
      const distance=(a,b)=>Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),midpoint=(a,b)=>({x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2});
      room.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;touchPoints.set(e.pointerId,e);if(touchPoints.size===2){const points=[...touchPoints.values()],box=frame.getBoundingClientRect(),mid=midpoint(points[0],points[1]);pinchStart={distance:distance(points[0],points[1]),scale:roomZoom,x:roomX,y:roomY,originX:mid.x-box.left,originY:mid.y-box.top};roomDragging=false;applyRoomZoom();return}if(roomZoom<=1)return;e.preventDefault();roomDragging=true;startX=e.clientX-roomX;startY=e.clientY-roomY;room.setPointerCapture(e.pointerId);applyRoomZoom()});
      room.addEventListener('pointermove',e=>{touchPoints.set(e.pointerId,e);if(pinchStart&&touchPoints.size>=2){const points=[...touchPoints.values()].slice(0,2),ratio=distance(points[0],points[1])/pinchStart.distance,next=Math.max(1,Math.min(2.2,pinchStart.scale*ratio)),zoomRatio=next/pinchStart.scale;roomX=pinchStart.originX-(pinchStart.originX-pinchStart.x)*zoomRatio;roomY=pinchStart.originY-(pinchStart.originY-pinchStart.y)*zoomRatio;roomZoom=next;applyRoomZoom();return}if(!roomDragging)return;roomX=e.clientX-startX;roomY=e.clientY-startY;applyRoomZoom()});
      const stopRoomDrag=e=>{touchPoints.delete(e.pointerId);if(pinchStart&&touchPoints.size<2){pinchStart=null;roomDragging=false}if(!roomDragging)return;roomDragging=false;try{room.releasePointerCapture(e.pointerId)}catch{}applyRoomZoom()};
      room.addEventListener('pointerup',stopRoomDrag);room.addEventListener('pointercancel',stopRoomDrag);applyRoomZoom();
      frame.addEventListener('dblclick',e=>{if(e.target.closest('button'))return;const next=roomZoom>1?1:1.6,rect=frame.getBoundingClientRect(),px=e.clientX-rect.left,py=e.clientY-rect.top,ratio=next/roomZoom;roomX=px-(px-roomX)*ratio;roomY=py-(py-roomY)*ratio;roomZoom=next;applyRoomZoom()});
      frame.addEventListener('wheel',e=>{if(e.target.closest('button'))return;const next=Math.max(1,Math.min(2.2,roomZoom+(e.deltaY<0?.2:-.2)));if(next===roomZoom&&roomZoom===1)return;e.preventDefault();const rect=frame.getBoundingClientRect(),px=e.clientX-rect.left,py=e.clientY-rect.top,ratio=next/roomZoom;roomX=px-(px-roomX)*ratio;roomY=py-(py-roomY)*ratio;roomZoom=next;applyRoomZoom()},{passive:false});
      const sizeSelect=document.querySelector('.panel select[id^="size-"]');if(sizeSelect){sizeSelect.addEventListener('change',()=>syncRoom(sizeSelect.value))}syncRoom(sizeSelect?.value);
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
  function removeMenu(){
    document.querySelector('#menuToggle')?.remove();
    document.querySelector('#nav')?.classList.remove('open');
  }
  function savedIds(){return JSON.parse(localStorage.getItem('angies-art-wishlist')||'[]')}
  function ensureWishlistLink(){
    const nav=document.querySelector('#nav');
    if(!nav)return;
    let link=nav.querySelector('.ux-wishlist-link');
    if(!link){link=document.createElement('a');link.className='ux-wishlist-link';link.href='#wishlist';link.textContent='Önskelista';nav.append(link)}
    const count=savedIds().length;link.textContent=count?`Önskelista (${count})`:'Önskelista';
  }
  function renderWishlist(){
    const ids=savedIds();
    const app=document.querySelector('#app');
    if(!app)return;
    const cards=ids.map(id=>`<article class="ux-wishlist-card"><a href="#product-${id}"><img src="${id==='01'?'assets/placeholders/art-01.jpg':id==='02'?'art-background.png':id==='03'?'test-gallery-room.png':id==='04'?'test-gallery-room-rose.png':'header-lineart-painter.png'}" alt="Sparat verk ${id}"><div class="ux-wishlist-card__meta"><span>Verk ${id}</span><span>Öppna ↗</span></div></a><button type="button" class="ux-wishlist-card__remove" data-wishlist-remove="${id}">Ta bort</button></article>`).join('');
    app.innerHTML=`<main class="ux-wishlist-page"><div class="ux-wishlist-page__intro"><div><span class="eyebrow">Dina sparade verk</span><h1>Önskelista.</h1></div><p>Samla verken du vill återvända till och jämför dem i lugn och ro.</p></div>${ids.length?`<div class="ux-wishlist-grid">${cards}</div>`:'<div class="ux-wishlist-empty">Du har inte sparat något verk ännu. När du hittar ett verk du tycker om kan du spara det här.</div>'}</main>`;
    document.querySelectorAll('[data-route]').forEach(a=>a.classList.toggle('active',a.dataset.route===location.hash.slice(1)));
  }
  document.addEventListener('click',e=>{const link=e.target.closest('.ux-wishlist-link');if(link){e.preventDefault();location.hash='wishlist'}const remove=e.target.closest('[data-wishlist-remove]');if(remove){const next=savedIds().filter(id=>id!==remove.dataset.wishlistRemove);localStorage.setItem('angies-art-wishlist',JSON.stringify(next));renderWishlist();ensureWishlistLink()}});
  window.addEventListener('hashchange',()=>{if(location.hash.slice(1)==='wishlist')renderWishlist();ensureWishlistLink()});
  function enhance(){addDiscovery();addProductTools();addToast();improveSearch();improveMenu();removeMenu();ensureWishlistLink();if(location.hash.slice(1)==='wishlist'&&!document.querySelector('.ux-wishlist-page'))renderWishlist()}
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
