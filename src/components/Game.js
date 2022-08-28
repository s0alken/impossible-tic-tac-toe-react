import React, { useState } from 'react';
import '../styles/Game.scss';
import Header from './Header';
import Board from './Board';
import Scoreboard from './Scoreboard';
import { GameContext } from '../context/GameContext';

export default function Game() {

    const [turn, setTurn] = useState('cross');

    return (
        <div className="game">
            <GameContext.Provider value={{ turn, setTurn }}>
                <Header />
                <Board />
                <Scoreboard />
            </GameContext.Provider>
        </div>
    )
}
