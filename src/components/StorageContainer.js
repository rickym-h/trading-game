import React, {Component} from "react";
import "./styles/StorageContainer.css"
import "../items/items"
import itemFunctions from "../items/items";

class StorageContainer extends Component {
    constructor(props) {
        super(props);

        let items = itemFunctions.getNRandomCommonItems(7);
        for (let i = 0; i < items.length; i++) {
            items[i]["pos"] = [i,0]
        }


        // Initialise State
        this.state = {
            cargoItems: items,
        }
    }

    getItemFromOrigin = (originCoord) => {
        for (let item of this.state.cargoItems) {
            if (this.coordsAreEqual(item.pos, originCoord)) {
                return item;
            }
        }
        return null;
    }

    getItemCells = (item) => {
        let arrayOfCellCoords = [];
        // Loop through the width and height to get all the cells occupied by the item
        for (let x = 0; x < item.width; x++) {
            for (let y = 0; y < item.height; y++) {
                let cell = [x+item.pos[0], y+item.pos[1]]
                arrayOfCellCoords.push(cell)
            }
        }
        return arrayOfCellCoords;
    }

    getItemInCell = (coord) => {
        for (let item of this.state.cargoItems) {
            let itemCoords = this.getItemCells(item);
            if (itemCoords.some((itemCoord) => this.coordsAreEqual(itemCoord,coord))) {
                return item;
            }
        }
        return null;
    }

    // Gets a list of all the co-ordinates which have a
    getAllOccupiedCells = () => {
        let occupiedCells = [];
        for (let item of this.state.cargoItems) {
            let cells = this.getItemCells(item);
            //console.log("item: " + item.pos + " cells: " + cells)
            for (let cell of cells) {
                occupiedCells.push(cell)
            }
        }
        return occupiedCells;
    }

    // Custom function to determine if two co-ordinates are equal
    coordsAreEqual = (coord1, coord2) => {
        if (coord1.length !== coord2.length) {
            return false; }
        for (let i = 0; i < coord1.length; i++) {
            if (coord1[i] !== coord2[i]) {
                return false;
            }
        }
        return true;
    }

    // Compares a co-ordinate with a list of co-ordinates and returns if the co-ordinate shows up in the list
    isCoordInArray = (coord, listOfCoords) => {
        for (let i = 0; i < listOfCoords.length; i++) {
            let checkCoord = listOfCoords[i]
            if (this.coordsAreEqual(coord, checkCoord)) {
                return true;
            }
        }
        return false;
    }

    handleDragStart = (ev) => {
        this.props.handleDragStart(ev);

    }

    handleDragOver = (ev) => {
        ev.preventDefault();
    }


    handleDragDrop = (ev) => {
        ev.preventDefault();
        this.props.handleDragDrop(ev)

        let placedObject = JSON.parse(ev.dataTransfer.getData("itemObject"))
        console.log(placedObject)

        let cellCoord = this.getCoordFromCellID(ev.target.id);
        console.log(cellCoord)
    }

    getCoordFromCellID = (cellID) => {
        return cellID
    }

    canObjectBePlaced = (object, coord) => {

    }



    render() {
        let occupiedCells = this.getAllOccupiedCells();
        // Generate Grid
        let cargoGrid = [];
        // Set all empty cells
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 7; x++) {
                let cellCoord = [x,y];

                // Set empty Cells
                if (!this.isCoordInArray(cellCoord, occupiedCells)) {
                    cargoGrid.push(
                        <div key={`x${x}y${y}`}
                             id={`x${x}y${y}`}
                             className={"emptyCell"}
                             onDragOver={this.handleDragOver}
                             onDrop={this.handleDragDrop}
                        >
                            {`x${x}y${y}`}
                        </div>
                    )
                }

                // Set Item cells
                let item = this.getItemFromOrigin(cellCoord)
                if (item) {
                    const itemStyle = {
                        gridRowStart: item.pos[1]+1,
                        gridRowEnd: `span ${item.height}`,
                        gridColumnStart: item.pos[0]+1,
                        gridColumnEnd: `span ${item.width}`,
                    }
                    cargoGrid.push(
                        <div key={`x${x}x${y}${item.name}`}
                             id={`x${x}x${y}${item.name}`}
                             data-itemid = {item.itemID}
                             className={`cargoItem`}
                             style={itemStyle}
                             draggable={true}
                             onDragStart={this.handleDragStart}
                        >
                            {`${item.name}`}
                        </div>
                    )
                }
            }
        }

        return (
            <div className={"StorageContainer"}>
                STORAGE CONTAINER
                <div className={"Cargo"}>
                    {cargoGrid}
                </div>
            </div>
        )
    }

}

export default StorageContainer;