import React, { useState } from "react";
import '../styles/App.scss';
import Game from "./Game";
import Main from "./Main";
import Menu from "./Menu";
import JoinRoom from "./JoinRoom";
import { GameConfigContext } from "../context/GameConfigContext";
import { SocketProvider } from "../context/SocketProvider";

function App() {

  const [gameType, setGameType] = useState(null);
  const [playerMark, setPlayerMark] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [scoreLabels, setScoreLabels] = useState({});

  if (gameType === 'cpu') {
    return (
      <Main>
        <GameConfigContext.Provider value={{
          gameType,
          setGameType,
          playerMark,
          setPlayerMark,
          difficulty,
          setDifficulty,
          player1: playerMark,
          player2: playerMark === 'cross' ? 'circle' : 'cross',
          scoreLabels
        }}>
          <Game />
        </GameConfigContext.Provider>
      </Main>
    );
  }

  if (gameType === 'player') {

    return (
      <Main>
        <SocketProvider roomId={roomId}>
          <GameConfigContext.Provider value={{
            gameType,
            setGameType,
            playerMark,
            setPlayerMark,
            scoreLabels,
            setScoreLabels
          }}>
            <JoinRoom roomId={roomId} />
          </GameConfigContext.Provider>
        </SocketProvider>
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
        scoreLabels={scoreLabels}
        setScoreLabels={setScoreLabels}
      />
    </Main>
  )

}

export default App;
