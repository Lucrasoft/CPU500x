Code competitie
===============

Beste lezer, ook dit jaar wil Lucrasoft je graag uitnodigen om mee te doen aan een code competitie. 


Introductie
-----------

Jaren na Intel's eerste 4004 processor, komt Lucrasoft ook met een processor en wel de 5006CPU.
Deze processor komt met maar liefst 5 basis instructies en 1 geavanceerde instructie.
En, hij is ook nog eens beschikbaar in 2 varianten! Special voor de kerstdagen. Ontdek hem snel!

* 5006CPU-8  : met 8 registers 
* 5006CPU-32 : met 32 registers

Maar laat je vooral niet byten door de 8 en 32 registers..

Wat is de bedoeling
-------------------

De CPU is wat beperkt in zijn mogelijkheden , maar is met name geschikt om karakters op zijn IO port te genereren. Hij dient natuurlijk alleen wel geprogrammeerd te worden.
Het doel is dan ook om, in de 'machinetaal' van deze CPU, een programma te schrijven en wel zodanig dat deze een gevraagde tekst op de IO laat zien. 

Je moet dus een gevraagde tekst geautomatiseerd omzetten naar machinetaal code, een soort compiler. 

Het wedstrijd element hier van is dat je machinetaal programma zo klein mogelijk moet zijn!

De instuctieset van de CPU, handleiding en een processor simulator, zijn te vinden op Github.

[CPU500x manual](https://github.com/lucrasoft/cpu500x)



## Regels

Tijdens de presentatie word je compiler geconfronteerd met een x aantal teksten. 

De teksten zijn dan minimaal 256 en maximaal 1024 karakters lang.

Je programma mag niet langer dan een minuut bezig zijn op 1 tekst. 

We voeren je programma op de CPU Simulator uit , om te zien of het gevraagde ook terug komt.
[Online CPU500x simulator](http://lucrasoft.github.io/CPU500x/)


## Competitie


Uiteraard kan je weer op verschillende manieren meedoen ;)

### Math

Weet jij echt de kleinste code te genereren voor de gevraagde teksten?
Zie ook de bonus opdracht!

### Nerd

Kan jij deze CPU in het echt bouwen, van LEGO, of in Verilog?
Of komen er 8 Rasperry Pi's per register op tafel?
Bouw jij je compiler en simulator in Haskell of Python of PowerShell?
Verras een ieder!


### Graphics

De huidige simulator is natuurlijk een presentatie van niks.
Dat kan mooier, cooler, gaver, beter. 


### Math - Bonus

Laat de engineer eens los. Als je zelf 1 extra single-cycle instructie zou mogen verzinnen, die de programma's korter maakt. Welke zou dat zijn? Hoeveel korter word het dan?
