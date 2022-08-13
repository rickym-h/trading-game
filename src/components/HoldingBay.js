import React, {Component} from "react";

class HoldingBay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    generateStorageRepresentation = () => {
        let storage = [];
        for (let i = 0; i < this.props.holdingBayStorage.length; i++) {
            storage.push(
                <div key={`h:${i}`}>
                    {`h:${i}:${this.props.holdingBayStorage[i]}`}
                </div>
            )
        }
        return storage;
    }

    render() {
        let storageRepresentation = this.generateStorageRepresentation();
        return (
            <div className={"HoldingBay"}>
                {storageRepresentation}
            </div>
        )
    }

}

export default HoldingBay;