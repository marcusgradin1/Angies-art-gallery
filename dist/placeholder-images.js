(function(){
  if(typeof products!=='undefined'&&Array.isArray(products))products.splice(9);
  const cleanup=document.createElement('style');cleanup.textContent='.visual:before,.art:before,.art:after{display:none!important}.art{box-shadow:none!important}';document.head.append(cleanup);
  const images=Array.from({length:9},(_,i)=>`assets/placeholders/placeholder-${String(i+1).padStart(2,'0')}.png`);
  const sourceFor=id=>images[(Math.max(1,Number(id)||1)-1)%images.length];
  const productId=()=>{const match=location.hash.match(/^#product-(\d+)/);return match?Number(match[1]):null};
  function refresh(){
    const search=document.querySelector('#search');if(search){search.classList.remove('open');const toggle=document.querySelector('#searchToggle');if(toggle)toggle.setAttribute('aria-expanded','false');}
    const id=productId();
    document.querySelectorAll('.work-image,.art-image,.large-image').forEach((img,index)=>{const match=img.closest('a')?.getAttribute('href')?.match(/product-(\d+)/);img.src=sourceFor(match?match[1]:(id||index+1));});
    if(id){
      const src=sourceFor(id);
      document.querySelectorAll('[data-product-image],.product-view img').forEach(img=>{img.src=src;img.dataset.image=src;});
      document.querySelectorAll('.product-view').forEach(button=>button.dataset.image=src);
      const roomArt=document.querySelector('.ux-room__art');if(roomArt)roomArt.src=src;
    }
    document.querySelectorAll('.ux-wishlist-card img').forEach(img=>{const match=img.alt.match(/(\d+)/);if(match)img.src=sourceFor(match[1]);});
    document.querySelectorAll('a[href="#product-10"]').forEach(link=>link.closest('.work')?.remove());
  }
  window.addEventListener('hashchange',()=>setTimeout(refresh,0));
  new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
  refresh();
})();
