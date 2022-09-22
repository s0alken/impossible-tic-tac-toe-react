
import React, { useState } from "react";
import Game from "./components/Game";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { GameConfigContext } from "./context/GameConfigContext";

function App() {

  const [gameType, setGameType] = useState(null);
  const [playerMark, setPlayerMark] = useState(null);
  const [difficulty, setDifficulty] = useState(null);

  return (
    <Main>
      {playerMark && gameType && difficulty ?
        <GameConfigContext.Provider value={{
          gameType,
          setGameType,
          setPlayerMark,
          setDifficulty,
          difficulty,
          player1: playerMark,
          player2: playerMark === 'cross' ? 'circle' : 'cross',
        }}>
          <Game />
        </GameConfigContext.Provider> :
        <Menu
          setGameType={setGameType}
          setPlayerMark={setPlayerMark}
          setDifficulty={setDifficulty}
        />}
    </Main>
  );
}

export default App;
