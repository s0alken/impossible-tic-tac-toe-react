import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import Button from './Button';

export default function PopupRestartContent({ setIsPopupOpen }) {

    const { setBoard, setIsWinner, setTurn, setScore } = useContext(GameContext);

    function restart() {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupOpen(false);
        setScore({cross: 0, tie: 0, circle: 0})
    }

    return (
        <>
            <div className="popup__menu">
                <h1 className="popup__heading heading-lg popup__heading--tie">
                    Restart game?
                </h1>
                <div className="popup__options">
                    <Button className="btn btn-md btn--silver" onClick={() => setIsPopupOpen(false)}>No, cancel</Button>
                    <Button className="btn btn-md btn--yellow" onClick={restart}>Yes, restart</Button>
                </div>
            </div>
        </>
    )
}
