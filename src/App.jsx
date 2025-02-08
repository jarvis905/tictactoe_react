import { useState } from "react";

import Player from "./assets/components/Player";
import GameBoard from "./assets/components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectTile() {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        {/* PLAYERS BLOCK */}

        <ol id="players" className="highlight-player">
          
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
          
        </ol>

        {/* GAME BOARD BLOCK */}

        <GameBoard onSelectTile={handleSelectTile} activePlayerSymbol={activePlayer} />
      </div>
    </main>
  );
}

export default App;
