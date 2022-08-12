import React, {Component} from "react";
import HoldingBay from "./components/HoldingBay";
import StorageContainer from "./components/StorageContainer";
import "./Game.css"
import TradingZone from "./components/TradingZone";
import itemFunctions from "./items/items";

class ObjectSet extends Set{
    add(elem){
        return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
    has(elem){
        return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
    }
}

class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);


        this.state = {
            cargoStorage: this.getRandomPopulatedCargoStorage(7),
            secureStorage: [
                {
                    UUID: "1234567890",
                    item: {
                        name: "Rusty Pen",
                        width: 1,
                        height: 2,
                        description: "It is a pen...",
                        value: 10,
                        itemID: "TEMP ITEM ID",
                    },
                    pos: [2,2]
                }
            ],
            holdingBayStorage: [

            ],
        }
    }

    // Populates the cargo storage with 5 random items.
    getRandomPopulatedCargoStorage = (sizeOfContainer, itemRarity, numOfItems) => {
        // todo make it account for rarity and num of items
        // do-while loop populating until valid
        let potentialStorage;
        do {
            // Get initial 5 random items
            let randomItems = itemFunctions.getNRandomCommonItems(5);
            potentialStorage = [];
            // give every item a random coord
            for (let item of randomItems) {
                let object = {
                    UUID: crypto.randomUUID(),
                    item: {...item},
                    pos: this.getRandomCoord(sizeOfContainer),
                };
                potentialStorage.push(object)
            }
        } while (!this.isStorageValid(potentialStorage, sizeOfContainer));

        return potentialStorage
    }

    getItemIDFromUUID = (UUID) => {
        for (let object of this.state.cargoStorage) {
            if (object.UUID === UUID) {
                // todo also add orientation
                return object.item.itemID
            }
        }

        for (let object of this.state.secureStorage) {
            if (object.UUID === UUID) {
                // todo also add orientation
                return object.item.itemID
            }
        }

        return ("ERROR - NO ITEM FOUND WITH UUID: " + UUID)
    }

    getRandomCoord = (range) => {
        return [Math.floor(Math.random()*range), Math.floor(Math.random()*range)]
    }

    // Takes an array that represents a storage container, and returns whether it is a valid possible formation
    isStorageValid = (containerArray, size) => {
        let cellsArray = []
        let occupiedCells = new ObjectSet();
        for (let object of containerArray) {
            let cellsForCurrentObject = this.getCellsOfObject(object);
            for (let cell of cellsForCurrentObject) {
                if (occupiedCells.has(cell)) {
                    console.log("Population failed : regenerating cargo...")
                    return false;
                } else {
                    occupiedCells.add(cell);
                    cellsArray.push(cell)
                }
            }
        }

        // check all cells are in correct range
        for (let coord of cellsArray) {
            if (!(coord[0] < size) || !(coord[1] < size)) {
                return false;
            }
        }
        return true;
    }

    // Checks whether a coordinate appears in a given array
    isCoordInArray = (coord, array) => {

        for (let cell of array) {
            if (this.areCoordsEqual(cell, coord)) {
                return true;
            }
        }
        return false;
    }

    // Compares two since co-ordinates and determines if they are equal or not (since built-in arrays will not compare
    // by value properly)
    areCoordsEqual = (coord1, coord2) => {
        if (coord1.length !== coord2.length) {
            console.log("ONE OR MORE VALUES ARE NOT LENGTH 2 ARRAYS!!")
            return false;
        }
        for (let i = 0; i < coord1.length; i++) {
            if (coord1[i] !== coord2[i]) {
                return false;
            }
        }
        return true;
    }

    getCellsOfObject = (object) => {
        let width = object.item.width;
        let height = object.item.height;
        let cells = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let coord = [x+object.pos[0], y+object.pos[1]]
                cells.push(coord)
            }
        }

        return cells;
    }

    handleDragStart = (ev) => {
        //console.log("GAME RECEIVED: " + ev.dataTransfer.getData("UUID"))
    }

    handleDragDrop = (ev) => {
        console.log("DROPPED: ")
        console.log(ev)
        // todo process placing item (if possible)

        console.log("dragged item UUID: " + ev.dataTransfer.getData("UUID"))
        console.log("dragged item ID: " + this.getItemIDFromUUID(ev.dataTransfer.getData("UUID")))
        console.log("dragged item pos: " + ev.target.id)
    }

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay
                    holdingBayStorage={this.state.holdingBayStorage}
                />
                <StorageContainer
                    cargoStorage={this.state.cargoStorage}
                    secureStorage={this.state.secureStorage}
                    getCellsOfObject={this.getCellsOfObject}
                    areCoordsEqual={this.areCoordsEqual}
                    isCoordInArray={this.isCoordInArray}
                    handleDragStart={this.handleDragStart}
                    handleDragDrop={this.handleDragDrop}
                />
            </div>
        )
    }
}

export default Game;