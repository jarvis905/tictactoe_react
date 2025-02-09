import { useState } from "react";

import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";
import Log from "./assets/components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./assets/components/GameOver";

const initialGameBoard = [
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

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  for (const turn of gameTurns) {
    const {tile, player} = turn;
    const {row, col} = tile;

    gameBoard[row][col] = player;
  }

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
      winner = firstTileSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>

        {/* GAME BOARD BLOCK */}

        {(winner || hasDraw) && <GameOver winner={winner} />}

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
