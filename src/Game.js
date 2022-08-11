import React, {Component} from "react";
import HoldingBay from "./components/HoldingBay";
import StorageContainer from "./components/StorageContainer";
import "./Game.css"
import TradingZone from "./components/TradingZone";
import itemFunctions from "./items/items";

class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            currentlyDraggedItem: null,
        }
    }

    handleDragStart = (e) => {
        console.log("DRAG STARTED")
        let itemID = e.target.dataset.itemid
        this.setState({
            currentlyDraggedItem: itemFunctions.getItemByID(itemID),
        })

        e.dataTransfer.setData("text", itemID)
        e.dataTransfer.setData("itemObject", JSON.stringify(itemFunctions.getItemByID(itemID)))
    }

    handleDragDrop = (e) => {
    }

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay/>
                <StorageContainer
                    handleDragStart={this.handleDragStart}
                    handleDragDrop={this.handleDragDrop}
                    currentDraggedItem={this.state.currentlyDraggedItem}
                />
            </div>
        )
    }
}

export default Game;