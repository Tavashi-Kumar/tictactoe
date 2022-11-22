import React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import './styles/root.scss';
import { calcWinner } from './helper';
const App = () => {
  const [board, updateBoardState] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(false);

  const winner = calcWinner(board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next player : ${isXNext ? 'X' : 'O'}`;

  const handleSquareClick = position => {
    if (board[position] != null || winner) {
      return;
    }

    updateBoardState(prevBoardState => {
      //console.log(prevBoardState);
      return prevBoardState.map((square_val, pos) => {
        //console.log(square_val);
        if (pos == position) {
          return isXNext ? 'X' : 'O';
        }
        return square_val;
      });
    });
    setIsXNext(prevBoardState => !prevBoardState);
  };

  return (
    <body>
      <div className="app">
        <h1>Tic-Tac-Toe</h1>
        <h3>{message}</h3>
        <Board board={board} handleSquareClick={handleSquareClick} />
      </div>
    </body>
  );
};

export default App;

// export default () => (
//   <>
//     <h1>Welcome to React Vite Micro App!</h1>
//     <p>Hard to get more minimal than this React app.</p>
//   </>
// );
