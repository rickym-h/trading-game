import React, {Component} from "react";
import itemFunctions from "../items/items";
import "./styles/TradingZone.css"
import "./styles/TradeItemComponent.css"

import SellItemComponent from "./SellItemComponent";
import BuyItemComponent from "./BuyItemComponent";
import ItemDisplay from "./ItemDisplay";

class TradingZone extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        this.state = {
            NPC_name: this.generateRandomName(),
            uniqueTrades: this.generateUniqueTrades(),
            sellItems: this.generateSellItems(),
            buyItems: this.generateBuyItems(),
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
            let lowerVal = Math.floor(Math.random()*2)
            let give = itemFunctions.getNItemsOfRarity(Math.floor(Math.random() * 3) + 1, lowerVal)

            let receive = itemFunctions.getNItemsOfRarity(Math.floor(Math.random() * 3) + 1, lowerVal+1)
            trades.push([give, receive])
        }
        return trades;
    }

    generateSellItems = () => {
        // get some items to sell
        let items = itemFunctions.getNItemsOfRarityUpTo(6, 1)
        items = items.map((item) => {
            let itemValue = item.value;
            let low = Math.floor(itemValue * 0.7)
            let high = Math.ceil(itemValue * 1)
            let sellPrice = Math.round(Math.random() * (high - low) + low)
            return {
                item: item,
                sellPrice: sellPrice
            }
        })
        return items;
    }

    generateBuyItems = () => {
        // get some items to sell
        let items = itemFunctions.getNItemsOfRarityUpTo(6, 2)
        items = items.map((item) => {
            let itemValue = item.value;
            let low = Math.floor(itemValue * 1)
            let high = Math.ceil(itemValue * 1.3)
            let buyPrice = Math.round(Math.random() * (high - low) + low)
            return {
                item: item,
                buyPrice: buyPrice
            }
        })
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
                let object = {
                    UUID: crypto.randomUUID(),
                    item: giveItem
                }
                uniqueTradeGive.push(
                    // <div key={j}>
                    //     {giveItem.name}
                    // </div>
                    <ItemDisplay
                        key={j}
                        object={object}
                        draggable={false}
                        forceSize={true}
                    />
                )
            }

            let uniqueTradeReceive = [];
            for (let j = 0; j < uniqueTrade[1].length; j++) {
                let giveItem = uniqueTrade[1][j];
                let object = {
                    UUID: crypto.randomUUID(),
                    item: giveItem
                }
                uniqueTradeReceive.push(
                    <ItemDisplay
                        key={j}
                        object={object}
                        draggable={false}
                        forceSize={true}
                    />
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
        const TRAVEL_COST = 5;
        if (this.props.currentCredits < TRAVEL_COST) {
            console.log("NOT ENOUGH CREDITS TO TRAVEL - ABORTING NPC GENERATION")
            return;
        } else {
            this.props.spendNCredits(TRAVEL_COST);
        }
        this.setState({
            NPC_name: this.generateRandomName(),
            uniqueTrades: this.generateUniqueTrades(),
            sellItems: this.generateSellItems(),
            buyItems: this.generateBuyItems(),
        })
    }

    tryUserPurchaseSingleItem = (item, buyPrice, index) => {
        let result = this.props.userPurchaseSingleItem(item, buyPrice)
        if (result) {

            let sellItemsRepresentation = this.state.sellItems;
            let currVal = sellItemsRepresentation[index].sellPrice;
            currVal = Math.ceil(currVal*1.1)
            sellItemsRepresentation[index].sellPrice = currVal;

            this.setState({
                sellItems: sellItemsRepresentation
            })
        }
    }

    tryUserSellSingleItem = (item, sellPrice, index) => {
        let result = this.props.userSellSingleItem(item, sellPrice)
        if (result) {
            let buyItemsRepresentation = this.state.buyItems;
            let currVal = buyItemsRepresentation[index].buyPrice;
            currVal = Math.max(1, Math.floor(currVal*0.9))
            buyItemsRepresentation[index].buyPrice = currVal;

            this.setState({
                buyItems: buyItemsRepresentation
            })
        }
    }

    render() {
        return (
            <div className={"TradingZone"}>
                <button onClick={this.props.give_100_credits}>DEVELOPMENT - GIVE 100 CREDITS - REMOVE BUTTON ON PRODUCTION</button>

                <p>Name: {this.state.NPC_name}</p>

                <div>
                    Unique Trades:
                    {this.getUniqueTradesRepresentaion()}
                </div>
                {this.state.NPC_name} is selling:
                <div className={"TradeItemContainer"}>

                    {
                        this.state.sellItems.map((object, index) => {
                            return (<SellItemComponent
                                key={index}
                                myIndex={index}
                                object={object}
                                item={object.item}
                                sellPrice={object.sellPrice}
                                userPurchaseSingleItem={this.tryUserPurchaseSingleItem}
                            />)
                        })
                    }


                </div>
                {this.state.NPC_name} is wanting to buy:
                <div className={"TradeItemContainer"}>
                    {
                        this.state.buyItems.map((object, index) => {
                            return (<BuyItemComponent
                                key={index}
                                myIndex={index}
                                object={object}
                                item={object.item}
                                buyPrice={object.buyPrice}
                                userSellSingleItem={this.tryUserSellSingleItem}
                            />)
                        })
                    }
                </div>



                <button onClick={this.handleNewNPCGeneration}> FIND NEW NPC - COST: 5 Credits </button>
            </div>
        )
    }
}

export default TradingZone;