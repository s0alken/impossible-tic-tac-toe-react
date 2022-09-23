
import React, { useState } from "react";
import Game from "./components/Game";
import Main from "./components/Main";
import Menu from "./components/Menu";
import Room from "./components/Room";
import { GameConfigContext } from "./context/GameConfigContext";

function App() {

  const [gameType, setGameType] = useState(null);
  const [playerMark, setPlayerMark] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [roomId, setRoomId] = useState('');

  if (gameType === 'cpu') {
    return (
      <Main>
        <GameConfigContext.Provider value={{
          gameType,
          setGameType,
          setPlayerMark,
          setDifficulty,
          difficulty,
          playerMark,
          player1: playerMark,
          player2: playerMark === 'cross' ? 'circle' : 'cross',
        }}>
          <Game />
        </GameConfigContext.Provider>
      </Main>
    );
  }

  if (gameType === 'player') {
    return (
      <Main>
        <GameConfigContext.Provider value={{
          gameType,
          setGameType,
          setPlayerMark,
          playerMark
        }}>
          <Room roomId={roomId} />
        </GameConfigContext.Provider>
      </Main>
    );
  }

  return (
    <Main>
      <Menu
        setGameType={setGameType}
        setPlayerMark={setPlayerMark}
        setDifficulty={setDifficulty}
        setRoomId={setRoomId}
        roomId={roomId}
      />
    </Main>
  )

  /* return (
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
  ); */
}

export default App;
