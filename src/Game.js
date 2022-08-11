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
            cargoStorage: [

            ],
            secureStorage: [

            ],
            holdingBayStorage: [

            ],

        }

    }

    render() {
        return (
            <div className={"Game"}>
                <TradingZone/>
                <HoldingBay holdingBayStorage={this.state.holdingBayStorage}/>
                <StorageContainer cargoStorage={this.state.cargoStorage} secureStorage={this.state.secureStorage}/>
            </div>
        )
    }
}

export default Game;