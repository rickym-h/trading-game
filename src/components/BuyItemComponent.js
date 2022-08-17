import React, { Component } from "react";

class BuyItemComponent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.userSellSingleItem(this.props.item, this.props.buyPrice)
    }



    // Take the item and sell price from props and create interface with button to sell item.
    // TODO MAKE SURE FUNCTION FOR SELLING IS PASSED DOWN - MUST GIVE ITEM AND REMOVE CURRENCY
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