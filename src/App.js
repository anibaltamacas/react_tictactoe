import React, { Component } from 'react';
import './App.css';
import Announcement from './Announcement';
import ResetButton from './ResetButton';

class App extends Component {

  //initialize, always starts with X
  constructor(){
    super();
    this.state = {
      turn: 'X',
      gameEnded: false,
      winner: null,
      board: Array(9).fill(''),
      totalMoves: 0
    }
  }

  clicked(event){
    this.state.board[event.target.dataset.square]=this.state.turn;
    if (event.target.innerText === ""){
      event.target.innerText = this.state.turn;
      var movesSoFar = this.state.totalMoves;
      //increment number of moves
      movesSoFar++;

      if (this.state.turn === 'X'){
          this.setState({
            turn: 'O',
            board: this.state.board,
            totalMoves: movesSoFar
          })
        }
      else {
         this.setState({
           turn: 'X',
           board: this.state.board,
           totalMoves: movesSoFar
        })
      }
      console.log("total moves "+this.state.totalMoves);
      var result = this.checkWinner();

      if (result){
        this.setState(
          {
            gameEnded: true,
            winner: result,
          }
        )
        console.log("winner " + result);
      }


     }
    }

  resetBoard(){

      window.location.reload();
    }

  checkWinner(){
    var moves = [[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8]];
    var board = this.state.board;
    for (let i=0; i<moves.length; i++){
      // no empty winner matches
      console.log (this.state.totalMoves);
      if (board[moves[i][0]] === 'X' || board[moves[i][0]] === 'O')
      {
        if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][0]] == board[moves[i][2]])
        {
          return board[moves[i][0]] + " wins!";
        }
        else if (this.state.totalMoves == 8)
        {
          return 'We have a draw.';
        }
      }


    }
  }



  render() {
    return (
      <div id="game">
        <div id="head">
          TTT
        </div>
        <div id="board" onClick={(e)=>this.clicked(e)}>
            <div className="square" data-square="0"></div>
            <div className="square" data-square="1"></div>
            <div className="square" data-square="2"></div>
            <div className="square" data-square="3"></div>
            <div className="square" data-square="4"></div>
            <div className="square" data-square="5"></div>
            <div className="square" data-square="6"></div>
            <div className="square" data-square="7"></div>
            <div className="square" data-square="8"></div>
        </div>
        <Announcement winner={this.state.winner}/>
        <ResetButton reset={this.resetBoard.bind(this)}/>
      </div>
    );
  }
}

export default App;
