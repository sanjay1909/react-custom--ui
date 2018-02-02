import React from "react";
import { render } from "react-dom";
import ResizablePaneDemo from "./resizablePane";
import TreeDemo from "./tree";
import "./style.css";
import CustomUI from "./../lib";

const ResizablePane = CustomUI.ResizablePane;
const Tree = CustomUI.Tree;

const data = [
	{
		displayName: "Resizable Pane",
		componentName:"resizablePane",
		value:[
			{
				componentName:"resizablePane",
				displayName:"Horizontal",
				value:"horizontal"
			},
			{
				componentName:"resizablePane",
				displayName:"Vertical",
				value:"vertical"
			},
			{
				componentName:"resizablePane",
				displayName:"Mix",
				value:"mix"
			},
			{
				componentName:"resizablePane",
				displayName:"Fixed",
				value:"fixed"
			}
		]
	},
	{
		componentName:"tree",
		displayName:"Tree",
		value:[
			{
				componentName:"tree",
				displayName:"Crumb",
				value:"crumb"
			},
			{
				componentName:"tree",
				displayName:"Accordion",
				value:"accordion"
			}
		]
	}

];

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			componentName: "",
			propValue: ""
		};
		this.updateDemoNameState = this.updateDemoNameState.bind(this);

	}

	updateDemoNameState(node){
		let propValue = "";

		if(node && typeof node.value === "string"){
			propValue =  node.value;
		}
		this.setState({
			componentName:node ? node.componentName : "",
			propValue:propValue
		});
	}

	render(){
		const {componentName, propValue} = this.state;
		let demoUI = "Click on the Left side to see a Demo";

		if(componentName === "resizablePane"){
			demoUI = <ResizablePaneDemo demoName={propValue}/>;
		}else if(componentName === "tree"){
			demoUI = <TreeDemo demoName={propValue}/>;
		}
		return(
			<ResizablePane direction="horizontal" paneSize={[.3]} className="resizablePane">
				<div className="toc">
					<Tree data={data} onNodeClick={this.updateDemoNameState}/>
				</div>
				<div className="demo">
					{demoUI}
				</div>
			</ResizablePane>
		);
	}
}
render((<App/>), document.getElementById("app"));

