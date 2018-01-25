import React from "react";
import "./style.css";
import CustomUI from "./../../lib";
const Tree = CustomUI.Tree;
const data = [
	{
		displayName: "node_modules",
		value:[
			{
				displayName: ".bin",
				value:[
					{
						displayName:"babel"
					},
					{
						displayName:"webpack"
					},
					{
						displayName:"webpack-dev-server"
					}
				]
			},
			{
				displayName: "react",
				value:[
					{
						displayName: "dist",
						value:[
							{
								displayName:"react.js"
							},
							{
								displayName:"react-with-addons.js"
							}
						]
					}
				]
			},
			{
				displayName: "react-dom",
				value: [
					{
						displayName: "dist",
						value:[
							{
								displayName:"react-dom.js"
							},
							{
								displayName:"react-dom-server.js"
							}
						]
					},
				]
			},
		]
	},
	{
		displayName: "src",
		value:[
			{
				displayName: "resizablePane",
				value:[
					{
						displayName:"index.js"
					},
					{
						displayName:"resizer.js"
					},
					{
						displayName:"style.css"
					}
				]
			},
			{
				displayName: "tree",
				value:[
					{
						displayName:"index.js"
					},
					{
						displayName:"treeNode.js"
					},
					{
						displayName:"style.css"
					}
				]
			}
		]
	},
	{
		displayName:".babelrc"
	},
	{
		displayName:"LICENSE"
	},
	{
		displayName:"package.json"
	}

];
export default class Demo extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Tree data={data}/>
			</div>
		);
	}
}