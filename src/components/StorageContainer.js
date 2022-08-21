import React, {Component} from "react";
import "./styles/StorageContainer.css"
import "../items/items"
import Cargo from "./Cargo";
import Stronghold from "./Stronghold";

class StorageContainer extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            showCargo: true,
        }
    }

    getAllOccupiedCells = (objects) => {
        let occupiedCells = [];
        for (let object of objects) {
            let newCells = this.props.getCellsOfObject(object);
            occupiedCells = occupiedCells.concat(newCells)
        }
        return occupiedCells;
    }

    handleToggleCargo = () => {
        this.setState({
            showCargo: !this.state.showCargo,
        })
    }

    showStrongHold = () => {
        this.setState({
            showCargo: false,
        })
    }

    showCargo = () => {
        this.setState({
            showCargo: true,
        })
    }

    render() {
        let rep, currentDisplay;
        if (this.state.showCargo) {
            rep = (
                <Cargo
                    objects={this.props.cargoStorage}
                    getAllOccupiedCells={this.getAllOccupiedCells}
                    areCoordsEqual={this.props.areCoordsEqual}
                    isCoordInArray={this.props.isCoordInArray}
                    handleDragStart={this.props.handleDragStart}
                    handleDragDrop={this.props.handleDragDrop}
                />
            )
            currentDisplay = "Cargo";
        } else {
            rep = (
                <Stronghold
                    objects={this.props.secureStorage}
                    getAllOccupiedCells={this.getAllOccupiedCells}
                    areCoordsEqual={this.props.areCoordsEqual}
                    isCoordInArray={this.props.isCoordInArray}
                    handleDragStart={this.props.handleDragStart}
                    handleDragDrop={this.props.handleDragDrop}
                />
            )
            currentDisplay = "Stronghold"
        }
        return (
            <div className={"StorageContainer"}>
                <div className={"StorageContainerHeader"}>
                    <p><strong> {currentDisplay} </strong></p>
                    <p>Credits: {this.props.credits} </p>
                </div>
                {rep}
                <div className={"toggleCargoDisplayButtons"}>
                    <button onClick={this.showCargo}>Cargo</button>
                    <button onClick={this.showStrongHold}>Stronghold</button>
                </div>
                {/*<button onClick={this.handleToggleCargo}>toggleCargo</button>*/}

            </div>
        )
    }

}

export default StorageContainer;