import React, { useState } from 'react';
import '../styles/Game.scss';
import Header from './Header';
//import Board from './Board';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';
import BoardCPU from './BoardCPU';

export default function Game() {

    const [turn, setTurn] = useState('cross');
    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isWinner, setIsWinner] = useState(null);
    const [score, setScore] = useState({ circle: 0, tie: 0, cross: 0 });

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
                <BoardCPU />
                <Scoreboard />
            </GameContext.Provider>
        </div>
    )
}
