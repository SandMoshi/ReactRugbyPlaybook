import React from 'react';

import shirtBlack10 from '../img/shirt-black-10.png';
import shirtBlack11 from '../img/shirt-black-11.png';
import shirtBlack12 from '../img/shirt-black-12.png';
import shirtBlack13 from '../img/shirt-black-13.png';
import shirtBlack14 from '../img/shirt-black-14.png';
import shirtBlack15 from '../img/shirt-black-15.png';

import '../css/board.css';
import { initializeCanvas } from '../js/canvas.js';
//import { draw } from '../js/canvas.js';
//import { save2canvas } from '../js/canvas.js';

class Board extends React.Component{

  constructor(){
    super();
    this.changeTool = this.changeTool.bind(this);
    //create empty objects in the state
    this.state = {
      tool:{},
      drawing:{},
      plays:{
        // playname:{},
      },
    };
  };

  changeTool(tool, src){
    console.log(src);
    //duplicate our state
    const toolstate = {...this.state.tool};
    //change the tools
    const newtoolstate = {name:tool, src: src};
    //update the state
    this.setState({tool:newtoolstate});
  }

  componentDidMount(){
    initializeCanvas();
  };

  draw(e,tool,src){
    if(!tool){
      return;
    }
    if(!src){
      return;
    }
    console.log("tool = " + tool);
    console.log(src);
    console.log(e);
    const w = 64; //width of image
    const h = 64; //height of image
    const canvas = document.querySelector("canvas#canvas");
    const ctx = canvas.getContext('2d');
    var isDrawing = true;
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left -30;
    var y = e.clientY - rect.top -30;
    console.log("x: " + x + " y: " + y);
    ctx.drawImage(src,x,y,w,h);
    this.save2canvas(tool,src,x,y,w,h);
  };

  save2canvas(tool,src,x,y,w,h){
    //This function will save what was drawn on the canvas to state
    console.log("saved to console:");
    console.log(src);
    //get state
    const drawState = {...this.state.drawing};
    console.log(drawState);
    //change the state
    const drawing = {
      tool: tool,
      src: src,
      x: x,
      y:x,
      w:w,
      h:h,
    };
    const timestamp = Date.now(); //get non duplicating number
    drawState[`drawing-${timestamp}`] = drawing;
    this.setState({drawing: drawState});
  }

  save2list(event){
    event.preventDefault(); //prevent browser refresh
    const drawState = {...this.state.drawing};
    const plays = {...this.state.plays};
    var playName = this.inputplayname.value;
    plays[playName] = {};

    //This loops over all the items in the drawstate object
    Object.keys(drawState).forEach( key => {
      plays[playName][key]  = drawState[key];
    });
    console.log(plays);
    this.setState({plays: plays});
  }

  render(){
    return(
      <div className="canvas">
        <canvas id="canvas" width="800" height="600" onClick={(e) => this.draw(e, this.state.tool.name, this.state.tool.src)}></canvas>
        <div className="tools">
          <img className="jersey 10" src={shirtBlack10} onClick={(e) => this.changeTool("icon", e.target)}></img>
          <img className="jersey 11" src={shirtBlack11} onClick={(e) => this.changeTool("icon", e.target)}></img>
          <img className="jersey 12" src={shirtBlack12} onClick={(e) => this.changeTool("icon", e.target)}></img>
        </div>
        <form className="save2list" onSubmit={ (event) => this.save2list(event)}>
          <input type="text" required placeholder="Play Name" ref={ (input) => {this.inputplayname = input}}/>
          <button className="save2list">Save Play</button>
        </form>
      </div>
    )
  }
}

export default Board;
