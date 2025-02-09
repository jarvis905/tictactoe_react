import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditing() {
    setIsEditing((editing) => !editing);
    if(isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  let btnText = "Edit";

  if (isEditing) {
    editablePlayerName = <input type="text" placeholder="Player 1" required value={playerName} onChange={handleChange} />;
    btnText = "Save";
  }

  return (
    <li className={isActive ? 'active': undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleEditing()}>{btnText}</button>
    </li>
  );
}
