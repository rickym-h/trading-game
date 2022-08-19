import React, {Component} from "react";
import "./styles/ItemDisplay.css"

class ItemDisplay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    handleDragStart = (ev) => {
        this.props.onDragStart(ev)
        let img = new Image()
        img.src = this.props.object.item.imgSrc
        ev.dataTransfer.setDragImage(img,0,0)
    }

    render() {
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
                className={"tooltip"}
                id={this.props.object.UUID}
                style={imgStyle}
                draggable={this.props.draggable}
                onDragStart={this.handleDragStart}
            >
                {/*{this.props.object.item.name}*/}
                <span className="tooltiptext">
                    <p className={"name"}>{this.props.object.item.name}</p>
                    <p>{this.props.object.item.description}</p>
                    <p>{"Value: " + this.props.object.item.value}</p>
                    <p>{"Width: " + this.props.object.item.width}</p>
                    <p>{"Height: " + this.props.object.item.height}</p>

                </span>
            </div>
        );
    }
}

export default ItemDisplay;