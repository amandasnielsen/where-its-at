# Where it's @!

- Amanda Strand Nielsen
- Examination i React

## Bibliotek

De bibliotek jag har använt mig av är:

- React-confetti 🎉 - för jag har aldrig varit på konsert där det inte funnits confettikanoner! Väldigt smidigt att använda. Man kör en "npm install react-confetti" och sedan importerar in detta på sidan du vill ha det. Där kan jag även justera width, height, hur många confetti-bitar och även hur många sekunder jag vill ha confettin. Jag skrev att den ska anspassa sig till fönster-storleken man har, och den är dynamisk.

- UUID 💯 - en smidigt sätt att generera unika biljettnummer via ett bibliotek, istället för att skriva en funktion varje gång jag vill generera ett unikt nummer. Samt att denna är väldigt enkel att anpassa i koden. Denna installation fungerar likadant som confettin, man kör en "npm install uuid" och importerar på sidan / komponenten där det ska användas. Denna var också lätt att anpassa. Jag vill ha 5 tecken och bara stora bokstäver, så jag gjorde såhär: "{uuid.slice(0, 5).toUpperCase()}".

- Framer Motion 🕺 - det är alltid trevligt för ögat när saker och ting liksom "slidar" in i bild. Därför använder jag framer motion för en snygg motion för mina EventCards och för mina Tickets. Även detta smidig att använda. "npm install framer-motion" och importera till din sida / komponent. Sedan la jag in "motion" i min div, och justerade vad jag ville att den ska göra. Som exempelvis transition (ease-in eller ease-out) och animering. Det fanns väldigt mycket olika sätt att använda framer motion. Men eftersom detta var en relativt liten app, så kände jag att det blev lite begränsat, eftersom jag inte har massa grejer runtomkring. Men skulle vara kul att använda i framtida applikationer också!

## Figma

https://www.figma.com/board/fX9Ou1W6xMCLdQxaqMuCGx/Where-it-s--?node-id=0-1&t=8xr0HoGDjAiD34ZI-1