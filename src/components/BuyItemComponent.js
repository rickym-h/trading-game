import React, { Component } from "react";
import ItemDisplay from "./ItemDisplay";

class BuyItemComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.userSellSingleItem(this.props.item, this.props.buyPrice, this.props.myIndex)
    }



    // Take the item and sell price from props and create interface with button to sell item.
    render() {
        return (
            <div className={"TradeItemComponent"}>
                <ItemDisplay
                    key={this.props.myIndex}
                    object={this.props.object}
                    draggable={false}
                    forceSize={true}
                />
                <div className={"TradeItemComponentRight"}>
                    <p>{this.props.buyPrice} Credits</p>
                    <button className={"TradeItemComponentButton"} onClick={this.handleClick}>SELL</button>
                </div>
                {/*<div>{this.props.item.name}</div>*/}
                {/*<div>{this.props.buyPrice}</div>*/}
            </div>
        );
    }
}

export default BuyItemComponent;