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

export type Hardware = {
    /** Hardware Bezeichnung */
    name: string,
    /** benötigte Anzahl Einheiten in Bonn */
    orderQuantity: number,
    /** Gewicht (mit Verpackung und Zubehör), in g */
    weight: number,
    /** Nutzwert je Hardware-Einheit (hoch=besser) */ 
    useValue: number,
    /** Schon versendet (wenn nichts versendet wurde ist der Wert => undefined) */
    receivedQuantity?: number, 
};

/** Liste der benötigten Hardware mit Kapazitäten und Nutzwerte */
export const data: Hardware[] = [
    {
        name: "Notebook Büro 13\"",
        orderQuantity: 205,
        weight: 2451,
        useValue: 40
    },
    {
        name: "Notebook Büro 14\"",
        orderQuantity: 420,
        weight: 2978,
        useValue: 35
    },
    {
        name: "Notebook outdoor",
        orderQuantity: 450,
        weight: 3625,
        useValue: 80
    },
    {
        name: "Mobiltelefon Büro",
        orderQuantity: 60,
        weight: 717,
        useValue: 30
    },
    {
        name: "Mobiltelefon Outdoor",
        orderQuantity: 157,
        weight: 988,
        useValue: 60
    },
    {
        name: "Mobiltelefon Heavy Duty",
        orderQuantity: 220,
        weight: 1220,
        useValue: 65
    },
    {
        name: "Tablet Büro klein",
        orderQuantity: 620,
        weight: 1405,
        useValue: 40
    },
    {
        name: "Tablet Büro groß",
        orderQuantity: 250,
        weight: 1455,
        useValue: 40
    },
    {
        name: "Tablet outdoor klein",
        orderQuantity: 540,
        weight: 1690,
        useValue: 45
    },
    {
        name: "Tablet outdoor groß",
        orderQuantity: 370,
        weight: 1980,
        useValue: 68
    }
];

export type Transporter = {
    driverWeight: number,
    maxCapacity: number,
    filledCapacity?: number;
};

export const transporter : Transporter[] = [
    {
        driverWeight: 85.7 * 1000,
        maxCapacity: 1100 * 1000 - 85.7 * 1000
    },
    {
        driverWeight: 72.4 * 1000,
        maxCapacity: 1100 * 1000 - 72.4 * 1000
    }
]