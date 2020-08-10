import React, { useState } from 'react';
import '../App.css';
import { Square } from './square';
import { Button } from 'react-bootstrap';

export interface TicTacToeComponentProps {
  p1Name: string;
  p2Name: string;
  setP1Score: () => void;
  setP2Score: () => void;
}

export const Board: React.FC<TicTacToeComponentProps> = (props) => {
  const [show, setShow] = useState(false);
  const [squares, setSquares] = useState(Array(9).fill(' '));
  const [p1IsNext, setP1IsNext] = useState(true);
  const [xIsNext, setXIsNext] = useState(true);
  const [color, setColor] = useState<'secondary' | 'success' | 'primary'>('secondary');

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} color={color} />
  }
  let status: string;

  const switchFirstPlayer = () => {
    setP1IsNext(!p1IsNext);
    setXIsNext(!xIsNext);
    status = "It's your turn " + (p1IsNext ? props.p1Name : props.p2Name);
  }

  const clearButton = () => {
    if(squares.includes('X' || 'O')) {
        return;
    }
    return <Button onClick={switchFirstPlayer}>Switch First Player</Button>;
  }

  let winner = calculateWinner(squares);
  if(!winner) {
    status = "It's your turn " + (p1IsNext ? props.p1Name : props.p2Name);
  }else {
    status = `${winner} won! Make sure to click below before leaving or you'll miss your points!`;
  }

  const renderRestartButton = () => {
    if(status.includes('won')) {
      return <Button onClick={playAgain} variant='warning' size='lg'>CLICK TO SET POINTS AND RESTART</Button>;
    }
  }

  const handleClick = (i: number) => {
    const squareArr = squares.slice();
    const colorArr = squares.slice();
    if(calculateWinner(squareArr)) {
      return;
    }
    let endGame = squares.filter((i) => i == ' ');
    if(endGame.length == 0) {
      alert("The board is full! Click 'Clear game' below to play again.")
      return;
    }
    colorArr[i] = xIsNext ? 'success' : 'primary';
    if(squareArr[i] != ' ') {
      alert('This square is already taken!');
    }else {
      squareArr[i] = xIsNext ? 'X' : 'O';
    }
    setColor(colorArr[i]);
    setSquares(squareArr);
    setXIsNext(!xIsNext);
    setP1IsNext(!p1IsNext);
  }

  const playAgain = () => {
    setSquares(Array(9).fill(' '));
    if(winner === props.p1Name) {
      props.setP1Score();
    }else if(winner === props.p2Name) {
      props.setP2Score();
    }
  }

  function calculateWinner(squares: any[]) {
    console.log('calculate winner fired off');
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
      if (squares[a] && squares[a] !== ' ' && squares[a] === squares[b] && squares[a] === squares[c]) {
        const winner = (squares[a] == 'X') ? props.p1Name : props.p2Name;
        console.log(winner);
        return winner;
        //return squares[a];
      }
    }
    return null;
  }

  return(
    <div>
        <h1>Tic-Tac-Toe <span>{clearButton()}</span></h1>
        <hr/>
        <div className="status">{status}</div>
        {renderRestartButton()}
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <br/>
        <br/>
        <Button variant='outline-danger' size='lg' onClick={playAgain} >Clear game</Button>
      </div>
  )
}