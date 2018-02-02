import React from "react";
import "./style.css";

export default class TreeNode extends React.Component{
	constructor(props){
		super(props);
		const {mode, node, activeNodePath} = props;
		if(mode === "accordion" || mode === "crumb"){
			this.state = {
				show: (activeNodePath && activeNodePath.indexOf(node.id) > -1)
			};
		} else {
			this.state = {
				show:false
			};
		}

		this.toggleChildren = this.toggleChildren.bind(this);
		this.onLeafClick = this.onLeafClick.bind(this);
		this.setActiveNodePath = this.setActiveNodePath.bind(this);
	}

	shouldExpandChildren(){

	}

	componentWillReceiveProps(nextProps){
		const {mode, node, activeNodePath} = nextProps;
		if(mode === "accordion" || mode === "crumb"){
			this.setState({
				show: (activeNodePath && activeNodePath.indexOf(node.id) > -1)
			});
		}
	}

	setActiveNodePath(path){
		path && path.push(this.props.node.id);
		this.props.setActiveNodePath(path);
	}
	toggleChildren(){
		const {mode } = this.props;
		if(mode === "accordion" || mode === "crumb"){
			if(this.state.show){
				this.setActiveNodePath(null);
				this.props.onNodeClick && this.props.onNodeClick(null);
			}  else {
				this.setActiveNodePath([]);
				this.props.onNodeClick && this.props.onNodeClick(this.props.node);
			}
		}else{
			this.setState({
				show: !this.state.show
			},()=>{
				if(this.state.show){
					this.props.onNodeClick && this.props.onNodeClick(this.props.node);
				}  else{
					this.props.onNodeClick && this.props.onNodeClick(null);
				}
			});
		}
	}

	onLeafClick(){
		this.props.onNodeClick && this.props.onNodeClick(this.props.node);
	}


	renderOpenedNodeChildren(openedNodeChildren){
		const {activeNodePath,mode,onNodeClick } = this.props;
		return openedNodeChildren.map((childNode, index) => {
			return <TreeNode key={index}
			                 node={childNode}
			                 mode={mode}
			                 activeNodePath={activeNodePath}
			                 setActiveNodePath={this.setActiveNodePath}
			                 onNodeClick={onNodeClick}/>;
		});
	}

	renderNodeChildren(nodeChildren){
		const {mode,node } = this.props;

		let childrenUI, klassName , crumbChildrenUI;
		if(this.state.show){
			childrenUI = this.renderOpenedNodeChildren(nodeChildren)
			klassName = "fa fa-folder-open fa-fw";
			crumbChildrenUI = (
				<div key="children" className="tree-crumb-children">
					<div className="tree-node-crumb-children">{childrenUI}</div>
				</div>
			);
		} else {
			klassName = "fa fa-folder fa-fw";
		}
		if(mode === "crumb") {
			return [
				<div key="header" onClick={this.toggleChildren}><i className={klassName}></i> {node.displayName}</div>,
				crumbChildrenUI
			];
		} else {
			return [
				<span key="header" onClick={this.toggleChildren}><i className={klassName}></i> {node.displayName}</span>,
				<ul key="children" className="tree-node-children">{childrenUI}</ul>
			];
		}
	}

	renderAsLeaf(){
		const {node, mode, activeNodePath } = this.props;
		if(mode === "crumb"){
			if(!(activeNodePath && activeNodePath.indexOf(node.id) > -1)){
				return null;
			}
		}
		return <div onClick={this.onLeafClick}><i className="fa fa-file-text-o fa-fw"></i> {node.displayName}</div>;
	}

	renderNode(node) {
		let value = node.value;
		if(Array.isArray(value) ){
			return this.renderNodeChildren(value);
		} else {
			return this.renderAsLeaf();
		}
	}

	render() {
		const { mode, isRoot, node } = this.props;
		if(mode === "crumb"){
			return (
				<div className="tree-node-crumb">
					{this.renderNode(node)}
				</div>
			);
		}
		if(isRoot){
			return (
				<ul className="tree">
					{this.renderNode(node)}
				</ul>
			);
		}
		return (
			<li className="tree-node">
				{this.renderNode(node)}
			</li>
		);
	}
}