import React, { Component } from "react";

class SellItemComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.userPurchaseSingleItem(this.props.item, this.props.sellPrice, this.props.myIndex)
    }

    // Take the item and sell price from props and create interface with button to sell item.
    render() {
        return (
            <div className={"SellItemComponent"}>
                <div>{this.props.item.name}</div>
                <div>{this.props.sellPrice}</div>
                <button onClick={this.handleClick}>PURCHASE</button>
            </div>
        );
    }
}

export default SellItemComponent;