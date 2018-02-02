import React from "react";
import "./style.css";
import TreeNode from "./treeNode";

export default class Tree extends React.Component{
	constructor(props){
		super(props);
		if(this.props.mode === "accordion"){
			this.state = {
				activeNodePath: []
			};

		}
		this.setActiveNodePath = this.setActiveNodePath.bind(this);
	}


	setActiveNodePath(path){
		this.setState({
			activeNodePath: path
		});
	}


	renderFirstLevelChildren(firstLevelChildren, isRoot){
		let {onNodeClick,mode} = this.props;
		const activeNodePath = this.state ? this.state.activeNodePath : null;
		if(isRoot){
			return (<TreeNode node={firstLevelChildren}
			                  mode={mode}
			                  isRoot={isRoot}
			                  setActiveNodePath={this.setActiveNodePath}
			                  activeNodePath={(mode === "accordion" || mode === "crumb") ? activeNodePath : undefined}
			                  onNodeClick={onNodeClick}/>);
		}
		mode === "crumb" && console.warn("Crumb mode works only for Root Level data not array level data");
		mode = mode === "crumb" ? "accordion" : mode;
		return firstLevelChildren.map(
		(node, index) => <TreeNode key={index}
		                           node={node}
		                           mode={mode}
		                           setActiveNodePath={this.setActiveNodePath}
		                           activeNodePath={(mode === "accordion") ? activeNodePath : undefined}
		                           onNodeClick={onNodeClick}/>

		);
	}

	render() {
		const {data, mode} = this.props;
		const isArrayData = Array.isArray(data);
		const root = isArrayData ? null : data;
		const firstLevelChildren = isArrayData ? data : data.value;

		if(root) {
			return this.renderFirstLevelChildren(root,true);
		}
		const childrenUI = this.renderFirstLevelChildren(firstLevelChildren);
		return (
			<ul className="tree">
				{childrenUI}
			</ul>
		);
	}
}