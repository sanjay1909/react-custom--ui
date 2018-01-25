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
		id:"resizablePane",
		value:[
			{
				displayName:"Horizontal",
				value:"horizontal"
			},
			{
				displayName:"Vertical",
				value:"vertical"
			},
			{
				displayName:"Mix",
				value:"mix"
			},
			{
				displayName:"Fixed",
				value:"fixed"
			}
		]
	},
	{
		id:"tree",
		displayName:"Tree",
		value:"tree"
	}

];

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			componentName: "",
			propName: ""
		};
		this.updateDemoNameState = this.updateDemoNameState.bind(this);

	}

	updateDemoNameState(node){
		let propName = "";

		if(node && typeof node.value === 'string'){
			propName =  node.value;
		}
		this.setState({
			componentName:node ? node.id : "",
			propName:propName
		});
	}

	render(){
		const {componentName, propName} = this.state;
		let demoUI = "Click on the Left side to see a Demo";

		if(componentName === "resizablePane"){
			demoUI = <ResizablePaneDemo demoName={propName}/>;
		}else if(componentName === "tree"){
			demoUI = <TreeDemo/>;
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

