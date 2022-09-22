import React, { useContext } from 'react';
import { GameConfigContext } from '../context/GameConfigContext';
import Button from './Button';
import icon_circle from '../assets/icon-o.svg';
import icon_cross from '../assets/icon-x.svg';

export default function PopupWinnerContent({ winner, handleQuit, handleNextRound }) {
    const { player1 } = useContext(GameConfigContext);

    const WinnerContent = () => (
        <>
            <p className="popup__result heading-xs">
                {winner === player1 ? 'You won!' : 'Oh no, you lost!'}
            </p>
            <h1 className={`popup__heading heading-lg popup__heading--${winner}`}>
                <img src={winner === 'circle' ? icon_circle : icon_cross} alt={`${winner} logo`} className="popup__heading-icon" />
                Takes the round
            </h1>
        </>
    )

    const TieContent = () => (
        <h1 className="popup__heading heading-lg popup__heading--tie">
            Round tied
        </h1>
    )

    return (
        <div className='popup__menu'>
            {winner === "tie" ? <TieContent /> : <WinnerContent />}
            <div className="popup__options">
                <Button className="btn btn-md btn--silver" onClick={handleQuit}>Quit</Button>
                <Button className="btn btn-md btn--yellow btn-next-round" onClick={handleNextRound}>Next round</Button>
            </div>
        </div>
    )
}
