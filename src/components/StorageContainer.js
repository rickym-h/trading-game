import React, {Component} from "react";
import "./styles/StorageContainer.css"
import "../items/items"
import Cargo from "./Cargo";

class StorageContainer extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    getAllOccupiedCells = (objects) => {
        let occupiedCells = [];
        for (let object of objects) {
            let newCells = this.props.getCellsOfObject(object);
            occupiedCells = occupiedCells.concat(newCells)
        }
        return occupiedCells;
    }

    render() {
        return (
            <div className={"StorageContainer"}>
                <Cargo
                    objects={this.props.cargoStorage}
                    getAllOccupiedCells={this.getAllOccupiedCells}
                    areCoordsEqual={this.props.areCoordsEqual}
                    isCoordInArray={this.props.isCoordInArray}
                />
            </div>
        )
    }

}

export default StorageContainer;