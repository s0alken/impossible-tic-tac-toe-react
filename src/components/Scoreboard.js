import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import '../styles/Scoreboard.scss';

export default function Scoreboard() {

    const { scoreLabels } = useContext(GameConfigContext);
    const { score } = useContext(GameContext);

    return (
        <div className="scoreboard">
            <div className="scoreboard__score scoreboard__score--cross">
                <span className="scoreboard__player">{`X (${scoreLabels.cross})`}</span>
                <h2 className="scoreboard__total heading-md cross-total">{score.cross}</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--tie">
                <span className="scoreboard__player">Ties</span>
                <h2 className="scoreboard__total heading-md ties-total">{score.tie}</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--circle">
                <span className="scoreboard__player">{`O (${scoreLabels.circle})`}</span>
                <h2 className="scoreboard__total heading-md circle-total">{score.circle}</h2>
            </div>
        </div>
    )


    /* return (
        <div className="scoreboard">
            <div className={`scoreboard__score scoreboard__score--${player1}`}>
                <span className="scoreboard__player">{`${labels[player1]} (You)`}</span>
                <h2 className="scoreboard__total heading-md cross-total">{score[player1]}</h2>
            </div>
            <div className="scoreboard__score scoreboard__score--tie">
                <span className="scoreboard__player">Ties</span>
                <h2 className="scoreboard__total heading-md ties-total">{score.tie}</h2>
            </div>
            <div className={`scoreboard__score scoreboard__score--${player2}`}>
            <span className="scoreboard__player">{`${labels[player2]} (Cpu)`}</span>
                <h2 className="scoreboard__total heading-md circle-total">{score[player2]}</h2>
            </div>
        </div>
    ) */
}
