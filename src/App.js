
import React, { useState } from "react";
import Game from "./components/Game";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { GameTypeContext } from "./context/GameTypeContext";

function App() {

  const [gameType, setGameType] = useState(null);
  const [playerMark, setPlayerMark] = useState(null);

  return (
    <Main>
      {playerMark && gameType ?
        <GameTypeContext.Provider value={{
          gameType,
          setPlayerMark,
          setGameType,
          player1: playerMark,
          player2: playerMark === 'cross' ? 'circle' : 'cross',
        }}>
          <Game />
        </GameTypeContext.Provider> :
        <Menu setGameType={setGameType} setPlayerMark={setPlayerMark} />}
    </Main>
  );
}

export default App;
