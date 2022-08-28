import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/Scoreboard.scss';

export default function Scoreboard() {

    const {score} = useContext(GameContext);

    return (
        <div className="scoreboard">
            <div className="scoreboard__score scoreboard__score--you">
                <span className="scoreboard__player">X (You)</span>
                <h2 className="scoreboard__total heading-md cross-total">{score.circle}</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--tie">
                <span className="scoreboard__player">Ties</span>
                <h2 className="scoreboard__total heading-md ties-total">{score.tie}</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--cpu">
                <span className="scoreboard__player">O (Cpu)</span>
                <h2 className="scoreboard__total heading-md circle-total">{score.cross}</h2>
            </div>
        </div>
    )
}
