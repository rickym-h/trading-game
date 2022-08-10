import React, {Component} from "react";
import "./styles/StorageContainer.css"

class StorageContainer extends Component {
    constructor(props) {
        super(props);

        // Initialise State
        this.state = {
            cargoItems: [
                {
                    name: "Machine Part",
                    width: 1,
                    height: 1,
                    pos: [0,0],
                },
                {
                    name: "Large CardBoard Box",
                    width: 2,
                    height: 2,
                    pos: [1,0],
                },
                {
                    name: "Tall Vertical Mug",
                    width: 1,
                    height: 2,
                    pos: [0,1],
                },
            ]

        }
    }

    getItemCells = (item) => {
        let arrayOfCellCoords = [];
        //let origin = item.pos;

        for (let x = 0; x < item.width; x++) {
            for (let y = 0; y < item.height; y++) {
                let cell = [x+item.pos[0], y+item.pos[1]]
                arrayOfCellCoords.push(cell)
            }
        }

        return arrayOfCellCoords;
    }

    getItemInCell(x, y) {

    }


    render() {
        console.log(this.getItemCells(this.state.cargoItems[0]))
        console.log(this.getItemCells(this.state.cargoItems[1]))
        console.log(this.getItemCells(this.state.cargoItems[2]))

        // Generate Grid
        let cargoGrid = [];
        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 7; x++) {
                cargoGrid.push(
                    <div key={`x${x}x${y}`} className={"storageCell"}>
                        {`x${x}y${y}`}

                    </div>
                )
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