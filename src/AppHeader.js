import React, {Component} from "react";
import "./AppHeader.css"

class AppHeader extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className={"appHeader"}>
                MY TRADING GAME
            </div>
        )
    }
}

export default AppHeader;