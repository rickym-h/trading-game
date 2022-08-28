import React, {Component} from "react";

import './styles/HoldingBay.css'
import ItemDisplay from "./ItemDisplay";

class HoldingBay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    // Makes sure that the dragged object has a reference to the UUID and so can find the original dragged object
    handleDragStart = (ev) => {
        ev.dataTransfer.setData("UUID", ev.target.id)
    }

    // Makes sure the target can accept drag drops
    handleDragOver = (ev) => {
        ev.preventDefault();
    }

    // Calls parent function to handle the transfer of data when dropping item
    handleDragDrop = (ev) => {
        this.props.handleDragDrop(ev)
    }

    // Calls parent function to handle transfer of data when auctioning items
    handleAuctionItems = () => {
        console.log("AUCTIONING ITEMS")
        this.props.auctionHoldingBayItems();
    }

    // Takes the items from the holding bay data - and constructs the DOM representation of the holding bay.
    generateStorageRepresentation = () => {
        let storage = [];
        for (let i = 0; i < this.props.holdingBayStorage.length; i++) {
            let object = this.props.holdingBayStorage[i];
            if (object !== null) {
                // Place the item down if it is not empty - and provide a button to rotate the item
                storage.push(
                    <div className={"holdingBay-row"} key={`h:${i}`}>
                        <ItemDisplay
                            object={object}
                            draggable={true}
                            onDragStart={this.handleDragStart}
                        />
                         <button
                             className={"rotateButton"}
                             onClick={() => this.props.rotateHoldingBayItem(i)}
                         > Rotate Item </button>
                    </div>
                )
            } else {
                // Place an empty item if it is empty - the rotate button should be disabled in this case
                storage.push(
                    <div className={"holdingBay-row"} key={`h:${i}`}>
                        <div
                            key={`h:${i}`}
                            id={`h:${i}`}
                            className={"emptyCell"}
                            onDragOver={this.handleDragOver}
                            onDrop={this.handleDragDrop}
                        >
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
            // Show the holding bay + a button at the bottom to auction off items.
            <div className={"HoldingBay"}>
                {storageRepresentation}
                <button className={"TradeItemComponentButton"} onClick={this.handleAuctionItems}>Auction off Items</button>
            </div>
        )
    }

}

export default HoldingBay;