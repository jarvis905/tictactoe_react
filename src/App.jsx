import Player from "./assets/components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        {/* PLAYERS BLOCK */}

        <ol id="players">
          
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
          
        </ol>

        {/* GAME BOARD BLOCK */}
      </div>
    </main>
  );
}

export default App;
