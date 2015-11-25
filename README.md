# CPU500x
CPU500x manual

Handige linkjes:

* [Introductie competitie](https://github.com/Lucrasoft/CPU500x/blob/master/INTRO.md)
* [Online simulator](http://lucrasoft.github.io/CPU500x/)
* [Overige opmerkingen](https://github.com/Lucrasoft/CPU500x/blob/master/OVERIGE.md)



Instructie handleiding voor de Lucrasoft CPU500x processor.
===========================================================

Er zijn twee processoren
* 5006CPU-8  : 8 registers 
* 5006CPU-32 : 32 registers

Algemene werking
----------------

Elk register van de CPU kan in een bepaalde toestand verkeren, anders gezegd een bepaalde waarde bevatten. Er zijn 27 toestanden van een register, te weten : een SPATIE en de letters A..Z. 
In deze volgorde worden ze ook doorlopen.

Bij initialisatie van de CPU staat elk register op een SPATIE ingesteld.

De CPU kan maar 1 register actief benaderen.
Met de instructies `nextRegister` en `prevRegister` kan je een ander register selecteren.

De toestand/waarde van het huidige register kan aangepast worden met de instructies: `nextChar` en `prevChar`

Voorbeeld
---------

(vanuit initialisatie toestand waarin elk register op SPATIE staat) 

* Om de letter A in het huidige register te krijgen , geef je eenmaal het `nextChar` commando.
* Om de letter Z in het huidige register te krijgen , geef je 26x het `nextChar`, of je geeft 1x `prevChar` commando.

Circulair
---------

De register-toestanden zijn dus circulair van opzet. Ook de selectie van het huidige register is circulair.


De CPU kent maar 5 basis instructies en 1 advanced instructie

| Machine code | Code         | Uitleg
|--------------|--------------|--------------------
| >            | nextRegister | volgend register actief maken
| < 	         | prevRegister | vorig register actief maken
| +            | nextChar     | volgend karakter op huidig register
| -            | prevChar     | vorig karakter op huidig register 
| O            | outputChar   | zet huidig karakter van huidig register op de IO


Advanced instruction
--------------------

In een recent persbericht gaf de Head of the Research Department van Lucrasoft (LSFT) aan dat deze krachtige instructie wat 'ervaring' vereist en pas later vrijgegeven wordt. Een woordvoerder van het InsideJoke magazine zei hierover :

> Voor menig partij zijn we een baken tijdens het navigeren in deze wereld en verdienen we werkelijk waar een lintje door ons besluit om deze instructie voorlopig nog aan banden te leggen.



Voorbeeld machine code
----------------------

Gevraagde output:
```
     "C"
```

Machinetaal      
```
     +++O
```

Uitleg:

-    : huidig register staat op SPATIE geinitialiseerd.
- `+++` : maakt van huidige register een C
- `O`   : plaats waarde van huidige register op de output

		   
Gevraagde output 
```
"ABBA"
```
Machinetaal     
```
+O>++OO<O
```

Uitleg

- huidig register staat op SPATIE geinitialiseerd.
- `+` maakt van huidige register een A
-`O` plaats waarde van huidige register op de output
- `>` schuif een register op , deze staat nog op SPATIE
- `++` maakt van huidige register een B 
- `OO` plaats 2x het huidige register op de OUTPUT
- `<` ga terug naar het vorige register (die nog op de A stond)
- `O` plaats de A op de output

Er is van "ABBA" ook een kortere variant overigens : `+O+OO-O`



SIMULATOR
---------
Er is een Simulator voor beide CPU's beschikbaar.

Het verschil tussen de registers is goed te zien bij een voorbeeld zoals bij:

`+O>+O>+O>+O>+O>+O>+O>+O>+O>+O>`

Op de 8 register CPU  : 'AAAAAAAABB'

Op de 32 register CPU : 'AAAAAAAAAA'


Optimaliseer de code
--------------------

Schrijf een programma wat het woord "CODE" afdrukt:

`+++O>+++++++++++++++O>++++O>+++++O`

- Voor elke letter een apart register

Maar dit kan natuurlijk korter door de "D" en "E" niet op een apart register in te stellen, 
maar terug naar het eerste register te gaan:

`+++O>+++++++++++++++O<+O+O`

En dat kan nog korter doordat het karakter "O" vanuit de SPATIE, via de Z dus naar beneden toe, sneller te benaderen is.

`+++O>------------O<+O+O`

