import React, {Component} from "react";
import "./styles/StorageContainer.css"
import "../items/items"
import Cargo from "./Cargo";
import Stronghold from "./Stronghold";

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
                <div>
                    Credits: {this.props.credits}
                </div>
                <Stronghold
                    objects={this.props.secureStorage}
                    getAllOccupiedCells={this.getAllOccupiedCells}
                    areCoordsEqual={this.props.areCoordsEqual}
                    isCoordInArray={this.props.isCoordInArray}
                    handleDragStart={this.props.handleDragStart}
                    handleDragDrop={this.props.handleDragDrop}
                />
                <Cargo
                    objects={this.props.cargoStorage}
                    getAllOccupiedCells={this.getAllOccupiedCells}
                    areCoordsEqual={this.props.areCoordsEqual}
                    isCoordInArray={this.props.isCoordInArray}
                    handleDragStart={this.props.handleDragStart}
                    handleDragDrop={this.props.handleDragDrop}
                />
            </div>
        )
    }

}

export default StorageContainer;