
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

const collection: Hardware[] = data.sort((item, nextItem) => {
    return nextItem.useValue - item.useValue;
});

/*
    Maximale Menge bei 1100 Kg von jeder Hardware
*/
let sumNeedValue = 0;

collection.forEach((item, ix) => {
    sumNeedValue += item.useValue * item.orderQuantity;
});

transporter.forEach((tra, iT) => {
    console.log("\r\nTransporter ", iT + 1);
    let sumCap = 0;
    let itemCount = 0;

    collection.forEach((item, ix) => {
        let max = Math.floor(tra.maxCapacity / item.weight);
        let pro = item.useValue * (item.orderQuantity - (item.receivedQuantity ?? 0)) / sumNeedValue; // Prozentualen Anteil der Summe vom Nutzwert
        let use = Math.floor(pro * tra.maxCapacity);

        let amount = Math.floor(use / item.weight);

        console.log(item.name, 
            item.name.length < 23 ? "\t" : "", 
            max, "\t",
            pro.toFixed(2), "\t",
            amount, "\t",
            amount * item.weight / 1000, "\t",
        );

        sumCap += amount * item.weight;
        itemCount += amount;
        item.receivedQuantity = amount;
    });
    console.log(tra.maxCapacity / 1000, "\t", sumCap / 1000, "\t", itemCount);
});
