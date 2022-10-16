import React, { useState, useContext } from 'react';
import '../styles/Game.scss';
import Header from './Header';
import BoardVsCPU from './BoardVsCPU';
import BoardVsPlayer from './BoardVsPlayer';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';

export default function Game() {

    const [turn, setTurn] = useState('cross');
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isWinner, setIsWinner] = useState(null);
    const [score, setScore] = useState({ circle: 0, tie: 0, cross: 0 });

    const { gameType } = useContext(GameConfigContext);

    return (
        <div className="game">
            <GameContext.Provider value={{
                turn,
                setTurn,
                board,
                setBoard,
                isWinner,
                setIsWinner,
                score,
                setScore
            }}>
                <Header />
                {gameType === 'cpu' ? <BoardVsCPU /> : <BoardVsPlayer />}
                <Scoreboard />
            </GameContext.Provider>
        </div>
    )
}
