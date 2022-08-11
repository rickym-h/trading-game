import React, {Component} from "react";
import HoldingBay from "./components/HoldingBay";
import StorageContainer from "./components/StorageContainer";
import "./Game.css"
import TradingZone from "./components/TradingZone";

class Game extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleDragStart = (e) => {
        console.log("DRAG STARTED")
        console.log(e)
    }
    handleDragEnter = (e) => {
        console.log("DRAG ENTER")
        console.log(e)
    }

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay/>
                <StorageContainer
                    handleDragStart={this.handleDragStart}
                    handleDragEnter={this.handleDragEnter}
                />
            </div>
        )
    }
}

export default Game;