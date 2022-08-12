import React, {Component} from "react";

class Stronghold extends Component {
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

    handleDragStart = (ev) => {
        //console.log("UUID: " + ev.target.id);
        ev.dataTransfer.setData("UUID", ev.target.id)
        this.props.handleDragStart(ev)
    }

    handleDragOver = (ev) => {
        ev.preventDefault();
    }

    handleDragDrop = (ev) => {
        // ev.preventDefault();
        this.props.handleDragDrop(ev);
    }


    generateStorageRepresentation = () => {
        let strongholdGrid = [];
        let occupiedCells = this.props.getAllOccupiedCells(this.props.objects);
        let originCoords = this.getOriginCoords();

        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                let cellCoord = [x,y];

                // If empty cell, push empty cell
                if (!this.props.isCoordInArray(cellCoord, occupiedCells)) {
                    strongholdGrid.push(
                        <div key={`s:x${x}y${y}`}
                             id={`s:x${x}y${y}`}
                             className={"emptyCell"}
                             onDragOver={this.handleDragOver}
                             onDrop={this.handleDragDrop}
                        >
                            {`s:x${x}y${y}`}
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
                    strongholdGrid.push(
                        <div key={`s:x${x}x${y}`}
                             id={`${object.UUID}`}
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
        return strongholdGrid;

    }

    render() {
        let storageRepresentation = this.generateStorageRepresentation();
        return (
            <div className={"Stronghold"}>
                {storageRepresentation}
            </div>
        )
    }
}

export default Stronghold;