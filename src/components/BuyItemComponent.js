import React, { Component } from "react";

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
            <div className={"SellItemComponent"}>
                <div>{this.props.item.name}</div>
                <div>{this.props.buyPrice}</div>
                <button onClick={this.handleClick}>SELL</button>
            </div>
        );
    }
}

export default BuyItemComponent;