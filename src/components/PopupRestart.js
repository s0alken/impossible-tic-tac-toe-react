import React from 'react';
import '../styles/PopupRestart.scss';
import Button from './Button';
import { GameContext } from '../context/GameContext';
import { useContext } from 'react';

function PopupRestart({ setIsPopupRestartOpen }) {

    const { restartGame } = useContext(GameContext);

    return (
        <div className="popup-restart">
            <h1 className="popup-restart__heading heading-lg popup-result__heading--tie backInLeft delay-3">
                Restart game?
            </h1>
            <div className="popup-restart__options backInLeft delay-5">
                <Button className="btn btn-md btn--silver" onClick={() => setIsPopupRestartOpen(false)}>No, cancel</Button>
                <Button className="btn btn-md btn--yellow btn-next-round" onClick={restartGame}>Yes, restart</Button>
            </div>
        </div >
    )
}

export default PopupRestart;