(function(){
  if(typeof products!=='undefined'&&Array.isArray(products))products.splice(9);
  const cleanup=document.createElement('style');cleanup.textContent='.visual:before,.art:before,.art:after{display:none!important}.art{box-shadow:none!important}';document.head.append(cleanup);
  const copy={
    'Samtida konst / digital utställning':'Samtida konst',
    'Angie\'s Art Gallery samlar verk med egen rytm, yta och närvaro.':'Konst med egen rytm och närvaro.',
    'Gå in i galleriet':'Utforska galleriet',
    'En gallerikänsla för skärmen. Kompositioner, kollektioner och prints får ta plats på sina egna villkor.':'En lugn plats för konst och prints.',
    'Tre sätt att börja.':'Börja här.',
    'Välj en ingång och låt nästa bild leda vägen.':'Välj en ingång.',
    'Hitta rätt ingång':'Välj väg',
    'Börja där det känns':'Börja här',
    'Hitta ett verk som passar rummet.':'Hitta rätt verk.',
    'Utforska efter uttryck, kollektion eller format och låt bilden leda dig vidare.':'Utforska efter känsla.',
    'En första blick på ett nytt visuellt landskap.':'En första blick.',
    'Kuraterade världar':'Efter känsla',
    'Format och material':'Material och format',
    'Processen bakom':'Bakom verken',
    'Galleri / utställningsvy':'Galleri',
    'En kuraterad sal där serier och enskilda verk får mötas i ett långsammare tempo.':'Utvalda verk, en bild i taget.',
    'Kollektioner / sammanhang':'Kollektioner',
    'Kollektionerna samlar verken efter känsla, material och rörelse.':'Verk samlade efter känsla.',
    'Prints / material och format':'Prints',
    'Här samlas den praktiska kunskapen om Fine Art Prints och Limited Editions.':'Format och material.',
    'Konstverk / katalog':'Konstverk',
    'En samling tillfälliga placeholder-verk tills det riktiga sortimentet tar plats.':'Utforska verken.',
    'Ateljé / process':'Ateljé',
    'Där idéer blir yta.':'Processen bakom verken.',
    'Ateljén blir platsen för material, skisser, misstag och det långsamma arbetet bakom verken.':'Material, skisser och process.',
    'Om Angie / berättelsen':'Om Angie',
    'En personlig blick.':'En personlig blick på konst.',
    'Angie’s Art Gallery är ett rum för verk som får vara nära, taktila och långlivade.':'Konst med närvaro och materialitet.',
    'Information / kundservice':'Information',
    'Bra att veta.':'Bra att veta.',
    'Här samlas information om leverans, returer, kontakt och skötsel när villkoren är fastställda.':'Leverans, returer och skötsel.',
    'Kontakt / dialog':'Kontakt',
    'Hör av dig när du vill.':'Hör av dig.',
    'En tydlig kontaktväg läggs in här när rätt kontaktuppgifter och formulär är beslutade.':'Kontaktväg publiceras snart.',
    'Ett uttrycksfullt verk presenterat i flera vyer. Välj storlek och format för att förbereda din beställning.':'Välj storlek och format.',
    'Välj ett tillgängligt mått för att se proportionen i rummet.':'Välj mått för rumsvisning.',
    'Pris fastställs senare':'Pris meddelas senare',
    'Välj båda alternativen för att fortsätta.':'Välj mått och format.',
    'När du hittar ett verk du vill spara, lägger du det här.':'Sparade verk visas här.',
    'Samla verken du vill återvända till och jämför dem i lugn och ro.':'Spara verk du vill återvända till.',
    'Du har inte sparat något verk ännu. När du hittar ett verk du tycker om kan du spara det här.':'Inga sparade verk ännu.',
    'Fortsätt genom rummet.':'Fortsätt utforska.',
    'Exempeltext om papper, färgåtergivning och noggrann produktion.':'Papper och färgåtergivning.',
    'Exempeltext om numrerade upplagor och verkets livslängd.':'Numrerade upplagor.',
    'Storlekar, inramning, leverans och skötsel fylls i här senare.':'Storlekar, inramning och leverans.'
  };
  function cleanCopy(){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){let value=node.nodeValue;for(const [from,to] of Object.entries(copy))value=value.replaceAll(from,to);if(value!==node.nodeValue)node.nodeValue=value;}}
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
    cleanCopy();
  }
  window.addEventListener('hashchange',()=>setTimeout(refresh,0));
  new MutationObserver(refresh).observe(document.body,{childList:true,subtree:true});
  refresh();
})();
