import React from 'react';
import ReactDom from 'react-dom';
import './index.css'

const Square = (props) => {
  return (
    <button className = "square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }

  }

  handleClick(i) {
    console.log('handle click', i);
    const squares = this.state.squares.slice();
    
    if (findWinner(this.state.squares) || squares[i])
      return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      squares, 
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return ( 
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  /**
   * @param {*} squares 
   * return null if no winner found
   * return X or O as winner
   */
  

  render() {
    const winner = findWinner(this.state.squares)
    
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div> 
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className='board-row'>
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className='board-row'>
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className='board-row'>
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className='board-row'>
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className='game'> 
        <div className='game-board'>
          <Board />
        </div>

        <div className='game-info'>
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

ReactDom.render(
  <Game />,
  document.getElementById('root')
);

/**
 * fix 5x5 board
 * 3 win
 * @param {*f} squares 
 */
function findWinner(squares) {
  let index, n = 5;
  
  for (let x = 0; x < n; x++) {
    for (let y = 0; y < n; y++) {
      index = x * n + y
      if (!squares[index] || x > 2 ||y > 2) {
        continue
      }
      console.log('i, i+1; i+2', squares[index], squares[index+1], squares[index+2])
      if (squares[index] === squares[index+1] && squares[index] === squares[index+2]) {
        console.log('found')
        return squares[index]
      }
      
      if (squares[index] === squares[index+n+1] && squares[index] === squares[index+2*n+2])
        return squares[index]
      
      if (squares[index] === squares[index+n] && squares[index]=== squares[index+2*n])
        return squares[index]
    }
  }
  return null
}