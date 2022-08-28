import React from 'react';
import '../styles/Scoreboard.scss';

export default function Scoreboard() {
    return (
        <div className="scoreboard">
            <div className="scoreboard__score scoreboard__score--you">
                <span className="scoreboard__player">X (You)</span>
                <h2 className="scoreboard__total heading-md cross-total">0</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--tie">
                <span className="scoreboard__player">Ties</span>
                <h2 className="scoreboard__total heading-md ties-total">0</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--cpu">
                <span className="scoreboard__player">O (Cpu)</span>
                <h2 className="scoreboard__total heading-md circle-total">0</h2>
            </div>
        </div>
    )
}
