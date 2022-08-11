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
            cargoStorage: this.getRandomPopulatedCargoStorage(),
            secureStorage: [

            ],
            holdingBayStorage: [

            ],
        }
    }

    // Populates the cargo storage with 5 random items.
    getRandomPopulatedCargoStorage = () => {
        // Get initial 5 random items
        let randomItems = itemFunctions.getNRandomCommonItems(5);

        // do-while loop populating until valid
        let potentialStorage;
        do {
            potentialStorage = [];
            // give every item a random coord
            for (let item of randomItems) {
                let object = {
                    UUID: crypto.randomUUID(),
                    item: {...item},
                    pos: this.getRandomCoord(7),
                };
                potentialStorage.push(object)
            }
        } while (!this.isStorageValid(potentialStorage, 7));

        return potentialStorage
    }

    getRandomCoord = (range) => {
        return [Math.floor(Math.random()*range), Math.floor(Math.random()*range)]
    }

    // Takes an array that represents a storage container, and returns whether it is a valid possible formation
    isStorageValid = (containerArray, size) => {
        let occupiedCells = new ObjectSet();
        for (let object of containerArray) {
            let cellsForCurrentObject = this.getCellsOfObject(object);
            for (let cell of cellsForCurrentObject) {
                if (occupiedCells.has(cell)) {
                    console.log("RETURNING FALSE...")
                    return false;
                } else {
                    occupiedCells.add(cell);
                }
            }
        }
        // check all cells are in correct range
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

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay holdingBayStorage={this.state.holdingBayStorage}/>
                <StorageContainer
                    cargoStorage={this.state.cargoStorage}
                    secureStorage={this.state.secureStorage}
                    getCellsOfObject={this.getCellsOfObject}
                    areCoordsEqual={this.areCoordsEqual}
                    isCoordInArray={this.isCoordInArray}
                />
            </div>
        )
    }
}

export default Game;