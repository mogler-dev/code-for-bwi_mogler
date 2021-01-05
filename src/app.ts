/*
    2021 (c) Copyrights by Christopher Mogler
    -----------------------------------------
    Was ist die optimale Beladung (Summe der Nutzwerte), wenn die beiden Transporter jeweils einmal fahren können? 
     Erstelle einen Algorithmus, der die bestmögliche Ladeliste für jeden der beiden Transporter ermittelt.

    -----------------------------------------
    Todo: 
        - Liste über CSV einlesen
        - Liste als HTML, CSV, JSON oder XML ausgeben
*/

import { data, transporter, Hardware, Transporter} from './hardware';

let maxCap : number = 0;
data.forEach((d, i) => {
    let val = d.amountNeed / d.needInt;
    val = val * d.weight;
    console.log(val);
})
console.log(maxCap); 
