import React from 'react';
import ReactDOM from "react-dom";
import './index.css';


// Child Square component 
function Square(props) {
   return(
        <button className='square' onClick={props.onClick}>
            {props.value}

        </button>
   );
  }
  

  //parent BOARD componenet 
  class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xISNext: true,
        }
    }

    handleClick(i) {
        
        const squares = this.state.squares.slice(); //slice creates a copy of the array to modify, instead of modyfying the original
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] =  this.state.xISNext ? "x" : "o";
        this.setState({
            squares : squares,
            xISNext: !this.state.xISNext,
        });    
    }

    //this is a prop
    renderSquare(i) {
   
        // we are passing down two props down to square.    Value and onClick

      return (
      <Square value = {this.state.squares[i]}
      onClick = {() => this.handleClick(i)}
      /> );  //try and get rid of this parens, see if it breaks the code. 
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status ;
        if (winner){
            status = "Winner" + winner ;
        }else {
            status = "Next Player" + (this.state.xISNext ? 'X' : 'O');
        }
      
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }