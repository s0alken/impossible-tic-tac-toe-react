
import React, { useState } from "react";
import Game from "./components/Game";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { GameConfigContext } from "./context/GameConfigContext";

function App() {

  const [gameType, setGameType] = useState(null);
  const [playerMark, setPlayerMark] = useState(null);

  const difficulty = "impossible";

  return (
    <Main>
      {playerMark && gameType ?
        <GameConfigContext.Provider value={{
          gameType,
          setPlayerMark,
          setGameType,
          player1: playerMark,
          player2: playerMark === 'cross' ? 'circle' : 'cross',
          difficulty: difficulty
        }}>
          <Game />
        </GameConfigContext.Provider> :
        <Menu setGameType={setGameType} setPlayerMark={setPlayerMark} />}
    </Main>
  );
}

export default App;
