//Tic Tac Toe
//Anibal Tamacas

import React, { Component } from 'react';
import './App.css';
import Announcement from './Announcement';
import ResetButton from './ResetButton';

class App extends Component {

  //initialize, game always starts with X
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

  //game logic
  clicked(event){
    //are we still playing?
    //basically disable clicks after game is over
    if (this.state.gameEnded == false)
    {
      //array item number
      var num=event.target.dataset.square;
      //update array's item if its blank
      if (this.state.board[num]== ''){
        this.state.board[num]=this.state.turn;
      }
      //is the target square empty?
      if (event.target.innerText == ''){
        //display X or o's on board.

        event.target.innerText = this.state.board[num];
        var movesSoFar = this.state.totalMoves;
        //increment number of moves
        movesSoFar++;


        if (this.state.turn === 'X'){
            this.setState({
              turn: 'O',
              //board: this.state.board,
              totalMoves: movesSoFar
            })
          }
        else {
           this.setState({
             turn: 'X',
             //board: this.state.board,
             totalMoves: movesSoFar
          })
        }

        this.checkWinner();


       }
     } //end if gameEnded
    }

  resetBoard(){
    window.location.reload();
  }


  checkWinner(){

    //winning combos
    var moves = [[0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6], [0,1,2], [3,4,5], [6,7,8]];
    var board = this.state.board;
    for (let i=0; i<moves.length; i++){
      // no empty winner matches
      if (board[moves[i][0]] === 'X' || board[moves[i][0]] === 'O')
      {
        //do we have a winning combo?
        if(board[moves[i][0]] == board[moves[i][1]] && board[moves[i][0]] == board[moves[i][2]])
        {

            this.setState(
              {
                gameEnded: true,
                winner: board[moves[i][0]] + " wins!",
              }
            )

          return board[moves[i][0]];

        }

      }

    }
    if (this.state.gameEnded == false && this.state.totalMoves ==8)
    {
      this.setState(
        {
          gameEnded: true,
          winner: "We have a draw",
        }
      )
    }
  }

  render() {
    return (
      <div id="game">
        <div id="head">

        </div>
        <div id="board" onClick={(e)=>this.clicked(e)}>
            <div className="field" data-square="0"></div>
            <div className="field" data-square="1"></div>
            <div className="field" data-square="2"></div>
            <div className="field" data-square="3"></div>
            <div className="field" data-square="4"></div>
            <div className="field" data-square="5"></div>
            <div className="field" data-square="6"></div>
            <div className="field" data-square="7"></div>
            <div className="field" data-square="8"></div>
        </div>
        <Announcement winner={this.state.winner}/>
        <ResetButton reset={this.resetBoard.bind(this)}/>

      </div>
    );
  }
}

export default App;
