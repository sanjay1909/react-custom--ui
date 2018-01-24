import React from "react";
import { render } from "react-dom";
import ResizablePaneDemo from "./resizablePane";


class App extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
    <div>
      <ResizablePaneDemo/>
    </div>
    );
  }
}
render((<App/>), document.getElementById("app"));

