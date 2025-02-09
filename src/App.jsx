import { useState } from "react";

import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./assets/components/GameOver";

const PLAYERS = {
  X: 'Player 1',
    O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
      }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const {tile, player} = turn;
    const {row, col} = tile;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  // Setting winning combinations and checking for winner
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstTileSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondTileSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdTileSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstTileSymbol &&
      firstTileSymbol === secondTileSymbol &&
      firstTileSymbol === thirdTileSymbol
    ) {
      winner = players[firstTileSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  // Check for draw condition
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleSelectTile(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        {
          tile: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* PLAYERS BLOCK */}

        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* GAME BOARD BLOCK */}

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestartGame}/>}

        <GameBoard
          onSelectTile={handleSelectTile}
          board={gameBoard}
        />
      </div>

      {/* LOG BLOCK */}
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
