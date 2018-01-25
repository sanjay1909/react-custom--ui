import React from "react";
import Resizer from "./Resizer";
import ReactDOM from "react-dom";
import "./style.css";

const VERTICAL="vertical";
const HORIZONTAL="horizontal";

export default class ResizablePane extends React.Component{
	constructor(props){
		super(props);
		this.formerPanesSize = [];

		this.state= {
			activeResizerIndex: NaN,
			dragging: false,
			resizingformerPaneDimension: null,
			mousePos: NaN,
		};

		this.resizerMouseMoveHandler = this.resizerMouseMoveHandler.bind(this);
		this.resizerMouseUpHandler = this.resizerMouseUpHandler.bind(this);
	}

	resizerMouseDownHandler(index, event) {
		const formerPane = ReactDOM.findDOMNode(this.children[index]);
		let formerPaneSize;
		let mousePos;
		if(this.props.direction === HORIZONTAL){
			mousePos = event.clientX;
			formerPaneSize = formerPane.getBoundingClientRect().width;
		}else{
			mousePos = event.clientY;
			formerPaneSize = formerPane.getBoundingClientRect().height;
		}

		this.setState({
			mousePos:mousePos,
			activeResizerIndex: index,
			dragging: true,
			resizingformerPaneDimension: formerPaneSize
		});

		// listeners are added only when resizer is selected
		ReactDOM.findDOMNode(this).addEventListener("mousemove",this.resizerMouseMoveHandler);
		ReactDOM.findDOMNode(this).addEventListener("mouseup",this.resizerMouseUpHandler);

		event.stopPropagation();
		event.preventDefault();
	}

	resizerMouseMoveHandler(event){
		const {dragging, mousePos, resizingformerPaneDimension} = this.state;
		if (!dragging) {
			return;
		}

		let newMousePos;

		if(this.props.direction === HORIZONTAL){
			newMousePos = event.clientX;

		}else{
			newMousePos = event.clientY;

		}
		const  draggedDistance = newMousePos - mousePos;
		const  newDimension = resizingformerPaneDimension + draggedDistance;

		this.setState({
			resizingformerPaneDimension: newDimension,
			mousePos: newMousePos
		});

		event.stopPropagation();
		event.preventDefault();
	}

	resizerMouseUpHandler(event){
		const {activeResizerIndex, resizingformerPaneDimension} = this.state;

		if (!isNaN(activeResizerIndex)) {
			this.formerPanesSize[activeResizerIndex] = resizingformerPaneDimension;
		}

		this.setState({
			dragging: false,
			activeResizerIndex: NaN,
			resizingformerPaneDimension: null,
			mousePos: NaN
		});

		ReactDOM.findDOMNode(this).removeEventListener("mousemove", this.resizerMouseMoveHandler);
		ReactDOM.findDOMNode(this).removeEventListener("mouseup", this.resizerMouseUpHandler);

		event.stopPropagation();
		event.preventDefault();
	}

	render(){
		const {children, className, style, direction, paneSize} = this.props;
		const {dragging, activeResizerIndex, resizingformerPaneDimension} = this.state;


		let childrenUI = [];
		const childCount = React.Children.count(children);//to make sure resizer is not added after last child
		const lastChildIndex = childCount - 1;

		this.children = [];
		React.Children.forEach(children, (child, index) => {
			if (!child){
				return;
			}
			const paneFlexValue = (paneSize && paneSize[index] !== undefined) ? paneSize[index] : undefined;
			let childStyle = {
				overflow: "auto",
				display:"flex",
			};
			let refFunction = null;
			if(paneFlexValue === undefined){
				childStyle.flexDirection = direction === HORIZONTAL ? "row" : "column";
				if (lastChildIndex === index) {//last child takes rest of the space of the container
					childStyle.flex = 1;
				}
				else {
					let dimension;
					if (dragging) {
						dimension = (activeResizerIndex === index) ? resizingformerPaneDimension : this.formerPanesSize[index];
					}
					else {
						dimension = this.formerPanesSize[index];
					}
					(direction === HORIZONTAL) ? (childStyle.width = dimension) : (childStyle.height = dimension);
				}
				refFunction = (domNode) => {this.children[index] = domNode;};
			}else{
				const flexbasisValue = paneFlexValue * 100 + "%";
				childStyle.flex = "0 1 " + flexbasisValue;
			}

			const childUI = (
				<div className="pane"
					key={"child"+index}
					style={childStyle}
					ref={refFunction}>
					{child}
				</div>
			);
			childrenUI.push(childUI);

			/* ***** Resizer ****** */
			if(paneFlexValue === undefined){
				if (lastChildIndex !== index) { //resizer is added right after every child except last child
					let ref = "resizer"+index;
					const resizerUI = (
						<Resizer key={ref}
							ref={ref}
							type={direction}
							onMouseDown = { this.resizerMouseDownHandler.bind(this,index) }/>
					);

					childrenUI.push(resizerUI);
				}
			}

		});


		// required style values, hence inline style
		const paneContainerStyle = Object.assign({}, style, {
			flex: "1 1 0%",
			display: "flex",
			overflow: "auto",
			position: "relative" // to support absolute child
		});

		if(direction === HORIZONTAL){
			paneContainerStyle.flexDirection = "row";
		} else {
			paneContainerStyle.flexDirection = "column";
		}

		return (
			<div className={className} style={paneContainerStyle}>
				{childrenUI}
			</div>
		);
	}
}