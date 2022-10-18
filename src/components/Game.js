import React, { useState, useContext } from 'react';
import '../styles/Game.scss';
import Header from './Header';
import BoardVsCPU from './BoardVsCPU';
import BoardVsPlayer from './BoardVsPlayer';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import Popup from './Popup';
import PopupRestart from './PopupRestart';
import { useSocket } from '../context/SocketProvider';

export default function Game() {

    const [turn, setTurn] = useState('cross');
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isWinner, setIsWinner] = useState(null);
    const [score, setScore] = useState({ circle: 0, tie: 0, cross: 0 });
    const [isPopupRestartOpen, setIsPopupRestartOpen] = useState(false);

    const { gameType } = useContext(GameConfigContext);

    const socket = useSocket();

    const restartGame = () => {
        if (gameType === 'player') {
            socket.emit('game-restart');
            return;
        }

        handleRestartGame();
    }

    const handleRestartGame = () => {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupRestartOpen(false);
        setScore({ cross: 0, tie: 0, circle: 0 });
    }

    return (
        <GameContext.Provider value={{
            turn,
            setTurn,
            board,
            setBoard,
            isWinner,
            setIsWinner,
            score,
            setScore,
            setIsPopupRestartOpen,
            restartGame, 
            handleRestartGame
        }}>
            <div className="game fadeInUp">
                <Header setIsPopupRestartOpen={setIsPopupRestartOpen} />
                {gameType === 'cpu' ? <BoardVsCPU /> : <BoardVsPlayer />}
                <Scoreboard />
            </div>
            <Popup show={isPopupRestartOpen}>
                <PopupRestart setIsPopupRestartOpen={setIsPopupRestartOpen} />
            </Popup>
        </GameContext.Provider >
    )
}
