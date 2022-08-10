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

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay/>
                <StorageContainer/>
            </div>
        )
    }
}

export default Game;