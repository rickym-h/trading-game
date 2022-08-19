import React, {Component} from "react";

class ItemDisplay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        let imgStyle = {
            backgroundImage: "url(" + this.props.object.item.imgSrc + ")",
            backgroundSize: "100% 100%",
            width: `${64*this.props.object.item.width}px`,
            height: `${64*this.props.object.item.height}px`,
        }
        if (this.props.draggable) {
            imgStyle["cursor"] = "grab";
        }
        if (this.props.providedStyles !== undefined) {
            imgStyle = {...imgStyle, ...this.props.providedStyles}
        }
        return (
            <div
                id={this.props.object.UUID}
                style={imgStyle}
                draggable={this.props.draggable}
                onDragStart={this.props.onDragStart}
            >
                {this.props.object.item.name}
            </div>
        );
    }
}

export default ItemDisplay;