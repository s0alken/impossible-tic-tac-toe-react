import React, { useState, useContext, useEffect } from 'react';
import '../styles/Game.scss';
import Header from './Header';
import BoardVsCPU from './BoardVsCPU';
import BoardVsPlayer from './BoardVsPlayer';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import Popup from './Popup';
import PopupRestart from './PopupRestart';
import { useRef } from 'react';
import PopupResult from './PopupResult';
import useGameActions from '../hooks/useGameActions';

export default function Game() {

    const [turn, setTurn] = useState('cross');
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isWinner, setIsWinner] = useState(null);
    const [winnerClass, setWinnerClass] = useState(null);
    const [score, setScore] = useState({ circle: 0, tie: 0, cross: 0 });
    const [isPopupRestartOpen, setIsPopupRestartOpen] = useState(false);
    const [isPopupResultOpen, setIsPopupResultOpen] = useState(false);

    const { gameType } = useContext(GameConfigContext);

    const boardRef = useRef();

    const actionStates = {
        isWinner,
        setIsWinner,
        setBoard,
        setTurn,
        setScore,
        setIsPopupRestartOpen,
        setIsPopupResultOpen,
        score,
        setWinnerClass,
        boardRef
    }

    const {
        restartGame,
        handleRestartGame,
        setFinishedGame,
        handleQuit,
        setNextRound,
        handleNextRound
    } = useGameActions(actionStates);

    useEffect(() => {
        if (!isWinner) return;
        setFinishedGame();
    }, [isWinner, setFinishedGame]);

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
            restartGame,
            handleRestartGame,
            boardRef,
            setNextRound,
            handleNextRound,
            setIsPopupResultOpen,
            setIsPopupRestartOpen
        }}>
            <div className="game fadeInUp">
                <Header setIsPopupRestartOpen={setIsPopupRestartOpen} />
                {gameType === 'cpu' ? <BoardVsCPU /> : <BoardVsPlayer />}
                <Scoreboard />
            </div>
            <Popup show={isPopupRestartOpen} setIsPopupOpen={setIsPopupRestartOpen} closable>
                <PopupRestart setIsPopupRestartOpen={setIsPopupRestartOpen} />
            </Popup>
            <Popup show={isPopupResultOpen}>
                <PopupResult winner={winnerClass} handleQuit={handleQuit} handleNextRound={handleNextRound} />
            </Popup>
        </GameContext.Provider >
    )
}
