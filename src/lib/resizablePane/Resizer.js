import React from "react";
import "./style.css";

const VERTICAL="vertical";
const HORIZONTAL="horizontal";

export default class Resizer extends React.Component {
	render() {

		const {style , type} = this.props;
		const styleObj = Object.assign({},style, {
			boxSizing: "border-box",
			backgroundClip: "padding-box" /*this ensures the cursor appears, when it reached the padding region*/
		});

		if (type === VERTICAL)
		{
			styleObj.cursor = "row-resize";
			styleObj.height = "2px";
		}
		else if (type === HORIZONTAL)
		{
			styleObj.cursor = "col-resize";
			styleObj.width = "2px";
		}

		return <span style={ styleObj }
			onMouseDown={this.props.onMouseDown}
			className="pane-resizer"/>;
	}
}