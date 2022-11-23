import React from 'react';
import { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import './styles/root.scss';
import { calcWinner } from './helper';
//import { noMovesLeft } from './components/StatusMessage';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: false }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];

  const { winner, winningSquares } = calcWinner(current.board);

  const handleSquareClick = position => {
    if (current.board[position] != null || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square_val, pos) => {
        if (pos == position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square_val;
      });

      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const onNewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        Tic-<span className="text-white">Tac</span>-Toe
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />

      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>
      <h2 style={{ forntWeight: 'normal' }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <a href="https://github.com/Tavashi-Kumar/tictactoe.git" className="link">
        <i>GitHub Repository</i>
      </a>
      <div className="bg-balls" />
    </div>
  );
};

export default App;
