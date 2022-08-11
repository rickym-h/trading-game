import React, {Component} from "react";

class Cargo extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    getOriginCoords = () => {
        let coords = [];
        for (let object of this.props.objects) {
            coords.push([...object.pos])
        }
        return coords;
    }

    getObjectFromOrigin = (originCoord) => {
        for (let object of this.props.objects) {
            if (this.props.areCoordsEqual(originCoord, object.pos)) {
                return object;
            }
        }
        return null;
    }


    generateStorageRepresentation = () => {
        let cargoGrid = [];
        let occupiedCells = this.props.getAllOccupiedCells(this.props.objects);
        let originCoords = this.getOriginCoords();

        for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 7; x++) {
                let cellCoord = [x,y];

                // If empty cell, push empty cell
                if (!this.props.isCoordInArray(cellCoord, occupiedCells)) {
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
                    continue;
                }

                // We know it is either an origin cell or a proxy item cell
                // If it is an item origin, process and push
                // If it is proxy, skip
                if (this.props.isCoordInArray(cellCoord, originCoords)) {
                    let object = this.getObjectFromOrigin(cellCoord);
                    const itemStyle = {
                        gridRowStart: object.pos[1]+1,
                        gridRowEnd: `span ${object.item.height}`,
                        gridColumnStart: object.pos[0]+1,
                        gridColumnEnd: `span ${object.item.width}`,
                    }
                    cargoGrid.push(
                        <div key={`x${x}x${y}${object.item.name}`}
                             id={`x${x}x${y}${object.item.name}`}
                             data-itemid = {object.item.id}
                             className={`cargoItem`}
                             style={itemStyle}
                             draggable={true}
                             onDragStart={this.handleDragStart}
                        >
                            {`${object.item.name}`}
                        </div>
                    )
                }


            }
        }
        return cargoGrid;

    }

    render() {
        let storageRepresentation = this.generateStorageRepresentation();
        return (
            <div className={"Cargo"}>
                {storageRepresentation}
            </div>
        )
    }
}

export default Cargo;