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
import * as express from 'express';
import * as fs from 'fs'
import { getData, CargoShip, Item } from './Items';

const app = express();

const router = express.Router();
const api = express.Router();

const getIndex = (req, res) => {
    try{
        let f = req.originalUrl;
        let html, path = "./src/public";

        if(f !== "/" && fs.existsSync(path + f)){
            html = fs.readFileSync(path + f, "utf-8");
        }else{
            html = fs.readFileSync("./src/public/index.html", "utf-8");
        }

        res.end(html);
    }
    catch(err){
        res.status(404);
        res.end(err.message);
    }
}

const getHardware = (res) => {
    try{
        let hardware = fs.readFileSync("./src/hardware.json", "utf-8");
        res.json(JSON.parse(hardware));
        res.end();
    }
    catch(err){
        res.status(404);
        res.end(err.message);
    }
}

const cargoShips: CargoShip[] = [
    new CargoShip(72.4 * 1000, 1100 * 1000),
    new CargoShip(85.7 * 1000, 1100 * 1000)    
];

const getTransporter = (req, res) => {
    res.json(cargoShips);
    res.end();
}

const getTransportList = (req, res) => {
    const stock: Item[] = getData();
    if(stock.length < 1){
        res.status(404);
        res.json({msg: "Error: Can evaulate empty data!"});
        res.end();
        return -1;
    }
    
    cargoShips.forEach((cargo, i) =>{
        cargo.fill(stock)
    });
    try{
        fs.writeFileSync('solution.json', JSON.stringify(cargoShips));
    }
    catch(ex){
        console.log(ex);
    }

    res.json(cargoShips);
    res.end();
}

router.use((req, res, next) => {
    if(req.originalUrl.split('/').filter((v) => v === "api").length > 0){
        next();
    }else{
        getIndex(req, res);
    }
});

api.get("/stock", (req, res) => getHardware(res));
api.get("/shipping", (req, res) => getTransportList(req, res));
api.get("/transporter", (req, res) => getTransporter(req, res));

app.use("*", router);
app.use("/api/", api);

let server = null;

export const start_server = (port: number = 3000) => {
    server = app.listen(port, () => {
        let host = server.address() .address;
        let port = server.address() .port;
        console.log("Server is now listening ", host, ":", port);
    });
    return server;
}
