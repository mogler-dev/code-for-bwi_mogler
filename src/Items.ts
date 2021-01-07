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
import * as data from './hardware.json';

export class Item {
    private name: string;
    private amount: number;
    private weight: number;
    private useValue: number;

    /**
     *
     */
    constructor(name: string, amount: number, weight: number, useValue: number) {
        this.name = name;
        this.amount = amount;
        this.weight = weight;
        this.useValue = useValue;
    }

    getName = () => this.name;
    getAmount = () => this.amount;
    getWeight = () => this.weight;
    getUseValue = () => this.useValue;

    getSumUseValue = () => this.useValue * this.amount;
    getSumWeight = () => this.weight * this.amount;

    toString = () => `${this.getName()}\t${this.getAmount()}\t${this.getWeight()}\t${this.getUseValue()}\t${this.getSumUseValue()}`;

    split(getAmount: number) {
        this.amount -= getAmount;
        return new Item(this.name, getAmount, this.weight, this.useValue);
    }
}

export class CargoShip {
    private driverWeight: number;
    private capacity: number;

    private inventory: Item[] = [];

    /**
     *
     */
    constructor(driverWeight: number, capacity: number) {
        this.driverWeight = driverWeight;
        this.capacity = capacity;
    }

    getDriverWeight = () => this.driverWeight;
    getCapacity = () => this.capacity - this.driverWeight;
    getInventory = () => this.inventory;

    getItem = (index: number) => this.inventory[index];

    getSumUseValue = () => {
        let res = 0;
        this.inventory.forEach((item) => res += item.getSumUseValue());
        return res;
    }

    getRestCapacity = () => {
        let res = this.getCapacity();
        this.inventory.forEach((item) => res -= item.getSumWeight());
        return res;
    }

    addItem = (addItem: Item, amount: number) => this.inventory.push(addItem.split(amount));

    fill = (items: Item[]) => fillCargoShip(items, this);

    toString = () => `Kapazität mit Fahrer: ${this.getCapacity() / 1000} kg; \taktueller Nutzwert: ${this.getSumUseValue()} NW; \tRest Kapazität: ${this.getRestCapacity() / 1000} kg;`;

}

export interface ILoadItem {
    payloadPercent: number;
    payload: number;
    amount: number;
    weightQuantity: number;

    restSpace: number;
    restUseValue: number;

    sumUseValue: number;
}

/**
 * Begin vom Alg. Funktion
 */

const evalLoadItems = (item: Item, beforeLoadItem: ILoadItem) => {

    let itemSumUseValue = item.getSumUseValue()

    let payloadPercent      = itemSumUseValue / beforeLoadItem.restUseValue;
    let payload             = payloadPercent * beforeLoadItem.restSpace;
    let amount              = Math.floor(payload / item.getWeight());
    let weightQuantity      = amount * item.getWeight();
    let restSpace           = beforeLoadItem.restSpace - weightQuantity;
    let restUseValue        = beforeLoadItem.restUseValue - itemSumUseValue;

    let loadItem: ILoadItem = {
        payloadPercent,
        payload,
        amount,
        weightQuantity,
        restSpace,
        restUseValue,
        sumUseValue: amount * item.getUseValue()
    };

    return loadItem;
}

export const fillCargoShip = (items: Item[], cargoShip: CargoShip) => {
    let restUseValue = 0;
    let restSpace = cargoShip.getCapacity();

    items.forEach((item, index) => {
        restUseValue += item.getSumUseValue();
    });

    let lastLoadItem: ILoadItem = {
        payloadPercent : 0,
        payload : 0,
        amount : 0,
        weightQuantity : 0,
        sumUseValue : 0,

        restUseValue,
        restSpace,
    }

    let sumUseValue = 0;

    items.forEach((item, index) => {
        let loadItem = evalLoadItems(item, lastLoadItem);

        cargoShip.addItem(item, loadItem.amount);

        lastLoadItem = loadItem;
    });
}

/**
 * Ende vom Alg. Funktion
 */

export const getData = () : Item[] => {
    try {
        const res : Item[] = [];
        data.forEach((obj, i) => res.push(new Item(obj["name"], obj["amount"], obj["weight"], obj["useValue"])));
        res.sort((a, b) => {
            return (a.getSumUseValue() - b.getSumUseValue()) * -1;
        });
        return res;
    }
    catch(ex){
        console.log(`Error reading file from disk: ${ex}`);
    }
    return [];
}