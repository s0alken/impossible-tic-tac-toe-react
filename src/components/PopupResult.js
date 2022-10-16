import React, { useContext } from 'react';
import '../styles/PopupResult.scss';
import { GameConfigContext } from '../context/GameConfigContext';
import Button from './Button';
import icon_circle from '../assets/icon-o.svg';
import icon_cross from '../assets/icon-x.svg';

function PopupResult({ winner, handleQuit, handleNextRound }) {

    const { gameType, playerMark, scoreLabels } = useContext(GameConfigContext);

    const labels = {
        player: `${scoreLabels[winner] === 'p1' ? 'player 1' : 'player 2'} wins!`,
        cpu: winner === playerMark ? 'You won!' : 'Oh no, you lost!'
    }

    const WinnerContent = () => (
        <>
            <p className="popup-result__text heading-xs">
                {labels[gameType]}
            </p>
            <h1 className={`popup-result__heading heading-lg popup-result__heading--${winner}`}>
                <img src={winner === 'circle' ? icon_circle : icon_cross} alt={`${winner} logo`} className="popup-result__heading-icon" />
                Takes the round
            </h1>
        </>
    )

    const TieContent = () => (
        <h1 className="popup-result__heading heading-lg popup-result__heading--tie">
            Round tied
        </h1>
    )

    return (
        <div className="popup-result">
            {winner === "tie" ? <TieContent /> : <WinnerContent />}
            <div className="popup-result__options">
                <Button className="btn btn-md btn--silver" onClick={handleQuit}>Quit</Button>
                <Button className="btn btn-md btn--yellow btn-next-round" onClick={handleNextRound}>Next round</Button>
            </div>
        </div>
    )
}

export default PopupResult;