//Tic Tac Toe (basic AI version)
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
      totalMoves: 0,
      style: 'field'
    }
  }

   playGame(index){
    //are we still playing?
    //basically disable clicks after game is over
    if (this.state.gameEnded == false)
    {
      //update array's item if its blank
      if (this.state.board[index]== ''){
        this.state.board[index]=this.state.turn;
        //increment number of moves
        var movesSoFar = this.state.totalMoves;
        movesSoFar++;

        if (this.state.turn === 'X'){
            this.setState({
              turn: 'O',
              totalMoves: movesSoFar
            })
          }

        //did we win in that last move? otherwise let CPU play
        var dwin=this.checkWinner();
        if (!dwin)
        {
        //basic ai

          var flaggy=false;
          //don't try to play after game is over
          if (movesSoFar<9)
          {
            while (flaggy==false)
            {
              //choose random spot on array and see if its empty
              //if not empty rinse and repeat
              var rand_n = Math.floor(Math.random() * 9) + 0;
              if (this.state.board[rand_n]==''){
                this.state.board[rand_n]='O';
                flaggy=true;
                movesSoFar++;
                this.setState({
                  turn: 'X',
                  totalMoves: movesSoFar
               })
              }
            }
          }
        }
        //human player implementation
        /*else {
           this.setState({
             turn: 'X',
             totalMoves: movesSoFar
          })
        }*/
      }

      this.checkWinner();
    }
  }

  resetBoard(){
    //set everything to default
    this.setState({
      turn: 'X',
      gameEnded: false,
      winner: null,
      board: Array(9).fill(''),
      totalMoves: 0,
      style: 'field'
    })
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
            //who won? set message and colors for winner
            if (board[moves[i][0]]=='X')
            {
              this.setState(
              {
                gameEnded: true,
                winner: board[moves[i][0]] + " wins!",
                style: 'won'
              }
            )
           }


          else {
            this.setState(
            {
              gameEnded: true,
              winner: board[moves[i][0]] + " wins!",
              style: 'lost'
            }
          )
          }
          //return board[moves[i][0]];
          return true;
        }

      }

    }
    if (this.state.gameEnded == false && this.state.totalMoves ==8)
    {
      this.setState(
        {
          gameEnded: true,
          winner: "We have a draw",
          style: 'draw'
        }

      )
    }
  }

  render() {

    return (
      <div id="game">
        <div id="head">

        </div>
        <div id="board">
          {
            //map board array with board UI
            this.state.board.map((cell, index) => {
            return <div onClick={() => this.playGame(index)} data-cell-id={index} className={this.state.style}>{cell}</div>;
          })}
        </div>
        <ResetButton reset={this.resetBoard.bind(this)}/>
        <Announcement winner={this.state.winner}/>
        </div>
    );
  }
}

export default App;
