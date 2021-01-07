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
    ------------------------------------------
    - Sortiere die Liste nach "Nutzerwert" (absteigend) und "Menge" (absteigend)
    - 
*/


import { getData, CargoShip, Item } from './Items';

const main = () => {
    const cargoShips: CargoShip[] = [
        new CargoShip(72.4 * 1000, 1100 * 1000),
        new CargoShip(85.7 * 1000, 1100 * 1000)    
    ];
    
    const stock: Item[] = getData();
    if(stock.length < 1){
        console.log("Error: Can evaulate empty data!");
        return -1;
    }

    console.log("Start");
    stock.forEach(d => console.log(d.toString()));
    
    cargoShips.forEach((cargo, i) =>{
        console.log("Cargo " + (i+1))
        cargo.fill(stock)
        cargo.getInventory().forEach(i => console.log(i.toString()));
        console.log(cargo.toString());
    });
    
    console.log("Rest");
    stock.forEach(d => console.log(d.toString()));

    return 1;
}

main();