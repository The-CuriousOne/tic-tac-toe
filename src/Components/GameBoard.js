import React, { useState } from "react";
import "./GameBoard.css";
import circle from "./Assets/circle.png";
import cross from "./Assets/cross.png";

let initialBoardState = ["", "", "", "", "", "", "", "", ""];

function GameBoard() {
  let [square, setSquare] = useState(initialBoardState);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [status, setStatus] = useState("Next Move: X");
  let [xScore, setXScore] = useState(0);
  let [oScore, setOScore] = useState(0);
  

  const renderSquare = (e, index) => {
    if(lock || square[index] !== ""){
      return;
    }

    let newSquare = square.slice();

    if(count%2===0){
      e.target.innerHTML = `<img src = '${cross}'/>`;
      newSquare[index] = "X";
    }
    else{
      e.target.innerHTML = `<img src = '${circle}'/>`;
      newSquare[index] = "O";
    }
    setSquare(newSquare);
    setCount(++count);

    const winner = checkWinner(newSquare);

    if(winner){
      setStatus(`The WINNER is: ${winner}`);
      setLock(true);
      winner==="X"?setXScore(++xScore):setOScore(++oScore);
    }
    else if(count === 9){
      setStatus("The Game is a DRAW");
    }
    else{
      setStatus(`Next Move: ${count%2===0?"X":"O"}`);
    }
  };

  const checkWinner = (square) => {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for(let line of lines){
      const [a,b,c] = line;
      if(square[a] && square[b] && square[c] &&square[a] === square[b] && square[b] === square[c] ){
        return square[a];
      }
    }

    return null;
  }

  const resetGame = () => {
    console.log(square);
    setSquare(initialBoardState);
    setLock(false);
    setCount(0);
    setStatus("Next Move: X");

    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.innerHTML = "";
    });
  };

  return (
    <div className="gameBoard">
      <div className="title">
        <h1>Tic Tac Toe</h1>
        <h3 className="staus-text">{status}</h3>
      </div>
      <div className="scoreBoard">
        <h3 className="scoreTitle">Score</h3>
        <div className="score">
          <h3 >X: {xScore}</h3>
          <h3 >O: {oScore}</h3>
        </div>
      </div>
      <div className="board">
        <div className="rows" id="row1">
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 0);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 1);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 2);
            }}
          ></div>
        </div>
        <div className="rows" id="row2">
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 3);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 4);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 5);
            }}
          ></div>
        </div>
        <div className="rows" id="row3">
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 6);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 7);
            }}
          ></div>
          <div
            className="box"
            onClick={(e) => {
              renderSquare(e, 8);
            }}
          ></div>
        </div>
      </div>
      <div className="btn">
        <button class="button" onClick={resetGame}>
          RESET
        </button>
      </div>
    </div>
  );
}

export default GameBoard;
