import React from "react";
import "./style.css";
import CustomUI from "./../../lib";
const ResizablePane = CustomUI.ResizablePane;

export default class Demo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const {demoName}= this.props;

		let demoUI;
		if(demoName === "vertical" || demoName === "horizontal"){
			demoUI = (
				<ResizablePane direction={demoName} className="resizable-pane">
					<div className="demo-pane">Child 1</div>
					<div className="demo-pane">Child 2</div>
					<div className="demo-pane">Child 3</div>
					<div className="demo-pane">Child 4</div>
				</ResizablePane>
			);
		} else if(demoName === "mix"){
		    demoUI = (
				<ResizablePane direction="vertical" className="resizable-pane">
					<div className="demo-pane">Child 1</div>
					<div className="demo-pane">Child 2</div>
					<div className="demo-pane">
						<p><i>Horizontal inside vertical</i></p>
						<ResizablePane direction="horizontal" className="resizable-pane">
							<div className="demo-pane">Child 3</div>
							<div className="demo-pane">Child 4</div>
							<div className="demo-pane">Child 5</div>
						</ResizablePane>
					</div>
				</ResizablePane>
			);
		} else if(demoName === "fixed"){
			demoUI = (
				<ResizablePane direction="horizontal" paneSize={[.3, .3,.4]} className="resizable-pane">
					<div className="demo-pane">Child 1 30%</div>
					<div className="demo-pane">Child 2 30%</div>
					<div className="demo-pane">Child 3 40%</div>
				</ResizablePane>
			);
		} else {
			demoUI = (
                <ResizablePane direction="horizontal" paneSize={[.3]} className="resizable-pane">
                  <div className="demo-pane">Child 1 30%</div>
                  <div className="demo-pane">Child 2 </div>
                  <div className="demo-pane">Child 3 </div>
                </ResizablePane>
			);
        }



		return demoUI;
	}
}