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

function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);


        this.state = {
            cargoStorage: this.getRandomPopulatedCargoStorage(7, 0, 3),
            secureStorage: this.getRandomPopulatedCargoStorage(5, 0, 2),
            holdingBayStorage: [
                null,
                null,
                null
            ],
            credits: 0,
        }

        if (storageAvailable('localStorage')) {
            if (localStorage.getItem("state") !== null) {
                let goalState = JSON.parse(localStorage.getItem("state"));
                goalState.credits = Math.max(0, goalState.credits-5)
                this.state = goalState;
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (storageAvailable('localStorage')) {
            // Yippee! We can use localStorage awesomeness
            localStorage.setItem("state", JSON.stringify(this.state));
        }
    }


    getCoordFromStringRep = (stringRep) => {
        console.assert(stringRep.length === 4);
        return [Number(stringRep.at(1)),Number(stringRep.at(3))]
    }

    canObjectBePlacedInLocation = (object, targetLocation, UUID) => {
        switch (targetLocation.at(0)) {
            case 's':
                let strongholdItems = this.state.secureStorage;
                strongholdItems = strongholdItems.filter((it)=>{return it.UUID !== UUID})
                strongholdItems.push({
                    UUID: crypto.randomUUID(),
                    item: object,
                    pos: this.getCoordFromStringRep(targetLocation.slice(-4))
                })
                return this.isStorageValid(strongholdItems, 5);
            case 'c':
                let cargoItems = this.state.cargoStorage;
                cargoItems = cargoItems.filter((it)=>{
                    return it.UUID !== UUID;
                })
                cargoItems.push({
                    UUID: crypto.randomUUID(),
                    item: object,
                    pos: this.getCoordFromStringRep(targetLocation.slice(-4))
                })
                return this.isStorageValid(cargoItems, 7);
            case 'h':
                let pos = Number(targetLocation.slice(-1))
                if (pos > 2 || pos < 0) {
                    console.log("INVALID POS : " + pos)
                    return false;
                }

                // check that item slot is not used in holding bay storage
                if (this.state.holdingBayStorage[pos] !== null) {
                    console.log("slot is already being used - invalid drop location")
                    return false;
                }

                return true;
            default:
                console.log("ERROR : target location not recognised!")
        }
        return false;
    }

    // Populates the cargo storage with 5 random items.
    getRandomPopulatedCargoStorage = (sizeOfContainer, itemRarity, numOfItems) => {
        // do-while loop populating until valid
        let potentialStorage;
        do {
            // Get initial 5 random items
            let randomItems = itemFunctions.getNItemsOfRarity(numOfItems, itemRarity)

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

    getItemFromUUID = (UUID) => {
        for (let object of this.state.cargoStorage) {
            if (object.UUID === UUID) {
                return object.item

            }
        }

        for (let object of this.state.secureStorage) {
            if (object.UUID === UUID) {
                return object.item
            }
        }

        for (let object of this.state.holdingBayStorage) {
            if (object === null) {
                continue;
            }
            if (object.UUID === UUID) {
                return object.item
            }
        }

        return ("ERROR : NO ITEM FOUND WITH UUID: " + UUID)
    }

    deleteItemByUUID = (UUID) => {
        let len;
        let cargoStorage = this.state.cargoStorage;
        len = cargoStorage.length;
        cargoStorage = cargoStorage.filter((object) => {return object.UUID !== UUID;})
        if (cargoStorage.length !== len) {
            this.setState({
                cargoStorage: cargoStorage,
            })
            return;
        }


        let strongholdStorage = this.state.secureStorage;
        len = strongholdStorage.length;
        strongholdStorage = strongholdStorage.filter((object) => {return object.UUID !== UUID;})
        if (strongholdStorage.length !== len) {
            this.setState({
                secureStorage: strongholdStorage,
            })
            return;
        }

        return ("ERROR : NO ITEM FOUND WITH UUID: " + UUID)
    }

    getAllStoragesWithDeletedUUID = (UUID) => {
        let newCargoStorage = this.state.cargoStorage;
        newCargoStorage = newCargoStorage.filter((object) => {return object.UUID !== UUID;})
        let newStrongHoldStorage = this.state.secureStorage;
        newStrongHoldStorage = newStrongHoldStorage.filter((object) => {return object.UUID !== UUID;})

        let newHoldingBayStorage = this.state.holdingBayStorage;
        for (let i = 0; i < newHoldingBayStorage.length; i++) {
            if (newHoldingBayStorage[i] === null) {
                continue;
            }
            if ((newHoldingBayStorage[i].UUID === UUID)) {
                newHoldingBayStorage[i] = null;
            }
        }

        return {
            cargoStorageNEW: newCargoStorage,
            strongholdStorageNEW: newStrongHoldStorage,
            holdingBayStorageNEW: newHoldingBayStorage
        }
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

    spawnItemInPos = (item, pos, UUID) => {
        let allStorageRep = this.getAllStoragesWithDeletedUUID(UUID)
        switch (pos.at(0)) {
            case 's':
                let sCoord = this.getCoordFromStringRep(pos.slice(-4))
                let sObject = {
                    UUID: crypto.randomUUID(),
                    item: item,
                    pos: sCoord,
                }
                let newStrongholdStorage = allStorageRep.strongholdStorageNEW;
                newStrongholdStorage.push(sObject)
                this.setState({
                    secureStorage: newStrongholdStorage,
                    cargoStorage: allStorageRep.cargoStorageNEW,
                    holdingBayStorage: allStorageRep.holdingBayStorageNEW,
                })
                break;
            case 'c':
                let cCoord = this.getCoordFromStringRep(pos.slice(-4))
                let cObject = {
                    UUID: crypto.randomUUID(),
                    item: item,
                    pos: cCoord,
                }
                let newCargoStorage = allStorageRep.cargoStorageNEW;
                newCargoStorage.push(cObject)
                this.setState({
                    cargoStorage: newCargoStorage,
                    secureStorage: allStorageRep.strongholdStorageNEW,
                    holdingBayStorage: allStorageRep.holdingBayStorageNEW,
                })
                break;
            case 'h':
                let hObject = {
                    UUID: crypto.randomUUID(),
                    item: item,
                }
                let newHoldingBayStorage = allStorageRep.holdingBayStorageNEW;
                newHoldingBayStorage[(Number(pos.slice(-1)))] = hObject
                this.setState({
                    holdingBayStorage: newHoldingBayStorage,
                    secureStorage: allStorageRep.strongholdStorageNEW,
                    cargoStorage: allStorageRep.cargoStorageNEW,
                })
                break;
            default:
        }
    }

    handleDragDrop = (ev) => {

        // console.log("dragged item UUID: " + ev.dataTransfer.getData("UUID"))
        let UUID = ev.dataTransfer.getData("UUID")
        let objectItem = this.getItemFromUUID(UUID)
        let targetPos = ev.target.id

        if (this.canObjectBePlacedInLocation(objectItem, targetPos, UUID)) {
            // Deleting old item
            // Spawn new item
            this.spawnItemInPos(objectItem, targetPos, UUID)

        } else {
            console.log("ERROR : item not placeable!")
        }
    }

    rotateHoldingBayItem = (i) => {
        let holdingBayRepresentation = this.state.holdingBayStorage;
        let temp = holdingBayRepresentation[i].item.width;
        holdingBayRepresentation[i].item.width = holdingBayRepresentation[i].item.height;
        holdingBayRepresentation[i].item.height = temp;
        this.setState({
            holdingBayStorage: holdingBayRepresentation,
        })
    }

    DEBUG_GIVE_100_CREDITS = () => {
        this.setState({
            credits: this.state.credits+100,
        })
    }

    // Checks whether the holding bay contains a list of items (checking by name to match items)
    doesHoldingBayHaveItems = (arrayOfItems) => {
        let holdingBayItems = this.state.holdingBayStorage.filter((item) => {return item !== null})
        holdingBayItems = holdingBayItems.map((object) => {return object.item})

        while (arrayOfItems.length > 0) {
            let checkItem = arrayOfItems.pop();
            let lastLength = holdingBayItems.length;
            if (holdingBayItems.filter((item)=>{return item.name !== checkItem.name}).length < lastLength) {
                // One of the items were popped
                holdingBayItems = holdingBayItems.filter((item)=>{return item.name !== checkItem.name})
            } else {
                // checkItem was not in the holdingBayItems
                return false;
            }
        }
        return true;
    }


    transactItems = (itemsToSpawn, itemsToRemove) => {
        itemsToSpawn = [...itemsToSpawn]
        itemsToRemove = [...itemsToRemove]

        let holdingBayRespresentation = this.state.holdingBayStorage;
        holdingBayRespresentation = holdingBayRespresentation.filter((o)=> {return o !== null;})
        while (itemsToRemove.length > 0) {
            let itemToRemove = itemsToRemove.pop();
            let len = holdingBayRespresentation.length;
            holdingBayRespresentation = holdingBayRespresentation.filter((o)=>{
                return o.item.name !== itemToRemove.name;
            })
            if (holdingBayRespresentation.length === len) {
                console.log("Item not in holding bay - ABORTING:")
                return;
            }
        }
        console.log("holdingBayRespresentation now has removed items - checking for space to place itemsToSpawn")
        console.log(holdingBayRespresentation)
        if (holdingBayRespresentation.length + itemsToSpawn.length > 3) {
            console.log("NOT ENOUGH SPACE IN STORAGE TO FINISH TRANSACTION - ABORTING UNIQUE TRADE")
            return;
        }

        for (let itemToSpawn of itemsToSpawn) {
            let newObject = {
                UUID: crypto.randomUUID(),
                item: itemToSpawn,
            }
            holdingBayRespresentation.push(newObject)
        }

        let numOfNullItemsToAdd = 3-holdingBayRespresentation.length;
        for (let i = 0; i<numOfNullItemsToAdd; i++) {
            holdingBayRespresentation.push(null)
        }

        this.setState({
            holdingBayStorage: holdingBayRespresentation,
        })
    }

    userPurchaseSingleItem = (item, price) => {
        if (price > this.state.credits) {
            console.log("USER DOES NOT HAVE ENOUGH CREDITS - ABORTING PURCHASE")
            return false;
        }
        let holdingBayStorage = this.state.holdingBayStorage;
        for (let i = 0; i < holdingBayStorage.length; i++) {
            if (holdingBayStorage[i] === null) {
                holdingBayStorage[i] = {
                    UUID: crypto.randomUUID(),
                    item: item,
                }
                this.setState({
                    holdingBayStorage: holdingBayStorage,
                    credits: this.state.credits - price
                })
                return true;
            }
        }
        console.log("SPACE NOT FOUND IN HOLDING BAY - ABORTING PURCHASE")
        return false;
    }

    userSellSingleItem = (item, price) => {
        let holdingBayRepresentation = this.state.holdingBayStorage;
        for (let i = 0; i < holdingBayRepresentation.length; i++) {
            if (holdingBayRepresentation[i] === null) {
                continue;
            }
            if (holdingBayRepresentation[i].item.name === item.name) {
                holdingBayRepresentation[i] = null;
                this.setState({
                    holdingBayStorage: holdingBayRepresentation,
                    credits: this.state.credits + price
                })
                return true;
            }
        }
        return false;
    }

    spendNCredits = (amount) => {
        this.setState({
            credits: this.state.credits-amount
        })
    }

    auctionHoldingBayItems = () => {
        let total = 0;
        for (let obj of this.state.holdingBayStorage) {
            if (obj === null) {continue;}
            total += obj.item.value;
        }
        total = Math.floor(total * (0.5 + Math.random()))
        this.setState({
            credits: this.state.credits + total,
            holdingBayStorage: [null,null,null],
        })
    }

    giveCredits = (amount) => {
        this.setState({
            credits: this.state.credits+amount
        })
    }

    render() {
        return (
            <div className={"Game"}>
                <TradingZone
                    currentCredits={this.state.credits}
                    give_100_credits={this.DEBUG_GIVE_100_CREDITS}
                    doesHoldingBayHaveItems={this.doesHoldingBayHaveItems}
                    userPurchaseSingleItem={this.userPurchaseSingleItem}
                    userSellSingleItem={this.userSellSingleItem}
                    transactItems={this.transactItems}
                    spendNCredits={this.spendNCredits}
                />
                <HoldingBay
                    holdingBayStorage={this.state.holdingBayStorage}
                    handleDragDrop={this.handleDragDrop}
                    rotateHoldingBayItem={this.rotateHoldingBayItem}
                    auctionHoldingBayItems={this.auctionHoldingBayItems}
                />
                <StorageContainer
                    cargoStorage={this.state.cargoStorage}
                    secureStorage={this.state.secureStorage}
                    getCellsOfObject={this.getCellsOfObject}
                    areCoordsEqual={this.areCoordsEqual}
                    isCoordInArray={this.isCoordInArray}
                    handleDragStart={this.handleDragStart}
                    handleDragDrop={this.handleDragDrop}
                    credits={this.state.credits}
                />
            </div>
        )
    }
}

export default Game;