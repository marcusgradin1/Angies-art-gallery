(function(){
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  let active=null;
  function setup(){
    const stage=document.querySelector('[data-product-stage]');
    const image=document.querySelector('[data-product-image]');
    if(!stage||!image||stage.dataset.galleryReady==='true')return;
    stage.dataset.galleryReady='true';
    image.loading='eager';image.decoding='async';
    let scale=1, x=0, y=0, startX=0, startY=0, dragging=false, moved=false, pinchStart=null;
    const apply=()=>{image.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;stage.dataset.zoom=Math.round(scale*100)+'%';const status=stage.querySelector('.product-zoom-status');if(status)status.textContent=Math.round(scale*100)+'%'};
    const reset=()=>{scale=1;x=0;y=0;apply()};
    const zoom=(amount,originX=stage.clientWidth/2,originY=stage.clientHeight/2)=>{
      const next=clamp(scale+amount,1,3.2), ratio=next/scale;
      x=originX-(originX-x)*ratio;y=originY-(originY-y)*ratio;scale=next;apply()
    };
    const controls=document.createElement('div');
    controls.className='product-zoom-controls';
    controls.innerHTML='<button type="button" data-gallery-zoom="out" aria-label="Zooma ut">−</button><button type="button" data-gallery-reset aria-label="Återställ bildvy">↺</button><button type="button" data-gallery-zoom="in" aria-label="Zooma in">+</button><span class="product-zoom-status" aria-live="polite">100%</span>';
    stage.append(controls);
    const touchPoints=new Map();
    const distance=(a,b)=>Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY);
    const midpoint=(a,b)=>({x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2});
    stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;touchPoints.set(e.pointerId,e);if(touchPoints.size===2){const points=[...touchPoints.values()],box=stage.getBoundingClientRect(),mid=midpoint(points[0],points[1]);pinchStart={distance:distance(points[0],points[1]),scale,x,y,originX:mid.x-box.left,originY:mid.y-box.top};dragging=false;stage.classList.remove('is-dragging');return}dragging=true;moved=false;stage.classList.add('is-dragging');stage.setPointerCapture(e.pointerId);startX=e.clientX-x;startY=e.clientY-y});
    stage.addEventListener('pointermove',e=>{touchPoints.set(e.pointerId,e);if(pinchStart&&touchPoints.size>=2){const points=[...touchPoints.values()].slice(0,2),ratio=distance(points[0],points[1])/pinchStart.distance,next=clamp(pinchStart.scale*ratio,1,3.2),zoomRatio=next/pinchStart.scale;x=pinchStart.originX-(pinchStart.originX-pinchStart.x)*zoomRatio;y=pinchStart.originY-(pinchStart.originY-pinchStart.y)*zoomRatio;scale=next;apply();return}if(!dragging)return;x=e.clientX-startX;y=e.clientY-startY;if(Math.abs(e.movementX)+Math.abs(e.movementY)>2)moved=true;apply()});
    const stop=e=>{touchPoints.delete(e.pointerId);if(pinchStart&&touchPoints.size<2){pinchStart=null;resetPointerState()}if(!dragging)return;dragging=false;stage.classList.remove('is-dragging');try{stage.releasePointerCapture(e.pointerId)}catch{}};
    const resetPointerState=()=>{dragging=false;stage.classList.remove('is-dragging')};
    stage.addEventListener('pointerup',stop);stage.addEventListener('pointercancel',stop);
    stage.addEventListener('wheel',e=>{e.preventDefault();const box=stage.getBoundingClientRect();zoom(e.deltaY<0?.18:-.18,e.clientX-box.left,e.clientY-box.top)},{passive:false});
    controls.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const zoomButton=e.target.closest('[data-gallery-zoom]');if(zoomButton)zoom(zoomButton.dataset.galleryZoom==='in'?.2:-.2);if(e.target.closest('[data-gallery-reset]'))reset()});
    controls.addEventListener('dblclick',e=>{e.preventDefault();e.stopPropagation()});
    stage.addEventListener('dblclick',e=>{if(e.target.closest('button'))return;const box=stage.getBoundingClientRect();zoom(scale>1?-1:.7,e.clientX-box.left,e.clientY-box.top)});
    stage.addEventListener('click',e=>{if(e.target.closest('button')||dragging||moved){moved=false;return}openLightbox(image.src,image.alt)});
    stage.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.target.closest('button')){e.preventDefault();openLightbox(image.src,image.alt)}else if(e.key==='+'||e.key==='='||e.key==='Add'){e.preventDefault();zoom(.2)}else if(e.key==='-'||e.key==='Subtract'){e.preventDefault();zoom(-.2)}else if(e.key==='Home'){e.preventDefault();reset()}});
    active={reset,zoom,image};
  }
  function openLightbox(src,alt){
    let box=document.querySelector('.product-lightbox');
    if(!box){
      box=document.createElement('div');box.className='product-lightbox';box.innerHTML='<figure tabindex="0" aria-label="Panorera i den förstorade bilden med mus, touch eller piltangenter"><button class="product-lightbox-close" type="button" aria-label="Stäng bildvisning">×</button><img alt=""><span class="product-lightbox-hint">Dra för att panorera · scrolla eller nyp för att zooma</span></figure>';document.body.append(box);
      const figure=box.querySelector('figure'),modalImage=box.querySelector('img');let scale=1,x=0,y=0,startX=0,startY=0,dragging=false,pinchStart=null;const touchPoints=new Map();
      const limits=()=>({x:Math.max(0,(modalImage.clientWidth*scale-figure.clientWidth)/2+24),y:Math.max(0,(modalImage.clientHeight*scale-figure.clientHeight)/2+24)});
      const apply=()=>{const max=limits();x=clamp(x,-max.x,max.x);y=clamp(y,-max.y,max.y);modalImage.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`};
      const reset=()=>{scale=1;x=0;y=0;apply()};
      const zoom=(amount,originX=figure.clientWidth/2,originY=figure.clientHeight/2)=>{const next=clamp(scale+amount,1,4),ratio=next/scale;x=originX-(originX-x)*ratio;y=originY-(originY-y)*ratio;scale=next;apply()};
      const move=e=>{if(dragging){e.preventDefault();x=e.clientX-startX;y=e.clientY-startY;apply()}};
      const stop=e=>{if(!dragging)return;dragging=false;figure.classList.remove('is-dragging');try{figure.releasePointerCapture(e.pointerId)}catch{}};
      const distance=(a,b)=>Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY),midpoint=(a,b)=>({x:(a.clientX+b.clientX)/2,y:(a.clientY+b.clientY)/2});
      figure.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;e.preventDefault();touchPoints.set(e.pointerId,e);if(touchPoints.size===2){const points=[...touchPoints.values()],boxRect=figure.getBoundingClientRect(),mid=midpoint(points[0],points[1]);pinchStart={distance:distance(points[0],points[1]),scale,x,y,originX:mid.x-boxRect.left,originY:mid.y-boxRect.top};dragging=false;figure.classList.remove('is-dragging');return}dragging=true;figure.classList.add('is-dragging');figure.setPointerCapture(e.pointerId);startX=e.clientX-x;startY=e.clientY-y});
      figure.addEventListener('pointermove',e=>{touchPoints.set(e.pointerId,e);if(pinchStart&&touchPoints.size>=2){const points=[...touchPoints.values()].slice(0,2),ratio=distance(points[0],points[1])/pinchStart.distance,next=clamp(pinchStart.scale*ratio,1,4),zoomRatio=next/pinchStart.scale;x=pinchStart.originX-(pinchStart.originX-pinchStart.x)*zoomRatio;y=pinchStart.originY-(pinchStart.originY-pinchStart.y)*zoomRatio;scale=next;apply()}});
      window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',e=>{touchPoints.delete(e.pointerId);if(pinchStart&&touchPoints.size<2){pinchStart=null;dragging=false;figure.classList.remove('is-dragging')}stop(e)});window.addEventListener('pointercancel',stop);
      figure.addEventListener('wheel',e=>{e.preventDefault();const boxRect=figure.getBoundingClientRect();zoom(e.deltaY<0?.22:-.22,e.clientX-boxRect.left,e.clientY-boxRect.top)},{passive:false});
      figure.addEventListener('dblclick',e=>{const boxRect=figure.getBoundingClientRect();zoom(scale>1?-1:.8,e.clientX-boxRect.left,e.clientY-boxRect.top)});
      figure.addEventListener('keydown',e=>{const step=48;if(e.key==='ArrowLeft'){e.preventDefault();x-=step;apply()}else if(e.key==='ArrowRight'){e.preventDefault();x+=step;apply()}else if(e.key==='ArrowUp'){e.preventDefault();y-=step;apply()}else if(e.key==='ArrowDown'){e.preventDefault();y+=step;apply()}else if(e.key==='Home'){e.preventDefault();reset()}});
      box._reset=reset;
      box.addEventListener('click',e=>{if(e.target===box||e.target.closest('.product-lightbox-close'))closeLightbox()});box.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()})
    }
    const modalImage=box.querySelector('img');if(!box.classList.contains('open')){box._returnFocus=document.activeElement;box._previousBodyOverflow=document.body.style.overflow;document.body.style.overflow='hidden'}box._reset();modalImage.src=src;modalImage.alt=alt;box.classList.add('open');box.setAttribute('aria-hidden','false');box.querySelector('.product-lightbox-close').focus();
  }
  function closeLightbox(){const box=document.querySelector('.product-lightbox');if(box){box.classList.remove('open');box.setAttribute('aria-hidden','true');document.body.style.overflow=box._previousBodyOverflow||'';box._returnFocus?.focus?.();box._returnFocus=null}}
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
  document.addEventListener('click',e=>{const button=e.target.closest('button[data-view]');if(button)setTimeout(()=>{active?.reset();if(button.dataset.view==='close')active?.zoom(.35);if(button.dataset.view==='detail')active?.zoom(1.2)},0)});
  const observer=new MutationObserver(()=>setup());observer.observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
  setup();
})();
