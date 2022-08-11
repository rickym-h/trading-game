import React, {Component} from "react";
import "./styles/StorageContainer.css"
import "../items/items"

class StorageContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"StorageContainer"}>
                CARGO CONTAINER
            </div>
        )
    }

}

export default StorageContainer;