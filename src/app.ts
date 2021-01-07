
/*
    Copyright (C) 2021 Christopher Rudolf Karl-Heinz Mogler

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
/**
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
