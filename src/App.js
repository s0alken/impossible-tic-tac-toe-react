
import React, { useState } from "react";
import Game from "./components/Game";
import Main from "./components/Main";
import Menu from "./components/Menu";
import Room from "./components/Room";
import { GameConfigContext } from "./context/GameConfigContext";
import { SocketContext, socket } from "./context/SocketContext";
import uniqid from 'uniqid';

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
    
    //tienes dos opciones, o setear tu mismo el roomId o automatico,
    //cuando se setea se invita al wn
    const userId = uniqid();

    return (
      <Main>
        <SocketContext.Provider value={{ socket, userId }}>
          <GameConfigContext.Provider value={{
            gameType,
            setGameType,
            setPlayerMark,
            playerMark
          }}>
            <Room roomId={roomId} />
          </GameConfigContext.Provider>
        </SocketContext.Provider>
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
