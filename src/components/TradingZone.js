import React, {Component} from "react";
import itemFunctions from "../items/items";
import "./styles/TradingZone.css"
import SellItemComponent from "./SellItemComponent";

class TradingZone extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            uniqueTrades: this.generateUniqueTrades(),
            sellItems: this.generateSellItems(),
        }
    }

    // Generate a list of items which the user with trade for
    generateUniqueTrades = () => {
        let trades = [];
        for (let i = 0; i < 3; i++) {
            let give = itemFunctions.getNRandomCommonItems(Math.floor(Math.random() * 3) + 1)

            // todo make receive generate higher rarity items than give (so trading is always valuable to player)
            let receive = itemFunctions.getNRandomCommonItems(Math.floor(Math.random() * 3) + 1)
            trades.push([give, receive])
        }

        return trades;
    }

    generateSellItems = () => {
        // get some items to sell
        let items = itemFunctions.getNRandomCommonItems(6)
        items = items.map((item) => {
            let itemValue = item.value;
            let low = Math.floor(itemValue * 0.7)
            let high = Math.ceil(itemValue * 1.3)
            let sellPrice = Math.round(Math.random() * (high - low) + low)
            return {
                item: item,
                sellPrice: sellPrice
            }
        })
        console.log(items)
        return items;
    }

    getUniqueTradesRepresentaion = () => {
        let representation = [];
        for (let i = 0; i < this.state.uniqueTrades.length; i++) {
            let uniqueTrade = this.state.uniqueTrades[i];
            let uniqueTradeGive = [];
            for (let j = 0; j < uniqueTrade[0].length; j++) {
                let giveItem = uniqueTrade[0][j];
                uniqueTradeGive.push(
                    <div key={j}>
                        {giveItem.name}
                    </div>
                )
            }

            let uniqueTradeReceive = [];
            for (let j = 0; j < uniqueTrade[1].length; j++) {
                let giveItem = uniqueTrade[1][j];
                uniqueTradeReceive.push(
                    <div key={j}>
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
        return (
            <table>
                <tbody>
                <tr>
                    <td>You Give</td>
                    <td>Trade Button</td>
                    <td>You Receive</td>
                </tr>
                {representation}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                <button onClick={this.props.give_100_credits}>DEVELOPMENT - GIVE 100 CREDITS</button>

                {/*
                    // TODO ADD name and description of npc?
                */}
                <div>
                    Unique Trades:
                    {this.getUniqueTradesRepresentaion()}
                </div>
                <div>
                    Selling Items:
                    {/*
                    // TODO ADD SELLITEMCOMPONENTS TO SELL ALL ITEMS
                    */}
                    {
                        this.state.sellItems.map((object) => {
                            return (<SellItemComponent key={crypto.randomUUID()} item={object.item} sellPrice={object.sellPrice} doesHoldingBayHaveItems={this.props.doesHoldingBayHaveItems}/>)
                        })
                    }
                </div>
                <div>
                    Buying Items:
                </div>

                {/*
                    // TODO add button to regenerate NPC
                */}
            </div>
        )
    }
}

export default TradingZone;