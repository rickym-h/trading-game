import React, {Component} from "react";
import itemFunctions from "../items/items";
import "./styles/TradingZone.css"

class TradingZone extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            uniqueTrades: this.generateUniqueTrades(),
        }
    }

    generateUniqueTrades = () => {
        let trades = [];

        for (let i = 0; i < 3; i++) {
            let give = itemFunctions.getNRandomCommonItems(Math.floor(Math.random() * 3) + 1)
            let receive = itemFunctions.getNRandomCommonItems(Math.floor(Math.random() * 3) + 1)
            trades.push([give, receive])
        }

        return trades;
    }

    getUniqueTradesRepresentaion = () => {
        let representation = [];
        for (let i = 0; i < this.state.uniqueTrades.length; i++) {
            let uniqueTrade = this.state.uniqueTrades[i];
            let uniqueTradeGive = [];
            for (let giveItem of uniqueTrade[0]) {
                uniqueTradeGive.push(
                    <div>
                        {giveItem.name}
                    </div>
                )
            }

            let uniqueTradeReceive = [];
            for (let giveItem of uniqueTrade[1]) {
                uniqueTradeReceive.push(
                    <div>
                        {giveItem.name}
                    </div>
                )
            }


            representation.push(
                <tr className={"uniqueTradeRow"} key={i}>
                    <td className={"uniqueTrade-give"}>
                        {uniqueTradeGive}
                    </td>
                    <td>
                        <button className={"unique-trade-button"}> MAKE TRADE </button>
                    </td>
                    <td className={"uniqueTrade-receive"}>
                        {uniqueTradeReceive}
                    </td>
                </tr>
            )
        }
        console.log(representation)
        return (
            <table>
                <tr>
                    <td>You Give</td>
                    <td>Trade Button</td>
                    <td>You Recieve</td>
                </tr>
                {representation}
            </table>
        );
    }

    render() {
        return (
            <div>
                <button onClick={this.props.give_100_credits}>DEVELOPMENT - GIVE 100 CREDITS</button>

                <div>
                    Unique Trades:
                    {this.getUniqueTradesRepresentaion()}
                </div>
                <div>
                    Selling Items:
                </div>
                <div>
                    Buying Items:
                </div>
            </div>
        )
    }
}

export default TradingZone;