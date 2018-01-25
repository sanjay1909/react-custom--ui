import React from "react";
import "./style.css";

export default class TreeNode extends React.Component{
	constructor(props){
		super(props);
		this.toggleChildren = this.toggleChildren.bind(this);
		this.state = {
			show:false
		};

	}

	toggleChildren(){
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

	renderChildren() {
		const {node} = this.props;

		let value = node.value;
		if(Array.isArray(value) ){
			const childrenUI = this.state.show ? value.map((child, index) => {
				<TreeNode key={index}
				          node={child}
				          onNodeClick={this.toggleChildren}/>
			}) : null;
			const klassName = this.state.show ? "fa fa-folder-open fa-fw" : "fa fa-folder fa-fw"
			return [
				<span key="header" onClick={this.toggleChildren}><i className={klassName}></i> {node.displayName}</span>,
				<ul key="children" className="tree-node-children">{childrenUI}</ul>
			];
		} else {
			return <div onClick={()=>this.props.onNodeClick(node)}><i className="fa fa-file-text-o fa-fw"></i> {node.displayName}</div>

		}
	}

	render() {
		return (
			<li className="tree-node">
				{this.renderChildren()}
			</li>
		);
	}
}