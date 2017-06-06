import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      turn: 'X',
      gameEnded: false
    }
  }

  clicked(event){
    console.log(event.target);
    event.target.innerText = this.state.turn;
    if (this.state.turn === 'X'){
        this.setState({turn: 'O'})
      }
    else {
       this.setState({turn: 'X'})
    }
    }



  render() {
    return (
      <div id="game">
        <div id="head">
          TTT
        </div>
        <div id="board" onClick={(e)=>this.clicked(e)}>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
        </div>
      </div>
    );
  }
}

export default App;
