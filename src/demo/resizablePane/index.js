import React from "react";
import "./style.css"
import CustomUI from "./../../lib";
const ResizablePane = CustomUI.ResizablePane;

export default class Demo extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div>
      <h3>Pane - Fixed Dimension</h3>
      <ResizablePane direction="horizontal" paneSize={[.3, .3,.4]} >
        <div>Child 1 30%</div>
        <div>Child 2 30%</div>
        <div>Child 3 40%</div>
      </ResizablePane>
      <h3>Resizable Pane - horizontal</h3>
      <ResizablePane direction="horizontal">
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ResizablePane>
      <h3>Resizable Pane - Vertical</h3>
      <ResizablePane direction="vertical"  >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </ResizablePane>
      <h3>Resizable Pane - Vertical and Horizontal</h3>
      <ResizablePane direction="vertical" >
        <div>Child 1</div>
        <div>Child 2</div>
        <div>
          <h4>Resizable Pane - Horizontal one fixed width</h4>
          <ResizablePane direction="horizontal"  paneSize={[.3]}>
            <div>Child 3 30%</div>
            <div>Child 4</div>
            <div>Child 5</div>
          </ResizablePane>
        </div>
      </ResizablePane>
    </div>
    );
  }
}