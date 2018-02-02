import React from "react";
import "./style.css";
import CustomUI from "./../../lib";
const Tree = CustomUI.Tree;
const data = [
	{
		displayName: "node_modules",
		id:1,
		value:[
			{
				displayName: ".bin",
				id:1.1,
				value:[
					{
						id:1.2,
						displayName:"babel"
					},
					{
						id:1.3,
						displayName:"webpack"
					},
					{
						id:1.4,
						displayName:"webpack-dev-server"
					}
				]
			},
			{
				id:1.2,
				displayName: "react",
				value:[
					{
						id:1.21,
						displayName: "dist",
						value:[
							{
								id:1.211,
								displayName:"react.js"
							},
							{
								id:1.212,
								displayName:"react-with-addons.js"
							}
						]
					}
				]
			},
			{
				id:1.3,
				displayName: "react-dom",
				value: [
					{
						id:1.31,
						displayName: "dist",
						value:[
							{
								id:1.311,
								displayName:"react-dom.js"
							},
							{
								id:1.312,
								displayName:"react-dom-server.js"
							}
						]
					},
				]
			},
		]
	},
	{
		id: 2,
		displayName: "src",
		value:[
			{
				id: 2.1,
				displayName: "resizablePane",
				value:[
					{
						id: 2.11,
						displayName:"index.js"
					},
					{
						id: 2.12,
						displayName:"resizer.js"
					},
					{
						id: 2.13,
						displayName:"style.css"
					}
				]
			},
			{
				id: 2.2,
				displayName: "tree",
				value:[
					{
						id: 2.21,
						displayName:"index.js"
					},
					{
						id: 2.22,
						displayName:"treeNode.js"
					},
					{
						id: 2.23,
						displayName:"style.css"
					}
				]
			}
		]
	},
	{
		id: 3,
		displayName:".babelrc"
	},
	{
		id: 4,
		displayName:"LICENSE"
	},
	{
		id: 5,
		displayName:"package.json"
	}

];

const rootData = {
	displayName: "react-custom-ui",
	id:100,
	value:data
}
export default class Demo extends React.Component{
	constructor(props){
		super(props);
	}

	renderAccordionDescription(){
		return (
			<blockquote>
				<p><i>Accordion Mode: (accordion)</i> </p>
				Only one Subtree will be expanded at a time. Use <u>prop mode</u> to set to accordion mode
			</blockquote>
		);
	}

	renderRegularDescription(){
		return (
		<blockquote>
			<p><i>Regular Mode: (default)</i></p>
			Any subtree can remain expanded. can be closed only by clicking on them
		</blockquote>
		);
	}

	render(){
		const descriptionUI = this.props.demoName === 'accordion' ? this.renderAccordionDescription() : this.renderRegularDescription();
		return(
			<div>
				{descriptionUI}
				<Tree data={rootData} mode={this.props.demoName}/>
			</div>
		);
	}
}