import React, {Component} from "react";
import itemFunctions from "../items/items";
import "./styles/TradingZone.css"
import SellItemComponent from "./SellItemComponent";

class TradingZone extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            NPC_name: this.generateRandomName(),

            uniqueTrades: this.generateUniqueTrades(),
            sellItems: this.generateSellItems(),
        }
    }


    generateRandomName = () => {
        let names = [
            "dave",
            "john",
            "adam",
            "emily"
        ]

        return (names[Math.floor(Math.random()*names.length)])
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
        let items = itemFunctions.getNRandomCommonItems(3)
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

    handleUniqueTradeClick = (uniqueTrade) => {
        this.props.transactItems(uniqueTrade[1], uniqueTrade[0])
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
                        <button
                            className={"unique-trade-button"}
                            onClick={() => this.handleUniqueTradeClick(this.state.uniqueTrades[i])}
                        > MAKE TRADE </button>
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

    handleNewNPCGeneration = () => {
        // todo burn some credits
        const TRAVEL_COST = 10;
        if (this.state.credits < TRAVEL_COST) {
            console.log("NOT ENOUGH CREDITS TO TRAVEL - ABORTING NPC GENERATION")
            return;
        }
        // todo generate new npc
        console.log("ERROR - NEW NPC GENERATION NOT IMPLEMENTED")
    }

    render() {
        return (
            <div>
                <button onClick={this.props.give_100_credits}>DEVELOPMENT - GIVE 100 CREDITS</button>

                Name: {this.state.NPC_name}

                <div>
                    Unique Trades:
                    {this.getUniqueTradesRepresentaion()}
                </div>
                <div>
                    {this.state.NPC_name} is selling:
                    {
                        this.state.sellItems.map((object) => {
                            return (<SellItemComponent
                                key={crypto.randomUUID()}
                                item={object.item}
                                sellPrice={object.sellPrice}
                                doesHoldingBayHaveItems={this.props.doesHoldingBayHaveItems}
                                userPurchaseSingleItem={this.props.userPurchaseSingleItem}
                            />)
                        })
                    }
                </div>
                <div>
                    {this.state.NPC_name} is wanting to buy:
                </div>

                {/*
                    // TODO add button to regenerate NPC
                */}
                <button onClick={this.handleNewNPCGeneration}> NEW NPC </button>
            </div>
        )
    }
}

export default TradingZone;