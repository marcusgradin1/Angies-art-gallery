# Angie's Art Gallery — UX-roadmap och jämförelse

Datum: 2026-09-16

## Samlad bedömning

Sajten har redan en tydlig identitet: en lugn redaktionell gallerikänsla, stark typografi, asymmetrisk komposition och en produktvy med tre bildlägen samt fullscreen-visning. Den är mer personlig än en vanlig mall.

Den största begränsningen är inte formen utan att prototypen fortfarande saknar riktiga verkdata. När riktiga bilder och produktuppgifter finns behöver vi framför allt bygga förtroende och hjälpa besökaren från inspiration till ett tryggt köp.

## Vad etablerade aktörer gör bra

### Artsy

- Gör sökningen bred: konstnär, galleri, stil, tema och taggar.
- Hjälper besökaren att börja på flera sätt: pris, medium, rum, stämning och kuraterade urval.
- Kopplar ihop verk med redaktionellt innehåll, utställningar, gallerier och konstnärer.

### Saatchi Art

- Visar material, mått, pris och konstnär nära varje verk.
- Bygger köpförtroende med recensioner, returer, fraktinformation och konstvägledning.
- Har tydliga vägar för nyheter, prints, motivtyper, prisnivåer och kuraterade teman.

### The Poster Club

- Har stark filtrering på storlek, orientering, färg, kategori, konstnär och produkttyp.
- Visar produkt- och livsstilsbilder som separata sätt att bedöma verket.
- Hjälper kunden att köpa en hel vägg genom art-wall-funktioner, rumskategorier och färg/stil.
- Använder kollektioner, konstnärsberättelser och guider för att ge sortimentet sammanhang.

## Prioriterad utvecklingsplan

### P0 — måste fungera före riktig lansering

1. Ersätt placeholders med riktiga verkbilder och riktiga produktdata.
2. Ge varje produkt minst fyra tydliga bildroller: helbild, detalj, miljöbild och material/närbild. De tre vyerna får inte bara återanvända samma bild.
3. Lägg in pris eller tydlig förhandsinformation, material, mått, format, upplaga, leveranstid och status.
4. Behåll fungerande zoom och panorering på desktop och mobil. Visa tydligt att bilden går att zooma och dra.
5. Kontrollera samtliga köpsteg: val av format, val av storlek, lägg i varukorg, ändra/ta bort och återkoppling efter klick.
6. Genomför en responsiv QA på 320, 375, 768, 1024, 1440 och bred laptop. Kontrollera särskilt header, hero, produktbild, textbrytning och varukorg.

### P1 — störst förbättring för användarupplevelsen

1. Lägg till synliga bildminiatyrer med motiv, inte bara små prickar eller textetiketter.
2. Lägg till föregående/nästa verk direkt från produkt- och fullscreen-vyn.
3. Utveckla söket så att det hittar verk, kollektioner, format, färger och konstnärliga teman.
4. Lägg till filter på verkssidan: kollektion, färg, orientering, format, storlek och pris.
5. Skapa “Se verket i ett rum” när riktiga miljöbilder finns.
6. Lägg till en enkel önskelista eller “spara verk” utan att störa varukorgen.
7. Lägg till tydliga köptrygghetssektioner: papper, tryckprocess, emballage, frakt, retur och äkthetsbevis.
8. Lägg till en diskret “Nyligen visade” eller “Fler verk i samma riktning”-funktion.

### P2 — differentiering och inspiration

1. Kuraterade ingångar: “Lugn”, “Rörelse”, “Färg”, “För små rum”, “För stora väggar”.
2. Enkel väggvisning där kunden kan prova ett verk mot olika neutrala väggar och storlekar.
3. Kollektioner med en kort berättelse, färgpalett och rekommenderade verk.
4. Ateljéjournal med processbilder, korta anteckningar och materialval.
5. Konstnärsprofil med bakgrund, arbetsmetod och relationen mellan verk.
6. Editorial/inspirationsdel med guider: välja storlek, skapa en tavelvägg och ta hand om Fine Art Prints.

## Tidigare idéer som ska behållas

- Tydlig skillnad mellan Galleri, Kollektioner, Prints, Ateljé och Konstverk.
- Galleri som kuraterad upplevelse, Konstverk som katalog och Kollektioner som tematiska berättelser.
- Prints-sidan ska förklara papper, färgåtergivning, storlekar, inramning, leverans och skötsel.
- Headern ska förbli tydlig och stabil, med konsekventa storlekar, spacing och fokus på varumärket.
- Handmotiven ska ligga som diskreta dekorationer i headerområdet och aldrig hamna under innehållet.
- Bildvisningen ska låta användaren se hela bilden, zooma, panorera fritt och återställa vyn.
- Sök och varukorg ska vara tydliga, konsekventa och visuellt lika viktiga som resten av headern.
- Sajten ska prioritera lugn, premiumkänsla, tunna linjer och mjuk kontrast utan att bli svår att använda.
- Inga analytics-, tracking- eller betalningstjänster läggs till utan separat beslut.

## Nuvarande styrkor

- Egen visuell riktning i stället för generisk e-handelsmall.
- Bra redaktionell typografi och tydlig användning av whitespace.
- Produktsidan har redan tre vyer, fullscreen-visning, zoom och panorering.
- Lokal varukorg, tydliga fokuslägen, skip-link och grundläggande ARIA-stöd finns.
- Navigationen har separata roller och sajten fungerar som en sammanhängande prototyp.

## Nuvarande svagheter att följa upp

- Placeholder-verk, generiska titlar och “pris fastställs senare” sänker köpberedskapen.
- Sökningen är ännu enkel och filtreringen saknas.
- Produktens tre vyer använder i nuläget samma placeholder-källa; riktiga bildroller måste kopplas separat.
- Hash-baserade routes är bra för prototypen men bör senare ersättas eller kompletteras med indexerbara produktsidor.
- SEO, produktmetadata och sociala delningsbilder behöver bli unika per verk när katalogen är verklig.
- Alt-texter måste beskriva det riktiga verket, inte bara ange att bilden är tillfällig.

## Beslutsregel framåt

Varje ny funktion ska klara minst en av tre frågor: hjälper den användaren att hitta rätt verk, förstå vad som köps eller känna sig trygg att slutföra köpet? Om inte väntar den.

## Källor

- Artsy: https://www.artsy.net/
- Saatchi Art: https://www.saatchiart.com/
- The Poster Club: https://theposterclub.com/
- Baymard om bildgallerier och thumbnails: https://baymard.com/learn/page-control-ui
- Baymard om upplösning och zoom: https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
