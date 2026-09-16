(function(){
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  let active=null;
  function setup(){
    const stage=document.querySelector('[data-product-stage]');
    const image=document.querySelector('[data-product-image]');
    if(!stage||!image||stage.dataset.galleryReady==='true')return;
    stage.dataset.galleryReady='true';
    let scale=1, x=0, y=0, startX=0, startY=0, dragging=false, moved=false;
    const apply=()=>{image.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`};
    const reset=()=>{scale=1;x=0;y=0;apply()};
    const zoom=(amount,originX=stage.clientWidth/2,originY=stage.clientHeight/2)=>{
      const next=clamp(scale+amount,1,3.2), ratio=next/scale;
      x=originX-(originX-x)*ratio;y=originY-(originY-y)*ratio;scale=next;apply()
    };
    const controls=document.createElement('div');
    controls.className='product-zoom-controls';
    controls.innerHTML='<button type="button" data-gallery-zoom="out" aria-label="Zooma ut">−</button><button type="button" data-gallery-reset aria-label="Återställ bildvy">↺</button><button type="button" data-gallery-zoom="in" aria-label="Zooma in">+</button>';
    stage.append(controls);
    stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;dragging=true;moved=false;stage.classList.add('is-dragging');stage.setPointerCapture(e.pointerId);startX=e.clientX-x;startY=e.clientY-y});
    stage.addEventListener('pointermove',e=>{if(!dragging)return;x=e.clientX-startX;y=e.clientY-startY;if(Math.abs(e.movementX)+Math.abs(e.movementY)>2)moved=true;apply()});
    const stop=e=>{if(!dragging)return;dragging=false;stage.classList.remove('is-dragging');try{stage.releasePointerCapture(e.pointerId)}catch{}};
    stage.addEventListener('pointerup',stop);stage.addEventListener('pointercancel',stop);
    stage.addEventListener('wheel',e=>{e.preventDefault();const box=stage.getBoundingClientRect();zoom(e.deltaY<0?.18:-.18,e.clientX-box.left,e.clientY-box.top)},{passive:false});
    controls.addEventListener('click',e=>{const zoomButton=e.target.closest('[data-gallery-zoom]');if(zoomButton)zoom(zoomButton.dataset.galleryZoom==='in'?.2:-.2);if(e.target.closest('[data-gallery-reset]'))reset()});
    stage.addEventListener('dblclick',()=>zoom(scale>1?-1:.7));
    stage.addEventListener('click',e=>{if(e.target.closest('button')||dragging||moved){moved=false;return}openLightbox(image.src,image.alt)});
    active={reset,zoom,image};
  }
  function openLightbox(src,alt){
    let box=document.querySelector('.product-lightbox');
    if(!box){
      box=document.createElement('div');box.className='product-lightbox';box.innerHTML='<figure><button class="product-lightbox-close" type="button" aria-label="Stäng bildvisning">×</button><img alt=""><span class="product-lightbox-hint">Dra för att panorera · scrolla för att zooma</span></figure>';document.body.append(box);
      const modalImage=box.querySelector('img');let scale=1,x=0,y=0,startX=0,startY=0,dragging=false;
      const apply=()=>{modalImage.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`};
      const reset=()=>{scale=1;x=0;y=0;apply()};
      const zoom=amount=>{scale=clamp(scale+amount,1,4);apply()};
      modalImage.addEventListener('pointerdown',e=>{dragging=true;modalImage.setPointerCapture(e.pointerId);startX=e.clientX-x;startY=e.clientY-y});
      modalImage.addEventListener('pointermove',e=>{if(dragging){x=e.clientX-startX;y=e.clientY-startY;apply()}});
      ['pointerup','pointercancel'].forEach(type=>modalImage.addEventListener(type,e=>{dragging=false;try{modalImage.releasePointerCapture(e.pointerId)}catch{}}));
      modalImage.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.22:-.22)},{passive:false});
      modalImage.addEventListener('dblclick',()=>zoom(scale>1?-1:.8));
      box._reset=reset;
      box.addEventListener('click',e=>{if(e.target===box||e.target.closest('.product-lightbox-close'))closeLightbox()});box.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()})
    }
    const modalImage=box.querySelector('img');box._reset();modalImage.src=src;modalImage.alt=alt;box.classList.add('open');box.setAttribute('aria-hidden','false');box.querySelector('.product-lightbox-close').focus();
  }
  function closeLightbox(){const box=document.querySelector('.product-lightbox');if(box){box.classList.remove('open');box.setAttribute('aria-hidden','true')}}
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
  document.addEventListener('click',e=>{if(e.target.closest('[data-view]'))setTimeout(()=>active?.reset(),0)});
  const observer=new MutationObserver(()=>setup());observer.observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
  setup();
})();
