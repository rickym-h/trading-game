import React, { Component } from "react";
import ItemDisplay from "./ItemDisplay";

class SellItemComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.userPurchaseSingleItem(this.props.item, this.props.sellPrice, this.props.myIndex)
    }

    // Take the item and sell price from props and create interface with button to sell item.
    // todo change interface
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
                    <p>{this.props.sellPrice} Credits</p>
                    <button className={"TradeItemComponentButton"} onClick={this.handleClick}>PURCHASE</button>
                </div>
            </div>
        );
    }
}

export default SellItemComponent;