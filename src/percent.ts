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

import { data, transporter, Hardware, Transporter} from './hardware'; 

const collection: Hardware[] = data.sort((item, nextItem) => {
    return nextItem.useValue - item.useValue;
});

let sumuseValue = 0, useValue = 0;
let countItems = 0;
let sumWeight = 0;

collection.forEach((d, i) => {
    sumuseValue += d.useValue * d.orderQuantity;
    useValue += d.useValue;
    countItems += d.orderQuantity;
    sumWeight += d.weight;
});

let usedNeedInt = 0;

/**
 * Hier wird der einzelne Transporter verarbeitet. 
 * @param tra aktueller Transporter, der "Beladen" werden soll.
 * @param index aktuller Index in der "for"-Schleife, vom Transporter-Array
 */
const spreadTransport = (tra: Transporter, index: number) => {
    console.log("\r\nTransporter ", index + 1);
    
    tra.filledCapacity = 0;
    collection.forEach((item, i) => collectItems(item, tra, i));

    console.log("Max. Cap:", tra.maxCapacity / 1000, "\tSum. Cap:", tra.filledCapacity / 1000, "\tFree Cap:", (tra.maxCapacity - tra.filledCapacity) / 1000);
}

/**
 * Hier ist der eigentliche Alg. der die Hardware zu den Transportern verteillt.
 * @param item Hardware die aufgeteilt werden soll
 * @param tra Transporter der "Beladen" wird 
 * @param index Index im Array der ausgewählten Hardware
 */
const collectItems = (item: Hardware, tra: Transporter, index: number) => {
    let pro = (item.useValue * item.orderQuantity) / sumuseValue; // Prozentualen Anteil der Summe vom Nutzwert
    let use = Math.floor(pro * tra.maxCapacity);

    let amount = Math.floor(use / item.weight);
    console.log(use / 1000, amount, item.weight / 1000)

    console.log(item.orderQuantity, "\t- ", amount, "\t= ", item.orderQuantity - amount, "\t", item.name);

    tra.filledCapacity += amount * item.weight; 
    usedNeedInt += amount * item.useValue;    
    item.orderQuantity -= amount;
}

console.log("d.orderQuantity \t amount \t d.orderQuantity - amount \t d.name");

transporter.forEach(spreadTransport);

console.log("\r\nMax. Nutzwert:", sumuseValue, "\tSum. Nutzwert:", usedNeedInt, "\t", (usedNeedInt / sumuseValue * 100).toFixed(2), "%");
