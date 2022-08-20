import React, {Component} from "react";
import "./styles/ItemDisplay.css"

class ItemDisplay extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);

        // todo Determine pos on screen before setting top to true or false
        this.state = {
            top: true,
        }
    }

    handleDragStart = (ev) => {
        this.props.onDragStart(ev)
        let img = new Image()
        img.src = this.props.object.item.imgSrc
        ev.dataTransfer.setDragImage(img,0,0)
    }

    handleMouseEnter = (ev) => {
        if (ev.clientY < window.innerHeight/2) {
            this.setState({
                top: true,
            })
        } else {
            this.setState({
                top: false,
            })
        }
    }

    render() {
        let imgStyle = {
            backgroundImage: "url(" + this.props.object.item.imgSrc + ")",
            backgroundSize: "100% 100%",
            width: `${64*this.props.object.item.width}px`,
            height: `${64*this.props.object.item.height}px`,
        }
        if (this.props.forceSize === true) {
            if (this.props.object.item.width > this.props.object.item.height) {
                imgStyle.width = "64px";
                imgStyle.height = `${(this.props.object.item.height / this.props.object.item.width)*64}px`;
            } else {
                imgStyle.height = "64px";
                imgStyle.width = `${(this.props.object.item.width / this.props.object.item.height)*64}px`;
            }
        }
        if (this.props.draggable) {
            imgStyle["cursor"] = "grab";
        }
        if (this.props.providedStyles !== undefined) {
            imgStyle = {...imgStyle, ...this.props.providedStyles}
        }

        let tooltipStyle;
        if (this.state.top) {
            tooltipStyle = {
                top: "120%",
            }
        } else {
            tooltipStyle = {
                bottom: "120%",
            }
        }
        return (
            <div
                className={"tooltip"}
                id={this.props.object.UUID}
                style={imgStyle}
                draggable={this.props.draggable}
                onDragStart={this.handleDragStart}
                onMouseEnter={this.handleMouseEnter}
            >
                {/*{this.props.object.item.name}*/}
                <span
                    className="tooltiptext"
                    style={tooltipStyle}
                >
                    <p className={"name"}>{this.props.object.item.name}</p>
                    <p>{this.props.object.item.description}</p>
                    <p>{`Value: ${this.props.object.item.value} Credits`}</p>
                    <p>{`Size: ${this.props.object.item.width} x ${this.props.object.item.height}`}</p>

                </span>
            </div>
        );
    }
}

export default ItemDisplay;