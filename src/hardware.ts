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
    amountNeed: number,
    /** Gewicht (mit Verpackung und Zubehör), in g */
    weight: number,
    /** Nutzwert je Hardware-Einheit (hoch=besser) */ 
    needInt: number
};

/** Liste der benötigten Hardware mit Kapazitäten und Nutzwerte */
export const data: Hardware[] = [
    {
        name: "Notebook Büro 13\"",
        amountNeed: 205,
        weight: 2451,
        needInt: 40
    },
    {
        name: "Notebook Büro 14\"",
        amountNeed: 420,
        weight: 2978,
        needInt: 35
    },
    {
        name: "Notebook outdoor",
        amountNeed: 450,
        weight: 3625,
        needInt: 80
    },
    {
        name: "Mobiltelefon Büro",
        amountNeed: 60,
        weight: 717,
        needInt: 30
    },
    {
        name: "Mobiltelefon Outdoor",
        amountNeed: 157,
        weight: 988,
        needInt: 60
    },
    {
        name: "Mobiltelefon Heavy Duty",
        amountNeed: 220,
        weight: 1220,
        needInt: 65
    },
    {
        name: "Tablet Büro klein",
        amountNeed: 620,
        weight: 1405,
        needInt: 40
    },
    {
        name: "Tablet Büro groß",
        amountNeed: 250,
        weight: 1455,
        needInt: 40
    },
    {
        name: "Tablet outdoor klein",
        amountNeed: 540,
        weight: 1690,
        needInt: 45
    },
    {
        name: "Tablet outdoor groß",
        amountNeed: 370,
        weight: 1980,
        needInt: 68
    }
];

export type Transporter = {
    driverWeight: number,
    maxCapacity: number
};

export const transporter : Transporter[] = [
    {
        driverWeight: 85.7 * 1000,
        maxCapacity: 1100 * 1000
    },
    {
        driverWeight: 72.4 * 1000,
        maxCapacity: 1100 * 1000
    }
]