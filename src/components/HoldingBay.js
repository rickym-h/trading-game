import React, {Component} from "react";

class HoldingBay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    handleDragStart = (ev) => {
        console.log("DRAG STARTED")
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
            // todo either render the item or an empty cell for each thing in the holding bay
            let object = this.props.holdingBayStorage[i];
            if (object !== null) {
                storage.push(
                    <div
                        key={`h:${i}`}
                        id={`${object.UUID}`}
                        className={`holdingBayItem`}
                        draggable={true}
                        onDragStart={this.handleDragStart}
                    >
                        {`h:${object.item.name}`}
                    </div>
                )
            } else {
                storage.push(
                    <div
                        key={`h:${i}`}
                        id={`h:${i}`}
                        className={"emptyCell"}
                        onDragOver={this.handleDragOver}
                        onDrop={this.handleDragDrop}
                    >
                        {`h:${i}`}
                    </div>
                )
            }
            // todo refactor code to allow dragging INTO the holding bay

            // todo reactor code to allow dragging OUT of the holding bay
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