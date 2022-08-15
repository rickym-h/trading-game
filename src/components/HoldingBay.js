import React, {Component} from "react";

import './styles/HoldingBay.css'

class HoldingBay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    handleDragStart = (ev) => {
        ev.dataTransfer.setData("UUID", ev.target.id)
    }

    handleDragOver = (ev) => {
        ev.preventDefault();
    }

    handleDragDrop = (ev) => {
        this.props.handleDragDrop(ev)
    }

    generateStorageRepresentation = () => {
        let storage = [];
        for (let i = 0; i < this.props.holdingBayStorage.length; i++) {
            let object = this.props.holdingBayStorage[i];
            if (object !== null) {
                const objectStyle = {
                    width: `${60*object.item.width}px`,
                    height: `${60*object.item.height}px`,
                }
                storage.push(
                    <div className={"holdingBay-row"} key={`h:${i}`}>
                        <div
                            key={`h:${i}`}
                            id={`${object.UUID}`}
                            className={`holdingBayItem`}
                            draggable={true}
                            onDragStart={this.handleDragStart}
                            style={objectStyle}
                        >
                            {`h:${object.item.name}`}
                        </div>
                         <button
                             className={"rotateButton"}
                             onClick={() => this.props.rotateHoldingBayItem(i)}
                         > Rotate Item </button>
                    </div>
                )
            } else {
                storage.push(
                    <div className={"holdingBay-row"} key={`h:${i}`}>
                        <div
                            key={`h:${i}`}
                            id={`h:${i}`}
                            className={"emptyCell"}
                            onDragOver={this.handleDragOver}
                            onDrop={this.handleDragDrop}
                        >
                            {`h:${i}`}
                        </div>
                    <button className={"rotateButton"} disabled={true}> Rotate Item </button>
                </div>
                )
            }
        }
        return storage;
    }

    render() {
        let storageRepresentation = this.generateStorageRepresentation();
        return (
            // todo add button to rotate items

            // todo add area to sell/bin items (selling will be at a random fraction of value (e.g. galactic auction so random but wont need trader)) since not specific trade
            <div className={"HoldingBay"}>
                {storageRepresentation}
            </div>
        )
    }

}

export default HoldingBay;