import React, { useContext } from 'react';
import '../styles/PopupRestart.scss';
import { GameContext } from '../context/GameContext';
import Button from './Button';

function PopupRestart({ setIsPopupOpen }) {

    const { setBoard, setIsWinner, setTurn, setScore } = useContext(GameContext);

    const restart = () => {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupOpen(false);
        setScore({ cross: 0, tie: 0, circle: 0 })
    }

    return (
        <div className="popup-restart">
            <h1 className="popup-restart__heading heading-lg popup-result__heading--tie">
                Restart game?
            </h1>
            <div className="popup-restart__options">
                <Button className="btn btn-md btn--silver" onClick={() => setIsPopupOpen(false)}>No, cancel</Button>
                <Button className="btn btn-md btn--yellow btn-next-round" onClick={restart}>Yes, restart</Button>
            </div>
        </div >
    )
}

export default PopupRestart