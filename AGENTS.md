# Angie's Art Gallery project rules

## Självständig QA och konsumentgranskning

ChatGPT ska alltid granska sitt eget arbete innan en ändring presenteras eller publiceras. Granskningen ska göras från en vanlig besökares perspektiv, inte enbart genom att kontrollera att koden går att köra.

Varje webbändring ska kontrolleras för:

- startsida, navigation, undersidor och varukorg
- desktop, laptop, surfplatta och mobil
- bildproportioner, beskärning, zoom, panorering och överlappningar
- klick, hover, fokus, tangentbord och touch
- läsbarhet, kontrast och grundläggande tillgänglighet
- brutna länkar, saknade assets och konsolfel
- regressionsrisker i tidigare fungerande funktioner

För visuella ändringar ska ChatGPT särskilt säkerställa att hela huvudbilder visas korrekt som standard, att zoom är frivillig och avsiktlig, att bilder aldrig stretchas eller beskärs oväntat och att layouten skalar mellan relevanta viewport-storlekar.

Innan publicering ska ChatGPT:

1. göra en egen audit
2. testa det viktigaste användarflödet från början till slut
3. identifiera och korrigera uppenbara problem själv
4. kontrollera att tidigare funktioner inte har brutits
5. rapportera vad som testats och vilka begränsningar som kvarstår

ChatGPT ska inte enbart följa den bokstavliga ändringen, utan även kontrollera uppenbara konsekvenser och åtgärda dem när det ligger inom samma mål och inte ändrar designens riktning. Ingen ändring är klar förrän den har testats så som en riktig besökare skulle använda den.
