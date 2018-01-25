import React from "react";
import "./style.css";
import TreeNode from "./treeNode";

export default class Tree extends React.Component{
	render() {
		const {data, onNodeClick, onLeafClick} = this.props;

		return (
			<ul className="tree">
				{
					data.map((node, index) =>
						<TreeNode key={index}
						          node={node}
						          onNodeClick={onNodeClick} onLeafClick={onLeafClick}/>
					)
				}
			</ul>
		);
	}
}